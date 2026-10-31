import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const calorEspecificoCambiosEstadoFq4Lesson: InteractiveLesson = {
  slug: "calor-especifico-cambios-estado-fq4",
  title: "2. Calor específico y cambios de estado",
  subtitle: FQ4_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("q", "Calor y variación de temperatura", [
      { kind: "steps", items: [
        "El calor necesario para variar la temperatura de un cuerpo es **Q = m·c·ΔT**, con ΔT = T_final − T_inicial.",
        "El **calor específico c** es la energía para elevar 1 K la temperatura de 1 kg de sustancia (**J/kg·K**). Agua: **4180**; hielo: 2090; hierro: 450; cobre: 385.",
        "Si Q > 0, el cuerpo **absorbe** calor y se calienta; si Q < 0, lo **cede** y se enfría.",
        "El agua tiene un calor específico muy alto: tarda en calentarse y en enfriarse, y por eso **modera el clima** de las costas.",
      ] },
    ], undefined, "stack"),
    slide("curva", "Curva de calentamiento", [
      { kind: "text", text: "Mira cómo evoluciona la temperatura del agua cuando se calienta de forma continua, desde hielo hasta vapor." },
    ], anim("fq4-curva-calentamiento"), "visual-top"),
    slide("explora", "Calienta hielo hasta vapor", [
      { kind: "text", text: "Aumenta el calor absorbido y observa los tramos inclinados y las mesetas. ¿Qué tramo necesita más energía?" },
    ], tool("fq4-cambios-estado-explorador"), "visual-top"),
    slide("latente", "Calor latente", [
      { kind: "steps", items: [
        "En un **cambio de estado**, la temperatura **permanece constante** y el calor es **Q = m·L**, con **L** el **calor latente** (J/kg).",
        "Agua: **fusión 334 kJ/kg** (0 °C) y **vaporización 2260 kJ/kg** (100 °C). La solidificación y la condensación **desprenden** esa misma energía.",
        "Las uniones entre partículas se **rompen** al fundir y vaporizar: la energía aumenta la energía potencial, no la cinética.",
        "Por eso **sudar** enfría (el sudor absorbe calor al evaporarse) y una quemadura de vapor es peor que una de agua a 100 °C.",
      ] },
    ], undefined, "stack"),
    calc("calc-q", "Calentar agua", "¿Cuántos kJ hacen falta para calentar 2 kg de agua de 20 °C a 70 °C? (c = 4,18 kJ/kg·K; redondea)", nums(418), "Q = 2·4,18·50 = 418 kJ.", "Q = m·c·ΔT."),
    calc("calc-c", "Calor específico", "Un bloque de 2 kg absorbe 18 000 J y su temperatura sube 10 K. ¿Cuál es su calor específico, en J/kg·K?", nums(900), "c = Q/(m·ΔT) = 18000/20 = 900 J/kg·K.", "c = Q/(m·ΔT)."),
    calc("calc-l", "Fundir hielo", "¿Cuántos kJ se necesitan para fundir 3 kg de hielo a 0 °C? (L_f = 334 kJ/kg)", nums(1002), "Q = m·L = 3·334 = 1002 kJ.", "Q = m·L."),
    calc("calc-razon", "Fusión y vaporización", "¿Cuántas veces mayor es, aproximadamente, el calor latente de vaporización del agua (2260 kJ/kg) que el de fusión (334 kJ/kg)? (redondea a unidades)", nums(7), "2260/334 ≈ 6,8 ≈ 7.", "Divide."),
    sort("clasifica", "¿Cambia la temperatura?", "Indica si el calor absorbido eleva la temperatura o produce un cambio de estado.",
      [["tem", "Sube la temperatura", "rose"], ["est", "Cambio de estado (T constante)", "cobalt"]],
      [["Calentar agua líquida de 20 a 80 °C", "tem"], ["Fundir un cubito a 0 °C", "est"], ["Hervir agua a 100 °C", "est"], ["Calentar hielo de −10 a 0 °C", "tem"], ["Condensar vapor a 100 °C", "est"], ["Calentar vapor de 100 a 120 °C", "tem"]],
      "En un cambio de estado la temperatura no varía.",
    ),
    pick("check", "Meseta", "¿Por qué la temperatura no sube mientras el hielo se funde?",
      "Porque el calor se invierte en romper las uniones entre partículas",
      [["Porque el hielo no absorbe calor", "Sí lo absorbe."], ["Porque el calor se pierde en el ambiente", "El calor se emplea en el cambio de estado."], ["Porque el hielo no es una sustancia pura", "El motivo es el calor latente."]],
      "El calor latente cambia el estado, no la temperatura.",
    ),
  ],
};
