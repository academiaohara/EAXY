import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const esfuerzosTraccionCompresionCortaduraTi2Lesson: InteractiveLesson = {
  slug: "esfuerzos-traccion-compresion-cortadura-ti2",
  title: "5. Esfuerzos: tracción, compresión y cortadura",
  subtitle: TECTI2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Los cinco esfuerzos", [
      { kind: "text", text: "Observa cómo se deforma una pieza con cada tipo de esfuerzo." },
    ], anim("ti2-cinco-esfuerzos"), "text-top"),
    slide("def", "Tensión normal y tensión cortante", [
      { kind: "steps", items: [
        "Una pieza sometida a una fuerza interna F en una sección de área A soporta una **tensión** σ = F / A (en **MPa = N/mm²**).",
        "**Tracción y compresión**: la fuerza es **perpendicular** a la sección → tensión **normal** σ.",
        "**Cortadura**: la fuerza es **paralela** a la sección → tensión **cortante** τ = F / A.",
        "El material resiste mientras σ (o τ) no supere la **tensión admisible** = límite elástico / coeficiente de seguridad.",
      ] },
    ], undefined, "stack"),
    slide("barra", "Una barra sometida a tracción", [
      { kind: "text", text: "Comprueba la tensión y el alargamiento de una barra con distintas cargas." },
    ], tool("esfuerzos-barra-explorador"), "visual-top"),
    slide("corta", "Uniones a cortadura", [
      { kind: "text", text: "Un tornillo transmite la fuerza cortando su sección y aplastando la chapa. Calcula ambas tensiones." },
    ], tool("ti2-cortadura-explorador"), "visual-top"),
    calc("calc-sig", "Tensión", "Un tirante de 20 mm de diámetro soporta 60 kN. ¿Qué tensión tiene, en MPa? (F/A, redondea a un entero)", nums(191, 190.99), "A = 314,16 mm²; 60 000 / 314,16 ≈ 191 MPa.", "Pasa kN a N y calcula el área del círculo."),
    calc("calc-adm", "Tensión admisible", "Un acero tiene un límite elástico de 275 MPa y se emplea un coeficiente de seguridad de 1,5. ¿Cuál es la tensión admisible, en MPa? (redondea a un entero)", nums(183, 183.3), "275 / 1,5 ≈ 183 MPa.", "Divide el límite elástico entre el coeficiente."),
    calc("calc-tau", "Cortadura", "Dos tornillos de 10 mm transmiten 20 kN a cortadura. ¿Qué tensión cortante soporta cada uno, en MPa? (redondea a un entero)", nums(127, 127.3), "τ = 20 000 / (2 · 78,54) ≈ 127 MPa.", "Fuerza entre el área total de los tornillos."),
    sort("clasifica-esf", "¿Qué esfuerzo?", "Relaciona cada situación con el esfuerzo.",
      [["tra", "Tracción", "cobalt"], ["com", "Compresión", "amber"], ["cor", "Cortadura", "emerald"]],
      [["Cable que sostiene un ascensor", "tra"], ["Tensor de una tienda de campaña", "tra"], ["Columna de un edificio", "com"], ["Pata de una mesa", "com"], ["Tijeras que cortan una chapa", "cor"], ["Remache que une dos placas", "cor"]],
      "El esfuerzo depende de cómo actúa la fuerza respecto a la sección.",
    ),
    pick("check-ten", "Duplicar la sección", "Se duplica el área de la sección de un tirante manteniendo la fuerza. ¿Qué ocurre con la tensión?",
      "Se reduce a la mitad",
      [["Se duplica", "Es inversamente proporcional al área."], ["Queda igual", "Cambia con el área."], ["Se hace cero", "No se anula."]],
      "La tensión vale σ = F / A: a más área, menos tensión.",
    ),
  ],
};
