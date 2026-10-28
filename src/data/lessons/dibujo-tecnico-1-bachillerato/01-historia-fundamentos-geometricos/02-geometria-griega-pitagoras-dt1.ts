import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const geometriaGriegaPitagorasDt1Lesson: InteractiveLesson = {
  slug: "geometria-griega-pitagoras-dt1",
  title: "2. Orígenes de la geometría: Thales, Pitágoras, Euclides e Hipatia",
  subtitle: DT1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Demostrar en lugar de medir", [
      { kind: "steps", items: [
        "Egipcios y babilonios usaban reglas prácticas de medida. Los **griegos** las convirtieron en **razonamientos demostrados**.",
        "**Thales de Mileto** (s. VI a. C.): relaciona **segmentos proporcionales** entre rectas paralelas y demuestra que el ángulo inscrito en una **semicircunferencia es recto**.",
        "**Pitágoras** y su escuela (s. VI a. C.): en todo triángulo rectángulo, $a^2 + b^2 = c^2$.",
        "**Euclides** (c. 300 a. C.): en los **Elementos** ordena la geometría con definiciones, postulados y teoremas, y sus construcciones usan solo **regla y compás**.",
        "**Hipatia de Alejandría** (c. 360–415): matemática y astrónoma que comentó las *Cónicas* de Apolonio y la *Aritmética* de Diofanto, y enseñó geometría en la ciudad que era el centro del saber antiguo.",
      ] },
    ], undefined, "stack"),
    slide("pit", "Pitágoras en acción", [
      { kind: "text", text: "Cambia los catetos y comprueba que el cuadrado de la hipotenusa es la suma de los otros dos. Busca ternas con tres lados enteros." },
    ], tool("dt1-pitagoras-explorador"), "visual-top"),
    slide("thales", "El ángulo recto de Thales", [
      { kind: "steps", items: [
        "Si **AB** es un diámetro y **C** está en la circunferencia, el ángulo **ACB mide 90°**.",
        "Es el caso particular del **arco capaz de 90°** (próxima lección): la semicircunferencia.",
        "Se usa para trazar **perpendiculares** y **tangentes** con compás: el centro de la circunferencia auxiliar es el punto medio de un segmento.",
        "La suma de ángulos de un triángulo es 180°, así que, si $\\hat{A} = 35^\\circ$, entonces $\\hat{B} = 55^\\circ$.",
      ] },
    ]),
    calc("calc-hip", "La terna 3-4-5", "En un triángulo rectángulo los catetos miden 3 cm y 4 cm. ¿Cuánto mide la hipotenusa, en cm?", nums(5), "√(9 + 16) = √25 = 5 cm.", "Suma los cuadrados y extrae la raíz."),
    calc("calc-cat", "Cateto desconocido", "Una escalera de 13 dm se apoya en una pared con el pie a 5 dm de ella. ¿A qué altura, en dm, toca la pared?", nums(12), "√(13² − 5²) = √144 = 12 dm.", "La escalera es la hipotenusa."),
    calc("calc-thales", "Ángulo inscrito", "El triángulo ABC está inscrito en una semicircunferencia de diámetro AB y el ángulo en A mide 35°. ¿Cuánto mide el ángulo en B, en grados?", nums(55), "C = 90° (Thales), así que B = 180° − 90° − 35° = 55°.", "Primero, el ángulo en C."),
    sort("clasifica-autor", "¿Quién lo aportó?", "Relaciona cada aportación con su autor.",
      [["tha", "Thales", "cobalt"], ["pit", "Pitágoras", "amber"], ["euc", "Euclides", "emerald"], ["hip", "Hipatia", "rose"]],
      [["El ángulo inscrito en una semicircunferencia es recto", "tha"], ["Segmentos proporcionales entre paralelas", "tha"], ["a² + b² = c² en el triángulo rectángulo", "pit"], ["Los Elementos: la geometría ordenada con postulados", "euc"], ["Construcciones con regla y compás", "euc"], ["Comentó las Cónicas de Apolonio", "hip"]],
      "La geometría griega pasó de la medida práctica a la demostración.",
    ),
    pick("check-terna", "¿Es rectángulo?", "Un triángulo tiene lados de 6, 8 y 10 cm. ¿Es rectángulo?",
      "Sí, porque 6² + 8² = 100 = 10²",
      [["No, porque 6 + 8 ≠ 10", "Pitágoras usa los cuadrados."], ["No, porque todos los lados son distintos", "Un triángulo rectángulo puede tener los tres lados distintos."], ["Sí, porque 10 es el mayor", "El mayor lado no basta."]],
      "Si se cumple a² + b² = c², el ángulo opuesto al lado mayor es recto.",
    ),
  ],
};
