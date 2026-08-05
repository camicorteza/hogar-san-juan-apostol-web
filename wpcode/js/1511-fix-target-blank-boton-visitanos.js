/**
 * ID WPCode: 1511
 * Nombre: FIX target blank boton Visitanos
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global

 */

document.addEventListener('DOMContentLoaded', function() {

    /* ── Botón "Visitanos" en el header ────────── */
    var headerLinks = document.querySelectorAll(
        'header.wp-block-template-part .wp-block-button__link'
    );
    headerLinks.forEach(function(link) {
        var text = link.textContent || link.innerText || '';
        if (text.toLowerCase().includes('visita')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    /* ── Botón "Visitar" en página Quiénes Somos ─ */
    var allButtons = document.querySelectorAll(
        '.wp-block-button__link, .wp-element-button'
    );
    allButtons.forEach(function(link) {
        var text = link.textContent || link.innerText || '';
        if (
            text.toLowerCase().includes('visitar') ||
            text.toLowerCase().includes('visitanos') ||
            text.toLowerCase().includes('visítanos')
        ) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

});
