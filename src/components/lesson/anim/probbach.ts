/** Probabilidad (1.º de Bachillerato): sucesos, tablas de contingencia, árboles y Bayes. */

const r9 = (x: number) => Math.round(x * 1e9) / 1e9;

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** Fracción irreducible p/q en texto (enteros). */
export function fracText(p: number, q: number): string {
  if (q === 0) return "—";
  const g = gcd(p, q) || 1;
  const n = p / g;
  const d = q / g;
  return d === 1 ? String(n) : `${n}/${d}`;
}

/* ───────────── Sucesos con un dado ───────────── */

export const E6 = [1, 2, 3, 4, 5, 6];

export type DieEvent = { id: string; label: string; set: number[] };

export const DIE_EVENTS: DieEvent[] = [
  { id: "par", label: "Par", set: [2, 4, 6] },
  { id: "impar", label: "Impar", set: [1, 3, 5] },
  { id: "m3", label: "Múltiplo de 3", set: [3, 6] },
  { id: "menor3", label: "Menor que 3", set: [1, 2] },
  { id: "mayor4", label: "Mayor que 4", set: [5, 6] },
  { id: "primo", label: "Primo", set: [2, 3, 5] },
];

export type SetOp = "union" | "inter" | "diff" | "comp";

export function setOp(op: SetOp, a: number[], b: number[]): number[] {
  const A = new Set(a);
  const B = new Set(b);
  const r = E6.filter((x) => (op === "union" ? A.has(x) || B.has(x) : op === "inter" ? A.has(x) && B.has(x) : op === "diff" ? A.has(x) && !B.has(x) : !A.has(x)));
  return r;
}

/** Región de Venn (solo A, ambos, solo B o ninguno) de cada elemento. */
export const regionOf = (x: number, a: number[], b: number[]): "A" | "AB" | "B" | "none" => {
  const ia = a.includes(x);
  const ib = b.includes(x);
  return ia && ib ? "AB" : ia ? "A" : ib ? "B" : "none";
};

/* ───────────── Probabilidades con A y B ───────────── */

export type PairProbs = {
  pa: number;
  pb: number;
  pab: number;
  union: number;
  aNotB: number;
  bNotA: number;
  notA: number;
  notB: number;
  neither: number;
  aGivenB: number | null;
  bGivenA: number | null;
  independent: boolean;
  incompatible: boolean;
  valid: boolean;
};

export function pairProbs(pa: number, pb: number, pab: number): PairProbs {
  const valid = pab >= -1e-12 && pab <= Math.min(pa, pb) + 1e-12 && pa + pb - pab <= 1 + 1e-12;
  return {
    pa,
    pb,
    pab,
    union: r9(pa + pb - pab),
    aNotB: r9(pa - pab),
    bNotA: r9(pb - pab),
    notA: r9(1 - pa),
    notB: r9(1 - pb),
    neither: r9(1 - (pa + pb - pab)),
    aGivenB: pb > 0 ? r9(pab / pb) : null,
    bGivenA: pa > 0 ? r9(pab / pa) : null,
    independent: Math.abs(pab - pa * pb) < 1e-9,
    incompatible: Math.abs(pab) < 1e-12,
    valid,
  };
}

/* ───────────── Tabla de contingencia ───────────── */

export type Contingency = {
  n: number;
  /** Probabilidades conjuntas [A∩B, Ā∩B, A∩B̄, Ā∩B̄] (columnas A / noA, filas B / noB). */
  joint: { ab: number; nab: number; anb: number; nanb: number };
  pa: number;
  pna: number;
  pb: number;
  pnb: number;
  /** Condicionadas del árbol que empieza en A y en B. */
  bGivenA: number | null;
  bGivenNa: number | null;
  aGivenB: number | null;
  aGivenNb: number | null;
  independent: boolean;
  nearIndependent: boolean;
};

/** Conteos [A∩B, Ā∩B, A∩B̄, Ā∩B̄]. */
export function contingency(c: [number, number, number, number]): Contingency | null {
  const n = c[0] + c[1] + c[2] + c[3];
  if (n <= 0) return null;
  const [ab, nab, anb, nanb] = c.map((x) => x / n) as [number, number, number, number];
  const pa = ab + anb;
  const pb = ab + nab;
  const div = (x: number, y: number) => (y > 0 ? x / y : null);
  const bGivenA = div(ab, pa);
  return {
    n,
    joint: { ab, nab, anb, nanb },
    pa,
    pna: nab + nanb,
    pb,
    pnb: anb + nanb,
    bGivenA,
    bGivenNa: div(nab, nab + nanb),
    aGivenB: div(ab, pb),
    aGivenNb: div(anb, anb + nanb),
    independent: Math.abs(ab - pa * pb) < 1e-9,
    nearIndependent: bGivenA !== null && Math.abs(bGivenA - pb) < 0.005,
  };
}

/** Árbol (P(A), P(B|A), P(B|Ā)) → tabla y árbol invertido. */
export function treeToTable(pa: number, bGivenA: number, bGivenNa: number) {
  const ab = pa * bGivenA;
  const anb = pa * (1 - bGivenA);
  const nab = (1 - pa) * bGivenNa;
  const nanb = (1 - pa) * (1 - bGivenNa);
  const pb = ab + nab;
  return {
    joint: { ab: r9(ab), nab: r9(nab), anb: r9(anb), nanb: r9(nanb) },
    pb: r9(pb),
    pnb: r9(1 - pb),
    aGivenB: pb > 0 ? r9(ab / pb) : null,
    aGivenNb: 1 - pb > 0 ? r9(anb / (1 - pb)) : null,
    naGivenB: pb > 0 ? r9(nab / pb) : null,
    naGivenNb: 1 - pb > 0 ? r9(nanb / (1 - pb)) : null,
  };
}

/* ───────────── Probabilidad total y Bayes ───────────── */

export type Hyp = { name: string; p: number; cond: number };
export type Scenario = { label: string; question: string; event: string; notEvent: string; hyps: Hyp[] };

export const SCENARIOS: Scenario[] = [
  {
    label: "Dos urnas",
    question: "Urna A: 8 blancas y 2 negras. Urna B: 4 blancas y 6 negras. Se elige una urna al azar y se saca una bola.",
    event: "Negra",
    notEvent: "Blanca",
    hyps: [
      { name: "Urna A", p: 1 / 2, cond: 2 / 10 },
      { name: "Urna B", p: 1 / 2, cond: 6 / 10 },
    ],
  },
  {
    label: "Tres cajas",
    question: "Caja A: 4 negras de 10. Caja B: 1 negra de 6. Caja C: 3 negras de 8. Se elige una caja al azar y una bola.",
    event: "Negra",
    notEvent: "No negra",
    hyps: [
      { name: "Caja A", p: 1 / 3, cond: 4 / 10 },
      { name: "Caja B", p: 1 / 3, cond: 1 / 6 },
      { name: "Caja C", p: 1 / 3, cond: 3 / 8 },
    ],
  },
  {
    label: "Móviles defectuosos",
    question: "El 2 % de los móviles es defectuoso. El detector marca como defectuoso al 90 % de los defectuosos y al 1 % de los correctos.",
    event: "El detector lo marca defectuoso",
    notEvent: "El detector lo marca correcto",
    hyps: [
      { name: "Defectuoso", p: 0.02, cond: 0.9 },
      { name: "Correcto", p: 0.98, cond: 0.01 },
    ],
  },
  {
    label: "Sastres",
    question: "El sastre A hace el 55 % de los arreglos y deja insatisfecho al 5 %; B hace el 30 % (8 %); C hace el 15 % (10 %).",
    event: "Cliente insatisfecho",
    notEvent: "Cliente satisfecho",
    hyps: [
      { name: "Sastre A", p: 0.55, cond: 0.05 },
      { name: "Sastre B", p: 0.3, cond: 0.08 },
      { name: "Sastre C", p: 0.15, cond: 0.1 },
    ],
  },
  {
    label: "Tornillos",
    question: "Una caja tiene 120 tornillos: 15 de la máquina A (1 % defectuosos), 30 de la B (2 %) y 75 de la C (3 %).",
    event: "Tornillo defectuoso",
    notEvent: "Tornillo correcto",
    hyps: [
      { name: "Máquina A", p: 15 / 120, cond: 0.01 },
      { name: "Máquina B", p: 30 / 120, cond: 0.02 },
      { name: "Máquina C", p: 75 / 120, cond: 0.03 },
    ],
  },
];

/** P(B) y P(Ai | B) (o con el suceso contrario si `negate`). */
export function totalBayes(s: Scenario, negate = false) {
  const joint = s.hyps.map((h) => h.p * (negate ? 1 - h.cond : h.cond));
  const total = joint.reduce((a, b) => a + b, 0);
  return { joint: joint.map(r9), total: r9(total), posterior: joint.map((j) => (total > 0 ? r9(j / total) : 0)) };
}

/* ───────────── Problemas famosos ───────────── */

/** Probabilidad de que en un grupo de n personas haya dos con el mismo cumpleaños (365 días). */
export function birthday(n: number): number {
  let p = 1;
  for (let i = 0; i < n; i += 1) p *= (365 - i) / 365;
  return 1 - p;
}

/** Caballero de la Meré: al menos un 6 en 4 tiradas, o un 6 doble en 24 tiradas de dos dados. */
export const meré = (mode: "uno" | "doble", n: number) => 1 - (mode === "uno" ? 5 / 6 : 35 / 36) ** n;

/** Número de ternas ordenadas de tres dados con suma s. */
export function threeDice(s: number): number {
  let c = 0;
  for (let a = 1; a <= 6; a += 1) for (let b = 1; b <= 6; b += 1) for (let d = 1; d <= 6; d += 1) if (a + b + d === s) c += 1;
  return c;
}
