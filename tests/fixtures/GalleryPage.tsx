import GaleriaTrabajos from "@/components/GaleriaTrabajos";
import Header from "@/components/Header";
import Presupuesto from "@/components/Presupuesto";
import { ConsultaProvider } from "@/components/ConsultaContext";
import { espacios, type Trabajo } from "@/data/trabajos";

// Patrones técnicos interceptados por Playwright. No son fotos de muebles.
const proyectos: Trabajo[] = Array.from({ length: 9 }, (_, i) => ({
  id: `qa-${i}`,
  titulo: `Proyecto de prueba ${i + 1}`,
  espacio: i < 2 ? "cocinas" : i === 2 ? "placares" : "living",
  fotos: Array.from({ length: i === 0 ? 2 : 1 }, (_, n) => ({
    src: `/trabajos/__qa__/patron-${i}-${n}.png`,
    alt: `Patrón técnico de prueba ${i + 1}, imagen ${n + 1}`,
    ancho: i % 2 ? 600 : 1200,
    alto: i % 2 ? 1200 : 800,
  })),
  ...(i === 0 ? { descripcion: "Descripción confirmada para la prueba.", materiales: "Dato técnico de prueba", terminaciones: "Terminación de prueba" } : {}),
}));

export default function FixturePage() {
  return <ConsultaProvider><Header /><main id="contenido" className="tono-claro pt-24">
    <section id="trabajos" tabIndex={-1} className="contenedor seccion"><h1 className="font-display text-2xl">Galería de QA</h1>
      <GaleriaTrabajos items={proyectos} espacios={espacios.map((e) => ({ ...e }))} />
    </section><Presupuesto />
  </main></ConsultaProvider>;
}
