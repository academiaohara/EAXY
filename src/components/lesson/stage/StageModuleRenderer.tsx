"use client";

import { BloquesNumericosModule } from "@/components/lesson/stage/modules/bloques-numericos/BloquesNumericosModule";
import { PiramideReduccionModule } from "@/components/lesson/stage/modules/piramide-reduccion/PiramideReduccionModule";
import { TiendaCiclistaModule } from "@/components/lesson/stage/modules/tienda-ciclista/TiendaCiclistaModule";
import type { StageModuleId } from "@/lib/lesson/types";

export type StageModuleRenderProps = {
  module: StageModuleId;
  stepId: string;
  scene: string;
  tienda?: {
    items?: import("@/lib/lesson/types").TiendaCiclistaItem[];
    wallet?: number;
    spendAmount?: number;
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

/** Registro de identificadores de módulo disponibles (documentación en runtime). */
export const STAGE_MODULE_REGISTRY: StageModuleId[] = [
  "tienda-ciclista",
  "bloques-numericos",
  "piramide-reduccion",
];
