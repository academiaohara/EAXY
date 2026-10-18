import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraLetrasNumerosLesson: InteractiveLesson = {
  slug: "algebra-letras-numeros",
  title: "1. Letras en vez de números",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "monton",
      type: "slide",
      help: [
        {
          label: "¿Qué tiene que ver Egipto?",
          message: "Hace unos $3600$ años ya se planteaban problemas con una cantidad desconocida. Tu $x$ es ese mismo «montón» con otro nombre.",
        },
        {
          label: "¿Por qué una letra y no un número?",
          message: "Porque aún no sabes cuánto vale. La letra guarda su sitio y te deja operar mientras lo averiguas.",
        },
      ],
      title: "El montón egipcio: una cantidad que aún no conocemos",
      blocks: [
        {
          kind: "story",
          text: "Un papiro egipcio de hacia el 1650 a.C. pregunta: **¿cuánto vale el montón si el montón y un séptimo del montón suman 24?**",
          src: "/lesson/algebra/papiro-monton.png",
          alt: "Un escriba con un papiro junto a un montón de granos",
          maxWidth: 170,
        },
        {
          kind: "definition",
          text: "Una **letra** puede guardar el sitio de un número que todavía no conocemos. Hoy el montón es $x$.",
        },
        { kind: "formula", tex: "x + \\frac{x}{7} = 24" },
        {
          kind: "text",
          text: "«Álgebra» viene del árabe: los matemáticos de los siglos viii y ix llamaban a la incógnita «la cosa» y fueron los primeros en dar métodos sistemáticos para resolver estas preguntas.",
        },
      ],
    },
    {
      id: "monedas-clave",
      type: "slide",
      help: [
        {
          label: "¿Cuál es la clave?",
          message: "Es la tabla que dice qué número esconde cada letra. Con ella, una suma de letras se convierte en una suma normal.",
        },
        {
          label: "Un truco",
          message: "Escribe debajo de cada letra su valor y suma como siempre: $a + a + b$ es $20 + 20 + 5$.",
        },
      ],
      title: "Una expresión con letras: monedas en clave",
      blocks: [
        {
          kind: "definition",
          text: "Una **expresión algebraica** combina números y letras con los signos de las operaciones.",
        },
        {
          kind: "facts",
          items: [
            { tex: "a = 20", label: "céntimos" },
            { tex: "b = 5", label: "céntimos" },
            { tex: "c = 1", label: "céntimo" },
          ],
        },
        {
          kind: "example",
          title: "Con esa clave",
          lines: [
            { math: "a + a + a = 60" },
            { math: "a + b + b = 30" },
            { math: "a + a + b + c + c = 47" },
          ],
        },
        {
          kind: "text",
          text: "Se opera con las **mismas leyes** que con números: la letra solo espera a que le pongas valor.",
        },
      ],
      visual: { kind: "anim", scene: "letras-valores" },
    },
    {
      id: "campo-formula",
      type: "slide",
      help: [
        {
          label: "¿Por qué vale para cualquier campo?",
          message: "Porque $x$ e $y$ no son medidas concretas: son «el largo» y «el ancho», sean los que sean.",
        },
        {
          label: "Comprueba con números",
          message: "Un campo de $30$ por $20$ m: perímetro $30 + 20 + 30 + 20$ y área $30 \\cdot 20$.",
        },
      ],
      title: "Una fórmula vale para todos los casos a la vez",
      blocks: [
        {
          kind: "text",
          text: "Un campo rectangular mide $x$ de largo y $y$ de ancho. Una sola fórmula sirve para **cualquier** campo:",
        },
        {
          kind: "rule",
          title: "Perímetro (rodear)",
          formula: "P = x + y + x + y = 2x + 2y",
        },
        {
          kind: "rule",
          title: "Área (cubrir)",
          formula: "A = x \\cdot y",
        },
        {
          kind: "warning",
          text: "$2x + 2y$ no es lo mismo que $2xy$: el perímetro **suma** los lados; el área los **multiplica**.",
        },
      ],
      visual: { kind: "anim", scene: "campo-perimetro-area" },
    },
    {
      id: "cancha",
      type: "predict",
      help: [
        {
          label: "¿Perímetro o área?",
          message: "Una valla recorre el borde: eso es el perímetro. El área sería la superficie que cubre el suelo.",
        },
        {
          label: "Pruébalo con una cancha concreta",
          message: "Imagina una cancha de $20$ por $10$ m. ¿Cuántos metros de valla necesitas? Haz la misma cuenta cambiando los números por $x$ e $y$.",
        },
        {
          label: "¿Cuántos lados hay de cada tipo?",
          message: "Un rectángulo tiene dos lados largos y dos cortos. Mira cuántas veces aparece cada letra.",
        },
      ],
      title: "Una valla para la cancha",
      question:
        "Un club quiere rodear con una valla su cancha rectangular, que mide x metros de largo e y metros de ancho. ¿Qué expresión da los metros de valla necesarios?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2x + 2y$" },
        {
          id: "b",
          label: "$x + y$",
          incorrectFeedback:
            "Eso es solo **la mitad** de la valla: cuenta un lado largo y uno corto. El rectángulo tiene dos de cada.",
        },
        {
          id: "c",
          label: "$x \\cdot y$",
          incorrectFeedback:
            "Eso es el **área**: la superficie del suelo. La valla rodea el borde, así que se suman los lados.",
        },
        {
          id: "d",
          label: "$2xy$",
          incorrectFeedback:
            "Aquí multiplicas, y la valla se mide **sumando** longitudes. Con $x = 20$ e $y = 10$ saldría $400$ m, un disparate para una cancha.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Hay dos lados de $x$ y dos de $y$: $x + y + x + y = 2x + 2y$. Con $20$ y $10$ m son $60$ m de valla.",
    },
    {
      id: "maquina",
      type: "slide",
      help: [
        {
          label: "Piensa en una máquina",
          message: "Entra un número y sale otro siguiendo siempre la misma regla. La expresión algebraica es esa regla escrita.",
        },
        {
          label: "Comprueba la regla",
          message: "Si de $3$ sale $9$ y de $5$ sale $13$, la regla «doble más tres» lo cumple en los dos casos: $2\\cdot 3 + 3$ y $2 \\cdot 5 + 3$.",
        },
      ],
      title: "Generalizar: la regla de una máquina",
      blocks: [
        {
          kind: "story",
          text: "Una máquina de tickets asocia a cada número **su doble más tres unidades**.",
          src: "/lesson/algebra/maquina-tickets.png",
          alt: "Una máquina que saca tickets en blanco",
          maxWidth: 150,
        },
        {
          kind: "definition",
          text: "Con $n$ describimos **cualquier** número que entre: así una sola expresión recoge todos los casos.",
        },
        {
          kind: "rule",
          title: "La regla general",
          formula: "n \\longrightarrow 2n + 3",
        },
      ],
      visual: { kind: "anim", scene: "maquina-funcion", params: { a: 2, b: 3, nums: [3, 5] } },
    },
    {
      id: "explora-maquina",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Cada vez que $n$ sube una unidad, el resultado sube siempre lo mismo. Busca cuánto.",
        },
      ],
      title: "Explora: la misma regla con cualquier número",
      blocks: [
        {
          kind: "text",
          text: "Mueve $n$ y mira cómo cambia el resultado. Intenta averiguar cuánto **sube la salida** cada vez que la entrada sube $1$, y por qué.",
        },
        {
          kind: "rule",
          title: "Para comprobar",
          text: "Si $n$ aumenta $1$, la salida aumenta lo que valga el coeficiente de $n$ (aquí, $2$): $2 \\cdot (n + 1) = 2n + 2$.",
        },
      ],
      visual: { kind: "tool", tool: "valor-numerico", params: { a: 2, b: 3, n: 5 } },
    },
    {
      id: "traducir",
      type: "slide",
      help: [
        {
          label: "Frase a frase",
          message: "Elige primero qué representa la letra. Después ve palabra por palabra: «siguiente» suma uno, «doble» multiplica por dos…",
        },
        {
          label: "Comprueba con un número",
          message: "Pon $x = 5$: el siguiente es $6$ y su doble $12$. Si tu expresión da $12$, está bien traducida.",
        },
      ],
      title: "Del enunciado a la expresión",
      blocks: [
        {
          kind: "example",
          title: "Si $x$ es la edad de Juan",
          lines: [
            { math: "x", note: "la edad de Juan" },
            { math: "x + 15", note: "su edad dentro de $15$ años" },
            { math: "2(x - 1)", note: "el doble de la edad que tenía el año pasado" },
            { math: "\\dfrac{x}{2} + 6", note: "la mitad de $x$, más seis" },
          ],
        },
        {
          kind: "warning",
          text: "El doble de $x - 1$ es $2(x - 1)$, **no** $2x - 1$: el doble afecta a todo el resultado, y por eso va el paréntesis.",
        },
      ],
      visual: { kind: "anim", scene: "enunciado-expresion" },
    },
    {
      id: "abuelo",
      type: "predict",
      help: [
        {
          label: "Ordena las ideas",
          message: "Primero la edad de Lucía dentro de $5$ años; después, el doble de **esa** edad.",
        },
        {
          label: "Pruébalo con un número",
          message: "Si Lucía tuviera $10$ años, dentro de $5$ tendría $15$ y el abuelo, el doble de eso. Haz la misma cuenta con $x$.",
          math: ["10 \\to 10 + 5 = 15 \\to 2 \\cdot 15"],
        },
      ],
      title: "La edad del abuelo",
      question:
        "Lucía tiene x años. Su abuelo tiene el doble de la edad que Lucía tendrá dentro de 5 años. ¿Qué expresión da la edad del abuelo?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2(x + 5)$" },
        {
          id: "b",
          label: "$2x + 5$",
          incorrectFeedback:
            "Aquí solo duplicas la edad actual y sumas $5$ después. El doble tiene que afectar a «la edad dentro de $5$ años», que es $x + 5$: va entre paréntesis.",
        },
        {
          id: "c",
          label: "$x + 10$",
          incorrectFeedback:
            "Has sumado $5 + 5$. «El doble» multiplica por $2$ la edad completa; no es sumar otra vez.",
        },
        {
          id: "d",
          label: "$2(x - 5)$",
          incorrectFeedback:
            "Con $x - 5$ calculas la edad que Lucía tenía **hace** $5$ años. «Dentro de $5$ años» es sumar.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Dentro de $5$ años Lucía tendrá $x + 5$, y el abuelo, el doble de eso: $2(x + 5)$.",
    },
    {
      id: "propiedades",
      type: "slide",
      help: [
        {
          label: "¿Por qué con letras?",
          message: "Escrita con letras, la propiedad vale para **todos** los números. Con un ejemplo concreto solo la ves en un caso.",
        },
        {
          label: "Comprueba la distributiva",
          message: "Con $a = 4$, $b = 5$, $c = 3$: $4 \\cdot (5 + 3) = 32$ y $4 \\cdot 5 + 4 \\cdot 3 = 32$.",
        },
      ],
      title: "Las propiedades numéricas, escritas con letras",
      blocks: [
        {
          kind: "rule",
          title: "Conmutativa",
          text: "El orden de los sumandos no cambia la suma.",
          formula: "a + b = b + a",
        },
        {
          kind: "rule",
          title: "Múltiplo",
          text: "Los múltiplos de $a$ se obtienen multiplicándolo por cualquier número $n$.",
          formula: "a \\cdot n \\longrightarrow \\text{múltiplo de } a",
        },
        {
          kind: "rule",
          title: "Distributiva",
          formula: "a \\cdot (b + c) = a \\cdot b + a \\cdot c",
        },
      ],
      visual: { kind: "anim", scene: "area-distributiva", params: { a: 4, b: 5, c: 3 } },
    },
    {
      id: "codificar",
      type: "slide",
      help: [
        {
          label: "Del texto a la ecuación",
          message: "Cada frase es una pieza: «dentro de $15$ años» es $x + 15$, «el año pasado» es $x - 1$ y «es el doble» es $= 2(\\cdots)$.",
        },
        {
          label: "Comprueba el resultado",
          message: "Con $17$ años: dentro de $15$ tendrá $32$; el año pasado tenía $16$ y su doble es $32$. Encaja.",
        },
      ],
      title: "Codificar un problema y resolverlo",
      blocks: [
        {
          kind: "text",
          text: "**La edad de Juan dentro de 15 años será el doble de la que tenía el año pasado.** ¿Cuántos años tiene?",
        },
        {
          kind: "compare",
          left: { title: "En palabras", text: "Edad dentro de $15$ años = $2 \\cdot$ edad el año pasado", tone: "info" },
          right: { title: "En álgebra", math: ["x + 15 = 2 \\cdot (x - 1)"], tone: "key" },
        },
        {
          kind: "example",
          lines: [
            { math: "x + 15 = 2x - 2", note: "quitamos el paréntesis" },
            { math: "17 = x", note: "juntamos las $x$ y los números" },
          ],
        },
        {
          kind: "definition",
          text: "Esta parte de las matemáticas, que estudia expresiones con letras y números, se llama **álgebra**.",
        },
      ],
    },
    {
      id: "check",
      type: "classify",
      help: [
        {
          label: "¿Cómo traduzco una frase?",
          message: "Primero fija qué representa la letra (tu edad). Después mira qué hace la frase con ella: ¿añade, quita o repite?",
        },
        {
          label: "Pruébalo con una edad concreta",
          message: "Imagina que tienes $15$ años y calcula con ese número lo que dice la frase. Fíjate en la cuenta que has hecho y escríbela cambiando el $15$ por $x$.",
          branches: [
            {
              label: "¿Qué pasa con «el doble»?",
              message: "Es repetir la cantidad dos veces: se puede escribir como una suma o como un producto. Las dos formas valen.",
            },
          ],
        },
      ],
      title: "Comprueba lo aprendido",
      question: "$x$ es tu edad actual. Lleva cada frase a la expresión que la representa.",
      groups: [
        { id: "menos-uno", label: "$x - 1$", tone: "cobalt" },
        { id: "mas-uno", label: "$x + 1$", tone: "emerald" },
        { id: "doble", label: "$2x$", tone: "amber" },
      ],
      items: [
        { id: "a", text: "El anterior de $x$", group: "menos-uno" },
        { id: "b", text: "Tu edad el año pasado", group: "menos-uno" },
        { id: "c", text: "El siguiente de $x$", group: "mas-uno" },
        { id: "d", text: "Tu edad dentro de un año", group: "mas-uno" },
        { id: "e", text: "El doble de tu edad", group: "doble" },
        { id: "f", text: "$x$ más $x$", group: "doble" },
      ],
      hint: "«Anterior» y «el año pasado» quitan una unidad; «siguiente» y «dentro de un año» la añaden.",
      explanation:
        "El anterior de $x$ (o tu edad hace un año) es $x - 1$; el siguiente (o tu edad dentro de un año) es $x + 1$; el doble, o $x + x$, es $2x$.",
    },
    {
      id: "tabla",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Escribe la regla $2n + 3$ y busca el $n$ que la hace valer $17$. Es como deshacer la máquina.",
        },
        {
          label: "Deshacer la máquina",
          message: "Si la salida es $17$, quita primero lo último que hizo (sumar $3$) y después lo anterior (multiplicar por $2$).",
        },
        {
          label: "¿Cómo compruebo?",
          message: "Mete tu número en la máquina: tiene que salir $17$.",
        },
      ],
      title: "Deshacer la máquina",
      question: "En la máquina $n \\longrightarrow 2n + 3$, ¿qué número hay que meter para que salga $17$? (escribe solo el número)",
      correctAnswers: ["7", "n=7"],
      hint: "Quita primero el $3$ que se sumó y después divide entre $2$.",
      explanation: "$17 - 3 = 14$ y $14 : 2 = 7$. Comprobación: $2 \\cdot 7 + 3 = 17$.",
    },
  ],
};
