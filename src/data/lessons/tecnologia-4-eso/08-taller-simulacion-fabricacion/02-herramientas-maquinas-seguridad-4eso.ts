import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const herramientasMaquinasSeguridad4esoLesson: InteractiveLesson = {
  slug: "herramientas-maquinas-seguridad-4eso",
  title: "2. Herramientas, máquinas y seguridad en el taller",
  subtitle: TECESO4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cada herramienta, su trabajo", [
      { kind: "steps", items: [
        "**Medir y marcar**: flexómetro, escuadra, gramil, granete.",
        "**Cortar**: sierra de costilla, sierra de calar, tijeras de chapa, cúter.",
        "**Desbastar y acabar**: limas, escofinas, lijas.",
        "**Taladrar**: taladro de columna y portátil, brocas adecuadas al material.",
        "**Unir y apretar**: destornilladores, llaves, alicates, soldador, pistola de silicona.",
        "**Máquinas**: sierra de cinta, esmeriladora, torno, fresadora, cortadora láser, impresora 3D.",
      ] },
    ], undefined, "stack"),
    slide("corte", "Condiciones de corte", [
      { kind: "text", text: "Una máquina se usa con una velocidad adecuada para el material y el diámetro. Calcúlala." },
    ], tool("eso3-corte-explorador"), "visual-top"),
    slide("riesgo", "Evaluar el riesgo", [
      { kind: "text", text: "Antes de trabajar se analiza cada peligro: probabilidad por gravedad." },
    ], tool("eso3-riesgos-explorador"), "visual-top"),
    slide("norm", "Normas básicas", [
      { kind: "steps", items: [
        "**Orden y limpieza**: una zona de trabajo despejada evita accidentes.",
        "**EPI** según la tarea: gafas, guantes (no con máquinas giratorias), mascarilla, protección auditiva, calzado cerrado.",
        "Pelo recogido y **sin anillos ni mangas sueltas** cerca de máquinas.",
        "**Sujetar la pieza** con tornillo de banco o mordaza, nunca con la mano.",
        "Máquinas **solo con permiso** y supervisión; **parada de emergencia** localizada.",
        "**Soldadura y adhesivos**: ventilación y cuidado con las quemaduras.",
        "**Primeros auxilios**: botiquín a mano y avisar de cualquier accidente.",
      ] },
    ]),
    calc("calc-riesgo", "Valor del riesgo", "Una tarea con probabilidad 4 y gravedad 5. ¿Cuánto vale el riesgo (probabilidad × gravedad)?", nums(20), "4 · 5 = 20: riesgo alto.", "Multiplica probabilidad por gravedad."),
    calc("calc-rpm", "Revoluciones de corte", "Con una broca de 10 mm y una velocidad de corte de 30 m/min, ¿a cuántas rpm hay que taladrar? (1000·Vc/(π·D), redondea a un entero)", nums(955), "30 000 / (π · 10) ≈ 955 rpm.", "n = 1000·Vc / (π·D)."),
    sort("clasifica-epi", "¿Qué protección?", "Relaciona cada tarea con la protección principal.",
      [["ojo", "Gafas", "cobalt"], ["res", "Mascarilla o ventilación", "amber"], ["gua", "Guantes", "emerald"]],
      [["Taladrar o esmerilar", "ojo"], ["Serrar o lijar", "ojo"], ["Soldar estaño con humo", "res"], ["Pintar o barnizar", "res"], ["Manipular chapa con bordes cortantes", "gua"], ["Trabajar con resinas", "gua"]],
      "La protección depende del peligro concreto.",
    ),
    pick("check-guante", "Máquinas giratorias", "¿Por qué no se usan guantes cerca de un taladro o un torno?",
      "Porque se pueden enganchar en la pieza giratoria y arrastrar la mano",
      [["Porque estorban para agarrar", "No es el motivo."], ["Porque los guantes son caros", "No es el motivo."], ["Sí se deben usar siempre", "En máquinas giratorias, no."]],
      "El EPI no es siempre el mismo: depende de la máquina.",
    ),
  ],
};
