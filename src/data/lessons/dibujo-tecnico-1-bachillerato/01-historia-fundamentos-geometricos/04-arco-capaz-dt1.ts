import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const arcoCapazDt1Lesson: InteractiveLesson = {
  slug: "arco-capaz-dt1",
  title: "4. Arco capaz y aplicaciones de los lugares geométricos",
  subtitle: DT1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ver un segmento bajo un ángulo", [
      { kind: "steps", items: [
        "Dado un segmento **AB** y un ángulo **α**, el **arco capaz** es el lugar geométrico de los puntos **P** desde los que se ve AB bajo ese ángulo: $\\angle APB = \\alpha$.",
        "Es un **arco de circunferencia** que pasa por A y B. Todos los ángulos inscritos que abarcan la misma cuerda son iguales.",
        "Con $\\alpha = 90^\\circ$ es la **semicircunferencia** de diámetro AB (Thales).",
        "Su **radio** es $R = \\dfrac{AB}{2\\,\\operatorname{sen}\\alpha}$ y su centro está en la **mediatriz** de AB.",
        "Si $\\alpha > 90^\\circ$, el centro queda **al otro lado** de AB respecto al arco.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Explora el arco", [
      { kind: "text", text: "Cambia α y mueve P por el arco: el ángulo no varía. Sepárate del arco y verás cómo cambia." },
    ], tool("dt1-arco-capaz-explorador"), "visual-top"),
    slide("traza", "Construcción", [
      { kind: "text", text: "Sigue el trazado con regla y compás del arco capaz de 60° sobre AB." },
    ], anim("dt1-trazado-arco-capaz"), "visual-top"),
    slide("usos", "Para qué sirve", [
      { kind: "steps", items: [
        "**Topografía y navegación**: si se mide con un goniómetro el ángulo bajo el que se ven dos puntos conocidos, el observador está sobre un arco capaz. Con **dos ángulos** (dos arcos) se obtiene su posición.",
        "**Fotografía y diseño**: elegir el punto desde el que un edificio o una pantalla se ve bajo un ángulo determinado.",
        "**Construcciones**: trazar un triángulo conociendo un lado, el ángulo opuesto y otro dato (por ejemplo la altura).",
      ] },
    ]),
    calc("calc-r90", "Semicircunferencia", "AB mide 6 cm y α = 90°. ¿Cuánto mide el radio del arco capaz, en cm?", nums(3), "R = 6 / (2 · sen 90°) = 3 cm: es la mitad de AB.", "sen 90° = 1."),
    calc("calc-r30", "Un ángulo pequeño", "Con AB = 6 cm y α = 30°, ¿cuánto vale el radio, en cm?", nums(6), "R = 6 / (2 · 0,5) = 6 cm.", "sen 30° = 0,5."),
    calc("calc-d60", "Distancia del centro", "AB = 6 cm y α = 60°: R = 6/(2·sen 60°) ≈ 3,46 cm. ¿A qué distancia de AB está el centro (R · cos 60°), en cm? (dos decimales)", nums(1.73, 1.732), "3,464 · 0,5 ≈ 1,73 cm.", "Multiplica el radio por cos 60° = 0,5."),
    sort("clasifica-arco", "¿Cómo es el arco?", "Clasifica según el ángulo con que se ve el segmento.",
      [["men", "Centro del mismo lado que el arco (α < 90°)", "cobalt"], ["rec", "Semicircunferencia (α = 90°)", "amber"], ["may", "Centro al otro lado (α > 90°)", "emerald"]],
      [["α = 45°", "men"], ["α = 60°", "men"], ["α = 80°", "men"], ["α = 90°", "rec"], ["El diámetro se ve siempre en ángulo recto", "rec"], ["α = 120°", "may"], ["α = 135°", "may"]],
      "Cuanto mayor es α, más plano es el arco; a 90° es media circunferencia.",
    ),
    pick("check-fuera", "Fuera del arco", "Un punto P está dentro de la circunferencia del arco capaz de 60° (sobre el lado del arco). ¿Con qué ángulo se ve AB desde P?",
      "Con un ángulo mayor que 60°",
      [["Con un ángulo menor que 60°", "Dentro del arco se ve más grande."], ["Con exactamente 60°", "Solo los puntos del arco."], ["No se puede ver", "Siempre se ve con algún ángulo."]],
      "Cuanto más cerca de AB, mayor ángulo; cuanto más lejos, menor.",
    ),
  ],
};
