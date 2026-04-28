<?php
if ( ! defined( 'ABSPATH' ) ) exit;

function rg_calc_send_support_email( int $lead_id, array $data ): bool {
    $to      = get_option( 'admin_email' );
    $subject = sprintf( '[Royal Glass] New Estimate Lead #%d — %s', $lead_id, $data['full_name'] );

    $review_flag = $data['needs_review'] ? '⚠️  NEEDS MANUAL REVIEW' : '✅ Standard lead';
    $reasons     = ! empty( $data['review_reasons'] ) ? implode( ', ', $data['review_reasons'] ) : 'None';
    $estimate    = sprintf( '$%s – $%s (mid $%s)',
        number_format( $data['estimate_low'], 0 ),
        number_format( $data['estimate_high'], 0 ),
        number_format( $data['estimate_mid'], 0 )
    );

    $body = "New estimate request submitted via the Royal Glass calculator.\n\n";
    $body .= "Lead ID:   #{$lead_id}\n";
    $body .= "Status:    {$review_flag}\n";
    $body .= "Reasons:   {$reasons}\n\n";
    $body .= "--- Customer Details ---\n";
    $body .= "Name:      {$data['full_name']}\n";
    $body .= "Email:     {$data['email']}\n";
    $body .= "Phone:     {$data['phone']}\n";
    $body .= "Role:      " . ( $data['role'] ?: 'Not specified' ) . "\n";
    $body .= "Suburb:    " . ( $data['suburb'] ?: 'Not specified' ) . "\n";
    $body .= "Timeframe: " . ( $data['timeframe'] ?: 'Not specified' ) . "\n\n";
    $body .= "--- Estimate ---\n";
    $body .= "Range: {$estimate}\n\n";
    $body .= "--- Next Steps ---\n";
    $body .= "Review this lead in the WordPress admin and mark it Accepted or Rejected.\n";
    $body .= "Do not create a ServiceM8 job until you have reviewed it.\n\n";
    $body .= "This is an automated notification. The lead has been saved to the Royal Glass leads database.\n";

    $headers = [ 'Content-Type: text/plain; charset=UTF-8' ];

    return wp_mail( $to, $subject, $body, $headers );
}
