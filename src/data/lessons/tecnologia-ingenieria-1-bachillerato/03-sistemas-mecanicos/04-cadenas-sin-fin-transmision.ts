import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cadenasSinFinTransmisionLesson: InteractiveLesson = {
  slug: "cadenas-sin-fin-transmision",
  title: "4. Cadenas, ruedas dentadas y tornillo sin fin",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("cadena", "Transmisión por cadena", [
      { kind: "definition", text: "Una **cadena** engrana con **ruedas dentadas** (catalinas) y transmite el movimiento a distancia **sin deslizamiento**, con relación exacta." },
      { kind: "compare",
        left: { title: "Ventajas", text: "Relación exacta, soporta potencias altas y trabaja con poca tensión previa. Los dos piñones giran en el mismo sentido.", tone: "ok" },
        right: { title: "Inconvenientes", text: "Necesita lubricación y mantenimiento, es más ruidosa que una correa y se alarga con el uso.", tone: "warn" } },
      { kind: "rule", title: "Misma relación que los engranajes", formula: "i = \\dfrac{n_{\\text{piñón}}}{n_{\\text{plato}}} = \\dfrac{z_{\\text{plato}}}{z_{\\text{piñón}}}" },
    ]),
    slide("bici", "La bicicleta: plato, piñón y desarrollo", [
      { kind: "text", text: "En una bicicleta la relación se escoge con **plato** (delante) y **piñón** (detrás). El **desarrollo** es lo que avanza la bici por pedalada. Cambia plato, piñón y cadencia." },
    ], tool("bicicleta-explorador", { a: 44, b: 16, c: 80 }), "visual-top"),
    slide("sinfin", "Tornillo sin fin y corona", [
      { kind: "definition", text: "El **tornillo sin fin** es un tornillo que engrana con una **corona** dentada. Transmite el giro entre ejes que se cruzan a 90° con una reducción muy grande en una sola etapa." },
      { kind: "rule", title: "Relación", text: "Cada vuelta del tornillo avanza tantos dientes como entradas tenga; la corona tiene z dientes.", formula: "i = \\dfrac{n_{\\text{corona}}}{n_{\\text{tornillo}}} = \\dfrac{\\text{entradas}}{z_{\\text{corona}}}" },
      { kind: "warning", title: "Irreversible, pero con pérdidas", text: "Con una entrada suele ser irreversible (la corona no mueve al tornillo), útil en elevadores. A cambio, el rendimiento es bajo (50–70 %) por el rozamiento." },
    ], tool("sin-fin-explorador", { a: 1500, b: 30, c: 1 }), "split"),
    calc("calc-bici", "Desarrollo", "Plato de $48$ dientes, piñón de $16$ y rueda de $2{,}1$ m de perímetro. ¿Cuántos metros avanza la bici por pedalada?",
      nums(6.3), "$i = 48/16 = 3$ vueltas de rueda por pedalada. Desarrollo: $3\\cdot 2{,}1 = 6{,}3$ m.", "Primero, vueltas de rueda por pedalada."),
    calc("calc-sinfin", "Reducción con sin fin", "Un tornillo sin fin de una entrada gira a $1\\,440$ rpm y mueve una corona de $36$ dientes. ¿A cuántas rpm gira la corona?",
      nums(40), "$i = 1/36$, luego $n_2 = 1440/36 = 40$ rpm.", "n_corona = n_tornillo · entradas / z."),
    sort("clasifica-sistemas", "¿Qué sistema es?", "Asocia cada característica con el sistema al que corresponde.",
      [["cad", "Cadena", "cobalt"], ["sin", "Tornillo sin fin", "amber"], ["cor", "Correa", "emerald"]],
      [["Ejes paralelos, sin deslizamiento", "cad"], ["Ejes que se cruzan a 90°", "sin"], ["Gran reducción en una etapa", "sin"], ["Puede patinar ante una sobrecarga", "cor"], ["Necesita lubricación", "cad"], ["Suele ser irreversible", "sin"]],
      "La cadena transmite sin deslizar entre ejes paralelos; el sin fin da grandes reducciones a 90° y es irreversible; la correa patina y protege.",
    ),
    pick("check-bici", "Subir una cuesta", "En una bicicleta, para subir una cuesta con poca fuerza en los pedales, ¿qué combinación conviene?",
      "Plato pequeño y piñón grande (relación baja)",
      [["Plato grande y piñón pequeño", "Da más metros por pedalada pero exige mucha más fuerza: es para llano o bajada."], ["Cualquiera: el esfuerzo es el mismo", "El esfuerzo depende de la relación elegida."], ["Solo importa la cadencia", "La cadencia también cuenta, pero la relación condiciona la fuerza necesaria."]],
      "Una relación baja multiplica la fuerza en la rueda a costa de avanzar menos por pedalada.",
    ),
  ],
};
