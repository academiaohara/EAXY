import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const mediaProporcionalSeccionAureaDt1Lesson: InteractiveLesson = {
  slug: "media-proporcional-seccion-aurea-dt1",
  title: "2. Tercera y media proporcional. Sección áurea",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Otras proporcionales", [
      { kind: "steps", items: [
        "**Tercera proporcional** de $a$ y $b$: el $x$ tal que $\\dfrac{a}{b} = \\dfrac{b}{x}$, es decir $x = \\dfrac{b^2}{a}$.",
        "**Media proporcional** de $a$ y $b$: el $x$ tal que $\\dfrac{a}{x} = \\dfrac{x}{b}$, es decir $x = \\sqrt{a\\,b}$.",
        "Se construye con el **teorema de la altura**: en el triángulo rectángulo inscrito en una semicircunferencia, la **altura sobre la hipotenusa** es media proporcional entre los dos segmentos que determina.",
        "Con el **teorema del cateto**, cada cateto es media proporcional entre la hipotenusa y su proyección: $c^2 = a \\cdot c_a$.",
      ] },
    ], undefined, "stack"),
    slide("media", "Teorema de la altura", [
      { kind: "text", text: "Coloca H sobre el diámetro y verifica que CH² = AH · HB." },
    ], tool("dt1-media-proporcional-explorador"), "visual-top"),
    slide("aurea", "La sección áurea", [
      { kind: "steps", items: [
        "Un segmento se divide en **media y extrema razón** si el total es a la parte mayor como la mayor es a la menor.",
        "La razón es el **número áureo** $\\varphi = \\dfrac{1 + \\sqrt{5}}{2} \\approx 1{,}618$. La parte mayor es $x = \\dfrac{a}{\\varphi} \\approx 0{,}618\\,a$.",
        "Aparece en la arquitectura clásica, el diseño y la naturaleza; el **rectángulo áureo** tiene lados en razón $\\varphi$.",
        "Se construye con regla y compás: observa el trazado.",
      ] },
    ]),
    slide("traza", "Trazado del segmento áureo", [
      { kind: "text", text: "Perpendicular de AB/2, arco desde C y arco desde A." },
    ], anim("dt1-seccion-aurea"), "visual-top"),
    calc("calc-media", "Media proporcional", "¿Cuánto vale la media proporcional de 4 y 9?", nums(6), "√(4 · 9) = √36 = 6.", "Raíz del producto."),
    calc("calc-tercera", "Tercera proporcional", "¿Cuánto vale la tercera proporcional de 2 y 6 (2/6 = 6/x)?", nums(18), "x = 6² / 2 = 18.", "Cuadrado del segundo entre el primero."),
    calc("calc-aurea", "Parte áurea", "¿Cuánto mide la parte mayor del segmento áureo de un segmento de 10 cm? (dos decimales)", nums(6.18, 6.1803), "10 / 1,618 ≈ 6,18 cm.", "Divide entre φ."),
    sort("clasifica-prop", "¿Qué proporcional es?", "Clasifica cada relación.",
      [["ter", "Tercera proporcional", "cobalt"], ["med", "Media proporcional", "amber"], ["aur", "Sección áurea", "emerald"]],
      [["a/b = b/x", "ter"], ["x = b²/a", "ter"], ["a/x = x/b", "med"], ["x = √(a·b)", "med"], ["Altura sobre la hipotenusa", "med"], ["Total/parte mayor = parte mayor/parte menor", "aur"], ["Razón 1,618", "aur"]],
      "La media proporcional usa una raíz; la tercera, un cuadrado; la áurea, φ.",
    ),
    pick("check-altura", "Teorema de la altura", "En un triángulo rectángulo, la hipotenusa queda dividida por la altura en trozos de 4 y 9 cm. ¿Cuánto mide la altura?",
      "6 cm, porque h² = 4 · 9",
      [["6,5 cm, la media de 4 y 9", "La aritmética no es la proporcional."], ["13 cm, la suma", "La suma es la hipotenusa."], ["36 cm", "Ese es el producto; la altura es su raíz."]],
      "La altura sobre la hipotenusa es media proporcional entre los dos segmentos.",
    ),
  ],
};
