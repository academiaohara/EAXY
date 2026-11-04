import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const cubiertasPlanosAcotadosDt1Lesson: InteractiveLesson = {
  slug: "cubiertas-planos-acotados-dt1",
  title: "3. Intersección de planos. Cubiertas",
  subtitle: DT1_SUBTITLES[13],
  stage: { theme: "board" },
  steps: [
    slide("interseccion", "Intersección de dos planos", [], diagrama("d13-interseccion"), "visual-top"),
    ...construccionPasos("acotados-interseccion"),
    slide("paralelas", "Cuando las l.m.p. son paralelas", [], diagrama("d13-paralelas"), "visual-top"),
    ...construccionPasos("acotados-interseccion-paralelas"),
    slide("arista-gotera", "Arista y gotera", [], diagrama("d13-arista-gotera"), "visual-top"),
    slide("cubiertas", "Aplicación: cubiertas de edificios", [], diagrama("d13-cubiertas"), "visual-top"),
    ...construccionPasos("acotados-cubierta"),
  ],
};
