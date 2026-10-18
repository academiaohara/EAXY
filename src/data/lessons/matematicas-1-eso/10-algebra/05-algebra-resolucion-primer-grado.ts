import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraResolucionPrimerGradoLesson: InteractiveLesson = {
  slug: "algebra-resolucion-primer-grado",
  title: "5. Ecuaciones de primer grado",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [
        {
          label: "¿Cuándo reduzco y cuándo transpongo?",
          message: "Reduces cuando en un mismo miembro hay términos semejantes. Transpones cuando quieres llevar un término al otro miembro.",
        },
        {
          label: "¿Qué orden sigo?",
          message: "Las $x$ juntas en un miembro, los números en el otro y, al final, divides entre el coeficiente de $x$.",
        },
      ],
      title: "Reducir y transponer hasta dejar la $x$ sola",
      blocks: [
        {
          kind: "definition",
          text: "Resolver una ecuación es transformarla en otras **equivalentes** cada vez más sencillas hasta dejar la incógnita sola en un miembro.",
        },
        {
          kind: "compare",
          left: { title: "Reducir", text: "Sumar o restar términos semejantes dentro de un miembro.", tone: "info" },
          right: { title: "Transponer", text: "Pasar un término al otro miembro con la operación contraria.", tone: "key" },
        },
        {
          kind: "text",
          text: "Se alternan los dos recursos hasta llegar a $x = \\text{número}$.",
        },
      ],
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [
        {
          label: "¿Por qué se resta $3x$?",
          message: "Para que no queden $x$ en el segundo miembro. Al restar $3x$ a los dos lados, la $x$ de la derecha desaparece.",
        },
        {
          label: "Del paso $2x = 6$",
          message: "Ahora la $x$ está multiplicada por $2$: la operación contraria es dividir entre $2$.",
        },
      ],
      title: "Un ejemplo completo",
      blocks: [
        {
          kind: "formula",
          tex: "7x - 2x + 4 = 8 + 3x + 2",
        },
        {
          kind: "text",
          text: "Observa en cada paso qué se **reduce** y qué se **transpone**.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["7x", "−", "2x", "+", "4", "=", "8", "+", "3x", "+", "2"], active: [0, 2], note: "**Reducir:** $7x - 2x = 5x$ en el primer miembro." },
            { tokens: ["5x", "+", "4", "=", "8", "+", "3x", "+", "2"], active: [6, 8], note: "**Reducir:** en el segundo, $8 + 2 = 10$." },
            { tokens: ["5x", "+", "4", "=", "10", "+", "3x"], active: [6, 6], note: "**Transponer:** restamos $3x$ en los dos miembros." },
            { tokens: ["5x", "+", "4", "−", "3x", "=", "10"], active: [0, 4], note: "**Reducir:** $5x - 3x = 2x$." },
            { tokens: ["2x", "+", "4", "=", "10"], active: [2, 2], note: "**Transponer:** restamos $4$ en los dos miembros." },
            { tokens: ["2x", "=", "10", "−", "4"], active: [2, 4], note: "**Reducir:** $10 - 4 = 6$." },
            { tokens: ["2x", "=", "6"], active: [0, 0], note: "**Transponer:** dividimos entre $2$." },
            { tokens: ["x", "=", "3"], fresh: [0, 2] },
          ],
        },
      },
    },
    {
      id: "comprobacion",
      type: "slide",
      help: [
        {
          label: "¿Por qué comprobar en la original?",
          message: "Si te equivocaste en algún paso intermedio, la ecuación reducida ya llevaría el error. La original no miente.",
        },
        {
          label: "¿Y si no coinciden?",
          message: "Revisa los signos al transponer: es el fallo más habitual.",
        },
      ],
      title: "Comprobar la solución",
      blocks: [
        {
          kind: "steps",
          items: [
            "Sustituye la $x$ por tu valor en la ecuación **original**.",
            "Calcula cada miembro por separado.",
            "Si los dos valen lo mismo, la solución es correcta.",
          ],
        },
        {
          kind: "example",
          title: "Con $x = 3$",
          lines: [
            { math: "7 \\cdot 3 - 2 \\cdot 3 + 4 = 19", note: "primer miembro" },
            { math: "8 + 3 \\cdot 3 + 2 = 19", note: "segundo miembro" },
          ],
        },
        {
          kind: "warning",
          text: "Comprueba siempre en la ecuación **original**, no en una reducida: así detectas también los errores de los pasos intermedios.",
        },
      ],
    },
    {
      id: "gimnasios",
      type: "predict",
      help: [
        {
          label: "¿Cómo planteo la ecuación?",
          message: "El gasto total en cada gimnasio es la matrícula más la cuota por los meses. Iguala los dos gastos.",
          math: ["20 + 6x = 8 + 10x"],
        },
        {
          label: "¿Dónde junto las $x$?",
          message: "Te conviene llevarlas al lado donde quede coeficiente positivo: mueve la $6x$ a la derecha.",
        },
        {
          label: "Comprueba tu respuesta",
          message: "Calcula el gasto de cada gimnasio con tu número de meses: tienen que dar lo mismo.",
        },
      ],
      title: "¿Cuándo se igualan los dos gimnasios?",
      question:
        "El gimnasio A cobra 20 € de matrícula más 6 € al mes y el B, 8 € de matrícula más 10 € al mes. ¿Después de cuántos meses habrás gastado lo mismo en los dos?",
      mode: "choice",
      choices: [
        { id: "a", label: "$3$ meses" },
        {
          id: "b",
          label: "$12$ meses",
          incorrectFeedback:
            "Has dejado la ecuación en $12 = 4x$ y has dado el $12$. Falta el último paso: dividir entre $4$.",
        },
        {
          id: "c",
          label: "$4$ meses",
          incorrectFeedback:
            "Ese $4$ es el coeficiente de $x$ tras reducir ($10x - 6x = 4x$), no el valor de $x$. Hay que dividir entre él.",
        },
        {
          id: "d",
          label: "$\\dfrac{7}{4}$ meses",
          incorrectFeedback:
            "Has sumado el $8$ en vez de restarlo al transponer. Al pasar $8$ al otro miembro se resta: $20 - 8 = 12$, no $28$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$20 + 6x = 8 + 10x \\Rightarrow 20 - 8 = 10x - 6x \\Rightarrow 12 = 4x \\Rightarrow x = 3$. A los $3$ meses ambos han costado $38$ €.",
    },
    {
      id: "ambos-miembros",
      type: "slide",
      help: [
        {
          label: "¿Cuál muevo primero?",
          message: "Si llevas la $x$ de menor coeficiente al otro lado, evitas que el coeficiente quede negativo.",
        },
        {
          label: "Una solución fraccionaria",
          message: "Una solución no tiene por qué ser entera: $\\dfrac{1}{3}$ vale. Se comprueba igual.",
        },
      ],
      title: "Con la incógnita en los dos miembros",
      blocks: [
        {
          kind: "formula",
          tex: "5 - 4x = 7 + 8x - 6",
        },
        {
          kind: "text",
          text: "Aquí hay $x$ a los dos lados. Primero se reduce, después se juntan las $x$ y los números y, al final, se divide.",
        },
        {
          kind: "warning",
          text: "La solución puede ser una **fracción**: $x = \\dfrac{1}{3}$ es válida. Se deja simplificada.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["5", "−", "4x", "=", "7", "+", "8x", "−", "6"], active: [4, 8], note: "**Reducir:** $7 - 6 = 1$ en el segundo miembro." },
            { tokens: ["5", "−", "4x", "=", "1", "+", "8x"], active: [6, 6], note: "**Transponer:** sumamos $4x$ y restamos $1$ en los dos miembros." },
            { tokens: ["5", "−", "1", "=", "8x", "+", "4x"], active: [0, 2], note: "**Reducir:** $5 - 1 = 4$ y $8x + 4x = 12x$." },
            { tokens: ["4", "=", "12x"], active: [2, 2], note: "**Transponer:** dividimos entre $12$." },
            { tokens: ["x", "=", "4/12", "=", "1/3"], fresh: [4, 4] },
          ],
        },
      },
    },
    {
      id: "check",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es transponer?",
          message: "Pasar un término al otro lado con la operación contraria. Piensa en una balanza: lo que haces en un platillo, lo haces en el otro.",
          branches: [
            {
              label: "¿Qué muevo primero?",
              message: "Reúne las $x$ en un lado. Si mueves la que tiene menor coeficiente evitas trabajar con números negativos.",
            },
          ],
        },
        {
          label: "Quiero un orden claro",
          message: "Tres pasos: (1) las $x$ juntas en un miembro, (2) los números en el otro, (3) dividir entre el coeficiente de $x$.",
        },
        {
          label: "¿Cómo compruebo?",
          message: "Sustituye tu valor en los dos miembros de la ecuación original: tienen que dar lo mismo.",
        },
      ],
      title: "Comprueba lo aprendido",
      question: "Resuelve $6x + 5 = 21 + 2x$. ¿Cuánto vale $x$? (escribe solo el número)",
      correctAnswers: ["4", "x=4"],
      hint: "Primero agrupa las $x$ en un solo miembro transponiendo $2x$; después transpón el $5$ y divide.",
      explanation:
        "Transponemos $2x$: $6x - 2x + 5 = 21 \\Rightarrow 4x + 5 = 21$. Transponemos $5$: $4x = 16$. Dividimos: $x = 4$. Comprobación: $6 \\cdot 4 + 5 = 29 = 21 + 2 \\cdot 4$.",
    },
    {
      id: "check-2",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Dónde junto las $x$?",
          message: "Tienes $-x$ a la izquierda y $3x$ a la derecha. Suma $x$ a los dos lados y las $x$ quedan a la derecha.",
        },
        {
          label: "Un paso a la vez",
          message: "Después de juntar las $x$, tendrás un número en un lado y un múltiplo de $x$ en el otro. Divide al final.",
        },
        {
          label: "¿Cómo compruebo?",
          message: "Sustituye en $4 - x$ y en $3x - 8$: deben dar lo mismo.",
        },
      ],
      title: "Con la $x$ negativa",
      question: "Resuelve $4 - x = 3x - 8$. ¿Cuánto vale $x$? (escribe solo el número)",
      correctAnswers: ["3", "x=3"],
      hint: "Suma $x$ y $8$ a los dos miembros para dejar las $x$ a la derecha.",
      explanation: "$4 + 8 = 3x + x \\Rightarrow 12 = 4x \\Rightarrow x = 3$. Comprobación: $4 - 3 = 1$ y $3 \\cdot 3 - 8 = 1$.",
    },
  ],
};
