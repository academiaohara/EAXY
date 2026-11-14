import { arc, circ, fl, lin, poli, pt, seg, txt, type Color, type Diagrama, type Item, type Pt } from "./engine";
import {
  C_E, C_H, C_V, DS, DX, DY, N, S, enH, enLT, enPlano, enV, escena, h, ltDibujo, mix, o, pD, pE, pH, pV, planoEspacio, planosEspacio, proyH, proyV, refD, rot, rotulos,
  sE, sH, sV, t1, t2, trazasDibujo, trazasEspacio, v, type P3, type Plano,
} from "./diedrico-modelo";

/**
 * Dibujos de teoría del tema 12 (recta y plano en el sistema diédrico, págs. 99-109 del libro).
 * Cada dibujo relaciona la vista en el espacio (izquierda) con el dibujo plano (derecha) y entra por pasos:
 * pocos elementos nuevos en cada uno, y lo auxiliar se retira (`dura`) cuando ya no hace falta.
 */

const AUX: Color = "gris";
const RES: Color = "amarillo";

/** Marca de ángulo recto en `p`, con lados hacia `a` y hacia `b`. */
const recto = (p: Pt, a: Pt, b: Pt, c: Color = AUX, t = 9): Item => {
  const u = (q: Pt): Pt => {
    const d = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    return [((q[0] - p[0]) / d) * t, ((q[1] - p[1]) / d) * t];
  };
  const ua = u(a), ub = u(b);
  return lin([[p[0] + ua[0], p[1] + ua[1]], [p[0] + ua[0] + ub[0], p[1] + ua[1] + ub[1]], [p[0] + ub[0], p[1] + ub[1]]], c, false, 1.8);
};

/* Vista de perfil (la que tendría un observador situado en la L.T.) junto a la épura. */
const LC: Pt = [215, 207];
const L = (al: number, co: number): Pt => [LC[0] + 1.25 * al, LC[1] - 1.25 * co];
const vistaPerfil = (): Item[] => [
  seg(L(-125, 0), L(135, 0), C_H, false, 3.4), seg(L(0, -125), L(0, 150), C_V, false, 3.4), rot(L(0, 150), "PV", C_V, 18, 10), rot(L(135, 0), "PH", C_H, -10, 20), pt(LC, "L.T.", "blanco", 22, 20),
  txt([LC[0], -16], "Vista de perfil", AUX, 15), txt([DX + DS * 130, -16], "En el dibujo", AUX, 15), ...ltDibujo(),
];

/* ───────────── El punto (págs. 98-99) ───────────── */

const cotaAlej = (): Diagrama => {
  const A: P3 = [140, 85, 105];
  return {
    label: "Cota y alejamiento de un punto",
    pasos: [
      { texto: "La **cota** (u ordenada) de un punto es su **distancia al plano horizontal**: la altura a la que está. En el espacio es el segmento que va de $A$ a su proyección $A'$.", items: [...escena(), pE(A, "A", 16, 10), sE(A, enH(A), C_V, false, 4), pt(S(enH(A)), "A′", C_H, 14, 18), rot(S(mix(A, enH(A), 0.5)), "cota", C_V, 28, 4, 17)] },
      { texto: "El **alejamiento** es su **distancia al plano vertical**: lo que el punto se separa de él. En el espacio es el segmento que va de $A$ a su proyección $A''$.", items: [sE(A, enV(A), C_H, false, 4), pt(S(enV(A)), "A″", C_V, 14, -8), rot(S(mix(A, enV(A), 0.5)), "alejamiento", C_H, -58, -8, 17)] },
      { texto: "En el dibujo, la cota es la **distancia de $A''$ a la L.T.**, porque $A''$ está en el plano vertical a la misma altura que el punto.", items: [seg(o(A), v(A), C_V, false, 4), pV(A, "A″", 14, -8), rot(v([A[0], 0, A[2] / 2]), "cota", C_V, 30, 6, 17)] },
      { texto: "Y el alejamiento es la **distancia de $A'$ a la L.T.** Con la cota y el alejamiento el punto queda situado.", items: [seg(o(A), h(A), C_H, false, 4), pH(A, "A′", 14, 18), rot(h([A[0], A[1] / 2, 0]), "alejamiento", C_H, 56, 6, 17)] },
      { texto: "Las dos medidas tienen **signo**. La cota es positiva por encima del plano horizontal y negativa por debajo; el alejamiento es positivo por delante del plano vertical y negativo por detrás. En el primer diedro las dos son positivas.", dura: 1, items: [rot(v([240, 0, 100]), "cota +", C_V, 0, 0, 17), rot(h([240, 100, 0]), "alej. +", C_H, 0, 0, 17)] },
    ],
  };
};

const especiales = (): Diagrama => {
  const A: P3 = [55, 90, 0], E: P3 = [135, 0, 100], R: P3 = [215, 0, 0];
  return {
    label: "Puntos situados en los planos de proyección y en la L.T.",
    pasos: [
      { texto: "Un punto $A$ situado **en el plano horizontal** tiene cota nula: coincide con su proyección horizontal $A'$, y su proyección vertical $A''$ cae **en la L.T.**", items: [...escena(), pE(A, "A ≡ A′", 0, 24, C_H), sE(A, enLT(A), AUX, true, 1.6), pt(S(enLT(A)), "A″", C_V, 0, -12), refD(A), pH(A, "A′", 16, 16), pV(A, "A″", 16, -8)] },
      { texto: "Un punto $E$ situado **en el plano vertical** tiene alejamiento nulo: coincide con su proyección vertical $E''$, y su proyección horizontal $E'$ cae **en la L.T.**", items: [pE(E, "E ≡ E″", 0, -14, C_V), sE(E, enLT(E), AUX, true, 1.6), pt(S(enLT(E)), "E′", C_H, 0, 24), refD(E), pV(E, "E″", 16, -8), pH(E, "E′", 16, 20)] },
      { texto: "Un punto $R$ **de la L.T.** está en los dos planos a la vez: cota y alejamiento nulos. Sus dos proyecciones coinciden con él, sobre la L.T.", items: [pE(R, "R", 0, -14, "blanco"), pt(o(R), "R′ ≡ R″", "blanco", 0, -14)] },
      { texto: "En resumen: si una proyección está **en la L.T.**, el punto pertenece a un plano de proyección. Es el plano horizontal si la que está en la L.T. es la vertical, y el plano vertical si es la horizontal.", dura: 1, items: [circ(o(A), 9, RES), circ(o(E), 9, RES), circ(o(R), 9, RES)] },
    ],
  };
};

const rd = (g: number) => (g * Math.PI) / 180;

/* ───────────── Fundamentos, diedros y abatimiento (págs. 95-98) ───────────── */

const fundamentos = (): Diagrama => {
  const A: P3 = [150, 85, 100];
  const marco = planosEspacio({ ancho: 260, alto: 170, fondo: 150, bajo: 110, detras: 70, rotulos: false });
  return {
    label: "Sistema diédrico: dos planos perpendiculares y la línea de tierra",
    pasos: [
      { texto: "El **sistema diédrico** es un sistema de proyecciones **cilíndricas ortogonales**. Se compone de **dos planos perpendiculares**; sobre cada uno se hallan las proyecciones ortogonales del cuerpo que se quiere representar. Los planos son **ilimitados** y **opacos**: aquí se ve solo un trozo de cada uno.", items: marco },
      { texto: "Uno es el **plano horizontal**, **PH** o $H$, el del suelo. El otro es el **plano vertical**, **PV** o $V$, llamado así porque contiene la dirección de la **plomada**.", items: [rot(S([30, 0, 150]), "PV", C_V, 0, 0, 22), rot(S([30, 135, 0]), "PH", C_H, 0, 0, 22), fl(S([285, 0, 150]), S([285, 0, 60]), AUX, 2.2), rot(S([285, 0, 40]), "plomada", AUX, 0, 22, 15)] },
      { texto: "Su intersección es una recta, la **línea de tierra** (L.T.). Se representa con una línea fina y **dos trazos gruesos** en sus extremos, dibujados **por debajo** de ella.", items: [rot(S([272, 0, 0]), "L.T.", "blanco", 26, 8, 20), seg(S([0, 0, 0]), S([26, 0, 0]), "blanco", false, 5), seg(S([234, 0, 0]), S([260, 0, 0]), "blanco", false, 5)] },
      { texto: "Un punto $A$ se proyecta ortogonalmente sobre el PH, en la **proyección horizontal** o **planta** $A'$, y sobre el PV, en la **proyección vertical** o **alzado** $A''$. A la derecha, esas dos proyecciones en el dibujo.", items: [pE(A, "A", 14, -8), ...proyH(A, "A′", 12, 20), ...proyV(A, "A″", -16, -6), ...ltDibujo(), ...rotulos(), ...pD(A, "A")] },
    ],
  };
};

const diedros = (): Diagrama => {
  const F = (al: number, co: number): Pt => [260 + 1.2 * al, 195 - 1.2 * co];
  const ejes: Item[] = [seg(F(-165, 0), F(165, 0), C_H, false, 4), seg(F(0, -135), F(0, 135), C_V, false, 4)];
  return {
    label: "Los cuatro diedros, los semiplanos y los planos bisectores",
    pasos: [
      { texto: "Los planos PH y PV, ilimitados, se cortan en la L.T. y dividen el espacio en **cuatro diedros rectos**. Aquí se ven prolongados por delante, por detrás, por encima y por debajo de la L.T.", solo: true, items: [...planosEspacio({ ancho: 260, alto: 170, fondo: 150, bajo: 130, detras: 110, rotulos: false }), rot(S([272, 0, 0]), "L.T.", "blanco", 26, 8, 20)] },
      { texto: "Vistos **de perfil**, desde un extremo de la L.T., los planos son dos rectas perpendiculares. La L.T. es el punto donde se cortan. Cada plano queda dividido en dos **semiplanos**: horizontal anterior (PHa) y posterior (PHp), vertical superior (PVs) e inferior (PVi).", items: [...ejes, rot(F(0, 135), "PVs", C_V, 30, 4, 19), rot(F(0, -135), "PVi", C_V, 30, 12, 19), rot(F(165, 0), "PHa", C_H, -8, 24, 19), rot(F(-165, 0), "PHp", C_H, 8, 24, 19), pt(F(0, 0), "L.T.", "blanco", -22, -14)] },
      { texto: "Se numeran **primero, segundo, tercero y cuarto diedro**. El **primero** queda **delante del PV y encima del PH**; los demás siguen el sentido contrario a las agujas del reloj.", items: [poli([F(0, 0), F(165, 0), F(165, 135), F(0, 135)], "verde", 0.1), rot(F(85, 75), "1.º", "verde", 0, 0, 30), rot(F(-85, 75), "2.º", "gris", 0, 0, 30), rot(F(-85, -75), "3.º", "gris", 0, 0, 30), rot(F(85, -75), "4.º", "gris", 0, 0, 30)] },
      { texto: "Los **planos bisectores** dividen cada diedro en dos mitades de 45°: los **ocho octantes**. El **primer bisector** pasa por el 1.er y el 3.er diedro; el **segundo**, por el 2.º y el 4.º.", items: [seg(F(-130, -130), F(130, 130), "amarillo", true, 2.4), seg(F(-130, 130), F(130, -130), "morado", true, 2.4), rot(F(132, 134), "1.er bisector", "amarillo", 0, -8, 16), rot(F(-132, 134), "2.º bisector", "morado", 0, -8, 16)] },
      { texto: "El observador está **en el infinito**, por encima del PH y por delante del PV: en el primer diedro. Como los planos son opacos, **solo se ve** lo que está en el primer diedro; lo de los otros tres es **oculto**.", items: [fl(F(170, 112), F(95, 78), "verde", 3), rot(F(170, 112), "observador", "verde", 20, -8, 16)] },
    ],
  };
};

const abatimiento = (): Diagrama => {
  const A: P3 = [150, 80, 100];
  const AN = 260, ALTO = 160, BAJO = 100;
  const giro = (x: number, z: number, th: number): P3 => [x, -z * Math.sin(rd(th)), z * Math.cos(rd(th))];
  const pv = (th: number, c: Color = C_V): Item => poli([giro(0, ALTO, th), giro(AN, ALTO, th), giro(AN, -BAJO, th), giro(0, -BAJO, th)].map((q) => S(q)), c, 0.14);
  const arcoA = (hasta: number): Item => lin(Array.from({ length: 21 }, (_, i) => S(giro(A[0], A[2], (hasta * i) / 20))), "verde", true, 2.2);
  const base: Item[] = [poli([S([0, -ALTO, 0]), S([AN, -ALTO, 0]), S([AN, 130, 0]), S([0, 130, 0])], C_H, 0.1), seg(S([0, 0, 0]), S([AN, 0, 0]), "blanco", false, 3.6), rot(S([272, 0, 0]), "L.T.", "blanco", 26, 8, 20), rot(S([30, 125, 0]), "PH", C_H, 0, 0, 20), pt(S(enH(A)), "A′", C_H, 14, 18)];
  return {
    label: "El abatimiento del plano vertical y la línea de referencia",
    pasos: [
      { texto: "El punto $A$ se proyecta sobre el PH en $A'$ y sobre el PV en $A''$. Pero el papel es **un solo plano**: hay que llevar los dos planos de proyección a uno.", solo: true, base, items: [pv(0), pE(A, "A", 14, -8), sE(A, enH(A), AUX, true, 1.6), pt(S(enV(A)), "A″", C_V, -16, -6), sE(A, enV(A), AUX, true, 1.6), rot(S([30, 0, 150]), "PV", C_V, 0, 0, 20)] },
      { texto: "Se **abate** el plano vertical: gira **hacia atrás** alrededor de la L.T., arrastrando la proyección $A''$. El horizontal no se mueve. El sentido es convencional; el resultado sería el mismo girando el horizontal.", solo: true, items: [pv(50), arcoA(50), pt(S(giro(A[0], A[2], 50)), "A″", C_V, -16, -6), sE(enH(A), giro(A[0], A[2], 50), AUX, true, 1.4)] },
      { texto: "Tras girar 90° el plano vertical coincide con el horizontal: su mitad **superior** cae sobre el **PH posterior** y su mitad **inferior** sobre el **PH anterior**. $A''$ queda detrás de la L.T. y $A'$, delante, en una misma recta **perpendicular a la L.T.**", items: [pv(90), pt(S(giro(A[0], A[2], 90)), "A″", C_V, -16, 14), sE(enH(A), giro(A[0], A[2], 90), "verde", true, 2.4), rot(S([40, -ALTO + 20, 0]), "PV superior = PH posterior", C_V, 90, 0, 15), rot(S([40, BAJO - 10, 0]), "PV inferior = PH anterior", C_V, 90, 20, 15)] },
      { texto: "Este es el dibujo, la **épura**: el plano del papel es el PH con el PV abatido sobre él. $A'$ y $A''$ están en la **misma perpendicular a la L.T.**: la **línea de referencia**. Dos proyecciones que no estén en una misma perpendicular **no pueden ser las de un punto** del espacio.", items: [...ltDibujo(), rot([DX + DS * 130, -16], "En el dibujo", AUX, 0, 0, 15), ...pD(A, "A"), rot([DX + DS * A[0] + 22, DY - 8], "línea de referencia", "verde", 70, -30, 15)] },
    ],
  };
};

const perfilPunto = (): Diagrama => {
  const A: P3 = [90, 70, 80];
  const XP = 190;
  const A1: P3 = [XP, A[1], A[2]];
  const plano = (th: number): Item => poli([[-80, -70], [130, -70], [130, 150], [-80, 150]].map(([y, z]) => S([XP + y * Math.sin(rd(th)), y * Math.cos(rd(th)), z])), "verde", 0.12);
  const ph = (th: number, yy: number, zz: number): P3 => [XP + yy * Math.sin(rd(th)), yy * Math.cos(rd(th)), zz];
  const base = planosEspacio({ ancho: 260, alto: 170, fondo: 150, bajo: 90, detras: 80 });
  return {
    label: "Tercera proyección de un punto sobre un plano de perfil",
    pasos: [
      { texto: "Las rectas y figuras contenidas en planos de **perfil** (perpendiculares a la L.T.) quedan **indeterminadas** con dos proyecciones. Se usa una **tercera proyección** sobre un **plano de perfil** $\\alpha$, perpendicular a los dos planos del sistema y, por tanto, a la L.T. Corta al PH en $\\alpha_1$ y al PV en $\\alpha_2$.", dura: 2, base: [...base, sE([XP, -80, 0], [XP, 130, 0], C_H, false, 3.4), sE([XP, 0, -70], [XP, 0, 150], C_V, false, 3.4), rot(S([XP, 130, 0]), "α₁", C_H, 16, 12, 18), rot(S([XP, 0, 150]), "α₂", C_V, 16, -2, 18), pt(S([XP, 0, 0]), "O", "blanco", -16, 18)], items: [plano(0)] },
      { texto: "El punto $A$ se proyecta en $A'$ y en $A''$, como siempre, y también sobre el plano de perfil: la proyectante es **paralela a la L.T.** y llega a $A_1$.", items: [pE(A, "A", 12, -8), ...proyH(A, "A′", 10, 20), ...proyV(A, "A″", -16, -6), sE(A, A1, "verde", false, 3), pE(A1, "A₁", 16, -6)] },
      { texto: "El plano de perfil se **abate sobre el vertical** girando alrededor de $\\alpha_2$: $A_1$ se desplaza hasta quedar a la **derecha** de $\\alpha_2$, en el mismo plano que $A''$.", dura: 1, items: [plano(50), lin(Array.from({ length: 21 }, (_, i) => S(ph((90 * i) / 20, A[1], A[2]))), "verde", true, 2.2), pE(ph(50, A[1], A[2]), "", 0, 0)] },
      { texto: "Con el plano de perfil abatido sobre el vertical, $A_1$ está a la misma altura que $A''$ y a una distancia de $\\alpha_2$ igual al **alejamiento** de $A$. Un punto se puede dar así por **tres medidas**: lo que dista del plano de perfil, su alejamiento y su cota.", items: [plano(90), pE(ph(90, A[1], A[2]), "A₁", 14, -8), sE(enV(A), ph(90, A[1], A[2]), "verde", true, 2.2)] },
      { texto: "En el dibujo: $\\alpha_2$ es una vertical que corta la L.T. en $O$. $A''$ y $A_1$ están en la misma horizontal; $A_1$ queda a la derecha de $O$, a la distancia $y$, igual a la de $A'$ a la L.T.", items: [...ltDibujo(), rot([DX + DS * 130, -16], "En el dibujo", AUX, 0, 0, 15), seg(o([XP, 0, 0]) as Pt, [o([XP, 0, 0])[0], DY - DS * 150], "gris", false, 1.6), seg(o([XP, 0, 0]), [o([XP, 0, 0])[0], DY + DS * 110], "gris", false, 1.6), pt(o([XP, 0, 0]), "O", "blanco", 16, 20), rot([o([XP, 0, 0])[0], DY - DS * 150], "α₂", "gris", 16, -6, 16), ...pD(A, "A"), pt(v(ph(90, A[1], A[2])), "A₁", "verde", 12, -8), seg(v(A), v(ph(90, A[1], A[2])), "verde", true, 1.8), rot([(o([XP, 0, 0])[0] + v(ph(90, A[1], A[2]))[0]) / 2, v(A)[1]], "y", "verde", 0, 18, 16)] },
    ],
  };
};

/* ───────────── El punto en los diedros y el alfabeto del punto (págs. 98-99) ───────────── */

const puntoDiedros = (): Diagrama => {
  const P: [string, number, number, number][] = [["A", 80, 70, 90], ["B", 145, -60, 95], ["C", 210, -70, -90], ["D", 275, 60, -95]];
  const giro = (a0: number): Item[] => {
    const q = (d: number): Pt => [LC[0] + 118 * Math.cos((d * Math.PI) / 180), LC[1] - 118 * Math.sin((d * Math.PI) / 180)];
    return [arc(LC, 118, a0 + 8, a0 + 76, RES, 2.6), fl(q(a0 + 76), q(a0 + 86), RES, 2.6)];
  };
  const perfil = (): Item[] => P.flatMap(([n, , al, co]) => [seg(L(al, co), L(al, 0), "gris", true, 1.4), seg(L(al, co), L(0, co), "gris", true, 1.4), pt(L(al, co), n, C_E, al > 0 ? 14 : -14, co > 0 ? -8 : 20)]);
  const dibujo = (): Item[] => P.flatMap(([n, x, al, co]) => [refD([x, al, co]), pH([x, al, 0], `${n}′`, 16, al > 0 ? 16 : -4), pV([x, 0, co], `${n}″`, -16, co > 0 ? -4 : 16)]);
  return {
    label: "Proyecciones de un punto en cada uno de los cuatro diedros",
    pasos: [
      { texto: "Al abatir el plano vertical, su mitad **superior** cae sobre el horizontal **posterior** y la **inferior** sobre el horizontal **anterior**. De ahí sale cómo quedan las proyecciones de un punto en cada diedro.", dura: 1, base: vistaPerfil(), items: [...giro(90), ...giro(270), rot(L(-110, 100), "PV superior", C_V, 0, 0, 15), rot(L(-110, -108), "PV inferior", C_V, 0, 0, 15)] },
      { texto: "Cuatro puntos, uno en cada diedro, vistos **de perfil**: $A$ en el primero, $B$ en el segundo, $C$ en el tercero y $D$ en el cuarto. Cada uno tiene una **cota** (distancia al PH) y un **alejamiento** (distancia al PV).", items: perfil() },
      { texto: "Y sus proyecciones en el dibujo. $A$ (1.º): $A''$ encima de la L.T. y $A'$ debajo. $B$ (2.º): las dos **encima**. $C$ (3.º): $C'$ encima y $C''$ debajo, **al revés** que en el primero. $D$ (4.º): las dos **debajo**.", items: dibujo() },
      { texto: "Regla: encima de la L.T. queda lo que está sobre el PH (cota $+$) en el alzado o detrás del PV (alejamiento $-$) en la planta; debajo, lo contrario. Solo el primer diedro es visto; los puntos de los otros tres son ocultos.", items: [poli([[DX - 60, DY - 130], [DX + DS * 320, DY - 130], [DX + DS * 320, DY], [DX - 60, DY]], C_V, 0.07), poli([[DX - 60, DY], [DX + DS * 320, DY], [DX + DS * 320, DY + 130], [DX - 60, DY + 130]], C_H, 0.07), rot([DX - 20, DY - 112], "PH posterior = PV superior", C_V, 20, 0, 14), rot([DX - 20, DY + 122], "PH anterior = PV inferior", C_H, 20, 0, 14)] },
    ],
  };
};

/** Las 17 posiciones del punto: ángulo en la vista de perfil (0° = PH anterior, antihorario). */
const ALFA: Record<string, number> = { A: 0, B: 22.5, C: 45, D: 67.5, E: 90, F: 112.5, G: 135, H: 157.5, I: 180, J: 202.5, K: 225, N: 247.5, M: 270, O: 292.5, P: 315, Q: 337.5 };
const alfabeto = (): Diagrama => {
  const marco: Item[] = [...vistaPerfil(), seg(L(-118, -118), L(118, 118), "amarillo", true, 1.3), seg(L(-118, 118), L(118, -118), "morado", true, 1.3)];
  const grupo = (ns: string[], rho: number): Item[] => ns.flatMap((n, k) => {
    const g = ALFA[n]!;
    const al = Math.round(rho * Math.cos(rd(g))), co = Math.round(rho * Math.sin(rd(g)));
    const x = 30 + 58 * k;
    const dx = 15 * Math.cos(rd(g)) - (Math.cos(rd(g)) < -0.2 ? 4 : 0), dy = -15 * Math.sin(rd(g)) + 6;
    const p: P3 = [x, al, co];
    const enPerfil = pt(L(al, co), n, C_E, dx, dy);
    if (al === -co && al !== 0) return [enPerfil, refD(p), pt(h(p), `${n}′≡${n}″`, "morado", 0, al < 0 ? -12 : 22)];
    return [enPerfil, refD(p), pH(p, `${n}′`, 16, al >= 0 ? 18 : -6), pV(p, `${n}″`, 16, co >= 0 ? -8 : 18)];
  });
  return {
    label: "Alfabeto del punto: las 17 posiciones de un punto del espacio",
    pasos: [
      { texto: "En **los planos de proyección**: $A$ (PH anterior) tiene cota nula; $E$ (PV superior), alejamiento nulo; $I$ (PH posterior), cota nula y alejamiento negativo; $M$ (PV inferior), alejamiento nulo y cota negativa. A la izquierda, vista de perfil; a la derecha, sus proyecciones.", dura: 1, base: marco, items: grupo(["A", "E", "I", "M"], 100) },
      { texto: "En los **bisectores**: $C$ (1.er bisector, 1.er diedro) y $K$ (1.er bisector, 3.er diedro) tienen cota y alejamiento **iguales**: positivos en $C$ y negativos en $K$. $G$ y $P$, en el 2.º bisector, tienen las dos proyecciones **confundidas**.", dura: 1, items: grupo(["C", "G", "K", "P"], 99) },
      { texto: "En los **octantes**, cada uno entre un plano y un bisector. $B$, $H$, $J$ y $Q$ están más cerca del plano horizontal: tienen **más alejamiento que cota**.", dura: 1, items: grupo(["B", "H", "J", "Q"], 110) },
      { texto: "$D$, $F$, $N$ y $O$ están más cerca del plano vertical: tienen **más cota que alejamiento**.", dura: 1, items: grupo(["D", "F", "N", "O"], 110) },
      { texto: "Y en la **línea de tierra**: el punto $R$ está en los dos planos a la vez, con cota y alejamiento nulos. Sus dos proyecciones coinciden con él, sobre la L.T. Son **17 posiciones** en total.", items: [pt(LC, "R", C_E, -16, -12), pt(o([120, 0, 0]), "R′≡R″", "blanco", 0, -14)] },
    ],
  };
};

/* ───────────── La recta (págs. 99-100) ───────────── */

/* Recta de referencia: va de su traza vertical V (en el PV) a su traza horizontal H (en el PH). */
const RV: P3 = [50, 0, 125];
const RH: P3 = [215, 110, 0];
const r = (t: number): P3 => mix(RV, RH, t);

const recta = (): Diagrama => {
  const A = r(0.25), B = r(0.72);
  return {
    label: "Proyecciones de una recta: en el espacio y en el dibujo",
    pasos: [
      { texto: "Una recta $r$ del espacio, en el primer diedro. Para representarla basta con **dos de sus puntos**, $A$ y $B$.", items: [...escena(), sE(r(0.05), r(0.95)), rot(S(r(0.05)), "r", C_E, 12, -6), pE(A, "A", -14, 0), pE(B, "B", -14, 0)] },
      { texto: "Sobre el plano horizontal, $A$ y $B$ se proyectan en $A'$ y $B'$. La recta que los une es la **proyección horizontal** $r'$: la forman las proyecciones de todos los puntos de $r$.", items: [sE(enH(r(0.05)), enH(r(0.95)), C_H), rot(S(enH(r(0.95))), "r′", C_H, 16, 8), ...proyH(A, "A′", -14, 18), ...proyH(B, "B′", -14, 18)] },
      { texto: "Sobre el plano vertical se proyectan en $A''$ y $B''$, que definen la **proyección vertical** $r''$.", items: [sE(enV(r(0.05)), enV(r(0.95)), C_V), rot(S(enV(r(0.95))), "r″", C_V, 16, -4), ...proyV(A, "A″", 14, -8), ...proyV(B, "B″", 14, -8)] },
      { texto: "Al abatir el plano vertical queda el dibujo: cada punto tiene sus dos proyecciones en una **misma perpendicular a la L.T.**", items: [...pD(A, "A"), ...pD(B, "B")] },
      { texto: "$r'$ une $A'$ con $B'$ y $r''$ une $A''$ con $B''$. Una recta queda definida por **sus dos proyecciones**; solo si es de perfil hará falta una tercera.", items: [sH(r(0.05), r(0.95)), sV(r(0.05), r(0.95)), rot(h(r(0.95)), "r′", C_H, 16, 8), rot(v(r(0.95)), "r″", C_V, 16, -6)] },
    ],
  };
};

const trazas = (): Diagrama => ({
  label: "Trazas de una recta: los puntos donde corta a los planos de proyección",
  pasos: [
    { texto: "Las **trazas de una recta** son los puntos donde corta a los planos de proyección. La recta $r$ encuentra al plano vertical en su **traza vertical** $V$ y al horizontal en su **traza horizontal** $H$.", items: [
      ...escena(), sE(RV, RH), sE(r(-0.15), RV, C_E, true, 2), sE(RH, r(1.12), C_E, true, 2), rot(S(r(0.5)), "r", C_E, 12, -8), pE(RV, "V", -16, -4, C_V), pE(RH, "H", 16, 14, C_H),
    ] },
    { texto: "$V$ está en el plano vertical: coincide con su proyección vertical $V''$, y su proyección horizontal $V'$ cae **en la L.T.** La proyección $r'$ va de $V'$ a $H'$.", items: [sE(RV, enLT(RV), AUX, true, 1.6), pt(S(enLT(RV)), "V′", C_H, -16, 18), sE(enLT(RV), RH, C_H), rot(S(mix(enLT(RV), RH, 0.5)), "r′", C_H, -4, 22)] },
    { texto: "$H$ está en el plano horizontal: coincide con $H'$, y su proyección vertical $H''$ cae **en la L.T.** La proyección $r''$ va de $V''$ a $H''$.", items: [sE(RH, enLT(RH), AUX, true, 1.6), pt(S(enLT(RH)), "H″", C_V, 16, -8), sE(RV, enLT(RH), C_V), rot(S(mix(RV, enLT(RH), 0.4)), "r″", C_V, 14, -8)] },
    { texto: "En el dibujo, $r''$ llega a la L.T. en $H''$ y $r'$ llega a la L.T. en $V'$. Las líneas de referencia $V'$-$V''$ y $H'$-$H''$ son perpendiculares a la L.T.", items: [
      sH(enLT(RV), RH), sV(RV, enLT(RH)), rot(h(mix(enLT(RV), RH, 0.5)), "r′", C_H, -8, 24), rot(v(mix(RV, enLT(RH), 0.5)), "r″", C_V, 12, -8),
      refD(RV), refD(RH), pV(RV, "V″", -16, -4), pH(RV, "V′", -16, 20), pH(RH, "H′", 16, 16), pV(RH, "H″", 16, -8),
    ] },
    { texto: "Para hallar la **traza horizontal** de una recta dada, se prolonga $r''$ hasta la L.T. ($H''$) y la perpendicular por ese punto corta a $r'$ en $H'$.", dura: 1, items: [seg(v(RV), o(RH), RES, false, 5.5), seg(o(RH), h(RH), RES, false, 5.5)] },
    { texto: "Para hallar la **traza vertical**, se prolonga $r'$ hasta la L.T. ($V'$) y la perpendicular por ese punto corta a $r''$ en $V''$.", dura: 1, items: [seg(h(RH), o(RV), RES, false, 5.5), seg(o(RV), v(RV), RES, false, 5.5)] },
  ],
});

const vistas = (): Diagrama => {
  const a = r(-0.28), b = r(1.26);
  return {
    label: "Partes vistas y ocultas de una recta",
    pasos: [
      { texto: "Los planos de proyección son **opacos** y el observador está en el primer diedro. La recta $r$ atraviesa el plano vertical en $V$ y el horizontal en $H$.", items: [...planosEspacio({ detras: 45, bajo: 45 }), ...ltDibujo(), ...rotulos(), sE(RV, RH, C_E, false, 4), pE(RV, "V", -16, -4, C_V), pE(RH, "H", 16, 14, C_H)] },
      { texto: "Solo es **vista** la parte comprendida en el **primer diedro**, entre las dos trazas. El resto queda detrás del plano vertical o debajo del horizontal: es **oculta**.", items: [sE(a, RV, C_E, true, 2.2), sE(RH, b, C_E, true, 2.2), rot(S(a), "oculta", AUX, -34, 6, 15), rot(S(b), "oculta", AUX, 36, 2, 15), rot(S(r(0.5)), "vista", C_E, 26, -8, 15)] },
      { texto: "En el dibujo, la parte vista se traza con **línea continua**: el tramo de $r'$ y de $r''$ comprendido entre las líneas de referencia de las trazas.", items: [sH(RV, RH, false, 4), sV(RV, RH, false, 4), refD(RV), refD(RH), pV(RV, "V″", -16, -4), pH(RH, "H′", 16, 16), rot(h(r(0.55)), "r′", C_H, -6, 24), rot(v(r(0.45)), "r″", C_V, 12, -8)] },
      { texto: "La parte oculta se dibuja **de trazos**. Una recta puede pasar, como máximo, por **tres diedros**: esta va del segundo al primero y del primero al cuarto.", items: [sH(a, RV, true, 2.4), sV(a, RV, true, 2.4), sH(RH, b, true, 2.4), sV(RH, b, true, 2.4)] },
    ],
  };
};

const cortan = (): Diagrama => {
  const P: P3 = [140, 60, 70];
  const r0: P3 = [60, 20, 110], r1: P3 = [220, 100, 30];
  const s0: P3 = [70, 95, 40], s1: P3 = [210, 25, 100];
  /* m es la recta s subida 60 de cota: su proyección horizontal no cambia, pero ya no toca a r. */
  const m0: P3 = [70, 95, 100], m1: P3 = [210, 25, 160];
  const xi = 70 / (0.5 + 30 / 70);
  const I: P3 = [xi, 0, 110 - 0.5 * (xi - 60)];
  return {
    label: "Rectas que se cortan y rectas que se cruzan",
    pasos: [
      { texto: "Dos rectas $r$ y $s$ que **se cortan** en el espacio tienen un punto común $P$.", dura: 3, base: escena(), items: [sE(r0, r1), sE(s0, s1), rot(S(r1), "r", C_E, 14, 4), rot(S(s1), "s", C_E, 14, -4), pE(P, "P", 0, -14)] },
      { texto: "Ese punto tiene que estar a la vez en las dos rectas: $P'$ es el corte de $r'$ con $s'$ y $P''$ es el corte de $r''$ con $s''$.", dura: 2, items: [
        sH(r0, r1), sH(s0, s1), sV(r0, r1), sV(s0, s1), pH(P, "P′", 0, 26), pV(P, "P″", 0, -14),
        rot(h(r1), "r′", C_H, 14, 6), rot(h(s1), "s′", C_H, 14, 0), rot(v(r1), "r″", C_V, 14, 6), rot(v(s1), "s″", C_V, 14, -2),
      ] },
      { texto: "Por eso, dos rectas se cortan si las proyecciones del mismo nombre se cortan en puntos situados en una **misma perpendicular a la L.T.**", dura: 1, items: [seg(h(P), v(P), RES, false, 4.5)] },
      { texto: "Si los cortes **no están** en una misma perpendicular, no son las proyecciones de un punto: las rectas **se cruzan**. Aquí $n'$ y $m'$ se cortan en $B'$, y $n''$ y $m''$ en $A''$, que es otro punto distinto.", items: [
        sE(r0, r1), sE(m0, m1), rot(S(r1), "n", C_E, 14, 4), rot(S(m1), "m", C_E, 14, -4),
        sH(r0, r1), sH(m0, m1), sV(r0, r1), sV(m0, m1), pH(P, "B′", 0, 26), pV(I, "A″", 0, -14), seg(h(P), o(P), "rojo", true, 2), seg(o(I), v(I), "rojo", true, 2),
        rot(h(r1), "n′", C_H, 14, 6), rot(h(m1), "m′", C_H, 14, 0), rot(v(r1), "n″", C_V, 14, 6), rot(v(m1), "m″", C_V, 14, -2),
      ] },
    ],
  };
};

/* ───────────── Posiciones particulares de la recta (págs. 100-103) ───────────── */

const perpendiculares = (): Diagrama => {
  const aH: P3 = [70, 75, 0], aT: P3 = [70, 75, 140];
  const dV: P3 = [185, 0, 95], dT: P3 = [185, 125, 95];
  return {
    label: "Rectas perpendiculares a los planos de proyección (rectas de punta)",
    pasos: [
      { texto: "Una recta $a$ **perpendicular al plano horizontal**: todos sus puntos se proyectan sobre el mismo punto del PH. Solo tiene traza horizontal, $H$.", items: [...escena(), sE(aH, aT, C_E, false, 3.6), rot(S(aT), "a", C_E, 12, 4), pE(aH, "H", -14, 18, C_H), sE(enLT(aH), enV(aT), C_V), sE(aH, enLT(aH), AUX, true, 1.6), rot(S(enV(aT)), "a″", C_V, 14, 8)] },
      { texto: "En el dibujo, su proyección horizontal $a'$ es **un punto** y su proyección vertical $a''$ es una recta **perpendicular a la L.T.**", items: [pH(aH, "a′", 14, 6), sV(enLT(aH), aT), rot(v(aT), "a″", C_V, 14, 10), seg(o(aH), h(aH), AUX, true, 1.4)] },
      { texto: "Una recta $d$ **perpendicular al plano vertical**: todos sus puntos se proyectan sobre el mismo punto del PV. Solo tiene traza vertical, $V$.", items: [sE(dV, dT, C_E, false, 3.6), rot(S(dT), "d", C_E, -12, 2), pE(dV, "V", 14, -8, C_V), sE(enLT(dV), enH(dT), C_H), sE(dV, enLT(dV), AUX, true, 1.6), rot(S(enH(dT)), "d′", C_H, 14, 8)] },
      { texto: "En el dibujo, su proyección vertical $d''$ es **un punto** y su proyección horizontal $d'$ es **perpendicular a la L.T.** En las dos rectas, una proyección es un punto y la otra es perpendicular a la L.T.", items: [pV(dV, "d″", 14, -6), sH(enLT(dV), dT), rot(h(dT), "d′", C_H, 14, 0), seg(o(dV), v(dV), AUX, true, 1.4)] },
    ],
  };
};

const paralelaLT = (): Diagrama => {
  const a: P3 = [25, 75, 95], b: P3 = [235, 75, 95], A: P3 = [130, 75, 95];
  return {
    label: "Recta paralela a la línea de tierra",
    pasos: [
      { texto: "Una recta $r$ **paralela a la L.T.** es paralela a los dos planos de proyección a la vez: no corta a ninguno, así que **no tiene trazas**.", items: [...escena(), sE(a, b, C_E, false, 3.6), rot(S(b), "r", C_E, 14, 4)] },
      { texto: "Sus proyecciones en el espacio, $r'$ y $r''$, son también paralelas a la L.T. Un punto $A$ de la recta se proyecta sobre ellas.", items: [sE(enH(a), enH(b), C_H), sE(enV(a), enV(b), C_V), rot(S(enH(b)), "r′", C_H, 16, 4), rot(S(enV(b)), "r″", C_V, 16, 4), pE(A, "A", 0, -12), ...proyH(A, "A′", 0, 22), ...proyV(A, "A″", 0, -12)] },
      { texto: "En el dibujo, la recta paralela a la L.T. tiene **sus dos proyecciones paralelas a la L.T.**: $r''$ a la altura de su cota y $r'$ a la distancia de su alejamiento.", items: [sH(a, b), sV(a, b), rot(h(b), "r′", C_H, 16, 4), rot(v(b), "r″", C_V, 16, 4), ...pD(A, "A")] },
    ],
  };
};

const horizontal = (): Diagrama => {
  const V: P3 = [45, 0, 90], B: P3 = [215, 120, 90];
  const A = mix(V, B, 0.55);
  return {
    label: "Recta horizontal: paralela al plano horizontal",
    pasos: [
      { texto: "Una **recta horizontal** es paralela al plano horizontal: todos sus puntos tienen **la misma cota**. No corta al PH, de modo que solo tiene **traza vertical**, $V$.", items: [...escena(), sE(V, B, C_E, false, 3.6), rot(S(B), "r", C_E, -4, -12), pE(V, "V", -16, -4, C_V)] },
      { texto: "Como la cota no cambia, su proyección vertical $r''$ es **paralela a la L.T.** La proyección horizontal $r'$ puede tener cualquier dirección y parte de $V'$, en la L.T.", items: [sE(V, enV(B), C_V), rot(S(enV(B)), "r″", C_V, 14, -8), sE(enLT(V), enH(B), C_H), rot(S(enH(B)), "r′", C_H, 18, 4), sE(V, enLT(V), AUX, true, 1.6), pt(S(enLT(V)), "V′", C_H, -16, 18), sE(B, enH(B), AUX, true, 1.6), sE(B, enV(B), AUX, true, 1.6)] },
      { texto: "En el dibujo: $r''$ paralela a la L.T., a la altura de la cota, y $r'$ oblicua. La traza vertical está donde $r'$ corta a la L.T. ($V'$), y de ahí se sube a $r''$ ($V''$).", items: [sV(V, B), sH(enLT(V), B), rot(v(B), "r″", C_V, 16, 4), rot(h(B), "r′", C_H, 16, 6), refD(V), pV(V, "V″", -16, -6), pH(V, "V′", -16, 20)] },
      { texto: "Un punto $A$ de la recta tiene $A''$ en $r''$ y $A'$ en $r'$. Además, como $r$ es paralela al PH, $r'$ mide lo mismo que la recta: está en **verdadera magnitud**.", items: [...pD(A, "A")] },
    ],
  };
};

const frontal = (): Diagrama => {
  const H: P3 = [55, 80, 0], B: P3 = [185, 80, 145];
  const A = mix(H, B, 0.55);
  return {
    label: "Recta frontal: paralela al plano vertical",
    pasos: [
      { texto: "Una **recta frontal** es paralela al plano vertical: todos sus puntos tienen **el mismo alejamiento**. No corta al PV, de modo que solo tiene **traza horizontal**, $H$.", items: [...escena(), sE(H, B, C_E, false, 3.6), rot(S(B), "r", C_E, 12, 2), pE(H, "H", -14, 18, C_H)] },
      { texto: "Como el alejamiento no cambia, su proyección horizontal $r'$ es **paralela a la L.T.** La proyección vertical $r''$ tiene la misma inclinación que la recta y parte de $H''$, en la L.T.", items: [sE(H, enH(B), C_H), rot(S(enH(B)), "r′", C_H, 16, 6), sE(enLT(H), enV(B), C_V), rot(S(enV(B)), "r″", C_V, 14, 4), sE(H, enLT(H), AUX, true, 1.6), pt(S(enLT(H)), "H″", C_V, -8, -12), sE(B, enH(B), AUX, true, 1.6), sE(B, enV(B), AUX, true, 1.6)] },
      { texto: "En el dibujo: $r'$ paralela a la L.T., a la distancia del alejamiento, y $r''$ oblicua. La traza horizontal está donde $r''$ corta a la L.T. ($H''$), y de ahí se baja a $r'$ ($H'$).", items: [sH(H, B), sV(enLT(H), B), rot(h(B), "r′", C_H, 16, 4), rot(v(B), "r″", C_V, 14, 4), refD(H), pH(H, "H′", -16, 18), pV(H, "H″", -16, -8)] },
      { texto: "Un punto $A$ de la recta tiene $A'$ en $r'$ y $A''$ en $r''$. Ahora es $r''$ la que está en **verdadera magnitud**.", items: [...pD(A, "A")] },
    ],
  };
};

const oblicuas = (): Diagrama => {
  const O: P3 = [95, 0, 0], A: P3 = [215, 95, 115];
  const Z = mix(A, O, 1.36);
  const O2: P3 = [150, 0, 0], B: P3 = [95, -42, 70], C: P3 = [205, 42, -70];
  return {
    label: "Rectas oblicuas que cortan a la línea de tierra",
    pasos: [
      { texto: "Una recta $s$ oblicua a los dos planos que **corta a la L.T.**: en ese punto atraviesa a la vez el plano vertical y el horizontal, así que sus **dos trazas coinciden** en la L.T.", dura: 2, items: [...planosEspacio({ detras: 50, bajo: 75 }), ...ltDibujo(), ...rotulos(), sE(O, A, C_E, false, 3.6), sE(O, Z, C_E, true, 2.2), rot(S(A), "s", C_E, 12, 2), pE(O, "V ≡ H", -34, -12, "blanco")] },
      { texto: "En el dibujo, $s'$ y $s''$ **concurren en el mismo punto de la L.T.** Esta recta pasa del primer diedro al tercero: se ve la mitad del primer diedro y la otra es oculta.", dura: 1, items: [sH(O, A), sV(O, A), sH(O, Z, true, 2.2), sV(O, Z, true, 2.2), rot(h(A), "s′", C_H, 14, 6), rot(v(A), "s″", C_V, 14, 0), pt(o(O), "", "blanco")] },
      { texto: "Otra posición: la recta $s_1$ pasa del **segundo diedro al cuarto**. No tiene ningún punto en el primer diedro: es **toda oculta** y sus dos proyecciones se dibujan de trazos.", items: [
        ...planosEspacio({ detras: 50, bajo: 75 }), ...ltDibujo(), ...rotulos(), sE(B, C, C_E, true, 2.4), rot(S(B), "s₁", C_E, -16, -2), pE(O2, "", 0, 0, "blanco"),
        sH(B, C, true, 2.6), sV(B, C, true, 2.6), rot(h(C), "s₁′", C_H, 20, 6), rot(v(B), "s₁″", C_V, -20, 0), pt(o(O2), "", "blanco"),
      ] },
    ],
  };
};

/** Plano de perfil en el espacio, en la abscisa `x`. */
const perfilEspacio = (x: number, fondo = 135, alto = 160, c: Color = "morado", f = 0.1): Item => poli([S([x, 0, 0]), S([x, fondo, 0]), S([x, fondo, alto]), S([x, 0, alto])], c, f);

const perfil = (): Diagrama => {
  const X = 140;
  const V: P3 = [X, 0, 135], H: P3 = [X, 135, 0], O: P3 = [X, 0, 0];
  const V2: P3 = [X, 0, 60], H2: P3 = [X, 70, 0];
  return {
    label: "Recta de perfil: las dos proyecciones en una misma perpendicular a la L.T.",
    pasos: [
      { texto: "Una **recta de perfil** está contenida en un **plano de perfil**, es decir, perpendicular a la L.T. Aquí la recta $s$ va de su traza vertical $V$ a su traza horizontal $H$.", items: [...escena(), perfilEspacio(X, 150, 165), sE(V, H, C_E, false, 3.6), rot(S(mix(V, H, 0.5)), "s", C_E, -14, -8), pE(V, "V", 14, -6, C_V), pE(H, "H", -16, 8, C_H)] },
      { texto: "Sus dos proyecciones caen sobre las trazas del plano de perfil: $s'$ y $s''$ son **perpendiculares a la L.T.** y están en la misma línea.", items: [sE(O, H, C_H), sE(O, V, C_V), rot(S(mix(O, H, 0.45)), "s′", C_H, 10, 24), rot(S(mix(O, V, 0.55)), "s″", C_V, 18, 0)] },
      { texto: "En el dibujo, $s'$ y $s''$ quedan **confundidas** en una misma perpendicular a la L.T.", items: [sV(O, [X, 0, 155]), sH(O, [X, 150, 0]), rot(v([X, 0, 155]), "s″", C_V, 16, 8), rot(h([X, 150, 0]), "s′", C_H, 16, -2), pV(V, "V″", -18, 4), pH(H, "H′", -18, 6)] },
      { texto: "Pero otra recta $t$ del mismo plano de perfil tiene **las mismas proyecciones**: con ellas solas la recta no queda definida. Una recta de perfil se da por **dos de sus puntos** o por **sus dos trazas**, y para trabajar con ella hace falta una **tercera proyección**.", items: [sE(V2, H2, "rojo", true, 2.6), rot(S(mix(V2, H2, 0.5)), "t", "rojo", -12, -8)] },
    ],
  };
};

const perfilBisectores = (): Diagrama => {
  /** Recta de perfil de trazas V (cota `co`) y H (alejamiento `al`), en la vista de perfil y en la abscisa `x` del dibujo. */
  const caso = (x: number, al: number, co: number, n: string): { lado: Item[]; dib: Item[] } => {
    const k0 = -0.35, k1 = 1.35;
    const p = (t: number): Pt => L(al * t, co * (1 - t));
    return {
      lado: [seg(p(k0), p(k1), C_E, false, 3.4), pt(L(0, co), "V", C_V, al > 0 ? -14 : 14, -8), pt(L(al, 0), "H", C_H, 0, 24), rot(p(k1), n, C_E, al > 0 ? 14 : -14, 4)],
      dib: [seg(v([x, 0, 150]), h([x, 135, 0]), AUX, false, 1.8), pt(v([x, 0, co]), al < 0 && Math.abs(al) === co ? "H′≡V″" : "V″", al < 0 && Math.abs(al) === co ? "morado" : C_V, 0, -14), ...(al < 0 && Math.abs(al) === co ? [] : [pt(h([x, al, 0]), "H′", C_H, 0, 26)]), rot(v([x, 0, 150]), n, AUX, 0, -30, 16)],
    };
  };
  const s = caso(45, 95, 95, "s"), q = caso(130, -95, 95, "r"), a = caso(215, 60, 120, "a");
  return {
    label: "Rectas de perfil perpendiculares a los bisectores",
    pasos: [
      { texto: "Mirando en la dirección de la L.T., los planos de proyección se ven como dos rectas y la recta de perfil aparece **tal como es**. Las de perfil se clasifican por su posición respecto de los **bisectores**.", items: [...vistaPerfil(), seg(L(-105, -105), L(125, 125), RES, true, 1.8), seg(L(-105, 105), L(105, -105), "morado", true, 1.8), rot(L(125, 125), "1.er bisector", RES, 0, -8, 15), rot(L(-105, 105), "2.º bisector", "morado", 0, -8, 15)] },
      { texto: "La recta $s$ es **perpendicular al primer bisector**: sus trazas $H'$ y $V''$ **equidistan** de la L.T., una a cada lado.", dura: 1, items: [...s.dib, ...s.lado] },
      { texto: "La recta $r$ es **perpendicular al segundo bisector**: corta al plano horizontal por detrás del vertical, y en el dibujo sus trazas $H'$ y $V''$ **coinciden**. Solo es oculta la parte comprendida entre las trazas.", dura: 1, items: [...q.dib, ...q.lado] },
      { texto: "Si las trazas **ni equidistan ni coinciden**, como en la recta $a$, la recta de perfil **no es perpendicular** a ningún bisector.", items: [...a.dib, ...a.lado] },
    ],
  };
};

/* ───────────── Tercera proyección (pág. 104-105) ───────────── */

/** Punto de la tercera proyección: el plano de perfil de abscisa `xp`, abatido, lleva el alejamiento hacia la derecha. */
const T3 = (xp: number, al: number, co: number): Pt => [DX + DS * (xp + al), DY - DS * co];
/** Trazas del plano de perfil auxiliar en el dibujo, con su punto O en la L.T. */
const perfilDibujo = (xp: number, n = "α"): Item[] => [
  seg(v([xp, 0, 155]), h([xp, 140, 0]), "morado", false, 2), rot(v([xp, 0, 155]), `${n}₂`, "morado", 16, 10), rot(h([xp, 140, 0]), `${n}₁`, "morado", 16, -2), pt(o([xp, 0, 0]), "O", "blanco", -14, -10),
];
/** Lleva un alejamiento a la tercera proyección: paralela a la L.T. hasta la traza del perfil y arco de centro O hasta la L.T. */
const llevaAlej = (x: number, xp: number, al: number, c: Color = AUX): Item[] => [
  seg(h([x, al, 0]), h([xp, al, 0]), c, true, 1.6), arc(o([xp, 0, 0]), DS * al, -90, 0, c, 2),
];

const tercera = (): Diagrama => {
  const X = 55, XP = 165;
  const V: P3 = [X, 0, 115], H: P3 = [X, 95, 0], O: P3 = [X, 0, 0];
  const V1: P3 = [XP, 0, 115], H1: P3 = [XP, 95, 0];
  return {
    label: "Tercera proyección de una recta de perfil",
    pasos: [
      { texto: "La recta de perfil $s$, de trazas $V$ y $H$, tiene sus proyecciones $s'$ y $s''$ en una misma perpendicular a la L.T.: no dejan ver su inclinación.", items: [...escena(), sE(V, H, C_E, false, 3.6), rot(S(mix(V, H, 0.5)), "s", C_E, -14, -6), sE(O, V, C_V), sE(O, H, C_H), pE(V, "V″", -18, -2, C_V), pE(H, "H′", -16, 18, C_H)] },
      { texto: "Se añade un tercer plano de proyección: un **plano de perfil** $PP$, perpendicular a los otros dos. Al proyectar $s$ sobre él se obtiene $s_1$, la **tercera proyección**, paralela a la recta e igual a ella.", items: [perfilEspacio(XP), rot(S([XP, 135, 160]), "PP", "morado", -18, 16), sE(V, V1, AUX, true, 1.6), sE(H, H1, AUX, true, 1.6), sE(V1, H1, "morado", false, 3.6), rot(S(mix(V1, H1, 0.5)), "s₁", "morado", 16, -6), pE(V1, "V", 14, -6, "morado"), pE(H1, "H", 14, 14, "morado")] },
      { texto: "En el dibujo se parte de $s'$-$s''$ con sus trazas $H'$ y $V''$, y se dibuja el plano de perfil: sus trazas $\\alpha_1$ y $\\alpha_2$ son una perpendicular a la L.T., que corta en $O$.", items: [sV(O, [X, 0, 150]), sH(O, [X, 135, 0]), rot(v([X, 0, 150]), "s″", C_V, -16, 8), rot(h([X, 135, 0]), "s′", C_H, -16, -2), pV(V, "V″", -18, 4), pH(H, "H′", -18, 6), ...perfilDibujo(XP)] },
      { texto: "La **cota** no cambia: $V''$ se lleva con una **paralela a la L.T.** hasta $\\alpha_2$ y da el punto $V$.", items: [seg(v(V), v(V1), AUX, true, 1.6), pt(v(V1), "V", "morado", 14, -8)] },
      { texto: "El **alejamiento** hay que girarlo: $H'$ se lleva con una paralela a la L.T. hasta $\\alpha_1$ y, con un **arco de centro $O$**, hasta la L.T., donde está $H$. Es el abatimiento del plano de perfil sobre el vertical.", items: [...llevaAlej(X, XP, 95), pt(T3(XP, 95, 0), "H", "morado", 10, -10)] },
      { texto: "La recta $VH$ es la tercera proyección $s_1$: en ella la recta de perfil se ve con su **verdadera inclinación**. Para operar con una recta de perfil hay que saber pasar a la tercera proyección y volver de ella.", items: [seg(T3(XP, 0, 115), T3(XP, 95, 0), "morado", false, 3.8), rot(T3(XP, 48, 58), "s₁", "morado", 16, -6)] },
    ],
  };
};

const p12 = (): Diagrama => {
  const X = 55, XP = 150, AL = 100, CO = 115, a = 45;
  const ca = CO * (1 - a / AL);
  return {
    label: "Problema: punto de una recta de perfil del que se conoce una proyección",
    pasos: [
      { texto: "Se conoce la recta de perfil $r$ por sus trazas $H'$ y $V''$, y la proyección horizontal $A'$ de uno de sus puntos. Hay que hallar $A''$. Sobre $r''$ no se puede situar directamente: cualquier punto de esa línea valdría.", items: [
        ...ltDibujo(), seg(v([X, 0, 150]), h([X, 135, 0]), AUX, false, 2), rot(v([X, 0, 150]), "r″", C_V, -16, 8), rot(h([X, 135, 0]), "r′", C_H, -16, -2),
        pV([X, 0, CO], "V″", -18, 4), pH([X, AL, 0], "H′", -18, 6), pH([X, a, 0], "A′", -18, 6, C_E),
      ] },
      { texto: "Se pasa la recta a **tercera proyección** con un plano de perfil $\\beta$: $V''$ va por una paralela a la L.T. hasta $V$, y $H'$, por una paralela y un arco de centro $O$, hasta $H$. La recta $VH$ es $r_1$.", items: [
        ...perfilDibujo(XP, "β"), pt(T3(XP, 0, CO), "V", "morado", 14, -8), pt(T3(XP, AL, 0), "H", "morado", 10, -10), seg(T3(XP, 0, CO), T3(XP, AL, 0), "morado", false, 3.6), rot(T3(XP, AL * 0.2, CO * 0.8), "r₁", "morado", 18, -4),
      ] },
      { texto: "El punto $A'$ se lleva igual: paralela a la L.T., arco de centro $O$ y perpendicular a la L.T. hasta cortar a $r_1$. Ese corte es $A_1$, la tercera proyección del punto.", items: [...llevaAlej(X, XP, a, C_E), seg(T3(XP, a, 0), T3(XP, a, ca), C_E, true, 1.6), pt(T3(XP, a, ca), "A₁", C_E, 16, -6)] },
      { texto: "$A_1$ tiene la **cota** del punto: una paralela a la L.T. por $A_1$ corta a $r''$ en $A''$. Un punto de una recta de perfil se sitúa siempre pasando por la tercera proyección.", items: [seg(T3(XP, a, ca), v([X, 0, ca]), C_E, true, 1.6), pV([X, 0, ca], "A″", -18, 4, C_E)] },
    ],
  };
};

const p13 = (): Diagrama => {
  const X = 55, XP = 140;
  const A = { al: 40, co: 85 }, B = { al: 75, co: 45 };
  const m = (A.co - B.co) / (B.al - A.al);
  const coV = A.co + m * A.al, alH = A.al + A.co / m;
  return {
    label: "Problema: trazas de una recta de perfil dada por dos puntos",
    pasos: [
      { texto: "La recta de perfil $r$ está definida por dos puntos, $A(A'\\text{-}A'')$ y $B(B'\\text{-}B'')$. Hay que hallar sus **trazas**.", items: [
        ...ltDibujo(), seg(v([X, 0, 150]), h([X, 135, 0]), AUX, false, 2), rot(v([X, 0, 150]), "r″", C_V, -16, 8), rot(h([X, 135, 0]), "r′", C_H, -16, -2),
        pV([X, 0, A.co], "A″", -18, 4), pV([X, 0, B.co], "B″", -18, 4), pH([X, A.al, 0], "A′", -18, 6), pH([X, B.al, 0], "B′", -18, 6),
      ] },
      { texto: "Se toma un plano de perfil $\beta$ y se halla la tercera proyección de los dos puntos: las cotas pasan con paralelas a la L.T. y los alejamientos, con paralelas y arcos de centro $O$. Se obtienen $A_1$ y $B_1$.", dura: 1,
        base: [...perfilDibujo(XP, "β"), pt(T3(XP, A.al, A.co), "A₁", C_E, 16, -6), pt(T3(XP, B.al, B.co), "B₁", C_E, 16, -6)],
        items: [
          ...llevaAlej(X, XP, A.al), ...llevaAlej(X, XP, B.al), seg(T3(XP, A.al, 0), T3(XP, A.al, A.co), AUX, true, 1.6), seg(T3(XP, B.al, 0), T3(XP, B.al, B.co), AUX, true, 1.6),
          seg(v([X, 0, A.co]), T3(XP, A.al, A.co), AUX, true, 1.6), seg(v([X, 0, B.co]), T3(XP, B.al, B.co), AUX, true, 1.6),
        ] },
      { texto: "$A_1$ y $B_1$ definen $r_1$. Esta recta corta a $\\beta_2$ en $V$ y a la L.T. en $H$: son las trazas, vistas en la tercera proyección.", items: [seg(T3(XP, 0, coV), T3(XP, alH, 0), "morado", false, 3.6), rot(T3(XP, alH * 0.82, coV * 0.18), "r₁", "morado", 18, -6), pt(T3(XP, 0, coV), "V", "morado", -14, 4), pt(T3(XP, alH, 0), "H", "morado", 10, -10)] },
      { texto: "Se devuelven a la recta: $V$ pasa a $V''$ con una paralela a la L.T., y $H$ pasa a $H'$ deshaciendo el arco. Las trazas pedidas son $H'$ y $V''$.", items: [seg(T3(XP, 0, coV), v([X, 0, coV]), RES, true, 2), pV([X, 0, coV], "V″", -18, 4), arc(o([XP, 0, 0]), DS * alH, -90, 0, RES, 2), seg(h([XP, alH, 0]), h([X, alH, 0]), RES, true, 2), pH([X, alH, 0], "H′", -18, 6)] },
    ],
  };
};

const p14 = (): Diagrama => {
  const X = 105, XP = 165, AL = 95, CO = 110;
  const I = { al: 50, co: 80 };
  const sA: P3 = [35, I.al - 0.4 * 70, I.co + 0.35 * 70], sB: P3 = [150, I.al + 0.4 * 45, I.co - 0.35 * 45];
  return {
    label: "Problema: ¿se cortan una recta de perfil y otra cualquiera?",
    pasos: [
      { texto: "La recta $r$ es de perfil (trazas $H'$ y $V''$) y $s$ es una recta cualquiera. Sus proyecciones se cortan en $I'$ e $I''$, que están en la misma perpendicular a la L.T.: **aparentemente** se cortan.", items: [
        ...ltDibujo(), seg(v([X, 0, 150]), h([X, 135, 0]), AUX, false, 2), rot(v([X, 0, 150]), "r″", C_V, -16, 8), rot(h([X, 135, 0]), "r′", C_H, -16, -2), pV([X, 0, CO], "V″", -18, -2), pH([X, AL, 0], "H′", -18, 8),
        sH(sA, sB), sV(sA, sB), rot(h(sA), "s′", C_H, -14, 0), rot(v(sA), "s″", C_V, -14, 0), pH([X, I.al, 0], "I′", 14, -6, C_E), pV([X, 0, I.co], "I″", 16, -8, C_E),
      ] },
      { texto: "Con una recta de perfil esa comprobación no basta. Se halla la tercera proyección $r_1$ de la recta de perfil.", items: [...perfilDibujo(XP, "β"), pt(T3(XP, 0, CO), "V", "morado", 14, -8), pt(T3(XP, AL, 0), "H", "morado", 10, -10), seg(T3(XP, 0, CO), T3(XP, AL, 0), "morado", false, 3.6), rot(T3(XP, AL * 0.75, CO * 0.25), "r₁", "morado", 18, -4)] },
      { texto: "Se pasa también el punto $I$ a la tercera proyección: $I_1$.", items: [...llevaAlej(X, XP, I.al, C_E), seg(T3(XP, I.al, 0), T3(XP, I.al, I.co), C_E, true, 1.6), seg(v([X, 0, I.co]), T3(XP, I.al, I.co), C_E, true, 1.6), pt(T3(XP, I.al, I.co), "I₁", C_E, 16, -6)] },
      { texto: "$I_1$ **no está** sobre $r_1$: el punto $I$ pertenece a $s$ pero no a la recta de perfil. Las rectas **se cruzan**. Si $I_1$ hubiera caído sobre $r_1$, se cortarían.", items: [rot(T3(XP, I.al, I.co), "se cruzan", "rojo", 34, -30, 18)] },
    ],
  };
};

/* ───────────── El plano (págs. 105-109) ───────────── */

const PL: Plano = { n: 30, a: 1.5, b: 0.62 };
const AL1 = 125;
const CO2 = 150;
/** El plano α en las dos vistas: en el espacio, el trozo del primer diedro con sus trazas; en el dibujo, las dos trazas y N. */
const planoAlfa = (pl: Plano = PL): Item[] => [planoEspacio(pl, AL1, CO2), ...trazasEspacio(pl, AL1, CO2), ...trazasDibujo(pl, AL1, CO2)];

const planoTrazas = (): Diagrama => ({
  label: "Trazas de un plano",
  pasos: [
    { texto: "Un plano oblicuo $\\alpha$ corta a los dos planos de proyección. Aquí se ve el trozo que queda en el primer diedro.", items: [...escena(), planoEspacio(PL, AL1, CO2), rot(S(enPlano(PL, 45, 55)), "α", C_E, 0, 0, 22)] },
    { texto: "Las **trazas de un plano** son las rectas de intersección con los planos de proyección: la **traza horizontal** $\\alpha_1$, sobre el PH, y la **traza vertical** $\\alpha_2$, sobre el PV. Las dos se cortan en un punto $N$ **de la L.T.**", items: [...trazasEspacio(PL, AL1, CO2), pE(N(PL), "N", -14, -8, "blanco")] },
    { texto: "Al abatir el plano vertical, el plano queda representado por **dos rectas que parten de $N$**: $\\alpha_1$ por debajo de la L.T. y $\\alpha_2$ por encima.", items: trazasDibujo(PL, AL1, CO2) },
    { texto: "$\\alpha_1$ es una recta del plano horizontal: su proyección vertical está en la L.T. Y $\\alpha_2$ es una recta del plano vertical: su proyección horizontal está en la L.T. Por eso cada traza se dibuja con una sola línea.", dura: 1, items: [seg(o(N(PL)), o([PL.n + PL.a * AL1, 0, 0]), RES, false, 5)] },
  ],
});

const definir = (): Diagrama => {
  const c: Pt = [400, 150];
  const q = (x: number, y: number): Pt => [c[0] + x, c[1] + y];
  const hoja = (pts: Pt[]): Item => poli(pts, C_E, 0.12);
  const marco = [q(-150, 70), q(60, 70), q(150, -70), q(-60, -70)];
  return {
    label: "Formas de definir un plano",
    pasos: [
      { texto: "Un plano queda definido por **tres puntos no alineados**.", dura: 1, items: [hoja(marco), pt(q(-70, 30), "A", C_E, -14, -8), pt(q(10, -40), "B", C_E, 12, -10), pt(q(70, 30), "C", C_E, 14, -6)] },
      { texto: "Por **dos rectas que se cortan**.", dura: 1, items: [hoja(marco), seg(q(-100, 40), q(90, -30), C_E, false, 3.4), seg(q(-70, -40), q(70, 50), C_E, false, 3.4), pt(q(-11.6, 7.5), "P", C_E, 0, -14)] },
      { texto: "Por **dos rectas paralelas**.", dura: 1, items: [hoja(marco), seg(q(-110, 30), q(60, -40), C_E, false, 3.4), seg(q(-60, 55), q(110, -15), C_E, false, 3.4)] },
      { texto: "Por **un punto y una recta** que no se pertenecen.", dura: 1, items: [hoja(marco), seg(q(-110, 30), q(60, -40), C_E, false, 3.4), pt(q(40, 30), "P", C_E, 14, -6)] },
      { texto: "En diédrico el plano se define, en general, por **dos rectas que se cortan: sus trazas**. Si viene dado de otra forma, se hallan sus trazas, que son el lugar geométrico de las trazas de todas las rectas del plano.", items: [
        seg(q(-170, 0), q(170, 0), "blanco", false, 2.6), seg(q(-170, 8), q(-150, 8), "blanco", false, 3.4), seg(q(150, 8), q(170, 8), "blanco", false, 3.4),
        pt(q(-110, 0), "N", "blanco", -12, 22), seg(q(-110, 0), q(90, 110), C_H, false, 3.4), seg(q(-110, 0), q(40, -120), C_V, false, 3.4), txt(q(108, 118), "α₁", C_H, 18), txt(q(58, -120), "α₂", C_V, 18),
      ] },
    ],
  };
};

const proyectanteH = (): Diagrama => {
  const n: P3 = [55, 0, 0], T: P3 = [205, 125, 0];
  const up = (p: P3, c: number): P3 => [p[0], p[1], c];
  const P = up(mix(n, T, 0.55), 95);
  return {
    label: "Plano proyectante horizontal: perpendicular al plano horizontal",
    pasos: [
      { texto: "Un **plano proyectante horizontal** es perpendicular al plano horizontal: es como una pared levantada sobre su traza $\\alpha_1$.", items: [...escena(), poli([S(n), S(T), S(up(T, 150)), S(up(n, 150))], C_E, 0.14), sE(n, T, C_H, false, 3.4), rot(S(T), "α₁", C_H, 14, 12)] },
      { texto: "Su traza vertical $\\alpha_2$ es **perpendicular a la L.T.**; la horizontal $\\alpha_1$ puede tener cualquier dirección.", items: [sE(n, up(n, 150), C_V, false, 3.4), rot(S(up(n, 150)), "α₂", C_V, -16, 10), sH(n, T, false, 3.4), sV(n, up(n, 150), false, 3.4), rot(h(T), "α₁", C_H, 16, 8), rot(v(up(n, 150)), "α₂", C_V, 16, 8), pt(o(n), "N", "blanco", -12, 22), recto(o(n), v(up(n, 150)), o(T))] },
      { texto: "Todo lo que contiene el plano se proyecta horizontalmente **sobre su traza** $\\alpha_1$: de ahí su nombre. Un punto $P$ del plano tiene $P'$ en $\\alpha_1$, esté a la altura que esté.", items: [pE(P, "P", 12, -8), ...proyH(P, "P′", -14, 18), refD(P), pH(P, "P′", -14, 18), pV(P, "P″", 14, -6)] },
    ],
  };
};

const proyectanteV = (): Diagrama => {
  const n: P3 = [40, 0, 0], T: P3 = [235, 0, 110];
  const fw = (p: P3, a: number): P3 => [p[0], a, p[2]];
  const Q = fw(mix(n, T, 0.55), 80);
  return {
    label: "Plano proyectante vertical: perpendicular al plano vertical",
    pasos: [
      { texto: "Un **plano proyectante vertical** es perpendicular al plano vertical: sale de su traza $\\beta_2$ hacia delante, como una rampa.", items: [...escena(), poli([S(n), S(T), S(fw(T, 130)), S(fw(n, 130))], C_E, 0.14), sE(n, T, C_V, false, 3.4), rot(S(T), "β₂", C_V, 14, -6)] },
      { texto: "Su traza horizontal $\\beta_1$ es **perpendicular a la L.T.**; la vertical $\\beta_2$ puede tener cualquier dirección, y forma con la L.T. el mismo ángulo que el plano con el horizontal.", items: [sE(n, fw(n, 130), C_H, false, 3.4), rot(S(fw(n, 130)), "β₁", C_H, 26, 12), sV(n, T, false, 3.4), sH(n, fw(n, 130), false, 3.4), rot(v(T), "β₂", C_V, 16, 0), rot(h(fw(n, 130)), "β₁", C_H, 16, 0), pt(o(n), "N", "blanco", -12, -10), recto(o(n), h(fw(n, 130)), o(T))] },
      { texto: "Todo lo que contiene se proyecta verticalmente **sobre su traza** $\\beta_2$. Un punto $Q$ del plano tiene $Q''$ en $\\beta_2$. Los proyectantes son los planos más usados en las construcciones auxiliares.", items: [pE(Q, "Q", -12, -8), ...proyV(Q, "Q″", 14, -8), refD(Q), pV(Q, "Q″", -14, -8), pH(Q, "Q′", 14, 16)] },
    ],
  };
};

const planosParalelos = (): Diagrama => {
  const P: P3 = [150, 75, 95], Qp: P3 = [150, 85, 95], R: P3 = [140, 80, 90];
  return {
    label: "Planos paralelos a los de proyección y plano de perfil",
    pasos: [
      { texto: "El **plano horizontal** $\\omega$ es paralelo al PH. Solo corta al plano vertical: tiene una única traza, la vertical $\\omega_2$, **paralela a la L.T.**", dura: 2, items: [
        ...escena(), poli([S([0, 0, 95]), S([260, 0, 95]), S([260, 140, 95]), S([0, 140, 95])], C_E, 0.14), sE([0, 0, 95], [260, 0, 95], C_V, false, 3.4), rot(S([260, 0, 95]), "ω₂", C_V, 18, 4),
        sV([-10, 0, 95], [270, 0, 95], false, 3.4), rot(v([270, 0, 95]), "ω₂", C_V, 18, 4),
      ] },
      { texto: "Todo lo que contiene se proyecta verticalmente sobre $\\omega_2$, y en proyección horizontal se ve en **verdadera magnitud**.", dura: 1, items: [pE(P, "P"), ...proyV(P, "P″", 0, -12), ...pD(P, "P")] },
      { texto: "El **plano frontal** $\\alpha$ es paralelo al PV. Solo corta al plano horizontal: su única traza es la horizontal $\\alpha_1$, **paralela a la L.T.**", dura: 2, items: [
        ...escena(), poli([S([0, 85, 0]), S([260, 85, 0]), S([260, 85, 150]), S([0, 85, 150])], C_E, 0.14), sE([0, 85, 0], [260, 85, 0], C_H, false, 3.4), rot(S([260, 85, 0]), "α₁", C_H, 18, 6),
        sH([-10, 85, 0], [270, 85, 0], false, 3.4), rot(h([270, 85, 0]), "α₁", C_H, 18, 4),
      ] },
      { texto: "Todo lo que contiene se proyecta horizontalmente sobre $\\alpha_1$, y en proyección vertical se ve en **verdadera magnitud**.", dura: 1, items: [pE(Qp, "Q"), ...proyH(Qp, "Q′", 0, 22), ...pD(Qp, "Q")] },
      { texto: "El **plano de perfil** $\\beta$ es perpendicular a los dos planos de proyección: es doblemente proyectante. Sus dos trazas, $\\beta_1$ y $\\beta_2$, están en una misma perpendicular a la L.T., y sobre ella caen las dos proyecciones de todo lo que contiene.", items: [
        ...escena(), perfilEspacio(140, 135, 160, C_E, 0.14), sE([140, 0, 0], [140, 135, 0], C_H, false, 3.4), sE([140, 0, 0], [140, 0, 160], C_V, false, 3.4), rot(S([140, 135, 0]), "β₁", C_H, -16, 8), rot(S([140, 0, 160]), "β₂", C_V, 16, 8),
        sV([140, 0, 0], [140, 0, 150], false, 3.4), sH([140, 0, 0], [140, 135, 0], false, 3.4), rot(v([140, 0, 150]), "β₂", C_V, 16, 8), rot(h([140, 135, 0]), "β₁", C_H, 16, -2),
        pE(R, "P", 12, -8), pV(R, "P″", -16, 4), pH(R, "P′", -16, 6),
      ] },
    ],
  };
};

/* Recta r del plano α: de su traza vertical V (sobre α₂) a su traza horizontal H (sobre α₁). */
const PV1 = t2(PL, 105);
const PH1 = t1(PL, 95);

const rectaPlano = (): Diagrama => ({
  label: "Recta contenida en un plano: sus trazas están sobre las trazas del plano",
  pasos: [
    { texto: "El plano $\\alpha$, con sus trazas $\\alpha_1$ y $\\alpha_2$, en el espacio y en el dibujo.", items: [...escena(), ...planoAlfa()] },
    { texto: "Una recta $r$ contenida en el plano solo puede salir de él por sus bordes: corta al plano vertical en un punto de $\\alpha_2$ y al horizontal en un punto de $\\alpha_1$.", items: [sE(PV1, PH1, C_E, false, 3.6), rot(S(mix(PV1, PH1, 0.5)), "r", C_E, 14, -6), pE(PV1, "V″", 16, -6, C_V), pE(PH1, "H′", 4, 22, C_H)] },
    { texto: "**Una recta está situada en un plano cuando sus trazas están sobre las trazas del mismo nombre del plano**: $V''$ en $\\alpha_2$ y $H'$ en $\\alpha_1$.", items: [pV(PV1, "V″", -16, -6), pH(PH1, "H′", -16, 16)] },
    { texto: "Las otras proyecciones de las trazas, $V'$ y $H''$, están en la L.T. Uniendo se obtiene $r'$ (de $V'$ a $H'$) y $r''$ (de $V''$ a $H''$).", items: [refD(PV1), refD(PH1), pH(PV1, "V′", -14, -10), pV(PH1, "H″", 14, 18), sH(enLT(PV1), PH1), sV(PV1, enLT(PH1)), rot(h(mix(enLT(PV1), PH1, 0.6)), "r′", C_H, 16, -4), rot(v(mix(PV1, enLT(PH1), 0.4)), "r″", C_V, 16, -4)] },
    { texto: "Así se resuelve el problema directo: conocida $r'$ de una recta del plano, se sube desde $V'$ hasta $\\alpha_2$ para tener $V''$, se refiere $H'$ a la L.T. en $H''$, y $V''H''$ es $r''$.", dura: 1, items: [seg(o(PV1), v(PV1), RES, false, 5), seg(h(PH1), o(PH1), RES, false, 5)] },
  ],
});

const puntoPlano = (): Diagrama => {
  const A = mix(PV1, PH1, 0.45);
  return {
    label: "Punto contenido en un plano: se sitúa sobre una recta del plano",
    pasos: [
      { texto: "Un punto no se puede situar en un plano de forma arbitraria. Primero hay que tener **una recta del plano**, como $r$.", items: [...escena(), ...planoAlfa(), sE(PV1, PH1, C_E, false, 3.4), rot(S(mix(PV1, PH1, 0.8)), "r", C_E, 14, -6), sH(enLT(PV1), PH1), sV(PV1, enLT(PH1)), rot(h(mix(enLT(PV1), PH1, 0.75)), "r′", C_H, 16, -4), rot(v(mix(PV1, enLT(PH1), 0.2)), "r″", C_V, 16, -4)] },
      { texto: "Un punto $A$ de esa recta está en el plano.", items: [pE(A, "A", 14, -8, "rojo")] },
      { texto: "**Un punto está en un plano cuando sus proyecciones están sobre las proyecciones del mismo nombre de una recta del plano**: $A'$ en $r'$ y $A''$ en $r''$, en la misma perpendicular a la L.T.", items: [refD(A), pH(A, "A′", -14, 18, "rojo"), pV(A, "A″", 14, -8, "rojo")] },
      { texto: "La recta auxiliar puede ser una cualquiera o, mejor por su sencillez, una **horizontal** o una **frontal** del plano.", dura: 1, items: [seg(h(enLT(PV1)), h(PH1), RES, false, 5), seg(v(PV1), v(enLT(PH1)), RES, false, 5)] },
    ],
  };
};

const horizontalPlano = (): Diagrama => {
  const c = 85;
  const V = t2(PL, c), B = enPlano(PL, 80, c);
  return {
    label: "Recta horizontal de un plano",
    pasos: [
      { texto: "Una **horizontal del plano** es una recta del plano paralela al plano horizontal: todos sus puntos tienen la misma cota $c$. Sale del plano vertical por un punto $V$ de $\\alpha_2$.", items: [...escena(), ...planoAlfa(), sE(V, B, C_E, false, 3.6), rot(S(B), "h", C_E, 4, -12), pE(V, "V″", 16, -6, C_V)] },
      { texto: "Es **paralela a la traza horizontal** $\\alpha_1$: las dos están en el plano $\\alpha$ y en planos horizontales, así que no pueden cortarse.", dura: 1, items: [seg(S(V), S(B), RES, false, 6), seg(S(N(PL)), S(t1(PL, AL1)), RES, false, 6)] },
      { texto: "En el dibujo, $h''$ es **paralela a la L.T.** a la altura de la cota $c$, y corta a $\\alpha_2$ en $V''$.", items: [sV([V[0] - 30, 0, c], [B[0] + 10, 0, c]), rot(v([B[0] + 10, 0, c]), "h″", C_V, 16, 4), pV(V, "V″", -8, -14), seg(v([20, 0, c]), v([20, 0, 0]), AUX, false, 1.4), rot(v([20, 0, c / 2]), "c", AUX, -10, 6, 16)] },
      { texto: "$V''$ se refiere a la L.T. en $V'$, y por $V'$ se traza $h'$ **paralela a $\\alpha_1$**. Su traza horizontal es impropia: no corta al PH.", items: [refD(V), pH(V, "V′", -14, -10), sH(enLT(V), B), rot(h(B), "h′", C_H, 16, 4)] },
    ],
  };
};

const frontalPlano = (): Diagrama => {
  const d = 60;
  const H = t1(PL, d), B = enPlano(PL, d, 115);
  return {
    label: "Recta frontal de un plano",
    pasos: [
      { texto: "Una **frontal del plano** es una recta del plano paralela al plano vertical: todos sus puntos tienen el mismo alejamiento $a$. Sale del plano horizontal por un punto $H$ de $\\alpha_1$.", items: [...escena(), ...planoAlfa(), sE(H, B, C_E, false, 3.6), rot(S(B), "f", C_E, 12, 0), pE(H, "H′", -4, 22, C_H)] },
      { texto: "Es **paralela a la traza vertical** $\\alpha_2$, por la misma razón que la horizontal lo es a $\\alpha_1$.", dura: 1, items: [seg(S(H), S(B), RES, false, 6), seg(S(N(PL)), S(t2(PL, CO2)), RES, false, 6)] },
      { texto: "En el dibujo, $f'$ es **paralela a la L.T.** a la distancia del alejamiento $a$, y corta a $\\alpha_1$ en $H'$.", items: [sH([H[0] - 40, d, 0], [B[0] + 10, d, 0]), rot(h([B[0] + 10, d, 0]), "f′", C_H, 16, 4), pH(H, "H′", 6, 22), seg(h([20, d, 0]), h([20, 0, 0]), AUX, false, 1.4), rot(h([20, d / 2, 0]), "a", AUX, -10, 6, 16)] },
      { texto: "$H'$ se refiere a la L.T. en $H''$, y por $H''$ se traza $f''$ **paralela a $\\alpha_2$**.", items: [refD(H), pV(H, "H″", 12, 20), sV(enLT(H), B), rot(v(B), "f″", C_V, 16, 4)] },
    ],
  };
};

const lmp = (): Diagrama => {
  /* Plano algo más tendido que α, para que la l.m.p. quede larga y se lea bien. */
  const PM: Plano = { n: 30, a: 1.5, b: 0.95 };
  const aH = 60;
  const H = t1(PM, aH);
  const xV = H[0] + aH / PM.a;
  const V: P3 = [xV, 0, (xV - PM.n) / PM.b];
  return {
    label: "Línea de máxima pendiente de un plano",
    pasos: [
      { texto: "La **línea de máxima pendiente** (l.m.p.) es la recta del plano que forma el **mayor ángulo con el plano horizontal**: el camino que seguiría una gota de agua sobre él.", items: [...escena(), ...planoAlfa(PM), sE(V, H, C_E, false, 3.6), rot(S(mix(V, H, 0.45)), "r", C_E, 14, -4), pE(V, "V″", 16, -6, C_V), pE(H, "H′", 4, 22, C_H)] },
      { texto: "En el espacio es perpendicular a la traza horizontal $\\alpha_1$, y ese ángulo recto se conserva en la proyección horizontal: $r'$ es **perpendicular a $\\alpha_1$**.", items: [sE(enLT(V), H, C_H), sE(V, enLT(V), AUX, true, 1.6), recto(S(H), S(enLT(V)), S(N(PM)), C_H, 11)] },
      { texto: "En el dibujo se reconoce por eso: $r'$ perpendicular a $\\alpha_1$, que se indica con el signo de perpendicularidad o con dos tracitos sobre $r'$. La proyección $r''$ sale como en cualquier recta del plano.", items: [sH(enLT(V), H), sV(V, enLT(H)), refD(V), refD(H), pH(H, "H′", -4, 24), pV(V, "V″", -16, -6), pH(V, "V′", 14, -10), pV(H, "H″", -4, 22), recto(h(H), h(enLT(V)), o(N(PM)), C_H, 11), rot(h(mix(enLT(V), H, 0.45)), "r′", C_H, 18, 6), rot(v(mix(V, enLT(H), 0.5)), "r″", C_V, -18, 0)] },
      { texto: "Una sola l.m.p. **define el plano**: $\\alpha_1$ es la perpendicular a $r'$ por $H'$; donde corta a la L.T. está $N$, y $N$ unido con $V''$ da $\\alpha_2$.", dura: 1, items: [seg(h(t1(PM, AL1)), o(N(PM)), RES, false, 5.5), seg(o(N(PM)), v(t2(PM, CO2)), RES, false, 5.5)] },
    ],
  };
};

const lmi = (): Diagrama => {
  const cV = 62;
  const V = t2(PL, cV);
  const xH = V[0] + cV / PL.b;
  const H: P3 = [xH, (xH - PL.n) / PL.a, 0];
  return {
    label: "Línea de máxima inclinación de un plano",
    pasos: [
      { texto: "La **línea de máxima inclinación** (l.m.i.) es la recta del plano que forma el **mayor ángulo con el plano vertical**.", items: [...escena(), ...planoAlfa(), sE(V, H, C_E, false, 3.6), rot(S(mix(V, H, 0.5)), "i", C_E, 14, -6), pE(V, "V″", -16, -6, C_V), pE(H, "H′", 4, 22, C_H)] },
      { texto: "Es el caso simétrico de la l.m.p.: en el espacio es perpendicular a la traza vertical $\\alpha_2$, y su proyección vertical $i''$ es **perpendicular a $\\alpha_2$**.", items: [sE(V, enLT(H), C_V), sE(H, enLT(H), AUX, true, 1.6), recto(S(V), S(enLT(H)), S(N(PL)), C_V, 11)] },
      { texto: "En el dibujo: $i''$ perpendicular a $\\alpha_2$, marcada con el signo de perpendicularidad; $i'$ une $V'$ con $H'$.", items: [sV(V, enLT(H)), sH(enLT(V), H), refD(V), refD(H), pV(V, "V″", -16, -6), pH(H, "H′", 6, 22), pH(V, "V′", -14, 20), pV(H, "H″", 14, -8), recto(v(V), v(enLT(H)), o(N(PL)), C_V, 11), rot(v(mix(V, enLT(H), 0.5)), "i″", C_V, 16, -6), rot(h(mix(enLT(V), H, 0.5)), "i′", C_H, 16, -4)] },
      { texto: "También define el plano: $\\alpha_2$ es la perpendicular a $i''$ por $V''$; corta a la L.T. en $N$, y $N$ unido con $H'$ da $\\alpha_1$.", dura: 1, items: [seg(v(t2(PL, CO2)), o(N(PL)), RES, false, 5.5), seg(o(N(PL)), h(t1(PL, AL1)), RES, false, 5.5)] },
    ],
  };
};

const bisectores = (): Diagrama => {
  const A: Plano = { n: 40, a: 1.15, b: 1.15 };
  const B: Plano = { n: 165, a: 0.5, b: -0.5 };
  const al = 125, co = 125;
  const cN = o(N(A));
  const ang = (Math.atan(1 / 1.15) * 180) / Math.PI;
  return {
    label: "Planos perpendiculares a los bisectores",
    pasos: [
      { texto: "Un plano **perpendicular al primer bisector** está igual de inclinado respecto de los dos planos de proyección: sus trazas forman **el mismo ángulo con la L.T.**", dura: 2, base: escena(), items: [planoEspacio(A, al, co), ...trazasEspacio(A, al, co), ...trazasDibujo(A, al, co)] },
      { texto: "En el dibujo, $\alpha_1$ y $\alpha_2$ son **simétricas** respecto de la L.T.", dura: 1, items: [arc(cN, 52, 0, ang, RES, 2.6), arc(cN, 52, -ang, 0, RES, 2.6), rot(cN, "=", RES, 66, -16, 18), rot(cN, "=", RES, 66, 28, 18)] },
      { texto: "Un plano **perpendicular al segundo bisector** tiene las trazas inclinadas hacia lados contrarios: en el espacio, $\omega_2$ sube hacia la izquierda y $\omega_1$ avanza hacia la derecha.", items: [planoEspacio(B, al, co), ...trazasEspacio(B, al, co, "ω"), pE(N(B), "N", 14, -10, "blanco")] },
      { texto: "Al abatir el plano vertical, sus dos trazas quedan **en línea recta**.", items: trazasDibujo(B, al, co, "ω") },
    ],
  };
};

const paralelosLT = (): Diagrama => {
  const co = 115, al = 105;
  const r0: P3 = [25, al / 2, co / 2], r1: P3 = [235, al / 2, co / 2];
  return {
    label: "Plano paralelo a la línea de tierra",
    pasos: [
      { texto: "Un plano **paralelo a la L.T.** corta al plano vertical y al horizontal según dos rectas paralelas a ella: es como un tejado apoyado en la pared y en el suelo.", items: [...escena(), poli([S([0, 0, co]), S([260, 0, co]), S([260, al, 0]), S([0, al, 0])], C_E, 0.14), sE([0, 0, co], [260, 0, co], C_V, false, 3.4), sE([0, al, 0], [260, al, 0], C_H, false, 3.4), rot(S([260, 0, co]), "α₂", C_V, 18, 4), rot(S([260, al, 0]), "α₁", C_H, 18, 6)] },
      { texto: "En el dibujo tiene **sus dos trazas paralelas a la L.T.** No hay punto $N$: las trazas no se cortan.", items: [sV([-10, 0, co], [270, 0, co], false, 3.4), sH([-10, al, 0], [270, al, 0], false, 3.4), rot(v([270, 0, co]), "α₂", C_V, 18, 4), rot(h([270, al, 0]), "α₁", C_H, 18, 4)] },
      { texto: "Las rectas horizontales y frontales de este plano coinciden: son **paralelas a la L.T.**, como $r$. Para situar en él otros elementos se recurre a la vista de perfil, donde el plano se ve como una recta.", items: [sE(r0, r1, C_E, false, 3.4), rot(S(r1), "r", C_E, 14, 2), sH(r0, r1, false, 2.6), sV(r0, r1, false, 2.6), rot(h(r1), "r′", C_H, 16, 4), rot(v(r1), "r″", C_V, 16, 4)] },
    ],
  };
};

const figuraPlana = (): Diagrama => {
  const P = [enPlano(PL, 30, 120), enPlano(PL, 75, 60), enPlano(PL, 15, 40)] as [P3, P3, P3];
  const nombres = ["1", "2", "3"];
  const hor = (p: P3): { V: P3; items: Item[] } => {
    const V = t2(PL, p[2]);
    return { V, items: [seg(v(V), v(p), AUX, false, 1.6), refD(V), seg(h(enLT(V)), h(p), AUX, false, 1.6)] };
  };
  const h1 = hor(P[0]);
  return {
    label: "Proyecciones de una figura plana contenida en un plano",
    pasos: [
      { texto: "Problema general: dado un plano y una figura contenida en él de la que se conoce **una proyección**, hallar la otra. Aquí se conocen el plano $\\alpha$ y la proyección vertical $1''2''3''$ de un triángulo.", items: [
        ...escena(), ...planoAlfa(), poli(P.map(S), "rojo", 0.3), poli(P.map(v), C_V, 0.2), ...P.map((p, i) => pV(p, `${nombres[i]}″`, i === 2 ? -14 : 14, i === 1 ? 16 : -8)),
      ] },
      { texto: "Cada vértice es un punto del plano, y un punto del plano se sitúa con una recta. Por $1''$ se traza una **horizontal del plano**: $h''$ paralela a la L.T. hasta cortar a $\\alpha_2$ en $V''$.", dura: 2, items: [seg(v(h1.V), v([P[0][0] + 20, 0, P[0][2]]), RES, false, 3.4), pV(h1.V, "V″", -16, -6, RES), rot(v([P[0][0] + 20, 0, P[0][2]]), "h″", RES, 16, 4)] },
      { texto: "$V''$ se refiere a la L.T. en $V'$ y por $V'$ se traza $h'$ **paralela a $\\alpha_1$**. La línea de referencia de $1''$ corta a $h'$ en $1'$.", dura: 1, items: [seg(v(h1.V), o(h1.V), RES, true, 2), pt(o(h1.V), "V′", RES, -14, 20), seg(o(h1.V), h([P[0][0] + 25, P[0][1] + 25 / PL.a, 0]), RES, false, 3.4), rot(h([P[0][0] + 25, P[0][1] + 25 / PL.a, 0]), "h′", RES, 16, 6), refD(P[0])] },
      { texto: "El vértice $1'$ ya está situado.", items: [pH(P[0], "1′", 14, -6)] },
      { texto: "Se repite con los otros dos vértices, cada uno con su horizontal (o con una frontal, que sirve igual).", items: [...hor(P[1]).items, ...hor(P[2]).items, refD(P[1]), refD(P[2]), pH(P[1], "2′", 14, 14), pH(P[2], "3′", -14, 14)] },
      { texto: "Uniendo $1'$, $2'$ y $3'$ queda la **proyección horizontal** de la figura. Ninguna de las dos proyecciones tiene la forma real del triángulo: el plano es oblicuo a los dos de proyección.", items: [poli(P.map(h), C_H, 0.22)] },
    ],
  };
};

export const DIAGRAMAS_DIEDRICO_ESPACIO: Record<string, Diagrama> = {
  "d12-fundamentos": fundamentos(), "d12-diedros": diedros(), "d12-abatimiento": abatimiento(), "d12-perfil-punto": perfilPunto(), "d12-alfabeto": alfabeto(),
  "d12-cota-alej": cotaAlej(), "d12-punto-diedros": puntoDiedros(), "d12-especiales": especiales(),
  "d12-recta": recta(), "d12-trazas": trazas(), "d12-vistas": vistas(), "d12-cortan": cortan(),
  "d12-perpendiculares": perpendiculares(), "d12-paralela-lt": paralelaLT(), "d12-horizontal": horizontal(), "d12-frontal": frontal(), "d12-oblicuas": oblicuas(),
  "d12-perfil": perfil(), "d12-perfil-bisectores": perfilBisectores(), "d12-tercera": tercera(), "d12-p12": p12(), "d12-p13": p13(), "d12-p14": p14(),
  "d12-plano-trazas": planoTrazas(), "d12-definir": definir(), "d12-proyectante-h": proyectanteH(), "d12-proyectante-v": proyectanteV(), "d12-planos-paralelos": planosParalelos(),
  "d12-recta-plano": rectaPlano(), "d12-punto-plano": puntoPlano(), "d12-horizontal-plano": horizontalPlano(), "d12-frontal-plano": frontalPlano(), "d12-lmp": lmp(), "d12-lmi": lmi(),
  "d12-bisectores": bisectores(), "d12-paralelos-lt": paralelosLT(), "d12-figura-plana": figuraPlana(),
};
