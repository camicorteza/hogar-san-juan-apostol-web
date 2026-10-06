/**
 * ID WPCode: 1268
 * Nombre: Forzar visibilidad de la imagen
 * Tipo: JS
 * Estado: Inactivo
 * Ubicacion/Condicion: Home, cover parallax, movil <=1024px
 * Notas: Parallax imagen hero movil
 */

window.addEventListener('resize', function() {
    if (isMobile()) {
        setupMobile();
    } else {
      
        img.style.removeProperty('position');
        img.style.removeProperty('top');
        img.style.removeProperty('left');
        img.style.removeProperty('width');
        img.style.removeProperty('height');
        img.style.removeProperty('object-fit');
        img.style.removeProperty('object-position');
        img.style.removeProperty('z-index');
        img.style.removeProperty('will-change');
        img.style.removeProperty('opacity');
        img.style.removeProperty('visibility');
        img.style.removeProperty('transform');
    }
});
