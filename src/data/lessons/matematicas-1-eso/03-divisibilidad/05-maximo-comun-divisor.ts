import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const maximoComunDivisorLesson: InteractiveLesson = {
  slug: "maximo-comun-divisor",
  title: "5. Máximo común divisor (m.c.d.)",
  subtitle: TEMA_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mcd-idea",
      type: "slide",
      help: [
        {
          label: "¿Por qué «lo más largos posible»?",
          message: "Porque cualquier divisor común sirve, pero queremos el mayor.",
        },
        {
          label: "¿Cómo lo veo?",
          message: "Los divisores comunes de $24$ y $36$ son $1$, $2$, $3$, $4$, $6$ y $12$. El mayor es $12$.",
        },
      ],
      title: "Trozos iguales y lo más largos posible",
      blocks: [
        {
          kind: "text",
          text: "Una modista tiene dos cintas, de **24 m** y de **36 m**. Quiere cortarlas en trozos **iguales**, sin sobrantes y lo más largos posible.",
        },
        {
          kind: "definition",
          text: "El **máximo común divisor** de varios números es el **mayor divisor** que tienen en común.",
        },
        {
          kind: "example",
          lines: [
            { math: "D(24) = \\{1, 2, 3, 4, 6, 8, \\mathbf{12}, 24\\}" },
            { math: "D(36) = \\{1, 2, 3, 4, 6, 9, \\mathbf{12}, 18, 36\\}" },
            { math: "\\text{m.c.d.}(24, 36) = 12", note: "trozos de $12$ m" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "mcd-cortes", params: { a: 24, b: 36 } },
    },
    {
      id: "mcd-factores",
      type: "slide",
      help: [
        {
          label: "¿Por qué el menor exponente?",
          message: "Porque un divisor común solo puede usar un primo tantas veces como aparece en **todos** los números.",
        },
        {
          label: "¿Por qué solo los comunes?",
          message: "Un primo que falta en un número no puede dividir a ese número.",
        },
        {
          label: "Primos entre sí",
          message: "Si no hay ningún primo común, el m.c.d. es $1$.",
        },
      ],
      title: "Con números grandes: factores primos",
      blocks: [
        {
          kind: "steps",
          items: [
            "Descompón cada número en **factores primos**.",
            "Toma solo los primos que estén en **todos** los números.",
            "Elévalos al **menor exponente** con el que aparezcan.",
            "**Multiplica** los resultados.",
          ],
        },
        {
          kind: "example",
          title: "m.c.d.(16, 24, 320)",
          lines: [
            { math: "16 = 2^4 \\quad 24 = 2^3 \\cdot 3 \\quad 320 = 2^6 \\cdot 5" },
            { math: "\\text{m.c.d.} = 2^3 = 8", note: "el $3$ y el $5$ no están en todos" },
          ],
        },
        {
          kind: "warning",
          text: "Si no hay ningún primo común, el m.c.d. es $1$: los números son **primos entre sí** (por ejemplo, $8$ y $15$).",
        },
      ],
      visual: { kind: "anim", scene: "tabla-exponentes", params: { nums: [16, 24, 320], mode: "mcd" } },
    },
    {
      id: "mcm-o-mcd",
      type: "slide",
      help: [
        {
          label: "Una pregunta clave",
          message: "¿Quieres saber **cuándo** coinciden (m.c.m.) o **cuánto mide** cada parte (m.c.d.)?",
        },
        {
          label: "Palabras que delatan",
          message: "«Coincidir», «volver a salir juntas»: m.c.m. «Repartir», «cortar», «lo más grandes posible»: m.c.d.",
        },
        {
          label: "Comprobación rápida",
          message: "El m.c.d. nunca supera al menor de los números y el m.c.m. nunca es menor que el mayor.",
        },
      ],
      title: "¿m.c.m. o m.c.d.?",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "m.c.m.",
            text: "Ciclos que **vuelven a coincidir**: autobuses, luces, turnos. Pregunta **cuándo**.",
            math: ["\\text{m.c.m.} \\ge \\text{el mayor}"],
            tone: "info",
          },
          right: {
            title: "m.c.d.",
            text: "**Repartir o cortar** en partes iguales lo más grandes posible. Pregunta **cuánto mide** cada parte o **cuántos** grupos salen.",
            math: ["\\text{m.c.d.} \\le \\text{el menor}"],
            tone: "ok",
          },
        },
        {
          kind: "rule",
          title: "Comprobación rápida",
          text: "El m.c.d. nunca supera al menor de los números y el m.c.m. nunca es menor que el mayor. Si no se cumple, hay un error.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-ramos",
      type: "predict",
      help: [
        {
          label: "¿Por qué m.c.d.?",
          message: "Para que no sobre ninguna flor, el número de ramos tiene que dividir a las rosas y a los tulipanes. Y quieres el mayor posible: eso es el m.c.d.",
        },
        {
          label: "¿Cómo lo calculo?",
          message: "Descompón los dos números en factores primos y quédate con los comunes, con el menor exponente.",
        },
        {
          label: "Compruébalo",
          message: "Tu número de ramos debe dividir a $48$ y a $36$, y no debe existir otro mayor que también lo haga.",
        },
      ],
      title: "Ramos de flores",
      question:
        "Una florista tiene **48** rosas y **36** tulipanes. Quiere hacer el mayor número posible de ramos iguales, sin que sobre ninguna flor. ¿Cuántos ramos hará?",
      mode: "choice",
      choices: [
        {
          id: "4",
          label: "$4$ ramos",
          incorrectFeedback: "Sirve, pero se pueden hacer más ramos. Buscamos el mayor número posible.",
        },
        {
          id: "6",
          label: "$6$ ramos",
          incorrectFeedback: "Sirve ($8$ rosas y $6$ tulipanes en cada uno), pero se pueden hacer más.",
        },
        { id: "12", label: "$12$ ramos" },
        {
          id: "144",
          label: "$144$ ramos",
          incorrectFeedback: "$144$ es el m.c.m. y es imposible: no hay tantas flores.",
        },
      ],
      correctChoiceId: "12",
      shuffleChoices: true,
      explanation: "$48 = 2^4 \\cdot 3$ y $36 = 2^2 \\cdot 3^2$. $\\text{m.c.d.} = 2^2 \\cdot 3 = 12$ ramos, con $4$ rosas y $3$ tulipanes en cada uno.",
    },
    {
      id: "check-barras",
      type: "predict",
      help: [
        {
          label: "¿m.c.m. o m.c.d.?",
          message: "Estás troceando barras en partes iguales y lo más largas posible: es un m.c.d. El m.c.m. aparece cuando algo se repite en el tiempo y coincide.",
        },
        {
          label: "¿Cómo lo calculo?",
          message: "Descompón $150$ y $210$ en factores primos y toma los comunes con el menor exponente.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "El trozo tiene que caber un número exacto de veces en las dos barras, así que no puede medir más que la barra más corta.",
        },
      ],
      title: "Barras de ferretería",
      question:
        "Una ferretería corta barras de **150 cm** y de **210 cm** en trozos iguales, lo más largos posible y sin desperdicio. ¿Cuánto mide cada trozo?",
      mode: "choice",
      choices: [
        {
          id: "10",
          label: "$10$ cm",
          incorrectFeedback: "Divide a las dos barras, pero no es el trozo más largo posible.",
        },
        { id: "30", label: "$30$ cm" },
        {
          id: "60",
          label: "$60$ cm",
          incorrectFeedback: "$150 : 60$ no es exacta: sobrarían $30$ cm.",
        },
        {
          id: "1050",
          label: "$1\\,050$ cm",
          incorrectFeedback: "$1\\,050$ es el m.c.m. Un trozo no puede ser más largo que la barra.",
        },
      ],
      correctChoiceId: "30",
      shuffleChoices: true,
      explanation: "$150 = 2 \\cdot 3 \\cdot 5^2$ y $210 = 2 \\cdot 3 \\cdot 5 \\cdot 7$. $\\text{m.c.d.} = 2 \\cdot 3 \\cdot 5 = 30$: salen $5$ y $7$ trozos.",
    },
    {
      id: "check-socorristas",
      type: "predict",
      help: [
        {
          label: "¿m.c.m. o m.c.d.?",
          message: "Pasan «cada $15$» y «cada $25$» minutos: los instantes son múltiplos de $15$ y de $25$. La primera vez que coinciden es el menor múltiplo común.",
        },
        {
          label: "Tantea con los múltiplos",
          message: "Haz la lista de múltiplos de $25$ (el mayor) y comprueba cuál es también múltiplo de $15$.",
        },
        {
          label: "Pásalo a una hora",
          message: "El m.c.m. te da minutos después de las $10{:}00$. Conviértelo a horas y minutos antes de sumar.",
        },
      ],
      title: "Dos socorristas",
      question:
        "Un socorrista pasa por la torre cada **15** min y otro cada **25** min. Han coincidido a las 10:00. ¿A qué hora vuelven a coincidir?",
      mode: "choice",
      choices: [
        {
          id: "1005",
          label: "10:05",
          incorrectFeedback: "$5$ es el m.c.d.: aquí se pide cuándo coinciden, que es un m.c.m.",
        },
        {
          id: "1030",
          label: "10:30",
          incorrectFeedback: "$30$ es múltiplo de $15$ pero no de $25$.",
        },
        { id: "1115", label: "11:15" },
        {
          id: "1615",
          label: "16:15",
          incorrectFeedback: "$375 = 15 \\cdot 25$ min es un múltiplo común, pero el primero llega mucho antes.",
        },
      ],
      correctChoiceId: "1115",
      shuffleChoices: true,
      explanation: "$15 = 3 \\cdot 5$ y $25 = 5^2$. $\\text{m.c.m.} = 3 \\cdot 5^2 = 75$ min, es decir, 1 h 15 min después de las 10:00.",
    },
  ],
};
