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

    // POST /wp-json/royal-glass/v1/estimate-email
    register_rest_route('royal-glass/v1', '/estimate-email', [
        'methods'             => 'POST',
        'callback'            => 'rg_handle_estimate_email',
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
    if (!is_array($body)) {
        return rg_error('Invalid JSON payload', 400);
    }

    // ── 1. Time gate: reject if submitted in under 3 seconds ──────────────
    $loaded_at = isset($body['loadedAt']) ? (int) $body['loadedAt'] : 0;
    if ($loaded_at > 0 && (time() * 1000 - $loaded_at) < 3000) {
        return rg_error('Bot detected (submitted too fast)', 429);
    }

    // ── 2. Rate limiting: max 10 submissions per IP per hour ───────────────
    $ip = rg_get_client_ip();
    $is_admin_test = is_user_logged_in() && current_user_can('manage_options');
    if (!$is_admin_test && !rg_check_rate_limit($ip)) {
        return rg_error('Too many submissions. Please try again later.', 429);
    }

    // ── 3. Honeypot check ─────────────────────────────────────────────────
    // (honeypot field 'website_url' is hidden from users — bots fill it)
    $lead_raw = is_array($body['lead'] ?? null) ? $body['lead'] : [];
    $honeypot = (string) (
        $lead_raw['websiteUrl']
        ?? $lead_raw['website_url']
        ?? $lead_raw['website']
        ?? ($body['honeypot'] ?? '')
    );
    if (trim($honeypot) !== '') {
        return rg_error('Invalid submission', 400);
    }

    // ── 4. Cloudflare Turnstile verification ──────────────────────────────
    // Both the site key (frontend) AND secret (backend) must be configured for
    // enforcement to activate — a partial setup is treated as disabled.
    $token = sanitize_text_field($body['turnstileToken'] ?? '');
    if (defined('RG_TURNSTILE_SECRET') && RG_TURNSTILE_SECRET &&
        defined('RG_TURNSTILE_SITE_KEY') && RG_TURNSTILE_SITE_KEY) {
        if (!rg_verify_turnstile($token, $ip)) {
            return rg_error('Security check failed. Please reload the page and try again.', 403);
        }
    }

    // ── 5. Extract + validate lead fields ─────────────────────────────────
    $lead    = rg_normalize_lead(is_array($body['lead'] ?? null) ? $body['lead'] : []);
    $answers = is_array($body['answers'] ?? null) ? $body['answers'] : [];
    $est     = is_array($body['estimate'] ?? null) ? $body['estimate'] : [];

    $validation = rg_validate_lead($lead);
    if (is_wp_error($validation)) {
        return rg_error($validation->get_error_message(), 422);
    }

    $answers_validation = rg_validate_answers($answers);
    if (is_wp_error($answers_validation)) {
        return rg_error($answers_validation->get_error_message(), 422);
    }

    // ── 6. Save to database ────────────────────────────────────────────────
    $lead_id = rg_save_lead($lead, $answers, $est);
    if (!$lead_id) {
        return rg_error('Unable to save lead. Please call us on 0800 769 254.', 500);
    }

    // ── 7. Send email notification (after response is flushed) ────────────
    // Capture in local vars for the closure — avoids reference issues.
    $email_lead_id = $lead_id;
    $email_lead    = $lead;
    $email_answers = $answers;
    $email_est     = $est;
    add_action('shutdown', function() use ($email_lead_id, $email_lead, $email_answers, $email_est) {
        // On PHP-FPM hosts this flushes the response to the browser first,
        // so the user sees success immediately while email sends in background.
        if (function_exists('fastcgi_finish_request')) fastcgi_finish_request();
        ignore_user_abort(true);
        rg_send_lead_email($email_lead_id, $email_lead, $email_answers, $email_est);
    });

    return new WP_REST_Response(['ok' => true, 'leadId' => $lead_id], 201);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function rg_error(string $message, int $status): WP_REST_Response {
    return new WP_REST_Response(['ok' => false, 'error' => $message], $status);
}

function rg_get_client_ip(): string {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        $ip = trim((string) $_SERVER['HTTP_CF_CONNECTING_IP']);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }

    if (!empty($_SERVER['REMOTE_ADDR'])) {
        $ip = trim((string) $_SERVER['REMOTE_ADDR']);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }

    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = trim(explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }
    return '0.0.0.0';
}

function rg_check_rate_limit(string $ip): bool {
    $key     = 'rg_rl_' . md5($ip);
    $count   = (int) get_transient($key);
    $limit   = 10; // max submissions per window
    $window  = HOUR_IN_SECONDS;

    if ($count >= $limit) return false;

    set_transient($key, $count + 1, $window);
    return true;
}

function rg_handle_estimate_email(WP_REST_Request $request): WP_REST_Response {
    $body = $request->get_json_params();
    if (!is_array($body)) return rg_error('Invalid request', 400);

    $email      = sanitize_email($body['email']     ?? '');
    $first_name = sanitize_text_field($body['firstName'] ?? '');
    $answers    = is_array($body['answers']  ?? null) ? $body['answers']  : [];
    $estimate   = is_array($body['estimate'] ?? null) ? $body['estimate'] : [];

    if (!is_email($email))             return rg_error('Please enter a valid email address.', 422);
    if (empty($answers) || empty($estimate)) return rg_error('Missing project data.', 422);

    // Separate rate limit bucket for estimate emails (5/hour per IP, admin bypass)
    $ip       = rg_get_client_ip();
    $is_admin = is_user_logged_in() && current_user_can('manage_options');
    if (!$is_admin) {
        $key   = 'rg_em_' . md5($ip);
        $count = (int) get_transient($key);
        if ($count >= 5) return rg_error('Too many requests. Please try again in an hour.', 429);
        set_transient($key, $count + 1, HOUR_IN_SECONDS);
    }

    $em_email     = $email;
    $em_name      = $first_name;
    $em_answers   = $answers;
    $em_estimate  = $estimate;
    add_action('shutdown', function() use ($em_email, $em_name, $em_answers, $em_estimate) {
        if (function_exists('fastcgi_finish_request')) fastcgi_finish_request();
        ignore_user_abort(true);
        rg_send_estimate_email_to_customer($em_email, $em_name, $em_answers, $em_estimate);
    });

    return new WP_REST_Response(['ok' => true], 200);
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
