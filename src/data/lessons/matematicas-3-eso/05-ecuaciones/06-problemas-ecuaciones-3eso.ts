import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const problemasEcuaciones3esoLesson: InteractiveLesson = {
  slug: "problemas-ecuaciones-3eso",
  title: "6. Problemas con ecuaciones",
  subtitle: TEMA_3ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pasos",
      type: "slide",
      help: [
        {
          label: "Qué llamar x",
          message: "Elige como incógnita lo que se pregunta o lo que permite expresar todo lo demás con menos esfuerzo.",
        },
        {
          label: "Interpretar",
          message: "La solución de la ecuación debe tener sentido en el problema: una edad no puede ser negativa.",
        },
      ],
      title: "Cuatro pasos para plantear un problema",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Nombra** la incógnita y expresa los demás datos con ella.",
            "**Relaciona**: escribe la ecuación con lo que dice el enunciado.",
            "**Resuelve** la ecuación.",
            "**Interpreta** y comprueba que la solución cumple el enunciado.",
          ],
        },
        {
          kind: "example",
          title: "Un padre de 37 años tiene hijos de 8 y 5. ¿Cuándo tendrá el padre la suma de las edades de los hijos?",
          lines: [
            { math: "\\text{dentro de } x \\text{ años:}\\ 37 + x = (8 + x) + (5 + x)" },
            { math: "37 + x = 13 + 2x \\Rightarrow x = 24" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "pasos-problema" },
    },
    {
      id: "geometria",
      type: "slide",
      help: [
        {
          label: "Dibuja",
          message: "Haz un esquema del rectángulo con la base y la altura expresadas con $x$.",
        },
        {
          label: "Una solución no vale",
          message: "En problemas geométricos, una solución negativa de la ecuación se descarta: una longitud no puede ser negativa.",
        },
      ],
      title: "Con ecuaciones de segundo grado",
      blocks: [
        {
          kind: "example",
          title: "La base de un rectángulo mide 5 m más que la altura y su área es 84 m²",
          lines: [
            { math: "\\text{altura } x,\\ \\text{base } x + 5" },
            { math: "x(x + 5) = 84 \\Rightarrow x^2 + 5x - 84 = 0" },
            { math: "x = \\dfrac{-5 \\pm \\sqrt{25 + 336}}{2} = \\dfrac{-5 \\pm 19}{2} \\Rightarrow x = 7 \\text{ o } x = -12" },
            { math: "\\text{Altura } 7 \\text{ m y base } 12 \\text{ m}" },
          ],
        },
        {
          kind: "warning",
          text: "La solución $x = -12$ **se descarta**: no tiene sentido como longitud.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-reparto",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Tres partes",
          message: "Si la primera es $x$, la segunda es $x + 100$ y la tercera $x + 100 + 100$... lee bien cuánto supera la tercera a la segunda.",
        },
      ],
      title: "Reparto de dinero",
      question: "Se reparten $1\\,500$ € en tres partes: la segunda supera a la primera en $100$ € y la tercera supera a la segunda en $100$ €. ¿Cuánto vale la primera parte? (solo el número)",
      correctAnswers: ["400"],
      explanation: "$x + (x + 100) + (x + 200) = 1\\,500 \\Rightarrow 3x = 1\\,200 \\Rightarrow x = 400$ €.",
    },
    {
      id: "check-edad",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Dentro de x años",
          message: "La madre tendrá $42 + x$ y el hijo $15 + x$. Que la madre tenga el doble: $42 + x = 2(15 + x)$.",
        },
      ],
      title: "Edades",
      question: "Una madre tiene $42$ años y su hijo, $15$. ¿Dentro de cuántos años la edad de la madre será el doble que la del hijo? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$42 + x = 2(15 + x) \\Rightarrow 42 + x = 30 + 2x \\Rightarrow x = 12$.",
    },
    {
      id: "check-rectangulo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Plantea",
          message: "Si la altura es $x$, la base es $x + 3$ y el área $x(x + 3) = 40$.",
        },
      ],
      title: "Un rectángulo",
      question: "La base de un rectángulo mide $3$ cm más que su altura y su área es $40$ cm². ¿Cuánto mide la altura? (solo el número, en cm)",
      correctAnswers: ["5"],
      explanation: "$x^2 + 3x - 40 = 0 \\Rightarrow x = \\frac{-3 \\pm 13}{2}$: $x = 5$ o $x = -8$. Se descarta la negativa: altura $5$ cm.",
    },
  ],
};
