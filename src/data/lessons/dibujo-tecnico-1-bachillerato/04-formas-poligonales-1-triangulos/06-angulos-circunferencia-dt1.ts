import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { benchParte, slide } from "@/data/lessons/tec1-helpers";

export const angulosCircunferenciaDt1Lesson: InteractiveLesson = {
  slug: "angulos-circunferencia-dt1",
  title: "6. Ángulos relacionados con la circunferencia",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("en-la-circunferencia", "Ángulo central, inscrito y semiinscrito", [], benchParte("angulos-circunferencia", 2, [
      { title: "Ángulo central", text: "Un ángulo está **relacionado con una circunferencia** cuando sus lados la cortan o son tangentes a ella. El ángulo **central** tiene el vértice en el centro: su medida, en grados, es **el valor del arco** que abarcan sus lados. Por ejemplo, un ángulo central $A = 45^\\circ$ abarca un arco de $45^\\circ$.", fact: "Central = arco" },
      { title: "Ángulo inscrito", text: "El **inscrito** tiene el vértice en la circunferencia y sus lados son dos cuerdas. Vale **la mitad del arco** que abarcan sus extremos, es decir, la mitad del ángulo central correspondiente. Si un lado es un diámetro, el triángulo $NOV$ es isósceles y $\\hat A = \\alpha + \\beta = 2\\alpha$, luego $\\alpha = \\hat A/2$. Con dos cuerdas cualesquiera se razona igual.", fact: "α = ½ · arco" },
      { title: "Ángulo semiinscrito", text: "El **semiinscrito** tiene los lados formados por una cuerda y una tangente. Vale **la mitad del ángulo central** que abarcan los extremos: si por el centro $O$ se trazan las perpendiculares a los lados, resulta $\\hat A = \\widehat{VON}/2$.", fact: "A = arco VN / 2" },
    ]), "stack"),

    slide("interior", "Ángulo interior", [], benchParte("angulos-circunferencia", 5, [
      { title: "Ángulo interior", text: "El **ángulo interior** tiene el vértice en un punto interior de la circunferencia. Vale **la semisuma** de los ángulos centrales abarcados por sus lados y por sus prolongaciones. Como $\\alpha + \\beta + \\gamma = 180^\\circ$ y $\\alpha + \\beta = 180^\\circ - \\gamma$, resulta $\\hat A = \\alpha + \\beta$ y $\\hat A = \\dfrac{\\widehat{NOM} + \\widehat{POQ}}{2}$.", fact: "A = (arco NM + arco PQ) / 2" },
    ]), "stack"),

    slide("exterior", "Ángulo exterior y circunscrito", [], benchParte("angulos-circunferencia", 6, [
      { title: "Ángulo exterior", text: "El **ángulo exterior** lo forman dos secantes que se cortan en un punto exterior. Vale **la semidiferencia** de los ángulos centrales que abarcan sus lados: $\\hat\\beta = \\hat A + \\hat\\alpha$, luego $\\hat A = \\hat\\beta - \\hat\\alpha$ y $\\hat A = \\dfrac{\\widehat{NOM} - \\widehat{POQ}}{2}$.", fact: "A = (arco mayor − arco menor) / 2" },
      { title: "Tangente y secante", text: "Si uno de los lados es **tangente** y el otro **secante**, el ángulo exterior también vale la semidiferencia de los arcos que abarcan sus lados.", fact: "Misma semidiferencia" },
      { title: "Ángulo circunscrito", text: "El **ángulo circunscrito** lo forman **dos tangentes** a la circunferencia. Su valor es la **semidiferencia** de los ángulos centrales abarcados: $\\hat A = \\dfrac{\\widehat{MBN} - \\widehat{NCM}}{2}$.", fact: "A = (δ − γ) / 2" },
    ]), "stack"),
  ],
};
