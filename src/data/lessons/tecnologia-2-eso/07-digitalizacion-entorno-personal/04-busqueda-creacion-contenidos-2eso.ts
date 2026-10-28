import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const busquedaCreacionContenidos2esoLesson: InteractiveLesson = {
  slug: "busqueda-creacion-contenidos-2eso",
  title: "4. Buscar, crear y compartir contenidos digitales",
  subtitle: TECESO2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("busca", "Buscar mejor", [
      { kind: "text", text: "Los operadores de búsqueda (comillas, menos, OR, filetype) afinan los resultados." },
    ], tool("busqueda-operadores-explorador"), "visual-top"),
    slide("fiable", "¿Es fiable la fuente?", [
      { kind: "text", text: "Antes de usar una información, comprueba quién la escribe, cuándo y con qué datos." },
    ], tool("fuente-fiable-explorador"), "visual-top"),
    slide("formatos", "Formatos y tamaño de los archivos", [
      { kind: "steps", items: [
        "**Imagen**: **JPEG** (fotos, con pérdida), **PNG** (gráficos, sin pérdida, permite transparencia), **SVG** (vectorial).",
        "**Audio**: **MP3** (con pérdida), **WAV** (sin comprimir).",
        "**Vídeo**: **MP4** es el más extendido.",
        "Elegir el formato adecuado equilibra **calidad** y **tamaño**.",
      ] },
      { kind: "text", text: "Cambia las dimensiones y el formato de una imagen y mira cuánto ocupa." },
    ], tool("eso2-formato-imagen-explorador"), "visual-top"),
    slide("licencias", "Usar y compartir con permiso", [
      { kind: "text", text: "Las licencias Creative Commons indican qué se puede hacer con una obra. Compruébalo." },
    ], tool("licencias-cc-explorador"), "visual-top"),
    calc("calc-bmp", "Imagen sin comprimir", "Una imagen de 1 000 × 1 000 píxeles se guarda sin comprimir con 3 bytes por píxel. ¿Cuántos MB ocupa? (1 MB = 1 000 000 bytes)", nums(3), "1 000 · 1 000 · 3 = 3 000 000 bytes = 3 MB.", "Píxeles por 3 bytes."),
    calc("calc-jpeg", "Imagen comprimida", "Un JPEG ocupa aproximadamente el 10 % de la imagen sin comprimir. Si la original son 3 MB, ¿cuántos MB ocupa el JPEG?", nums(0.3), "3 · 0,10 = 0,3 MB.", "Aplica el 10 %."),
    sort("clasifica-perdida", "Con o sin pérdida", "Clasifica cada formato.",
      [["con", "Con pérdida de calidad", "rose"], ["sin", "Sin pérdida", "emerald"]],
      [["JPEG", "con"], ["MP3", "con"], ["MP4", "con"], ["PNG", "sin"], ["FLAC", "sin"], ["ZIP (compresión de archivos)", "sin"]],
      "Los formatos con pérdida descartan detalles poco perceptibles para reducir el tamaño; los otros recuperan el original exacto.",
    ),
    pick("check-png", "Un logotipo", "Quieres guardar un logotipo con fondo transparente y bordes nítidos. ¿Qué formato conviene?",
      "PNG (o SVG)",
      [["JPEG", "No admite transparencia y degrada los bordes."], ["MP3", "Es un formato de audio."], ["WAV", "Es un formato de audio."]],
      "PNG conserva la nitidez y permite transparencia; SVG, además, se puede ampliar sin pixelarse.",
    ),
  ],
};
