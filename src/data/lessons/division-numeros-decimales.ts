import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_5_SUBTITLE } from "@/data/lessons/shared";

export const divisionNumerosDecimalesLesson: InteractiveLesson = {
  slug: "division-numeros-decimales",
  title: "3. División de números decimales",
  subtitle: TEMA_5_SUBTITLE,
  steps: [
    {
      id: "cociente-decimal",
      type: "concept",
      title: "Divisor entero",
      content: [
        "Al bajar la primera cifra decimal del dividendo, **pon la coma** en el cociente.",
        "Si faltan cifras decimales, añade ceros al dividendo hasta la aproximación deseada.",
        "Para dividir entre $10$, $100$, $1000$… mueve la coma a la **izquierda**.",
      ],
    },
    {
      id: "hermanos",
      type: "animated_solution",
      title: "Problema resuelto — reparto de $35\\,€$",
      content: ["Cuatro hermanos reparten $35\\,€$ por igual."],
      frames: [
        { caption: "Parte entera:", math: "35 : 4 = 8\\ \\text{resto } 3" },
        { caption: "Resto en décimas → cociente $8{,}7$ resto $2$ décimas", math: "8{,}7" },
        { caption: "Dos décimas → $20$ centésimas:", math: "8{,}75\\,€ \\text{ cada uno}" },
      ],
    },
    {
      id: "vestidos",
      type: "animated_solution",
      title: "Problema resuelto — tres vestidos",
      content: ["$7{,}3\\,\\mathrm{m}$ de tela para $3$ vestidos iguales (aprox. a centésimas)."],
      frames: [
        { caption: "División:", math: "7{,}3 : 3 = 2{,}433\\ldots" },
        { caption: "Aproximación a dos cifras decimales:", math: "2{,}43\\,\\mathrm{m}" },
      ],
    },
    {
      id: "ejemplo-periodico",
      type: "concept",
      title: "Cocientes periódicos",
      content: [
        "A veces la división **no termina** ($7{,}3 : 3$). Puedes parar cuando tengas las cifras decimales que pida el enunciado.",
        "Ejemplo del temario: $5 : 9 \\approx 0{,}55$ (dos cifras decimales).",
      ],
    },
    {
      id: "check-div-10",
      type: "classify",
      title: "Dividir entre 10, 100 y 1000",
      question: "¿Entre qué número se ha dividido en cada caso? Coloca cada tarjeta en su grupo.",
      groups: [
        { id: "diez", label: "$: 10$", tone: "cobalt" },
        { id: "cien", label: "$: 100$", tone: "emerald" },
        { id: "mil", label: "$: 1000$", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$15{,}3 \\to 1{,}53$", group: "diez" },
        { id: "b", text: "$15{,}3 \\to 0{,}153$", group: "cien" },
        { id: "c", text: "$15{,}3 \\to 0{,}0153$", group: "mil" },
        { id: "d", text: "$7 \\to 0{,}7$", group: "diez" },
        { id: "e", text: "$420 \\to 4{,}2$", group: "cien" },
        { id: "f", text: "$2500 \\to 2{,}5$", group: "mil" },
      ],
      hint: "Cuenta cuántos lugares se ha movido la coma hacia la izquierda: uno, dos o tres.",
      explanation:
        "Entre $10$ la coma se desplaza un lugar a la izquierda, entre $100$ dos lugares y entre $1000$ tres. Por ejemplo, $15{,}3 : 100 = 0{,}153$.",
    },
    {
      id: "check-cociente",
      type: "fill_in_blank",
      title: "Cociente con dos decimales",
      question: "Calcula $47 : 3$ con dos cifras decimales (usa coma).",
      correctAnswers: ["15,67", "15.67"],
      hint: "Sigue dividiendo añadiendo ceros al dividendo.",
      explanation: "$47 : 3 = 15{,}666\\ldots \\approx 15{,}67$ (tercera cifra $6 \\geq 5$).",
    },
  ],
};
