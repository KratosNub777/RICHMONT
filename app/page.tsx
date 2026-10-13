import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Nosotros from "@/components/Nosotros";
import Trabajos from "@/components/Trabajos";
import Proceso from "@/components/Proceso";
import Transicion from "@/components/Transicion";

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
      </main>
    </>
  );
}
