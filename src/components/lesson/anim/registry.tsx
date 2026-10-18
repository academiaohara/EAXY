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
import { buildComaPotencias10 } from "@/components/lesson/anim/scenes/coma-potencias10";
import { buildCompararDecimales } from "@/components/lesson/anim/scenes/comparar-decimales";
import { buildDecimalColumna } from "@/components/lesson/anim/scenes/decimal-columna";
import { buildDecimalProducto } from "@/components/lesson/anim/scenes/decimal-producto";
import { buildDecimalZoom } from "@/components/lesson/anim/scenes/decimal-zoom";
import { buildDivisionComaDivisor } from "@/components/lesson/anim/scenes/division-coma-divisor";
import { buildDivisionDecimal } from "@/components/lesson/anim/scenes/division-decimal";
import { buildRedondeoDecimal } from "@/components/lesson/anim/scenes/redondeo-decimal";
import { buildTablaDecimal } from "@/components/lesson/anim/scenes/tabla-decimal";

import { buildCuadradosArea } from "@/components/lesson/anim/scenes/cuadrados-area";
import { buildCuboAgua } from "@/components/lesson/anim/scenes/cubo-agua";
import { buildEscalaLongitudes } from "@/components/lesson/anim/scenes/escala-longitudes";
import { buildEscaleraUnidades } from "@/components/lesson/anim/scenes/escalera-unidades";
import { buildM2Dm2 } from "@/components/lesson/anim/scenes/m2-dm2";
import { buildMedirUnidad } from "@/components/lesson/anim/scenes/medir-unidad";
import { buildMeridianoMetro } from "@/components/lesson/anim/scenes/meridiano-metro";
import { buildTablaUnidades } from "@/components/lesson/anim/scenes/tabla-unidades";
import { buildFraccionEquivalente } from "@/components/lesson/anim/scenes/fraccion-equivalente";
import { buildFraccionOperador } from "@/components/lesson/anim/scenes/fraccion-operador";
import { buildFraccionPartes } from "@/components/lesson/anim/scenes/fraccion-partes";
import { buildFraccionRecta } from "@/components/lesson/anim/scenes/fraccion-recta";
import { buildFraccionBarrasSuma } from "@/components/lesson/anim/scenes/fraccion-barras-suma";
import { buildFraccionCabe } from "@/components/lesson/anim/scenes/fraccion-cabe";
import { buildFraccionCombinada } from "@/components/lesson/anim/scenes/fraccion-combinada";
import { buildFraccionGastoResto } from "@/components/lesson/anim/scenes/fraccion-gasto-resto";
import { buildFraccionDeFraccion } from "@/components/lesson/anim/scenes/fraccion-de-fraccion";
import { buildSimplificarIrreducible } from "@/components/lesson/anim/scenes/simplificar-irreducible";
import { buildSimplificarFactores } from "@/components/lesson/anim/scenes/simplificar-factores";

import { buildAumentoBarra } from "@/components/lesson/anim/scenes/aumento-barra";
import { buildCuadriculaPorcentaje } from "@/components/lesson/anim/scenes/cuadricula-porcentaje";
import { buildReduccionUnidad } from "@/components/lesson/anim/scenes/reduccion-unidad";
import { buildReglaTresProducto } from "@/components/lesson/anim/scenes/regla-tres-producto";
import { buildPorcentajeMental } from "@/components/lesson/anim/scenes/porcentaje-mental";
import { buildFactorCambio } from "@/components/lesson/anim/scenes/factor-cambio";
import { buildReglaTresCruz } from "@/components/lesson/anim/scenes/regla-tres-cruz";
import { buildTablaRazon } from "@/components/lesson/anim/scenes/tabla-razon";

import { buildBalanzaEcuacion } from "@/components/lesson/anim/scenes/balanza-ecuacion";
import { buildMaquinaFuncion } from "@/components/lesson/anim/scenes/maquina-funcion";
import { buildSemejantesAgrupar } from "@/components/lesson/anim/scenes/semejantes-agrupar";
import { buildLetrasValores } from "@/components/lesson/anim/scenes/letras-valores";
import { buildEnunciadoExpresion } from "@/components/lesson/anim/scenes/enunciado-expresion";
import { buildCampoPerimetroArea } from "@/components/lesson/anim/scenes/campo-perimetro-area";
import { buildMonomioPartes } from "@/components/lesson/anim/scenes/monomio-partes";
import { buildMonomioProducto } from "@/components/lesson/anim/scenes/monomio-producto";
import { buildMonomioCociente } from "@/components/lesson/anim/scenes/monomio-cociente";
import { buildEcuacionIdentidad } from "@/components/lesson/anim/scenes/ecuacion-identidad";
import { buildComprobarSolucion } from "@/components/lesson/anim/scenes/comprobar-solucion";
import { buildPasosProblema } from "@/components/lesson/anim/scenes/pasos-problema";

import { buildRectaSemirrecta } from "@/components/lesson/anim/scenes/recta-semirrecta";
import { buildPosicionesRectas } from "@/components/lesson/anim/scenes/posiciones-rectas";
import { buildMediatrizEquidistan } from "@/components/lesson/anim/scenes/mediatriz-equidistan";
import { buildMediatrizCompas } from "@/components/lesson/anim/scenes/mediatriz-compas";
import { buildBisectrizEquidistan } from "@/components/lesson/anim/scenes/bisectriz-equidistan";
import { buildBisectrizCompas } from "@/components/lesson/anim/scenes/bisectriz-compas";
import { buildAnguloElementos } from "@/components/lesson/anim/scenes/angulo-elementos";
import { buildAngulosOpuestos } from "@/components/lesson/anim/scenes/angulos-opuestos";
import { buildParalelasSecante } from "@/components/lesson/anim/scenes/paralelas-secante";
import { buildGradoMinuto } from "@/components/lesson/anim/scenes/grado-minuto";
import { buildAngulosColumna } from "@/components/lesson/anim/scenes/angulos-columna";
import { buildTriangulo180 } from "@/components/lesson/anim/scenes/triangulo-180";
import { buildPoligonoTriangulos } from "@/components/lesson/anim/scenes/poligono-triangulos";

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
  "decimal-zoom": (p) => buildDecimalZoom(p),
  "tabla-decimal": (p) => buildTablaDecimal(p),
  "comparar-decimales": (p) => buildCompararDecimales(p),
  "redondeo-decimal": (p) => buildRedondeoDecimal(p),
  "decimal-columna": (p) => buildDecimalColumna(p),
  "decimal-producto": (p) => buildDecimalProducto(p),
  "coma-potencias10": (p) => buildComaPotencias10(p),
  "division-decimal": (p) => buildDivisionDecimal(p),
  "division-coma-divisor": (p) => buildDivisionComaDivisor(p),
  "medir-unidad": () => buildMedirUnidad(),
  "meridiano-metro": () => buildMeridianoMetro(),
  "cubo-agua": () => buildCuboAgua(),
  "escalera-unidades": (p) => buildEscaleraUnidades(p),
  "tabla-unidades": (p) => buildTablaUnidades(p),
  "escala-longitudes": () => buildEscalaLongitudes(),
  "cuadrados-area": (p) => buildCuadradosArea(p),
  "m2-dm2": () => buildM2Dm2(),
  "tabla-razon": (p) => buildTablaRazon(p),
  "reduccion-unidad": (p) => buildReduccionUnidad(p),
  "regla-tres-cruz": (p) => buildReglaTresCruz(p),
  "porcentaje-mental": (p) => buildPorcentajeMental(p),
  "factor-cambio": (p) => buildFactorCambio(p),
  "regla-tres-producto": (p) => buildReglaTresProducto(p),
  "cuadricula-porcentaje": (p) => buildCuadriculaPorcentaje(p),
  "aumento-barra": (p) => buildAumentoBarra(p),
  "fraccion-partes": (p) => buildFraccionPartes(p),
  "fraccion-recta": (p) => buildFraccionRecta(p),
  "fraccion-operador": (p) => buildFraccionOperador(p),
  "fraccion-equivalente": (p) => buildFraccionEquivalente(p),
  "fraccion-barras-suma": (p) => buildFraccionBarrasSuma(p),
  "fraccion-de-fraccion": (p) => buildFraccionDeFraccion(p),
  "simplificar-factores": (p) => buildSimplificarFactores(p),
  "simplificar-irreducible": (p) => buildSimplificarIrreducible(p),
  "fraccion-cabe": (p) => buildFraccionCabe(p),
  "fraccion-combinada": (p) => buildFraccionCombinada(p),
  "fraccion-gasto-resto": (p) => buildFraccionGastoResto(p),
  "balanza-ecuacion": (p) => buildBalanzaEcuacion(p),
  "maquina-funcion": (p) => buildMaquinaFuncion(p),
  "semejantes-agrupar": (p) => buildSemejantesAgrupar(p),
  "letras-valores": () => buildLetrasValores(),
  "enunciado-expresion": () => buildEnunciadoExpresion(),
  "campo-perimetro-area": () => buildCampoPerimetroArea(),
  "monomio-partes": () => buildMonomioPartes(),
  "monomio-producto": (p) => buildMonomioProducto(p),
  "monomio-cociente": (p) => buildMonomioCociente(p),
  "ecuacion-identidad": () => buildEcuacionIdentidad(),
  "comprobar-solucion": () => buildComprobarSolucion(),
  "pasos-problema": () => buildPasosProblema(),
  "recta-semirrecta": () => buildRectaSemirrecta(),
  "posiciones-rectas": () => buildPosicionesRectas(),
  "mediatriz-equidistan": () => buildMediatrizEquidistan(),
  "mediatriz-compas": () => buildMediatrizCompas(),
  "bisectriz-equidistan": () => buildBisectrizEquidistan(),
  "bisectriz-compas": () => buildBisectrizCompas(),
  "angulo-elementos": () => buildAnguloElementos(),
  "angulos-opuestos": () => buildAngulosOpuestos(),
  "paralelas-secante": () => buildParalelasSecante(),
  "grado-minuto": () => buildGradoMinuto(),
  "angulos-columna": (p) => buildAngulosColumna(p),
  "triangulo-180": () => buildTriangulo180(),
  "poligono-triangulos": () => buildPoligonoTriangulos(),
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
