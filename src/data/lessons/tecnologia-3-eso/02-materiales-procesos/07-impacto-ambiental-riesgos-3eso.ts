import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const impactoAmbientalRiesgos3esoLesson: InteractiveLesson = {
  slug: "impacto-ambiental-riesgos-3eso",
  title: "7. Impacto ambiental de los materiales y prevención de riesgos",
  subtitle: TECESO3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("impacto", "La energía de cada material", [
      { kind: "text", text: "Fabricar un material consume energía y recursos. Reciclar reduce mucho esa energía. Elige un material y sube el porcentaje de reciclado." },
    ], tool("eso3-impacto-material-explorador"), "visual-top"),
    slide("criterios", "Elegir con criterio ambiental", [
      { kind: "steps", items: [
        "Preferir materiales **reciclables** y **reciclados**.",
        "**Reducir** la cantidad de material y el número de tipos distintos.",
        "Pensar en el **fin de vida**: que el producto se pueda desmontar y separar.",
        "Optimizar el **despiece** y aprovechar los retales.",
        "Evitar sustancias **tóxicas** en la fabricación y el acabado.",
      ] },
    ]),
    slide("riesgo", "Evaluar el riesgo", [
      { kind: "text", text: "Antes de trabajar, se evalúa cada peligro: cuánto de probable es y cuán grave sería." },
    ], tool("eso3-riesgos-explorador"), "visual-top"),
    slide("medidas", "Cómo se previene", [
      { kind: "steps", items: [
        "**1.** **Eliminar** el peligro (no usar la máquina si no hace falta).",
        "**2.** **Proteger** el peligro: resguardos y carcasas en las máquinas.",
        "**3.** **Organizar** el trabajo: normas, formación, orden y limpieza.",
        "**4.** **Protección personal** (EPI): gafas, guantes, mascarilla, calzado.",
      ] },
    ]),
    calc("calc-energia", "Ahorro por reciclar", "Fabricar 10 kg de aluminio con material virgen requiere unos 1 800 MJ y con material 100 % reciclado, unos 150 MJ (valores orientativos). ¿Cuántos MJ se ahorran?", nums(1650), "1 800 − 150 = 1 650 MJ.", "Resta las dos energías."),
    calc("calc-riesgo", "Valor del riesgo", "Un trabajo con probabilidad 3 y gravedad 4 tiene un riesgo de… (probabilidad × gravedad)", nums(12), "3 · 4 = 12: riesgo medio.", "Multiplica probabilidad por gravedad."),
    sort("clasifica-medida", "Orden de las medidas", "Clasifica cada medida preventiva.",
      [["res", "Protección en la máquina o en el entorno", "cobalt"], ["epi", "Protección personal (EPI)", "amber"], ["org", "Organización y formación", "emerald"]],
      [["Resguardo en el plato del torno", "res"], ["Pantalla de protección", "res"], ["Gafas de seguridad", "epi"], ["Guantes y mascarilla", "epi"], ["Normas y formación previa", "org"], ["Orden y limpieza del taller", "org"]],
      "Primero se protege el origen del peligro; la protección personal es la última barrera.",
    ),
    pick("check-epi", "La última barrera", "¿Por qué los equipos de protección individual (gafas, guantes) se consideran la última medida?",
      "Porque no eliminan el peligro: solo reducen sus consecuencias si algo falla",
      [["Porque son los más caros", "No es la razón."], ["Porque no sirven", "Sirven, pero como última barrera."], ["Porque solo se usan en la industria", "Se usan también en el aula taller."]],
      "Lo mejor es eliminar el peligro o protegerlo en su origen.",
    ),
  ],
};
