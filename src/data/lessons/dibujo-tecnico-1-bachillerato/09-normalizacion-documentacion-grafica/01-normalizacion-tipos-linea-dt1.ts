import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const normalizacionTiposLineaDt1Lesson: InteractiveLesson = {
  slug: "normalizacion-tipos-linea-dt1",
  title: "1. Normalización y líneas normalizadas",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un lenguaje común", [
      { kind: "steps", items: [
        "**Normalizar** es establecer **reglas comunes** para la forma de dibujar, de modo que el plano se interprete igual en cualquier taller, empresa o país.",
        "Las normas las elaboran organismos: **ISO** (internacional), **CEN** (europeo) y **UNE** (español, de AENOR). Las **UNE-EN ISO** adoptan normas europeas e internacionales como españolas.",
        "Las **normas fundamentales** de dibujo regulan: **formatos** (ISO 5457), **escalas** (ISO 5455), **líneas** y **representación** (ISO 128), **acotación** (ISO 129) y **escritura** (ISO 3098).",
        "Normalizar facilita la **intercambiabilidad**, abarata la producción y reduce errores.",
      ] },
    ], undefined, "stack"),
    slide("lineas", "Los tipos de línea", [
      { kind: "text", text: "Recorre los tipos de línea y fíjate en el espesor: la fina es siempre la mitad de la gruesa." },
    ], tool("dt1-tipos-linea-explorador"), "visual-top"),
    slide("reglas", "Reglas de uso", [
      { kind: "steps", items: [
        "Los **espesores** siguen una serie de razón $\\sqrt{2}$: 0,13 · 0,18 · 0,25 · 0,35 · 0,5 · 0,7 · 1 · 1,4 · 2 mm.",
        "La línea **gruesa** es el **doble** de la **fina**; en un mismo dibujo se usan **dos espesores**.",
        "Si coinciden líneas, **prevalece** la de mayor importancia: contorno visible, oculto, plano de corte, eje, cotas.",
        "Los **ejes** sobresalen un poco del contorno; las **cotas** y las **líneas de referencia** se dibujan **finas**.",
      ] },
    ]),
    calc("calc-fina", "Línea fina", "Una línea gruesa de 0,7 mm. ¿Qué espesor tiene la línea fina asociada, en mm?", nums(0.35), "La fina es la mitad: 0,35 mm.", "Relación 2 : 1."),
    calc("calc-serie", "Serie normalizada", "Cada espesor de la serie es √2 veces el anterior. Con 0,5 mm, ¿cuál es el siguiente, en mm? (un decimal)", nums(0.7, 0.71), "0,5 · 1,414 ≈ 0,7 mm.", "Multiplica por √2."),
    calc("calc-rel", "Relación", "¿Cuántas veces más gruesa es la línea gruesa que la fina?", nums(2), "Relación 2 : 1.", "El doble."),
    sort("clasifica-linea", "¿Qué línea usarías?", "Asocia cada elemento con el tipo de línea.",
      [["gru", "Continua gruesa", "cobalt"], ["fin", "Continua fina", "amber"], ["dis", "Discontinua", "emerald"], ["mix", "Mixta de trazo y punto", "rose"]],
      [["Contorno visible de la pieza", "gru"], ["Aristas vistas", "gru"], ["Línea de cota", "fin"], ["Rayado de una sección", "fin"], ["Arista oculta", "dis"], ["Contorno oculto", "dis"], ["Eje de un cilindro", "mix"], ["Plano de simetría", "mix"]],
      "Cada tipo de línea tiene una función concreta.",
    ),
    pick("check-prev", "Líneas coincidentes", "Una arista oculta coincide con una arista vista. ¿Cuál se dibuja?",
      "La arista vista (línea continua gruesa)",
      [["La oculta, discontinua", "Prevalece la de mayor importancia."], ["Las dos superpuestas", "Se dibuja una sola."], ["Ninguna", "Hay que dibujar la arista."]],
      "Prevalece la línea más importante: una arista vista tapa a la oculta.",
    ),
  ],
};
