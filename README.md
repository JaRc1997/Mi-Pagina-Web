# JarcOnline — Sitio Web Personal

Sitio web personal de **Javier Rueda** (@jarconline7), creador de contenido enfocado en tecnología, tutoriales, apps y herramientas digitales en español.

## Demo

[jarconline.com](https://jarconline.com)

---

## Páginas

| Página | Descripción |
|---|---|
| `index.html` | Página principal — Hero, About, YouTube, Productos, Redes, Contacto |
| `servicios.html` | Página de servicios — Producción audiovisual y creación de webs |

---

## 🗂️ Estructura del proyecto

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

**Audiovisual**
- Edición de video (DaVinci Resolve)
- Thumbnails / Miniaturas
- Contenido para redes sociales

**Desarrollo web**
- Páginas web personales / portafolio
- Landing pages
- Sitios para creadores de contenido

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
