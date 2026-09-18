'use strict';
/* SIL Global · Frontend estático. No envía formularios ni almacena datos.
 * El catálogo se basa en SIL-Global-datos-facebook (1).md.
 * Precios, stock, especificaciones no publicadas y correo en disputa se omiten.
 */
(() => {
  const CONTACT = Object.freeze({ whatsapp: '50671168899' });
  const PRODUCTS = Object.freeze([
    { id: 'film', title: 'Plástico de paletizar', category: 'embalaje', image: 'film.svg', summary: 'Stretch film · Protección de carga', description: 'Plástico de paletizar (stretch film) para asegurar y estabilizar la carga durante el transporte.', spec: 'Consultá las medidas, el calibre y las presentaciones disponibles.' },
    { id: 'cinta-transparente', photo: 'fotos/cinta-transparente.webp', title: 'Cinta adhesiva transparente', category: 'cintas', image: 'tape.svg', summary: 'Presentaciones de 100 y 200 yardas', description: 'Cinta adhesiva transparente para empaque, en líneas comercial e industrial.', spec: 'Presentaciones publicadas: 100 y 200 yardas. Consultá la opción que necesitás.' },
    { id: 'bolsa-papel', photo: 'fotos/bolsa-papel.webp', title: 'Bolsas de papel', category: 'bolsas', image: 'paper.svg', summary: 'De ½ a 12 libras · Paquetes de 500+', description: 'Bolsas de papel para las necesidades de empaque de tu negocio.', spec: 'Tamaños publicados: de ½ libra a 12 libras. Paquetes de 500 unidades en adelante.' },
    { id: 'burbuja', title: 'Burbuja de protección', category: 'embalaje', image: 'bubble.svg', summary: 'Protección y amortiguación de impactos', description: 'Material de burbuja para amortiguar impactos y proteger tus productos.', spec: 'Consultá las medidas y las presentaciones para tu empaque.' },
    { id: 'polipropileno', photo: 'fotos/polipropileno.webp', title: 'Bolsas de polipropileno', category: 'bolsas', image: 'clear-bag.svg', summary: 'Transparentes · Empaque y presentación', description: 'Bolsas de polipropileno transparentes para visualizar el contenido, empacar y almacenar productos.', spec: 'Indicá el tamaño y la cantidad que necesitás para consultar disponibilidad.' },
    { id: 'bolsa-negra', photo: 'fotos/bolsa-negra.webp', title: 'Bolsas negras', category: 'bolsas', image: 'black-bag.svg', summary: 'Uso doméstico, comercial e industrial', description: 'Bolsas negras para necesidades de uso doméstico, comercial e industrial.', spec: 'Consultá tamaño, presentación y cantidad según el uso que les darás.' },
    { id: 'manigueta', title: 'Bolsas de manigueta', category: 'bolsas', image: 'handle-bag.svg', summary: 'Con asa · Variantes rayas y color', description: 'Bolsas con asa para llevar y empacar productos de tu negocio.', spec: 'Variantes publicadas: Manigueta Rayas y Manigueta Color. Consultá colores y medidas.' },
    { id: 'lamina', photo: 'fotos/lamina.webp', title: 'Bolsas en lámina', category: 'bolsas', image: 'clear-bag.svg', summary: 'Una opción para el empaque de tu negocio', description: 'Bolsas en lámina incluidas en el catálogo publicado de SIL Global.', spec: 'Consultá las medidas, las presentaciones y la cantidad que necesitás.' },
    { id: 'rollo', photo: 'fotos/rollo.webp', title: 'Bolsas en rollo', category: 'bolsas', image: 'roll-bag.svg', summary: 'Presentación en rollo para empaque', description: 'Bolsas en rollo para las necesidades de empaque diario de tu negocio.', spec: 'Consultá el tamaño y la presentación adecuados para tu uso.' },
    { id: 'biodegradable', photo: 'fotos/biodegradable.webp', title: 'Bolsas biodegradables', category: 'bolsas', image: 'clear-bag.svg', summary: 'De ½ a 12 libras · Consultá características', description: 'Producto publicado bajo la denominación «bolsa biodegradable». Las propiedades y la certificación del material deben confirmarse antes de la compra.', spec: 'Tamaños publicados: de ½ a 12 libras. Consultá características y certificación.' },
    { id: 'zunchos', title: 'Zunchos y flejes plásticos', category: 'embalaje', image: 'strapping.svg', summary: 'Sujeción para tus cargas', description: 'Zunchos y flejes plásticos para la sujeción de cargas.', spec: 'Consultá medidas, presentaciones y condiciones de uso para tu carga.' },
    { id: 'esquineros', title: 'Esquineros de cartón', category: 'embalaje', image: 'corners.svg', summary: 'Refuerzo y protección de bordes', description: 'Esquineros de cartón para reforzar y proteger los bordes de tus cargas.', spec: 'Indicá las medidas y la cantidad que necesitás para tu empaque.' },
    { id: 'cinta-pulgada', photo: 'fotos/cinta-pulgada.webp', title: 'Cinta de empaque de 1 pulgada', category: 'cintas', image: 'tape.svg', summary: 'Uso industrial y comercial', description: 'Cinta de empaque de una pulgada para uso industrial y comercial.', spec: 'Medida publicada: 1 pulgada. Consultá presentación y cantidad.' }
  ]);
  const CATEGORY_LABELS = Object.freeze({ bolsas: 'Bolsas', cintas: 'Cintas', embalaje: 'Embalaje industrial' });
  const CATEGORY_SHORT = Object.freeze({ bolsas: 'BOLSAS', cintas: 'CINTAS', embalaje: 'EMBALAJE' });
  const state = { category: 'all', search: '', expanded: false, selectedProduct: null };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const grid = $('#product-grid');
  const searchInput = $('#product-search');
  const productDialog = $('#product-dialog');
  const quoteDialog = $('#quote-dialog');
  const quoteForm = $('#quote-form');
  const messageInput = $('#quote-message');
  const assetUrl = (name) => (window.SIL_ASSETS && window.SIL_ASSETS[name]) || `assets/${name}`;
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));

  function renderProducts() {
    const term = normalize(state.search);
    const filtered = PRODUCTS.filter((product) => {
      const matchesCategory = state.category === 'all' || product.category === state.category;
      const matchesSearch = !term || normalize(`${product.title} ${product.summary} ${product.description} ${CATEGORY_LABELS[product.category]}`).includes(term);
      return matchesCategory && matchesSearch;
    });
    const showAll = state.expanded || state.category !== 'all' || !!term;
    const shown = showAll ? filtered : filtered.slice(0, 4);
    const fragment = document.createDocumentFragment();
    shown.forEach((product) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'product-card';
      card.dataset.product = product.id;
      card.setAttribute('aria-label', `Ver detalles de ${product.title}`);
      const visual = product.photo ? { src: assetUrl(product.photo), alt: `Fotografía de ${escapeHtml(product.title)}`, cls: ' has-photo' } : { src: assetUrl(product.image), alt: `Ilustración de ${escapeHtml(product.title)}`, cls: '' };
      card.innerHTML = `<span class="product-image${visual.cls}"><span class="product-category">${CATEGORY_SHORT[product.category]}</span><img src="${visual.src}" alt="${visual.alt}" loading="lazy" width="440" height="330"></span><span class="product-body"><span class="product-title">${escapeHtml(product.title)}</span><span class="product-summary">${escapeHtml(product.summary)}</span><span class="product-bottom"><span>Consultar producto</span><span class="product-arrow">${icon('up-right')}</span></span></span>`;
      card.addEventListener('click', () => openProduct(product));
      fragment.appendChild(card);
    });
    grid.replaceChildren(fragment);
    $('#empty-state').hidden = shown.length !== 0;
    $('#catalog-count').textContent = term || state.category !== 'all'
      ? `${filtered.length} ${filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}`
      : `${shown.length} de ${PRODUCTS.length} productos · Venta por consulta`;
    const catalogButton = $('#show-catalog');
    catalogButton.hidden = state.category !== 'all' || !!term || filtered.length <= 4;
    catalogButton.innerHTML = `${state.expanded ? 'Volver a los destacados' : 'Explorar todo el catálogo'} ${icon(state.expanded ? 'chevron' : 'arrow')}`;
    catalogButton.setAttribute('aria-expanded', String(state.expanded));
    catalogButton.setAttribute('aria-controls', 'product-grid');
  }

  function openDialog(dialog) {
    if (typeof dialog.showModal !== 'function') {
      window.alert('Este navegador no admite esta vista. Para consultar, llamá al +506 7116-8899 o usá el botón de WhatsApp.');
      return;
    }
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  function openProduct(product) {
    state.selectedProduct = product;
    $('#product-dialog-title').textContent = product.title;
    $('#product-dialog-category').textContent = CATEGORY_LABELS[product.category];
    $('#product-dialog-description').textContent = product.description;
    $('#product-dialog-spec').textContent = product.spec;
    $('#product-dialog-image').src = assetUrl(product.photo || product.image);
    $('#product-dialog-image').alt = product.photo ? `Fotografía de ${product.title}` : `Ilustración de ${product.title}; no es una fotografía del producto real.`;
    $('#product-dialog-image').parentElement.classList.toggle('has-photo', !!product.photo);
    openDialog(productDialog);
  }
  function openQuote(topic = 'general', product = null) {
    quoteForm.reset();
    $('#form-status').hidden = true;
    messageInput.setCustomValidity('');
    $('#quote-interest').value = topic === 'internacional' ? 'Conseguir un producto de otro origen' : topic === 'hoteleria' ? 'Soluciones para hotelería' : 'Productos de embalaje y empaque';
    if (topic === 'hoteleria') messageInput.value = 'Me interesan las soluciones para hotelería.\nTipo de alojamiento y amenidades que necesito: ';
    if (product) messageInput.value = `Me gustaría consultar por ${product.title.toLowerCase()}.\nCantidad aproximada: `;
    if (topic === 'internacional') messageInput.value = 'Necesito conseguir un producto.\nProducto y cantidad aproximada: ';
    openDialog(quoteDialog);
  }

  $$('.category-tab').forEach((button) => button.addEventListener('click', () => {
    state.category = button.dataset.category;
    state.expanded = false;
    $$('.category-tab').forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    renderProducts();
  }));
  let searchTimer;
  searchInput.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      state.search = searchInput.value;
      renderProducts();
    }, 140);
  });
  $('#clear-filters').addEventListener('click', () => {
    window.clearTimeout(searchTimer);
    searchInput.value = '';
    state.search = '';
    $('.category-tab[data-category="all"]').click();
    searchInput.focus();
  });
  $('#show-catalog').addEventListener('click', () => {
    state.expanded = !state.expanded;
    renderProducts();
    if (!state.expanded) $('#productos').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  $$('[data-quote]').forEach((button) => button.addEventListener('click', () => openQuote(button.dataset.quote)));
  // Enlaces de servicio que abren el catálogo ya filtrado
  $$('[data-catalog]').forEach((link) => link.addEventListener('click', () => {
    const tab = $(`.category-tab[data-category="${link.dataset.catalog}"]`);
    if (tab) tab.click();
  }));
  // Paneles de servicio: en táctil, un toque abre; el segundo sigue el enlace
  const stage = $('.svc-stage');
  if (stage) {
    const open = (panel) => $$('.svc', stage).forEach((s) => s.classList.toggle('is-open', s === panel));
    $$('.svc', stage).forEach((panel) => {
      panel.addEventListener('focusin', () => open(panel));
      panel.addEventListener('click', (event) => {
        if (matchMedia('(hover: hover)').matches || panel.classList.contains('is-open')) return;
        event.preventDefault(); open(panel);
      });
    });
    stage.addEventListener('focusout', (event) => { if (!stage.contains(event.relatedTarget)) open(null); });
  }
  $('#quote-this-product').addEventListener('click', () => {
    const product = state.selectedProduct;
    productDialog.close();
    openQuote('general', product);
  });
  $$('[data-close]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  [productDialog, quoteDialog].forEach((dialog) => {
    dialog.addEventListener('close', () => {
      // Closing one dialog may open the other in the same interaction.
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  messageInput.addEventListener('input', () => messageInput.setCustomValidity(''));
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!messageInput.value.trim()) {
      messageInput.setCustomValidity('Contanos qué necesitás antes de continuar.');
      messageInput.reportValidity();
      return;
    }
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    const name = String(data.get('nombre') || '').trim();
    const company = String(data.get('empresa') || '').trim();
    const lines = ['Hola, SIL Global.'];
    if (name) lines.push(`Mi nombre es ${name}.`);
    if (company) lines.push(`Empresa: ${company}.`);
    lines.push(`Me interesa: ${String(data.get('interes'))}.`, '', messageInput.value.trim(), '', 'Gracias.');
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    $('#whatsapp-fallback').href = url;
    $('#form-status').hidden = false;
    // The visitor must review and send the message in WhatsApp. Nothing is sent here.
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  const menuButton = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  function closeMenu(returnFocus = false) {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    menuButton.innerHTML = icon('menu');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    if (expanded) return closeMenu();
    mobileNav.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Cerrar menú');
    menuButton.innerHTML = icon('close');
  });
  $$('#mobile-nav a').forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
  });
  const desktopQuery = matchMedia('(min-width: 701px)');
  desktopQuery.addEventListener('change', () => { if (desktopQuery.matches) closeMenu(); });

  // Gentle pointer parallax; disabled on touch devices and with reduced motion.
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const globeVisual = $('.hero-visual');
  const globeStage = $('.globe-stage');
  globeVisual.addEventListener('pointermove', (event) => {
    if (motionQuery.matches || event.pointerType !== 'mouse') return;
    const rect = globeVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width * 11;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height * 9;
    globeStage.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
  });
  globeVisual.addEventListener('pointerleave', () => { globeStage.style.transform = ''; });

  // Navigation highlights track visible sections without modifying the URL.
  const sectionNav = [
    ['inicio', 'inicio'], ['servicios', 'servicios'], ['acompanamiento', 'servicios'], ['productos', 'productos'],
    ['internacional', 'servicios'], ['contacto', null]
  ];
  let scrollScheduled = false;
  function updateNavigation() {
    let current = 'inicio';
    sectionNav.forEach(([id, navId]) => {
      const element = document.getElementById(id);
      if (element.getBoundingClientRect().top <= 150) current = navId;
    });
    $$('.nav-link').forEach((link) => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    scrollScheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) { window.requestAnimationFrame(updateNavigation); scrollScheduled = true; }
  }, { passive: true });
  $('#current-year').textContent = String(new Date().getFullYear());
  renderProducts();
  updateNavigation();
})();
