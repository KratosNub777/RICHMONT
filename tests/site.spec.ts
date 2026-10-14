import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const errores = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const lista: string[] = [];
  errores.set(page, lista);
  page.on("pageerror", (error) => lista.push(error.message));
  page.on("console", (mensaje) => { if (mensaje.type() === "error") lista.push(mensaje.text()); });
  await page.addInitScript(() => {
    Object.assign(window, { aperturasQA: [] });
    window.open = (url, target, features) => {
      (window as unknown as { aperturasQA: unknown[] }).aperturasQA.push({ url: String(url), target, features });
      return null;
    };
  });
});
test.afterEach(async ({ page }) => { expect(errores.get(page)).toEqual([]); });

async function sinDesborde(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function mockFotos(page: Page) {
  // PNG técnico de 1 × 1. Ninguna fotografía ni consulta sale del navegador.
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aDwAAAABJRU5ErkJggg==", "base64");
  await page.route("**/_next/image?**", (route) => route.fulfill({ status: 200, contentType: "image/png", body: png }));
}

test("contenido público, acciones y anclas", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("body")).not.toContainText(/pendiente|data\/sitio|Nombre del cliente|Testimonio de ejemplo|Foto de portada/i);
  await expect(page.locator("#testimonios")).toHaveCount(0);
  await expect(page.locator("#trabajos")).toContainText("Todavía no hay proyectos publicados");
  await expect(page.getByRole("group", { name: "Filtrar trabajos" })).toHaveCount(0);
  for (const enlace of await page.getByRole("link", { name: "Pedir presupuesto", exact: true }).all()) {
    await expect(enlace).toHaveAttribute("href", "#presupuesto");
  }
  for (const enlace of await page.locator('a[href^="https://wa.me/"]').all()) {
    const url = new URL((await enlace.getAttribute("href"))!);
    expect(url.pathname).toBe("/595994153494");
    expect(url.searchParams.get("text")).toContain("Richmont");
  }
  const acciones = page.locator("#inicio .hero-consulta .boton");
  for (const accion of await acciones.all()) {
    const caja = (await accion.boundingBox())!;
    expect(caja.y + caja.height).toBeLessThanOrEqual(page.viewportSize()!.height);
    expect(caja.height).toBeGreaterThanOrEqual(44);
  }
  for (const id of ["trabajos", "nosotros", "proceso", "presupuesto", "contacto"]) {
    await page.locator(`footer nav a[href="#${id}"]`).click();
    await expect.poll(async () => Math.round((await page.locator(`#${id}`).boundingBox())!.y)).toBeGreaterThanOrEqual(72);
    await sinDesborde(page);
  }
  await page.evaluate(() => { window.scrollTo(0, 0); (document.activeElement as HTMLElement)?.blur(); });
  await page.screenshot({ path: `test-results/inicio-${testInfo.project.name}.png`, fullPage: true });
});

test("menú móvil: foco, Escape, anclas y cambio de tamaño", async ({ page }) => {
  test.skip(page.viewportSize()!.width >= 1280, "Menú de escritorio en este ancho");
  await page.goto("/");
  const abrir = page.getByRole("button", { name: "Abrir menú", exact: true });
  await abrir.click();
  const dialogo = page.getByRole("dialog", { name: "Menú", exact: true });
  await expect(dialogo).toBeVisible();
  await expect(dialogo.getByRole("button", { name: "Cerrar menú" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialogo.getByRole("link", { name: "@richmontpy" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialogo.getByRole("button", { name: "Cerrar menú" })).toBeFocused();
  await page.locator("#inicio a").first().evaluate((el: HTMLElement) => el.focus());
  expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialogo).toHaveCount(0);
  await expect(abrir).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
  await abrir.click();
  await page.getByRole("dialog").getByRole("link", { name: "Presupuesto", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#presupuesto")).toBeFocused();
  expect((await page.locator("#presupuesto").boundingBox())!.y).toBeGreaterThanOrEqual(72);
  await abrir.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await sinDesborde(page);
});

test("formulario: errores accesibles, preservación y codificación de WhatsApp", async ({ page }) => {
  await page.goto("/#presupuesto");
  const nombre = page.getByLabel("Nombre", { exact: false });
  const espacio = page.getByLabel("Tipo de espacio");
  const medidas = page.getByLabel("Medidas aproximadas");
  const mensaje = page.getByLabel("Mensaje", { exact: false });
  const texto = "Quiero cajones & estantes + luz 100%\n¿En color café? #idea = sí 🪑";
  await medidas.fill("3,20 × 2,40 m");
  await mensaje.fill(texto);
  await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  await expect(nombre).toBeFocused();
  await expect(nombre).toHaveAttribute("aria-invalid", "true");
  await expect(espacio).toHaveAttribute("aria-invalid", "true");
  for (const campo of [nombre, espacio]) {
    const descripcion = await campo.getAttribute("aria-describedby");
    expect(descripcion).toBeTruthy();
    await expect(page.locator(`[id="${descripcion}"]`)).toBeVisible();
  }
  await expect(mensaje).toHaveValue(texto);
  await nombre.fill("María José Ñúñez");
  await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  await expect(espacio).toBeFocused();
  await espacio.selectOption("Cocina");
  await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  const aperturas = await page.evaluate(() => (window as unknown as { aperturasQA: { url: string; target: string; features: string }[] }).aperturasQA);
  expect(aperturas).toHaveLength(1);
  const url = new URL(aperturas[0].url);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/595994153494");
  expect(url.searchParams.get("text")).toBe(`¡Hola Richmont! Quiero pedir un presupuesto.\n\n• Nombre: María José Ñúñez\n• Espacio: Cocina\n• Medidas aproximadas: 3,20 × 2,40 m\n\n${texto}`);
  expect(aperturas[0]).toMatchObject({ target: "_blank", features: "noopener,noreferrer" });
  await expect(page.getByRole("link", { name: "abrir el mensaje en WhatsApp" })).toHaveAttribute("href", aperturas[0].url);
  await expect(page.locator("form")).not.toContainText(/enviado|recibimos|gracias por enviar/i);
  await expect(mensaje).toHaveValue(texto);
  await expect(nombre).toHaveValue("María José Ñúñez");
  await nombre.fill("Otro nombre");
  await expect(page.getByRole("link", { name: "abrir el mensaje en WhatsApp" })).toHaveCount(0);
  await sinDesborde(page);
});

test("galería: conteos, filtros en filas, uno/dos/varios y tandas", async ({ page }) => {
  await mockFotos(page);
  await page.goto("/qa-richmont");
  const tarjetas = page.locator(".proyecto-card");
  await expect(tarjetas).toHaveCount(6);
  await expect(page.getByRole("button", { name: "Todos 9", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: /Exterior/ })).toHaveCount(0);
  for (const [filtro, cantidad] of [["Cocinas 2", 2], ["Placares 1", 1], ["Living 6", 6]] as const) {
    const boton = page.getByRole("button", { name: filtro, exact: true });
    await boton.focus();
    await page.keyboard.press("Enter");
    await expect(boton).toBeFocused();
    await expect(tarjetas).toHaveCount(cantidad);
    await expect(page.getByRole("status").first()).toContainText(`${cantidad} ${cantidad === 1 ? "proyecto" : "proyectos"}`);
    await expect(page.locator(".galeria-grid")).toHaveAttribute("data-cantidad", String(Math.min(cantidad, 3)));
    const contenedor = (await page.locator(".galeria-grid").boundingBox())!;
    const caja = (await tarjetas.first().boundingBox())!;
    const columnas = page.viewportSize()!.width >= 1024 && cantidad > 2 ? 3 : page.viewportSize()!.width >= 768 && cantidad > 1 ? 2 : 1;
    expect(caja.width).toBeGreaterThan(contenedor.width / columnas - 30);
    if (columnas === 1) expect(Math.abs(caja.width - contenedor.width)).toBeLessThan(2);
    await sinDesborde(page);
  }
  await page.getByRole("button", { name: "Todos 9", exact: true }).click();
  await page.getByRole("button", { name: "Mostrar más proyectos" }).click();
  await expect(tarjetas).toHaveCount(9);
  await expect(tarjetas.nth(6)).toBeFocused();
  await expect(page.getByRole("button", { name: "Mostrar más proyectos" })).toHaveCount(0);
  for (const boton of await page.getByRole("group", { name: "Filtrar trabajos por espacio" }).getByRole("button").all()) {
    const caja = (await boton.boundingBox())!;
    expect(caja.x).toBeGreaterThanOrEqual(0);
    expect(caja.x + caja.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    expect(caja.height).toBeGreaterThanOrEqual(44);
  }
});

test("visor: teclado, foco, detalles y referencia sin sobrescribir el formulario", async ({ page }) => {
  await mockFotos(page);
  await page.goto("/qa-richmont");
  await page.getByLabel("Nombre", { exact: false }).fill("Ana & José");
  await page.getByLabel("Tipo de espacio").selectOption("Oficina");
  await page.getByLabel("Medidas aproximadas").fill("4 × 2 m");
  await page.getByLabel("Mensaje", { exact: false }).fill("Mi idea original\nCon estantes");
  await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  await expect(page.getByRole("link", { name: "abrir el mensaje en WhatsApp" })).toBeVisible();
  const origen = page.getByRole("button", { name: "Ver proyecto: Proyecto de prueba 1", exact: true });
  await origen.click();
  const visor = page.getByRole("dialog");
  await expect(visor).toBeVisible();
  await expect(visor.getByRole("button", { name: "Cerrar visor" })).toBeFocused();
  await expect(visor.getByRole("heading")).toHaveText("Proyecto de prueba 1");
  await expect(visor).toContainText("Cocinas");
  await expect(visor).toContainText("Dato técnico de prueba");
  await expect(visor).toContainText("Terminación de prueba");
  await page.keyboard.press("Shift+Tab");
  await expect(visor.getByRole("link")).toBeFocused();
  expect((await visor.getByRole("button", { name: "Cerrar visor" }).boundingBox())!.y).toBeGreaterThanOrEqual(0);
  await page.keyboard.press("Tab");
  await expect(visor.getByRole("button", { name: "Cerrar visor" })).toBeFocused();
  await page.locator('input[name="nombre"]').evaluate((el: HTMLElement) => el.focus());
  expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  await page.keyboard.press("ArrowRight");
  await expect(visor.getByRole("img")).toHaveAttribute("alt", "Patrón técnico de prueba 1, imagen 2");
  await visor.getByRole("button", { name: "Foto anterior" }).click();
  await expect(visor.getByRole("img")).toHaveAttribute("alt", "Patrón técnico de prueba 1, imagen 1");
  await expect(visor.getByRole("img")).toHaveCSS("object-fit", "contain");
  const whatsapp = new URL((await visor.getByRole("link").getAttribute("href"))!);
  expect(whatsapp.pathname).toBe("/595994153494");
  expect(whatsapp.searchParams.get("text")).toContain("Proyecto de prueba 1» (Cocinas)");
  await page.keyboard.press("Escape");
  await expect(visor).toHaveCount(0);
  await expect(origen).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
  await origen.click();
  const accesibilidad = await new AxeBuilder({ page }).include("dialog").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accesibilidad.violations).toEqual([]);
  await visor.getByRole("button", { name: "Quiero algo similar" }).click();
  await expect(page.locator("#presupuesto")).toBeFocused();
  await expect(page.locator("form")).toContainText("Proyecto de prueba 1");
  await expect(page.getByRole("link", { name: "abrir el mensaje en WhatsApp" })).toHaveCount(0);
  await expect(page.getByLabel("Nombre", { exact: false })).toHaveValue("Ana & José");
  await expect(page.getByLabel("Tipo de espacio")).toHaveValue("Oficina");
  await expect(page.getByLabel("Medidas aproximadas")).toHaveValue("4 × 2 m");
  await expect(page.getByLabel("Mensaje", { exact: false })).toHaveValue("Mi idea original\nCon estantes");
  await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  const url = await page.getByRole("link", { name: "abrir el mensaje en WhatsApp" }).getAttribute("href");
  expect(new URL(url!).searchParams.get("text")).toContain("• Proyecto de referencia: Proyecto de prueba 1 (Cocinas)");
  await page.getByRole("button", { name: "Quitar referencia" }).click();
  await expect(page.locator("form")).not.toContainText("Proyecto de referencia");
  await page.getByRole("button", { name: "Placares 1", exact: true }).click();
  await page.getByRole("button", { name: "Ver proyecto: Proyecto de prueba 3", exact: true }).click();
  await expect(visor.getByRole("button", { name: "Foto siguiente" })).toHaveCount(0);
  await expect(visor.locator("dl")).toHaveCount(0);
  await visor.getByRole("button", { name: "Cerrar visor" }).click();
  await expect(page.getByRole("button", { name: "Ver proyecto: Proyecto de prueba 3", exact: true })).toBeFocused();
  await sinDesborde(page);
});

test("accesibilidad automática y movimiento reducido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const resultado = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(resultado.violations).toEqual([]);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});
