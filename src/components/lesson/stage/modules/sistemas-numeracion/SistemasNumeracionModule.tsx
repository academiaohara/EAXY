"use client";

import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { CompararSistemasScene } from "./CompararSistemasScene";
import { CeroGuardianScene } from "./CeroGuardianScene";
import { DecimalPosicionalScene } from "./DecimalPosicionalScene";
import { DescomponerNumeroScene } from "./DescomponerNumeroScene";
import { EgipcioAditivoScene } from "./EgipcioAditivoScene";
import { EgipcioOrdenScene } from "./EgipcioOrdenScene";
import { EscribePrehistoricoScene } from "./EscribePrehistoricoScene";
import { OrigenContarScene } from "./OrigenContarScene";
import { RomanoConstruirScene } from "./RomanoConstruirScene";
import { RomanoSumaRestaScene } from "./RomanoSumaRestaScene";
import { SimbolosAgruparScene } from "./SimbolosAgruparScene";

export type SistemasNumeracionModuleProps = SistemasNumeracionConfig & {
  stepId: string;
  onReadyChange?: (ready: boolean) => void;
  romanString?: string;
  onRomanStringChange?: (value: string) => void;
};

export function SistemasNumeracionModule({
  stepId,
  onReadyChange,
  romanString = "",
  onRomanStringChange,
  ...config
}: SistemasNumeracionModuleProps) {
  const scene = config.scene;

  return (
    <div
      className="flex h-full min-h-[14rem] w-full flex-1 flex-col"
      data-testid={`sistemas-numeracion-${stepId}-${scene}`}
    >
      {scene === "origen-contar" ? (
        <OrigenContarScene config={config} onReadyChange={onReadyChange} />
      ) : null}
      {scene === "simbolos-agrupar" ? (
        <SimbolosAgruparScene config={config} onReadyChange={onReadyChange} />
      ) : null}
      {scene === "escribe-38-prehistorico" ? <EscribePrehistoricoScene config={config} /> : null}
      {scene === "egipcio-aditivo" ? (
        <EgipcioAditivoScene config={config} onReadyChange={onReadyChange} />
      ) : null}
      {scene === "egipcio-orden-no-importa" ? (
        <EgipcioOrdenScene config={config} onReadyChange={onReadyChange} />
      ) : null}
      {scene === "romano-suma-resta" ? (
        <RomanoSumaRestaScene config={config} onReadyChange={onReadyChange} />
      ) : null}
      {scene === "romano-construir" ? (
        <RomanoConstruirScene
          config={config}
          roman={romanString}
          onRomanChange={onRomanStringChange ?? (() => {})}
        />
      ) : null}
      {scene === "decimal-posicional" ? (
        <DecimalPosicionalScene config={config} onReadyChange={onReadyChange} />
      ) : null}
      {scene === "descomponer-numero" ? (
        <DescomponerNumeroScene config={config} onReadyChange={onReadyChange} />
      ) : null}
      {scene === "cero-guardian" ? <CeroGuardianScene config={config} onReadyChange={onReadyChange} /> : null}
      {scene === "comparar-sistemas" ? (
        <CompararSistemasScene config={config} onReadyChange={onReadyChange} />
      ) : null}
    </div>
  );
}
