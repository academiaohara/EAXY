import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide } from "@/data/lessons/tec1-helpers";

export const puntoDiedricoCuadrantesDt1Lesson: InteractiveLesson = {
  slug: "punto-diedrico-cuadrantes-dt1",
  title: "1. Fundamentos, notación y representación del punto",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("fundamentos", "Fundamentos del sistema diédrico", [
      { kind: "definition", text: "El **sistema diédrico** es un sistema de proyecciones **cilíndricas ortogonales**. Lo forman **dos planos perpendiculares** sobre los que se proyecta el cuerpo que se quiere representar." },
      { kind: "steps", items: [
        "Un plano es el **horizontal** (**PH** o $H$), paralelo a la dirección de la plomada. El otro es el **vertical** (**PV** o $V$).",
        "Su intersección es la **línea de tierra** (**L.T.**), que se dibuja con dos trazos gruesos, uno por debajo de ella en cada extremo.",
        "Los planos se consideran **ilimitados** y **opacos**.",
        "La proyección sobre el PH es la **planta** o proyección horizontal; la proyección sobre el PV es el **alzado** o proyección vertical.",
      ] },
    ], undefined, "stack"),
    slide("diedros", "Los cuatro diedros", [
      { kind: "text", text: "Los planos horizontal y vertical dividen el espacio en **cuatro diedros rectos**, de 90°, numerados en el sentido que indica la vista de perfil: **primero, segundo, tercero y cuarto**." },
      { kind: "steps", items: [
        "Cada plano queda dividido por la L.T. en dos semiplanos: **horizontal anterior** y **posterior**, **vertical superior** e **inferior**.",
        "El **primer diedro** es el que queda delante del PV y encima del PH.",
        "Los **planos bisectores** dividen los diedros en **ocho octantes** de 45°. El **primer bisector** pasa por el primer y el tercer diedro; el **segundo bisector**, por el segundo y el cuarto.",
      ] },
    ], undefined, "stack"),
    slide("punto-reversible", "Un punto tiene dos proyecciones", [
      { kind: "text", text: "Un punto $A$ del espacio se proyecta ortogonalmente sobre el PH en $A'$ y sobre el PV en $A''$. Si se conocen $A'$ y $A''$, el punto está donde se cortan las perpendiculares a cada plano trazadas por ellas." },
      { kind: "rule", title: "Reversibilidad", text: "Un punto tiene **solo dos proyecciones** y estas solo pueden serlo de un punto: la posición del elemento proyectado queda determinada. Es la propiedad fundamental de todo sistema de representación." },
    ], undefined, "stack"),
    slide("abatimiento", "El abatimiento del plano vertical", [
      { kind: "text", text: "Para dibujar sobre el papel se **abate** el plano $V$ alrededor de la L.T. hasta hacerlo coincidir con el $H$, girando en el sentido **contrario a las agujas del reloj**. El semiplano vertical superior coincide con el horizontal posterior, y el vertical inferior con el horizontal anterior." },
      { kind: "rule", title: "Propiedad fundamental", text: "Tras el abatimiento, $A'$ y $A''$ quedan en la **misma perpendicular a la L.T.**: la **línea de referencia**. Dos proyecciones que no estén en una misma perpendicular no pueden ser las de un punto del espacio." },
    ], anim("dt1-abatimiento-diedrico"), "visual-top"),
    slide("notacion", "Notación", [
      { kind: "steps", items: [
        "La **línea de tierra** se representa con línea llena y fina, y con dos trazos en sus extremos.",
        "Los **puntos** se designan con **letras mayúsculas**: $A(A'-A'')$, siendo $A'$ la proyección horizontal y $A''$ la vertical. También pueden nombrarse con números.",
        "Las **rectas** llevan letras minúsculas: $r(r'-r'')$.",
        "Los **planos** se nombran con letras griegas: $\\alpha(\\alpha_1-\\alpha_2)$, con trazas horizontal y vertical.",
      ] },
    ], undefined, "stack"),
    slide("cota-alejamiento", "Cota y alejamiento", [
      { kind: "steps", items: [
        "La **cota** de un punto es su distancia al plano $H$; en la épura, la distancia de $A''$ a la L.T. Es **positiva** por encima del PH (primero y segundo diedro) y **negativa** en el tercero y el cuarto.",
        "El **alejamiento** es su distancia al plano $V$; en la épura, la distancia de $A'$ a la L.T. Es **positivo** en el primero y el cuarto diedro y **negativo** en el segundo y el tercero.",
        "La **línea de referencia** es la recta que une las dos proyecciones y es perpendicular a la L.T.; se dibuja fina y continua, y a medida que avanza la complejidad solo se dibuja en sus extremos.",
      ] },
    ], undefined, "stack"),
    ...construccionPasos("punto-primer-diedro", "punto-segundo-diedro", "punto-tercer-diedro", "punto-cuarto-diedro"),
    slide("puntos-especiales", "Puntos en los planos de proyección y en los bisectores", [
      { kind: "steps", items: [
        "**En el PH anterior:** cota nula; la proyección vertical está en la L.T. y la horizontal coincide con el punto.",
        "**En el PV superior:** alejamiento nulo; la proyección horizontal está en la L.T.",
        "**En la L.T.:** las dos proyecciones coinciden con el punto, sobre la L.T.",
        "**Primer bisector:** cota y alejamiento **iguales**; las proyecciones equidistan de la L.T. y están a distinto lado.",
        "**Segundo bisector:** cota y alejamiento iguales **en valor** y de signo contrario: las proyecciones **coinciden** (y están a un mismo lado de la L.T.).",
      ] },
      { kind: "rule", title: "Resumen", text: "Primer diedro: horizontal debajo y vertical encima. Segundo y cuarto: las dos del mismo lado. Tercero: horizontal encima y vertical debajo." },
    ], undefined, "stack"),
    ...construccionPasos("punto-primer-octante", "punto-segundo-octante", "punto-tercer-octante", "punto-cuarto-octante"),
    ...construccionPasos("punto-plano-horizontal", "punto-plano-vertical", "punto-primer-bisector", "punto-segundo-bisector"),
  ],
};
