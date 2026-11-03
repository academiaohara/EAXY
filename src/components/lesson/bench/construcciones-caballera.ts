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

export const CONSTRUCCIONES_CABALLERA = {
  "cab-ejes": ejes(),
  "cab-reduccion": reduccion(),
  "cab-punto": punto(),
  "cab-distancia-y": distanciaY(),
  "cab-triangulo-xoy": trianguloXOY(),
  "cab-circunferencia-xoy": circunferenciaXOY(),
  "cab-pieza": pieza(),
} satisfies Record<string, Construccion>;
