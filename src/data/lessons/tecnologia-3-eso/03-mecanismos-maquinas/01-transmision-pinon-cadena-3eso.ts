import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transmisionPinonCadena3esoLesson: InteractiveLesson = {
  slug: "transmision-pinon-cadena-3eso",
  title: "1. Transmisión del movimiento: piñón y cadena",
  subtitle: TECESO3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("repaso", "Mecanismos de transmisión", [
      { kind: "steps", items: [
        "**Engranajes**: giran en **sentido contrario**; deben estar juntos.",
        "**Poleas y correa**: transmiten a más distancia; pueden **resbalar**.",
        "**Piñones y cadena**: transmiten a distancia **sin resbalar** y con el **mismo sentido** de giro.",
        "En todos: **i = n_entrada / n_salida**. Si **i > 1**, reduce la velocidad y aumenta el par.",
      ] },
    ], undefined, "stack"),
    slide("cadena", "Piñón y cadena", [
      { kind: "text", text: "Cambia los dientes de los piñones, la distancia entre ejes y la velocidad. Mira la relación y la longitud de cadena necesaria." },
    ], tool("eso3-cadena-pinon-explorador"), "visual-top"),
    slide("uso", "Dónde se usa", [
      { kind: "steps", items: [
        "**Bicicletas** y **motos**: plato, cadena y piñón trasero.",
        "**Cintas transportadoras** y maquinaria agrícola.",
        "**Motores de coche**: la distribución puede usar cadena (o una correa dentada).",
        "Requieren **lubricación** y **tensión** adecuada; si se destensan, saltan.",
      ] },
    ]),
    calc("calc-i", "Relación de piñones", "Un piñón motriz de 11 dientes mueve uno conducido de 33 dientes con una cadena. ¿Cuál es la relación de transmisión i = z₂ / z₁?", nums(3), "33 / 11 = 3 : 1.", "Dientes del conducido entre dientes del motriz."),
    calc("calc-n", "Velocidad del conducido", "El piñón motriz gira a 120 rpm con i = 3. ¿A cuántas rpm gira el conducido?", nums(40), "120 / 3 = 40 rpm.", "n₂ = n₁ / i."),
    calc("calc-bici", "La bici", "Una bicicleta con plato de 48 dientes y piñón trasero de 16 dientes, ¿cuántas vueltas da la rueda trasera por cada vuelta de pedal?", nums(3), "48 / 16 = 3 vueltas.", "Plato entre piñón."),
    sort("clasifica-trans", "¿Qué mecanismo es?", "Relaciona cada característica con su mecanismo.",
      [["eng", "Engranajes", "cobalt"], ["pol", "Poleas y correa", "amber"], ["cad", "Piñones y cadena", "emerald"]],
      [["Giran en sentido contrario", "eng"], ["Los ejes están muy próximos", "eng"], ["Puede resbalar si hay mucha carga", "pol"], ["Transmite a distancia de forma silenciosa", "pol"], ["No resbala y conserva el sentido de giro", "cad"], ["Se usa en las bicicletas", "cad"]],
      "Cada mecanismo tiene ventajas según la distancia entre ejes, el ruido y la fuerza a transmitir.",
    ),
    pick("check-sentido", "El sentido de giro", "En una transmisión por cadena, ¿cómo giran los dos piñones?",
      "En el mismo sentido",
      [["En sentidos contrarios", "Eso ocurre con engranajes directos."], ["Uno gira y el otro no", "Los dos giran."], ["Depende de la cadena", "La cadena los hace girar igual."]],
      "La cadena envuelve ambos piñones y conserva el sentido.",
    ),
  ],
};
