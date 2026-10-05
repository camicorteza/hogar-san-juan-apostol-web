<?php
/**
 * ID WPCode: 1958
 * Nombre: Precio dinamico donacion REGLA DE ORO
 * Tipo: PHP
 * Estado: Activo
 * Ubicacion/Condicion: Producto 392 / wpc_nyp
 * Notas: CRITICO - no tocar
 */

/**
Captura el monto de la URL (wpc_nyp) y lo fija como precio real
del producto de donación (ID 392) en el carrito.

 */

// Al agregar el producto al carrito: vaciar carrito previo y guardar el monto
add_filter( 'woocommerce_add_cart_item_data', 'hjaDon_guardar_monto_url', 99, 3 );
function hjaDon_guardar_monto_url( $cart_item_data, $product_id, $variation_id ) {
    if ( (int) $product_id === 392 && isset( $_GET['wpc_nyp'] ) && !empty( $_GET['wpc_nyp'] ) ) {
        // Vacia el carrito 
        WC()->cart->empty_cart();

        // Guarda el monto que viene de la caja de donación
        $cart_item_data['monto_donacion_hja'] = floatval( $_GET['wpc_nyp'] );

        // Evita que WooCommerce fusione este ítem con otro igual ya en el carrito
        $cart_item_data['unique_key'] = md5( microtime() . rand() );
    }
    return $cart_item_data;
}

// Al calcular totales: forzar el precio real sobre el precio base ($0)
add_action( 'woocommerce_before_calculate_totals', 'hjaDon_aplicar_precio_final', 99, 1 );
function hjaDon_aplicar_precio_final( $cart ) {
    if ( is_admin() && ! defined( 'DOING_AJAX' ) ) return;

 
    foreach ( $cart->get_cart() as &$cart_item ) {
        if ( isset( $cart_item['monto_donacion_hja'] ) ) {
            $cart_item['data']->set_price( $cart_item['monto_donacion_hja'] );
        }
    }
}
//  Redirige directo al checkout después de agregar la donación
add_filter( 'woocommerce_add_to_cart_redirect', 'hjaDon_redirigir_checkout' );
function hjaDon_redirigir_checkout( $url ) {
    if ( isset( $_GET['wpc_nyp'] ) ) {
        return wc_get_checkout_url();
    }
    return $url;
}
