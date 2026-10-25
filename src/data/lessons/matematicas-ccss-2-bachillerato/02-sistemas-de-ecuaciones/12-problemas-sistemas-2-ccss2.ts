import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_2_SUBTITLE } from "@/data/lessons/shared";

export const problemasSistemas2Ccss2Lesson: InteractiveLesson = {
  slug: "problemas-sistemas-2-ccss2",
  title: "12. Problemas con sistemas (II): mezclas e inversiones",
  subtitle: TEMA_CCSS2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cafe",
      type: "slide",
      help: [{ label: "Mezclas", message: "En una mezcla se conservan dos cosas: la **cantidad total** y el **coste total** (suma de cantidad × precio)." }],
      title: "Mezclas: el café",
      blocks: [
        { kind: "text", text: "Hay tres cafés de $6$, $8$ y $10$ €/kg. Se quiere preparar una mezcla de $80$ kg que salga a $7$ €/kg, y del primero debe entrar el doble del segundo más el tercero." },
        { kind: "example", title: "$x$, $y$, $z$ = kg de cada café", lines: [
          { math: "\\begin{cases} x + y + z = 80 \\\\ 6x + 8y + 10z = 7\\cdot 80 = 560 \\\\ x = 2y + z \\end{cases}" },
          { math: "x - 2y - z = 0", note: "tercera ecuación ordenada" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-rouche-explorador", initial: [1, 1, 1, 80, 6, 8, 10, 560, 1, -2, -1, 0], hint: "Comprueba la solución con las condiciones del enunciado: suma 80 kg, coste 560 € y x = 2y + z." },
    },
    {
      id: "check-cafe",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Sustituye $x = 2y + z$ en las otras dos: $3y + 2z = 80$ y $5y + 4z = 140$." }],
      title: "Kilos del primer café",
      question: "¿Cuántos kg del café de $6$ €/kg hay que poner? (solo el número)",
      correctAnswers: ["50"],
      explanation: "De $3y + 2z = 80$ y $5y + 4z = 140$ sale $y = 20$ y $z = 10$; entonces $x = 2\\cdot 20 + 10 = 50$. Comprobación: $50 + 20 + 10 = 80$ y $300 + 160 + 100 = 560$ ✓.",
    },
    {
      id: "inversion",
      type: "slide",
      help: [{ label: "Porcentajes", message: "Un $10\\,\\%$ de beneficio sobre $A$ se escribe $0{,}10\\,A$; para evitar decimales, multiplica la ecuación por $100$." }],
      title: "Inversiones",
      blocks: [
        { kind: "text", text: "Una persona invierte $72\\,000$ € en tres empresas A, B y C y obtiene $5\\,520$ € de beneficios. En B invirtió el triple que en A y C juntas. Los beneficios fueron del $10\\,\\%$ en A, $8\\,\\%$ en B y $5\\,\\%$ en C." },
        { kind: "example", lines: [
          { math: "\\begin{cases} A + B + C = 72\\,000 \\\\ B = 3\\,(A + C) \\\\ 0{,}10A + 0{,}08B + 0{,}05C = 5\\,520 \\end{cases} \\iff \\begin{cases} A + B + C = 72\\,000 \\\\ -3A + B - 3C = 0 \\\\ 10A + 8B + 5C = 552\\,000 \\end{cases}" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-rouche-explorador", initial: [1, 1, 1, 72000, -3, 1, -3, 0, 10, 8, 5, 552000], hint: "Las incógnitas x, y, z son A, B y C. Comprueba que B es el triple de A y C juntas." },
    },
    {
      id: "check-traduccion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "«El triple de A y C juntas» es $3\\cdot(A + C)$." }],
      title: "Traducir una frase",
      question: "¿Qué ecuación expresa «en B invirtió el triple que en A y C juntas»?",
      choices: [
        { id: "a", label: "$B = 3\\,(A + C)$" },
        { id: "b", label: "$B = 3A + C$", incorrectFeedback: "Falta el paréntesis: el triple se aplica a la suma de A y C." },
        { id: "c", label: "$B + 3 = A + C$", incorrectFeedback: "«El triple» es multiplicar por $3$, no sumar $3$." },
        { id: "d", label: "$3B = A + C$", incorrectFeedback: "Eso diría que A y C juntas son el triple de B: justo al revés." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El enunciado dice que B es el triple de $A + C$: $B = 3(A + C)$, es decir, $-3A + B - 3C = 0$.",
    },
    {
      id: "check-c",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "De las dos primeras: $B = 54\\,000$ y $A + C = 18\\,000$. Después, $10A + 5C = 552\\,000 - 8\\cdot 54\\,000 = 120\\,000$." }],
      title: "Inversión en C",
      question: "¿Cuántos euros invirtió en la empresa C? (solo el número)",
      correctAnswers: ["12000"],
      explanation: "$B = 54\\,000$ y $A + C = 18\\,000$. De $10A + 5C = 120\\,000$ resulta $2A + C = 24\\,000$, luego $A = 6\\,000$ y $C = 12\\,000$.",
    },
    {
      id: "check-beneficio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El beneficio de B es el $8\\,\\%$ de $54\\,000$ €." }],
      title: "Beneficio de B",
      question: "¿Cuántos euros de beneficio produjo la empresa B? (solo el número)",
      correctAnswers: ["4320"],
      explanation: "$0{,}08\\cdot 54\\,000 = 4\\,320$ €. Los beneficios de A ($600$) y C ($600$) suman con el de B los $5\\,520$ €.",
    },
  ],
};
