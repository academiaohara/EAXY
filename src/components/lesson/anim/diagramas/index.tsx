import type { AnimBuild } from "@/components/lesson/anim/types";
import { construirDiagrama, type Diagrama } from "./engine";
import { DIAGRAMAS_ACOTADOS } from "./acotados";
import { DIAGRAMAS_ACOTADOS_ESPACIO } from "./acotados-espacio";
import { DIAGRAMAS_AXONOMETRICO } from "./axonometrico";
import { DIAGRAMAS_AXONOMETRICO_ESPACIO } from "./axonometrico-espacio";
import { DIAGRAMAS_CABALLERA } from "./caballera";
import { DIAGRAMAS_CABALLERA_ESPACIO } from "./caballera-espacio";
import { DIAGRAMAS_DIEDRICO } from "./diedrico";
import { DIAGRAMAS_GEOMETRIA } from "./geometria";

export const DIAGRAMAS: Record<string, Diagrama> = {
  ...DIAGRAMAS_GEOMETRIA,
  ...DIAGRAMAS_DIEDRICO,
  ...DIAGRAMAS_ACOTADOS,
  /* Tema 13: los dibujos rehechos con vista en el espacio sustituyen a los anteriores de la misma clave. */
  ...DIAGRAMAS_ACOTADOS_ESPACIO,
  ...DIAGRAMAS_AXONOMETRICO,
  /* Tema 14: los dibujos rehechos sobre el modelo del triedro sustituyen a los anteriores de la misma clave. */
  ...DIAGRAMAS_AXONOMETRICO_ESPACIO,
  ...DIAGRAMAS_CABALLERA,
  /* Tema 15: los dibujos rehechos sobre el modelo de la perspectiva caballera sustituyen a los anteriores de la misma clave. */
  ...DIAGRAMAS_CABALLERA_ESPACIO,
};

export function buildDiagrama(clave: string | undefined): AnimBuild {
  const def = clave ? DIAGRAMAS[clave] : undefined;
  if (!def) throw new Error(`Diagrama desconocido: ${clave}`);
  return construirDiagrama(def);
}
