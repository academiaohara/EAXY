import { ecuacionesLinealesDosIncognitasLesson } from "@/data/lessons/ecuaciones-lineales-dos-incognitas";
import { problemasConSistemasLesson } from "@/data/lessons/problemas-con-sistemas";
import { resolucionSistemasLinealesLesson } from "@/data/lessons/resolucion-sistemas-lineales";
import { sistemasLinealesGraficaLesson } from "@/data/lessons/sistemas-lineales-grafica";
import { sistemasNoLinealesLesson } from "@/data/lessons/sistemas-no-lineales";

export const interactiveLessons = {
  "ecuaciones-lineales-dos-incognitas": ecuacionesLinealesDosIncognitasLesson,
  "sistemas-lineales-grafica": sistemasLinealesGraficaLesson,
  "resolucion-sistemas-lineales": resolucionSistemasLinealesLesson,
  "sistemas-no-lineales": sistemasNoLinealesLesson,
  "problemas-con-sistemas": problemasConSistemasLesson,
} as const;

export type InteractiveLessonSlug = keyof typeof interactiveLessons;
