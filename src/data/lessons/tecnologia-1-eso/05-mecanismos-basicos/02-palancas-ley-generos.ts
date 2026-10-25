import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const palancasLeyGenerosLesson: InteractiveLesson = {
  slug: "palancas-ley-generos",
  title: "2. Palancas",
  subtitle: TECESO1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una barra que gira sobre un punto", [
      { kind: "definition", text: "Una **palanca** es una barra rígida que puede girar alrededor de un punto fijo llamado **punto de apoyo** o fulcro. Sirve para mover una **resistencia** (carga) aplicando una **fuerza** (esfuerzo)." },
      { kind: "steps", items: [
        "**Fuerza, F**: la que hacemos nosotros.",
        "**Resistencia, R**: el peso o la fuerza que hay que vencer.",
        "**Brazos**: distancia del punto de apoyo a cada fuerza ($d_F$ y $d_R$).",
      ] },
    ], undefined, "stack"),
    slide("ley", "La ley de la palanca", [
      { kind: "rule", title: "Condición de equilibrio", formula: "F \\cdot d_F = R \\cdot d_R" },
      { kind: "text", text: "Observa el ejemplo con números. Un brazo de fuerza mayor da una fuerza menor para la misma carga." },
    ], anim("palanca-ley"), "split"),
    slide("explora", "Equilibra la palanca", [
      { kind: "text", text: "Mueve las cargas y las fuerzas hasta lograr el equilibrio. Comprueba la fuerza que necesitas y compárala con la calculada." },
    ], tool("palanca-equilibrio-explorador", { a: 30, b: 40 }), "visual-top"),
    calc("calc-palanca", "Calcula la fuerza", "Quieres levantar una piedra de 80 kg que está a 0,5 m del apoyo. Aplicas la fuerza a 2 m. ¿Cuántos kg de fuerza necesitas?",
      nums(20), "F · 2 = 80 · 0,5, luego F = 40 ÷ 2 = 20 kg.", "Iguala F·dF con R·dR y despeja F."),
    calc("calc-brazo", "Calcula la distancia", "Una carretilla lleva 60 kg a 0,4 m de la rueda (apoyo). Haces 20 kg de fuerza. ¿A qué distancia de la rueda debes sujetar los mangos, en metros?",
      nums("1.2", "1.20"), "F · dF = R · dR → 20 · dF = 60 · 0,4 → dF = 24 ÷ 20 = 1,2 m.", "Despeja dF = R·dR ÷ F."),
    slide("generos", "Tres géneros de palanca", [
      { kind: "text", text: "Según la posición relativa del apoyo, la fuerza y la resistencia, las palancas se clasifican en tres géneros." },
    ], anim("palanca-generos"), "split"),
    sort("clasifica-genero", "¿De qué género es?", "Clasifica cada herramienta por el género de su palanca.",
      [["g1", "1.er género: apoyo en medio", "cobalt"], ["g2", "2.º género: carga en medio", "amber"], ["g3", "3.er género: fuerza en medio", "emerald"]],
      [["Tijeras", "g1"], ["Balancín", "g1"], ["Alicates", "g1"], ["Carretilla", "g2"], ["Cascanueces", "g2"], ["Abrebotellas", "g2"], ["Pinzas de depilar", "g3"], ["Caña de pescar", "g3"]],
      "1.er género: el apoyo está entre la fuerza y la carga. 2.º: la carga, entre el apoyo y la fuerza. 3.º: la fuerza, entre el apoyo y la carga.",
    ),
    pick("check-ventaja", "Quien tiene el brazo largo", "Para levantar una roca pesada con una barra, ¿dónde conviene aplicar la fuerza?",
      "Lo más lejos posible del apoyo, para que el brazo de la fuerza sea largo",
      [["Lo más cerca posible del apoyo", "Así necesitarías una fuerza enorme."], ["Justo encima de la roca", "No hay ninguna ventaja mecánica."], ["Da igual dónde", "La distancia al apoyo determina la fuerza que hace falta."]],
      "Cuanto mayor es el brazo de la fuerza respecto al de la resistencia, menos fuerza se necesita.",
    ),
  ],
};
