import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoMagnitudesLesson: InteractiveLesson = {
  slug: "sistema-metrico-magnitudes",
  title: "1. Magnitudes y el Sistema Métrico Decimal",
  subtitle: TEMA_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "magnitud",
      type: "slide",
      help: [
        {
          label: "Cualquier cosa medible",
          message: "Si puedes expresarla con un número y una unidad, es una magnitud: la longitud de una mesa, lo que pesa una maleta, lo que dura una película.",
        },
        {
          label: "¿Qué es medir?",
          message: "Contar cuántas veces cabe una unidad conocida en lo que quieres medir.",
        },
        {
          label: "¿Por qué convencional?",
          message: "Porque si cada uno usa una unidad distinta, los números no se pueden comparar.",
        },
      ],
      title: "Medir es comparar con una unidad",
      blocks: [
        {
          kind: "definition",
          text: "Una **magnitud** es una propiedad que se puede medir y expresar con un número: longitud, peso, capacidad, superficie, temperatura…",
        },
        {
          kind: "rule",
          text: "**Medir** es comparar una cantidad con otra fija y conocida, la **unidad de medida**, y contar cuántas veces cabe.",
        },
        {
          kind: "warning",
          title: "La unidad tiene que ser de todos",
          text: "«Mi jarra tiene 5 vasos» no informa de nada si no sabes qué vaso usé. Por eso la unidad debe ser **convencional**: aceptada y estandarizada por todos.",
        },
      ],
      visual: { kind: "anim", scene: "medir-unidad" },
    },
    {
      id: "check-magnitud",
      type: "predict",
      help: [
        {
          label: "Fíjate en la unidad",
          message: "Cada unidad pertenece a una sola magnitud: el gramo mide peso, el litro capacidad, el minuto tiempo.",
        },
        {
          label: "Descarta por unidades",
          message: "Si en una opción una unidad aparece asociada a otra magnitud (por ejemplo, el litro con una superficie), esa opción es falsa.",
        },
        {
          label: "Revisa el orden",
          message: "La pregunta pide las magnitudes «en ese orden»: el de las medidas de la libreta.",
        },
      ],
      title: "La libreta de la cocinera",
      question:
        "Una cocinera apunta en su libreta: «250 g de harina, 2 l de leche y 35 min de horno». ¿Qué magnitudes ha medido, en ese orden?",
      mode: "choice",
      choices: [
        { id: "a", label: "Peso, capacidad y tiempo" },
        {
          id: "b",
          label: "Longitud, capacidad y tiempo",
          incorrectFeedback:
            "El gramo no mide longitud: mide **peso**. La longitud se mide con metros y sus múltiplos.",
        },
        {
          id: "c",
          label: "Peso, superficie y tiempo",
          incorrectFeedback:
            "El litro no mide superficie, sino **capacidad**: cuánto líquido cabe en un recipiente.",
        },
        {
          id: "d",
          label: "Capacidad, peso y temperatura",
          incorrectFeedback:
            "El orden está cambiado ($\\mathrm{g}$ es peso y $\\mathrm{l}$ capacidad) y los minutos miden **tiempo**, no temperatura.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "El gramo mide **peso**, el litro **capacidad** y el minuto **tiempo**: tres magnitudes distintas, cada una con sus unidades.",
    },
    {
      id: "historia",
      type: "slide",
      help: [
        {
          label: "¿Por qué el codo no servía?",
          message: "Cada antebrazo es distinto, así que la misma «medida» daba longitudes diferentes según quién midiese.",
        },
        {
          label: "¿Por qué un sistema único?",
          message: "Para que comerciar, construir o hacer ciencia entre países no dependiera de cada región.",
        },
        {
          label: "¿Qué es el S.M.D.?",
          message: "Un conjunto de unidades relacionadas entre sí, con el metro, el litro y el gramo como principales.",
        },
      ],
      title: "Del codo al metro",
      blocks: [
        {
          kind: "story",
          text: "En el antiguo Egipto se medía con el **codo**: el antebrazo del comerciante. Como cada antebrazo es distinto, la medida variaba de uno a otro; después se fijó un **codo real** invariable. Griegos y romanos copiaron la idea, pero sus codos tenían otra longitud.",
          src: "/lesson/sistema-metrico/comerciantes-codo.png",
          alt: "Dos comerciantes midiendo una tela cada uno con su antebrazo",
          side: "right",
        },
        {
          kind: "compare",
          left: {
            title: "Antes",
            text: "Cada región, sus unidades: codos, pies, yugadas, fanegas. Unidades con el mismo nombre y distinto tamaño.",
            tone: "warn",
          },
          right: {
            title: "1792",
            text: "La Academia de Ciencias de París propone un sistema válido para todos los países. Hoy lo usa el **95 %** de la población mundial.",
            tone: "ok",
          },
        },
        {
          kind: "definition",
          text: "El **Sistema Métrico Decimal** (S.M.D.) es un conjunto de unidades de medida relacionadas entre sí, con un **metro**, un **litro** y un **gramo** como unidades principales.",
        },
      ],
      visual: { kind: "anim", scene: "meridiano-metro" },
    },
    {
      id: "tres-unidades",
      type: "slide",
      help: [
        {
          label: "Un hilo común: el agua",
          message: "Un cubo de $1$ dm de arista contiene un litro de agua, y ese litro pesa un kilogramo. Así se relacionan longitud, capacidad y peso.",
        },
        {
          label: "¿Y el gramo?",
          message: "Se definió con un cubito de $1$ cm de arista lleno de agua: pesa un gramo.",
        },
        {
          label: "¿Por qué usamos el kilo?",
          message: "Porque el gramo es muy pequeño y los números serían muy grandes para pesos cotidianos.",
        },
      ],
      title: "Metro, litro y gramo salen de la misma idea",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\mathrm{m}", label: "longitud · metro" },
            { tex: "\\mathrm{l}", label: "capacidad · litro" },
            { tex: "\\mathrm{g}", label: "peso (masa) · gramo" },
          ],
        },
        {
          kind: "rule",
          title: "Una referencia común: el agua",
          text: "El litro es lo que cabe en un cubo de 1 dm de arista. Y ese litro de agua pesa un kilogramo.",
          formula: "1\\ \\mathrm{dm}^3 = 1\\ \\mathrm{l} \;\\longrightarrow\; 1\\ \\mathrm{kg}\\ \\text{de agua}",
        },
        {
          kind: "text",
          text: "El **gramo** se definió con el cubito de $1\\ \\mathrm{cm}^3$: un centímetro cúbico de agua pesa $1$ g.",
        },
        {
          kind: "warning",
          text: "El gramo es muy pequeño: en la vida diaria se usa sobre todo el **kilogramo**.",
        },
      ],
      visual: { kind: "anim", scene: "cubo-agua" },
    },
    {
      id: "prefijos",
      type: "slide",
      help: [
        {
          label: "Mira la tabla",
          message: "Los prefijos mayores (kilo, hecto, deca) multiplican; los menores (deci, centi, mili) dividen entre $10$, $100$ y $1000$.",
        },
        {
          label: "Un truco para recordarlos",
          message: "Ordénalos de mayor a menor: kilo, hecto, deca, unidad, deci, centi, mili. Cada uno vale diez veces el de su derecha.",
        },
        {
          label: "Valen para todo",
          message: "Un hectómetro son $100$ m, un hectolitro $100$ l y un hectogramo $100$ g: se aprenden una vez.",
        },
      ],
      title: "Múltiplos y submúltiplos: los prefijos",
      blocks: [
        {
          kind: "text",
          text: "Cada unidad tiene **múltiplos** (mayores) y **submúltiplos** (menores), que se nombran con un prefijo. $\\mathrm{U}$ es la unidad.",
        },
        {
          kind: "facts",
          items: [
            { tex: "1\\,000\\ \\mathrm{U}", label: "kilo" },
            { tex: "100\\ \\mathrm{U}", label: "hecto" },
            { tex: "10\\ \\mathrm{U}", label: "deca" },
            { tex: "0{,}1\\ \\mathrm{U}", label: "deci" },
            { tex: "0{,}01\\ \\mathrm{U}", label: "centi" },
            { tex: "0{,}001\\ \\mathrm{U}", label: "mili" },
          ],
        },
        {
          kind: "rule",
          text: "Cada unidad vale **10 veces** la que tiene a su derecha: las unidades van **de 10 en 10**.",
          formula:
            "1\\ \\mathrm{km} = 1\\,000\\ \\mathrm{m} \\qquad 1\\ \\mathrm{kg} = 1\\,000\\ \\mathrm{g} \\qquad 1\\ \\mathrm{l} = 1\\,000\\ \\mathrm{ml}",
        },
        {
          kind: "warning",
          title: "Se aprende una vez",
          text: "Los prefijos significan lo mismo con el metro, el litro y el gramo: un hectómetro son 100 m, un hectolitro 100 l y un hectogramo 100 g.",
        },
      ],
      visual: { kind: "anim", scene: "escalera-unidades", params: { units: "m" } },
    },
    {
      id: "check-hecto",
      type: "predict",
      help: [
        {
          label: "¿Qué significa «hecto»?",
          message: "Es un prefijo de la parte mayor de la escala. Mira cuántas veces es mayor que la unidad en la tabla de prefijos.",
        },
        {
          label: "Descarta por vecinos",
          message: "Los prefijos vecinos (deca, kilo) valen diez veces menos o diez veces más. Comprueba que tu respuesta no sea la de uno de ellos.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Una recta de pista de atletismo suele medir más de diez metros y menos de un kilómetro.",
        },
      ],
      title: "La recta de la pista",
      question:
        "En una pista de atletismo se marca un tramo recto de «1 hectómetro». ¿Cuántos metros mide ese tramo?",
      mode: "choice",
      choices: [
        { id: "a", label: "$100\\ \\mathrm{m}$" },
        {
          id: "b",
          label: "$10\\ \\mathrm{m}$",
          incorrectFeedback: "Diez metros son un **decámetro** ($\\mathrm{dam}$). «Hecto» es el siguiente: 100.",
        },
        {
          id: "c",
          label: "$1\\,000\\ \\mathrm{m}$",
          incorrectFeedback: "Mil metros son un **kilómetro**. El hectómetro es diez veces menor.",
        },
        {
          id: "d",
          label: "$0{,}01\\ \\mathrm{m}$",
          incorrectFeedback:
            "Eso es un **centímetro**: el prefijo «centi» va a la derecha de la unidad, «hecto» a la izquierda.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Hecto significa cien: $1\\ \\mathrm{hm} = 100\\ \\mathrm{m}$.",
    },
    {
      id: "check-mililitro",
      type: "predict",
      help: [
        {
          label: "¿Qué significa «mili»?",
          message: "Una milésima parte. Entonces, ¿cuántos mililitros hay en un litro entero?",
        },
        {
          label: "Cuenta los saltos",
          message: "De $\\mathrm{ml}$ a $\\mathrm{l}$ hay tres escalones. Cada uno multiplica por $10$ el número de jeringuillas necesarias.",
        },
        {
          label: "Compruébalo con otro tamaño",
          message: "Con jeringuillas de $10$ ml (un centilitro) harían falta menos que con las de $1$ ml: el número crece al hacerse la jeringuilla más pequeña.",
        },
      ],
      title: "Las jeringuillas",
      question:
        "Una jeringuilla de laboratorio contiene exactamente 1 ml. ¿Cuántas jeringuillas como esa hacen falta para llenar 1 litro?",
      mode: "choice",
      choices: [
        { id: "a", label: "$1\\,000$" },
        {
          id: "b",
          label: "$100$",
          incorrectFeedback:
            "Cien mililitros son solo $0{,}1$ l (1 **decilitro**). Entre el mililitro y el litro hay tres saltos de 10: $10 \\cdot 10 \\cdot 10$.",
        },
        {
          id: "c",
          label: "$10$",
          incorrectFeedback: "Con 10 jeringuillas solo llenas 1 **centilitro**; falta dar dos saltos más hasta el litro.",
        },
        {
          id: "d",
          label: "$10\\,000$",
          incorrectFeedback: "Te has pasado un salto: serían las jeringuillas de $0{,}1$ ml. Del mililitro al litro hay **tres** saltos, no cuatro.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Mili significa milésima: $1\\ \\mathrm{ml} = 0{,}001\\ \\mathrm{l}$, así que $1\\ \\mathrm{l} = 1\\,000\\ \\mathrm{ml}$.",
    },
  ],
};
