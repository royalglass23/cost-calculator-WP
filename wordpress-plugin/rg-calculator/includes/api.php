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

    // GET /wp-json/royal-glass/v1/export-leads  (rgtools bridge - API-key secured)
    register_rest_route('royal-glass/v1', '/export-leads', [
        'methods'             => 'GET',
        'callback'            => 'rg_handle_export_leads',
        'permission_callback' => 'rg_export_leads_permission',
    ]);
}

// ── GET /pricing ──────────────────────────────────────────────────────────────

function rg_get_pricing(): WP_REST_Response {
    $defaults = rg_pricing_defaults();

    if (rg_get_rgtools_pricing_url()) {
        return new WP_REST_Response(rg_get_rgtools_pricing_with_fallback($defaults), 200);
    }

    $saved = get_option('rg_calculator_pricing', []);
    $pricing = (!empty($saved['scenarios']) && !empty($saved['hardwareFinishSurcharge']))
        ? array_replace_recursive($defaults, $saved)
        : $defaults;

    return new WP_REST_Response($pricing, 200);
}

function rg_pricing_defaults(): array {
    return [
        'scenarios' => [
            'ground_level'       => ['ratePerMetre' => 280, 'gatePrice' => null],
            'balcony_balustrade' => ['ratePerMetre' => 320, 'gatePrice' => null],
            'premium_pool_fence' => ['ratePerMetre' => 380, 'gatePrice' => 680],
            'stair_balustrade'   => ['ratePerMetre' => 330, 'gatePrice' => null],
        ],
        'minimumLength'            => 5,
        'cornerSurcharge'          => 85,
        'hardwareFinishSurcharge'  => ['standard_chrome' => 0, 'matte_black' => 15, 'brushed_chrome' => 12, 'powder_coated' => 22, 'not_sure' => 0],
        'glassTypeSurcharge'       => ['toughened_12mm' => 0, 'laminated' => 0],
        'glassColourSurcharge'     => ['clear' => 0, 'tinted' => 0, 'frosted' => 0, 'low_iron' => 0],
        'fixingMethodSurcharge'    => ['spigot_round' => 0, 'standoff_posts' => 0, 'viking' => 0, 'side_channel' => 0, 'top_channel' => 0, 'aluminium_1' => 0, 'aluminium_2' => 0, 'jh_clamps' => 0, 'sed' => 0, 'not_sure' => 0],
        'interlikingRailsSurcharge' => 0,
        'rangeLowPercent'          => 90,
        'rangeHighPercent'         => 120,
    ];
}

function rg_get_rgtools_pricing_with_fallback(array $defaults): array {
    $cached = get_transient('rg_pricing_cache');
    if (is_array($cached) && rg_is_valid_pricing_payload($cached)) {
        return $cached;
    }

    $response = wp_remote_get(rg_get_rgtools_pricing_url(), [
        'timeout' => 5,
    ]);

    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
        $body = json_decode(wp_remote_retrieve_body($response), true);
        if (is_array($body) && rg_is_valid_pricing_payload($body)) {
            $pricing = array_replace_recursive($defaults, $body);
            set_transient('rg_pricing_cache', $pricing, 10 * MINUTE_IN_SECONDS);
            update_option('rg_pricing_last_known', $pricing, false);
            return $pricing;
        }
    }

    $last_known = get_option('rg_pricing_last_known', []);
    if (is_array($last_known) && rg_is_valid_pricing_payload($last_known)) {
        return array_replace_recursive($defaults, $last_known);
    }

    return $defaults;
}

function rg_is_valid_pricing_payload($pricing): bool {
    return is_array($pricing)
        && !empty($pricing['scenarios'])
        && is_array($pricing['scenarios'])
        && !empty($pricing['hardwareFinishSurcharge'])
        && is_array($pricing['hardwareFinishSurcharge']);
}

// ── POST /leads ───────────────────────────────────────────────────────────────

function rg_handle_lead(WP_REST_Request $request): WP_REST_Response {
    $body = $request->get_json_params();
    if (!is_array($body)) {
        return rg_error('Invalid JSON payload', 400);
    }
    $submission_ref = rg_normalize_submission_ref($body['submissionRef'] ?? '');

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

    // Forward to rgtools. WordPress is only the same-origin browser proxy here.
    $forward_payload = [
        'submissionRef'  => $submission_ref,
        'answers'        => $answers,
        'lead'           => $lead,
        'estimate'       => $est,
        'turnstileToken' => $token,
        'loadedAt'       => $loaded_at,
    ];
    $rgtools_result = rg_submit_lead_to_rgtools($forward_payload);
    if (!$rgtools_result['ok']) {
        rg_save_failed_forward_outbox(
            $submission_ref,
            rg_payload_without_turnstile($forward_payload),
            (string) ($rgtools_result['error'] ?? 'forward_failed')
        );
        return rg_error('Unable to submit lead. Please call us on 0800 769 254.', 502);
    }

    // rgtools owns lead storage, customer email, and ServiceM8 sync.
    return new WP_REST_Response([
        'ok'            => true,
        'leadId'        => $rgtools_result['leadId'],
        'source'        => 'rgtools',
        'submissionRef' => $submission_ref,
    ], 201);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function rg_error(string $message, int $status): WP_REST_Response {
    return new WP_REST_Response(['ok' => false, 'error' => $message], $status);
}

function rg_get_client_ip(): string {
    // Use REMOTE_ADDR — the actual TCP connection IP on Bluehost (no Cloudflare proxy).
    // HTTP_CF_CONNECTING_IP is intentionally not used: the site is not behind Cloudflare's
    // proxy, so that header is never set legitimately and would be fully attacker-controlled.
    if (!empty($_SERVER['REMOTE_ADDR'])) {
        $ip = trim((string) $_SERVER['REMOTE_ADDR']);
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

function rg_normalize_submission_ref($value): string {
    $ref = sanitize_text_field((string) $value);
    if (preg_match('/^rgcalc_[a-z0-9]+_[a-z0-9]+$/', $ref)) {
        return $ref;
    }

    $uuid = function_exists('wp_generate_uuid4') ? wp_generate_uuid4() : uniqid('', true);
    $token = strtolower(preg_replace('/[^a-z0-9]/', '', (string) $uuid));
    if ($token === '') {
        $token = strtolower(bin2hex(random_bytes(6)));
    }

    return 'rgcalc_' . base_convert((string) time(), 10, 36) . '_' . substr($token, 0, 12);
}

function rg_payload_without_turnstile(array $payload): array {
    unset($payload['turnstileToken']);
    return $payload;
}

function rg_submit_lead_to_rgtools(array $payload): array {
    $url = rg_get_rgtools_submit_url();
    $submission_ref = rg_normalize_submission_ref($payload['submissionRef'] ?? '');
    $payload['submissionRef'] = $submission_ref;

    if (!$url) {
        return ['ok' => false, 'error' => 'rgtools_url_missing'];
    }

    if (!defined('RGTOOLS_SUBMIT_SECRET') || !RGTOOLS_SUBMIT_SECRET) {
        error_log("RG Tools forward failed for {$submission_ref}: RGTOOLS_SUBMIT_SECRET is not configured");
        return ['ok' => false, 'error' => 'rgtools_secret_missing'];
    }

    $headers = [
        'Content-Type'           => 'application/json',
        'X-RG-Calculator-Secret' => (string) RGTOOLS_SUBMIT_SECRET,
    ];

    $payload = rg_payload_without_turnstile($payload);

    $response = wp_remote_post($url, [
        'timeout'  => 8,
        'blocking' => true,
        'headers'  => $headers,
        'body'     => wp_json_encode($payload),
    ]);

    if (is_wp_error($response)) {
        error_log("RG Tools forward failed for {$submission_ref}: " . $response->get_error_message());
        return ['ok' => false, 'error' => $response->get_error_message()];
    }

    $status = (int) wp_remote_retrieve_response_code($response);
    $body   = json_decode(wp_remote_retrieve_body($response), true);

    if ($status < 200 || $status >= 300) {
        error_log("RG Tools forward failed for {$submission_ref}: HTTP {$status} " . wp_remote_retrieve_body($response));
        return ['ok' => false, 'error' => "http_{$status}"];
    }

    if (!is_array($body) || empty($body['ok'])) {
        error_log("RG Tools forward failed for {$submission_ref}: invalid response body");
        return ['ok' => false, 'error' => 'invalid_response'];
    }

    $lead_id = sanitize_text_field($body['leadId'] ?? $body['id'] ?? '');
    error_log("RG Tools forward succeeded for {$submission_ref} lead {$lead_id}");

    return ['ok' => true, 'leadId' => $lead_id];
}

function rg_handle_estimate_email(WP_REST_Request $request): WP_REST_Response {
    if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
        return rg_error('Invalid request', 403);
    }

    $body = $request->get_json_params();
    if (!is_array($body)) return rg_error('Invalid request', 400);

    $email      = sanitize_email($body['email']     ?? '');
    $first_name = sanitize_text_field($body['firstName'] ?? '');
    $answers    = is_array($body['answers']  ?? null) ? $body['answers']  : [];
    $estimate   = is_array($body['estimate'] ?? null) ? $body['estimate'] : [];

    if (!is_email($email))             return rg_error('Please enter a valid email address.', 422);
    if (empty($answers) || empty($estimate)) return rg_error('Missing project data.', 422);

    $answers_validation = rg_validate_answers($answers);
    if (is_wp_error($answers_validation)) {
        return rg_error($answers_validation->get_error_message(), 422);
    }

    // Separate rate limit bucket for estimate emails (5/hour per IP, admin bypass)
    $ip       = rg_get_client_ip();
    $is_admin = is_user_logged_in() && current_user_can('manage_options');
    if (!$is_admin) {
        $key   = 'rg_em_' . md5($ip);
        $count = (int) get_transient($key);
        if ($count >= 5) return rg_error('Too many requests. Please try again in an hour.', 429);
        set_transient($key, $count + 1, HOUR_IN_SECONDS);
    }

    // Fire-and-forget via shutdown hook — respond immediately, email sends in background.
    $async_email    = $email;
    $async_name     = $first_name;
    $async_answers  = $answers;
    $async_estimate = $estimate;
    add_action('shutdown', function() use ($async_email, $async_name, $async_answers, $async_estimate) {
        if (function_exists('fastcgi_finish_request')) fastcgi_finish_request();
        ignore_user_abort(true);
        rg_send_estimate_email_to_customer($async_email, $async_name, $async_answers, $async_estimate);
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

// -- GET /export-leads (rgtools bridge) --------------------------------------

function rg_export_leads_permission(WP_REST_Request $request): bool {
    if (!defined('RG_EXPORT_API_KEY') || !RG_EXPORT_API_KEY) return false;
    $provided = (string) ($request->get_header('X-RG-Export-Key') ?? '');
    return $provided !== '' && hash_equals(RG_EXPORT_API_KEY, $provided);
}

function rg_handle_export_leads(WP_REST_Request $request): WP_REST_Response {
    global $wpdb;
    $since_id = max(0, (int) $request->get_param('since_id'));
    $limit    = min(100, max(1, (int) ($request->get_param('limit') ?: 50)));

    $rows = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}rg_leads WHERE id > %d ORDER BY id ASC LIMIT %d",
        $since_id, $limit
    ));

    $leads = array_map(static function ($r) {
        return [
            'id'            => (int) $r->id,
            'status'        => $r->status,
            'first_name'    => $r->first_name,
            'last_name'     => $r->last_name,
            'phone'         => $r->phone,
            'email'         => $r->email,
            'customer_type' => $r->customer_type,
            'timeframe'     => $r->timeframe ?? '',
            'address'       => $r->address,
            'call_pref'     => $r->call_pref,
            'notes'         => $r->notes,
            'project_type'  => $r->project_type,
            'length_m'      => (int) $r->length_m,
            'corners'       => (int) $r->corners,
            'gates'         => (int) $r->gates,
            'fixing_method' => $r->fixing_method,
            'substrate'     => $r->substrate ?? '',
            'hardware'      => $r->hardware,
            'est_low'       => $r->est_low,
            'est_high'      => $r->est_high,
            'est_subtotal'  => $r->est_subtotal,
            'needs_consult' => (int) $r->needs_consult,
            'consult_notes' => $r->consult_notes,
            'height'        => $r->height,
            'consent_given' => (int) $r->consent_given,
            'created_at'    => $r->created_at,
        ];
    }, $rows ?: []);

    return new WP_REST_Response(['ok' => true, 'leads' => $leads], 200);
}
