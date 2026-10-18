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
      help: [
        {
          label: "Pega dos triángulos",
          message: "Gira uno de los triángulos y pégalo al otro: sale un paralelogramo con la misma base y altura.",
        },
        {
          label: "¿Qué altura uso?",
          message: "La perpendicular a la base que elijas. Un triángulo tiene tres bases posibles, cada una con su altura, y todas dan la misma área.",
        },
      ],
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
      help: [
        {
          label: "Los catetos ya son perpendiculares",
          message: "En un triángulo rectángulo un cateto es la altura del otro: no hay que buscarla.",
        },
        {
          label: "La mitad de un rectángulo",
          message: "Un triángulo rectángulo es la mitad del rectángulo que forman sus catetos.",
        },
        {
          label: "Con la hipotenusa",
          message: "Si usas la hipotenusa como base, la altura ya no es un cateto y hay que calcularla.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué dos formas de calcular?",
          message: "Porque el área es única: calculada con los catetos o con la hipotenusa debe dar lo mismo. De ahí se despeja la altura.",
        },
        {
          label: "¿Cómo se despeja la altura?",
          message: "En $150 = \\frac{25 \\cdot a}{2}$, multiplica por $2$ y divide entre $25$.",
        },
      ],
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
      help: [
        {
          label: "¿Basta con el lado?",
          message: "No: necesitas la altura, que en un triángulo equilátero no coincide con el lado. Es más pequeña.",
        },
        {
          label: "Comprueba la cuenta",
          message: "$\\frac{10 \\cdot 8{,}66}{2} = 43{,}3$. Fíjate en que la altura ($8{,}66$) es menor que el lado ($10$).",
        },
      ],
      title: "Triángulo equilátero",
      content: [
        "En cualquier triángulo basta con una base y su altura correspondiente.",
        "Ejemplo del temario: lado $10\\,\\mathrm{cm}$, altura $8{,}66\\,\\mathrm{cm}$ → $A = \\dfrac{10 \\cdot 8{,}66}{2} = 43{,}3\\,\\mathrm{cm}^2$.",
      ],
    },
    {
      id: "check-parcela",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué lado uso?",
          message: "Base y altura tienen que ser perpendiculares. El enunciado dice que la altura es «sobre ese lado», así que ya son la pareja correcta.",
        },
        {
          label: "¿Por qué se divide entre $2$?",
          message: "Todo triángulo es la mitad de un paralelogramo con su misma base y altura.",
          branches: [
            {
              label: "Compruébalo con uno sencillo",
              message: "Un rectángulo de $4 \\times 3$ tiene área $12$. Su diagonal lo corta en dos triángulos iguales: cada uno vale la mitad.",
            },
          ],
        },
      ],
      title: "Parcela triangular",
      question:
        "Una parcela tiene un lado de $20\\,\\mathrm{m}$ y altura $13\\,\\mathrm{m}$ sobre ese lado. ¿Cuál es su área en $\\mathrm{m}^2$?",
      correctAnswers: ["130", "130,0", "130.0"],
      explanation: "$A = \\dfrac{20 \\cdot 13}{2} = 130\\,\\mathrm{m}^2$.",
    },
    {
      id: "check-catetos",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cuál es la base y cuál la altura?",
          message: "En un triángulo rectángulo los dos catetos son perpendiculares entre sí: uno hace de base y el otro de altura. Da igual cuál elijas.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Redondea los catetos a $20$ y $20$. El rectángulo sería $400$ y el triángulo, la mitad. Tu resultado debería rondar esa cifra.",
        },
      ],
      title: "Área con catetos",
      question:
        "Triángulo rectángulo con catetos $18\\,\\mathrm{cm}$ y $24\\,\\mathrm{cm}$. ¿Cuál es su área en $\\mathrm{cm}^2$? (escribe solo el número)",
      correctAnswers: ["216", "216 cm2", "216 cm²"],
      hint: "Un cateto hace de base y el otro de altura. El triángulo es la mitad del rectángulo que forman.",
      explanation:
        "$A = \\dfrac{18 \\cdot 24}{2} = \\dfrac{432}{2} = 216\\,\\mathrm{cm}^2$. Si no divides entre $2$ obtienes el área del rectángulo, no la del triángulo.",
    },
  ],
};
