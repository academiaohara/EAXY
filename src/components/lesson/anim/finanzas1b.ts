/** Matemática financiera de CCSS I: interés compuesto, anualidades y TAE. Todas las tasas en %. */

/** Montante con interés compuesto: `periodos` periodos al `rPeriodo` % cada uno. */
export function montante(capital: number, rPeriodo: number, periodos: number): number {
  return capital * (1 + rPeriodo / 100) ** periodos;
}

/** Número de periodos para pasar de `capital` a `meta` con un rédito de `rPeriodo` % por periodo. */
export function periodosHasta(capital: number, meta: number, rPeriodo: number): number | null {
  if (capital <= 0 || meta <= 0 || rPeriodo <= -100 || rPeriodo === 0) return null;
  return Math.log(meta / capital) / Math.log(1 + rPeriodo / 100);
}

/**
 * Capital reunido con aportaciones `a` al principio de cada periodo.
 * `rAnual` en %, `n` pagos al año y `periodos` = años·n.
 */
export function capitalizacion(a: number, rAnual: number, n: number, periodos: number): number {
  const i = rAnual / 100 / n;
  if (i === 0) return a * periodos;
  return (a * (1 + i) * ((1 + i) ** periodos - 1)) / i;
}

/** Aportación periódica (a principio de periodo) para reunir `capital`. */
export function aportacionParaCapital(capital: number, rAnual: number, n: number, periodos: number): number {
  const i = rAnual / 100 / n;
  if (i === 0) return capital / periodos;
  return (capital * i) / ((1 + i) * ((1 + i) ** periodos - 1));
}

/** Cuota de amortización (a final de periodo) de una deuda `d`. */
export function cuotaAmortizacion(d: number, rAnual: number, n: number, periodos: number): number {
  const i = rAnual / 100 / n;
  if (i === 0) return d / periodos;
  return (d * i * (1 + i) ** periodos) / ((1 + i) ** periodos - 1);
}

/** Deuda que amortizan `periodos` cuotas `a` pagadas a final de periodo. */
export function deudaDeCuota(a: number, rAnual: number, n: number, periodos: number): number {
  const i = rAnual / 100 / n;
  if (i === 0) return a * periodos;
  return (a * ((1 + i) ** periodos - 1)) / (i * (1 + i) ** periodos);
}

/** TAE (%) de un rédito nominal `rAnual` % capitalizado `n` veces al año. */
export function tae(rAnual: number, n: number): number {
  return ((1 + rAnual / 100 / n) ** n - 1) * 100;
}

/** Saldo pendiente tras `k` cuotas de una deuda `d`. */
export function saldoTras(d: number, rAnual: number, n: number, periodos: number, k: number): number {
  const i = rAnual / 100 / n;
  const a = cuotaAmortizacion(d, rAnual, n, periodos);
  return d * (1 + i) ** k - (i === 0 ? a * k : (a * ((1 + i) ** k - 1)) / i);
}

/** Variación porcentual total de aplicar dos variaciones sucesivas. */
export function variacionEncadenada(a: number, b: number): number {
  return ((1 + a / 100) * (1 + b / 100) - 1) * 100;
}

/** Redondea a `d` decimales (para mostrar importes). */
export const round = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
