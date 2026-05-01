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
    $required = ['firstName', 'phone', 'email', 'address'];
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
    $phone = preg_replace('/[\s\-\(\)\.]/', '', (string) ($lead['phone'] ?? ''));
    if (!preg_match('/^(\+64|0)(2\d{7,9}|[3-9]\d{7}|800\d{6,7}|900\d{6,7})$/', $phone)) {
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
        'length'         => (int)   ($answers['length']        ?? $answers['lengthMetres'] ?? 0),
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
        'low'                => (float) ($est['low']                ?? $est['estimate_low'] ?? 0),
        'high'               => (float) ($est['high']               ?? $est['estimate_high'] ?? 0),
        'subtotal'           => (float) ($est['subtotal']           ?? 0),
        'needsConsultation'  => (bool)  ($est['needsConsultation']  ?? false),
        'consultationReasons'=> array_map('sanitize_text_field', (array) ($est['consultationReasons'] ?? [])),
    ];
}

/**
 * Normalize incoming lead payload to canonical keys used by PHP.
 */
function rg_normalize_lead(array $lead): array {
    if (empty($lead['firstName']) && !empty($lead['fullName'])) {
        $full = trim((string) $lead['fullName']);
        $parts = preg_split('/\s+/', $full);
        $lead['firstName'] = $parts[0] ?? '';
        $lead['lastName'] = count($parts) > 1 ? implode(' ', array_slice($parts, 1)) : '';
    }

    if (empty($lead['address']) && !empty($lead['suburb'])) {
        $lead['address'] = $lead['suburb'];
    }

    if (!array_key_exists('websiteUrl', $lead) && array_key_exists('website_url', $lead)) {
        $lead['websiteUrl'] = $lead['website_url'];
    }

    if (!array_key_exists('websiteUrl', $lead) && array_key_exists('website', $lead)) {
        $lead['websiteUrl'] = $lead['website'];
    }

    return $lead;
}

/**
 * Validate calculator answers shape and bounds.
 */
function rg_validate_answers(array $answers) {
    $project_type = sanitize_text_field($answers['projectType'] ?? '');
    if ($project_type === '' || !in_array($project_type, ['balustrade', 'pool_fence'], true)) {
        return new WP_Error('invalid_project_type', 'Invalid project type');
    }

    $length = (int) ($answers['length'] ?? $answers['lengthMetres'] ?? 0);
    if ($length < 1 || $length > 200) {
        return new WP_Error('invalid_length', 'Invalid project length');
    }

    $corners = (int) ($answers['corners'] ?? 0);
    $gates = (int) ($answers['gates'] ?? 0);
    if ($corners < 0 || $corners > 50 || $gates < 0 || $gates > 20) {
        return new WP_Error('invalid_counts', 'Invalid corner or gate count');
    }

    return true;
}
