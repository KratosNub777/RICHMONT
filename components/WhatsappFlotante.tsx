"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { linkWhatsapp } from "@/data/sitio";
import { IconoWhatsapp } from "./ui";

/** Botón flotante de WhatsApp, solo en celular. Aparece después del hero. */
export default function WhatsappFlotante() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight * 0.75);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={linkWhatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir presupuesto por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 grid size-14 place-items-center rounded-full bg-salvia-texto text-hueso shadow-[0_12px_32px_-8px] shadow-negro/50 ring-1 ring-hueso/20 md:hidden"
        >
          <IconoWhatsapp className="size-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
