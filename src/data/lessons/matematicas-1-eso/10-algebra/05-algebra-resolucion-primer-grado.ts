import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraResolucionPrimerGradoLesson: InteractiveLesson = {
  slug: "algebra-resolucion-primer-grado",
  title: "5. Ecuaciones de primer grado",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  steps: [
    {
      id: "metodo",
      type: "concept",
      help: [
        {
          label: "Piensa en una balanza",
          message: "Cada paso mantiene la balanza equilibrada: lo que haces en un lado, lo haces en el otro.",
        },
        {
          label: "¿Reducir o transponer?",
          message: "Reducir: juntar términos semejantes **dentro** de un miembro. Transponer: pasar un término **al otro** miembro con el signo cambiado.",
        },
        {
          label: "¿Por qué cambia el signo?",
          message: "Porque en realidad restas (o sumas) lo mismo en los dos lados.",
          math: ["x + 3 = 5 \\;\\Rightarrow\\; x + 3 - 3 = 5 - 3"],
        },
      ],
      title: "Reducir y transponer",
      content: [
        "Para resolver una ecuación la transformamos en otras **equivalentes** más sencillas hasta **despejar** la incógnita.",
        "Dos recursos: **reducir** términos semejantes en cada miembro y **transponer** términos de un miembro al otro (cambiando el signo).",
        "Ejemplo: $7x - 2x + 4 = 8 + 3x + 2$. Reducimos → $5x + 4 = 10 + 3x$. Transponemos $3x$ → $2x + 4 = 10$. Transponemos $4$ → $2x = 6$. Dividimos → $x = 3$.",
      ],
    },
    {
      id: "comprobacion",
      type: "concept",
      help: [
        {
          label: "¿Por qué en la ecuación original?",
          message: "Si sustituyes en una ecuación ya transformada, un error cometido antes pasaría desapercibido.",
        },
        {
          label: "¿Cómo lo hago?",
          message: "Calcula cada miembro por separado con el valor hallado y compara los dos números.",
        },
      ],
      title: "Comprobar la solución",
      content: [
        "Sustituye el valor hallado en la ecuación **original** y verifica que ambos miembros coinciden.",
        "Con $x = 3$: $7 \\cdot 3 - 2 \\cdot 3 + 4 = 19$ y $8 + 3 \\cdot 3 + 2 = 19$.",
        "La comprobación detecta errores de cálculo al transponer o reducir.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Comprobación con $x = 3$",
          rows: ["7 \\cdot 3 - 2 \\cdot 3 + 4", "8 + 3 \\cdot 3 + 2"],
          operator: "=",
          result: "19",
          caption: "La igualdad se cumple.",
        },
      ],
    },
    {
      id: "ejemplo-animado",
      type: "animated_solution",
      help: [
        {
          label: "¿Por qué reduzco primero?",
          message: "Simplificar cada miembro antes de transponer evita manejar más términos de los necesarios.",
        },
        {
          label: "Del paso $2$ al $3$",
          message: "En $4 = 12x$ la $x$ está multiplicada por $12$. La operación inversa es dividir entre $12$.",
        },
        {
          label: "Una solución fraccionaria",
          message: "Una solución no tiene por qué ser entera: $\\frac{1}{3}$ vale. Se comprueba igual.",
        },
      ],
      title: "Ecuación con términos en ambos miembros",
      content: ["Resuelve: $5 - 4x = 7 + 8x - 6$."],
      frames: [
        {
          caption: "Reducimos el segundo miembro:",
          math: "5 - 4x = 1 + 8x",
        },
        {
          caption: "Transponemos $8x$ y el $1$:",
          math: "5 - 1 = 12x \\Rightarrow 4 = 12x",
        },
        {
          caption: "Dividimos entre $12$:",
          math: "x = \\frac{1}{3}",
        },
      ],
    },
    {
      id: "check",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es transponer?",
          message: "Pasar un término al otro lado cambiándole el signo. Piensa en una balanza: lo que haces en un platillo, lo haces en el otro.",
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
  ],
};
