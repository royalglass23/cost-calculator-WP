<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'admin_menu', 'rg_calc_add_admin_menu' );

function rg_calc_add_admin_menu() {
    add_menu_page(
        'Royal Glass Leads',
        'RG Leads',
        'manage_options',
        'rg-leads',
        'rg_calc_render_admin_page',
        'dashicons-businessman',
        30
    );
}

function rg_calc_render_admin_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'Access denied.' );
    }

    $leads = rg_calc_get_leads( 100, 0 );
    ?>
    <div class="wrap">
        <h1>Royal Glass Estimate Leads</h1>
        <table class="widefat fixed striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Suburb</th>
                    <th>Estimate</th>
                    <th>Review?</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ( $leads as $lead ) : ?>
                <tr>
                    <td><?php echo esc_html( $lead['id'] ); ?></td>
                    <td><?php echo esc_html( $lead['created_at'] ); ?></td>
                    <td><?php echo esc_html( $lead['full_name'] ); ?></td>
                    <td><?php echo esc_html( $lead['phone'] ); ?></td>
                    <td><?php echo esc_html( $lead['email'] ); ?></td>
                    <td><?php echo esc_html( $lead['suburb'] ); ?></td>
                    <td>$<?php echo esc_html( number_format( (float)$lead['estimate_low'], 0 ) ); ?> – $<?php echo esc_html( number_format( (float)$lead['estimate_high'], 0 ) ); ?></td>
                    <td><?php echo $lead['needs_review'] ? '<strong style="color:orange;">Yes</strong>' : 'No'; ?></td>
                    <td><?php echo esc_html( $lead['status'] ); ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}
