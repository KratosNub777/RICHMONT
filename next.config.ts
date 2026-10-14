import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
