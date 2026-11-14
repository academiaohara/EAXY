import { arc, lin, poli, pt, seg, txt, type Color, type Diagrama, type Item, type Pt } from "./engine";

/**
 * Dibujos de teoría del tema 13 (sistema de planos acotados, págs. 112-116 del libro).
 * Como en el diédrico, cada elemento se define una vez en el espacio (x, fondo, altura) y de ahí salen las dos mitades:
 * a la izquierda la vista en el espacio sobre el plano del cuadro π y a la derecha el dibujo acotado (la planta).
 * Pocos elementos por paso; lo auxiliar se retira con `dura`.
 */

type P3 = [number, number, number];
/** Altura en el dibujo de una unidad de cota. */
const U = 24;
const AUX: Color = "gris";
const RES: Color = "amarillo";
const C_E: Color = "verde";
const C_P: Color = "naranja";
const C_H: Color = "azul";

/* Vista en el espacio: el fondo se aleja hacia arriba y a la derecha. */
const EX = 20;
const EY = 262;
const ES = 1.12;
const S = (p: P3): Pt => [EX + ES * (p[0] + 0.55 * p[1]), EY - ES * (0.38 * p[1] + p[2])];
/* Dibujo acotado: la planta, vista desde arriba (el fondo queda arriba). */
const DX = 505;
const DY = 262;
const DS = 1.12;
const D = (p: P3 | [number, number]): Pt => [DX + DS * p[0], DY - DS * p[1]];
const pie = (p: P3): P3 => [p[0], p[1], 0];
const mix = (a: P3, b: P3, t: number): P3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const AN = 250;
const FO = 150;

/** Plano del cuadro π en el espacio y el marco del dibujo, con sus rótulos. */
const escena = (bajo = false, alto = 188): Item[] => [
  poli([S([0, 0, 0]), S([AN, 0, 0]), S([AN, FO, 0]), S([0, FO, 0])], AUX, 0.1),
  txt([S([AN, 0, 0])[0] - 16, S([AN, 0, 0])[1] + (bajo ? -8 : 22)], "π", AUX, 20),
  txt([S([AN / 2 + 40, 0, 0])[0], EY - ES * alto], "En el espacio", AUX, 15), txt([D([AN / 2, 0])[0], EY - ES * alto], "En el dibujo", AUX, 15),
];
const sE = (a: P3, b: P3, c: Color = C_E, d = false, w = 3.2): Item => seg(S(a), S(b), c, d, w);
const sD = (a: P3 | [number, number], b: P3 | [number, number], c: Color = C_P, d = false, w = 3.2): Item => seg(D(a), D(b), c, d, w);
const rot = (p: Pt, s: string, c: Color, dx = 0, dy = 0, size = 18): Item => txt([p[0] + dx, p[1] + dy], s, c, size);
/** Punto del espacio con su proyectante y su proyección sobre π. */
const conProy = (p: P3, n: string, c: Color = C_E): Item[] => [sE(p, pie(p), AUX, true, 1.6), pt(S(p), n, c, 14, p[2] >= 0 ? -6 : 18), pt(S(pie(p)), `${n}′`, C_P, 16, p[2] >= 0 ? 18 : -8)];
/** Punto acotado en el dibujo: la proyección con su cota entre paréntesis. */
const acot = (p: P3, n: string, cota: string, dx = 0, dy = -14): Item => pt(D(p), `${n}′(${cota})`, C_P, dx, dy);

const punto = (): Diagrama => {
  const A: P3 = [70, 80, 5 * U], B: P3 = [140, 55, 0], C: P3 = [205, 85, -3 * U];
  return {
    label: "Representación del punto en el sistema de planos acotados",
    pasos: [
      { texto: "El sistema de planos acotados usa **un solo plano de proyección**, horizontal: el **plano del cuadro** $\\pi$ (o plano de comparación). Un punto $A$ del espacio se proyecta ortogonalmente sobre él en $A'$.", items: [...escena(), ...conProy(A, "A")] },
      { texto: "Con una sola proyección no se sabría a qué altura está el punto. Por eso, junto a la proyección se anota entre paréntesis su **cota**, la distancia al plano: $A'(5)$.", items: [rot(S(mix(A, pie(A), 0.5)), "5", C_E, -14, 6), acot(A, "A", "5")] },
      { texto: "Un punto puede estar **en el plano** (cota cero), como $B$, o **por debajo** de él, como $C$, que tiene cota negativa.", items: [pt(S(B), "B ≡ B′", C_P, 0, -14), acot(B, "B", "0"), ...conProy(C, "C", "rojo"), rot(S(mix(C, pie(C), 0.5)), "3", "rojo", -14, 6), acot(C, "C", "−3")] },
      { texto: "El sistema es **reversible**: conocido $A'(5)$, basta levantar por $A'$ la perpendicular al plano y llevar sobre ella 5 unidades para recuperar el punto del espacio.", dura: 1, items: [seg(S(pie(A)), S(A), RES, false, 5.5)] },
    ],
  };
};

const recta = (): Diagrama => {
  const B: P3 = [40, 70, 2 * U], A: P3 = [215, 70, 5.5 * U];
  const Nn: P3 = [A[0], A[1], B[2]];
  return {
    label: "Representación de la recta: proyección, desnivel y pendiente",
    pasos: [
      { texto: "Una recta $r$ queda definida por dos de sus puntos, $B$ y $A$. Su proyección $r'$ es la recta que une las proyecciones $B'$ y $A'$.", items: [...escena(), sE(mix(B, A, -0.1), mix(B, A, 1.08), C_E, false, 3.4), rot(S(mix(B, A, 0.5)), "r", C_E, -6, -12), ...conProy(B, "B"), ...conProy(A, "A"), sE(pie(B), pie(A), C_P, false, 3.4), rot(S(mix(pie(B), pie(A), 0.5)), "r′", C_P, 0, 22)] },
      { texto: "En el dibujo, la recta es su proyección $r'$ con **dos puntos acotados**: $B'(2)$ y $A'(5{,}5)$.", items: [sD(mix(B, A, -0.1), mix(B, A, 1.08)), acot(B, "B", "2"), acot(A, "A", "5,5"), rot(D(mix(B, A, 0.5)), "r′", C_P, 0, 24)] },
      { texto: "El **desnivel** $d$ entre dos puntos es la diferencia de sus cotas: aquí $5{,}5 - 2 = 3{,}5$. En el espacio es el cateto vertical $AN$ del triángulo que forma la recta con su horizontal.", items: [sE(B, Nn, AUX, true, 1.8), sE(Nn, A, "rojo", false, 4), rot(S(mix(Nn, A, 0.5)), "d", "rojo", 14, 6), pt(S(Nn), "N", AUX, 14, 16)] },
      { texto: "La **pendiente** de la recta es la tangente del ángulo $\\alpha$ que forma con el plano del cuadro: $p = \\operatorname{tg}\\alpha = \\dfrac{d}{r'}$, el desnivel entre la longitud de la proyección. Se da también en tanto por ciento: una pendiente del 14 % sube 14 unidades cada 100 de proyección.", items: [arc(S(B), 46, 0, 22, RES, 2.6), rot(S(B), "α", RES, 60, -6)] },
    ],
  };
};

const trazaModulo = (): Diagrama => {
  const i = 42;
  const q = (k: number): P3 => [22 + i * k, 70, U * k];
  const letras = ["T", "A", "B", "C", "D", "E"];
  return {
    label: "Traza, intervalo y graduación de una recta",
    pasos: [
      { texto: "Sobre una recta $r$ se marcan los puntos de **cota entera**: $A$, $B$, $C$, $D$ y $E$, de cotas 1 a 5. Entre cada dos consecutivos el desnivel es la unidad.", items: [...escena(), sE(q(1), q(5.3), C_E, false, 3.4), rot(S(q(5.3)), "r", C_E, 12, -4), ...[1, 2, 3, 4, 5].flatMap((k) => [sE(q(k), pie(q(k)), AUX, true, 1.4), pt(S(q(k)), letras[k], C_E, -12, -8)])] },
      { texto: "Sus proyecciones quedan **a la misma distancia** unas de otras sobre $r'$. Esa distancia es el **intervalo** o módulo $i$: la proyección de un segmento de la recta cuyo desnivel es la unidad.", items: [sE(pie(q(1)), pie(q(5.3)), C_P, false, 3.4), ...[1, 2, 3, 4, 5].map((k) => pt(S(pie(q(k))), undefined, C_P)), seg(S(pie(q(2))), S(pie(q(3))), RES, false, 6), rot(S(pie(q(2.5))), "i", RES, 0, 24)] },
      { texto: "**Graduar una recta** es señalar en su proyección los puntos de cota entera. Dados $A'(1)$ y $E'(5)$, se divide el segmento en tantas partes iguales como unidades hay de diferencia de cotas: cuatro.", items: [sD(q(1), q(5.3)), ...[1, 2, 3, 4, 5].map((k) => acot(q(k), letras[k]!, String(k), 0, k % 2 ? -14 : 26)), rot(D(q(5.3)), "r′", C_P, 14, 6)] },
      { texto: "Llevando el intervalo hacia el otro lado se llega al punto de cota cero, $T$: la **traza** de la recta, donde corta al plano del cuadro.", items: [sE(q(0), q(1), C_E, true, 2.2), pt(S(q(0)), "T", "rojo", -14, 4), sD(q(0), q(1), C_P, true, 2.2), pt(D(q(0)), "T′(0)", "rojo", 0, 26)] },
      { texto: "En el triángulo $TA'A$ los catetos son el intervalo y la unidad: $p = \\operatorname{tg}\\alpha = \\dfrac{1}{i}$. **Pendiente e intervalo son inversos**: si el intervalo es $3/2$, la pendiente es $2/3$.", dura: 1, items: [poli([S(q(0)), S(pie(q(1))), S(q(1))], RES, 0.3), rot(S(q(1)), "1", RES, 12, 16), rot(S(pie(q(0.5))), "i", RES, 0, 22)] },
    ],
  };
};

/* Plano α que sube hacia el fondo: su traza α₀ es el borde delantero y sus horizontales son paralelas a ella. */
const IP = 40;
const pl = (x: number, k: number): P3 => [x, IP * k, U * k];
const XL = 125;

const lmp = (): Diagrama => ({
  label: "Representación del plano por su línea de máxima pendiente",
  pasos: [
    { texto: "Un plano inclinado $\\alpha$ corta al plano del cuadro según una recta: su **traza** $\\alpha_0$, que es la horizontal del plano de cota cero.", items: [...escena(true), poli([S(pl(15, 0)), S(pl(235, 0)), S(pl(235, 3.6)), S(pl(15, 3.6))], C_E, 0.14), sE(pl(15, 0), pl(235, 0), C_P, false, 3.6), rot(S(pl(235, 0)), "α₀", C_P, 18, 6), rot(S(pl(215, 3.2)), "α", C_E, 0, 0, 20)] },
    { texto: "Las rectas del plano paralelas a la traza son sus **horizontales**: todos los puntos de cada una tienen la misma cota. Aquí, las de cotas 1, 2 y 3.", items: [1, 2, 3].flatMap((k) => [sE(pl(15, k), pl(235, k), C_H, false, 2.4), rot(S(pl(235, k)), `h(${k})`, C_H, 24, 4, 16)]) },
    { texto: "La **línea de máxima pendiente** (l.m.p.) es la recta del plano perpendicular a las horizontales: la de mayor inclinación. Corta a cada horizontal en un punto de cota entera.", items: [sE(pl(XL, 0), pl(XL, 3.6), "rojo", false, 4), rot(S(pl(XL, 3.6)), "l.m.p.", "rojo", -6, -10, 16), ...[1, 2, 3].map((k) => pt(S(pl(XL, k)), undefined, "rojo"))] },
    { texto: "En el dibujo, el plano se representa por la proyección de su l.m.p. **graduada**, que se traza con **doble línea** para distinguirla. Sigue siendo perpendicular a la traza y a las horizontales.", items: [
      sD([XL - 3, 0], [XL - 3, IP * 3.6], "rojo", false, 2.4), sD([XL + 3, 0], [XL + 3, IP * 3.6], "rojo", false, 2.4), ...[0, 1, 2, 3].map((k) => pt(D([XL, IP * k]), String(k), "rojo", 18, 6)),
      sD([15, 0], [235, 0], C_P, false, 3.2), rot(D([235, 0]), "α₀", C_P, 18, 6),
    ] },
    { texto: "Las horizontales del plano son las perpendiculares a la l.m.p. por sus puntos de cota entera. Dos horizontales acotadas también definen el plano.", items: [1, 2, 3].flatMap((k) => [sD([15, IP * k], [235, IP * k], C_H, false, 1.8), rot(D([235, IP * k]), `h(${k})`, C_H, 24, 4, 16)]) },
  ],
});

const angulo = (): Diagrama => {
  const O: P3 = pl(XL, 0), C: P3 = pl(XL, 3);
  const C0: [number, number] = [XL - 3 * U, IP * 3];
  return {
    label: "Ángulo que forma un plano con el plano del cuadro",
    pasos: [
      { texto: "El ángulo $\\alpha$ que forma el plano con el del cuadro es el de su l.m.p. con su proyección. En el espacio es el ángulo en $O$ del triángulo rectángulo $O\\,C'C$, cuyos catetos son la proyección $OC'$ y la cota de $C$: 3 unidades.", items: [
        ...escena(true), poli([S(pl(15, 0)), S(pl(235, 0)), S(pl(235, 3.6)), S(pl(15, 3.6))], C_E, 0.1), poli([S(O), S(pie(C)), S(C)], "rojo", 0.28), pt(S(O), "O", "blanco", -14, 14), pt(S(C), "C", "rojo", 14, -6), pt(S(pie(C)), "C′", C_P, 16, 14), rot(S(mix(C, pie(C), 0.5)), "3", "rojo", 14, 6),
        sD([XL - 3, 0], [XL - 3, IP * 3.6], "rojo", false, 2.4), sD([XL + 3, 0], [XL + 3, IP * 3.6], "rojo", false, 2.4), ...[0, 1, 2, 3].map((k) => pt(D([XL, IP * k]), String(k), "rojo", 18, 6)), sD([15, 0], [235, 0], C_P, false, 3.2), sD([15, IP * 3], [235, IP * 3], C_H, false, 1.8), rot(D([235, IP * 3]), "h(3)", C_H, 24, 4, 16), pt(D([XL, 0]), "O", "blanco", -14, 18),
      ] },
      { texto: "Para verlo en el dibujo se **abate** ese triángulo sobre el plano del cuadro: sobre la horizontal $h(3)$ se llevan, a partir de $C'$, las **3 unidades** de la cota. Se obtiene $C_0$.", items: [seg(D([XL, IP * 3]), D(C0), RES, false, 4.5), pt(D(C0), "C₀", RES, -6, -14), rot(D([XL - 1.5 * U, IP * 3]), "3", RES, 0, -10)] },
      { texto: "La recta $C_0O$ es la l.m.p. abatida, y el ángulo que forma con la proyección de la l.m.p. es $\\alpha$, en verdadera magnitud.", items: [seg(D(C0), D([XL, 0]), "rojo", false, 3.4), arc(D([XL, 0]), 44, 90, 90 + (Math.atan((3 * U) / (3 * IP)) * 180) / Math.PI, RES, 2.6), rot(D([XL, 0]), "α", RES, -16, -56)] },
    ],
  };
};

const casos = (): Diagrama => ({
  label: "Planos particulares: horizontal y de perfil",
  pasos: [
    { texto: "Un plano **paralelo al del cuadro** (horizontal) no lo corta: no tiene traza ni l.m.p., así que **no tiene representación gráfica**. Aun así se puede operar con él, porque todos sus puntos tienen la misma cota.", dura: 1, base: escena(), items: [poli([S([20, 15, 3 * U]), S([230, 15, 3 * U]), S([230, 135, 3 * U]), S([20, 135, 3 * U])], C_H, 0.16), rot(S([125, 75, 3 * U]), "cota 3", C_H, 0, 4, 17), sE([20, 15, 3 * U], [20, 15, 0], AUX, true, 1.4), sE([230, 15, 3 * U], [230, 15, 0], AUX, true, 1.4)] },
    { texto: "Un plano **perpendicular al del cuadro** se llama **plano de perfil**. Todo lo que contiene se proyecta sobre su traza.", items: [poli([S([40, 30, 0]), S([215, 120, 0]), S([215, 120, 4.5 * U]), S([40, 30, 4.5 * U])], C_E, 0.16), sE([40, 30, 0], [215, 120, 0], C_P, false, 3.6), rot(S([215, 120, 0]), "α₀", C_P, 18, 8)] },
    { texto: "En el dibujo se representa solo por su **traza** y una letra griega. Es el plano que se usa en topografía para obtener los **perfiles** longitudinales y transversales de un terreno.", items: [sD([40, 30], [215, 120], C_P, false, 3.6), rot(D([215, 120]), "α₀", C_P, 18, 4)] },
  ],
});

/* ───────────── Intersección de planos (solo el dibujo acotado) ───────────── */

type V2 = [number, number];
const mas = (a: V2, d: V2, t: number): V2 => [a[0] + d[0] * t, a[1] + d[1] * t];
const perp = (d: V2): V2 => [-d[1], d[0]];
/** Corte de la recta que pasa por `a` con dirección `da` y la que pasa por `b` con dirección `db`. */
const corte = (a: V2, da: V2, b: V2, db: V2): V2 => {
  const det = da[0] * db[1] - da[1] * db[0];
  const t = ((b[0] - a[0]) * db[1] - (b[1] - a[1]) * db[0]) / det;
  return mas(a, da, t);
};
/** Proyección de una l.m.p. graduada, con doble línea y sus cotas. */
const lmpDoble = (a: V2, d: V2, i: number, cotas: number[], c: Color, lado: number, nombre: string): Item[] => {
  const n = perp(d);
  const fin = mas(a, d, i * (cotas.length - 0.5));
  const ini = mas(a, d, -i * 0.5);
  return [
    seg(mas(ini, n, 2.6), mas(fin, n, 2.6), c, false, 2.2), seg(mas(ini, n, -2.6), mas(fin, n, -2.6), c, false, 2.2),
    ...cotas.map((k, j) => pt(mas(a, d, i * j), String(k), c, 20 * lado, 6)),
    txt(mas(ini, n, 0), nombre, c, 20),
  ];
};

const interseccion = (): Diagrama => {
  const a0: V2 = [120, 330], da: V2 = [0.3162, -0.9487], ia = 46;
  const b0: V2 = [500, 330], db: V2 = [-0.3162, -0.9487], ib = 60;
  const cotas = [12, 13, 14, 15, 16];
  const pa = (j: number): V2 => mas(a0, da, ia * j), pb = (j: number): V2 => mas(b0, db, ib * j);
  const I = (j: number): V2 => corte(pa(j), perp(da), pb(j), perp(db));
  const hors = (j: number, c: Color = AUX, w = 1.6): Item[] => [seg(pa(j), I(j), c, false, w), seg(pb(j), I(j), c, false, w)];
  return {
    label: "Intersección de dos planos dados por su línea de máxima pendiente",
    pasos: [
      { texto: "Dos planos $\\alpha$ y $\\beta$, cada uno definido por su l.m.p. graduada. Su intersección es una recta: hay que hallar dos de sus puntos.", items: [...lmpDoble(a0, da, ia, cotas, C_P, -1, "α"), ...lmpDoble(b0, db, ib, cotas, C_H, 1, "β")] },
      { texto: "Un plano horizontal de cota 13 corta a cada plano según su **horizontal de cota 13**, perpendicular a su l.m.p. Las dos horizontales están a la misma altura: se cortan en un punto, de cota 13, que pertenece a los dos planos.", items: [...hors(1, RES, 3), pt(I(1), "13", C_E, 20, 6)] },
      { texto: "Se repite con otra pareja de horizontales, las de cota 15, y se obtiene el punto de cota 15.", items: [...hors(3, RES, 3), pt(I(3), "15", C_E, 20, 6)] },
      { texto: "La recta que une los dos puntos es la **intersección** $i'$. Las demás parejas de horizontales de igual cota se cortan también sobre ella, y la dejan graduada.", items: [seg(mas(I(0), [I(4)[0] - I(0)[0], I(4)[1] - I(0)[1]], -0.08), mas(I(0), [I(4)[0] - I(0)[0], I(4)[1] - I(0)[1]], 1.1), C_E, false, 3.6), ...[0, 2, 4].flatMap((j) => [...hors(j), pt(I(j), String(cotas[j]), C_E, 20, 6)]), txt([I(4)[0] - 16, I(4)[1] - 30], "i′", C_E, 20)] },
    ],
  };
};

const paralelas = (): Diagrama => {
  const Y = 110, u = 30;
  const xa = 80, ia = 40, xb = 560, ib = 55;
  const ya = (x: number) => (u / ia) * (x - xa), yb = (x: number) => (u / ib) * (xb - x);
  const xv = (u / ia * xa + u / ib * xb) / (u / ia + u / ib);
  const hv = ya(xv);
  const cota = 7 + hv / u;
  return {
    label: "Intersección de dos planos con las l.m.p. paralelas en proyección",
    pasos: [
      { texto: "Si las dos l.m.p. son **paralelas en proyección**, las horizontales de los dos planos también lo son y no se cortan: el método anterior no sirve. Aquí las dos l.m.p. están sobre la misma recta $AB$, con las cotas creciendo hacia el centro.", items: [
        seg([xa - 30, Y - 3], [xb + 30, Y - 3], AUX, false, 1.6), seg([xa - 30, Y + 3], [xb + 30, Y + 3], AUX, false, 1.6),
        ...[0, 1, 2, 3].map((k) => pt([xa + ia * k, Y], String(7 + k), C_P, 0, -14)), ...[0, 1, 2, 3].map((k) => pt([xb - ib * k, Y], String(7 + k), C_H, 0, -14)),
        txt([xa - 44, Y + 6], "A", C_P, 20), txt([xb + 44, Y + 6], "B", C_H, 20), txt([xa + 60, Y - 44], "α", C_P, 20), txt([xb - 80, Y - 44], "β", C_H, 20),
      ] },
      { texto: "Se **abate** la l.m.p. de $\\alpha$: en su punto de cota 10 se levanta una perpendicular de 3 unidades (lo que sube desde la cota 7) y se une con el punto de cota 7. Es el plano visto de canto.", items: [seg([xa + 3 * ia, Y], [xa + 3 * ia, Y + 3 * u], AUX, true, 1.6), txt([xa + 3 * ia + 14, Y + 1.5 * u + 6], "3", C_P, 17), seg([xa, Y], [xv + 40, Y + ya(xv + 40)], C_P, false, 3.2)] },
      { texto: "Se abate igual la l.m.p. de $\\beta$. Las dos rectas abatidas se cortan en $V_0$: es el punto donde se encuentran los dos planos.", items: [seg([xb - 3 * ib, Y], [xb - 3 * ib, Y + 3 * u], AUX, true, 1.6), txt([xb - 3 * ib - 14, Y + 1.5 * u + 6], "3", C_H, 17), seg([xb, Y], [xv - 40, Y + yb(xv - 40)], C_H, false, 3.2), pt([xv, Y + hv], "V₀", C_E, 0, 28)] },
      { texto: `La intersección $i'$ es la perpendicular a $AB$ por $V_0$: una **recta horizontal**. Su cota se obtiene midiendo la distancia de $V_0$ a $AB$ y sumándola a la cota de partida: $7 + ${(hv / u).toFixed(2).replace(".", "{,}")} \\approx ${cota.toFixed(1).replace(".", "{,}")}$.`, items: [seg([xv, Y - 70], [xv, Y + hv + 50], C_E, false, 3.6), txt([xv + 16, Y - 60], "i′", C_E, 20), seg([xv, Y], [xv, Y + hv], RES, false, 5)] },
    ],
  };
};

const aristaGotera = (): Diagrama => {
  const caso = (x0: number, sube: boolean, nombre: string, c: Color): Item[] => {
    const Y = 250, w = 110, hh = 80;
    const base: Item[] = [seg([x0 - w, Y - 3], [x0 + w, Y - 3], AUX, false, 1.6), seg([x0 - w, Y + 3], [x0 + w, Y + 3], AUX, false, 1.6), seg([x0, Y - 26], [x0, Y + 26], C_E, false, 3.4), txt([x0, Y + 50], "i′", C_E, 18)];
    const nums = [1, 2, 3].flatMap((k) => { const n = sube ? 13 - k : 9 + k; return [pt([x0 - 32 * k, Y], String(n), c, 0, -14), pt([x0 + 32 * k, Y], String(n), c, 0, -14)]; });
    const perfil = sube ? lin([[x0 - w, Y - 120], [x0, Y - 120 - hh], [x0 + w, Y - 120]], c, false, 3.6) : lin([[x0 - w, Y - 120 - hh], [x0, Y - 120], [x0 + w, Y - 120 - hh]], c, false, 3.6);
    return [...base, ...nums, perfil, txt([x0, Y - 220], nombre, c, 22)];
  };
  return {
    label: "Arista y gotera",
    pasos: [
      { texto: "Si las cotas de las dos l.m.p. **disminuyen al alejarse** de la intersección, los planos forman una **arista**: es lo que ocurre en la cumbrera de un tejado, donde se juntan dos vertientes opuestas. Arriba, los dos planos vistos de canto.", items: caso(170, true, "Arista", C_H) },
      { texto: "Si las cotas **aumentan al alejarse** de la intersección, los planos forman una **gotera**: la intersección es la línea más baja y por ella correría el agua.", items: caso(470, false, "Gotera", C_P) },
    ],
  };
};

const cubiertas = (): Diagrama => {
  const W = 240, F = 130, i = 32, hh = 3 * U;
  const c1: P3 = [F / 2, F / 2, hh], c2: P3 = [W - F / 2, F / 2, hh];
  const esq: P3[] = [[0, 0, 0], [W, 0, 0], [W, F, 0], [0, F, 0]];
  return {
    label: "Aplicación: cubierta de un edificio de planta rectangular",
    pasos: [
      { texto: "El caso práctico de la intersección de planos es un **tejado**. Se parte de la planta del edificio: de cada lado sale un plano inclinado (un faldón) y todos tienen aquí la misma pendiente. Los cuatro aleros están a la misma cota.", items: [
        poli(esq.map(S), C_H, 0.14), poli(esq.map(D), C_H, 0.1), txt([S([W / 2 + 40, 0, 0])[0], EY - ES * 165], "En el espacio", AUX, 15), txt([D([W / 2, 0])[0], EY - ES * 165], "En el dibujo", AUX, 15), rot(D([W / 2, 0]), "alero (cota 0)", AUX, 0, 22, 15),
      ] },
      { texto: "En cada faldón se traza una horizontal, la de cota 1: es paralela a su alero, a una distancia igual al intervalo. Con pendientes iguales, las cuatro quedan a la misma distancia de los bordes.", dura: 2, items: [lin([D([i, i]), D([W - i, i]), D([W - i, F - i]), D([i, F - i]), D([i, i])], AUX, true, 1.8), rot(D([W / 2, i]), "1", AUX, 0, -6, 15)] },
      { texto: "Dos faldones contiguos se cortan en la recta que une el punto de cota 0 (la esquina) con el de cota 1 (donde se cruzan sus horizontales). Con pendientes iguales, esa intersección es la **bisectriz** del ángulo de la esquina.", items: [sD(esq[0]!, c1, C_P), sD(esq[3]!, c1, C_P), sD(esq[1]!, c2, C_P), sD(esq[2]!, c2, C_P), sE(esq[0]!, c1, C_P), sE(esq[3]!, c1, C_P), sE(esq[1]!, c2, C_P), sE(esq[2]!, c2, C_P)] },
      { texto: "Las cuatro intersecciones se encuentran dos a dos, y entre esos dos puntos queda la intersección de los dos faldones largos: la **cumbrera**, que es horizontal y forma arista.", items: [poli([S(esq[0]!), S(esq[1]!), S(c2), S(c1)], C_P, 0.22), poli([S(esq[1]!), S(esq[2]!), S(c2)], C_P, 0.12), sD(c1, c2, "rojo", false, 4), sE(c1, c2, "rojo", false, 4), rot(D([W / 2, F / 2]), "cumbrera", "rojo", 0, -10, 16)] },
    ],
  };
};

export const DIAGRAMAS_ACOTADOS_ESPACIO: Record<string, Diagrama> = {
  "d13-punto": punto(), "d13-recta": recta(), "d13-traza-modulo": trazaModulo(), "d13-lmp": lmp(), "d13-angulo": angulo(), "d13-casos": casos(),
  "d13-interseccion": interseccion(), "d13-paralelas": paralelas(), "d13-arista-gotera": aristaGotera(), "d13-cubiertas": cubiertas(),
};
