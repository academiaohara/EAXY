import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesProblemasLesson: InteractiveLesson = {
  slug: "fracciones-problemas",
  title: "5. Problemas con fracciones",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  steps: [
    {
      id: "tipos",
      type: "concept",
      help: [
        {
          label: "¿Qué datos tengo?",
          message: "Mira qué te dan: ¿parte y total? ¿total y fracción? ¿parte y fracción? Cada pareja lleva a una cuenta distinta.",
        },
        {
          label: "El problema inverso",
          message: "Si conoces la parte y la fracción, deshaces la fracción: divides entre el numerador y multiplicas por el denominador.",
        },
      ],
      title: "Dos tipos habituales",
      content: [
        "**Calcular la fracción:** conoces parte y total → $\\text{fracción} = \\frac{\\text{parte}}{\\text{total}}$ y simplificas.",
        "**Fracción de un número (directo):** conoces total y fracción → $(\\text{total} : d) \\cdot n$.",
        "**Problema inverso:** conoces la parte y la fracción → total $= \\text{parte} : n \\cdot d$.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Del enunciado al cálculo",
          rows: [
            {
              text: "540 € de 1800 € en hipoteca",
              math: "\\frac{540}{1800} = \\frac{3}{10}",
            },
            {
              text: "Tres décimas de 1800 €",
              math: "\\frac{3}{10} \\text{ de } 1800 = 540\\,€",
            },
          ],
        },
      ],
    },
    {
      id: "hipoteca-fraccion",
      type: "animated_solution",
      help: [
        {
          label: "Parte entre total",
          message: "La fracción siempre es lo que te dan dividido entre el total.",
        },
        {
          label: "Simplificar",
          message: "Dividir entre el m.c.d. ($180$) simplifica en un solo paso.",
        },
      ],
      title: "Calcular la fracción — hipoteca",
      content: [
        "Un empleado gana $1800\\,€$ al mes y dedica $540\\,€$ a la hipoteca. ¿Qué fracción de su sueldo es?",
      ],
      frames: [
        { caption: "Fracción:", math: "\\frac{540}{1800}" },
        { caption: "Simplificando entre 180:", math: "\\frac{540}{1800} = \\frac{3}{10}" },
      ],
    },
    {
      id: "hipoteca-numero",
      type: "animated_solution",
      help: [
        {
          label: "Es el caso anterior al revés",
          message: "Antes conocías parte y total y buscabas la fracción. Ahora conoces total y fracción y buscas la parte.",
        },
        {
          label: "Un décimo primero",
          message: "$1800 : 10$ es un décimo. Tres décimos son el triple.",
        },
      ],
      title: "Fracción de un número — hipoteca",
      content: [
        "El mismo empleado dedica **tres décimas partes** ($\\frac{3}{10}$) del sueldo a la hipoteca. ¿Cuánto paga?",
      ],
      frames: [
        {
          caption: "Cálculo:",
          math: "\\frac{3}{10} \\text{ de } 1800 = (1800 : 10) \\cdot 3 = 180 \\cdot 3 = 540\\,€",
        },
      ],
    },
    {
      id: "bidon-frascos",
      type: "animated_solution",
      help: [
        {
          label: "¿Qué se reparte?",
          message: "Los litros del bidón entre el número de frascos.",
        },
        {
          label: "¿Por qué una fracción de litro?",
          message: "Porque cada frasco recibe menos de un litro: $0{,}1$ l es un décimo de litro.",
        },
      ],
      title: "Problema — bidón y frascos",
      content: [
        "Con un bidón de $20$ litros se llenan $200$ frascos iguales de agua de colonia. ¿Qué fracción de litro entra en cada frasco?",
      ],
      frames: [
        {
          caption: "Litros por frasco:",
          math: "20 : 200 = 0{,}1\\,\\mathrm{l} = \\frac{1}{10}\\,\\mathrm{l}",
        },
        {
          caption: "Como fracción de litro:",
          math: "\\frac{1\\,\\mathrm{l}}{10} = \\frac{1}{10}",
        },
      ],
    },
    {
      id: "rosario",
      type: "animated_solution",
      help: [
        {
          label: "¿Por qué queda $\\frac{2}{5}$?",
          message: "Si saca $\\frac{3}{5}$ del total, queda $1 - \\frac{3}{5} = \\frac{2}{5}$.",
        },
        {
          label: "Un quinto primero",
          message: "Si dos quintos son $14$ €, un quinto es $7$ €. El total son cinco de esos.",
        },
        {
          label: "Comprueba",
          message: "Los $\\frac{3}{5}$ del total más lo que queda tienen que dar el total.",
        },
      ],
      title: "Problema inverso — la hucha",
      content: [
        "Rosario saca $\\frac{3}{5}$ del dinero de su hucha y aún le quedan $14\\,€$. ¿Cuánto tenía?",
      ],
      frames: [
        {
          caption: "Lo que queda es $\\frac{2}{5}$ del total:",
          math: "\\frac{2}{5} \\text{ del total} = 14",
        },
        {
          caption: "Total:",
          math: "14 : 2 \\cdot 5 = 35\\,€",
        },
      ],
    },
    {
      id: "bidon-capacidad",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué sé y qué busco?",
          message: "Conoces una parte ($8$ litros) y qué fracción del total es. Buscas el total: es un problema inverso.",
        },
        {
          label: "Empieza por un quinto",
          message: "Si dos quintos son $8$ litros, ¿cuántos litros es un quinto? Después, ¿cuántos quintos hacen falta para llenar el bidón?",
        },
        {
          label: "Comprueba el resultado",
          message: "Calcula $\\frac{2}{5}$ de tu resultado: tiene que dar $8$.",
        },
      ],
      title: "Problema inverso — bidón de agua",
      question:
        "En un bidón hay $8$ litros, que son $\\frac{2}{5}$ de su capacidad total. ¿Cuántos litros caben en total? (solo el número)",
      correctAnswers: ["20"],
      explanation: "$\\frac{2}{5}$ del total $= 8$ → total $= 8 : 2 \\cdot 5 = 20$ litros.",
    },
    {
      id: "check-directo",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Problema directo o inverso?",
          message: "Aquí conoces el total ($280$) y buscas una parte: se calcula la fracción del número.",
        },
        {
          label: "Un séptimo primero",
          message: "Reparte $280$ en $7$ grupos iguales y quédate con $3$ de ellos.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "$\\frac{3}{7}$ es algo menos de la mitad, así que el resultado debe quedar por debajo de $140$.",
        },
      ],
      title: "Campamento",
      question:
        "En un campamento hay $280$ campistas; $\\frac{3}{7}$ son españoles. ¿Cuántos españoles? (solo el número)",
      correctAnswers: ["120"],
      explanation: "$(280 : 7) \\cdot 3 = 40 \\cdot 3 = 120$.",
    },
    {
      id: "reloj-minutos",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué representa cada porción?",
          message: "La esfera es una hora, es decir, $60$ minutos, partida en $20$ porciones iguales. Cada porción vale un tiempo fijo.",
        },
        {
          label: "De minutos a porciones",
          message: "Divide los minutos que piden entre lo que vale cada porción: te dice cuántas marcar.",
        },
      ],
      title: "Minutos en el reloj",
      question:
        "La esfera representa una hora y está dividida en $20$ porciones iguales de $3$ minutos. Marca $12$ minutos.",
      shape: "circle",
      numerator: 12,
      denominator: 60,
      parts: 20,
      itemLabel: "porción",
      hint: "Una hora son $60$ minutos. ¿Cuántas porciones de $3$ minutos hacen $12$ minutos?",
      explanation:
        "$12 : 3 = 4$ porciones de $20$: $\\frac{4}{20} = \\frac{12}{60}$ de hora.",
    },
    {
      id: "check-fraccion",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cómo escribo «parte del total»?",
          message: "Parte entre total: los minutos que te dan sobre los minutos que tiene la hora.",
          math: ["\\frac{\\text{parte}}{\\text{total}}"],
        },
        {
          label: "Simplifica",
          message: "Divide numerador y denominador entre un divisor común hasta que la fracción sea irreducible. El $12$ y el $60$ comparten un divisor grande.",
        },
        {
          label: "Compruébalo",
          message: "Calcula tu fracción de $60$ minutos: tiene que dar $12$.",
        },
      ],
      title: "Minutos en una hora",
      question:
        "¿Qué fracción de hora son $12$ minutos? Escríbela irreducible (por ejemplo, 2/3).",
      correctAnswers: ["1/5"],
      hint: "Escribe parte entre total, $\\frac{12}{60}$, y simplifica.",
      explanation: "$12$ min de $60$ min: $\\frac{12}{60} = \\frac{1}{5}$ h.",
    },
  ],
};
