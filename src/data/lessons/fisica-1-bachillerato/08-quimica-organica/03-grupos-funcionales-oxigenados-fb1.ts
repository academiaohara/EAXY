import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const gruposFuncionalesOxigenadosFb1Lesson: InteractiveLesson = {
  slug: "grupos-funcionales-oxigenados-fb1",
  title: "3. Funciones oxigenadas",
  subtitle: FB1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("gf", "Grupos funcionales", [
      { kind: "steps", items: [
        "Un **grupo funcional** es un átomo o grupo de átomos que confiere a la molécula sus **propiedades características**. Compuestos con el mismo grupo forman una **familia**.",
        "**Alcohol** R–OH (-ol). **Éter** R–O–R' (alcoxi-). **Aldehído** R–CHO (-al). **Cetona** R–CO–R' (-ona).",
        "**Ácido carboxílico** R–COOH (ácido -oico). **Éster** R–COO–R' (-oato de alquilo).",
        "Los que tienen **O–H** (alcoholes, ácidos) forman **enlaces de hidrógeno**: puntos de ebullición altos y, los pequeños, solubles en agua.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Familias y nombres", [
      { kind: "text", text: "Elige una familia, la longitud de la cadena y la posición del grupo. Fíjate en el nombre y en la fórmula semidesarrollada." },
    ], tool("fb1-grupos-explorador"), "visual-top"),
    slide("reglas", "Cómo nombrar", [
      { kind: "steps", items: [
        "Se elige como **grupo principal** el de **mayor prioridad**: ácido > éster > amida > nitrilo > **aldehído > cetona > alcohol** > amina; los demás son sustituyentes.",
        "La cadena principal es la **más larga que contiene el grupo principal**, numerada para dar el **menor localizador** a ese grupo.",
        "**Aldehídos** y **ácidos** van siempre en el extremo (C1): propanal, ácido butanoico. **Alcoholes** y **cetonas** llevan localizador: butan-2-ol, pentan-2-ona.",
        "**Ésteres**: del ácido (-oato) y del alcohol (de alquilo): CH₃–COO–CH₂–CH₃ = *etanoato de etilo*. **Éteres**: CH₃–O–CH₂–CH₃ = metoxietano (etil metil éter).",
      ] },
    ], undefined, "stack"),
    slide("prop", "Propiedades y usos", [
      { kind: "steps", items: [
        "**Alcoholes**: etanol (bebidas, desinfectante, biocombustible), metanol (tóxico), glicerina. **Éteres**: disolventes.",
        "**Aldehídos y cetonas** (C=O polar): propanona (acetona), disolvente; metanal (formol), conservante.",
        "**Ácidos**: etanoico (acético, vinagre), metanoico (hormigas), cítrico. **Ésteres**: aromas de frutas y disolventes; los **triglicéridos** (grasas) son ésteres de glicerina.",
        "**Reacciones**: oxidación (alcohol primario → aldehído → ácido), **esterificación** (ácido + alcohol ⇌ éster + agua).",
      ] },
    ], undefined, "stack"),
    calc("calc-oh", "Fórmula del etanol", "El etanol es CH₃–CH₂–OH. ¿Cuántos átomos de hidrógeno tiene su fórmula molecular?", nums(6), "C₂H₆O: 3 + 2 + 1 = 6 H.", "Cuenta los de cada carbono y el del OH."),
    calc("calc-carb", "Carbonos del éster", "El etanoato de etilo (CH₃–COO–CH₂–CH₃), ¿cuántos carbonos tiene en total?", nums(4), "2 del ácido + 2 del alcohol = 4.", "Suma los de ambas partes."),
    calc("calc-pos", "Localizador", "En CH₃–CH(OH)–CH₂–CH₃, ¿qué número lleva el localizador del grupo –OH al nombrarlo butan-x-ol?", nums(2), "El OH está en el segundo carbono: butan-2-ol.", "Numera desde el extremo más próximo."),
    calc("calc-m", "Masa molar", "¿Cuál es la masa molar del etanol, C₂H₆O, en g/mol? (C 12; H 1; O 16)", nums(46), "24 + 6 + 16 = 46 g/mol.", "Suma las masas atómicas."),
    sort("clasifica", "Familia del compuesto", "Clasifica cada compuesto por su grupo funcional.",
      [["alc", "Alcohol", "cobalt"], ["car", "Carbonilo (aldehído o cetona)", "emerald"], ["aci", "Ácido o éster", "rose"]],
      [["Etanol", "alc"], ["Propan-2-ol", "alc"], ["Propanona", "car"], ["Etanal", "car"], ["Ácido etanoico", "aci"], ["Etanoato de metilo", "aci"]],
      "-ol: alcohol; -al/-ona: carbonilo; -oico/-oato: ácido o éster.",
    ),
    pick("check", "Prioridad", "Una molécula tiene un grupo alcohol y un grupo ácido. ¿Cuál se nombra como sufijo?",
      "El ácido carboxílico, por tener mayor prioridad",
      [["El alcohol", "Es de menor prioridad."], ["Ambos como sufijo", "Solo uno es el grupo principal."], ["Ninguno", "El de mayor prioridad es el sufijo."]],
      "Ácido > éster > amida > nitrilo > aldehído > cetona > alcohol.",
    ),
  ],
};
