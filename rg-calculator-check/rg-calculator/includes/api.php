<?php
if (!defined('ABSPATH')) exit;

add_action('rest_api_init', 'rg_register_routes');

function rg_register_routes() {
    // POST /wp-json/royal-glass/v1/leads
    register_rest_route('royal-glass/v1', '/leads', [
        'methods'             => 'POST',
        'callback'            => 'rg_handle_lead',
        'permission_callback' => '__return_true',
    ]);

    // GET /wp-json/royal-glass/v1/pricing
    register_rest_route('royal-glass/v1', '/pricing', [
        'methods'             => 'GET',
        'callback'            => 'rg_get_pricing',
        'permission_callback' => '__return_true',
    ]);
}

// ── GET /pricing ──────────────────────────────────────────────────────────────

function rg_get_pricing(): WP_REST_Response {
    $defaults = [
        'ratePerMetre'               => 500,
        'minimumLength'              => 5,
        'gatePrice'                  => 1100,
        'cornerSurcharge'            => 150,
        'hardwareSurchargePerMetre'  => 50,
        'hardwareMinimumSurcharge'   => 250,
        'rangeLowPercent'            => 90,
        'rangeHighPercent'           => 120,
    ];

    $saved = get_option('rg_calculator_pricing', []);
    $pricing = array_merge($defaults, is_array($saved) ? $saved : []);

    // Cast to numbers
    foreach ($pricing as $key => $val) {
        $pricing[$key] = (float) $val;
    }

    return new WP_REST_Response($pricing, 200);
}

// ── POST /leads ───────────────────────────────────────────────────────────────

function rg_handle_lead(WP_REST_Request $request): WP_REST_Response {
    $body = $request->get_json_params();

    // ── 1. Time gate: reject if submitted in under 3 seconds ──────────────
    $loaded_at = isset($body['loadedAt']) ? (int) $body['loadedAt'] : 0;
    if ($loaded_at > 0 && (time() * 1000 - $loaded_at) < 3000) {
        return rg_error('Bot detected (submitted too fast)', 429);
    }

    // ── 2. Rate limiting: max 5 submissions per IP per hour ────────────────
    $ip = rg_get_client_ip();
    if (!rg_check_rate_limit($ip)) {
        return rg_error('Too many submissions. Please try again later.', 429);
    }

    // ── 3. Honeypot check ─────────────────────────────────────────────────
    // (honeypot field 'website_url' is hidden from users — bots fill it)
    if (!empty($body['lead']['websiteUrl'])) {
        return rg_error('Invalid submission', 400);
    }

    // ── 4. Cloudflare Turnstile verification ──────────────────────────────
    $token = sanitize_text_field($body['turnstileToken'] ?? '');
    if (defined('RG_TURNSTILE_SECRET') && RG_TURNSTILE_SECRET) {
        if (!rg_verify_turnstile($token, $ip)) {
            return rg_error('Security check failed. Please reload the page and try again.', 403);
        }
    }

    // ── 5. Extract + validate lead fields ─────────────────────────────────
    $lead    = $body['lead']    ?? [];
    $answers = $body['answers'] ?? [];
    $est     = $body['estimate'] ?? [];

    $validation = rg_validate_lead($lead);
    if (is_wp_error($validation)) {
        return rg_error($validation->get_error_message(), 422);
    }

    // ── 6. Save to database ────────────────────────────────────────────────
    $lead_id = rg_save_lead($lead, $answers, $est);
    if (!$lead_id) {
        return rg_error('Unable to save lead. Please call us on 0800 769 254.', 500);
    }

    // ── 7. Send email notification ─────────────────────────────────────────
    rg_send_lead_email($lead_id, $lead, $answers, $est);

    return new WP_REST_Response(['ok' => true, 'leadId' => $lead_id], 201);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function rg_error(string $message, int $status): WP_REST_Response {
    return new WP_REST_Response(['ok' => false, 'error' => $message], $status);
}

function rg_get_client_ip(): string {
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key])) {
            return sanitize_text_field(explode(',', $_SERVER[$key])[0]);
        }
    }
    return '0.0.0.0';
}

function rg_check_rate_limit(string $ip): bool {
    $key     = 'rg_rl_' . md5($ip);
    $count   = (int) get_transient($key);
    $limit   = 5; // max submissions per window
    $window  = HOUR_IN_SECONDS;

    if ($count >= $limit) return false;

    set_transient($key, $count + 1, $window);
    return true;
}

function rg_verify_turnstile(string $token, string $ip): bool {
    if (empty($token)) return false;

    $secret = defined('RG_TURNSTILE_SECRET') ? RG_TURNSTILE_SECRET : '';
    if (!$secret) return true; // skip if not configured

    $response = wp_remote_post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
        'body'    => ['secret' => $secret, 'response' => $token, 'remoteip' => $ip],
        'timeout' => 10,
    ]);

    if (is_wp_error($response)) return false;

    $body = json_decode(wp_remote_retrieve_body($response), true);
    return !empty($body['success']);
}
