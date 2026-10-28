import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const reflexionLuzFq2Lesson: InteractiveLesson = {
  slug: "reflexion-luz-fq2",
  title: "2. Reflexión de la luz",
  subtitle: FQ2_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "La luz rebota", [
      { kind: "steps", items: [
        "La **reflexión** es el **cambio de dirección** que sufre la luz al chocar con una superficie y volver al mismo medio.",
        "Vemos los objetos que **no emiten luz** porque **reflejan** la que les llega y esa luz entra en nuestros ojos.",
        "En una superficie **lisa** (espejo, agua en calma) la reflexión es **especular**: los rayos salen ordenados y se forma una **imagen**.",
        "En una superficie **rugosa** (papel, pared) la reflexión es **difusa**: los rayos salen en todas direcciones.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Ley de la reflexión", [
      { kind: "text", text: "Cambia el ángulo de incidencia y compara con el ángulo de reflexión." },
    ], tool("fq2-reflexion-explorador"), "visual-top"),
    slide("ley", "Ley de la reflexión", [
      { kind: "steps", items: [
        "El **rayo incidente**, la **normal** y el **rayo reflejado** están en el **mismo plano**.",
        "El **ángulo de incidencia** es **igual** al **ángulo de reflexión**. Los ángulos se miden respecto de la **normal**, no del espejo.",
        "En un **espejo plano**, la imagen es **virtual** (parece estar detrás del espejo), del **mismo tamaño** que el objeto y **simétrica**: izquierda y derecha se invierten.",
      ] },
    ]),
    calc("calc-ang", "Ángulo reflejado", "Un rayo llega a un espejo con un ángulo de incidencia de 35°. ¿Cuánto vale el ángulo de reflexión, en grados?", nums(35), "Son iguales: 35°.", "Ley de la reflexión."),
    calc("calc-esp", "Ángulo con el espejo", "Un rayo incide con 30° respecto de la normal. ¿Qué ángulo forma el rayo con la superficie del espejo, en grados?", nums(60), "90° − 30° = 60°.", "La normal es perpendicular al espejo."),
    calc("calc-dist", "Distancia a la imagen", "Estás a 2 m de un espejo plano. ¿A qué distancia de ti está tu imagen, en m?", nums(4), "La imagen está 2 m detrás del espejo: 2 + 2 = 4 m.", "Imagen y objeto equidistan del espejo."),
    sort("clasifica", "Especular o difusa", "Clasifica cada superficie según la reflexión que produce.",
      [["es", "Especular", "cobalt"], ["di", "Difusa", "amber"]],
      [["Un espejo", "es"], ["Un lago en calma", "es"], ["Un metal pulido", "es"], ["Una hoja de papel", "di"], ["Una pared pintada", "di"], ["Un tejido", "di"]],
      "Lisa: especular; rugosa: difusa.",
    ),
    pick("check", "Ley de la reflexión", "¿Cuál es la ley de la reflexión?",
      "El ángulo de incidencia es igual al de reflexión",
      [["El ángulo de reflexión es el doble", "No hay tal relación."], ["Los dos ángulos suman 180°", "No es la ley."], ["La luz no cambia de dirección", "Cambia de dirección."]],
      "Se miden desde la normal.",
    ),
  ],
};
