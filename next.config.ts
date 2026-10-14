import type { NextConfig } from "next";

const qa = process.env.RICHMONT_QA === "1";

const nextConfig: NextConfig = {
  // Aísla el servidor de pruebas del desarrollo y de la compilación de producción.
  distDir: qa ? ".next-qa" : ".next",
  typescript: { tsconfigPath: qa ? "tsconfig.qa.json" : "tsconfig.json" },
  images: {
    // Formatos modernos: las fotos pesan mucho menos sin perder calidad.
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
