/**
 * Constantes del cálculo de mastery.
 *
 * Fórmula (exponential decay weighted mean):
 *
 *   weight(attempt) = exp(-λ × age_days)
 *   donde λ = ln(2) / HALF_LIFE_DAYS
 *
 *   mastery = Σ(score_i × weight_i) / Σ(weight_i)
 *   score_i = 1 si correct, 0 si incorrect
 *
 * Con HALF_LIFE_DAYS = 7, un intento de hace 7 días pesa la mitad que uno de hoy.
 */
export const MASTERY_HALF_LIFE_DAYS = 7;

export const MASTERY_DECAY_LAMBDA = Math.LN2 / MASTERY_HALF_LIFE_DAYS;

/** Ventana máxima de intentos considerados (últimos 30 días). */
export const MASTERY_WINDOW_DAYS = 30;
