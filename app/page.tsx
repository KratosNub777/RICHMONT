import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Nosotros from "@/components/Nosotros";
import Trabajos from "@/components/Trabajos";
import Proceso from "@/components/Proceso";
import Testimonios from "@/components/Testimonios";
import Presupuesto from "@/components/Presupuesto";
import Contacto from "@/components/Contacto";
import { ConsultaProvider } from "@/components/ConsultaContext";

export default function Inicio() {
  return (
    <ConsultaProvider>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Trabajos />
        <Nosotros />
        <Proceso />
        <Testimonios />
        <Presupuesto />
      </main>
      <Contacto />
    </ConsultaProvider>
  );
}
