# SIL Global · Propuesta de sitio web (prototipo)

Maqueta navegable del sitio de **SIL Global Ltda** — distribución mayorista de embalaje y empaque, y bróker en compras internacionales (Costa Rica).

**Ver la propuesta en vivo → https://jcanalyticscr.github.io/sil-global-web/**

> Esto es un **prototipo de diseño**, no un sitio en producción. No hay dominio, hospedaje definitivo, analítica, carrito, pagos ni base de datos. Los textos y las ilustraciones de producto están pendientes de aprobación del cliente. El logo es una recreación vectorial del logo oficial de SIL Global, adaptado al fondo oscuro del sitio.

## Qué se puede probar

- Portada en el azul del logo con acentos dorados, globo ilustrativo con conexiones animadas y movimiento sutil con el puntero (se desactiva si el sistema pide movimiento reducido).
- Sección «Servicios» por categorías (hoy: Embalaje) con catálogo de 13 productos: 7 de bolsas, 2 de cintas y 4 de embalaje industrial.
- Filtros por categoría, buscador que tolera búsquedas sin tildes y ficha de detalle por producto.
- Secciones de acompañamiento comercial, bróker de compras internacionales, presentación («Nosotros», banda oscura con las dos líneas de negocio como tarjetas que enlazan a su sección) y contacto.
- Formulario que **prepara** un mensaje y abre WhatsApp: no envía nada solo, no guarda datos y no usa servidor de formularios. La persona revisa y envía desde WhatsApp.
- Navegación responsive de 320 a 1920 px, con menú móvil.
- Capa cinematográfica (`cine.css` + `cine.js`): tinte ambiente que cambia por sección, tipografía fantasma con deriva por scroll, grano de película, reveals, cinta de líneas de producto, riel del proceso que se dibuja, marco de visor en la ilustración internacional y — solo en PC con puntero real — cursor-retícula, relieve 3D en tarjetas y foco de luz en el panel de contacto. Todo respeta `prefers-reduced-motion` y el catálogo/formulario se mantienen quietos a propósito.

## Stack

HTML, CSS y JavaScript sin paso de compilación. Única dependencia externa: las tipografías Sora, Manrope y Fraunces desde Google Fonts (con fallback a Arial/Georgia si no cargan). Las ilustraciones son SVG propios; el globo es un WebP decorativo.

## Correr en local

No hay que instalar nada. Abrí `index.html` en el navegador manteniendo `styles.css`, `app.js` y `assets/` en la misma ubicación. Si preferís servirlo:

```bash
python -m http.server 8000
```

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura, textos de secciones, identificador gráfico y enlaces de contacto |
| `styles.css` | Estilo base y adaptación de pantallas. Paleta al inicio, en `:root` (`--navy` (azul del logo), `--gold`, `--paper`, `--ink`, `--green`) |
| `tipografia.css` | Familias tipográficas y escala de tamaños por breakpoint. La portada conserva sus tamaños |
| `cine.css` | Capa cinematográfica. Constantes de movimiento únicas (`--dur-*`, `--ease-*`) al inicio; capa PC bajo `(min-width:1024px) and (hover:hover) and (prefers-reduced-motion:no-preference)` |
| `cine.js` | Barra de progreso, tinte por sección, reveals de escritorio, cursor-retícula, relieve y foco. Mejora progresiva: sin él la página se ve completa y quieta |
| `app.js` | Catálogo `PRODUCTS`, filtros, ventanas y `CONTACT.whatsapp` |
| `assets/` | Globo, ilustraciones SVG y el logo en dos variantes (`logo-sil-global.svg` original, `logo-sil-global-dark.svg` para fondo navy) |
| `LEEME.md` | Detalle funcional y notas previas a publicar |
| `FUENTES-Y-PENDIENTES.md` | Origen del contenido, decisiones de alcance y qué falta aprobar |

Al cambiar el teléfono en `app.js`, actualizá también los enlaces de `index.html`.

## Alcance y fuentes

Todo el contenido comercial proviene de la información publicada por SIL Global en su perfil de Facebook, aportada por el cliente. No se verificó de forma independiente ni se añadieron precios, plazos, certificaciones, testimonios ni cifras. El detalle completo está en [`FUENTES-Y-PENDIENTES.md`](FUENTES-Y-PENDIENTES.md).

La página lleva `noindex, nofollow`: es una propuesta para revisión, no busca posicionarse en buscadores.

---

Propuesta preparada por **JC Analytics**.
