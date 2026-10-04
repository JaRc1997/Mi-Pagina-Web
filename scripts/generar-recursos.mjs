/**
 * Escribe los recursos como HTML de verdad dentro de recursos.html.
 *
 * Por que existe: las tarjetas las pintaba JavaScript dentro de divs vacios,
 * asi que Google llegaba a la pagina con mas valor del sitio y leia 121
 * palabras. Ahora el HTML sale ya escrito y el JavaScript solo filtra.
 *
 * Como se usa: tu sigues editando los datos en script-recursos.js, igual que
 * siempre. Cuando agregues o cambies un recurso, corres:
 *
 *     node scripts/generar-recursos.mjs
 *
 * (o doble clic en ACTUALIZAR RECURSOS.bat)
 *
 * El script NO inventa nada: solo copia lo que hay en script-recursos.js.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARCHIVO_DATOS = join(RAIZ, 'script-recursos.js');
const ARCHIVO_PAGINA = join(RAIZ, 'recursos.html');

/* ------------------------------------------------------------------ */
/* Leer los datos sin duplicarlos                                       */
/* ------------------------------------------------------------------ */

/**
 * Saca un array literal del archivo de datos y lo evalua.
 * Se lee del mismo archivo que usa el navegador para que no haya dos copias
 * de la lista que se puedan desincronizar.
 */
function leerArray(fuente, nombre) {
  const inicio = fuente.indexOf(`const ${nombre} = [`);
  if (inicio === -1) throw new Error(`No encontre "const ${nombre} = [" en script-recursos.js`);

  // Recorre contando corchetes para hallar el cierre real del array,
  // sin tropezar con los corchetes que aparezcan dentro de los textos.
  const desdeCorchete = fuente.indexOf('[', inicio);
  let nivel = 0, enTexto = null, i = desdeCorchete;
  for (; i < fuente.length; i++) {
    const c = fuente[i], anterior = fuente[i - 1];
    if (enTexto) {
      if (c === enTexto && anterior !== '\\') enTexto = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { enTexto = c; continue; }
    if (c === '[') nivel++;
    else if (c === ']') { nivel--; if (nivel === 0) break; }
  }
  if (nivel !== 0) throw new Error(`El array ${nombre} no cierra bien`);

  const literal = fuente.slice(desdeCorchete, i + 1);
  // eslint-disable-next-line no-new-func
  return new Function(`return ${literal};`)();
}

/* ------------------------------------------------------------------ */
/* Utilidades                                                           */
/* ------------------------------------------------------------------ */

/** Escapa lo que va dentro del HTML. Los datos son nuestros, pero una
 *  comilla o un & en un nombre romperia el atributo sin avisar. */
function esc(texto) {
  return String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const listo = url => url && !String(url).startsWith('PENDIENTE');

/* ------------------------------------------------------------------ */
/* Iconos (los mismos que usaba el JavaScript)                          */
/* ------------------------------------------------------------------ */

const ICONO_GITHUB = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>';
const ICONO_DRIVE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.4 2.9v10.7L2.9 18.6 11.4 2.9z"/><path d="M12.6 2.9 21.1 18.6l-8.5-5V2.9z"/><path d="M3.4 19.7 12 14.6l8.6 5.1H3.4z"/></svg>';
const ICONO_YOUTUBE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>';
const ICONO_DESCARGA = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

/* ------------------------------------------------------------------ */
/* Tarjetas                                                             */
/* ------------------------------------------------------------------ */

function tarjetaPlugin(p) {
  const descarga = listo(p.link)
    ? `<a href="${esc(p.link)}" class="btn-download" target="_blank" rel="noopener noreferrer" data-recurso="${esc(p.nombre)}" download>${ICONO_DRIVE} Descargar</a>`
    : `<span class="btn-download btn-pronto">Muy pronto</span>`;

  const github = listo(p.github)
    ? `\n          <a href="${esc(p.github)}" class="btn-plugin-sec" target="_blank" rel="noopener noreferrer">${ICONO_GITHUB} GitHub</a>`
    : '';

  // El tutorial puede tener fecha de estreno. Se deja escrito en el HTML con
  // su fecha y el navegador lo esconde si todavia no ha llegado; asi Google
  // lo ve y el estreno programado sigue funcionando.
  const tutorial = listo(p.tutorial)
    ? `\n          <a href="${esc(p.tutorial)}" class="btn-plugin-sec"${p.tutorialDesde ? ` data-desde="${esc(p.tutorialDesde)}"` : ''} target="_blank" rel="noopener noreferrer">${ICONO_YOUTUBE} Tutorial</a>`
    : '';

  const icono = p.imagen
    ? `<img src="${esc(p.imagen)}" alt="" class="plugin-img">`
    : '<span>\u{1F50C}</span>';

  // Va antes del boton a proposito: que lo lea quien esta por descargar,
  // no despues de que el plugin no le funcione.
  const aviso = p.compatibilidad
    ? `\n        <p class="plugin-aviso"><strong>Antes de descargar:</strong> ${esc(p.compatibilidad)}</p>`
    : '';

  return `      <article class="plugin-card">
        <div class="plugin-top">
          <div class="plugin-icon">${icono}</div>
          <span class="plugin-version">${esc(p.version)}</span>
        </div>
        <h3 class="plugin-name">${esc(p.nombre)}</h3>
        <div class="plugin-meta">
          <span class="plugin-chip">${esc(p.software)}</span>
          <span class="plugin-chip">${esc(p.sistema)}</span>
        </div>
        <p class="plugin-desc">${esc(p.descripcion)}</p>${aviso}
        <div class="plugin-actions">
          ${descarga}${github}${tutorial}
        </div>
      </article>`;
}

function tarjetaRecurso(r) {
  const icono = r.imagen
    ? `<img src="${esc(r.imagen)}" alt="${esc(r.nombre)}" class="recurso-img">`
    : `<span class="recurso-emoji">${esc(r.icono)}</span>`;

  return `      <article class="recurso-card" data-cat="${esc(r.categoria)}">
        <div class="recurso-icon">${icono}</div>
        <div class="recurso-cat-tag">${esc(r.categoria)}</div>
        <h3 class="recurso-name">${esc(r.nombre)}</h3>
        <p class="recurso-desc">${esc(r.descripcion)}</p>
        <div class="recurso-footer">
          <span class="recurso-size">${esc(r.tamano)}</span>
          <a href="${esc(r.link)}" class="btn-download" target="_blank" rel="noopener noreferrer" data-recurso="${esc(r.nombre)}" download>
            Descargar
            ${ICONO_DESCARGA}
          </a>
        </div>
      </article>`;
}

/* ------------------------------------------------------------------ */
/* Insertar entre marcadores                                            */
/* ------------------------------------------------------------------ */

function reemplazarEntre(html, marca, contenido) {
  const inicio = `<!-- ${marca}:INICIO -->`;
  const fin = `<!-- ${marca}:FIN -->`;
  const a = html.indexOf(inicio);
  const b = html.indexOf(fin);
  if (a === -1 || b === -1) throw new Error(`Faltan los marcadores ${marca} en recursos.html`);
  if (b < a) throw new Error(`Los marcadores ${marca} estan al reves`);
  return html.slice(0, a + inicio.length) + '\n' + contenido + '\n      ' + html.slice(b);
}

/* ------------------------------------------------------------------ */

const fuente = readFileSync(ARCHIVO_DATOS, 'utf8');
const PLUGINS = leerArray(fuente, 'PLUGINS');
const RECURSOS = leerArray(fuente, 'RECURSOS');

// script-recursos.js mete ademas los plugins al principio del catalogo con
// categoria 'plugins', para que ese filtro funcione sin escribirlos dos veces.
// Hay que hacer lo mismo aca o el HTML saldria con dos tarjetas de menos.
PLUGINS.forEach(p => {
  RECURSOS.unshift({
    nombre: p.nombre,
    categoria: 'plugins',
    descripcion: p.descripcion,
    tamano: p.tamano,
    link: p.link,
    icono: '\u{1F50C}',
    imagen: p.imagen
  });
});

let html = readFileSync(ARCHIVO_PAGINA, 'utf8');
html = reemplazarEntre(html, 'PLUGINS', PLUGINS.map(tarjetaPlugin).join('\n'));
html = reemplazarEntre(html, 'RECURSOS', RECURSOS.map(tarjetaRecurso).join('\n'));
writeFileSync(ARCHIVO_PAGINA, html);

const porCategoria = RECURSOS.reduce((acc, r) => {
  acc[r.categoria] = (acc[r.categoria] || 0) + 1;
  return acc;
}, {});

console.log(`recursos.html actualizado`);
console.log(`  ${PLUGINS.length} plugins`);
console.log(`  ${RECURSOS.length} recursos: ${Object.entries(porCategoria).map(([c, n]) => `${c} ${n}`).join(', ')}`);
