import { materiales } from "@/data/sitio";

/** Franja con los materiales y acabados, en movimiento lento (se pausa al pasar el mouse). */
export default function Materiales() {
  const fila = (oculta: boolean) => (
    <ul aria-hidden={oculta || undefined} className="flex shrink-0 items-center">
      {materiales.map((m) => (
        <li key={m} className="flex items-center">
          <span className="px-6 font-display text-[clamp(1.4rem,1.1rem+1.4vw,2.4rem)] font-semibold tracking-tight sm:px-10">
            {m}
          </span>
          <span aria-hidden="true" className="size-2 rotate-45 bg-roble" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Materiales y acabados" className="oscuro overflow-hidden bg-salvia-oscuro py-6 text-blanco sm:py-8">
      {/* Dos copias seguidas para que el movimiento no tenga cortes */}
      <div className="marquee flex w-max">
        {fila(false)}
        {fila(true)}
      </div>
    </section>
  );
}
