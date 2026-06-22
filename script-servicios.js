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

// Desfile de testimonios: bucle continuo sin cortes. En el HTML solo hace falta
// escribir cada testimonio una vez; aquí se clona lo necesario para llenar la
// pantalla y para que el punto de reinicio sea invisible.
(function () {
  const track = document.querySelector('.testimonios-track');
  if (!track || track.children.length === 0) return;
  const originales = Array.prototype.slice.call(track.children);

  function agregarClones(nodos) {
    nodos.forEach(function (card) {
      const clon = card.cloneNode(true);
      clon.setAttribute('aria-hidden', 'true');
      track.appendChild(clon);
    });
  }

  // 1) Repite el set hasta que llene el ancho de la pantalla (así nunca se ve un hueco)
  let guardia = 0;
  while (track.scrollWidth < window.innerWidth * 1.15 && guardia < 20) {
    agregarClones(originales);
    guardia++;
  }

  // 2) Duplica todo el bloque: la segunda mitad es idéntica a la primera,
  //    así al reiniciar el salto es invisible (bucle continuo)
  const bloque = Array.prototype.slice.call(track.children);
  agregarClones(bloque);

  // 3) Desplazamiento exacto (en píxeles) = donde empieza la copia del bloque
  const shift = track.children[bloque.length].offsetLeft - track.children[0].offsetLeft;
  const VELOCIDAD = 45; // píxeles por segundo (velocidad constante)
  track.style.setProperty('--marquee-shift', shift + 'px');
  track.style.animationDuration = (shift / VELOCIDAD) + 's';
})();

// Animaciones al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
