import type { SlideAnimId, SlideAnimParams } from "@/lib/lesson/types";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { buildAscensorEnteros } from "@/components/lesson/anim/scenes/ascensor-enteros";
import { buildCompararEnteros } from "@/components/lesson/anim/scenes/comparar-enteros";
import { buildDivisionInversa } from "@/components/lesson/anim/scenes/division-inversa";
import { buildFichasOpuestos } from "@/components/lesson/anim/scenes/fichas-opuestos";
import { buildParentesisSignos } from "@/components/lesson/anim/scenes/parentesis-signos";
import { buildProductoSignos } from "@/components/lesson/anim/scenes/producto-signos";
import { buildRectaEnteros } from "@/components/lesson/anim/scenes/recta-enteros";
import { buildRestaOpuesto } from "@/components/lesson/anim/scenes/resta-opuesto";
import { buildSumaRecta } from "@/components/lesson/anim/scenes/suma-recta";
import { buildValorAbsoluto } from "@/components/lesson/anim/scenes/valor-absoluto";
import { buildAreaDistributiva } from "@/components/lesson/anim/scenes/area-distributiva";
import { buildCribaEratostenes } from "@/components/lesson/anim/scenes/criba-eratostenes";
import { buildCriterioAlternada } from "@/components/lesson/anim/scenes/criterio-alternada";
import { buildCriterioEjemplos } from "@/components/lesson/anim/scenes/criterio-ejemplos";
import { buildCriterioSumaCifras } from "@/components/lesson/anim/scenes/criterio-suma-cifras";
import { buildDescomposicionPrimos } from "@/components/lesson/anim/scenes/descomposicion-primos";
import { buildDivisibilidadGrupos } from "@/components/lesson/anim/scenes/divisibilidad-grupos";
import { buildDivisoresRectangulos } from "@/components/lesson/anim/scenes/divisores-rectangulos";
import { buildMcdCortes } from "@/components/lesson/anim/scenes/mcd-cortes";
import { buildMultiplosSaltos } from "@/components/lesson/anim/scenes/multiplos-saltos";
import { buildTablaExponentes } from "@/components/lesson/anim/scenes/tabla-exponentes";
import { buildDecimalCanje } from "@/components/lesson/anim/scenes/decimal-canje";
import { buildDecimalPosicion } from "@/components/lesson/anim/scenes/decimal-posicion";
import { buildEgipcioAditivo } from "@/components/lesson/anim/scenes/egipcio-aditivo";
import { buildExprReescritura } from "@/components/lesson/anim/scenes/expr-reescritura";
import { buildRedondeoRecta } from "@/components/lesson/anim/scenes/redondeo-recta";
import { buildRepartoAgrupar } from "@/components/lesson/anim/scenes/reparto-agrupar";
import { buildRestaDiferencia } from "@/components/lesson/anim/scenes/resta-diferencia";
import { buildRomanoResta } from "@/components/lesson/anim/scenes/romano-resta";

type Builder = (params: SlideAnimParams) => AnimBuild;

/** Lista canónica de animaciones disponibles para `{ kind: "anim", scene }`. */
export const SLIDE_ANIM_REGISTRY: Record<SlideAnimId, Builder> = {
  "egipcio-aditivo": (p) => buildEgipcioAditivo(p),
  "romano-resta": () => buildRomanoResta(),
  "decimal-canje": () => buildDecimalCanje(),
  "decimal-posicion": (p) => buildDecimalPosicion(p),
  "redondeo-recta": (p) => buildRedondeoRecta(p),
  "resta-diferencia": (p) => buildRestaDiferencia(p),
  "area-distributiva": (p) => buildAreaDistributiva(p),
  "reparto-agrupar": (p) => buildRepartoAgrupar(p),
  "expr-reescritura": (p) => buildExprReescritura(p),
  "criba-eratostenes": (p) => buildCribaEratostenes(p),
  "criterio-alternada": (p) => buildCriterioAlternada(p),
  "criterio-ejemplos": (p) => buildCriterioEjemplos(p),
  "criterio-suma-cifras": (p) => buildCriterioSumaCifras(p),
  "descomposicion-primos": (p) => buildDescomposicionPrimos(p),
  "divisibilidad-grupos": (p) => buildDivisibilidadGrupos(p),
  "divisores-rectangulos": (p) => buildDivisoresRectangulos(p),
  "mcd-cortes": (p) => buildMcdCortes(p),
  "multiplos-saltos": (p) => buildMultiplosSaltos(p),
  "tabla-exponentes": (p) => buildTablaExponentes(p),
  "ascensor-enteros": (p) => buildAscensorEnteros(p),
  "recta-enteros": () => buildRectaEnteros(),
  "valor-absoluto": (p) => buildValorAbsoluto(p),
  "comparar-enteros": (p) => buildCompararEnteros(p),
  "suma-recta": (p) => buildSumaRecta(p),
  "fichas-opuestos": (p) => buildFichasOpuestos(p),
  "resta-opuesto": (p) => buildRestaOpuesto(p),
  "parentesis-signos": (p) => buildParentesisSignos(p),
  "producto-signos": (p) => buildProductoSignos(p),
  "division-inversa": (p) => buildDivisionInversa(p),
};

export function buildSlideAnim(
  scene: SlideAnimId,
  params: SlideAnimParams = {},
  captionOverride?: string[],
): AnimBuild {
  const built = SLIDE_ANIM_REGISTRY[scene](params);
  if (captionOverride?.length) {
    const captions = built.captions.map((c, i) => captionOverride[i] ?? c);
    return { ...built, captions };
  }
  return built;
}
