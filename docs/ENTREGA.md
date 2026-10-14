# Entrega — 14 de octubre de 2026

## Cambios realizados

- Eliminados de la interfaz los diez marcadores de galería, foto de portada pendiente, testimonios de muestra, instrucciones técnicas y contactos sin confirmar.
- Portada compacta que conserva Sora/Inter, negro cálido, fondos hueso/arena y dorado discreto. Muestra qué hace Richmont, para quién y en qué país. Preparada para usar una foto real, sin superponer texto ni recortar el producto.
- Trabajos inmediatamente después de la portada. Actualmente presenta un estado vacío breve con acceso a Instagram y al presupuesto, porque no hay fotos de muebles en los recursos.
- Modelo de proyectos con nombre, categoría, múltiples fotos y descripción, materiales y terminaciones opcionales. Publicación explícita de datos revisados, validación de archivos locales y categorías solo con proyectos disponibles.
- Filtros móviles en varias filas, contadores de proyectos, cuadrículas adaptadas a uno, dos o varios resultados y tandas de seis. La selección conserva el foco; “Mostrar más” lo lleva al primer proyecto agregado.
- Visor con fotos sin deformación, detalles confirmados, anterior/siguiente en móvil y escritorio, flechas del teclado, cierre visible/Escape, foco contenido y restaurado, fondo inerte y lectura accesible.
- “Quiero algo similar” adjunta una referencia al formulario sin sobrescribir sus cuatro campos. WhatsApp directo también conserva nombre y categoría del proyecto.
- “Pedir presupuesto” siempre lleva al formulario. “Consultar por WhatsApp” abre el contacto directo. Número visible e internacional conservados.
- Conservados errores por campo, foco en el primer inválido, `aria-invalid`, `aria-describedby`, campos opcionales y datos escritos. Botón “Continuar en WhatsApp”, explicación honesta y enlace alternativo si el navegador bloquea la pestaña.
- Nosotros compacto con presentación de la empresa y tipos de espacios separados. Se retiraron afirmaciones genéricas sobre materiales y durabilidad que no estaban respaldadas.
- El proceso ahora explica cómo hacer una consulta desde la web. No publica como confirmado el proceso comercial que el código original indicaba revisar con el equipo.
- Contacto muestra solo datos confirmados, con tarjetas clicables amplias. Se retiró el botón flotante para evitar superposición con contenido, campos o acciones; el acceso directo a WhatsApp está en portada, menú móvil, formulario y contacto.
- Eliminados halos, líneas luminosas, transiciones decorativas, parallax y aparición retardada de textos. Foco visible, anclas bajo el encabezado fijo, enlace para saltar al contenido y respeto de movimiento reducido.
- Imágenes preparadas con tamaños adaptables, optimización Next.js, prioridad en portada, carga diferida posterior y espacio reservado.

## Verificación

- Chromium: **29 pruebas aprobadas y 1 omitida por no corresponder** (menú móvil en 1440 px).
- Anchos: **320, 390, 768, 1024 y 1440 px**. En 320 se probó también una altura corta de **568 px**; ambos botones principales quedan visibles.
- Navegación y anclas bajo el encabezado, menú móvil, cierre con Escape, foco contenido y devuelto y cierre al pasar a escritorio: aprobados.
- Filtros, contadores, cuadrículas de uno/dos/varios proyectos, categorías no publicadas y “Mostrar más”: aprobados con datos técnicos de QA.
- Visor: imagen contenida sin deformación, detalles opcionales, controles móviles/escritorio, teclado, bloqueo del fondo, cierre siempre visible y referencia al consultar: aprobados.
- Formulario: errores asociados, foco en el primer inválido, conservación de los cuatro campos y referencia separada: aprobados. Un mensaje preparado se invalida si cambian los campos o el proyecto de referencia.
- Mensaje de WhatsApp decodificado y comparado con el texto esperado, incluyendo espacios, saltos de línea, `ñ`, tildes, `&`, `+`, `%`, `#`, `=` y emoji. Destino verificado: `https://wa.me/595994153494`. Sin enviar consultas reales.
- **Sin desbordamiento horizontal, errores de JavaScript, errores de consola ni contenido técnico de desarrollo** en las vistas comprobadas.
- Axe (WCAG 2 A/AA y 2.1 AA): **sin infracciones detectadas** en página pública y visor. Verificados también el enlace para saltar al contenido y la ausencia de animaciones con movimiento reducido.
- Comparación medida en Chromium a 390 px: la web publicada tenía aproximadamente **9.779 px** de alto; la versión nueva tiene **3.703 px** (aproximadamente **62 % menos**). Nosotros pasó de 1.523 a 344 px y el proceso de 1.354 a 539 px. Los testimonios vacíos ya no ocupan espacio. Las cifras describen esta captura con el contenido actual, no estadísticas comerciales.
- Capturas completas: [320](capturas/inicio-320px.png), [390](capturas/inicio-390px.png), [768](capturas/inicio-768px.png), [1024](capturas/inicio-1024px.png) y [1440](capturas/inicio-1440px.png).
- `npm run typecheck` y `npm run build`: **aprobados**. La compilación final no incluye la ruta temporal de QA.
- Comprobación adicional de la compilación de producción en los cinco anchos: sin desbordamiento, errores de consola/JavaScript ni infracciones Axe; acciones principales visibles. `/qa-richmont` responde **404**. [Registro](capturas/validacion-produccion.json). Las capturas entregadas corresponden a esta compilación, sin indicadores del servidor de desarrollo.

## Fotografías y datos que faltan

El repositorio contiene únicamente `.gitkeep` en `public/trabajos/` y `public/logo/`. No se encontraron fotografías reales ni opiniones autorizadas. Faltan:

1. Una foto de portada de un proyecto terminado que muestre el ambiente y el mueble completos.
2. Fotos autorizadas de cada proyecto, con nombre, categoría, descripción y dimensiones originales. Materiales, herrajes y terminaciones únicamente cuando estén confirmados.
3. Información sobre las personas detrás de Richmont, taller/equipo, fotos reales y proceso efectivo de diseño, fabricación e instalación.
4. Opiniones reales y permiso para publicar texto, atribución y trabajo realizado.
5. Ciudad, dirección, zona de cobertura, horarios, email, Facebook y enlace a Maps si corresponde.
6. Archivo original del logo; por ahora se conserva la marca tipográfica.

## Límites

- No se puede publicar evidencia fotográfica real ni revisar encuadres individuales sin recibir esas fotos. Galería y visor se verifican con patrones técnicos aislados de la web pública; no se presentan como trabajos de Richmont.
- La verificación de navegador usa Chromium con anchos de escritorio y móvil; no sustituye una prueba en dispositivos físicos ni en Safari/iOS.
- No se envían mensajes reales. Se verifica la URL, el destino, el contenido decodificado y el comportamiento cuando se bloquea una pestaña. La recepción en WhatsApp depende del usuario y del servicio externo.
- Los cambios se entregan en una rama del repositorio para revisión mediante un PR. No se ha publicado una nueva versión en `richmont-drab.vercel.app`; el enlace público seguirá mostrando la versión anterior hasta desplegar estos cambios mediante la integración existente de Vercel.
