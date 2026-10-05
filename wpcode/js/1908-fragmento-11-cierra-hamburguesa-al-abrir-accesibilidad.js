/**
 * ID WPCode: 1908
 * Nombre: Fragmento 11 - Cierra hamburguesa al abrir accesibilidad
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global, <=1024px
 */

/* Fragmento 11- Coordinación menú hamburguesa / panel de accesibilidad */
(function () {
    'use strict';

    var MAX_WIDTH = 1024;

    function isMobileTablet() {
        return window.innerWidth <= MAX_WIDTH;
    }

    /* Cierra el menú hamburguesa */
    function closeHamburgerMenu() {
        if (!isMobileTablet()) return;
        var menuOpen = document.querySelector(
            '.wp-block-navigation__responsive-container.is-menu-open'
        );
        if (!menuOpen) return;
        var closeBtn = menuOpen.querySelector(
            'button.wp-block-navigation__responsive-container-close'
        );
        if (closeBtn) closeBtn.click();
    }

    /* Cierra el panel de accesibilidad */
    function closeAccessibilityPanel() {
        if (!isMobileTablet()) return;
        var container = document.getElementById('wp_access_helper_container');
        if (!container || !container.classList.contains('active')) return;

        /*  botón de cierre interno del panel */
        var closeBtn = container.querySelector('button.close_container.wahout');
        if (closeBtn) { closeBtn.click(); return; }

        /* el botón toggle principal (misma función que abrir/cerrar) */
        var toggleBtn = container.querySelector('button.wahout.aicon_link');
        if (toggleBtn) toggleBtn.click();
    }

    function init() {
        /* panel accesibilidad - cierra hamburguesa*/
        var accessContainer = document.getElementById('wp_access_helper_container');
        if (accessContainer) {
            var accessObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.attributeName === 'class') {
                        if (accessContainer.classList.contains('active')) {
                            closeHamburgerMenu();
                        }
                    }
                });
            });
            accessObserver.observe(accessContainer, { attributes: true });
        }

        /* menú hamburguesa - cierra panel accesibilidad */
        var navContainers = document.querySelectorAll(
            '.wp-block-navigation__responsive-container'
        );
        navContainers.forEach(function (navEl) {
            var navObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.attributeName === 'class') {
                        if (navEl.classList.contains('is-menu-open')) {
                            closeAccessibilityPanel();
                        }
                    }
                });
            });
            navObserver.observe(navEl, { attributes: true });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
