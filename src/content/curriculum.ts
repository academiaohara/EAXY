import type { Curriculum } from "@/content/types";

/**
 * Fuente única de verdad del contenido curricular de desarrollo.
 *
 * - `supabase/seed.sql` se genera desde aquí con `npm run seed:generate`.
 * - El modo mock E2E lee este catálogo directamente, sin base de datos.
 *
 * Los UUID son fijos para que las referencias sean estables entre entornos.
 */

const COURSE_ID = "a1000000-0000-4000-8000-000000000001";

function moduleId(n: number) {
  return `a2000000-0000-4000-8000-${n.toString().padStart(12, "0")}`;
}
function lessonId(n: number) {
  return `a3000000-0000-4000-8000-${n.toString().padStart(12, "0")}`;
}
function conceptId(n: number) {
  return `b1000000-0000-4000-8000-${n.toString().padStart(12, "0")}`;
}
function exerciseId(n: number) {
  return `c1000000-0000-4000-8000-${n.toString().padStart(12, "0")}`;
}

export const curriculum: Curriculum = {
  course: {
    id: COURSE_ID,
    title: "Matemáticas 2º ESO",
    description:
      "Números enteros, fracciones, ecuaciones de primer grado y proporcionalidad. Practica a tu ritmo con ejercicios que se adaptan a lo que ya dominas.",
  },

  concepts: [
    {
      id: conceptId(3),
      slug: "integers-add-subtract",
      title: "Sumar y restar enteros",
      description: "Operar con números positivos y negativos usando la regla de los signos.",
    },
    {
      id: conceptId(4),
      slug: "integers-multiply-divide",
      title: "Multiplicar y dividir enteros",
      description: "Aplicar la regla de los signos en productos y cocientes de enteros.",
      prerequisites: [{ slug: "integers-add-subtract", minMastery: 0.5 }],
    },
    {
      id: conceptId(5),
      slug: "integers-combined-operations",
      title: "Operaciones combinadas con enteros",
      description: "Respetar la jerarquía de operaciones y los paréntesis con números enteros.",
      prerequisites: [
        { slug: "integers-add-subtract", minMastery: 0.6 },
        { slug: "integers-multiply-divide", minMastery: 0.6 },
      ],
    },
    {
      id: conceptId(6),
      slug: "fractions-equivalent",
      title: "Fracciones equivalentes",
      description: "Reconocer, simplificar y amplificar fracciones que representan la misma cantidad.",
    },
    {
      id: conceptId(7),
      slug: "fractions-add-subtract",
      title: "Sumar y restar fracciones",
      description: "Reducir a común denominador para sumar y restar fracciones.",
      prerequisites: [{ slug: "fractions-equivalent", minMastery: 0.6 }],
    },
    {
      id: conceptId(8),
      slug: "fractions-multiply-divide",
      title: "Multiplicar y dividir fracciones",
      description: "Multiplicar en línea y dividir multiplicando por la inversa.",
      prerequisites: [{ slug: "fractions-equivalent", minMastery: 0.5 }],
    },
    {
      id: conceptId(1),
      slug: "linear-equations-basic",
      title: "Ecuaciones lineales básicas",
      description: "Resolver ecuaciones de la forma ax + b = c despejando la incógnita.",
      prerequisites: [{ slug: "integers-combined-operations", minMastery: 0.5 }],
    },
    {
      id: conceptId(2),
      slug: "linear-equations-parentheses",
      title: "Ecuaciones con paréntesis",
      description:
        "Resolver ecuaciones que requieren aplicar la propiedad distributiva antes de despejar.",
      prerequisites: [{ slug: "linear-equations-basic", minMastery: 0.6 }],
    },
    {
      id: conceptId(9),
      slug: "linear-equations-fractions",
      title: "Ecuaciones con denominadores",
      description: "Eliminar denominadores multiplicando por el mínimo común múltiplo.",
      prerequisites: [
        { slug: "linear-equations-basic", minMastery: 0.6 },
        { slug: "fractions-add-subtract", minMastery: 0.5 },
      ],
    },
    {
      id: conceptId(10),
      slug: "linear-equations-word-problems",
      title: "Problemas con ecuaciones",
      description: "Traducir un enunciado a una ecuación y resolverla.",
      prerequisites: [{ slug: "linear-equations-basic", minMastery: 0.6 }],
    },
    {
      id: conceptId(11),
      slug: "proportions-direct",
      title: "Proporcionalidad directa",
      description: "Resolver problemas con magnitudes directamente proporcionales y reglas de tres.",
      prerequisites: [{ slug: "fractions-equivalent", minMastery: 0.5 }],
    },
    {
      id: conceptId(12),
      slug: "percentages-basic",
      title: "Porcentajes",
      description: "Calcular porcentajes, aumentos y descuentos.",
      prerequisites: [
        { slug: "fractions-equivalent", minMastery: 0.5 },
        { slug: "proportions-direct", minMastery: 0.5 },
      ],
    },
  ],

  modules: [
    {
      id: moduleId(2),
      title: "Números enteros",
      orderIndex: 0,
      lessons: [
        {
          id: lessonId(2),
          title: "Sumar y restar enteros",
          orderIndex: 0,
          summary:
            "Los números enteros incluyen los negativos. Para sumar dos números del mismo signo, suma sus valores y conserva el signo. Si tienen signo distinto, resta el menor del mayor y pon el signo del mayor. Restar un número es lo mismo que sumar su opuesto: 5 − (−3) = 5 + 3.",
          conceptSlugs: ["integers-add-subtract"],
        },
        {
          id: lessonId(3),
          title: "Multiplicar y dividir enteros",
          orderIndex: 1,
          summary:
            "Regla de los signos: signos iguales dan positivo, signos distintos dan negativo. Así, (−6) · (−4) = 24 y 36 : (−9) = −4. Con tres o más factores, cuenta los negativos: un número impar de negativos da resultado negativo.",
          conceptSlugs: ["integers-multiply-divide"],
        },
        {
          id: lessonId(4),
          title: "Operaciones combinadas",
          orderIndex: 2,
          summary:
            "Jerarquía de operaciones: primero paréntesis, después multiplicaciones y divisiones (de izquierda a derecha) y por último sumas y restas. Ejemplo: 3 + 4 · (−2) = 3 + (−8) = −5.",
          conceptSlugs: ["integers-combined-operations"],
        },
      ],
    },
    {
      id: moduleId(3),
      title: "Fracciones",
      orderIndex: 1,
      lessons: [
        {
          id: lessonId(5),
          title: "Fracciones equivalentes",
          orderIndex: 0,
          summary:
            "Dos fracciones son equivalentes si representan la misma cantidad: 3/4 = 6/8. Se obtienen multiplicando o dividiendo numerador y denominador por el mismo número. Simplificar es dividir hasta llegar a la fracción irreducible.",
          conceptSlugs: ["fractions-equivalent"],
        },
        {
          id: lessonId(6),
          title: "Sumar y restar fracciones",
          orderIndex: 1,
          summary:
            "Para sumar o restar fracciones con distinto denominador, redúcelas a común denominador (el mínimo común múltiplo) y opera los numeradores: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
          conceptSlugs: ["fractions-add-subtract"],
        },
        {
          id: lessonId(7),
          title: "Multiplicar y dividir fracciones",
          orderIndex: 2,
          summary:
            "Multiplicar fracciones es multiplicar en línea: 2/3 · 3/4 = 6/12 = 1/2. Dividir es multiplicar por la inversa de la segunda: (3/5) : (2/5) = 3/5 · 5/2 = 3/2.",
          conceptSlugs: ["fractions-multiply-divide"],
        },
      ],
    },
    {
      id: moduleId(1),
      title: "Ecuaciones",
      orderIndex: 2,
      lessons: [
        {
          id: lessonId(1),
          title: "Ecuaciones de primer grado",
          orderIndex: 0,
          summary:
            "Una ecuación es una igualdad con una incógnita. Para resolverla, aplica la misma operación a ambos lados hasta despejar x. Si hay paréntesis, primero aplica la propiedad distributiva: 2(x + 3) = 14 → 2x + 6 = 14 → 2x = 8 → x = 4.",
          conceptSlugs: ["linear-equations-basic", "linear-equations-parentheses"],
        },
        {
          id: lessonId(8),
          title: "Ecuaciones con denominadores",
          orderIndex: 1,
          summary:
            "Cuando la incógnita aparece dividida, multiplica toda la ecuación por el denominador (o por el mínimo común múltiplo) para eliminarlo: x/2 + 3 = 7 → x + 6 = 14 → x = 8.",
          conceptSlugs: ["linear-equations-fractions"],
        },
        {
          id: lessonId(9),
          title: "Problemas con ecuaciones",
          orderIndex: 2,
          summary:
            "Lee el enunciado, elige la incógnita, traduce cada frase a lenguaje algebraico y resuelve. Comprueba siempre que la solución tiene sentido en el contexto del problema.",
          conceptSlugs: ["linear-equations-word-problems"],
        },
      ],
    },
    {
      id: moduleId(4),
      title: "Proporcionalidad y porcentajes",
      orderIndex: 3,
      lessons: [
        {
          id: lessonId(10),
          title: "Proporcionalidad directa",
          orderIndex: 0,
          summary:
            "Dos magnitudes son directamente proporcionales si al multiplicar una, la otra se multiplica igual. La regla de tres resuelve estos problemas: si 3 cuadernos cuestan 4,50 €, uno cuesta 1,50 € y 7 cuestan 10,50 €.",
          conceptSlugs: ["proportions-direct"],
        },
        {
          id: lessonId(11),
          title: "Porcentajes",
          orderIndex: 1,
          summary:
            "Un porcentaje es una fracción de denominador 100. El 25 % de 80 es 80 · 25/100 = 20. Para aplicar un descuento del 15 %, pagas el 85 %: 40 · 0,85 = 34 €.",
          conceptSlugs: ["percentages-basic"],
        },
      ],
    },
  ],

  exercises: [
    // --- Sumar y restar enteros ---
    {
      id: exerciseId(7),
      conceptSlug: "integers-add-subtract",
      type: "multiple_choice",
      difficulty: 1,
      content: {
        question: "Calcula: (−7) + 4",
        options: [
          { id: "a", text: "−3" },
          { id: "b", text: "3" },
          { id: "c", text: "−11" },
          { id: "d", text: "11" },
        ],
        correctOptionId: "a",
        explanation:
          "Tienen signo distinto: restamos 7 − 4 = 3 y ponemos el signo del mayor en valor absoluto (−7). Resultado: −3.",
      },
    },
    {
      id: exerciseId(8),
      conceptSlug: "integers-add-subtract",
      type: "numeric",
      difficulty: 1,
      content: {
        question: "Calcula: 5 − 12",
        correctAnswer: -7,
        explanation: "5 − 12 es lo mismo que 5 + (−12). Como 12 > 5, el resultado es negativo: −7.",
      },
    },
    {
      id: exerciseId(9),
      conceptSlug: "integers-add-subtract",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "Calcula: (−8) − (−3)",
        correctAnswer: -5,
        explanation: "Restar un negativo es sumar su opuesto: (−8) − (−3) = −8 + 3 = −5.",
      },
    },

    // --- Multiplicar y dividir enteros ---
    {
      id: exerciseId(10),
      conceptSlug: "integers-multiply-divide",
      type: "multiple_choice",
      difficulty: 1,
      content: {
        question: "Calcula: (−6) · (−4)",
        options: [
          { id: "a", text: "24" },
          { id: "b", text: "−24" },
          { id: "c", text: "−10" },
          { id: "d", text: "10" },
        ],
        correctOptionId: "a",
        explanation: "Signos iguales dan positivo: (−6) · (−4) = 24.",
      },
    },
    {
      id: exerciseId(11),
      conceptSlug: "integers-multiply-divide",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "Calcula: 36 : (−9)",
        correctAnswer: -4,
        explanation: "Signos distintos dan negativo: 36 : 9 = 4, por tanto 36 : (−9) = −4.",
      },
    },
    {
      id: exerciseId(12),
      conceptSlug: "integers-multiply-divide",
      type: "multiple_choice",
      difficulty: 3,
      content: {
        question: "Calcula: (−2) · (−3) · (−5)",
        options: [
          { id: "a", text: "30" },
          { id: "b", text: "−30" },
          { id: "c", text: "10" },
          { id: "d", text: "−10" },
        ],
        correctOptionId: "b",
        explanation:
          "Hay tres factores negativos (número impar), así que el resultado es negativo: 2 · 3 · 5 = 30 → −30.",
      },
    },

    // --- Operaciones combinadas ---
    {
      id: exerciseId(13),
      conceptSlug: "integers-combined-operations",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "Calcula: 3 + 4 · (−2)",
        correctAnswer: -5,
        explanation: "Primero la multiplicación: 4 · (−2) = −8. Después la suma: 3 + (−8) = −5.",
      },
    },
    {
      id: exerciseId(14),
      conceptSlug: "integers-combined-operations",
      type: "numeric",
      difficulty: 3,
      content: {
        question: "Calcula: (5 − 8) · 2 + 6",
        correctAnswer: 0,
        explanation: "Paréntesis primero: 5 − 8 = −3. Luego (−3) · 2 = −6. Finalmente −6 + 6 = 0.",
      },
    },
    {
      id: exerciseId(15),
      conceptSlug: "integers-combined-operations",
      type: "multiple_choice",
      difficulty: 3,
      content: {
        question: "Calcula: 12 : (−3) − 2 · (−4)",
        options: [
          { id: "a", text: "4" },
          { id: "b", text: "−12" },
          { id: "c", text: "−4" },
          { id: "d", text: "12" },
        ],
        correctOptionId: "a",
        explanation: "12 : (−3) = −4 y 2 · (−4) = −8. Entonces −4 − (−8) = −4 + 8 = 4.",
      },
    },

    // --- Fracciones equivalentes ---
    {
      id: exerciseId(16),
      conceptSlug: "fractions-equivalent",
      type: "multiple_choice",
      difficulty: 1,
      content: {
        question: "¿Cuál de estas fracciones es equivalente a 3/4?",
        options: [
          { id: "a", text: "6/8" },
          { id: "b", text: "4/5" },
          { id: "c", text: "9/16" },
          { id: "d", text: "3/8" },
        ],
        correctOptionId: "a",
        explanation: "Multiplicando numerador y denominador por 2: 3/4 = 6/8.",
      },
    },
    {
      id: exerciseId(17),
      conceptSlug: "fractions-equivalent",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "Simplifica 18/24 hasta la fracción irreducible. ¿Cuál es su numerador?",
        correctAnswer: 3,
        explanation: "El máximo común divisor de 18 y 24 es 6: 18/24 = 3/4. El numerador es 3.",
      },
    },
    {
      id: exerciseId(18),
      conceptSlug: "fractions-equivalent",
      type: "multiple_choice",
      difficulty: 2,
      content: {
        question: "Completa: 2/5 = x/20. ¿Cuánto vale x?",
        options: [
          { id: "a", text: "8" },
          { id: "b", text: "4" },
          { id: "c", text: "10" },
          { id: "d", text: "17" },
        ],
        correctOptionId: "a",
        explanation: "De 5 a 20 se multiplica por 4, así que el numerador también: 2 · 4 = 8.",
      },
    },

    // --- Sumar y restar fracciones ---
    {
      id: exerciseId(19),
      conceptSlug: "fractions-add-subtract",
      type: "multiple_choice",
      difficulty: 2,
      content: {
        question: "Calcula: 1/2 + 1/3",
        options: [
          { id: "a", text: "5/6" },
          { id: "b", text: "2/5" },
          { id: "c", text: "1/6" },
          { id: "d", text: "2/6" },
        ],
        correctOptionId: "a",
        explanation: "Común denominador 6: 1/2 = 3/6 y 1/3 = 2/6. Sumamos: 3/6 + 2/6 = 5/6.",
      },
    },
    {
      id: exerciseId(20),
      conceptSlug: "fractions-add-subtract",
      type: "multiple_choice",
      difficulty: 3,
      content: {
        question: "Calcula: 3/4 − 1/6",
        options: [
          { id: "a", text: "7/12" },
          { id: "b", text: "1/2" },
          { id: "c", text: "2/12" },
          { id: "d", text: "1" },
        ],
        correctOptionId: "a",
        explanation: "Común denominador 12: 3/4 = 9/12 y 1/6 = 2/12. Restamos: 9/12 − 2/12 = 7/12.",
      },
    },
    {
      id: exerciseId(21),
      conceptSlug: "fractions-add-subtract",
      type: "numeric",
      difficulty: 3,
      content: {
        question: "Calcula 2/3 + 5/6 y expresa el resultado como número decimal.",
        correctAnswer: 1.5,
        tolerance: 0.01,
        explanation: "2/3 = 4/6, así que 4/6 + 5/6 = 9/6 = 3/2 = 1,5.",
      },
    },

    // --- Multiplicar y dividir fracciones ---
    {
      id: exerciseId(22),
      conceptSlug: "fractions-multiply-divide",
      type: "multiple_choice",
      difficulty: 2,
      content: {
        question: "Calcula: 2/3 · 3/4",
        options: [
          { id: "a", text: "1/2" },
          { id: "b", text: "5/7" },
          { id: "c", text: "6/7" },
          { id: "d", text: "8/9" },
        ],
        correctOptionId: "a",
        explanation: "Multiplicamos en línea: (2 · 3)/(3 · 4) = 6/12 = 1/2.",
      },
    },
    {
      id: exerciseId(23),
      conceptSlug: "fractions-multiply-divide",
      type: "multiple_choice",
      difficulty: 3,
      content: {
        question: "Calcula: (3/5) : (2/5)",
        options: [
          { id: "a", text: "3/2" },
          { id: "b", text: "6/25" },
          { id: "c", text: "2/3" },
          { id: "d", text: "5/10" },
        ],
        correctOptionId: "a",
        explanation: "Dividir es multiplicar por la inversa: 3/5 · 5/2 = 15/10 = 3/2.",
      },
    },
    {
      id: exerciseId(24),
      conceptSlug: "fractions-multiply-divide",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "Calcula los 3/4 de 20.",
        correctAnswer: 15,
        explanation: "3/4 de 20 = 20 : 4 · 3 = 5 · 3 = 15.",
      },
    },

    // --- Ecuaciones lineales básicas (existentes) ---
    {
      id: exerciseId(1),
      conceptSlug: "linear-equations-basic",
      type: "multiple_choice",
      difficulty: 1,
      content: {
        question: "¿Cuál es el valor de x en la ecuación 2x + 4 = 10?",
        options: [
          { id: "a", text: "x = 2" },
          { id: "b", text: "x = 3" },
          { id: "c", text: "x = 4" },
          { id: "d", text: "x = 6" },
        ],
        correctOptionId: "b",
        explanation: "Restamos 4 a ambos lados: 2x = 6. Dividimos entre 2: x = 3.",
      },
    },
    {
      id: exerciseId(2),
      conceptSlug: "linear-equations-basic",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "Resuelve: 3x − 5 = 10. ¿Cuánto vale x?",
        correctAnswer: 5,
        explanation: "Sumamos 5 a ambos lados: 3x = 15. Dividimos entre 3: x = 5.",
      },
    },
    {
      id: exerciseId(3),
      conceptSlug: "linear-equations-basic",
      type: "multiple_choice",
      difficulty: 2,
      content: {
        question: "¿Qué operación debes hacer primero para resolver 4x + 8 = 20?",
        options: [
          { id: "a", text: "Dividir ambos lados entre 4" },
          { id: "b", text: "Restar 8 a ambos lados" },
          { id: "c", text: "Sumar 8 a ambos lados" },
          { id: "d", text: "Multiplicar ambos lados por 4" },
        ],
        correctOptionId: "b",
        explanation:
          "Primero aislamos el término con x eliminando el 8: 4x = 12. Después dividimos entre 4: x = 3.",
      },
    },

    // --- Ecuaciones con paréntesis (existentes) ---
    {
      id: exerciseId(4),
      conceptSlug: "linear-equations-parentheses",
      type: "numeric",
      difficulty: 3,
      content: {
        question: "Resuelve: 2(x + 3) = 14. ¿Cuánto vale x?",
        correctAnswer: 4,
        explanation: "Distribuimos: 2x + 6 = 14. Restamos 6: 2x = 8. Dividimos entre 2: x = 4.",
      },
    },
    {
      id: exerciseId(5),
      conceptSlug: "linear-equations-parentheses",
      type: "multiple_choice",
      difficulty: 3,
      content: {
        question: "Al resolver 3(x − 2) = 9, ¿cuál es el valor correcto de x?",
        options: [
          { id: "a", text: "x = 1" },
          { id: "b", text: "x = 3" },
          { id: "c", text: "x = 5" },
          { id: "d", text: "x = 7" },
        ],
        correctOptionId: "c",
        explanation: "Distribuimos: 3x − 6 = 9. Sumamos 6: 3x = 15. Dividimos entre 3: x = 5.",
      },
    },
    {
      id: exerciseId(6),
      conceptSlug: "linear-equations-parentheses",
      type: "numeric",
      difficulty: 4,
      content: {
        question: "Resuelve: 5(x + 1) − 2x = 14. ¿Cuánto vale x?",
        correctAnswer: 3,
        tolerance: 0,
        explanation: "Distribuimos: 5x + 5 − 2x = 14 → 3x + 5 = 14 → 3x = 9 → x = 3.",
      },
    },

    // --- Ecuaciones con denominadores ---
    {
      id: exerciseId(25),
      conceptSlug: "linear-equations-fractions",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "Resuelve: x/2 + 3 = 7. ¿Cuánto vale x?",
        correctAnswer: 8,
        explanation: "Restamos 3: x/2 = 4. Multiplicamos por 2: x = 8.",
      },
    },
    {
      id: exerciseId(26),
      conceptSlug: "linear-equations-fractions",
      type: "multiple_choice",
      difficulty: 3,
      content: {
        question: "Resuelve: x/3 − 1 = 2",
        options: [
          { id: "a", text: "x = 9" },
          { id: "b", text: "x = 3" },
          { id: "c", text: "x = 1" },
          { id: "d", text: "x = 6" },
        ],
        correctOptionId: "a",
        explanation: "Sumamos 1: x/3 = 3. Multiplicamos por 3: x = 9.",
      },
    },
    {
      id: exerciseId(27),
      conceptSlug: "linear-equations-fractions",
      type: "numeric",
      difficulty: 3,
      content: {
        question: "Resuelve: (x + 1)/2 = 4. ¿Cuánto vale x?",
        correctAnswer: 7,
        explanation: "Multiplicamos por 2: x + 1 = 8. Restamos 1: x = 7.",
      },
    },

    // --- Problemas con ecuaciones ---
    {
      id: exerciseId(28),
      conceptSlug: "linear-equations-word-problems",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "El doble de un número más 5 es 17. ¿Cuál es el número?",
        correctAnswer: 6,
        explanation: "Llamamos x al número: 2x + 5 = 17 → 2x = 12 → x = 6.",
      },
    },
    {
      id: exerciseId(29),
      conceptSlug: "linear-equations-word-problems",
      type: "multiple_choice",
      difficulty: 3,
      content: {
        question:
          "Ana tiene 3 años más que Luis y entre los dos suman 25 años. ¿Cuántos años tiene Luis?",
        options: [
          { id: "a", text: "11" },
          { id: "b", text: "14" },
          { id: "c", text: "12" },
          { id: "d", text: "8" },
        ],
        correctOptionId: "a",
        explanation:
          "Si Luis tiene x años, Ana tiene x + 3: x + (x + 3) = 25 → 2x = 22 → x = 11.",
      },
    },
    {
      id: exerciseId(30),
      conceptSlug: "linear-equations-word-problems",
      type: "numeric",
      difficulty: 4,
      content: {
        question:
          "Un rectángulo mide 4 cm más de largo que de ancho y su perímetro es 28 cm. ¿Cuánto mide el ancho?",
        correctAnswer: 5,
        unit: "cm",
        explanation:
          "Ancho x, largo x + 4. Perímetro: 2x + 2(x + 4) = 28 → 4x + 8 = 28 → 4x = 20 → x = 5 cm.",
      },
    },

    // --- Proporcionalidad directa ---
    {
      id: exerciseId(31),
      conceptSlug: "proportions-direct",
      type: "numeric",
      difficulty: 2,
      content: {
        question: "Tres cuadernos cuestan 4,50 €. ¿Cuánto cuestan 7 cuadernos?",
        correctAnswer: 10.5,
        tolerance: 0.01,
        unit: "€",
        explanation: "Un cuaderno cuesta 4,50 : 3 = 1,50 €. Siete cuestan 1,50 · 7 = 10,50 €.",
      },
    },
    {
      id: exerciseId(32),
      conceptSlug: "proportions-direct",
      type: "multiple_choice",
      difficulty: 2,
      content: {
        question: "Si 5 kg de naranjas cuestan 8 €, ¿cuánto cuestan 15 kg?",
        options: [
          { id: "a", text: "24 €" },
          { id: "b", text: "18 €" },
          { id: "c", text: "40 €" },
          { id: "d", text: "13 €" },
        ],
        correctOptionId: "a",
        explanation: "15 kg es el triple de 5 kg, así que el precio también se triplica: 8 · 3 = 24 €.",
      },
    },
    {
      id: exerciseId(33),
      conceptSlug: "proportions-direct",
      type: "numeric",
      difficulty: 3,
      content: {
        question: "Halla x en la proporción x/12 = 5/4.",
        correctAnswer: 15,
        explanation: "Multiplicamos en cruz: 4x = 60 → x = 15.",
      },
    },

    // --- Porcentajes ---
    {
      id: exerciseId(34),
      conceptSlug: "percentages-basic",
      type: "numeric",
      difficulty: 1,
      content: {
        question: "Calcula el 25 % de 80.",
        correctAnswer: 20,
        explanation: "25 % es la cuarta parte: 80 : 4 = 20. También: 80 · 25/100 = 20.",
      },
    },
    {
      id: exerciseId(35),
      conceptSlug: "percentages-basic",
      type: "multiple_choice",
      difficulty: 3,
      content: {
        question: "Una camiseta de 40 € tiene un 15 % de descuento. ¿Cuánto pagas?",
        options: [
          { id: "a", text: "34 €" },
          { id: "b", text: "6 €" },
          { id: "c", text: "25 €" },
          { id: "d", text: "36 €" },
        ],
        correctOptionId: "a",
        explanation: "El descuento es 40 · 0,15 = 6 €. Pagas 40 − 6 = 34 € (o directamente 40 · 0,85).",
      },
    },
    {
      id: exerciseId(36),
      conceptSlug: "percentages-basic",
      type: "numeric",
      difficulty: 3,
      content: {
        question: "¿Qué porcentaje de 50 es 12?",
        correctAnswer: 24,
        unit: "%",
        explanation: "12/50 = 0,24, es decir, el 24 %.",
      },
    },
  ],
};
