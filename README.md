# Richmont Furniture: página web

Web oficial de **Richmont Furniture** (muebles a medida, Paraguay · [@richmontpy](https://www.instagram.com/richmontpy/)).
Hecha con Next.js, Tailwind CSS y Motion. Está lista para publicarse gratis en Vercel.

## Cómo correrla en tu computadora

1. Instalá [Node.js](https://nodejs.org) (versión 20.9 o más nueva).
2. En una terminal, dentro de la carpeta del proyecto:
   ```bash
   npm install      # solo la primera vez
   npm run dev      # abre la web en http://localhost:3000
   ```
3. Los cambios que guardes se ven al instante en el navegador.

Antes de publicar podés comprobar que todo compile con `npm run build` y `npm run lint`.

## Qué editar y dónde

| Quiero cambiar…                                    | Archivo / carpeta                     |
| -------------------------------------------------- | ------------------------------------- |
| Colores, textos, WhatsApp, email, horarios, logo   | `data/sitio.ts`                       |
| Títulos y descripciones de las fotos               | `data/trabajos.ts`                    |
| Fotos de los trabajos                              | `public/trabajos/<espacio>/`          |
| Logo                                               | `public/logo/` + `data/sitio.ts`      |

### Fotos de trabajos

- Copiá las fotos a la carpeta del espacio: `cocinas`, `living`, `placares`, `exterior` u `otros`.
- **Aparecen solas en la galería.** El título se arma con el nombre del archivo
  (`cocina-blanca.jpg` → "Cocina blanca").
- Si querés un título o una descripción mejor, agregá la foto en `data/trabajos.ts` (hay un ejemplo).
- Formatos: JPG, PNG, WEBP o AVIF. Subilas en buena calidad: la web las optimiza sola.
- Un espacio sin fotos no aparece en los filtros de la galería. Al sumarle la primera foto, aparece solo.
- La galería muestra 6 fotos y un botón **"Mostrar más (+6)"**. Se cambia con `PASO` en `components/GaleriaTrabajos.tsx`.

### Foto de portada (hero)

En `data/sitio.ts`, dentro de `hero`, completá `foto` (por ejemplo `"/trabajos/cocinas/cocina-01.jpg"`)
y `fotoAlt` con una descripción breve de la foto.

### Logo

1. Copiá el archivo (ideal SVG o PNG con fondo transparente) a `public/logo/`.
2. En `data/sitio.ts`, completá `marca.logo` con la ruta y su tamaño real en píxeles:
   `{ src: "/logo/richmont.svg", ancho: 600, alto: 180 }`.
3. Sobre fondos claros, la web lo oscurece automáticamente con un filtro, sin modificar ni deformar el original.
4. Opcional: reemplazá `app/icon.svg` (el ícono de la pestaña) por el isotipo real.

### Datos pendientes

Email, Facebook, dirección, ciudad y horarios están en `null` dentro de `data/sitio.ts`.
Mientras sigan así, la web muestra un marcador **"Pendiente"**. Al completarlos, también se agregan
automáticamente a los datos para Google. Los testimonios se cargan en la lista `testimonios` del mismo archivo
(solo opiniones reales, con permiso del cliente).

## Publicarla en Vercel (gratis)

1. Entrá a [vercel.com](https://vercel.com) y registrate con tu cuenta de GitHub.
2. **Add New → Project** → elegí el repositorio `RICHMONT` → **Deploy**.
   No hace falta configurar nada: Vercel detecta Next.js solo.
3. En un minuto te da un link del tipo `https://richmont-xxxx.vercel.app` para compartir.
4. Cada vez que subas cambios a GitHub, la web se actualiza sola.

Si después compran un dominio propio (por ejemplo `richmont.com.py`), se conecta en
**Settings → Domains** de Vercel. Además, agregá la variable `NEXT_PUBLIC_SITE_URL` con esa dirección
en **Settings → Environment Variables** para que Google y las redes usen el dominio correcto.

## Estructura del código

```
app/            página, layout (SEO, fuentes), sitemap, robots, imagen para compartir
components/     cada sección de la página (Hero, Trabajos, Proceso, Presupuesto…)
data/           textos, colores y lista de trabajos: lo que se edita seguido
lib/            utilidades (lectura de la galería, scroll suave, URL del sitio)
public/         logo y fotos
```
