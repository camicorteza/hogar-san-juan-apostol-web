/**
 * ID WPCode: 1429
 * Nombre: Corregir URL volver a la donacion en checkout
 * Tipo: PHP
 * Estado: Activo
 * Ubicacion/Condicion: is_checkout()
 * Notas: Filtro + gettext + campos ocultos
 
 */
// Corregir URL "Volver a la donación" en checkout
add_filter('woocommerce_checkout_return_to_cart_redirect', function() {
    return home_url('/index.php/dona-ahora/');
}, 99);
// Textos checkout clásico para donación
add_filter('gettext', function($translated, $original, $domain) {
    if (!is_checkout()) return $translated;
    
    $cambios = [
        'Place order'              => 'Realizar la donación',
        'Realizar el pedido'       => 'Realizar la donación',
        'Return to cart'           => 'Volver a la donación',
        'Volver al carrito'        => 'Volver a la donación',
        'Order summary'            => 'Tu donación',
        'Resumen del pedido'       => 'Tu donación',
        'Billing details'          => 'Información de contacto',
        'Detalles de facturación'  => 'Información de contacto',
        'Additional information'   => 'Nota opcional',
        'Información adicional'    => 'Nota opcional',
        'Your order'               => 'Tu donación',
        'Tu pedido'                => 'Tu donación',
        'Order notes'              => 'Nota',
        'Notas del pedido'         => 'Nota',
        'I have read and agree to the website'  => 'Al proceder con tu donación aceptas',
        'He leído y acepto los'    => 'Al proceder con tu donación aceptas los',
    ];
    
    return $cambios[$original] ?? $translated;
}, 10, 3);

add_action('woocommerce_review_order_before_submit', function() {
    if (!is_checkout()) return;
    ?>
    <a href="/index.php/dona-ahora/" class="volver-donacion">
        ← Volver a la donación
    </a>
    <?php

});

// Ocultar campos innecesarios via PHP
// Campos checkout clásico para donación — nombre, email y celular opcional
add_filter('woocommerce_checkout_fields', function($fields) {
    
    // Mantener visibles: nombre, apellido, email, teléfono
    // Ocultar: dirección, ciudad, región, código postal, país
    $ocultar = [
        'billing_company',
        'billing_address_1',
        'billing_address_2',
        'billing_city',
        'billing_state',
        'billing_postcode',
        'billing_country',
    ];
    
    foreach ($ocultar as $field) {
        if (isset($fields['billing'][$field])) {
            $fields['billing'][$field]['required'] = false;
            unset($fields['billing'][$field]);
        }
    }

    // Teléfono opcional con label personalizado
    if (isset($fields['billing']['billing_phone'])) {
        $fields['billing']['billing_phone']['label']    = 'Celular';
        $fields['billing']['billing_phone']['placeholder'] = 'Ej: +56 9 1234 5678';
        $fields['billing']['billing_phone']['required'] = false;
    }

    // Ocultar sección de envío y notas
    unset($fields['shipping']);
    unset($fields['order']['order_comments']);

    return $fields;
});

// Rellenar campos ocultos automáticamente
add_action('woocommerce_checkout_process', function() {
    if (empty($_POST['billing_address_1'])) $_POST['billing_address_1'] = 'Sin dirección';
    if (empty($_POST['billing_city']))      $_POST['billing_city']      = 'San Clemente';
    if (empty($_POST['billing_state']))     $_POST['billing_state']     = 'Maule';
    if (empty($_POST['billing_postcode']))  $_POST['billing_postcode']  = '3580000';
    if (empty($_POST['billing_country']))   $_POST['billing_country']   = 'CL';
    if (empty($_POST['billing_email']))     $_POST['billing_email']     = 'donante@hogar.cl';
}, 1);
