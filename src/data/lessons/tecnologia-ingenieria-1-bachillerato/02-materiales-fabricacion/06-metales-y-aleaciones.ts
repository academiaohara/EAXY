import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const metalesYAleacionesLesson: InteractiveLesson = {
  slug: "metales-y-aleaciones",
  title: "6. Materiales metálicos y aleaciones",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("hierro", "Hierro, acero y fundición", [
      { kind: "definition", text: "Los materiales **ferrosos** son aleaciones de hierro con carbono. Lo que cambia entre ellos es el **porcentaje de carbono**." },
      { kind: "facts", items: [
        { tex: "\\text{Acero:}\\ \\mathrm{C} \\le 2{,}1\\ \\%", label: "forjable y soldable (bajo C)" },
        { tex: "\\text{Fundición:}\\ \\mathrm{C} > 2{,}1\\ \\%", label: "colable, dura y frágil" },
      ] },
      { kind: "text", text: "Sube el carbono y observa cómo se desplazan las propiedades: más dureza, menos ductilidad y soldabilidad." },
    ], tool("carbono-hierro-explorador", { a: 0.4 }), "split"),
    slide("elementos", "Elementos de aleación en los aceros", [
      { kind: "relations", items: [
        { left: "Cromo (Cr)", relation: "mejora la resistencia a la", right: "corrosión (inoxidable ≥ 10,5 %)", tone: "ok" },
        { left: "Níquel (Ni)", relation: "aumenta la", right: "tenacidad y la resistencia", tone: "info" },
        { left: "Molibdeno (Mo)", relation: "conserva la resistencia a", right: "alta temperatura", tone: "key" },
        { left: "Manganeso (Mn)", relation: "aumenta la", right: "dureza y la resistencia al desgaste", tone: "ok" },
      ] },
      { kind: "text", text: "Los aceros **inoxidables** forman una capa invisible de óxido de cromo que se regenera y protege el metal." },
    ]),
    slide("noferrosos", "Metales no ferrosos", [
      { kind: "steps", items: [
        "**Aluminio**: ligero (2 700 kg/m³), resiste la corrosión, buen conductor; se suele alear con Mg, Si o Cu (duraluminio).",
        "**Cobre**: excelente conductor eléctrico y térmico, dúctil. Aleaciones: **latón** (Cu + Zn) y **bronce** (Cu + Sn).",
        "**Titanio**: muy resistente y ligero, biocompatible; caro y difícil de mecanizar.",
        "**Magnesio y zinc**: el magnesio es muy ligero; el zinc se usa para galvanizar y en fundición inyectada.",
      ] },
      { kind: "warning", title: "Ventajas y límites", text: "El aluminio es ligero pero se deforma más que el acero a igual sección; el cobre conduce mejor pero es más caro y pesado." },
    ]),
    sort("clasifica-ferrosos", "Ferroso o no ferroso", "Clasifica cada material.",
      [["fe", "Ferroso", "cobalt"], ["no", "No ferroso", "emerald"]],
      [["Acero inoxidable", "fe"], ["Fundición gris", "fe"], ["Acero al carbono", "fe"], ["Latón", "no"], ["Bronce", "no"], ["Duraluminio", "no"]],
      "Los aceros y las fundiciones tienen el hierro como base; latón, bronce y duraluminio parten de cobre o aluminio.",
    ),
    sort("clasifica-aleacion", "¿De qué aleación se trata?", "Relaciona cada aleación con su metal base.",
      [["cu", "Base cobre", "amber"], ["al", "Base aluminio", "cobalt"], ["fe", "Base hierro", "emerald"]],
      [["Latón", "cu"], ["Bronce", "cu"], ["Duraluminio", "al"], ["Aluminio 6061", "al"], ["Acero inoxidable", "fe"], ["Fundición", "fe"]],
      "Latón y bronce son aleaciones de cobre (con zinc o estaño); el duraluminio y el 6061 son de aluminio; el inoxidable y la fundición son de hierro.",
    ),
    pick("check-acero", "Clasificar por carbono", "Una pieza tiene un $0{,}45\\,\\%$ de carbono. ¿Qué es?",
      "Un acero de medio carbono",
      [["Una fundición", "Las fundiciones tienen más de un 2,1 % de carbono."], ["Hierro casi puro", "El hierro casi puro tiene muy poco carbono (<0,05 %)."], ["Un acero de bajo carbono", "El bajo carbono llega hasta aproximadamente 0,25 %."]],
      "Entre 0,25 % y 0,6 % de C se habla de acero de medio carbono (ejes, engranajes, bielas).",
    ),
    pick("check-uso", "Aluminio o acero", "Para una escalera plegable que un operario debe transportar a diario, ¿qué ventaja decide a favor del aluminio?",
      "Su baja densidad: pesa mucho menos para una rigidez aceptable",
      [["Es más duro que el acero", "El acero es más duro que el aluminio en general."], ["Es siempre más barato por kilo", "El aluminio suele ser más caro por kilo que el acero."], ["Conduce el calor mejor", "Es cierto, pero no es relevante para una escalera."]],
      "Transportar a diario hace de la masa el criterio principal: el aluminio ahorra más de dos tercios de peso por volumen.",
    ),
  ],
};
