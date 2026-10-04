# JarcOnline — Sitio Web Personal

Sitio web personal de **Javier Rueda** (@jarconline7), creador de contenido enfocado en tecnología, tutoriales, apps y herramientas digitales en español.

## Demo

[jarconline.com](https://jarconline.com)

---

## Páginas

| Página | Descripción |
|---|---|
| `index.html` | Página principal — Hero, About, YouTube, Productos, Redes, Contacto |
| `servicios.html` | Página de servicios — Páginas web y tiendas en línea |

---

## Estructura del proyecto

```
jarconline-web/
├── index.html        # Página principal
├── servicios.html    # Página de servicios
└── assets/
    ├── logo.png      # Logo del canal
    ├── photo.jpg     # Foto personal
    └── ...           # Íconos de servicios
```

---

## Características

- **Sin frameworks** — HTML, CSS y JavaScript vanilla puro
- **Single file** — todo el CSS y JS embebido, sin dependencias externas
- **Canvas animado** — fondo de puntos en movimiento generado con Canvas API
- **Responsive** — adaptado para móvil, tablet y escritorio
- **Menú hamburguesa** — navegación móvil con overlay fullscreen
- **Miniaturas de YouTube automáticas** — extrae thumbnails sin API key
- **Catálogo de productos colapsable** — filtrable por categoría (audio, móvil, video, accesorios)
- **Videos colapsables** — sección YouTube expandible
- **Scroll reveal** — animaciones de entrada con IntersectionObserver
- **Google Analytics** — integrado con GA4
- **WhatsApp flotante** — botón de contacto directo

---

## Stack de diseño

| Elemento | Valor |
|---|---|
| Tipografía títulos | Space Grotesk 700 |
| Tipografía cuerpo | Inter |
| Tipografía código/labels | JetBrains Mono |
| Color fondo | `#0A0A0A` |
| Color acento | `#C8FF00` (lima eléctrico) |
| Color texto | `#EFEFEF` |

---

## Secciones — index.html

- **Hero** — presentación con fondo de puntos animados
- **Sobre mí** — foto, descripción y estadísticas del canal
- **YouTube** — video destacado + grilla de videos recientes
- **Productos** — catálogo con links de afiliado (AliExpress)
- **Redes sociales** — YouTube, Instagram, Facebook, Reddit
- **Contacto** — email y redes para colaboraciones

## Servicios — servicios.html

**Desarrollo web**
- Plan Básico — una sola página
- Plan Estándar — varias páginas con catálogo
- Plan Avanzado — sitio completo sin límites
- Tienda Online — con pasarela de pagos, inventario y envíos

**Marca y web**
- Mantenimiento mensual, SEO, analítica, velocidad, chatbot, identidad de marca

---

## Cómo agregar un recurso

1. Abre `script-recursos.js` y agrega el objeto al array `RECURSOS` (o a
   `PLUGINS` si es un plugin), igual que los que ya están.
2. Doble clic en **`ACTUALIZAR RECURSOS.bat`**.

El segundo paso **no es opcional**. Las tarjetas de `recursos.html` están
escritas en el HTML para que Google pueda leerlas; antes las pintaba
JavaScript y el buscador llegaba a esa página y veía 121 palabras. El `.bat`
las vuelve a escribir desde los datos. Si lo olvidas, el recurso nuevo no
aparece en la web.

No edites las tarjetas a mano dentro de `recursos.html`: están entre los
marcadores `RECURSOS:INICIO` / `RECURSOS:FIN` y el generador las reemplaza
enteras.

---

## Cómo agregar un producto

1. Abre `index.html`
2. Busca el array `PRODUCTOS` en el `<script>`
3. Copia un bloque `{ }` existente y edita los campos:

```javascript
{
  imagen: "URL de la imagen",
  nombre: "Nombre del producto",
  cat: "audio" | "movil" | "video" | "accesorios",
  desc: "Descripción corta",
  precio: "",
  link: "https://link-de-afiliado",
  emoji: "🎯",
  badge: "Nuevo" | "Popular" | ""
}
```

## Cómo cambiar un video de YouTube

1. Busca el elemento con `data-video-url` en el HTML
2. Cambia la URL por cualquier link de YouTube
3. El thumbnail se extrae automáticamente — sin API key

---

## Contacto

- **Email:** Rueda3062@gmail.com
- **YouTube:** [@jarconline7](https://www.youtube.com/@jarconline7)
- **Instagram:** [@javier_rueda77](https://www.instagram.com/javier_rueda77/)
