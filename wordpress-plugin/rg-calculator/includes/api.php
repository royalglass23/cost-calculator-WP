<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'rest_api_init', 'rg_calc_register_routes' );

function rg_calc_register_routes() {
    // Public: receive calculator submission
    register_rest_route( 'royal-glass/v1', '/leads', [
        'methods'             => 'POST',
        'callback'            => 'rg_calc_handle_submit',
        'permission_callback' => '__return_true',
    ] );

    // Admin: list leads
    register_rest_route( 'royal-glass/v1', '/leads', [
        'methods'             => 'GET',
        'callback'            => 'rg_calc_handle_list_leads',
        'permission_callback' => function() { return current_user_can( 'manage_options' ); },
    ] );

    // Admin: update lead status
    register_rest_route( 'royal-glass/v1', '/leads/(?P<id>\d+)/status', [
        'methods'             => 'POST',
        'callback'            => 'rg_calc_handle_update_status',
        'permission_callback' => function() { return current_user_can( 'manage_options' ); },
    ] );
}

function rg_calc_handle_submit( WP_REST_Request $request ): WP_REST_Response {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

    // Rate limit check
    if ( ! rg_calc_check_rate_limit( $ip ) ) {
        return new WP_REST_Response( [
            'ok'      => false,
            'message' => 'Too many requests. Please try again later.',
        ], 429 );
    }

    $body = $request->get_json_params();
    if ( empty( $body ) ) {
        return new WP_REST_Response( [ 'ok' => false, 'message' => 'Invalid request.' ], 400 );
    }

    // Validate first
    $errors = rg_calc_validate_payload( $body );
    if ( ! empty( $errors ) ) {
        // Honeypot: return 200 to not reveal the check to bots
        if ( isset( $errors['honeypot'] ) ) {
            return new WP_REST_Response( [ 'ok' => true, 'message' => 'Submitted.' ], 200 );
        }
        return new WP_REST_Response( [
            'ok'      => false,
            'message' => 'Please check the required fields.',
            'errors'  => $errors,
        ], 422 );
    }

    // Sanitize
    $data = rg_calc_sanitize_payload( $body );

    // Save to database — this must happen before email
    $lead_id = rg_calc_insert_lead( $data );
    if ( ! $lead_id ) {
        error_log( 'RG Calc: Failed to save lead. Data: ' . wp_json_encode( $data ) );
        return new WP_REST_Response( [
            'ok'      => false,
            'message' => 'Something went wrong. Please call us directly.',
        ], 500 );
    }

    // Send notification email — non-blocking, failure does not affect response
    rg_calc_send_support_email( $lead_id, $data );

    return new WP_REST_Response( [
        'ok'      => true,
        'leadId'  => $lead_id,
        'message' => 'Your estimate request has been submitted. We will be in touch shortly.',
    ], 200 );
}

function rg_calc_handle_list_leads( WP_REST_Request $request ): WP_REST_Response {
    $leads = rg_calc_get_leads( 50, 0 );
    return new WP_REST_Response( [ 'ok' => true, 'leads' => $leads ], 200 );
}

function rg_calc_handle_update_status( WP_REST_Request $request ): WP_REST_Response {
    check_ajax_referer( 'wp_rest' );

    $id     = (int) $request->get_param( 'id' );
    $status = sanitize_text_field( $request->get_json_params()['status'] ?? '' );

    $ok = rg_calc_update_lead_status( $id, $status );

    return new WP_REST_Response( [
        'ok'      => $ok,
        'message' => $ok ? 'Status updated.' : 'Invalid status or lead not found.',
    ], $ok ? 200 : 422 );
}
