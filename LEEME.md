# SIL Global · Frontend / Propuesta 02

Una primera versión navegable inspirada en la propuesta «Moderna y dinámica». Es un prototipo local, no un sitio publicado ni un sistema de comercio electrónico.

## Abrir y probar

Abrí `index.html` en tu navegador, manteniendo `styles.css`, `app.js` y la carpeta `assets` en la misma ubicación. No hay que instalar paquetes ni ejecutar una compilación. El archivo independiente `SIL-Global-frontend.html`, entregado por separado, contiene todo en un solo archivo.

El diseño se puede recorrer sin conexión. Abrir WhatsApp o Facebook requiere conexión; las llamadas dependen del dispositivo.

## Qué incluye

- Portada azul profundo y dorado, globo ilustrativo, conexiones animadas y un movimiento sutil con el puntero. Las animaciones se desactivan cuando el sistema solicita movimiento reducido.
- Navegación por secciones y menú móvil.
- Catálogo de 13 entradas: 7 de bolsas, 2 de cintas y 4 de embalaje industrial. La primera vista muestra cuatro destacados.
- Filtros por categoría, buscador que admite búsquedas sin tildes, vista de detalles y selección de un producto para consultar.
- Secciones de acompañamiento comercial, bróker de compras internacionales, presentación y contacto.
- Formulario que prepara un mensaje y abre WhatsApp. **No envía mensajes automáticamente, no guarda datos y no utiliza un servidor de formularios.** La persona revisa y envía el mensaje en WhatsApp.
- Accesos al teléfono y al perfil de Facebook publicados en la fuente aportada.

## Editar

`index.html`: estructura, textos de secciones, logo (símbolo `#logo-sil`, versión para fondo oscuro) y enlaces de contacto.

`styles.css`: estilo y adaptación de pantallas. Los colores principales están al comienzo, en `:root`: `--navy`, `--gold`, `--paper`, `--ink` y `--green`.

`app.js`: catálogo `PRODUCTS`, comportamiento de filtros y ventanas, y número `CONTACT.whatsapp` utilizado para preparar consultas. Al cambiar el teléfono, actualizá también los enlaces de `index.html`.

`assets/`: globo, ilustraciones SVG editables y el logo en dos variantes: `logo-sil-global.svg` (colores originales, para fondos claros) y `logo-sil-global-dark.svg` (adaptado al navy del sitio). El logo está recreado en SVG a partir del logo aportado por el cliente; el texto se ajusta con `textLength`, así que el ancho se mantiene aunque cambie la tipografía disponible. Las ilustraciones de producto no son fotografías reales.

No se incluyen archivos de fuentes ni dependencias externas. Las tipografías se resuelven con las disponibles en el dispositivo, usando Arial/Helvetica y Georgia como referencias.

## Antes de publicar

Confirmar los datos comerciales y la vigencia de los servicios con el cliente. Si el cliente entrega el logo en vectorial (AI/SVG), sustituir la recreación por el archivo oficial para fidelidad exacta de trazos. Reemplazar las ilustraciones por fotografías o recursos aprobados. Confirmar canales de atención, disponibilidad y condiciones comerciales. El correo disputado no se incluyó.

El HTML lleva `noindex, nofollow` y una nota de prototipo. No se ha configurado dominio, hospedaje, analítica, pagos, carrito, administración de inventario ni base de datos. La ficha `FUENTES-Y-PENDIENTES.md` explica el alcance del contenido.

## Revisión técnica

Se revisó la versión independiente en Chromium de escritorio en modo sin interfaz: filtros, buscador, detalle de producto, cambio al formulario, composición del enlace de WhatsApp, cierre de ventanas, menú móvil, carga de imágenes y anchuras de 320 a 1920 píxeles. No se enviaron mensajes reales durante las pruebas. Esto no sustituye una revisión en dispositivos reales, otros navegadores ni una auditoría de accesibilidad completa.
