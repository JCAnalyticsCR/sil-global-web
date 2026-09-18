# SIL Global · Sitio web

Sitio oficial de SIL Global Ltda. — https://silglobalcr.com

## Stack

HTML, CSS y JavaScript sin paso de compilación. Tipografías desde Google Fonts. Sin servidor, base de datos ni formularios propios: las consultas se preparan en el navegador y se continúan por WhatsApp.

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Página única con todas las secciones |
| `styles.css` | Estilos base y responsive |
| `cine.css` / `cine.js` | Capa visual: animaciones, tinte por sección, header compacto |
| `tipografia.css` | Sistema tipográfico |
| `app.js` | Catálogo de productos, filtros, buscador y formulario de consulta |
| `assets/` | Logo, globo, ilustraciones y fotos de producto (`assets/fotos/`) |
| `CNAME` | Dominio personalizado de GitHub Pages |

## Correr en local

```bash
python -m http.server 8000
```

y abrir http://localhost:8000.

## Publicación

GitHub Pages desde la rama `main` (raíz), con dominio `silglobalcr.com` y HTTPS forzado. Cada push a `main` publica en uno o dos minutos.

## Agregar un producto

1. Foto recortada al producto, 1200×1000, en `assets/fotos/<id>.webp`.
2. Una entrada en `PRODUCTS` dentro de `app.js` con `id`, `photo`, `title`, `category` (`bolsas`, `cintas` o `embalaje`), `summary`, `description` y `spec`.
