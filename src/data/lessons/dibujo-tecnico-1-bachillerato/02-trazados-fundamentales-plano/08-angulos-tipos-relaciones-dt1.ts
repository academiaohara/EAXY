import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { benchParte, slide } from "@/data/lessons/tec1-helpers";

export const angulosTiposRelacionesDt1Lesson: InteractiveLesson = {
  slug: "angulos-tipos-relaciones-dt1",
  title: "8. Ángulos: tipos y relaciones",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("tipos-clasif", "Clasificación de los ángulos", [], benchParte("angulos-tipos", 0, [
      { title: "Vértice y lados", text: "Un **ángulo** es la porción de plano comprendida entre dos semirrectas con el mismo origen. Las semirrectas son los **lados** ($a$ y $b$) y el origen, el **vértice** $V$. Se mide en **grados, minutos y segundos** sexagesimales: $1^\\circ = 60'$ y $1' = 60''$ (también existen los centesimales).", fact: "1° = 60′ ; 1′ = 60″" },
      { title: "Ángulo recto", text: "Un ángulo **recto** mide $90^\\circ$: sus lados son perpendiculares.", fact: "90°" },
      { title: "Ángulo agudo", text: "Un ángulo **agudo** mide **menos de $90^\\circ$**.", fact: "< 90°" },
      { title: "Ángulo obtuso", text: "Un ángulo **obtuso** mide **más de $90^\\circ$** y menos de $180^\\circ$.", fact: "> 90°" },
      { title: "Ángulo llano", text: "Un ángulo **llano** mide $180^\\circ$: sus lados forman una recta ($AOB$).", fact: "180°" },
    ]), "stack"),

    slide("tipos-compl", "Complementarios y suplementarios", [], benchParte("angulos-tipos", 5, [
      { title: "Complementarios", text: "Dos ángulos son **complementarios** si **suman $90^\\circ$**.", fact: "A + B = 90°" },
      { title: "Suplementarios", text: "Dos ángulos son **suplementarios** si **suman $180^\\circ$**.", fact: "A + B = 180°" },
    ]), "stack"),

    slide("tipos-pares", "Consecutivos, opuestos y adyacentes", [], benchParte("angulos-tipos", 7, [
      { title: "Consecutivos", text: "Dos ángulos son **consecutivos** si tienen el mismo vértice y **un lado común**.", fact: "Vértice y lado comunes" },
      { title: "Opuestos por el vértice", text: "Dos rectas que se cortan forman ángulos **opuestos por el vértice** $V$, que son **iguales**.", fact: "Opuestos = iguales" },
      { title: "Adyacentes", text: "Dos ángulos son **adyacentes** si son consecutivos y sus lados no comunes forman una recta: son **suplementarios** ($\\alpha + \\beta = 180^\\circ$).", fact: "α + β = 180°" },
    ]), "stack"),

    slide("tipos-sentido", "Sentido y ángulos iguales", [], benchParte("angulos-tipos", 10, [
      { title: "Sentido positivo y negativo", text: "Los ángulos se miden en sentido **positivo** (contrario a las agujas del reloj) o **negativo** (el de las agujas del reloj).", fact: "Positivo: antihorario" },
      { title: "Ángulos iguales", text: "Dos ángulos son **iguales** si tienen la misma amplitud, aunque estén en distinta posición. La **bisectriz** de un ángulo lo divide en dos ángulos iguales.", fact: "Misma amplitud" },
    ]), "stack"),

    slide("pc-convexo", "Cóncavo, convexo, interior y exterior", [], benchParte("angulos-circunferencia", 0, [
      { title: "Cóncavo y convexo", text: "Un polígono es **convexo** si todos sus ángulos interiores miden menos de $180^\\circ$, y **cóncavo** si alguno mide más.", fact: "Cóncavo: algún ángulo > 180°" },
      { title: "Interior y exterior", text: "En un polígono, $A$, $B$, $C$ y $D$ son los **ángulos interiores**; el ángulo $D'$, formado por un lado y la prolongación del siguiente, es un **ángulo exterior**.", fact: "Interiores y exteriores" },
    ]), "stack"),

    slide("pc-circ", "Ángulos en la circunferencia", [], benchParte("angulos-circunferencia", 2, [
      { title: "Ángulo central", text: "El ángulo **central** tiene su vértice en el **centro** de la circunferencia.", fact: "Vértice en el centro" },
      { title: "Ángulo inscrito", text: "El ángulo **inscrito** tiene su vértice **en la circunferencia** y sus lados la cortan.", fact: "Vértice en la circunferencia" },
      { title: "Ángulo semiinscrito", text: "El ángulo **semiinscrito** tiene el vértice en la circunferencia; un lado es **tangente** y el otro, una **cuerda**.", fact: "Un lado tangente" },
    ]), "stack"),

    slide("pc-secantes", "Ángulos interior y exterior a la circunferencia", [], benchParte("angulos-circunferencia", 5, [
      { title: "Ángulo interior", text: "El ángulo **interior** tiene su vértice en un punto interior de la circunferencia y sus lados son cuerdas.", fact: "Vértice dentro" },
      { title: "Ángulo exterior", text: "El ángulo **exterior** tiene su vértice fuera de la circunferencia y sus lados son secantes (o tangentes).", fact: "Vértice fuera" },
    ]), "stack"),
  ],
};
