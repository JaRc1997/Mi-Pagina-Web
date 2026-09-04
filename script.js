// Extrae el ID de un link de YouTube (admite varios formatos)
function getYouTubeID(url) {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
    /v=([^&]+)/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function initYouTubeThumbnails() {
  const featured = document.querySelector('.yt-featured[data-video-url]');
  if (featured) {
    const url   = featured.dataset.videoUrl;
    const id    = getYouTubeID(url);
    const title = featured.dataset.title || '';
    const desc  = featured.dataset.desc  || '';
    if (id) {
      const img = featured.querySelector('.yt-auto-thumb');
      img.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      img.onerror = () => { img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; };
      const link = featured.querySelector('.yt-auto-link');
      if (link) link.href = url;
      const h3 = featured.querySelector('.yt-auto-title');
      if (h3) h3.textContent = title;
      const p = featured.querySelector('.yt-auto-desc');
      if (p) p.textContent = desc;
    }
  }

  document.querySelectorAll('.yt-card[data-video-url]').forEach(card => {
    const url   = card.dataset.videoUrl;
    const id    = getYouTubeID(url);
    const title = card.dataset.title || '';
    if (id) {
      const img = card.querySelector('.yt-auto-thumb');
      if (img) {
        img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      }
      const titleEl = card.querySelector('.yt-auto-title');
      if (titleEl) titleEl.textContent = title;
      // Las tarjetas son enlaces reales: funcionan con teclado y "abrir en pestana nueva"
      card.href = url;
    }
  });
}

initYouTubeThumbnails();

// Toggle de los videos adicionales (el destacado siempre esta visible)
const ytBtn = document.getElementById('ytToggleBtn');
const ytPanel = document.getElementById('ytCollapsible');
if (ytBtn && ytPanel) {
  ytBtn.addEventListener('click', () => {
    const abierto = ytPanel.classList.toggle('open');
    ytBtn.classList.toggle('open', abierto);
    ytBtn.setAttribute('aria-expanded', abierto);
    ytBtn.childNodes[0].textContent = abierto ? 'Ocultar videos ' : 'Ver más videos ';
  });
}

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

// Animaciones al hacer scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Catalogo de productos.
// Para agregar uno nuevo, copia un bloque { } y modifica los campos.
// Categorias validas: audio, movil, video, accesorios.
const PRODUCTOS = [
  {
    imagen: "assets/productos/prod-01.jpg",
    nombre: "Herramientas Multifuncionales",
    cat: "accesorios",
    desc: "Juego de Destornilladores 115 en 1, Herramientas Multifuncionales para Desmontar y Reparar Computadoras, Teléfonos Móviles, Relojes y Relojes de Pulsera, Juego de Herramientas en Caja",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3Cig7hb",
    emoji: "🎧",
    badge: "Nuevo"
  },
  {
    imagen: "assets/productos/prod-02.jpg",
    nombre: "Netac SATA SSD 2TB 4TB 1tb 128gb SSD 480gb 512gb 256gb",
    cat: "accesorios",
    desc: "HD SSD disco duro Hdd unidad interna de estado sólido para ordenador portátil",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3jWkrrX",
    emoji: "🖥️",
    badge: "Nuevo"
  },
  {
    imagen: "assets/productos/prod-03.jpg",
    nombre: "KZ EDX PRO X",
    cat: "audio",
    desc: "Auriculares in-ear Hi-Fi con driver dinámico de 10mm y bajos potentes. Cable desmontable y aislamiento de ruido, ideales para monitorear audio al editar.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4kAf8dL",
    emoji: "🎧",
    badge: "Nuevo"
  },
  {
    imagen: "assets/productos/prod-04.jpg",
    nombre: "Batería Externa Vention de 20000mAh",
    cat: "movil",
    desc: "Batería Externa Vention de 20000mAh, Carga Rápida PD de 65W, Cable Tipo-C Integrado, para iPhone 17 y Portátiles",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3fJpPqt",
    emoji: "📱",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-05.jpg",
    nombre: "Cámara Web 1080P 60FPS USB EMEET S600",
    cat: "video",
    desc: "Cámara Web 4K para Streaming, Cámara Web 1080P 60FPS USB EMEET S600 con Autoenfoque y Micrófonos para Tiktok/YouTube",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3EdkFsd",
    emoji: "📱",
    badge: "Nuevo"
  },
  {
    imagen: "assets/productos/prod-06.jpg",
    nombre: "Soporte de monitor NB F80",
    cat: "accesorios",
    desc: "Brazo articulado con pistón de gas para monitores de 17 a 30 pulgadas. Libera espacio en el escritorio y ajustas altura y ángulo sin esfuerzo.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3zoHnC9",
    emoji: "🖥️",
    badge: ""
  },

  {
    imagen: "assets/productos/prod-07.jpg",
    nombre: "Trípode Ulanzi TT88",
    cat: "movil",
    desc: "Trípode 1.44M para teléfono con palo Selfie, abrazadera magnética y control remoto inalámbrico. Ideal para transmisión en vivo y Vlog.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3DMAipJ",
    emoji: "🎯",
    badge: "Popular"
  },
  {
    imagen: "assets/productos/prod-08.jpg",
    nombre: "Maono T1mini",
    cat: "audio",
    desc: "Micrófono inalámbrico de solapa con cancelación de ruido, corte automático y configuración por app. Perfecto para grabación de audio y video.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4miOBCp",
    emoji: "🎙️",
    badge: "Popular"
  },
  {
    imagen: "assets/productos/prod-09.jpg",
    nombre: "Maono PD100X",
    cat: "video",
    desc: "Micrófono dinámico con reducción de ruido por software y luces RGB. Ideal para grabar, hacer gaming y contenido profesional.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4WxISNR",
    emoji: "🎤",
    badge: "Popular"
  },
  {
    imagen: "assets/productos/prod-10.jpg",
    nombre: "MAONO G1 NEO",
    cat: "audio",
    desc: "Interfaz de audio mezcladora con efectos de sonido personalizados, entrada XLR. Perfecta para podcast, gaming y streams.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4Xdb9w5",
    emoji: "🎚️",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-11.jpg",
    nombre: "Ulanzi D200H",
    cat: "video",
    desc: "Teclado controlador de stream 7 en 1 con 14 teclas LCD para OBS, YouTube y creación de contenido. El compañero perfecto del creador.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3APtmDP",
    emoji: "⌨️",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-12.jpg",
    nombre: "AOCHUAN SmartXE",
    cat: "movil",
    desc: "Estabilizador gimbal portátil de 3 ejes para iPhone y Android con IA de seguimiento facial. Ideal para TikTok y Vlog. Tengo video tutorial en el canal.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3Dzgjs1",
    emoji: "📸",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-13.jpg",
    nombre: "BlitzWolf BW-CML5",
    cat: "video",
    desc: "Barra de luz para monitor con control táctil e inalámbrico, protección ocular, antideslumbrante y 300-1000 Lux.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4XMwJq9",
    emoji: "💡",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-14.jpg",
    nombre: "Ulanzi VL119",
    cat: "video",
    desc: "Barra de luz LED RGB de mano, 2500-9000K, tubo magnético portátil para fotografía, video y Vlog.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3Tdh4vB",
    emoji: "🌈",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-15.jpg",
    nombre: "Ulanzi CR2",
    cat: "accesorios",
    desc: "Lector de tarjetas todo en uno USB 3.1 a 5 Gbps. Ranuras dual TF/SD/SIM/USB-C para laptop y smartphone.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c35pDYIh",
    emoji: "💾",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-16.jpg",
    nombre: "Power Bank Vention 20000mAh 165W",
    cat: "movil",
    desc: "Banco de energía de 20000mAh con carga rápida PD 165W. Compatible con laptop, MacBook, iPhone y Xiaomi.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c2xdQ1fB",
    emoji: "🔋",
    badge: "Popular"
  },
  {
    imagen: "assets/productos/prod-17.jpg",
    nombre: "Power Bank Vention CCC 10000mAh 35W",
    cat: "accesorios",
    desc: "Batería externa mini de 10000mAh con carga rápida 35W. Compatible con iPhone 17, Xiaomi y carga de respaldo.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4TSIQ2D",
    emoji: "⚡",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-18.jpg",
    nombre: "Kit limpieza teclado 9 en 1 Lano",
    cat: "accesorios",
    desc: "Herramienta de limpieza multifuncional 9 en 1 para teclados, laptops y dispositivos electrónicos.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4PmxL1L",
    emoji: "🧹",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-19.jpg",
    nombre: "Mousepad gris gaming",
    cat: "accesorios",
    desc: "Alfombrilla grande overlock XXL para teclado y escritorio. Serie gris, superficie suave y base antideslizante.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c33l4L8Z",
    emoji: "🖱️",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-20.jpg",
    nombre: "Mousepad XXL Strata Liquid",
    cat: "accesorios",
    desc: "Alfombrilla XXL 900x400 blanca y negra estilo Anime. Para teclado completo y mouse, base de escritorio premium.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3rziZwz",
    emoji: "🎨",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-21.jpg",
    nombre: "Fondo verde Chroma Key",
    cat: "accesorios",
    desc: "Telón de fondo blanco/negro/azul/verde para fotografía y video. Pantalla Chroma Key de muselina para estudio.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4FSPa4V",
    emoji: "🟩",
    badge: ""
  },
  {
    imagen: "assets/productos/prod-22.jpg",
    nombre: "Monitor Selfie para teléfono",
    cat: "movil",
    desc: "Pantalla de monitor selfie con montaje magnético inalámbrico, WiFi y Bluetooth. Usa la cámara trasera para mejores selfies y streams.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3ywmYs9",
    emoji: "📱",
    badge: ""
  }

];

// Cuantos productos se muestran antes del boton "Ver todas"
const PRODUCTOS_VISIBLES = 6;
let filtroActual = 'todos';
let mostrarTodos = false;

const ORDEN_BADGE = { nuevo: 0, popular: 1 };
function prioridadBadge(p) {
  const b = (p.badge || '').toLowerCase();
  return b in ORDEN_BADGE ? ORDEN_BADGE[b] : 2;
}

function renderProductos() {
  const grid = document.getElementById('productsGrid');
  const base = filtroActual === 'todos' ? PRODUCTOS : PRODUCTOS.filter(p => p.cat === filtroActual);
  // Orden fijo: primero los nuevos, luego los populares y al final el resto.
  // Dentro de cada grupo se respeta el orden en que estan en la lista.
  const filtered = base.slice().sort((a, b) => prioridadBadge(a) - prioridadBadge(b));
  const lista = mostrarTodos ? filtered : filtered.slice(0, PRODUCTOS_VISIBLES);
  grid.innerHTML = lista.map(p => `
    <a class="product-card" data-cat="${p.cat}" href="${p.link}" target="_blank" rel="noopener noreferrer sponsored">
      <div class="product-img">
        ${p.imagen
          ? `<img class="prod-photo" src="${p.imagen}" alt="${p.nombre}" loading="lazy"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <span class="product-emoji" style="${p.imagen ? 'display:none' : ''}">${p.emoji}</span>
        ${p.badge ? `<span class="product-badge ${p.badge.toLowerCase()==='popular'?'hot':''}">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.nombre}</div>
        ${p.desc ? `<div class="product-desc">${p.desc}</div>` : ''}
        <div class="product-footer">
          ${p.precio ? `<span class="product-price">${p.precio}</span>` : ''}
          <span class="btn-affiliate">Ver en AliExpress</span>
        </div>
      </div>
    </a>
  `).join('');
  // Forzar visibilidad inmediata (evita un bug en moviles con IntersectionObserver)
  grid.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
  });

  // Boton "Ver todas": solo aparece si hay mas productos que el limite
  const btn = document.getElementById('toggleProducts');
  if (btn) {
    const label = btn.querySelector('span');
    const ocultos = filtered.length - PRODUCTOS_VISIBLES;
    btn.style.display = ocultos > 0 ? '' : 'none';
    btn.classList.toggle('open', mostrarTodos);
    btn.setAttribute('aria-expanded', mostrarTodos);
    if (label) {
      label.textContent = mostrarTodos
        ? 'Mostrar menos'
        : `Ver todas las recomendaciones (${filtered.length})`;
    }
  }
}

function initProductos() {
  renderProductos();
  document.querySelectorAll('#productsFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#productsFilter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filtroActual = btn.dataset.filter;
      renderProductos();
    });
  });
  const toggleBtn = document.getElementById('toggleProducts');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      mostrarTodos = !mostrarTodos;
      renderProductos();
      // Al contraer, vuelve al inicio de la seccion para no dejar al usuario perdido
      if (!mostrarTodos) {
        document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductos);
} else {
  initProductos();
}

// El canvas animado de puntos vive en dot-canvas.js para reutilizarlo en todas las paginas
