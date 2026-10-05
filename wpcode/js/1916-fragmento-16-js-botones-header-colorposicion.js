/**
 * ID WPCode: 1916
 * Nombre: Fragmento 16 JS - Botones header color+posicion
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global header desktop
 */

/*Fragmento 16- Botones header: hover + posición */
(function () {
    'use strict';

    function init() {
        var buttons = document.querySelectorAll(
            'header.wp-block-template-part a.wp-block-button__link'
        );

        buttons.forEach(function (a) {
            
            var style = a.getAttribute('style') || '';
            style = style.replace(/background-color\s*:[^;]+;?/gi, '');
            style = style.replace(/\bcolor\s*:[^;]+;?/gi, '');
            style = style.replace(/border\s*:[^;]+;?/gi, '');
            a.setAttribute('style', style.trim());

            /* Hover: agregar/quitar clase .btn-hover */
            a.addEventListener('mouseenter', function () {
                a.classList.add('btn-hover');
            });
            a.addEventListener('mouseleave', function () {
                a.classList.remove('btn-hover');
            });
        });

        /*  Posición derecha solo escritorio sin scroll  */
        if (window.innerWidth > 1024 && !document.body.classList.contains('scrolled')) {
            var headerFirst = document.querySelector(
                'header.wp-block-template-part > div:first-child'
            );
            if (headerFirst) {
                var hStyle = headerFirst.getAttribute('style') || '';
                headerFirst.setAttribute('style', hStyle +
                    ' display: flex !important;' +
                    ' align-items: center !important;' +
                    ' justify-content: space-between !important;' +
                    ' width: 100% !important;' +
                    ' box-sizing: border-box !important;' +
                    ' padding-left: 20px !important;' +
                    ' padding-right: 20px !important;'
                );
            }

            var btns = document.querySelector(
                'header.wp-block-template-part > div:first-child div.wp-block-buttons'
            );
            if (btns) {
                var bStyle = btns.getAttribute('style') || '';
                btns.setAttribute('style', bStyle +
                    ' margin-left: auto !important;' +
                    ' margin-right: 80px !important;' +
                    ' flex-shrink: 0 !important;' +
                    ' display: flex !important;' +
                    ' align-items: center !important;' +
                    ' gap: 8px !important;'
                );
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
