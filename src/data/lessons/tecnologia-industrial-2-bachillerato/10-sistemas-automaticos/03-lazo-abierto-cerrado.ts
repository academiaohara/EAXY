import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_10_SUBTITLE } from "@/data/lessons/shared";

export const lazoAbiertoCerradoLesson: InteractiveLesson = {
  slug: "lazo-abierto-cerrado",
  title: "3. Control en lazo abierto y en lazo cerrado",
  subtitle: TEMA_TI2_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "abierto",
      type: "slide",
      help: [{ label: "¿Y la variable tiempo?", message: "En un lazo abierto importa mucho el tiempo: el tostador está bien «calibrado» si, para el pan de siempre, el tiempo programado da el tostado deseado. Si cambia el pan, no se entera." }],
      title: "Lazo abierto: sin mirar el resultado",
      blocks: [
        { kind: "definition", text: "En un sistema de **lazo abierto** la señal de salida **no influye** en la acción de control. Cualquier perturbación no considerada en su ajuste afecta al resultado y el sistema no puede corregirla." },
        { kind: "example", title: "Ejemplos de la vida diaria", lines: [
          { math: "\\text{Tostador de pan, lavadora, motor derivación}" },
        ] },
        { kind: "text", text: "En la figura del libro, un operario mueve un potenciómetro; el amplificador, el imán proporcional y la válvula reguladora ajustan el caudal. Pero si cambia la demanda **nadie** mueve el potenciómetro: el caudal no sigue a la demanda." },
      ],
      arrange: "stack",
    },
    {
      id: "anim",
      type: "slide",
      help: [{ label: "¿Dónde se «cierra» el lazo?", message: "En el captador y el comparador: la salida vuelve a la entrada mediante la realimentación." }],
      title: "Del lazo abierto al cerrado",
      blocks: [
        { kind: "rule", title: "Lazo cerrado", formula: "e = r - y", text: "Existe **realimentación**: el captador mide la salida y un comparador la resta de la referencia. La **señal activa o de error** entra en el regulador, que corrige." },
      ],
      visual: { kind: "anim", scene: "lazo-abierto-cerrado", beatMs: 5600 },
    },
    {
      id: "senales",
      type: "slide",
      help: [{ label: "¿Por qué 4–20 mA?", message: "Con un rango mínimo de 4 mA (no 0) se distingue una señal baja de un cable cortado." }],
      title: "Señales y regulador",
      blocks: [
        { kind: "text", text: "A veces la señal controlada y la de referencia **no son de la misma naturaleza** (una velocidad y una tensión): el captador la convierte en otra que los demás elementos entiendan." },
        { kind: "steps", title: "Señales normalizadas", items: [
          "**Neumáticas**: variables que oscilan linealmente entre $0{,}2$ y $1\\ \\text{kg/cm}^2$.",
          "**Eléctricas**: entre $4$ y $20$ mA, o entre $1$ y $5$ V en continua.",
        ] },
        { kind: "text", text: "El **regulador o controlador** actúa de modo que la variable controlada siga a la referencia y corrija perturbaciones con la **máxima rapidez**, la **máxima exactitud** y las **mínimas oscilaciones**. Su salida es la **señal manipulada o correctora**." },
      ],
      arrange: "stack",
    },
    {
      id: "explora-lazo",
      type: "slide",
      help: [{ label: "¿Por qué no llega al 100 %?", message: "Con regulador solo proporcional el error es $(r-d)/(1+K_pG)$: se reduce con la ganancia pero no se anula." }],
      title: "Aplica una perturbación",
      blocks: [{ kind: "text", text: "Con la herramienta, mete una perturbación $d$ y compara la salida de los dos sistemas. Después sube la ganancia del regulador y observa qué le pasa al error del lazo cerrado." }],
      visual: { kind: "tool", tool: "lazo-perturbacion-explorador", params: { a: 50, b: -20, c: 10 } },
    },
    {
      id: "check-abs",
      type: "predict",
      help: [{ label: "Pista", message: "El ABS mide la velocidad de cada rueda y corrige la presión de frenado." }],
      title: "El ABS",
      question: "El sistema ABS de un automóvil es:",
      mode: "choice",
      choices: [
        { id: "cerrado", label: "Un control en lazo cerrado" },
        { id: "abierto", label: "Un control en lazo abierto", incorrectFeedback: "Mide la velocidad de las ruedas y la realimenta: hay lazo cerrado." },
        { id: "num", label: "Un sistema de control numérico", incorrectFeedback: "No tiene que ver con las máquinas CNC." },
        { id: "sigla", label: "Solo unas siglas de un método de frenada", incorrectFeedback: "Es un sistema real con sensores, unidad de control y actuadores." },
      ],
      correctChoiceId: "cerrado",
      shuffleChoices: true,
      explanation: "El ABS detecta el bloqueo de una rueda por su velocidad y reduce la presión de frenado hasta recuperarla: realimentación pura.",
    },
    {
      id: "check-inconveniente",
      type: "predict",
      help: [{ label: "Pista", message: "Recuerda qué no sabe hacer un lazo abierto." }],
      title: "Inconveniente del lazo abierto",
      question: "El principal inconveniente de un sistema en lazo abierto es que:",
      mode: "choice",
      choices: [
        { id: "pert", label: "Es susceptible a las perturbaciones y ocasiona errores en la salida" },
        { id: "caro", label: "Es más caro que uno en lazo cerrado", incorrectFeedback: "Al contrario: al no llevar captador ni comparador suele ser más barato." },
        { id: "estab", label: "No hay problemas de estabilidad", incorrectFeedback: "Eso es una ventaja, no un inconveniente." },
        { id: "calidad", label: "Necesita componentes de mayor calidad", incorrectFeedback: "Es al revés." },
      ],
      correctChoiceId: "pert",
      shuffleChoices: true,
      explanation: "Sin realimentación no puede corregir los efectos de las perturbaciones. En cambio es estable y sencillo.",
    },
    {
      id: "check-captador",
      type: "predict",
      help: [{ label: "Pista", message: "Mide la salida y la convierte en señal." }],
      title: "El termómetro",
      question: "Un termómetro dentro de un sistema de control de temperatura es:",
      mode: "choice",
      choices: [
        { id: "captador", label: "Un captador" },
        { id: "regulador", label: "Un regulador", incorrectFeedback: "El regulador decide la acción; el termómetro solo mide." },
        { id: "detector", label: "Un detector de error", incorrectFeedback: "El detector compara dos señales: este solo mide una." },
        { id: "ampli", label: "Un amplificador de señal", incorrectFeedback: "No aumenta la potencia de nada." },
      ],
      correctChoiceId: "captador",
      shuffleChoices: true,
      explanation: "El captador convierte la variable de salida en una señal comparable con la de entrada.",
    },
  ],
};
