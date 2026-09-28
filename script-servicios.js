// Si una imagen del servicio falla, muestra el emoji como fallback
document.querySelectorAll('.service-img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const emoji = img.nextElementSibling;
    if (emoji) emoji.classList.add('fallback');
  });
});

// Menu hamburguesa
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');
if (hamburger && navOverlay) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navOverlay.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open'));
    document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
  });
  navOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navOverlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// Carrusel horizontal en bucle continuo (testimonios). Se desplaza solo y además
// se puede arrastrar con el mouse (escritorio) o deslizar con el dedo (móvil).
// El auto-desplazamiento se pausa mientras el usuario interactúa.
function montarCarrusel(marquee, velocidad) {
  if (!marquee) return;
  const track = marquee.querySelector('.testimonios-track');
  if (!track || track.children.length === 0) return;
  const originales = Array.prototype.slice.call(track.children);

  function agregarClones(nodos) {
    nodos.forEach(function (card) {
      const clon = card.cloneNode(true);
      clon.setAttribute('aria-hidden', 'true');
      track.appendChild(clon);
    });
  }

  // Rellena hasta cubrir la pantalla y luego duplica el bloque: así el punto de
  // reinicio es invisible (la segunda mitad es idéntica a la primera).
  let guardia = 0;
  while (track.scrollWidth < marquee.offsetWidth * 2 && guardia < 20) {
    agregarClones(originales);
    guardia++;
  }
  const bloque = Array.prototype.slice.call(track.children);
  agregarClones(bloque);
  const shift = track.children[bloque.length].offsetLeft - track.children[0].offsetLeft;

  const VELOCIDAD = velocidad || 45; // píxeles por segundo
  let auto = true, arrastrando = false, inicioX = 0, inicioScroll = 0, prev = null, reanudar;
  // La posición se lleva en decimal: scrollLeft se redondea a enteros y, como el
  // avance por frame es < 1px, frenaría el auto. Así se mueve suave siempre.
  let pos = 0;

  function bucle(ts) {
    if (prev === null) prev = ts;
    const dt = (ts - prev) / 1000; prev = ts;
    if (auto && !arrastrando) {
      pos += VELOCIDAD * dt;
      if (pos >= shift) pos -= shift;
      marquee.scrollLeft = pos;
    } else {
      // el usuario está moviendo el carrusel: seguimos su posición
      pos = marquee.scrollLeft;
      if (pos >= shift) { pos -= shift; marquee.scrollLeft = pos; }
    }
    requestAnimationFrame(bucle);
  }
  requestAnimationFrame(bucle);

  // Escritorio: pausa al pasar el mouse y permite arrastrar
  marquee.addEventListener('mouseenter', function () { auto = false; });
  marquee.addEventListener('mouseleave', function () { auto = true; arrastrando = false; marquee.classList.remove('arrastrando'); });
  marquee.addEventListener('mousedown', function (e) {
    arrastrando = true; inicioX = e.pageX; inicioScroll = marquee.scrollLeft;
    marquee.classList.add('arrastrando'); e.preventDefault();
  });
  window.addEventListener('mousemove', function (e) {
    if (!arrastrando) return;
    marquee.scrollLeft = inicioScroll - (e.pageX - inicioX);
  });
  window.addEventListener('mouseup', function () {
    if (arrastrando) { arrastrando = false; marquee.classList.remove('arrastrando'); }
  });

  // Móvil: el dedo usa el scroll nativo; pausamos el auto y lo reanudamos al soltar
  marquee.addEventListener('touchstart', function () { auto = false; clearTimeout(reanudar); }, { passive: true });
  marquee.addEventListener('touchend', function () { clearTimeout(reanudar); reanudar = setTimeout(function () { auto = true; }, 2000); }, { passive: true });
}

montarCarrusel(document.querySelector('.testimonios-marquee'), 45);

// Animaciones al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* Casos de estudio en acordeón: solo uno abierto a la vez.
   Así la página no crece aunque se sumen más proyectos. */
(function () {
  const lista = document.querySelector('.casos-lista');
  if (!lista) return;

  // El proyecto entregado mas recientemente va de primero.
  // Basta con ponerle data-entregado a cada caso; el orden del HTML da igual.
  const porFecha = [...lista.querySelectorAll('.caso-card')].sort((a, b) => {
    const fa = a.dataset.entregado || '';
    const fb = b.dataset.entregado || '';
    if (fa === fb) return 0;
    if (!fa) return 1;          // los que no tienen fecha van al final
    if (!fb) return -1;
    return fb.localeCompare(fa);
  });
  porFecha.forEach(c => lista.appendChild(c));

  const tarjetas = lista.querySelectorAll('.caso-card');
  if (!tarjetas.length) return;

  function abrir(tarjeta) {
    const cuerpo = tarjeta.querySelector('.caso-cuerpo');
    const boton = tarjeta.querySelector('.caso-toggle');
    tarjeta.classList.add('is-abierto');
    boton.setAttribute('aria-expanded', 'true');
    cuerpo.style.maxHeight = cuerpo.scrollHeight + 'px';
  }

  function cerrar(tarjeta) {
    const cuerpo = tarjeta.querySelector('.caso-cuerpo');
    const boton = tarjeta.querySelector('.caso-toggle');
    // si no tiene altura fija todavía, la fijamos y forzamos el cálculo
    // para que la transición tenga un punto de partida real
    if (!cuerpo.style.maxHeight.endsWith('px')) {
      cuerpo.style.maxHeight = cuerpo.scrollHeight + 'px';
      void cuerpo.offsetHeight;
    }
    cuerpo.style.maxHeight = '0px';
    tarjeta.classList.remove('is-abierto');
    boton.setAttribute('aria-expanded', 'false');
  }

  tarjetas.forEach(tarjeta => {
    const boton = tarjeta.querySelector('.caso-toggle');
    if (!boton) return;
    boton.addEventListener('click', () => {
      const estaAbierta = tarjeta.classList.contains('is-abierto');
      tarjetas.forEach(otra => { if (otra !== tarjeta) cerrar(otra); });
      estaAbierta ? cerrar(tarjeta) : abrir(tarjeta);
    });
  });

  // La primera arranca abierta.
  // se abre el primero del orden, que es el mas reciente
  abrir(tarjetas[0]);

  // Si cambia el ancho, recalculamos la altura de la que esté abierta.
  let temporizador;
  window.addEventListener('resize', () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      const abierta = document.querySelector('.caso-card.is-abierto');
      if (abierta) {
        const cuerpo = abierta.querySelector('.caso-cuerpo');
        cuerpo.style.maxHeight = 'none';
        const alto = cuerpo.scrollHeight;
        cuerpo.style.maxHeight = alto + 'px';
      }
    }, 150);
  });
})();

/* Carrusel de marcas: con el dedo ya se desliza solo, pero en computador la
   rueda del mouse no mueve una fila horizontal y tampoco se podia arrastrar.
   Esto agrega las dos cosas, y solo cuando de verdad sobran logos: si caben
   todos, la fila se queda quieta y la rueda sigue moviendo la pagina. */
(function () {
  const fila = document.querySelector('.marcas-row');
  if (!fila) return;

  const sobra = () => fila.scrollWidth - fila.clientWidth > 1;

  // Marca la fila cuando hay algo que mover, para el cursor de "agarrar".
  function revisar() { fila.classList.toggle('es-deslizable', sobra()); }
  revisar();
  window.addEventListener('resize', revisar);
  // El ancho de la fila no cambia al sumar un logo (ya esta en su maximo), asi
  // que un ResizeObserver sobre la fila no se entera: hay que mirar los hijos.
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(revisar);
    ro.observe(fila);
    [...fila.children].forEach(c => ro.observe(c));
  }
  if (window.MutationObserver) {
    new MutationObserver(revisar).observe(fila, { childList: true });
  }
  // las imagenes entran tarde y recien ahi la fila toma su ancho real
  fila.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', revisar, { once: true });
  });

  // --- Rueda del mouse: vertical se traduce en horizontal ---
  fila.addEventListener('wheel', e => {
    if (!sobra() || e.ctrlKey) return;
    const giro = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!giro) return;
    const tope = fila.scrollWidth - fila.clientWidth;
    // si ya esta en el borde hacia donde gira la rueda, que siga la pagina
    if ((giro < 0 && fila.scrollLeft <= 0) || (giro > 0 && fila.scrollLeft >= tope - 1)) return;
    e.preventDefault();
    // Avanza un logo entero, no unos pixeles: el iman de posicion devuelve
    // cualquier paso corto al mismo sitio y pareceria que la rueda no hace nada.
    const tile = fila.querySelector('.marca-logo');
    const hueco = parseFloat(getComputedStyle(fila).columnGap) || 0;
    const salto = tile ? tile.getBoundingClientRect().width + hueco : 200;
    // Asignacion directa a proposito: el desplazamiento "smooth" se apoya en la
    // animacion del navegador y se congela cuando la pestana no esta dibujando,
    // igual que pasaba con el acordeon. Instantaneo siempre responde.
    fila.scrollLeft += Math.sign(giro) * salto;
  }, { passive: false });

  // --- Arrastrar con el mouse ---
  // En pantalla tactil no se toca nada: el desplazamiento nativo es mejor.
  let inicioX = 0, inicioScroll = 0, agarrando = false, arrastro = false;

  fila.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !sobra()) return;
    agarrando = true;
    arrastro = false;
    inicioX = e.clientX;
    inicioScroll = fila.scrollLeft;
    fila.classList.add('esta-agarrada');
  });

  fila.addEventListener('pointermove', e => {
    if (!agarrando) return;
    const avance = e.clientX - inicioX;
    // umbral: por debajo de esto es un clic tembloroso, no un arrastre
    if (!arrastro && Math.abs(avance) < 6) return;
    if (!arrastro) {
      arrastro = true;
      fila.setPointerCapture(e.pointerId);
      // mientras se arrastra no queremos el iman, pelean entre si
      fila.style.scrollSnapType = 'none';
    }
    e.preventDefault();
    fila.scrollLeft = inicioScroll - avance;
  });

  function soltar(e) {
    if (!agarrando) return;
    agarrando = false;
    fila.classList.remove('esta-agarrada');
    fila.style.scrollSnapType = '';
    if (arrastro && e && fila.hasPointerCapture && fila.hasPointerCapture(e.pointerId)) {
      fila.releasePointerCapture(e.pointerId);
    }
    // el clic llega despues de soltar: se anula solo si hubo arrastre real,
    // para no abrir el sitio del cliente cuando lo unico que se hizo fue mover
    setTimeout(() => { arrastro = false; }, 0);
  }
  fila.addEventListener('pointerup', soltar);
  fila.addEventListener('pointercancel', soltar);

  fila.addEventListener('click', e => {
    if (arrastro) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // Arrastrar dentro de un <a> dispara el arrastre nativo de imagenes; estorba.
  fila.addEventListener('dragstart', e => { if (sobra()) e.preventDefault(); });
})();
