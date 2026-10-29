import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transmisionDilatacionFq4Lesson: InteractiveLesson = {
  slug: "transmision-dilatacion-fq4",
  title: "3. Transmisión del calor y dilatación",
  subtitle: FQ4_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("formas", "Formas de transmitir el calor", [
      { kind: "steps", items: [
        "**Conducción**: por contacto directo, sobre todo en **sólidos**. Las partículas más agitadas transmiten su energía a las vecinas, sin desplazarse. Los **metales** son buenos conductores; la madera, los plásticos y el aire, **aislantes**.",
        "**Convección**: en **fluidos** (líquidos y gases). El fluido caliente es menos denso y **asciende**; el frío **desciende**: se forman corrientes (radiadores, brisas marinas, ebullición).",
        "**Radiación**: mediante **ondas electromagnéticas** (infrarrojas), **sin necesidad de medio material**. Así llega el calor del Sol y de una estufa.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Conducción y dilatación", [
      { kind: "text", text: "Compara materiales conductores y aislantes. Después cambia al estudio de la dilatación de una barra." },
    ], tool("fq4-transmision-dilatacion-explorador"), "visual-top"),
    slide("aplic", "Aplicaciones", [
      { kind: "steps", items: [
        "**Aislantes** (poliestireno, lana de roca, doble acristalamiento) reducen las pérdidas de calor de una vivienda; las cámaras de aire atrapan aire, mal conductor.",
        "El **color oscuro** absorbe más radiación que el claro: por eso en verano se viste de claro.",
        "La **calefacción** conviene colocarla en la parte baja (el aire caliente sube); el aire acondicionado, en la alta.",
        "Las cacerolas son de **metal** (conducen bien) con asas de **plástico o madera** (aislantes).",
      ] },
    ], undefined, "stack"),
    slide("dilat", "Dilatación", [
      { kind: "steps", items: [
        "Al **calentarse**, los cuerpos **aumentan de volumen** (dilatación): sus partículas vibran más y se separan. Al enfriarse, se contraen.",
        "**Dilatación lineal**: **ΔL = α·L₀·ΔT**, con α el coeficiente de dilatación (≈ 10⁻⁵ K⁻¹ en los metales).",
        "Se dejan **juntas de dilatación** en puentes, vías de tren y aceras para evitar que se deformen o rompan.",
        "El **agua** es una excepción: entre 0 y 4 °C se contrae al calentarse; por eso el hielo flota y los lagos se congelan de arriba hacia abajo.",
      ] },
    ], undefined, "stack"),
    calc("calc-dl", "Dilatación de una barra", "Una barra de acero de 100 m (α = 12·10⁻⁶ K⁻¹) se calienta 50 °C. ¿Cuánto se alarga, en mm?", nums(60), "ΔL = 12·10⁻⁶·100·50 = 0,06 m = 60 mm.", "ΔL = α·L₀·ΔT."),
    calc("calc-p", "Conducción", "Una pared de 10 m², 0,2 m de grosor y k = 1 W/m·K separa dos ambientes con 20 °C de diferencia. ¿Qué potencia térmica atraviesa la pared, en W?", nums(1000), "P = k·A·ΔT/L = 1·10·20/0,2 = 1000 W.", "P = k·A·ΔT/L."),
    calc("calc-esp", "Doble espesor", "Si se duplica el espesor de un aislante, la potencia que lo atraviesa se multiplica por… (factor)", nums(0.5), "P ∝ 1/L: la mitad (0,5).", "Inversamente proporcional."),
    sort("clasifica", "¿Cómo se transmite el calor?", "Clasifica cada situación.",
      [["con", "Conducción", "cobalt"], ["conv", "Convección", "emerald"], ["rad", "Radiación", "rose"]],
      [["La cuchara de metal se calienta en la sopa", "con"], ["El aire caliente sube sobre un radiador", "conv"], ["El Sol calienta la Tierra", "rad"], ["Una plancha calienta la ropa", "con"], ["El agua hierve formando corrientes en la olla", "conv"], ["El calor de una hoguera llega a tu cara", "rad"]],
      "Contacto: conducción. Fluido en movimiento: convección. Sin medio: radiación.",
    ),
    pick("check", "Vacío", "¿Cuál de las formas de transmisión del calor puede ocurrir en el vacío?",
      "La radiación",
      [["La conducción", "Necesita un medio material."], ["La convección", "Necesita un fluido."], ["Ninguna", "La radiación sí se propaga en el vacío."]],
      "El calor del Sol llega a la Tierra a través del vacío del espacio.",
    ),
  ],
};
