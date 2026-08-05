/**
 * ID WPCode: 1600
 * Nombre: Scroll modo cascada
 * Tipo: JS
 * Estado: Activo
 * Ubicacion/Condicion: Global
 * Notas: Animaciones scroll-reveal .animar
 */

document.addEventListener('DOMContentLoaded', function () {
    const selectores = [
        '.wp-block-post-content > *:not(:first-child)',
        '.wp-site-blocks > .wp-block-cover',
        '.wp-site-blocks > .wp-block-group',
        '.wp-site-blocks > .wp-block-columns',
        '.momento-card',
        '.collage-item',
        '.galeria-titulo',
        '.galeria-subtitulo'
    ].join(', ');

    const elementos = document.querySelectorAll(selectores);

    elementos.forEach((el, i) => {
        el.classList.add('animar');
        el.style.animationDelay = (i * 0.08) + 's';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.10 });

    elementos.forEach(el => observer.observe(el));
});
