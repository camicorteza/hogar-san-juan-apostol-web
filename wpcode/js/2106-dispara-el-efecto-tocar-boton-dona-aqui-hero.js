/**
 * ID WPCode: 2106
 * Nombre: Dispara el efecto tocar boton dona aqui hero
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global (site_wide_header), efecto touch en boton Dona aqui del hero
 * Notas: Agrega/quita clase al tocar en movil
 */
(function() {
    function init() {
        var btn = document.querySelector('body.home .wp-block-cover.aligncenter.has-parallax .wp-block-button__link');
        if (!btn) return;
        btn.addEventListener('touchstart', function() {
            btn.classList.add('btn-hover-invertido');
        }, { passive: true });
        btn.addEventListener('touchend', function() {
            setTimeout(function() {
                btn.classList.remove('btn-hover-invertido');
            }, 150);
        }, { passive: true });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
