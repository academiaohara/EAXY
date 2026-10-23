import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_10_SUBTITLE } from "@/data/lessons/shared";

export const elementosSistemaControlLesson: InteractiveLesson = {
  slug: "elementos-sistema-control",
  title: "2. Elementos de un sistema de control",
  subtitle: TEMA_TI2_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      help: [{ label: "¿Mecánico o electrónico?", message: "Los primeros reguladores eran mecánicos (levas, engranajes, palancas, masas giratorias). Hoy esas funciones las hacen la electrónica y la informática." }],
      title: "Quién es quién en el lazo",
      blocks: [
        { kind: "text", text: "Un sistema de control trabaja con la información de los **sensores** y, tras procesarla, la usa para activar o desactivar los **actuadores**. Aprende el vocabulario: es el que usarás en todos los esquemas." },
        { kind: "steps", items: [
          "**Mando o selector**: Fija el valor deseado (un potenciómetro, el botón de temperatura)",
          "**Señal de referencia**: La que genera un transductor a partir de la señal de mando",
          "**Salida o variable controlada**: Valor que debe mantenerse en el valor fijado",
          "**Unidad de control**: Genera la acción de gobierno sobre la planta sin la acción del operador",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "medida",
      type: "slide",
      help: [{ label: "¿Y el filtro?", message: "El filtro evita que señales perturbadoras por encima o por debajo de unos valores prefijados hagan responder al sistema." }],
      title: "Medir, comparar, actuar",
      blocks: [
        { kind: "definition", text: "**Captador o medidor**: transductor que da, a partir de la variable de salida, un resultado comparable con la señal de entrada (elemento de realimentación)." },
        { kind: "definition", text: "**Comparador**: calcula la **señal activa o error**, diferencia entre la señal de entrada y la realimentada." },
        { kind: "definition", text: "**Amplificador**: multiplica por una constante el nivel de la señal y puede cambiar el tipo de energía por otra de mayor potencia («amplificador de potencia»)." },
        { kind: "definition", text: "**Actuador**: interviene con potencia elevada sobre la planta o proceso a controlar." },
        { kind: "warning", text: "Las **perturbaciones** son señales indeseadas que alteran la salida. Pueden ser **internas** (se generan dentro del sistema) o **externas** (se generan fuera y entran como una entrada más)." },
      ],
      visual: { kind: "anim", scene: "lazo-abierto-cerrado", beatMs: 5600 },
    },
    {
      id: "clasifica-elementos",
      type: "classify",
      help: [{ label: "Pista", message: "Sensor → capta la salida. Comparador → resta. Actuador → potencia sobre la planta. Mando → fija la consigna." }],
      title: "¿Qué papel juega?",
      question: "Asigna cada elemento del depósito de agua con su función.",
      groups: [
        { id: "mando", label: "Mando / consigna", tone: "cobalt" },
        { id: "captador", label: "Captador", tone: "violet" },
        { id: "actuador", label: "Actuador", tone: "amber" },
      ],
      items: [
        { id: "a", text: "El tornillo que fija el nivel deseado", group: "mando" },
        { id: "b", text: "El potenciómetro de un horno", group: "mando" },
        { id: "c", text: "La boya que detecta el nivel de la cisterna", group: "captador" },
        { id: "d", text: "El termómetro dentro del lazo de temperatura", group: "captador" },
        { id: "e", text: "La válvula que deja entrar el agua", group: "actuador" },
        { id: "f", text: "El servomotor que abre la mariposa de admisión", group: "actuador" },
      ],
      hint: "¿Fija un valor, lo mide, o actúa con potencia?",
      explanation: "El mando fija el valor deseado, el captador lo mide en la salida y el actuador interviene con potencia.",
    },
    {
      id: "fotograma",
      type: "slide",
      help: [{ label: "¿Para qué sirve?", message: "El fotograma indica dónde actúa una fuerza o dónde hay una deformación; el cronograma permite predecir y planificar (producción de energía, abastecimiento de agua…)." }],
      title: "Fotogramas y cronogramas",
      blocks: [
        { kind: "definition", text: "**Estado o fotograma**: conjunto de valores de las variables del sistema en un instante dado (el campo de temperaturas de un depósito, la foto en planta de una fábrica)." },
        { kind: "definition", text: "**Evolución o cronograma**: secuencia temporal de una o más variables en un punto característico (el nivel del pantano a lo largo del año). Conviene usar ejes de tiempo sincronizados." },
        { kind: "text", text: "Un **osciloscopio** muestra el cronograma de dos señales con la misma escala de tiempo, y un registrador multicanal dibuja gráficos paralelos al eje de tiempos." },
      ],
      arrange: "stack",
    },
    {
      id: "check-error",
      type: "predict",
      help: [{ label: "Pista", message: "Se llama señal activa." }],
      title: "Salida del detector de error",
      question: "El detector de error nos produce en su salida:",
      mode: "choice",
      choices: [
        { id: "ok", label: "La señal activa: la diferencia entre la referencia y la realimentación" },
        { id: "ref", label: "La señal de referencia que viene de la señal de mando", incorrectFeedback: "Esa es una de sus entradas, no su salida." },
        { id: "suma", label: "La suma de la señal controlada y la realimentada", incorrectFeedback: "En realimentación negativa se resta." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "El comparador resta: $e = r - y$.",
    },
  ],
};
