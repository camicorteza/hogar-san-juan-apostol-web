<?php
/**
 * ID WPCode: 1599
 * Nombre: Redirigir a pagina de gracias despues de donar
 * Tipo: PHP
 * Estado: Activo
 * Ubicacion/Condicion: order-received endpoint
 */

add_action( 'template_redirect', 'hsja_redirigir_gracias' );
function hsja_redirigir_gracias() {
    if ( ! is_wc_endpoint_url( 'order-received' ) ) return;
    
    $order_id = absint( get_query_var( 'order-received' ) );
    if ( ! $order_id ) return;
    
    $order = wc_get_order( $order_id );
    if ( ! $order ) return;
    
    wp_redirect( home_url( '/index.php/gracias-por-tu-donacion/' ) );
    exit;
}
