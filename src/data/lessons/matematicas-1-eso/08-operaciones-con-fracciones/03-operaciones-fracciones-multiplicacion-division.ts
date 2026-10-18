import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesMultiplicacionDivisionLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-multiplicacion-division",
  title: "3. Multiplicación y división de fracciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "multiplicacion",
      type: "slide",
      help: [
        {
          label: "¿Qué significa multiplicar fracciones?",
          message: "Tomar una fracción de otra: $\\frac{3}{4}$ de $\\frac{2}{5}$ es repartir ese $\\frac{2}{5}$ en cuatro y quedarte con tres.",
        },
        {
          label: "¿Por qué no hace falta común denominador?",
          message: "Porque no estás juntando trozos del mismo tamaño: estás partiendo un trozo en otros más pequeños.",
        },
        {
          label: "Dibujo mental",
          message: "Parte un cuadrado en $4$ columnas y colorea $3$. Luego pártelo en $5$ filas y colorea $2$: donde se cruzan los colores está el producto.",
        },
      ],
      title: "Multiplicar: arriba con arriba, abajo con abajo",
      blocks: [
        {
          kind: "definition",
          text: "Multiplicar una fracción por otra es **tomar una parte de otra parte**: $\\dfrac{3}{4}$ **de** $\\dfrac{2}{5}$.",
        },
        {
          kind: "rule",
          title: "Regla",
          formula: "\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\frac{3}{4} \\cdot \\frac{2}{5} = \\frac{6}{20} = \\frac{3}{10}", note: "se simplifica al final" },
          ],
        },
        {
          kind: "warning",
          text: "Aquí **no** hace falta común denominador: no estás juntando trozos, estás partiendo uno en trozos más pequeños.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-de-fraccion", params: { a: 3, b: 4, c: 2, d: 5 } },
    },
    {
      id: "explora-producto",
      type: "slide",
      title: "Explora: el producto de dos fracciones",
      help: [
        {
          label: "¿Qué es la zona amarilla?",
          message: "Es la parte del cuadrado que está dentro de las dos fracciones a la vez. Contando sus cuadraditos sale el numerador del producto.",
        },
        {
          label: "¿Y si un numerador es $0$?",
          message: "No coloreas nada de esa fracción, así que no hay zona común: el producto vale $0$.",
        },
      ],
      blocks: [
        {
          kind: "text",
          text: "Cambia las dos fracciones y fíjate en el cuadrado. Intenta encontrar una combinación en la que el producto sea **mayor** que alguna de las dos fracciones.",
        },
        {
          kind: "rule",
          title: "Para comprobar",
          text: "Con fracciones menores o iguales que $1$, el producto es una **parte de una parte**: nunca supera a ninguno de los dos factores. Verifícalo con tus propias combinaciones.",
        },
      ],
      visual: { kind: "tool", tool: "fraction-product", initial: [3, 4, 2, 5] },
    },
    {
      id: "simplificar-factores",
      type: "slide",
      help: [
        {
          label: "¿Qué factores puedo tachar?",
          message: "Uno de arriba contra uno de abajo, aunque vengan de fracciones distintas. Dos de la misma fila no se tachan entre sí.",
        },
        {
          label: "¿Por qué sirve factorizar?",
          message: "Con todos los factores a la vista, ves de un golpe qué se repite arriba y abajo y no necesitas buscar el m.c.d. después.",
        },
        {
          label: "Si no queda nada arriba",
          message: "Cuando se tachan todos los factores de un lado, queda un $1$: $\\frac{2 \\cdot 2}{2 \\cdot 2 \\cdot 2} = \\frac{1}{2}$.",
        },
      ],
      title: "Simplificar antes de multiplicar",
      blocks: [
        {
          kind: "steps",
          items: [
            "Descompón en **factores primos** todos los numeradores y denominadores.",
            "Tacha cada factor que aparezca **arriba y abajo**.",
            "Multiplica lo que queda: el resultado sale ya simplificado.",
          ],
        },
        {
          kind: "example",
          lines: [
            {
              math: "\\frac{4}{8} \\cdot \\frac{3}{4} = \\frac{2 \\cdot 2}{2 \\cdot 2 \\cdot 2} \\cdot \\frac{3}{2 \\cdot 2} = \\frac{3}{2 \\cdot 2 \\cdot 2} = \\frac{3}{8}",
              note: "se tachan dos $2$",
            },
          ],
        },
        {
          kind: "warning",
          text: "Solo se tacha **un factor de arriba contra uno de abajo**. Dos factores del numerador no se simplifican entre sí.",
        },
      ],
      visual: { kind: "anim", scene: "simplificar-factores", params: { a: 4, b: 8, c: 3, d: 4 } },
    },
    {
      id: "deposito",
      type: "predict",
      help: [
        {
          label: "¿Qué operación es?",
          message: "«Se gastan $\\frac{3}{4}$ **de esa agua**»: una fracción de otra fracción, es decir, un producto.",
        },
        {
          label: "¿Cuál es el total de referencia?",
          message: "No es el depósito entero: $\\frac{3}{4}$ se aplica solo a lo que había, que eran $\\frac{2}{3}$ del depósito.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Si se gasta solo una parte de lo que había, el resultado tiene que ser menor que $\\frac{2}{3}$.",
        },
      ],
      title: "Un depósito a medio gastar",
      question:
        "Un depósito tiene 2/3 de su capacidad llena de agua. Se gastan 3/4 de esa agua. ¿Qué fracción de la capacidad del depósito se ha gastado?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{1}{2}$" },
        {
          id: "b",
          label: "$\\dfrac{17}{12}$",
          incorrectFeedback:
            "Has sumado $\\frac{2}{3} + \\frac{3}{4}$. Pero «$\\frac{3}{4}$ **de** esa agua» es una parte de otra parte: se multiplica. Además, un depósito no puede gastar más que su capacidad ($\\frac{17}{12} > 1$).",
        },
        {
          id: "c",
          label: "$\\dfrac{5}{7}$",
          incorrectFeedback:
            "Has sumado numeradores y denominadores por separado ($2 + 3$ y $3 + 4$). Eso no es ninguna operación de fracciones.",
        },
        {
          id: "d",
          label: "$\\dfrac{3}{4}$",
          incorrectFeedback:
            "Eso sería gastar $\\frac{3}{4}$ del depósito **entero**. Pero solo hay $\\frac{2}{3}$ de agua, así que se gasta menos.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$\\frac{3}{4} \\cdot \\frac{2}{3} = \\frac{6}{12} = \\frac{1}{2}$. Con factores: el $3$ de arriba se tacha con el $3$ de abajo y queda $\\frac{2}{4} = \\frac{1}{2}$.",
    },
    {
      id: "division",
      type: "slide",
      help: [
        {
          label: "¿Qué significa dividir fracciones?",
          message: "Preguntar cuántas veces cabe la segunda en la primera. Por eso, si divides entre algo pequeño, sale un número grande.",
        },
        {
          label: "¿Por qué sale entero?",
          message: "Con el mismo denominador, $\\frac{6}{8} : \\frac{1}{8}$ es $6 : 1$: caben seis trozos de un octavo.",
        },
        {
          label: "Cuidado",
          message: "En el cruce, $a$ se multiplica por $d$ (arriba) y $b$ por $c$ (abajo). Si te lías, escribe las letras sobre las fracciones.",
        },
      ],
      title: "Dividir: ¿cuántas veces cabe?",
      blocks: [
        {
          kind: "definition",
          text: "$\\dfrac{a}{b} : \\dfrac{c}{d}$ pregunta **cuántas veces cabe** la segunda fracción en la primera.",
        },
        {
          kind: "rule",
          title: "Multiplicar en cruz",
          text: "Extremos arriba, medios abajo:",
          formula: "\\frac{a}{b} : \\frac{c}{d} = \\frac{a \\cdot d}{b \\cdot c}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\frac{3}{4} : \\frac{1}{8} = \\frac{3 \\cdot 8}{4 \\cdot 1} = \\frac{24}{4} = 6", note: "caben 6 octavos en $\\frac{3}{4}$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-cabe", params: { a: 3, b: 4, c: 1, d: 8 } },
    },
    {
      id: "division-inversa",
      type: "slide",
      help: [
        {
          label: "¿Qué fracción se da la vuelta?",
          message: "Solo la segunda, la que está después de los dos puntos. La primera se queda como está.",
        },
        {
          label: "¿Por qué da lo mismo?",
          message: "Dar la vuelta a la segunda y multiplicar en fila coloca los mismos números que el cruce: $a \\cdot d$ arriba y $b \\cdot c$ abajo.",
        },
      ],
      title: "Dividir es multiplicar por la inversa",
      blocks: [
        {
          kind: "story",
          text: "Un bidón con **cuatro litros y medio** de perfume ($\\frac{9}{2}$ l) se reparte en frascos de **$\\frac{3}{20}$ de litro**. ¿Cuántos frascos se llenan?",
          src: "/lesson/fracciones/bidon-frascos.png",
          alt: "Un bidón junto a unos frascos pequeños de perfume vacíos",
        },
        {
          kind: "compare",
          left: {
            title: "En cruz",
            math: ["\\frac{9}{2} : \\frac{3}{20} = \\frac{9 \\cdot 20}{2 \\cdot 3} = \\frac{180}{6} = 30"],
            tone: "info",
          },
          right: {
            title: "Con la inversa",
            math: ["\\frac{9}{2} \\cdot \\frac{20}{3} = \\frac{180}{6} = 30"],
            tone: "key",
          },
        },
        {
          kind: "warning",
          text: "Solo se da la vuelta a la fracción **por la que divides**. Y se puede simplificar antes con factores.",
        },
      ],
      visual: { kind: "anim", scene: "simplificar-factores", params: { a: 9, b: 2, c: 3, d: 20, inv: true } },
    },
    {
      id: "cuerda",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "«Cuántos trozos salen» es ver cuántas veces cabe el trozo pequeño en la cuerda: una división.",
        },
        {
          label: "¿Qué fracción doy la vuelta?",
          message: "La del trozo ($\\frac{3}{20}$), que es la que está después de los dos puntos.",
          math: ["\\frac{3}{4} : \\frac{3}{20}"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "$\\frac{3}{20}$ es unos $\\frac{15}{100}$ m: un trozo pequeñito en una cuerda de casi un metro. Salen varios, no uno ni un decimal pequeño.",
        },
      ],
      title: "Trozos de cuerda",
      question:
        "Una cuerda de 3/4 de metro se corta en trozos de 3/20 de metro. ¿Cuántos trozos salen?",
      mode: "choice",
      choices: [
        { id: "a", label: "$5$ trozos" },
        {
          id: "b",
          label: "$\\dfrac{1}{5}$ de trozo",
          incorrectFeedback:
            "Has dividido al revés ($\\frac{3}{20} : \\frac{3}{4}$). Se pregunta cuántos trozos caben **en la cuerda**, no cuántas cuerdas caben en un trozo.",
        },
        {
          id: "c",
          label: "$\\dfrac{9}{80}$ de trozo",
          incorrectFeedback:
            "Has multiplicado las dos fracciones en fila. Para dividir hay que multiplicar en cruz (o dar la vuelta a la segunda).",
        },
        {
          id: "d",
          label: "$\\dfrac{5}{4}$ de trozo",
          incorrectFeedback:
            "En cruz sale $\\frac{3 \\cdot 20}{4 \\cdot 3} = \\frac{60}{12}$. Al simplificar, $60 : 12 = 5$: no se queda un denominador $4$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$\\frac{3}{4} : \\frac{3}{20} = \\frac{3 \\cdot 20}{4 \\cdot 3} = \\frac{60}{12} = 5$. Comprobación: $5 \\cdot \\frac{3}{20} = \\frac{15}{20} = \\frac{3}{4}$.",
    },
    {
      id: "combinadas",
      type: "slide",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Por el paréntesis. Resuelve la resta de dentro con común denominador y luego multiplica.",
        },
        {
          label: "Simplifica por el camino",
          message: "Antes de multiplicar, mira si un numerador y un denominador (de fracciones distintas) se pueden simplificar. Aquí se tacha el $11$.",
        },
      ],
      title: "Operaciones combinadas con fracciones",
      blocks: [
        {
          kind: "rule",
          title: "Orden",
          text: "Primero **paréntesis**, luego **multiplicaciones y divisiones**, después sumas y restas.",
        },
        {
          kind: "example",
          title: "$\\frac{5}{11} \\cdot \\left(\\frac{3}{2} - \\frac{2}{5}\\right)$",
          lines: [
            { math: "\\frac{3}{2} - \\frac{2}{5} = \\frac{15}{10} - \\frac{4}{10} = \\frac{11}{10}", note: "paréntesis, con m.c.m. $10$" },
            { math: "\\frac{5}{11} \\cdot \\frac{11}{10} = \\frac{1}{2}", note: "se tachan el $11$ y el $5$ con el $10$" },
          ],
        },
        {
          kind: "warning",
          text: "Si multiplicas el $\\frac{5}{11}$ solo por la primera fracción del paréntesis, el resultado cambia. El paréntesis se resuelve **entero** antes.",
        },
      ],
    },
    {
      id: "check-combinada",
      type: "predict",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Por el paréntesis: $\\frac{1}{2} - \\frac{1}{3}$, con común denominador $6$.",
        },
        {
          label: "¿Y después?",
          message: "Multiplica el resultado del paréntesis por $\\frac{3}{4}$, simplificando antes si puedes.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Dentro del paréntesis queda una fracción pequeña (menos de medio). Multiplicarla por $\\frac{3}{4}$ la hace aún menor.",
        },
      ],
      title: "Paréntesis primero",
      question: "Calcula $\\dfrac{3}{4} \\cdot \\left(\\dfrac{1}{2} - \\dfrac{1}{3}\\right)$ y simplifica el resultado.",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{1}{8}$" },
        {
          id: "b",
          label: "$\\dfrac{1}{24}$",
          incorrectFeedback:
            "Has multiplicado $\\frac{3}{4}$ solo por $\\frac{1}{2}$ y luego has restado $\\frac{1}{3}$. El paréntesis manda: se resta primero.",
        },
        {
          id: "c",
          label: "$\\dfrac{1}{6}$",
          incorrectFeedback:
            "Ese es el valor del paréntesis ($\\frac{3}{6} - \\frac{2}{6}$). Falta multiplicarlo por $\\frac{3}{4}$.",
        },
        {
          id: "d",
          label: "$\\dfrac{2}{9}$",
          incorrectFeedback:
            "Has dividido $\\frac{1}{6}$ entre $\\frac{3}{4}$ (dándole la vuelta a $\\frac{3}{4}$). Aquí hay que multiplicar.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$\\frac{1}{2} - \\frac{1}{3} = \\frac{3}{6} - \\frac{2}{6} = \\frac{1}{6}$ y $\\frac{3}{4} \\cdot \\frac{1}{6} = \\frac{3}{24} = \\frac{1}{8}$.",
    },
    {
      id: "check-mult",
      type: "fill_in_blank",
      help: [
        {
          label: "Simplifica antes de multiplicar",
          message: "Busca un factor común entre un numerador y un denominador (en cruz). Simplificar antes ahorra cuentas con números grandes.",
          math: ["\\frac{2}{3} \\cdot \\frac{9}{8}:\\ \\ 9\\ \\text{y}\\ 3\\ \\text{comparten un factor}"],
        },
        {
          label: "¿Cómo sé que está simplificado?",
          message: "Comprueba que numerador y denominador no tengan ningún divisor común distinto de $1$.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Multiplicar por $\\frac{2}{3}$, que es menor que $1$, reduce: el resultado tiene que ser menor que $\\frac{9}{8}$.",
        },
      ],
      title: "Multiplicación rápida",
      question:
        "Calcula $\\dfrac{2}{3} \\cdot \\dfrac{9}{8}$ y escribe el resultado **simplificado** (por ejemplo, 5/7).",
      correctAnswers: ["3/4", "0,75", "0.75"],
      hint: "Numerador por numerador y denominador por denominador; después divide ambos por su m.c.d.",
      explanation:
        "$\\dfrac{2 \\cdot 9}{3 \\cdot 8} = \\dfrac{18}{24} = \\dfrac{3}{4}$ (divide numerador y denominador por $6$).",
    },
  ],
};
