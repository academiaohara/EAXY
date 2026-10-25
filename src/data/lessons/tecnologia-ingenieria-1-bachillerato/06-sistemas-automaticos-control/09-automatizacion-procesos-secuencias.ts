import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const automatizacionProcesosSecuenciasLesson: InteractiveLesson = {
  slug: "automatizacion-procesos-secuencias",
  title: "9. Automatización de procesos",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("secuencia", "Una secuencia de funcionamiento", [
      { kind: "text", text: "Un proceso automático se describe como una **secuencia de etapas**: detectar, decidir, actuar y volver al reposo. Cada paso a la siguiente etapa exige una **condición** (un sensor activo, un tiempo cumplido)." },
    ], anim("secuencia-clasificacion"), "split"),
    slide("linea", "Línea de clasificación virtual", [
      { kind: "text", text: "Un sensor mide la altura de cada pieza y un pistón desvía las grandes. Ajusta el umbral y la velocidad de la cinta e interpreta cada fallo: ¿es de calibración, de secuencia o de ritmo?" },
    ], tool("linea-clasificacion-explorador", { a: 15, b: 0.3 }), "visual-top"),
    slide("seguridad", "Interbloqueos y condiciones de seguridad", [
      { kind: "steps", items: [
        "**Interbloqueo**: una condición impide que se ejecute una acción peligrosa (no arrancar la cinta con la puerta abierta; no sacar el pistón mientras está ocupado).",
        "**Parada de emergencia**: corta la energía de forma segura, prioritaria sobre toda la lógica.",
        "**Estado seguro**: ante un fallo del sistema (se va la luz, un sensor se desconecta) la máquina debe quedar en la situación menos peligrosa.",
      ] },
      { kind: "warning", title: "Contactos de seguridad", text: "Los sensores de seguridad se diseñan para que, si se rompe el cable, el sistema se pare (contacto normalmente cerrado), no para que siga funcionando sin protección." },
    ]),
    slide("integracion", "Integrar sensores, controlador y actuadores", [
      { kind: "steps", title: "Diagnóstico de una secuencia que falla", items: [
        "**¿Llega la señal del sensor?** Comprueba sensor, cableado y alimentación.",
        "**¿Decide bien el controlador?** Revisa la condición lógica y los umbrales.",
        "**¿Actúa el actuador?** Comprueba la etapa de potencia (relé, válvula, aire, tensión).",
        "**¿Llegan a tiempo?** Compara tiempos de reacción con las velocidades del proceso.",
      ] },
      { kind: "text", text: "Se avanza **de la entrada a la salida**, descartando etapas: igual que con un circuito eléctrico." },
    ]),
    calc("calc-tiempo", "Tiempo hasta el actuador", "La cinta va a $0{,}4$ m/s y el pistón está a $0{,}6$ m del sensor. ¿Cuántos segundos tarda una pieza en llegar a él?",
      nums(1.5), "$t = d/v = 0{,}6/0{,}4 = 1{,}5$ s. El sistema debe reaccionar antes de ese tiempo.", "t = d/v."),
    calc("calc-ritmo", "Piezas por minuto", "Si las piezas llegan separadas $1{,}5$ s, ¿cuántas piezas por minuto procesa la línea?",
      nums(40), "$60/1{,}5 = 40$ piezas por minuto.", "Divide 60 s entre el intervalo."),
    sort("clasifica-fallo", "Tipo de fallo", "Clasifica cada síntoma según su causa más probable.",
      [["cal", "Calibración / umbral", "cobalt"], ["sec", "Secuencia o tiempos", "amber"], ["pot", "Potencia o actuador", "emerald"]],
      [["Clasifica como grande una pieza pequeña", "cal"], ["El sensor no distingue entre dos tamaños parecidos", "cal"], ["El pistón sale cuando la pieza ya pasó", "sec"], ["Se atascan dos piezas seguidas", "sec"], ["El controlador da la orden pero el pistón no se mueve", "pot"], ["Falta presión de aire", "pot"]],
      "Cada síntoma apunta a una etapa distinta de la cadena: medida, decisión o acción.",
    ),
    pick("check-estado-seguro", "Estado seguro", "Se va la luz en una línea con una cinta y un robot. ¿Qué debe ocurrir?",
      "Todo debe quedar parado y en una posición segura, sin movimientos inesperados al volver la corriente",
      [["Todo debe seguir con la última orden", "Con falta de energía no es posible ni deseable."], ["El robot debe terminar su ciclo de golpe al volver la luz", "Arrancar solo al volver la corriente es peligroso."], ["No hay que preverlo: ocurre pocas veces", "Los fallos poco frecuentes son los que más hay que prever en seguridad."]],
      "Un diseño seguro define el estado de reposo y obliga a un rearme consciente tras un fallo.",
    ),
  ],
};
