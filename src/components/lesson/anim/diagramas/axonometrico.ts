import { arc, lin, poli, pt, seg, txt, type Diagrama, type Item, type Pt } from "./engine";

const O: Pt = [400, 270];
const C30 = Math.cos(Math.PI / 6);
/** Proyección isométrica: X hacia abajo a la derecha, Y hacia abajo a la izquierda, Z hacia arriba. */
const iso = (x: number, y: number, z: number): Pt => [O[0] + (x - y) * C30, O[1] + (x + y) * 0.5 - z];
const ejes = (l = 200, neg = 0): Item[] => [
  seg(iso(neg, 0, 0), iso(l, 0, 0), "blanco", false, 3), seg(iso(0, neg, 0), iso(0, l, 0), "blanco", false, 3), seg(iso(0, 0, neg), iso(0, 0, l), "blanco", false, 3),
  txt(iso(l + 14, 0, 0), "X", "blanco", 22), txt(iso(0, l + 14, 0), "Y", "blanco", 22), txt(iso(0, 0, l + 22), "Z", "blanco", 22), pt(O, "O", "blanco", 10, 20),
];
const cara = (a: "xy" | "xz" | "yz", l: number): Pt[] => (a === "xy" ? [iso(0, 0, 0), iso(l, 0, 0), iso(l, l, 0), iso(0, l, 0)] : a === "xz" ? [iso(0, 0, 0), iso(l, 0, 0), iso(l, 0, l), iso(0, 0, l)] : [iso(0, 0, 0), iso(0, l, 0), iso(0, l, l), iso(0, 0, l)]);

const triedro = (): Diagrama => ({
  label: "El triedro trirrectángulo: ejes y planos coordenados",
  pasos: [
    { texto: "Un **triedro trirrectángulo** de vértice $O$: sus aristas $X$, $Y$, $Z$ son los **ejes del sistema**.", items: ejes(200) },
    { texto: "Los planos de sus caras son los **planos coordenados** $XOY$, $XOZ$ y $YOZ$.", items: [poli(cara("xy", 150), "naranja", 0.2), poli(cara("xz", 150), "azul", 0.2), poli(cara("yz", 150), "verde", 0.2), txt(iso(125, 125, 0), "XOY", "naranja", 19), txt(iso(130, 0, 135), "XOZ", "azul", 19), txt(iso(0, 130, 135), "YOZ", "verde", 19)] },
    { texto: "Un punto $(P)$ se proyecta ortogonalmente sobre cada cara en $(P')$, $(P'')$ y $(P''')$.", items: [pt(iso(90, 70, 80), "P", "amarillo", 14, 4), pt(iso(90, 70, 0), "P′", "naranja", 14, 20), pt(iso(90, 0, 80), "P″", "azul", 14, -2), pt(iso(0, 70, 80), "P‴", "verde", -34, 4), seg(iso(90, 70, 80), iso(90, 70, 0), "gris", true), seg(iso(90, 70, 80), iso(90, 0, 80), "gris", true), seg(iso(90, 70, 80), iso(0, 70, 80), "gris", true)] },
  ],
});

const cuadro = (): Diagrama => {
  const ang = (a: number, b: number, r: number, c: "amarillo" | "verde" | "naranja") => arc(O, r, a, b, c);
  return {
    label: "El plano del cuadro y los ángulos entre los ejes proyectados",
    pasos: [
      { texto: "Se proyecta sobre un cuarto plano que no contiene a ningún eje: el **plano del cuadro** $\\pi$ (el del papel).", items: [poli([[110, 60], [690, 60], [690, 380], [110, 380]], "gris", 0.1), txt([650, 90], "π", "gris", 26)] },
      { texto: "Los ejes se proyectan según tres rectas $X$, $Y$, $Z$ que concurren en $O$.", items: ejes(200) },
      { texto: "Forman ángulos $\\varepsilon = \\widehat{XOY}$, $\\omega = \\widehat{XOZ}$, $\\rho = \\widehat{ZOY}$ y suman $360°$.", items: [ang(-30, 90 - 0.001 * 0, 50, "amarillo"), ang(90, 210, 70, "verde"), ang(210, 330, 90, "naranja"), txt([O[0] + 90, O[1] - 70], "ω", "amarillo", 22), txt([O[0] - 100, O[1] - 60], "ρ", "verde", 22), txt([O[0], O[1] + 118], "ε", "naranja", 22)] },
    ],
  };
};

const reversible = (): Diagrama => ({
  label: "Un punto y sus cuatro proyecciones; reversibilidad",
  pasos: [
    { texto: "El punto $P$ de coordenadas $x$, $y$, $z$ se obtiene completando un **paralelepípedo** desde el origen.", items: [...ejes(190), pt(iso(100, 80, 90), "P", "amarillo", 12, -8), lin([iso(100, 0, 0), iso(100, 80, 0), iso(0, 80, 0)], "gris", true), lin([iso(100, 0, 0), iso(100, 0, 90), iso(0, 0, 90)], "gris", true), lin([iso(0, 80, 0), iso(0, 80, 90), iso(0, 0, 90)], "gris", true), seg(iso(100, 80, 0), iso(100, 80, 90), "gris", true), seg(iso(100, 0, 90), iso(100, 80, 90), "gris", true), seg(iso(0, 80, 90), iso(100, 80, 90), "gris", true)] },
    { texto: "$P'$, $P''$ y $P'''$ son las proyecciones sobre los planos coordenados. Hay **cuatro proyecciones** en total.", items: [pt(iso(100, 80, 0), "P′", "naranja", 12, 20), pt(iso(100, 0, 90), "P″", "azul", 12, -8), pt(iso(0, 80, 90), "P‴", "verde", -34, -8)] },
    { texto: "Dadas **dos proyecciones cualesquiera**, las otras se pueden hallar con paralelas a los ejes.", items: [txt([400, 385], "dos proyecciones definen el punto", "amarillo", 24)] },
  ],
});

const triangulo = (): Diagrama => {
  const A: Pt = [610, 330];
  const B: Pt = [190, 330];
  const C: Pt = [400, 70];
  const O2: Pt = [400, 243];
  return {
    label: "El triángulo fundamental: trazas del plano del cuadro con el triedro",
    pasos: [
      { texto: "Un plano paralelo al cuadro corta a los ejes en $A$, $B$, $C$: el triángulo $ABC$ es el **triángulo fundamental**.", items: [poli([A, B, C], "amarillo", 0.12), pt(A, "A", "amarillo", 12, 20), pt(B, "B", "amarillo", -22, 20), pt(C, "C", "amarillo", 8, -10)] },
      { texto: "Los ejes proyectados $X$, $Y$, $Z$ son **perpendiculares a los lados** y pasan por las alturas del triángulo.", items: [seg(O2, A, "blanco", false, 3), seg(O2, B, "blanco", false, 3), seg(O2, C, "blanco", false, 3), pt(O2, "O", "blanco", 10, 20)] },
      { texto: "Su conocimiento basta para definir el sistema: los ejes son las **bisectrices** del triángulo órtico (pies de las alturas).", items: [poli([[505, 200], [295, 200], [400, 330]], "verde", 0.12, true)] },
    ],
  };
};

const notacion = (): Diagrama => ({
  label: "Notación de puntos, rectas y planos en axonometría",
  pasos: [
    { texto: "**Puntos**: $P\\text{-}P'\\text{-}P''\\text{-}P'''$: $P$ es la proyección directa; $P'$, sobre $XOY$; $P''$, sobre $XOZ$; $P'''$, sobre $YOZ$.", items: [...ejes(190), pt(iso(100, 80, 90), "P", "amarillo", 12, -8), pt(iso(100, 80, 0), "P′", "naranja", 12, 20), pt(iso(100, 0, 90), "P″", "azul", 12, -8), pt(iso(0, 80, 90), "P‴", "verde", -34, -8)] },
    { texto: "**Rectas**: $r\\text{-}r'\\text{-}r''\\text{-}r'''$, en el mismo orden.", items: [seg(iso(30, 40, 30), iso(130, 110, 100), "amarillo", false, 3.6), txt(iso(140, 114, 108), "r", "amarillo", 22)] },
    { texto: "**Planos**: $\\alpha(\\alpha_1\\text{-}\\alpha_2\\text{-}\\alpha_3)$, con las trazas sobre $XOY$, $XOZ$ y $YOZ$.", items: [poli([iso(150, 0, 0), iso(0, 130, 0), iso(0, 0, 130)], "morado", 0.12), txt(iso(70, 70, 0), "α₁", "naranja", 21), txt(iso(70, 0, 60), "α₂", "azul", 21), txt(iso(0, 60, 60), "α₃", "verde", 21)] },
  ],
});

const isometrico = (): Diagrama => ({
  label: "Isométrico, dimétrico y trimétrico",
  pasos: [
    { texto: "**Isométrico**: los tres ejes forman el **mismo ángulo con el cuadro** y se proyectan a **120°**. Un solo coeficiente de reducción.", items: [
      ...[90, 210, 330].map((a) => seg([210, 210], [210 + 110 * Math.cos((a * Math.PI) / 180), 210 - 110 * Math.sin((a * Math.PI) / 180)], "verde", false, 3.6)), txt([210, 360], "isométrico", "verde", 22),
    ] },
    { texto: "**Dimétrico**: dos ejes forman el mismo ángulo con el cuadro (**dos medidas**).", items: [seg([400, 210], [400, 100], "naranja", false, 3.6), seg([400, 210], [310, 270], "naranja", false, 3.6), seg([400, 210], [490, 255], "naranja", false, 3.6), txt([400, 360], "dimétrico", "naranja", 22)] },
    { texto: "**Trimétrico**: los tres ángulos son diferentes (**tres medidas**). En este estudio se usa solo el isométrico.", items: [seg([590, 210], [570, 100], "azul", false, 3.6), seg([590, 210], [500, 255], "azul", false, 3.6), seg([590, 210], [680, 235], "azul", false, 3.6), txt([590, 360], "trimétrico", "azul", 22)] },
  ],
});

const escala = (): Diagrama => ({
  label: "Escala isométrica: coeficiente de reducción 0,816",
  pasos: [
    { texto: "Una arista paralela a un eje isométrico se proyecta **reducida** en la misma proporción para los tres ejes.", items: [seg([120, 150], [520, 150], "gris", false, 4), txt([320, 130], "medida real: 100", "gris", 20)] },
    { texto: "Su proyección es la longitud real por el **coseno de 35°16′**: $0{,}816$.", items: [seg([120, 230], [120 + 326.4, 230], "verde", false, 5), txt([283, 215], "proyección: 81,6", "verde", 20)] },
    { texto: "Escala de reducción isométrica: **0,816 : 1**, común a los tres ejes. En el dibujo industrial se suele **no reducir** y obtener una figura semejante algo mayor.", items: [txt([400, 330], "0,816 : 1", "amarillo", 40)] },
  ],
});

const sinReducir = (): Diagrama => {
  const cubo = (c: Pt, a: number): Item[] => {
    const f = (x: number, y: number, z: number): Pt => [c[0] + (x - y) * C30, c[1] + (x + y) * 0.5 - z];
    return [poli([f(a, 0, 0), f(a, a, 0), f(0, a, 0), f(0, a, a), f(0, 0, a), f(a, 0, a)], "azul", 0.18), lin([f(a, a, a), f(a, a, 0)], "azul"), lin([f(a, a, a), f(a, 0, a)], "azul"), lin([f(a, a, a), f(0, a, a)], "azul")];
  };
  return {
    label: "Perspectivas sin reducir: un 22 % mayores",
    pasos: [
      { texto: "Con la escala **reducida** (0,816) el cubo de arista 100 se dibuja con aristas de 81,6.", items: [...cubo([250, 230], 81.6), txt([250, 365], "reducida", "azul", 20)] },
      { texto: "**Sin reducir** se llevan las medidas reales: la perspectiva es **semejante pero un 22 % mayor** ($1{,}22 = 1/0{,}816$).", items: [...cubo([560, 230], 100), txt([560, 365], "sin reducir", "naranja", 20)] },
    ],
  };
};

const ellipseIso = (R: number, c: Pt): Pt[] => Array.from({ length: 73 }, (_, i) => {
  const t = (i / 72) * 6.2832;
  return [c[0] + (R * Math.cos(t) - R * Math.sin(t)) * C30, c[1] + (R * Math.cos(t) + R * Math.sin(t)) * 0.5] as Pt;
});

const circunferencia = (): Diagrama => {
  const R = 100;
  const rombo = [iso(R, R, 0), iso(R, -R, 0), iso(-R, -R, 0), iso(-R, R, 0)];
  return {
    label: "La circunferencia en isométrica: una elipse inscrita en el rombo",
    pasos: [
      { texto: "Una circunferencia de radio $R$ está inscrita en su **cuadrado circunscrito**.", items: [lin([[180, 120], [180, 320], [380, 320], [380, 120], [180, 120]], "gris"), lin(Array.from({ length: 73 }, (_, i) => [280 + 100 * Math.cos((i / 72) * 6.2832), 220 + 100 * Math.sin((i / 72) * 6.2832)] as Pt), "azul", false, 3.6)] },
      { texto: "En isométrica el cuadrado se proyecta en un **rombo** (aquí en el plano $XOY$).", items: [poli(rombo, "gris", 0.1)] },
      { texto: "La circunferencia se proyecta según una **elipse** inscrita en el rombo, tangente a sus lados en los puntos medios.", items: [lin(ellipseIso(R, O), "naranja", false, 4)] },
      { texto: "El **eje mayor** de la elipse es perpendicular a la dirección del eje $Z$ y mide $2R$; el menor es paralelo a ella.", items: [seg([O[0] - 122, O[1]], [O[0] + 122, O[1]], "amarillo", true, 2.4), seg([O[0], O[1] - 71], [O[0], O[1] + 71], "verde", true, 2.4)] },
    ],
  };
};

const puntosAux = (): Diagrama => {
  const R = 100;
  const q = (x: number, y: number): Pt => iso(x * R, y * R, 0);
  return {
    label: "Elipse isométrica por puntos: rectas A–2 y B–1",
    pasos: [
      { texto: "Se completa el rombo y se toman los **puntos medios** 1 y 2 indicados.", items: [poli([q(1, 1), q(1, -1), q(-1, -1), q(-1, 1)], "gris", 0.1), pt(q(0, 1), "A", "azul", -10, 20), pt(q(0, -1), "B", "azul", 8, -8), pt(q(0.5, 0), "1", "amarillo", 8, 22), pt(q(1, 0.5), "2", "amarillo", 14, 6)] },
      { texto: "Las rectas $A$-$2$ y $B$-$1$ se cortan en un **punto de la elipse**.", items: [seg(q(0, 1), q(1, 0.5), "verde", false, 2.6), seg(q(0, -1), q(0.5, 0), "verde", false, 2.6), pt(q(0.8, 0.6), "P", "naranja", 12, -8)] },
      { texto: "Repetido en los cuatro cuadrantes se obtienen $P$, $Q$, $R$, $S$: la elipse se traza a mano o con plantilla.", items: [lin(ellipseIso(R, O), "naranja", false, 4)] },
    ],
  };
};

const ovalo = (): Diagrama => {
  const R = 85;
  const Vt: Pt = [O[0], O[1] - R];
  const Vb: Pt = [O[0], O[1] + R];
  const C1: Pt = [O[0] - R / Math.sqrt(3), O[1]];
  const C3: Pt = [O[0] + R / Math.sqrt(3), O[1]];
  const rombo: Pt[] = [Vt, [O[0] + 1.732 * R, O[1]], Vb, [O[0] - 1.732 * R, O[1]]];
  return {
    label: "El óvalo isométrico de cuatro centros",
    pasos: [
      { texto: "Se sustituye la elipse por un **óvalo** de cuatro arcos. Los centros de los arcos grandes son los **vértices de ángulo obtuso** del rombo.", items: [poli(rombo, "gris", 0.1), pt(Vt, "C₄", "azul", 10, -8), pt(Vb, "C₂", "azul", 10, 20)] },
      { texto: "Los centros de los arcos pequeños, $C_1$ y $C_3$, están en la **diagonal mayor**, donde la cortan las rectas desde $C_4$ y $C_2$ a los puntos medios de los lados.", items: [pt(C1, "C₁", "verde", -30, 22), pt(C3, "C₃", "verde", 8, 22), seg(O, [O[0] + 1.732 * R, O[1]], "gris", true), seg([O[0] - 1.732 * R, O[1]], O, "gris", true)] },
      { texto: "Cuatro arcos **tangentes** forman el óvalo, que se traza con el compás.", items: [arc(Vt, 1.732 * R, 240, 300, "naranja"), arc(Vb, 1.732 * R, 60, 120, "naranja"), arc(C1, 0.577 * R, 120, 240, "naranja"), arc(C3, 0.577 * R, -60, 60, "naranja")] },
    ],
  };
};

const rayados = (): Diagrama => {
  const s = 130;
  const A = iso(0, 0, s);
  const B = iso(0, s, 0);
  const C = iso(s, 0, 0);
  return {
    label: "Rayados de secciones en isométrica",
    pasos: [
      { texto: "Las superficies de corte se rayan en cada plano con líneas **paralelas a direcciones** fijas.", items: ejes(190) },
      { texto: "Se toma un segmento $s$ **cualquiera** (el mismo) sobre cada eje: $OA = OB = OC$.", items: [pt(A, "A", "amarillo", 10, -8), pt(B, "B", "amarillo", -22, 20), pt(C, "C", "amarillo", 10, 20)] },
      { texto: "Los lados del triángulo $ABC$ dan las direcciones $d_1$, $d_2$, $d_3$ del rayado en cada plano.", items: [seg(A, B, "verde", false, 3.4), seg(B, C, "verde", false, 3.4), seg(C, A, "verde", false, 3.4), txt(iso(80, 80, 0), "d₁", "verde", 20)] },
    ],
  };
};

const puntoAxo = (): Diagrama => ({
  label: "Los ocho triedros: signos de las coordenadas",
  pasos: [
    { texto: "Los tres planos dividen el espacio en **ocho triedros**: se distinguen por los sentidos $+$ o $-$ de cada eje.", items: [...ejes(200, -170)] },
    { texto: "Punto $A$ en el triedro $+X,+Y,+Z$ y punto $B$ en $+X,-Y,+Z$.", items: [pt(iso(100, 80, 90), "A (+,+,+)", "verde", 12, -8), pt(iso(100, -80, 90), "B (+,−,+)", "naranja", 12, -8)] },
    { texto: "Punto $C$ en $-X,-Y,+Z$ y punto $D$ en $-X,+Y,+Z$.", items: [pt(iso(-100, -80, 90), "C (−,−,+)", "azul", 12, -8), pt(iso(-100, 80, 90), "D (−,+,+)", "morado", -14, -8)] },
  ],
});

const rectaAxo = (): Diagrama => {
  const P1 = iso(70, 30, 70);
  const Q1 = iso(30, 70, 20);
  return {
    label: "Recta oblicua y sus trazas con los planos coordenados",
    pasos: [
      { texto: "Una recta queda definida por **dos de sus proyecciones**: aquí la directa $t$ y la horizontal $t'$.", items: [...ejes(200, 0), seg(iso(110, -10, 110), iso(-10, 110, -5), "amarillo", false, 3.6), seg(iso(110, -10, 0), iso(-10, 110, 0), "naranja", false, 3), txt(iso(115, -12, 112), "t", "amarillo", 22), txt(iso(115, -12, 0), "t′", "naranja", 22)] },
      { texto: "La **traza con $XOY$**, $T_1$, es donde se cortan $t$ y $t'$.", items: [pt(iso(14, 86, 0), "T₁", "verde", 10, 20), pt(P1, "", "amarillo"), pt(Q1, "", "amarillo")] },
      { texto: "Con paralelas al eje $Z$ se refieren a $t$ los puntos de $t'$ sobre los ejes: se obtienen las trazas con $XOZ$ y $YOZ$.", items: [pt(iso(100, 0, 107), "T₂", "azul", 10, -8), seg(iso(100, 0, 0), iso(100, 0, 107), "gris", true), pt(iso(0, 100, -17), "T₃", "verde", -26, 18), seg(iso(0, 100, 0), iso(0, 100, -17), "gris", true)] },
    ],
  };
};

const rectasPart = (): Diagrama => ({
  label: "Rectas paralelas a los ejes: una sola traza",
  pasos: [
    { texto: "Una recta **paralela al eje $X$** se proyecta paralela a $X$ y solo corta a **un** plano coordenado.", items: [...ejes(190), seg(iso(30, 70, 70), iso(200, 70, 70), "amarillo", false, 3.6), txt(iso(210, 70, 70), "∥ X", "amarillo", 20)] },
    { texto: "Paralela al eje $Y$ y paralela al eje $Z$: cada una tiene **una única traza**.", items: [seg(iso(100, 20, 40), iso(100, 190, 40), "naranja", false, 3.6), seg(iso(60, 130, 0), iso(60, 130, 170), "verde", false, 3.6)] },
  ],
});

const planoAxo = (): Diagrama => {
  const A = iso(150, 0, 0);
  const B = iso(0, 130, 0);
  const C = iso(0, 0, 130);
  return {
    label: "Representación del plano por su triángulo de trazas",
    pasos: [
      { texto: "Un plano oblicuo corta a los ejes en $A$, $B$ y $C$.", items: [...ejes(190), pt(A, "A", "amarillo", 12, 20), pt(B, "B", "amarillo", -22, 20), pt(C, "C", "amarillo", 12, -8)] },
      { texto: "Corta a los planos coordenados según tres rectas, las **trazas** $\\alpha_1$ (en $XOY$), $\\alpha_2$ (en $XOZ$) y $\\alpha_3$ (en $YOZ$).", items: [seg(A, B, "naranja", false, 3.6), seg(A, C, "azul", false, 3.6), seg(B, C, "verde", false, 3.6), txt(iso(80, 70, 0), "α₁", "naranja", 21), txt(iso(80, 0, 70), "α₂", "azul", 21), txt(iso(0, 70, 70), "α₃", "verde", 21)] },
      { texto: "El triángulo $ABC$ es el **triángulo de trazas**: dos trazas bastan para definir el plano.", items: [poli([A, B, C], "morado", 0.15)] },
    ],
  };
};

const planosPart = (): Diagrama => ({
  label: "Planos paralelos a un eje y a un plano coordenado",
  pasos: [
    { texto: "Plano **paralelo al eje $X$**: dos trazas paralelas a $X$ y la tercera uniendo $B$ y $C$.", items: [...ejes(190), seg(iso(-20, 130, 0), iso(180, 130, 0), "naranja", false, 3.6), seg(iso(-20, 0, 120), iso(180, 0, 120), "azul", false, 3.6), seg(iso(0, 130, 0), iso(0, 0, 120), "verde", false, 3.6)] },
    { texto: "Plano **paralelo a $XOY$**: horizontal, de cota $OT$; sus trazas con los otros planos son paralelas a $X$ y a $Y$.", items: [poli([iso(0, 0, 90), iso(150, 0, 90), iso(150, 150, 90), iso(0, 150, 90)], "amarillo", 0.12), txt(iso(0, 0, 90), "T", "amarillo", 22)] },
  ],
});

const interseccionAxo = (): Diagrama => {
  const al = [iso(100, 0, 0), iso(0, 80, 0), iso(0, 0, 100)];
  const be = [iso(60, 0, 0), iso(0, 120, 0), iso(0, 0, 90)];
  const S1 = iso(100 / 3, 160 / 3, 0);
  const S2 = iso(-20, 0, 120);
  const S3 = iso(0, 20, 75);
  return {
    label: "Intersección de dos planos por sus trazas",
    pasos: [
      { texto: "Dos planos $\\alpha$ y $\\beta$ dados por sus **triángulos de trazas**.", items: [...ejes(190), poli(al, "naranja", 0.1), poli(be, "azul", 0.1)] },
      { texto: "Las trazas **del mismo nombre** se cortan en $S_1$, $S_2$ y $S_3$ (sobre cada plano coordenado).", items: [pt(S1, "S₁", "amarillo", 10, 20), pt(S2, "S₂", "amarillo", -34, -6), pt(S3, "S₃", "amarillo", 12, -6)] },
      { texto: "Unidos, definen la **recta intersección** $s$ de los dos planos.", items: [seg(S2, S1, "verde", false, 4)] },
    ],
  };
};

export const DIAGRAMAS_AXONOMETRICO: Record<string, Diagrama> = {
  "d14-triedro": triedro(), "d14-cuadro": cuadro(), "d14-reversible": reversible(), "d14-triangulo": triangulo(), "d14-notacion": notacion(), "d14-isometrico": isometrico(),
  "d14-escala": escala(), "d14-sin-reducir": sinReducir(), "d14-circunferencia": circunferencia(), "d14-puntos": puntosAux(), "d14-ovalo": ovalo(), "d14-rayados": rayados(),
  "d14-punto": puntoAxo(), "d14-recta": rectaAxo(), "d14-rectas-particulares": rectasPart(), "d14-plano": planoAxo(), "d14-planos-particulares": planosPart(), "d14-intersecciones": interseccionAxo(),
};
