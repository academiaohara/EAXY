import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoLongitudLesson: InteractiveLesson = {
  slug: "sistema-metrico-longitud",
  title: "2. Medida de la longitud",
  subtitle: TEMA_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cambio-unidad",
      type: "slide",
      title: "Cambiar de unidad es mover la coma por la tabla",
      blocks: [
        {
          kind: "rule",
          title: "Un salto, un lugar",
          text: "Se escribe la cantidad con la coma bajo su unidad y se cuentan los saltos hasta la unidad pedida. La coma se mueve **tantos lugares como saltos**.",
        },
        {
          kind: "compare",
          left: {
            title: "A una unidad menor",
            text: "Coma a la **derecha**. Caben más unidades pequeñas: el número **crece**.",
            tone: "info",
          },
          right: {
            title: "A una unidad mayor",
            text: "Coma a la **izquierda**. Hacen falta menos: el número **disminuye**.",
            tone: "info",
          },
        },
        {
          kind: "example",
          lines: [
            { math: "0{,}062\\ \\mathrm{dam} = 6{,}2\\ \\mathrm{dm}", note: "2 saltos a la derecha" },
            { math: "243\\ \\mathrm{cm} = 2{,}43\\ \\mathrm{m}", note: "2 saltos a la izquierda" },
          ],
        },
        {
          kind: "warning",
          text: "Los huecos se rellenan con **ceros**. La coma no desaparece: marca dónde terminan las unidades de la columna.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-unidades", params: { units: "m", dec: "15", from: "km", to: "m" } },
    },
    {
      id: "check-liston",
      type: "predict",
      title: "El listón de madera",
      question: "En la carpintería, un listón mide 243 cm de largo. ¿Cuántos metros mide?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2{,}43\\ \\mathrm{m}$" },
        {
          id: "b",
          label: "$24{,}3\\ \\mathrm{m}$",
          incorrectFeedback:
            "Has movido la coma un solo lugar. De $\\mathrm{cm}$ a $\\mathrm{m}$ hay **dos** saltos ($\\mathrm{cm} \\to \\mathrm{dm} \\to \\mathrm{m}$).",
        },
        {
          id: "c",
          label: "$0{,}243\\ \\mathrm{m}$",
          incorrectFeedback:
            "Has movido la coma tres lugares, como si fueran milímetros. Un metro son **100** cm: dos saltos.",
        },
        {
          id: "d",
          label: "$24\\,300\\ \\mathrm{m}$",
          incorrectFeedback:
            "Has movido la coma a la **derecha**. El metro es una unidad mayor que el centímetro, así que el número tiene que disminuir.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "De $\\mathrm{cm}$ a $\\mathrm{m}$ se suben dos columnas: la coma se mueve dos lugares a la izquierda y $243\\ \\mathrm{cm} = 2{,}43\\ \\mathrm{m}$.",
    },
    {
      id: "juntar",
      type: "slide",
      title: "Juntar: de forma compleja a incompleja",
      blocks: [
        {
          kind: "definition",
          text: "Una cantidad está en **forma compleja** si usa varias unidades ($2\\ \\mathrm{m}\\ 5\\ \\mathrm{dm}$) y en **forma incompleja** si usa una sola ($2{,}5\\ \\mathrm{m}$ o $250\\ \\mathrm{cm}$).",
        },
        {
          kind: "formula",
          tex: "2\\ \\mathrm{m}\\ 5\\ \\mathrm{dm} \;=\; 2{,}5\\ \\mathrm{m} \;=\; 250\\ \\mathrm{cm}",
        },
        {
          kind: "steps",
          items: [
            "Cada parte va en la columna de **su** unidad.",
            "Las columnas vacías entre ellas llevan **ceros**.",
            "La coma se coloca a la derecha de la unidad que se pide.",
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-unidades",
        params: { units: "m", parts: ["3 dam", "8 m", "7 cm"], to: "m" },
      },
    },
    {
      id: "separar",
      type: "slide",
      title: "Separar: de forma incompleja a compleja",
      blocks: [
        {
          kind: "rule",
          text: "Se coloca la cantidad con la coma bajo su unidad y se lee **columna a columna**. Las columnas que valen $0$ no se escriben.",
        },
        {
          kind: "example",
          lines: [{ math: "12{,}06\\ \\mathrm{hm} = 1\\ \\mathrm{km}\\ 2\\ \\mathrm{hm}\\ 6\\ \\mathrm{m}", note: "la columna de los dam vale 0" }],
        },
      ],
      visual: { kind: "anim", scene: "tabla-unidades", params: { units: "m", dec: "12,06", from: "hm" } },
    },
    {
      id: "check-camion",
      type: "predict",
      title: "El camión y el hueco",
      question:
        "Un camión mide 2 m 5 dm de largo y hay que aparcarlo en un hueco de 2,6 m. ¿Cabe, y con cuánto margen?",
      mode: "choice",
      choices: [
        { id: "a", label: "Sí: mide $2{,}5$ m y sobran $10$ cm" },
        {
          id: "b",
          label: "Sí: mide $2{,}05$ m y sobran $55$ cm",
          incorrectFeedback:
            "Has tratado $5\\ \\mathrm{dm}$ como $5\\ \\mathrm{cm}$. Los decímetros ocupan el **primer** lugar tras la coma: $5\\ \\mathrm{dm} = 0{,}5\\ \\mathrm{m}$.",
        },
        {
          id: "c",
          label: "No: mide $7$ m",
          incorrectFeedback:
            "Has sumado $2 + 5$ sin convertir. Los metros y los decímetros no se suman directamente: $5\\ \\mathrm{dm}$ son medio metro.",
        },
        {
          id: "d",
          label: "No: mide $25$ m",
          incorrectFeedback:
            "Has unido las cifras $2$ y $5$ como si todo fueran metros. En $2\\ \\mathrm{m}\\ 5\\ \\mathrm{dm}$ el $5$ está en la columna de los decímetros.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$2\\ \\mathrm{m}\\ 5\\ \\mathrm{dm} = 2{,}5\\ \\mathrm{m}$ y $2{,}6 - 2{,}5 = 0{,}1\\ \\mathrm{m} = 10\\ \\mathrm{cm}$: cabe con diez centímetros de margen.",
    },
    {
      id: "extremos",
      type: "slide",
      title: "Más pequeño que el milímetro, más grande que el kilómetro",
      blocks: [
        {
          kind: "text",
          text: "Para lo **muy pequeño** hay unidades por debajo del milímetro. Se usan en biología y en física atómica.",
        },
        {
          kind: "facts",
          items: [
            { tex: "1\\ \\mu\\mathrm{m}", label: "micra = 0,001 mm" },
            { tex: "1\\ \\mathrm{nm}", label: "nanómetro = 0,000001 mm" },
            { tex: "1\\ \\text{Å}", label: "ángstrom = 0,0000001 mm" },
          ],
        },
        {
          kind: "text",
          text: "Para lo **muy grande** (distancias entre astros) hay unidades por encima del kilómetro.",
        },
        {
          kind: "facts",
          items: [
            { tex: "1\\ \\mathrm{UA}", label: "unidad astronómica ≈ 150 millones de km" },
            { tex: "1\\ \\text{a. l.}", label: "año luz ≈ 9,5 billones de km" },
          ],
        },
        {
          kind: "warning",
          text: "El año luz es una **distancia**, no un tiempo: lo que recorre la luz en un año.",
        },
      ],
      visual: { kind: "anim", scene: "escala-longitudes" },
    },
    {
      id: "check-neptuno",
      type: "predict",
      title: "El viaje a Neptuno",
      question:
        "Una sonda viaja del Sol a Neptuno, a unos 4 500 millones de km. ¿Con qué unidad es más cómodo expresar esa distancia?",
      mode: "choice",
      choices: [
        { id: "a", label: "Con unidades astronómicas ($\\mathrm{UA}$): son unas $30$" },
        {
          id: "b",
          label: "Con años luz: son unos $0{,}0005$ años luz",
          incorrectFeedback:
            "Se podría escribir, pero el año luz es demasiado grande para el sistema solar: sale un decimal incómodo. Se reserva para estrellas y galaxias.",
        },
        {
          id: "c",
          label: "Con kilómetros, porque es la unidad principal del S.M.D.",
          incorrectFeedback:
            "El kilómetro funciona, pero obliga a escribir $4\\,500\\,000\\,000$. Para distancias entre planetas se usa una unidad mayor.",
        },
        {
          id: "d",
          label: "Con micras, porque son más precisas",
          incorrectFeedback:
            "La micra es una milésima de milímetro: sirve para bacterias, no para planetas. Saldría un número con ¡quince cifras!",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$1\\ \\mathrm{UA}$ es la distancia Tierra–Sol ($\\approx 150$ millones de km): Neptuno está a unas $30\\ \\mathrm{UA}$. Cada escala de longitud tiene su unidad cómoda.",
    },
    {
      id: "check-campo",
      type: "predict",
      title: "El campo de fútbol",
      question: "Un campo de fútbol mide 0,105 km de largo. ¿Cuántos metros son?",
      mode: "choice",
      choices: [
        { id: "a", label: "$105\\ \\mathrm{m}$" },
        {
          id: "b",
          label: "$0{,}000105\\ \\mathrm{m}$",
          incorrectFeedback:
            "Has movido la coma a la **izquierda**. El metro es menor que el kilómetro: el número tiene que crecer.",
        },
        {
          id: "c",
          label: "$1{,}05\\ \\mathrm{m}$",
          incorrectFeedback:
            "Has movido la coma un solo lugar; hay tres saltos ($\\mathrm{km} \\to \\mathrm{hm} \\to \\mathrm{dam} \\to \\mathrm{m}$).",
        },
        {
          id: "d",
          label: "$1\\,050\\ \\mathrm{m}$",
          incorrectFeedback:
            "Has movido la coma cuatro lugares. Un campo de fútbol de más de un kilómetro no tendría sentido: comprueba el orden de magnitud.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Tres saltos a la derecha: $0{,}105\\ \\mathrm{km} = 105\\ \\mathrm{m}$. Un campo de fútbol mide poco más de cien metros: el resultado tiene sentido.",
    },
  ],
};
