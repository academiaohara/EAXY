import { arc, circ, fl, gira, homo, lerp2, lin, medio, pol, poli, pt, resta, seg, suma, txt, type Diagrama, type Item, type Pt } from "./engine";

const T = (p: Pt, d: Pt): Pt => suma(p, d);

/* ───────────── Tema 7: transformaciones geométricas ───────────── */

const trasProp = (): Diagrama => {
  const d: Pt = [260, -70];
  const flechas = (f: Pt[], w = 2): Item[] => f.map((p) => fl(p, T(p, d), "verde", w));
  /** Rótulos de los vértices de una figura: la original con su letra y la trasladada con prima. */
  const nom = (f: Pt[], n: string[], c: "azul" | "naranja", ap: string, off: [number, number][]): Item[] =>
    f.map((p, i) => pt(p, `${n[i]}${ap}`, c, off[i]![0], off[i]![1]));
  const arcoAng = (v: Pt, a: Pt, b: Pt, r: number, c: "amarillo" | "verde" | "naranja"): Item => {
    const g = (q: Pt) => (Math.atan2(-(q[1] - v[1]), q[0] - v[0]) * 180) / Math.PI;
    const g1 = g(a);
    let df = g(b) - g1;
    while (df > 180) df -= 360;
    while (df <= -180) df += 360;
    return df > 0 ? arc(v, r, g1, g1 + df, c) : arc(v, r, g1 + df, g1, c);
  };
  const A: Pt = [60, 280], B: Pt = [170, 190];
  const P: Pt[] = [[90, 230], [60, 330], [160, 380], [250, 330], [210, 235]];
  const V: Pt = [90, 300], Q1: Pt = [40, 200], Q2: Pt = [210, 250];
  const Cc: Pt = [140, 290];
  return {
    label: "Traslación: propiedades de la recta, el ángulo, la figura y el círculo",
    pasos: [
      { solo: true, texto: "**Recta.** La trasladada de una recta es otra recta **paralela** a ella: $r' \\parallel r$. Cada punto de $r$ se mueve según el mismo vector.", items: [
        seg(lerp2(A, B, -0.4), lerp2(A, B, 1.4), "azul"), seg(T(lerp2(A, B, -0.4), d), T(lerp2(A, B, 1.4), d), "naranja"),
        ...flechas([A, B]), pt(A, "A", "azul", -16, 8), pt(B, "B", "azul", -14, -8), pt(T(A, d), "A′", "naranja", 14, 20), pt(T(B, d), "B′", "naranja", 14, 20),
        txt(lerp2(A, B, -0.5), "r", "azul", 24), txt(T(lerp2(A, B, -0.5), d), "r′", "naranja", 24),
      ] },
      { solo: true, texto: "**Ángulo.** Un ángulo se transforma en otro ángulo **igual**: $\\alpha' = \\alpha$. Los lados se mueven sin girar, así que no cambia su abertura.", items: [
        lin([Q1, V, Q2], "azul"), lin([Q1, V, Q2].map((q) => T(q, d)), "naranja"), ...flechas([V]),
        arcoAng(V, Q1, Q2, 36, "amarillo"), arcoAng(T(V, d), T(Q1, d), T(Q2, d), 36, "amarillo"),
        txt(pol(V, 58, 75), "α", "amarillo", 24), txt(pol(T(V, d), 58, 75), "α′", "amarillo", 24),
        pt(V, "V", "azul", -16, 18), pt(T(V, d), "V′", "naranja", -16, 18),
      ] },
      { solo: true, texto: "**Figura.** Cualquier figura poligonal se transforma en otra **igual**: mismos lados y mismos ángulos. Todos sus vértices se trasladan con el **mismo vector**.", items: [
        poli(P, "azul", 0.16), poli(P.map((q) => T(q, d)), "naranja", 0.16), ...flechas(P, 1.8),
        ...nom(P, ["A", "B", "C", "D", "E"], "azul", "", [[-16, 4], [-16, 14], [0, 24], [16, 14], [16, -4]]),
        ...nom(P.map((q) => T(q, d)), ["A", "B", "C", "D", "E"], "naranja", "′", [[-16, 4], [-18, 14], [4, 24], [18, 14], [18, -4]]),
        txt([140, 300], "F", "azul", 26), txt(T([140, 300], d), "F′", "naranja", 26),
      ] },
      { solo: true, texto: "**Círculo.** Un círculo se transforma en otro círculo **igual**, de **igual radio**, cuyo centro $O'$ es el trasladado del centro $O$.", items: [
        circ(Cc, 70, "azul", 0.16), circ(T(Cc, d), 70, "naranja", 0.16), fl(Cc, T(Cc, d), "verde", 2.4),
        seg(Cc, pol(Cc, 70, 200), "azul"), seg(T(Cc, d), pol(T(Cc, d), 70, 200), "naranja"),
        pt(Cc, "O", "azul", 14, 18), pt(T(Cc, d), "O′", "naranja", 14, 18),
        txt(pol(Cc, 42, 215), "r", "azul", 22), txt(pol(T(Cc, d), 42, 215), "r", "naranja", 22),
      ] },
    ],
  };
};

const giroProp = (): Diagrama => {
  const O: Pt = [150, 300];
  const al = 60;
  const A: Pt = pol(O, 130, 35);
  const Ap = gira(A, O, al);
  const recta = (p: Pt, deg: number, l: number): [Pt, Pt] => [pol(p, l, deg + 90), pol(p, l, deg - 90)];
  const [r0, r1] = recta(A, 35, 130);
  const [s0, s1] = recta(Ap, 35 + al, 130);
  /** Marca de ángulo recto en `p`, entre la dirección `d1` y la `d2` (grados). */
  const recto = (p: Pt, d1: number, d2: number): Item => {
    const a = pol(p, 14, d1);
    const b = pol(p, 14, d2);
    return lin([a, suma(a, resta(b, p)), b], "gris");
  };
  const Oc: Pt = O;
  const cc: Pt = pol(Oc, 150, 5);
  const ccp = gira(cc, Oc, al);
  return {
    label: "Giro: transformada de una recta y de una circunferencia",
    pasos: [
      { solo: true, texto: "Para girar una **recta** $r$: por el centro $O$ se traza la **perpendicular** a $r$. Su pie es el punto $A$.", items: [
        seg(r0, r1, "azul"), seg(O, A, "azul", true), recto(A, 215, 125), pt(O, "O", "verde", -18, 8), pt(A, "A", "azul", 14, -8), txt(r1, "r", "azul", 24),
      ] },
      { solo: true, texto: "Se **gira el punto $A$** el ángulo $\\alpha$ alrededor de $O$ y se obtiene $A'$, con $OA' = OA$.", items: [
        seg(r0, r1, "azul"), seg(O, A, "azul", true), pt(O, "O", "verde", -18, 8), pt(A, "A", "azul", 14, -8), txt(r1, "r", "azul", 24),
        seg(O, Ap, "naranja", true), arc(O, 55, 35, 35 + al, "verde"), txt(pol(O, 80, 35 + al / 2), "α", "verde", 24), pt(Ap, "A′", "naranja", -16, -8),
        arc(O, 130, 35, 35 + al, "gris"),
      ] },
      { solo: true, texto: "La **recta girada** $r'$ es la **perpendicular a $OA'$** por $A'$: el ángulo recto se conserva, y $r'$ forma con $r$ el mismo ángulo $\\alpha$.", items: [
        seg(r0, r1, "azul"), seg(O, A, "azul", true), pt(O, "O", "verde", -18, 8), pt(A, "A", "azul", 14, -8), txt(r1, "r", "azul", 24),
        seg(O, Ap, "naranja", true), arc(O, 55, 35, 35 + al, "verde"), txt(pol(O, 80, 35 + al / 2), "α", "verde", 24), pt(Ap, "A′", "naranja", -16, -8),
        seg(s0, s1, "naranja"), recto(Ap, 275, 185), txt(s0, "r′", "naranja", 24),
      ] },
      { solo: true, texto: "Una **circunferencia** gira hasta otra **igual**: basta girar su centro $C$ hasta $C'$ y trazarla con el **mismo radio**.", items: [
        circ(cc, 50, "azul", 0.16), circ(ccp, 50, "naranja", 0.16), pt(Oc, "O", "verde", -18, 8), pt(cc, "C", "azul", 14, 18), pt(ccp, "C′", "naranja", 14, 18),
        seg(Oc, cc, "azul", true), seg(Oc, ccp, "naranja", true), arc(Oc, 55, 5, 5 + al, "verde"), txt(pol(Oc, 80, 5 + al / 2), "α", "verde", 24),
      ] },
    ],
  };
};

const homoCasos = (): Diagrama => {
  const C: Pt = [230, 215];
  const F: Pt[] = [[330, 130], [350, 250], [430, 190]];
  const F2 = F.map((p) => homo(p, C, -1));
  const N = ["A", "B", "D"];
  const g = (v: Pt, q: Pt) => (Math.atan2(-(q[1] - v[1]), q[0] - v[0]) * 180) / Math.PI;
  /** Arco del ángulo que forman, en `v`, las rectas hacia `a` y hacia `b`. */
  const angulo = (v: Pt, a: Pt, b: Pt, r: number, col: "amarillo"): Item => {
    const g1 = g(v, a);
    let df = g(v, b) - g1;
    while (df > 180) df -= 360;
    while (df <= -180) df += 360;
    return df > 0 ? arc(v, r, g1, g1 + df, col) : arc(v, r, g1 + df, g1, col);
  };
  const bis = (v: Pt, a: Pt, b: Pt, r: number): Pt => {
    const g1 = g(v, a);
    let df = g(v, b) - g1;
    while (df > 180) df -= 360;
    while (df <= -180) df += 360;
    return pol(v, r, g1 + df / 2);
  };
  const rot = (f: Pt[], c: "azul" | "naranja", ap: string) => f.map((p, i) => pt(p, `${N[i]}${ap}`, c, i === 0 ? 14 : i === 1 ? 14 : 16, i === 0 ? -8 : 20));
  return {
    label: "Homotecia: identidad, simetría central y semejanza",
    pasos: [
      { solo: true, texto: "Si $K = 1$ la homotecia es la **identidad**: cada punto coincide con su homólogo y la figura no cambia.", items: [
        poli(F, "azul", 0.2), ...rot(F, "azul", ""), pt(C, "C", "verde", -16, 22), txt([380, 300], "K = 1 · identidad", "amarillo", 22),
      ] },
      { solo: true, texto: "Si $K = -1$ es una **simetría central**: $A$ y $A'$ quedan a la misma distancia de $C$, uno a cada lado, y la figura es **igual**.", items: [
        poli(F, "azul", 0.2), poli(F2, "naranja", 0.2), ...F.map((p, i) => seg(p, F2[i]!, "gris", true)),
        ...rot(F, "azul", ""), ...rot(F2, "naranja", "′"), pt(C, "C", "verde", -16, 22), txt([380, 330], "K = −1 · simetría central", "amarillo", 22),
      ] },
      { solo: true, texto: "Las rectas homólogas son **paralelas**, así que los **ángulos homólogos son iguales** ($\\alpha' = \\alpha$): las figuras homotéticas son **semejantes**.", items: [
        poli(F, "azul", 0.2), poli(F2, "naranja", 0.2), ...F.map((p, i) => seg(p, F2[i]!, "gris", true)),
        ...rot(F, "azul", ""), ...rot(F2, "naranja", "′"), pt(C, "C", "verde", -16, 22),
        angulo(F[0]!, F[1]!, F[2]!, 30, "amarillo"), txt(bis(F[0]!, F[1]!, F[2]!, 50), "α", "amarillo", 22),
        angulo(F2[0]!, F2[1]!, F2[2]!, 30, "amarillo"), txt(bis(F2[0]!, F2[1]!, F2[2]!, 50), "α′", "amarillo", 22),
        txt([380, 330], "AB ∥ A′B′ · AD ∥ A′D′", "gris", 20),
      ] },
    ],
  };
};

/* ───────────── Tema 8: tangencias ───────────── */

const posiciones = (): Diagrama => {
  const rec = (x: number, r: number, dy: number) => ({ c: [x, 150 + dy] as Pt, r });
  const L = (x: number): [Pt, Pt] => [[x - 90, 300], [x + 90, 300]];
  const p1 = rec(110, 50, 0);
  const p2 = rec(330, 50, 50);
  const p3 = rec(550, 50, 80);
  return {
    label: "Posiciones relativas de recta y circunferencia, y de dos circunferencias",
    pasos: [
      { texto: "Una recta y una circunferencia pueden ser **exteriores**: no tienen ningún punto común.", items: [
        circ(p1.c, p1.r, "azul", 0.16), seg(...L(110), "naranja"), txt([110, 340], "exteriores", "gris", 20),
      ] },
      { texto: "**Tangentes**: un único punto común, el de tangencia $T$, donde el radio es perpendicular a la recta.", items: [
        circ(p2.c, p2.r, "azul", 0.16), seg(...L(330), "naranja"), pt([330, 300], "T", "verde", 10, 22), seg(p2.c, [330, 300], "verde", true), txt([330, 340], "tangentes", "gris", 20),
      ] },
      { texto: "**Secantes**: dos puntos comunes.", items: [
        circ(p3.c, p3.r, "azul", 0.16), seg(...L(550), "naranja"), pt([514, 300], "", "rojo"), pt([586, 300], "", "rojo"), txt([550, 340], "secantes", "gris", 20),
      ] },
    ],
  };
};

const lugares = (): Diagrama => {
  const r = 40;
  const recta: [Pt, Pt] = [[60, 330], [740, 330]];
  const T0: Pt = [260, 330];
  return {
    label: "Centros de las circunferencias tangentes: lugares geométricos",
    pasos: [
      { texto: "Las circunferencias **tangentes a una recta en un punto** $T$ tienen el centro en la **perpendicular** a la recta por $T$.", items: [
        seg(...recta, "naranja"), pt(T0, "T", "naranja", 10, 22), seg([T0[0], 330], [T0[0], 60], "morado", true),
        circ([T0[0], 330 - 50], 50, "azul", 0.1), circ([T0[0], 330 - 110], 110, "azul", 0.06), pt([T0[0], 280], "", "azul"), pt([T0[0], 220], "", "azul"),
      ] },
      { texto: "Las de **radio dado** $r$ tangentes a la recta tienen el centro en la **paralela** a distancia $r$.", items: [
        seg([60, 330 - r], [740, 330 - r], "verde", true), circ([460, 330 - r], r, "azul", 0.16), circ([580, 330 - r], r, "azul", 0.16), circ([670, 330 - r], r, "azul", 0.16),
        txt([720, 330 - r - 10], "r", "verde", 20),
      ] },
      { texto: "Las **tangentes a una circunferencia** de centro $O$ y radio $R$ con radio $r$ tienen el centro en una **concéntrica** de radio $R \\pm r$.", items: [
        circ([560, 140], 50, "naranja", 0.14), circ([560, 140], 90, "verde", 0, true), circ([620, 80], 40, "azul", 0.16), pt([560, 140], "O", "naranja", -22, 8),
      ] },
    ],
  };
};

const enlace = (): Diagrama => {
  const V: Pt = [460, 330];
  const R = 110;
  const O: Pt = [V[0] - R, V[1] - R];
  const T1: Pt = [O[0], V[1]];
  const T2: Pt = [V[0], O[1]];
  return {
    label: "Enlace de dos rectas con un arco tangente",
    pasos: [
      { texto: "**Enlazar** dos líneas es unirlas con un arco **tangente** a ambas, sin cambios bruscos de dirección. Aquí, dos rectas perpendiculares que se cortan en $V$.", items: [
        seg([60, V[1]], V, "azul"), seg(V, [V[0], 50], "azul"), pt(V, "V", "blanco", 12, 22),
      ] },
      { texto: "El centro $O$ del arco de radio $R$ está a distancia $R$ de las dos rectas. Los **puntos de tangencia** $T_1$ y $T_2$ son los pies de las perpendiculares desde $O$.", items: [
        pt(O, "O", "verde", -22, 8), seg(O, T1, "verde", true), seg(O, T2, "verde", true), pt(T1, "T₁", "amarillo", -6, 28), pt(T2, "T₂", "amarillo", 14, 6),
        circ(O, R, "verde", 0, true),
      ] },
      { texto: "El enlace es el arco $T_1T_2$: la curva empalma **suavemente** con las dos rectas.", items: [
        arc(O, R, 270, 360, "naranja"), txt([O[0] + 80, O[1] + 100], "R", "verde", 22),
      ] },
    ],
  };
};

const rectificar = (): Diagrama => {
  const O: Pt = [170, 215];
  const r = 80;
  const x0 = 360;
  const L = Math.PI * 2 * r;
  return {
    label: "Rectificación de la circunferencia: longitud 2πr",
    pasos: [
      { texto: "**Rectificar** una circunferencia es hallar un **segmento** de su misma longitud.", items: [
        circ(O, r, "azul", 0.14), pt(O, "O", "azul", -20, 8),
      ] },
      { texto: "La longitud de la circunferencia es $2\\pi r \\approx 6{,}28\\,r$: algo más de **tres diámetros**.", items: [
        seg([x0, 150], [x0 + 2 * r, 150], "naranja"), seg([x0 + 2 * r, 150], [x0 + 4 * r, 150], "naranja"), seg([x0 + 4 * r, 150], [x0 + 6 * r, 150], "naranja"),
        seg([x0 + 6 * r, 150], [x0 + 6.28 * r + 0, 150], "amarillo"), txt([x0 + 3 * r, 120], "3 diámetros", "naranja", 20),
      ] },
      { texto: "El segmento rectificado mide $2\\pi r$.", items: [
        seg([x0, 300], [x0 + L * 0.5, 300], "verde", false, 4.5), txt([x0 + L * 0.25, 335], "2πr (semicircunferencia = πr)", "verde", 20),
      ] },
    ],
  };
};

/* ───────────── Tema 9: curvas técnicas ───────────── */

const ovalo = (): Diagrama => {
  const O1: Pt = [300, 215];
  const O2: Pt = [500, 215];
  const O3: Pt = [400, 320];
  const O4: Pt = [400, 110];
  const r = 60;
  const R = 205;
  const th = 46.4;
  return {
    label: "Óvalo: cuatro arcos enlazados con dos ejes de simetría",
    pasos: [
      { texto: "Un **óvalo** es una curva cerrada con **dos ejes de simetría**, formada por **cuatro arcos** de circunferencia enlazados.", items: [
        seg([210, 215], [590, 215], "gris", true), seg([400, 90], [400, 340], "gris", true), txt([600, 222], "eje mayor", "gris", 18, "start"), txt([408, 84], "eje menor", "gris", 18, "start"),
      ] },
      { texto: "Los dos arcos **pequeños** tienen sus centros $O_1$ y $O_2$ en el eje mayor.", items: [
        pt(O1, "O₁", "verde", -26, 24), pt(O2, "O₂", "verde", 10, 24), arc(O1, r, 180 - th, 180 + th, "naranja"), arc(O2, r, -th, th, "naranja"),
      ] },
      { texto: "Los dos arcos **grandes** tienen sus centros $O_3$ y $O_4$ en el eje menor, y se enlazan con los pequeños en los **puntos de tangencia**, alineados con los centros.", items: [
        pt(O3, "O₃", "azul", 10, 8), pt(O4, "O₄", "azul", 10, 8), arc(O3, R, th, 180 - th, "naranja"), arc(O4, R, 180 + th, 360 - th, "naranja"),
        seg(O3, pol(O3, R, 180 - th), "azul", true), seg(O3, pol(O3, R, th), "azul", true), seg(O4, pol(O4, R, 180 + th), "azul", true), seg(O4, pol(O4, R, 360 - th), "azul", true),
      ] },
    ],
  };
};

const espirales = (): Diagrama => {
  const O: Pt = [210, 215];
  const spiral: Pt[] = Array.from({ length: 70 }, (_, i) => pol(O, 6 + i * 2.3, i * 18));
  const helix: Pt[] = Array.from({ length: 50 }, (_, i) => [440 + i * 6 + 28 * Math.cos(i * 0.5), 300 - i * 4.5 + 22 * Math.sin(i * 0.5)] as Pt);
  return {
    label: "Voluta, espiral de Arquímedes y hélice",
    pasos: [
      { texto: "La **espiral de Arquímedes**: un punto se aleja del centro con **velocidad constante** mientras gira con velocidad angular constante; el radio crece de forma **uniforme**.", items: [
        pt(O, "O", "verde", -20, 8), lin(spiral, "naranja", false, 3.5),
      ] },
      { texto: "La **voluta** se forma con **arcos de circunferencia** de centros sucesivos y radios crecientes, enlazados.", items: [
        lin([[330, 100], [315, 80], [300, 82], [290, 100], [297, 118], [316, 122]], "azul", false, 3.5), circ([310, 100], 1, "azul"),
      ] },
      { texto: "La **hélice** es una curva que sube con **paso constante** alrededor de un cilindro: en proyección vertical es una sinusoide.", items: [
        lin(helix, "morado", false, 3.5), seg([420, 330], [420, 70], "gris", true),
      ] },
    ],
  };
};

/* ───────────── Tema 10: curvas cónicas ───────────── */

const conicas = (): Diagrama => {
  const V: Pt = [220, 210];
  return {
    label: "Las curvas cónicas como secciones de un cono",
    pasos: [
      { texto: "Las **cónicas** son las curvas que resultan de cortar un **cono de revolución** con un plano.", items: [
        poli([[60, 60], [220, 210], [380, 60]], "gris", 0.06), poli([[60, 360], [220, 210], [380, 360]], "gris", 0.06), pt(V, "V", "blanco", 10, -12),
      ] },
      { texto: "Un plano **perpendicular al eje** da una **circunferencia**; **oblicuo** a todas las generatrices, una **elipse**.", items: [
        seg([90, 130], [350, 130], "naranja"), seg([110, 100], [330, 160], "verde"),
        circ([560, 110], 42, "naranja", 0.14), txt([560, 175], "circunferencia", "naranja", 19),
        lin(Array.from({ length: 40 }, (_, i) => [680 + 52 * Math.cos((i / 39) * 6.2832), 110 + 30 * Math.sin((i / 39) * 6.2832)] as Pt), "verde", false, 3),
        txt([680, 175], "elipse", "verde", 19),
      ] },
      { texto: "Paralelo a una generatriz: **parábola**. Corta a las dos hojas del cono: **hipérbola**.", items: [
        seg([110, 330], [360, 100], "amarillo"), seg([300, 40], [300, 380], "rojo"),
        lin(Array.from({ length: 31 }, (_, i) => [560 + (i - 15) * 8, 280 + ((i - 15) * 8) ** 2 / 200 - 40] as Pt), "amarillo", false, 3), txt([580, 340], "parábola", "amarillo", 19),
        lin(Array.from({ length: 21 }, (_, i) => [680 + (i - 10) * 5 + 0, 240 - Math.sqrt(1 + ((i - 10) / 5) ** 2) * 20 + 30] as Pt), "rojo", false, 3),
        lin(Array.from({ length: 21 }, (_, i) => [680 + (i - 10) * 5 + 0, 300 + Math.sqrt(1 + ((i - 10) / 5) ** 2) * 20 - 30] as Pt), "rojo", false, 3), txt([700, 370], "hipérbola", "rojo", 19),
      ] },
    ],
  };
};

const elipse = (): Diagrama => {
  const O: Pt = [400, 215];
  const a = 220;
  const b = 130;
  const c = Math.sqrt(a * a - b * b);
  const F1: Pt = [O[0] - c, 215];
  const F2: Pt = [O[0] + c, 215];
  const P: Pt = [O[0] + a * Math.cos(0.9), O[1] - b * Math.sin(0.9)];
  const pts: Pt[] = Array.from({ length: 73 }, (_, i) => [O[0] + a * Math.cos((i / 72) * 6.2832), O[1] + b * Math.sin((i / 72) * 6.2832)] as Pt);
  return {
    label: "La elipse: focos, suma constante de distancias y ejes",
    pasos: [
      { texto: "La **elipse** es el lugar geométrico de los puntos cuya **suma de distancias a dos puntos fijos**, los **focos** $F$ y $F'$, es constante e igual a $2a$.", items: [
        lin(pts, "naranja", false, 3.5), pt(F1, "F", "verde", -8, 28), pt(F2, "F′", "verde", -8, 28),
      ] },
      { texto: "Para cualquier punto $P$: $PF + PF' = 2a$, la longitud del **eje mayor**.", items: [
        pt(P, "P", "amarillo", 10, -8), seg(F1, P, "amarillo", true), seg(F2, P, "amarillo", true),
      ] },
      { texto: "Los **ejes** son perpendiculares; el centro $O$ es su punto medio y $b^2 = a^2 - c^2$.", items: [
        seg([O[0] - a, 215], [O[0] + a, 215], "azul", true), seg([O[0], 215 - b], [O[0], 215 + b], "azul", true), pt(O, "O", "blanco", 8, 22),
        txt([O[0] + 110, 205], "a", "azul", 20), txt([O[0] + 14, 150], "b", "azul", 20), txt([O[0] - 22, 240], "c", "verde", 20),
      ] },
    ],
  };
};

const hiperbola = (): Diagrama => {
  const O: Pt = [400, 215];
  const a = 90;
  const b = 70;
  const c = Math.sqrt(a * a + b * b);
  const ramaD: Pt[] = Array.from({ length: 41 }, (_, i) => {
    const t = (i - 20) / 10;
    return [O[0] + a * Math.cosh(t), O[1] + b * Math.sinh(t)] as Pt;
  });
  const ramaI: Pt[] = ramaD.map((p) => [2 * O[0] - p[0], p[1]] as Pt);
  const P: Pt = ramaD[28]!;
  const F1: Pt = [O[0] - c, 215];
  const F2: Pt = [O[0] + c, 215];
  return {
    label: "La hipérbola: focos, diferencia constante de distancias y asíntotas",
    pasos: [
      { texto: "La **hipérbola** es el lugar geométrico de los puntos cuya **diferencia de distancias** a dos focos es constante, $2a$. Tiene **dos ramas**.", items: [
        lin(ramaD, "naranja", false, 3.5), lin(ramaI, "naranja", false, 3.5), pt(F1, "F", "verde", -8, 28), pt(F2, "F′", "verde", -8, 28), pt(O, "O", "blanco", 8, 22),
      ] },
      { texto: "Para cualquier punto $P$: $|PF - PF'| = 2a$.", items: [
        pt(P, "P", "amarillo", 10, -8), seg(F1, P, "amarillo", true), seg(F2, P, "amarillo", true),
      ] },
      { texto: "Las **asíntotas** son las rectas a las que se acercan las ramas sin tocarlas, con pendiente $\\pm b/a$.", items: [
        seg([O[0] - 330, O[1] - 330 * b / a], [O[0] + 330, O[1] + 330 * b / a], "morado", true), seg([O[0] - 330, O[1] + 330 * b / a], [O[0] + 330, O[1] - 330 * b / a], "morado", true),
      ] },
    ],
  };
};

const parabola = (): Diagrama => {
  const V: Pt = [400, 330];
  const p = 60;
  const F: Pt = [400, 330 - p / 2];
  const curva: Pt[] = Array.from({ length: 61 }, (_, i) => {
    const x = (i - 30) * 7;
    return [V[0] + x, V[1] - (x * x) / (2 * p)] as Pt;
  });
  const P: Pt = curva[46]!;
  return {
    label: "La parábola: foco, directriz y equidistancia",
    pasos: [
      { texto: "La **parábola** es el lugar geométrico de los puntos que **equidistan** de un punto fijo, el **foco** $F$, y de una recta fija, la **directriz** $d$.", items: [
        lin(curva, "naranja", false, 3.5), pt(F, "F", "verde", 12, 6), seg([200, V[1] + p / 2], [600, V[1] + p / 2], "azul"), txt([620, V[1] + p / 2 + 6], "d", "azul", 22),
      ] },
      { texto: "Para cualquier punto $P$: la distancia a $F$ es igual a la distancia a $d$.", items: [
        pt(P, "P", "amarillo", 12, -8), seg(P, F, "amarillo", true), seg(P, [P[0], V[1] + p / 2], "amarillo", true),
      ] },
      { texto: "El **eje** es la perpendicular a la directriz por el foco; el **vértice** $V$ es el punto medio entre foco y directriz.", items: [
        seg([400, 30], [400, 390], "gris", true), pt(V, "V", "blanco", 10, 22),
      ] },
    ],
  };
};

/* ───────────── Tema 11: sistemas de representación ───────────── */

const descriptiva = (): Diagrama => {
  const caja = (o: Pt): Pt[][] => [
    [o, [o[0] + 80, o[1]], [o[0] + 80, o[1] - 80], [o[0], o[1] - 80]],
    [[o[0], o[1] - 80], [o[0] + 80, o[1] - 80], [o[0] + 130, o[1] - 120], [o[0] + 50, o[1] - 120]],
    [[o[0] + 80, o[1]], [o[0] + 130, o[1] - 40], [o[0] + 130, o[1] - 120], [o[0] + 80, o[1] - 80]],
  ];
  const c = caja([120, 320]);
  return {
    label: "Geometría descriptiva: representar cuerpos mediante proyecciones planas",
    pasos: [
      { texto: "La **geometría descriptiva** representa **cuerpos del espacio** mediante sus **proyecciones sobre un plano**.", items: [
        ...c.map((q, i) => poli(q, i === 0 ? "azul" : i === 1 ? "verde" : "naranja", 0.22)),
      ] },
      { texto: "Cada **vista** (planta, alzado, perfil) es la proyección del cuerpo sobre un plano.", items: [
        poli([[400, 120], [480, 120], [480, 200], [400, 200]], "azul", 0.22), txt([440, 225], "alzado", "azul", 19),
        poli([[400, 250], [480, 250], [480, 300], [400, 300]], "verde", 0.22), txt([440, 325], "planta", "verde", 19),
        poli([[520, 120], [570, 120], [570, 200], [520, 200]], "naranja", 0.22), txt([545, 225], "perfil", "naranja", 19),
        fl([270, 250], [380, 200], "gris", 2.4), fl([270, 250], [380, 290], "gris", 2.4), fl([270, 250], [510, 170], "gris", 2.4),
      ] },
      { texto: "Su problema fundamental es **reducir las construcciones del espacio a construcciones en el plano**.", items: [
        txt([600, 330], "espacio → plano", "amarillo", 26),
      ] },
    ],
  };
};

const proyecciones = (): Diagrama => {
  const plano = (x: number): [Pt, Pt] => [[x - 120, 340], [x + 120, 340]];
  const pts: Pt[] = [[-60, 150], [0, 110], [60, 170]];
  return {
    label: "Proyección cilíndrica (paralela) y cónica (central)",
    pasos: [
      { texto: "En la proyección **paralela o cilíndrica** los rayos proyectantes son **paralelos**. Si son perpendiculares al plano, es **ortogonal**.", items: [
        seg(...plano(200), "gris", false, 4), ...pts.map((p) => pt(suma(p, [200, 0]), "", "azul")), ...pts.map((p) => seg(suma(p, [200, 0]), [200 + p[0], 340], "verde", true)),
        ...pts.map((p) => pt([200 + p[0], 340], "", "naranja")), txt([200, 385], "ortogonal", "verde", 20),
      ] },
      { texto: "Si los rayos son paralelos pero **oblicuos** al plano, la proyección es **oblicua**.", items: [
        ...pts.map((p) => seg(suma(p, [200, 0]), [200 + p[0] + 90 * (340 - p[1]) / 170, 340], "amarillo", true)),
        ...pts.map((p) => pt([200 + p[0] + 90 * (340 - p[1]) / 170, 340], "", "naranja")), txt([200, 405], "oblicua", "amarillo", 20),
      ] },
      { texto: "En la proyección **cónica o central** los rayos parten de un **punto propio** $V$, el punto de vista.", items: [
        seg(...plano(600), "gris", false, 4), pt([600, 40], "V", "rojo", 12, -6), ...pts.map((p) => seg([600, 40], [600 + p[0] * 1.9, 340], "rojo", true)),
        ...pts.map((p) => pt([600 + p[0] * 1.9, 340], "", "naranja")), txt([600, 385], "central", "rojo", 20),
      ] },
    ],
  };
};

const sistemas = (): Diagrama => {
  const b = (x: number, y: number, s: string, c: "azul" | "verde" | "naranja" | "morado" | "amarillo") => [
    poli([[x - 105, y - 25], [x + 105, y - 25], [x + 105, y + 25], [x - 105, y + 25]], c, 0.2), txt([x, y + 7], s, c, 19),
  ];
  return {
    label: "Los cinco sistemas de representación y su tipo de proyección",
    pasos: [
      { texto: "El **diédrico** y el de **planos acotados** usan la proyección paralela **ortogonal** sobre uno o dos planos: son sistemas de **representación**.", items: [
        txt([400, 40], "Proyección paralela ortogonal", "verde", 22), ...b(260, 100, "Sistema diédrico", "azul"), ...b(540, 100, "Planos acotados", "azul"),
      ] },
      { texto: "El **axonométrico** también es ortogonal; la **caballera** usa proyección paralela **oblicua**. Son sistemas de **perspectiva**.", items: [
        ...b(260, 190, "Axonométrico", "verde"), txt([400, 160], "ortogonal", "verde", 18), ...b(540, 190, "Perspectiva caballera", "naranja"), txt([540, 160], "oblicua", "naranja", 18),
      ] },
      { texto: "La **perspectiva cónica** emplea la proyección **central**, desde un punto de vista.", items: [
        ...b(400, 300, "Perspectiva cónica", "morado"), txt([400, 270], "central", "morado", 18),
      ] },
    ],
  };
};

const acotadosIntro = (): Diagrama => {
  const plano: Pt[] = [[80, 330], [520, 330], [640, 270], [200, 270]];
  const A: Pt = [330, 120];
  const Ap: Pt = [330, 300];
  return {
    label: "Sistema de planos acotados: un plano y las cotas",
    pasos: [
      { texto: "Se proyecta sobre un **único plano horizontal**, el plano de comparación (cota 0).", items: [
        poli(plano, "gris", 0.12), txt([560, 330], "plano de comparación", "gris", 18, "middle"),
      ] },
      { texto: "El punto $A$ se proyecta ortogonalmente en $A'$, y la **altura** se escribe como **cota**: $A'(5)$.", items: [
        pt(A, "A", "verde", 12, -6), seg(A, Ap, "verde", true), pt(Ap, "A′(5)", "naranja", 14, 20),
      ] },
      { texto: "Un punto **bajo** el plano tiene cota **negativa**: $C'(-4)$. Los puntos de cota cero están en el plano.", items: [
        pt([450, 360], "C", "rojo", 12, 6), seg([450, 360], [450, 300], "rojo", true), pt([450, 300], "C′(−4)", "rojo", 14, -10), pt([230, 300], "B′(0)", "azul", -14, 22),
      ] },
    ],
  };
};

/* ───────────── Tema 7: las tres transformaciones, una a una ───────────── */

const TRI: Pt[] = [[300, 260], [440, 260], [370, 130]];
const tiposTransf = (): Diagrama => {
  const d: Pt = [150, -70];
  const O: Pt = [250, 330];
  const G = TRI.map((p) => gira(p, O, -65));
  const C: Pt = [180, 300];
  const H = TRI.map((p) => homo(p, C, 1.6));
  const nombres = ["A", "B", "C"];
  const rotulos = (f: Pt[], c: "azul" | "naranja", ap = "") => f.map((p, i) => pt(p, `${nombres[i]}${ap}`, c, i === 2 ? 0 : i === 0 ? -14 : 14, i === 2 ? -14 : 20));
  return {
    label: "Las tres transformaciones sencillas del plano: traslación, giro y homotecia",
    pasos: [
      { solo: true, texto: "Una **transformación** hace corresponder a cada punto de una figura otro punto del plano. Veremos las tres más sencillas con el mismo triángulo $F$.", items: [poli(TRI, "azul", 0.16), ...rotulos(TRI, "azul")] },
      { solo: true, texto: "**Traslación**: todos los puntos se desplazan lo mismo, con la misma **dirección, magnitud y sentido** (un vector). La figura no cambia ni de forma ni de tamaño.", items: [
        poli(TRI, "azul", 0.16), poli(TRI.map((p) => suma(p, d)), "naranja", 0.16), ...TRI.map((p) => fl(p, suma(p, d), "verde", 2.4)), ...rotulos(TRI, "azul"), ...rotulos(TRI.map((p) => suma(p, d)), "naranja", "′"),
      ] },
      { solo: true, texto: "**Giro**: todos los puntos giran el **mismo ángulo** alrededor de un **centro** $O$. La figura tampoco se deforma, pero queda girada.", items: [
        poli(TRI, "azul", 0.16), poli(G, "naranja", 0.16), pt(O, "O", "verde", -16, 22), arc(O, 90, 0, 65, "verde"), ...TRI.map((p) => seg(O, p, "gris", true, 1.6)), ...G.map((p) => seg(O, p, "gris", true, 1.6)), ...rotulos(TRI, "azul"), ...rotulos(G, "naranja", "′"),
      ] },
      { solo: true, texto: "**Homotecia**: los puntos se alejan o acercan de un **centro** $C$ según una **razón**. Cambia el tamaño pero se conserva la forma: las figuras son **semejantes**.", items: [
        poli(TRI, "azul", 0.16), poli(H, "naranja", 0.16), pt(C, "C", "verde", -16, 22), ...TRI.map((p, i) => seg(C, H[i]!, "gris", true, 1.6)), ...rotulos(TRI, "azul"), ...rotulos(H, "naranja", "′"),
      ] },
    ],
  };
};

const traslacionDg = (): Diagrama => {
  const F: Pt[] = [[110, 300], [250, 320], [200, 195]];
  const d: Pt = [330, -85];
  const Fp = F.map((p) => suma(p, d));
  const V: Pt = [90, 110];
  const Vp = suma(V, d);
  const nombres = ["A", "B", "C"];
  const rot = (f: Pt[], c: "azul" | "naranja", ap = "") => f.map((p, i) => pt(p, `${nombres[i]}${ap}`, c, i === 2 ? 8 : i === 0 ? -16 : 14, i === 2 ? -12 : 22));
  return {
    label: "Traslación: figura, vector traslación, vectores equipolentes y paralelogramo AA′B′B",
    pasos: [
      { texto: "La traslación queda definida por un **vector** $\\overrightarrow{VV'}$: tiene **dirección**, **magnitud** (módulo) y **sentido**.", items: [fl(V, Vp, "verde", 4), pt(V, "V", "verde", -14, -8), pt(Vp, "V′", "verde", 16, -8), poli(F, "azul", 0.16), ...rot(F, "azul")] },
      { texto: "Cada punto $A$ de la figura $F$ se lleva a un punto $A'$ con $\\overrightarrow{AA'}$ **equipolente** a $\\overrightarrow{VV'}$: mismo módulo, dirección y sentido.", items: F.map((p, i) => fl(p, Fp[i]!, "verde", 2.4)) },
      { texto: "Los puntos trasladados forman la figura $F'$, **igual** a $F$: rectas paralelas, ángulos iguales y mismos lados.", items: [poli(Fp, "naranja", 0.16), ...rot(Fp, "naranja", "′")] },
      { texto: "$AA'B'B$ es un **paralelogramo**: por eso $AB = A'B'$ y los lados homólogos son **paralelos**.", items: [poli([F[0]!, Fp[0]!, Fp[1]!, F[1]!], "amarillo", 0.2)] },
    ],
  };
};

const giroDg = (): Diagrama => {
  const O: Pt = [250, 300];
  const A: Pt = pol(O, 190, 38);
  const alfa = 62;
  const Ap = gira(A, O, alfa);
  const B: Pt = pol(O, 120, 6);
  const Bp = gira(B, O, alfa);
  return {
    label: "Giro: centro, amplitud, igualdad de radios y triángulos directamente iguales",
    pasos: [
      { texto: "Un **giro** de centro $O$ lleva $A$ a $A'$ con $OA = OA'$: ambos puntos están en la **misma circunferencia** de centro $O$.", items: [circ(O, 190, "gris", 0, true), seg(O, A, "azul"), seg(O, Ap, "naranja"), pt(O, "O", "verde", -16, 22), pt(A, "A", "azul", 14, -4), pt(Ap, "A′", "naranja", 0, -14)] },
      { texto: "El ángulo $\\widehat{AOA'}$ es la **amplitud del giro**. Hay que conocer el **ángulo** y el **sentido**.", items: [arc(O, 70, 38, 38 + alfa, "verde"), txt(pol(O, 92, 38 + alfa / 2), "α", "verde", 24)] },
      { texto: "Todo punto $B$ gira el **mismo ángulo** y en el mismo sentido: $OB = OB'$ y $\\widehat{BOB'} = \\widehat{AOA'}$.", items: [circ(O, 120, "gris", 0, true), seg(O, B, "azul"), seg(O, Bp, "naranja"), pt(B, "B", "azul", 14, 20), pt(Bp, "B′", "naranja", 16, -6), arc(O, 45, 6, 6 + alfa, "verde")] },
      { texto: "Los triángulos $AOB$ y $A'OB'$ son **directamente iguales**: la figura girada es **igual** a la original.", items: [poli([O, A, B], "azul", 0.16), poli([O, Ap, Bp], "naranja", 0.16)] },
      { texto: "El centro $O$ es el **único punto que no se mueve** (punto doble): todos los demás giran a su alrededor.", items: [circ(O, 13, "verde"), txt([O[0] + 30, O[1] + 40], "punto doble", "verde", 19, "start")] },
    ],
  };
};

const homotecia = (): Diagrama => {
  const C: Pt = [250, 240];
  const F: Pt[] = [[420, 140], [440, 270], [530, 205]];
  const nombres = ["A", "B", "D"];
  const fig = (k: number, c: "azul" | "naranja", ap = ""): Pt[] => F.map((p) => homo(p, C, k));
  const rot = (f: Pt[], c: "azul" | "naranja" | "rojo" | "morado", ap: string) => f.map((p, i) => pt(p, `${nombres[i]}${ap}`, c, 14, i === 0 ? -8 : 20));
  return {
    label: "Homotecia: centro, razón, directa e inversa, simetría central",
    pasos: [
      { texto: "Dos figuras son **homotéticas** si sus puntos homólogos están **alineados con un punto fijo** $C$, el **centro de homotecia**.", items: [poli(F, "azul", 0.16), ...rot(F, "azul", ""), pt(C, "C", "verde", -16, 22)] },
      { solo: false, texto: "La razón es $\\dfrac{\\overline{CA}}{\\overline{CA'}} = \\pm K$. Con $K > 0$ ($K = 1{,}5$) la homotecia es **directa**: $A'$ queda al mismo lado de $C$ que $A$.", items: [poli(fig(1.5, "naranja"), "naranja", 0.16), ...F.map((p, i) => seg(C, fig(1.5, "naranja")[i]!, "gris", true, 1.6)), ...rot(fig(1.5, "naranja"), "naranja", "′"), txt([590, 392], "K = 1,5 · directa", "amarillo", 22, "end")] },
      { solo: false, texto: "Con $K < 0$ ($K = -0{,}8$) la homotecia es **inversa**: $A'$ queda al lado contrario de $C$. Las rectas homólogas siguen siendo **paralelas**.", items: [poli(fig(-0.8, "naranja"), "rojo", 0.16), ...F.map((p, i) => seg(C, fig(-0.8, "naranja")[i]!, "gris", true, 1.6)), ...rot(fig(-0.8, "naranja"), "rojo", "″"), txt([590, 416], "K = −0,8 · inversa", "rojo", 22, "end")] },
      { solo: false, texto: "Si $K = -1$ la homotecia es una **simetría central**: $A$ y $A'$ son simétricos respecto de $C$ y la figura es **igual**.", items: [poli(fig(-1, "naranja"), "morado", 0.16), ...rot(fig(-1, "naranja"), "morado", "‴"), txt([590, 440], "K = −1 · simetría central", "morado", 22, "end")] },
    ],
  };
};

const homoCentros = (): Diagrama => {
  const O1: Pt = [170, 215];
  const R1 = 90;
  const O2: Pt = [440, 215];
  const R2 = 40;
  const C1: Pt = [(R1 * O2[0] - R2 * O1[0]) / (R1 - R2), 215];
  const C2: Pt = [(R1 * O2[0] + R2 * O1[0]) / (R1 + R2), 215];
  const tg = (C: Pt, lado: 1 | -1, izq: number, der: number): [Pt, Pt] => {
    const a = (Math.asin(R1 / Math.abs(C[0] - O1[0])) * 180) / Math.PI;
    return [pol(C, izq, 180 + lado * a), pol(C, der, lado * a)];
  };
  return {
    label: "Dos circunferencias: centros de homotecia directa (tangentes exteriores) e inversa (tangentes interiores)",
    pasos: [
      { texto: "Dos **circunferencias** son siempre **homotéticas**: sus centros $O$ y $O'$ son puntos homólogos y la razón es el cociente de los radios.", items: [circ(O1, R1, "azul", 0.1), circ(O2, R2, "naranja", 0.1), seg([40, 215], [780, 215], "gris", true, 1.6), pt(O1, "O", "azul", 0, 26), pt(O2, "O′", "naranja", 0, 24)] },
      { texto: "Las **tangentes comunes exteriores** se cortan en $C_1$: es el centro de la homotecia **directa** ($K > 0$).", items: [...[1, -1].map((l) => seg(...tg(C1, l as 1 | -1, C1[0] - O1[0] + 60, 0), "verde", false, 2.6)), pt(C1, "C₁", "verde", 4, 24)] },
      { texto: "Las **tangentes comunes interiores** se cortan en $C_2$, entre las dos circunferencias: es el centro de la homotecia **inversa** ($K < 0$).", items: [...[1, -1].map((l) => seg(...tg(C2, l as 1 | -1, C2[0] - O1[0] + 60, O2[0] - C2[0] + 60), "rojo", false, 2.6)), pt(C2, "C₂", "rojo", 4, 24)] },
    ],
  };
};

const curvasNivel = (): Diagrama => {
  const base = 330;
  const perfil = (x: number) => base - 190 * Math.exp(-(((x - 230) / 95) ** 2));
  const pts: Pt[] = Array.from({ length: 81 }, (_, i) => [20 + i * 5, perfil(20 + i * 5)] as Pt);
  const semi = (h: number) => 95 * Math.sqrt(Math.log(190 / h));
  const hs = [40, 90, 140];
  const el = (cx: number, cy: number, a: number, b: number): Pt[] => Array.from({ length: 73 }, (_, i) => [cx + a * Math.cos((i / 72) * 6.2832), cy + b * Math.sin((i / 72) * 6.2832)] as Pt);
  return {
    label: "Curvas de nivel: secciones horizontales de una colina y su proyección acotada",
    pasos: [
      { texto: "Unos **planos horizontales equidistantes** cortan la superficie del terreno. Cada plano da una **sección**, cuyo contorno es una **curva de nivel**.", items: [lin(pts, "verde", false, 4), seg([20, base], [420, base], "gris", false, 2), ...hs.map((h) => seg([20, base - h], [420, base - h], "azul", true, 1.8)), ...hs.map((h, i) => txt([436, base - h + 5], `cota ${(i + 1) * 10}`, "azul", 17, "start"))] },
      { texto: "Proyectadas sobre el plano de comparación, las secciones son **curvas cerradas acotadas**: todos los puntos de una curva tienen **la misma cota**.", items: [...hs.map((h, i) => lin(el(230, 410, semi(h), semi(h) * 0.35), "azul", false, 3)), ...hs.map((h, i) => seg([230 + semi(h), base - h], [230 + semi(h), 410], "gris", true, 1.2)), ...hs.map((h, i) => txt([230 + semi(h) + 10, 416], `${(i + 1) * 10}`, "azul", 16, "start"))] },
      { texto: "Si la cota **aumenta hacia dentro**, el plano representa un **monte** o colina; si **aumenta hacia afuera**, un **valle** u hondonada.", items: [txt([230, 470], "monte: la cota sube hacia dentro", "verde", 18), ...hs.map((h, i) => lin(el(610, 410, semi(hs[2 - i]!), semi(hs[2 - i]!) * 0.35), "naranja", false, 3)), txt([610, 470], "valle: la cota sube hacia afuera", "naranja", 18)] },
      { texto: "La separación entre planos es la **equidistancia**. Con poca pendiente se intercalan **curvas intercalares**, dibujadas a trazos.", items: [lin(el(230, 410, (semi(40) + semi(90)) / 2, ((semi(40) + semi(90)) / 2) * 0.35), "amarillo", true, 2.4), txt([40, 410], "curva intercalar", "amarillo", 17, "start")] },
    ],
  };
};

const simbolos = (): Diagrama => {
  const fila = (y: number, texto: string): Item[] => [txt([290, y + 6], texto, "blanco", 19, "start")];
  return {
    label: "Símbolos del dibujo topográfico",
    pasos: [
      { texto: "El relieve se representa con **curvas de nivel acotadas**: las ordinarias son líneas continuas y las **intercalares**, a trazos. Un **punto acotado** indica la altitud de un punto concreto.", items: [
        lin([[60, 60], [100, 30], [150, 90], [230, 55]], "verde", false, 3), ...fila(60, "Curva de nivel (continua)"),
        lin([[60, 110], [100, 80], [150, 140], [230, 105]], "verde", true, 2.6), ...fila(110, "Curva intercalar (a trazos)"),
        pt([110, 160], "125,3", "blanco", 40, 6), ...fila(160, "Punto acotado"),
      ] },
      { texto: "Los **accidentes naturales** (ríos, vaguadas) y las **obras artificiales** (caminos, edificios, taludes) se indican con **símbolos convencionales**.", items: [
        lin([[60, 215], [80, 201], [100, 215], [120, 201], [140, 215], [160, 201], [180, 215], [200, 201], [220, 215]], "azul", false, 3.4), ...fila(215, "Río o arroyo"),
        seg([60, 258], [230, 258], "blanco", false, 2.4), seg([60, 272], [230, 272], "blanco", false, 2.4), ...fila(265, "Camino"),
        poli([[90, 305], [200, 305], [200, 335], [90, 335]], "gris", 0.1), seg([90, 335], [120, 305], "gris", false, 1.4), seg([125, 335], [155, 305], "gris", false, 1.4), seg([160, 335], [190, 305], "gris", false, 1.4), ...fila(320, "Edificio"),
        seg([60, 375], [230, 375], "blanco", false, 2.4), ...[75, 100, 125, 150, 175, 200].map((x, i) => seg([x, 375], [x, 375 + (i % 2 ? 12 : 18)], "blanco", false, 1.8)), ...fila(375, "Talud (desmonte o terraplén)"),
      ] },
    ],
  };
};

export const DIAGRAMAS_GEOMETRIA: Record<string, Diagrama> = {
  "d7-tipos": tiposTransf(),
  "d7-traslacion": traslacionDg(),
  "d7-giro": giroDg(),
  "d7-homotecia": homotecia(),
  "d7-homo-centros": homoCentros(),
  "d13-curvas-nivel-teoria": curvasNivel(),
  "d13-simbolos": simbolos(),
  "d7-trasl-prop": trasProp(),
  "d7-giro-prop": giroProp(),
  "d7-homo-casos": homoCasos(),
  "d8-posiciones": posiciones(),
  "d8-lugares": lugares(),
  "d8-enlace": enlace(),
  "d8-rectificar": rectificar(),
  "d9-ovalo": ovalo(),
  "d9-espirales": espirales(),
  "d10-conicas": conicas(),
  "d10-elipse": elipse(),
  "d10-hiperbola": hiperbola(),
  "d10-parabola": parabola(),
  "d11-descriptiva": descriptiva(),
  "d11-proyecciones": proyecciones(),
  "d11-sistemas": sistemas(),
  "d11-acotados": acotadosIntro(),
};
