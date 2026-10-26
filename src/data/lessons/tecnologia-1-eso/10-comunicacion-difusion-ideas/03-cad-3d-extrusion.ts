import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cad3dExtrusionLesson: InteractiveLesson = {
  slug: "cad-3d-extrusion",
  title: "3. Modelado 3D: de un croquis a un sólido",
  subtitle: TECESO1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un objeto en tres dimensiones", [
      { kind: "definition", text: "El **modelado 3D** crea un objeto virtual con largo, ancho y alto. Sirve para **visualizarlo**, **simularlo** y **fabricarlo** (impresora 3D, corte láser, fresadora)." },
      { kind: "steps", items: [
        "Se parte de un **croquis 2D** acotado.",
        "Se aplican **operaciones**: extrusión (dar altura), revolución (girar un perfil), corte, agujero, chaflán y redondeo.",
        "Se obtienen **vistas** y **planos 2D** automáticamente a partir del modelo.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Del croquis al sólido", [
      { kind: "text", text: "Observa el proceso con un perfil en L." },
    ], anim("extrusion-perfil"), "text-top"),
    slide("explora", "Extruye un perfil", [
      { kind: "text", text: "Cambia el perfil, sus medidas, la altura y el material. Observa cómo cambian el volumen y la masa." },
    ], tool("extrusion-explorador", { n: 4, a: 4, b: 6 }), "visual-top"),
    slide("fabricar", "Fabricación digital", [
      { kind: "steps", items: [
        "**Impresión 3D**: una máquina deposita plástico fundido capa a capa. Permite formas complejas con poco material.",
        "**Corte láser**: un láser corta o graba láminas de madera, cartón o metacrilato siguiendo un dibujo 2D.",
        "**Fresadora CNC**: una herramienta de corte guiada por ordenador talla la pieza en un bloque.",
      ] },
      { kind: "warning", title: "Ojo", text: "Las máquinas no se usan sin supervisión del profesor y sin las medidas de seguridad: protección ocular, pelo recogido y zona despejada." },
    ]),
    calc("calc-vol", "Volumen de un prisma", "Un perfil cuadrado de 4 cm de lado se extruye 10 cm. ¿Cuál es su volumen en cm³?",
      nums(160), "Área del cuadrado: 4 × 4 = 16 cm². Volumen = 16 × 10 = 160 cm³.", "Volumen = área del perfil × altura."),
    sort("clasifica-3d", "¿Qué operación es?", "Relaciona cada efecto con la operación de modelado.",
      [["ext", "Extrusión", "emerald"], ["agu", "Agujero o corte", "cobalt"], ["red", "Redondeo o chaflán", "amber"]],
      [["Dar altura a un perfil dibujado", "ext"], ["Convertir un cuadrado en un prisma", "ext"], ["Hacer un taladro pasante en una pieza", "agu"], ["Eliminar material con una forma de corte", "agu"], ["Suavizar una arista viva", "red"], ["Cortar una esquina en diagonal", "red"]],
      "La extrusión añade volumen a un perfil; el agujero o corte lo quita; el redondeo y el chaflán suavizan aristas.",
    ),
    pick("check-masa", "Masa de la pieza", "Tienes dos piezas idénticas en forma, una de aluminio (2,7 g/cm³) y otra de acero (7,85 g/cm³). ¿Cuál pesa más?",
      "La de acero, porque su densidad es mayor",
      [["La de aluminio, porque es más grande", "Tienen la misma forma y tamaño."], ["Pesan igual", "El volumen es igual, pero la densidad no."], ["No se puede saber", "Basta comparar las densidades."]],
      "Masa = volumen × densidad: con el mismo volumen, pesa más el material más denso.",
    ),
  ],
};
