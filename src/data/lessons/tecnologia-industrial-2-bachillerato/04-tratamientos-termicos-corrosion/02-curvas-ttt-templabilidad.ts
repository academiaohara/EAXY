import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_4_SUBTITLE } from "@/data/lessons/shared";

export const curvasTttTemplabilidadLesson: InteractiveLesson = {
  slug: "curvas-ttt-templabilidad",
  title: "2. Curvas TTT y templabilidad",
  subtitle: TEMA_TI2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "jominy",
      type: "slide",
      help: [
        {
          label: "¿Por qué solo se enfría un extremo?",
          message: "Así en una sola probeta se obtienen todas las velocidades de enfriamiento a la vez: la máxima en el extremo y menores a medida que te alejas.",
        },
      ],
      title: "El ensayo Jominy",
      blocks: [
        {
          kind: "definition",
          text: "La **templabilidad** es la capacidad de un acero para endurecerse por formación de martensita tras un tratamiento térmico. Se mide con el **ensayo Jominy**.",
        },
        {
          kind: "steps",
          items: [
            "Probeta normalizada ($25$ mm de diámetro, $100$ mm de longitud) calentada a la temperatura de austenización.",
            "Se enfría solo un extremo con un chorro de agua de caudal y temperatura constantes.",
            "Se desbasta una tira de $0{,}4$ mm y se mide la dureza a lo largo de los primeros $50$ mm.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "jominy-ensayo", beatMs: 4200 },
    },
    {
      id: "curvas-templabilidad",
      type: "slide",
      help: [
        {
          label: "¿Qué cambia entre aceros?",
          message: "Los elementos de aleación (Cr, Ni, Mo…) retrasan la formación de perlita: la martensita se obtiene con velocidades de enfriamiento más lentas, es decir, a más profundidad.",
        },
      ],
      title: "Curvas de templabilidad",
      blocks: [
        {
          kind: "text",
          text: "Un acero de **alta templabilidad** mantiene valores altos de dureza a distancias largas del extremo. Un acero aleado tiene una única curva de templabilidad.",
        },
        {
          kind: "text",
          text: "Recorre la probeta con distintos aceros: ¿hasta dónde llega la martensita?",
        },
      ],
      visual: { kind: "tool", tool: "jominy-explorador", params: { a: 1, b: 15 } },
    },
    {
      id: "check-jominy",
      type: "predict",
      help: [{ label: "Velocidad de enfriamiento", message: "A más distancia del extremo templado, el enfriamiento es más lento y hay más tiempo para formar perlita." }],
      title: "Pieza gruesa",
      question: "En una pieza gruesa de acero débilmente aleado templada en agua, el interior sale más blando que el exterior. ¿Por qué?",
      mode: "choice",
      choices: [
        { id: "vel", label: "El interior se enfría más lentamente y no se forma tanta martensita" },
        { id: "carbono", label: "El interior tiene menos carbono", incorrectFeedback: "La composición es la misma en toda la pieza." },
        { id: "austenita", label: "El interior no llega a calentarse", incorrectFeedback: "Se supone que se mantiene el tiempo suficiente para austenizar toda la pieza." },
      ],
      correctChoiceId: "vel",
      shuffleChoices: true,
      explanation: "La velocidad de enfriamiento del núcleo es menor que la de la superficie: aparecen perlita o bainita en lugar de martensita. Con un acero aleado sería posible templar más profundo.",
    },
    {
      id: "factores-temple",
      type: "slide",
      help: [
        {
          label: "¿Por qué el agua puede agrietar?",
          message: "Enfría tan rápido y de forma tan desigual que en aceros de alto carbono produce deformaciones y grietas. Para evitarlo se templa en aceite.",
        },
      ],
      title: "Factores que influyen en el temple",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Composición del acero**: el carbono y los elementos de aleación aumentan la dureza y la templabilidad.",
            "**Temperatura de calentamiento**: depende del carbono (Mo, Al, Si, W y V la suben; Ni y Mn la bajan).",
            "**Tiempo de calentamiento**: relacionado con la masa de la pieza.",
            "**Velocidad de enfriamiento**: el factor más importante, condicionado por el medio.",
            "**Medio de temple** y **tamaño y geometría** de la pieza.",
          ],
        },
        {
          kind: "text",
          text: "Medios, de más a menos severos: **agua** (se agita y no pasa de $30$ °C), **aceite** (temples más suaves para aceros aleados) y **aire**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-agua",
      type: "predict",
      help: [{ label: "Burbujas de vapor", message: "Si el agua se calienta se forma una burbuja de vapor alrededor de la pieza que actúa de aislante y retrasa el enfriamiento." }],
      title: "Temperatura del agua",
      question: "Cuando se emplea agua como medio de enfriamiento rápido en el temple, su temperatura no debe ser nunca superior a:",
      mode: "choice",
      choices: [
        { id: "30", label: "30 °C" },
        { id: "50", label: "50 °C", incorrectFeedback: "Es demasiado alta: se formaría vapor que aísla la pieza." },
        { id: "100", label: "100 °C", incorrectFeedback: "A 100 °C el agua hierve." },
      ],
      correctChoiceId: "30",
      shuffleChoices: true,
      explanation: "Hace falta suficiente cantidad de agua para que no rebase los 30 °C, y hay que agitarla para evitar la capa de vapor.",
    },
    {
      id: "ttt-lectura",
      type: "slide",
      help: [
        {
          label: "¿Por qué escala logarítmica?",
          message: "Una escala logarítmica amplía los valores pequeños y comprime los grandes: así caben desde décimas de segundo hasta días en el mismo gráfico.",
        },
      ],
      title: "Cómo se lee un diagrama TTT",
      blocks: [
        {
          kind: "text",
          text: "Las curvas **TTT** (tiempo–temperatura–transformación) o «curvas de las S» indican el tiempo necesario, a cada temperatura, para que empiece y termine una transformación de fase.",
        },
        {
          kind: "text",
          text: "Para obtener martensita, el enfriamiento ha de ser tan rápido que no entre en la zona de las «S»: **debe cortar la línea $M_s$**.",
        },
      ],
      visual: { kind: "anim", scene: "ttt-lectura", beatMs: 4500 },
    },
    {
      id: "ttt-explorador",
      type: "slide",
      help: [
        {
          label: "¿Qué es la velocidad crítica?",
          message: "La menor velocidad de enfriamiento con la que se esquiva la nariz de las curvas «S» y se obtiene martensita 100 %.",
        },
      ],
      title: "Explora el enfriamiento",
      blocks: [
        {
          kind: "text",
          text: "Cambia la velocidad con el deslizador o con los atajos. Anota a partir de qué velocidad la línea de enfriamiento ya no toca las curvas de la perlita.",
        },
      ],
      visual: { kind: "tool", tool: "ttt-explorador", params: { a: 50 } },
    },
    {
      id: "check-v-temple",
      type: "predict",
      help: [{ label: "Herramienta", message: "Prueba «Temple en agua»: ¿qué curvas corta la línea?" }],
      title: "Temple en agua",
      question: "En el temple en agua de un acero eutectoide, el enfriamiento:",
      mode: "choice",
      choices: [
        { id: "esquiva", label: "Esquiva las curvas «S» y corta $M_s$ y $M_f$: se obtiene martensita" },
        { id: "perlita", label: "Corta las curvas de la perlita y da perlita fina", incorrectFeedback: "Eso ocurre con enfriamientos más lentos, como al aire." },
        { id: "bainita", label: "Se detiene en la zona de la bainita", incorrectFeedback: "La bainita se obtiene manteniendo la temperatura (austempering), no con un temple continuo." },
      ],
      correctChoiceId: "esquiva",
      shuffleChoices: true,
      explanation: "El enfriamiento muy rápido no entra en las curvas «S» y atraviesa $M_s$ y $M_f$: toda la austenita pasa a martensita.",
    },
    {
      id: "check-ttt-definicion",
      type: "predict",
      help: [{ label: "Nombre", message: "TTT son las iniciales de Tiempo-Temperatura-Transformación." }],
      title: "Qué indican las curvas TTT",
      question: "Las curvas TTT indican la relación:",
      mode: "choice",
      choices: [
        { id: "estruct", label: "Entre la velocidad de enfriamiento y las estructuras que adquiere el acero en dicho enfriamiento" },
        { id: "comp", label: "Entre la composición del acero y la velocidad de enfriamiento", incorrectFeedback: "La composición es un dato previo: cada diagrama corresponde a un acero concreto." },
        { id: "tiempo", label: "Entre la temperatura, el tiempo transcurrido y la dureza final", incorrectFeedback: "Dan estructuras, y de ellas se deduce la dureza." },
      ],
      correctChoiceId: "estruct",
      shuffleChoices: true,
      explanation: "Para cada velocidad de enfriamiento se ve qué estructuras aparecen: perlita, bainita o martensita.",
    },
  ],
};
