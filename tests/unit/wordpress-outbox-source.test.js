import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const databasePhp = readFileSync('wordpress-plugin/rg-calculator/includes/database.php', 'utf8');
const apiPhp = readFileSync('wordpress-plugin/rg-calculator/includes/api.php', 'utf8');
const pluginPhp = readFileSync('wordpress-plugin/rg-calculator/rg-calculator.php', 'utf8');
const adminOutboxPhp = readFileSync('wordpress-plugin/rg-calculator/includes/admin-outbox.php', 'utf8');

test('WordPress outbox schema stores failed forwards by submission reference', () => {
  assert.match(databasePhp, /rg_calculator_outbox/);
  assert.match(databasePhp, /submission_ref\s+VARCHAR\(100\)\s+NOT NULL/);
  assert.match(databasePhp, /UNIQUE KEY submission_ref \(submission_ref\)/);
  assert.match(databasePhp, /status\s+VARCHAR\(20\)\s+NOT NULL DEFAULT 'pending'/);
  assert.match(databasePhp, /attempts\s+INT UNSIGNED\s+NOT NULL DEFAULT 0/);
  assert.match(databasePhp, /last_error\s+TEXT\s+NOT NULL DEFAULT ''/);
  assert.match(databasePhp, /next_retry_at\s+DATETIME\s+NULL/);
  assert.match(databasePhp, /alert_sent_at\s+DATETIME\s+NULL/);
});

test('failed rgtools forwards are saved to the outbox without storing Turnstile tokens', () => {
  assert.match(apiPhp, /rg_save_failed_forward_outbox\(/);
  assert.match(apiPhp, /rg_payload_without_turnstile\(\$forward_payload\)/);
  assert.match(apiPhp, /unset\(\$payload\['turnstileToken'\]\)/);
});

test('duplicate failed forwards update the existing outbox row instead of inserting another row', () => {
  assert.match(databasePhp, /SELECT id, attempts FROM \{\$table\} WHERE submission_ref = %s LIMIT 1/);
  assert.match(databasePhp, /\$wpdb->update\(/);
  assert.match(databasePhp, /'attempts'\s*=>\s*\(\(int\) \$existing->attempts\) \+ 1/);
  assert.match(databasePhp, /\$wpdb->insert\(/);
});

test('WordPress schedules bounded retry processing for outbox entries', () => {
  assert.match(pluginPhp, /add_filter\('cron_schedules', 'rg_calc_cron_schedules'\)/);
  assert.match(pluginPhp, /rg_every_five_minutes/);
  assert.match(pluginPhp, /wp_schedule_event\(time\(\) \+ 5 \* MINUTE_IN_SECONDS, 'rg_every_five_minutes', 'rg_calculator_retry_outbox'\)/);
  assert.match(pluginPhp, /add_action\('rg_calculator_retry_outbox', 'rg_retry_failed_forward_outbox_batch'\)/);
  assert.match(pluginPhp, /wp_clear_scheduled_hook\('rg_calculator_retry_outbox'\)/);
});

test('retry processing preserves submissionRef and marks success, failure, and exhaustion states', () => {
  assert.match(databasePhp, /function rg_retry_failed_forward_outbox_batch/);
  assert.match(databasePhp, /\$payload\['submissionRef'\] = rg_normalize_submission_ref\(\$entry->submission_ref\)/);
  assert.match(databasePhp, /rg_submit_lead_to_rgtools\(\$payload\)/);
  assert.match(databasePhp, /rg_mark_forward_outbox_sent\(\(int\) \$entry->id, \(string\) \(\$result\['leadId'\] \?\? ''\)\)/);
  assert.match(databasePhp, /'status'\s*=>\s*\$exhausted \? 'exhausted' : 'failed'/);
  assert.match(databasePhp, /rg_calculator_outbox_retry_delay_seconds\(\$attempts\)/);
  assert.match(databasePhp, /attempts < %d/);
  assert.match(databasePhp, /RG_CALCULATOR_OUTBOX_MAX_ATTEMPTS/);
});

test('admin recovery queue lists outbox entries and triggers the shared manual retry path', () => {
  assert.match(pluginPhp, /includes\/admin-outbox\.php/);
  assert.match(adminOutboxPhp, /add_submenu_page\(/);
  assert.match(adminOutboxPhp, /Recovery Queue/);
  assert.match(adminOutboxPhp, /rg_calculator_outbox/);
  assert.match(adminOutboxPhp, /status = %s/);
  assert.match(adminOutboxPhp, /submission_ref/);
  assert.match(adminOutboxPhp, /rg_outbox_customer_label/);
  assert.match(adminOutboxPhp, /wp_nonce_field\('rg_outbox_retry_' \. \(int\) \$entry->id, 'rg_outbox_nonce'\)/);
  assert.match(adminOutboxPhp, /rg_retry_forward_outbox_entry\(\$entry\)/);
  assert.match(adminOutboxPhp, /rgtools remains the lead workspace/);
});

test('operational logging and exhausted-entry alerts include safe recovery context once', () => {
  assert.match(databasePhp, /function rg_log_calculator_outbox_event/);
  assert.match(databasePhp, /'source'\s*=>\s*'rg-calculator-outbox'/);
  assert.match(databasePhp, /'submissionRef'\s*=>\s*\$submission_ref/);
  assert.match(databasePhp, /'attempts'\s*=>\s*\$attempts/);
  assert.match(databasePhp, /sanitize_text_field\(\$error\)/);
  assert.match(databasePhp, /rg_log_calculator_outbox_event\('initial_forward_failed'/);
  assert.match(databasePhp, /rg_log_calculator_outbox_event\(\s*\$exhausted \? 'retry_exhausted' : 'retry_failed'/);
  assert.match(databasePhp, /empty\(\$entry->alert_sent_at\)/);
  assert.match(databasePhp, /rg_notify_calculator_outbox_attention\(\$entry, \$error\)/);
  assert.match(databasePhp, /wp_mail\(\(string\) RG_LEAD_NOTIFY_EMAIL, \$subject, \$body\)/);
  assert.match(databasePhp, /'alert_sent_at'\s*=>\s*current_time\('mysql', true\)/);
});
