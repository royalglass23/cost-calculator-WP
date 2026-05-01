<?php
if (!defined('ABSPATH')) exit;

add_action('admin_menu', 'rg_admin_pricing_menu');

function rg_admin_pricing_menu(): void {
    add_menu_page(
        'RG Calculator',
        'RG Calculator',
        'manage_options',
        'rg-calculator',
        'rg_admin_pricing_page',
        'dashicons-calculator',
        56
    );
    add_submenu_page(
        'rg-calculator',
        'Pricing Settings',
        'Pricing',
        'manage_options',
        'rg-calculator',
        'rg_admin_pricing_page'
    );
}

function rg_admin_pricing_page(): void {
    if (!current_user_can('manage_options')) return;

    // Save
    if (isset($_POST['rg_pricing_nonce']) && wp_verify_nonce($_POST['rg_pricing_nonce'], 'rg_save_pricing')) {
        $saved = [
            'ratePerMetre'               => (float) ($_POST['ratePerMetre']              ?? 500),
            'minimumLength'              => (int)   ($_POST['minimumLength']             ?? 5),
            'gatePrice'                  => (float) ($_POST['gatePrice']                ?? 1100),
            'cornerSurcharge'            => (float) ($_POST['cornerSurcharge']           ?? 150),
            'hardwareSurchargePerMetre'  => (float) ($_POST['hardwareSurchargePerMetre'] ?? 50),
            'hardwareMinimumSurcharge'   => (float) ($_POST['hardwareMinimumSurcharge']  ?? 250),
            'rangeLowPercent'            => (int)   ($_POST['rangeLowPercent']           ?? 90),
            'rangeHighPercent'           => (int)   ($_POST['rangeHighPercent']          ?? 120),
        ];
        update_option('rg_calculator_pricing', $saved);
        echo '<div class="notice notice-success is-dismissible"><p>Pricing saved.</p></div>';
    }

    $defaults = [
        'ratePerMetre'               => 500,
        'minimumLength'              => 5,
        'gatePrice'                  => 1100,
        'cornerSurcharge'            => 150,
        'hardwareSurchargePerMetre'  => 50,
        'hardwareMinimumSurcharge'   => 250,
        'rangeLowPercent'            => 90,
        'rangeHighPercent'           => 120,
    ];
    $p = array_merge($defaults, get_option('rg_calculator_pricing', []));

    ?>
    <div class="wrap">
        <h1>RG Calculator — Pricing Settings</h1>
        <p style="color:#666">Changes here take effect immediately — no rebuild required. All prices are in NZD, excluding GST.</p>

        <form method="post" action="">
            <?php wp_nonce_field('rg_save_pricing', 'rg_pricing_nonce'); ?>

            <table class="form-table" style="max-width:640px">
                <tbody>
                <?php
                $rows = [
                    ['ratePerMetre',               'Base rate per linear metre ($)',       'The main rate charged per metre of glass run. Applied to both pool fence and balustrade.',        '$500'],
                    ['minimumLength',              'Minimum chargeable metres',            'Jobs shorter than this are still charged as if they were this length.',                           '5'],
                    ['gatePrice',                  'Gate price — per gate ($)',            'Full price per gate, including self-closing hinges and latch hardware.',                         '$1,100'],
                    ['cornerSurcharge',            'Corner surcharge — per corner ($)',    'Added for each 90° corner in the glass run. Non-standard angles are quoted separately.',         '$150'],
                    ['hardwareSurchargePerMetre',  'Non-standard hardware — per metre ($)','Charged when finish is matte black, brushed chrome, or brass. Not applied for standard chrome.', '$50'],
                    ['hardwareMinimumSurcharge',   'Non-standard hardware — minimum ($)',  'Minimum hardware surcharge even for short runs.',                                               '$250'],
                    ['rangeLowPercent',            'Estimate band — low end (%)',          'Estimate lower bound = subtotal × this ÷ 100. E.g. 90 = show –10% from subtotal.',              '90'],
                    ['rangeHighPercent',           'Estimate band — high end (%)',         'Estimate upper bound = subtotal × this ÷ 100. E.g. 120 = show +20% above subtotal.',             '120'],
                ];
                foreach ($rows as [$name, $label, $desc, $placeholder]):
                ?>
                <tr>
                    <th scope="row"><label for="<?= esc_attr($name) ?>"><?= esc_html($label) ?></label></th>
                    <td>
                        <input
                            type="number"
                            id="<?= esc_attr($name) ?>"
                            name="<?= esc_attr($name) ?>"
                            value="<?= esc_attr($p[$name]) ?>"
                            placeholder="<?= esc_attr($placeholder) ?>"
                            step="any"
                            style="width:120px"
                            class="regular-text"
                        >
                        <p class="description"><?= esc_html($desc) ?></p>
                    </td>
                </tr>
                <?php endforeach; ?>
                </tbody>
            </table>

            <h2 style="margin-top:2rem">What each pricing item covers</h2>
            <div style="background:#f9f9f9;border:1px solid #e0e0e0;padding:16px;border-radius:4px;max-width:640px;font-size:13px;line-height:1.7">
                <p><strong>Formula:</strong></p>
                <code style="display:block;background:#fff;padding:12px;border-radius:3px;white-space:pre-wrap">
Estimate = max(length, minimumLength) × ratePerMetre
         + gates × gatePrice
         + corners × cornerSurcharge
         + hardware surcharge (if matte black / brushed / brass)

Range low  = estimate × rangeLowPercent  / 100
Range high = estimate × rangeHighPercent / 100
                </code>
                <p style="margin-top:12px"><strong>Assumptions baked in (not separately priced):</strong><br>
                12mm toughened clear glass · standard shape · ground floor · good substrate condition · timber deck</p>
            </div>

            <?php submit_button('Save pricing', 'primary', 'submit', true, ['style' => 'margin-top:1.5rem']); ?>
        </form>
    </div>
    <?php
}
