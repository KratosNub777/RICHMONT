"use client";

import { createContext, useContext, useState } from "react";

type Filtro = { filtro: string; setFiltro: (f: string) => void };

const Contexto = createContext<Filtro>({ filtro: "todos", setFiltro: () => {} });

/** Filtro compartido entre el acordeón de espacios y la galería. */
export default function FiltroProvider({ children }: { children: React.ReactNode }) {
  const [filtro, setFiltro] = useState("todos");
  return <Contexto.Provider value={{ filtro, setFiltro }}>{children}</Contexto.Provider>;
}

export const useFiltro = () => useContext(Contexto);
