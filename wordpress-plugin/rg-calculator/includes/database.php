<?php
if ( ! defined( 'ABSPATH' ) ) exit;

function rg_calc_create_table() {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_leads';
    $charset = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NULL,
        status VARCHAR(40) NOT NULL DEFAULT 'NEW',
        full_name VARCHAR(120) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(40) NOT NULL,
        role VARCHAR(60) NULL,
        suburb VARCHAR(160) NULL,
        timeframe VARCHAR(80) NULL,
        estimate_low DECIMAL(10,2) NULL,
        estimate_mid DECIMAL(10,2) NULL,
        estimate_high DECIMAL(10,2) NULL,
        needs_review TINYINT(1) DEFAULT 0,
        review_reasons LONGTEXT NULL,
        answers LONGTEXT NOT NULL,
        pricing_breakdown LONGTEXT NULL,
        notes LONGTEXT NULL,
        source VARCHAR(80) NULL,
        ip_hash VARCHAR(80) NULL,
        user_agent VARCHAR(400) NULL,
        servicem8_client_id VARCHAR(120) NULL,
        servicem8_job_id VARCHAR(120) NULL,
        servicem8_quote_id VARCHAR(120) NULL,
        error_message LONGTEXT NULL
    ) $charset;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta( $sql );
}

function rg_calc_insert_lead( array $data ): int|false {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_leads';

    $result = $wpdb->insert( $table, [
        'created_at'        => current_time( 'mysql' ),
        'updated_at'        => current_time( 'mysql' ),
        'status'            => 'NEW',
        'full_name'         => $data['full_name'],
        'email'             => $data['email'],
        'phone'             => $data['phone'],
        'role'              => $data['role'] ?? null,
        'suburb'            => $data['suburb'] ?? null,
        'timeframe'         => $data['timeframe'] ?? null,
        'estimate_low'      => $data['estimate_low'] ?? null,
        'estimate_mid'      => $data['estimate_mid'] ?? null,
        'estimate_high'     => $data['estimate_high'] ?? null,
        'needs_review'      => $data['needs_review'] ? 1 : 0,
        'review_reasons'    => wp_json_encode( $data['review_reasons'] ?? [] ),
        'answers'           => wp_json_encode( $data['answers'] ?? [] ),
        'pricing_breakdown' => wp_json_encode( $data['pricing_breakdown'] ?? [] ),
        'source'            => $data['source'] ?? 'calculator',
        'ip_hash'           => isset( $data['ip'] ) ? hash( 'sha256', $data['ip'] ) : null,
        'user_agent'        => $data['user_agent'] ?? null,
    ] );

    return $result ? $wpdb->insert_id : false;
}

function rg_calc_update_lead_status( int $id, string $status ): bool {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_leads';
    $allowed = [ 'NEW', 'REVIEWED', 'ACCEPTED', 'REJECTED', 'SERVICEM8_CREATED', 'QUOTE_SENT', 'WON', 'LOST', 'ERROR' ];

    if ( ! in_array( $status, $allowed, true ) ) return false;

    return (bool) $wpdb->update(
        $table,
        [ 'status' => $status, 'updated_at' => current_time( 'mysql' ) ],
        [ 'id' => $id ]
    );
}

function rg_calc_get_leads( int $limit = 50, int $offset = 0 ): array {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_leads';
    return $wpdb->get_results(
        $wpdb->prepare( "SELECT * FROM $table ORDER BY created_at DESC LIMIT %d OFFSET %d", $limit, $offset ),
        ARRAY_A
    );
}

function rg_calc_get_lead( int $id ): array|null {
    global $wpdb;
    $table = $wpdb->prefix . 'rg_leads';
    $row = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table WHERE id = %d", $id ), ARRAY_A );
    return $row ?: null;
}
