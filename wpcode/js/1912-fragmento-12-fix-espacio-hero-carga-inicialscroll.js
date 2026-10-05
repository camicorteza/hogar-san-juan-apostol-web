/**
 * ID WPCode: 1912
 * Nombre: Fragmento 12 - Fix espacio hero carga inicial+scroll
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global
 * Notas: Preload imagen hero + padding dinamico

 */

/* Fragmento 12 -Fix espacio hero: carga inicial + scroll */
(function () {
    'use strict';

    /* Altura real del header según breakpoint y estado */
    function getHeaderHeight(scrolled) {
        var w = window.innerWidth;
        if (w > 1024) return scrolled ? 48 : 130;
        if (w >= 600)  return scrolled ? 36 : 130;
        return null; /* móvil: no tocar */
    }

    function getSiteBlocks() {
        return document.querySelector('.wp-site-blocks');
    }

    function applyPadding() {
        var sb = getSiteBlocks();
        if (!sb) return;
        var scrolled = document.body.classList.contains('scrolled')
                    || window.scrollY > 10;
        var h = getHeaderHeight(scrolled);
        if (h === null) return;
        sb.style.setProperty('padding-top', h + 'px', 'important');
    }

    /* Precarga imagen hero */
    function preloadHeroImage() {
        var urls = [
            'https://hogarsanjuanapostol.cl/wp-content/uploads/2026/03/inicioimagen-1020x1024.webp',
            'https://hogarsanjuanapostol.cl/wp-content/uploads/2026/03/inicioimagen-scaled.webp'
        ];
        urls.forEach(function (url) {
            if (document.querySelector('link[rel="preload"][href="' + url + '"]')) return;
            var link = document.createElement('link');
            link.rel  = 'preload';
            link.as   = 'image';
            link.href = url;
            link.setAttribute('fetchpriority', 'high');
            document.head.insertBefore(link, document.head.firstChild);
        });
    }

    function init() {
        preloadHeroImage();

        /* Aplicar inmediatamente al cargar */
        applyPadding();

        /* Re-aplicar en cada scroll */
        window.addEventListener('scroll', applyPadding, { passive: true });

        /* Re-aplicar si el body cambia de clase (scrolled) */
        var bodyObserver = new MutationObserver(applyPadding);
        bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        /* Re-aplicar al cambiar tamaño de ventana */
        window.addEventListener('resize', applyPadding, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
