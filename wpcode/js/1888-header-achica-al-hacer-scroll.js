/**
 * ID WPCode: 1888
 * Nombre: Header achica al hacer scroll
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global
 * Notas: Agrega clase .scrolled
 *
 */
(function() {
    var header = document.querySelector('header.wp-block-template-part');
    if (!header) return;
    var onScroll = function() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
            document.body.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
})();

