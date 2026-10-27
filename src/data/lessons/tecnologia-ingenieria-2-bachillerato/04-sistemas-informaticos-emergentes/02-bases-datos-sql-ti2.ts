import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const basesDatosSqlTi2Lesson: InteractiveLesson = {
  slug: "bases-datos-sql-ti2",
  title: "2. Bases de datos relacionales y SQL",
  subtitle: TECTI2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Guardar datos con estructura", [
      { kind: "steps", items: [
        "Una **base de datos** es una colección organizada de datos que se puede consultar y modificar de forma eficiente y segura.",
        "En el modelo **relacional** los datos se guardan en **tablas**: cada **fila** es un registro y cada **columna** un atributo.",
        "La **clave primaria** identifica de forma única cada fila; una **clave ajena** enlaza con otra tabla.",
        "Un **sistema gestor (SGBD)**, como MySQL, PostgreSQL o SQLite, se encarga del acceso, la seguridad y la integridad.",
        "Las bases **NoSQL** (documentos, clave-valor, grafos) se usan cuando los datos no encajan en tablas o hay que escalar mucho.",
      ] },
    ], undefined, "stack"),
    slide("sql", "Consulta una tabla", [
      { kind: "text", text: "Elige un filtro, un orden o una función de resumen y mira la sentencia SQL y el resultado." },
    ], tool("ti2-sql-explorador"), "visual-top"),
    slide("sent", "Las sentencias básicas", [
      { kind: "steps", items: [
        "**SELECT** columnas **FROM** tabla **WHERE** condición **ORDER BY** columna: consulta.",
        "**INSERT INTO** tabla **VALUES** (...): añade una fila.",
        "**UPDATE** tabla **SET** columna = valor **WHERE** condición: modifica.",
        "**DELETE FROM** tabla **WHERE** condición: borra (sin WHERE se borrarían todas las filas).",
        "**JOIN**: combina tablas a través de sus claves.",
      ] },
    ]),
    calc("calc-count", "Contar filas", "En la tabla de piezas del ejemplo, ¿cuántas piezas son de acero? (WHERE material = 'acero')", nums(3), "Son el eje, el engranaje y la palanca: 3.", "Cuenta las filas que cumplen la condición."),
    calc("calc-sum", "Sumar", "La suma de la masa de las piezas de plástico (carcasa 90 g y tapa 40 g), ¿cuántos g es?", nums(130), "90 + 40 = 130 g.", "Suma la columna masa de las filas filtradas."),
    calc("calc-avg", "Media", "El precio medio de las piezas de acero (12,5 €, 15 € y 9 €), ¿cuántos € vale? (redondea a dos decimales)", nums(12.17, 12.1667), "36,5 / 3 ≈ 12,17 €.", "Suma entre número de filas."),
    sort("clasifica-sql", "¿Qué sentencia?", "Relaciona cada acción con la sentencia SQL.",
      [["sel", "SELECT", "cobalt"], ["ins", "INSERT", "emerald"], ["upd", "UPDATE", "amber"], ["del", "DELETE", "rose"]],
      [["Listar las piezas más caras", "sel"], ["Contar cuántas hay de aluminio", "sel"], ["Dar de alta una pieza nueva", "ins"], ["Añadir un cliente", "ins"], ["Cambiar el precio de una pieza", "upd"], ["Corregir un dato erróneo", "upd"], ["Eliminar una pieza descatalogada", "del"], ["Vaciar los pedidos antiguos", "del"]],
      "Cada sentencia cubre una operación sobre los datos.",
    ),
    pick("check-clave", "Clave primaria", "¿Para qué sirve la clave primaria de una tabla?",
      "Para identificar cada fila de forma única, sin repeticiones",
      [["Para cifrar los datos", "No es su función."], ["Para ordenar siempre alfabéticamente", "No lo hace."], ["Para unir dos bases de datos", "Se usa la clave ajena."]],
      "No puede haber dos filas con la misma clave primaria.",
    ),
  ],
};
