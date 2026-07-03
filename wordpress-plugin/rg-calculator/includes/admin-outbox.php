<?php
if (!defined('ABSPATH')) exit;

add_action('admin_menu', 'rg_admin_outbox_menu');

function rg_admin_outbox_menu(): void {
    add_submenu_page(
        'rg-calculator',
        'Recovery Queue',
        'Recovery Queue',
        'manage_options',
        'rg-calculator-outbox',
        'rg_admin_outbox_page'
    );
}

function rg_admin_outbox_page(): void {
    if (!current_user_can('manage_options')) return;

    rg_ensure_outbox_table();

    $notice = rg_handle_admin_outbox_retry();
    $status_filter = sanitize_text_field($_GET['status'] ?? '');
    $allowed_statuses = ['pending', 'failed', 'sent', 'exhausted'];
    if ($status_filter && !in_array($status_filter, $allowed_statuses, true)) {
        $status_filter = '';
    }

    global $wpdb;
    $table = $wpdb->prefix . 'rg_calculator_outbox';
    $where = $status_filter ? $wpdb->prepare('WHERE status = %s', $status_filter) : '';
    $entries = $wpdb->get_results("SELECT * FROM {$table} {$where} ORDER BY updated_at DESC LIMIT 200");
    $counts = $wpdb->get_results("SELECT status, COUNT(*) as c FROM {$table} GROUP BY status");

    $count_map = [];
    foreach ($counts as $row) $count_map[$row->status] = (int) $row->c;
    $total = array_sum($count_map);

    ?>
    <div class="wrap">
        <h1>Calculator Recovery Queue</h1>
        <p style="max-width:760px;color:#555">
            Temporary recovery queue for calculator submissions that could not be forwarded to rgtools.
            Use this only to unblock stuck submissions; rgtools remains the lead workspace.
        </p>

        <?php if ($notice): ?>
            <div class="notice <?= esc_attr($notice['class']) ?> is-dismissible"><p><?= esc_html($notice['message']) ?></p></div>
        <?php endif; ?>

        <ul class="subsubsub">
            <li><a href="?page=rg-calculator-outbox" class="<?= !$status_filter ? 'current' : '' ?>">All <span class="count">(<?= $total ?>)</span></a> |</li>
            <?php foreach ($allowed_statuses as $status): ?>
                <li>
                    <a href="?page=rg-calculator-outbox&status=<?= esc_attr($status) ?>" class="<?= $status_filter === $status ? 'current' : '' ?>">
                        <?= esc_html(ucfirst($status)) ?> <span class="count">(<?= $count_map[$status] ?? 0 ?>)</span>
                    </a> |
                </li>
            <?php endforeach; ?>
        </ul>

        <table class="wp-list-table widefat fixed striped" style="margin-top:1rem">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Submission Ref</th>
                    <th>Customer</th>
                    <th>Attempts</th>
                    <th>Last Error</th>
                    <th>Next Retry</th>
                    <th>Updated</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            <?php if (empty($entries)): ?>
                <tr><td colspan="8" style="text-align:center;padding:2rem;color:#777">No outbox entries.</td></tr>
            <?php else: ?>
                <?php foreach ($entries as $entry): ?>
                    <?php $customer = rg_outbox_customer_label($entry); ?>
                    <tr>
                        <td><strong><?= esc_html($entry->status) ?></strong></td>
                        <td><code><?= esc_html($entry->submission_ref) ?></code></td>
                        <td><?= esc_html($customer) ?></td>
                        <td><?= (int) $entry->attempts ?></td>
                        <td><?= esc_html(wp_trim_words((string) $entry->last_error, 14)) ?></td>
                        <td><?= $entry->next_retry_at ? esc_html(date('d M Y H:i', strtotime($entry->next_retry_at))) : '-' ?></td>
                        <td><?= esc_html(date('d M Y H:i', strtotime($entry->updated_at))) ?></td>
                        <td>
                            <?php if ($entry->status !== 'sent'): ?>
                                <form method="post" action="" style="margin:0">
                                    <?php wp_nonce_field('rg_outbox_retry_' . (int) $entry->id, 'rg_outbox_nonce'); ?>
                                    <input type="hidden" name="rg_outbox_action" value="retry">
                                    <input type="hidden" name="rg_outbox_id" value="<?= (int) $entry->id ?>">
                                    <button type="submit" class="button button-secondary">Retry</button>
                                </form>
                            <?php else: ?>
                                <span style="color:#666">Sent <?= esc_html($entry->rgtools_lead_id ?: '') ?></span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}

function rg_handle_admin_outbox_retry(): ?array {
    if (
        ($_POST['rg_outbox_action'] ?? '') !== 'retry' ||
        empty($_POST['rg_outbox_id']) ||
        empty($_POST['rg_outbox_nonce'])
    ) {
        return null;
    }

    if (!current_user_can('manage_options')) {
        return ['class' => 'notice-error', 'message' => 'You do not have permission to retry outbox entries.'];
    }

    $id = (int) $_POST['rg_outbox_id'];
    if (!wp_verify_nonce((string) $_POST['rg_outbox_nonce'], 'rg_outbox_retry_' . $id)) {
        return ['class' => 'notice-error', 'message' => 'Retry request expired. Please reload and try again.'];
    }

    $entry = rg_get_forward_outbox_entry($id);
    if (!$entry) {
        return ['class' => 'notice-error', 'message' => 'Outbox entry not found.'];
    }

    if ($entry->status === 'sent') {
        return ['class' => 'notice-info', 'message' => 'This outbox entry has already been sent.'];
    }

    $result = rg_retry_forward_outbox_entry($entry);
    if ($result['ok']) {
        return ['class' => 'notice-success', 'message' => 'Outbox entry retried successfully.'];
    }

    return ['class' => 'notice-warning', 'message' => 'Retry failed: ' . (string) ($result['error'] ?? 'retry_failed')];
}

function rg_outbox_customer_label(object $entry): string {
    $payload = json_decode((string) $entry->payload, true);
    if (!is_array($payload) || !is_array($payload['lead'] ?? null)) {
        return 'Unknown customer';
    }

    $lead = $payload['lead'];
    $name = trim((string) ($lead['firstName'] ?? '') . ' ' . (string) ($lead['lastName'] ?? ''));
    $email = sanitize_email($lead['email'] ?? '');
    $phone = sanitize_text_field($lead['phone'] ?? '');
    return implode(' | ', array_filter([$name, $email, $phone])) ?: 'Unknown customer';
}
