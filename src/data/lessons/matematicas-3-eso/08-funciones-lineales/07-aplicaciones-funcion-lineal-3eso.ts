import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const aplicacionesFuncionLineal3esoLesson: InteractiveLesson = {
  slug: "aplicaciones-funcion-lineal-3eso",
  title: "7. Aplicaciones y estudio conjunto de dos funciones",
  subtitle: TEMA_3ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "modelo",
      type: "slide",
      help: [
        {
          label: "Fijo y variable",
          message: "La cantidad fija es $n$ y lo que cambia por cada unidad de $x$ es $m$.",
        },
        {
          label: "Pendiente negativa",
          message: "Si algo disminuye con el tiempo (distancia que falta, agua que sale), la pendiente es negativa.",
        },
      ],
      title: "Modelar con funciones lineales",
      blocks: [
        {
          kind: "text",
          text: "Si una magnitud tiene una parte **fija** y otra que **crece de forma proporcional**, el modelo es $y = mx + n$.",
        },
        {
          kind: "example",
          title: "Un tren AVE sale de una ciudad a 750 km y viene a 200 km/h",
          lines: [
            { math: "\\text{Recorrido en } t \\text{ h: } 200t" },
            { math: "d = 750 - 200t", note: "distancia que le falta; pendiente −200, ordenada 750" },
          ],
        },
        {
          kind: "example",
          title: "Llamada: 0,30 € de establecimiento más 0,05 €/min",
          lines: [
            { math: "c = 0{,}30 + 0{,}05x" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "encuentro",
      type: "slide",
      help: [
        {
          label: "Misma distancia",
          message: "Se encuentran cuando han recorrido lo mismo: $4x = 10x - 5$.",
        },
        {
          label: "Es un sistema",
          message: "Igualar las dos ecuaciones es resolver el sistema $y = 4x$, $y = 10x - 5$ por igualación.",
        },
      ],
      title: "Estudio conjunto: el punto de corte",
      blocks: [
        {
          kind: "rule",
          text: "Para estudiar dos funciones lineales a la vez, se dibujan en los mismos ejes. Las coordenadas del **punto de corte** son la solución del **sistema** formado por sus ecuaciones.",
        },
        {
          kind: "example",
          title: "Peatón a 4 km/h; media hora después sale un ciclista a 10 km/h",
          lines: [
            { math: "y = 4x \\qquad y = 10\\left(x - \\tfrac{1}{2}\\right)" },
            { math: "4x = 10x - 5 \\Rightarrow 6x = 5 \\Rightarrow x = \\tfrac{5}{6}\\ \\text{h} = 50\\ \\text{min}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "rectas-encuentro" },
    },
    {
      id: "check-modelo",
      type: "predict",
      help: [
        {
          label: "Fijo y por minuto",
          message: "$0{,}80$ € es lo que se paga siempre; $0{,}50$ € se paga por cada minuto.",
        },
      ],
      title: "Elegir la función",
      question: "Una llamada a móvil cuesta $0{,}80$ € de establecimiento más $0{,}50$ € por minuto. ¿Qué función da el coste $y$ de $x$ minutos?",
      mode: "choice",
      choices: [
        { id: "a", label: "$y = 0{,}5x + 0{,}8$" },
        { id: "b", label: "$y = 0{,}8x + 0{,}5$", incorrectFeedback: "Se han intercambiado la parte fija y la parte por minuto." },
        { id: "c", label: "$y = 1{,}3x$", incorrectFeedback: "El establecimiento se paga una sola vez, no por minuto." },
        { id: "d", label: "$y = 0{,}5x - 0{,}8$", incorrectFeedback: "El establecimiento se suma." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Pendiente $0{,}5$ (coste por minuto) y ordenada $0{,}8$ (establecimiento).",
    },
    {
      id: "check-deposito",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Iguala",
          message: "Primer depósito: $240 + 9t$. Segundo: $300 + 4t$. Iguala los dos.",
        },
      ],
      title: "Dos depósitos",
      question: "Un depósito tiene $240$ l y recibe $9$ l/min. Otro tiene $300$ l y recibe $4$ l/min. ¿Al cabo de cuántos minutos tendrán la misma cantidad? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$240 + 9t = 300 + 4t \\Rightarrow 5t = 60 \\Rightarrow t = 12$ minutos.",
    },
    {
      id: "check-vaciar",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Variación por minuto",
          message: "Entra $30$ l/min y salen $80$ l/min: cada minuto el depósito pierde $50$ litros.",
        },
      ],
      title: "Vaciar un depósito",
      question: "Un depósito con $350$ l recibe $30$ l/min de una bomba y a la vez evacúa $80$ l/min por un desagüe. ¿Cuántos minutos tarda en vaciarse? (solo el número)",
      correctAnswers: ["7"],
      explanation: "Pierde $50$ l/min: $350 - 50t = 0 \\Rightarrow t = 7$ minutos.",
    },
  ],
};
