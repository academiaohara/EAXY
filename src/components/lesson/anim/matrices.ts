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

/** Submatriz que queda al quitar la fila `i` y la columna `j` (índices desde 0). */
export const sinFilaColumna = (a: Mat, i: number, j: number): Mat =>
  a.filter((_, r) => r !== i).map((r) => r.filter((_, c) => c !== j));

/** Menor complementario αij: determinante de la submatriz sin la fila i ni la columna j. */
export const menorComplementario = (a: Mat, i: number, j: number): Q => det(sinFilaColumna(a, i, j));

/** Adjunto Aij = (−1)^(i+j)·αij. */
export const adjuntoElemento = (a: Mat, i: number, j: number): Q => {
  const m = menorComplementario(a, i, j);
  return (i + j) % 2 === 0 ? m : qNeg(m);
};

/** Matriz adjunta: formada por los adjuntos de cada elemento. */
export const adjunta = (a: Mat): Mat => a.map((r, i) => r.map((_, j) => adjuntoElemento(a, i, j)));

/** Desarrollo por los adjuntos de una fila (índice desde 0): términos aij·Aij y suma. */
export function desarrolloFila(a: Mat, i: number): { terminos: Q[]; total: Q } {
  const terminos = a[i]!.map((x, j) => qMul(x, adjuntoElemento(a, i, j)));
  return { terminos, total: terminos.reduce((s, t) => qAdd(s, t), q(0)) };
}

/** Número de menores de orden `k` y cuántos son distintos de cero. */
export function contarMenores(a: Mat, k: number): { total: number; noNulos: number } {
  const comb = (n: number, m: number): number[][] => {
    if (m === 0) return [[]];
    const out: number[][] = [];
    for (let s = 0; s <= n - m; s++) {
      for (const rest of comb(n - s - 1, m - 1)) {
        out.push([s, ...rest.map((x) => x + s + 1)]);
      }
    }
    return out;
  };
  const fs = comb(rows(a), k);
  const cs = comb(cols(a), k);
  let noNulos = 0;
  for (const f of fs) {
    for (const c of cs) {
      if (!qIsZero(det(f.map((i) => c.map((j) => a[i]![j]!))))) {
        noNulos++;
      }
    }
  }
  return { total: fs.length * cs.length, noNulos };
}

export type TipoSistema = "determinado" | "indeterminado" | "incompatible";
export type AnalisisSistema = {
  rA: number;
  rAmp: number;
  n: number;
  tipo: TipoSistema;
  /** Solución única (sólo si es compatible determinado). */
  solucion?: Q[];
  /** Solución general con parámetros λ, μ… (sólo si es compatible indeterminado). */
  general?: string[];
};

const PARAMS = ["λ", "μ", "ν"];

/** Texto de `c·param` con signo para sumar a una expresión (`+ 2λ`, `− λ`). */
const termino = (c: Q, p: string) => {
  const abs = c.n < 0 ? qNeg(c) : c;
  const k = qEq(abs, q(1)) ? "" : abs.d === 1 ? String(abs.n) : `(${qText(abs)})`;
  return `${c.n < 0 ? "−" : "+"} ${k}${p}`;
};

/** Discusión por Rouché–Frobenius y solución (única o general) con Gauss–Jordan. */
export function analizarSistema(A: Mat, b: Mat): AnalisisSistema {
  const n = cols(A);
  const amp = A.map((r, i) => [...r, b[i]![0]!]);
  const rA = rango(A);
  const rAmp = rango(amp);
  if (rA < rAmp) {
    return { rA, rAmp, n, tipo: "incompatible" };
  }
  const red = gaussJordan(amp, n).at(-1)!.m;
  if (rA === n) {
    return { rA, rAmp, n, tipo: "determinado", solucion: Array.from({ length: n }, (_, j) => red[j]![n]!) };
  }
  const pivotes: number[] = [];
  red.forEach((r) => {
    const j = r.slice(0, n).findIndex((x) => !qIsZero(x));
    if (j >= 0) pivotes.push(j);
  });
  const libres = Array.from({ length: n }, (_, j) => j).filter((j) => !pivotes.includes(j));
  const nombres = ["x", "y", "z", "t", "u"];
  const general = Array.from({ length: n }, (_, j) => {
    const li = libres.indexOf(j);
    if (li >= 0) return `${nombres[j]} = ${PARAMS[li]}`;
    const fila = red.find((r) => r.slice(0, n).findIndex((x) => !qIsZero(x)) === j)!;
    const indep = fila[n]!;
    const partes = libres.map((l, k) => (qIsZero(fila[l]!) ? "" : ` ${termino(qNeg(fila[l]!), PARAMS[k]!)}`)).join("");
    const base = qIsZero(indep) ? "" : qText(indep).replace("-", "−");
    const texto = base ? base + partes : partes.trim().replace(/^\+ /, "").replace(/^− /, "−") || "0";
    return `${nombres[j]} = ${texto}`;
  });
  return { rA, rAmp, n, tipo: "indeterminado", general };
}

/** Regla de Cramer: |A|, los determinantes con la columna sustituida y la solución si |A| ≠ 0. */
export function cramer(A: Mat, b: Mat): { detA: Q; dets: Q[]; solucion?: Q[] } {
  const detA = det(A);
  const dets = Array.from({ length: cols(A) }, (_, j) => det(A.map((r, i) => r.map((x, k) => (k === j ? b[i]![0]! : x)))));
  return { detA, dets, solucion: qIsZero(detA) ? undefined : dets.map((d) => qDiv(d, detA)) };
}
