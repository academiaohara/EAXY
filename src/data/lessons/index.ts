import { aproximacionRedondeoNaturalesLesson } from "@/data/lessons/aproximacion-redondeo-naturales";
import { numerosGrandesAbreviadosLesson } from "@/data/lessons/numeros-grandes-abreviados";
import { potenciasBase10Lesson } from "@/data/lessons/potencias-base-10";
import { potenciasBaseExponenteLesson } from "@/data/lessons/potencias-base-exponente";
import { raizCuadradaNaturalesLesson } from "@/data/lessons/raiz-cuadrada-naturales";
import { divisionOrdenOperacionesNaturalesLesson } from "@/data/lessons/division-orden-operaciones-naturales";
import { ecuacionesLinealesDosIncognitasLesson } from "@/data/lessons/ecuaciones-lineales-dos-incognitas";
import { multiplicacionNaturalesLesson } from "@/data/lessons/multiplicacion-naturales";
import { problemasConSistemasLesson } from "@/data/lessons/problemas-con-sistemas";
import { resolucionSistemasLinealesLesson } from "@/data/lessons/resolucion-sistemas-lineales";
import { sistemasLinealesGraficaLesson } from "@/data/lessons/sistemas-lineales-grafica";
import { sistemasNoLinealesLesson } from "@/data/lessons/sistemas-no-lineales";
import { sistemasNumeracionNaturalesLesson } from "@/data/lessons/sistemas-numeracion-naturales";
import { sumaRestaNaturalesLesson } from "@/data/lessons/suma-resta-naturales";

export const interactiveLessons = {
  "potencias-base-exponente": potenciasBaseExponenteLesson,
  "potencias-base-10": potenciasBase10Lesson,
  "numeros-grandes-abreviados": numerosGrandesAbreviadosLesson,
  "raiz-cuadrada-naturales": raizCuadradaNaturalesLesson,
  "sistemas-numeracion-naturales": sistemasNumeracionNaturalesLesson,
  "aproximacion-redondeo-naturales": aproximacionRedondeoNaturalesLesson,
  "suma-resta-naturales": sumaRestaNaturalesLesson,
  "multiplicacion-naturales": multiplicacionNaturalesLesson,
  "division-orden-operaciones-naturales": divisionOrdenOperacionesNaturalesLesson,
  "ecuaciones-lineales-dos-incognitas": ecuacionesLinealesDosIncognitasLesson,
  "sistemas-lineales-grafica": sistemasLinealesGraficaLesson,
  "resolucion-sistemas-lineales": resolucionSistemasLinealesLesson,
  "sistemas-no-lineales": sistemasNoLinealesLesson,
  "problemas-con-sistemas": problemasConSistemasLesson,
} as const;

export type InteractiveLessonSlug = keyof typeof interactiveLessons;
