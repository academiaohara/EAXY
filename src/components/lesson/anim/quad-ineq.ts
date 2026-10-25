/** Inecuaciones de segundo grado `ax² + bx + c ▢ 0`: raíces y conjunto solución. */

import { fmtEs } from "@/components/lesson/anim/arith";

export type Rel = "<" | "<=" | ">" | ">=";
export const RELS: Rel[] = ["<", "<=", ">", ">="];
export const REL_TEXT: Record<Rel, string> = { "<": "<", "<=": "≤", ">": ">", ">=": "≥" };

export type Seg = { lo: number; hi: number; loIncl: boolean; hiIncl: boolean };

export type QuadSolution = {
  disc: number;
  roots: number[];
  segs: Seg[];
  /** Conjunto solución como unión de intervalos («∅» si está vacío). */
  text: string;
};

const num = (v: number) => (v === Infinity ? "+∞" : v === -Infinity ? "−∞" : fmtEs(v, 3));

function segText(s: Seg): string {
  if (s.lo === s.hi) return `{${num(s.lo)}}`;
  return `${s.loIncl ? "[" : "("}${num(s.lo)}, ${num(s.hi)}${s.hiIncl ? "]" : ")"}`;
}

export function solveQuadIneq(a: number, b: number, c: number, rel: Rel): QuadSolution {
  const disc = b * b - 4 * a * c;
  const want = rel === ">" || rel === ">=" ? 1 : -1; // signo que se busca
  const incl = rel === "<=" || rel === ">=";
  const sa = a > 0 ? 1 : -1;
  const all: Seg = { lo: -Infinity, hi: Infinity, loIncl: false, hiIncl: false };
  let roots: number[] = [];
  let segs: Seg[] = [];
  if (disc > 0) {
    const sq = Math.sqrt(disc);
    const r1 = Math.min((-b - sq) / (2 * a), (-b + sq) / (2 * a));
    const r2 = Math.max((-b - sq) / (2 * a), (-b + sq) / (2 * a));
    roots = [r1, r2];
    // El signo de la parábola es el de a fuera de las raíces y el contrario entre ellas.
    if (want === sa) {
      segs = [
        { lo: -Infinity, hi: r1, loIncl: false, hiIncl: incl },
        { lo: r2, hi: Infinity, loIncl: incl, hiIncl: false },
      ];
    } else {
      segs = [{ lo: r1, hi: r2, loIncl: incl, hiIncl: incl }];
    }
  } else if (disc === 0) {
    const r = -b / (2 * a);
    roots = [r];
    if (want === sa) {
      segs = incl
        ? [all]
        : [
            { lo: -Infinity, hi: r, loIncl: false, hiIncl: false },
            { lo: r, hi: Infinity, loIncl: false, hiIncl: false },
          ];
    } else {
      segs = incl ? [{ lo: r, hi: r, loIncl: true, hiIncl: true }] : [];
    }
  } else {
    segs = want === sa ? [all] : [];
  }
  const text = segs.length === 0 ? "∅ (sin solución)" : segs.length === 1 && segs[0] === all ? "ℝ (todos los números)" : segs.map(segText).join(" ∪ ");
  return { disc, roots, segs, text };
}
