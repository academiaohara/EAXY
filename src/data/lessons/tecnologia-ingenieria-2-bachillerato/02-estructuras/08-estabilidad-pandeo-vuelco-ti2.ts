import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estabilidadPandeoVuelcoTi2Lesson: InteractiveLesson = {
  slug: "estabilidad-pandeo-vuelco-ti2",
  title: "8. Estabilidad: pandeo, vuelco y simulación",
  subtitle: TECTI2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Fallar sin agotar el material", [
      { kind: "steps", items: [
        "La **estabilidad** es la capacidad de mantener la forma de equilibrio. Se puede perder aunque la tensión sea baja.",
        "**Pandeo**: un elemento **esbelto** a compresión se dobla lateralmente de golpe. La carga crítica de Euler es **$P_{\\mathrm{cr}}$ = π²·E·I / (K·L)²**.",
        "**Vuelco**: una estructura gira respecto a una arista de su base. Se exige que el **momento estabilizador** supere al **volcador** con un coeficiente (≥ 1,5).",
        "**Deslizamiento**: la fuerza horizontal supera al rozamiento de la base.",
        "Además se comprueban la **resistencia** (tensión admisible) y la **rigidez** (flechas límite).",
      ] },
    ], undefined, "stack"),
    slide("pandeo", "Pandeo y vuelco", [
      { kind: "text", text: "Cambia el modo: calcula la carga crítica de un pilar o el coeficiente de vuelco de una estructura." },
    ], tool("ti2-pandeo-vuelco-explorador"), "visual-top"),
    slide("sim", "Simular antes de construir", [
      { kind: "steps", items: [
        "El **método de los elementos finitos (MEF)** divide la estructura en pequeños elementos y calcula tensiones y deformaciones en todo el modelo.",
        "Programas: **FreeCAD FEM**, **Fusion**, **SolidWorks Simulation**, **Ansys**.",
        "Pasos: **modelo geométrico → material → apoyos → cargas → malla → resultados** (mapa de tensiones, desplazamientos).",
        "Se **verifica** comparando con un caso sencillo de cálculo manual y se **valida** con un ensayo.",
        "Una malla más fina da resultados más precisos, pero cuesta más tiempo de cálculo.",
      ] },
    ]),
    slide("viga", "Comprobación con una simulación sencilla", [
      { kind: "text", text: "Compara materiales y medidas de una viga antes de fabricarla." },
    ], tool("eso3-simulacion-viga-explorador"), "visual-top"),
    calc("calc-pcr", "Carga crítica", "Un pilar de acero (E = 210 GPa) de sección circular de 60 mm, articulado en ambos extremos y de 3 m de altura. ¿Cuánto vale la carga crítica de Euler, en kN? (π²·E·I / L², redondea a un entero)", nums(146, 146.5), "I = π·60⁴/64 = 636 173 mm⁴; Pcr = π²·210 000·636 173 / 3 000² ≈ 146,5 kN.", "Calcula primero la inercia del círculo."),
    calc("calc-vuelco", "Coeficiente de vuelco", "Una estructura de 50 kN y base de 1,5 m recibe 8 kN de viento a 6 m de altura. ¿Cuánto vale el coeficiente de vuelco? (W·b/2 / (F·h), dos decimales)", nums(0.78, 0.781), "37,5 / 48 ≈ 0,78: vuelca (debe ser ≥ 1,5).", "Momento estabilizador entre volcador."),
    calc("calc-l", "Esbeltez", "Un pilar de 3 m y 60 mm de diámetro, ¿cuánto vale su esbeltez L/d? (L en mm)", nums(50), "3 000 / 60 = 50.", "Longitud entre diámetro."),
    sort("clasifica-fall", "¿Qué fallo es?", "Relaciona cada situación con el fallo.",
      [["pan", "Pandeo", "cobalt"], ["vue", "Vuelco", "amber"], ["res", "Rotura por resistencia", "rose"]],
      [["Una regla larga se dobla al apretarla por sus extremos", "pan"], ["Una columna muy esbelta cede lateralmente", "pan"], ["Una grúa cae lateralmente con viento", "vue"], ["Un muro de contención gira sobre su base", "vue"], ["Un tirante se parte por tracción", "res"], ["Una viga se rompe por flexión", "res"]],
      "Cada fallo exige una comprobación distinta.",
    ),
    pick("check-euler", "Euler", "Se duplica la longitud de un pilar. ¿Qué ocurre con su carga crítica de pandeo?",
      "Se reduce a la cuarta parte, porque depende de 1/L²",
      [["Se reduce a la mitad", "Depende del cuadrado de L."], ["Se duplica", "Disminuye."], ["No cambia", "Depende de L."]],
      "Pcr = π²·E·I / (K·L)².",
    ),
  ],
};
