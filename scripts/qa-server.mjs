import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";

// Una ruta temporal de QA: nunca se guarda ni se incluye en la publicación.
const ruta = new URL("../app/qa-richmont/", import.meta.url);
if (existsSync(ruta)) throw new Error("La ruta temporal de QA ya existe. Revisala antes de continuar.");
// Arranque limpio para que el loader de CSS no reutilice estilos de una ejecución anterior.
rmSync(new URL("../.next-qa/", import.meta.url), { recursive: true, force: true });
mkdirSync(ruta);
writeFileSync(new URL("page.tsx", ruta), 'export { default } from "../../tests/fixtures/GalleryPage";\n');
const limpiar = () => rmSync(ruta, { recursive: true, force: true });
const servidor = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", "3100"], {
  stdio: "inherit", env: { ...process.env, RICHMONT_QA: "1" },
});
let terminando = false;
function terminar(signal) {
  if (terminando) return;
  terminando = true;
  limpiar();
  servidor.kill(signal);
}
process.on("SIGTERM", () => terminar("SIGTERM"));
process.on("SIGINT", () => terminar("SIGINT"));
process.on("exit", limpiar);
servidor.on("exit", (code) => { limpiar(); process.exit(code ?? 0); });
