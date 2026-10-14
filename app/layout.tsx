import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { colores, contacto, linkInstagram, marca } from "@/data/sitio";
import { urlSitio } from "@/lib/url";
import Proveedores from "@/components/Proveedores";
import "./globals.css";

const titulos = Sora({
  variable: "--font-titulos",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const texto = Inter({
  variable: "--font-texto",
  subsets: ["latin"],
  display: "swap",
});

const titulo = `${marca.nombreCompleto} | Muebles a medida en Paraguay`;

export const metadata: Metadata = {
  metadataBase: new URL(urlSitio),
  title: { default: titulo, template: `%s | ${marca.nombreCompleto}` },
  description: marca.descripcion,
  applicationName: marca.nombreCompleto,
  keywords: [
    "muebles a medida",
    "muebles a medida Paraguay",
    "cocinas a medida",
    "placares a medida",
    "muebles de living",
    "muebles para oficina",
    "carpintería a medida",
    "Richmont",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PY",
    url: "/",
    siteName: marca.nombreCompleto,
    title: titulo,
    description: marca.descripcion,
  },
  twitter: { card: "summary_large_image", title: titulo, description: marca.descripcion },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: colores.negro,
  colorScheme: "light",
};

// Colores de data/sitio.ts → variables CSS que usa Tailwind.
const variablesDeColor = `:root{${Object.entries(colores)
  .map(([nombre, valor]) => `--${nombre}:${valor}`)
  .join(";")}}`;

// Datos estructurados para Google (solo información confirmada).
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${urlSitio}/#negocio`,
  name: marca.nombreCompleto,
  alternateName: marca.nombre,
  description: marca.descripcion,
  url: urlSitio,
  telephone: `+${contacto.whatsappInternacional}`,
  image: `${urlSitio}/opengraph-image`,
  ...(marca.logo.src ? { logo: `${urlSitio}${marca.logo.src}` } : {}),
  ...(contacto.email ? { email: contacto.email } : {}),
  address: {
    "@type": "PostalAddress",
    addressCountry: "PY",
    ...(contacto.direccion ? { streetAddress: contacto.direccion } : {}),
    ...(contacto.ciudad ? { addressLocality: contacto.ciudad } : {}),
  },
  sameAs: [linkInstagram, ...(contacto.facebook ? [contacto.facebook] : [])],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${contacto.whatsappInternacional}`,
    contactType: "sales",
    availableLanguage: "es",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PY" className={`${titulos.variable} ${texto.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: variablesDeColor }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(datosEstructurados).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-negro focus:px-5 focus:py-3 focus:text-hueso"
        >
          Saltar al contenido
        </a>
        <Proveedores>{children}</Proveedores>
        <div className="grano" aria-hidden="true" />
      </body>
    </html>
  );
}
