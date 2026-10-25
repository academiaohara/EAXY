import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const problemasSistemas12bachLesson: InteractiveLesson = {
  slug: "problemas-sistemas-1-2bach",
  title: "11. Problemas con sistemas (I): billetes, cifras y edades",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Clave", message: "El paso difícil es traducir: cada frase del enunciado debe convertirse en una ecuación, y cada dato solo se usa una vez." }],
      title: "Del enunciado al sistema",
      blocks: [
        { kind: "steps", items: [
          "**Define las incógnitas** con su significado y unidades.",
          "**Traduce** cada frase a una ecuación lineal.",
          "**Resuelve** (Gauss, Cramer o la inversa).",
          "**Interpreta**: ¿son números positivos y enteros cuando el problema lo exige? Comprueba en el enunciado.",
        ] },
        { kind: "example", title: "Cajero automático", lines: [
          { math: "x = \\text{billetes de } 50,\\ y = \\text{billetes de } 20,\\ z = \\text{billetes de } 10" },
          { math: "\\begin{cases} x + y + z = 225 \\\\ 50x + 20y + 10z = 7000 \\\\ x + z = 2y \\end{cases}", note: "225 billetes; 7 000 €; billetes de 50 y 10 son el doble que los de 20" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-rouche-explorador", initial: [1, 1, 1, 225, 50, 20, 10, 7000, 1, -2, 1, 0], hint: "La tercera ecuación es x − 2y + z = 0. Comprueba que la solución es única y entera." },
    },
    {
      id: "check-billetes",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "De la 3.ª ecuación $x + z = 2y$; sustituye en la 1.ª: $3y = 225$." }],
      title: "Billetes de 20 €",
      question: "¿Cuántos billetes de $20$ € se depositaron? (solo el número)",
      correctAnswers: ["75"],
      explanation: "$x + z = 2y$ y $x + y + z = 225$ dan $3y = 225$, $y = 75$. Luego $x + z = 150$ y $50x + 10z = 7000 - 1500 = 5500$, de donde $x = 100$, $z = 50$.",
    },
    {
      id: "cifras",
      type: "slide",
      help: [{ label: "Número", message: "Un número de tres cifras $cdu$ vale $100c + 10d + u$." }],
      title: "Problemas con las cifras de un número",
      blocks: [
        { kind: "text", text: "«La suma de las tres cifras de un número es $18$. La cifra de las unidades es la suma de las decenas y las centenas. Si se invierte el orden, el número aumenta en $594$.»" },
        { kind: "example", title: "$c$ = centenas, $d$ = decenas, $u$ = unidades", lines: [
          { math: "\\begin{cases} c + d + u = 18 \\\\ u = c + d \\\\ (100u + 10d + c) - (100c + 10d + u) = 594 \\end{cases}" },
          { math: "u = 9,\\quad 99(u - c) = 594 \\Rightarrow u - c = 6 \\Rightarrow c = 3,\\ d = 6" },
        ] },
      ],
    },
    {
      id: "check-cifras",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$c = 3$, $d = 6$ y $u = 9$." }],
      title: "El número",
      question: "¿Cuál es el número del problema anterior? (solo el número)",
      correctAnswers: ["369"],
      explanation: "$c = 3$, $d = 6$, $u = 9$: el número es $369$. Comprobación: $3 + 6 + 9 = 18$; $9 = 3 + 6$; $963 - 369 = 594$ ✓.",
    },
    {
      id: "edades",
      type: "slide",
      help: [{ label: "Tiempo", message: "«Hace $k$ años» resta $k$ a cada edad; «dentro de $k$ años» suma $k$." }],
      title: "Problemas de edades",
      blocks: [
        { kind: "text", text: "Una familia: padre $p$, madre $m$ e hija $h$. Entre los tres suman $70$ años; hace cuatro años el padre tenía siete veces la edad de la hija; dentro de quince años la hija tendrá la cuarta parte de la suma de las edades del padre y de la madre." },
        { kind: "example", lines: [
          { math: "\\begin{cases} p + m + h = 70 \\\\ p - 4 = 7\\,(h - 4) \\\\ h + 15 = \\dfrac{(p + 15) + (m + 15)}{4} \\end{cases}" },
          { math: "\\begin{cases} p + m + h = 70 \\\\ p - 7h = -24 \\\\ p + m - 4h = 30 \\end{cases}", note: "sistema ordenado" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-rouche-explorador", initial: [1, 1, 1, 70, 1, 0, -7, -24, 1, 1, -4, 30], hint: "Las incógnitas se llaman x, y, z, pero aquí son p, m y h. Lee la solución como (padre, madre, hija)." },
    },
    {
      id: "check-traduccion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Hace $4$ años las edades eran $p - 4$ y $h - 4$." }],
      title: "Traducir una frase",
      question: "¿Qué ecuación traduce «hace cuatro años la edad del padre era siete veces la de la hija»?",
      choices: [
        { id: "a", label: "$p - 4 = 7\\,(h - 4)$" },
        { id: "b", label: "$p - 4 = 7h - 4$", incorrectFeedback: "Los cuatro años también hay que restarlos a la edad de la hija, y dentro del paréntesis." },
        { id: "c", label: "$p = 7\\,(h - 4)$", incorrectFeedback: "Falta restar los cuatro años a la edad del padre." },
        { id: "d", label: "$p + 4 = 7\\,(h + 4)$", incorrectFeedback: "Eso sería «dentro de cuatro años»." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Hace cuatro años el padre tenía $p - 4$ y la hija $h - 4$, y lo primero era siete veces lo segundo: $p - 4 = 7(h - 4)$.",
    },
    {
      id: "check-padre",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "De la 1.ª, $p + m = 70 - h$; de la 3.ª, $p + m = 4h + 30$. Iguala y despeja $h$; después $p = 7h - 24$." }],
      title: "La edad del padre",
      question: "¿Cuántos años tiene el padre? (solo el número)",
      correctAnswers: ["32"],
      explanation: "$70 - h = 4h + 30 \\Rightarrow h = 8$. Entonces $p = 7\\cdot 8 - 24 = 32$ y $m = 70 - 32 - 8 = 30$. Comprobación: hace $4$ años el padre tenía $28 = 7\\cdot 4$ y la hija $4$; dentro de $15$ años la hija tendrá $23 = (47 + 45)/4$.",
    },
  ],
};
