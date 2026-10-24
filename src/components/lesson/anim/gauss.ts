/** Eliminación de Gauss en enteros para sistemas 3×3 (sin fracciones intermedias). */

export type Row = [number, number, number, number];
export type Gauss = {
  /** Matriz ampliada inicial, tras el paso 1 y tras el paso 2. */
  steps: Row[][];
  /** Textos de las operaciones de cada paso (p. ej. «E2 → E2 − 2·E1»). */
  ops: string[][];
  kind: "determinado" | "indeterminado" | "incompatible";
  /** Solución si es compatible determinado. */
  solution?: [number, number, number];
};

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const r6 = (x: number) => Math.round(x * 1e6) / 1e6;

/** Divide una fila por el m.c.d. de sus coeficientes (deja los números pequeños). */
function reduce(r: Row): Row {
  const g = r.reduce((acc, v) => gcd(acc, Math.round(v)), 0);
  return g > 1 ? (r.map((v) => v / g) as Row) : r;
}

/** Operación que anula `b[col]` usando `a`: B → m·B − k·A (con m, k enteros primos entre sí). */
function eliminate(a: Row, b: Row, col: number, nameA: string, nameB: string): { row: Row; op: string } {
  const p = a[col]!;
  const q = b[col]!;
  if (q === 0) return { row: b, op: `${nameB} no cambia` };
  const g = gcd(p, q);
  let mb = p / g;
  let ma = q / g;
  if (mb < 0) {
    mb = -mb;
    ma = -ma;
  }
  const row = b.map((v, i) => mb * v - ma * a[i]!) as Row;
  const termB = mb === 1 ? nameB : `${mb}·${nameB}`;
  const termA = Math.abs(ma) === 1 ? nameA : `${Math.abs(ma)}·${nameA}`;
  return { row: reduce(row), op: `${nameB} → ${termB} ${ma > 0 ? "−" : "+"} ${termA}` };
}

/** Rango de una matriz pequeña (tolerancia para enteros pequeños). */
function rank(m: number[][]): number {
  const a = m.map((r) => [...r]);
  let rk = 0;
  const cols = a[0]!.length;
  for (let c = 0; c < cols && rk < a.length; c += 1) {
    let piv = rk;
    for (let i = rk + 1; i < a.length; i += 1) if (Math.abs(a[i]![c]!) > Math.abs(a[piv]![c]!)) piv = i;
    if (Math.abs(a[piv]![c]!) < 1e-9) continue;
    [a[rk], a[piv]] = [a[piv]!, a[rk]!];
    for (let i = rk + 1; i < a.length; i += 1) {
      const f = a[i]![c]! / a[rk]![c]!;
      for (let j = c; j < cols; j += 1) a[i]![j]! -= f * a[rk]![j]!;
    }
    rk += 1;
  }
  return rk;
}

export function gauss3(m: [Row, Row, Row]): Gauss {
  let rows: Row[] = m.map((r) => [...r] as Row);
  // Pivote en E1: si a11 = 0 se intercambia con una fila que tenga x.
  const swapOps: string[] = [];
  if (rows[0]![0] === 0) {
    const k = rows.findIndex((r) => r[0] !== 0);
    if (k > 0) {
      [rows[0], rows[k]] = [rows[k]!, rows[0]!];
      swapOps.push(`E1 ↔ E${k + 1}`);
    }
  }
  const s0 = rows.map((r) => [...r] as Row);
  const o1 = eliminate(rows[0]!, rows[1]!, 0, "E1", "E2");
  const o2 = eliminate(rows[0]!, rows[2]!, 0, "E1", "E3");
  rows = [rows[0]!, o1.row, o2.row];
  const s1 = rows.map((r) => [...r] as Row);
  // Pivote en y: si E2 no tiene y, se intercambia con E3.
  const swap2: string[] = [];
  if (rows[1]![1] === 0 && rows[2]![1] !== 0) {
    [rows[1], rows[2]] = [rows[2]!, rows[1]!];
    swap2.push("E2 ↔ E3");
  }
  const o3 = eliminate(rows[1]!, rows[2]!, 1, "E2", "E3");
  rows = [rows[0]!, rows[1]!, o3.row];
  const s2 = rows.map((r) => [...r] as Row);
  const last = rows[2]!;
  const mid = rows[1]!;
  const rA = rank(m.map((r) => r.slice(0, 3)));
  const rAug = rank(m.map((r) => [...r]));
  let kind: Gauss["kind"];
  let solution: Gauss["solution"];
  if (rA < rAug) kind = "incompatible";
  else if (rA === 3) {
    kind = "determinado";
    const z = last[3] / last[2];
    const y = (mid[3] - mid[2] * z) / mid[1];
    const x = (rows[0]![3] - rows[0]![1] * y - rows[0]![2] * z) / rows[0]![0];
    solution = [r6(x), r6(y), r6(z)];
  } else kind = "indeterminado";
  return {
    steps: [s0, s1, s2],
    ops: [[...swapOps, o1.op, o2.op], [...swap2, o3.op]],
    kind,
    solution,
  };
}

export const KIND_TEXT: Record<Gauss["kind"], string> = {
  determinado: "compatible determinado",
  indeterminado: "compatible indeterminado",
  incompatible: "incompatible",
};

/** Escribe una ecuación `ax + by + cz = d` con signos tipográficos. */
export function eqText(r: Row): string {
  const names = ["x", "y", "z"];
  const parts: string[] = [];
  r.slice(0, 3).forEach((c, i) => {
    if (c === 0) return;
    const abs = Math.abs(c);
    const coef = abs === 1 ? "" : String(abs);
    const term = `${coef}${names[i]}`;
    parts.push(parts.length === 0 ? (c < 0 ? `−${term}` : term) : `${c < 0 ? "−" : "+"} ${term}`);
  });
  const rhs = String(r[3]).replace("-", "−");
  return `${parts.length ? parts.join(" ") : "0"} = ${rhs}`;
}
