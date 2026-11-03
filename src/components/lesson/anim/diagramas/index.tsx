import type { AnimBuild } from "@/components/lesson/anim/types";
import { construirDiagrama, type Diagrama } from "./engine";
import { DIAGRAMAS_GEOMETRIA } from "./geometria";

export const DIAGRAMAS: Record<string, Diagrama> = {
  ...DIAGRAMAS_GEOMETRIA,
};

export function buildDiagrama(clave: string | undefined): AnimBuild {
  const def = clave ? DIAGRAMAS[clave] : undefined;
  if (!def) throw new Error(`Diagrama desconocido: ${clave}`);
  return construirDiagrama(def);
}
