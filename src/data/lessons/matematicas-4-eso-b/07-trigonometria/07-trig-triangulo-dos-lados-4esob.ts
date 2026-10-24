import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigTrianguloDosLados4esobLesson: InteractiveLesson = {
  slug: "trig-triangulo-dos-lados-4esob",
  title: "7. Resolver un triángulo rectángulo: dos lados",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [
        { label: "Resolver", message: "Resolver un triángulo es hallar **todos** sus elementos desconocidos: los tres lados y los tres ángulos." },
        { label: "Ángulos agudos", message: "Los dos ángulos agudos suman $90°$: si conoces uno, el otro es su complementario." },
      ],
      title: "Conocidos dos lados",
      blocks: [
        { kind: "definition", text: "**Resolver** un triángulo es calcular todos sus lados y ángulos a partir de algunos datos." },
        { kind: "steps", items: ["El tercer lado, con el **teorema de Pitágoras**.", "Cada ángulo agudo, con la razón que relaciona los dos lados conocidos y la **función inversa** de la calculadora.", "El otro ángulo agudo es el complementario: $90° - \\alpha$."] },
      ],
      visual: { kind: "tool", tool: "trig-resolver-explorador", params: { n: 1, c: 17, d: 40 }, hint: "Con catetos 17 y 40 obtienes α = 23° 1′ 32″, como en el libro (aquí opuesto 17, contiguo 40)." },
    },
    {
      id: "check-hipotenusa",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pitágoras", message: "$a = \\sqrt{17^2 + 40^2} = \\sqrt{289 + 1\\,600} = \\sqrt{1\\,889}$." }],
      title: "La hipotenusa",
      question: "Los catetos de un triángulo rectángulo miden $17$ cm y $40$ cm. ¿Cuánto mide la hipotenusa? (en cm, redondea a las centésimas)",
      correctAnswers: ["43,46", "43.46"],
      explanation: "$a = \\sqrt{17^2 + 40^2} = \\sqrt{1\\,889} \\approx 43{,}46$ cm.",
    },
    {
      id: "angulos",
      type: "slide",
      help: [{ label: "Qué razón", message: "Con los dos catetos, la razón que los relaciona es la tangente: opuesto / contiguo." }],
      title: "Los ángulos con la función inversa",
      blocks: [
        { kind: "example", title: "Catetos 17 y 40", lines: [{ math: "\\operatorname{tg}\\alpha = \\dfrac{17}{40} = 0{,}425" }, { math: "\\alpha = \\operatorname{tg}^{-1}0{,}425 = 23°\\,1'\\,32''" }, { math: "\\beta = 90° - 23°\\,1'\\,32'' = 66°\\,58'\\,28''" }] },
        { kind: "warning", text: "Elige la razón que use los **dos lados que tienes**. Si tienes opuesto e hipotenusa, es el seno; contiguo e hipotenusa, el coseno." },
      ],
    },
    {
      id: "check-tangente",
      type: "predict",
      mode: "choice",
      help: [{ label: "Qué dos lados", message: "Los catetos son opuesto y contiguo al ángulo agudo $\\alpha$. La razón que usa exactamente esos dos lados es la tangente." }],
      title: "¿Qué razón uso?",
      question: "Conoces los dos **catetos** de un triángulo rectángulo y quieres un ángulo agudo. ¿Qué razón es la más directa?",
      choices: [
        { id: "a", label: "La tangente" },
        { id: "b", label: "El seno", incorrectFeedback: "El seno necesita la hipotenusa, que aún no tienes (aunque podrías calcularla con Pitágoras)." },
        { id: "c", label: "El coseno", incorrectFeedback: "El coseno necesita la hipotenusa, que aún no tienes." },
        { id: "d", label: "Ninguna: solo se puede con Pitágoras", incorrectFeedback: "Pitágoras da lados, no ángulos. Para el ángulo hace falta una razón trigonométrica." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La tangente relaciona los dos catetos directamente: $\\operatorname{tg}\\alpha = \\dfrac{\\text{opuesto}}{\\text{contiguo}}$.",
    },
    {
      id: "check-escalera",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Coseno", message: "La escalera es la hipotenusa ($3$ m) y la distancia a la pared, el cateto contiguo ($1{,}2$ m): $\\cos\\alpha = \\dfrac{1{,}2}{3} = 0{,}4$." }],
      title: "Una escalera apoyada",
      question: "Una escalera de $3$ m está apoyada en una pared con su base a $1{,}2$ m de ella. ¿Cuántos grados **enteros** forma con el suelo? (solo la parte entera)",
      correctAnswers: ["66"],
      explanation: "$\\cos\\alpha = 1{,}2/3 = 0{,}4 \\Rightarrow \\alpha = \\cos^{-1}0{,}4 \\approx 66°\\,25'\\,19''$. La parte entera es $66$.",
    },
    {
      id: "check-complementario",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Suman 90°", message: "En un triángulo los tres ángulos suman $180°$; el recto ya ocupa $90°$." }],
      title: "El otro ángulo agudo",
      question: "En un triángulo rectángulo un ángulo agudo mide $37°$. ¿Cuántos grados mide el otro ángulo agudo? (solo el número)",
      correctAnswers: ["53"],
      explanation: "$90° - 37° = 53°$: los dos ángulos agudos son complementarios.",
    },
  ],
};
