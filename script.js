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
      card.addEventListener('click', () => window.open(url, '_blank'));
    }
  });
}

initYouTubeThumbnails();

// Toggle de la seccion de YouTube
const ytBtn = document.getElementById('ytToggleBtn');
const ytPanel = document.getElementById('ytCollapsible');
if (ytBtn && ytPanel) {
  ytBtn.addEventListener('click', () => {
    ytBtn.classList.toggle('open');
    ytPanel.classList.toggle('open');
    ytBtn.childNodes[0].textContent = ytPanel.classList.contains('open') ? 'Ocultar contenido ' : 'Ver contenido ';
  });
}

// Menu hamburguesa
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
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S8033f0452b014144bf56dbb66fcbcd92G.jpg_220x220q75.jpg_.avif",
    nombre: "Trípode Ulanzi TT88",
    cat: "movil",
    desc: "Trípode 1.44M para teléfono con palo Selfie, abrazadera magnética y control remoto inalámbrico. Ideal para transmisión en vivo y Vlog.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3DMAipJ",
    emoji: "🎯",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Saf71161e1ad14c0cbf58e13244768e058.jpg_220x220q75.jpg_.avif",
    nombre: "Maono T1mini",
    cat: "audio",
    desc: "Micrófono inalámbrico de solapa con cancelación de ruido, corte automático y configuración por app. Perfecto para grabación de audio y video.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4miOBCp",
    emoji: "🎙️",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S34a67cde07964fe391a5234066219bd5E.jpg_220x220q75.jpg_.avif",
    nombre: "Maono PD100X",
    cat: "video",
    desc: "Micrófono dinámico con reducción de ruido por software y luces RGB. Ideal para grabar, hacer gaming y contenido profesional.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4WxISNR",
    emoji: "🎤",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S9ba0ccf875b24180ae53c1078641cf65A.jpg_220x220q75.jpg_.avif",
    nombre: "MAONO G1 NEO",
    cat: "audio",
    desc: "Interfaz de audio mezcladora con efectos de sonido personalizados, entrada XLR. Perfecta para podcast, gaming y streams.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4Xdb9w5",
    emoji: "🎚️",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S08f7c8e1b32d43bc83d09977d280e0341.png_220x220.png_.avif",
    nombre: "Ulanzi D200H",
    cat: "video",
    desc: "Teclado controlador de stream 7 en 1 con 14 teclas LCD para OBS, YouTube y creación de contenido. El compañero perfecto del creador.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3APtmDP",
    emoji: "⌨️",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S82e25f42535a4175b38f843e95a8abeaV.jpg_220x220q75.jpg_.avif",
    nombre: "AOCHUAN SmartXE",
    cat: "movil",
    desc: "Estabilizador gimbal portátil de 3 ejes para iPhone y Android con IA de seguimiento facial. Ideal para TikTok y Vlog.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3Dzgjs1",
    emoji: "📸",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S0543cb41a08244639e28b32945bca00cV.png_220x220.png_.avif",
    nombre: "BlitzWolf BW-CML5",
    cat: "video",
    desc: "Barra de luz para monitor con control táctil e inalámbrico, protección ocular, antideslumbrante y 300-1000 Lux.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4XMwJq9",
    emoji: "💡",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S7406d1dbac254c08a076bcba424b8ef1n.jpg_220x220q75.jpg_.avif",
    nombre: "Ulanzi VL119",
    cat: "video",
    desc: "Barra de luz LED RGB de mano, 2500-9000K, tubo magnético portátil para fotografía, video y Vlog.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3Tdh4vB",
    emoji: "🌈",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S96b9049b40de45fdbd52a46f059371cfy.jpg_220x220q75.jpg_.avif",
    nombre: "Ulanzi CR2",
    cat: "accesorios",
    desc: "Lector de tarjetas todo en uno USB 3.1 a 5 Gbps. Ranuras dual TF/SD/SIM/USB-C para laptop y smartphone.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c35pDYIh",
    emoji: "💾",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Sc994123d4c744c1894d285d743b26647L.jpg_220x220q75.jpg_.avif",
    nombre: "Kit herramientas eléctricas",
    cat: "accesorios",
    desc: "Set de destornilladores eléctricos de precisión con mini brocas inalámbricas recargables. Ideal para reparar celulares y computadores.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4MCxolR",
    emoji: "🔧",
    badge: ""
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Sa259657e87d4403fb8a0a9de8d3ec0de4.jpg?has_lang=1&ver=1_220x220q75.jpg_.avif",
    nombre: "Power Bank Vention 20000mAh 165W",
    cat: "movil",
    desc: "Banco de energía de 20000mAh con carga rápida PD 165W. Compatible con laptop, MacBook, iPhone y Xiaomi.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c2xdQ1fB",
    emoji: "🔋",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Sc10b0c87150b43e7a40bd02306283f76s.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif",
    nombre: "Power Bank Vention CCC 10000mAh 35W",
    cat: "accesorios",
    desc: "Batería externa mini de 10000mAh con carga rápida 35W. Compatible con iPhone 17, Xiaomi y carga de respaldo.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4TSIQ2D",
    emoji: "⚡",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S2dfceed772c64345aaaed3104b4aa632l.jpg_220x220q75.jpg_.avif",
    nombre: "Kit limpieza teclado 9 en 1 Lano",
    cat: "accesorios",
    desc: "Herramienta de limpieza multifuncional 9 en 1 para teclados, laptops y dispositivos electrónicos.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4PmxL1L",
    emoji: "🧹",
    badge: ""
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Saab0deb47a4842a2aff216309ca68c67V.jpg_220x220q75.jpg_.avif",
    nombre: "KZ EDX PRO X",
    cat: "audio",
    desc: "Auriculares de unidad dinámica Hi-Fi con bajos potentes, diseño metálico deportivo y cable desmontable 2PIN.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3Gn9Jlb",
    emoji: "🎧",
    badge: ""
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Sf98c3dbaa34540a99441e48e573c4494U.jpg_220x220q75.jpg_.avif",
    nombre: "Mousepad gris gaming",
    cat: "accesorios",
    desc: "Alfombrilla grande overlock XXL para teclado y escritorio. Serie gris, superficie suave y base antideslizante.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c33l4L8Z",
    emoji: "🖱️",
    badge: ""
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S915053551909492784ee79d15602196dz.jpg?has_lang=1&ver=1_220x220q75.jpg_.avif",
    nombre: "Mousepad XXL Strata Liquid",
    cat: "accesorios",
    desc: "Alfombrilla XXL 900x400 blanca y negra estilo Anime. Para teclado completo y mouse, base de escritorio premium.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3rziZwz",
    emoji: "🎨",
    badge: ""
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Sd7c11eaa2e894c5bb04cd70b1aabf112Q.jpg?has_lang=1&ver=1_220x220q75.jpg_.avif",
    nombre: "Fondo verde Chroma Key",
    cat: "accesorios",
    desc: "Telón de fondo blanco/negro/azul/verde para fotografía y video. Pantalla Chroma Key de muselina para estudio.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c4FSPa4V",
    emoji: "🟩",
    badge: ""
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S0572201b757840cb9925b26d38e4d3029.jpg?has_lang=1&ver=1_220x220q75.jpg_.avif",
    nombre: "Monitor Selfie para teléfono",
    cat: "movil",
    desc: "Pantalla de monitor selfie con montaje magnético inalámbrico, WiFi y Bluetooth. Usa la cámara trasera para mejores selfies y streams.",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3ywmYs9",
    emoji: "📱",
    badge: ""
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Se5f1ab879d3240a1b01eeeffb7e1f1a7J.jpg_220x220q75.jpg_.avif",
    nombre: "Batería Externa Vention de 20000mAh",
    cat: "movil",
    desc: "Batería Externa Vention de 20000mAh, Carga Rápida PD de 65W, Cable Tipo-C Integrado, para iPhone 17 y Portátiles",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3fJpPqt",
    emoji: "📱",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/Sc9b5ab8c08744227955c4afe2f5e8700t.jpg_220x220q75.jpg_.avif",
    nombre: "Cámara Web 1080P 60FPS USB EMEET S600",
    cat: "video",
    desc: "Cámara Web 4K para Streaming, Cámara Web 1080P 60FPS USB EMEET S600 con Autoenfoque y Micrófonos para Tiktok/YouTube",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3EdkFsd",
    emoji: "📱",
    badge: "Nuevo"
  },
  {
    imagen: "https://ae-pic-a1.aliexpress-media.com/kf/S3ac20bdf7b2442c8879c0eca746c9529v.jpg_220x220q75.jpg_.avif",
    nombre: "NB nuevo F80 17-30",
    cat: "accesorios",
    desc: "NB nuevo F80 17-30 2-9kg doble brazo prensa de aire resorte de gas vesa 100x100 monitor soporte de escritorio abrazadera ojal base soporte de escritorio para PC",
    precio: "",
    link: "https://s.click.aliexpress.com/e/_c3zoHnC9",
    emoji: "📱",
    badge: "Nuevo"
  }
];

function renderProductos(filtro = 'todos') {
  const grid = document.getElementById('productsGrid');
  const filtered = filtro === 'todos' ? PRODUCTOS : PRODUCTOS.filter(p => p.cat === filtro);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-cat="${p.cat}">
      <div class="product-img">
        ${p.imagen
          ? `<img class="prod-photo" src="${p.imagen}" alt="${p.nombre}"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <span style="font-size:3.5rem;${p.imagen ? 'display:none' : ''}">${p.emoji}</span>
        ${p.badge ? `<span class="product-badge ${p.badge==='Popular'?'hot':''}">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.nombre}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <span class="product-price">${p.precio}</span>
          <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="btn-affiliate">Ver en AliExpress</a>
        </div>
      </div>
    </div>
  `).join('');
  // Forzar visibilidad inmediata (evita un bug en moviles con IntersectionObserver)
  grid.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
  });
}

function initProductos() {
  renderProductos();
  document.querySelectorAll('#productsFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#productsFilter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProductos(btn.dataset.filter);
    });
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductos);
} else {
  initProductos();
}

// Toggle del panel de productos
const toggleBtn = document.getElementById('toggleProducts');
const productsPanel = document.getElementById('productsCollapse');
if (toggleBtn && productsPanel) {
  const toggleLabel = toggleBtn.querySelector('span');
  toggleBtn.addEventListener('click', () => {
    const isOpen = productsPanel.classList.toggle('open');
    toggleBtn.classList.toggle('open', isOpen);
    toggleLabel.textContent = isOpen ? 'Ocultar recomendaciones' : 'Ver recomendaciones';
  });
}

// El canvas animado de puntos vive en dot-canvas.js para reutilizarlo en todas las paginas
