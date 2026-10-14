import { readFileSync } from "node:fs";
import { join } from "node:path";

// Revisar las hojas referenciadas por la portada, sin aceptar fragmentos de builds anteriores.
const html = readFileSync(".next/server/app/index.html", "utf8");
const enlaces = [...html.matchAll(/<link\b[^>]*>/g)]
  .map(([tag]) => /\brel="stylesheet"/.test(tag) ? tag.match(/\bhref="([^"]+)"/)?.[1] : undefined)
  .filter(Boolean);
if (!enlaces.length) throw new Error("La portada compilada no referencia ninguna hoja de estilos.");
const css = enlaces.map((href) => {
  const ruta = new URL(href, "https://richmont.invalid").pathname;
  if (!ruta.startsWith("/_next/static/")) throw new Error(`Hoja de estilos inesperada: ${ruta}`);
  return readFileSync(join(".next", ruta.slice("/_next/".length)), "utf8");
}).join("\n");
const requeridos = ["contenedor", "seccion", "site-header", "header-interior", "hero-interior", "boton", "campo", "modal", "visor-barra"];
const ausentes = requeridos.filter((nombre) => !new RegExp(`\\.${nombre}(?=[\\s{,:.#\\[])`).test(css));
if (ausentes.length) throw new Error(`El CSS compilado está incompleto. Faltan: ${ausentes.join(", ")}. No publicar este artefacto.`);
console.log(`CSS de producción verificado: ${requeridos.length} reglas esenciales presentes.`);
