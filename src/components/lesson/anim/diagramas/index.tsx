import type { AnimBuild } from "@/components/lesson/anim/types";
import { construirDiagrama, type Diagrama } from "./engine";
import { DIAGRAMAS_DIEDRICO } from "./diedrico";
import { DIAGRAMAS_GEOMETRIA } from "./geometria";

export const DIAGRAMAS: Record<string, Diagrama> = {
  ...DIAGRAMAS_GEOMETRIA,
  ...DIAGRAMAS_DIEDRICO,
};

export function buildDiagrama(clave: string | undefined): AnimBuild {
  const def = clave ? DIAGRAMAS[clave] : undefined;
  if (!def) throw new Error(`Diagrama desconocido: ${clave}`);
  return construirDiagrama(def);
}
