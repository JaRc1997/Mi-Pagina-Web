// Fondo animado de puntos. Se carga en todas las paginas como capa decorativa.
(function() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const SPACING = 28;
  const AMPLITUD = 8;
  const VELOCIDAD = 0.75;
  const FRECUENCIA = 0.013;
  let dots = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];
    for (let y = 0; y <= canvas.height + SPACING; y += SPACING) {
      for (let x = 0; x <= canvas.width + SPACING; x += SPACING) {
        dots.push({ x, y });
      }
    }
  }

  // Si el usuario prefiere menos movimiento, se dibuja un solo cuadro estatico
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function draw() {
    const t = performance.now() * 0.001 * VELOCIDAD;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const d of dots) {
      const fase = t + d.x * FRECUENCIA + d.y * FRECUENCIA * 0.7;
      const px = d.x + Math.cos(fase) * AMPLITUD;
      const py = d.y + Math.sin(fase * 1.4) * AMPLITUD;
      const alpha = 0.04 + (Math.sin(fase) * 0.5 + 0.5) * 0.24;
      ctx.beginPath();
      ctx.arc(px, py, 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
      ctx.fill();
    }
    if (!reducirMovimiento) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); if (reducirMovimiento) draw(); });
  resize();
  draw();
})();
