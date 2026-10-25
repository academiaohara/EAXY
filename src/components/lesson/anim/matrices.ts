/** Álgebra lineal con fracciones exactas para las escenas y herramientas de 2.º Bachillerato. */

export type Q = { n: number; d: number };
export type Mat = Q[][];

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export function q(n: number, d = 1): Q {
  if (d === 0) {
    throw new Error("denominador nulo");
  }
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
}

export const qAdd = (a: Q, b: Q): Q => q(a.n * b.d + b.n * a.d, a.d * b.d);
export const qSub = (a: Q, b: Q): Q => q(a.n * b.d - b.n * a.d, a.d * b.d);
export const qMul = (a: Q, b: Q): Q => q(a.n * b.n, a.d * b.d);
export const qDiv = (a: Q, b: Q): Q => q(a.n * b.d, a.d * b.n);
export const qNeg = (a: Q): Q => q(-a.n, a.d);
export const qIsZero = (a: Q) => a.n === 0;
export const qEq = (a: Q, b: Q) => a.n === b.n && a.d === b.d;
export const qNum = (a: Q) => a.n / a.d;

/** Texto plano de una fracción: `3`, `-1/2`. */
export function qText(a: Q): string {
  return a.d === 1 ? String(a.n) : `${a.n}/${a.d}`;
}

/** LaTeX de una fracción: `3`, `-\dfrac{1}{2}`. */
export function qTex(a: Q): string {
  if (a.d === 1) {
    return String(a.n);
  }
  return `${a.n < 0 ? "-" : ""}\\dfrac{${Math.abs(a.n)}}{${a.d}}`;
}

/** Texto con signo menos tipográfico para dibujar en SVG o en pantalla. */
export function qShow(a: Q): string {
  return qText(a).replace("-", "−");
}

export const mat = (rows: number[][]): Mat => rows.map((r) => r.map((x) => q(x)));
export const identity = (n: number): Mat => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => q(i === j ? 1 : 0)));
export const zeros = (m: number, n: number): Mat => Array.from({ length: m }, () => Array.from({ length: n }, () => q(0)));
export const rows = (a: Mat) => a.length;
export const cols = (a: Mat) => (a[0] ? a[0].length : 0);
export const clone = (a: Mat): Mat => a.map((r) => r.map((x) => ({ ...x })));

export const mAdd = (a: Mat, b: Mat): Mat => a.map((r, i) => r.map((x, j) => qAdd(x, b[i]![j]!)));
export const mSub = (a: Mat, b: Mat): Mat => a.map((r, i) => r.map((x, j) => qSub(x, b[i]![j]!)));
export const mScale = (k: Q, a: Mat): Mat => a.map((r) => r.map((x) => qMul(k, x)));

/** Producto A·B; devuelve `null` si las dimensiones no encajan. */
export function mMul(a: Mat, b: Mat): Mat | null {
  if (cols(a) !== rows(b)) {
    return null;
  }
  return a.map((r) =>
    Array.from({ length: cols(b) }, (_, j) => r.reduce((s, x, k) => qAdd(s, qMul(x, b[k]![j]!)), q(0))),
  );
}

export const mT = (a: Mat): Mat => Array.from({ length: cols(a) }, (_, j) => a.map((r) => r[j]!));

export function mPow(a: Mat, n: number): Mat {
  let out = identity(rows(a));
  for (let i = 0; i < n; i++) {
    out = mMul(out, a)!;
  }
  return out;
}

export const mEq = (a: Mat, b: Mat) =>
  rows(a) === rows(b) && cols(a) === cols(b) && a.every((r, i) => r.every((x, j) => qEq(x, b[i]![j]!)));

/** Determinante por eliminación (matriz cuadrada). */
export function det(a: Mat): Q {
  const n = rows(a);
  const m = clone(a);
  let d = q(1);
  for (let c = 0; c < n; c++) {
    let p = c;
    while (p < n && qIsZero(m[p]![c]!)) {
      p++;
    }
    if (p === n) {
      return q(0);
    }
    if (p !== c) {
      [m[p], m[c]] = [m[c]!, m[p]!];
      d = qNeg(d);
    }
    d = qMul(d, m[c]![c]!);
    for (let r = c + 1; r < n; r++) {
      const f = qDiv(m[r]![c]!, m[c]![c]!);
      m[r] = m[r]!.map((x, j) => qSub(x, qMul(f, m[c]![j]!)));
    }
  }
  return d;
}

/** Rango por eliminación gaussiana. */
export function rango(a: Mat): number {
  const m = clone(a);
  let r = 0;
  for (let c = 0; c < cols(m) && r < rows(m); c++) {
    let p = r;
    while (p < rows(m) && qIsZero(m[p]![c]!)) {
      p++;
    }
    if (p === rows(m)) {
      continue;
    }
    [m[p], m[r]] = [m[r]!, m[p]!];
    for (let i = r + 1; i < rows(m); i++) {
      const f = qDiv(m[i]![c]!, m[r]![c]!);
      m[i] = m[i]!.map((x, j) => qSub(x, qMul(f, m[r]![j]!)));
    }
    r++;
  }
  return r;
}

export type PasoGauss = { m: Mat; op: string };

const filaTxt = (i: number) => `F${i + 1}`;
/** Coeficiente con signo para `Fi → Fi ± k·Fj`. */
const coefTxt = (k: Q) => {
  const abs = k.n < 0 ? qNeg(k) : k;
  const t = qEq(abs, q(1)) ? "" : `${qText(abs)}·`;
  return k.n < 0 ? ` − ${t}` : ` + ${t}`;
};

/**
 * Gauss–Jordan sobre una matriz ampliada `[A | I]` o `[A | b]`: deja la parte izquierda en forma
 * reducida. Devuelve cada estado con la operación que lo produjo.
 */
export function gaussJordan(inicial: Mat, columnasPivote: number): PasoGauss[] {
  const pasos: PasoGauss[] = [{ m: clone(inicial), op: "" }];
  const m = clone(inicial);
  const n = rows(m);
  const push = (op: string) => pasos.push({ m: clone(m), op });
  let r = 0;
  for (let c = 0; c < columnasPivote && r < n; c++) {
    let p = r;
    while (p < n && qIsZero(m[p]![c]!)) {
      p++;
    }
    if (p === n) {
      continue;
    }
    if (p !== r) {
      [m[p], m[r]] = [m[r]!, m[p]!];
      push(`${filaTxt(r)} ↔ ${filaTxt(p)}`);
    }
    const piv = m[r]![c]!;
    if (!qEq(piv, q(1))) {
      const inv = qDiv(q(1), piv);
      m[r] = m[r]!.map((x) => qMul(x, inv));
      push(piv.d === 1 && piv.n > 0 ? `${filaTxt(r)} → ${filaTxt(r)} : ${piv.n}` : `${filaTxt(r)} → (${qText(inv).replace("-", "−")})·${filaTxt(r)}`);
    }
    for (let i = 0; i < n; i++) {
      if (i === r || qIsZero(m[i]![c]!)) {
        continue;
      }
      const f = m[i]![c]!;
      m[i] = m[i]!.map((x, j) => qSub(x, qMul(f, m[r]![j]!)));
      push(`${filaTxt(i)} → ${filaTxt(i)}${coefTxt(qNeg(f))}${filaTxt(r)}`);
    }
    r++;
  }
  return pasos;
}

/** Inversa por Gauss–Jordan; `null` si es singular. Devuelve también los pasos de `[A | I]`. */
export function inversa(a: Mat): { inv: Mat; pasos: PasoGauss[] } | null {
  const n = rows(a);
  if (n !== cols(a)) {
    return null;
  }
  const amp = a.map((r, i) => [...r, ...identity(n)[i]!]);
  const pasos = gaussJordan(amp, n);
  const fin = pasos[pasos.length - 1]!.m;
  const okId = fin.every((r, i) => r.slice(0, n).every((x, j) => qEq(x, q(i === j ? 1 : 0))));
  if (!okId) {
    return null;
  }
  return { inv: fin.map((r) => r.slice(n)), pasos };
}

/** Forma escalonada por filas (sin normalizar pivotes), con las operaciones aplicadas. */
export function escalonar(a: Mat): PasoGauss[] {
  const pasos: PasoGauss[] = [{ m: clone(a), op: "" }];
  const m = clone(a);
  const push = (op: string) => pasos.push({ m: clone(m), op });
  let r = 0;
  for (let c = 0; c < cols(m) && r < rows(m); c++) {
    let p = r;
    while (p < rows(m) && qIsZero(m[p]![c]!)) {
      p++;
    }
    if (p === rows(m)) {
      continue;
    }
    if (p !== r) {
      [m[p], m[r]] = [m[r]!, m[p]!];
      push(`${filaTxt(r)} ↔ ${filaTxt(p)}`);
    }
    for (let i = r + 1; i < rows(m); i++) {
      if (qIsZero(m[i]![c]!)) {
        continue;
      }
      const f = qDiv(m[i]![c]!, m[r]![c]!);
      m[i] = m[i]!.map((x, j) => qSub(x, qMul(f, m[r]![j]!)));
      push(`${filaTxt(i)} → ${filaTxt(i)}${coefTxt(qNeg(f))}${filaTxt(r)}`);
    }
    r++;
  }
  return pasos;
}

/** Caminos de longitud k entre nodos de un grafo dado por su matriz de adyacencia 0/1. */
export function caminos(adj: number[][], k: number): number[][] {
  const r = mPow(mat(adj), k);
  return r.map((f) => f.map((x) => x.n / x.d));
}
