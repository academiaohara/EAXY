import type { Construccion, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 11 (sistemas de representación): los tres tipos de proyección sobre un plano, vistos de perfil
 * (el plano de proyección es la recta π). Como las demás, una sola lista de operaciones da la animación y la práctica.
 */

export const ETIQUETAS_SISTEMAS: Record<string, string> = { pi: "π", dd1: "", dd2: "d" };

const PLANO_Y = 300;

function base(): Record<string, P> {
  return { _p1: [40, PLANO_Y], pi: [570, PLANO_Y] };
}

/** Proyección paralela ortogonal (Fig. 1): los rayos son perpendiculares al plano. */
function ortogonal(): Construccion {
  const puntos: [string, P][] = [["A", [130, 170]], ["B", [270, 130]], ["C", [420, 210]]];
  const pts: Record<string, P> = base();
  const ops: Op[] = [];
  for (const [n, p] of puntos) {
    pts[n] = p;
    pts[`${n}p`] = [p[0], PLANO_Y];
    ops.push({ k: "perp", recta: ["_p1", "pi"], punto: n, traza: [n, `${n}p`] }, { k: "marca", p: `${n}p` });
  }
  return {
    titulo: "Proyección paralela ortogonal",
    intro: "En la proyección **paralela** o **cilíndrica** los rayos proyectantes son paralelos. Si además son **perpendiculares** al plano de proyección $\\pi$, la proyección es **ortogonal**: la proyección $A'$ de un punto $A$ es el pie de la perpendicular desde $A$ a $\\pi$.",
    pts,
    dados: ["pi", "A", "B", "C"],
    datos: [],
    base: [["_p1", "pi"]],
    ops,
  };
}

/** Proyección paralela oblicua (Fig. 2): los rayos son paralelos a una dirección dada, no perpendicular al plano. */
function oblicua(): Construccion {
  const dir: P = [0.5, Math.sqrt(3) / 2];
  const puntos: [string, P][] = [["A", [120, 170]], ["B", [250, 120]], ["C", [360, 200]]];
  const pts: Record<string, P> = { ...base(), dd1: [30, 50], dd2: [30 + dir[0] * 80, 50 + dir[1] * 80] };
  for (const [n, p] of puntos) {
    const t = (PLANO_Y - p[1]) / dir[1];
    pts[n] = p;
    pts[`${n}p`] = [p[0] + dir[0] * t, PLANO_Y];
  }
  return {
    titulo: "Proyección paralela oblicua",
    intro: "Si los rayos proyectantes son **paralelos** a una dirección $d$ que **no es perpendicular** al plano $\\pi$, la proyección es **oblicua**. La proyección $A'$ de cada punto está donde la paralela a $d$ por $A$ corta al plano.",
    pts,
    dados: ["pi", "dd1", "dd2", "A", "B", "C"],
    datos: [],
    base: [["_p1", "pi"], ["dd1", "dd2"]],
    ops: ["A", "B", "C"].map((n) => ({ k: "paralelas", recta: ["dd1", "dd2"], marcas: [n], cortes: [`${n}p`] }) as Op),
  };
}

/** Proyección central o cónica (Fig. 3): los rayos parten de un punto propio V (el ojo del observador). */
function conica(): Construccion {
  const V: P = [300, 65];
  const puntos: [string, P][] = [["A", [250, 165]], ["B", [300, 120]], ["C", [380, 165]]];
  const pts: Record<string, P> = { ...base(), V };
  const ops: Op[] = [];
  for (const [n, p] of puntos) {
    const t = (PLANO_Y - V[1]) / (p[1] - V[1]);
    pts[n] = p;
    pts[`${n}p`] = [V[0] + (p[0] - V[0]) * t, PLANO_Y];
    ops.push({ k: "recta", a: "V", b: n }, { k: "marca", p: `${n}p` });
  }
  return {
    titulo: "Proyección central o cónica",
    intro: "En la proyección **central** o **cónica** los rayos proyectantes parten de un punto propio $V$, el **punto de vista** u ojo del observador. La proyección $A'$ de un punto $A$ es el corte con el plano $\\pi$ de la recta $VA$.",
    pts,
    dados: ["pi", "V", "A", "B", "C"],
    datos: [],
    base: [["_p1", "pi"]],
    ext: 200,
    ops,
  };
}

export const CONSTRUCCIONES_SISTEMAS = {
  "proyeccion-ortogonal": ortogonal(),
  "proyeccion-oblicua": oblicua(),
  "proyeccion-conica": conica(),
} satisfies Record<string, Construccion>;
