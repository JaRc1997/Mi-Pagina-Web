/**
 * Mide lo que de verdad importa: cuando alguien intenta contactarte.
 *
 * Antes solo se registraban las descargas de recursos gratis, asi que no
 * habia forma de saber cuanta gente llegaba a la web y escribia por WhatsApp,
 * que es la conversion del negocio. Sin ese dato no se puede juzgar si una
 * pauta funciono: no se distingue "no llego nadie" de "llegaron y no escribieron".
 *
 * Los eventos quedan en Google Analytics. Para verlos:
 * Informes -> Interaccion -> Eventos.
 *
 * No guarda nada del visitante: solo que hubo un clic, desde que pagina y en
 * que boton. Por eso no hace falta tocar la politica de cookies.
 */
(function () {
  'use strict';

  // Si Analytics no cargo (bloqueador, o el visitante rechazo cookies),
  // esto no hace absolutamente nada y la web sigue igual.
  function medir(evento, datos) {
    if (typeof gtag !== 'function') return;
    gtag('event', evento, datos);
  }

  /** Nombre corto de la pagina, para saber desde donde contactan. */
  function pagina() {
    var archivo = location.pathname.split('/').pop() || 'index.html';
    return archivo.replace('.html', '') || 'index';
  }

  /**
   * Texto que identifica el boton pulsado. Sirve para distinguir el WhatsApp
   * del plan Basico del de la Tienda Online, por ejemplo.
   */
  function etiqueta(el) {
    var texto = (el.getAttribute('data-asunto') || el.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
    // Un tile de logo no tiene texto: ahi sirve el alt de la imagen.
    if (!texto) {
      var img = el.querySelector('img');
      texto = ((img && img.alt) || el.getAttribute('title') || '')
        .replace(/\s+/g, ' ')
        .trim();
    }
    return texto.slice(0, 80) || 'sin texto';
  }

  /**
   * Nombre del proyecto al que apunta el enlace. Se busca el titulo de la
   * tarjeta o del caso antes que el texto del enlace, porque "Ver la tienda
   * en vivo" no dice de cual tienda se trata.
   */
  function nombreProyecto(el) {
    var caso = el.closest('.caso-card');
    if (caso) {
      var nom = caso.querySelector('.caso-nombre');
      if (nom) return nom.textContent.replace(/\s+/g, ' ').trim();
    }
    var titulo = el.querySelector('.trabajo-title');
    if (titulo) return titulo.textContent.replace(/\s+/g, ' ').trim();
    return etiqueta(el);
  }

  /** De que seccion de la pagina salio el clic. */
  function seccion(el) {
    var cont = el.closest('section[id]');
    return cont ? cont.id : 'sin seccion';
  }

  document.addEventListener('click', function (e) {
    var enlace = e.target.closest('a');
    if (!enlace) return;

    var href = enlace.getAttribute('href') || '';

    // --- WhatsApp: la conversion principal ---
    if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
      medir('contacto_whatsapp', {
        pagina: pagina(),
        seccion: seccion(enlace),
        boton: etiqueta(enlace)
      });
      return;
    }

    // --- Correo. El href lo arma email-protect.js, asi que se reconoce
    //     por el atributo data-mail, que si esta en el HTML. ---
    if (enlace.hasAttribute('data-mail') || href.indexOf('mailto:') === 0) {
      medir('contacto_email', {
        pagina: pagina(),
        seccion: seccion(enlace),
        boton: etiqueta(enlace)
      });
      return;
    }

    // --- Cuestionario de proyecto. Es la conversion mas valiosa: quien lo
    //     abre viene a contar un proyecto, no a saludar. ---
    if (href.indexOf('forms.gle') !== -1 || href.indexOf('docs.google.com/forms') !== -1) {
      medir('abrir_cuestionario', { pagina: pagina(), seccion: seccion(enlace) });
      return;
    }

    // --- Llamada ---
    if (href.indexOf('tel:') === 0) {
      medir('contacto_llamada', { pagina: pagina(), seccion: seccion(enlace) });
      return;
    }

    // --- Clic a un proyecto de cliente: dice si el portafolio convence ---
    if (enlace.classList.contains('trabajo-card') ||
        enlace.classList.contains('marca-logo') ||
        enlace.classList.contains('caso-link')) {
      medir('ver_proyecto', {
        pagina: pagina(),
        proyecto: nombreProyecto(enlace),
        desde: enlace.classList.contains('marca-logo') ? 'logo'
             : enlace.classList.contains('caso-link') ? 'caso de estudio'
             : 'tarjeta'
      });
    }
  }, { passive: true });
})();
