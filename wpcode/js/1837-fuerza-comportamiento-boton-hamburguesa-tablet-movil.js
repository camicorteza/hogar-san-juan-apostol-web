/**
 * ID WPCode: 1837
 * Nombre: Fuerza comportamiento boton hamburguesa tablet/movil
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global <=1024px

 */

(function() {
    function initHamburguesa() {
        var btn = document.querySelector(
            'nav.wp-block-navigation .wp-block-navigation__responsive-container-open'
        );
        var container = document.querySelector(
            'nav.wp-block-navigation .wp-block-navigation__responsive-container'
        );
        var closeBtn = document.querySelector(
            '.wp-block-navigation__responsive-container-close'
        );

        if (!btn || !container) return;

        var newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            container.classList.add('is-menu-open');
            document.body.classList.add('has-modal-open');
            initChevrons(container);
        }, { passive: false });

        if (closeBtn) {
            var newClose = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newClose, closeBtn);
            newClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                container.classList.remove('is-menu-open');
                document.body.classList.remove('has-modal-open');
            }, { passive: false });
        }

        document.addEventListener('click', function(e) {
            var target = e.target;
            if (!container.contains(target) && !newBtn.contains(target)) {
                container.classList.remove('is-menu-open');
                document.body.classList.remove('has-modal-open');
            }
        });
    }

    function initChevrons(container) {
        var items = container.querySelectorAll('.wp-block-navigation-item.has-child');
        items.forEach(function(item) {
            if (item.dataset.chevronInit) return;
            item.dataset.chevronInit = true;

            var chevron = item.querySelector(
                '.wp-block-navigation__submenu-icon, button.wp-block-navigation-submenu__toggle'
            );
            var submenu = item.querySelector('.wp-block-navigation__submenu-container');

            if (!chevron || !submenu) return;

            var newChevron = chevron.cloneNode(true);
            chevron.parentNode.replaceChild(newChevron, chevron);

            newChevron.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var isOpen = item.classList.contains('is-open');
                /* Cerrar todos los demás */
                items.forEach(function(other) {
                    if (other !== item) {
                        other.classList.remove('is-open');
                    }
                });
                if (isOpen) {
                    item.classList.remove('is-open');
                } else {
                    item.classList.add('is-open');
                }
            }, { passive: false });
        });
    }

    function fixModal() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                if (m.target.classList.contains('abierto')) {
                    m.target.scrollTop = 0;
                }
            });
        });
        var modal = document.getElementById('modal-album');
        if (modal) {
            observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
        }
    }

    function init() {
        initHamburguesa();
        fixModal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    window.addEventListener('load', initHamburguesa);
})();
