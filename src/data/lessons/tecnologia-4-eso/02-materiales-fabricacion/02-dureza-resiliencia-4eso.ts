import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const durezaResiliencia4esoLesson: InteractiveLesson = {
  slug: "dureza-resiliencia-4eso",
  title: "2. Dureza y resiliencia: Brinell y Charpy",
  subtitle: TECESO4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Más propiedades que medir", [
      { kind: "steps", items: [
        "**Dureza**: resistencia a ser rayado o penetrado. Se mide con **Brinell** (bola), **Rockwell** (cono o bola, lectura directa) y **Vickers** (pirámide).",
        "**Resiliencia (tenacidad)**: energía que absorbe el material al romperse por un impacto. Se mide con el **péndulo de Charpy**.",
        "**Fatiga**: rotura por cargas repetidas, aunque cada una sea menor que el límite elástico.",
        "**Frágil** y **dúctil** no son lo mismo que duro y blando: el vidrio es duro y frágil; el cobre, blando y dúctil.",
      ] },
    ], undefined, "stack"),
    slide("brinell", "Ensayo Brinell", [
      { kind: "text", text: "Cuanto más pequeña es la huella de la bola, más duro es el material. Cambia la carga y el diámetro de la huella." },
    ], tool("eso4-brinell-explorador"), "visual-top"),
    slide("charpy", "Péndulo de Charpy", [
      { kind: "text", text: "Mide la energía que absorbe una probeta al romperse según la altura que alcanza el péndulo." },
    ], tool("eso4-charpy-explorador"), "visual-top"),
    slide("elegir", "Cómo se usan estos datos", [
      { kind: "steps", items: [
        "Una **herramienta de corte** necesita dureza; una **viga** de un puente necesita tenacidad.",
        "Un material **frágil** rompe sin avisar; uno **dúctil** se deforma antes y avisa.",
        "En estructuras se prefieren materiales **dúctiles**; en herramientas, **duros** (aunque más frágiles).",
        "Se trabaja con **normas** que fijan cómo se hace cada ensayo para poder comparar resultados.",
      ] },
    ]),
    calc("calc-K", "Energía absorbida", "Un péndulo de 22 kg cae desde 1,4 m y tras romper la probeta sube a 0,9 m. ¿Cuántos J absorbió? (m·g·(h₀−h₁), redondea a un entero)", nums(108, 107.9), "22 · 9,81 · 0,5 ≈ 107,9 J.", "Masa por g por la diferencia de alturas."),
    calc("calc-res", "Resiliencia", "Con 108 J y una sección de 0,8 cm², ¿cuál es la resiliencia, en J/cm²? (redondea a un entero)", nums(135, 134.9), "108 / 0,8 = 135 J/cm².", "Energía entre sección."),
    sort("clasifica-prop", "¿Dureza o resiliencia?", "Relaciona cada ensayo o ejemplo con la propiedad.",
      [["dur", "Dureza", "cobalt"], ["res", "Resiliencia", "amber"]],
      [["Dejar una huella con una bola", "dur"], ["Rayar un material con otro", "dur"], ["Una broca debe tener mucha", "dur"], ["Romper una probeta de un golpe", "res"], ["Un chasis que debe absorber un choque", "res"], ["El frío la reduce en muchos aceros", "res"]],
      "La dureza resiste la penetración; la resiliencia, el impacto.",
    ),
    pick("check-fragil", "Frágil", "En un ensayo de Charpy el péndulo casi no pierde altura al romper la probeta. ¿Qué indica?",
      "Que el material es frágil: absorbe poca energía al romperse",
      [["Que es muy tenaz", "Sería lo contrario."], ["Que es muy blando", "No hay relación directa."], ["Que el péndulo falló", "Es un resultado válido."]],
      "Poca energía absorbida significa rotura frágil.",
    ),
  ],
};
