import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ceramicosPetreosCompuestosLesson: InteractiveLesson = {
  slug: "ceramicos-petreos-compuestos",
  title: "8. Materiales cerámicos, pétreos y compuestos",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("ceramicos", "Cerámicos y vidrios", [
      { kind: "definition", text: "Los **cerámicos** son compuestos inorgánicos (óxidos, carburos, nitruros) con enlaces fuertes: muy duros, refractarios y aislantes, pero **frágiles**." },
      { kind: "steps", items: [
        "**Cerámicas tradicionales**: ladrillo, teja, loza y porcelana, a partir de arcilla cocida.",
        "**Vidrios**: sílice fundida y enfriada sin cristalizar (estructura amorfa).",
        "**Cerámicas técnicas**: alúmina, carburo de silicio; herramientas de corte, aislantes y bujías.",
        "**Pétreos**: granito, mármol, pizarra; se tallan y pulen, con alta resistencia a compresión.",
      ] },
      { kind: "warning", title: "Fuertes a compresión, débiles a tracción", text: "No se deforman plásticamente: cualquier microfisura crece y rompe. Por eso se usan sobre todo comprimidos." },
    ]),
    slide("compuestos", "Matriz y refuerzo", [
      { kind: "definition", text: "Un **material compuesto** combina una **matriz** (continua, que reparte la carga y protege) y un **refuerzo** (fibras o partículas, que aporta rigidez y resistencia)." },
      { kind: "relations", items: [
        { left: "Hormigón armado", relation: "matriz: hormigón; refuerzo:", right: "barras de acero", tone: "info" },
        { left: "Fibra de vidrio", relation: "matriz: resina; refuerzo:", right: "fibras de vidrio", tone: "ok" },
        { left: "Fibra de carbono", relation: "matriz: resina epoxi; refuerzo:", right: "fibras de carbono", tone: "key" },
      ] },
    ]),
    slide("capas", "Explora las capas de un laminado", [
      { kind: "text", text: "Aumenta la fibra: la rigidez **en la dirección de las fibras** casi se multiplica, pero en la dirección transversal apenas cambia. Los materiales compuestos son **anisótropos**." },
    ], tool("compuesto-mezclas-explorador", { n: 1, a: 50 }), "visual-top"),
    slide("regla", "Regla de mezclas", [
      { kind: "rule", title: "Módulo a lo largo de las fibras (límite superior)", formula: "E_\\parallel = V_f\\,E_f + (1-V_f)\\,E_m" },
      { kind: "rule", title: "Densidad del compuesto", formula: "\\rho = V_f\\,\\rho_f + (1-V_f)\\,\\rho_m" },
      { kind: "example", title: "Carbono/epoxi con Vf = 50 %", lines: [
        { math: "E_\\parallel = 0{,}5\\cdot 230 + 0{,}5\\cdot 3 = 116{,}5\\ \\text{GPa}" },
        { math: "\\rho = 0{,}5\\cdot 1800 + 0{,}5\\cdot 1200 = 1500\\ \\text{kg/m}^3" },
      ] },
    ]),
    calc("calc-mezcla", "Aplicar la regla de mezclas", "Un laminado de vidrio/epoxi tiene un $40\\,\\%$ de fibra ($E_f = 72$ GPa) y matriz con $E_m = 3$ GPa. ¿Cuál es su módulo a lo largo de las fibras, en GPa?",
      nums(30.6), "$E = 0{,}4\\cdot 72 + 0{,}6\\cdot 3 = 28{,}8 + 1{,}8 = 30{,}6$ GPa.", "Vf = 0,4."),
    sort("clasifica-mat", "¿Cerámico, pétreo o compuesto?", "Clasifica cada material.",
      [["cer", "Cerámico", "amber"], ["pet", "Pétreo", "cobalt"], ["com", "Compuesto", "violet"]],
      [["Porcelana", "cer"], ["Vidrio", "cer"], ["Ladrillo", "cer"], ["Granito", "pet"], ["Mármol", "pet"], ["Fibra de carbono", "com"], ["Hormigón armado", "com"]],
      "Los cerámicos se obtienen por cocción de materias primas; los pétreos se extraen de la roca; los compuestos combinan dos materiales de naturaleza distinta.",
    ),
    pick("check-hormigon", "Hormigón armado", "¿Por qué se colocan barras de acero en la zona inferior de una viga de hormigón?",
      "Porque en esa zona la viga trabaja a tracción y el hormigón es débil a tracción",
      [["Para que sea más ligera", "Las barras no reducen la masa."], ["Para que el hormigón fragüe más rápido", "El acero no influye en el fraguado."], ["Por estética", "Tiene función estructural."]],
      "Al flexionarse, la parte inferior se estira. El acero absorbe esa tracción y el hormigón comprimido hace el resto.",
    ),
  ],
};
