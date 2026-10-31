import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ajusteEstequiometriaFb1Lesson: InteractiveLesson = {
  slug: "ajuste-estequiometria-fb1",
  title: "1. Ajuste de ecuaciones y estequiometría",
  subtitle: FB1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("rx", "Transformaciones químicas", [
      { kind: "steps", items: [
        "En una **reacción química** unas sustancias (**reactivos**) se transforman en otras (**productos**): se rompen enlaces y se forman otros nuevos; **los átomos se conservan**, se reordenan.",
        "Se representa con una **ecuación química**: CH₄ + 2 O₂ → CO₂ + 2 H₂O. Puede llevar **estados** (s, l, g, aq) y las condiciones.",
        "**Teoría de colisiones**: para que haya reacción las partículas deben **chocar** con suficiente **energía** (energía de activación) y orientación adecuada.",
        "**Ley de Lavoisier**: la masa se conserva. **Ley de Proust**: las sustancias reaccionan en proporciones fijas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Ajusta ecuaciones", [
      { kind: "text", text: "Elige una reacción y mueve los coeficientes hasta que todos los elementos queden igualados. ¿Puedes lograrlo con los números más pequeños?" },
    ], tool("fb1-ajuste-explorador"), "visual-top"),
    slide("metodo", "Cómo ajustar", [
      { kind: "steps", items: [
        "**Tanteo**: empieza por el elemento que aparece en **un solo** compuesto de cada lado; deja **O y H para el final**. Si aparece una fracción, **multiplica todo** por el denominador.",
        "**Algebraico**: un coeficiente (a, b, c…) por sustancia y **una ecuación por elemento**; se fija uno (por ejemplo a = 1) y se resuelve.",
        "**Nunca** se cambian los **subíndices**. Los coeficientes finales deben ser los **enteros más pequeños**.",
        "Comprueba siempre: mismos átomos de cada elemento a ambos lados y **misma masa total**.",
      ] },
    ], undefined, "stack"),
    slide("esteq", "Cálculos estequiométricos", [
      { kind: "steps", items: [
        "Los **coeficientes** son la proporción en **moles** (y en moléculas): 2 H₂ + O₂ → 2 H₂O ≡ 2 mol de H₂ con 1 mol de O₂ dan 2 mol de H₂O.",
        "**Cálculo**: masa de A → moles de A (n = m/M) → **moles de B** (relación de coeficientes) → masa de B (m = n·M).",
        "**Con gases**: si P y T son iguales, los coeficientes también son proporción de **volúmenes** (Avogadro); o se usa **PV = nRT**.",
        "**Con disoluciones**: moles de soluto = M·V (en L).",
      ] },
    ], undefined, "stack"),
    calc("calc-o2", "Ajuste del propano", "Al ajustar C₃H₈ + x O₂ → 3 CO₂ + 4 H₂O, ¿cuánto vale x?", nums(5), "Oxígenos: 3·2 + 4 = 10 → x = 5.", "Cuenta los átomos de O de los productos."),
    calc("calc-moles", "Moles de producto", "En N₂ + 3 H₂ → 2 NH₃, ¿cuántos moles de NH₃ se forman a partir de 6 mol de H₂?", nums(4), "Relación 3:2 → 6·2/3 = 4 mol.", "n(NH₃) = n(H₂)·2/3."),
    calc("calc-masa", "Masa de CO₂", "En CH₄ + 2 O₂ → CO₂ + 2 H₂O, ¿cuántos gramos de CO₂ se forman al quemar 32 g de CH₄? (C 12; H 1; O 16)", nums(88), "n(CH₄) = 32/16 = 2 mol → 2 mol de CO₂ → 88 g.", "Relación 1:1."),
    calc("calc-gas", "Volumen de gas", "En 2 H₂ + O₂ → 2 H₂O(g), ¿qué volumen de H₂O(g) se obtiene a partir de 10 L de H₂, medidos a igual P y T? (L)", nums(10), "Relación 2:2 → 10 L.", "Coeficientes = proporción de volúmenes."),
    sort("clasifica", "¿Es válido para ajustar?", "Indica si la acción es correcta al ajustar una ecuación.",
      [["ok", "Correcto", "emerald"], ["no", "Incorrecto", "rose"]],
      [["Poner un 2 delante de una fórmula", "ok"], ["Cambiar H₂O por H₂O₂ para igualar el oxígeno", "no"], ["Multiplicar todos los coeficientes por 2 para quitar fracciones", "ok"], ["Cambiar el subíndice del O₂", "no"], ["Dejar O y H para el final", "ok"], ["Escribir fracciones como 5/2 O₂ en la ecuación final", "no"]],
      "Solo se modifican los coeficientes, y deben ser enteros.",
    ),
    pick("check", "Coeficientes", "En una ecuación ajustada, ¿qué indican los coeficientes?",
      "La proporción en moles (y en moléculas) de reactivos y productos",
      [["La proporción en masa", "Las masas dependen de las masas molares."], ["Los subíndices de cada compuesto", "Son cosas distintas."], ["La velocidad de la reacción", "No tiene relación."]],
      "Los coeficientes son proporciones de cantidad de sustancia.",
    ),
  ],
};
