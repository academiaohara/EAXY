import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const magnetismoImanesOerstedLesson: InteractiveLesson = {
  slug: "magnetismo-imanes-oersted",
  title: "1. Imanes y experiencia de Oersted",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "imanes",
      type: "slide",
      help: [
        {
          label: "¿Por qué la brújula apunta al norte?",
          message: "La Tierra se comporta como un gran imán. Lo que llamamos polo norte de la aguja se orienta hacia el norte **geográfico**, que es, en realidad, un polo **sur** magnético.",
        },
      ],
      title: "Los imanes y sus polos",
      blocks: [
        {
          kind: "text",
          text: "Los imanes naturales son trozos de **magnetita** (Fe₃O₄). Atraen al hierro, sobre todo en unas zonas llamadas **polos**. Lo que se observa con ellos:",
        },
        {
          kind: "steps",
          items: [
            "La atracción es **más intensa en los extremos** de la barra; en la zona central no hay atracción.",
            "Si se parte una barra imantada, **cada trozo es otro imán**: no se puede aislar un polo norte o sur.",
            "Dos imanes se **atraen** si acercamos polos distintos y se **repelen** si son iguales.",
            "Un imán **ordena las limaduras de hierro** a su alrededor: dibujan las líneas de un **campo**.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-polos",
      type: "classify",
      help: [{ label: "Pista", message: "Polos iguales se repelen; distintos, se atraen." }],
      title: "¿Atraen o repelen?",
      question: "Clasifica cada situación entre dos imanes.",
      groups: [
        { id: "atraen", label: "Se atraen", tone: "emerald" },
        { id: "repelen", label: "Se repelen", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Norte con sur", group: "atraen" },
        { id: "b", text: "Norte con norte", group: "repelen" },
        { id: "c", text: "Sur con sur", group: "repelen" },
        { id: "d", text: "Sur con norte", group: "atraen" },
        { id: "e", text: "El norte de la aguja y el polo sur magnético de la Tierra", group: "atraen" },
      ],
      hint: "Regla: polos del mismo nombre se repelen.",
      explanation: "Igual que las cargas eléctricas: iguales se repelen, distintas se atraen. La diferencia es que los polos magnéticos nunca aparecen aislados.",
    },
    {
      id: "check-partir",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en los dos extremos de cada trozo." }],
      title: "Partimos un imán",
      question: "Si rompemos una barra imantada por la mitad, ¿qué obtenemos?",
      mode: "choice",
      choices: [
        { id: "dos", label: "Dos imanes completos, cada uno con su polo norte y su polo sur" },
        { id: "norte", label: "Un trozo con solo polo norte y otro solo con polo sur", incorrectFeedback: "No existen polos magnéticos aislados (monopolos)." },
        { id: "nada", label: "Dos trozos de hierro sin imantación", incorrectFeedback: "Cada trozo conserva la imantación." },
      ],
      correctChoiceId: "dos",
      shuffleChoices: true,
      explanation: "No es posible aislar un polo norte o un polo sur: cada trozo es otro imán.",
    },
    {
      id: "oersted",
      type: "slide",
      help: [
        {
          label: "¿Por qué es tan importante?",
          message: "Demostró que **electricidad y magnetismo están relacionados**: es la base de motores, generadores y electroimanes.",
        },
      ],
      title: "Oersted: una corriente actúa como un imán",
      blocks: [
        {
          kind: "text",
          text: "Una corriente eléctrica es un conjunto de **cargas en movimiento**. Oersted comprobó que desvía una aguja imantada, es decir, que **una carga en movimiento equivale a un imán**.",
        },
        {
          kind: "text",
          text: "Con una corriente podemos **variar el campo** a voluntad (algo imposible en un imán permanente), y de ahí nace todo lo que sigue en la unidad.",
        },
      ],
      visual: { kind: "anim", scene: "oersted-aguja", beatMs: 5600 },
    },
    {
      id: "check-oersted",
      type: "predict",
      help: [{ label: "Pista", message: "Mira cómo gira la aguja al cambiar el sentido de la corriente." }],
      title: "¿Qué observó Oersted?",
      question: "Al pasar una corriente por un hilo cerca de una aguja imantada, la aguja:",
      mode: "choice",
      choices: [
        { id: "perp", label: "Se desvía hasta quedar perpendicular al hilo, y cambia de lado si se invierte la corriente" },
        { id: "par", label: "No se mueve, porque la corriente solo crea campo eléctrico", incorrectFeedback: "Una carga en movimiento crea también campo magnético." },
        { id: "gira", label: "Gira continuamente sin detenerse", incorrectFeedback: "Se orienta en una dirección determinada y se queda quieta." },
      ],
      correctChoiceId: "perp",
      shuffleChoices: true,
      explanation: "El campo magnético de la corriente es perpendicular al hilo: rodea al conductor en círculos.",
    },
    {
      id: "campo",
      type: "slide",
      help: [
        {
          label: "¿Qué es un campo?",
          message: "Una zona del espacio donde un objeto sufre una fuerza **a distancia**. Se dibuja con líneas: cuanto más juntas, más intenso.",
        },
      ],
      title: "Campo magnético: líneas y comparación",
      blocks: [
        {
          kind: "text",
          text: "En el campo **gravitatorio** una masa atrae a otra con $F = G\\,\\dfrac{Mm}{r^2}$; en el **eléctrico**, una carga actúa sobre otra con $F = K\\,\\dfrac{Qq}{r^2}$. En ambos la intensidad de campo baja con el **cuadrado de la distancia**.",
        },
        {
          kind: "compare",
          left: { title: "Gravitatorio y eléctrico", text: "Líneas radiales; la fuerza tiene la dirección del campo. El eléctrico actúa sobre cargas quietas o en movimiento.", tone: "info" },
          right: { title: "Magnético", text: "Líneas **cerradas**; la fuerza es **perpendicular** al campo y solo actúa sobre cargas **en movimiento**.", tone: "key" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-campo-diferencia",
      type: "predict",
      help: [{ label: "Pista", message: "El campo eléctrico actúa sobre cualquier carga; el magnético, solo si se mueve." }],
      title: "Eléctrico frente a magnético",
      question: "¿Qué carga siente una fuerza de un campo magnético?",
      mode: "choice",
      choices: [
        { id: "mov", label: "Solo una carga en movimiento (con velocidad no paralela al campo)" },
        { id: "todas", label: "Cualquier carga, esté parada o en movimiento", incorrectFeedback: "Eso es lo que ocurre con el campo eléctrico." },
        { id: "neg", label: "Solo las negativas", incorrectFeedback: "Actúa sobre las dos; cambia el sentido de la fuerza." },
      ],
      correctChoiceId: "mov",
      shuffleChoices: true,
      explanation: "La fuerza magnética depende de la velocidad: sobre una carga en reposo no actúa.",
    },
  ],
};
