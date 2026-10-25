import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const representacionDatosBinarioLesson: InteractiveLesson = {
  slug: "representacion-datos-binario",
  title: "3. Representación y tratamiento de datos",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("bits", "Bits, bytes y múltiplos", [
      { kind: "definition", text: "Un **bit** es la unidad mínima de información: un 0 o un 1 (un interruptor apagado o encendido). Un **byte** son 8 bits y permite $2^8 = 256$ combinaciones." },
      { kind: "facts", items: [
        { tex: "1\\ \\text{B} = 8\\ \\text{bits}" },
        { tex: "1\\ \\text{KB} = 1\\,024\\ \\text{B}" },
        { tex: "1\\ \\text{MB} = 1\\,024\\ \\text{KB}" },
        { tex: "1\\ \\text{GB} = 1\\,024\\ \\text{MB}" },
      ] },
      { kind: "text", text: "Con $n$ bits se pueden representar $2^n$ valores distintos. Las unidades con prefijo del SI (kB = 1 000 B) y las binarias (KiB = 1 024 B) conviven: los fabricantes de discos usan las primeras." },
    ], undefined, "stack"),
    slide("binario", "El sistema binario", [
      { kind: "text", text: "En binario cada posición vale una potencia de 2, igual que en decimal vale una potencia de 10. Activa los bits y mira la suma." },
      { kind: "example", title: "10110₂ a decimal", lines: [
        { math: "1\\cdot 2^4 + 0\\cdot 2^3 + 1\\cdot 2^2 + 1\\cdot 2^1 + 0\\cdot 2^0" },
        { math: "= 16 + 0 + 4 + 2 + 0 = 22" },
      ] },
    ], tool("binario-byte-explorador", { a: 45 }), "split"),
    slide("conversion", "De decimal a binario", [
      { kind: "text", text: "Se divide entre 2 una y otra vez y se leen los restos de abajo arriba. Compruébalo con la animación y con la herramienta." },
    ], anim("conversion-bases"), "split"),
    slide("conv-tool", "Practica la conversión", [
      { kind: "text", text: "Cambia el número decimal y observa las divisiones sucesivas." },
    ], tool("conversion-decimal-binario-explorador", { a: 45 }), "visual-top"),
    slide("texto", "Texto: cada carácter es un número", [
      { kind: "text", text: "Los caracteres se codifican con tablas: **ASCII** (128 caracteres) y **Unicode/UTF-8** (todos los idiomas y emojis). Escribe un texto y observa cuántos bytes ocupa." },
    ], tool("texto-binario-explorador"), "visual-top"),
    slide("imagen", "Imágenes y sonido", [
      { kind: "steps", items: [
        "**Imagen**: una cuadrícula de **píxeles**; cada píxel guarda su color con una **profundidad** de color (1 bit = B/N, 24 bits = color real).",
        "**Audio**: se **muestrea** la señal muchas veces por segundo (44 100 veces en un CD) y cada muestra se guarda con 16 bits.",
        "**Compresión**: sin pérdida (ZIP, PNG) o con pérdida (JPEG, MP3), que descarta detalles poco perceptibles.",
      ] },
      { kind: "text", text: "Calcula el tamaño de un archivo multiplicando los datos que guarda y compara con la compresión." },
    ], tool("tamano-archivo-explorador", { n: 0 }), "split"),
    calc("calc-bin", "De decimal a binario", "Escribe $13$ en binario (solo los dígitos).",
      nums(1101), "$13 = 8 + 4 + 1 = 1\\cdot 2^3 + 1\\cdot 2^2 + 0\\cdot 2^1 + 1\\cdot 2^0 = 1101_2$.", "Divide entre 2 y anota los restos de abajo arriba."),
    calc("calc-dec", "De binario a decimal", "¿Cuál es el valor decimal de $1011_2$?",
      nums(11), "$8 + 0 + 2 + 1 = 11$.", "Suma las potencias de 2 de los bits a 1."),
    calc("calc-valores", "Combinaciones", "¿Cuántos valores distintos se pueden representar con $10$ bits?",
      nums(1024), "$2^{10} = 1\\,024$.", "2 elevado al número de bits."),
    calc("calc-img", "Tamaño de una imagen", "Una imagen de $800\\times 600$ píxeles con $24$ bits por píxel, sin comprimir, ¿cuántos bytes ocupa?",
      nums(1440000), "$800\\cdot 600\\cdot 24/8 = 1\\,440\\,000$ bytes (unos 1,4 MB).", "Bits totales ÷ 8."),
    sort("clasifica-dato", "¿Cómo se representa?", "Asocia cada dato con la forma en que se guarda.",
      [["car", "Código de carácter (ASCII / UTF-8)", "cobalt"], ["pix", "Píxeles y profundidad de color", "amber"], ["mue", "Muestras de una señal", "emerald"]],
      [["La letra «A»", "car"], ["Un emoji", "car"], ["Una fotografía", "pix"], ["Un icono de 16×16", "pix"], ["Una canción", "mue"], ["Una nota de voz", "mue"]],
      "Los textos usan tablas de códigos; las imágenes, píxeles; el sonido, muestras tomadas muchas veces por segundo.",
    ),
    pick("check-bits", "Más bits", "Si en vez de 8 bits por canal se usan 10 bits, ¿cuántas veces más tonos distintos se pueden representar?",
      "4 veces más, porque 2¹⁰/2⁸ = 2² = 4",
      [["2 veces más", "Cada bit adicional duplica; con 2 bits más es ×4."], ["Solo un 25 % más", "El crecimiento es exponencial, no lineal."], ["Los mismos", "Más bits permiten más combinaciones."]],
      "Cada bit adicional duplica el número de valores: dos bits más multiplican por 4.",
    ),
  ],
};
