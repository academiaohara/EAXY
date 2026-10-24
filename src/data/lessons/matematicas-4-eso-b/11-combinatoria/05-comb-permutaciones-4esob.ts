import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_11_SUBTITLE } from "@/data/lessons/shared";

export const combPermutaciones4esobLesson: InteractiveLesson = {
  slug: "comb-permutaciones-4esob",
  title: "5. Permutaciones y factorial",
  subtitle: TEMA_4ESOB_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ordenar",
      type: "slide",
      help: [
        { label: "Caso particular", message: "Una permutación es una variación en la que se toman **todos** los elementos: $P_m = V_{m,m}$." },
        { label: "Factorial", message: "El factorial crece muy rápido: $10! = 3\\,628\\,800$. Por convenio $0! = 1$." },
      ],
      title: "Ordenar todos los elementos",
      blocks: [
        { kind: "definition", text: "Las **permutaciones** de $m$ elementos son las distintas formas de **ordenarlos todos**. No hay repetición; solo importa el orden." },
        { kind: "rule", formula: "P_m = m! = m \\cdot (m-1) \\cdots 3 \\cdot 2 \\cdot 1" },
        { kind: "facts", items: [{ tex: "3! = 6" }, { tex: "5! = 120" }, { tex: "8! = 40\\,320" }] },
      ],
      visual: { kind: "anim", scene: "permutaciones-arbol" },
    },
    {
      id: "check-premio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Seis letras distintas", message: "«premio» tiene seis letras diferentes: p, r, e, m, i, o." }],
      title: "Ordenar las letras de «premio»",
      question: "¿Cuántas ordenaciones (con o sin sentido) se pueden hacer con las seis letras de «premio»? (solo el número)",
      correctAnswers: ["720"],
      explanation: "$P_6 = 6! = 720$.",
    },
    {
      id: "check-banco",
      type: "predict",
      mode: "choice",
      help: [{ label: "¿Se toman todos?", message: "Si no se toman todos los elementos (aquí se sientan 3 de 5 sitios), no es una permutación sino una variación." }],
      title: "¿Permutación o variación?",
      question: "¿De cuántas formas pueden sentarse $3$ personas en un banco de $5$ asientos?",
      choices: [
        { id: "a", label: "$V_{5,3} = 60$" },
        { id: "b", label: "$P_5 = 120$", incorrectFeedback: "$P_5$ ordenaría 5 elementos; aquí solo se colocan 3 personas en 5 sitios." },
        { id: "c", label: "$P_3 = 6$", incorrectFeedback: "Eso sería con exactamente 3 asientos. Con 5 asientos hay que elegir también cuáles se ocupan." },
        { id: "d", label: "$C_{5,3} = 10$", incorrectFeedback: "Las personas son distintas y el asiento importa: es una variación." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La primera persona tiene $5$ sitios, la segunda $4$ y la tercera $3$: $5\\cdot4\\cdot3 = 60$. Con $3$ asientos serían $P_3 = 6$.",
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Simplifica", message: "$\\dfrac{10!}{9!} = \\dfrac{10\\cdot9!}{9!}$." }],
      title: "Factoriales y cocientes",
      question: "Calcula $\\dfrac{P_{10}}{P_9}$. (solo el número)",
      correctAnswers: ["10"],
      explanation: "$\\dfrac{10!}{9!} = \\dfrac{10 \\cdot 9!}{9!} = 10$.",
    },
    {
      id: "check-12-9",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Tres factores", message: "$12! = 12\\cdot11\\cdot10\\cdot9!$." }],
      title: "Otro cociente de factoriales",
      question: "Calcula $\\dfrac{12!}{9!}$. (solo el número)",
      correctAnswers: ["1320", "1 320"],
      explanation: "$\\dfrac{12!}{9!} = 12 \\cdot 11 \\cdot 10 = 1\\,320$.",
    },
  ],
};
