/**
 * Plano lineal de un espacio, usado en lugar de una foto que todavía no se cargó.
 * Es una ilustración de referencia (no un trabajo real) y se marca como "Foto pendiente".
 */
type Tipo = "cocinas" | "living" | "placares" | "exterior" | "otros";

const dibujos: Record<Tipo, React.ReactNode> = {
  cocinas: (
    <>
      {/* Alacenas */}
      <rect x="60" y="40" width="280" height="70" />
      <path d="M130 40v70M200 40v70M270 40v70" />
      <path d="M118 96v8M142 96v8M258 96v8M282 96v8" className="tirador" />
      {/* Luz LED bajo alacenas */}
      <path d="M64 114h272" className="led" />
      {/* Mesada y bajo mesada */}
      <rect x="52" y="160" width="296" height="8" />
      <rect x="60" y="168" width="280" height="82" />
      <path d="M130 168v82M200 168v82M270 168v82M200 196h70M200 224h70" />
      <path d="M120 176h-12M152 176h12M226 182h18M226 210h18M226 238h18M292 176h20" className="tirador" />
      <path d="M232 150a12 6 0 0 0 24 0" />
    </>
  ),
  living: (
    <>
      {/* Panel con estantes */}
      <rect x="110" y="30" width="180" height="120" />
      <path d="M110 70h50M240 70h50M110 110h50M240 110h50" />
      <rect x="170" y="54" width="60" height="38" />
      <path d="M172 96h56" className="led" />
      {/* Rack bajo */}
      <rect x="50" y="182" width="300" height="56" />
      <path d="M125 182v56M200 182v56M275 182v56" />
      <path d="M78 210h20M153 210h20M228 210h20M303 210h20" className="tirador" />
      <path d="M62 238v12M338 238v12" />
    </>
  ),
  placares: (
    <>
      <rect x="80" y="20" width="240" height="232" />
      <path d="M160 20v232M240 20v232M80 56h240" />
      <path d="M150 120v44M170 120v44M230 120v44M250 120v44" className="tirador" />
      <path d="M84 52h232" className="led" />
      <path d="M100 38h40M180 38h40M260 38h40" />
    </>
  ),
  exterior: (
    <>
      {/* Pérgola */}
      <path d="M40 40h320M60 40v40M340 40v40M80 40v-8M120 40v-8M160 40v-8M200 40v-8M240 40v-8M280 40v-8M320 40v-8" />
      {/* Barra de quincho con listones */}
      <rect x="70" y="140" width="260" height="10" />
      <rect x="80" y="150" width="240" height="96" />
      <path d="M100 150v96M120 150v96M140 150v96M160 150v96M180 150v96M200 150v96M220 150v96M240 150v96M260 150v96M280 150v96M300 150v96" className="fino" />
      <path d="M74 154h252" className="led" />
    </>
  ),
  otros: (
    <>
      {/* Escritorio con biblioteca */}
      <rect x="70" y="30" width="110" height="200" />
      <path d="M70 80h110M70 130h110M70 180h110" />
      <rect x="180" y="150" width="160" height="8" />
      <rect x="290" y="158" width="50" height="80" />
      <path d="M290 198h50M306 178h18M306 218h18" className="tirador" />
      <path d="M190 158v80" />
      <path d="M186 154h150" className="led" />
    </>
  ),
};

export default function Plano({
  tipo,
  medida,
  etiqueta = "Foto pendiente",
  oscuro = false,
  compacto = false,
  className = "",
}: {
  /** true: sin el encabezado "Plano de referencia" (para paneles angostos). */
  compacto?: boolean;
  tipo: string;
  medida?: string;
  etiqueta?: string;
  oscuro?: boolean;
  className?: string;
}) {
  const t = (tipo in dibujos ? tipo : "otros") as Tipo;
  const trazo = oscuro ? "var(--humo)" : "var(--negro)";

  return (
    <div
      role="img"
      aria-label={`Plano de referencia. ${etiqueta}`}
      className={`relative flex h-full w-full flex-col overflow-hidden ${
        oscuro ? "cuadricula-oscura bg-negro text-humo" : "cuadricula bg-superficie text-tinta"
      } ${className}`}
    >
      {!compacto && (
        <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
          <span className="tecnico">Plano de referencia</span>
          <span className="marcador">{etiqueta}</span>
        </div>
      )}
      <div className="relative min-h-0 flex-1 px-4 pb-4 sm:px-6 sm:pb-6">
        <svg
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          className="plano h-full w-full"
          fill="none"
          stroke={trazo}
          strokeWidth="1.4"
          strokeLinecap="square"
        >
          {dibujos[t]}
          {/* Cota horizontal */}
          <g strokeWidth="0.9" opacity="0.75">
            <path d="M50 272v12M350 272v12M50 278h300" />
          </g>
          {medida && (
            <text
              x="200"
              y="292"
              textAnchor="middle"
              fill={trazo}
              stroke="none"
              style={{ font: "500 11px var(--font-mono), monospace", letterSpacing: "0.08em" }}
            >
              {medida}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}
