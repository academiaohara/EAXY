import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const bigDataTratamientoTi2Lesson: InteractiveLesson = {
  slug: "big-data-tratamiento-ti2",
  title: "3. Big data: tratamiento y gestión de datos",
  subtitle: TECTI2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuando los datos no caben", [
      { kind: "steps", items: [
        "**Big data** es el conjunto de datos tan grande, rápido o variado que no se puede tratar con las herramientas tradicionales.",
        "Se caracteriza por las **«V»**: **Volumen**, **Velocidad**, **Variedad** y **Veracidad** (y, para las empresas, **Valor**).",
        "Fuentes: sensores y dispositivos IoT, redes sociales, transacciones, imágenes, vídeo, registros de uso.",
        "Se almacena en **sistemas distribuidos** (Hadoop, almacenes en la nube) y se procesa **en paralelo** (MapReduce, Spark).",
        "Un **almacén de datos** y un **lago de datos** guardan información para analizarla más tarde.",
      ] },
    ], undefined, "stack"),
    slide("vol", "Cuántos datos genera una red de sensores", [
      { kind: "text", text: "Cambia el número de sensores, la frecuencia y el tamaño de cada muestra. Calcula el almacenamiento." },
    ], tool("ti2-volumen-datos-explorador"), "visual-top"),
    slide("analisis", "Del dato a la decisión", [
      { kind: "steps", items: [
        "**Recoger** los datos y **limpiarlos** (valores vacíos, duplicados, errores).",
        "**Almacenar** y **organizar** (bases de datos, ficheros, lagos).",
        "**Analizar**: estadística, minería de datos y aprendizaje automático.",
        "**Visualizar** con paneles y gráficos para **decidir**.",
        "Un dato fuera de rango suele ser un fallo del sensor, no una medida real.",
      ] },
    ]),
    slide("serie", "Analiza una serie de datos", [
      { kind: "text", text: "Un análisis simple: media, máximo, mínimo y recuento sobre un umbral." },
    ], tool("eso4-datos-explorador"), "visual-top"),
    calc("calc-dia", "Datos al día", "Mil sensores envían 1 muestra por segundo de 50 bytes. ¿Cuántos GB al día? (1 000·50·86 400 / 10⁹, redondea a un decimal)", nums(4.3, 4.32), "4,32 · 10⁹ B = 4,32 GB.", "Sensores por frecuencia por bytes por segundos del día."),
    calc("calc-anio", "Datos al año", "Con 4,32 GB al día, ¿cuántos TB al año? (4,32·365/1 000, redondea a un decimal)", nums(1.6, 1.58), "1 577 GB ≈ 1,58 TB.", "Multiplica por 365 y pasa a TB."),
    calc("calc-comp", "Compresión", "Si los datos se comprimen con un factor de 4, ¿cuántos GB al día quedan? (4,32/4)", nums(1.08), "4,32 / 4 = 1,08 GB.", "Divide entre el factor."),
    sort("clasifica-v", "¿Qué «V» es?", "Relaciona cada característica con la «V».",
      [["vol", "Volumen", "cobalt"], ["vel", "Velocidad", "amber"], ["var", "Variedad", "emerald"], ["ver", "Veracidad", "rose"]],
      [["Petabytes de registros", "vol"], ["Millones de clientes", "vol"], ["Datos que llegan en tiempo real", "vel"], ["Flujo continuo de sensores", "vel"], ["Texto, imagen, audio y vídeo mezclados", "var"], ["Datos estructurados y no estructurados", "var"], ["Datos con errores o sesgos", "ver"], ["Fiabilidad de la fuente", "ver"]],
      "Las cuatro «V» describen distintos retos del big data.",
    ),
    pick("check-limp", "Limpiar los datos", "¿Por qué hay que limpiar los datos antes de analizarlos?",
      "Porque los errores y los valores imposibles llevan a conclusiones equivocadas",
      [["Para que ocupen más", "No es el motivo."], ["Porque lo exige el sistema operativo", "No es el motivo."], ["No hace falta", "Sin limpieza el análisis no es fiable."]],
      "Basura entra, basura sale.",
    ),
  ],
};
