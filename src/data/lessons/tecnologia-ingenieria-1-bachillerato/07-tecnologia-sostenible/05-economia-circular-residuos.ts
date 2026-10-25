import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const economiaCircularResiduosLesson: InteractiveLesson = {
  slug: "economia-circular-residuos",
  title: "5. Economía circular y gestión de residuos",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("lineal", "De la línea al círculo", [
      { kind: "text", text: "En la economía lineal los recursos se extraen, se usan y se tiran. En la **economía circular** se diseñan productos y procesos para que los materiales **sigan en uso**." },
    ], anim("economia-lineal-circular"), "split"),
    slide("erres", "Las «R» y su orden", [
      { kind: "steps", items: [
        "**Reducir**: consumir y producir menos materia y energía.",
        "**Reutilizar**: dar otro uso o un segundo uso al producto, sin transformarlo.",
        "**Reparar**: arreglar para alargar la vida.",
        "**Reciclar**: transformar el residuo en materia prima.",
        "**Valorizar**: aprovechar la energía del residuo si no hay otra opción; **eliminar** es el último recurso.",
      ] },
      { kind: "warning", title: "Reciclar no es lo primero", text: "Reciclar gasta energía y suele perder calidad del material. Las opciones de arriba (reducir, reutilizar, reparar) evitan además el consumo de recursos." },
    ]),
    slide("rediseno", "Rediseña un electrodoméstico", [
      { kind: "text", text: "Un aparato de 10 kg dura 5 años y se tira entero (2 kg de material nuevo al año). Alarga su vida, hazlo reparable y recupera sus materiales. ¿Qué palanca reduce más?" },
    ], tool("economia-circular-explorador", { a: 5, b: 0, c: 0 }), "visual-top"),
    slide("residuos", "Gestión de residuos", [
      { kind: "steps", items: [
        "**Separación en origen**: contenedores por tipo (envases, vidrio, papel, orgánico, resto).",
        "**Clasificación y valorización**: plantas que separan materiales y recuperan los útiles.",
        "**Residuos especiales**: electrónicos, pilas, aceites, medicamentos: puntos limpios y gestores autorizados.",
        "**Diseño para el desmontaje**: tornillos en vez de pegamento, un solo material por pieza y piezas modulares.",
      ] },
    ]),
    calc("calc-vida", "Alargar la vida", "Un aparato de $10$ kg dura $5$ años y no se recicla. Si un buen diseño lo hace durar $10$ años, ¿cuántos kg de material nuevo por año de servicio se necesitan?",
      nums(1), "$10/10 = 1$ kg por año, la mitad que los 2 kg/año de la vida de 5 años.", "Masa entre años de vida."),
    calc("calc-reciclaje", "Material virgen", "Un aparato de $10$ kg se fabrica con un $70\\,\\%$ de material reciclado. ¿Cuántos kg de material virgen lleva?",
      nums(3), "$10\\cdot 0{,}30 = 3$ kg de material virgen.", "El 30 % restante es virgen."),
    sort("clasifica-r", "¿Qué «R» es?", "Asigna cada acción a su «R».",
      [["red", "Reducir", "emerald"], ["reu", "Reutilizar", "cobalt"], ["rep", "Reparar", "amber"], ["rec", "Reciclar", "violet"]],
      [["Rechazar el embalaje innecesario", "red"], ["Comprar solo lo que se va a usar", "red"], ["Usar un tarro de vidrio como recipiente", "reu"], ["Donar ropa en buen estado", "reu"], ["Cambiar la pantalla rota de un móvil", "rep"], ["Coser un botón", "rep"], ["Depositar latas en el contenedor amarillo", "rec"]],
      "Reducir evita, reutilizar da un nuevo uso, reparar alarga la vida y reciclar convierte el residuo en materia prima.",
    ),
    pick("check-prioridad", "Orden de prioridad", "¿Qué opción es preferible, ambientalmente, para un taladro que deja de funcionar por una escobilla gastada?",
      "Repararlo cambiando la escobilla",
      [["Reciclarlo y comprar uno nuevo", "Reparar evita fabricar uno nuevo; el reciclaje queda para cuando ya no hay otra opción."], ["Tirarlo a la basura", "Es la peor opción: pierde todos los materiales."], ["Guardarlo roto", "No aprovecha su utilidad."]],
      "La jerarquía de residuos coloca la reparación antes que el reciclaje.",
    ),
  ],
};
