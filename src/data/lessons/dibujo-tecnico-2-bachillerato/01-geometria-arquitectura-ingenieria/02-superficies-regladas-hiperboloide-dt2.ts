import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const superficiesRegladasHiperboloideDt2Lesson: InteractiveLesson = {
  slug: "superficies-regladas-hiperboloide-dt2",
  title: "2. Superficies regladas y formas curvas con rectas",
  subtitle: DT2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Curvas hechas con rectas", [
      { kind: "steps", items: [
        "Una **superficie reglada** es la que se genera con el movimiento de una **recta** (la **generatriz**). Por cada uno de sus puntos pasa al menos una recta contenida en ella.",
        "Son regladas: el **plano**, el **cilindro**, el **cono**, el **helicoide**, el **hiperboloide de una hoja** y el **paraboloide hiperbólico**. **No** lo son la **esfera**, el **elipsoide** ni el **toro**.",
        "Son muy útiles porque se pueden construir con **barras rectas** o con **tablas** y encofrados rectilíneos, y sin embargo tienen **formas curvas**.",
        "Las **superficies de doble curvatura** reparten mejor las cargas y permiten láminas muy finas.",
      ] },
    ], undefined, "stack"),
    slide("hiper", "El hiperboloide de una hoja", [
      { kind: "text", text: "Dibuja un hiperboloide con rectas. Cambia la torsión y observa la garganta." },
    ], tool("dt2-hiperboloide-explorador"), "visual-top"),
    slide("hypar", "El paraboloide hiperbólico", [
      { kind: "steps", items: [
        "El **paraboloide hiperbólico** (hypar) tiene forma de **silla de montar**: es **cóncavo** en un sentido y **convexo** en el perpendicular.",
        "Se genera con una recta que se apoya en **dos rectas que se cruzan** y se mueve **paralela a un plano director**: las secciones horizontales son **hipérbolas** y las verticales, **parábolas**.",
        "Es la base de los **cascarones de Candela**: se encofra con **tablas rectas** y se hormigona en una lámina muy delgada.",
        "Se utiliza también en **cubiertas** y **cálculo de membranas** tensadas.",
      ] },
    ]),
    calc("calc-gar", "Garganta", "Un hiperboloide con bases de radio R = 4 m y torsión de 60° tiene la garganta de radio R·cos(θ/2). ¿Cuánto mide, en m? (dos decimales)", nums(3.46, 3.4641), "4 · cos 30° = 3,46 m.", "cos 30° = 0,866."),
    calc("calc-gen", "Longitud de las barras", "Con h = 10 m, la longitud de cada barra es √(h² + 4R² sen²(θ/2)). ¿Cuánto mide, en m? (dos decimales)", nums(10.77, 10.7703), "√(100 + 4·16·0,25) = √116 ≈ 10,77 m.", "sen 30° = 0,5."),
    calc("calc-num", "Contar barras", "Una torre tiene 24 barras de una familia y 24 de la otra. ¿Cuántas barras rectas hay en total?", nums(48), "24 + 24 = 48.", "Las dos familias."),
    sort("clasifica-reg", "¿Es reglada?", "Clasifica cada superficie.",
      [["reg", "Reglada", "cobalt"], ["nor", "No reglada", "amber"]],
      [["Cilindro", "reg"], ["Cono", "reg"], ["Hiperboloide de una hoja", "reg"], ["Paraboloide hiperbólico", "reg"], ["Esfera", "nor"], ["Elipsoide", "nor"], ["Toro", "nor"]],
      "Una superficie es reglada si por cada punto pasa una recta contenida en ella.",
    ),
    pick("check-torre", "Una torre de rectas", "¿Por qué se usa el hiperboloide en torres de refrigeración y de agua?",
      "Porque se construye con barras rectas y es resistente y ligero",
      [["Porque es una esfera", "El hiperboloide no es una esfera."], ["Porque ocupa más espacio", "Lo que importa es su resistencia."], ["Porque no tiene garganta", "Su característica es la garganta."]],
      "Es una superficie reglada de doble curvatura: se arma con rectas y resiste bien.",
    ),
  ],
};
