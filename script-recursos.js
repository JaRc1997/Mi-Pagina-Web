// ----------------------------------------------------------------
// Catalogo de recursos descargables
// Para agregar uno nuevo: copia un bloque { } y modifica los campos.
//
// Campos:
//   nombre     -> nombre que se muestra en la tarjeta
//   categoria  -> 'audio' | 'video' | 'thumbnails'
//   descripcion-> texto corto explicando que es y para que sirve
//   tamano     -> tamano del archivo (texto libre, ej: '1.2 MB')
//   link       -> link de descarga directa de Drive
//   icono      -> emoji por defecto. Se ignora si pones una imagen.
//   imagen     -> ruta de imagen en /assets (opcional). Si la pones, reemplaza al emoji.
//                 Ejemplo: imagen: 'assets/icono-musica.png'
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// Plugins propios (desarrollados por JarcOnline)
// Se muestran en la seccion destacada de arriba y tambien dentro del
// catalogo bajo la categoria 'plugins'. Se escriben UNA sola vez aqui.
//
// Campos:
//   nombre     -> nombre del plugin
//   software   -> para que programa es (ej: 'DaVinci Resolve')
//   sistema    -> sistema operativo (ej: 'Windows')
//   version    -> version actual (ej: 'v1.0')
//   descripcion-> que hace y para que sirve
//   tamano     -> peso del archivo
//   link       -> descarga directa (Google Drive)
//   github     -> repositorio en GitHub (deja '' si no quieres el boton)
//   tutorial   -> video de YouTube explicando como se instala (deja '' si no hay)
//   imagen     -> icono en /assets (opcional)
// ----------------------------------------------------------------
const PLUGINS = [
  {
    nombre: 'Plugin de Zonas Seguras',
    software: 'DaVinci Resolve',
    sistema: 'Windows',
    version: 'v1.0',
    descripcion: 'Coloca las zonas seguras de TikTok, Reels y Shorts directamente en tu linea de tiempo. Deja de adivinar donde va el texto: mira al instante que parte tapa la interfaz de cada red.',
    tamano: 'Por definir',
    link: 'PENDIENTE-LINK-DRIVE',
    github: 'PENDIENTE-LINK-GITHUB',
    tutorial: 'PENDIENTE-LINK-YOUTUBE',
    imagen: 'assets/device-mobile.png'
  },
  {
    nombre: 'Subtitulador TextPlus',
    software: 'DaVinci Resolve',
    sistema: 'Windows',
    version: 'v1.0',
    descripcion: 'Convierte tus subtitulos en capas Text+ editables de forma automatica. Te ahorra horas de trabajo manual y te deja personalizar el estilo de todos los subtitulos de una sola vez.',
    tamano: 'Por definir',
    link: 'PENDIENTE-LINK-DRIVE',
    github: 'PENDIENTE-LINK-GITHUB',
    tutorial: 'PENDIENTE-LINK-YOUTUBE',
    imagen: 'assets/video.png'
  }
];

const RECURSOS = [

  // Audio
  {
    nombre: 'Pack de efectos de sonido',
    categoria: 'audio',
    descripcion: 'Coleccion de 9 efectos sin derechos de autor. Perfectos para transiciones, momentos clave y dar dinamismo a tus videos.',
    tamano: '1.2 MB',
    link: 'https://drive.google.com/uc?export=download&id=1YrA-uwGksTxMaktycnrdTu_wzOT0FOCP',
    icono: '',
    imagen: 'assets/headphones.png'
  },
  {
    nombre: 'Pack de musica de fondo 2026',
    categoria: 'audio',
    descripcion: '44 tracks instrumentales libres de derechos para ambientar tus videos sin riesgo de bloqueos en YouTube.',
    tamano: '98 MB',
    link: 'https://drive.google.com/uc?export=download&id=1x1csBPiHuAnCKsqx9CG8RidqW0FQEMRf',
    icono: '',
    imagen: 'assets/music-notes-plus.png'
  },

  // Video - Zonas seguras
  {
    nombre: 'Zona segura - Facebook Reels',
    categoria: 'video',
    descripcion: 'Plantilla PNG en formato 9:16 que marca el area visible para que el texto no quede tapado por la interfaz de Facebook.',
    tamano: '24 KB',
    link: 'https://drive.google.com/uc?export=download&id=1zQTIRu2XDUQo395Kz_kZ8E8cfbNV_Bfb',
    icono: '📐',
    imagen: 'assets/facebook-logo.png'
  },
  {
    nombre: 'Zona segura - Instagram Reels',
    categoria: 'video',
    descripcion: 'Plantilla PNG en formato 9:16 con los margenes seguros de Instagram para que tu contenido nunca quede oculto.',
    tamano: '24 KB',
    link: 'https://drive.google.com/uc?export=download&id=1sHJeCtqTJH8XNpMjORAlSRMs_bB8XzG4',
    icono: '📐',
    imagen: 'assets/instagram-logo.png'
  },
  {
    nombre: 'Zona segura - TikTok',
    categoria: 'video',
    descripcion: 'Plantilla PNG en formato 9:16 con las zonas seguras de TikTok marcadas para evitar que botones e interfaz tapen tu contenido.',
    tamano: '26 KB',
    link: 'https://drive.google.com/uc?export=download&id=1w8qFtMmbDA0zTQ6SoEggOe1IS__6_xab',
    icono: '📐',
    imagen: 'assets/tiktok-logo.png'
  },
  {
    nombre: 'Zona segura - YouTube Shorts',
    categoria: 'video',
    descripcion: 'Plantilla PNG en formato 9:16 que indica el area visible de YouTube Shorts sin interferencia de la UI.',
    tamano: '28 KB',
    link: 'https://drive.google.com/uc?export=download&id=1dfhk0l8LgBSSuoBxWrYjYyT63Q7Lq6HI',
    icono: '📐',
    imagen: 'assets/youtube-logo.png'
  },

  // Video - Efectos
  {
    nombre: 'Efecto cinta quemada',
    categoria: 'video',
    descripcion: 'Clip overlay con efecto de cinta vieja quemada. Anade textura vintage y retro a tus videos.',
    tamano: '878 KB',
    link: 'https://drive.google.com/uc?export=download&id=1h9J4UUtihTFbH2NiVzOlvO31jmrUhF6c',
    icono: '🎞️',
    imagen: 'assets/film-strip.png'
  },
  {
    nombre: 'Efecto cinta VHS',
    categoria: 'video',
    descripcion: 'Clip overlay con efecto VHS para darle aspecto retro y nostalgico a tus tomas.',
    tamano: '70 KB',
    link: 'https://drive.google.com/uc?export=download&id=1jEW7XJym78CR84tCh1inH73P46MzWgwg',
    icono: '📼',
    imagen: 'assets/cassette-tape.png'
  },
  {
    nombre: 'Efecto cursor del mouse',
    categoria: 'video',
    descripcion: 'Clip overlay con animacion de cursor. Util para tutoriales, demostraciones y videos explicativos.',
    tamano: '298 KB',
    link: 'https://drive.google.com/uc?export=download&id=1479YxXHE3VkByT59TcRfvz-GvJPR7Pgn',
    icono: '🖱️',
    imagen: 'assets/cursor-click.png'
  },
  {
    nombre: 'Efecto sin senal de TV',
    categoria: 'video',
    descripcion: 'Clip overlay con efecto de TV antigua sin senal. Perfecto para transiciones impactantes o intros.',
    tamano: '637 KB',
    link: 'https://drive.google.com/uc?export=download&id=1uhJQWfiod19a89YjGvGkxcdMtbuCOGj4',
    icono: '📺',
    imagen: 'assets/television.png'
  },
  {
    nombre: 'Animacion "Suscribete"',
    categoria: 'video',
    descripcion: 'Clip listo para insertar al final de tus videos invitando a tus espectadores a suscribirse al canal.',
    tamano: '1 MB',
    link: 'https://drive.google.com/uc?export=download&id=1gdmuvVMZ9xi6vxbziYywbNhUWkTD2zQk',
    icono: '🔔',
    imagen: 'assets/bell-ringing.png'
  },

  // Thumbnails
  {
    nombre: 'Plantilla cuadro decorativo',
    categoria: 'thumbnails',
    descripcion: 'Recurso vectorial de un cuadro decorativo para resaltar elementos en tus miniaturas.',
    tamano: '8 KB',
    link: 'https://drive.google.com/uc?export=download&id=18uGeWwNlILmnAvoy7J38p_qkEaF0wQH7',
    icono: '🖼️',
    imagen: 'assets/image.png'
  },
  {
    nombre: 'Mockup iPhone - Setup tech',
    categoria: 'thumbnails',
    descripcion: 'iPhone con pantalla verde (chroma key) sobre fondo de escritorio con luces RGB calidas. Ideal para reviews de apps, tutoriales tech o videos gaming.',
    tamano: '542 KB',
    link: 'https://drive.google.com/uc?export=download&id=1DDJZomkcJ75SzTJTLPfTvQf_7Lu4_stm',
    icono: '📱',
    imagen: 'assets/device-mobile.png'
  },
  {
    nombre: 'Fondo de pantalla',
    categoria: 'thumbnails',
    descripcion: 'Fondo de alta resolucion para usar como base en miniaturas, thumbnails o como wallpaper.',
    tamano: '1.1 MB',
    link: 'https://drive.google.com/uc?export=download&id=1N4s1WiTUNzsEtkqNYBi5l4L5P-scluiq',
    icono: '🌆',
    imagen: 'assets/book-bookmark.png'
  },
  {
    nombre: 'Mockup iPhone - Ciudad neon',
    categoria: 'thumbnails',
    descripcion: 'iPhone con pantalla verde (chroma key) sobre fondo urbano nocturno con neones. Perfecta para apps lifestyle, contenido moderno o estetica cyberpunk.',
    tamano: '868 KB',
    link: 'https://drive.google.com/uc?export=download&id=12PWYJvs9bIz7fhhfvpgk5j_tDhibUXzy',
    icono: '📱',
    imagen: 'assets/device-mobile.png'
  }

];

// Los plugins tambien entran al catalogo de abajo (categoria 'plugins'),
// asi el filtro funciona sin tener que escribirlos dos veces.
PLUGINS.forEach(p => {
  RECURSOS.unshift({
    nombre: p.nombre,
    categoria: 'plugins',
    descripcion: p.descripcion,
    tamano: p.tamano,
    link: p.link,
    icono: '🔌',
    imagen: p.imagen
  });
});

// Pinta la seccion destacada "Mis plugins" (arriba del catalogo)
function renderPlugins() {
  const grid = document.getElementById('pluginsGrid');
  if (!grid) return;

  const iconoGitHub = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>';
  const iconoPlay = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  grid.innerHTML = PLUGINS.map(p => {
    const listo = url => url && !String(url).startsWith('PENDIENTE');
    return `
    <article class="plugin-card">
      <div class="plugin-top">
        <div class="plugin-icon">
          ${p.imagen ? `<img src="${p.imagen}" alt="" class="plugin-img">` : '<span>🔌</span>'}
        </div>
        <span class="plugin-version">${p.version}</span>
      </div>
      <h3 class="plugin-name">${p.nombre}</h3>
      <div class="plugin-meta">
        <span class="plugin-chip">${p.software}</span>
        <span class="plugin-chip">${p.sistema}</span>
      </div>
      <p class="plugin-desc">${p.descripcion}</p>
      <div class="plugin-actions">
        ${listo(p.link)
          ? `<a href="${p.link}" class="btn-download" target="_blank" rel="noopener noreferrer" data-recurso="${p.nombre}" download>Descargar</a>`
          : `<span class="btn-download btn-pronto">Muy pronto</span>`}
        ${listo(p.github)
          ? `<a href="${p.github}" class="btn-plugin-sec" target="_blank" rel="noopener noreferrer">${iconoGitHub} GitHub</a>` : ''}
        ${listo(p.tutorial)
          ? `<a href="${p.tutorial}" class="btn-plugin-sec" target="_blank" rel="noopener noreferrer">${iconoPlay} Tutorial</a>` : ''}
      </div>
    </article>`;
  }).join('');
}

// Pinta una tarjeta del recurso. Si el item tiene imagen, la usa; si no, usa el emoji.
function renderRecursos(filtro = 'todos') {
  const grid = document.getElementById('recursosGrid');
  if (!grid) return;
  const lista = filtro === 'todos' ? RECURSOS : RECURSOS.filter(r => r.categoria === filtro);

  if (lista.length === 0) {
    grid.innerHTML = '<p class="empty-state">No hay recursos en esta categoria todavia.</p>';
    document.getElementById('recursosVerMasWrap')?.classList.remove('activo');
    return;
  }

  grid.innerHTML = lista.map(r => `
    <article class="recurso-card" data-cat="${r.categoria}">
      <div class="recurso-icon">
        ${r.imagen
          ? `<img src="${r.imagen}" alt="${r.nombre}" class="recurso-img">`
          : `<span class="recurso-emoji">${r.icono}</span>`}
      </div>
      <div class="recurso-cat-tag">${r.categoria}</div>
      <h3 class="recurso-name">${r.nombre}</h3>
      <p class="recurso-desc">${r.descripcion}</p>
      <div class="recurso-footer">
        <span class="recurso-size">${r.tamano}</span>
        <a href="${r.link}"
           class="btn-download"
           target="_blank"
           rel="noopener noreferrer"
           data-recurso="${r.nombre}"
           download>
          Descargar
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </a>
      </div>
    </article>
  `).join('');

  // Modo "ver más" (solo afecta en móvil vía CSS): colapsa el grid y muestra
  // el botón si la lista filtrada tiene más de 4 recursos. Se reinicia en cada render.
  const VISIBLES_MOVIL = 4;
  grid.classList.add('colapsado');
  document.getElementById('recursosVerMasWrap')?.classList.toggle('activo', lista.length > VISIBLES_MOVIL);
  const btn = document.getElementById('recursosVerMas');
  if (btn) {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.querySelector('span').textContent = 'Ver más';
  }
}

// Botón "Ver más / Ver menos" del listado de recursos (solo visible en móvil)
function initVerMas() {
  const btn = document.getElementById('recursosVerMas');
  const grid = document.getElementById('recursosGrid');
  if (!btn || !grid) return;
  btn.addEventListener('click', () => {
    const colapsado = grid.classList.toggle('colapsado');
    const abierto = !colapsado;
    btn.classList.toggle('open', abierto);
    btn.setAttribute('aria-expanded', String(abierto));
    btn.querySelector('span').textContent = abierto ? 'Ver menos' : 'Ver más';
    // Al volver a plegar, regresa al inicio del listado para no dejar al usuario perdido
    if (!abierto) document.getElementById('listado').scrollIntoView({ behavior: 'smooth' });
  });
}

function initFiltros() {
  document.querySelectorAll('#recursosFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#recursosFilter .filter-btn')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRecursos(btn.dataset.filter);
    });
  });
}

function initDescargasTracking() {
  // Registra cada descarga en Google Analytics para saber que recurso piden mas
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-download');
    if (!btn) return;
    const nombre = btn.dataset.recurso || 'desconocido';
    if (typeof gtag === 'function') {
      gtag('event', 'descarga_recurso', {
        nombre_recurso: nombre,
        link: btn.href
      });
    }
  });
}

// Menu hamburguesa (igual que en las otras paginas)
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  if (!hamburger || !navOverlay) return;
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

// Animaciones al hacer scroll
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function init() {
  renderPlugins();
  renderRecursos();
  initFiltros();
  initVerMas();
  initDescargasTracking();
  initHamburger();
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
