import { ImageResponse } from "next/og";
import { colores, hero, marca } from "@/data/sitio";

// Imagen que aparece al compartir el link en WhatsApp, Instagram, Facebook, etc.
export const alt = `${marca.nombreCompleto}: ${hero.titulo}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ImagenParaCompartir() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: colores.hueso,
          background: `radial-gradient(60% 50% at 80% 0%, rgba(232,169,79,0.16), transparent 70%), linear-gradient(180deg, ${colores.grafito}, ${colores.negro})`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 10 }}>RICHMONT</div>
          <div style={{ fontSize: 16, letterSpacing: 12, opacity: 0.8, marginTop: 6 }}>FURNITURE</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 520,
              height: 2,
              background: `linear-gradient(90deg, ${colores.ambar}, transparent)`,
              marginBottom: 36,
            }}
          />
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2, maxWidth: 900 }}>
            {hero.titulo}
          </div>
          <div style={{ fontSize: 28, color: colores.greige, marginTop: 28 }}>
            Muebles a medida en Paraguay · @richmontpy
          </div>
        </div>
      </div>
    ),
    size,
  );
}
