// Protege el correo de los robots que rastrean paginas buscando direcciones para spam.
// La direccion no esta escrita completa en el HTML: se arma aqui al cargar la pagina.
// Para el visitante todo funciona igual, el enlace abre su gestor de correo normalmente.
(function () {
  document.querySelectorAll('[data-mail]').forEach(function (el) {
    var direccion = el.dataset.mail + '@' + el.dataset.dom;
    var asunto = el.dataset.asunto ? '?subject=' + encodeURIComponent(el.dataset.asunto) : '';
    el.setAttribute('href', 'mailto:' + direccion + asunto);
    // Los enlaces marcados con data-mostrar muestran la direccion como texto visible
    if (el.dataset.mostrar === 'si') el.textContent = direccion;
  });
})();
