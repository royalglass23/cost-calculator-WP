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
            'scenarios' => [
                'deck_pool_fence'    => [
                    'ratePerMetre' => (float) ($_POST['rate_deck_pool_fence']    ?? 280),
                    'gatePrice'    => (float) ($_POST['gate_deck_pool_fence']    ?? 680),
                ],
                'balcony_balustrade' => [
                    'ratePerMetre' => (float) ($_POST['rate_balcony_balustrade'] ?? 320),
                    'gatePrice'    => null, // gates not applicable for balustrades
                ],
                'premium_pool_fence' => [
                    'ratePerMetre' => (float) ($_POST['rate_premium_pool_fence'] ?? 380),
                    'gatePrice'    => (float) ($_POST['gate_premium_pool_fence'] ?? 680),
                ],
                'stair_balustrade'   => [
                    'ratePerMetre' => (float) ($_POST['rate_stair_balustrade']   ?? 330),
                    'gatePrice'    => (float) ($_POST['gate_stair_balustrade']   ?? 750),
                ],
            ],
            'minimumLength'           => (int)   ($_POST['minimumLength']           ?? 5),
            'cornerSurcharge'         => (float) ($_POST['cornerSurcharge']         ?? 85),
            'hardwareFinishSurcharge' => [
                'standard_chrome' => 0,
                'matte_black'     => (float) ($_POST['finish_matte_black']     ?? 15),
                'brushed_chrome'  => (float) ($_POST['finish_brushed_chrome']  ?? 12),
                'brass'           => (float) ($_POST['finish_brass']           ?? 22),
                'custom'          => 0,
                'not_sure'        => 0,
            ],
            'rangeLowPercent'  => (int) ($_POST['rangeLowPercent']  ?? 90),
            'rangeHighPercent' => (int) ($_POST['rangeHighPercent'] ?? 120),
        ];
        update_option('rg_calculator_pricing', $saved);
        echo '<div class="notice notice-success is-dismissible"><p>Pricing saved.</p></div>';
    }

    // Load current values
    $defaults = [
        'scenarios' => [
            'deck_pool_fence'    => ['ratePerMetre' => 280, 'gatePrice' => 680],
            'balcony_balustrade' => ['ratePerMetre' => 320, 'gatePrice' => null],
            'premium_pool_fence' => ['ratePerMetre' => 380, 'gatePrice' => 680],
            'stair_balustrade'   => ['ratePerMetre' => 330, 'gatePrice' => 750],
        ],
        'minimumLength'           => 5,
        'cornerSurcharge'         => 85,
        'hardwareFinishSurcharge' => ['standard_chrome' => 0, 'matte_black' => 15, 'brushed_chrome' => 12, 'brass' => 22, 'custom' => 0, 'not_sure' => 0],
        'rangeLowPercent'         => 90,
        'rangeHighPercent'        => 120,
    ];

    $saved_option = get_option('rg_calculator_pricing', []);
    // Only merge if the saved option has the new nested V2 structure
    if (!empty($saved_option['scenarios']) && !empty($saved_option['hardwareFinishSurcharge'])) {
        $p = array_replace_recursive($defaults, $saved_option);
    } else {
        $p = $defaults;
    }

    $sc = $p['scenarios'];
    $hw = $p['hardwareFinishSurcharge'];
    ?>
    <div class="wrap">
        <h1>RG Calculator — Pricing Settings</h1>
        <p style="color:#666">Changes here take effect immediately — no rebuild required. All prices are in NZD, excluding GST.</p>

        <form method="post" action="">
            <?php wp_nonce_field('rg_save_pricing', 'rg_pricing_nonce'); ?>

            <h2>Base Rates &amp; Gate Prices</h2>
            <table class="form-table" style="max-width:700px">
                <thead>
                    <tr>
                        <th>Scenario</th>
                        <th>Base rate ($/m)</th>
                        <th>Gate price ($)</th>
                    </tr>
                </thead>
                <tbody>
                <?php
                $scenario_rows = [
                    ['deck_pool_fence',    'Deck Pool Fence (≤1m)',            true],
                    ['balcony_balustrade', 'Balcony / Patio Balustrade (>1m)', false],
                    ['premium_pool_fence', 'Premium Pool Fence (>1m)',          true],
                    ['stair_balustrade',   'Stair Balustrade',                  true],
                ];
                foreach ($scenario_rows as [$key, $label, $has_gate]):
                    $rate = $sc[$key]['ratePerMetre'] ?? '';
                    $gate = $sc[$key]['gatePrice'] ?? '';
                ?>
                <tr>
                    <td><strong><?= esc_html($label) ?></strong></td>
                    <td>
                        <input type="number" name="rate_<?= esc_attr($key) ?>" value="<?= esc_attr($rate) ?>"
                               step="any" min="0" style="width:100px" class="regular-text">
                    </td>
                    <td>
                        <?php if ($has_gate): ?>
                            <input type="number" name="gate_<?= esc_attr($key) ?>" value="<?= esc_attr($gate) ?>"
                                   step="any" min="0" style="width:100px" class="regular-text">
                        <?php else: ?>
                            <span style="color:#999">N/A — gates not applicable</span>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
                </tbody>
            </table>

            <h2 style="margin-top:2rem">Hardware Finish Surcharges ($/m)</h2>
            <p style="color:#666;font-size:13px">Added per linear metre when a premium finish is selected. Standard Chrome is always free.</p>
            <table class="form-table" style="max-width:500px">
                <tbody>
                <?php
                $finish_rows = [
                    ['matte_black',    'Matte Black',    $hw['matte_black']    ?? 15],
                    ['brushed_chrome', 'Brushed Chrome', $hw['brushed_chrome'] ?? 12],
                    ['brass',          'Brass',          $hw['brass']          ?? 22],
                ];
                foreach ($finish_rows as [$key, $label, $val]):
                ?>
                <tr>
                    <th scope="row"><label for="finish_<?= esc_attr($key) ?>"><?= esc_html($label) ?></label></th>
                    <td>
                        <input type="number" id="finish_<?= esc_attr($key) ?>" name="finish_<?= esc_attr($key) ?>"
                               value="<?= esc_attr($val) ?>" step="any" min="0" style="width:100px" class="regular-text">
                        <span class="description"> $/m</span>
                    </td>
                </tr>
                <?php endforeach; ?>
                </tbody>
            </table>

            <h2 style="margin-top:2rem">Other Settings</h2>
            <table class="form-table" style="max-width:500px">
                <tbody>
                <tr>
                    <th scope="row"><label for="cornerSurcharge">Corner surcharge ($)</label></th>
                    <td>
                        <input type="number" id="cornerSurcharge" name="cornerSurcharge"
                               value="<?= esc_attr($p['cornerSurcharge']) ?>" step="any" min="0" style="width:100px" class="regular-text">
                        <p class="description">Per 90° corner in the glass run.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="minimumLength">Minimum chargeable length (m)</label></th>
                    <td>
                        <input type="number" id="minimumLength" name="minimumLength"
                               value="<?= esc_attr($p['minimumLength']) ?>" step="1" min="1" style="width:100px" class="regular-text">
                        <p class="description">Jobs shorter than this are charged as if they were this length.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="rangeLowPercent">Estimate low band (%)</label></th>
                    <td>
                        <input type="number" id="rangeLowPercent" name="rangeLowPercent"
                               value="<?= esc_attr($p['rangeLowPercent']) ?>" step="1" min="50" max="100" style="width:100px" class="regular-text">
                        <p class="description">Low estimate = subtotal × this ÷ 100. E.g. 90 = –10%.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="rangeHighPercent">Estimate high band (%)</label></th>
                    <td>
                        <input type="number" id="rangeHighPercent" name="rangeHighPercent"
                               value="<?= esc_attr($p['rangeHighPercent']) ?>" step="1" min="100" max="200" style="width:100px" class="regular-text">
                        <p class="description">High estimate = subtotal × this ÷ 100. E.g. 120 = +20%.</p>
                    </td>
                </tr>
                </tbody>
            </table>

            <h2 style="margin-top:2rem">Formula Reference</h2>
            <div style="background:#f9f9f9;border:1px solid #e0e0e0;padding:16px;border-radius:4px;max-width:640px;font-size:13px;line-height:1.7">
                <code style="display:block;background:#fff;padding:12px;border-radius:3px;white-space:pre-wrap">
Billable length  = max(entered length, minimumLength)

Base cost        = billable length × scenario base rate
Corner cost      = number of corners × corner surcharge
Gate cost        = number of gates × scenario gate price
Finish surcharge = billable length × finish surcharge/m

Subtotal         = base + corners + gates + finish
Low estimate     = subtotal × rangeLowPercent  / 100
High estimate    = subtotal × rangeHighPercent / 100
                </code>
                <p style="margin-top:12px;color:#666"><strong>Assumptions baked in:</strong><br>
                Toughened 12mm glass · straight panels · ground-level access · NZ standard height per scenario</p>
            </div>

            <?php submit_button('Save pricing', 'primary', 'submit', true, ['style' => 'margin-top:1.5rem']); ?>
        </form>
    </div>
    <?php
}
