"use client";

import { ExploracionAnaLeo } from "@/components/lesson/stage/modules/jerarquia-operaciones/ExploracionAnaLeo";
import { NivelesReglas } from "@/components/lesson/stage/modules/jerarquia-operaciones/NivelesReglas";
import { PracticaReducirExpresion } from "@/components/lesson/stage/modules/jerarquia-operaciones/PracticaReducirExpresion";

export type JerarquiaOperacionesModuleProps = {
  scene: string;
  revealPlayed?: boolean;
  autoPlay?: boolean;
  onReadyChange?: (ready: boolean) => void;
  /** Exploración Ana / Leo */
  selectedChoiceId?: string;
  isCorrect?: boolean;
  /** Práctica reducir expresión */
  initialTokens?: readonly string[];
  reduceTokens?: readonly string[];
  reduceHistory?: readonly (readonly string[])[];
  onReduceTokensChange?: (tokens: string[], historyRow: readonly string[]) => void;
  reduceDisabled?: boolean;
  /** Explore legacy: secuencia de ids */
  targetSequence?: string[];
  tapSequence?: string[];
  onTapSequenceChange?: (sequence: string[]) => void;
};

export function JerarquiaOperacionesModule({
  scene,
  revealPlayed = false,
  onReadyChange,
  selectedChoiceId,
  isCorrect,
  initialTokens = [],
  reduceTokens = [],
  reduceHistory = [],
  onReduceTokensChange,
  reduceDisabled,
}: JerarquiaOperacionesModuleProps) {
  switch (scene) {
    case "exploracion-ana-leo":
      return (
        <ExploracionAnaLeo
          revealPlayed={revealPlayed}
          selectedChoiceId={selectedChoiceId}
          isCorrect={isCorrect}
        />
      );
    case "niveles-reglas":
    case "resumen-niveles":
      return <NivelesReglas onReadyChange={onReadyChange} />;
    case "practica-reducir":
      return (
        <PracticaReducirExpresion
          initialTokens={initialTokens}
          tokens={reduceTokens}
          history={reduceHistory}
          onTokensChange={(next, row) => onReduceTokensChange?.(next, row)}
          onReadyChange={onReadyChange}
          disabled={reduceDisabled}
        />
      );
    default:
      return <p className="text-sm text-rose-700">Escena no configurada: {scene}</p>;
  }
}
