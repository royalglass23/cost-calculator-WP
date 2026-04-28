<?php
if ( ! defined( 'ABSPATH' ) ) exit;

function rg_calc_validate_payload( array $body ): array {
    $errors = [];

    // Honeypot check — bots fill hidden fields, humans don't
    if ( ! empty( $body['honeypot'] ) ) {
        return [ 'honeypot' => 'Bot submission detected.' ];
    }

    // Required fields
    if ( empty( $body['full_name'] ) || strlen( trim( $body['full_name'] ) ) < 2 ) {
        $errors['full_name'] = 'Full name is required.';
    }

    if ( empty( $body['email'] ) || ! is_email( $body['email'] ) ) {
        $errors['email'] = 'A valid email address is required.';
    }

    if ( empty( $body['phone'] ) || ! preg_match( '/^[\d\s\+\-\(\)]{7,20}$/', $body['phone'] ) ) {
        $errors['phone'] = 'A valid phone number is required.';
    }

    if ( empty( $body['answers'] ) || ! is_array( $body['answers'] ) ) {
        $errors['answers'] = 'Calculator answers are required.';
    }

    // Numeric range clamps
    foreach ( [ 'estimate_low', 'estimate_mid', 'estimate_high' ] as $field ) {
        if ( isset( $body[$field] ) ) {
            $val = floatval( $body[$field] );
            if ( $val < 0 || $val > 999999 ) {
                $errors[$field] = "Invalid value for $field.";
            }
        }
    }

    // Payload size guard — reject anything over 64KB
    if ( strlen( wp_json_encode( $body ) ) > 65536 ) {
        $errors['payload'] = 'Payload too large.';
    }

    return $errors;
}

function rg_calc_sanitize_payload( array $body ): array {
    return [
        'full_name'         => sanitize_text_field( $body['full_name'] ?? '' ),
        'email'             => sanitize_email( $body['email'] ?? '' ),
        'phone'             => sanitize_text_field( $body['phone'] ?? '' ),
        'role'              => sanitize_text_field( $body['role'] ?? '' ),
        'suburb'            => sanitize_text_field( $body['suburb'] ?? '' ),
        'timeframe'         => sanitize_text_field( $body['timeframe'] ?? '' ),
        'estimate_low'      => floatval( $body['estimate_low'] ?? 0 ),
        'estimate_mid'      => floatval( $body['estimate_mid'] ?? 0 ),
        'estimate_high'     => floatval( $body['estimate_high'] ?? 0 ),
        'needs_review'      => ! empty( $body['needs_review'] ),
        'review_reasons'    => is_array( $body['review_reasons'] ?? null ) ? array_map( 'sanitize_text_field', $body['review_reasons'] ) : [],
        'answers'           => $body['answers'] ?? [],
        'pricing_breakdown' => $body['pricing_breakdown'] ?? [],
        'source'            => 'calculator',
        'ip'                => $_SERVER['REMOTE_ADDR'] ?? '',
        'user_agent'        => substr( $_SERVER['HTTP_USER_AGENT'] ?? '', 0, 400 ),
    ];
}

function rg_calc_check_rate_limit( string $ip ): bool {
    $key   = 'rg_calc_rl_' . hash( 'sha256', $ip );
    $count = (int) get_transient( $key );

    if ( $count >= 5 ) return false; // max 5 submissions per hour per IP

    set_transient( $key, $count + 1, HOUR_IN_SECONDS );
    return true;
}
