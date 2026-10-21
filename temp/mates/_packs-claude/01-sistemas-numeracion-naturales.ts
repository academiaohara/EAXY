import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

/**
 * TIPOS QUE DEBE AÑADIR CURSOR en `src/lib/lesson/types.ts` (este archivo los usa):
 *
 * StageModuleId: añadir "sistemas-numeracion".
 *
 * export type NumeracionCalloutKind = "definicion" | "ojo" | "regla" | "pregunta";
 * export type NumeracionCallout = {
 *   id: string;
 *   kind: NumeracionCalloutKind;
 *   text: string;                       // máx. 2 líneas; admite **negrita** y $LaTeX$
 *   phase: number;                      // fase (0-based) en la que aparece
 *   side: "left" | "right" | "bottom";  // dónde se coloca respecto al dibujo
 * };
 * export type SistemasNumeracionScene =
 *   | "origen-contar" | "simbolos-agrupar" | "escribe-38-prehistorico"
 *   | "egipcio-aditivo" | "egipcio-orden-no-importa"
 *   | "romano-suma-resta" | "romano-construir"
 *   | "decimal-posicional" | "descomponer-numero" | "cero-guardian"
 *   | "comparar-sistemas";
 * export type SistemasNumeracionConfig = {
 *   scene: SistemasNumeracionScene;
 *   phases?: number;                    // nº de fases de la animación
 *   callouts?: NumeracionCallout[];
 *   value?: number;                     // número que se dibuja (1435, 35318, 305…)
 *   roman?: string;                     // numeral romano que se recorre
 *   romanList?: string[];               // varios numerales para recorrer en orden
 *   target?: number;                    // objetivo en escenas explore
 *   table?: { headers: string[]; rows: { label: string; cells: string[] }[] };
 * };
 *
 * NarrateStep, PredictStep, RevealStep, ExploreStep: añadir `numeracion?: SistemasNumeracionConfig`.
 * ExploreGoal: añadir { kind: "roman-target"; target: number }.
 */

export const sistemasNumeracionNaturalesLesson: InteractiveLesson = {
  slug: "sistemas-numeracion-naturales",
  title: "1. Origen de los números y aproximación por redondeo",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    // ───────────────────────── 1. ORIGEN: CONTAR ─────────────────────────
    {
      id: "origen-contar",
      type: "narrate",
      title: 'Contar es <span class="lesson-step-title-accent">emparejar</span>',
      definitionBox: "Los números nacieron de la necesidad de **contar**.",
      module: "sistemas-numeracion",
      scene: "origen-contar",
      numeracion: {
        scene: "origen-contar",
        phases: 5,
        value: 7,
        callouts: [
          {
            id: "contar-def",
            kind: "definicion",
            text: "**Contar** es emparejar cada objeto con una marca.",
            phase: 2,
            side: "right",
          },
          {
            id: "contar-pregunta",
            kind: "pregunta",
            text: "Sobra una muesca… ¿cuántas cabras faltan?",
            phase: 4,
            side: "bottom",
          },
        ],
      },
    },

    // ───────────────────────── 2. SÍMBOLOS Y AGRUPAR ─────────────────────────
    {
      id: "simbolos-agrupar",
      type: "narrate",
      title: 'Cuando hay muchas, <span class="lesson-step-title-accent">agrupamos</span>',
      definitionBox:
        "Para cantidades grandes se inventaron **símbolos**: una mano vale $5$ y una persona vale $20$.",
      module: "sistemas-numeracion",
      scene: "simbolos-agrupar",
      numeracion: {
        scene: "simbolos-agrupar",
        phases: 5,
        value: 47,
        callouts: [
          {
            id: "agrupar-mano",
            kind: "regla",
            text: "Una **mano** = 5 dedos = **5**.",
            phase: 1,
            side: "right",
          },
          {
            id: "agrupar-persona",
            kind: "regla",
            text: "Una **persona** = 20 dedos = **20**.",
            phase: 2,
            side: "right",
          },
          {
            id: "agrupar-sistema",
            kind: "definicion",
            text: "Símbolos + reglas para usarlos = **sistema de numeración**.",
            phase: 4,
            side: "bottom",
          },
        ],
      },
    },

    // ───────────────────────── 3. PREDICT: ESCRIBE EL 38 ─────────────────────────
    {
      id: "escribe-38-prehistorico",
      type: "predict",
      title: "Escribe como en la prehistoria",
      question:
        "Con persona ($20$), mano ($5$) y palito ($1$), ¿cómo escribirías el $38$?",
      mode: "choice",
      choices: [
        { id: "correcta", label: "1 persona + 3 manos + 3 palitos" },
        {
          id: "cincuenta-y-ocho",
          label: "2 personas + 3 manos + 3 palitos",
          incorrectFeedback:
            "Con 2 personas ya tienes $40$, que es más que $38$. Fíjate: ¿cuántas veinteenas caben en $38$?",
        },
        {
          id: "cuarenta-y-tres",
          label: "1 persona + 3 manos + 8 palitos",
          incorrectFeedback:
            "Suma: $20 + 15 + 8 = 43$. Te pasas. Después de la persona y las manos, ¿cuánto falta?",
        },
      ],
      correctChoiceId: "correcta",
      hintHiddenUntilRequested: true,
      hint: "Empieza por el símbolo más grande que quepa en $38$ y ve restando.",
      explanation:
        "$38 = 20 + 5 + 5 + 5 + 1 + 1 + 1$: una persona ($20$), tres manos ($15$) y tres palitos ($3$).",
      module: "sistemas-numeracion",
      scene: "escribe-38-prehistorico",
      numeracion: { scene: "escribe-38-prehistorico", value: 38 },
    },

    // ───────────────────────── 4. EGIPCIO ADITIVO ─────────────────────────
    {
      id: "egipcio-aditivo",
      type: "narrate",
      title: 'El sistema egipcio es <span class="lesson-step-title-accent">aditivo</span>',
      definitionBox:
        "Los egipcios tenían un símbolo para cada salto: $1$, $10$, $100$ y $1\\,000$.",
      module: "sistemas-numeracion",
      scene: "egipcio-aditivo",
      numeracion: {
        scene: "egipcio-aditivo",
        phases: 6,
        value: 1435,
        callouts: [
          {
            id: "egipcio-simbolos",
            kind: "regla",
            text: "Palito **1**, herradura **10**, cuerda **100**, flor de loto **1 000**.",
            phase: 0,
            side: "right",
          },
          {
            id: "egipcio-aditivo-def",
            kind: "definicion",
            text: "**Aditivo**: el número es la **suma** de sus símbolos.",
            phase: 4,
            side: "right",
          },
          {
            id: "egipcio-billetes",
            kind: "pregunta",
            text: "Como pagar con billetes: 1 de mil, 4 de cien, 3 de diez y 5 monedas.",
            phase: 5,
            side: "bottom",
          },
          {
            id: "egipcio-ojo",
            kind: "ojo",
            text: "Los números grandes ocupan **muchísimo** espacio.",
            phase: 5,
            side: "left",
          },
        ],
      },
    },

    // ───────────────────────── 5. EGIPCIO: EL ORDEN NO IMPORTA ─────────────────────────
    {
      id: "egipcio-orden-no-importa",
      type: "reveal",
      title: "En el egipcio, el orden no importa",
      definitionBox: "Si mezclas los símbolos, la **suma** sigue siendo la misma.",
      module: "sistemas-numeracion",
      scene: "egipcio-orden-no-importa",
      numeracion: {
        scene: "egipcio-orden-no-importa",
        value: 1435,
        callouts: [
          {
            id: "egipcio-orden-regla",
            kind: "regla",
            text: "Cambiar de sitio los símbolos **no cambia** el valor.",
            phase: 1,
            side: "right",
          },
        ],
      },
    },

    // ───────────────────────── 6. ROMANO ─────────────────────────
    {
      id: "romano-suma-resta",
      type: "narrate",
      title:
        'El sistema romano: sumar… y <span class="lesson-step-title-accent">a veces restar</span>',
      definitionBox:
        "Los romanos usaban letras: I, V, X, L, C, D y M. Normalmente se **suman**.",
      module: "sistemas-numeracion",
      scene: "romano-suma-resta",
      numeracion: {
        scene: "romano-suma-resta",
        phases: 7,
        romanList: ["XVI", "IV", "IX", "XL", "XC", "XIV", "MCCLXXX"],
        callouts: [
          {
            id: "romano-valores",
            kind: "regla",
            text: "I=1 · V=5 · X=10 · L=50 · C=100 · D=500 · M=1 000.",
            phase: 0,
            side: "right",
          },
          {
            id: "romano-truco",
            kind: "regla",
            text: "Si una letra es **menor** que la siguiente, **resta**; si no, **suma**.",
            phase: 2,
            side: "right",
          },
          {
            id: "romano-ojo",
            kind: "ojo",
            text: "IX ≠ XI: aquí el **orden** sí importa.",
            phase: 3,
            side: "bottom",
          },
        ],
      },
    },

    // ───────────────────────── 7. EXPLORE: CONSTRUIR UN ROMANO ─────────────────────────
    {
      id: "romano-construir",
      type: "explore",
      title: "Construye un número romano",
      question: "Pulsa las letras para formar el número romano que valga $1\\,250$.",
      module: "sistemas-numeracion",
      scene: "romano-construir",
      goal: { kind: "roman-target", target: 1250 },
      numeracion: { scene: "romano-construir", target: 1250 },
      explanation:
        "$1\\,250 = 1\\,000 + 200 + 50$, es decir, M + CC + L = MCCL.",
    },

    // ───────────────────────── 8. PREDICT: XLIV ─────────────────────────
    {
      id: "check-romano",
      type: "predict",
      title: "Lee un número romano",
      question: "¿Qué número es **XLIV**?",
      mode: "numeric",
      correctAnswers: ["44"],
      hintHiddenUntilRequested: true,
      hint: "Recorre de izquierda a derecha. XL es una resta y IV es otra resta.",
      explanation:
        "XL = $50 - 10 = 40$ e IV = $5 - 1 = 4$. Juntos: $40 + 4 = 44$.",
      module: "sistemas-numeracion",
      scene: "romano-suma-resta",
      numeracion: { scene: "romano-suma-resta", roman: "XLIV" },
    },

    // ───────────────────────── 9. DECIMAL POSICIONAL ─────────────────────────
    {
      id: "decimal-posicional",
      type: "narrate",
      title: 'El sistema decimal es <span class="lesson-step-title-accent">posicional</span>',
      definitionBox:
        "Nació en la **India** (siglo VII) y llegó a Europa por los **árabes**. Solo usa diez cifras.",
      module: "sistemas-numeracion",
      scene: "decimal-posicional",
      numeracion: {
        scene: "decimal-posicional",
        phases: 5,
        value: 33,
        callouts: [
          {
            id: "decimal-posicion",
            kind: "definicion",
            text: "El valor de una cifra depende del **lugar** que ocupa.",
            phase: 2,
            side: "right",
          },
          {
            id: "decimal-regla",
            kind: "regla",
            text: "**Diez** unidades de un orden = **una** del orden siguiente.",
            phase: 4,
            side: "bottom",
          },
        ],
      },
    },

    // ───────────────────────── 10. DESCOMPONER 35 318 ─────────────────────────
    {
      id: "descomponer-numero",
      type: "narrate",
      title: 'Descomponer el <span class="lesson-step-title-accent">35 318</span>',
      definitionBox:
        "**Descomponer** un número es escribirlo como suma de sus órdenes.",
      module: "sistemas-numeracion",
      scene: "descomponer-numero",
      numeracion: {
        scene: "descomponer-numero",
        phases: 4,
        value: 35318,
        callouts: [
          {
            id: "descomponer-ceros",
            kind: "regla",
            text: "Cada cifra se acompaña de **tantos ceros** como tenga su orden a la derecha.",
            phase: 2,
            side: "right",
          },
        ],
      },
    },

    // ───────────────────────── 11. EL CERO GUARDIÁN ─────────────────────────
    {
      id: "cero-guardian",
      type: "reveal",
      title: "El cero guarda el sitio",
      definitionBox: "Compara **305** y **35**: ¿qué pasa si quitamos el cero?",
      module: "sistemas-numeracion",
      scene: "cero-guardian",
      numeracion: {
        scene: "cero-guardian",
        value: 305,
        callouts: [
          {
            id: "cero-ojo",
            kind: "ojo",
            text: "El $0$ mantiene el $3$ en las **centenas**. Sin él, ¡el número cambia!",
            phase: 1,
            side: "right",
          },
        ],
      },
    },

    // ───────────────────────── 12. PREDICT: 53 vs 35 ─────────────────────────
    {
      id: "check-posicion",
      type: "predict",
      title: "Mismas cifras, distinto número",
      question: "¿Por qué $53$ y $35$ son números distintos si usan las mismas cifras?",
      mode: "choice",
      choices: [
        {
          id: "posicion",
          label: "Porque el valor de cada cifra depende de su posición",
        },
        {
          id: "orden-alfabetico",
          label: "Porque el $5$ siempre vale más que el $3$",
          incorrectFeedback:
            "El $5$ no vale siempre lo mismo: en $35$ vale $5$, pero en $53$ vale $50$.",
        },
        {
          id: "suma",
          label: "Porque en el sistema decimal solo se suman los símbolos",
          incorrectFeedback:
            "Eso es el sistema aditivo. Si solo sumaras, $5 + 3$ y $3 + 5$ darían lo mismo.",
        },
      ],
      correctChoiceId: "posicion",
      shuffleChoices: true,
      explanation:
        "$53 = 50 + 3$ y $35 = 30 + 5$. En el sistema decimal el **lugar** que ocupa una cifra cambia su valor.",
      module: "sistemas-numeracion",
      scene: "descomponer-numero",
      numeracion: { scene: "descomponer-numero", value: 53 },
    },

    // ───────────────────────── 13. COMPARAR SISTEMAS ─────────────────────────
    {
      id: "comparar-sistemas",
      type: "narrate",
      title: 'Por qué ganó el <span class="lesson-step-title-accent">decimal</span>',
      definitionBox:
        "El decimal es **corto**, cómodo para calcular y con solo diez cifras sirve para todo.",
      module: "sistemas-numeracion",
      scene: "comparar-sistemas",
      numeracion: {
        scene: "comparar-sistemas",
        phases: 5,
        table: {
          headers: ["Egipcio", "Romano", "Decimal"],
          rows: [
            { label: "Tipo", cells: ["Aditivo", "Aditivo (con restas)", "Posicional"] },
            { label: "¿Importa la posición?", cells: ["No", "Un poco", "Sí, mucho"] },
            { label: "¿Usa el 0?", cells: ["No", "No", "Sí"] },
            { label: "Números grandes", cells: ["Muy largo", "Largo", "Corto"] },
          ],
        },
      },
    },

    // ───────────────────────── 14+. REDONDEO (SIN CAMBIOS) ─────────────────────────
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
