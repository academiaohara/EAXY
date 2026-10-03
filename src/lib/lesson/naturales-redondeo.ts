export type RoundingOrderId =
  | "unidades"
  | "decenas"
  | "centenas"
  | "millares"
  | "decenas-millar"
  | "centenas-millar";

export type RoundingOrder = {
  id: RoundingOrderId;
  label: string;
  /** Potencia de 10 del último dígito que se conserva (0 = unidades). */
  power: number;
};

export const ROUNDING_ORDERS: RoundingOrder[] = [
  { id: "unidades", label: "Unidades", power: 0 },
  { id: "decenas", label: "Decenas", power: 1 },
  { id: "centenas", label: "Centenas", power: 2 },
  { id: "millares", label: "Millares", power: 3 },
  { id: "decenas-millar", label: "Decenas de millar", power: 4 },
  { id: "centenas-millar", label: "Centenas de millar", power: 5 },
];

export function orderById(id: RoundingOrderId): RoundingOrder {
  const found = ROUNDING_ORDERS.find((o) => o.id === id);
  if (!found) {
    throw new Error(`Orden de redondeo desconocido: ${id}`);
  }
  return found;
}

/** Dígitos del número sin separadores (sin ceros a la izquierda). */
export function digitsOf(n: number): string {
  return Math.trunc(Math.abs(n)).toString();
}

/** Índice (0-based) del último dígito conservado, contando desde la izquierda. */
export function lastKeptDigitIndex(digitCount: number, power: number): number {
  return digitCount - 1 - power;
}

/** Índice de la primera cifra que se sustituye por ceros (desde la izquierda). */
export function firstRemovedDigitIndex(digitCount: number, power: number): number {
  return lastKeptDigitIndex(digitCount, power) + 1;
}

export function roundToOrder(n: number, orderId: RoundingOrderId): number {
  const { power } = orderById(orderId);
  const factor = 10 ** power;
  return Math.round(n / factor) * factor;
}

export function formatGrouped(n: number): string {
  return Math.trunc(Math.abs(n))
    .toLocaleString("es-ES")
    .replace(/\u00a0/g, " ");
}

export type RoundingExample = {
  n: number;
  orderId: RoundingOrderId;
  caption: string;
};

export const DEMO_ROUNDING_EXAMPLES: RoundingExample[] = [
  {
    n: 293_518,
    orderId: "centenas-millar",
    caption: "A las centenas de millar (miramos la cifra de decenas de millar: 9 ≥ 5).",
  },
  {
    n: 293_518,
    orderId: "decenas-millar",
    caption: "A las decenas de millar (miramos la cifra de millar: 3 < 5).",
  },
  {
    n: 293_518,
    orderId: "millares",
    caption: "A los millares (miramos la cifra de centenas: 5 ≥ 5).",
  },
];
