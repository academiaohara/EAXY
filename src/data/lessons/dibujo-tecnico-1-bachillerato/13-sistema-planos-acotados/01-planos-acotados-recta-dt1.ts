import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const planosAcotadosRectaDt1Lesson: InteractiveLesson = {
  slug: "planos-acotados-recta-dt1",
  title: "1. Sistema de planos acotados: punto y recta",
  subtitle: DT1_SUBTITLES[13],
  stage: { theme: "board" },
  steps: [
    slide("uso", "Para qué sirve el sistema", [
      { kind: "text", text: "El sistema de planos acotados se emplea con preferencia en **topografía** y en **dibujo topográfico**: trazado de caminos y canales, cálculo de **terraplenes y desmontes**, fortificaciones, cartas marinas, levantamiento de planos, instalación de industrias o de motores hidráulicos, y en general la representación de terrenos." },
      { kind: "text", text: "Se apoya en el dibujo topográfico: en dibujo las unidades son **centímetros** y en topografía cada unidad equivale a **un metro**." },
    ], undefined, "stack"),
    slide("punto", "Representación del punto", [
      { kind: "definition", text: "El sistema está formado por **un solo plano horizontal**, llamado **plano de proyección**, del cuadro, de horizonte, de comparación o de referencia. Sobre él se halla la **proyección ortogonal** del elemento, **acotando** cada punto." },
      { kind: "steps", items: [
        "Un punto puede estar **encima** del plano, **contenido en él** o **por debajo**. Si $A$ está 5 unidades por encima, su proyección es $A'$ y se escribe entre paréntesis su **cota**: $A'(5)$.",
        "Los puntos de **cota cero** están en el plano de referencia: $B'(0)$. Si la cota es **negativa**, el punto está por debajo: $C'(-4)$.",
        "El sistema es **reversible**: conocido $A'(5)$ se halla $A$ trazando por $A'$ la perpendicular al plano y llevando sobre ella 5 unidades hacia arriba.",
      ] },
    ], undefined, "stack"),
    slide("cota", "Cota, desnivel y altitud", [
      { kind: "steps", items: [
        "La **cota** de un punto es el número que mide la longitud del **segmento proyectante**, el que une el punto con su proyección sobre el plano.",
        "El **desnivel** entre dos puntos, o diferencia de altitud, es la **diferencia algebraica** de sus cotas: entre $P(8)$ y $Q(-3)$ es 11.",
        "Si el plano de proyección es el **nivel del mar**, las cotas positivas se llaman **altitudes** y las negativas **profundidades** o **sondas**. En España el origen de altitudes es el nivel del mar en Alicante.",
        "Para que todas las cotas sean positivas basta tomar el plano de comparación suficientemente bajo.",
      ] },
    ], undefined, "stack"),
    slide("recta", "Representación de la recta", [
      { kind: "text", text: "La recta queda definida por las proyecciones de dos de sus puntos, debidamente acotados. Su proyección $r'$ es la recta que une, por ejemplo, $B'(2)$ y $A'(5,5)$." },
      { kind: "rule", title: "Pendiente de una recta", text: "Es la **tangente del ángulo** que forma la recta con el plano del cuadro: $p = \\tan\\alpha = \\dfrac{d}{r'} = \\dfrac{D}{100}$, siendo $d$ el desnivel, $r'$ la distancia entre las proyecciones y $D$ el desnivel cuando $r'$ vale 100 unidades. Una pendiente del 14 % indica que con 100 unidades de distancia el desnivel es de 14." },
    ], undefined, "stack"),
    slide("traza-modulo", "Traza, intervalo y graduación", [
      { kind: "steps", items: [
        "**Traza de una recta**: el punto donde corta al plano del cuadro; tiene **cota cero**.",
        "**Módulo o intervalo** $i$: longitud de la proyección de un segmento de la recta cuyos extremos tienen un desnivel igual a la **unidad**.",
        "**Graduar una recta** es dividirla en tantas partes iguales como unidades valga la diferencia de cotas, y numerar las divisiones.",
        "La pendiente es la **inversa del intervalo**: $p = \\dfrac{1}{i}$. Si el intervalo es $3/2$, la pendiente es $2/3$.",
      ] },
    ], undefined, "stack"),
    ...construccionPasos("acotados-graduar"),
  ],
};
