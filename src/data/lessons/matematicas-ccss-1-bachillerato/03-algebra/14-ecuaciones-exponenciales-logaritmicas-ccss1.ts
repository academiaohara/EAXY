import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_3_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesExponencialesLogaritmicasCcss1Lesson: InteractiveLesson = {
  slug: "ecuaciones-exponenciales-logaritmicas-ccss1",
  title: "14. Ecuaciones exponenciales y logarítmicas",
  subtitle: TEMA_CCSS1_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "exponenciales",
      type: "slide",
      help: [{ label: "Idea", message: "Si dos potencias de la misma base son iguales, los exponentes son iguales: $a^m = a^n \\Rightarrow m = n$." }],
      title: "Ecuaciones exponenciales: igualar bases",
      blocks: [
        { kind: "definition", text: "Una **ecuación exponencial** tiene la incógnita en un **exponente**. Si puedes escribir los dos miembros como potencias de la misma base, **se igualan los exponentes**." },
        { kind: "text", text: "Cuando la incógnita aparece en varias potencias de la misma base, se hace el cambio $t = a^x$ y queda una ecuación algebraica." },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["2^(2x)", "=", "1/16"], active: [0, 2], note: "escribimos $\\tfrac1{16}$ como potencia de $2$." },
            { tokens: ["2^(2x)", "=", "2^(−4)"], active: [0, 2], note: "misma base: igualamos los exponentes." },
            { tokens: ["2x", "=", "−4"], active: [0, 2], note: "despejamos." },
            { tokens: ["x", "=", "−2"], fresh: [2, 2], note: "solución: $x = -2$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-base",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$81 = 3^4$." }],
      title: "Misma base",
      question: "Resuelve $3^{x + 1} = 81$. (solo el valor de $x$)",
      correctAnswers: ["3"],
      explanation: "$81 = 3^4$, así que $x + 1 = 4$ y $x = 3$.",
    },
    {
      id: "check-cambio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$2^{x+2} = 4\\cdot 2^x$. Con $t = 2^x$: $4t + t = 20$." }],
      title: "Cambio de variable",
      question: "Resuelve $2^{x + 2} + 2^x = 20$. (solo el valor de $x$)",
      correctAnswers: ["2"],
      explanation: "Con $t = 2^x$: $4t + t = 20 \\Rightarrow t = 4 \\Rightarrow 2^x = 4 \\Rightarrow x = 2$.",
    },
    {
      id: "logaritmicas",
      type: "slide",
      help: [{ label: "Idea", message: "Se aplican las propiedades de los logaritmos hasta tener un logaritmo en cada miembro; entonces los argumentos son iguales. Después se comprueba el dominio." }],
      title: "Ecuaciones logarítmicas: eliminar logaritmos",
      blocks: [
        { kind: "definition", text: "Una **ecuación logarítmica** tiene la incógnita en el argumento de algún logaritmo. Se usan las propiedades para reducirla a $\\log A = \\log B$, de donde $A = B$." },
        { kind: "warning", title: "Comprobación del dominio", text: "El argumento de un logaritmo debe ser **positivo**. Las soluciones que lo hagan cero o negativo en la ecuación original se descartan, igual que en las ecuaciones radicales." },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["2log x", "−", "2log(x−1)", "=", "log 4"], active: [0, 4], note: "agrupamos con las propiedades del cociente y la potencia." },
            { tokens: ["log x²/(x−1)²", "=", "log 4"], active: [0, 2], note: "ya hay un logaritmo en cada miembro: igualamos argumentos." },
            { tokens: ["x²", "=", "4(x−1)²"], active: [0, 2], note: "desarrollamos y pasamos todo a un miembro." },
            { tokens: ["3x²", "−", "8x", "+", "4", "=", "0"], active: [0, 6], note: "soluciones: $x = 2$ y $x = \\tfrac23$." },
            { tokens: ["x", "=", "2"], fresh: [2, 2], note: "$x = \\tfrac23$ da $\\log(x-1)$ con argumento negativo: se descarta." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-suma-logs",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\log x + \\log (x - 3) = \\log\\big(x(x-3)\\big) = 1 = \\log 10$." }],
      title: "Suma de logaritmos",
      question: "Resuelve $\\log x + \\log(x - 3) = 1$. (solo la solución válida; logaritmos decimales)",
      correctAnswers: ["5"],
      explanation: "$x(x - 3) = 10 \\Rightarrow x^2 - 3x - 10 = 0 \\Rightarrow x = 5$ ó $x = -2$. Con $x = -2$ los argumentos son negativos: se descarta. Vale $x = 5$.",
    },
    {
      id: "check-definicion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\log_2 y = 4 \\Leftrightarrow y = 2^4$." }],
      title: "Con la definición de logaritmo",
      question: "Resuelve $\\log_2(x + 3) = 4$. (solo el valor de $x$)",
      correctAnswers: ["13"],
      explanation: "$x + 3 = 2^4 = 16$, luego $x = 13$.",
    },
    {
      id: "trigonometricas",
      type: "slide",
      help: [{ label: "Idea", message: "En una ecuación trigonométrica hay infinitas soluciones: las del primer giro más vueltas completas." }],
      title: "Ecuaciones trigonométricas sencillas",
      blocks: [
        { kind: "text", text: "Para $\\operatorname{sen} x = \\tfrac12$ hay dos ángulos en $[0°, 360°)$: uno en el primer cuadrante y otro en el segundo, con el mismo seno. Después se añaden vueltas completas." },
        {
          kind: "example",
          title: "sen x = 1/2",
          lines: [
            { math: "x = 30° + 360°k", note: "primer cuadrante" },
            { math: "x = 150° + 360°k", note: "segundo cuadrante: 180° − 30°" },
            { math: "x = \\dfrac{\\pi}{6} + 2k\\pi \\ \\text{ ó } \\ x = \\dfrac{5\\pi}{6} + 2k\\pi", note: "en radianes" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "ecuacion-trig-explorador", initial: [0, 1], hint: "El seno vale 1/2 en 30° y en 150°. Cambia a coseno o tangente y observa las soluciones." },
    },
    {
      id: "check-trig",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Los dos ángulos con el mismo seno suman $180°$: $180° - 30°$." }],
      title: "La segunda solución",
      question: "Además de $x = 30°$, ¿qué otro ángulo de $[0°, 360°)$ cumple $\\operatorname{sen} x = \\tfrac12$? (en grados, solo el número)",
      correctAnswers: ["150"],
      explanation: "$\\operatorname{sen}(180° - x) = \\operatorname{sen} x$, luego $180° - 30° = 150°$. (Ojo: $120°$ tiene seno $\\tfrac{\\sqrt3}{2}$, no $\\tfrac12$.)",
    },
  ],
};
