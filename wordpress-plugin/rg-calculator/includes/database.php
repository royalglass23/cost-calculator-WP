<?php
if (!defined('ABSPATH')) exit;

define('RG_DB_VERSION', '2.5.0');
define('RG_CALCULATOR_OUTBOX_MAX_ATTEMPTS', 5);

function rg_create_leads_table(): void {
    global $wpdb;
    $table   = $wpdb->prefix . 'rg_leads';
    $charset = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS {$table} (
        id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        status        VARCHAR(20)     NOT NULL DEFAULT 'NEW',
        first_name    VARCHAR(100)    NOT NULL DEFAULT '',
        last_name     VARCHAR(100)    NOT NULL DEFAULT '',
        phone         VARCHAR(50)     NOT NULL DEFAULT '',
        email         VARCHAR(255)    NOT NULL DEFAULT '',
        address       TEXT            NOT NULL DEFAULT '',
        customer_type VARCHAR(30)     NOT NULL DEFAULT '',
        timeframe     VARCHAR(30)     NOT NULL DEFAULT '',
        call_pref     VARCHAR(20)     NOT NULL DEFAULT 'anytime',
        notes         TEXT            NOT NULL DEFAULT '',
        project_type  VARCHAR(50)     NOT NULL DEFAULT '',
        length_m      SMALLINT        NOT NULL DEFAULT 0,
        height        VARCHAR(50)     NOT NULL DEFAULT '',
        corners       TINYINT         NOT NULL DEFAULT 0,
        gates         TINYINT         NOT NULL DEFAULT 0,
        fixing_method VARCHAR(50)     NOT NULL DEFAULT '',
        hardware      VARCHAR(50)     NOT NULL DEFAULT '',
        est_low       DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
        est_high      DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
        est_subtotal  DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
        needs_consult TINYINT(1)      NOT NULL DEFAULT 0,
        consult_notes TEXT            NOT NULL DEFAULT '',
        consent_given TINYINT(1)      NOT NULL DEFAULT 0,
        consented_at  DATETIME        NULL,
        servicem8_status  VARCHAR(20)     NOT NULL DEFAULT '',
        servicem8_sent_at DATETIME        NULL,
        created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY status (status),
        KEY servicem8_status (servicem8_status),
        KEY created_at (created_at)
    ) {$charset};";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);

    // dbDelta silently skips adding columns to existing tables in some environments.
    // Explicitly ALTER TABLE for any columns that are missing.
    $existing = $wpdb->get_col("SHOW COLUMNS FROM {$table}", 0);
    if (!in_array('consent_given', $existing, true)) {
        $wpdb->query("ALTER TABLE {$table} ADD COLUMN consent_given TINYINT(1) NOT NULL DEFAULT 0 AFTER consult_notes");
    }
    if (!in_array('consented_at', $existing, true)) {
        $wpdb->query("ALTER TABLE {$table} ADD COLUMN consented_at DATETIME NULL AFTER consent_given");
    }
    if (!in_array('substrate', $existing, true)) {
        $wpdb->query("ALTER TABLE {$table} ADD COLUMN substrate VARCHAR(50) NOT NULL DEFAULT '' AFTER fixing_method");
    }
    if (!in_array('servicem8_status', $existing, true)) {
        $wpdb->query("ALTER TABLE {$table} ADD COLUMN servicem8_status VARCHAR(20) NOT NULL DEFAULT '' AFTER consented_at");
    }
    if (!in_array('servicem8_sent_at', $existing, true)) {
        $wpdb->query("ALTER TABLE {$table} ADD COLUMN servicem8_sent_at DATETIME NULL AFTER servicem8_status");
    }
    if (!in_array('customer_type', $existing, true)) {
        $wpdb->query("ALTER TABLE {$table} ADD COLUMN customer_type VARCHAR(30) NOT NULL DEFAULT '' AFTER email");
    }
    if (!in_array('timeframe', $existing, true)) {
        $wpdb->query("ALTER TABLE {$table} ADD COLUMN timeframe VARCHAR(30) NOT NULL DEFAULT '' AFTER customer_type");
    }

    rg_create_outbox_table();
}

function rg_create_outbox_table(): void {
    global $wpdb;
    $table   = $wpdb->prefix . 'rg_calculator_outbox';
    $charset = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS {$table} (
        id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        submission_ref  VARCHAR(100)    NOT NULL,
        status          VARCHAR(20)     NOT NULL DEFAULT 'pending',
        payload         LONGTEXT        NOT NULL,
        attempts        INT UNSIGNED    NOT NULL DEFAULT 0,
        last_error      TEXT            NOT NULL DEFAULT '',
        next_retry_at   DATETIME        NULL,
        rgtools_lead_id VARCHAR(100)    NOT NULL DEFAULT '',
        alert_sent_at  DATETIME        NULL,
        created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY submission_ref (submission_ref),
        KEY status_next_retry (status, next_retry_at),
        KEY updated_at (updated_at)
    ) {$charset};";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);

    $existing = $wpdb->get_col("SHOW COLUMNS FROM {$table}", 0);
    if (!in_array('alert_sent_at', $existing, true)) {
        $wpdb->query("ALTER TABLE {$table} ADD COLUMN alert_sent_at DATETIME NULL AFTER rgtools_lead_id");
    }
}

// Run schema migrations automatically when any admin page loads and the DB version is stale.
add_action('admin_init', 'rg_maybe_migrate_db');
function rg_maybe_migrate_db(): void {
    if (get_option('rg_db_version') !== RG_DB_VERSION) {
        rg_create_leads_table();
        update_option('rg_db_version', RG_DB_VERSION);
    }
}

/**
 * Save a new lead. Returns the inserted row ID or 0 on failure.
 */
function rg_save_lead(array $lead, array $answers, array $est): int {
    global $wpdb;

    $l = rg_sanitize_lead($lead);
    $a = rg_sanitize_answers($answers);
    $e = rg_sanitize_estimate($est);

    $result = $wpdb->insert(
        $wpdb->prefix . 'rg_leads',
        [
            'status'        => 'NEW',
            'first_name'    => $l['firstName'],
            'last_name'     => $l['lastName'],
            'phone'         => $l['phone'],
            'email'         => $l['email'],
            'customer_type' => $l['customerType'],
            'timeframe'     => $l['timeframe'],
            'address'       => $l['address'],
            'call_pref'     => $l['callPreference'],
            'notes'         => $l['notes'],
            'project_type'  => $a['scenario'],
            'length_m'      => $a['length'],
            'height'        => '',
            'corners'       => $a['corners'],
            'gates'         => $a['gates'],
            'fixing_method' => $a['fixingMethod'],
            'substrate'     => $a['substrate'],
            'hardware'      => $a['hardwareFinish'],
            'est_low'       => $e['low'],
            'est_high'      => $e['high'],
            'est_subtotal'  => $e['subtotal'],
            'needs_consult' => $e['needsCallUs'] ? 1 : 0,
            'consult_notes' => '',
            'consent_given' => $l['consentGiven'],
            'consented_at'  => $l['consentedAt'],
        ],
        ['%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%d','%s','%d','%d','%s','%s','%s','%f','%f','%f','%d','%s','%d','%s']
    );

    return $result ? (int) $wpdb->insert_id : 0;
}

/**
 * Fetch a single lead by ID.
 */
function rg_get_lead(int $id): ?object {
    global $wpdb;
    return $wpdb->get_row(
        $wpdb->prepare("SELECT * FROM {$wpdb->prefix}rg_leads WHERE id = %d", $id)
    );
}

/**
 * Update lead status.
 */
function rg_update_lead_status(int $id, string $status): void {
    global $wpdb;
    $allowed = ['NEW', 'REVIEWED', 'ACCEPTED', 'REJECTED'];
    if (!in_array($status, $allowed, true)) return;
    $wpdb->update(
        $wpdb->prefix . 'rg_leads',
        ['status' => $status],
        ['id'     => $id],
        ['%s'],
        ['%d']
    );
}

function rg_save_failed_forward_outbox(string $submission_ref, array $payload, string $error): void {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_calculator_outbox';
    $now = current_time('mysql', true);
    $next_retry_at = gmdate('Y-m-d H:i:s', time() + 5 * MINUTE_IN_SECONDS);
    $payload_json = wp_json_encode($payload);

    $existing = $wpdb->get_row($wpdb->prepare(
        "SELECT id, attempts FROM {$table} WHERE submission_ref = %s LIMIT 1",
        $submission_ref
    ));

    if ($existing) {
        $wpdb->update(
            $table,
            [
                'status'        => 'pending',
                'payload'       => $payload_json,
                'attempts'      => ((int) $existing->attempts) + 1,
                'last_error'    => sanitize_text_field($error),
                'next_retry_at' => $next_retry_at,
                'updated_at'    => $now,
            ],
            ['id' => (int) $existing->id],
            ['%s','%s','%d','%s','%s','%s'],
            ['%d']
        );
        rg_log_calculator_outbox_event('initial_forward_failed', $submission_ref, ((int) $existing->attempts) + 1, $error);
        return;
    }

    $wpdb->insert(
        $table,
        [
            'submission_ref' => $submission_ref,
            'status'        => 'pending',
            'payload'       => $payload_json,
            'attempts'      => 1,
            'last_error'    => sanitize_text_field($error),
            'next_retry_at' => $next_retry_at,
            'created_at'    => $now,
            'updated_at'    => $now,
        ],
        ['%s','%s','%s','%d','%s','%s','%s','%s']
    );
    rg_log_calculator_outbox_event('initial_forward_failed', $submission_ref, 1, $error);
}

function rg_get_due_forward_outbox_entries(int $limit = 10): array {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_calculator_outbox';
    $now = current_time('mysql', true);

    return $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM {$table}
         WHERE status IN ('pending', 'failed')
           AND attempts < %d
           AND (next_retry_at IS NULL OR next_retry_at <= %s)
         ORDER BY updated_at ASC
         LIMIT %d",
        RG_CALCULATOR_OUTBOX_MAX_ATTEMPTS,
        $now,
        max(1, min(50, $limit))
    )) ?: [];
}

function rg_calculator_outbox_retry_delay_seconds(int $attempts): int {
    $base = 5 * MINUTE_IN_SECONDS;
    $delay = $base * (2 ** max(0, $attempts - 1));
    return min((int) $delay, HOUR_IN_SECONDS);
}

function rg_mark_forward_outbox_sent(int $id, string $lead_id = ''): void {
    global $wpdb;
    $wpdb->update(
        $wpdb->prefix . 'rg_calculator_outbox',
        [
            'status'          => 'sent',
            'last_error'      => '',
            'next_retry_at'   => null,
            'rgtools_lead_id' => sanitize_text_field($lead_id),
            'updated_at'      => current_time('mysql', true),
        ],
        ['id' => $id],
        ['%s','%s','%s','%s','%s'],
        ['%d']
    );
}

function rg_mark_forward_outbox_failed(int $id, int $current_attempts, string $error): void {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_calculator_outbox';
    $attempts = $current_attempts + 1;
    $exhausted = $attempts >= RG_CALCULATOR_OUTBOX_MAX_ATTEMPTS;
    $next_retry_at = $exhausted
        ? null
        : gmdate('Y-m-d H:i:s', time() + rg_calculator_outbox_retry_delay_seconds($attempts));

    $wpdb->update(
        $table,
        [
            'status'        => $exhausted ? 'exhausted' : 'failed',
            'attempts'      => $attempts,
            'last_error'    => sanitize_text_field($error),
            'next_retry_at' => $next_retry_at,
            'updated_at'    => current_time('mysql', true),
        ],
        ['id' => $id],
        ['%s','%d','%s','%s','%s'],
        ['%d']
    );

    $entry = rg_get_forward_outbox_entry($id);
    $submission_ref = $entry ? (string) $entry->submission_ref : '';
    rg_log_calculator_outbox_event(
        $exhausted ? 'retry_exhausted' : 'retry_failed',
        $submission_ref,
        $attempts,
        $error
    );

    if ($exhausted && $entry && empty($entry->alert_sent_at)) {
        rg_notify_calculator_outbox_attention($entry, $error);
        $wpdb->update(
            $table,
            ['alert_sent_at' => current_time('mysql', true)],
            ['id' => $id],
            ['%s'],
            ['%d']
        );
    }
}

function rg_retry_failed_forward_outbox_batch(int $limit = 10): void {
    foreach (rg_get_due_forward_outbox_entries($limit) as $entry) {
        rg_retry_forward_outbox_entry($entry);
    }
}

function rg_get_forward_outbox_entry(int $id): ?object {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_calculator_outbox';
    $entry = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM {$table} WHERE id = %d LIMIT 1",
        $id
    ));
    return $entry ?: null;
}

function rg_retry_forward_outbox_entry(object $entry): array {
    $payload = json_decode((string) $entry->payload, true);
    if (!is_array($payload)) {
        rg_mark_forward_outbox_failed((int) $entry->id, (int) $entry->attempts, 'invalid_payload');
        return ['ok' => false, 'error' => 'invalid_payload'];
    }

    $payload['submissionRef'] = rg_normalize_submission_ref($entry->submission_ref);
    $result = rg_submit_lead_to_rgtools($payload);
    if ($result['ok']) {
        rg_mark_forward_outbox_sent((int) $entry->id, (string) ($result['leadId'] ?? ''));
        return ['ok' => true, 'leadId' => (string) ($result['leadId'] ?? '')];
    }

    $error = (string) ($result['error'] ?? 'retry_failed');
    rg_mark_forward_outbox_failed((int) $entry->id, (int) $entry->attempts, $error);
    return ['ok' => false, 'error' => $error];
}

function rg_log_calculator_outbox_event(string $event, string $submission_ref, int $attempts, string $error): void {
    error_log(wp_json_encode([
        'source'        => 'rg-calculator-outbox',
        'event'         => $event,
        'submissionRef' => $submission_ref,
        'attempts'      => $attempts,
        'error'         => sanitize_text_field($error),
    ]));
}

function rg_notify_calculator_outbox_attention(object $entry, string $error): void {
    if (!defined('RG_LEAD_NOTIFY_EMAIL') || !RG_LEAD_NOTIFY_EMAIL) {
        return;
    }

    $submission_ref = sanitize_text_field($entry->submission_ref ?? '');
    $subject = 'Calculator lead forward exhausted';
    $body = implode("\n", [
        'A calculator submission could not be forwarded to rgtools after repeated retries.',
        '',
        'Submission Ref: ' . $submission_ref,
        'Status: exhausted',
        'Attempts: ' . (int) ($entry->attempts ?? 0),
        'Last error: ' . sanitize_text_field($error),
        '',
        'Review in WordPress: RG Calculator > Recovery Queue.',
        'Use rgtools as the lead workspace once recovery succeeds.',
    ]);

    wp_mail((string) RG_LEAD_NOTIFY_EMAIL, $subject, $body);
}
