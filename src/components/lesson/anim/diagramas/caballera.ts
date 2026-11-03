import { arc, fl, lin, poli, pt, seg, txt, type Diagrama, type Item, type Pt } from "./engine";

const O: Pt = [330, 270];
const K45 = Math.cos(Math.PI / 4);
/** Perspectiva caballera φ = 45°, μ = 0,5: x y z en verdadera magnitud, y reducida. */
const cab = (x: number, y: number, z: number, mu = 0.5, o: Pt = O): Pt => [o[0] + x - mu * y * K45, o[1] - z + mu * y * K45];
const ejes = (l = 230, o: Pt = O): Item[] => [
  seg(o, [o[0] + l, o[1]], "blanco", false, 3), seg(o, [o[0], o[1] - l * 0.85], "blanco", false, 3), seg(o, cab(0, l * 0.9 * 2, 0, 0.5, o), "blanco", false, 3),
  txt([o[0] + l + 16, o[1] + 6], "X", "blanco", 22), txt([o[0], o[1] - l * 0.85 - 10], "Z", "blanco", 22), txt(cab(0, l * 0.9 * 2 + 20, 0, 0.5, o), "Y", "blanco", 22), pt(o, "O", "blanco", 10, -8),
];
const caja = (x: number, y: number, z: number, mu = 0.5, o: Pt = O): Pt[] => [cab(0, 0, 0, mu, o), cab(x, 0, 0, mu, o), cab(x, y, 0, mu, o), cab(0, y, 0, mu, o), cab(0, 0, z, mu, o), cab(x, 0, z, mu, o), cab(x, y, z, mu, o), cab(0, y, z, mu, o)];

const fundamentos = (): Diagrama => ({
  label: "Perspectiva caballera: el plano ZOX es el del cuadro y el eje Y se proyecta oblicuo",
  pasos: [
    { texto: "Se parte de un triedro $O(X)(Y)(Z)$ cuyo plano $ZOX$ coincide con el **plano del cuadro**: los ejes $X$ y $Z$ coinciden con sus proyecciones.", items: [poli([cab(0, 0, 0), cab(200, 0, 0), cab(200, 0, 190), cab(0, 0, 190)], "azul", 0.14), seg(O, [O[0] + 200, O[1]], "blanco", false, 3.5), seg(O, [O[0], O[1] - 190], "blanco", false, 3.5), txt([O[0] + 215, O[1] + 6], "X", "blanco", 22), txt([O[0], O[1] - 200], "Z", "blanco", 22)] },
    { texto: "Una proyección **oblicua** de dirección $d$ envía el eje $Y$ (perpendicular al cuadro) sobre una recta $Y$ que pasa por $O$.", items: [fl(cab(0, 330, 0, 1), cab(0, 0, 0, 1), "amarillo", 2.4), seg(O, cab(0, 260, 0), "blanco", false, 3.5), txt(cab(0, 290, 0), "Y", "blanco", 22), txt([O[0] - 110, O[1] + 30], "d", "amarillo", 22)] },
    { texto: "El ángulo $\\varphi$ que forman $X$ e $Y$ y el ángulo $\\sigma$ de $d$ con el cuadro definen el sistema.", items: [arc(O, 60, 180, 225, "verde"), txt([O[0] - 34, O[1] + 50], "φ", "verde", 24)] },
  ],
});

const punto = (): Diagrama => {
  const c = caja(150, 110, 120);
  return {
    label: "Las cuatro proyecciones de un punto: la directa oblicua y las tres previas",
    pasos: [
      { texto: "El punto $(B)$ del espacio forma, con el origen, un **paralelepípedo**.", items: [...ejes(210), pt(c[6]!, "B", "amarillo", 12, -8)] },
      { texto: "Sus proyecciones ortogonales previas sobre los planos son $(A)$, $(C)$ y $(E)$.", items: [lin([c[1]!, c[2]!, c[3]!], "gris", true), lin([c[1]!, c[5]!, c[4]!], "gris", true), lin([c[3]!, c[7]!, c[4]!], "gris", true), seg(c[2]!, c[6]!, "gris", true), seg(c[5]!, c[6]!, "gris", true), seg(c[7]!, c[6]!, "gris", true), pt(c[2]!, "E", "naranja", 12, 20), pt(c[5]!, "A", "azul", 12, -8), pt(c[7]!, "C", "verde", -22, -8)] },
      { texto: "$B$ es la **proyección directa oblicua** (la perspectiva del punto) y $A$, $C$, $E$ las proyecciones sobre los planos coordenados.", items: [poli([c[0]!, c[1]!, c[2]!, c[3]!], "naranja", 0.1), poli([c[0]!, c[1]!, c[5]!, c[4]!], "azul", 0.1), poli([c[0]!, c[3]!, c[7]!, c[4]!], "verde", 0.1)] },
    ],
  };
};

const notaciones = (): Diagrama => {
  const c = caja(150, 110, 120);
  return {
    label: "Notación en caballera",
    pasos: [
      { texto: "**Puntos**: $P\\text{-}P'\\text{-}P''\\text{-}P'''$: $P$ directa, $P'$ sobre $XOY$, $P''$ sobre $ZOX$, $P'''$ sobre $ZOY$.", items: [...ejes(210), pt(c[6]!, "P", "amarillo", 12, -8), pt(c[2]!, "P′", "naranja", 12, 20), pt(c[5]!, "P″", "azul", 12, -8), pt(c[7]!, "P‴", "verde", -34, -8)] },
      { texto: "**Rectas** con minúsculas: $r\\text{-}r'\\text{-}r''\\text{-}r'''$.", items: [seg(cab(30, 30, 30), cab(180, 140, 140), "amarillo", false, 3.6), txt(cab(190, 146, 148), "r", "amarillo", 22)] },
      { texto: "**Planos** con letras griegas: $\\varphi(\\varphi_1\\text{-}\\varphi_2\\text{-}\\varphi_3)$, con las trazas sobre $XOY$, $ZOX$ y $ZOY$.", items: [poli([cab(160, 0, 0), cab(0, 130, 0), cab(0, 0, 150)], "morado", 0.15), txt(cab(80, 70, 0), "φ₁", "naranja", 21), txt(cab(70, 0, 80), "φ₂", "azul", 21), txt(cab(0, 70, 80), "φ₃", "verde", 21)] },
    ],
  };
};

const datos = (): Diagrama => ({
  label: "Datos del sistema: ángulos φ y σ",
  pasos: [
    { texto: "El ángulo $\\varphi$ es el que forman en proyección los ejes $X$ e $Y$: la norma fija **45°**.", items: [...ejes(210), arc(O, 70, 180, 225, "verde"), txt([O[0] - 50, O[1] + 60], "φ = 45°", "verde", 22)] },
    { texto: "El ángulo $\\sigma$ es el que forma la **dirección de proyección** $d$ con el plano del cuadro (visto de perfil).", items: [seg([620, 60], [620, 360], "azul", false, 4), seg([620, 210], [760, 330], "gris", true), fl([760, 330], [620, 210], "amarillo", 3), arc([620, 210], 60, -50.2, 0, "verde"), txt([690, 232], "σ", "verde", 24), txt([600, 50], "cuadro", "azul", 19, "end")] },
    { texto: "Con $\\varphi$ y $\\sigma$ el sistema queda definido y se puede operar en él.", items: [txt([620, 395], "φ y σ definen el sistema", "amarillo", 22)] },
  ],
});

const coeficiente = (): Diagrama => ({
  label: "Coeficiente de reducción μ = cotg σ",
  pasos: [
    { texto: "Las rectas **paralelas al cuadro** (o a $X$, o a $Z$) se proyectan en **verdadera magnitud**. Las paralelas a $Y$ se **reducen**.", items: [seg([120, 80], [120, 340], "azul", false, 4), txt([120, 70], "cuadro", "azul", 19), seg([120, 340], [320, 340], "gris", false, 3)] },
    { texto: "$\\mu = \\cot\\sigma$: razón entre el segmento ya proyectado $O1$ y el real $O(1)$. Con $\\sigma = 63{,}4°$, $\\mu = 0{,}5$.", items: [seg([120, 340], [320, 240], "verde", false, 4), seg([120, 340], [120, 340], "gris"), txt([210, 280], "real O(1)", "verde", 19), seg([120, 340], [220, 340], "amarillo", false, 5), txt([170, 365], "O1 = μ·real", "amarillo", 19)] },
    { texto: "$\\sigma = 45°$: $\\mu = 1$ (sin reducción). $\\sigma < 45°$: **ampliación** (no conviene). $\\sigma > 45°$: **reducción**. Norma: $\\mu = 0{,}5$.", items: [txt([560, 130], "σ = 45° → μ = 1", "gris", 21), txt([560, 190], "σ < 45° → μ > 1 (amplía)", "rojo", 21), txt([560, 250], "σ > 45° → μ < 1 (reduce)", "verde", 21), txt([560, 330], "UNE 1031: φ = 45°, μ = 0,5", "amarillo", 22)] },
  ],
});

const puntoCab = (): Diagrama => {
  const c = caja(150, 110, 120);
  return {
    label: "Representación del punto P(x, y, z) en caballera",
    pasos: [
      { texto: "$x$ sobre el eje $X$ y $z$ sobre el eje $Z$ en **verdadera magnitud**.", items: [...ejes(210), pt(c[1]!, "N", "azul", 8, 20), pt(c[4]!, "M", "verde", -22, -4), txt([O[0] + 75, O[1] + 24], "x", "azul", 20), txt([O[0] - 18, O[1] - 60], "z", "verde", 20)] },
      { texto: "La coordenada $y$ se **reduce** (aquí a la mitad) sobre el eje $Y$.", items: [pt(c[3]!, "L", "naranja", -22, 18), txt([O[0] - 30, O[1] + 42], "μ·y", "naranja", 20)] },
      { texto: "Por **paralelas a los ejes** se obtienen $P'$, $P''$, $P'''$ y, completando el paralelepípedo, la proyección directa $P$.", items: [poli([c[1]!, c[2]!, c[3]!, c[0]!], "naranja", 0.1), poli([c[0]!, c[1]!, c[5]!, c[4]!], "azul", 0.1), poli([c[0]!, c[3]!, c[7]!, c[4]!], "verde", 0.1), pt(c[6]!, "P", "amarillo", 12, -8)] },
    ],
  };
};

const pasoDiedrico = (): Diagrama => {
  const L = 80;
  const c = caja(120, 90, 90, 0.5, [520, 270]);
  return {
    label: "Paso del sistema diédrico a la perspectiva caballera",
    pasos: [
      { texto: "Un punto en **diédrico** $P'$-$P''$, referido a un plano de perfil, tiene coordenadas $x$, $y$ (alejamiento) y $z$ (cota).", items: [seg([50, 230], [310, 230], "blanco", false, 3), pt([210, 230 + L], "P′", "naranja", 12, 20), pt([210, 230 - 90], "P″", "azul", 12, -8), seg([210, 230 - 90], [210, 230 + L], "gris", true), txt([50, 215], "L.T.", "gris", 18, "start")] },
      { texto: "En caballera se toman $x$ y $z$ en **verdadera magnitud** y la coordenada $y$ **reducida**.", items: [...ejes(160, [520, 270]), pt(c[1]!, "N", "azul", 8, 20), pt(c[4]!, "M", "verde", -22, -4), pt(c[3]!, "B", "naranja", -22, 18)] },
      { texto: "Con $ON$, $OB$ y $OM$ se completa el paralelepípedo y se obtienen $P$, $P'$, $P''$ y $P'''$.", items: [lin([c[1]!, c[2]!, c[3]!], "gris", true), lin([c[4]!, c[5]!, c[6]!, c[7]!, c[4]!], "gris", true), pt(c[6]!, "P", "amarillo", 12, -8)] },
    ],
  };
};

const distancia1 = (): Diagrama => ({
  label: "Distancia entre dos puntos: segmentos paralelos a los ejes",
  pasos: [
    { texto: "Un segmento **paralelo al eje $Z$** o al **$X$** está en **verdadera magnitud**.", items: [seg([120, 330], [120, 130], "verde", false, 4.5), txt([140, 235], "AB = real", "verde", 20, "start"), seg([300, 330], [520, 330], "azul", false, 4.5), txt([410, 355], "CD = real", "azul", 20)] },
    { texto: "Un segmento **paralelo al eje $Y$** está **reducido**: la verdadera magnitud $H$ es el **doble** (con $\\mu = 0{,}5$).", items: [seg([600, 130], [660, 190], "naranja", false, 4.5), txt([670, 150], "EF", "naranja", 20, "start"), seg([600, 130], [720, 250], "amarillo", true, 3), txt([730, 262], "H = EF/μ", "amarillo", 20, "start")] },
  ],
});

const distancia2 = (): Diagrama => ({
  label: "Distancia real entre dos puntos como hipotenusa de un triángulo rectángulo",
  pasos: [
    { texto: "Para dos puntos $N$ y $B$ del plano $XOY$: $NT$ es el cateto en verdadera magnitud y $TB$ el cateto **reducido** (paralelo a $Y$).", items: [seg([120, 330], [330, 330], "azul", false, 4), seg([330, 330], [380, 280], "naranja", false, 4), seg([120, 330], [380, 280], "gris", true), pt([120, 330], "N", "azul", -22, 8), pt([380, 280], "B", "naranja", 12, -8), pt([330, 330], "T", "blanco", 4, 22)] },
    { texto: "Se duplica el cateto reducido y se construye el **triángulo rectángulo** de catetos $NT$ y $2\\,TB$.", items: [poli([[480, 330], [690, 330], [690, 180]], "verde", 0.14), txt([585, 355], "NT", "azul", 20), txt([715, 260], "2·TB", "naranja", 20, "start")] },
    { texto: "Su **hipotenusa** es la distancia real $D$. Si el segmento es oblicuo, se repite con la diferencia de cotas $h$.", items: [seg([480, 330], [690, 180], "amarillo", false, 5), txt([560, 240], "D", "amarillo", 24)] },
  ],
});

const figuras = (): Diagrama => {
  const r = [cab(0, 0, 0), cab(220, 0, 0), cab(220, 140, 0), cab(0, 140, 0)];
  return {
    label: "Figuras planas en el plano XOY: x real, y reducida",
    pasos: [
      { texto: "En el plano $XOY$ el **rectángulo** se proyecta en un **paralelogramo**: los lados paralelos a $X$ en verdadera magnitud, los paralelos a $Y$ reducidos.", items: [...ejes(240), poli(r, "azul", 0.18)] },
      { texto: "El **triángulo** inscrito se dibuja punto a punto con las mismas reglas.", items: [poli([cab(110, 0, 0), cab(0, 140, 0), cab(220, 140, 0)], "naranja", 0.2)] },
      { texto: "Igual con **hexágonos** y **pentágonos**: se parte de las coordenadas de los vértices en verdadera magnitud.", items: [lin([cab(60, 40, 0), cab(160, 40, 0), cab(200, 90, 0), cab(160, 130, 0), cab(60, 130, 0), cab(20, 90, 0), cab(60, 40, 0)], "verde", false, 3.4)] },
    ],
  };
};

const curvas = (): Diagrama => {
  const plano = (x: number): Pt => [60 + x, 150 - 50 * Math.sin(x / 55) - 20];
  const pts = Array.from({ length: 16 }, (_, i) => plano(i * 22));
  return {
    label: "Curva en el plano XOY, punto a punto",
    pasos: [
      { texto: "Una curva dada en verdadera forma sobre un plano horizontal.", items: [seg([50, 210], [430, 210], "gris", false, 2), lin(pts, "azul", false, 3.6), txt([240, 250], "verdadera forma", "azul", 19)] },
      { texto: "Se pasa **punto a punto**: las abscisas (paralelas a $X$) se conservan; las **ordenadas se reducen** según $\\mu$.", items: [...pts.filter((_, i) => i % 3 === 0).map((p) => seg(p, [p[0], 210], "gris", true, 1.6))] },
      { texto: "Se unen los puntos obtenidos: la curva queda **deformada** (más estrecha en profundidad).", items: [lin(pts.map((p) => [p[0] + 310, 230 + (p[1] - 210) * 0.5 * 1] as Pt), "naranja", false, 4)] },
    ],
  };
};

const ellipseConj = (c: Pt, u: Pt, v: Pt): Pt[] => Array.from({ length: 73 }, (_, i) => {
  const t = (i / 72) * 6.2832;
  return [c[0] + Math.cos(t) * u[0] + Math.sin(t) * v[0], c[1] + Math.cos(t) * u[1] + Math.sin(t) * v[1]] as Pt;
});

const circunferenciaCab = (): Diagrama => {
  const R = 70;
  const cz: Pt = [200, 230];
  const cx: Pt = [560, 290];
  return {
    label: "La circunferencia en caballera: círculo en ZOX y elipses en XOY y ZOY",
    pasos: [
      { texto: "En el plano $ZOX$ (el del cuadro) la circunferencia se proyecta **igual**, con su radio $R$.", items: [lin(Array.from({ length: 73 }, (_, i) => [cz[0] + R * Math.cos((i / 72) * 6.2832), cz[1] + R * Math.sin((i / 72) * 6.2832)] as Pt), "azul", false, 4), seg([cz[0] - R - 20, cz[1]], [cz[0] + R + 20, cz[1]], "gris", true), seg([cz[0], cz[1] - R - 20], [cz[0], cz[1] + R + 20], "gris", true)] },
      { texto: "En $XOY$ es una **elipse**: diámetros conjugados $CD \\parallel X$ ($=2R$) y $AB \\parallel Y$ reducido ($=2\\mu R$).", items: [poli([cab(-R, -R, 0, 0.5, cx), cab(R, -R, 0, 0.5, cx), cab(R, R, 0, 0.5, cx), cab(-R, R, 0, 0.5, cx)], "gris", 0.1), lin(ellipseConj(cx, [R, 0], [-R * 0.5 * K45, R * 0.5 * K45]), "naranja", false, 4)] },
      { texto: "En $ZOY$ el eje mayor sale en la dirección del eje $Z$ sin reducir; se traza a lápiz y a mano alzada o con plantilla.", items: [seg([cx[0] - 120, cx[1] - 80], [cx[0] - 120, cx[1] - 80]), txt([400, 385], "elipse inscrita en el romboide de tangentes", "amarillo", 20)] },
    ],
  };
};

const ovaloCab = (): Diagrama => {
  const o: Pt = [400, 220];
  const R = 80;
  const f = (x: number, y: number): Pt => [o[0] + x - y * K45, o[1] + y * K45];
  const rombo = [f(R, R), f(R, -R), f(-R, -R), f(-R, R)];
  return {
    label: "Óvalo en lugar de elipse (sin reducción, μ = 1)",
    pasos: [
      { texto: "Con $\\mu = 1$ no hay reducción en $Y$ y la elipse se puede **sustituir por un óvalo**, algo achatado en los extremos.", items: [poli(rombo, "gris", 0.1), pt(f(R, 0), "D", "azul", 8, 6), pt(f(-R, 0), "C", "azul", -22, 6), pt(f(0, R), "A", "azul", -22, 18), pt(f(0, -R), "B", "azul", 8, -6)] },
      { texto: "Por los puntos de tangencia se trazan las **normales a los lados** del romboide: se cortan en los **centros** $C_1$, $C_2$, $C_3$, $C_4$.", items: [seg(f(R, 0), [o[0] + R + 70 * K45, o[1] - 70 * K45 * 0 - 70 * K45], "gris", true), seg(f(0, R), [f(0, R)[0], f(0, R)[1] - 150], "gris", true)] },
      { texto: "Cuatro arcos tangentes forman el óvalo. El procedimiento exige más tiempo y precisión que el de la elipse.", items: [lin(ellipseConj(o, [R, 0], [-R * K45, R * K45]), "naranja", false, 4)] },
    ],
  };
};

const pieza = (): Diagrama => {
  const o: Pt = [300, 290];
  const c = caja(200, -120, 130, 0.5, o);
  return {
    label: "Perspectiva caballera de una pieza: la cara principal en verdadera forma",
    pasos: [
      { texto: "Se estudian las **vistas diédricas** de la pieza y se descompone en sólidos sencillos (prismas, cilindros…).", items: [poli([[110, 120], [210, 120], [210, 200], [110, 200]], "azul", 0.18), txt([160, 230], "alzado", "azul", 19)] },
      { texto: "La cara con **más detalle** se pone **paralela al cuadro**: se copia en **verdadera forma** (alzado).", items: [poli([c[0]!, c[1]!, c[5]!, c[4]!], "azul", 0.22)]  },
      { texto: "Se añaden las **aristas de profundidad**, paralelas a $Y$ y reducidas a la mitad, y se remata la pieza.", items: [poli([c[3]!, c[2]!, c[6]!, c[7]!], "naranja", 0.18), seg(c[4]!, c[7]!, "gris", true), seg(c[5]!, c[6]!, "gris", true), seg(c[1]!, c[2]!, "gris", true), seg(c[0]!, c[3]!, "gris", true)] },
    ],
  };
};

export const DIAGRAMAS_CABALLERA: Record<string, Diagrama> = {
  "d15-fundamentos": fundamentos(), "d15-punto": punto(), "d15-notaciones": notaciones(), "d15-datos": datos(), "d15-coeficiente": coeficiente(),
  "d15-punto-cab": puntoCab(), "d15-paso-diedrico": pasoDiedrico(), "d15-distancia-1": distancia1(), "d15-distancia-2": distancia2(), "d15-figuras": figuras(),
  "d15-curvas": curvas(), "d15-circunferencia": circunferenciaCab(), "d15-ovalo": ovaloCab(), "d15-pieza": pieza(),
};
export { fl };
