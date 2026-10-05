<?php
/**
 * ID WPCode: 1106
 * Nombre: menu submenus
 * Tipo: PHP (inyecta JS en wp_footer)
 * Estado: Activo
 * Ubicacion/Condicion: Global, viewport <=1024px (wp_footer)
 */

add_action('wp_footer', function() { ?>
<script>
(function() {
    function initAccordion() {
        if (window.innerWidth > 1024) return;

        var items = document.querySelectorAll(
            '.wp-block-navigation__responsive-container.is-menu-open ' +
            '.wp-block-navigation-item.has-child'
        );

        items.forEach(function(item) {
            // Evitar doble binding
            if (item.dataset.acordeonListo) return;
            item.dataset.acordeonListo = 'true';

            // El botón chevron/toggle (No el enlace)
            var toggle = item.querySelector(
                ':scope > .wp-block-navigation-submenu__toggle, ' +
                ':scope > button.wp-block-navigation__submenu-icon, ' +
                ':scope > .wp-block-navigation__submenu-icon'
            );

            // El enlace principal 
            var link = item.querySelector(
                ':scope > a.wp-block-navigation-item__content'
            );

            function toggleSubmenu(e) {
                e.preventDefault();
                e.stopPropagation();

                var isOpen = item.classList.contains('is-open');

                // Cierra hermanos del mismo nivel
                var siblings = item.parentElement
                    ? item.parentElement.querySelectorAll(
                        ':scope > .wp-block-navigation-item.has-child'
                      )
                    : [];
                siblings.forEach(function(sib) {
                    if (sib !== item) {
                        sib.classList.remove('is-open');
                        sib.dataset.acordeonListo = '';
                    }
                });

                item.classList.toggle('is-open', !isOpen);
            }

            // Solo el chevron abre/cierra el submenú
            if (toggle) {
                toggle.addEventListener('click', toggleSubmenu);
            } else if (link) {
                // Fallback: si no hay chevron separado, el link actúa de toggle
                // pero solo previene navegación si hay submenú
                link.addEventListener('click', function(e) {
                    var sub = item.querySelector(
                        ':scope > .wp-block-navigation__submenu-container'
                    );
                    if (sub) toggleSubmenu(e);
                   
                });
            }
        });
    }

    // Cuando se abre el menú hamburguesa
    document.addEventListener('click', function(e) {
        var openBtn = e.target.closest(
            '.wp-block-navigation__responsive-container-open'
        );
        if (openBtn) {
            setTimeout(initAccordion, 150);
        }
    });

    // Reiniciar si se cierra y vuelve a abrir
    document.addEventListener('click', function(e) {
        var closeBtn = e.target.closest(
            '.wp-block-navigation__responsive-container-close'
        );
        if (closeBtn) {
            
            document.querySelectorAll(
                '.wp-block-navigation-item.has-child[data-acordeon-listo]'
            ).forEach(function(el) {
                el.removeAttribute('data-acordeon-listo');
                el.classList.remove('is-open');
            });
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        if (window.innerWidth <= 1024) initAccordion();
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 1024) initAccordion();
    });
})();
</script>
<?php });
