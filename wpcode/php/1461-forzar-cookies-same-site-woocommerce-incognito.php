<?php
/**
 * ID WPCode: 1461
 * Nombre: Forzar cookies same-site WooCommerce incognito
 * Tipo: PHP
 * Estado: Activo
 * Ubicacion/Condicion: Global (sesion WC)
 */

// Forzar cookies same-site para WooCommerce en modo incógnito
add_filter('woocommerce_session_expiration', function() {
    return 60 * 60 * 24; // 24 horas
});

add_action('init', function() {
    if (!function_exists('WC') || !WC()->session) return;
    
    // Forzar cookie de sesión como first-party
    if (!WC()->session->has_session()) {
        WC()->session->set_customer_session_cookie(true);
    }
    
    // Configurar cookie same-site
    add_filter('woocommerce_cookie', function($cookie_name) {
        return $cookie_name;
    });
}, 1);

// Forzar SameSite=Lax en la cookie de sesión WC
add_action('send_headers', function() {
    if (headers_sent()) return;
    header_remove('Set-Cookie');
    
    $session_cookie = 'wp_woocommerce_session_' . COOKIEHASH;
    if (isset($_COOKIE[$session_cookie])) {
        setcookie(
            $session_cookie,
            $_COOKIE[$session_cookie],
            [
                'expires'  => time() + 60 * 60 * 24,
                'path'     => '/',
                'domain'   => '',
                'secure'   => true,
                'httponly' => true,
                'samesite' => 'Lax'
            ]
        );
    }
});
