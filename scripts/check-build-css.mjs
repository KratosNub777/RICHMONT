import { readFileSync } from "node:fs";
import { join } from "node:path";

// El manifiesto cliente existe tanto para páginas prerenderizadas como para SSR.
// Solo aceptar los fragmentos de CSS referenciados por esta página.
const manifiesto = readFileSync(".next/server/app/page_client-reference-manifest.js", "utf8");
const enlaces = [...new Set([...manifiesto.matchAll(/["'](static\/[^"'\n]+\.css)["']/g)].map(([, ruta]) => ruta))];
if (!enlaces.length) throw new Error("El manifiesto de la portada no referencia ninguna hoja de estilos.");
const css = enlaces.map((ruta) => readFileSync(join(".next", ruta), "utf8")).join("\n");
const requeridos = ["contenedor", "seccion", "site-header", "header-interior", "hero-interior", "boton", "campo", "modal", "visor-barra"];
const ausentes = requeridos.filter((nombre) => !new RegExp(`\\.${nombre}(?=[\\s{,:.#\\[])`).test(css));
if (ausentes.length) throw new Error(`El CSS compilado está incompleto. Faltan: ${ausentes.join(", ")}. No publicar este artefacto.`);
console.log(`CSS de producción verificado: ${requeridos.length} reglas esenciales presentes.`);
