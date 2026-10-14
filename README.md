# Richmont Furniture

Web de muebles a medida en Paraguay: Next.js, React y Tailwind CSS. Mantiene WhatsApp **0994 153 494** (`595994153494`) e Instagram [@richmontpy](https://www.instagram.com/richmontpy/).

## Desarrollo y comprobaciones

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

Pruebas de navegador y accesibilidad en 320, 390, 768, 1024 y 1440 px:

```sh
npx playwright install chromium
npm run test:e2e
```

Si Chromium ya está instalado, se puede usar sin descargar otro navegador:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e
```

Los tests interceptan WhatsApp: no envían consultas ni abren conversaciones reales. La galería se prueba con patrones técnicos y proyectos ficticios **solo en una ruta temporal de QA**. El servidor de pruebas usa el puerto 3100 y `.next-qa`, separado de desarrollo. La ruta `app/qa-richmont/` se elimina al detener el servidor. No debe existir antes de compilar producción.

## Contenido confirmado

- `data/sitio.ts`: identidad, textos, contactos y opiniones autorizadas.
- `data/trabajos.ts`: proyectos revisados y sus fotografías.
- `public/trabajos/<categoría>/`: archivos JPG, JPEG, PNG, WEBP o AVIF.
- `public/logo/`: logo cuando se disponga del original.

Los datos `null` se omiten; los testimonios vacíos se ocultan. El repositorio actual no contiene fotos de proyectos, logo ni opiniones. Por eso muestra una portada tipográfica compacta y una galería vacía con acciones útiles.

## Publicar proyectos reales

1. Copiar las fotos autorizadas a `public/trabajos/<categoría>/`.
2. Agregar un proyecto a `trabajos` en `data/trabajos.ts` con un `id` único, `titulo`, `espacio` y `fotos`.
3. Cada foto requiere `src`, `alt` descriptivo y dimensiones originales `ancho`/`alto` en píxeles.
4. Agregar `descripcion`, `materiales` y `terminaciones` únicamente si están confirmados. Los campos opcionales ausentes no aparecen.
5. Revisar visualmente cada foto en móvil y escritorio antes de publicar.

La primera fotografía es la portada de la tarjeta. No se recorta el producto: las imágenes se ajustan con `object-contain`. Se generan tamaños de imagen adaptados al dispositivo y se difiere la carga de las tarjetas. Las rutas inexistentes o sin información accesible se excluyen. Copiar un archivo por sí solo no lo publica: hay que revisar e incluir explícitamente el proyecto. Así se evita inferir títulos, atribución o datos a partir del nombre de un archivo.

Solo aparecen categorías con proyectos válidos. Los contadores cuentan proyectos, no fotos; se muestran seis proyectos por tanda. El visor puede recorrer todas las fotos del filtro actual. “Quiero algo similar” adjunta una referencia independiente sin cambiar ningún campo del formulario.

La primera foto del primer proyecto válido se usa también en la portada. Se puede elegir otra foto real en `hero.foto` de `data/sitio.ts`, con el mismo formato de datos. La foto principal tiene carga prioritaria, conserva proporciones y se presenta separada del texto.

## Contacto y opiniones

Completar solo datos confirmados: ciudad, dirección, cobertura, horarios, email, Facebook y Maps. Un enlace a Maps se muestra con la ubicación cuando esta tiene texto confirmado. Las opiniones requieren permiso para publicar texto y atribución.

El formulario prepara un enlace a WhatsApp; la persona revisa y termina de enviar el mensaje allí. No hay envío desde la web ni confirmación de recepción.

## Publicación en Vercel

El proyecto conserva su configuración de Next.js y su repositorio. Publicar mediante la integración existente de Vercel. `NEXT_PUBLIC_SITE_URL` permite configurar el dominio canónico; en Vercel se utiliza también `VERCEL_PROJECT_PRODUCTION_URL` cuando está disponible.

Ver la entrega y los pendientes en [docs/ENTREGA.md](docs/ENTREGA.md).
