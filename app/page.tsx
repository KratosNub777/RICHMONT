import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Materiales from "@/components/Materiales";
import Trabajos from "@/components/Trabajos";
import Acabados from "@/components/Acabados";
import Proceso from "@/components/Proceso";
import Nosotros from "@/components/Nosotros";
import Presupuesto from "@/components/Presupuesto";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";
import WhatsappFlotante from "@/components/WhatsappFlotante";

export default function Inicio() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Materiales />
        <Trabajos />
        <Acabados />
        <Proceso />
        <Nosotros />
        <Presupuesto />
        <Testimonios />
      </main>
      <Contacto />
      <WhatsappFlotante />
    </>
  );
}
