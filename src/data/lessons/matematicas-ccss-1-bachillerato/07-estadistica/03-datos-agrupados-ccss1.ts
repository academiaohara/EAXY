import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_7_SUBTITLE } from "@/data/lessons/shared";

export const datosAgrupadosCcss1Lesson: InteractiveLesson = {
  slug: "datos-agrupados-ccss1",
  title: "3. Datos agrupados en intervalos",
  subtitle: TEMA_CCSS1_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intervalos",
      type: "slide",
      help: [{ label: "Pérdida de información", message: "Lo que se gana en manejabilidad se pierde en información: los resultados con datos agrupados son aproximados." }],
      title: "Cuando hay muchos valores distintos",
      blocks: [
        { kind: "text", text: "Con variables continuas la tabla sería enorme. Se agrupan los datos en **intervalos de clase** $[l_i, L_i[$ que no se solapan y cubren todo el recorrido." },
        { kind: "facts", items: [
          { tex: "c_i = \\dfrac{l_i + L_i}{2}", label: "marca de clase (valor representativo)" },
          { tex: "a_i = L_i - l_i", label: "amplitud del intervalo" },
          { tex: "R_e = x_{\\max} - x_{\\min}", label: "recorrido" },
        ] },
        { kind: "steps", items: [
          "Se calcula el **recorrido** $R_e$.",
          "Se elige el **número de clases**: $\\sqrt{n}$ si $n < 50$ (o $\\log_2 n + 1$, fórmula de Sturges, si es mayor).",
          "La **amplitud** es $R_e/\\text{nº de clases}$, redondeada para que los extremos sean cómodos.",
          "Los intervalos son cerrados por la izquierda y abiertos por la derecha (salvo el último).",
        ] },
      ],
      visual: { kind: "tool", tool: "agrupar-explorador", params: { a: 6 }, hint: "Cambia entre 6, 8 y 10 intervalos con las estaturas de 4.º: ves el recorrido, la amplitud, las marcas de clase y el histograma." },
    },
    {
      id: "hoteles",
      type: "slide",
      help: [{ label: "Ajustar", message: "Como $28/6 \\approx 4{,}67$, se toma amplitud $5$ y el primer extremo $32{,}5$ en lugar de $33$, para que todos los intervalos sean $[32{,}5;\\ 37{,}5[$, $[37{,}5;\\ 42{,}5[$…" }],
      title: "El precio de 40 habitaciones de hotel",
      blocks: [
        { kind: "example", title: "Agrupar en 6 clases", lines: [
          { math: "R_e = 61 - 33 = 28\\qquad \\sqrt{40}\\approx 6\\ \\text{clases}\\qquad a = 5" },
          { math: "n_i:\\ 3,\\ 8,\\ 14,\\ 6,\\ 4,\\ 5\\qquad c_i:\\ 35,\\ 40,\\ 45,\\ 50,\\ 55,\\ 60" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-mas47",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Superior a $47{,}5$: intervalos cuarto, quinto y sexto: $6 + 4 + 5$." }],
      title: "Hoteles caros",
      question: "¿Cuántos de los $40$ hoteles cuestan más de $47{,}5$ €? (solo el número)",
      correctAnswers: ["15"],
      explanation: "$6 + 4 + 5 = 15$ hoteles.",
    },
    {
      id: "check-porcentaje",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Como mucho $42{,}5$: primera y segunda clase, $3 + 8 = 11$ hoteles." }],
      title: "Hoteles baratos",
      question: "¿Qué porcentaje de hoteles cuesta como mucho $42{,}5$ €? (solo el número, en %)",
      correctAnswers: ["27,5", "27.5"],
      explanation: "$\\dfrac{3 + 8}{40}\\cdot 100 = 27{,}5\\,\\%$.",
    },
    {
      id: "check-marca",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Punto medio de $[42{,}5;\\ 47{,}5[$." }],
      title: "Marca de clase",
      question: "¿Cuál es la marca de clase del intervalo $[42{,}5;\\ 47{,}5[$? (solo el número)",
      correctAnswers: ["45"],
      explanation: "$c = \\dfrac{42{,}5 + 47{,}5}{2} = 45$.",
    },
    {
      id: "check-amplitud",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Recorrido $28$, número de clases $6$." }],
      title: "Amplitud de las clases",
      question: "Con recorrido $R_e = 28$ y $6$ clases, la amplitud teórica es $\\frac{28}{6} \\approx 4{,}67$. ¿Qué se hace en la práctica?",
      choices: [
        { id: "a", label: "Redondear a $5$ y ajustar los extremos ($32{,}5$ a $62{,}5$) para que los intervalos sean cómodos" },
        { id: "b", label: "Usar intervalos de amplitud $4{,}67$ y extremos con muchos decimales", incorrectFeedback: "Se podría, pero resulta incómodo; se prefiere una amplitud sencilla." },
        { id: "c", label: "Quitar el dato mayor", incorrectFeedback: "No se descartan datos: los intervalos deben cubrir todo el recorrido." },
        { id: "d", label: "Usar solo $5$ clases", incorrectFeedback: "Cambiar el número de clases no resuelve el redondeo; lo habitual es ajustar la amplitud." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con amplitud $5$ y primer extremo $32{,}5$ se cubren los datos desde $33$ hasta $61$ con seis intervalos exactos.",
    },
  ],
};
