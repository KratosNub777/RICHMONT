import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Verifica el CSS que recibe el navegador, tanto local como en una URL desplegada.
const url = new URL(process.argv[2] ?? "http://127.0.0.1:3000");
const salida = resolve(process.argv[3] ?? "test-results/production");
mkdirSync(salida, { recursive: true });
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}),
});
const resultados = [];
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 320 ? 568 : width < 768 ? 844 : 1000 } });
    const page = await context.newPage();
    const errores = [];
    page.on("pageerror", (error) => errores.push(error.message));
    page.on("console", (mensaje) => { if (mensaje.type() === "error") errores.push(mensaje.text()); });
    const respuesta = await page.goto(url.href);
    assert.equal(respuesta?.status(), 200, `La web no responde correctamente: ${url}`);
    await page.locator(".site-header").waitFor();
    await page.evaluate(() => document.fonts.ready);
    const estilos = await page.evaluate(() => {
      const estilo = (selector) => getComputedStyle(document.querySelector(selector));
      const boton = document.querySelector("#inicio .hero-consulta .boton");
      return {
        encabezado: estilo(".site-header").position,
        portada: estilo(".hero-interior").display,
        margen: parseFloat(estilo(".contenedor").paddingInlineStart),
        seccion: parseFloat(estilo("#trabajos .seccion").paddingBlockStart),
        boton: estilo("#inicio .hero-consulta .boton").display,
        fondoBoton: estilo("#inicio .hero-consulta .boton").backgroundColor,
        altoBoton: boton.getBoundingClientRect().height,
        bordeCampo: parseFloat(estilo(".campo").borderTopWidth),
        titulo: parseFloat(estilo("h1").fontSize),
        desborde: document.documentElement.scrollWidth > innerWidth,
      };
    });
    await page.screenshot({ path: resolve(salida, `inicio-${width}px.png`), fullPage: true, caret: "initial" });
    console.log(`${width}px: ${JSON.stringify(estilos)}`);
    assert.equal(estilos.encabezado, "fixed", "No se está aplicando el CSS del encabezado.");
    assert.equal(estilos.portada, "grid", "La portada está recibiendo estilos incompletos o anteriores.");
    assert.ok(estilos.margen >= 20 && estilos.seccion >= 40, "Faltan márgenes y separación de secciones.");
    assert.ok(["flex", "inline-flex"].includes(estilos.boton), "Los botones perdieron su estilo.");
    assert.notEqual(estilos.fondoBoton, "rgba(0, 0, 0, 0)", "El botón principal perdió su fondo.");
    assert.ok(estilos.altoBoton >= 48 && estilos.bordeCampo >= 1, "Faltan estilos de controles o campos.");
    assert.ok(estilos.titulo <= 72, "Se está usando una escala tipográfica anterior.");
    assert.equal(estilos.desborde, false, "Hay desbordamiento horizontal.");
    assert.deepEqual(errores, [], "El navegador detectó errores.");
    const accesibilidad = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    assert.deepEqual(accesibilidad.violations, [], "Axe detectó problemas de accesibilidad.");
    resultados.push({ width, estilos, errores, infraccionesAxe: accesibilidad.violations.length });
    await context.close();
  }
  writeFileSync(resolve(salida, "validacion-css.json"), JSON.stringify({ url: url.href, resultados }, null, 2) + "\n");
  console.log(`Validación del despliegue aprobada en cinco anchos: ${url}`);
} finally {
  await browser.close();
}
