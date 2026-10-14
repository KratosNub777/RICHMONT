"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ReferenciaProyecto = { id: string; titulo: string; categoria: string };
const Contexto = createContext<{
  proyecto: ReferenciaProyecto | null;
  elegirProyecto: (proyecto: ReferenciaProyecto | null) => void;
}>({ proyecto: null, elegirProyecto: () => {} });

export function ConsultaProvider({ children }: { children: ReactNode }) {
  const [proyecto, elegirProyecto] = useState<ReferenciaProyecto | null>(null);
  return <Contexto.Provider value={{ proyecto, elegirProyecto }}>{children}</Contexto.Provider>;
}

export function useConsulta() { return useContext(Contexto); }
