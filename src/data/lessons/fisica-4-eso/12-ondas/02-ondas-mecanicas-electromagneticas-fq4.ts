import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ondasMecanicasElectromagneticasFq4Lesson: InteractiveLesson = {
  slug: "ondas-mecanicas-electromagneticas-fq4",
  title: "2. Ondas mecánicas y electromagnéticas",
  subtitle: FQ4_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("meca", "Ondas mecánicas", [
      { kind: "steps", items: [
        "Las **ondas mecánicas** necesitan un **medio material** elástico para propagarse: el sonido, las ondas en el agua, las de una cuerda, las sísmicas.",
        "Su velocidad **depende del medio**: más rápidas en sólidos que en líquidos, y en estos que en gases.",
        "**No se propagan en el vacío**: en el espacio no se oye nada.",
      ] },
    ], undefined, "stack"),
    slide("em", "Ondas electromagnéticas", [
      { kind: "steps", items: [
        "Una **onda electromagnética** es una oscilación acoplada de un **campo eléctrico** y uno **magnético**, perpendiculares entre sí y a la dirección de propagación (**transversal**).",
        "**No necesitan medio**: viajan por el vacío a **c = 3·10⁸ m/s** (la luz del Sol tarda ≈ 8 min en llegar).",
        "Se cumple **c = λ·f**: a mayor frecuencia, menor longitud de onda.",
        "En la materia, su velocidad es **menor** que c (la luz en el agua, ≈ 2,25·10⁸ m/s).",
      ] },
    ], undefined, "stack"),
    slide("explora", "El espectro electromagnético", [
      { kind: "text", text: "Recorre el espectro. ¿Dónde está la luz visible? ¿Qué radiaciones son más energéticas?" },
    ], tool("fq4-espectro-explorador"), "visual-top"),
    slide("esp", "Bandas y usos", [
      { kind: "steps", items: [
        "De menor a mayor frecuencia: **radio, microondas, infrarrojo, visible, ultravioleta, rayos X y rayos gamma**.",
        "**Más frecuencia → más energía** (E = h·f). Las **UV, X y gamma** son **ionizantes**: pueden dañar el ADN.",
        "**Radio y microondas**: comunicaciones, wifi, radar, hornos. **Infrarrojo**: calor, mandos. **UV**: vitamina D, pero quemaduras. **X**: radiografías.",
        "La **luz visible** (≈ 380–750 nm) va del violeta (menor λ) al rojo (mayor λ).",
      ] },
    ], undefined, "stack"),
    calc("calc-l", "Longitud de onda", "Una emisora de radio emite a 100 MHz (10⁸ Hz). ¿Qué longitud de onda tiene, en m? (c = 3·10⁸ m/s)", nums(3), "λ = c/f = 3·10⁸/10⁸ = 3 m.", "λ = c/f."),
    calc("calc-f", "Frecuencia", "La luz de longitud de onda 600 nm, ¿qué frecuencia tiene, en 10¹⁴ Hz? (c = 3·10⁸ m/s)", nums(5), "f = 3·10⁸/6·10⁻⁷ = 5·10¹⁴ Hz.", "f = c/λ."),
    calc("calc-sol", "Del Sol a la Tierra", "La luz del Sol recorre 1,5·10¹¹ m. ¿Cuántos segundos tarda en llegar? (c = 3·10⁸ m/s)", nums(500), "t = d/c = 1,5·10¹¹/3·10⁸ = 500 s ≈ 8 min.", "t = d/c."),
    sort("clasifica", "Mecánica o electromagnética", "Clasifica cada onda.",
      [["mec", "Mecánica", "cobalt"], ["ele", "Electromagnética", "rose"]],
      [["El sonido", "mec"], ["La luz visible", "ele"], ["Las ondas de radio", "ele"], ["Las ondas sísmicas", "mec"], ["Los rayos X", "ele"], ["Las olas del mar", "mec"]],
      "Las mecánicas necesitan un medio material; las electromagnéticas, no.",
    ),
    pick("check", "Espacio", "¿Por qué podemos ver las estrellas pero no oír una explosión en el espacio?",
      "La luz se propaga en el vacío y el sonido no",
      [["Porque el sonido es más lento que la luz y se apaga", "Es porque necesita un medio."], ["Porque las explosiones no producen sonido", "Sí lo producen, pero no se propaga en el vacío."], ["Porque la luz es mecánica", "La luz es electromagnética."]],
      "El sonido necesita un medio material.",
    ),
  ],
};
