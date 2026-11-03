import { arc, fl, lin, poli, pt, seg, txt, type Diagrama, type Item, type Pt } from "./engine";

/* Épura: la línea de tierra (LT) es horizontal; la cota sube (y menor) y el alejamiento baja (y mayor). */
const Y0 = 215;
const lt = (x0 = 40, x1 = 760): Item[] => [
  seg([x0, Y0], [x1, Y0], "blanco", false, 3.5), seg([x0, Y0 + 9], [x0 + 22, Y0 + 9], "blanco", false, 3.5), seg([x1 - 22, Y0 + 9], [x1, Y0 + 9], "blanco", false, 3.5), txt([x1 - 8, Y0 - 12], "L.T.", "gris", 19, "end"),
];
/** Proyecciones de un punto con alejamiento `al` (baja) y cota `co` (sube) en la vertical `x`. */
const pH = (x: number, al: number): Pt => [x, Y0 + al];
const pV = (x: number, co: number): Pt => [x, Y0 - co];
const ref = (x: number, al: number, co: number): Item => seg(pH(x, al), pV(x, co), "gris", true, 1.8);
const punto = (x: number, al: number, co: number, n: string, c: "azul" | "naranja" | "verde" | "amarillo" = "azul"): Item[] => [
  ref(x, al, co), pt(pH(x, al), `${n}′`, c, 12, 22), pt(pV(x, co), `${n}″`, c, 12, -8),
];

/* Perspectiva de los dos planos: PV (vertical, detrás) y PH (horizontal, hacia nosotros). */
const PV: Pt[] = [[250, 50], [550, 50], [550, 215], [250, 215]];
const PH: Pt[] = [[250, 215], [550, 215], [670, 330], [370, 330]];
const planos = (): Item[] => [poli(PV, "azul", 0.14), poli(PH, "naranja", 0.14), seg([250, 215], [550, 215], "blanco", false, 4), txt([600, 205], "L.T.", "blanco", 20, "start"), txt([300, 80], "PV", "azul", 22), txt([600, 320], "PH", "naranja", 22)];

const fundamentos = (): Diagrama => ({
  label: "Sistema diédrico: dos planos perpendiculares y la línea de tierra",
  pasos: [
    { texto: "Dos planos **perpendiculares**: el **vertical** (PV) y el **horizontal** (PH), ilimitados y opacos.", items: [poli(PV, "azul", 0.14), poli(PH, "naranja", 0.14), txt([300, 80], "PV", "azul", 22), txt([600, 320], "PH", "naranja", 22)] },
    { texto: "Su intersección es la **línea de tierra** (L.T.), que se dibuja con dos trazos gruesos en los extremos.", items: [seg([250, 215], [550, 215], "blanco", false, 4.5), txt([600, 205], "L.T.", "blanco", 20, "start")] },
    { texto: "La proyección sobre el PH es la **planta** (proyección horizontal) y sobre el PV el **alzado** (proyección vertical).", items: [
      pt([420, 290], "A′ planta", "naranja", 12, 20), pt([420, 110], "A″ alzado", "azul", 12, -8), pt([420, 150], "A", "verde", 12, 6), seg([420, 150], [420, 290], "verde", true), seg([420, 150], [420, 110], "verde", true),
    ] },
  ],
});

const diedros = (): Diagrama => {
  const C: Pt = [400, 215];
  return {
    label: "Los cuatro diedros y los planos bisectores, vistos de perfil",
    pasos: [
      { texto: "Vistos de perfil, los planos son dos rectas perpendiculares que dividen el espacio en **cuatro diedros rectos**.", items: [
        seg([400, 40], [400, 390], "azul", false, 4), seg([130, 215], [670, 215], "naranja", false, 4), txt([414, 52], "PV", "azul", 21, "start"), txt([664, 238], "PH", "naranja", 21, "end"),
      ] },
      { texto: "Se numeran **1.º, 2.º, 3.º y 4.º**: el primero es el que queda **delante del PV y encima del PH**.", items: [
        txt([560, 130], "1.er diedro", "verde", 24), txt([240, 130], "2.º diedro", "gris", 24), txt([240, 320], "3.er diedro", "gris", 24), txt([560, 320], "4.º diedro", "gris", 24),
      ] },
      { texto: "Los **planos bisectores** dividen cada diedro en dos octantes de 45°: el **primer bisector** pasa por el 1.º y el 3.º diedro; el **segundo**, por el 2.º y el 4.º.", items: [
        seg([225, 390], [575, 40], "amarillo", true, 2.4), seg([225, 40], [575, 390], "morado", true, 2.4), txt([585, 50], "1.er bisector", "amarillo", 18, "start"), txt([215, 50], "2.º bisector", "morado", 18, "end"),
      ] },
    ],
  };
};

const reversible = (): Diagrama => {
  const A: Pt = [480, 200];
  const Av: Pt = [420, 143];
  const Ah: Pt = [480, 285];
  return {
    label: "Un punto del espacio y sus dos proyecciones: reversibilidad",
    pasos: [
      { texto: "Un punto $A$ del primer diedro, delante del PV y encima del PH.", items: [...planos(), pt(A, "A", "verde", 14, -6)] },
      { texto: "Se proyecta ortogonalmente sobre el **PH** en $A'$ y sobre el **PV** en $A''$.", items: [
        seg(A, Ah, "verde", true), pt(Ah, "A′", "naranja", 14, 20), seg(A, Av, "verde", true), pt(Av, "A″", "azul", -34, -4),
      ] },
      { texto: "Conocidas $A'$ y $A''$, las **perpendiculares** a cada plano por ellas se cortan en $A$: un punto tiene solo **dos proyecciones** y estas solo pueden serlo de un punto.", items: [
        txt([400, 385], "reversible: dos proyecciones definen el punto", "amarillo", 22),
      ] },
    ],
  };
};

const notacion = (): Diagrama => ({
  label: "Notación de puntos, rectas y planos en diédrico",
  pasos: [
    { texto: "Los **puntos** con mayúsculas: $A(A'\\text{-}A'')$, siendo $A'$ la proyección **horizontal** y $A''$ la **vertical**.", items: [...lt(), ...punto(180, 70, 90, "A")] },
    { texto: "Las **rectas** con minúsculas: $r(r'\\text{-}r'')$, con sus proyecciones horizontal y vertical.", items: [
      lin([[330, Y0 + 100], [480, Y0 + 40]], "naranja", false, 3.5), lin([[330, Y0 - 100], [480, Y0 - 40]], "azul", false, 3.5), txt([505, Y0 + 40], "r′", "naranja", 22), txt([505, Y0 - 40], "r″", "azul", 22),
    ] },
    { texto: "Los **planos** con letras griegas: $\\alpha(\\alpha_1\\text{-}\\alpha_2)$, con sus trazas horizontal y vertical.", items: [
      pt([620, Y0], "N", "blanco", -6, 24), lin([[620, Y0], [720, Y0 + 90]], "naranja", false, 3.5), lin([[620, Y0], [730, Y0 - 100]], "azul", false, 3.5), txt([740, Y0 + 100], "α₁", "naranja", 22), txt([745, Y0 - 100], "α₂", "azul", 22),
    ] },
  ],
});

const cotaAlej = (): Diagrama => ({
  label: "Cota y alejamiento de un punto",
  pasos: [
    { texto: "La **cota** es la distancia del punto al plano horizontal: en la épura, la distancia de $A''$ a la L.T.", items: [
      ...lt(), ref(400, 90, 100), pt(pV(400, 100), "A″", "azul", 12, -8), seg(pV(400, 100), [400, Y0], "azul", false, 4), txt([430, 165], "cota", "azul", 21, "start"),
    ] },
    { texto: "El **alejamiento** es la distancia al plano vertical: la distancia de $A'$ a la L.T.", items: [
      pt(pH(400, 90), "A′", "naranja", 12, 22), seg([400, Y0], pH(400, 90), "naranja", false, 4), txt([430, 270], "alejamiento", "naranja", 21, "start"),
    ] },
    { texto: "Signos: cota **+** sobre la L.T., **−** bajo ella; alejamiento **+** bajo la L.T., **−** sobre ella. $A'$ y $A''$ están en la misma **línea de referencia**.", items: [
      txt([640, 150], "cota + ↑", "azul", 20), txt([640, 290], "alej. + ↓", "naranja", 20), seg([400, 120], [400, 305], "gris", true),
    ] },
  ],
});

const especiales = (): Diagrama => ({
  label: "Puntos en los planos de proyección, en la L.T. y en los bisectores",
  pasos: [
    { texto: "Punto del **PH anterior**: cota 0, su proyección vertical está en la L.T.", items: [...lt(), pt(pH(130, 70), "A′", "naranja", 12, 22), pt([130, Y0], "A″", "azul", 12, -10), seg([130, Y0], pH(130, 70), "gris", true)] },
    { texto: "Punto del **PV superior**: alejamiento 0, su proyección horizontal está en la L.T.", items: [pt(pV(280, 70), "E″", "azul", 12, -8), pt([280, Y0], "E′", "naranja", 12, 22), seg([280, Y0], pV(280, 70), "gris", true)] },
    { texto: "Punto de la **L.T.**: las dos proyecciones coinciden con el punto.", items: [pt([430, Y0], "R′=R″", "verde", 12, -12)] },
    { texto: "**Primer bisector**: proyecciones a la misma distancia de la L.T. y a distinto lado. **Segundo bisector**: proyecciones **coincidentes**.", items: [
      ...punto(560, 60, 60, "C", "amarillo"), pt([680, Y0 - 60], "G′=G″", "morado", -30, -12), seg([680, Y0 - 60], [680, Y0], "gris", true),
    ] },
  ],
});

const recta = (): Diagrama => {
  const a1 = pH(250, 40);
  const a2 = pV(250, 100);
  const b1 = pH(500, 110);
  const b2 = pV(500, 30);
  return {
    label: "Proyecciones de una recta definida por dos puntos",
    pasos: [
      { texto: "Dos puntos $A$ y $B$ definen una recta, y cada uno tiene sus dos proyecciones.", items: [...lt(), ...punto(250, 40, 100, "A"), ...punto(500, 110, 30, "B")] },
      { texto: "La proyección horizontal $r'$ une $A'$ con $B'$.", items: [seg(a1, b1, "naranja", false, 3.5), txt([600, 232], "r′", "naranja", 22)] },
      { texto: "La proyección vertical $r''$ une $A''$ con $B''$. Las dos proyecciones definen la recta.", items: [seg(a2, b2, "azul", false, 3.5), txt([600, 155], "r″", "azul", 22)] },
    ],
  };
};

const trazas = (): Diagrama => {
  const a1 = pH(300, 40);
  const a2 = pV(300, 110);
  const b1 = pH(480, 110);
  const b2 = pV(480, 30);
  const k2 = (b2[1] - a2[1]) / (b2[0] - a2[0]);
  const hx = a2[0] + (Y0 - a2[1]) / k2;
  const k1 = (b1[1] - a1[1]) / (b1[0] - a1[0]);
  const vx = a1[0] + (Y0 - a1[1]) / k1;
  const H1: Pt = [hx, a1[1] + k1 * (hx - a1[0])];
  const V2: Pt = [vx, a2[1] + k2 * (vx - a2[0])];
  return {
    label: "Trazas de una recta con los planos de proyección",
    pasos: [
      { texto: "Las **trazas** son los puntos donde la recta corta a los planos de proyección.", items: [...lt(), seg(a1, b1, "naranja", false, 3), seg(a2, b2, "azul", false, 3), txt([560, 232], "r′", "naranja", 21), txt([560, 160], "r″", "azul", 21)] },
      { texto: "La **traza horizontal** $H$ (en el PH): $r''$ prolongada corta la L.T. en $H''$, y por la referencia se baja a $H'$ en $r'$.", items: [
        seg(b2, [hx, Y0], "azul", true, 2), pt([hx, Y0], "H″", "azul", 8, -12), seg([hx, Y0], H1, "gris", true), pt(H1, "H′", "naranja", 12, 22),
      ] },
      { texto: "La **traza vertical** $V$ (en el PV): $r'$ prolongada corta la L.T. en $V'$, y por la referencia se sube a $V''$ en $r''$.", items: [
        seg(a1, [vx, Y0], "naranja", true, 2), pt([vx, Y0], "V′", "naranja", -26, 22), seg([vx, Y0], V2, "gris", true), pt(V2, "V″", "azul", -34, -6),
      ] },
    ],
  };
};

const vistas = (): Diagrama => {
  const x = [100, 700];
  return {
    label: "Partes vistas y ocultas de una recta: solo el primer diedro se ve",
    pasos: [
      { texto: "Una recta puede pasar por **hasta tres diedros**. Aquí cruza los planos de proyección.", items: [...lt(), seg([x[0]!, Y0 + 120], [x[1]!, Y0 - 120], "gris", true, 2)] },
      { texto: "Solo se considera **vista** la parte del **primer diedro**: se dibuja con línea continua.", items: [seg([330, Y0 + 28], [510, Y0 - 28], "verde", false, 5)] },
      { texto: "El resto es **oculta** y se dibuja a **trazos**.", items: [seg([x[0]!, Y0 + 120], [330, Y0 + 28], "rojo", true, 3.4), seg([510, Y0 - 28], [x[1]!, Y0 - 120], "rojo", true, 3.4)] },
    ],
  };
};

const cortan = (): Diagrama => {
  const P1: Pt = [380, Y0 + 80];
  const P2: Pt = [380, Y0 - 90];
  return {
    label: "Rectas que se cortan: los puntos de corte están en una misma perpendicular a la L.T.",
    pasos: [
      { texto: "Dos rectas $r$ y $s$: las proyecciones **horizontales** se cortan en $P'$.", items: [...lt(), seg([180, Y0 + 30], [600, Y0 + 130], "naranja", false, 3.4), seg([200, Y0 + 150], [560, Y0 + 40], "naranja", false, 3.4), pt(P1, "P′", "amarillo", 14, 22)] },
      { texto: "Las **verticales** se cortan en $P''$.", items: [seg([170, Y0 - 60], [600, Y0 - 130], "azul", false, 3.4), seg([200, Y0 - 150], [560, Y0 - 30], "azul", false, 3.4), pt(P2, "P″", "amarillo", 14, -6)] },
      { texto: "Si $P'$ y $P''$ están en la **misma perpendicular a la L.T.**, las rectas **se cortan** en el espacio. Si no, **se cruzan**.", items: [seg(P1, P2, "amarillo", true, 2.4)] },
    ],
  };
};

const perpendiculares = (): Diagrama => ({
  label: "Rectas perpendiculares a los planos de proyección",
  pasos: [
    { texto: "Perpendicular al **PH** (recta vertical): su proyección horizontal es un **punto** y la vertical, una recta **perpendicular a la L.T.**", items: [...lt(), pt(pH(180, 80), "a′", "naranja", 12, 22), seg([180, 40], [180, Y0], "azul", false, 3.6), txt([205, 60], "a″", "azul", 21)] },
    { texto: "Perpendicular al **PV** (recta de punta): su proyección vertical es un **punto** y la horizontal, una recta perpendicular a la L.T.", items: [pt(pV(420, 90), "d″", "azul", 12, -8), seg([420, Y0], [420, 385], "naranja", false, 3.6), txt([445, 360], "d′", "naranja", 21)] },
    { texto: "Las seis rectas de este tipo tienen **una proyección perpendicular a la L.T.** y **la otra es un punto**, que puede estar bajo la L.T., en ella o sobre ella.", items: [pt(pH(640, 60), "c′", "naranja", 12, 22), seg([640, 60], [640, Y0 - 20], "azul", false, 3.6), pt([640, Y0 + 0], "", "blanco")] },
  ],
});

const paralelaLT = (): Diagrama => ({
  label: "Recta paralela a la línea de tierra",
  pasos: [
    { texto: "Una recta paralela a la L.T. tiene **sus dos proyecciones paralelas a la L.T.**", items: [...lt(), seg([200, Y0 + 100], [600, Y0 + 100], "naranja", false, 3.6), seg([200, Y0 - 80], [600, Y0 - 80], "azul", false, 3.6), txt([630, Y0 + 106], "r′", "naranja", 22), txt([630, Y0 - 74], "r″", "azul", 22)] },
    { texto: "No corta a ningún plano de proyección: **no tiene trazas**.", items: [...punto(400, 100, 80, "A", "verde")] },
  ],
});

const horizontal = (): Diagrama => {
  const k = (Y0 - 80) - (Y0 + 40);
  void k;
  return {
    label: "Recta horizontal (paralela al plano horizontal)",
    pasos: [
      { texto: "Está por **encima** del PH: su proyección vertical $r''$ es **paralela a la L.T.** y $r'$ es cualquiera.", items: [...lt(), seg([200, Y0 - 90], [620, Y0 - 90], "azul", false, 3.6), seg([200, Y0 + 130], [620, Y0 + 20], "naranja", false, 3.6), txt([650, Y0 - 84], "r″", "azul", 22), txt([650, Y0 + 20], "r′", "naranja", 22)] },
      { texto: "**No tiene traza horizontal.** Su traza vertical $V$ está en $r'$ ∩ L.T. y se refiere a $r''$.", items: [pt([560, Y0], "V′", "naranja", 6, 22), seg([560, Y0], [560, Y0 - 90], "gris", true), pt([560, Y0 - 90], "V″", "azul", 10, -8)] },
    ],
  };
};

const frontal = (): Diagrama => ({
  label: "Recta frontal (paralela al plano vertical)",
  pasos: [
    { texto: "Es paralela al **PV**: su proyección horizontal $r'$ es **paralela a la L.T.** y $r''$ es cualquiera.", items: [...lt(), seg([200, Y0 + 100], [620, Y0 + 100], "naranja", false, 3.6), seg([200, Y0 - 120], [620, Y0 - 20], "azul", false, 3.6), txt([650, Y0 + 106], "r′", "naranja", 22), txt([650, Y0 - 20], "r″", "azul", 22)] },
    { texto: "**No tiene traza vertical.** Su traza horizontal $H$: $r''$ corta la L.T. en $H''$ y se refiere a $H'$ en $r'$.", items: [pt([540, Y0], "H″", "azul", 8, -12), seg([540, Y0], [540, Y0 + 100], "gris", true), pt([540, Y0 + 100], "H′", "naranja", 10, 22)] },
  ],
});

const oblicuas = (): Diagrama => ({
  label: "Rectas oblicuas que cortan a la línea de tierra",
  pasos: [
    { texto: "Cortan a la L.T.: pasan por **dos diedros** y tienen sus **dos trazas en la L.T.**", items: [...lt(), seg([200, Y0 + 130], [480, Y0 - 30], "naranja", false, 3.4), seg([200, Y0 - 140], [480, Y0 + 20], "azul", false, 3.4), pt([400, Y0], "H′=H″=V′=V″", "verde", -40, -14)] },
    { texto: "Hay cuatro posiciones: del 1.º al 3.º diedro, del 2.º al 4.º y las **de perfil** (perpendiculares a la L.T.).", items: [seg([620, 40], [620, 385], "amarillo", false, 3.4), txt([640, 340], "de perfil", "amarillo", 20, "start")] },
  ],
});

const perfil = (): Diagrama => ({
  label: "Rectas de perfil: las dos proyecciones en una misma perpendicular a la L.T.",
  pasos: [
    { texto: "Están en un **plano de perfil**: sus dos proyecciones quedan **confundidas** en una perpendicular a la L.T.", items: [...lt(), seg([300, 50], [300, 385], "amarillo", false, 3.6)] },
    { texto: "Para definirlas hay que dar **dos puntos** o **sus trazas** $H'$ y $V''$.", items: [pt([300, Y0 + 110], "H′", "naranja", 12, 6), pt([300, Y0 - 70], "V″", "azul", 12, 6)] },
    { texto: "Si $H'$ y $V''$ **equidistan** de la L.T. la recta es perpendicular a un bisector; si no, no.", items: [pt([560, Y0 + 90], "H′", "naranja", 12, 6), pt([560, Y0 - 90], "V″", "azul", 12, 6), seg([560, 50], [560, 385], "verde", false, 3.4), seg([560, Y0 + 90], [620, Y0 + 90], "gris", true), seg([560, Y0 - 90], [620, Y0 - 90], "gris", true)] },
  ],
});

const planoTrazas = (): Diagrama => ({
  label: "Trazas de un plano",
  pasos: [
    { texto: "Las **trazas** de un plano son sus intersecciones con los planos de proyección: la **horizontal** $\\alpha_1$ y la **vertical** $\\alpha_2$.", items: [...lt(), lin([[420, Y0], [640, Y0 + 130]], "naranja", false, 3.8), lin([[420, Y0], [560, Y0 - 150]], "azul", false, 3.8), txt([655, Y0 + 138], "α₁", "naranja", 22), txt([565, Y0 - 160], "α₂", "azul", 22)] },
    { texto: "Se cortan en un punto $N$ **de la L.T.**", items: [pt([420, Y0], "N", "verde", -6, 26)] },
    { texto: "Tras el abatimiento, el plano queda como **dos rectas que parten de $N$**.", items: [arc([420, Y0], 70, -50, 48, "amarillo")] },
  ],
});

const definir = (): Diagrama => ({
  label: "Formas de definir un plano",
  pasos: [
    { texto: "Por **tres puntos** no alineados.", items: [poli([[110, 160], [230, 100], [250, 220]], "azul", 0.18), pt([110, 160], "A", "azul", -18, 6), pt([230, 100], "B", "azul", 8, -6), pt([250, 220], "C", "azul", 10, 16)] },
    { texto: "Por **dos rectas que se cortan**.", items: [seg([330, 230], [510, 110], "verde", false, 3.4), seg([330, 130], [510, 220], "verde", false, 3.4), pt([420, 175], "P", "verde", 8, -10)] },
    { texto: "Por **dos rectas paralelas**.", items: [seg([590, 120], [740, 80], "naranja", false, 3.4), seg([590, 190], [740, 150], "naranja", false, 3.4)] },
    { texto: "Por **un punto y una recta** que no se pertenecen. Normalmente se da por sus **trazas**.", items: [seg([120, 330], [330, 290], "morado", false, 3.4), pt([220, 380], "P", "morado", 10, 6)] },
  ],
});

const proyectantes = (): Diagrama => ({
  label: "Planos proyectantes: perpendiculares a un plano de proyección",
  pasos: [
    { texto: "**Proyectante horizontal** (perpendicular al PH): su traza **vertical** $\\alpha_2$ es **perpendicular a la L.T.** y $\\alpha_1$ es cualquiera.", items: [...lt(), seg([260, Y0], [260, 40], "azul", false, 3.8), lin([[260, Y0], [430, Y0 + 130]], "naranja", false, 3.8), txt([275, 60], "α₂", "azul", 22, "start"), txt([440, Y0 + 138], "α₁", "naranja", 22)] },
    { texto: "Todo lo que contiene se proyecta horizontalmente **sobre $\\alpha_1$**.", items: [pt([340, Y0 + 66], "P′", "verde", 12, 22), pt([340, Y0 - 70], "P″", "verde", 12, -8), seg([340, Y0 - 70], [340, Y0 + 66], "gris", true)] },
    { texto: "**Proyectante vertical**: su traza horizontal $\\beta_1$ es **perpendicular a la L.T.**; todo se proyecta verticalmente **sobre $\\beta_2$**.", items: [seg([600, Y0], [600, 385], "naranja", false, 3.8), lin([[600, Y0], [740, Y0 - 120]], "azul", false, 3.8), txt([615, 370], "β₁", "naranja", 22, "start"), txt([745, Y0 - 128], "β₂", "azul", 22, "end")] },
  ],
});

const planosParalelos = (): Diagrama => ({
  label: "Planos paralelos a los de proyección y plano de perfil",
  pasos: [
    { texto: "**Plano horizontal** $\\omega$: paralelo al PH. Solo tiene traza vertical, **paralela a la L.T.**", items: [...lt(), seg([100, Y0 - 90], [320, Y0 - 90], "azul", false, 4), txt([210, Y0 - 105], "ω₂", "azul", 22)] },
    { texto: "**Plano frontal** $\\alpha$: paralelo al PV. Solo tiene traza horizontal, **paralela a la L.T.**", items: [seg([100, Y0 + 90], [320, Y0 + 90], "naranja", false, 4), txt([210, Y0 + 125], "α₁", "naranja", 22)] },
    { texto: "**Plano de perfil** $\\beta$: sus dos trazas están **confundidas** en una perpendicular a la L.T.", items: [seg([560, 50], [560, 385], "amarillo", false, 4), txt([580, 90], "β₁ ≡ β₂", "amarillo", 22, "start")] },
  ],
});

const rectaPlano = (): Diagrama => ({
  label: "Recta contenida en un plano: sus trazas están sobre las trazas del plano",
  pasos: [
    { texto: "Un plano $\\alpha(\\alpha_1\\text{-}\\alpha_2)$ con trazas que se cortan en $N$.", items: [...lt(), pt([220, Y0], "N", "blanco", -6, 24), lin([[220, Y0], [600, Y0 + 150]], "naranja", false, 3.6), lin([[220, Y0], [520, Y0 - 150]], "azul", false, 3.6)] },
    { texto: "Una recta $r$ está en el plano si su **traza horizontal** $H$ está en $\\alpha_1$ y su **traza vertical** $V$ en $\\alpha_2$.", items: [pt([420, Y0 + 79], "H′", "naranja", 10, 22), pt([420, Y0], "H″", "blanco", 6, -10), pt([330, Y0 - 82], "V″", "azul", -34, -6), pt([330, Y0], "V′", "blanco", -24, 22), seg([420, Y0], [420, Y0 + 79], "gris", true), seg([330, Y0], [330, Y0 - 82], "gris", true)] },
    { texto: "Sus proyecciones $r'$ y $r''$ unen las trazas homónimas.", items: [seg([330, Y0], [420, Y0 + 79], "naranja", false, 3.6), seg([330, Y0 - 82], [420, Y0], "azul", false, 3.6)] },
  ],
});

const puntoPlano = (): Diagrama => ({
  label: "Punto contenido en un plano: se sitúa sobre una recta del plano",
  pasos: [
    { texto: "Un punto no puede situarse en un plano de forma arbitraria: antes hay que situar en él una **recta**.", items: [...lt(), lin([[220, Y0], [600, Y0 + 150]], "naranja", false, 3.6), lin([[220, Y0], [520, Y0 - 150]], "azul", false, 3.6), seg([300, Y0 + 30], [500, Y0 + 110], "naranja", false, 2.6), seg([300, Y0 - 50], [470, Y0 - 100], "azul", false, 2.6)] },
    { texto: "El punto $A$ está en el plano si **sus proyecciones están sobre las proyecciones homónimas** de una recta del plano.", items: [pt([400, Y0 + 70], "A′", "verde", 10, 22), pt([400, Y0 - 90], "A″", "verde", 10, -8), seg([400, Y0 - 90], [400, Y0 + 70], "gris", true)] },
  ],
});

const horizontalPlano = (): Diagrama => ({
  label: "Recta horizontal de un plano",
  pasos: [
    { texto: "La **horizontal** de un plano tiene su traza vertical $V''$ en $\\alpha_2$.", items: [...lt(), pt([260, Y0], "N", "blanco", -6, 24), lin([[260, Y0], [640, Y0 + 130]], "naranja", false, 3.6), lin([[260, Y0], [520, Y0 - 160]], "azul", false, 3.6), pt([430, Y0 - 105], "V″", "azul", 10, -8)] },
    { texto: "$h''$ es **paralela a la L.T.** a una distancia igual a su **cota**.", items: [seg([330, Y0 - 105], [680, Y0 - 105], "amarillo", false, 3.6), txt([700, Y0 - 100], "h″", "amarillo", 22, "start"), seg([430, Y0 - 105], [430, Y0], "gris", true), pt([430, Y0], "V′", "naranja", 8, 22)] },
    { texto: "$h'$ es **paralela a $\\alpha_1$** por $V'$.", items: [seg([430, Y0], [640, Y0 + 72], "amarillo", false, 3.6), txt([650, Y0 + 80], "h′", "amarillo", 22, "start")] },
  ],
});

const frontalPlano = (): Diagrama => ({
  label: "Recta frontal de un plano",
  pasos: [
    { texto: "La **frontal** de un plano tiene su única traza $H'$ en $\\alpha_1$.", items: [...lt(), pt([260, Y0], "N", "blanco", -6, 24), lin([[260, Y0], [640, Y0 + 130]], "naranja", false, 3.6), lin([[260, Y0], [520, Y0 - 160]], "azul", false, 3.6), pt([430, Y0 + 58], "H′", "naranja", 12, 22)] },
    { texto: "$f'$ es **paralela a la L.T.** a una distancia igual a su **alejamiento**.", items: [seg([330, Y0 + 58], [680, Y0 + 58], "amarillo", false, 3.6), txt([700, Y0 + 64], "f′", "amarillo", 22, "start"), seg([430, Y0 + 58], [430, Y0], "gris", true), pt([430, Y0], "H″", "azul", 8, -12)] },
    { texto: "$f''$ es **paralela a $\\alpha_2$** por $H''$.", items: [seg([430, Y0], [570, Y0 - 90], "amarillo", false, 3.6), txt([585, Y0 - 100], "f″", "amarillo", 22, "start")] },
  ],
});

const lineasMax = (): Diagrama => ({
  label: "Líneas de máxima pendiente y de máxima inclinación",
  pasos: [
    { texto: "La **línea de máxima pendiente** (l.m.p.) forma el mayor ángulo con el PH: su proyección horizontal es **perpendicular a $\\alpha_1$**.", items: [...lt(), pt([240, Y0], "N", "blanco", -6, 24), lin([[240, Y0], [620, Y0 + 150]], "naranja", false, 3.6), lin([[240, Y0], [480, Y0 - 160]], "azul", false, 3.6), seg([440, Y0 + 79], [475, Y0 - 12], "verde", false, 3.6), txt([490, Y0 - 6], "l.m.p.′", "verde", 18, "start")] },
    { texto: "La **línea de máxima inclinación** (l.m.i.) forma el mayor ángulo con el PV: su proyección vertical es **perpendicular a $\\alpha_2$**.", items: [seg([360, Y0 - 74], [405, Y0 + 0], "rojo", false, 3.6), txt([415, Y0 + 14], "l.m.i.″", "rojo", 18, "start")] },
    { texto: "Un plano queda definido por **una de sus l.m.p.** o **una de sus l.m.i.**", items: [txt([400, 385], "plano ⇔ l.m.p. o l.m.i.", "amarillo", 22)] },
  ],
});

const tercera = (): Diagrama => ({
  label: "Tercera proyección: el plano de perfil abatido",
  pasos: [
    { texto: "Un punto $A$ se proyecta también sobre un **plano de perfil** $\\beta$ (perpendicular a los otros dos).", items: [...lt(), ...punto(250, 70, 90, "A"), seg([520, 40], [520, 385], "amarillo", false, 3.4), txt([535, 60], "β", "amarillo", 22, "start"), pt([520, Y0], "O", "blanco", -18, 22)] },
    { texto: "La cota de $A''$ se lleva con una **paralela a la L.T.**", items: [seg(pV(250, 90), [520 + 70, Y0 - 90], "azul", true, 2.4)] },
    { texto: "El alejamiento de $A'$ se lleva con un **arco de centro $O$** hasta la L.T. y una perpendicular: se obtiene $A_1$.", items: [arc([520, Y0], 70, -90, 0, "verde"), seg(pH(250, 70), [520, Y0 + 70], "gris", true), seg([590, Y0], [590, Y0 - 90], "gris", true), pt([590, Y0 - 90], "A₁", "verde", 12, -8)] },
  ],
});

const p12 = (): Diagrama => ({
  label: "Problema 12: punto de una recta de perfil",
  pasos: [
    { texto: "Se conocen las trazas $H'$, $V''$ de la recta de perfil $r$ y la proyección $A'$ de un punto de ella.", items: [...lt(), seg([260, 50], [260, 385], "amarillo", false, 3.2), pt([260, Y0 + 110], "H′", "naranja", 12, 6), pt([260, Y0 - 100], "V″", "azul", 12, 6), pt([260, Y0 + 60], "A′", "verde", 12, 6), seg([520, 40], [520, 385], "gris", true), pt([520, Y0], "O", "blanco", -18, 22)] },
    { texto: "Se pasa a la **tercera proyección**: se obtienen $H$ y $V$ en el plano de perfil y se traza la recta $r_1$.", items: [seg([520, Y0 - 100], [630, Y0], "amarillo", false, 3.4), pt([520, Y0 - 100], "V", "azul", 10, -6), pt([630, Y0], "H", "naranja", 8, -10)] },
    { texto: "$A'$ da $A_1$ en $r_1$, y este se refiere a $A''$ en $r''$ con una paralela a la L.T.", items: [pt([580, Y0 - 50], "A₁", "verde", 10, -8), seg([580, Y0 - 50], [260, Y0 - 50], "verde", true), pt([260, Y0 - 50], "A″", "verde", -34, -6)] },
  ],
});

const p13 = (): Diagrama => ({
  label: "Problema 13: trazas de una recta de perfil dada por dos puntos",
  pasos: [
    { texto: "La recta de perfil se da por dos puntos $A$ y $B$ (sus proyecciones están en una misma perpendicular).", items: [...lt(), seg([260, 50], [260, 385], "amarillo", false, 3.2), pt([260, Y0 + 45], "A′", "naranja", 12, 6), pt([260, Y0 - 50], "A″", "azul", 12, 6), pt([260, Y0 + 95], "B′", "naranja", 12, 6), pt([260, Y0 - 10], "B″", "azul", 12, 6)] },
    { texto: "En la tercera proyección, $A_1$ y $B_1$ definen la recta $r_1$.", items: [seg([520, 40], [520, 385], "gris", true), pt([565, Y0 - 50], "A₁", "verde", 10, -8), pt([615, Y0 - 10], "B₁", "verde", 10, -8), seg([565, Y0 - 50], [700, Y0 + 40], "verde", false, 3.4)] },
    { texto: "$r_1$ corta a los planos en las trazas $H$ y $V$, que se refieren a la recta en $H'$-$H''$ y $V'$-$V''$.", items: [pt([520, Y0 - 95], "V", "azul", -22, -6), pt([660, Y0], "H", "naranja", 8, -10)] },
  ],
});

const p14 = (): Diagrama => ({
  label: "Problema 14: ¿se cortan o se cruzan dos rectas, una de ellas de perfil?",
  pasos: [
    { texto: "Las proyecciones de $r$ (de perfil) y $s$ aparentemente se cortan en $I'$ e $I''$.", items: [...lt(), seg([380, 50], [380, 385], "amarillo", false, 3.2), seg([160, Y0 + 40], [620, Y0 + 130], "naranja", false, 3.4), seg([160, Y0 - 130], [620, Y0 - 30], "azul", false, 3.4), pt([380, Y0 + 85], "I′", "verde", 12, 22), pt([380, Y0 - 80], "I″", "verde", 12, -8)] },
    { texto: "Al pasar $I$ a la **tercera proyección** se ve si pertenece a $r$.", items: [seg([560, 40], [560, 385], "gris", true), pt([640, Y0 - 50], "I₁", "rojo", 10, -8), seg([600, Y0 - 100], [700, Y0 + 10], "amarillo", false, 3.4)] },
    { texto: "$I_1$ **no está** en $r_1$: las rectas **se cruzan**. El punto $I$ solo pertenece a $s$.", items: [txt([640, 330], "se cruzan", "rojo", 24)] },
  ],
});

const bisectores = (): Diagrama => ({
  label: "Planos perpendiculares a los bisectores",
  pasos: [
    { texto: "Plano **perpendicular al primer bisector**: sus trazas son **simétricas** respecto de la L.T. (el mismo ángulo con ella).", items: [...lt(), pt([260, Y0], "N", "blanco", -6, 24), lin([[260, Y0], [540, Y0 + 130]], "naranja", false, 3.8), lin([[260, Y0], [540, Y0 - 130]], "azul", false, 3.8), arc([260, Y0], 90, -25, 25, "amarillo")] },
    { texto: "Plano **perpendicular al segundo bisector**: sus trazas están **en línea recta**.", items: [lin([[440, Y0 + 140], [440 + 0, Y0 + 140]], "gris"), seg([440, Y0 - 130], [720, Y0 + 100], "morado", false, 3.8), txt([700, Y0 - 100], "α₁ ≡ α₂", "morado", 21, "end")] },
  ],
});

const paralelosLT = (): Diagrama => ({
  label: "Plano paralelo a la línea de tierra",
  pasos: [
    { texto: "Un plano paralelo a la L.T. tiene **sus dos trazas paralelas a la L.T.**", items: [...lt(), seg([120, Y0 + 90], [680, Y0 + 90], "naranja", false, 3.8), seg([120, Y0 - 120], [680, Y0 - 120], "azul", false, 3.8), txt([700, Y0 + 96], "α₁", "naranja", 22, "start"), txt([700, Y0 - 114], "α₂", "azul", 22, "start")] },
    { texto: "Según el diedro por el que pasen, sus trazas se ven **vistas u ocultas**.", items: [seg([120, Y0 - 120], [680, Y0 - 120], "rojo", true, 3.8)] },
  ],
});

const figuraPlana = (): Diagrama => ({
  label: "Proyecciones de una figura plana contenida en un plano",
  pasos: [
    { texto: "Se conoce el plano $\\alpha$ y el **alzado** de una figura contenida en él.", items: [...lt(), pt([200, Y0], "N", "blanco", -6, 24), lin([[200, Y0], [600, Y0 + 130]], "naranja", false, 3.4), lin([[200, Y0], [470, Y0 - 150]], "azul", false, 3.4), poli([[360, Y0 - 100], [440, Y0 - 60], [330, Y0 - 40]], "azul", 0.2)] },
    { texto: "Por cada vértice se traza una **horizontal del plano**: $h''$ paralela a la L.T. hasta $\\alpha_2$.", items: [seg([300, Y0 - 100], [440, Y0 - 100], "amarillo", true, 2.4), seg([270, Y0 - 60], [440, Y0 - 60], "amarillo", true, 2.4), seg([250, Y0 - 40], [330, Y0 - 40], "amarillo", true, 2.4)] },
    { texto: "Se baja a la L.T. y $h'$ es paralela a $\\alpha_1$. El vértice se refiere a $h'$: al repetirlo se obtiene la **planta**.", items: [poli([[360, Y0 + 63], [440, Y0 + 96], [330, Y0 + 45]], "naranja", 0.2), seg([360, Y0 - 100], [360, Y0 + 63], "gris", true), seg([440, Y0 - 60], [440, Y0 + 96], "gris", true), seg([330, Y0 - 40], [330, Y0 + 45], "gris", true)] },
  ],
});

export const DIAGRAMAS_DIEDRICO: Record<string, Diagrama> = {
  "d12-fundamentos": fundamentos(), "d12-diedros": diedros(), "d12-reversible": reversible(), "d12-notacion": notacion(), "d12-cota-alej": cotaAlej(),
  "d12-especiales": especiales(), "d12-recta": recta(), "d12-trazas": trazas(), "d12-vistas": vistas(), "d12-cortan": cortan(), "d12-perpendiculares": perpendiculares(),
  "d12-paralela-lt": paralelaLT(), "d12-horizontal": horizontal(), "d12-frontal": frontal(), "d12-oblicuas": oblicuas(), "d12-perfil": perfil(),
  "d12-plano-trazas": planoTrazas(), "d12-definir": definir(), "d12-proyectantes": proyectantes(), "d12-planos-paralelos": planosParalelos(),
  "d12-recta-plano": rectaPlano(), "d12-punto-plano": puntoPlano(), "d12-horizontal-plano": horizontalPlano(), "d12-frontal-plano": frontalPlano(), "d12-lineas-max": lineasMax(),
  "d12-tercera": tercera(), "d12-p12": p12(), "d12-p13": p13(), "d12-p14": p14(), "d12-bisectores": bisectores(), "d12-paralelos-lt": paralelosLT(), "d12-figura-plana": figuraPlana(),
};
export type { Item };
