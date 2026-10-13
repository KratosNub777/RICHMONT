"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { linkWhatsapp } from "@/data/sitio";
import { IconoWhatsapp } from "./ui";

/** Botón flotante de WhatsApp, solo en celular. Aparece después del hero. */
export default function WhatsappFlotante() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const revisar = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    return () => window.removeEventListener("scroll", revisar);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={linkWhatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir presupuesto por WhatsApp"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center gap-2 bg-salvia-oscuro px-4 text-blanco shadow-[0_10px_30px_-10px] shadow-negro/60 md:hidden"
        >
          <IconoWhatsapp className="size-6" />
          <span className="tecnico">Presupuesto</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
