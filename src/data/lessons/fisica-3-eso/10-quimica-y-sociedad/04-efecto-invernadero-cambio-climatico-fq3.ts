import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const efectoInvernaderoCambioClimaticoFq3Lesson: InteractiveLesson = {
  slug: "efecto-invernadero-cambio-climatico-fq3",
  title: "4. Efecto invernadero y cambio climático",
  subtitle: FQ3_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "El efecto invernadero", [
      { kind: "steps", items: [
        "La Tierra recibe **luz solar**; la superficie se calienta y devuelve parte de esa energía como **radiación infrarroja**.",
        "Los **gases de efecto invernadero** (**vapor de agua**, **CO₂**, **metano**, **óxidos de nitrógeno**) **absorben** parte de ese infrarrojo y lo devuelven hacia la superficie.",
        "Este efecto es **natural y necesario**: sin él, la temperatura media sería de unos **−18 °C**; con él, es de unos **+15 °C**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Un modelo sencillo", [
      { kind: "text", text: "Aumenta la fracción de infrarrojo que retiene la atmósfera y mira cómo sube la temperatura de la superficie." },
    ], tool("fq3-efecto-invernadero-explorador"), "visual-top"),
    slide("cc", "Cambio climático", [
      { kind: "steps", items: [
        "Desde la **Revolución Industrial** la **quema de combustibles fósiles**, la **deforestación** y la **ganadería** han aumentado los gases de efecto invernadero: el CO₂ ha pasado de unos **280 ppm** a más de **420 ppm**.",
        "Consecuencia: **aumento de la temperatura media**, **deshielo** de glaciares, **subida del nivel del mar**, **sequías** e **inundaciones** más frecuentes y extremas.",
        "**Mitigación**: reducir las emisiones (**energías renovables**, **eficiencia**, transporte público, **menos consumo**, **reforestación**). **Adaptación**: prepararse a los cambios.",
      ] },
    ]),
    calc("calc-aum", "Aumento de CO₂", "La concentración de CO₂ pasó de 280 ppm a 420 ppm. ¿En qué porcentaje ha aumentado?", nums(50), "(420 − 280) / 280 · 100 = 50 %.", "Variación entre el valor inicial."),
    calc("calc-dif", "Efecto natural", "Sin efecto invernadero la temperatura sería de −18 °C y con él es de +15 °C. ¿Cuántos grados lo aumenta?", nums(33), "15 − (−18) = 33 °C.", "Cuidado con el signo."),
    calc("calc-emi", "Emisiones", "Una persona emite 6 toneladas de CO₂ al año. ¿Cuántas toneladas emiten 1000 personas?", nums(6000), "6 · 1000 = 6000 toneladas.", "Producto directo."),
    sort("clasifica", "Causa o consecuencia", "Clasifica cada hecho.",
      [["ca", "Causa", "amber"], ["co", "Consecuencia", "rose"], ["me", "Medida de mitigación", "emerald"]],
      [["Quema de combustibles fósiles", "ca"], ["Deforestación", "ca"], ["Deshielo de glaciares", "co"], ["Subida del nivel del mar", "co"], ["Usar energías renovables", "me"], ["Reforestar", "me"]],
      "Hay que actuar sobre las causas.",
    ),
    pick("check", "Efecto natural", "¿Es malo el efecto invernadero en sí mismo?",
      "No: es natural y necesario; el problema es su intensificación",
      [["Sí, deberíamos eliminarlo", "Sin él la Tierra sería helada."], ["No existe", "Existe y se mide."], ["Solo ocurre en invernaderos", "Es un fenómeno atmosférico global."]],
      "Sin efecto invernadero, la Tierra sería mucho más fría.",
    ),
  ],
};
