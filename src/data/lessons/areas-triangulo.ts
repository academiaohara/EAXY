import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasTrianguloLesson: InteractiveLesson = {
  slug: "areas-triangulo",
  title: "2. Área de un triángulo",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  steps: [
    {
      id: "formula",
      type: "concept",
      title: "Mitad de un paralelogramo",
      content: [
        "Si unes dos triángulos iguales obtienes un paralelogramo de base $b$ y altura $a$.",
        "El área del triángulo es la **mitad** del paralelogramo: $A = \\dfrac{b \\cdot a}{2}$.",
        "La **altura** es siempre perpendicular a la base que elijas.",
      ],
    },
    {
      id: "rectangulo",
      type: "concept",
      title: "Triángulo rectángulo",
      content: [
        "En un triángulo rectángulo los **catetos** $c$ y $c'$ son perpendiculares.",
        "Puedes tomar un cateto como base y el otro como altura: $A = \\dfrac{c \\cdot c'}{2}$.",
        "Si usas la **hipotenusa** $h$ como base, necesitas la altura $a$ sobre ella: $A = \\dfrac{h \\cdot a}{2}$.",
      ],
    },
    {
      id: "ejemplo-resuelto",
      type: "animated_solution",
      title: "Ejercicio resuelto — catetos 15 cm y 20 cm",
      content: ["Triángulo rectángulo con hipotenusa $25\\,\\mathrm{cm}$."],
      frames: [
        {
          caption: "Área con los catetos:",
          math: "A = \\frac{15 \\cdot 20}{2} = 150\\,\\mathrm{cm}^2",
        },
        {
          caption: "Misma área con la hipotenusa $25\\,\\mathrm{cm}$:",
          math: "150 = \\frac{25 \\cdot a}{2} \\Rightarrow a = 12\\,\\mathrm{cm}",
        },
      ],
    },
    {
      id: "equilatero",
      type: "concept",
      title: "Triángulo equilátero",
      content: [
        "En cualquier triángulo basta con una base y su altura correspondiente.",
        "Ejemplo del temario: lado $10\\,\\mathrm{cm}$, altura $8{,}66\\,\\mathrm{cm}$ → $A = \\dfrac{10 \\cdot 8{,}66}{2} = 43{,}3\\,\\mathrm{cm}^2$.",
      ],
    },
    {
      id: "check-parcela",
      type: "fill_in_blank",
      title: "Parcela triangular",
      question:
        "Una parcela tiene un lado de $20\\,\\mathrm{m}$ y altura $13\\,\\mathrm{m}$ sobre ese lado. Su área es {{answer}} $\\mathrm{m}^2$.",
      correctAnswers: ["130", "130,0", "130.0"],
      explanation: "$A = \\dfrac{20 \\cdot 13}{2} = 130\\,\\mathrm{m}^2$.",
    },
    {
      id: "check-catetos",
      type: "multiple_choice",
      title: "Área con catetos",
      question: "Triángulo rectángulo con catetos $18\\,\\mathrm{cm}$ y $24\\,\\mathrm{cm}$. ¿Cuál es su área?",
      options: [
        { id: "a", text: "$216\\,\\mathrm{cm}^2$" },
        { id: "b", text: "$432\\,\\mathrm{cm}^2$" },
        { id: "c", text: "$108\\,\\mathrm{cm}^2$" },
      ],
      correctOptionId: "a",
      explanation: "$A = \\dfrac{18 \\cdot 24}{2} = 216\\,\\mathrm{cm}^2$.",
    },
  ],
};
