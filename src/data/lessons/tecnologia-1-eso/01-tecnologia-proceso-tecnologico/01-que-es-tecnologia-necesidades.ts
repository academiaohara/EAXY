import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const queEsTecnologiaNecesidadesLesson: InteractiveLesson = {
  slug: "que-es-tecnologia-necesidades",
  title: "1. ¿Qué es la tecnología? Necesidades humanas",
  subtitle: TECESO1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "La tecnología resuelve problemas", [
      { kind: "definition", text: "La **tecnología** es el conjunto de conocimientos, técnicas y objetos que las personas crean para **resolver problemas** y **satisfacer necesidades**." },
      { kind: "steps", items: [
        "Parte siempre de una **necesidad** o un problema real (abrigarse, comunicarse, desplazarse).",
        "Usa **conocimientos** y **materiales** para crear una solución: un objeto, una máquina, un proceso o un servicio.",
        "La solución se **prueba y se mejora**: ningún invento nace perfecto.",
      ] },
    ], undefined, "stack"),
    slide("necesidades", "Necesidades y deseos", [
      { kind: "compare",
        left: { title: "Necesidad", text: "Algo que hace falta para vivir con salud y seguridad: comer, beber, abrigarse, tener un techo, comunicarse.", tone: "key" },
        right: { title: "Deseo", text: "Algo que apetece pero de lo que se podría prescindir: el último modelo de móvil o unas zapatillas de marca.", tone: "info" } },
      { kind: "text", text: "La tecnología nace para cubrir necesidades, pero también crea otras nuevas: hoy nadie imagina estudiar sin conexión a internet." },
    ]),
    slide("objeto", "Cada objeto responde a una necesidad", [
      { kind: "text", text: "Para entender un objeto se analiza **por qué existe**, **qué hace**, **cómo es** y **de qué está hecho**. Pruébalo con cuatro objetos del aula." },
    ], tool("analisis-objeto-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-necesidad", "¿Qué necesidad cubre?", "Relaciona cada objeto con la necesidad principal que resuelve.",
      [["abr", "Protegerse", "cobalt"], ["com", "Comunicarse", "emerald"], ["tra", "Desplazarse", "amber"], ["ali", "Alimentarse", "violet"]],
      [["Chubasquero", "abr"], ["Casco de moto", "abr"], ["Teléfono móvil", "com"], ["Cartas y sellos", "com"], ["Bicicleta", "tra"], ["Tren", "tra"], ["Nevera", "ali"], ["Cuchillo de cocina", "ali"]],
      "El chubasquero y el casco protegen; móvil y correo comunican; bicicleta y tren desplazan; nevera y cuchillo ayudan a conservar y preparar alimentos.",
    ),
    slide("efectos", "La tecnología tiene ventajas e inconvenientes", [
      { kind: "compare",
        left: { title: "Ventajas", text: "Más salud (vacunas, agua potable), más comodidad, más comunicación, trabajos menos duros y más seguros.", tone: "key" },
        right: { title: "Inconvenientes", text: "Consumo de recursos, contaminación y residuos, dependencia de las máquinas y desigualdad en el acceso.", tone: "warn" } },
      { kind: "warning", title: "Ojo", text: "La tecnología no es buena o mala por sí misma: depende de **cómo se diseña y para qué se usa**. Por eso un buen proyecto piensa también en sus efectos." },
    ]),
    pick("check-tec", "¿Es tecnología?", "Un grupo de alumnos diseña una cartera que se engancha a la mochila para llevar el abono del autobús. ¿Por qué es un ejemplo de tecnología?",
      "Porque crea un objeto que resuelve un problema concreto (no perder el abono)",
      [["Porque está hecha de plástico", "El material no decide si algo es tecnología; lo que importa es que resuelva una necesidad."], ["Porque se compra en una tienda", "Hay tecnología que no se vende y objetos de tienda que no resuelven nada."], ["Porque es cara", "El precio no tiene relación con que sea tecnología."]],
      "La tecnología se reconoce porque aplica conocimientos para solucionar una necesidad real, aunque la solución sea sencilla.",
    ),
    pick("check-necesidad", "Necesidad o deseo", "¿Cuál de estas opciones describe mejor una necesidad y no un deseo?",
      "Disponer de agua potable en casa",
      [["Tener la consola más reciente", "Es un deseo: se puede vivir sin ella."], ["Cambiar de móvil cada año", "Es un deseo; el móvil actual probablemente ya cubre la necesidad."], ["Tener un coche deportivo", "Es un deseo, no es imprescindible."]],
      "El agua potable es imprescindible para la salud; los otros ejemplos son deseos.",
    ),
  ],
};
