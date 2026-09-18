'use strict';
/* SIL Global · Frontend estático. No envía formularios ni almacena datos.
 * Catálogo de productos de SIL Global; precios y existencias se consultan por WhatsApp.
 */
(() => {
  const CONTACT = Object.freeze({ whatsapp: '50671168899' });
  const PRODUCTS = Object.freeze([
    { id: "bolsa-papel", photo: "fotos/bolsa-papel.webp", title: "Bolsas de papel", category: "bolsas", summary: "De ½ a 12 libras · Paquetes de 500+", description: "Bolsas de papel para las necesidades de empaque de tu negocio.", spec: "Tamaños: de ½ libra a 12 libras. Paquetes de 500 unidades en adelante.", group: "bolsas" },
    { id: "polipropileno", photo: "fotos/polipropileno.webp", title: "Bolsas de polipropileno", category: "bolsas", summary: "Transparentes · Empaque y presentación", description: "Bolsas de polipropileno transparentes para visualizar el contenido, empacar y almacenar productos.", spec: "Indicá el tamaño y la cantidad que necesitás para consultar disponibilidad.", group: "bolsas" },
    { id: "bolsa-negra", photo: "fotos/bolsa-negra.webp", title: "Bolsas negras", category: "bolsas", summary: "Uso doméstico, comercial e industrial", description: "Bolsas negras para necesidades de uso doméstico, comercial e industrial.", spec: "Consultá tamaño, presentación y cantidad según el uso que les darás.", group: "bolsas" },
    { id: "manigueta", photo: "fotos/manigueta.webp", title: "Bolsas manigueta de color", category: "bolsas", summary: "Con asa · Varios colores", description: "Bolsas con asa en varios colores para llevar y empacar productos de tu negocio.", spec: "Consultá colores, medidas y cantidades.", group: "bolsas" },
    { id: "manigueta-blanca", photo: "fotos/manigueta-blanca.webp", title: "Bolsas manigueta blancas", category: "bolsas", summary: "Con asa · Color blanco", description: "Bolsas con asa en color blanco para llevar y empacar productos de tu negocio.", spec: "Consultá medidas y cantidades.", group: "bolsas" },
    { id: "manigueta-rayas", photo: "fotos/manigueta-rayas.webp", title: "Bolsas manigueta de rayas", category: "bolsas", summary: "Con asa · Diseño de rayas", description: "Bolsas con asa y diseño de rayas para llevar y empacar productos de tu negocio.", spec: "Consultá colores, medidas y cantidades.", group: "bolsas" },
    { id: "biodegradable", photo: "fotos/biodegradable.webp", title: "Bolsas biodegradables", category: "bolsas", summary: "De ½ a 12 libras", description: "Bolsas biodegradables para empacar los productos de tu negocio.", spec: "Tamaños: de ½ a 12 libras. Consultá las características y la certificación del material.", group: "bolsas" },
    { id: "rollo", photo: "fotos/rollo.webp", title: "Bolsas en rollo", category: "bolsas", summary: "Presentación en rollo para empaque", description: "Bolsas en rollo para las necesidades de empaque diario de tu negocio.", spec: "Consultá el tamaño y la presentación adecuados para tu uso.", group: "bolsas" },
    { id: "lamina", photo: "fotos/lamina.webp", title: "Bolsas en lámina", category: "bolsas", summary: "Una opción para el empaque de tu negocio", description: "Bolsas en lámina para empacar y proteger los productos de tu negocio.", spec: "Consultá las medidas, las presentaciones y la cantidad que necesitás.", group: "bolsas" },
    { id: "bolsa-alimentos", photo: "fotos/bolsa-alimentos.webp", title: "Bolsas para alimentos", category: "bolsas", summary: "Para tacos, hot dogs y sándwiches", description: "Bolsas para empacar alimentos como tacos, hot dogs y sándwiches.", spec: "Consultá medidas y cantidades.", group: "bolsas" },
    { id: "envase-8x8", photo: "fotos/envase-8x8.webp", title: "Envase 8x8", category: "desechables", summary: "Con tapa · Para llevar", description: "Envase desechable de 8x8 con tapa para servir y llevar comidas.", spec: "Consultá presentaciones y cantidades.", group: "envases" },
    { id: "envases-comida", photo: "fotos/envases-comida.webp", title: "Envases desechables para comida", category: "desechables", summary: "Para todo tipo de comida", description: "Envases desechables con tapa para todo tipo de comida.", spec: "Consultá tamaños y presentaciones.", group: "envases" },
    { id: "envases-deli", photo: "fotos/envases-deli.webp", title: "Envases deli", category: "desechables", summary: "32, 16 y 8 onzas", description: "Envases tipo deli con tapa, en tres tamaños.", spec: "Tamaños: 32, 16 y 8 onzas.", group: "envases" },
    { id: "envase-cupcake", photo: "fotos/envase-cupcake.webp", title: "Envases para cupcake individual", category: "desechables", summary: "Transparentes · Con tapa", description: "Envases transparentes con tapa para un cupcake individual.", spec: "Consultá presentaciones y cantidades.", group: "envases" },
    { id: "concha-triangular", photo: "fotos/concha-triangular.webp", title: "Concha triangular alta", category: "desechables", summary: "Transparente · Con tapa", description: "Envase transparente tipo concha, triangular y alto.", spec: "Consultá presentaciones y cantidades.", group: "envases" },
    { id: "tazas-concha", photo: "fotos/tazas-concha.webp", title: "Tazas concha 5 y 6", category: "desechables", summary: "Transparentes · Tamaños 5 y 6", description: "Envases transparentes tipo concha, en tamaños 5 y 6.", spec: "Tamaños: 5 y 6.", group: "envases" },
    { id: "tazas-carton", photo: "fotos/tazas-carton.webp", title: "Tazas de cartón", category: "desechables", summary: "Entero y medio", description: "Tazas de cartón en tamaños entero y medio.", spec: "Tamaños: entero y medio.", group: "envases" },
    { id: "envase-medio-duro", photo: "fotos/envase-medio-duro.webp", title: "Envase medio duro", category: "desechables", summary: "Con tapa", description: "Envase medio duro con tapa.", spec: "Consultá tamaños y cantidades.", group: "envases" },
    { id: "vasos-transparentes", photo: "fotos/vasos-transparentes.webp", title: "Vasos transparentes", category: "desechables", summary: "Varios tamaños", description: "Vasos desechables transparentes.", spec: "Consultá tamaños y cantidades.", group: "vasos" },
    { id: "vasos-batidos", photo: "fotos/vasos-batidos.webp", title: "Vasos para batidos", category: "desechables", summary: "12, 16 y 22 onzas · Tapa domo o lisa", description: "Vasos transparentes para batidos, con tapa domo o lisa.", spec: "Tamaños: 12, 16 y 22 onzas. Tapas domo o lisas.", group: "vasos" },
    { id: "vasos-cafe", photo: "fotos/vasos-cafe.webp", title: "Vasos para café", category: "desechables", summary: "Para bebidas calientes", description: "Vasos desechables para café.", spec: "Consultá tamaños y cantidades.", group: "vasos" },
    { id: "sufles", photo: "fotos/sufles.webp", title: "Suflés", category: "desechables", summary: "1, 2, 3.25, 4 y 5.5 onzas", description: "Vasitos tipo suflé para salsas, aderezos y porciones pequeñas.", spec: "Tamaños: 1 oz, 2 oz, 3.25 oz, 4 oz y 5.5 oz.", group: "vasos" },
    { id: "sufle-3-5", photo: "fotos/sufle-3-5.webp", title: "Suflé de 3.5 onzas", category: "desechables", summary: "Con tapa · 3 onzas y media", description: "Suflé con tapa de 3 onzas y media.", spec: "Tamaño: 3.5 oz.", group: "vasos" },
    { id: "platos", photo: "fotos/platos.webp", title: "Platos desechables", category: "desechables", summary: "Varios tamaños", description: "Platos desechables.", spec: "Consultá tamaños y cantidades.", group: "mesa" },
    { id: "cubiertos", photo: "fotos/cubiertos.webp", title: "Cucharas y tenedores desechables", category: "desechables", summary: "Cubiertos desechables", description: "Cucharas y tenedores desechables.", spec: "Consultá presentaciones y cantidades.", group: "mesa" },
    { id: "servilletas", photo: "fotos/servilletas.webp", title: "Servilletas", category: "desechables", summary: "Desechables", description: "Servilletas.", spec: "Consultá presentaciones y cantidades.", group: "mesa" },
    { id: "papel-aluminio", photo: "fotos/papel-aluminio.webp", title: "Papel aluminio", category: "desechables", summary: "En rollo", description: "Papel aluminio.", spec: "Consultá medidas y presentaciones.", group: "papeles" },
    { id: "papel-encerado", photo: "fotos/papel-encerado.webp", title: "Papel encerado", category: "desechables", summary: "En hojas", description: "Papel encerado.", spec: "Consultá medidas y presentaciones.", group: "papeles" },
    { id: "malla-frutas", photo: "fotos/malla-frutas.webp", title: "Malla para frutas", category: "desechables", summary: "Para empacar frutas y verduras", description: "Malla para empacar frutas.", spec: "Consultá medidas y presentaciones.", group: "papeles" },
    { id: "film-manual", photo: "fotos/film-manual.webp", title: "Plástico de paletizar manual", category: "embalaje", summary: "Stretch film · 18\" y rollos angostos", description: "Plástico stretch film para paletizar a mano, asegurar y estabilizar la carga.", spec: "Consultá el espesor, el ancho y el largo que necesitás.", table: {"head": ["Espesor (micras)", "Ancho", "Pies"], "rows": [["10", "18\"", "1200 - 1500"], ["13", "18\"", "700 - 1000 - 1200"], ["15", "18\"", "400 - 500 - 700 - 800 - 1000 - 1200 - 1500"], ["17", "18\"", "700"], ["15", "2\" - 3\" - 6\" - 9\" - 12\"", "500 - 700"]]}, group: "paletizado" },
    { id: "film-automatico", photo: "fotos/film-automatico.webp", title: "Plástico de paletizar automático", category: "embalaje", summary: "Stretch film · 20\" · 10 y 15 kg", description: "Plástico stretch film para máquinas paletizadoras.", spec: "Consultá el espesor y el peso de rollo que necesitás.", table: {"head": ["Espesor (micras)", "Ancho", "Peso"], "rows": [["13", "20\"", "15 kg"], ["17", "20\"", "10 kg"], ["20", "20\"", "10 kg"], ["23", "20\"", "15 kg"]]}, group: "paletizado" },
    { id: "burbuja", photo: "fotos/burbuja.webp", title: "Plástico burbuja", category: "embalaje", summary: "Natural y antiestático · 3/16\" y ½\"", description: "Plástico burbuja natural y antiestático para proteger tus productos de golpes durante el transporte.", spec: "Medidas: 3/16\" y ½\".", group: "proteccion" },
    { id: "esquineros", photo: "fotos/esquineros.webp", title: "Esquineros de cartón", category: "embalaje", summary: "Protección y soporte de la carga", description: "Accesorio de embalaje para proteger tu carga durante el transporte y el almacenamiento. Además, da soporte adicional a la estiba o al almacenar a doble altura.", spec: "Indicá las medidas y la cantidad que necesitás.", group: "proteccion" },
    { id: "zunchos", photo: "fotos/zunchos.webp", title: "Zunchos y flejes plásticos", category: "embalaje", summary: "Flejes industriales", description: "Flejes industriales para diferentes necesidades.", spec: "Consultá medidas y presentaciones para tu carga.", group: "proteccion" },
    { id: "cinta-transparente", photo: "fotos/cinta-transparente.webp", title: "Cinta adhesiva transparente", category: "cintas", summary: "Presentaciones de 100 y 200 yardas", description: "Cinta adhesiva transparente para empaque, en líneas comercial e industrial.", spec: "Presentaciones: 100 y 200 yardas. Consultá la opción que necesitás.", group: "cintas" },
    { id: "cinta-pulgada", photo: "fotos/cinta-pulgada.webp", title: "Cinta de empaque de 1 pulgada", category: "cintas", summary: "Uso industrial y comercial", description: "Cinta de empaque de una pulgada para uso industrial y comercial.", spec: "Medida: 1 pulgada. Consultá presentación y cantidad.", group: "cintas" },
    { id: "cinta-color", photo: "fotos/cinta-color.webp", title: "Cinta adhesiva de color", category: "cintas", summary: "Presentaciones de 100 y 200 yardas", description: "Cinta adhesiva de color para empacar, sellar e identificar tus envíos.", spec: "Presentaciones: 100 y 200 yardas. Consultá los colores disponibles.", group: "cintas" },
    { id: "masking", photo: "fotos/masking.webp", title: "Masking tape", category: "cintas", summary: "Crema, azul y verde · Desde 25 m", description: "Cinta masking tape en colores crema, azul y verde.", spec: "Colores: crema, azul y verde. Anchos: 3/4\" (18 mm), 1\" (24 mm) y 2\" (48 mm). Largos: desde 25 m.", group: "cintas" },
    { id: "papel-kraft", photo: "fotos/papel-kraft.webp", title: "Papel kraft reforzado con fibra de vidrio", category: "cintas", summary: "Adhesivo activado por agua", description: "El adhesivo activado por agua se adhiere al corrugado incluso en condiciones polvorientas o sucias.", spec: "Consultá anchos y presentaciones.", group: "cintas" }
  ]);
  // Destacados que se muestran antes de «Explorar todo el catálogo»
  const FEATURED = Object.freeze(["bolsa-papel", "manigueta-rayas", "envases-deli", "vasos-batidos", "film-manual", "burbuja", "cinta-color", "masking"]);
  const CATEGORY_LABELS = Object.freeze({ bolsas: 'Bolsas', desechables: 'Desechables', cintas: 'Cintas', embalaje: 'Embalaje' });
  const CATEGORY_SHORT = Object.freeze({ bolsas: 'BOLSAS', desechables: 'DESECHABLES', cintas: 'CINTAS', embalaje: 'EMBALAJE' });
  // Encabezados dentro del catálogo: línea de negocio + sección
  const GROUP_LINE = Object.freeze({ bolsas: 'Empaque', desechables: 'Empaque', cintas: 'Embalaje', embalaje: 'Embalaje' });
  const GROUP_LABELS = Object.freeze({ bolsas: 'Bolsas', envases: 'Envases para comida', vasos: 'Vasos y suflés', mesa: 'Platos, cubiertos y servilletas', papeles: 'Papeles y malla', paletizado: 'Paletizado', proteccion: 'Protección de carga', cintas: 'Cintas' });
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
      const matchesCategory = state.category === 'all' || GROUP_LINE[product.category].toLowerCase() === state.category;
      const matchesSearch = !term || normalize(`${product.title} ${product.summary} ${product.description} ${CATEGORY_LABELS[product.category]} ${GROUP_LABELS[product.group]} ${GROUP_LINE[product.category]}`).includes(term);
      return matchesCategory && matchesSearch;
    });
    const showAll = state.expanded || state.category !== 'all' || !!term;
    const shown = showAll ? filtered : FEATURED.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    const fragment = document.createDocumentFragment();
    let lastGroup = null;
    shown.forEach((product) => {
      if (showAll && product.group !== lastGroup) {
        lastGroup = product.group;
        const count = filtered.filter((p) => p.group === product.group).length;
        const head = document.createElement('div');
        head.className = 'catalog-group';
        head.innerHTML = `<span class="catalog-group-line">${GROUP_LINE[product.category]}</span><h3>${GROUP_LABELS[product.group]}</h3><span class="catalog-group-count">${count} ${count === 1 ? 'producto' : 'productos'}</span>`;
        fragment.appendChild(head);
      }
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
    catalogButton.hidden = state.category !== 'all' || !!term;
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
    $('#product-dialog-category').textContent = `${GROUP_LINE[product.category]} · ${GROUP_LABELS[product.group]}`;
    $('#product-dialog-description').textContent = product.description;
    $('#product-dialog-spec').textContent = product.spec;
    const table = $('#product-dialog-table');
    table.hidden = !product.table;
    if (product.table) {
      table.innerHTML = `<thead><tr>${product.table.head.map((h) => `<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr></thead>`
        + `<tbody>${product.table.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
    }
    $('#product-dialog-image').src = assetUrl(product.photo || product.image);
    $('#product-dialog-image').alt = product.photo ? `Fotografía de ${product.title}` : `Ilustración de ${product.title}`;
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
        const cta = panel.querySelector('.svc-cta');
        if (!matchMedia('(hover: hover)').matches && !panel.classList.contains('is-open')) { event.preventDefault(); open(panel); return; }
        // Con la tarjeta abierta, un clic en cualquier parte equivale al botón (productos, sección o consulta)
        if (cta && !event.target.closest('.svc-cta')) cta.click();
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
