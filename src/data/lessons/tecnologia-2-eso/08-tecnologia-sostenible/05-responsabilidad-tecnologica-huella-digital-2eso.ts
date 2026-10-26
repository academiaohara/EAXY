import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const responsabilidadTecnologicaHuellaDigital2esoLesson: InteractiveLesson = {
  slug: "responsabilidad-tecnologica-huella-digital-2eso",
  title: "5. Responsabilidad en el uso de la tecnología y huella digital",
  subtitle: TECESO2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Usar la tecnología con responsabilidad", [
      { kind: "steps", items: [
        "**Consumo responsable**: necesitar frente a desear; prolongar la vida de los aparatos.",
        "**Impacto de lo digital**: servidores, redes y dispositivos consumen electricidad y materiales (la huella digital ambiental).",
        "**Residuos electrónicos (RAEE)**: contienen materiales valiosos y tóxicos; deben ir al **punto limpio**, nunca a la basura común.",
        "**Ética**: respetar a las personas, su privacidad y su trabajo; pensar a quién beneficia y a quién perjudica una tecnología.",
      ] },
    ], undefined, "stack"),
    slide("video", "El coste energético del vídeo", [
      { kind: "text", text: "Ver vídeo mueve muchos datos. Calcula cuántos datos y cuánta energía supone en un mes (estimaciones muy aproximadas)." },
    ], tool("eso2-huella-digital-explorador"), "visual-top"),
    slide("habitos", "Hábitos tecnológicos sostenibles", [
      { kind: "steps", items: [
        "**Alargar la vida** de móviles y ordenadores: repararlos, actualizarlos y regalarlos o venderlos cuando ya no los uses.",
        "**Reducir la calidad** del vídeo cuando no hace falta y usar **wifi** en lugar de datos móviles.",
        "**Borrar** correos y archivos en la nube que ya no necesitas.",
        "**Apagar** equipos y cargadores que no se usan.",
        "**Comprar** con criterio: etiqueta energética, reparabilidad y garantía.",
      ] },
    ]),
    slide("consumo", "Tus hábitos de consumo", [
      { kind: "text", text: "Comprueba si cada decisión es una necesidad o un deseo, y su efecto." },
    ], tool("consumo-habitos-explorador"), "visual-top"),
    calc("calc-datos", "Datos al mes", "Ves 2 horas de vídeo en alta definición (3 GB por hora) cada día durante 30 días. ¿Cuántos GB descargas?", nums(180), "2 · 30 · 3 = 180 GB.", "Horas al día por días por GB por hora."),
    calc("calc-kwh", "Energía de la red", "Para esos 180 GB, la red y los centros de datos usan unos 0,05 kWh por GB (estimación). ¿Cuántos kWh son?", nums(9), "180 · 0,05 = 9 kWh.", "GB por kWh por GB."),
    sort("clasifica-habito", "¿Hábito sostenible?", "Clasifica cada hábito.",
      [["sos", "Sostenible", "emerald"], ["no", "Poco sostenible", "rose"]],
      [["Reparar el móvil en lugar de cambiarlo", "sos"], ["Llevar el aparato viejo al punto limpio", "sos"], ["Ver vídeos en calidad adecuada a la pantalla", "sos"], ["Cambiar de móvil cada año por moda", "no"], ["Dejar los cargadores enchufados todo el día", "no"], ["Tirar una pila a la basura común", "no"]],
      "Alargar la vida, reciclar bien y ajustar el uso son hábitos sostenibles.",
    ),
    pick("check-raee", "Un aparato roto", "Tu antiguo teléfono ya no funciona y no tiene arreglo. ¿Qué haces?",
      "Llevarlo a un punto limpio o a una tienda que recoja aparatos electrónicos",
      [["Tirarlo al contenedor de basura común", "Contiene materiales tóxicos y valiosos."], ["Enterrarlo en el jardín", "Contaminaría el suelo."], ["Quemarlo", "Libera sustancias tóxicas."]],
      "Los residuos electrónicos se recogen aparte para recuperar materiales y evitar contaminación.",
    ),
  ],
};
