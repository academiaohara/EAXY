import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasCuadrilaterosLesson: InteractiveLesson = {
  slug: "areas-cuadrilateros",
  title: "1. Medidas en los cuadriláteros",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "contexto",
      type: "slide",
      help: [
        {
          label: "Dos preguntas distintas",
          message: "Perímetro: ¿cuánta valla necesito? Área: ¿cuánto césped cubre?",
        },
        {
          label: "Directa o indirecta",
          message: "Medir con regla es medición directa. Calcular con una fórmula a partir de otras medidas es indirecta.",
        },
      ],
      title: "Área y perímetro",
      blocks: [
        {
          kind: "compare",
          left: { title: "Perímetro", text: "Longitud del contorno. Se mide en cm, m…", tone: "info" },
          right: { title: "Área", text: "Superficie que ocupa. Se mide en cm², m²…", tone: "ok" },
        },
        {
          kind: "warning",
          text: "No hay relación fija entre perímetro y área: dos figuras con el mismo perímetro pueden tener áreas muy distintas.",
        },
        {
          kind: "text",
          text: "Una medición es **directa** si se hace con regla y **indirecta** si se calcula a partir de otras medidas.",
        },
      ],
      visual: { kind: "anim", scene: "area-perimetro", beatMs: 3200 },
    },
    {
      id: "rectangulo",
      type: "slide",
      help: [
        {
          label: "Cuenta cuadraditos",
          message: "El área de un rectángulo es cuántos cuadraditos de $1$ caben: filas por columnas.",
        },
        {
          label: "De área a lado",
          message: "Si conoces el área de un cuadrado y buscas el lado, deshaces el cuadrado con la raíz.",
        },
      ],
      title: "Rectángulo y cuadrado",
      blocks: [
        {
          kind: "rule",
          title: "Rectángulo",
          formula: "A = a \\cdot b \\qquad P = 2a + 2b",
        },
        {
          kind: "rule",
          title: "Cuadrado",
          formula: "A = l^2 \\qquad P = 4l",
        },
      ],
      visual: { kind: "anim", scene: "area-rectangulo", params: { a: 6, b: 4 }, beatMs: 3200 },
    },
    {
      id: "explora-rectangulo",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Con perímetro fijo, al acercarte al cuadrado el área crece; en el cuadrado es máxima.",
        },
      ],
      title: "Explora: mismo perímetro, distinta área",
      blocks: [
        {
          kind: "text",
          text: "Activa **Perímetro fijo** y mueve la base. ¿Con qué rectángulo es máxima el área?",
        },
      ],
      visual: { kind: "tool", tool: "rectangulo-explorador", params: { a: 6, b: 4 } },
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
      id: "paralelogramo",
      type: "slide",
      help: [
        {
          label: "Corta y pega",
          message: "Corta un triángulo de un lado y pégalo en el otro: el paralelogramo se convierte en un rectángulo con la misma base y altura.",
        },
        {
          label: "¿Por qué no basta el perímetro?",
          message: "Dos paralelogramos con los mismos lados pueden estar más o menos inclinados, y tener alturas distintas.",
        },
      ],
      title: "Paralelogramo",
      blocks: [
        {
          kind: "definition",
          text: "Todo **paralelogramo** se puede transformar en un rectángulo de la misma base $b$ y altura $a$ (la distancia entre lados opuestos).",
        },
        {
          kind: "rule",
          formula: "A = b \\cdot a \\qquad P = 2b + 2c",
        },
        {
          kind: "warning",
          text: "El perímetro no determina el área: hace falta la altura, no el lado inclinado.",
        },
      ],
      visual: { kind: "anim", scene: "area-paralelogramo", beatMs: 3200 },
    },
    {
      id: "explora-paralelogramo",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Al inclinar, el lado inclinado y el perímetro cambian, pero el área solo depende de la base y de la altura.",
        },
      ],
      title: "Explora: inclinar un paralelogramo",
      blocks: [
        {
          kind: "text",
          text: "Cambia el desplazamiento. ¿Qué valor del resumen no cambia? ¿Y cuál sí?",
        },
      ],
      visual: { kind: "tool", tool: "paralelogramo-area", params: { a: 6, b: 4, c: 2 } },
    },
    {
      id: "rombo",
      type: "slide",
      help: [
        {
          label: "El rombo con diagonales",
          message: "Las dos diagonales lo parten en cuatro triángulos iguales. El rombo es la mitad del rectángulo $d \\times d'$ que lo envuelve.",
        },
      ],
      title: "Rombo",
      blocks: [
        {
          kind: "text",
          text: "El rombo es un paralelogramo, así que $A = l \\cdot a$. Si conoces sus **diagonales** $d$ y $d'$, es más cómodo:",
        },
        {
          kind: "rule",
          formula: "A = \\dfrac{d \\cdot d'}{2} \\qquad P = 4l",
        },
      ],
      visual: { kind: "anim", scene: "area-rombo", beatMs: 3200 },
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
              math: ["\\text{rectángulo} = D \\cdot d \;\\Rightarrow\; \\text{rombo} = \\tfrac{1}{2}\\, D \\cdot d"],
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
    {
      id: "trapecio",
      type: "slide",
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
      blocks: [
        {
          kind: "definition",
          text: "En un **trapecio**, los lados paralelos son las **bases** ($b$ la mayor y $b'$ la menor); $a$ es la **altura**.",
        },
        {
          kind: "rule",
          formula: "A = \\dfrac{(b + b') \\cdot a}{2}",
        },
      ],
      visual: { kind: "anim", scene: "area-trapecio", beatMs: 3200 },
    },
    {
      id: "explora-trapecio",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Si las dos bases se igualan, el trapecio es un rectángulo y la fórmula da $b \\cdot a$.",
        },
      ],
      title: "Explora: el trapecio",
      blocks: [
        {
          kind: "text",
          text: "Iguala la base menor a la mayor. ¿En qué figura se convierte el trapecio? ¿Coincide la fórmula con la del rectángulo?",
        },
      ],
      visual: { kind: "tool", tool: "trapecio-area", params: { a: 8, b: 4, c: 4 } },
    },
    {
      id: "check-trapecio",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es la altura del trapecio?",
          message: "La distancia perpendicular entre las dos bases, no la longitud del lado inclinado.",
        },
        {
          label: "¿En qué orden hago la cuenta?",
          message: "Primero la suma del paréntesis, luego multiplicas por la altura y al final divides entre $2$.",
        },
      ],
      title: "Área de un trapecio",
      question:
        "Las bases de un trapecio miden $13\\,\\mathrm{cm}$ y $7\\,\\mathrm{cm}$, con altura $10\\,\\mathrm{cm}$. ¿Cuál es su área en $\\mathrm{cm}^2$? (escribe solo el número)",
      correctAnswers: ["100", "100 cm2", "100 cm²"],
      hint: "Suma las dos bases, multiplica por la altura y no olvides dividir entre $2$.",
      explanation: "$A = \\dfrac{(13 + 7) \\cdot 10}{2} = \\dfrac{200}{2} = 100\\,\\mathrm{cm}^2$.",
    },
    {
      id: "zocalo",
      type: "predict",
      help: [
        {
          label: "¿Zócalo o suelo?",
          message: "El zócalo recorre las paredes: es el contorno. El suelo es una superficie.",
        },
        {
          label: "Un rectángulo",
          message: "Un rectángulo tiene dos lados de cada medida: el perímetro suma los cuatro.",
        },
      ],
      title: "Un zócalo",
      question:
        "Una habitación rectangular mide 6,4 m de largo y 3,5 m de ancho. ¿Cuántos metros de zócalo hacen falta si se pone en todo el contorno, sin descontar la puerta?",
      mode: "choice",
      choices: [
        { id: "a", label: "$19{,}8\\ \\mathrm{m}$" },
        {
          id: "b",
          label: "$22{,}4\\ \\mathrm{m}$",
          incorrectFeedback: "$22{,}4$ es el **área** ($6{,}4 \\cdot 3{,}5$), que se mide en $\\mathrm{m}^2$. El zócalo es un contorno: se necesita el perímetro.",
        },
        {
          id: "c",
          label: "$9{,}9\\ \\mathrm{m}$",
          incorrectFeedback: "$9{,}9$ es la suma de un largo y un ancho. El contorno recorre los cuatro lados: hay que duplicarlo.",
        },
        {
          id: "d",
          label: "$10\\ \\mathrm{m}$",
          incorrectFeedback: "Has sumado solo los números, sin pensar en los cuatro lados: $6{,}4 + 3{,}5 = 9{,}9$ y aún falta duplicarlo.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$P = 2 \\cdot (6{,}4 + 3{,}5) = 19{,}8\\ \\mathrm{m}$. El suelo, en cambio, tiene un área de $6{,}4 \\cdot 3{,}5 = 22{,}4\\ \\mathrm{m}^2$.",
    },
    {
      id: "parcela",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué figura es?",
          message: "Un cuadrilátero con dos lados paralelos es un trapecio: esos lados son las bases.",
        },
        {
          label: "¿Qué hago con la distancia de $45$ m?",
          message: "Es la distancia perpendicular entre los lados paralelos: la altura.",
        },
      ],
      title: "Una parcela",
      question:
        "Una parcela cuadrangular tiene dos lados paralelos de 37,5 m y 62,4 m, separados por una distancia de 45 m. ¿Cuál es su superficie en m²? (escribe solo el número)",
      correctAnswers: ["2247,75", "2247.75", "2247,8", "2248"],
      hint: "Es un trapecio: $\\dfrac{(b + b') \\cdot a}{2}$.",
      explanation: "$A = \\dfrac{(62{,}4 + 37{,}5) \\cdot 45}{2} = \\dfrac{99{,}9 \\cdot 45}{2} = 2\\,247{,}75\\,\\mathrm{m}^2$.",
    },
  ],
};
