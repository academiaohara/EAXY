import { arc, circ, fl, gira, homo, lin, medio, pol, poli, pt, seg, suma, txt, type Diagrama, type Pt } from "./engine";

const T = (p: Pt, d: Pt): Pt => suma(p, d);

/* ───────────── Tema 7: transformaciones geométricas ───────────── */

const trasProp = (): Diagrama => {
  const d: Pt = [95, 70];
  const r: Pt[] = [[40, 250], [150, 175]];
  const ang: Pt[] = [[310, 270], [350, 180], [440, 240]];
  const cc: Pt = [640, 215];
  return {
    label: "Traslación: qué le ocurre a una recta, un ángulo y un círculo",
    pasos: [
      { texto: "Una **recta** se transforma en otra recta **paralela** a ella.", items: [
        seg(r[0]!, r[1]!, "azul"), seg(T(r[0]!, d), T(r[1]!, d), "naranja"), fl(medio(...r as [Pt, Pt]), T(medio(...r as [Pt, Pt]), d), "verde"),
        txt([60, 280], "r", "azul", 22), txt([190, 320], "r′ ∥ r", "naranja", 22),
      ] },
      { texto: "Un **ángulo** se transforma en otro ángulo **igual** (congruente con él).", items: [
        lin(ang, "azul"), lin(ang.map((p) => T(p, [0, 90])), "naranja"), fl(ang[1]!, T(ang[1]!, [0, 90]), "verde"),
        arc(ang[1]!, 34, 235, 305, "amarillo"), arc(T(ang[1]!, [0, 90]), 34, 235, 305, "amarillo"),
      ] },
      { texto: "Un **círculo** se transforma en otro círculo **igual**, cuyo centro es el trasladado del centro.", items: [
        circ(cc, 52, "azul", 0.18), circ(T(cc, [0, 100]), 52, "naranja", 0.18), fl(cc, T(cc, [0, 100]), "verde"),
        pt(cc, "O", "azul"), pt(T(cc, [0, 100]), "O′", "naranja"),
      ] },
      { texto: "Una recta **paralela al vector** se transforma en sí misma: es una **recta doble**.", items: [
        seg([20, 340], [250, 255], "morado"), fl([90, 313], [160, 287], "verde"), txt([135, 372], "recta doble", "morado", 20),
      ] },
    ],
  };
};

const giroProp = (): Diagrama => {
  const O: Pt = [150, 270];
  const A: Pt = pol(O, 90, 50);
  const Ap = gira(A, O, 55);
  const rdir = (p: Pt, deg: number, l: number): [Pt, Pt] => [pol(p, l, deg + 90), pol(p, l, deg - 90)];
  const [r0, r1] = rdir(A, 50, 110);
  const [s0, s1] = rdir(Ap, 105, 110);
  const cc: Pt = [560, 250];
  const Oc: Pt = [470, 330];
  const ccp = gira(cc, Oc, 70);
  return {
    label: "Giro: transformada de una recta y de una circunferencia",
    pasos: [
      { texto: "Para girar una **recta** $r$: se traza por $O$ su **perpendicular** y se obtiene el pie $A$.", items: [
        seg(r0, r1, "azul"), seg(O, A, "azul", true), pt(O, "O", "verde", -22, 8), pt(A, "A", "azul", 14, -8), txt([r1[0] + 14, r1[1] + 6], "r", "azul", 22),
      ] },
      { texto: "Se gira el pie $A$ hasta $A'$ (mismo radio, mismo ángulo).", items: [
        arc(O, 90, 50, 105, "verde"), seg(O, Ap, "naranja", true), pt(Ap, "A′", "naranja", 14, -8),
      ] },
      { texto: "La recta girada $r'$ es **perpendicular a $OA'$** por $A'$: el ángulo recto se conserva.", items: [
        seg(s0, s1, "naranja"), txt([s0[0] - 16, s0[1] - 4], "r′", "naranja", 22),
      ] },
      { texto: "Una **circunferencia** gira hasta otra **igual**: basta girar el centro y trazarla con el mismo radio.", items: [
        circ(cc, 46, "azul", 0.16), circ(ccp, 46, "naranja", 0.16), pt(Oc, "O", "verde", -20, 8), pt(cc, "C", "azul"), pt(ccp, "C′", "naranja"),
        seg(Oc, cc, "azul", true), seg(Oc, ccp, "naranja", true), arc(Oc, 70, 78, 150, "verde"),
      ] },
    ],
  };
};

const homoCasos = (): Diagrama => {
  const C: Pt = [230, 215];
  const F: Pt[] = [[330, 130], [350, 250], [430, 190]];
  const F2 = F.map((p) => homo(p, C, -1));
  return {
    label: "Homotecia: identidad, simetría central, rectas dobles y semejanza",
    pasos: [
      { texto: "Si $K = 1$ la homotecia es la **identidad**: cada punto coincide con su homólogo.", items: [
        poli(F, "azul", 0.2), poli(F, "naranja", 0.0, true), pt(C, "C", "verde", -20, 8), txt([380, 300], "K = 1 · identidad", "amarillo", 22),
      ] },
      { texto: "Si $K = -1$ es una **simetría central**: $A$ y $A'$ son simétricos respecto de $C$.", items: [
        poli(F2, "naranja", 0.2), ...F.map((p, i) => seg(p, F2[i]!, "gris", true)), txt([380, 370], "K = −1 · simetría central", "amarillo", 22),
      ], solo: false },
      { texto: "Las **rectas que pasan por el centro** son **dobles**: cada una se transforma en sí misma.", items: [
        seg([60, 330], [740, 90], "morado"), txt([650, 70], "recta doble", "morado", 20),
      ] },
      { texto: "Los ángulos homólogos son **iguales** (rectas homólogas paralelas): las figuras son **semejantes**.", items: [
        arc(F[0]!, 28, 250, 335, "amarillo"), arc(F2[0]!, 28, 70, 155, "amarillo"),
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

export const DIAGRAMAS_GEOMETRIA: Record<string, Diagrama> = {
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
