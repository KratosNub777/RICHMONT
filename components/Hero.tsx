import Image from "next/image";
import { hero, linkWhatsapp } from "@/data/sitio";
import { fotoDisponible, obtenerGaleria } from "@/lib/galeria";
import { Etiqueta, IconoFlecha, IconoWhatsapp } from "./ui";

export default function Hero() {
  const foto = hero.foto && fotoDisponible(hero.foto) ? hero.foto : obtenerGaleria()[0]?.fotos[0];
  return (
    <section id="inicio" tabIndex={-1} aria-labelledby="titulo-inicio" className="hero fondo-oscuro text-hueso">
      <div className={`contenedor hero-interior ${foto ? "hero-con-foto" : ""}`}>
        <div>
          <Etiqueta oscuro>{hero.etiqueta}</Etiqueta>
          <h1 id="titulo-inicio" className="mt-4 max-w-[16ch] font-display text-display font-semibold text-balance">{hero.titulo}</h1>
          <a href="#trabajos" className="nav-link mt-2 inline-flex items-center gap-2 text-greige">{hero.botonTrabajos}<IconoFlecha className="size-4 rotate-90" /></a>
        </div>
        <div className="hero-consulta">
          <p className="max-w-xl text-cuerpo text-hueso/85">{hero.subtitulo}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#presupuesto" className="boton boton-claro">{hero.botonPresupuesto}<IconoFlecha /></a>
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="boton boton-borde-claro"><IconoWhatsapp />Consultar por WhatsApp</a>
          </div>
        </div>
        {foto && <div className="hero-foto"><Image src={foto.src} alt={foto.alt} width={foto.ancho} height={foto.alto}
          preload sizes="(min-width: 1024px) 55vw, 100vw" quality={80} className="h-full w-full object-contain" /></div>}
      </div>
    </section>
  );
}
