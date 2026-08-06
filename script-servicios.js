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
