import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const simbolosEsquemasElectricosLesson: InteractiveLesson = {
  slug: "simbolos-esquemas-electricos",
  title: "3. Símbolos y esquemas eléctricos",
  subtitle: TECESO1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dibujar un circuito sin dibujar los objetos", [
      { kind: "definition", text: "Un **esquema eléctrico** representa un circuito con **símbolos normalizados** unidos por líneas rectas, sin dibujar el aspecto real de los componentes." },
      { kind: "steps", items: [
        "Los cables se dibujan como **líneas rectas** (horizontales y verticales).",
        "Los cruces con conexión llevan un **punto**; sin punto, los cables se cruzan sin tocarse.",
        "Cada componente tiene su **símbolo** que todo el mundo reconoce.",
      ] },
    ], undefined, "stack"),
    slide("simbolos", "Los símbolos básicos", [
      { kind: "text", text: "Recorre los símbolos. Usa el modo de repaso para adivinar cada componente antes de ver su nombre." },
    ], tool("simbolos-electricos-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-simbolo", "Símbolo y función", "Relaciona cada componente con su función en el circuito.",
      [["gen", "Genera la tensión", "emerald"], ["rec", "Transforma la energía eléctrica", "amber"], ["con", "Abre o cierra el paso", "cobalt"], ["pro", "Limita o protege", "violet"]],
      [["Pila", "gen"], ["Bombilla", "rec"], ["Motor", "rec"], ["Zumbador", "rec"], ["Interruptor", "con"], ["Pulsador", "con"], ["Fusible", "pro"], ["Resistencia", "pro"]],
      "El símbolo de cada componente dice qué función cumple en el circuito.",
    ),
    slide("leer", "Leer un esquema", [
      { kind: "steps", items: [
        "Empieza por la **pila**: busca el polo positivo (placa larga).",
        "Sigue la línea de cable hasta el primer componente y di para qué sirve.",
        "Recorre todo el camino hasta volver al polo negativo.",
        "Comprueba que el **camino es cerrado**: si no lo es, el circuito no funciona.",
      ] },
    ]),
    pick("check-polo", "El polo positivo", "En el símbolo de una pila, ¿cómo se reconoce el polo positivo?",
      "Es la placa más larga y más fina",
      [["Es la placa más corta y más gruesa", "Esa es el polo negativo."], ["Es la que lleva un punto", "El punto indica conexión de cables, no el polo."], ["No se puede distinguir", "El símbolo está pensado para distinguirlos."]],
      "La placa larga es el + y la corta y gruesa, el −.",
    ),
    pick("check-cruce", "Cruce de cables", "En un esquema, dos cables se cruzan y no hay punto en el cruce. ¿Qué significa?",
      "Los cables se cruzan sin tocarse: no están conectados",
      [["Están conectados entre sí", "La conexión se indica con un punto."], ["Hay un cortocircuito", "No hay conexión, luego tampoco cortocircuito."], ["Es un error de dibujo", "Es una forma válida de dibujar cables que pasan uno sobre otro."]],
      "Solo el punto en el cruce indica que los cables están unidos.",
    ),
  ],
};
