# Corrección del CSS publicado

El 14 de octubre de 2026 se comprobó que la URL pública servía los componentes nuevos con una hoja de estilos anterior. El archivo descargado no contenía `.contenedor`, `.site-header` ni `.boton`, y conservaba la escala tipográfica previa. En el navegador se observaban encabezado estático, portada sin cuadrícula, márgenes de 0 px, botones sin fondo y campos sin borde.

La comprobación local anterior usó una compilación limpia y no detectó el artefacto que terminó sirviendo Vercel. Ese resultado no validaba el despliegue real.

## Corrección

- Se reemplaza el loader `@tailwindcss/turbopack` por `@tailwindcss/postcss`, la integración indicada en la documentación instalada de Next.js.
- `npm run build` comprueba las hojas de estilo que referencia la portada compilada. Falla si faltan las reglas esenciales; no acepta fragmentos antiguos que hayan quedado en el directorio de compilación.
- `npm run verify:site -- <URL>` abre la URL real en Chromium y comprueba estilos calculados, márgenes, botones, campos, tipografía, desbordamiento, consola y accesibilidad en cinco anchos. Guarda capturas y un informe JSON.
- La suite de QA deja de borrar su caché al iniciar, para que las pruebas no oculten fallos de invalidación.

## Pruebas

- La nueva comprobación reproduce el fallo de la URL pública: `position: static`, `display: block`, márgenes de 0 px y controles sin estilos.
- Dos compilaciones consecutivas con caché: una regla CSS temporal se incorpora al agregarla y desaparece al retirarla. El archivo fuente queda restaurado y la regla de prueba no se publica.
- Compilación de producción con la corrección: nueve reglas esenciales presentes.
- Verificación en Chromium a 320, 390, 768, 1024 y 1440 px: encabezado fijo, cuadrícula, márgenes, botones de 48 px y bordes de campos presentes. Sin desbordamientos, errores de consola/JavaScript ni infracciones detectadas por Axe.
- Suite funcional: 29 pruebas aprobadas y una omitida porque el menú móvil no corresponde en 1440 px.

La publicación en Vercel debe verificarse con `verify:site` después de incorporar esta corrección. Una compilación local correcta por sí sola no confirma el estado de la web pública.
