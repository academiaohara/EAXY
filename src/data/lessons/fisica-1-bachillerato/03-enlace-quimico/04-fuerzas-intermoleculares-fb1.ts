import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fuerzasIntermolecularesFb1Lesson: InteractiveLesson = {
  slug: "fuerzas-intermoleculares-fb1",
  title: "4. Fuerzas intermoleculares",
  subtitle: FB1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "Tipos de fuerzas", [
      { kind: "steps", items: [
        "Las **fuerzas intermoleculares** (van der Waals) actúan **entre moléculas**; son **10–100 veces más débiles** que un enlace covalente, pero explican que existan líquidos y sólidos moleculares.",
        "**Fuerzas de dispersión de London**: entre **todas** las moléculas, por dipolos instantáneos inducidos. Crecen con la **masa y el tamaño** (nube electrónica más polarizable).",
        "**Dipolo-dipolo**: entre moléculas **polares** (HCl, CH₃Cl, acetona): atracción entre δ+ y δ−.",
        "**Enlace de hidrógeno**: un H unido a **F, O o N** es atraído por un par solitario de otro F, O o N. Es la más intensa de las intermoleculares (10–40 kJ/mol).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Puntos de ebullición", [
      { kind: "text", text: "Compara las series de hidruros y de gases nobles. ¿Qué sustancias rompen la tendencia? ¿Por qué?" },
    ], tool("fb1-fuerzas-intermoleculares-explorador"), "visual-top"),
    slide("prop", "Consecuencias", [
      { kind: "steps", items: [
        "**Puntos de fusión y ebullición**: crecen con la intensidad de las fuerzas. A igual masa: enlace de hidrógeno > dipolo-dipolo > London.",
        "**Agua**: su alto punto de ebullición (100 °C), su alto calor específico y que el **hielo flote** (estructura abierta con enlaces de H) se deben a los enlaces de hidrógeno.",
        "**Solubilidad**: «**lo semejante disuelve a lo semejante**». Polares en polares (azúcar, etanol en agua); apolares en apolares (aceite en gasolina).",
        "**Biología**: los enlaces de hidrógeno mantienen la doble hélice del **ADN** y la estructura de las **proteínas**.",
      ] },
    ], undefined, "stack"),
    slide("comparar", "Cómo ordenar sustancias", [
      { kind: "steps", items: [
        "**1.** ¿Hay enlace de hidrógeno (H unido a F, O o N)? → T de ebullición alta.",
        "**2.** Si no, ¿la molécula es polar? → dipolo-dipolo, algo más alta que una apolar de masa parecida.",
        "**3.** Si son apolares, manda la **masa/tamaño**: F₂ < Cl₂ < Br₂ < I₂.",
        "**4.** En **isómeros**, la forma importa: una molécula alargada (pentano) tiene más contacto superficial y hierve más que una esférica (neopentano).",
      ] },
    ], undefined, "stack"),
    calc("calc-tipo", "Gases nobles", "El argón es un gas noble monoatómico. ¿Cuántos tipos de fuerzas intermoleculares actúan entre sus átomos? (London, dipolo-dipolo, enlace de H)", nums(1), "Solo fuerzas de London.", "No es polar ni tiene H."),
    calc("calc-h", "Enlaces de hidrógeno", "¿Cuántos enlaces de hidrógeno puede formar, como máximo, una molécula de agua con otras? (2 por los H y 2 por los pares solitarios del O)", nums(4), "2 como donante y 2 como aceptor: 4.", "Cuenta H y pares solitarios."),
    calc("calc-eb", "Anomalía", "Entre H₂O (373 K) y H₂S (213 K), ¿qué diferencia de punto de ebullición, en K, atribuyes en gran parte al enlace de hidrógeno?", nums(160), "373 − 213 = 160 K.", "Resta."),
    sort("clasifica", "Fuerza predominante", "Clasifica cada sustancia por su fuerza intermolecular principal.",
      [["lon", "London", "cobalt"], ["dip", "Dipolo-dipolo", "emerald"], ["enh", "Enlace de hidrógeno", "rose"]],
      [["CH₄", "lon"], ["I₂", "lon"], ["HCl", "dip"], ["CH₃Cl", "dip"], ["H₂O", "enh"], ["NH₃", "enh"]],
      "H–F/O/N: enlace de H; polar sin eso: dipolo-dipolo; apolar: London.",
    ),
    pick("check", "Isótopo", "¿Por qué el HF (293 K) hierve más que el HCl (188 K)?",
      "Porque forma enlaces de hidrógeno",
      [["Porque tiene más masa", "El HCl tiene más masa."], ["Porque es apolar", "Es polar."], ["Porque el enlace H–F es covalente", "También lo es el H–Cl."]],
      "El F es muy electronegativo y pequeño: permite enlaces de hidrógeno.",
    ),
  ],
};
