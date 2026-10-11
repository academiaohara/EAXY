import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNumeracionNaturalesLesson: InteractiveLesson = {
  slug: "sistemas-numeracion-naturales",
  title: "1. Origen de los números y aproximación por redondeo",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "sistemas-historia",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "sistemas-historia",
      title: "Origen y evolución de los números",
      definitionBox:
        "Los números naturales surgen de la necesidad de **contar**. Cada cultura inventó **símbolos**; en sistemas **aditivos** se **suman** (egipcio, romano) y en el **decimal** importa la **posición** de cada cifra.",
      layout: "stack",
    },
    {
      id: "decimal-intro",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "decimal-intro",
      title: "El sistema decimal",
      definitionBox:
        "Usamos **base 10** con diez dígitos. Es **posicional**: el **0** marca órdenes vacíos y cada salto a la izquierda multiplica por diez.",
      layout: "stack",
    },
    {
      id: "contar-diez",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "contar-diez",
      title: "Contar unidades hasta diez",
      definitionBox:
        "Contar es ir sumando **unidades**. **Diez** unidades forman **una decena** — el primer salto de la numeración posicional.",
      layout: "stack",
    },
    {
      id: "redondeo-demo",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "redondeo-demo",
      title: "Aproximación por redondeo",
      definitionBox:
        "Cuando un número tiene muchas cifras, lo sustituimos por uno **aproximado** terminado en ceros. En el **redondeo**, si la primera cifra quitada es **5 o mayor**, sumamos 1 al orden elegido.",
      layout: "stack",
    },
    {
      id: "redondeo-practica-24963",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "redondeo-corte",
      title: "Practica el corte",
      definitionBox:
        "Para redondear, localiza el **último dígito que conservas** del orden pedido; todo lo que queda a la derecha pasa a ceros según la regla.",
      roundingExercise: { n: 24_963, orderId: "millares" },
      layout: "stack",
    },
    {
      id: "check-redondeo",
      type: "predict",
      title: "Elige la cifra que manda",
      question:
        "Al redondear $24\\,963$ a los millares, ¿qué cifra debes mirar para decidir si el millar sube o se queda igual?",
      mode: "choice",
      choices: [
        { id: "centenas", label: "La cifra de las centenas ($9$)" },
        {
          id: "decenas",
          label: "La cifra de las decenas ($6$)",
          incorrectFeedback:
            "Debes mirar la primera cifra que queda a la derecha de los millares.",
        },
        {
          id: "millares",
          label: "La cifra de los millares ($4$)",
          incorrectFeedback:
            "Esa cifra puede subir; la decisión la toma la primera cifra que quitamos.",
        },
      ],
      correctChoiceId: "centenas",
      explanation:
        "Al redondear a los millares, la primera cifra que desaparece es la de las centenas: como es $9$, el resultado sube a $25\\,000$.",
    },
  ],
};
