/**
 * ID WPCode: 1559
 * Nombre: Eliminar estilos inline items current
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global menu movil
 * Notas: MutationObserver

 */

document.addEventListener('DOMContentLoaded', function () {
    const observer = new MutationObserver(function () {
        const menuOpen = document.querySelector(
            '.wp-block-navigation__responsive-container.is-menu-open'
        );
        if (menuOpen) {
            // Limpiar fondo del ul principal
            menuOpen.querySelectorAll('ul, li, a, span').forEach(function (el) {
                el.style.removeProperty('background');
                el.style.removeProperty('background-color');
                el.style.removeProperty('background-image');
                el.style.removeProperty('color');
                el.style.removeProperty('border');
            });
        }
    });

    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class', 'style']
    });
});