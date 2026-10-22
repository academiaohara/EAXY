import { frac, fracTex, type Frac } from "@/components/lesson/anim/eq";

/** Probabilidad con fracciones exactas: urnas, árboles y dos dados. */

export const fmul = (a: Frac, b: Frac): Frac => frac(a.n * b.n, a.d * b.d);
export const fadd = (a: Frac, b: Frac): Frac => frac(a.n * b.d + b.n * a.d, a.d * b.d);
export const fsub = (a: Frac, b: Frac): Frac => frac(a.n * b.d - b.n * a.d, a.d * b.d);
export const ONE = frac(1, 1);
export const complement = (a: Frac): Frac => fsub(ONE, a);
export const pTex = (a: Frac): string => fracTex(a);

export type Leaf = { first: "V" | "R"; second: "V" | "R"; p1: Frac; p2: Frac; p: Frac };

/** Dos extracciones de una urna con `g` bolas verdes y `r` rojas, con o sin reemplazamiento. */
export function urnTree(g: number, r: number, replace: boolean): Leaf[] {
  const n = g + r;
  const out: Leaf[] = [];
  for (const first of ["V", "R"] as const) {
    const c1 = first === "V" ? g : r;
    const p1 = frac(c1, n);
    const gg = replace || first !== "V" ? g : g - 1;
    const rr = replace || first !== "R" ? r : r - 1;
    const m = gg + rr;
    for (const second of ["V", "R"] as const) {
      const c2 = second === "V" ? gg : rr;
      const p2 = m === 0 ? frac(0, 1) : frac(c2, m);
      out.push({ first, second, p1, p2, p: fmul(p1, p2) });
    }
  }
  return out;
}

export const leafP = (leaves: Leaf[], first: "V" | "R", second: "V" | "R"): Frac => leaves.find((l) => l.first === first && l.second === second)!.p;

/** Producto de probabilidades independientes. */
export const product = (ps: number[]): number => ps.reduce((a, b) => a * b, 1);

export type DiceOp = "suma" | "diferencia" | "mayor" | "menor" | "producto";

export const DICE_OPS: Record<DiceOp, (a: number, b: number) => number> = {
  suma: (a, b) => a + b,
  diferencia: (a, b) => Math.abs(a - b),
  mayor: (a, b) => Math.max(a, b),
  menor: (a, b) => Math.min(a, b),
  producto: (a, b) => a * b,
};

/** Distribución de una operación con dos dados correctos: valor → número de casos de 36. */
export function diceDistribution(op: DiceOp): Map<number, number> {
  const m = new Map<number, number>();
  for (let a = 1; a <= 6; a++) {
    for (let b = 1; b <= 6; b++) {
      const v = DICE_OPS[op](a, b);
      m.set(v, (m.get(v) ?? 0) + 1);
    }
  }
  return new Map([...m.entries()].sort((x, y) => x[0] - y[0]));
}

/** Casos favorables (de 36) a `valor > k` (o `<`, `=`). */
export function diceCount(op: DiceOp, cmp: ">" | "<" | "=", k: number): number {
  let c = 0;
  for (const [v, n] of diceDistribution(op)) {
    if ((cmp === ">" && v > k) || (cmp === "<" && v < k) || (cmp === "=" && v === k)) c += n;
  }
  return c;
}
