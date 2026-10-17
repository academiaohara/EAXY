"use client";

import { BloquesNumericosModule } from "@/components/lesson/stage/modules/bloques-numericos/BloquesNumericosModule";
import { MulDivNaturalesModule } from "@/components/lesson/stage/modules/mul-div-naturales/MulDivNaturalesModule";
import { PiramideReduccionModule } from "@/components/lesson/stage/modules/piramide-reduccion/PiramideReduccionModule";
import { JerarquiaOperacionesModule } from "@/components/lesson/stage/modules/jerarquia-operaciones/JerarquiaOperacionesModule";
import { PotenciasModule } from "@/components/lesson/stage/modules/potencias/PotenciasModule";
import { RaicesCuadradasModule } from "@/components/lesson/stage/modules/raices-cuadradas/RaicesCuadradasModule";
import { TiendaCiclistaModule } from "@/components/lesson/stage/modules/tienda-ciclista/TiendaCiclistaModule";
import type { MulDivConfig, PotenciasConfig, RaicesConfig, StageModuleId } from "@/lib/lesson/types";

export type StageModuleRenderProps = {
  module: StageModuleId;
  stepId: string;
  scene: string;
  tienda?: {
    items?: import("@/lib/lesson/types").TiendaCiclistaItem[];
    wallet?: number;
    spendAmount?: number;
    mode: "sumar-cesta" | "restar-cartera" | "calcular-faltante" | "calcular-sobra" | "explorar-compra";
    savedAmount?: number;
  };
  piramide?: {
    variant: "dual-parentesis" | "explorar-parentesis";
    tokens?: string[];
    openAfter?: number | null;
    closeBefore?: number | null;
    onOpenAfterChange?: (index: number | null) => void;
    onCloseBeforeChange?: (index: number | null) => void;
    targetResult?: number | null;
    evaluatedResult?: number | null;
    solved?: boolean;
  };
  bloques?: { blocks: number[] };
  jerarquia?: {
    revealPlayed?: boolean;
    selectedChoiceId?: string;
    isCorrect?: boolean;
    initialTokens?: readonly string[];
    reduceTokens?: readonly string[];
    reduceHistory?: readonly (readonly string[])[];
    onReduceTokensChange?: (tokens: string[], historyRow: readonly string[]) => void;
    reduceDisabled?: boolean;
    targetSequence?: string[];
    tapSequence?: string[];
    onTapSequenceChange?: (sequence: string[]) => void;
  };
  mulDiv?: MulDivConfig;
  potencias?: PotenciasConfig;
  raices?: RaicesConfig;
  boxCounts?: number[];
  onBoxCountsChange?: (counts: number[]) => void;
  autoPlay?: boolean;
  selectedIds?: string[];
  onSelectedIdsChange?: (ids: string[]) => void;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
  mulDivSubStep?: number;
  onChalkboardClick?: () => void;
};

export function StageModuleRenderer(props: StageModuleRenderProps) {
  const { module, stepId, scene, onReadyChange } = props;

  if (module === "tienda-ciclista" && props.tienda) {
    return (
      <TiendaCiclistaModule
        stepId={stepId}
        mode={props.tienda.mode}
        items={props.tienda.items}
        wallet={props.tienda.wallet}
        spendAmount={props.tienda.spendAmount}
        savedAmount={props.tienda.savedAmount}
        autoPlay={props.autoPlay}
        selectedIds={props.selectedIds}
        onSelectedIdsChange={props.onSelectedIdsChange}
        onReadyChange={onReadyChange}
        onAnimationComplete={props.onAnimationComplete}
      />
    );
  }

  if (module === "bloques-numericos" && props.bloques) {
    return (
      <BloquesNumericosModule
        scene={scene as "conmutativa" | "asociativa"}
        blocks={props.bloques.blocks}
        onReadyChange={onReadyChange}
      />
    );
  }

  if (module === "mul-div-naturales" && props.mulDiv) {
    return (
      <MulDivNaturalesModule
        stepId={stepId}
        {...props.mulDiv}
        autoPlay={props.autoPlay}
        subStep={props.mulDivSubStep}
        onBoardClick={props.onChalkboardClick}
        boxCounts={props.boxCounts}
        onBoxCountsChange={props.onBoxCountsChange}
        onReadyChange={onReadyChange}
        onAnimationComplete={props.onAnimationComplete}
      />
    );
  }

  if (module === "piramide-reduccion" && props.piramide) {
    return (
      <PiramideReduccionModule
        variant={props.piramide.variant}
        tokens={props.piramide.tokens}
        openAfter={props.piramide.openAfter}
        closeBefore={props.piramide.closeBefore}
        onOpenAfterChange={props.piramide.onOpenAfterChange}
        onCloseBeforeChange={props.piramide.onCloseBeforeChange}
        targetResult={props.piramide.targetResult}
        evaluatedResult={props.piramide.evaluatedResult}
        solved={props.piramide.solved}
        onReadyChange={onReadyChange}
      />
    );
  }

  if (module === "potencias" && props.potencias) {
    return (
      <PotenciasModule stepId={stepId} {...props.potencias} onReadyChange={onReadyChange} />
    );
  }

  if (module === "raices-cuadradas" && props.raices) {
    return (
      <RaicesCuadradasModule stepId={stepId} {...props.raices} onReadyChange={onReadyChange} />
    );
  }

  if (module === "jerarquia-operaciones") {
    return (
      <JerarquiaOperacionesModule
        scene={scene}
        revealPlayed={props.jerarquia?.revealPlayed}
        autoPlay={props.autoPlay}
        selectedChoiceId={props.jerarquia?.selectedChoiceId}
        isCorrect={props.jerarquia?.isCorrect}
        initialTokens={props.jerarquia?.initialTokens}
        reduceTokens={props.jerarquia?.reduceTokens}
        reduceHistory={props.jerarquia?.reduceHistory}
        onReduceTokensChange={props.jerarquia?.onReduceTokensChange}
        reduceDisabled={props.jerarquia?.reduceDisabled}
        targetSequence={props.jerarquia?.targetSequence}
        tapSequence={props.jerarquia?.tapSequence}
        onTapSequenceChange={props.jerarquia?.onTapSequenceChange}
        onReadyChange={onReadyChange}
      />
    );
  }

  return <p className="text-sm text-rose-700">Módulo de escenario no configurado.</p>;
}

/** Registro de identificadores de módulo disponibles (documentación en runtime). */
export const STAGE_MODULE_REGISTRY: StageModuleId[] = [
  "tienda-ciclista",
  "bloques-numericos",
  "piramide-reduccion",
  "mul-div-naturales",
  "jerarquia-operaciones",
  "potencias",
  "raices-cuadradas",
];
