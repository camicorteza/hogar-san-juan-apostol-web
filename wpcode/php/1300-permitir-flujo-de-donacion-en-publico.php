/**
 * ID WPCode: 1300
 * Nombre: Permitir flujo de donacion en publico
 * Tipo: PHP
 * Estado: Activo
 * Ubicacion/Condicion: Global (bypass WC Coming Soon)
 * Notas: Critico - no tocar
 *
 */

/**
 * BYPASS COMING SOON WC 9.0+ — Flujo de donación público
 * Usa los hooks correctos del nuevo sistema de Site Visibility
 */

/* ═══════════════════════════════════════════
   Detectar ruta de donación
   ═══════════════════════════════════════════ */
if ( ! function_exists( 'hja_is_donation_route' ) ) {
    function hja_is_donation_route() {
        $url = $_SERVER['REQUEST_URI'] ?? '';
        $donation_id = 392;
        
        // Query params
        if ( isset( $_GET['add-to-cart'] ) && (int) $_GET['add-to-cart'] === $donation_id ) return true;
        if ( isset( $_GET['wpc_nyp'] ) ) return true;
        if ( isset( $_GET['wc-ajax'] ) ) return true;
        
        // URL patterns
        $patterns = [
            'finalizar-compra',
            'checkout',
            'carrito',
            'cart',
            'order-received',
            'add-to-cart',
            'gracias-por-tu-donacion',
            'wc-api',
            'wp-json/wc',
        ];
        
        foreach ( $patterns as $pattern ) {
            if ( stripos( $url, $pattern ) !== false ) return true;
        }
        
        return false;
    }
}

/* ═══════════════════════════════════════════
   HOOK PRINCIPAL WC 9.0+
   El sistema nuevo usa este filtro para decidir
   si la página debe reemplazarse con Coming Soon
   ═══════════════════════════════════════════ */
add_filter( 'woocommerce_coming_soon_exclude', function( $exclude ) {
    if ( hja_is_donation_route() ) {
        return true;
    }
    return $exclude;
}, 1, 1 );

/* ═══════════════════════════════════════════
   HOOK WC 9.0+ alternativo — page controller
   ═══════════════════════════════════════════ */
add_filter( 'woocommerce_coming_soon_get_template', function( $template ) {
    if ( hja_is_donation_route() ) {
        return null; // No template = no bloqueo
    }
    return $template;
}, 1, 1 );

/* ═══════════════════════════════════════════
   HOOK WC 9.0+ — Intercepción en wp hook
   (antes de que el coming soon renderice)
   ═══════════════════════════════════════════ */
add_action( 'wp', function() {
    if ( ! hja_is_donation_route() ) return;
    
    // Remover TODAS las acciones del sistema coming soon
    remove_all_filters( 'woocommerce_coming_soon_exclude' );
    remove_all_actions( 'woocommerce_coming_soon_page' );
    
    // Re-agregar solo el nuestro que excluye
    add_filter( 'woocommerce_coming_soon_exclude', '__return_true', 1 );
    
    // Forzar opción temporal
    add_filter( 'pre_option_woocommerce_coming_soon', '__return_empty_string' );
    add_filter( 'pre_option_woocommerce_store_pages_only', '__return_empty_string' );
}, 1 );

/* ═══════════════════════════════════════════
   NUCLEAR: Desactivar site visibility para esta petición
   ═══════════════════════════════════════════ */
add_action( 'plugins_loaded', function() {
    if ( ! hja_is_donation_route() ) return;
    
    // Intentar desregistrar el módulo de site visibility
    add_filter( 'option_woocommerce_coming_soon', '__return_empty_string', 999 );
    add_filter( 'option_woocommerce_store_pages_only', '__return_empty_string', 999 );
    add_filter( 'option_woocommerce_private_link', '__return_empty_string', 999 );
    
    // Opciones alternativas de nombres
    add_filter( 'option_wc_coming_soon', '__return_false', 999 );
    add_filter( 'option_wc_store_coming_soon', '__return_false', 999 );
}, 1 );

/* ═══════════════════════════════════════════
   Producto 392 siempre visible
   ═══════════════════════════════════════════ */
add_filter( 'woocommerce_product_is_visible', function( $visible, $product_id ) {
    if ( (int) $product_id === 392 ) return true;
    return $visible;
}, 10, 2 );

add_filter( 'woocommerce_product_is_purchasable', function( $purchasable, $product ) {
    if ( $product && (int) $product->get_id() === 392 ) return true;
    return $purchasable;
}, 10, 2 );