<?php
if (!defined('ABSPATH')) exit;

function rg_send_lead_email(int $lead_id, array $lead, array $answers, array $est): void {
    $to      = defined('RG_LEAD_NOTIFY_EMAIL') ? RG_LEAD_NOTIFY_EMAIL : get_option('admin_email');
    $l       = rg_sanitize_lead($lead);
    $a       = rg_sanitize_answers($answers);
    $e       = rg_sanitize_estimate($est);

    $project_labels = ['balustrade' => 'Glass Balustrade', 'pool_fence' => 'Glass Pool Fence'];
    $project        = $project_labels[$a['projectType']] ?? $a['projectType'];
    $name           = "{$l['firstName']} {$l['lastName']}";
    $est_range      = $e['needsConsultation']
        ? 'Pricing on enquiry (consultation needed)'
        : '$' . number_format($e['low'], 0) . ' – $' . number_format($e['high'], 0) . ' excl. GST';

    $subject = "New RG Lead #{$lead_id} — {$project} — {$name}";

    $consult_block = '';
    if ($e['needsConsultation'] && !empty($e['consultationReasons'])) {
        $reasons = array_map(fn($r) => "  • {$r}", $e['consultationReasons']);
        $consult_block = "\n⚠ NEEDS CONSULTATION:\n" . implode("\n", $reasons) . "\n";
    }

    $notes_block = $l['notes'] ? "\nNotes from customer:\n{$l['notes']}\n" : '';

    $body = <<<TEXT
New lead received via the cost calculator.

─── Contact ──────────────────────────────────────
Name:       {$name}
Phone:      {$l['phone']}
Best time:  {$l['callPreference']}
Email:      {$l['email']}
Address:    {$l['address']}

─── Project ──────────────────────────────────────
Type:       {$project}
Length:     {$a['length']}m
Height:     {$a['height']}
Corners:    {$a['corners']}
Gates:      {$a['gates']}
Fixing:     {$a['fixingMethod']}
Finish:     {$a['hardwareFinish']}

─── Estimate ─────────────────────────────────────
Range:      {$est_range}
{$consult_block}{$notes_block}
─── Action ──────────────────────────────────────
View lead in WordPress admin:
{admin_url("admin.php?page=rg-leads&lead={$lead_id}")}

TEXT;

    // Replace admin_url placeholder (can't call admin_url() inside heredoc directly in older PHP)
    $body = str_replace('{admin_url("admin.php?page=rg-leads&lead=' . $lead_id . '")}', admin_url("admin.php?page=rg-leads&lead={$lead_id}"), $body);

    $headers = ['Content-Type: text/plain; charset=UTF-8'];
    wp_mail($to, $subject, $body, $headers);

    // Also send a confirmation to the customer
    rg_send_customer_confirmation($l, $project, $est_range);
}

function rg_send_customer_confirmation(array $l, string $project, string $est_range): void {
    $subject = "Your Royal Glass estimate — {$project}";
    $name    = $l['firstName'];

    $body = <<<TEXT
Hi {$name},

Thanks for using our cost calculator. Your quote request has been received.

Your indicative estimate: {$est_range}

What happens next:
1. Our team will review your details and contact you within 1 business day.
2. We'll arrange a free site visit to take accurate measurements.
3. You'll receive a confirmed, fixed-price quote — no obligation.

Have a question in the meantime? Call us on 0800 769 254 or reply to this email.

Thanks,
Royal Glass Team
https://royalglass.co.nz

──
This is an indicative estimate only. Final pricing is confirmed after our site visit.
TEXT;

    wp_mail($l['email'], $subject, $body, ['Content-Type: text/plain; charset=UTF-8']);
}
