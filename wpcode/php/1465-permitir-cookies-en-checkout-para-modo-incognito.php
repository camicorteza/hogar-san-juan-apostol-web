<?php
/**
 * ID WPCode: 1465
 * Nombre: Permitir cookies en checkout para modo incognito
 * Tipo: PHP
 * Estado: Activo
 * Ubicacion/Condicion: is_checkout(), is_cart()
 * Notas: Headers CORS/COOP/COEP
 */

// Permitir cookies en checkout para modo incógnito
add_action('send_headers', function() {
    if (!is_checkout() && !is_cart()) return;
    
    header('Cross-Origin-Opener-Policy: same-origin-allow-popups');
    header('Cross-Origin-Embedder-Policy: unsafe-none');
    
    // Permitir que el store API de WC funcione sin cookies de terceros
    if (!headers_sent()) {
        header('Access-Control-Allow-Origin: ' . home_url());
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }
});

// Forzar cookie de sesión WC como first-party SameSite=Lax
add_action('woocommerce_set_cart_cookies', function($set) {
    if (!$set) return;
    
    $cookie_name  = 'wp_woocommerce_session_' . COOKIEHASH;
    $cookie_value = isset($_COOKIE[$cookie_name]) ? $_COOKIE[$cookie_name] : '';
    
    if ($cookie_value) {
        setcookie($cookie_name, $cookie_value, [
            'expires'  => time() + 172800,
            'path'     => COOKIEPATH,
            'domain'   => COOKIE_DOMAIN,
            'secure'   => is_ssl(),
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
    }
}, 10);
