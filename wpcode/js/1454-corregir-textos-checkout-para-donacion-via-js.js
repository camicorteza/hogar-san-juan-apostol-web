/**
 * ID WPCode: 1454
 * Nombre: Corregir textos checkout para donacion via JS
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: body.woocommerce-checkout
 * Notas: TreeWalker reemplazo textos
 * Nota: en WPCode este snippet está guardado dentro de <script>…</script>; aquí se muestra sin las etiquetas.
 */

(function() {
    if (!document.body.classList.contains('woocommerce-checkout')) return;
    
    var cambios = [
        ['Realizar el pedido', 'Realizar la donación'],
        ['Volver al carrito', 'Volver a la donación'],
        ['Resumen del pedido', 'Tu donación'],
        ['Al proceder con tu compra', 'Al proceder con tu donación'],
        ['Añade una nota a tu pedido', 'Agregar una nota']
    ];

    function aplicarCambios() {
        var walker = document.createTreeWalker(
            document.body, NodeFilter.SHOW_TEXT, null, false
        );
        var nodo;
        while ((nodo = walker.nextNode())) {
            if (!nodo.nodeValue.trim()) continue;
            var texto = nodo.nodeValue;
            cambios.forEach(function(c) {
                texto = texto.replace(new RegExp(c[0], 'g'), c[1]);
            });
            if (texto !== nodo.nodeValue) nodo.nodeValue = texto;
        }

        // Ocultar dirección de facturación
        document.querySelectorAll(
            '.wp-block-woocommerce-checkout-billing-address-block, ' +
            '[data-block-name="woocommerce/checkout-billing-address-block"]'
        ).forEach(function(el) { el.style.display = 'none'; });

        // Corregir volver a la donación
        document.querySelectorAll(
            'a.wc-block-components-checkout-return-to-cart-button'
        ).forEach(function(btn) {
            btn.href = '/index.php/dona-ahora/';
            btn.onclick = function(e) {
                e.preventDefault();
                window.location.href = '/index.php/dona-ahora/';
            };
        });
    }

    [0, 200, 500, 1000, 2000, 4000].forEach(function(t) {
        setTimeout(aplicarCambios, t);
    });

    new MutationObserver(function() {
        setTimeout(aplicarCambios, 100);
    }).observe(document.body, { childList: true, subtree: true });
})();
