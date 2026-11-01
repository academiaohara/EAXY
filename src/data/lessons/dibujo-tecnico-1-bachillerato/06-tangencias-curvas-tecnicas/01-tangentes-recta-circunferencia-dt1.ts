import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const tangentesRectaCircunferenciaDt1Lesson: InteractiveLesson = {
  slug: "tangentes-recta-circunferencia-dt1",
  title: "1. Tangentes a una circunferencia",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tocar sin cortar", [
      { kind: "steps", items: [
        "Una recta es **tangente** a una circunferencia si tiene **un solo punto en común**, el **punto de tangencia** T.",
        "La tangente es **perpendicular al radio** en T: $OT \\perp t$.",
        "Desde un punto **exterior** P se pueden trazar **dos tangentes**, y **PT₁ = PT₂**. Desde un punto de la circunferencia, **una**; desde un punto interior, **ninguna**.",
        "La longitud de la tangente es $PT = \\sqrt{OP^2 - R^2}$ (Pitágoras).",
      ] },
    ], undefined, "stack"),

    slide("traza", "Tangentes desde un punto exterior", [], bench("tangentes-compas", [
      { title: "Circunferencia y punto", text: "Tienes una circunferencia de centro $O$ y radio $R$, y un punto $P$ **exterior**. Se buscan las rectas por $P$ que la tocan en un solo punto.", fact: "Dos tangentes desde P" },
      { title: "Punto medio de OP", text: "Halla el punto medio $M$ del segmento $OP$ (con su mediatriz).", fact: "M = punto medio de OP" },
      { title: "Circunferencia de diámetro OP", text: "Con centro en $M$ y radio $MO$, traza la circunferencia que pasa por $O$ y por $P$. Corta a la dada en **dos puntos**: $T_1$ y $T_2$.", fact: "Radio MO" },
      { title: "Une P con los puntos", text: "Une $P$ con $T_1$ y con $T_2$: son las dos tangentes." },
      { title: "Por qué funciona", text: "$T$ está en una circunferencia de diámetro $OP$, así que el ángulo $OTP$ es **recto**: $PT$ es perpendicular al radio $OT$, que es justo la condición de tangente.", fact: "Ángulo inscrito en semicircunferencia = 90°" },
    ]), "stack"),

    slide("otras", "Otras tangentes sencillas", [
      { kind: "steps", items: [
        "**Tangente en un punto T de la circunferencia**: perpendicular al radio OT por T.",
        "**Tangente paralela a una recta dada**: se traza el diámetro perpendicular a esa dirección; las tangentes por sus extremos son las pedidas (son dos).",
        "**Tangente que forma un ángulo dado con una recta**: se traza el radio con la dirección perpendicular y se levanta la tangente en su extremo.",
      ] },
    ], undefined, "stack"),

    benchTask("tangentes-construye", "Traza las tangentes desde P", "tangentes-practica", [
      { title: "Clava la punta en O", text: "Primero el punto medio de $OP$: toca $O$ para clavar la punta del compás." },
      { title: "Abre más de la mitad de OP", text: "Arrastra la mina hasta una abertura **mayor que la mitad** de $OP$ y pulsa «Fijar abertura».", fact: "Radio > OP / 2" },
      { title: "Arco desde O", text: "Traza el arco **por encima y por debajo** de $OP$." },
      { title: "Clava la punta en P", text: "Toca $P$ sin cambiar la abertura." },
      { title: "Arco desde P", text: "Traza el arco que corta al anterior en **dos puntos**." },
      { title: "Traza la mediatriz", text: "Toca los **dos puntos** donde se cortan los arcos: la recta pasa por el punto medio $M$ de $OP$." },
      { title: "Toma el radio MO", text: "Toca $M$ y después $O$: el compás queda con la abertura $MO$.", fact: "Abertura = MO" },
      { title: "Clava la punta en M", text: "Toca el punto medio $M$." },
      { title: "Circunferencia de diámetro OP", text: "Arrastra la mina para trazar el arco que **corte a la circunferencia dada** por encima y por debajo." },
      { title: "Marca T₁", text: "Toca el corte de **arriba**: es el primer punto de tangencia, $T_1$." },
      { title: "Marca T₂", text: "Toca el corte de **abajo**: es $T_2$." },
      { title: "Une P con los puntos", text: "La regla une sola $P$ con $T_1$ y con $T_2$: las dos tangentes.", fact: "PT₁ = PT₂" },
    ], {
      question: "Traza las dos tangentes a la circunferencia desde el punto exterior P con compás y regla.",
      hint: "Halla el punto medio M de OP con su mediatriz y traza la circunferencia de centro M que pasa por O y P: corta a la dada en los puntos de tangencia.",
      explanation: "Los puntos T están en la circunferencia de diámetro OP, así que OTP vale 90° y PT es perpendicular al radio OT: es tangente. Por simetría hay dos, y PT₁ = PT₂.",
    }),
  ],
};
