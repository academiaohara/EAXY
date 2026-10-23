import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_10_SUBTITLE } from "@/data/lessons/shared";

export const simplificarDiagramasLesson: InteractiveLesson = {
  slug: "simplificar-diagramas",
  title: "8. Simplificar un diagrama de bloques",
  subtitle: TEMA_TI2_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "transposicion",
      type: "slide",
      help: [{ label: "¿Por qué transponer?", message: "Para que los bloques queden agrupados en serie, en paralelo o en anillo y se puedan reducir con las reglas básicas." }],
      title: "Mover ramificaciones y sumadores",
      blocks: [
        { kind: "text", text: "A veces los bloques no están agrupados de forma directa. Entonces hay que **transponer** puntos de bifurcación y de suma para que queden en serie, en paralelo o en anillo. Se puede hacer en ambos sentidos." },
        { kind: "steps", title: "Reglas de transposición", items: [
          "Mover un **punto de bifurcación** a través de un bloque $G$: la rama que «salta» el bloque necesita un bloque $G$ (si pasa de después a antes) o $1/G$ (si pasa de antes a después).",
          "Mover un **sumador** hacia la derecha o la izquierda de un bloque $G$: la entrada que cambia de lado se multiplica por $G$ o por $1/G$.",
        ] },
        { kind: "rule", title: "Idea básica", text: "El resultado final tiene que ser **equivalente**: la señal que sale por cada rama debe seguir siendo la misma." },
      ],
      arrange: "stack",
    },
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Ojo con el orden", message: "No hay una única secuencia correcta, pero conviene empezar por lo más interior y terminar con el lazo exterior." }],
      title: "Método de reducción",
      blocks: [
        { kind: "steps", items: [
          "Identifica **bloques en serie** y sustitúyelos por el producto.",
          "Identifica **ramas en paralelo** y sustitúyelas por la suma.",
          "Reduce los **lazos internos** con $G/(1+GH)$.",
          "Si no hay nada reducible, **transpón** un sumador o una bifurcación.",
          "Repite hasta tener un solo bloque o un único lazo; reduce el lazo exterior.",
        ] },
      ],
      visual: { kind: "anim", scene: "reduccion-bloques", beatMs: 5600 },
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [{ label: "Resultado del libro", message: "Con cuatro bloques $G_1\\dots G_4$ y tres realimentaciones $H_1,H_2,H_3$, el resultado es el que ves abajo (figura 10.35)." }],
      title: "El ejemplo del libro",
      blocks: [
        { kind: "text", text: "El libro simplifica un sistema con $G_1,G_2,G_3,G_4$ y tres realimentaciones $H_1,H_2,H_3$ en cinco pasos:" },
        { kind: "steps", items: [
          "Transponer el sumador $E_2$ pasando por el bloque $G_2$ (queda $G_2H_2$ en la realimentación).",
          "Reducir $G_1$ y $G_2$ en serie; y el lazo interno con $G_3$, $G_2$ y $H_2$: $\\dfrac{G_3}{1+G_2G_3H_2}$.",
          "Resolver el lazo con $H_3$ y $G_4$.",
          "Unir en serie $G_1G_2$ con el resultado.",
          "Cerrar el lazo exterior con $H_1$.",
        ] },
        { kind: "formula", tex: "\\dfrac{C}{R} = \\dfrac{G_1G_2G_3G_4}{1 + G_1G_2G_3G_4H_1 + G_2G_3H_2 + G_3G_4H_3}" },
      ],
      arrange: "stack",
    },
    {
      id: "check-primer",
      type: "predict",
      help: [{ label: "Pista", message: "Siempre se empieza por lo que se puede reducir directamente." }],
      title: "¿Por dónde empiezo?",
      question: "Tienes dos bloques en serie dentro de un lazo y otro lazo exterior. ¿Qué haces primero?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Sustituir los dos bloques en serie por su producto" },
        { id: "ext", label: "Cerrar el lazo exterior directamente", incorrectFeedback: "Primero hay que dejar un solo bloque en la cadena directa." },
        { id: "sumar", label: "Sumar sus funciones", incorrectFeedback: "Sumar es para ramas en paralelo." },
        { id: "borrar", label: "Eliminar la realimentación", incorrectFeedback: "Cambiaría el sistema." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Serie → producto. Luego se resuelven los lazos de dentro afuera.",
    },
    {
      id: "check-bifurcacion",
      type: "predict",
      help: [{ label: "Pista", message: "En la figura 10.28b la rama que pasa de después a antes del bloque necesita compensar." }],
      title: "Transponer una bifurcación",
      question: "Una bifurcación se mueve hacia atrás por delante de un bloque $G(s)$ y la rama que se toma ahí necesita ser igual a la salida del bloque. ¿Qué bloque hay que añadir en esa rama?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Un bloque $G(s)$" },
        { id: "inv", label: "Un bloque $1/G(s)$", incorrectFeedback: "Ese caso es al revés: cuando la bifurcación se mueve hacia delante del bloque." },
        { id: "uno", label: "Ninguno", incorrectFeedback: "Sin compensar, la señal sería distinta." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Para que la rama conserve la señal $G\\,U$ hay que reproducir el bloque $G$.",
    },
    {
      id: "check-anillo-h",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "Cadena directa $G = G_1G_2$; lazo $G/(1+GH)$." }],
      title: "Un ejemplo numérico",
      question: "Dos bloques $G_1 = 2$ y $G_2 = 3$ están en serie dentro de un lazo cerrado con $H = 1$. ¿Cuánto vale la FDT total? (dos decimales)",
      correctAnswers: ["0.86", "0,86", "6/7", "0.857", "0,857"],
      explanation: "$G = 6\\Rightarrow \\dfrac{6}{1+6\\cdot 1} = \\dfrac{6}{7} = 0{,}86$.",
    },
  ],
};
