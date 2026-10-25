import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const memoriaTecnicaPresentacionLesson: InteractiveLesson = {
  slug: "memoria-tecnica-presentacion",
  title: "8. Documentación y presentación técnica",
  subtitle: TEC1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Lo que no está documentado no existe", [
      { kind: "definition", text: "La **memoria técnica** es el documento que describe un proyecto con suficiente detalle para que otra persona pueda **entenderlo, fabricarlo, comprobarlo y mejorarlo**." },
      { kind: "steps", title: "Estructura habitual", items: [
        "**Portada y resumen**: título, autores, fecha, versión.",
        "**Problema y requisitos**: qué se resuelve y cómo se mide.",
        "**Alternativas y decisión**: qué se comparó y por qué se eligió.",
        "**Diseño**: planos, esquemas, cálculos principales.",
        "**Lista de materiales y presupuesto**.",
        "**Ensayos y resultados**: datos, no opiniones.",
        "**Conclusiones, mejoras y fuentes**.",
      ] },
    ], undefined, "stack"),
    slide("editor", "Escribe una memoria con vista previa", [
      { kind: "text", text: "Rellena los apartados: la vista previa muestra cómo lo leería otra persona. Cambia las cantidades de la lista de materiales y observa el coste." },
    ], tool("memoria-tecnica-explorador"), "visual-top"),
    slide("planos", "Planos, esquemas y listas de materiales", [
      { kind: "steps", items: [
        "**Plano**: vistas acotadas con unidades, escala y tolerancias; permite fabricar sin preguntar.",
        "**Esquema**: representación simbólica (circuito, diagrama de bloques, mecanismo) que explica el funcionamiento.",
        "**Lista de materiales (BOM)**: referencia, descripción, cantidad, precio unitario y total.",
      ] },
      { kind: "example", title: "Coste de una línea de la lista", lines: [
        { math: "8\\ \\text{tornillos}\\times 0{,}10\\ \\text{€/ud} = 0{,}80\\ \\text{€}" },
        { math: "2\\ \\text{perfiles}\\times 6{,}50\\ \\text{€/ud} = 13{,}00\\ \\text{€}" },
      ] },
    ]),
    slide("autoria", "Propiedad intelectual y uso responsable de fuentes", [
      { kind: "steps", items: [
        "**Cita** siempre autor, título y fecha o enlace de lo que no es tuyo.",
        "Comprueba la **licencia**: Creative Commons, código abierto, todos los derechos reservados.",
        "Distingue **parafrasear** (con cita) de **copiar** (plagio).",
        "Reconoce la **autoría del equipo**: quién hizo qué.",
      ] },
      { kind: "warning", title: "Que esté en internet no significa que sea libre", text: "Una imagen o plano encontrado con un buscador puede tener todos los derechos reservados. Mejor usar material con licencia que permita reutilizarlo y citar siempre." },
    ]),
    slide("oral", "Presentar con claridad", [
      { kind: "steps", title: "Una presentación técnica de 5 minutos", items: [
        "**Problema** en una frase y el dato que lo justifica.",
        "**Requisitos** en una diapositiva (los 3–5 clave).",
        "**Solución elegida** y por qué frente a las alternativas.",
        "**Resultados de ensayo**: gráfica o tabla, con el límite marcado.",
        "**Conclusión honesta**: qué cumple, qué no y qué mejorarías.",
      ] },
      { kind: "text", text: "Una buena diapositiva comunica **una idea**. Los datos, en gráficos legibles con unidades; el texto, lo mínimo." },
    ]),
    sort("clasifica-doc", "¿En qué documento va?", "Reparte cada contenido en el documento técnico donde corresponde.",
      [["plano", "Plano", "cobalt"], ["bom", "Lista de materiales", "emerald"], ["ens", "Informe de ensayos", "amber"]],
      [["Cota de 120 mm con tolerancia ±0,2", "plano"], ["Vista en planta a escala 1:2", "plano"], ["8 tornillos M4 a 0,10 €/ud", "bom"], ["2 perfiles de aluminio, 6,50 €/ud", "bom"], ["Flecha medida: 1,2 mm con 8 kg", "ens"], ["Resultado de tres repeticiones y media", "ens"]],
      "El plano dice cómo se fabrica; la lista, qué se compra; el informe, qué se midió y con qué resultado.",
    ),
    calc("calc-bom", "Coste de materiales", "Lista de materiales: 2 perfiles a $6{,}50$ €, 8 tornillos a $0{,}10$ € y 4 gomas a $0{,}40$ €. ¿Coste total en euros?",
      nums(15.4), "$2\\cdot 6{,}5 = 13$; $8\\cdot 0{,}1 = 0{,}8$; $4\\cdot 0{,}4 = 1{,}6$. Total: $13 + 0{,}8 + 1{,}6 = 15{,}4$ €.", "Multiplica cantidad por precio unitario en cada línea y suma."),
    pick("check-cita", "Uso de fuentes", "Quieres usar en tu memoria una gráfica que has encontrado en un artículo. ¿Qué haces?",
      "Citar autor, título y fecha, comprobando que su licencia permite reutilizarla",
      [["Copiarla sin más porque es pública", "Pública no significa libre: sin cita ni licencia es plagio."], ["Redibujarla sin citar", "Cambiar el aspecto no elimina la autoría de los datos."], ["No usarla nunca", "Se puede usar, citando correctamente y respetando la licencia."]],
      "Citar da crédito al autor, permite verificar el dato y es obligatorio para no plagiar.",
    ),
  ],
};
