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

## Cómo funciona

### Orden de la página (`app/page.tsx`)

`Header` → `Hero` → `Nosotros` → `Trabajos` → `Proceso` → `Testimonios` → `Presupuesto` → `Contacto` (footer) +
`WhatsappFlotante`. Entre secciones de distinto color se usa `<Transicion de="…" a="…" />`, un degradado suave
para que nunca haya un corte brusco claro/oscuro. Los `id` de ancla son `#inicio`, `#nosotros`, `#trabajos`,
`#proceso`, `#presupuesto`, `#contacto` y coinciden con `navegacion` en `data/sitio.ts`.

### Todo el contenido sale de `data/sitio.ts`

Los componentes no tienen textos escritos a mano: importan de `data/sitio.ts` (`marca`, `contacto`, `hero`,
`nosotros`, `trabajosTextos`, `proceso`, `testimonios`, `presupuestoTextos`, `contactoTextos`, `navegacion`).
Para cambiar un texto, un dato de contacto o un color se edita ese archivo, no el componente.

- **Colores:** `colores` se inyecta como variables CSS (`--hueso`, `--negro`, …) en un `<style>` del `<head>`
  (`layout.tsx`) y `globals.css` las conecta con Tailwind (`bg-hueso`, `text-grafito`, `border-roble`…).
  Para agregar un color: súmalo a `colores` y a `@theme inline` en `globals.css`.
  Los colores `*Texto` son las versiones oscuras para texto chico sobre fondo claro (contraste AA).
- **Datos pendientes:** `PENDIENTE` (`null`) marca lo que falta (email, Facebook, dirección, ciudad, horarios,
  logo, testimonios). La web muestra un marcador visible ("Pendiente") en vez de inventar información. Nunca
  inventes datos del negocio, reseñas ni fotos: dejá `null`.
- **WhatsApp:** `linkWhatsapp(mensaje)` arma el `wa.me/…?text=…`. Número en `contacto.whatsappInternacional`.

### Galería de trabajos

1. `lib/galeria.ts` (`import "server-only"`) se ejecuta **al construir la web**: lee `public/trabajos/<espacio>/`
   (jpg, jpeg, png, webp, avif) y devuelve `ItemGaleria[]`.
2. Primero van las fotos declaradas en `data/trabajos.ts` (en ese orden, con su título, `alt` y `formato`).
3. Después las que están en la carpeta pero no en el archivo: el título sale del nombre del archivo
   (`cocina-blanca.jpg` → "Cocina blanca").
4. Los espacios sin fotos no aparecen en los filtros (`Trabajos.tsx` los descarta) y no se generan recuadros vacíos.
5. `Trabajos.tsx` (servidor) pasa los datos a `GaleriaTrabajos.tsx` (cliente): filtros por espacio con contador,
   mosaico con `grid-flow-dense` y `Lightbox.tsx` (visor a pantalla completa con teclado, swipe y foco atrapado).
6. **Mostrar más:** al inicio se ven 6 fotos y el botón "Mostrar más (+6)" suma 6 por clic (constante `PASO` en
   `GaleriaTrabajos.tsx`). Al cambiar de filtro vuelve a 6 y el botón desaparece cuando ya se ven todas. El lightbox
   recorre todas las fotos del filtro, no solo las visibles. Mismo comportamiento que la web de referencia
   https://mausa.vercel.app/.

`formato` define el tamaño en el mosaico: `vertical` = 2 filas, `horizontal` = 2 columnas, `cuadrado` = 1×1.
Usá `vertical` para fotos de celular verticales y `horizontal` para las apaisadas.

Para agregar fotos: copiarlas a `public/trabajos/<espacio>/` con un **nombre descriptivo** (nada de
"WhatsApp Image…") y, mejor aún, registrarlas en `data/trabajos.ts`. Espacios válidos: `cocinas`, `living`,
`placares`, `exterior`, `otros` (la lista está en `espacios`, mismo archivo).

Estado actual: 25 fotos (16 cocinas, 2 living, 7 placares). `exterior` y `otros` no tienen fotos todavía, por eso
no aparecen como filtro; cuando se agregue una foto a esas carpetas, el filtro aparece solo.

### Imágenes

Se usa siempre `next/image`. En `next.config.ts` está `images.qualities: [70, 80]`: **cualquier `quality` que se
use en un `<Image>` tiene que estar en esa lista** o Next falla. La galería usa 70 y el hero 80. Formatos
AVIF/WebP. Las fotos originales son de ~720p–960p (vienen de WhatsApp): para la portada hace falta una foto
horizontal de 1920 px o más.

### Hero (portada)

`hero.foto` en `data/sitio.ts` está en `null`: mientras tanto se muestra una composición de luz LED animada. Si se
completa `foto` (y `fotoAlt`), pasa a ser foto de fondo con parallax y degradados oscuros encima.

### Presupuesto

`Presupuesto.tsx` es un formulario del lado del cliente. Nombre y tipo de espacio son obligatorios; medidas y mensaje
son opcionales. El tipo de espacio se elige con botones (radios con aspecto de pastilla, opciones en
`presupuestoTextos.tiposDeEspacio`). Las medidas son tres campos numéricos en **centímetros** (largo, alto y fondo),
cada uno de 1 a 4 dígitos enteros; si alguno es inválido se muestra el error. Al enviar valida, arma un mensaje de
texto (ej.: "320 cm de largo × 240 cm de alto") y abre WhatsApp con `linkWhatsapp`. No se guarda nada.

El formulario se presenta en una tarjeta de dos paneles: presentación oscura e ilustración decorativa a la
izquierda, campos claros a la derecha; en móvil se apilan. Los datos están agrupados en dos bloques y el
botón de WhatsApp ocupa todo el ancho. Los campos se muestran desde el inicio, sin animación de entrada.
Los textos de presentación y ayuda visual están en `presupuestoTextos` dentro de `data/sitio.ts`.

### Movimiento y scroll

- `components/movimiento.tsx`: `Revelar`, `TituloRevelado`, `Magnetico`, `Parallax` (Motion).
- `components/Proveedores.tsx`: inicia Lenis (scroll suave) y `MotionConfig reducedMotion="user"`. Si la persona
  tiene activado "reducir movimiento", Lenis no se inicia y Motion baja las animaciones.
- Siempre que se abra algo que tape la página (menú, lightbox) usá `bloquearScroll(true/false)` de `lib/lenis.ts`.
  Para ir a una sección desde código usá `irA("#trabajos")`.
- La curva de easing común es `[0.22, 1, 0.36, 1]` (clase `ease-mueble` en Tailwind).

### SEO y compartir

- `layout.tsx`: metadatos, Open Graph (`es_PY`), Twitter y JSON-LD `FurnitureStore` con solo datos confirmados.
- `lib/url.ts`: la URL pública sale de `NEXT_PUBLIC_SITE_URL` o, en Vercel, de `VERCEL_PROJECT_PRODUCTION_URL`;
  en local es `http://localhost:3000`. Si compran dominio propio, definir `NEXT_PUBLIC_SITE_URL` en Vercel.
- `app/opengraph-image.tsx` genera la imagen para compartir con la paleta de la marca.

### Accesibilidad (mantenerla)

Enlace "Saltar al contenido", `aria-labelledby` en cada sección, foco visible (ámbar en oscuro, negro en
`.tono-claro`), contraste AA, `alt` descriptivo en todas las fotos, lightbox con foco atrapado y cierre con Esc.

### Tailwind y Turbopack

`next.config.ts` define una regla de Turbopack para procesar `*.css` con `@tailwindcss/turbopack`. El repo tiene una
rama `codex/corregir-css-produccion` que sugiere un problema de CSS en producción: no quites esa regla ni cambies la versión
de Tailwind sin probar `npm run build && npm run start`.

## Despliegue (Vercel)

- Vercel despliega desde GitHub. Se asume que la rama de producción es `main` (confirmarlo en el panel de Vercel,
  Settings → Git → Production Branch): cada push a esa rama debería generar un despliegue nuevo.
- **Posible bloqueo por autor:** Vercel (sobre todo en el plan Hobby) puede no desplegar un commit cuyo **autor**
  no es una cuenta de GitHub con acceso al proyecto. Por eso todos los commits deben ir con el autor de la sección
  siguiente (`KratosNub777`, con el correo asociado a su GitHub). Un commit con otro autor puede quedar sin
  desplegar. Este punto es una sospecha, no está confirmado en el panel.
- Si una foto o cambio no aparece en la web publicada: revisar en el panel de Vercel que el último despliegue sea del
  último commit y que no esté bloqueado; después, recarga forzada (Ctrl+Shift+R).

## Cómo trabajar con git (obligatorio)

### Autor de los commits

Todos los commits van a nombre del dueño del repositorio:

```bash
git config user.name  "KratosNub777"
git config user.email "facundovera0702@gmail.com"
```

Verificá con `git config user.name && git config user.email` **antes del primer commit** de cada sesión y, si no
coincide, configurala (solo para este repo, sin `--global`). No uses otro nombre ni correo, y no cambies el autor
de commits ya publicados.

### Muchos commits pequeños

- **Un commit = un cambio lógico y chico.** Si un trabajo toca varias cosas, se divide en varios commits.
- Hacé commit **a medida que avanzás**, no al final: cada paso que compila y tiene sentido por sí solo, se commitea.
- Qué va separado:
  - agregar fotos a una carpeta (`public/trabajos/<espacio>/`) **separado** de registrarlas en `data/trabajos.ts`;
  - cambios de textos/datos (`data/sitio.ts`) separados de cambios de código o de estilos;
  - un componente por commit; refactors separados de funcionalidades nuevas;
  - documentación (`README.md`, `CLAUDE.md`) en su propio commit.
- Para fotos: como mucho unas 3–5 por commit (por ejemplo, "Agregar 4 fotos de cocinas en roble claro").
- Usá `git add <archivos concretos>`; nunca `git add .` ni `git add -A` sin mirar antes `git status`.
- Mensajes: en español, en imperativo y cortos (menos de ~70 caracteres), que digan qué cambió. Ejemplos del
  historial: "Rediseñar botón flotante de WhatsApp", "Agregar franja de materiales con marquee lento".
- Antes de commitear código: `npm run lint`. Antes de hacer push de varios commits: `npm run build`.
- Se trabaja y se hace push en `main` (`git push -u origin main`). No se abren pull requests a menos que el dueño
  lo pida. Nunca reescribir el historial de `main` (sin `--force`) sin permiso explícito.

## Qué falta completar (no inventar)

- Logo: copiar a `public/logo/` y completar `marca.logo` (`src`, `ancho`, `alto`).
- Email, Facebook, dirección, ciudad y horarios en `contacto` (hoy `null`).
- Testimonios reales de clientes (con su permiso) en `testimonios`.
- Foto de portada en `hero.foto`.
- Fotos de `exterior` y `otros`.
- Revisar con el equipo que los pasos de `proceso` describan cómo trabajan realmente.
