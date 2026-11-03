import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 15 (perspectiva caballera): φ = 45° y coeficiente de reducción μ = 0,5 (norma UNE 1031).
 * El plano ZOX es el del cuadro: los ejes X (horizontal) y Z (vertical) están en verdadera magnitud y el eje Y,
 * a 45°, hacia abajo y a la izquierda, reduce las medidas a la mitad.
 */

export const ETIQUETAS_CABALLERA: Record<string, string> = {
  cO: "O", cX: "X", cY: "Y", cZ: "Z", cN: "N", cL: "L", cM: "M", cP1: "P'", cP2: "P''", cP3: "P'''", cP4: "P",
  cE: "E", cF: "F", cG: "G", cB: "B", cC: "C", cA: "A", cXa: "", cY1: "", cEd: "", cFd: "", cGd: "", cm: "M", crP1: "", crP2: "",
  cD: "D", cCt: "C", cAt: "A", cBt: "B", cPm: "", cQm: "", cM2: "", cN2: "", cY1r: "",
  dN: "N", dB: "B", dT: "", dU: "", dV: "", dW1: "", dW2: "", dUe: "", dV2: "", dW3: "", dW4: "", dU2: "", dU2e: "",
  hA: "A", hB: "B", hC: "C", hD: "D", hE: "E", hF: "F", hXr: "", hXl: "", 
  oA: "A", oB: "B", oC: "C", oD: "D", o1: "C₁", o2: "C₂", o3: "C₃", o4: "C₄", oa1: "", oa2: "", ob1: "", ob2: "", oc1: "", oc2: "", od1: "", od2: "",
  vP1: "1", vP2: "2", vP3: "3", vP4: "4", vP5: "5", vf1: "", vf2: "", vf3: "", vf4: "", vc1: "1", vc2: "2", vc3: "3", vc4: "4", vc5: "5", vg1: "", vg2: "", vg3: "", vg4: "", vg5: "",
  abN: "N", abB: "B", abNx: "", abBx: "", abN0: "N₀", abB0: "B₀", ab1: "1", abV1: "", abV2: "(1)₀", abV: "",
  hl1: "A", hl2: "B", hl3: "C", hl4: "D", hm1: "1", hm2: "1", hn1: "2", hn2: "2", hn3: "2", hn4: "2", hp1: "P", hp2: "Q", hp3: "R", hp4: "S", hv1: "", hv2: "", hv3: "", hv4: "",
  zA: "A", zB: "B", zC: "C", zD: "D", zP: "", zQ: "", zR: "", zS: "", zCen: "O'",
  kAx: "", kAy: "", kAz: "", kXY: "", kTx: "", kTy: "", kTxy: "",
};

const rad = (d: number) => (d * Math.PI) / 180;
const O: P = [300, 200];
const MU = 0.5;
const C45 = Math.cos(rad(45));
/** Proyección caballera de un punto de coordenadas (x, y, z): x y z en verdadera magnitud, y reducida por μ. */
const cab = (x: number, y: number, z: number, o: P = O): P => [o[0] + x - MU * y * C45, o[1] - z + MU * y * C45];
const EJES: Record<string, P> = { cO: O, cX: [560, O[1]], cY: cab(0, 300, 0), cZ: [O[0], 30] };
const EJES_BASE: [string, string][] = [["cO", "cX"], ["cO", "cY"], ["cO", "cZ"]];

function dato(id: string, largo: number, y: number, color?: "azul" | "ambar") {
  const pts: Record<string, P> = { [`${id}1`]: [24, y], [`${id}2`]: [24 + largo, y] };
  const d: Dato = { a: `${id}1`, b: `${id}2`, nombre: id, color };
  return { pts, d };
}
const marcaArco = (c: string, hacia: string): Op[] => [{ k: "arco", c, hacia }, { k: "marca", p: hacia }];

/** Fig. 2: el eje Y forma con X el ángulo φ = 45°, que se traza con la escuadra. */
function ejes(): Construccion {
  const y1 = cab(0, 100, 0);
  const d = dato("d", 50, 70, "ambar");
  return {
    titulo: "Los ejes de la perspectiva caballera",
    intro: "En la caballera los ejes $X$ y $Z$ son **perpendiculares** y están en verdadera magnitud (el plano $ZOX$ es el del cuadro); el eje $Y$ forma con $X$ el ángulo $\\varphi$, que la norma UNE 1031 fija en **45°**. Traza el eje $Y$ con la escuadra y lleva sobre él una medida (ya reducida).",
    pts: { ...d.pts, cO: O, cX: EJES.cX, cZ: EJES.cZ, cY1: y1 },
    dados: ["cO", "cX", "cZ", d.d.a, d.d.b],
    datos: [d.d],
    base: [["cO", "cX"], ["cO", "cZ"]],
    radioMin: 40,
    ops: [
      { k: "angulo", v: "cO", base: 180, obj: 45, signo: 1, largo: 230 },
      { k: "medir", de: d.d.a, a: d.d.b }, { k: "arco", c: "cO", hacia: "cY1" }, { k: "marca", p: "cY1" },
    ],
  };
}

/** Pág. 139: coeficiente de reducción μ = 1/2: las medidas sobre Y se reducen a la mitad. */
function reduccion(): Construccion {
  const dy = 200;
  const largo = 100;
  const d = dato("y", largo, dy, "ambar");
  const y1 = cab(0, largo, 0);
  const mx = 24 + largo / 2;
  const alto = (Math.sqrt(3) / 2) * largo;
  return {
    titulo: "Reducir una medida del eje Y",
    intro: "Las medidas sobre el eje $Y$ se **reducen** según el coeficiente $\\mu = \\cot\\sigma$; con $\\sigma \\approx 63{,}4°$, $\\mu = 1/2$. Para reducir la profundidad $y$ a la mitad se halla su **punto medio** con la mediatriz y se lleva esa medida sobre el eje $Y$ desde $O$.",
    pts: { ...d.pts, cm: [mx, dy], crP1: [mx, dy - alto], crP2: [mx, dy + alto], ...EJES, cY1: y1 },
    dados: ["cO", "cX", "cY", "cZ", d.d.a, d.d.b],
    datos: [d.d],
    base: EJES_BASE,
    radioMin: 40,
    ops: [
      { k: "medir", de: d.d.a, a: d.d.b },
      { k: "arco", c: d.d.a, hacia: d.d.b, ang: [-66, 66] },
      { k: "arco", c: d.d.b, hacia: d.d.a, ang: [-66, 66] },
      { k: "marca", p: "crP1" }, { k: "marca", p: "crP2" },
      { k: "recta", a: "crP1", b: "crP2", limpia: true }, { k: "marca", p: "cm" },
      { k: "medir", de: d.d.a, a: "cm" }, { k: "arco", c: "cO", hacia: "cY1" }, { k: "marca", p: "cY1" },
    ],
  };
}

/** Fig. 6: perspectiva caballera de un punto de coordenadas (x, y, z): completando el paralelepípedo. */
function punto(): Construccion {
  const x = 120;
  const y = 80;
  const z = 90;
  const dx = dato("x", x, 70, "azul");
  const dy = dato("y", y * MU, 95, "ambar");
  const dz = dato("z", z, 120);
  const pts: Record<string, P> = {
    ...EJES, ...dx.pts, ...dy.pts, ...dz.pts,
    cN: cab(x, 0, 0), cL: cab(0, y, 0), cM: cab(0, 0, z),
    cP1: cab(x, y, 0), cP2: cab(x, 0, z), cP3: cab(0, y, z), cP4: cab(x, y, z),
  };
  return {
    titulo: "Perspectiva caballera de un punto",
    intro: "Un punto $P(x, y, z)$ se representa tomando $x$ y $z$ en **verdadera magnitud** sobre los ejes $X$ y $Z$ y la coordenada $y$ **reducida** (aquí ya dada: la mitad de 80) sobre $Y$. Por paralelas a los ejes se obtienen las proyecciones $P'$, $P''$ y $P'''$ y, completando el paralelepípedo, la proyección directa $P$.",
    pts,
    dados: ["cO", "cX", "cY", "cZ", "x1", "x2", "y1", "y2", "z1", "z2"],
    datos: [dx.d, dy.d, dz.d],
    base: EJES_BASE,
    radioMin: 30,
    escala: 0.8,
    ops: [
      { k: "medir", de: "x1", a: "x2" }, { k: "arco", c: "cO", hacia: "cN" }, { k: "marca", p: "cN" },
      { k: "medir", de: "y1", a: "y2" }, { k: "arco", c: "cO", hacia: "cL" }, { k: "marca", p: "cL" },
      { k: "medir", de: "z1", a: "z2" }, { k: "arco", c: "cO", hacia: "cM" }, { k: "marca", p: "cM" },
      { k: "paralelas", recta: ["cO", "cX"], marcas: ["cL"], cortes: ["cP1"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["cN"], cortes: ["cP1"] }, { k: "marca", p: "cP1" },
      { k: "paralelas", recta: ["cO", "cZ"], marcas: ["cN"], cortes: ["cP2"] },
      { k: "paralelas", recta: ["cO", "cX"], marcas: ["cM"], cortes: ["cP2"] }, { k: "marca", p: "cP2" },
      { k: "paralelas", recta: ["cO", "cZ"], marcas: ["cL"], cortes: ["cP3"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["cM"], cortes: ["cP3"] }, { k: "marca", p: "cP3" },
      { k: "paralelas", recta: ["cO", "cZ"], marcas: ["cP1"], cortes: ["cP4"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["cP2"], cortes: ["cP4"] }, { k: "marca", p: "cP4" },
    ],
  };
}

/** Figs. 8 y 9: distancia entre dos puntos de una recta paralela al eje Y: la verdadera magnitud es el doble de la reducida. */
function distanciaY(): Construccion {
  const E = cab(120, 0, 70);
  const F = cab(120, 60, 70);
  const G: P = [E[0] + 2 * (F[0] - E[0]), E[1] + 2 * (F[1] - E[1])];
  return {
    titulo: "Distancia entre dos puntos de una recta paralela a Y",
    intro: "Un segmento $EF$ paralelo al eje $Y$ se proyecta **reducido** según $\\mu = 1/2$. Su verdadera magnitud $H$ es, por tanto, el **doble** de su proyección: se lleva $EF$ dos veces sobre su propia recta.",
    pts: { ...EJES, cE: E, cF: F, cG: G },
    dados: ["cO", "cX", "cY", "cZ", "cE", "cF"],
    datos: [],
    base: [...EJES_BASE, ["cE", "cF"]],
    ext: 120,
    radioMin: 30,
    ops: [
      { k: "recta", a: "cE", b: "cF" },
      { k: "medir", de: "cE", a: "cF" }, { k: "arco", c: "cF", hacia: "cG" }, { k: "marca", p: "cG" },
      { k: "recta", a: "cE", b: "cG" },
    ],
  };
}

/** Fig. 13: triángulo situado en el plano XOY: las medidas en X en verdadera magnitud y las de Y reducidas. */
function trianguloXOY(): Construccion {
  const x1 = 110;
  const x2 = 40;
  const y = 90;
  const dx1 = dato("x", x1, 70, "azul");
  const dx2 = dato("w", x2, 95, "azul");
  const dy = dato("y", y * MU, 120, "ambar");
  const o: P = [300, 140];
  const C = cab(x1, 0, 0, o);
  const Xa = cab(x2, 0, 0, o);
  const A = cab(x2, y, 0, o);
  return {
    titulo: "Triángulo en el plano XOY",
    intro: "Un triángulo situado en el plano $XOY$ se dibuja tomando las medidas paralelas a $X$ en **verdadera magnitud** y las paralelas a $Y$ **reducidas** a la mitad. El vértice $B$ está en el origen, $C$ sobre $X$ y $A$ a $40$ de $B$ en la dirección $X$ y a $90$ en profundidad (45 reducidos).",
    pts: { ...dx1.pts, ...dx2.pts, ...dy.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20], cCt: C, cXa: Xa, cAt: A },
    dados: ["cO", "cX", "cY", "cZ", "x1", "x2", "w1", "w2", "y1", "y2"],
    datos: [dx1.d, dx2.d, dy.d],
    base: EJES_BASE,
    radioMin: 30,
    ops: [
      { k: "medir", de: "x1", a: "x2" }, { k: "arco", c: "cO", hacia: "cCt" }, { k: "marca", p: "cCt" },
      { k: "medir", de: "w1", a: "w2" }, { k: "arco", c: "cO", hacia: "cXa" }, { k: "marca", p: "cXa" },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["cXa"], cortes: ["cAt"] },
      { k: "medir", de: "y1", a: "y2" }, { k: "arco", c: "cXa", hacia: "cAt" }, { k: "marca", p: "cAt" },
      { k: "lados", pts: ["cO", "cCt", "cAt"] },
    ],
  };
}

/** Fig. 21: circunferencia en el plano XOY: elipse de diámetros conjugados OC = R (en X) y OA = μR (en Y). */
function circunferenciaXOY(): Construccion {
  const R = 70;
  const r = R * MU;
  const o: P = [310, 170];
  const dR = dato("R", R, 70, "azul");
  const dr = dato("r", r, 95, "ambar");
  const D = cab(R, 0, 0, o);
  const Cc = cab(-R, 0, 0, o);
  const A = cab(0, R, 0, o);
  const B = cab(0, -R, 0, o);
  return {
    titulo: "Circunferencia en el plano XOY",
    intro: "La circunferencia de radio $R$ del plano $XOY$ se proyecta según una **elipse**. Por el centro se trazan los **diámetros conjugados**: $CD$ paralelo a $X$ con $OC = OD = R$ y $AB$ paralelo a $Y$ con $OA = OB = r$, el radio **reducido** ($r = 0{,}5R$). Por paralelas se dibuja el romboide de tangentes y en él se inscribe la elipse.",
    pts: { ...dR.pts, ...dr.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20], cD: D, cCt: Cc, cAt: A, cBt: B, cPm: cab(R, R, 0, o), cQm: cab(-R, R, 0, o), cM2: cab(R, -R, 0, o), cN2: cab(-R, -R, 0, o) },
    dados: ["cO", "cX", "cY", "cZ", "R1", "R2", "r1", "r2"],
    datos: [dR.d, dr.d],
    base: EJES_BASE,
    radioMin: 30,
    escala: 0.8,
    ops: [
      { k: "medir", de: "R1", a: "R2" }, { k: "arco", c: "cO", hacia: "cD" }, { k: "arco", c: "cO", hacia: "cCt" }, { k: "marca", p: "cD" }, { k: "marca", p: "cCt" },
      { k: "medir", de: "r1", a: "r2" }, { k: "arco", c: "cO", hacia: "cAt" }, { k: "arco", c: "cO", hacia: "cBt" }, { k: "marca", p: "cAt" }, { k: "marca", p: "cBt" },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["cD"], cortes: ["cPm"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["cCt"], cortes: ["cQm"] },
      { k: "paralelas", recta: ["cO", "cX"], marcas: ["cAt"], cortes: ["cPm"] },
      { k: "paralelas", recta: ["cO", "cX"], marcas: ["cBt"], cortes: ["cM2"] },
      { k: "elipseConjugada", c: "cO", u: "cD", v: "cAt" },
    ],
  };
}

/** Perspectiva caballera de una pieza: paralelepípedo, con las medidas de Y ya reducidas. */
function pieza(): Construccion {
  const a = 100;
  const b = 80;
  const h = 60;
  const o: P = [300, 230];
  const da = dato("a", a, 70, "azul");
  const db = dato("b", b * MU, 95, "ambar");
  const dc = dato("c", h, 120);
  const pts: Record<string, P> = {
    ...da.pts, ...db.pts, ...dc.pts,
    cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 30],
    kAx: cab(a, 0, 0, o), kAy: cab(0, b, 0, o), kAz: cab(0, 0, h, o), kXY: cab(a, b, 0, o),
    kTx: cab(a, 0, h, o), kTy: cab(0, b, h, o), kTxy: cab(a, b, h, o),
  };
  return {
    titulo: "Perspectiva caballera de una pieza",
    intro: "Para dibujar una pieza en caballera se llevan sobre los ejes sus medidas: **largo** y **alto** en verdadera magnitud y **ancho reducido** a la mitad (80 → 40). Después se completa el paralelepípedo con **paralelas** a los ejes y se remarca el contorno.",
    pts,
    dados: ["cO", "cX", "cY", "cZ", "a1", "a2", "b1", "b2", "c1", "c2"],
    datos: [da.d, db.d, dc.d],
    base: EJES_BASE,
    radioMin: 30,
    escala: 0.8,
    ops: [
      { k: "medir", de: "a1", a: "a2" }, { k: "arco", c: "cO", hacia: "kAx" }, { k: "marca", p: "kAx" },
      { k: "medir", de: "b1", a: "b2" }, { k: "arco", c: "cO", hacia: "kAy" }, { k: "marca", p: "kAy" },
      { k: "medir", de: "c1", a: "c2" }, { k: "arco", c: "cO", hacia: "kAz" }, { k: "marca", p: "kAz" },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["kAx"], cortes: ["kXY"] },
      { k: "paralelas", recta: ["cO", "cX"], marcas: ["kAy"], cortes: ["kXY"] }, { k: "marca", p: "kXY" },
      { k: "paralelas", recta: ["cO", "cX"], marcas: ["kAz"], cortes: ["kTx"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["kAz"], cortes: ["kTy"] },
      { k: "paralelas", recta: ["cO", "cZ"], marcas: ["kAx"], cortes: ["kTx"] },
      { k: "paralelas", recta: ["cO", "cZ"], marcas: ["kAy"], cortes: ["kTy"] },
      { k: "paralelas", recta: ["cO", "cZ"], marcas: ["kXY"], cortes: ["kTxy"] }, { k: "marca", p: "kTxy" },
      { k: "lados", pts: ["kAz", "kTx", "kAx", "kXY", "kAy", "kTy"] },
    ],
  };
}

/** Distancia en el plano XOY (Fig. 9): triángulo rectángulo de catetos Δx (verdadero) y Δy (el doble del reducido). */
function distanciaXOY(): Construccion {
  const o: P = [300, 120];
  const Nn = cab(30, 20, 0, o);
  const Bb = cab(110, 90, 0, o);
  const Tt: P = cab(110, 20, 0, o); // N + Δx·X
  const lx = Tt[0] - Nn[0];
  const ly = Math.hypot(Bb[0] - Tt[0], Bb[1] - Tt[1]);
  const U: P = [60, 330];
  const dNT = dato("a", lx, 60, "azul");
  const dTB = dato("b", ly, 85, "ambar");
  const V: P = [U[0] + lx, U[1]];
  const W1: P = [U[0], U[1] - ly];
  const W2: P = [U[0], U[1] - 2 * ly];
  return {
    titulo: "Distancia entre dos puntos del plano XOY",
    intro: "La verdadera distancia entre $N$ y $B$, situados en el plano $XOY$, es la hipotenusa de un triángulo rectángulo. Por $N$ se traza la paralela a $X$ y por $B$ la paralela a $Y$, que se cortan en $T$: $\\overline{NT}$ es el cateto en **verdadera magnitud** y $\\overline{TB}$ el otro cateto **reducido**, que hay que **duplicar**.",
    pts: { ...dNT.pts, ...dTB.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20], dN: Nn, dB: Bb, dT: Tt, dU: U, dUe: [U[0] + 220, U[1]], dV: V, dW1: W1, dW2: W2 },
    dados: ["cO", "cX", "cY", "cZ", "dN", "dB", "dU", "a1", "a2", "b1", "b2"],
    datos: [dNT.d, dTB.d],
    base: [...EJES_BASE, ["dU", "dUe"]],
    radioMin: 30,
    escala: 0.8,
    ops: [
      { k: "paralelas", recta: ["cO", "cX"], marcas: ["dN"], cortes: ["dT"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["dB"], cortes: ["dT"] }, { k: "marca", p: "dT" },
      { k: "medir", de: "a1", a: "a2" }, { k: "arco", c: "dU", hacia: "dV" }, { k: "marca", p: "dV" },
      { k: "perp", recta: ["dU", "dUe"], punto: "dU", traza: ["dU", "dW2"] },
      { k: "medir", de: "b1", a: "b2" }, { k: "arco", c: "dU", hacia: "dW1" }, { k: "marca", p: "dW1" },
      { k: "medir", de: "b1", a: "b2" }, { k: "arco", c: "dW1", hacia: "dW2" }, { k: "marca", p: "dW2" },
      { k: "recta", a: "dV", b: "dW2" },
    ],
  };
}

/** Fig. 12: distancia entre dos puntos P y Q cualesquiera: hipotenusa de d₀ (verdadera longitud de P′Q′) y la diferencia de cotas h. */
function distanciaOblicua(): Construccion {
  const o: P = [300, 110];
  const Pp = cab(30, 20, 0, o);
  const Qp = cab(110, 90, 0, o);
  const Tt = cab(110, 20, 0, o);
  const lx = Tt[0] - Pp[0];
  const ly = Math.hypot(Qp[0] - Tt[0], Qp[1] - Tt[1]);
  const d0 = Math.hypot(lx, 2 * ly);
  const h = 50;
  const dh = dato("h", h, 60, "azul");
  const dNT = dato("a", lx, 85, "azul");
  const dTB = dato("b", ly, 110, "ambar");
  const U: P = [60, 330];
  const V: P = [U[0] + lx, U[1]];
  const W1: P = [U[0], U[1] - ly];
  const W2: P = [U[0], U[1] - 2 * ly];
  const U2: P = [330, 340];
  const V2: P = [U2[0] + d0, U2[1]];
  const W3: P = [U2[0], U2[1] - h];
  return {
    titulo: "Distancia entre dos puntos cualesquiera",
    intro: "Para dos puntos $P$ y $Q$ cuyo segmento es **oblicuo** a los planos del sistema: la distancia entre sus proyecciones $P'$ y $Q'$ sobre $XOY$ se halla como en el caso anterior ($d_0$, hipotenusa) y la **verdadera magnitud** $D$ es la hipotenusa del triángulo rectángulo de catetos $d_0$ y la diferencia de cotas $h$.",
    pts: { ...dh.pts, ...dNT.pts, ...dTB.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20], dN: Pp, dB: Qp, dT: Tt, dU: U, dUe: [U[0] + 200, U[1]], dV: V, dW1: W1, dW2: W2, dU2: U2, dU2e: [U2[0] + 260, U2[1]], dV2: V2, dW3: W3 },
    dados: ["cO", "cX", "cY", "cZ", "dN", "dB", "dU", "dU2", "a1", "a2", "b1", "b2", "h1", "h2"],
    datos: [dh.d, dNT.d, dTB.d],
    base: [...EJES_BASE, ["dU", "dUe"], ["dU2", "dU2e"]],
    radioMin: 30,
    escala: 0.8,
    ops: [
      { k: "paralelas", recta: ["cO", "cX"], marcas: ["dN"], cortes: ["dT"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["dB"], cortes: ["dT"] }, { k: "marca", p: "dT" },
      { k: "medir", de: "a1", a: "a2" }, { k: "arco", c: "dU", hacia: "dV" }, { k: "marca", p: "dV" },
      { k: "perp", recta: ["dU", "dUe"], punto: "dU", traza: ["dU", "dW2"] },
      { k: "medir", de: "b1", a: "b2" }, { k: "arco", c: "dU", hacia: "dW1" }, { k: "marca", p: "dW1" },
      { k: "medir", de: "b1", a: "b2" }, { k: "arco", c: "dW1", hacia: "dW2" }, { k: "marca", p: "dW2" },
      { k: "recta", a: "dV", b: "dW2" },
      { k: "medir", de: "dV", a: "dW2" }, { k: "arco", c: "dU2", hacia: "dV2" }, { k: "marca", p: "dV2" },
      { k: "perp", recta: ["dU2", "dU2e"], punto: "dU2", traza: ["dU2", "dW3"] },
      { k: "medir", de: "h1", a: "h2" }, { k: "arco", c: "dU2", hacia: "dW3" }, { k: "marca", p: "dW3" },
      { k: "recta", a: "dV2", b: "dW3" },
    ],
  };
}

/** Figs. 16-17: hexágono regular en el plano XOY: x en verdadera magnitud (±R y ±R/2) e y reducida (±h·μ). */
function hexagonoXOY(): Construccion {
  const R = 80;
  const hh = (R * Math.sqrt(3)) / 2;
  const o: P = [300, 150];
  const dR = dato("R", R, 70, "azul");
  const dM = dato("m", R / 2, 95, "azul");
  const dH = dato("t", hh * MU, 120, "ambar");
  const pts: Record<string, P> = {
    ...dR.pts, ...dM.pts, ...dH.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20],
    hA: cab(-R, 0, 0, o), hD: cab(R, 0, 0, o), hXr: cab(R / 2, 0, 0, o), hXl: cab(-R / 2, 0, 0, o),
    hB: cab(-R / 2, hh, 0, o), hC: cab(R / 2, hh, 0, o), hE: cab(R / 2, -hh, 0, o), hF: cab(-R / 2, -hh, 0, o),
  };
  return {
    titulo: "Hexágono regular en el plano XOY",
    intro: "Un hexágono regular de lado $R = 80$ tiene sus vértices $A$ y $D$ en el eje $X$ a distancia $R$ del centro, y los otros cuatro a $\\pm R/2$ del centro en $X$ y a $\\pm h = \\pm R\\sqrt{3}/2$ en $Y$. En caballera las medidas en $X$ se toman en verdadera magnitud y las de $Y$ **reducidas** a la mitad.",
    pts,
    dados: ["cO", "cX", "cY", "cZ", "R1", "R2", "m1", "m2", "t1", "t2"],
    datos: [dR.d, dM.d, dH.d],
    base: EJES_BASE,
    radioMin: 30,
    escala: 0.8,
    ops: [
      { k: "medir", de: "R1", a: "R2" }, { k: "arco", c: "cO", hacia: "hD" }, { k: "arco", c: "cO", hacia: "hA" }, { k: "marca", p: "hD" }, { k: "marca", p: "hA" },
      { k: "medir", de: "m1", a: "m2" }, { k: "arco", c: "cO", hacia: "hXr" }, { k: "arco", c: "cO", hacia: "hXl" }, { k: "marca", p: "hXr" }, { k: "marca", p: "hXl" },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["hXr"], cortes: ["hC"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["hXr"], cortes: ["hE"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["hXl"], cortes: ["hB"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["hXl"], cortes: ["hF"] },
      { k: "medir", de: "t1", a: "t2" }, { k: "arco", c: "hXr", hacia: "hC" }, { k: "arco", c: "hXr", hacia: "hE" }, { k: "marca", p: "hC" }, { k: "marca", p: "hE" },
      { k: "medir", de: "t1", a: "t2" }, { k: "arco", c: "hXl", hacia: "hB" }, { k: "arco", c: "hXl", hacia: "hF" }, { k: "marca", p: "hB" }, { k: "marca", p: "hF" },
      { k: "lados", pts: ["hA", "hB", "hC", "hD", "hE", "hF"] },
    ],
  };
}

/** Fig. 22: óvalo en el plano XOY cuando no hay reducción (μ = 1): arcos con centros en la intersección de las normales. */
function ovaloXOY(): Construccion {
  const R = 60;
  const o: P = [330, 170];
  const vY: P = [-Math.cos(rad(45)), Math.sin(rad(45))];
  const cab1 = (x: number, y: number): P => [o[0] + x + y * vY[0], o[1] + y * vY[1]];
  const A = cab1(0, R);
  const B = cab1(0, -R);
  const C = cab1(-R, 0);
  const D = cab1(R, 0);
  const inter = (p1: P, d1: P, p2: P, d2: P): P => {
    const det = d1[0] * -d2[1] - d1[1] * -d2[0];
    const t = ((p2[0] - p1[0]) * -d2[1] - (p2[1] - p1[1]) * -d2[0]) / det;
    return [p1[0] + d1[0] * t, p1[1] + d1[1] * t];
  };
  const vert: P = [0, 1];
  const perY: P = [Math.cos(rad(45)), Math.sin(rad(45))];
  const c1 = inter(D, perY, B, vert);
  const c2 = inter(B, vert, C, perY);
  const c3 = inter(C, perY, A, vert);
  const c4 = inter(A, vert, D, perY);
  const clip = (p: P, d: P): [P, P] => {
    const ts: number[] = [];
    for (const [pp, dd, a, b] of [[p[0], d[0], 30, 590], [p[1], d[1], 25, 355]] as const) if (Math.abs(dd) > 1e-9) ts.push((a - pp) / dd, (b - pp) / dd);
    const pos = Math.min(...ts.filter((t) => t > 0));
    const neg = Math.max(...ts.filter((t) => t < 0));
    return [[p[0] + d[0] * neg, p[1] + d[1] * neg], [p[0] + d[0] * pos, p[1] + d[1] * pos]];
  };
  const [a1, a2] = clip(A, vert);
  const [b1, b2] = clip(B, vert);
  const [c11, c12] = clip(C, perY);
  const [d1, d2] = clip(D, perY);
  const dR1 = dato("p", Math.hypot(c1[0] - D[0], c1[1] - D[1]), 70, "azul");
  const dR2 = dato("q", Math.hypot(c2[0] - B[0], c2[1] - B[1]), 95, "ambar");
  return {
    titulo: "Óvalo en el plano XOY sin reducción",
    intro: "Cuando no hay reducción en el eje $Y$ ($\\mu = 1$), la elipse se puede sustituir por un **óvalo**. Dado el romboide de tangentes, por los puntos de tangencia $A$, $B$, $C$ y $D$ se trazan las **normales** a los lados: las normales a los lados paralelos a $X$ son verticales y las de los paralelos a $Y$, perpendiculares a $Y$. Se cortan en los centros de curvatura $C_1$, $C_2$, $C_3$ y $C_4$ de los cuatro arcos.",
    pts: {
      ...dR1.pts, ...dR2.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20],
      oA: A, oB: B, oC: C, oD: D, o1: c1, o2: c2, o3: c3, o4: c4, oa1: a1, oa2: a2, ob1: b1, ob2: b2, oc1: c11, oc2: c12, od1: d1, od2: d2,
      _v1: cab1(R, R), _v2: cab1(-R, R), _v3: cab1(-R, -R), _v4: cab1(R, -R),
    },
    dados: ["cO", "cX", "cY", "cZ", "oA", "oB", "oC", "oD", "p1", "p2", "q1", "q2"],
    datos: [dR1.d, dR2.d],
    base: [...EJES_BASE, ["_v1", "_v2"], ["_v2", "_v3"], ["_v3", "_v4"], ["_v4", "_v1"]],
    radioMin: 20,
    escala: 0.8,
    ops: [
      { k: "perp", recta: ["cO", "cY"], punto: "oD", traza: ["od1", "od2"] },
      { k: "perp", recta: ["cO", "cX"], punto: "oB", traza: ["ob1", "ob2"] }, { k: "marca", p: "o1" },
      { k: "perp", recta: ["cO", "cY"], punto: "oC", traza: ["oc1", "oc2"] }, { k: "marca", p: "o2" },
      { k: "perp", recta: ["cO", "cX"], punto: "oA", traza: ["oa1", "oa2"] }, { k: "marca", p: "o3" }, { k: "marca", p: "o4" },
      { k: "medir", de: "o1", a: "oD" }, { k: "solucion", c: "o1", hacia: "oD", hasta: "oB" },
      { k: "medir", de: "o2", a: "oB" }, { k: "solucion", c: "o2", hacia: "oB", hasta: "oC" },
      { k: "medir", de: "o3", a: "oC" }, { k: "solucion", c: "o3", hacia: "oC", hasta: "oA" },
      { k: "medir", de: "o4", a: "oA" }, { k: "solucion", c: "o4", hacia: "oA", hasta: "oD" },
    ],
  };
}

/** Fig. 23: circunferencia en el plano ZOY: diámetro AB paralelo a Z (sin reducir) y CD paralelo a Y (reducido). */
function circunferenciaZOY(): Construccion {
  const R = 70;
  const r = R * MU;
  const o: P = [330, 190];
  const dR = dato("R", R, 70, "azul");
  const dr = dato("r", r, 95, "ambar");
  const A = cab(0, 0, R, o);
  const B = cab(0, 0, -R, o);
  const Cc = cab(0, R, 0, o);
  const D = cab(0, -R, 0, o);
  return {
    titulo: "Circunferencia en el plano ZOY",
    intro: "En el plano $ZOY$, por el centro se trazan los diámetros conjugados: $AB$ paralelo a $Z$ **sin reducir** ($OA = OB = R$) y $CD$ paralelo a $Y$ **reducido** ($OC = OD = r = 0{,}5R$). El romboide de tangentes se dibuja por paralelas y la elipse queda inscrita en él.",
    pts: { ...dR.pts, ...dr.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20], zA: A, zB: B, zC: Cc, zD: D, zP: cab(0, R, R, o), zQ: cab(0, R, -R, o), zR: cab(0, -R, R, o), zS: cab(0, -R, -R, o) },
    dados: ["cO", "cX", "cY", "cZ", "R1", "R2", "r1", "r2"],
    datos: [dR.d, dr.d],
    base: EJES_BASE,
    radioMin: 30,
    escala: 0.8,
    ops: [
      { k: "medir", de: "R1", a: "R2" }, { k: "arco", c: "cO", hacia: "zA" }, { k: "arco", c: "cO", hacia: "zB" }, { k: "marca", p: "zA" }, { k: "marca", p: "zB" },
      { k: "medir", de: "r1", a: "r2" }, { k: "arco", c: "cO", hacia: "zC" }, { k: "arco", c: "cO", hacia: "zD" }, { k: "marca", p: "zC" }, { k: "marca", p: "zD" },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["zA"], cortes: ["zP"] },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["zB"], cortes: ["zQ"] },
      { k: "paralelas", recta: ["cO", "cZ"], marcas: ["zC"], cortes: ["zP"] },
      { k: "paralelas", recta: ["cO", "cZ"], marcas: ["zD"], cortes: ["zR"] },
      { k: "elipseConjugada", c: "cO", u: "zA", v: "zC" },
    ],
  };
}

/** Fig. 19: circunferencia en el plano ZOX (el del cuadro): se proyecta en verdadera forma. */
function circunferenciaZOX(): Construccion {
  const R = 60;
  const o: P = [300, 190];
  const dR = dato("R", R, 70, "azul");
  const C: P = [330, 190];
  return {
    titulo: "Circunferencia en el plano ZOX",
    intro: "El plano $ZOX$ es el del cuadro: una circunferencia contenida en él se proyecta **en verdadera forma**, sin deformarse. Basta trazarla con el compás, con su radio real $R$.",
    pts: { ...dR.pts, cO: o, cX: [560, o[1]], cZ: [o[0], 20], cCen: C, cP: [C[0] + R, C[1]] },
    dados: ["cO", "cX", "cZ", "cCen", "R1", "R2"],
    datos: [dR.d],
    base: [["cO", "cX"], ["cO", "cZ"]],
    radioMin: 30,
    ops: [{ k: "medir", de: "R1", a: "R2" }, { k: "solucion", c: "cCen", hacia: "cP" }],
  };
}

/** Fig. 18: pentágono regular en el plano XOY a partir de sus coordenadas (x en verdadera magnitud, y reducida). */
function cincoLadosXOY(): Construccion {
  const R = 70;
  const o: P = [300, 150];
  const ang = [90, 162, 234, 306, 18];
  const xs = ang.map((a) => R * Math.cos(rad(a)));
  const ys = ang.map((a) => R * Math.sin(rad(a)));
  const ax = [Math.abs(xs[2]), Math.abs(xs[1])]; // 41,2 y 66,6
  const dx1 = dato("p", ax[0], 70, "azul");
  const dx2 = dato("q", ax[1], 95, "azul");
  const dy0 = dato("u", Math.abs(ys[0]) * MU, 120, "ambar");
  const dy1 = dato("v", Math.abs(ys[1]) * MU, 145, "ambar");
  const dy2 = dato("w", Math.abs(ys[2]) * MU, 170, "ambar");
  const pts: Record<string, P> = {
    ...dx1.pts, ...dx2.pts, ...dy0.pts, ...dy1.pts, ...dy2.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20],
    vf1: cab(-ax[1], 0, 0, o), vf2: cab(-ax[0], 0, 0, o), vf3: cab(ax[0], 0, 0, o), vf4: cab(ax[1], 0, 0, o),
  };
  ang.forEach((_, i) => { pts[`vP${i + 1}`] = cab(xs[i], ys[i], 0, o); });
  const ops: Op[] = [
    { k: "medir", de: "p1", a: "p2" }, { k: "arco", c: "cO", hacia: "vf2" }, { k: "arco", c: "cO", hacia: "vf3" }, { k: "marca", p: "vf2" }, { k: "marca", p: "vf3" },
    { k: "medir", de: "q1", a: "q2" }, { k: "arco", c: "cO", hacia: "vf1" }, { k: "arco", c: "cO", hacia: "vf4" }, { k: "marca", p: "vf1" }, { k: "marca", p: "vf4" },
    { k: "medir", de: "u1", a: "u2" }, { k: "arco", c: "cO", hacia: "vP1" }, { k: "marca", p: "vP1" },
  ];
  // vértices 2 y 5 (y > 0, hexagono lateral), 3 y 4 (y < 0): paralela a Y por el pie y arco con la ordenada reducida
  const pie: Record<number, string> = { 2: "vf1", 3: "vf2", 4: "vf3", 5: "vf4" };
  const dat: Record<number, string> = { 2: "v", 3: "w", 4: "w", 5: "v" };
  for (const i of [2, 3, 4, 5]) {
    ops.push(
      { k: "paralelas", recta: ["cO", "cY"], marcas: [pie[i]], cortes: [`vP${i}`] },
      { k: "medir", de: `${dat[i]}1`, a: `${dat[i]}2` }, { k: "arco", c: pie[i], hacia: `vP${i}` }, { k: "marca", p: `vP${i}` },
    );
  }
  ops.push({ k: "lados", pts: ["vP1", "vP2", "vP3", "vP4", "vP5"] });
  return {
    titulo: "Pentágono regular en el plano XOY",
    intro: "Un pentágono regular de radio $R = 70$, con un vértice sobre el eje $Y$, se dibuja a partir de las coordenadas de sus vértices en verdadera magnitud: las $x$ se toman **sin reducir** sobre $X$ y las $y$ se **reducen** a la mitad. Por cada pie sobre $X$ se traza la paralela al eje $Y$ y se lleva sobre ella la ordenada reducida.",
    pts,
    dados: ["cO", "cX", "cY", "cZ", "p1", "p2", "q1", "q2", "u1", "u2", "v1", "v2", "w1", "w2"],
    datos: [dx1.d, dx2.d, dy0.d, dy1.d, dy2.d],
    base: EJES_BASE,
    radioMin: 10,
    escala: 0.8,
    ops,
  };
}

/** Fig. 20: curva situada en el plano XOY, punto a punto: abscisas equidistantes en verdadera magnitud y ordenadas reducidas. */
function curvaXOY(): Construccion {
  const o: P = [140, 150];
  const paso = 90;
  const ordenadas = [15, 35, 15, 35, 15];
  const dx = dato("x", paso, 70, "azul");
  const da = dato("a", 15, 95, "ambar");
  const db = dato("b", 35, 120, "ambar");
  const pts: Record<string, P> = { ...dx.pts, ...da.pts, ...db.pts, cO: o, cX: [580, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20] };
  const ops: Op[] = [{ k: "medir", de: "x1", a: "x2" }];
  [1, 2, 3, 4, 5].forEach((k) => { pts[`vc${k}`] = cab(paso * k, ordenadas[k - 1] / MU, 0, o); pts[`vg${k}`] = cab(paso * k, 0, 0, o); });
  for (let k = 1; k <= 5; k += 1) ops.push(...[{ k: "arco", c: k === 1 ? "cO" : `vg${k - 1}`, hacia: `vg${k}` }, { k: "marca", p: `vg${k}` }] as Op[]);
  for (let k = 1; k <= 5; k += 1) {
    const d = ordenadas[k - 1] === 15 ? "a" : "b";
    ops.push(
      { k: "paralelas", recta: ["cO", "cY"], marcas: [`vg${k}`], cortes: [`vc${k}`] },
      { k: "medir", de: `${d}1`, a: `${d}2` }, { k: "arco", c: `vg${k}`, hacia: `vc${k}` }, { k: "marca", p: `vc${k}` },
    );
  }
  ops.push({ k: "curvaPuntos", pts: ["vc1", "vc2", "vc3", "vc4", "vc5"] });
  return {
    titulo: "Curva situada en el plano XOY",
    intro: "Para representar en el plano $XOY$ una curva dada en verdadera forma se pasa **punto a punto**: las abscisas (paralelas a $X$) se conservan y las ordenadas (paralelas a $Y$) se **reducen** según el coeficiente. Aquí, abscisas cada 90 y ordenadas reducidas 15 y 35. Los puntos se unen con una curva suave.",
    pts,
    dados: ["cO", "cX", "cY", "cZ", "x1", "x2", "a1", "a2", "b1", "b2"],
    datos: [dx.d, da.d, db.d],
    base: EJES_BASE,
    radioMin: 10,
    escala: 0.8,
    ops,
  };
}

/** Fig. 9 con σ: abatimiento del plano XOY sobre ZOX; las rectas de abatimiento son paralelas a la que une 1 con (1)₀. */
function abatimientoXOY(): Construccion {
  const o: P = [300, 90];
  const u = 30; // O-1 reducido (y = 60 en verdadera magnitud)
  const Nn = cab(30, 20, 0, o);
  const Bb = cab(110, 90, 0, o);
  const N0: P = [o[0] + 30, o[1] + 20];
  const B0: P = [o[0] + 110, o[1] + 90];
  const Nx: P = [Nn[0] + (Nn[1] - o[1]) * 1, o[1]]; // pie sobre X por la paralela a Y (45°)
  const Bx: P = [Bb[0] + (Bb[1] - o[1]) * 1, o[1]];
  const du = dato("u", u, 60, "ambar");
  const c1 = cab(0, 2 * u, 0, o);
  const v1: P = [o[0], o[1] + u];
  const v2: P = [o[0], o[1] + 2 * u];
  return {
    titulo: "Abatimiento del plano XOY: distancia real",
    intro: "Se **abate** el plano $XOY$ sobre $ZOX$ girando alrededor del eje $X$ (la charnela). El eje $Y$ abatido es la vertical por $O$, donde la medida reducida $\\overline{O1}$ se duplica hasta $(1)_0$. Todos los puntos se abaten según rectas **paralelas a $1$-$(1)_0$**, y la distancia real entre $N$ y $B$ es $\\overline{N_0B_0}$.",
    pts: { ...du.pts, cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20], abN: Nn, abB: Bb, abNx: Nx, abBx: Bx, abN0: N0, abB0: B0, ab1: c1, abV: [o[0], 340], abV1: v1, abV2: v2 },
    dados: ["cO", "cX", "cY", "cZ", "abN", "abB", "u1", "u2"],
    datos: [du.d],
    base: [["cO", "cX"], ["cO", "cY"], ["cO", "abV"]],
    ext: 160,
    radioMin: 25,
    escala: 0.8,
    ops: [
      { k: "medir", de: "u1", a: "u2" }, { k: "arco", c: "cO", hacia: "ab1" }, { k: "marca", p: "ab1" },
      { k: "medir", de: "u1", a: "u2" }, { k: "arco", c: "cO", hacia: "abV1" }, { k: "marca", p: "abV1" },
      { k: "medir", de: "u1", a: "u2" }, { k: "arco", c: "abV1", hacia: "abV2" }, { k: "marca", p: "abV2" },
      { k: "recta", a: "abV2", b: "ab1" },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["abN"], cortes: ["abNx"] }, { k: "marca", p: "abNx" },
      { k: "perp", recta: ["cO", "cX"], punto: "abNx", traza: ["abNx", "abN0"] },
      { k: "paralelas", recta: ["abV2", "ab1"], marcas: ["abN"], cortes: ["abN0"] }, { k: "marca", p: "abN0" },
      { k: "paralelas", recta: ["cO", "cY"], marcas: ["abB"], cortes: ["abBx"] }, { k: "marca", p: "abBx" },
      { k: "perp", recta: ["cO", "cX"], punto: "abBx", traza: ["abBx", "abB0"] },
      { k: "paralelas", recta: ["abV2", "ab1"], marcas: ["abB"], cortes: ["abB0"] }, { k: "marca", p: "abB0" },
      { k: "recta", a: "abN0", b: "abB0" },
    ],
  };
}

/** Fig. 24: elipse por haces proyectivos: las rectas A–2 y B–1 se cortan en puntos de la elipse (aquí, en caballera). */
function elipseHaces(): Construccion {
  const R = 80;
  const o: P = [300, 170];
  const q = (x: number, y: number): P => cab(x * R, y * R, 0, o);
  const pts: Record<string, P> = {
    cO: o, cX: [560, o[1]], cY: cab(0, 300, 0, o), cZ: [o[0], 20],
    hl1: q(0, 1), hl2: q(0, -1), hl3: q(-1, 0), hl4: q(1, 0),
    hm1: q(0.5, 0), hm2: q(-0.5, 0),
    hn1: q(1, 0.5), hn2: q(1, -0.5), hn3: q(-1, 0.5), hn4: q(-1, -0.5),
    hp1: q(0.8, 0.6), hp2: q(-0.8, 0.6), hp3: q(-0.8, -0.6), hp4: q(0.8, -0.6),
    hv1: q(1, 1), hv2: q(-1, 1), hv3: q(-1, -1), hv4: q(1, -1),
  };
  return {
    titulo: "Elipse por haces proyectivos",
    intro: "Se completa el romboide circunscrito (el cuadrado en caballera) y se toman los puntos medios $1$ y $2$. Las rectas $A$-$2$ y $B$-$1$ se cortan en un punto de la elipse; repitiendo en los cuatro cuadrantes se obtienen $P$, $Q$, $R$ y $S$. Con los puntos de tangencia, la elipse se traza a lápiz y a mano alzada, o con plantilla.",
    pts,
    dados: ["cO", "cX", "cY", "cZ", "hl1", "hl2", "hl3", "hl4", "hm1", "hm2", "hn1", "hn2", "hn3", "hn4"],
    datos: [],
    base: [...EJES_BASE, ["hv1", "hv2"], ["hv2", "hv3"], ["hv3", "hv4"], ["hv4", "hv1"]],
    escala: 0.8,
    ops: [
      { k: "recta", a: "hl1", b: "hn1" }, { k: "recta", a: "hl2", b: "hm1" }, { k: "marca", p: "hp1" },
      { k: "recta", a: "hl1", b: "hn3" }, { k: "recta", a: "hl2", b: "hm2" }, { k: "marca", p: "hp2" },
      { k: "recta", a: "hl2", b: "hn4" }, { k: "recta", a: "hl1", b: "hm2" }, { k: "marca", p: "hp3" },
      { k: "recta", a: "hl2", b: "hn2" }, { k: "recta", a: "hl1", b: "hm1" }, { k: "marca", p: "hp4" },
      { k: "elipseConjugada", c: "cO", u: "hl4", v: "hl1" },
    ],
  };
}

export const CONSTRUCCIONES_CABALLERA = {
  "cab-ejes": ejes(),
  "cab-reduccion": reduccion(),
  "cab-punto": punto(),
  "cab-distancia-y": distanciaY(),
  "cab-triangulo-xoy": trianguloXOY(),
  "cab-circunferencia-xoy": circunferenciaXOY(),
  "cab-pieza": pieza(),
  "cab-distancia-xoy": distanciaXOY(),
  "cab-distancia-oblicua": distanciaOblicua(),
  "cab-seis-lados-xoy": hexagonoXOY(),
  "cab-ovalo-xoy": ovaloXOY(),
  "cab-circunferencia-zoy": circunferenciaZOY(),
  "cab-circunferencia-zox": circunferenciaZOX(),
  "cab-cinco-lados-xoy": cincoLadosXOY(),
  "cab-curva-xoy": curvaXOY(),
  "cab-abatimiento-xoy": abatimientoXOY(),
  "cab-elipse-haces": elipseHaces(),
} satisfies Record<string, Construccion>;
