import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const posicionesRectaDiedricoDt1Lesson: InteractiveLesson = {
  slug: "posiciones-recta-diedrico-dt1",
  title: "3. Posiciones particulares de la recta",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("perpendiculares", "Rectas perpendiculares a los planos de proyección", [
      { kind: "text", text: "Seis posiciones: tres perpendiculares al plano $H$ y tres perpendiculares al $V$. Todas tienen **una proyección perpendicular a la L.T.** y **la otra es un punto**, que puede estar bajo la L.T., en ella o sobre ella." },
      { kind: "steps", items: [
        "**Perpendicular al $H$ por delante del $V$** $a(a'-a'')$: $a'$ es un punto; tiene traza horizontal $H'$-$H''$ y su traza vertical es $N'$-$N''$ con $N'$ en $a'$.",
        "**Contenida en el $V$** $b$: $b'$ está en la L.T. y su traza horizontal es $H'$-$H''$.",
        "**Perpendicular al $H$ por detrás del $V$** $c$: $c'$ es un punto y la recta es toda **oculta**.",
        "Del mismo modo, las perpendiculares al $V$ ($d$, $e$, $f$) tienen la proyección vertical en un punto $d''$, $f''$ (o en la L.T., si están en el $H$) y su traza es $V'$-$V''$.",
      ] },
    ], undefined, "stack"),
    ...construccionPasos("recta-vertical"),
    slide("paralela-lt", "Recta paralela a la línea de tierra", [
      { kind: "text", text: "Una recta paralela a la L.T. tiene **sus dos proyecciones paralelas a la L.T.** No corta a ningún plano de proyección, así que **no tiene trazas**." },
    ], undefined, "stack"),
    ...construccionPasos("recta-paralela-lt"),
    slide("horizontal", "Recta paralela al plano horizontal", [
      { kind: "text", text: "La recta $r(r'-r'')$ está por **encima** del plano $H$: su **traza vertical** es $V'$-$V''$ y **no tiene traza horizontal**. Su proyección vertical $r''$ es **paralela a la L.T.** y $r'$ es cualquiera. Los puntos $M$ y $N$, intersección de la recta con el primer y el segundo bisector, se obtienen con las bisectrices de los diedros desde $V$." },
    ], undefined, "stack"),
    ...construccionPasos("recta-horizontal"),
    slide("frontal", "Recta paralela al plano vertical (frontal)", [
      { kind: "text", text: "La recta frontal es paralela al plano $V$: su **traza horizontal** es $H'$-$H''$ y **no tiene traza vertical**. Su proyección horizontal $r'$ es **paralela a la L.T.** y pasa del primer diedro al cuarto." },
    ], undefined, "stack"),
    ...construccionPasos("recta-frontal"),
    slide("oblicuas", "Rectas oblicuas que cortan a la L.T.", [
      { kind: "text", text: "Hay **cuatro posiciones**: pasan por **dos diedros** y tienen sus dos trazas en la L.T. Las hay que pasan del primer al tercer diedro, del segundo al cuarto y, las de **perfil**, perpendiculares a la L.T. con las dos proyecciones confundidas (hay que dar un punto $A'$-$A''$ de ella)." },
    ], undefined, "stack"),
    slide("perfil", "Rectas de perfil", [
      { kind: "text", text: "Están situadas en **planos de perfil**: sus dos proyecciones quedan confundidas sobre una misma perpendicular a la L.T., por lo que para definirlas hay que dar **dos puntos** o **sus trazas**." },
      { kind: "steps", items: [
        "**Perpendiculares a los bisectores** (seis posiciones): sus trazas $H'$ y $V''$ equidistan de la L.T.",
        "Las perpendiculares al **segundo bisector** tienen las trazas coincidentes ($H'$ y $V''$ juntas) y solo es oculta la parte comprendida entre ellas.",
        "**No perpendiculares a los bisectores**: con las dos proyecciones sobre la misma perpendicular, la tercera proyección (de perfil) las determina.",
      ] },
    ], undefined, "stack"),
  ],
};
