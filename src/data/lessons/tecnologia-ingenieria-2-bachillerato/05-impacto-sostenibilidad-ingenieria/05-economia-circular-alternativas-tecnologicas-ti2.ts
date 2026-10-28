import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const economiaCircularAlternativasTecnologicasTi2Lesson: InteractiveLesson = {
  slug: "economia-circular-alternativas-tecnologicas-ti2",
  title: "5. Economía circular y elección de alternativas tecnológicas",
  subtitle: TECTI2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la línea al círculo", [
      { kind: "steps", items: [
        "Economía **lineal**: extraer, fabricar, usar y tirar. Consume recursos finitos y genera residuos.",
        "Economía **circular**: mantener los productos y materiales en uso el mayor tiempo posible y devolver al ciclo lo que se recupera.",
        "Jerarquía de estrategias, de mayor a menor beneficio: **rediseñar, reducir, reutilizar, reparar, remanufacturar y reciclar**.",
        "**Reciclar** es la última opción: conserva el material pero pierde el valor de la forma y la energía invertidas.",
      ] },
    ], undefined, "stack"),
    slide("circ", "Cuán circular es un producto", [
      { kind: "text", text: "Usa material reciclado, recupera al final y haz que dure más. Observa qué pesa más." },
    ], tool("ti2-circularidad-explorador"), "visual-top"),
    slide("diseno", "Diseñar para el ciclo", [
      { kind: "steps", items: [
        "**Modularidad y reparabilidad**: piezas sustituibles, manuales y repuestos disponibles.",
        "**Monomateriales o separables**: facilitan el reciclado.",
        "**Durabilidad real**: evitar la obsolescencia programada y ofrecer actualizaciones.",
        "**Servicio en lugar de producto**: alquilar, compartir y mantener alinean el interés del fabricante con la duración.",
      ] },
    ]),
    slide("alt", "Comparar alternativas tecnológicas", [
      { kind: "text", text: "Con varios criterios (coste, impacto, funcionamiento, mantenimiento), una matriz de decisión ordena las alternativas. Cambia los pesos y comprueba si el ganador es estable." },
    ], tool("matriz-decision-explorador"), "visual-top"),
    calc("calc-lfi", "Flujo lineal", "Un producto contiene un 30 % de material reciclado y se recupera un 50 % al final. El flujo lineal es 1 − (0,30 + 0,50)/2. ¿Cuánto vale, en %?", nums(60), "1 − 0,40 = 0,60: el 60 % del material sigue siendo lineal.", "Haz la media de las dos fracciones y réstala de 1."),
    calc("calc-mci", "Índice de circularidad", "Con vida media del sector, el índice vale 1 − LFI · 0,9. Con LFI = 0,6, ¿cuánto es? (dos decimales)", nums(0.46), "1 − 0,6 · 0,9 = 0,46.", "Multiplica y resta."),
    sort("clasifica-estrategia", "¿Qué estrategia es?", "Clasifica cada acción.",
      [["red", "Reducir y rediseñar", "cobalt"], ["reu", "Reutilizar y reparar", "amber"], ["rec", "Reciclar", "emerald"]],
      [["Diseñar un envase con menos material", "red"], ["Sustituir un producto por un servicio compartido", "red"], ["Reparar un móvil con una pantalla nueva", "reu"], ["Rellenar un envase en lugar de comprar otro", "reu"], ["Fundir latas para fabricar otras", "rec"], ["Triturar plástico para obtener granza", "rec"]],
      "Lo más valioso es no generar el residuo; reciclar es la última barrera.",
    ),
    pick("check-circ", "La mejor estrategia", "¿Cuál suele ser más sostenible: reciclar un teléfono o reparar uno y usarlo dos años más?",
      "Reparar y alargar la vida, porque conserva el valor y evita fabricar uno nuevo",
      [["Reciclarlo, porque se recupera todo el material", "Se recupera parte y se pierde la energía de fabricación."], ["Da igual, tienen el mismo efecto", "Reparar suele evitar mucho más impacto."], ["Tirarlo y comprar uno eficiente", "Fabricar uno nuevo supone un gran impacto."]],
      "La jerarquía circular prioriza alargar la vida antes de reciclar.",
    ),
  ],
};
