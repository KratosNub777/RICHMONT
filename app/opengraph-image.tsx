import { ImageResponse } from "next/og";
import { colores, hero, marca } from "@/data/sitio";

// Imagen que aparece al compartir el link en WhatsApp, Instagram, Facebook, etc.
export const alt = `${marca.nombreCompleto}: ${hero.titulo}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const linea = "rgba(189,179,166,0.45)";

export default function ImagenParaCompartir() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: colores.blanco }}>
        {/* Texto sobre cuadrícula de plano */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 64px",
            color: colores.negro,
            backgroundImage: `linear-gradient(to right, ${linea} 1px, transparent 1px), linear-gradient(to bottom, ${linea} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        >
          <div style={{ fontSize: 18, letterSpacing: 3, color: colores.salviaOscuro }}>
            MUEBLES A MEDIDA · PARAGUAY
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1, letterSpacing: -2, maxWidth: 640 }}>
            {hero.titulo}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 18, color: colores.tinta }}>
            <div style={{ width: 1, height: 14, background: colores.negro }} />
            <div style={{ width: 160, height: 1, background: colores.negro }} />
            <div>2.40 m × 0.60 m</div>
            <div style={{ width: 160, height: 1, background: colores.negro }} />
            <div style={{ width: 1, height: 14, background: colores.negro }} />
          </div>
        </div>
        {/* Bloque salvia oscuro con el nombre */}
        <div
          style={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            background: colores.salviaOscuro,
            color: colores.blanco,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 6 }}>RICHMONT</div>
            <div style={{ fontSize: 16, letterSpacing: 6, color: colores.humo, marginTop: 6 }}>FURNITURE</div>
          </div>
          <div style={{ width: 120, height: 3, background: colores.ambar }} />
          <div style={{ fontSize: 22, color: colores.humo }}>@richmontpy</div>
        </div>
      </div>
    ),
    size,
  );
}
