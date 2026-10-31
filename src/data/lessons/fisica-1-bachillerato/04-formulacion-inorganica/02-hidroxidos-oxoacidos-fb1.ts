import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const hidroxidosOxoacidosFb1Lesson: InteractiveLesson = {
  slug: "hidroxidos-oxoacidos-fb1",
  title: "2. Hidróxidos y oxoácidos",
  subtitle: FB1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("hidroxidos", "Hidróxidos", [
      { kind: "steps", items: [
        "Un **hidróxido** es un compuesto de un **catión metálico** con el ion **hidróxido OH⁻**: M(OH)ₙ. Se obtiene al reaccionar un **óxido básico con agua**: Na₂O + H₂O → 2 NaOH.",
        "Se escribe el metal y el grupo OH **entre paréntesis** si hay más de uno: Ca(OH)₂, Fe(OH)₃.",
        "**Stock**: «hidróxido de hierro(III)»; **sistemática**: «trihidróxido de hierro». NaOH: «hidróxido de sodio».",
        "Los hidróxidos de los alcalinos y alcalinotérreos son **bases fuertes**: en disolución dan OH⁻ y pH básico.",
      ] },
    ], undefined, "stack"),
    slide("oxoacidos", "Oxoácidos", [
      { kind: "steps", items: [
        "Un **oxoácido** contiene **H, un elemento X y O** (H₂SO₄, HNO₃, HClO₄). Se obtiene al reaccionar un **óxido ácido con agua**: SO₃ + H₂O → H₂SO₄; N₂O₅ + H₂O → 2 HNO₃.",
        "El **número de oxidación** de X se calcula con la neutralidad: HNO₃ → 1 + x − 6 = 0 → +5.",
        "**Nombre tradicional** (aceptado): **hipo-…-oso** (+1), **-oso** (+3 o el menor), **-ico** (+5 o el mayor) y **per-…-ico** (+7) en Cl, Br, I; **-oso/-ico** en S, N, C, P.",
        "**IUPAC 2005** (adición): «dihidrogeno(tetraoxidosulfato)» para el H₂SO₄. En textos clásicos: «tetraoxosulfato(VI) de dihidrógeno».",
      ] },
    ], undefined, "stack"),
    slide("explora", "Explora los oxoácidos", [
      { kind: "text", text: "Elige un ácido y observa de qué óxido viene, cómo se llama y qué anión forma." },
    ], tool("fb1-oxoacidos-explorador"), "visual-top"),
    slide("tabla", "Los más habituales", [
      { kind: "steps", items: [
        "**Halógenos (Cl, Br, I)**: HXO (hipo-oso), HXO₂ (oso), HXO₃ (ico), HXO₄ (per-ico): HClO₄ «ácido perclórico».",
        "**Azufre**: H₂SO₃ «sulfuroso» (+4) y H₂SO₄ «sulfúrico» (+6). **Nitrógeno**: HNO₂ «nitroso» y HNO₃ «nítrico».",
        "**Carbono**: H₂CO₃ «carbónico». **Fósforo**: H₃PO₄ «fosfórico» (orto) y HPO₃ «metafosfórico». **Boro**: H₃BO₃ «bórico».",
        "**Metales de transición**: H₂CrO₄ «crómico», H₂Cr₂O₇ «dicrómico», HMnO₄ «permangánico», H₂MnO₄ «mangánico».",
      ] },
    ], undefined, "stack"),
    calc("calc-oh", "Hidróxido", "¿Cuántos grupos OH tiene el hidróxido de aluminio, Al(OH)ₙ?", nums(3), "Al³⁺ necesita 3 OH⁻ para neutralizarse.", "Intercambia la carga."),
    calc("calc-nox", "Número de oxidación", "¿Cuál es el número de oxidación del cloro en el HClO₃?", nums(5), "1 + x − 6 = 0 → x = +5.", "H = +1, O = −2."),
    calc("calc-h", "Hidrógenos", "El ácido sulfúrico se obtiene de SO₃ + H₂O. ¿Cuántos átomos de hidrógeno tiene la fórmula del ácido?", nums(2), "H₂SO₄: el H₂O aporta 2 H.", "SO₃ + H₂O → H₂SO₄."),
    calc("calc-ox", "Átomos de oxígeno", "El ácido nítrico es HNO₃. ¿Cuántos átomos de oxígeno tiene?", nums(3), "HNO₃: tres átomos de oxígeno.", "Mira el subíndice del O."),
    sort("clasifica", "Nombre tradicional", "Relaciona cada ácido con el número de oxidación del cloro o del azufre que sugiere su nombre.",
      [["bajo", "Número de oxidación bajo", "cobalt"], ["alto", "Número de oxidación alto", "rose"]],
      [["Ácido hipocloroso (HClO)", "bajo"], ["Ácido cloroso (HClO₂)", "bajo"], ["Ácido sulfuroso (H₂SO₃)", "bajo"], ["Ácido clórico (HClO₃)", "alto"], ["Ácido perclórico (HClO₄)", "alto"], ["Ácido sulfúrico (H₂SO₄)", "alto"]],
      "-oso es el menor; -ico, el mayor; per- indica el máximo.",
    ),
    pick("check", "Obtención", "¿Cómo se obtiene un oxoácido?",
      "Un óxido ácido más agua",
      [["Un óxido básico más agua", "Eso da un hidróxido."], ["Un metal más oxígeno", "Eso da un óxido."], ["Un ácido más una base", "Eso da una sal."]],
      "SO₃ + H₂O → H₂SO₄.",
    ),
  ],
};
