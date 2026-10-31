import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const luzReflexionRefraccionFq4Lesson: InteractiveLesson = {
  slug: "luz-reflexion-refraccion-fq4",
  title: "4. La luz: reflexión y refracción",
  subtitle: FQ4_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("luz", "La luz", [
      { kind: "steps", items: [
        "La **luz** es una onda **electromagnética** (transversal) visible, de longitud de onda ≈ 380–750 nm. En el vacío viaja a **c = 3·10⁸ m/s**.",
        "En un medio transparente va **más lenta**. El **índice de refracción** n = c/v: aire ≈ 1; agua ≈ 1,33; vidrio ≈ 1,5; diamante ≈ 2,42.",
        "Propagación **rectilínea** en un medio homogéneo: se representa mediante **rayos**.",
        "Cuando la luz llega a la frontera de dos medios, se **refleja**, se **refracta** y se **absorbe** en parte.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Rayos en la frontera", [
      { kind: "text", text: "Cambia los medios y el ángulo de incidencia. ¿Cuándo el rayo refractado se acerca a la normal? ¿Cuándo hay reflexión total?" },
    ], tool("fq4-optica-explorador"), "visual-top"),
    slide("refl", "Reflexión", [
      { kind: "steps", items: [
        "**Leyes**: el rayo incidente, el reflejado y la **normal** están en el mismo plano, y **ángulo de incidencia = ángulo de reflexión**.",
        "**Especular**: en superficies lisas (espejos): se forman imágenes. **Difusa**: en superficies rugosas: permite **ver** los objetos desde cualquier lado.",
        "En un **espejo plano**, la imagen es **virtual**, del mismo tamaño y simétrica del objeto respecto al espejo.",
      ] },
    ], undefined, "stack"),
    slide("refr", "Refracción", [
      { kind: "steps", items: [
        "Al cambiar de medio, la luz **cambia de velocidad y de dirección**: **ley de Snell**, **n₁·sen θ₁ = n₂·sen θ₂**.",
        "Al pasar a un medio **más denso** (mayor n), el rayo **se acerca a la normal**; a uno **menos denso**, **se aleja**.",
        "**Reflexión total**: de un medio más denso a otro menos denso, si el ángulo de incidencia supera el **ángulo límite** (sen θ_L = n₂/n₁). Se usa en la **fibra óptica**.",
        "La **dispersión** (n depende del color) separa la luz blanca en un **arcoíris** o en un prisma. Las **lentes** aplican la refracción: gafas, lupas, cámaras.",
      ] },
    ], undefined, "stack"),
    calc("calc-ref", "Ángulo reflejado", "Un rayo incide con un ángulo de 35° sobre un espejo. ¿Cuánto mide el ángulo de reflexión, en grados?", nums(35), "Reflexión: ángulo reflejado = incidente = 35°.", "Ambos respecto a la normal."),
    calc("calc-n", "Índice de refracción", "La luz va a 2·10⁸ m/s en un material. ¿Cuál es su índice de refracción? (c = 3·10⁸ m/s)", nums(1.5), "n = c/v = 3·10⁸/2·10⁸ = 1,5.", "n = c/v."),
    calc("calc-snell", "Ley de Snell", "Un rayo pasa de aire (n = 1) a un material de n = 2 con un ángulo de incidencia de 30°. ¿Cuánto vale sen θ₂? (sen 30° = 0,5)", nums(0.25), "sen θ₂ = 1·0,5/2 = 0,25.", "n₁·sen θ₁ = n₂·sen θ₂."),
    sort("clasifica", "Reflexión o refracción", "¿Qué fenómeno explica cada situación?",
      [["rfl", "Reflexión", "cobalt"], ["rfr", "Refracción", "rose"]],
      [["Verte en un espejo", "rfl"], ["Un lápiz que parece quebrado en un vaso de agua", "rfr"], ["El brillo de una superficie de agua tranquila", "rfl"], ["El arcoíris", "rfr"], ["Una lupa que concentra la luz", "rfr"], ["La luz que rebota en una pared blanca", "rfl"]],
      "Reflexión: la luz rebota. Refracción: cambia de dirección al cambiar de medio.",
    ),
    pick("check", "Medio más denso", "Un rayo pasa del aire al agua. ¿Qué le ocurre al ángulo respecto a la normal?",
      "Disminuye: el rayo se acerca a la normal",
      [["Aumenta: se aleja de la normal", "Eso ocurre al pasar a un medio menos denso."], ["No cambia", "Cambia por la ley de Snell."], ["Siempre es 90°", "No es así."]],
      "Mayor índice de refracción: se acerca a la normal.",
    ),
  ],
};
