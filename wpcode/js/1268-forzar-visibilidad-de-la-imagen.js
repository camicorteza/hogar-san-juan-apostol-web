/**
 * ID WPCode: 1268
 * Nombre: Forzar visibilidad de la imagen
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Home, cover parallax, movil <=1024px
 * Notas: Parallax imagen hero movil
]
 */

(function() {
    var cover = document.querySelector('.wp-block-cover.has-parallax');
    if (!cover) return;
    var img = cover.querySelector('.wp-block-cover__image-background');
    if (!img) return;

    function isMobile() { return window.innerWidth <= 1024; }

    function setupMobile() {
        img.style.setProperty('position', 'absolute', 'important');
        img.style.setProperty('top', '-20%', 'important');
        img.style.setProperty('left', '0', 'important');
        img.style.setProperty('width', '100%', 'important');
        img.style.setProperty('height', '140%', 'important');
        img.style.setProperty('object-fit', 'cover', 'important');
        img.style.setProperty('object-position', 'center center', 'important');
        img.style.setProperty('z-index', '0', 'important');
        img.style.setProperty('will-change', 'transform', 'important');
        img.style.setProperty('opacity', '1', 'important');
        img.style.setProperty('visibility', 'visible', 'important');
        cover.style.setProperty('position', 'relative', 'important');
        cover.style.setProperty('overflow', 'hidden', 'important');
    }

    function scrollParallax() {
        if (!isMobile()) return;
        var rect = cover.getBoundingClientRect();
        var scrolled = -rect.top * 0.3;
        img.style.setProperty('transform', 'translateY(' + scrolled + 'px)', 'important');
    }

    function init() {
        if (isMobile()) {
            setupMobile();
            window.addEventListener('scroll', scrollParallax, { passive: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('resize', function() {
        if (isMobile()) {
            setupMobile();
        } else {
            img.style.cssText = '';
        }
    });
})();