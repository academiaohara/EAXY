"use client";

import { BloquesNumericosModule } from "@/components/lesson/stage/modules/bloques-numericos/BloquesNumericosModule";
import { FichasPropiedadesModule } from "@/components/lesson/stage/modules/fichas-propiedades/FichasPropiedadesModule";
import { ManzanasParentesisModule } from "@/components/lesson/stage/modules/manzanas-parentesis/ManzanasParentesisModule";
import { PiramideReduccionModule } from "@/components/lesson/stage/modules/piramide-reduccion/PiramideReduccionModule";
import { TiendaCiclistaModule } from "@/components/lesson/stage/modules/tienda-ciclista/TiendaCiclistaModule";
import { TiendaFichasModule } from "@/components/lesson/stage/modules/tienda-fichas/TiendaFichasModule";
import type { EmbeddedPrediction, StageModuleId } from "@/lib/lesson/types";

export type StageModuleRenderProps = {
  module: StageModuleId;
  stepId: string;
  scene: string;
  embeddedPrediction?: EmbeddedPrediction;
  tiendaFichas?: {
    items?: import("@/lib/lesson/types").TiendaCiclistaItem[];
    wallet?: number;
    mode: "sumar-estanteria" | "restar-cobro" | "explorar-toggle";
  };
  tienda?: {
    items?: import("@/lib/lesson/types").TiendaCiclistaItem[];
    wallet?: number;
    mode: "sumar-cesta" | "restar-cartera" | "explorar-compra";
  };
  piramide?: {
    variant: "dual-parentesis" | "explorar-parentesis";
    tokens?: string[];
    openAfter?: number | null;
    closeBefore?: number | null;
    onOpenAfterChange?: (index: number | null) => void;
    onCloseBeforeChange?: (index: number | null) => void;
  };
  bloques?: { blocks: number[] };
  autoPlay?: boolean;
  selectedIds?: string[];
  onSelectedIdsChange?: (ids: string[]) => void;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
  onPredictPhaseChange?: (active: boolean, canSubmit: boolean) => void;
  onRegisterPredict?: (submit: () => boolean) => void;
  onRegisterExplore?: (check: () => void) => void;
  onExploreCheck?: (result: { correct: boolean; message: string }) => void;
  exploreBudget?: number;
  onGoalChange?: (met: boolean, liveValue: number | null) => void;
};

export function StageModuleRenderer(props: StageModuleRenderProps) {
  const { module, stepId, scene, onReadyChange, embeddedPrediction } = props;

  if (module === "tienda-fichas" && props.tiendaFichas) {
    return (
      <TiendaFichasModule
        stepId={stepId}
        mode={props.tiendaFichas.mode}
        items={props.tiendaFichas.items ?? []}
        wallet={props.tiendaFichas.wallet}
        embeddedPrediction={embeddedPrediction}
        onReadyChange={onReadyChange}
        onPredictPhaseChange={props.onPredictPhaseChange}
        onExploreCheck={props.onExploreCheck}
        exploreBudget={props.exploreBudget}
        onRegisterPredict={props.onRegisterPredict}
        onRegisterExplore={props.onRegisterExplore}
      />
    );
  }

  if (module === "manzanas-parentesis") {
    return (
      <ManzanasParentesisModule
        stepId={stepId}
        scene={scene as "dual-narrate" | "explorar-bolsa" | "limite-resta"}
        embeddedPrediction={embeddedPrediction}
        onReadyChange={onReadyChange}
        onPredictPhaseChange={props.onPredictPhaseChange}
        onGoalChange={props.onGoalChange}
        onRegisterPredict={props.onRegisterPredict}
      />
    );
  }

  if (module === "fichas-propiedades" && props.bloques) {
    return (
      <FichasPropiedadesModule
        stepId={stepId}
        scene={scene as "conmutativa" | "asociativa"}
        blocks={props.bloques.blocks}
        embeddedPrediction={embeddedPrediction}
        onReadyChange={onReadyChange}
        onPredictPhaseChange={props.onPredictPhaseChange}
        onRegisterPredict={props.onRegisterPredict}
      />
    );
  }

  if (module === "tienda-ciclista" && props.tienda) {
    return (
      <TiendaCiclistaModule
        stepId={stepId}
        mode={props.tienda.mode}
        items={props.tienda.items}
        wallet={props.tienda.wallet}
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

  if (module === "piramide-reduccion" && props.piramide) {
    return (
      <PiramideReduccionModule
        variant={props.piramide.variant}
        tokens={props.piramide.tokens}
        openAfter={props.piramide.openAfter}
        closeBefore={props.piramide.closeBefore}
        onOpenAfterChange={props.piramide.onOpenAfterChange}
        onCloseBeforeChange={props.piramide.onCloseBeforeChange}
        onReadyChange={onReadyChange}
      />
    );
  }

  return <p className="text-sm text-rose-700">Módulo de escenario no configurado.</p>;
}

export const STAGE_MODULE_REGISTRY: StageModuleId[] = [
  "tienda-ciclista",
  "bloques-numericos",
  "piramide-reduccion",
  "tienda-fichas",
  "manzanas-parentesis",
  "fichas-propiedades",
];
