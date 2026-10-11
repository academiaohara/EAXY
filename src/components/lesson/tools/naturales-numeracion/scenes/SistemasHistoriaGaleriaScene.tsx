"use client";

import { useEffect } from "react";
import { HistoriaNumeracionIllustrations } from "@/components/lesson/tools/naturales-numeracion/scenes/HistoriaNumeracionIllustrations";

type SistemasHistoriaGaleriaSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function SistemasHistoriaGaleriaScene({ onReadyChange }: SistemasHistoriaGaleriaSceneProps) {
  useEffect(() => {
    onReadyChange(true);
  }, [onReadyChange]);

  return <HistoriaNumeracionIllustrations />;
}
