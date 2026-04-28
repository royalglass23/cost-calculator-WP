<?php
/**
 * Plugin Name: Royal Glass Estimate Calculator
 * Description: Balustrade estimate calculator with lead capture for Royal Glass Limited.
 * Version: 1.0.0
 * Author: Royal Glass Limited
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'RG_CALC_VERSION', '1.0.0' );
define( 'RG_CALC_DIR', plugin_dir_path( __FILE__ ) );
define( 'RG_CALC_URL', plugin_dir_url( __FILE__ ) );

require_once RG_CALC_DIR . 'includes/database.php';
require_once RG_CALC_DIR . 'includes/validation.php';
require_once RG_CALC_DIR . 'includes/email.php';
require_once RG_CALC_DIR . 'includes/api.php';
require_once RG_CALC_DIR . 'includes/admin-page.php';

register_activation_hook( __FILE__, 'rg_calc_activate' );

function rg_calc_activate() {
    rg_calc_create_table();
}

add_shortcode( 'rg_calculator', 'rg_calc_render_shortcode' );

function rg_calc_render_shortcode() {
    rg_calc_enqueue_assets();
    return '<div id="rg-calculator-root"></div>';
}

function rg_calc_enqueue_assets() {
    wp_enqueue_style(
        'rg-calculator',
        RG_CALC_URL . 'assets/rg-calculator.css',
        [],
        RG_CALC_VERSION
    );

    wp_enqueue_script(
        'rg-calculator',
        RG_CALC_URL . 'assets/rg-calculator.js',
        [],
        RG_CALC_VERSION,
        true
    );

    wp_localize_script( 'rg-calculator', 'rgCalculator', [
        'endpoint' => rest_url( 'royal-glass/v1/leads' ),
        'nonce'    => wp_create_nonce( 'wp_rest' ),
    ] );
}
