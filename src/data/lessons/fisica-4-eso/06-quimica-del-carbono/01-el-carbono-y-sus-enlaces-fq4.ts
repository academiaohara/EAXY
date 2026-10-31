import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const elCarbonoYSusEnlacesFq4Lesson: InteractiveLesson = {
  slug: "el-carbono-y-sus-enlaces-fq4",
  title: "1. El carbono y sus enlaces",
  subtitle: FQ4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Química orgánica", [
      { kind: "steps", items: [
        "La **química del carbono** (o química orgánica) estudia los compuestos del carbono: se conocen **más de diez millones**, muchos más que de todos los demás elementos juntos.",
        "El carbono (Z = 6, configuración 1s² 2s² 2p²) tiene **4 electrones de valencia**: forma **4 enlaces covalentes** (**tetravalencia**).",
        "Se une a otros carbonos formando **cadenas** lineales, ramificadas o cerradas (**ciclos**), y también a H, O, N, S y halógenos.",
        "Todos los seres vivos están formados por compuestos del carbono: glúcidos, lípidos, proteínas y ácidos nucleicos.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Sencillo, doble y triple", [
      { kind: "text", text: "Cambia de molécula y compara el ángulo de enlace, la hibridación y el número de enlaces σ y π." },
    ], tool("fq4-carbono-enlaces-explorador"), "visual-top"),
    slide("hib", "Hibridación y geometría", [
      { kind: "steps", items: [
        "**4 enlaces sencillos** → hibridación **sp³**: geometría **tetraédrica**, ángulos de **109,5°** (metano, etano).",
        "**1 enlace doble** → hibridación **sp²**: geometría **plana**, ángulos de **120°** (eteno, benceno).",
        "**1 enlace triple** → hibridación **sp**: geometría **lineal**, ángulo de **180°** (etino).",
        "Un enlace doble tiene un enlace **σ** y uno **π**; uno triple, un σ y dos **π**. Los enlaces múltiples son más cortos y más fuertes, pero más reactivos.",
      ] },
    ], undefined, "stack"),
    slide("iso", "Isomería", [
      { kind: "text", text: "Los **isómeros** son compuestos con la **misma fórmula molecular** pero **distinta estructura**, y por tanto propiedades diferentes. Con C₄H₁₀ hay dos: **butano** (cadena lineal) y **metilpropano** (cadena ramificada). Con C₆H₁₄ hay cinco, y con C₈H₁₈, dieciocho. Esta variedad es una de las razones de la riqueza de la química orgánica." },
    ]),
    calc("calc-val", "Enlaces del carbono", "¿Cuántos enlaces covalentes forma un átomo de carbono?", nums(4), "El carbono tiene 4 electrones de valencia y forma 4 enlaces.", "Es tetravalente."),
    calc("calc-ang", "Ángulo del eteno", "¿Cuántos grados mide, aproximadamente, el ángulo de enlace en el eteno (hibridación sp²)?", nums(120), "En la hibridación sp² la geometría es plana con ángulos de 120°.", "Geometría triangular plana."),
    sort("clasifica", "Hibridación del carbono", "Clasifica cada molécula según la hibridación de sus carbonos.",
      [["sp3", "sp³ (4 sencillos)", "cobalt"], ["sp2", "sp² (un doble)", "emerald"], ["sp", "sp (un triple)", "rose"]],
      [["Metano CH₄", "sp3"], ["Etano C₂H₆", "sp3"], ["Eteno C₂H₄", "sp2"], ["Benceno C₆H₆", "sp2"], ["Etino C₂H₂", "sp"]],
      "Cuenta el tipo de enlace: sencillos sp³, doble sp², triple sp.",
    ),
    pick("check", "Isómeros", "¿Qué tienen en común dos isómeros?",
      "La misma fórmula molecular",
      [["La misma estructura", "Justamente se distinguen en la estructura."], ["Las mismas propiedades físicas", "Suelen diferir."], ["El mismo nombre", "Cada isómero tiene su nombre."]],
      "Misma fórmula molecular, distinta estructura.",
    ),
  ],
};
