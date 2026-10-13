/**
 * Dirección pública de la web. En Vercel se detecta sola; si después compran
 * un dominio propio, configurá NEXT_PUBLIC_SITE_URL (ej: https://richmont.com.py).
 */
export const urlSitio = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
