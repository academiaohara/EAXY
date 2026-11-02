import { CONSTRUCCIONES, type Construccion, type ConstruccionId } from "@/components/lesson/bench/construcciones-datos";
import { notasAnimacion, notasPractica, textoTarea } from "@/components/lesson/bench/construcciones-notas";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

/**
 * Diapositiva con la construcción explicada paso a paso (la animación de `construcciones-datos.ts`) y, a continuación,
 * el ejercicio práctico para repetirla con los instrumentos.
 */
export const construccionDiapositiva = (id: ConstruccionId) => slide(`c-${id}`, (CONSTRUCCIONES[id] as Construccion).titulo, [], bench(`c-${id}`, notasAnimacion(id)), "stack");

export const construccionPractica = (id: ConstruccionId) =>
  benchTask(`${id}-practica`, `Construye: ${(CONSTRUCCIONES[id] as Construccion).titulo.charAt(0).toLowerCase()}${(CONSTRUCCIONES[id] as Construccion).titulo.slice(1)}`, `c-${id}-practica`, notasPractica(id), textoTarea(id));

/** Los pasos de una lección formada por construcciones: explicación y práctica de cada una. */
export const construccionPasos = (...ids: ConstruccionId[]) => ids.flatMap((id) => [construccionDiapositiva(id), construccionPractica(id)]);
