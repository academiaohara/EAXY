import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cambiosEstadoCalorLatenteFq3Lesson: InteractiveLesson = {
  slug: "cambios-estado-calor-latente-fq3",
  title: "4. Cambios de estado y calor latente",
  subtitle: FQ3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Calor sin cambio de temperatura", [
      { kind: "steps", items: [
        "Cuando una sustancia **cambia de estado**, la **temperatura se mantiene constante** aunque siga recibiendo calor.",
        "Ese calor se emplea en **vencer las fuerzas entre las partículas**, no en aumentar su agitación.",
        "El calor necesario para cambiar de estado 1 kg de sustancia es el **calor latente** L: **Q = m · L**.",
        "El agua: **fusión** L = 334 kJ/kg y **vaporización** L = 2260 kJ/kg.",
      ] },
    ], undefined, "stack"),
    slide("explora", "De hielo a vapor", [
      { kind: "text", text: "Aporta calor a hielo a −20 °C. Observa los tramos en los que sube la temperatura y los tramos planos." },
    ], tool("fq3-calentamiento-hielo-explorador"), "visual-top"),
    slide("curva", "La curva de calentamiento", [
      { kind: "steps", items: [
        "**Tramos inclinados**: se calienta una sola fase (hielo, agua, vapor): **Q = m·c·ΔT**.",
        "**Tramos horizontales**: cambio de estado a temperatura constante (**0 °C** la fusión, **100 °C** la ebullición del agua): **Q = m·L**.",
        "Para **enfriar** ocurre lo contrario: la sustancia **cede** la misma cantidad de calor (solidificación, condensación).",
        "El **sudor** nos refresca porque, al evaporarse, **absorbe calor** de la piel.",
      ] },
    ]),
    calc("calc-fus", "Fundir hielo", "¿Cuánto calor hace falta para fundir 0,5 kg de hielo que ya está a 0 °C? (L = 334 kJ/kg), en kJ", nums(167), "Q = 0,5 · 334 = 167 kJ.", "Q = m·L."),
    calc("calc-vap", "Evaporar agua", "¿Y para evaporar 0,2 kg de agua que ya está a 100 °C? (L = 2260 kJ/kg), en kJ", nums(452), "Q = 0,2 · 2260 = 452 kJ.", "Q = m·L."),
    calc("calc-tot", "Calentar agua", "¿Cuánto calor hace falta para pasar 1 kg de agua de 20 °C a 100 °C? (c = 4180 J/kg·°C), en kJ (redondea a un decimal)", nums(334.4, 334), "Q = 1 · 4180 · 80 = 334 400 J = 334,4 kJ.", "Q = m·c·ΔT."),
    calc("calc-comp", "Comparar", "¿Cuántas veces es mayor el calor latente de vaporización del agua (2260 kJ/kg) que el de fusión (334 kJ/kg)? Redondea al entero.", nums(7), "2260 / 334 ≈ 6,8 ≈ 7 veces.", "Divide los dos valores."),
    sort("clasifica", "Tramo de la curva", "Clasifica cada fase del calentamiento del agua.",
      [["su", "La temperatura sube", "rose"], ["cte", "La temperatura es constante", "cobalt"]],
      [["Hielo de −20 °C a 0 °C", "su"], ["Agua líquida de 0 °C a 100 °C", "su"], ["Vapor de 100 °C a 120 °C", "su"], ["Fusión del hielo a 0 °C", "cte"], ["Ebullición del agua a 100 °C", "cte"], ["Cambio de estado en general", "cte"]],
      "En el cambio de estado la temperatura no varía.",
    ),
    pick("check", "Ebullición", "Una olla de agua hirviendo recibe calor del fogón. ¿Por qué su temperatura no sube de 100 °C?",
      "Porque el calor se emplea en evaporar el agua",
      [["Porque el fogón se enfría", "El fogón sigue aportando calor."], ["Porque el agua no admite más calor", "Sí lo admite, pero lo gasta en cambiar de estado."], ["Porque la olla pierde todo el calor", "No es la causa."]],
      "Calor latente de vaporización.",
    ),
  ],
};
