// Banner de cookies. Se muestra una sola vez; al aceptar se recuerda en el navegador.
(function () {
  var KEY = 'jarc_cookies_ok';
  try {
    if (localStorage.getItem(KEY) === '1') return;
  } catch (e) {
    return; // si el navegador bloquea el almacenamiento, no mostramos el banner
  }

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML =
    '<p class="cookie-text">' +
      'Usamos cookies de Google Analytics para entender cómo se usa el sitio y mejorarlo. ' +
      'Al seguir navegando aceptas su uso. ' +
      '<a href="privacidad.html">Ver política</a>' +
    '</p>' +
    '<button class="cookie-btn" type="button">Entendido</button>';

  banner.addEventListener('click', function (e) {
    if (e.target.classList.contains('cookie-btn')) {
      try { localStorage.setItem(KEY, '1'); } catch (e) {}
      banner.classList.remove('visible');
      setTimeout(function () { banner.remove(); }, 300);
    }
  });

  function mostrar() {
    document.body.appendChild(banner);
    // pequeño retardo para que la transición de entrada se dispare
    setTimeout(function () { banner.classList.add('visible'); }, 30);
  }

  if (document.body) mostrar();
  else document.addEventListener('DOMContentLoaded', mostrar);
})();
