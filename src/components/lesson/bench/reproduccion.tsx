"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

/** Control de reproducción de las animaciones automáticas de una escena (pausar y repetir). */
export type Repro = {
  /** Se incrementa al pulsar «Repetir»: reinicia la animación del paso actual. */
  rep: number;
  /** Clave (paso) cuya animación está en pausa, o `null`. */
  pausaEn: string | number | null;
  /** Clave de la animación que está en marcha y si dura algo (más de 1 ms). */
  anim: { clave: string | number; activa: boolean } | null;
  registrar: (clave: string | number, activa: boolean) => void;
  repetir: () => void;
  alternarPausa: () => void;
};

export const ReproCtx = createContext<Repro | null>(null);

export function ReproProvider({ children }: { children: ReactNode }) {
  const [rep, setRep] = useState(0);
  const [pausaEn, setPausaEn] = useState<string | number | null>(null);
  const [anim, setAnim] = useState<Repro["anim"]>(null);
  const registrar = useCallback((clave: string | number, activa: boolean) => {
    setAnim((a) => (a && a.clave === clave && a.activa === activa ? a : { clave, activa }));
  }, []);
  const repetir = useCallback(() => {
    setPausaEn(null);
    setRep((n) => n + 1);
  }, []);
  const alternarPausa = useCallback(() => {
    setPausaEn((p) => (p === null && anim ? anim.clave : null));
  }, [anim]);
  const value = useMemo(() => ({ rep, pausaEn, anim, registrar, repetir, alternarPausa }), [rep, pausaEn, anim, registrar, repetir, alternarPausa]);
  return <ReproCtx.Provider value={value}>{children}</ReproCtx.Provider>;
}
