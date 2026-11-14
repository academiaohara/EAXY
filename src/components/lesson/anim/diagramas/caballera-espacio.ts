import { arc, circ, fl, lin, poli, seg, txt, type Color, type Diagrama, type Item, type Pt } from "./engine";

/**
 * Dibujos del sistema de perspectiva caballera (tema 15) hechos sobre un modelo: cada punto se define por sus
 * coordenadas (x, y, z) y de ahí sale su perspectiva con los ejes X y Z en verdadera magnitud y el eje Y reducido.
 * Las vistas auxiliares (el cuadro de canto, el alzado, las figuras en verdadera forma) se dibujan al lado.
 * En cada paso se añade poco, y lo auxiliar se retira (`dura`) cuando ya no hace falta.
 */

type P3 = [number, number, number];

const K45 = Math.cos(Math.PI / 4);
const rad = (g: number) => (g * Math.PI) / 180;
const MU = 0.5;
/** Perspectiva caballera con el eje Y hacia abajo y a la izquierda: `phi` es el ángulo entre los ejes X e Y; `mu`, el coeficiente de reducción. */
const vista = (o: Pt, mu = MU, phi = 45) => (p: P3): Pt => [o[0] + p[0] - mu * p[1] * Math.cos(rad(phi)), o[1] - p[2] + mu * p[1] * Math.sin(rad(phi))];
type Vista = (p: P3) => Pt;
const V0 = vista([0, 0]);
const O3: P3 = [0, 0, 0];

const C_D: Color = "verde";
const C_1: Color = "naranja";
const C_2: Color = "azul";
const C_3: Color = "morado";
const AUX: Color = "gris";
const RES: Color = "rojo";

const pr1 = (p: P3): P3 => [p[0], p[1], 0];
const pr2 = (p: P3): P3 => [p[0], 0, p[2]];
const pr3 = (p: P3): P3 => [0, p[1], p[2]];
const mix = (a: P3, b: P3, t: number): P3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const p2 = (p: Pt, n?: string, c: Color = "blanco", dx = 12, dy = -8, s = 18): Item => ({ t: "pt", p, n, c, dx, dy, s, r: 4.6 });
const pA = (p: P3, n?: string, c: Color = C_D, dx = 12, dy = -8, f: Vista = V0): Item => p2(f(p), n, c, dx, dy);
const sA = (a: P3, b: P3, c: Color = C_D, d = false, w = 3, f: Vista = V0): Item => seg(f(a), f(b), c, d, w);
const rot = (p: Pt, s: string, c: Color, dx = 0, dy = 0, size = 18): Item => txt([p[0] + dx, p[1] + dy], s, c, size);
const rA = (p: P3, s: string, c: Color, dx = 0, dy = 0, size = 18, f: Vista = V0): Item => rot(f(p), s, c, dx, dy, size);

/** Los tres ejes: X y Z en verdadera magnitud, Y reducido. */
const ejes = (l = 190, f: Vista = V0): Item[] => {
  const o = f(O3);
  const ey = f([0, 1.5 * l, 0]);
  const ex = f([l, 0, 0]);
  const ez = f([0, 0, l * 0.85]);
  return [
    seg(o, ex, "blanco", false, 2.4), seg(o, ez, "blanco", false, 2.4), seg(o, ey, "blanco", false, 2.4),
    txt([ex[0] + 12, ex[1] + 8], "X", "blanco", 19), txt([ez[0], ez[1] - 6], "Z", "blanco", 19), txt([ey[0] - 4, ey[1] + 18], "Y", "blanco", 19), txt([o[0] - 13, o[1] - 5], "O", "blanco", 16),
  ];
};

/** Paralelepípedo de aristas a, b, c desde el origen, en alambre. */
const caja = (f: Vista, a: number, b: number, c: number, col: Color = AUX, w = 1.6): Item[] => {
  const q = (x: number, y: number, z: number) => f([x * a, y * b, z * c]);
  const v: [number, number, number][][] = [
    [[0, 0, 0], [1, 0, 0]], [[1, 0, 0], [1, 0, 1]], [[1, 0, 1], [0, 0, 1]], [[0, 0, 1], [0, 0, 0]],
    [[0, 1, 0], [1, 1, 0]], [[1, 1, 0], [1, 1, 1]], [[1, 1, 1], [0, 1, 1]], [[0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [0, 1, 0]], [[1, 0, 0], [1, 1, 0]], [[1, 0, 1], [1, 1, 1]], [[0, 0, 1], [0, 1, 1]],
  ];
  return v.map(([p, r]) => seg(q(...p!), q(...r!), col, false, w));
};

const alarga = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const arcoPts = (c: Pt, p: Pt, q: Pt): Pt[] => {
  const r = Math.hypot(p[0] - c[0], p[1] - c[1]);
  const a0 = Math.atan2(p[1] - c[1], p[0] - c[0]);
  let da = Math.atan2(q[1] - c[1], q[0] - c[0]) - a0;
  while (da > Math.PI) da -= 2 * Math.PI;
  while (da < -Math.PI) da += 2 * Math.PI;
  return Array.from({ length: 25 }, (_, i) => [c[0] + r * Math.cos(a0 + (da * i) / 24), c[1] + r * Math.sin(a0 + (da * i) / 24)] as Pt);
};
const corte = (a: Pt, b: Pt, c: Pt, d: Pt): Pt => {
  const r: Pt = [b[0] - a[0], b[1] - a[1]];
  const s: Pt = [d[0] - c[0], d[1] - c[1]];
  const t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / (r[0] * s[1] - r[1] * s[0]);
  return [a[0] + r[0] * t, a[1] + r[1] * t];
};

/* ───────────── 1. Fundamentos (págs. 136-137) ───────────── */

const fundamentos = (): Diagrama => {
  const x0 = 0, y0 = 0;
  const hh = 60;
  const o: Pt = [x0, y0];
  const Y1: Pt = [x0 - 120, y0];
  const P1: Pt = [x0, y0 + hh];
  const D: Pt = [330, 10];
  const f = vista(D);
  return {
    label: "Fundamentos: cómo se proyecta sobre el cuadro con una dirección oblicua",
    pasos: [
      { texto: "El plano $ZOX$ es el **plano del cuadro**. Aquí se ve **de canto** (la línea vertical) para entender el sistema. Los ejes $X$ y $Z$ están en el cuadro, y el eje $(Y)$ es **perpendicular** a él.", items: [txt([x0, -178], "En el espacio, de perfil", AUX, 15), seg([x0, -130], [x0, 130], C_2, false, 4), rot([x0, -130], "cuadro", C_2, 30, -6, 16), seg(o, [x0 - 165, y0], "blanco", false, 2.4), rot([x0 - 165, y0], "(Y)", "blanco", 0, -10), p2(o, "O", "blanco", 14, -8), p2(Y1, "(1)", "blanco", 0, -12)] },
      { texto: "Si se proyectara **ortogonalmente**, todo el eje $(Y)$ caería sobre el punto $O$ y no se vería. Por eso se elige una dirección de proyección **oblicua**, $d$, que forma un ángulo $\\sigma$ con el cuadro.", items: [fl(Y1, P1, C_1, 2.6), rot(alarga(Y1, P1, 0.45), "d", C_1, -10, 12), p2(P1, "1", C_1, 12, 18), arc(P1, 40, 90, 90 + (Math.atan(120 / hh) * 180) / Math.PI, C_D), rot(P1, "σ", C_D, -30, -22, 20)] },
      { texto: "El punto $(1)$ del eje se proyecta en $1$, y la recta $O1$ es el **eje $Y$ proyectado**: ya no coincide con $O$. Así aparece el tercer eje en el papel.", items: [seg(o, P1, RES, false, 4.6), p2(P1, "1", RES, 12, 18), rot(alarga(o, P1, 0.5), "eje Y proyectado", RES, 92, 4, 16), seg(Y1, o, AUX, true, 1.4)] },
      { texto: "En el papel quedan los ejes $X$ y $Z$, perpendiculares, y el eje $Y$ inclinado. El ángulo $\\varphi$ que forma con $X$ es el segundo dato del sistema.", items: [txt([D[0], -178], "En el dibujo", AUX, 15), seg(f(O3), f([190, 0, 0]), "blanco", false, 2.6), seg(f(O3), f([0, 0, 160]), "blanco", false, 2.6), seg(f(O3), f([0, 190, 0]), C_D, false, 3), rA([190, 0, 0], "X", "blanco", 12, 8, 18, f), rA([0, 0, 160], "Z", "blanco", 0, -6, 18, f), rA([0, 190, 0], "Y", C_D, -4, 18, 18, f), arc(f(O3), 46, 180, 225, C_D), rA(O3, "φ", C_D, -34, 26, 17, f)] },
    ],
  };
};

const punto = (): Diagrama => {
  const P: P3 = [125, 105, 115];
  const E = pr1(P), A = pr2(P), C = pr3(P);
  return {
    label: "Las cuatro proyecciones de un punto: la directa oblicua y las tres previas",
    pasos: [
      { texto: "Un punto $(P)$ del espacio y los ejes del sistema. Sus proyecciones ortogonales sobre los planos del triedro son las **proyecciones previas**.", items: [...ejes(210), pA(P, "P", C_D, 14, -8), ...[E, A, C].map((q) => sA(P, q, AUX, true, 1.5))] },
      { texto: "Sobre el plano $XOY$ se proyecta en $P'$, la proyección horizontal. Se dibuja con el eje $Y$ reducido.", items: [pA(E, "P′", C_1, 4, 22), sA(O3, [P[0], 0, 0], AUX, false, 1.6), sA([P[0], 0, 0], E, AUX, false, 1.6), sA(O3, [0, P[1], 0], AUX, false, 1.6), sA([0, P[1], 0], E, AUX, false, 1.6)] },
      { texto: "Sobre el plano $ZOX$, que es el cuadro, da $P''$: la proyección vertical. Está en verdadera magnitud.", items: [pA(A, "P″", C_2, 16, -4), sA(O3, [P[0], 0, 0], C_2, false, 3.4), sA([P[0], 0, 0], A, C_2, false, 3.4), sA(A, [0, 0, P[2]], C_2, false, 3.4), sA([0, 0, P[2]], O3, C_2, false, 3.4)] },
      { texto: "Y sobre el plano $ZOY$ da $P'''$: la proyección de perfil.", items: [pA(C, "P‴", C_3, -18, -6), sA(O3, [0, P[1], 0], C_3, false, 3.4), sA([0, P[1], 0], C, C_3, false, 3.4), sA(C, [0, 0, P[2]], C_3, false, 3.4)] },
      { texto: "El punto tiene **cuatro proyecciones**: la **directa oblicua** $P$, que es la perspectiva del punto, y las tres proyecciones $P'$, $P''$ y $P'''$ de las previas. Observa el paralelepípedo que se forma con los ejes.", items: [...caja(V0, P[0], P[1], P[2], C_D, 2), circ(V0(P), 9, C_D), circ(V0(E), 9, C_1), circ(V0(A), 9, C_2), circ(V0(C), 9, C_3)] },
    ],
  };
};

const notaciones = (): Diagrama => {
  const P: P3 = [125, 105, 115];
  const r1: P3 = [140, 40, 150], r2: P3 = [30, 130, 60];
  const pa: P3 = [150, 0, 0], pb: P3 = [0, 110, 0], pc: P3 = [0, 0, 120];
  return {
    label: "Notación de puntos, rectas y planos en caballera",
    pasos: [
      { texto: "**Punto**: $P\\text{-}P'\\text{-}P''\\text{-}P'''$. $P$ es la proyección directa oblicua; $P'$, la proyección sobre $XOY$; $P''$, sobre $ZOX$, y $P'''$, sobre $ZOY$.", dura: 1, base: ejes(210), items: [...[pr1(P), pr2(P), pr3(P)].map((q) => sA(P, q, AUX, true, 1.5)), pA(P, "P", C_D, 14, -8), pA(pr1(P), "P′", C_1, 4, 22), pA(pr2(P), "P″", C_2, 16, -4), pA(pr3(P), "P‴", C_3, -18, -6)] },
      { texto: "**Recta**: una letra minúscula, $r\\text{-}r'\\text{-}r''\\text{-}r'''$, con el mismo orden. Aquí, la directa $r$ y su proyección horizontal $r'$.", dura: 1, items: [sA(r1, r2, C_D, false, 3.4), sA(pr1(r1), pr1(r2), C_1, false, 3), sA(r1, pr1(r1), AUX, true, 1.4), sA(r2, pr1(r2), AUX, true, 1.4), rA(r1, "r", C_D, 12, -4), rA(pr1(r1), "r′", C_1, 12, 14)] },
      { texto: "**Plano**: una letra griega, $\\varphi(\\varphi_1\\text{-}\\varphi_2\\text{-}\\varphi_3)$, donde $\\varphi_1$, $\\varphi_2$ y $\\varphi_3$ son sus trazas con los planos $XOY$, $ZOX$ y $ZOY$.", items: [poli([V0(pa), V0(pb), V0(pc)], AUX, 0.1), sA(pa, pb, C_1, false, 3.4), sA(pa, pc, C_2, false, 3.4), sA(pb, pc, C_3, false, 3.4), rA(mix(pa, pb, 0.5), "φ₁", C_1, -6, 22), rA(mix(pa, pc, 0.5), "φ₂", C_2, 18, -4), rA(mix(pb, pc, 0.5), "φ₃", C_3, -18, -4)] },
    ],
  };
};

/* ───────────── 2. Datos del sistema (págs. 138-139) ───────────── */

const datos = (): Diagrama => {
  const a = 120;
  const cubo = (f: Vista): Item[] => [poli([f([0, 0, 0]), f([a, 0, 0]), f([a, 0, a]), f([0, 0, a])], C_2, 0.1), ...caja(f, a, a, a, AUX, 1.6), sA([0, 0, 0], [0, 0, a], C_2, false, 3, f), sA([0, 0, 0], [a, 0, 0], C_2, false, 3, f), sA([0, 0, a], [a, 0, a], C_2, false, 3, f), sA([a, 0, 0], [a, 0, a], C_2, false, 3, f), sA(O3, [0, a, 0], C_D, false, 3.4, f)];
  const f45 = vista([-50, 0], MU, 45), f30 = vista([-50, 0], MU, 30), f60 = vista([-50, 0], MU, 60);
  const pie = (f: Vista, t: string, c: Color): Item[] => [rot(f([a / 2, 0, -50]), t, c, 0, 0, 19)];
  return {
    label: "Datos del sistema: el ángulo φ entre los ejes X e Y, y el ángulo σ",
    pasos: [
      { texto: "El sistema se define con **dos datos**. El primero es el ángulo $\\varphi$ que forman en el dibujo los ejes $X$ e $Y$. La norma fija $\\varphi = 45°$: el cubo muestra su cara principal en verdadera forma y las otras dos algo deformadas.", dura: 1, items: [...cubo(f45), ...pie(f45, "φ = 45°", C_D), arc(f45(O3), 36, 180, 225, C_D)] },
      { texto: "Con $\\varphi = 30°$ el eje $Y$ queda más tendido: se ve más la cara de arriba y menos la lateral.", dura: 1, items: [...cubo(f30), ...pie(f30, "φ = 30°", C_D), arc(f30(O3), 36, 180, 210, C_D)] },
      { texto: "Con $\\varphi = 60°$ queda más erguido: se ve más la cara lateral. Se elige el valor que mejor muestre la pieza, aunque lo normal es 45°.", dura: 1, items: [...cubo(f60), ...pie(f60, "φ = 60°", C_D), arc(f60(O3), 36, 180, 240, C_D)] },
      { texto: "El segundo dato es el ángulo $\\sigma$ que forma con el cuadro la dirección de proyección: de él depende cuánto se reduce el eje $Y$. Es el tema de la siguiente lección.", items: [txt([0, -60], "φ  y  σ", C_D, 40), txt([0, -10], "definen el sistema", AUX, 17)] },
    ],
  };
};

const coeficiente = (): Diagrama => {
  const x0 = 0;
  const Y1: Pt = [x0 - 120, 0];
  const base: Item[] = [seg([x0, -140], [x0, 160], C_2, false, 4), rot([x0, -140], "cuadro, de canto", C_2, 20, -6, 16), seg([x0, 0], [x0 - 170, 0], "blanco", false, 2.4), p2([x0, 0], "O", "blanco", 14, -8), p2(Y1, "(1)", "blanco", 0, -12)];
  const h = (m: number): Pt => [x0, 120 * m];
  return {
    label: "Coeficiente de reducción: μ = cotg σ",
    pasos: [
      { texto: "Las rectas **paralelas al cuadro**, y por tanto a $X$ o a $Z$, se proyectan **en verdadera magnitud**. Las paralelas a $Y$ se proyectan cambiadas de tamaño. Aquí se mide el segmento real $O(1)$.", dura: 2, base, items: [seg([0, 0], Y1, C_D, false, 4.2), rot(alarga([0, 0], Y1, 0.5), "O(1) real", C_D, 0, 20, 16)] },
      { texto: "La dirección $d$ proyecta $(1)$ en $1$ sobre el cuadro. $O1$ es lo que mide ese segmento en el dibujo, y se forma el triángulo rectángulo $(1)$-$O$-$1$.", items: [fl(Y1, h(0.5), C_1, 2.6), p2(h(0.5), "1", C_1, 14, 16), seg([0, 0], h(0.5), RES, false, 4.2), arc(h(0.5), 40, 90, 90 + (Math.atan(2) * 180) / Math.PI, C_D), rot(h(0.5), "σ", C_D, -26, -14, 17), rot(alarga([0, 0], h(0.5), 0.5), "O1", RES, 22, 4, 16)] },
      { texto: "El **coeficiente de reducción** es la razón entre lo que mide el segmento en el dibujo y lo que mide en realidad: $\\mu = O1 / O(1) = \\cot\\sigma$. Con $\\sigma = 63{,}4°$ resulta $\\mu = 0{,}5$: el eje $Y$ se dibuja a la mitad.", dura: 1, items: [txt([95, 40], "μ = O1 / O(1) = cotg σ", RES, 18)] },
      { texto: "Si $\\sigma = 45°$, $\\mu = 1$ y no hay reducción. Si $\\sigma < 45°$, $\\mu > 1$: **ampliaría** el eje, y la perspectiva saldría irreal. Si $\\sigma > 45°$, $\\mu < 1$: se reduce. Lo normal es $\\sigma = 60°$ o más; la norma UNE 1031 fija $\\mu = 0{,}5$.", base: [], items: [fl(Y1, h(1), C_3, 2.2), fl(Y1, h(1.5), RES, 2.2), rot(h(1), "σ = 45°, μ = 1", C_3, 108, 0, 15), rot(h(1.5), "σ < 45°, μ > 1", RES, 108, 8, 15), rot(h(0.5), "σ > 45°, μ < 1", C_1, 108, -6, 15)] },
    ],
  };
};

const muCubos = (): Diagrama => {
  const a = 100;
  const f1 = vista([-210, 0], 1), f5 = vista([60, 0], 0.5);
  const cubo = (f: Vista, c: Color): Item[] => [poli([f([0, 0, 0]), f([a, 0, 0]), f([a, 0, a]), f([0, 0, a])], c, 0.1), ...caja(f, a, a, a, c, 1.8)];
  return {
    label: "Un cubo con μ = 1 y con μ = 0,5",
    pasos: [
      { texto: "Con $\\mu = 1$ el eje $Y$ no se reduce: el cubo sale **demasiado profundo** y parece deformado, un paralelepípedo alargado hacia atrás.", items: [...cubo(f1, RES), txt([f1([a / 2, 0, -52])[0], f1([a / 2, 0, -52])[1]], "μ = 1", RES, 19)] },
      { texto: "Con $\\mu = 0{,}5$ la profundidad se reduce a la mitad y el cubo se ve **natural**. Por eso la norma fija este valor.", items: [...cubo(f5, C_D), txt([f5([a / 2, 0, -52])[0], f5([a / 2, 0, -52])[1]], "μ = 0,5", C_D, 19)] },
    ],
  };
};

/* ───────────── 3. Punto (págs. 139-140) ───────────── */

const puntoCab = (): Diagrama => {
  const P: P3 = [120, 100, 100];
  const N: P3 = [P[0], 0, 0], M: P3 = [0, 0, P[2]], L: P3 = [0, P[1], 0];
  return {
    label: "Representación del punto P(x, y, z) en perspectiva caballera",
    pasos: [
      { texto: "El punto $P$ tiene tres coordenadas, $x$, $y$ y $z$. La coordenada $x$ se lleva sobre el eje $X$ en **verdadera magnitud**: se obtiene $N$.", items: [...ejes(210), sA(O3, N, C_2, false, 4), pA(N, "N", "blanco", 6, 20), rA(mix(O3, N, 0.5), "x", C_2, 0, 22)] },
      { texto: "La coordenada $z$, igual: sobre el eje $Z$, también en verdadera magnitud. Se obtiene $M$.", items: [sA(O3, M, C_2, false, 4), pA(M, "M", "blanco", -14, 4), rA(mix(O3, M, 0.5), "z", C_2, -14, 0)] },
      { texto: "La coordenada $y$ hay que **reducirla**: sobre el eje $Y$ se lleva $\\mu \\cdot y$, aquí la mitad. Se obtiene $L$.", items: [sA(O3, L, C_1, false, 4), pA(L, "L", "blanco", -6, -12), rA(mix(O3, L, 0.5), "μ·y", C_1, 22, 8)] },
      { texto: "Con paralelas a los ejes se obtienen las proyecciones: $P'$ completa el rectángulo de $N$ y $L$ en el plano $XOY$; $P''$, el de $N$ y $M$ en el cuadro, y $P'''$, el de $L$ y $M$.", items: [sA(N, pr1(P), AUX, false, 1.6), sA(L, pr1(P), AUX, false, 1.6), sA(N, pr2(P), AUX, false, 1.6), sA(M, pr2(P), AUX, false, 1.6), sA(L, pr3(P), AUX, false, 1.6), sA(M, pr3(P), AUX, false, 1.6), pA(pr1(P), "P′", C_1, 4, 22), pA(pr2(P), "P″", C_2, 16, -4), pA(pr3(P), "P‴", C_3, -18, -6)] },
      { texto: "Completando el paralelepípedo se obtiene la proyección directa $P$, que es la perspectiva del punto.", items: [sA(pr1(P), P, AUX, true, 1.5), sA(pr2(P), P, AUX, true, 1.5), sA(pr3(P), P, AUX, true, 1.5), pA(P, "P", C_D, 14, -8)] },
    ],
  };
};

const pasoDiedrico = (): Diagrama => {
  const P: P3 = [100, 90, 100];
  const Od: Pt = [-250, 50];
  const f = vista([90, 40]);
  const dx = (x: number): number => Od[0] + x;
  return {
    label: "Paso del sistema diédrico a la perspectiva caballera",
    pasos: [
      { texto: "Un punto dado en **diédrico**, con sus proyecciones $P'$-$P''$, y referido a un plano de perfil. Sus coordenadas son: $x$, la distancia al origen $O$ sobre la L.T.; $y$, el alejamiento de $P'$, y $z$, la cota de $P''$.", items: [txt([Od[0] + 70, -105], "En diédrico", AUX, 15), seg([Od[0] - 40, Od[1]], [Od[0] + 170, Od[1]], "blanco", false, 2.4), p2(Od, "O", "blanco", -12, -8), seg([dx(P[0]), Od[1] - P[2]], [dx(P[0]), Od[1] + P[1]], AUX, true, 1.5), p2([dx(P[0]), Od[1] - P[2]], "P″", C_2, 16, -4), p2([dx(P[0]), Od[1] + P[1]], "P′", C_1, 16, 14), rot([dx(P[0]) + 6, Od[1] - P[2] / 2], "z", C_2, 8, 0), rot([dx(P[0]) + 6, Od[1] + P[1] / 2], "y", C_1, 8, 0), rot([dx(P[0] / 2), Od[1]], "x", "blanco", 0, 18)] },
      { texto: "En **caballera** se dibujan los ejes y se lleva $x$ sobre el eje $X$ y $z$ sobre el eje $Z$, en **verdadera magnitud**: se obtienen $N$ y $M$.", items: [txt([f(O3)[0] + 60, -105], "En caballera", AUX, 15), ...ejes(190, f), sA(O3, [P[0], 0, 0], C_2, false, 4, f), sA(O3, [0, 0, P[2]], C_2, false, 4, f), pA([P[0], 0, 0], "N", "blanco", 6, 20, f), pA([0, 0, P[2]], "M", "blanco", -14, 4, f)] },
      { texto: "La coordenada $y$ se lleva sobre el eje $Y$ **reducida**: $OB = \\mu \\cdot y$.", items: [sA(O3, [0, P[1], 0], C_1, false, 4, f), pA([0, P[1], 0], "B", "blanco", -6, -12, f)] },
      { texto: "Con $ON$, $OB$ y $OM$ se completa el paralelepípedo y se obtienen $P$, $P'$, $P''$ y $P'''$.", items: [...caja(f, P[0], P[1], P[2], AUX, 1.5), pA(P, "P", C_D, 14, -8, f), pA(pr1(P), "P′", C_1, 4, 22, f), pA(pr2(P), "P″", C_2, 16, -4, f), pA(pr3(P), "P‴", C_3, -18, -6, f)] },
    ],
  };
};

/* ───────────── 4. Distancias (págs. 140-141) ───────────── */

const distancia1 = (): Diagrama => {
  const A: P3 = [40, 0, 0], B: P3 = [40, 0, 120];
  const C: P3 = [90, 0, 90], D: P3 = [190, 0, 90];
  const E: P3 = [90, 30, 0], F: P3 = [90, 130, 0];
  return {
    label: "Distancia entre dos puntos: segmentos paralelos a los ejes",
    pasos: [
      { texto: "Un segmento **paralelo al eje $Z$**, como $AB$, y otro **paralelo al eje $X$**, como $CD$, están en el cuadro o paralelos a él: se proyectan en **verdadera magnitud**. Su distancia se mide directamente.", dura: 1, base: ejes(210), items: [sA(A, B, C_2, false, 4), sA(C, D, C_2, false, 4), pA(A, "A", "blanco", 14, 6), pA(B, "B", "blanco", 14, -4), pA(C, "C", "blanco", -6, -12), pA(D, "D", "blanco", 6, -12), rA(mix(A, B, 0.5), "AB real", C_2, 38, 0, 16), rA(mix(C, D, 0.5), "CD real", C_2, 0, -14, 16)] },
      { texto: "Un segmento **paralelo al eje $Y$**, como $EF$, se proyecta **reducido**: en el dibujo mide $\\mu$ veces lo que mide en realidad.", items: [sA(E, F, C_1, false, 4), pA(E, "E", "blanco", 12, -8), pA(F, "F", "blanco", -12, 14), rA(mix(E, F, 0.5), "EF", C_1, 14, 20, 16)] },
      { texto: "Para hallar su **verdadera magnitud** se divide entre $\\mu$: con $\\mu = 0{,}5$, el doble. Llevada sobre el eje $Y$, desde $O$, queda el segmento $H = EF / \\mu$.", items: [sA(O3, [0, 2 * (F[1] - E[1]), 0], RES, false, 4.4), pA([0, 2 * (F[1] - E[1]), 0], "H", RES, -4, 20), rA(mix(O3, [0, 2 * (F[1] - E[1]), 0], 0.5), "H = EF / μ", RES, -42, -4, 16)] },
    ],
  };
};

const distancia2 = (): Diagrama => {
  const N: P3 = [30, 0, 0], T: P3 = [150, 0, 0], B: P3 = [150, 100, 0];
  const f = vista([-130, -30]);
  const o: Pt = [250, -10];
  const long = 2 * (B[1] - T[1]) * MU;
  return {
    label: "Distancia entre dos puntos del plano XOY: triángulo rectángulo",
    pasos: [
      { texto: "Los puntos $N$ y $B$ están en el plano $XOY$. El segmento $NB$ es la hipotenusa del triángulo $NTB$: el cateto $NT$ es paralelo a $X$, en **verdadera magnitud**, y $TB$ es paralelo a $Y$, **reducido**.", items: [...ejes(170, f), sA(N, T, C_2, false, 4, f), sA(T, B, C_1, false, 4, f), sA(N, B, RES, true, 2.4, f), pA(N, "N", "blanco", -12, 18, f), pA(T, "T", "blanco", 10, 20, f), pA(B, "B", "blanco", -14, 14, f)] },
      { texto: "Para hallar la verdadera forma del triángulo se deshace la reducción: el cateto $TB$ **se duplica** (se divide entre $\\mu$). Los dos catetos forman un ángulo recto: se dibuja aparte.", items: [txt([o[0] + 55, -105], "Verdadera forma", AUX, 15), seg([o[0], o[1] + 40], [o[0] + (T[0] - N[0]), o[1] + 40], C_2, false, 4), seg([o[0] + (T[0] - N[0]), o[1] + 40], [o[0] + (T[0] - N[0]), o[1] + 40 + 2 * (B[1] - T[1]) * MU * 1.0], C_1, false, 4), p2([o[0], o[1] + 40], "N", "blanco", -12, 6), p2([o[0] + (T[0] - N[0]), o[1] + 40], "T", "blanco", 14, -6), p2([o[0] + (T[0] - N[0]), o[1] + 40 + long], "B", "blanco", 14, 6), rot([o[0] + 55, o[1] + 40], "NT", C_2, 0, 18, 16), rot([o[0] + (T[0] - N[0]), o[1] + 40 + long / 2], "TB / μ", C_1, 40, 4, 16)] },
      { texto: "La **hipotenusa** de ese triángulo es la distancia real $D$ entre $N$ y $B$. Si el segmento es oblicuo a los planos del sistema, se repite el proceso con la diferencia de cotas como segundo cateto.", items: [poli([[o[0], o[1] + 40], [o[0] + (T[0] - N[0]), o[1] + 40], [o[0] + (T[0] - N[0]), o[1] + 40 + long]], RES, 0.1), seg([o[0], o[1] + 40], [o[0] + (T[0] - N[0]), o[1] + 40 + long], RES, false, 4.4), rot([o[0] + 55, o[1] + 40 + long / 2], "D", RES, -18, -6, 20)] },
    ],
  };
};

const figuras = (): Diagrama => {
  const w = 150, hh = 100;
  const f = vista([40, -hh * 0.45]);
  const t0: Pt = [-250, -50];
  const T = (u: number, v: number): Pt => [t0[0] + u, t0[1] + v];
  const A: [number, number] = [55, 0], B: [number, number] = [0, hh], C: [number, number] = [w, hh];
  return {
    label: "Perspectiva de figuras planas del plano XOY: x en verdadera magnitud, y reducida",
    pasos: [
      { texto: "En su **verdadera forma**, un triángulo $ABC$ inscrito en un rectángulo $NMPQ$. El eje $X$ es horizontal y $Y$ baja, como en la planta.", items: [txt([t0[0] + w / 2, -105], "Verdadera forma", AUX, 15), poli([T(0, 0), T(w, 0), T(w, hh), T(0, hh)], AUX, 0.06), poli([T(...A), T(...B), T(...C)], C_1, 0.14), p2(T(...A), "A", C_1, 0, -12), p2(T(...B), "B", C_1, -12, 14), p2(T(...C), "C", C_1, 12, 14)] },
      { texto: "En caballera, en el plano $XOY$, el **rectángulo** se proyecta en un **paralelogramo**: los lados paralelos a $X$ se dibujan en verdadera magnitud y los paralelos a $Y$, reducidos.", items: [txt([f([w / 2, 0, 0])[0] + 10, -105], "En caballera", AUX, 15), ...ejes(190, f), poli([f([0, 0, 0]), f([w, 0, 0]), f([w, hh, 0]), f([0, hh, 0])], AUX, 0.06)] },
      { texto: "El **triángulo** se dibuja punto a punto: cada vértice se lleva con sus coordenadas $x$ (entera) e $y$ (reducida) y se unen.", items: [poli([f([A[0], A[1], 0]), f([B[0], B[1], 0]), f([C[0], C[1], 0])], C_1, 0.14), pA([A[0], A[1], 0], "A", C_1, 0, -12, f), pA([B[0], B[1], 0], "B", C_1, -12, 14, f), pA([C[0], C[1], 0], "C", C_1, 12, 14, f)] },
    ],
  };
};

const hexagonos = (): Diagrama => {
  const R = 66;
  const hex = (c: P3, e1: P3, e2: P3): P3[] => Array.from({ length: 6 }, (_, i) => {
    const a = rad(60 * i);
    return [c[0] + R * Math.cos(a) * e1[0] + R * Math.sin(a) * e2[0], c[1] + R * Math.cos(a) * e1[1] + R * Math.sin(a) * e2[1], c[2] + R * Math.cos(a) * e1[2] + R * Math.sin(a) * e2[2]] as P3;
  });
  const una = (c: P3, e1: P3, e2: P3, col: Color): Item[] => {
    const h6 = hex(c, e1, e2);
    return [poli(h6.map((q) => V0(q)), col, 0.14), seg(V0(h6[0]!), V0(h6[3]!), col, true, 1.4), seg(V0(h6[1]!), V0(h6[4]!), col, true, 1.4), seg(V0(h6[2]!), V0(h6[5]!), col, true, 1.4)];
  };
  return {
    label: "Un hexágono regular en cada plano del sistema",
    pasos: [
      { texto: "En el plano $ZOX$ (el cuadro) el hexágono se ve **en verdadera forma**, con sus lados y diagonales iguales.", items: [...ejes(230), ...una([160, 0, 150], [1, 0, 0], [0, 0, 1], C_2)] },
      { texto: "En el plano $XOY$ los lados y diagonales paralelos a $X$ conservan su medida; los demás se acortan y se inclinan: el hexágono se **deforma**.", items: una([140, 120, 0], [1, 0, 0], [0, 1, 0], C_1) },
      { texto: "En el plano $ZOY$ pasa lo mismo con los segmentos paralelos a $Z$ y a $Y$: los paralelos a $Z$ se conservan y los demás cambian.", items: una([0, 120, 150], [0, 1, 0], [0, 0, 1], C_3) },
    ],
  };
};

const curvas = (): Diagrama => {
  const xs = Array.from({ length: 9 }, (_, i) => i * 22);
  const ys = xs.map((x) => 50 + 38 * Math.sin(x / 38));
  const t0: Pt = [-250, -40];
  const f = vista([40, -60]);
  const verd = xs.map((x, i): Pt => [t0[0] + x, t0[1] + ys[i]!]);
  const cab = xs.map((x, i): Pt => f([x, ys[i]!, 0]));
  return {
    label: "Curva de un plano horizontal en perspectiva caballera, punto a punto",
    pasos: [
      { texto: "Una curva dada en verdadera forma sobre un plano horizontal. Se toman varios puntos y la distancia de cada uno al eje $X$: su ordenada.", items: [txt([t0[0] + 90, -105], "Verdadera forma", AUX, 15), seg([t0[0] - 10, t0[1]], [t0[0] + 190, t0[1]], "blanco", false, 2.4), lin(verd, C_2, false, 3.4), ...verd.map((p, i) => p2(p, undefined, i % 2 === 0 ? C_2 : AUX, 0, 0, 0)), ...verd.filter((_, i) => i % 2 === 0).map((p) => seg([p[0], t0[1]], p, AUX, true, 1.4))] },
      { texto: "En caballera se pasan los puntos **uno a uno**: las abscisas (paralelas a $X$) se conservan y las ordenadas, paralelas a $Y$, se **reducen** según $\\mu$.", items: [txt([f([90, 0, 0])[0] + 20, -105], "En caballera", AUX, 15), ...ejes(190, f), ...xs.filter((_, i) => i % 2 === 0).map((x, k) => seg(f([x, 0, 0]), f([x, ys[2 * k]!, 0]), AUX, true, 1.4)), ...cab.filter((_, i) => i % 2 === 0).map((p) => p2(p, undefined, C_1, 0, 0, 0))] },
      { texto: "Se unen los puntos obtenidos: la curva queda **deformada**, más estrecha en profundidad que la original.", items: [lin(cab, C_1, false, 3.6)] },
    ],
  };
};

/* ───────────── 5. La circunferencia (págs. 143-144) ───────────── */

const circunferencia = (): Diagrama => {
  const R = 58;
  const punt = (c: P3, e1: P3, e2: P3, t: number): P3 => [c[0] + R * (Math.cos(t) * e1[0] + Math.sin(t) * e2[0]), c[1] + R * (Math.cos(t) * e1[1] + Math.sin(t) * e2[1]), c[2] + R * (Math.cos(t) * e1[2] + Math.sin(t) * e2[2])];
  const curva = (c: P3, e1: P3, e2: P3): Pt[] => Array.from({ length: 73 }, (_, i) => V0(punt(c, e1, e2, (i / 72) * 2 * Math.PI)));
  const marco = (c: P3, e1: P3, e2: P3, col: Color): Item[] => {
    const q = (a: number, b: number): P3 => [c[0] + R * (a * e1[0] + b * e2[0]), c[1] + R * (a * e1[1] + b * e2[1]), c[2] + R * (a * e1[2] + b * e2[2])];
    return [poli([V0(q(1, 1)), V0(q(1, -1)), V0(q(-1, -1)), V0(q(-1, 1))], col, 0.06), seg(V0(q(-1, 0)), V0(q(1, 0)), col, true, 1.4), seg(V0(q(0, -1)), V0(q(0, 1)), col, true, 1.4)];
  };
  const cZ: P3 = [150, 0, 140], cX: P3 = [130, 130, 0], cY: P3 = [0, 130, 140];
  return {
    label: "La circunferencia en los tres planos: círculo en ZOX y elipses en XOY y ZOY",
    pasos: [
      { texto: "En el plano $ZOX$, el del cuadro, la circunferencia se proyecta **igual**, con su radio $R$ y su cuadrado circunscrito.", items: [...ejes(230), ...marco(cZ, [1, 0, 0], [0, 0, 1], C_2), lin(curva(cZ, [1, 0, 0], [0, 0, 1]), C_2, false, 3.6)] },
      { texto: "En el plano $XOY$ es una **elipse**. Se hace con dos diámetros conjugados: $CD$, paralelo a $X$, que mide $2R$, y $AB$, paralelo a $Y$ y reducido, que mide $2\\mu R$. El cuadrado circunscrito se convierte en un romboide.", items: [...marco(cX, [1, 0, 0], [0, 1, 0], C_1), lin(curva(cX, [1, 0, 0], [0, 1, 0]), C_1, false, 3.6)] },
      { texto: "En el plano $ZOY$ se hace igual: $AB$ paralelo a $Z$ sin reducir y $CD$ paralelo a $Y$ reducido. La elipse se traza a mano alzada, tangente al romboide en los extremos de los diámetros.", items: [...marco(cY, [0, 1, 0], [0, 0, 1], C_3), lin(curva(cY, [0, 1, 0], [0, 0, 1]), C_3, false, 3.6)] },
    ],
  };
};

const ovalo = (): Diagrama => {
  const R = 80;
  const f = vista([0, 0], 1);
  const o: Pt = [0, 0];
  const u: Pt = [R, 0];
  const v: Pt = [-R * K45, R * K45];
  const q = (a: number, b: number): Pt => [o[0] + a * u[0] + b * v[0], o[1] + a * u[1] + b * v[1]];
  const ang = (g: number): Pt => [Math.cos(rad(g)), Math.sin(rad(g))];
  const nrm = (p: Pt, d: Pt, g: number, long: number): Pt => [p[0] + long * (-d[1]) * g, p[1] + long * d[0] * g];
  void f;
  const dv: Pt = [v[0] / R, v[1] / R];
  const du: Pt = [1, 0];
  const norU: Pt = [-dv[1], dv[0]];
  const norV: Pt = [-du[1], du[0]];
  /* Centros: corte de las normales en dos puntos de tangencia consecutivos. */
  const cen = (p1: Pt, n1: Pt, p2_: Pt, n2: Pt): Pt => corte(p1, [p1[0] + n1[0], p1[1] + n1[1]], p2_, [p2_[0] + n2[0], p2_[1] + n2[1]]);
  const Aa = q(0, -1), Bb = q(0, 1), Cc = q(-1, 0), Dd = q(1, 0);
  const C1 = cen(Cc, norU, Aa, norV), C2 = cen(Aa, norV, Dd, norU), C3 = cen(Dd, norU, Bb, norV), C4 = cen(Bb, norV, Cc, norU);
  void ang; void nrm;
  const ext = (p: Pt, n: Pt, k: number): Item => seg(alarga(p, [p[0] + n[0] * 1, p[1] + n[1] * 1], -k), alarga(p, [p[0] + n[0], p[1] + n[1]], k), AUX, false, 1.4);
  return {
    label: "Óvalo en lugar de elipse cuando no hay reducción (μ = 1)",
    pasos: [
      { texto: "Con $\\mu = 1$ el eje $Y$ no se reduce y la elipse puede **sustituirse por un óvalo**. Se parte del romboide que se forma con los diámetros conjugados, de longitud $2R$ los dos, y de sus puntos de tangencia $A$, $B$, $C$ y $D$.", items: [poli([q(1, 1), q(1, -1), q(-1, -1), q(-1, 1)], AUX, 0.06), seg(Aa, Bb, AUX, true, 1.4), seg(Cc, Dd, AUX, true, 1.4), p2(Aa, "A", C_2, 10, -8), p2(Bb, "B", C_2, -12, 18), p2(Cc, "C", C_2, -14, 6), p2(Dd, "D", C_2, 14, 6), p2(o, undefined, "blanco")] },
      { texto: "Por cada punto de tangencia se traza la **normal** al lado del romboide: la perpendicular. En los puntos $A$ y $B$ son verticales; en $C$ y $D$, perpendiculares a los lados inclinados.", items: [ext(Aa, norV, 80), ext(Bb, norV, 80), ext(Cc, norU, 80), ext(Dd, norU, 80)] },
      { texto: "Las normales de dos puntos de tangencia consecutivos se cortan en los **centros** $C_1$, $C_2$, $C_3$ y $C_4$ de los cuatro arcos.", items: [p2(C1, "C₁", RES, -16, -8), p2(C2, "C₂", RES, 16, -8), p2(C3, "C₃", RES, 16, 18), p2(C4, "C₄", RES, -16, 18)] },
      { texto: "Con el compás, centro en $C_1$ se traza el arco $CA$; en $C_2$, el arco $AD$; en $C_3$, el arco $DB$, y en $C_4$, el arco $BC$. Los cuatro arcos son tangentes entre sí y forman el óvalo.", items: [lin(arcoPts(C1, Cc, Aa), C_1, false, 3.8), lin(arcoPts(C2, Aa, Dd), C_1, false, 3.8), lin(arcoPts(C3, Dd, Bb), C_D, false, 3.8), lin(arcoPts(C4, Bb, Cc), C_D, false, 3.8)] },
    ],
  };
};

/* ───────────── 6. Piezas ───────────── */

const pieza = (): Diagrama => {
  const prof: [number, number][] = [[0, 0], [130, 0], [130, 45], [50, 45], [50, 110], [0, 110]];
  const d = 100;
  const f = vista([50, 20]);
  const al = (a: number, c: number): Pt => [-260 + a, 40 - c];
  const fr = (y: number): Pt[] => prof.map(([a, c]) => f([a, y, c]));
  return {
    label: "Perspectiva caballera de una pieza: la cara con más detalle, en verdadera forma",
    pasos: [
      { texto: "Antes de dibujar, se estudian las **vistas diédricas** de la pieza. Aquí, su perfil (alzado): una pieza en forma de L que se extiende **100 de profundidad**.", items: [txt([-195, -105], "Alzado", AUX, 15), poli(prof.map(([a, c]) => al(a, c)), C_2, 0.12), rot(al(65, -4), "130", "blanco", 0, 22, 15), rot(al(-4, 55), "110", "blanco", -24, 0, 15)] },
      { texto: "En caballera, la cara con **más detalle** se coloca **paralela al cuadro**: se copia en **verdadera forma**, con las medidas de $X$ y $Z$ sin reducir.", items: [txt([f([65, 0, 0])[0] - 30, -105], "En caballera", AUX, 15), ...ejes(230, f), poli(fr(0), C_2, 0.14)] },
      { texto: "Desde cada vértice se trazan las **aristas de profundidad**, paralelas al eje $Y$. Se dibujan con su longitud **reducida**: $\\mu \\cdot 100 = 50$.", items: [...prof.map(([a, c]) => sA([a, 0, c], [a, d, c], AUX, false, 1.6, f))] },
      { texto: "Se copia la cara posterior, igual que la delantera y desplazada, y se remata la pieza uniendo los extremos de las aristas.", items: [poli(fr(d), C_1, 0.1)] },
    ],
  };
};

export const DIAGRAMAS_CABALLERA_ESPACIO: Record<string, Diagrama> = {
  "d15-fundamentos": fundamentos(), "d15-punto": punto(), "d15-notaciones": notaciones(), "d15-datos": datos(), "d15-coeficiente": coeficiente(), "d15-mu-cubos": muCubos(),
  "d15-punto-cab": puntoCab(), "d15-paso-diedrico": pasoDiedrico(), "d15-distancia-1": distancia1(), "d15-distancia-2": distancia2(),
  "d15-figuras": figuras(), "d15-hexagonos": hexagonos(), "d15-curvas": curvas(), "d15-circunferencia": circunferencia(), "d15-ovalo": ovalo(), "d15-pieza": pieza(),
};
