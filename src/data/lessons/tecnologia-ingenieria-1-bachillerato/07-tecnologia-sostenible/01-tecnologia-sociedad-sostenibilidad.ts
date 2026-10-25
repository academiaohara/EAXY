import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tecnologiaSociedadSostenibilidadLesson: InteractiveLesson = {
  slug: "tecnologia-sociedad-sostenibilidad",
  title: "1. Tecnología, sociedad y sostenibilidad",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Desarrollo sostenible", [
      { kind: "definition", text: "El **desarrollo sostenible** es el que satisface las necesidades del presente **sin comprometer** la capacidad de las generaciones futuras de satisfacer las suyas." },
      { kind: "text", text: "La tecnología mejora la calidad de vida (salud, comunicación, alimentos, energía), pero también consume recursos y produce residuos. La sostenibilidad pide valorar **las tres dimensiones a la vez**." },
    ], anim("triple-sostenibilidad"), "split"),
    slide("indicadores", "Decide y mira los indicadores", [
      { kind: "text", text: "Un pueblo debe renovar su suministro eléctrico. Marca decisiones y observa cómo cambian los tres indicadores. ¿Puedes mejorar el medio ambiente sin hundir la economía o a las familias más vulnerables?" },
    ], tool("indicadores-decision-explorador"), "visual-top"),
    slide("recursos", "Uso responsable de recursos", [
      { kind: "steps", items: [
        "**Necesidad real**: ¿hace falta este producto o esta función?",
        "**Eficiencia**: lograr lo mismo con menos materia y energía.",
        "**Durabilidad y reparación**: alargar la vida de lo que ya existe.",
        "**Materiales renovables o reciclados** siempre que sea posible.",
      ] },
    ]),
    slide("etica", "Innovación y responsabilidad", [
      { kind: "text", text: "Innovar no es solo inventar: es hacerlo **con responsabilidad** sobre las consecuencias, incluidas las no previstas. Un ingeniero debe preguntarse quién se beneficia, quién se perjudica y qué ocurrirá dentro de 20 años." },
      { kind: "warning", title: "Efecto rebote", text: "A veces una mejora de eficiencia lleva a consumir más (una bombilla LED barata hace que se deje la luz encendida más horas), anulando parte del ahorro." },
    ]),
    sort("clasifica-dim", "¿Qué dimensión?", "Asigna cada efecto de una nueva tecnología a la dimensión de sostenibilidad que afecta.",
      [["amb", "Ambiental", "emerald"], ["soc", "Social", "cobalt"], ["eco", "Económica", "amber"]],
      [["Reducción de emisiones de CO₂", "amb"], ["Menos vertidos al río", "amb"], ["Empleos de calidad en la zona", "soc"], ["Acceso a internet en zonas rurales", "soc"], ["Coste de mantenimiento a 20 años", "eco"], ["Rentabilidad de la inversión", "eco"]],
      "Emisiones y vertidos son ambientales; empleo y acceso son sociales; costes y rentabilidad son económicos.",
    ),
    pick("check-sost", "¿Es sostenible?", "Una fábrica reduce sus emisiones a la mitad, pero despide a la mitad de la plantilla y pierde dinero. ¿Es sostenible?",
      "No del todo: mejora la dimensión ambiental pero deteriora la social y la económica",
      [["Sí, porque contamina menos", "La sostenibilidad exige las tres dimensiones, no solo una."], ["Sí, porque ahorra energía", "Tampoco basta con un ahorro puntual."], ["No tiene relación con la sostenibilidad", "Es exactamente un caso de equilibrio entre dimensiones."]],
      "Algo sostenible debe poder mantenerse en el tiempo sin dañar el entorno, a las personas ni la viabilidad económica.",
    ),
  ],
};
