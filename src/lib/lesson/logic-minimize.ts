/**
 * Utilidades de lógica combinacional para las herramientas del tema 12:
 * formas canónicas, simplificación (Quine-McCluskey) y disposición de mapas de Karnaugh.
 * Convenio del libro: la variable `a` es la de menos peso; el índice de una combinación
 * es `a + 2b + 4c + 8d`.
 */

export const VARS = ["a", "b", "c", "d"] as const;

/** Implicante: `val` son los valores de las variables que quedan; `mask` marca las eliminadas. */
export type Implicant = { val: number; mask: number };

const popcount = (n: number) => n.toString(2).replace(/0/g, "").length;
const keyOf = (i: Implicant) => `${i.val}:${i.mask}`;

/** ¿El implicante cubre la combinación `m`? */
export const covers = (imp: Implicant, m: number) => (m & ~imp.mask) === imp.val;

/** Combinaciones cubiertas por un implicante. */
export const cellsOf = (imp: Implicant, n: number) => Array.from({ length: 2 ** n }, (_, m) => m).filter((m) => covers(imp, m));

/** Implicantes primos de un conjunto de combinaciones (unos + indiferentes). */
export function primeImplicants(terms: number[]): Implicant[] {
  let cur = new Map<string, Implicant>();
  for (const t of terms) {
    cur.set(keyOf({ val: t, mask: 0 }), { val: t, mask: 0 });
  }
  const primes: Implicant[] = [];
  while (cur.size) {
    const list = [...cur.values()];
    const used = new Set<string>();
    const next = new Map<string, Implicant>();
    for (let i = 0; i < list.length; i += 1) {
      for (let j = i + 1; j < list.length; j += 1) {
        const a = list[i]!;
        const b = list[j]!;
        const diff = a.val ^ b.val;
        if (a.mask === b.mask && popcount(diff) === 1) {
          const c: Implicant = { val: a.val & ~diff, mask: a.mask | diff };
          used.add(keyOf(a));
          used.add(keyOf(b));
          next.set(keyOf(c), c);
        }
      }
    }
    for (const imp of list) {
      if (!used.has(keyOf(imp))) {
        primes.push(imp);
      }
    }
    cur = next;
  }
  return primes;
}

/** Cubrimiento mínimo (esenciales y después los que más cubran). `ones` son las combinaciones que hay que cubrir. */
export function minimalCover(ones: number[], dontCare: number[] = []): Implicant[] {
  if (ones.length === 0) {
    return [];
  }
  const primes = primeImplicants([...ones, ...dontCare]);
  const chosen: Implicant[] = [];
  const left = new Set(ones);
  // esenciales
  for (const m of ones) {
    const cov = primes.filter((p) => covers(p, m));
    if (cov.length === 1 && !chosen.includes(cov[0]!)) {
      chosen.push(cov[0]!);
    }
  }
  for (const c of chosen) {
    for (const m of [...left]) {
      if (covers(c, m)) {
        left.delete(m);
      }
    }
  }
  while (left.size) {
    let best: Implicant | null = null;
    let bestScore = -1;
    for (const p of primes) {
      if (chosen.includes(p)) {
        continue;
      }
      const gain = [...left].filter((m) => covers(p, m)).length;
      // a igualdad de ganancia: menos literales y, después, el que elimina la variable de más peso (como en el libro)
      const score = gain * 1000 + popcount(p.mask) * 100 + p.mask;
      if (gain > 0 && score > bestScore) {
        best = p;
        bestScore = score;
      }
    }
    if (!best) {
      break;
    }
    chosen.push(best);
    for (const m of [...left]) {
      if (covers(best, m)) {
        left.delete(m);
      }
    }
  }
  return chosen.sort((x, y) => x.val - y.val || x.mask - y.mask);
}

const bar = (v: string) => `\\bar{${v}}`;

/** Producto (SOP) o suma (POS) de un implicante, de la variable de más peso a la de menos. */
export function termLatex(imp: Implicant, n: number, mode: "sop" | "pos"): string {
  const parts: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    if (imp.mask & (1 << i)) {
      continue;
    }
    const bit = (imp.val >> i) & 1;
    const name = VARS[i]!;
    if (mode === "sop") {
      parts.push(bit ? name : bar(name));
    } else {
      parts.push(bit ? bar(name) : name);
    }
  }
  if (parts.length === 0) {
    return mode === "sop" ? "1" : "0";
  }
  return parts.join(mode === "sop" ? "\\cdot " : " + ");
}

/** Expresión simplificada completa en LaTeX. `out[i]` es 0, 1 o 2 (indiferente). */
export function simplify(out: number[], n: number, mode: "sop" | "pos") {
  const target = mode === "sop" ? 1 : 0;
  const ones = out.map((v, i) => (v === target ? i : -1)).filter((i) => i >= 0);
  const dc = out.map((v, i) => (v === 2 ? i : -1)).filter((i) => i >= 0);
  const imps = minimalCover(ones, dc);
  let tex: string;
  if (mode === "sop") {
    tex = imps.length === 0 ? "0" : imps.map((i) => termLatex(i, n, "sop")).join(" + ");
  } else {
    tex = imps.length === 0 ? "1" : imps.map((i) => (imps.length > 1 ? `(${termLatex(i, n, "pos")})` : termLatex(i, n, "pos"))).join("");
  }
  return { imps, tex, ones };
}

/** Disposición de un mapa de Karnaugh: orden Gray de las columnas y de las filas. */
const GRAY: [number, number][] = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 0],
];

export function karnaughLayout(n: number): { cols: number[]; rows: number[]; index: (c: number, r: number) => number; colLabels: string[]; rowLabels: string[]; colVars: string; rowVars: string } {
  if (n === 2) {
    return { cols: [0, 1], rows: [0, 1], index: (c, r) => c + 2 * r, colLabels: ["0", "1"], rowLabels: ["0", "1"], colVars: "a", rowVars: "b" };
  }
  if (n === 3) {
    return {
      cols: [0, 1, 2, 3],
      rows: [0, 1],
      index: (c, r) => GRAY[c]![0] + 2 * GRAY[c]![1] + 4 * r,
      colLabels: GRAY.map(([a, b]) => `${a}${b}`),
      rowLabels: ["0", "1"],
      colVars: "ab",
      rowVars: "c",
    };
  }
  return {
    cols: [0, 1, 2, 3],
    rows: [0, 1, 2, 3],
    index: (c, r) => GRAY[c]![0] + 2 * GRAY[c]![1] + 4 * GRAY[r]![0] + 8 * GRAY[r]![1],
    colLabels: GRAY.map(([a, b]) => `${a}${b}`),
    rowLabels: GRAY.map(([c, d]) => `${c}${d}`),
    colVars: "ab",
    rowVars: "cd",
  };
}

/** Combinaciones donde la función vale 1 (Σ) o 0 (Π). */
export const minterms = (out: number[]) => out.map((v, i) => (v === 1 ? i : -1)).filter((i) => i >= 0);
export const maxtermIndexes = (out: number[]) => out.map((v, i) => (v === 0 ? i : -1)).filter((i) => i >= 0);

/** Forma canónica de un término (producto de todas las variables o suma de todas). */
export function canonicalTerm(index: number, n: number, kind: "min" | "max"): string {
  const parts: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const bit = (index >> i) & 1;
    const name = VARS[i]!;
    if (kind === "min") {
      parts.push(bit ? name : bar(name));
    } else {
      parts.push(bit ? bar(name) : name);
    }
  }
  return kind === "min" ? parts.join("\\cdot ") : `(${parts.join(" + ")})`;
}

/** Conversión decimal → binario con los pasos de las divisiones sucesivas. */
export function divisionSteps(n: number): { q: number; r: number; dividend: number }[] {
  const steps: { q: number; r: number; dividend: number }[] = [];
  let d = Math.max(0, Math.floor(n));
  if (d === 0) {
    return [{ dividend: 0, q: 0, r: 0 }];
  }
  while (d > 0) {
    steps.push({ dividend: d, q: Math.floor(d / 2), r: d % 2 });
    d = Math.floor(d / 2);
  }
  return steps;
}

/** Parte fraccionaria: multiplicaciones sucesivas por 2 (aproximación a `digits` cifras). */
export function fractionSteps(frac: number, digits: number): { value: number; product: number; bit: number }[] {
  const steps: { value: number; product: number; bit: number }[] = [];
  let f = frac;
  for (let i = 0; i < digits && f > 1e-9; i += 1) {
    const product = Math.round(f * 2 * 1e9) / 1e9;
    const bit = product >= 1 ? 1 : 0;
    steps.push({ value: f, product, bit });
    f = Math.round((product - bit) * 1e9) / 1e9;
  }
  return steps;
}

/** Códigos BCD de un dígito decimal. */
export const BCD = {
  natural: (d: number) => d.toString(2).padStart(4, "0"),
  aiken: (d: number) => (d <= 4 ? d : d + 6).toString(2).padStart(4, "0"),
  exceso3: (d: number) => (d + 3).toString(2).padStart(4, "0"),
};
