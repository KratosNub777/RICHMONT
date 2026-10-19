import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Nosotros from "@/components/Nosotros";
import Trabajos from "@/components/Trabajos";
import Proceso from "@/components/Proceso";
import Presupuesto from "@/components/Presupuesto";
import Contacto from "@/components/Contacto";
import Transicion from "@/components/Transicion";
import WhatsappFlotante from "@/components/WhatsappFlotante";

export default function Inicio() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Transicion de="negro" a="hueso" />
        <Nosotros />
        <Trabajos />
        <Transicion de="hueso" a="grafito" />
        <Proceso />
        <Transicion de="negro" a="arena" />
        <Presupuesto />
        <Transicion de="greige" a="grafito" />
      </main>
      <Contacto />
      <WhatsappFlotante />
    </>
  );
}
