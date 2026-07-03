<?php
if (!defined('ABSPATH')) exit;

define('RG_CALCULATOR_RGTOOLS_TARGET_OPTION', 'rg_calculator_rgtools_target');
define('RG_CALCULATOR_DEFAULT_NOTIFY_EMAIL', 'support@royalglass.co.nz');

function rg_rgtools_targets(): array {
    return [
        'development' => [
            'label'      => 'Development',
            'submit_url' => 'https://rgtools-delta.vercel.app/api/lead-intake/calculator-submit',
            'pricing_url' => 'https://rgtools-delta.vercel.app/api/pricing',
        ],
        'production' => [
            'label'      => 'Production',
            'submit_url' => 'https://rgtools.co.nz/api/lead-intake/calculator-submit',
            'pricing_url' => 'https://rgtools.co.nz/api/pricing',
        ],
    ];
}

function rg_sanitize_rgtools_target($target): string {
    $target = sanitize_key((string) $target);
    return array_key_exists($target, rg_rgtools_targets()) ? $target : 'development';
}

function rg_get_rgtools_target(): string {
    $saved = get_option(RG_CALCULATOR_RGTOOLS_TARGET_OPTION, '');
    if ($saved !== '') {
        return rg_sanitize_rgtools_target($saved);
    }

    if (defined('RG_RGTOOLS_ENV') && RG_RGTOOLS_ENV) {
        return rg_sanitize_rgtools_target(RG_RGTOOLS_ENV);
    }

    return 'development';
}

function rg_get_rgtools_submit_url(): string {
    $targets = rg_rgtools_targets();
    $target = rg_get_rgtools_target();
    return esc_url_raw((string) $targets[$target]['submit_url']);
}

function rg_get_rgtools_pricing_url(): string {
    $targets = rg_rgtools_targets();
    $target = rg_get_rgtools_target();
    return esc_url_raw((string) $targets[$target]['pricing_url']);
}

function rg_get_lead_notify_email(): string {
    if (defined('RG_LEAD_NOTIFY_EMAIL') && RG_LEAD_NOTIFY_EMAIL) {
        return sanitize_email((string) RG_LEAD_NOTIFY_EMAIL);
    }

    return RG_CALCULATOR_DEFAULT_NOTIFY_EMAIL;
}

add_action('admin_init', 'rg_register_settings');
function rg_register_settings(): void {
    register_setting(
        'rg_calculator_settings',
        RG_CALCULATOR_RGTOOLS_TARGET_OPTION,
        [
            'type'              => 'string',
            'sanitize_callback' => 'rg_sanitize_rgtools_target',
            'default'           => 'development',
        ]
    );
}

add_action('admin_menu', 'rg_register_settings_menu', 20);
function rg_register_settings_menu(): void {
    add_submenu_page(
        'rg-calculator',
        'Calculator Settings',
        'Settings',
        'manage_options',
        'rg-calculator-settings',
        'rg_admin_settings_page'
    );
}

function rg_admin_settings_page(): void {
    if (!current_user_can('manage_options')) return;

    $current_target = rg_get_rgtools_target();
    $targets = rg_rgtools_targets();
    ?>
    <div class="wrap">
        <h1>Calculator Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('rg_calculator_settings'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row">rgtools target</th>
                    <td>
                        <select name="<?= esc_attr(RG_CALCULATOR_RGTOOLS_TARGET_OPTION) ?>">
                            <?php foreach ($targets as $key => $target): ?>
                                <option value="<?= esc_attr($key) ?>" <?= selected($current_target, $key, false) ?>>
                                    <?= esc_html($target['label']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                        <p class="description">
                            Development sends calculator leads to rgtools-delta.vercel.app. Production sends them to rgtools.co.nz.
                        </p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Active submit URL</th>
                    <td><code><?= esc_html(rg_get_rgtools_submit_url()) ?></code></td>
                </tr>
                <tr>
                    <th scope="row">Active pricing URL</th>
                    <td><code><?= esc_html(rg_get_rgtools_pricing_url()) ?></code></td>
                </tr>
                <tr>
                    <th scope="row">Recovery alert email</th>
                    <td><code><?= esc_html(rg_get_lead_notify_email()) ?></code></td>
                </tr>
            </table>
            <?php submit_button('Save settings'); ?>
        </form>
    </div>
    <?php
}
