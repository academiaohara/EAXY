import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const corrienteContinuaElementosLesson: InteractiveLesson = {
  slug: "corriente-continua-elementos",
  title: "3. Corriente continua y elementos del circuito",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("elementos", "Los cinco tipos de elementos", [
      { kind: "steps", items: [
        "**Generadores**: dan energía a las cargas (pilas, baterías, fuentes de alimentación, paneles solares).",
        "**Conductores**: llevan la corriente con poca resistencia (cables de cobre).",
        "**Receptores**: transforman la energía eléctrica en otra (lámpara → luz, motor → movimiento, resistencia → calor).",
        "**Elementos de maniobra**: abren o cierran el paso (interruptores, pulsadores, conmutadores).",
        "**Elementos de protección**: evitan daños (fusibles, magnetotérmicos, diferenciales).",
      ] },
      { kind: "definition", text: "En **corriente continua (CC)** la tensión y la corriente mantienen siempre el mismo sentido (pilas, baterías, fuentes de PC). En corriente alterna cambian de sentido periódicamente." },
    ], undefined, "stack"),
    slide("sim", "Circuito abierto, cerrado y cortocircuito", [
      { kind: "text", text: "Cierra el interruptor, cambia la polaridad y prueba el cortocircuito. Observa qué le pasa al fusible. Cambia a LED para ver la importancia de la polaridad." },
    ], tool("circuito-basico-explorador", { n: 0 }), "visual-top"),
    slide("estados", "Estados de un circuito", [
      { kind: "compare",
        left: { title: "Abierto", text: "Hay una interrupción: no circula corriente y el receptor no funciona. La tensión de la pila aparece entera en el punto de corte.", tone: "info" },
        right: { title: "Cerrado", text: "Camino continuo de la pila al receptor y de vuelta: circula corriente y el receptor funciona.", tone: "ok" } },
      { kind: "warning", title: "Cortocircuito", text: "Un camino de resistencia casi nula entre los bornes de la fuente. La corriente se dispara ($I = V/R$ con $R\\approx 0$), calienta los cables y puede provocar un incendio. Por eso se usan fusibles e interruptores automáticos." },
    ]),
    slide("polaridad", "Polaridad", [
      { kind: "text", text: "Algunos componentes no son simétricos y solo funcionan bien en un sentido:" },
      { kind: "steps", items: [
        "**LED y diodos**: conducen solo del ánodo (+) al cátodo (−).",
        "**Condensadores electrolíticos**: si se conectan al revés pueden reventar.",
        "**Motores de CC**: giran al revés si se invierte la polaridad (se usa para cambiar el sentido).",
      ] },
      { kind: "text", text: "Una lámpara de filamento no distingue polaridad: funciona igual al revés." },
    ]),
    sort("clasifica-elem", "¿Qué tipo de elemento es?", "Clasifica cada elemento del circuito.",
      [["gen", "Generador", "emerald"], ["rec", "Receptor", "amber"], ["man", "Maniobra", "cobalt"], ["pro", "Protección", "violet"]],
      [["Batería de coche", "gen"], ["Panel solar", "gen"], ["Motor", "rec"], ["Lámpara", "rec"], ["Pulsador", "man"], ["Conmutador", "man"], ["Fusible", "pro"], ["Magnetotérmico", "pro"]],
      "Generadores dan energía, receptores la transforman, los elementos de maniobra controlan el paso y los de protección actúan ante sobrecargas.",
    ),
    pick("check-corto", "Cortocircuito", "¿Por qué un cortocircuito es peligroso?",
      "Porque con resistencia casi nula la corriente se dispara y calienta cables y fuente",
      [["Porque la tensión de la fuente se multiplica", "La tensión no aumenta; lo que se dispara es la intensidad."], ["Porque se apaga la lámpara", "Que se apague es la consecuencia menos grave."], ["Porque la corriente cambia de sentido", "Sigue el mismo sentido; lo peligroso es su magnitud."]],
      "Al ser R ≈ 0, I = V/R se hace enorme y la potencia disipada (I²R en los cables) los calienta peligrosamente.",
    ),
    pick("check-abierto", "Circuito abierto", "Un circuito en serie con pila de 6 V, interruptor y lámpara tiene el interruptor abierto. Con un voltímetro, ¿qué mides entre los contactos del interruptor?",
      "Unos 6 V: toda la tensión de la pila cae en el punto de corte",
      [["0 V", "Eso ocurre con el interruptor cerrado, cuando hay camino continuo."], ["3 V", "No se reparte a la mitad: la lámpara no tiene corriente y no hay caída en ella."], ["No se puede medir", "Sí se puede, y es muy útil para localizar averías."]],
      "Sin corriente no hay caída de tensión en la lámpara; toda la tensión de la pila queda entre los contactos abiertos.",
    ),
  ],
};
