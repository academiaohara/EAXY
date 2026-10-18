import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasCuadrilaterosLesson: InteractiveLesson = {
  slug: "areas-cuadrilateros",
  title: "1. Medidas en los cuadriláteros",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  steps: [
    {
      id: "contexto",
      type: "concept",
      help: [
        {
          label: "Dos preguntas distintas",
          message: "Perímetro: ¿cuánta valla necesito? Área: ¿cuánto césped cubre?",
        },
        {
          label: "Mismo perímetro, distinta área",
          message: "Un rectángulo de $5 \\times 1$ y un cuadrado de $3 \\times 3$ tienen el mismo perímetro y áreas muy distintas.",
          math: ["5 \\times 1:\\ P = 12,\\ A = 5 \\qquad 3 \\times 3:\\ P = 12,\\ A = 9"],
        },
        {
          label: "Directa o indirecta",
          message: "Medir con regla es medición directa. Calcular con una fórmula a partir de otras medidas es indirecta.",
        },
      ],
      title: "Área y perímetro",
      content: [
        "El **área** mide la superficie que ocupa una figura plana; el **perímetro** es la longitud de su contorno.",
        "Recuerda: **no hay relación fija** entre perímetro y área. Puedes tener figuras con el mismo perímetro y áreas muy distintas.",
        "Las mediciones pueden ser **directas** (con regla) o **indirectas** (calculando a partir de otras medidas).",
      ],
    },
    {
      id: "rectangulo",
      type: "concept",
      help: [
        {
          label: "Cuenta cuadraditos",
          message: "El área de un rectángulo es cuántos cuadraditos de $1$ caben: filas por columnas.",
        },
        {
          label: "El cuadrado como caso particular",
          message: "Es un rectángulo con base y altura iguales: $l \\cdot l = l^2$.",
        },
        {
          label: "De área a lado",
          message: "Si conoces el área y buscas el lado, deshaces el cuadrado con la raíz.",
        },
      ],
      title: "Rectángulo y cuadrado",
      content: [
        "Rectángulo de base $a$ y altura $b$: $A = a \\cdot b$ y $P = 2a + 2b$.",
        "Cuadrado de lado $l$: $A = l^2$ y $P = 4l$.",
        "Si conoces el área de un cuadrado, el lado es $l = \\sqrt{A}$.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Fórmulas básicas",
          items: [
            { title: "Rectángulo", math: "A = a \\cdot b", tone: "cobalt" },
            { title: "Cuadrado", math: "A = l^2", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "paralelogramo",
      type: "concept",
      help: [
        {
          label: "Corta y pega",
          message: "Corta un triángulo de un lado y pégalo en el otro: el paralelogramo se convierte en un rectángulo con la misma base y altura.",
        },
        {
          label: "¿Por qué no basta el perímetro?",
          message: "Dos paralelogramos con los mismos lados pueden estar más o menos inclinados, y tener alturas distintas.",
        },
        {
          label: "El rombo con diagonales",
          message: "Las dos diagonales lo parten en cuatro triángulos iguales. El rombo es la mitad del rectángulo $D \\times d$ que lo envuelve.",
        },
      ],
      title: "Paralelogramo y rombo",
      content: [
        "Todo paralelogramo se puede transformar en un rectángulo de base $b$ y altura $a$ (distancia entre lados opuestos). Entonces $A = a \\cdot b$.",
        "El perímetro con lados $b$ y $c$ es $P = 2b + 2c$, pero **no determina** el área: hace falta la altura.",
        "El **rombo** es un paralelogramo con lados iguales. Su área también vale $A = d \\cdot d' / 2$ si conoces las **diagonales** $d$ y $d'$.",
      ],
    },
    {
      id: "trapecio",
      type: "concept",
      help: [
        {
          label: "Duplica el trapecio",
          message: "Pega una copia girada junto al original: sale un paralelogramo de base $b + b'$. El trapecio es su mitad.",
        },
        {
          label: "Cuidado con la altura",
          message: "La altura es la distancia perpendicular entre las bases, no el lado inclinado.",
        },
      ],
      title: "Trapecio",
      content: [
        "En un trapecio, los lados paralelos son las **bases** $b$ (mayor) y $b'$ (menor); $a$ es la **altura** (distancia entre bases).",
        "Duplicando el trapecio obtienes un paralelogramo de base $b + b'$ y altura $a$.",
        "Por tanto $A = \\dfrac{(b + b') \\cdot a}{2}$.",
      ],
    },
    {
      id: "ejemplo-habitacion",
      type: "animated_solution",
      help: [
        {
          label: "¿Por qué dos cuentas?",
          message: "El perímetro sirve para el zócalo y el área para el suelo. Son preguntas distintas con unidades distintas.",
        },
        {
          label: "Unidades",
          message: "El perímetro se mide en metros; el área, en metros cuadrados.",
        },
      ],
      title: "Ejemplo — habitación rectangular",
      content: ["Calculamos perímetro y área con las dimensiones del temario."],
      frames: [
        {
          caption: "Datos: $a = 6{,}4\\,\\mathrm{m}$, $b = 3{,}5\\,\\mathrm{m}$.",
          math: "P = 2(6{,}4 + 3{,}5) = 19{,}8\\,\\mathrm{m}",
        },
        {
          caption: "Superficie del suelo:",
          math: "A = 6{,}4 \\cdot 3{,}5 = 22{,}4\\,\\mathrm{m}^2",
        },
      ],
    },
    {
      id: "check-cuadrado",
      type: "number_line_pick",
      help: [
        {
          label: "¿Qué relación hay entre lado y área?",
          message: "El área de un cuadrado es lado por lado. Aquí te dan el resultado y buscas el lado: el camino inverso.",
          branches: [
            {
              label: "¿Cómo encuentro ese número?",
              message: "Tantea con cuadrados que conozcas: $10^2 = 100$ y $20^2 = 400$. El lado está entre $10$ y $20$. ¿En qué cifra tiene que acabar para que el cuadrado acabe en $5$?",
            },
          ],
        },
        {
          label: "¿Por qué no es la mitad?",
          message: "Dividir entre $2$ deshace «el doble», no «multiplicar por sí mismo». Comprueba: $112 \\cdot 112$ es muchísimo más que $225$.",
        },
      ],
      title: "Lado de un cuadrado",
      question:
        "Un cuadrado tiene $225\\,\\mathrm{cm}^2$ de área. Marca en la regla (en $\\mathrm{cm}$) cuánto mide su lado.",
      min: 0,
      max: 25,
      target: 15,
      hint: "Busca un número que, multiplicado por sí mismo, dé $225$. No es la mitad del área.",
      explanation: "$l = \\sqrt{225} = 15\\,\\mathrm{cm}$ porque $15^2 = 15 \\cdot 15 = 225$.",
    },
    {
      id: "check-rombo",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué son las diagonales?",
          message: "Los segmentos que unen vértices opuestos. En el rombo se cruzan en perpendicular y lo dividen en cuatro triángulos iguales.",
          branches: [
            {
              label: "¿Por qué hay que dividir entre $2$?",
              message: "El rombo cabe justo en un rectángulo cuyos lados son sus dos diagonales, y ocupa la mitad de ese rectángulo.",
              math: [
                "\\text{rectángulo} = D \\cdot d \\;\\Rightarrow\\; \\text{rombo} = \\tfrac{1}{2}\\, D \\cdot d",
              ],
            },
          ],
        },
        {
          label: "Quiero saber si es razonable",
          message: "El rectángulo de $6 \\times 10$ que envuelve al rombo tiene un área mayor que la del rombo. Tu resultado tiene que ser menor que ese rectángulo.",
        },
      ],
      title: "Área de un rombo",
      question: "Las diagonales de un rombo miden $6\\,\\mathrm{cm}$ y $10\\,\\mathrm{cm}$. ¿Cuál es su área en $\\mathrm{cm}^2$?",
      correctAnswers: ["30", "30,0", "30.0"],
      explanation: "$A = \\dfrac{6 \\cdot 10}{2} = 30\\,\\mathrm{cm}^2$.",
    },
  ],
};
