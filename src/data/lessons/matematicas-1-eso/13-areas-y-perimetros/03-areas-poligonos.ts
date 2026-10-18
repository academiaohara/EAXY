import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasPoligonosLesson: InteractiveLesson = {
  slug: "areas-poligonos",
  title: "3. Medidas en los polígonos",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  steps: [
    {
      id: "irregular",
      type: "concept",
      title: "Polígonos irregulares",
      content: [
        "Para un polígono cualquiera **descompón** la figura en triángulos (o rectángulos y triángulos).",
        "Calcula el área de cada pieza y **suma** para obtener el área total.",
        "El perímetro sigue siendo la suma de todos los lados del contorno.",
      ],
    },
    {
      id: "regular",
      type: "concept",
      title: "Polígonos regulares",
      content: [
        "Un polígono **regular** tiene todos los lados iguales ($l$) y la misma distancia del centro a cada lado: la **apotema** $a$.",
        "Se descompone en $n$ triángulos iguales de base $l$ y altura $a$.",
        "Suma de áreas: $A = n \\cdot \\dfrac{l \\cdot a}{2} = \\dfrac{P \\cdot a}{2}$, donde $P = n \\cdot l$ es el perímetro.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Fórmula clave",
          items: [
            {
              title: "Polígono regular",
              math: "A = \\dfrac{P \\cdot a}{2}",
              tone: "violet",
            },
          ],
        },
      ],
    },
    {
      id: "hexagono",
      type: "concept",
      title: "Hexágono regular",
      content: [
        "En el hexágono regular del temario, el **lado coincide** con el radio de la circunferencia circunscrita.",
        "Ejemplo: $l = 4\\,\\mathrm{cm}$, apotema $a \\approx 3{,}5\\,\\mathrm{cm}$ → $P = 24\\,\\mathrm{cm}$, $A = \\dfrac{24 \\cdot 3{,}5}{2} = 42\\,\\mathrm{cm}^2$.",
      ],
    },
    {
      id: "octogono",
      type: "animated_solution",
      title: "Ejemplo — octógono regular",
      content: ["Datos del libro: lado $15\\,\\mathrm{cm}$, apotema $18\\,\\mathrm{cm}$."],
      frames: [
        {
          caption: "Perímetro (8 lados):",
          math: "P = 8 \\cdot 15 = 120\\,\\mathrm{cm}",
        },
        {
          caption: "Área:",
          math: "A = \\frac{P \\cdot a}{2} = \\frac{120 \\cdot 18}{2} = 1080\\,\\mathrm{cm}^2",
        },
      ],
    },
    {
      id: "check-formula",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es la altura del trapecio?",
          message: "La distancia perpendicular entre las dos bases, no la longitud del lado inclinado.",
        },
        {
          label: "¿Por qué se suman las bases?",
          message: "Si pegas dos trapecios iguales, uno girado, se forma un paralelogramo de base $B + b$ y la misma altura. El trapecio es la mitad.",
          branches: [
            {
              label: "Un ejemplo pequeño",
              message: "Bases $3$ y $1$, altura $2$: el paralelogramo mide $(3 + 1) \\cdot 2 = 8$ y el trapecio es la mitad.",
              math: ["\\frac{(3 + 1) \\cdot 2}{2} = 4"],
            },
          ],
        },
        {
          label: "¿En qué orden hago la cuenta?",
          message: "Primero la suma del paréntesis, luego multiplicas por la altura y al final divides entre $2$.",
        },
      ],
      title: "Trapecio y polígono regular",
      question:
        "Las bases de un trapecio miden $13\\,\\mathrm{cm}$ y $7\\,\\mathrm{cm}$, con altura $10\\,\\mathrm{cm}$. ¿Cuál es su área en $\\mathrm{cm}^2$? (escribe solo el número)",
      correctAnswers: ["100", "100 cm2", "100 cm²"],
      hint: "Suma las dos bases, multiplica por la altura y no olvides dividir entre $2$.",
      explanation: "$A = \\dfrac{(13 + 7) \\cdot 10}{2} = \\dfrac{200}{2} = 100\\,\\mathrm{cm}^2$.",
    },
  ],
};
