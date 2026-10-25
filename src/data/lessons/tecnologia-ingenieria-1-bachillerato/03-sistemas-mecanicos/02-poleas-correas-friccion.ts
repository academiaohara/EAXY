import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const poleasCorreasFriccionLesson: InteractiveLesson = {
  slug: "poleas-correas-friccion",
  title: "2. Poleas, correas y ruedas de fricción",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Transmisión por correa", [
      { kind: "definition", text: "Una **transmisión por correa** une dos poleas, a distancia, mediante una banda flexible que las arrastra por rozamiento. Las **ruedas de fricción** hacen lo mismo en contacto directo." },
      { kind: "steps", items: [
        "**Ventajas**: silenciosa, barata, absorbe golpes y puede patinar si hay sobrecarga (protege el motor).",
        "**Inconvenientes**: desliza (la relación no es exacta), la correa se estira y se desgasta.",
        "**Correa dentada**: evita el deslizamiento al engranar con la polea, con relación exacta.",
      ] },
    ], anim("correa-abierta-cruzada"), "split"),
    slide("relacion", "Relación entre diámetros y velocidades", [
      { kind: "text", text: "La correa recorre el mismo arco en las dos poleas (sin deslizamiento), así que la velocidad lineal de su borde es la misma:" },
      { kind: "rule", title: "Relación de transmisión", formula: "v = \\omega_1 r_1 = \\omega_2 r_2\\ \\Rightarrow\\ n_1 d_1 = n_2 d_2\\ \\Rightarrow\\ i = \\dfrac{n_2}{n_1} = \\dfrac{d_1}{d_2}" },
      { kind: "facts", items: [
        { tex: "i < 1", label: "reductor: sale más lento, más par" },
        { tex: "i > 1", label: "multiplicador: sale más rápido" },
      ] },
    ]),
    slide("banco", "Banco de poleas", [
      { kind: "text", text: "Cambia los diámetros y comprueba que la polea mayor gira más lenta. Prueba la correa cruzada y el deslizamiento." },
    ], tool("poleas-correas-explorador", { a: 60, b: 120, c: 1200 }), "visual-top"),
    calc("calc-n2", "Velocidad de salida", "Un motor gira a $1\\,440$ rpm y mueve una polea de $50$ mm. La polea conducida mide $150$ mm. ¿A cuántas rpm gira?",
      nums(480), "$n_2 = n_1 d_1 / d_2 = 1440\\cdot 50/150 = 480$ rpm. Es un reductor con $i = 1/3$.", "n₁·d₁ = n₂·d₂."),
    calc("calc-d2", "Elegir el diámetro", "Se quiere que una polea gire a $600$ rpm partiendo de un motor de $1\\,200$ rpm con una polea motriz de $80$ mm. ¿Qué diámetro, en mm, debe tener la conducida?",
      nums(160), "$d_2 = n_1 d_1 / n_2 = 1200\\cdot 80/600 = 160$ mm.", "Despeja d₂ de n₁·d₁ = n₂·d₂."),
    sort("clasifica-trans", "Correa o fricción", "Clasifica cada característica.",
      [["cor", "Correa", "cobalt"], ["fri", "Rueda de fricción", "amber"]],
      [["Permite transmitir a distancia", "cor"], ["Puede ser dentada", "cor"], ["Las ruedas están en contacto directo", "fri"], ["Invierte el sentido de giro sin más elementos", "fri"], ["Se estira con el uso", "cor"], ["Desliza si el contacto se ensucia", "fri"]],
      "La correa une poleas separadas; las ruedas de fricción se tocan, por lo que invierten el giro.",
    ),
    pick("check-sentido", "Sentido de giro", "¿Cómo se consigue que dos poleas unidas por una correa giren en sentido contrario?",
      "Cruzando la correa",
      [["Poniendo la polea conducida más grande", "El tamaño cambia la velocidad, no el sentido."], ["Aumentando la tensión", "La tensión no cambia el sentido."], ["Es imposible: siempre giran igual", "Con una correa cruzada giran al contrario."]],
      "La correa abierta mantiene el sentido; la cruzada lo invierte (a costa de más desgaste).",
    ),
  ],
};
