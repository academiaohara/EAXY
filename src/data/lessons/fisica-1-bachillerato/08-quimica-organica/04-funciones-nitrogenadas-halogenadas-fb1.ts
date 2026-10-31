import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const funcionesNitrogenadasHalogenadasFb1Lesson: InteractiveLesson = {
  slug: "funciones-nitrogenadas-halogenadas-fb1",
  title: "4. Funciones nitrogenadas y derivados halogenados",
  subtitle: FB1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("nitro", "Funciones nitrogenadas", [
      { kind: "steps", items: [
        "**Aminas** R–NH₂ (derivadas del NH₃ al sustituir H por radicales): **primarias**, **secundarias** (R–NH–R') y **terciarias**. Son **bases débiles**; olor a pescado.",
        "**Amidas** R–CO–NH₂ (derivadas de ácidos): -amida. Enlace **peptídico** de las proteínas.",
        "**Nitrilos** R–C≡N (-nitrilo): el carbono del CN cuenta en la cadena. Etanonitrilo CH₃–C≡N.",
        "**Nitrocompuestos** R–NO₂ (nitrobenceno): explosivos como el TNT.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Nombra funciones nitrogenadas y halogenuros", [
      { kind: "text", text: "Elige aminas, amidas, nitrilos o haluros y cambia la cadena y la posición. ¿Cómo cambia el nombre?" },
    ], tool("fb1-grupos-explorador"), "visual-top"),
    slide("halo", "Derivados halogenados", [
      { kind: "steps", items: [
        "**Halogenuros de alquilo** R–X (X = F, Cl, Br, I): se nombran como sustituyentes de la cadena (**cloro-, bromo-**): 2-clorobutano; clorometano; triclorometano (cloroformo).",
        "Son **polares** pero poco solubles en agua; se usan como **disolventes**, refrigerantes (CFC: **destruyen el ozono**), plásticos (PVC) y pesticidas (DDT: persistente, acumulativo).",
        "**Reacciones**: sustitución (el halógeno es sustituido por OH, NH₂…) y **eliminación** (dan alquenos).",
      ] },
    ], undefined, "stack"),
    slide("poli", "Biomoléculas y polímeros", [
      { kind: "steps", items: [
        "Las **proteínas** son polímeros de **aminoácidos** (que contienen –NH₂ y –COOH) unidos por **enlaces peptídicos (amida)**.",
        "El **nailon** es una poliamida; el **poliéster (PET)**, un poliéster; el **PVC**, un polímero de adición de cloroeteno.",
        "Las **vitaminas, hormonas, fármacos** (paracetamol, aspirina) y el **ADN** tienen grupos oxigenados y nitrogenados.",
      ] },
    ], undefined, "stack"),
    calc("calc-amina", "Hidrógenos de la metilamina", "La metilamina es CH₃–NH₂. ¿Cuántos átomos de hidrógeno tiene?", nums(5), "3 + 2 = 5 H (CH₅N).", "Suma los del CH₃ y los del NH₂."),
    calc("calc-nitrilo", "Carbonos del propanonitrilo", "El propanonitrilo es CH₃–CH₂–C≡N. ¿Cuántos carbonos tiene en total (incluido el del CN)?", nums(3), "Propano: 3 carbonos, uno es el del CN.", "Cadena de tres."),
    calc("calc-cl", "Masa molar", "¿Cuál es la masa molar del clorometano, CH₃Cl, en g/mol? (C 12; H 1; Cl 35,5)", nums(50.5), "12 + 3 + 35,5 = 50,5 g/mol.", "Suma las masas atómicas."),
    calc("calc-enlace", "Enlaces del triple", "En el grupo –C≡N, ¿cuántos pares de electrones comparten el C y el N?", nums(3), "Triple enlace: 3 pares.", "≡ son tres enlaces."),
    sort("clasifica", "Función nitrogenada", "Clasifica cada fórmula.",
      [["ami", "Amina", "cobalt"], ["amd", "Amida", "emerald"], ["nit", "Nitrilo", "rose"]],
      [["CH₃–NH₂", "ami"], ["CH₃–CH₂–NH₂", "ami"], ["CH₃–CONH₂", "amd"], ["CH₃–CH₂–CONH₂", "amd"], ["CH₃–C≡N", "nit"], ["CH₃–CH₂–C≡N", "nit"]],
      "NH₂ suelto: amina; CO–NH₂: amida; C≡N: nitrilo.",
    ),
    pick("check", "Aminoácidos", "¿Qué enlace une los aminoácidos en las proteínas?",
      "El enlace peptídico, de tipo amida",
      [["Un enlace éter", "No es éter."], ["Un enlace iónico", "Es covalente."], ["Un enlace de hidrógeno únicamente", "Estabiliza la estructura, pero la unión es covalente."]],
      "Grupo –CO–NH– entre aminoácidos.",
    ),
  ],
};
