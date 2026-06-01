/* ═══════════════════════════════════════════════════════════════════
   JarcOnline — Script de servicios.html
   ═══════════════════════════════════════════════════════════════════ */

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');
if (hamburger && navOverlay) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
  });
  navOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
