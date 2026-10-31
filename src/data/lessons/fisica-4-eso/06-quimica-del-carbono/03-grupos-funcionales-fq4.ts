import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const gruposFuncionalesFq4Lesson: InteractiveLesson = {
  slug: "grupos-funcionales-fq4",
  title: "3. Grupos funcionales",
  subtitle: FQ4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es un grupo funcional", [
      { kind: "steps", items: [
        "Un **grupo funcional** es un átomo o conjunto de átomos que da a la molécula sus **propiedades químicas características**.",
        "Compuestos con el mismo grupo forman una **familia**: reaccionan de forma parecida aunque la cadena sea distinta.",
        "El grupo funcional determina la **terminación** del nombre: -ol, -al, -ona, ácido -oico, -amina.",
        "Hay compuestos con **oxígeno** (alcoholes, aldehídos, cetonas, ácidos, éteres, ésteres) y con **nitrógeno** (aminas, amidas).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Familias funcionales", [
      { kind: "text", text: "Elige una familia y la longitud de la cadena. Fíjate en el grupo, la fórmula y el nombre." },
    ], tool("fq4-grupos-funcionales-explorador"), "visual-top"),
    slide("resumen", "Resumen de grupos", [
      { kind: "steps", items: [
        "**Alcohol** R–OH (hidroxilo): etanol. **Éter** R–O–R': dimetil éter.",
        "**Aldehído** R–CHO (en un extremo): etanal. **Cetona** R–CO–R' (en el interior): propanona.",
        "**Ácido carboxílico** R–COOH: ácido etanoico (vinagre). **Éster** R–COO–R': acetato de etilo (disolvente, aromas).",
        "**Amina** R–NH₂: metilamina. **Amida** R–CONH₂: etanamida.",
      ] },
    ], undefined, "stack"),
    slide("reac", "Reactividad y usos", [
      { kind: "text", text: "Los **alcoholes** con –OH forman enlaces de hidrógeno y por eso hierven a más temperatura que los hidrocarburos de masa parecida. Los **ácidos carboxílicos** son ácidos débiles y con los alcoholes dan **ésteres** y agua (esterificación). Las **aminas** son bases débiles. El **etanol** se usa como disolvente, desinfectante y biocombustible; el **ácido acético** da el sabor al vinagre." },
    ]),
    calc("calc-grupos", "Contar familias", "¿Cuántos grupos funcionales distintos aparecen en la lista: alcohol, aldehído, cetona, ácido carboxílico y amina?", nums(5), "Son cinco grupos funcionales distintos.", "Cuenta los nombres."),
    calc("calc-c", "Carbonos", "El ácido pentanoico tiene la raíz pent-. ¿Cuántos átomos de carbono tiene su cadena?", nums(5), "Pent- indica cinco carbonos.", "Raíz de la nomenclatura."),
    sort("clasifica", "Familia del compuesto", "Asocia cada compuesto con su grupo funcional.",
      [["oh", "Alcohol", "cobalt"], ["ac", "Ácido carboxílico", "rose"], ["ca", "Carbonilo (aldehído o cetona)", "emerald"]],
      [["CH₃–CH₂–OH", "oh"], ["CH₃–OH", "oh"], ["CH₃–COOH", "ac"], ["H–COOH", "ac"], ["CH₃–CO–CH₃", "ca"], ["CH₃–CHO", "ca"]],
      "Mira el grupo: –OH, –COOH o C=O.",
    ),
    pick("check", "Nombre", "¿Qué compuesto es la propanona (acetona)?",
      "CH₃–CO–CH₃",
      [["CH₃–CH₂–CHO", "Ese es el propanal."], ["CH₃–CH₂–CH₂–OH", "Ese es el propan-1-ol."], ["CH₃–CH₂–COOH", "Ese es el ácido propanoico."]],
      "Cetona: grupo C=O en un carbono interior.",
    ),
  ],
};
