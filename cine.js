'use strict';
/* SIL Global · Capa cinematográfica.
 * Todo lo que hay acá es mejora progresiva: si este archivo no corre, la
 * página se ve completa y quieta (el reposo del HTML es el estado visible).
 * Constantes de tiempo espejadas con cine.css (--dur-*): un solo sistema.
 */
(() => {
  const DUR = Object.freeze({ micro: 200, drawer: 380, section: 750, scene: 2200 });
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 768px)');
  const pcAnimado = matchMedia('(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Progreso de lectura + header compacto (un solo rAF por scroll) ---------- */
  const progreso = $('.progreso');
  const header = $('.site-header');
  let scrollPendiente = false;
  let ultimoProgreso = -1;
  let compacto = false;
  function onScrollFrame() {
    scrollPendiente = false;
    const max = root.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    // Umbral: no escribir estilo para cambios que nadie ve (regla del 1%)
    if (progreso && Math.abs(p - ultimoProgreso) > 0.004) { progreso.style.transform = `scaleX(${p.toFixed(3)})`; ultimoProgreso = p; }
    // Histéresis: el header compacto mide ~20 px menos y, al ser sticky, la página
    // se corre ese tanto. Con un solo umbral (40) el scroll cruzaba de ida y vuelta
    // y el logo palpitaba. Compacta pasando 80 px y solo vuelve bajo 10 px.
    if (!compacto && scrollY > 80) { compacto = true; header.classList.add('is-scrolled'); }
    else if (compacto && scrollY < 10) { compacto = false; header.classList.remove('is-scrolled'); }
  }
  addEventListener('scroll', () => { if (!scrollPendiente) { scrollPendiente = true; requestAnimationFrame(onScrollFrame); } }, { passive: true });
  onScrollFrame();

  /* ---------- Tinte ambiente por sección (interpola el CSS vía @property) ---------- */
  if ('IntersectionObserver' in window) {
    // Manda la sección MÁS visible, no la última del lote: al scrollear rápido
    // dos secciones cruzan el umbral en el mismo callback y el orden del DOM engaña.
    const visibles = new Map();
    const tinteIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => visibles.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
      let mejor = null, ratio = 0.2;
      visibles.forEach((r, s) => { if (r > ratio) { ratio = r; mejor = s; } });
      if (mejor) root.style.setProperty('--tinte', mejor.dataset.tinte);
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    $$('[data-tinte]').forEach((s) => tinteIO.observe(s));
  }

  /* ---------- Reveals de escritorio con stagger (móvil los hace CSS view()) ---------- */
  function armarReveals() {
    if (!('IntersectionObserver' in window) || reduced.matches || !desktop.matches) { root.classList.remove('js-reveal'); return; }
    root.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal, .process-rail').forEach((el) => {
      // Lo que ya está en pantalla al armar se muestra de una: nunca contenido oculto sin camino a visible.
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); else io.observe(el);
    });
    // Red de seguridad: pase lo que pase, a los 6 s todo es visible.
    setTimeout(() => $$('.reveal:not(.is-in), .process-rail:not(.is-in)').forEach((el) => el.classList.add('is-in')), 6000);
  }
  armarReveals();
  reduced.addEventListener('change', () => { if (reduced.matches) root.classList.remove('js-reveal'); });

  /* ---------- Capa PC: relieve 3D y foco de luz. Solo con puntero real; sin cursor propio. ---------- */
  function montarRelieve() {
    if (!pcAnimado.matches) return;
    let relieveActual = null, relievePendiente = 0, ultimoBlanco = null, ultimoX = 0, ultimoY = 0;
    const panel = $('.contact-panel');
    function soltar(el) { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); el.style.setProperty('--foco', '0'); }
    function procesar() {
      relievePendiente = 0;
      const el = ultimoBlanco && ultimoBlanco.closest ? ultimoBlanco.closest('[data-relieve]') : null;
      if (el !== relieveActual) { if (relieveActual) soltar(relieveActual); relieveActual = el; }
      if (el) {
        const r = el.getBoundingClientRect();
        const nx = (ultimoX - r.left) / r.width, ny = (ultimoY - r.top) / r.height;
        el.style.setProperty('--rx', `${((nx - 0.5) * 7).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${((0.5 - ny) * 7).toFixed(2)}deg`);
        el.style.setProperty('--mx', `${(nx * 100).toFixed(1)}%`); el.style.setProperty('--my', `${(ny * 100).toFixed(1)}%`);
        el.style.setProperty('--foco', '1');
      }
      if (panel) {
        const inside = ultimoBlanco && ultimoBlanco.closest && ultimoBlanco.closest('.contact-panel');
        if (inside) {
          const r = panel.getBoundingClientRect();
          panel.style.setProperty('--lx', `${(((ultimoX - r.left) / r.width) * 100).toFixed(1)}%`);
          panel.style.setProperty('--ly', `${(((ultimoY - r.top) / r.height) * 100).toFixed(1)}%`);
          panel.style.setProperty('--luz', '1');
        } else panel.style.setProperty('--luz', '0');
      }
    }
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      ultimoBlanco = e.target; ultimoX = e.clientX; ultimoY = e.clientY;
      if (!relievePendiente) relievePendiente = requestAnimationFrame(procesar);
    }, { passive: true });
  }
  montarRelieve();
  pcAnimado.addEventListener('change', () => { if (pcAnimado.matches) montarRelieve(); });

  /* ---------- Pulso háptico al preparar la consulta (doble candado) ---------- */
  function pulso(patron) {
    if (!navigator.vibrate || reduced.matches) return;
    if (!(navigator.userActivation && navigator.userActivation.hasBeenActive)) return;
    navigator.vibrate(patron);
  }
  const form = $('#quote-form');
  if (form) form.addEventListener('submit', () => pulso(10));
  void DUR;
})();
