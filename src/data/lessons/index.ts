import { aproximacionRedondeoNaturalesLesson } from "@/data/lessons/aproximacion-redondeo-naturales";
import { criteriosDivisibilidadLesson } from "@/data/lessons/criterios-divisibilidad";
import { divisionOrdenOperacionesNaturalesLesson } from "@/data/lessons/division-orden-operaciones-naturales";
import { ecuacionesLinealesDosIncognitasLesson } from "@/data/lessons/ecuaciones-lineales-dos-incognitas";
import { enterosPositivosNegativosLesson } from "@/data/lessons/enteros-positivos-negativos";
import { enterosZRectaValorAbsolutoLesson } from "@/data/lessons/enteros-z-recta-valor-absoluto";
import { mcmMcdNaturalesLesson } from "@/data/lessons/mcm-mcd-naturales";
import { multiplicacionDivisionEnterosLesson } from "@/data/lessons/multiplicacion-division-enteros";
import { divisionNumerosDecimalesLesson } from "@/data/lessons/division-numeros-decimales";
import { multiplicacionNaturalesLesson } from "@/data/lessons/multiplicacion-naturales";
import { operacionesNumerosDecimalesLesson } from "@/data/lessons/operaciones-numeros-decimales";
import { ordenesUnidadesDecimalesLesson } from "@/data/lessons/ordenes-unidades-decimales";
import { multiplosDivisoresNaturalesLesson } from "@/data/lessons/multiplos-divisores-naturales";
import { numerosGrandesAbreviadosLesson } from "@/data/lessons/numeros-grandes-abreviados";
import { parentesisEnterosLesson } from "@/data/lessons/parentesis-enteros";
import { potenciasBase10Lesson } from "@/data/lessons/potencias-base-10";
import { potenciasBaseExponenteLesson } from "@/data/lessons/potencias-base-exponente";
import { primosCompuestosLesson } from "@/data/lessons/primos-compuestos";
import { problemasConSistemasLesson } from "@/data/lessons/problemas-con-sistemas";
import { raizCuadradaNaturalesLesson } from "@/data/lessons/raiz-cuadrada-naturales";
import { relacionDivisibilidadLesson } from "@/data/lessons/relacion-divisibilidad";
import { resolucionSistemasLinealesLesson } from "@/data/lessons/resolucion-sistemas-lineales";
import { sistemasLinealesGraficaLesson } from "@/data/lessons/sistemas-lineales-grafica";
import { sistemasNoLinealesLesson } from "@/data/lessons/sistemas-no-lineales";
import { sistemasNumeracionNaturalesLesson } from "@/data/lessons/sistemas-numeracion-naturales";
import { sumaRestaEnterosLesson } from "@/data/lessons/suma-resta-enteros";
import { sumaRestaNaturalesLesson } from "@/data/lessons/suma-resta-naturales";

export const interactiveLessons = {
  "aproximacion-redondeo-naturales": aproximacionRedondeoNaturalesLesson,
  "criterios-divisibilidad": criteriosDivisibilidadLesson,
  "division-orden-operaciones-naturales": divisionOrdenOperacionesNaturalesLesson,
  "ecuaciones-lineales-dos-incognitas": ecuacionesLinealesDosIncognitasLesson,
  "enteros-positivos-negativos": enterosPositivosNegativosLesson,
  "enteros-z-recta-valor-absoluto": enterosZRectaValorAbsolutoLesson,
  "mcm-mcd-naturales": mcmMcdNaturalesLesson,
  "multiplicacion-division-enteros": multiplicacionDivisionEnterosLesson,
  "division-numeros-decimales": divisionNumerosDecimalesLesson,
  "multiplicacion-naturales": multiplicacionNaturalesLesson,
  "operaciones-numeros-decimales": operacionesNumerosDecimalesLesson,
  "ordenes-unidades-decimales": ordenesUnidadesDecimalesLesson,
  "multiplos-divisores-naturales": multiplosDivisoresNaturalesLesson,
  "numeros-grandes-abreviados": numerosGrandesAbreviadosLesson,
  "parentesis-enteros": parentesisEnterosLesson,
  "potencias-base-10": potenciasBase10Lesson,
  "potencias-base-exponente": potenciasBaseExponenteLesson,
  "primos-compuestos": primosCompuestosLesson,
  "problemas-con-sistemas": problemasConSistemasLesson,
  "raiz-cuadrada-naturales": raizCuadradaNaturalesLesson,
  "relacion-divisibilidad": relacionDivisibilidadLesson,
  "resolucion-sistemas-lineales": resolucionSistemasLinealesLesson,
  "sistemas-lineales-grafica": sistemasLinealesGraficaLesson,
  "sistemas-no-lineales": sistemasNoLinealesLesson,
  "sistemas-numeracion-naturales": sistemasNumeracionNaturalesLesson,
  "suma-resta-enteros": sumaRestaEnterosLesson,
  "suma-resta-naturales": sumaRestaNaturalesLesson,
} as const;

export type InteractiveLessonSlug = keyof typeof interactiveLessons;
