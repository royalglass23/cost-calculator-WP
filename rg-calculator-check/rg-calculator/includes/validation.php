<?php
if (!defined('ABSPATH')) exit;

/**
 * Validate and sanitize a submitted lead array.
 * Returns WP_Error on failure, true on success.
 *
 * @param array $lead Raw lead data from request body.
 * @return true|WP_Error
 */
function rg_validate_lead(array $lead) {
    // Required fields
    $required = ['firstName', 'lastName', 'phone', 'email', 'address'];
    foreach ($required as $field) {
        if (empty(trim($lead[$field] ?? ''))) {
            return new WP_Error('missing_field', "Missing required field: {$field}");
        }
    }

    // Email
    if (!is_email($lead['email'])) {
        return new WP_Error('invalid_email', 'Invalid email address');
    }

    // Phone — allow NZ formats: 021 000 000, +64 21 000 000, 09-000-0000 etc.
    $phone = preg_replace('/[\s\-\(\)]/', '', $lead['phone']);
    if (!preg_match('/^(\+?64)?[2-9]\d{7,9}$/', $phone)) {
        return new WP_Error('invalid_phone', 'Invalid NZ phone number');
    }

    // Consent must be true
    if (empty($lead['consent'])) {
        return new WP_Error('no_consent', 'Consent was not given');
    }

    return true;
}

/**
 * Sanitize a lead array for database storage.
 */
function rg_sanitize_lead(array $lead): array {
    return [
        'firstName'      => sanitize_text_field($lead['firstName']   ?? ''),
        'lastName'       => sanitize_text_field($lead['lastName']    ?? ''),
        'phone'          => sanitize_text_field($lead['phone']       ?? ''),
        'email'          => sanitize_email($lead['email']            ?? ''),
        'address'        => sanitize_text_field($lead['address']     ?? ''),
        'callPreference' => sanitize_text_field($lead['callPreference'] ?? 'anytime'),
        'notes'          => sanitize_textarea_field($lead['notes']   ?? ''),
    ];
}

/**
 * Sanitize answers for storage.
 */
function rg_sanitize_answers(array $answers): array {
    return [
        'projectType'    => sanitize_text_field($answers['projectType']    ?? ''),
        'length'         => (int)   ($answers['length']        ?? 0),
        'height'         => sanitize_text_field($answers['height']         ?? ''),
        'corners'        => (int)   ($answers['corners']       ?? 0),
        'gates'          => (int)   ($answers['gates']         ?? 0),
        'fixingMethod'   => sanitize_text_field($answers['fixingMethod']   ?? ''),
        'hardwareFinish' => sanitize_text_field($answers['hardwareFinish'] ?? ''),
    ];
}

/**
 * Sanitize estimate data for storage.
 */
function rg_sanitize_estimate(array $est): array {
    return [
        'low'                => (float) ($est['low']                ?? 0),
        'high'               => (float) ($est['high']               ?? 0),
        'subtotal'           => (float) ($est['subtotal']           ?? 0),
        'needsConsultation'  => (bool)  ($est['needsConsultation']  ?? false),
        'consultationReasons'=> array_map('sanitize_text_field', (array) ($est['consultationReasons'] ?? [])),
    ];
}
