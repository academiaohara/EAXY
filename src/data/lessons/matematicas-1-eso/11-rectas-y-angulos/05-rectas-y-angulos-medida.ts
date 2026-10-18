import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const rectasYAngulosMedidaLesson: InteractiveLesson = {
  slug: "rectas-y-angulos-medida",
  title: "5. Medida de ángulos",
  subtitle: TEMA_1ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "grados-minutos",
      type: "slide",
      help: [
        {
          label: "¿Por qué de 60 en 60?",
          message: "Es el sistema sexagesimal, que heredamos de los babilonios hace más de tres mil años. Es el mismo reparto que usamos con las horas, los minutos y los segundos.",
        },
        {
          label: "¿Qué quiere decir $37^\\circ\\,40'$?",
          message: "Más de $37^\\circ$ y menos de $38^\\circ$: $37$ grados más $\\dfrac{40}{60}$ de grado.",
        },
      ],
      title: "Grados, minutos y segundos",
      blocks: [
        {
          kind: "definition",
          text: "El **grado** es $\\dfrac{1}{90}$ de ángulo recto y es la unidad para medir ángulos.",
        },
        {
          kind: "facts",
          items: [
            { tex: "1^\\circ = 60'", label: "un grado, 60 minutos" },
            { tex: "1' = 60''", label: "un minuto, 60 segundos" },
          ],
        },
        {
          kind: "text",
          text: "Se llaman grados **sexagesimales** porque se dividen de 60 en 60. Su origen está en los babilonios, grandes astrónomos que medían ángulos para seguir las estrellas.",
        },
      ],
      visual: { kind: "anim", scene: "grado-minuto", beatMs: 3000 },
    },
    {
      id: "transportador",
      type: "slide",
      help: [
        {
          label: "¿Qué escala leo?",
          message: "La escala que empieza en $0^\\circ$ en el lado donde has apoyado el primer lado del ángulo.",
        },
        {
          label: "¿Y si el ángulo es mayor que $180^\\circ$?",
          message: "El transportador solo llega a $180^\\circ$: mides el ángulo que falta hasta la vuelta completa y lo restas de $360^\\circ$.",
        },
      ],
      title: "Medir con el transportador",
      blocks: [
        {
          kind: "steps",
          title: "Cómo se usa",
          items: [
            "Coloca el **centro** del transportador sobre el vértice.",
            "Apoya la línea de $0^\\circ$ sobre uno de los lados.",
            "Lee en la escala el número por el que pasa el otro lado.",
          ],
        },
        {
          kind: "text",
          text: "Mueve la abertura y observa la lectura. Para medir sobre el terreno se usan instrumentos más precisos: el sextante, el goniómetro y el teodolito.",
        },
      ],
      visual: { kind: "tool", tool: "transportador", params: { a: 47 } },
    },
    {
      id: "forma-correcta",
      type: "predict",
      help: [
        {
          label: "¿Qué no es correcto?",
          message: "Al escribir un ángulo en grados y minutos, los minutos tienen que ser **menos de 60**. Aquí $256'$ son mucho más.",
        },
        {
          label: "¿Cómo convierto?",
          message: "Divide $256$ entre $60$: el cociente son grados que se suman a los $24^\\circ$ y el resto son los minutos que quedan.",
        },
      ],
      title: "Escribir bien un ángulo",
      question:
        "Una calculadora te da como resultado un ángulo de 24° 256'. Esa forma no es correcta, porque 256′ superan un grado. ¿Cómo se escribe correctamente?",
      mode: "choice",
      choices: [
        { id: "a", label: "$28^\\circ\\,16'$" },
        {
          id: "b",
          label: "$26^\\circ\\,56'$",
          incorrectFeedback:
            "Has pasado a grados solo $200'$ como si fueran $2^\\circ$. Los minutos se agrupan de 60 en 60: $256 = 4 \\cdot 60 + 16$.",
        },
        {
          id: "c",
          label: "$28^\\circ\\,56'$",
          incorrectFeedback:
            "Los grados están bien, $24 + 4 = 28$, pero los minutos que sobran son $256 - 240 = 16$, no $56$.",
        },
        {
          id: "d",
          label: "$24^\\circ\\,16'$",
          incorrectFeedback:
            "Has dejado los grados como estaban. Los $4$ grados que salen de agrupar $256'$ hay que sumarlos: $24^\\circ + 4^\\circ$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$256' = 4 \\cdot 60' + 16' = 4^\\circ\\,16'$, y $24^\\circ + 4^\\circ\\,16' = 28^\\circ\\,16'$.",
    },
    {
      id: "suma",
      type: "slide",
      help: [
        {
          label: "¿Por qué llevo $1^\\circ$ y no $1'$?",
          message: "Porque $60'$ forman un grado: lo que pasa de $60$ en la columna de minutos se convierte en grados.",
        },
        {
          label: "¿Y si los minutos suman menos de 60?",
          message: "Entonces no llevas nada: se escribe el resultado de cada columna tal cual.",
        },
      ],
      title: "Sumar ángulos",
      blocks: [
        {
          kind: "rule",
          title: "Cómo se suma",
          text: "Se suman por separado **minutos con minutos** y **grados con grados**. Si los minutos pasan de $60$, se convierten en grados.",
        },
        {
          kind: "example",
          title: "Ejemplo",
          lines: [
            { math: "36^\\circ\\,45' + 82^\\circ\\,56' = 118^\\circ\\,101'", note: "sumando por columnas" },
            { math: "101' = 1^\\circ\\,41'", note: "pasamos 60′ a grados" },
            { math: "118^\\circ + 1^\\circ\\,41' = 119^\\circ\\,41'" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "angulos-columna", params: { op: "+", a: 36, b: 45, c: 82, d: 56 } },
    },
    {
      id: "resta",
      type: "slide",
      help: [
        {
          label: "¿Por qué $87^\\circ$ pasa a $86^\\circ$?",
          message: "Porque has gastado un grado para convertirlo en $60'$ y dárselos a los minutos. Los grados totales son los mismos.",
        },
        {
          label: "¿Y si el sustraendo es mayor?",
          message: "Entonces la resta no se puede hacer con números naturales: se supone siempre que el minuendo es mayor que el sustraendo.",
        },
      ],
      title: "Restar ángulos",
      blocks: [
        {
          kind: "rule",
          title: "Cómo se resta",
          text: "Si los minutos del minuendo son **menos** que los del sustraendo, se convierte $1^\\circ$ en $60'$ antes de restar.",
        },
        {
          kind: "example",
          title: "Ejemplo",
          lines: [
            { math: "87^\\circ\\,10' - 36^\\circ\\,20'", note: "$10'$ no llega a $20'$" },
            { math: "86^\\circ\\,70' - 36^\\circ\\,20'", note: "$1^\\circ = 60'$: $10' + 60' = 70'$" },
            { math: "= 50^\\circ\\,50'" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "angulos-columna", params: { op: "-", a: 87, b: 10, c: 36, d: 20 } },
    },
    {
      id: "suma-minutos",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Por los minutos: suma $17' + 49'$. Si el resultado pasa de $60'$, quita $60'$ y suma $1^\\circ$ a los grados.",
        },
        {
          label: "¿Cómo compruebo?",
          message: "Los minutos de la respuesta tienen que ser menos de $60$.",
        },
      ],
      title: "Los minutos del resultado",
      question:
        "Suma 47° 25' + 56° 11' + 17° 49'. ¿Cuántos minutos tiene el resultado, ya expresado correctamente? (escribe solo el número)",
      correctAnswers: ["25"],
      hint: "Suma primero los minutos y quita los grupos de $60'$.",
      explanation:
        "$25' + 11' + 49' = 85' = 1^\\circ\\,25'$. Los grados son $47 + 56 + 17 + 1 = 121$: el resultado es $121^\\circ\\,25'$.",
    },
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "¿Qué hago con los minutos que pasan de 60?",
          message: "Los agrupas de 60 en 60: el cociente son grados que se suman, y el resto son los minutos que quedan.",
        },
      ],
      title: "Multiplicar un ángulo por un número",
      blocks: [
        {
          kind: "rule",
          title: "Cómo se multiplica",
          text: "Se multiplican por el número los **grados** y los **minutos**; después los minutos que pasen de $60$ se pasan a grados.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(32°", "47′)", "·", "7"], active: [0, 3], note: "Multiplicamos por $7$ los grados y los minutos por separado." },
            { tokens: ["224°", "329′"], active: [1, 1], note: "$329'$ son más de $60'$: los agrupamos de $60$ en $60$." },
            { tokens: ["224°", "5°", "29′"], active: [1, 2], note: "$329' = 5 \\cdot 60' + 29' = 5^\\circ\\,29'$." },
            { tokens: ["229°", "29′"], fresh: [0, 1], note: "$224^\\circ + 5^\\circ = 229^\\circ$." },
          ],
        },
      },
    },
    {
      id: "division",
      type: "slide",
      help: [
        {
          label: "¿Qué hago con el resto de los grados?",
          message: "Lo conviertes en minutos (cada grado son $60'$) y lo sumas a los minutos que ya tenías.",
        },
        {
          label: "¿Y el resto de los minutos?",
          message: "Se queda como resto de la división: aquí $4'$ que no se pueden repartir más.",
        },
      ],
      title: "Dividir un ángulo entre un número",
      blocks: [
        {
          kind: "rule",
          title: "Cómo se divide",
          text: "Se dividen los **grados**; el resto se pasa a minutos y se suma a los que había. Después se dividen los minutos.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(97°", "15′)", ":", "7"], active: [0, 0], note: "Dividimos primero los grados: $97 : 7 = 13$, resto $6$." },
            { tokens: ["13°", "y", "6°", "15′"], active: [2, 3], note: "Sobran $6^\\circ = 360'$, que se suman a los $15'$." },
            { tokens: ["13°", "y", "375′", ":", "7"], active: [2, 4], note: "Dividimos los minutos: $375 : 7 = 53$, resto $4$." },
            { tokens: ["13°", "53′"], fresh: [0, 1], note: "El cociente es $13^\\circ\\,53'$ y sobran $4'$." },
          ],
        },
      },
    },
    {
      id: "triple",
      type: "predict",
      help: [
        {
          label: "¿Qué multiplico?",
          message: "Los grados y los minutos, cada uno por $3$. Después revisa si los minutos pasan de $60$.",
        },
        {
          label: "Un descarte rápido",
          message: "Los minutos no pueden quedar en $60$ o más en el resultado final: fíjate en las opciones.",
        },
      ],
      title: "Un ángulo repetido tres veces",
      question:
        "Un mecanismo gira cada vez 20° 25'. Después de tres giros iguales, ¿cuántos grados y minutos ha girado en total?",
      mode: "choice",
      choices: [
        { id: "a", label: "$61^\\circ\\,15'$" },
        {
          id: "b",
          label: "$60^\\circ\\,75'$",
          incorrectFeedback:
            "Has multiplicado bien ($60^\\circ$ y $75'$), pero te falta el último paso: $75'$ superan $60'$, así que $75' = 1^\\circ\\,15'$.",
        },
        {
          id: "c",
          label: "$60^\\circ\\,15'$",
          incorrectFeedback:
            "Has quitado los $60'$ de $75'$ pero te has olvidado de sumar ese grado a los $60^\\circ$.",
        },
        {
          id: "d",
          label: "$61^\\circ\\,75'$",
          incorrectFeedback:
            "Has sumado el grado que sale de los minutos, pero sin quitar esos $60'$: te han quedado $75'$ otra vez.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$(20^\\circ\\,25') \\cdot 3 = 60^\\circ\\,75' = 60^\\circ + 1^\\circ\\,15' = 61^\\circ\\,15'$.",
    },
    {
      id: "reparto",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Por los grados: $91 : 3 = 30$ y sobra $1^\\circ$. Ese grado son $60'$.",
        },
        {
          label: "¿Cuántos minutos quedan por repartir?",
          message: "Los $60'$ del grado que sobra más los $30'$ que ya había: $90'$. Divídelos entre $3$.",
        },
      ],
      title: "Repartir un ángulo",
      question:
        "Divide el ángulo 91° 30' entre 3. El cociente son 30° y unos minutos. ¿Cuántos minutos? (escribe solo el número)",
      correctAnswers: ["30"],
      hint: "Sobra $1^\\circ = 60'$, que se suman a los $30'$.",
      explanation: "$91^\\circ : 3 = 30^\\circ$ y sobra $1^\\circ = 60'$. Con los $30'$ hay $90'$, y $90' : 3 = 30'$: el resultado es $30^\\circ\\,30'$.",
    },
  ],
};
