# Richmont Furniture: guía del proyecto

Web de una sola página (landing) de **Richmont Furniture**, carpintería de muebles a medida en Paraguay
([@richmontpy](https://www.instagram.com/richmontpy/)). El objetivo de la web es mostrar trabajos y llevar al
cliente a pedir presupuesto por **WhatsApp**. No hay backend, base de datos ni formularios que guarden datos.

Todo el código, los textos y los nombres de archivos, componentes y variables están **en español** (rioplatense:
"Elegí", "Contanos"). Mantené ese idioma y ese tono en cualquier cambio.

> Lee también `AGENTS.md`: esta versión de Next.js tiene cambios que rompen compatibilidad con lo que conocés.
> Antes de escribir código de Next, leé la guía que corresponda en `node_modules/next/dist/docs/`.

## Stack

| Qué                | Versión / detalle                                                   |
| ------------------ | ------------------------------------------------------------------- |
| Framework          | Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript        |
| Estilos            | Tailwind CSS 4 (`@theme inline` en `app/globals.css`, sin `tailwind.config`) |
| Animación          | `motion` (`motion/react`) y scroll suave con `lenis`                |
| Fuentes            | Sora (títulos) e Inter (texto) con `next/font/google`               |
| Hosting            | Vercel (despliega desde GitHub, rama `main`)                        |

## Comandos

```bash
npm install     # solo la primera vez
npm run dev     # http://localhost:3000
npm run lint    # eslint
npm run build   # compila y genera las páginas estáticas
npm run start   # sirve el build (después de npm run build)
```

Antes de dar por terminado un cambio: `npm run lint` y `npm run build` deben pasar. No hay tests automáticos.

## Estructura

```
app/
  layout.tsx          Fuentes, metadatos SEO, JSON-LD (FurnitureStore), variables de color en <head>
  page.tsx            Orden de las secciones de la página
  globals.css         Tema de Tailwind, utilidades (fondos con degradado, grano, luz LED)
  opengraph-image.tsx Imagen al compartir el link (se genera con next/og)
  icon.svg            Ícono de la pestaña
  robots.ts, sitemap.ts
components/           Una sección por archivo + piezas de apoyo (ver abajo)
data/
  sitio.ts            Fuente única de colores, marca, contacto y TODOS los textos
  trabajos.ts         Fotos de la galería (título, alt, formato) y espacios/carpetas
lib/
  galeria.ts          Arma la lista de fotos leyendo public/trabajos/ (solo servidor)
  lenis.ts            Control del scroll suave: bloquearScroll(), irA("#seccion")
  url.ts              URL pública del sitio
public/
  trabajos/<espacio>/ Fotos reales: cocinas, living, placares, exterior, otros
  logo/               Logo (todavía vacío)
```
