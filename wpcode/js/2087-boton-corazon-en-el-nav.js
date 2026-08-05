/**
 * ID WPCode: 2087
 * Nombre: Boton corazon en el nav
 * Tipo: CSS+JS
 * Estado: Activo
 * Ubicacion/Condicion: Global nav
 * Notas: Inserta boton nuevo via JS
 *
 */

(function() {
    function insertarIcono() {
        // Busca la barra de navegación roja (la que contiene
        // el botón hamburguesa), sin depender de un ID fijo
        var nav = document.querySelector('nav.wp-block-navigation');
        if (!nav) return;

        if (nav.querySelector('.rct-nav-heart-btn')) return; // ya insertado

        nav.style.position = nav.style.position || 'relative';

        var btn = document.createElement('a');
        btn.href = 'https://hogarsanjuanapostol.cl/dona-ahora/';
        btn.className = 'rct-nav-heart-btn';
        btn.setAttribute('aria-label', 'Donar ahora');

        var circle = document.createElement('span');
        circle.className = 'rct-nav-heart-circle';

        var icon = document.createElement('span');
        icon.className = 'rct-nav-heart-icon';

        circle.appendChild(icon);
        btn.appendChild(circle);
        nav.insertBefore(btn, nav.firstChild);
    }

    function init() {
        insertarIcono();
        setTimeout(insertarIcono, 500);
        setTimeout(insertarIcono, 1500);

        var observer = new MutationObserver(function() {
            insertarIcono();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
