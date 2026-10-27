import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const eticaTecnologiasEmergentesTi2Lesson: InteractiveLesson = {
  slug: "etica-tecnologias-emergentes-ti2",
  title: "8. Uso ético y responsable de las tecnologías emergentes",
  subtitle: TECTI2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Poder técnico y responsabilidad", [
      { kind: "steps", items: [
        "Que algo sea **técnicamente posible** no significa que sea **conveniente**. La ingeniería asume responsabilidades éticas.",
        "Principios habituales: **beneficio** social, **no maleficencia**, **justicia y no discriminación**, **autonomía** de las personas, **transparencia** y **rendición de cuentas**.",
        "En IA: **supervisión humana**, **explicabilidad**, **robustez y seguridad**, **privacidad** y **respeto de los derechos**.",
        "La **regulación** avanza (en la UE, el Reglamento de IA clasifica los sistemas por nivel de riesgo), pero no sustituye al juicio profesional.",
        "También hay impacto **ambiental**: el entrenamiento de grandes modelos y los centros de datos consumen mucha energía.",
      ] },
    ], undefined, "stack"),
    slide("riesgos", "Evalúa un sistema", [
      { kind: "text", text: "Compara varias aplicaciones de IA con criterios ponderados: beneficio, riesgo para las personas, privacidad y transparencia." },
    ], tool("matriz-decision-explorador"), "visual-top"),
    slide("sesgo", "Cuando los errores no se reparten igual", [
      { kind: "text", text: "Un modelo puede acertar mucho en media y fallar mucho en un grupo. Mira cómo cambian los errores con la prevalencia." },
    ], tool("ti2-confusion-explorador"), "visual-top"),
    slide("dilemas", "Dilemas frecuentes", [
      { kind: "steps", items: [
        "**Vigilancia** frente a **seguridad**: reconocimiento facial en espacios públicos.",
        "**Automatización** frente a **empleo**: qué tareas se sustituyen y cómo se reconvierten las personas.",
        "**Personalización** frente a **manipulación**: algoritmos de recomendación y burbujas de información.",
        "**Contenido generado por IA**: autoría, derechos de autor, desinformación y **deepfakes**.",
        "**Decisiones automatizadas** (crédito, empleo, justicia): derecho a una explicación y a la revisión humana.",
      ] },
    ]),
    calc("calc-riesgo", "Matriz de riesgos", "Un sistema tiene una probabilidad de daño de 3 (sobre 5) y una gravedad de 4 (sobre 5). ¿Cuánto vale el riesgo (probabilidad × gravedad)?", nums(12), "3 · 4 = 12: riesgo medio-alto.", "Multiplica probabilidad por gravedad."),
    calc("calc-pond", "Puntuación ponderada", "Una solución puntúa 4 en beneficio (peso 3) y 2 en privacidad (peso 2). ¿Cuál es su puntuación total? (4·3 + 2·2)", nums(16), "12 + 4 = 16.", "Suma puntuación por peso."),
    calc("calc-sesgo", "Error por grupos", "Un modelo acierta el 98 % en el grupo A y el 80 % en el grupo B. ¿Cuántos puntos porcentuales de diferencia hay?", nums(18), "98 − 80 = 18 puntos.", "Resta los dos aciertos."),
    sort("clasifica-etica", "¿Qué principio se vulnera?", "Relaciona cada situación con el principio.",
      [["dis", "No discriminación", "rose"], ["tra", "Transparencia", "amber"], ["pri", "Privacidad", "cobalt"], ["sup", "Supervisión humana", "emerald"]],
      [["Un sistema rechaza más solicitudes de un grupo sin motivo", "dis"], ["El modelo funciona peor con minorías", "dis"], ["Nadie sabe por qué el sistema tomó la decisión", "tra"], ["No se avisa de que se usa IA", "tra"], ["Se recogen datos sin consentimiento", "pri"], ["Se rastrea la ubicación sin necesidad", "pri"], ["Una decisión grave sin revisión de una persona", "sup"], ["No hay a quién reclamar", "sup"]],
      "Cada situación señala un principio distinto.",
    ),
    pick("check-resp", "Responsabilidad", "Un sistema de IA toma una decisión errónea que perjudica a una persona. ¿Quién responde?",
      "Las personas y organizaciones que lo diseñaron, lo desplegaron y lo usan: la responsabilidad no se delega en la máquina",
      [["Nadie, es la máquina", "Una máquina no puede ser responsable."], ["Solo el usuario final siempre", "La responsabilidad es compartida."], ["Solo quien lo programó siempre", "También quien lo despliega y lo usa."]],
      "La rendición de cuentas es un principio ético y legal.",
    ),
  ],
};
