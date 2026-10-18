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
      help: [
        {
          label: "Divide y suma",
          message: "Traza segmentos para partir la figura en triángulos o rectángulos cuyas fórmulas conoces. Suma las áreas.",
        },
        {
          label: "¿Qué descomposición elijo?",
          message: "La que use menos piezas y cuyas alturas sean fáciles de medir.",
        },
      ],
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
      help: [
        {
          label: "Triángulos desde el centro",
          message: "Une el centro con los vértices: salen $n$ triángulos iguales de base $l$ y altura $a$ (la apotema).",
        },
        {
          label: "¿Qué es la apotema?",
          message: "La distancia del centro al punto medio de un lado, perpendicular a él.",
        },
        {
          label: "¿Por qué sale $\\dfrac{P \\cdot a}{2}$?",
          message: "Porque $n$ triángulos de base $l$ suman una base total $n \\cdot l = P$, y todos tienen altura $a$.",
        },
      ],
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
      help: [
        {
          label: "Seis triángulos equiláteros",
          message: "En el hexágono regular el lado coincide con el radio. Al unir el centro con los vértices salen seis triángulos equiláteros.",
        },
        {
          label: "Sigue la receta",
          message: "Primero el perímetro (seis lados) y después el área con $\\frac{P \\cdot a}{2}$.",
        },
      ],
      title: "Hexágono regular",
      content: [
        "En el hexágono regular del temario, el **lado coincide** con el radio de la circunferencia circunscrita.",
        "Ejemplo: $l = 4\\,\\mathrm{cm}$, apotema $a \\approx 3{,}5\\,\\mathrm{cm}$ → $P = 24\\,\\mathrm{cm}$, $A = \\dfrac{24 \\cdot 3{,}5}{2} = 42\\,\\mathrm{cm}^2$.",
      ],
    },
    {
      id: "octogono",
      type: "animated_solution",
      help: [
        {
          label: "El orden de la cuenta",
          message: "Primero el perímetro (lados por lado) y después el área (perímetro por apotema entre dos).",
        },
        {
          label: "Comprueba la fórmula con algo conocido",
          message: "En un cuadrado de lado $10$ la apotema es $5$: $\\frac{40 \\cdot 5}{2} = 100$, el área esperada. La fórmula funciona.",
        },
      ],
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
