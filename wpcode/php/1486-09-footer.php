/**
 * ID WPCode: 1486
 * Nombre: 09 footer
 * Tipo: PHP/HTML
 * Estado: Activo
 * Ubicacion/Condicion: Global
 * Notas: Marcado HTML footer + script year/whatsapp

 */

<!--  FOOTER — Hogar San Juan Apóstol | Two-Tiered | WCAG 2.1 AA -->
<footer class="wp-block-template-part footer-hsja" role="contentinfo" aria-label="Pie de página Hogar San Juan Apóstol">
  <div class="footer-top">
    <div class="footer-grid">

      <div class="footer-brand">
        <img
          src="https://hogarsanjuanapostol.cl/wp-content/uploads/2026/07/logo-hogar-blanco.webp"
          alt="Logo Hogar San Juan Apóstol"
          class="footer-logo"
          loading="lazy"
          width="100"
          onerror="this.style.display='none'"
        />
        <p class="footer-nombre">Hogar San Juan Apóstol</p>
        <a href="https://hogarsanjuanapostol.cl/declaracion-accesibilidad"
           class="footer-badge-accesibilidad"
           aria-label="Declaración de accesibilidad WCAG 2.1 nivel AA">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="8" r="1.5" fill="currentColor" stroke="none"/>
            <path d="M9 12h3v5"/><path d="M9 17h6"/>
          </svg>
          WCAG 2.1 AA
        </a>
      </div>

      <nav class="footer-col" aria-label="Páginas principales del sitio">
        <h3>Navegación</h3>
        <ul>
          <li><a href="https://hogarsanjuanapostol.cl/quienes-somos/">Quiénes somos</a></li>
          <li><a href="https://hogarsanjuanapostol.cl/mision/">Misión</a></li>
          <li><a href="https://hogarsanjuanapostol.cl/galeria/">Galería</a></li>
        </ul>
      </nav>

      <nav class="footer-col" aria-label="Transparencia institucional">
        <h3>Transparencia</h3>
        <ul>
          <li><a href="https://hogarsanjuanapostol.cl/colaboradores/">Colaboradores</a></li>
          <li><a href="https://hogarsanjuanapostol.cl/transpariencia-corporativa/">Transparencia corporativa</a></li>
        </ul>
      </nav>

      <nav class="footer-col" aria-label="Información legal y privacidad">
        <h3>Legal</h3>
        <ul>
          <li><a href="https://hogarsanjuanapostol.cl/politica-de-privacidad">Política de Privacidad</a></li>
          <li><a href="https://hogarsanjuanapostol.cl/terminos-y-condiciones">Términos y Condiciones</a></li>
          <li><a href="https://hogarsanjuanapostol.cl/politica-de-cookies">Política de Cookies</a></li>
        </ul>
      </nav>

    </div>
  </div>

  <div class="footer-bottom">
    <div class="footer-bottom-inner">
 <p class="footer-copyright">
        &copy; <span id="footer-year"></span> &mdash; Todos los derechos reservados.
        Diseñado y programado por
        <a id="footer-dev-link"
           href="#"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Contactar a Camila Cortés por WhatsApp">Camila Cortés</a>.
      </p>
    </div>
  </div>
</footer>

<script>
  (function () {
    var y = document.getElementById('footer-year');
    if (y) y.textContent = new Date().getFullYear();

    var link = document.getElementById('footer-dev-link');
    if (link) {
      link.href = 'https://wa.me/56976287963?text='
        + encodeURIComponent('Hola, vi tu trabajo en la web del Hogar San Juan Apóstol y me gustaría cotizar');
    }
  })();
</script>
