import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const prismasPiramidesDiedricoDt2Lesson: InteractiveLesson = {
  slug: "prismas-piramides-diedrico-dt2",
  title: "1. Prismas y pirámides en diédrico",
  subtitle: DT2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Representar un sólido", [
      { kind: "steps", items: [
        "Un sólido se representa dibujando sus **vértices**, **aristas** y **caras** en las dos proyecciones, y distinguiendo lo **visto** de lo **oculto** (trazo continuo y discontinuo).",
        "Un **prisma recto** de base regular apoyado en el PH: la proyección horizontal es la **base en verdadera forma**; las aristas laterales se proyectan como **puntos**.",
        "Una **pirámide recta**: las aristas laterales concurren en el **vértice**, que se proyecta en el centro de la base.",
        "En el **alzado**, la base queda sobre la LT y la altura se ve en **verdadera magnitud**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prisma y pirámide", [
      { kind: "text", text: "Cambia el número de lados, el radio y la altura. Compara planta y alzado de un prisma y una pirámide." },
    ], tool("dt2-solido-diedrico-explorador"), "visual-top"),
    slide("visibilidad", "Partes vistas y ocultas", [
      { kind: "steps", items: [
        "En la **planta** se mira desde arriba: lo que está más alto tapa lo que está debajo.",
        "En el **alzado** se mira desde delante: lo que está más cerca del PV tapa lo que está detrás.",
        "Una arista es **oculta** cuando, en esa vista, hay una cara por delante (o por encima) que la tapa. Se dibuja **discontinua**.",
        "Para decidir, se comparan los **alejamientos** (en alzado) o las **cotas** (en planta) de dos aristas que se cruzan en la proyección.",
      ] },
    ]),
    calc("calc-vol", "Volumen de un prisma", "Un prisma de base cuadrada de 3 cm de lado y 5 cm de altura. ¿Qué volumen tiene, en cm³?", nums(45), "V = A · h = 9 · 5 = 45 cm³.", "El área de la base es 3²."),
    calc("calc-pir", "Volumen de una pirámide", "Una pirámide con la misma base y altura que el prisma anterior. ¿Qué volumen tiene, en cm³?", nums(15), "V = A · h / 3 = 45 / 3 = 15 cm³.", "Un tercio del prisma."),
    sort("clasifica", "¿Prisma o pirámide?", "Clasifica cada rasgo según el sólido.",
      [["pri", "Prisma recto", "cobalt"], ["pir", "Pirámide recta", "amber"]],
      [["Las aristas laterales se proyectan como puntos en planta", "pri"], ["Alzado: un rectángulo", "pri"], ["Volumen A · h", "pri"], ["Las aristas laterales concurren en el vértice", "pir"], ["Alzado: un triángulo", "pir"], ["Volumen A · h / 3", "pir"]],
      "El prisma es un cilindro de caras planas; la pirámide termina en un vértice.",
    ),
    pick("check", "Altura en verdadera magnitud", "Un prisma recto está apoyado en el PH. ¿Dónde se ve su altura en verdadera magnitud?",
      "En el alzado",
      [["En la planta", "En la planta las aristas laterales son puntos."], ["En ninguna", "Se ve en alzado."], ["Solo tras abatir", "No hace falta."]],
      "Las aristas laterales son verticales, paralelas al PV: se ven en verdadera magnitud en el alzado.",
    ),
  ],
};
