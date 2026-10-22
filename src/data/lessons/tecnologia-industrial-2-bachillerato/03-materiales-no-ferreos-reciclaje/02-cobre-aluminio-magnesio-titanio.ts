import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_3_SUBTITLE } from "@/data/lessons/shared";

export const cobreAluminioMagnesioTitanioLesson: InteractiveLesson = {
  slug: "cobre-aluminio-magnesio-titanio",
  title: "2. Cobre, aluminio, magnesio y titanio",
  subtitle: TEMA_TI2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cobre",
      type: "slide",
      help: [
        {
          label: "¿Qué es la acritud?",
          message: "El endurecimiento de un metal al deformarlo en frío. Casi todas las aleaciones de cobre no se endurecen con tratamientos térmicos, sino por acritud y por formación de disoluciones sólidas.",
        },
      ],
      title: "El cobre y sus aleaciones",
      blocks: [
        {
          kind: "compare",
          left: { title: "Latón (Cu-Zn)", text: "El cinc es el soluto. Hasta el $35\\,\\%$ de Zn solo hay fase $\\alpha$: blanda, dúctil y fácil de trabajar en frío. Con más cinc aparece la fase $\\beta$, más dura: se trabaja en caliente.", tone: "info" },
          right: { title: "Bronce (Cu-Sn)", text: "Estaño (y a veces Al, Si, Ni). Más resistente que el latón y mejor frente a la corrosión: cojinetes y engranajes. El plomo mejora la lubricación.", tone: "key" },
        },
        {
          kind: "facts",
          items: [
            { tex: "< 1\\,\\%\\ \\text{impurezas}", label: "aplicaciones eléctricas" },
            { tex: "+\\ \\text{Be}\\ (2\\,\\%)", label: "antideflagrante: no produce chispas, hasta 1 400 MPa" },
          ],
        },
        {
          kind: "text",
          text: "El cobre sin alear es tan blando y dúctil que cuesta mecanizarlo, pero conduce muy bien y resiste la corrosión.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-cobre",
      type: "classify",
      help: [{ label: "Fase α o β", message: "La fase α es blanda y dúctil; la β es más dura y resistente." }],
      title: "Latón, bronce o cobre casi puro",
      question: "Asigna cada característica al material correspondiente.",
      groups: [
        { id: "laton", label: "Latón", tone: "amber" },
        { id: "bronce", label: "Bronce", tone: "rose" },
        { id: "cobre", label: "Cobre casi puro", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "Aleación Cu-Zn en la que el cinc es el soluto principal", group: "laton" },
        { id: "b", text: "Aleación Cu-Sn muy usada en cojinetes y engranajes", group: "bronce" },
        { id: "c", text: "Menos del 1 % de impurezas: cables y aplicaciones eléctricas", group: "cobre" },
        { id: "d", text: "Con las fases α + β se trabaja en caliente", group: "laton" },
        { id: "e", text: "Gran resistencia a la corrosión y al desgaste; el plomo mejora la lubricación", group: "bronce" },
        { id: "f", text: "Maleable: se puede enrollar y cortar sin romper", group: "cobre" },
      ],
      hint: "Fíjate en el elemento principal que acompaña al cobre.",
      explanation: "Latón: Cu-Zn; bronce: Cu-Sn (a veces Al, Si, Ni); cobre casi puro: conductividad y maleabilidad.",
    },
    {
      id: "aluminio",
      type: "slide",
      help: [
        {
          label: "¿Por qué no se usa más en sitios calientes?",
          message: "Funde a unos 657 °C, mucho menos que el acero. Esa baja temperatura de fusión restringe su campo de aplicación.",
        },
      ],
      title: "El aluminio y sus aleaciones",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\rho = 2{,}7\\ \\text{g/cm}^3", label: "frente a 7,9 del acero" },
            { tex: "T_f = 657\\ °\\text{C}", label: "su principal limitación" },
          ],
        },
        {
          kind: "text",
          text: "Es muy **dúctil**, buen conductor eléctrico y térmico, y resiste la corrosión frente a algunos medios. Se aleea con cobre, magnesio, silicio y cinc, y se clasifica en aleaciones para **moldeo** y para **forja**.",
        },
        {
          kind: "text",
          text: "Aplicaciones: aviación, envases, carrocerías, culatas, pistones… por su resistencia específica y su no toxicidad.",
        },
      ],
      visual: { kind: "tool", tool: "aleaciones-filtro", params: { a: 100, b: 5 } },
    },
    {
      id: "check-aluminio-aplicacion",
      type: "predict",
      help: [{ label: "Tabla 3.2", message: "Usa el filtro: deja la densidad máxima en $3$ g/cm³ y mira qué aleaciones de aluminio quedan al subir la resistencia." }],
      title: "Aplicaciones del aluminio",
      question: "¿Para qué se utiliza una aleación de aluminio con un $4{,}5\\,\\%$ de Mg y $60$ MPa de resistencia?",
      mode: "choice",
      choices: [
        { id: "tapas", label: "Tapas de latas y componentes marinos" },
        { id: "pistones", label: "Pistones de motores", incorrectFeedback: "Los pistones usan Al con 12 % de Si y 1 % de Mg." },
        { id: "ruedas", label: "Ruedas", incorrectFeedback: "Las ruedas se hacen con Al con 4,4 % de Cu." },
      ],
      correctChoiceId: "tapas",
      shuffleChoices: true,
      explanation: "Es una aleación de forja no tratable térmicamente: tapas de latas y componentes marinos.",
    },
    {
      id: "magnesio-titanio",
      type: "slide",
      help: [
        {
          label: "¿Por qué fundir Mg exige fundentes?",
          message: "En estado líquido arde en contacto con el aire; hace falta una capa protectora de fundentes.",
        },
      ],
      title: "Magnesio y titanio",
      blocks: [
        {
          kind: "compare",
          left: { title: "Magnesio", text: "El **más ligero** de los metales estructurales: $1{,}74$ g/cm³. Estructura HC: se conforma a $200$–$350$ °C. Más caro que el aluminio, aguanta peor la fatiga. Aviones, armamento, ruedas de automóvil.", tone: "ok" },
          right: { title: "Titanio", text: "Densidad $4{,}5$ y fusión a $1\\,668$ °C, extrema resistencia, dúctil y forjable. Reacciona con otros materiales a alta temperatura: se suelda protegido del aire. Aviones, vehículos espaciales, industria química.", tone: "key" },
        },
        {
          kind: "text",
          text: "Pruébalo con el filtro: exige resistencias de más de $600$ MPa y verás que solo sobreviven las aleaciones de titanio.",
        },
      ],
      visual: { kind: "tool", tool: "aleaciones-filtro", params: { a: 650, b: 5 } },
    },
    {
      id: "check-mg-ligero",
      type: "predict",
      help: [{ label: "Pista", message: "Mira la lista de densidades: aluminio $2{,}7$; magnesio $1{,}74$; titanio $4{,}5$ g/cm³." }],
      title: "El más ligero",
      question: "De entre aluminio, magnesio y titanio, ¿cuál es el metal estructural de menor densidad?",
      mode: "choice",
      choices: [
        { id: "mg", label: "Magnesio ($1{,}74$ g/cm³)" },
        { id: "al", label: "Aluminio ($2{,}7$ g/cm³)", incorrectFeedback: "El aluminio es ligero, pero el magnesio lo es aún más." },
        { id: "ti", label: "Titanio ($4{,}5$ g/cm³)", incorrectFeedback: "Es el más pesado de los tres, aunque el más resistente." },
      ],
      correctChoiceId: "mg",
      shuffleChoices: true,
      explanation: "El magnesio es el metal estructural de menor densidad. Por eso se usa en elementos sometidos a grandes aceleraciones.",
    },
    {
      id: "check-bici",
      type: "predict",
      help: [{ label: "Compara con el filtro", message: "Para una bicicleta de competición busca poco peso y mucha resistencia: el titanio tiene el mejor cociente resistencia/densidad de la tabla 3.1." }],
      title: "Eje de pedalier",
      question: "Un eje de pedalier de una bicicleta de competición debe ser muy ligero y muy resistente. ¿Qué material recomendarías para sustituir al acero?",
      mode: "choice",
      choices: [
        { id: "ti", label: "Una aleación de titanio" },
        { id: "pb", label: "Plomo", incorrectFeedback: "Es muy blando (14 MPa) y muy pesado." },
        { id: "w", label: "Wolframio", incorrectFeedback: "Tiene densidad $19{,}25$: el material más pesado de la tabla." },
      ],
      correctChoiceId: "ti",
      shuffleChoices: true,
      explanation: "El titanio tiene la mayor resistencia específica ($50{,}3$) de la tabla 3.1: es ligero y resiste mucho.",
    },
  ],
};
