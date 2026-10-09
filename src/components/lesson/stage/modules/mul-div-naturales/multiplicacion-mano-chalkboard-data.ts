/** Visibilidad en sub-pasos (1–4). `to` omitido = visible desde `from` en adelante. */
export type SubVisibility = { from: number; to?: number };

export type ChalkDigit = {
  id: string;
  char: string;
  x: number;
  y: number;
  color?: "ink" | "yellow" | "cyan" | "pink" | "green";
  show: SubVisibility;
  ring?: { color: "yellow" | "cyan" | "pink"; show: SubVisibility };
};

export type ChalkNote = {
  id: string;
  text: string;
  x: number;
  y: number;
  show: SubVisibility;
  arrow?: [number, number, number, number, number, number];
};

export type ChalkLine = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  show: SubVisibility;
  accent?: boolean;
};

export type ChalkboardLesson = {
  multiplicand: number;
  multiplier: number;
  digits: ChalkDigit[];
  notes: ChalkNote[];
  lines: ChalkLine[];
  liveBySub: Record<number, string>;
};

export function isVisibleAtSub(sub: number, rule: SubVisibility): boolean {
  if (sub < rule.from) {
    return false;
  }
  if (rule.to !== undefined) {
    return sub >= rule.from && sub <= rule.to;
  }
  return sub >= rule.from;
}

/** 34 × 12 — posiciones fijas en viewBox 800×520. */
export const MULTIPLICACION_MANO_34X12: ChalkboardLesson = {
  multiplicand: 34,
  multiplier: 12,
  digits: [
    { id: "m-t", char: "3", x: 500, y: 118, color: "ink", show: { from: 1 } },
    { id: "m-u", char: "4", x: 560, y: 118, color: "ink", show: { from: 1 } },
    { id: "times", char: "×", x: 420, y: 178, color: "ink", show: { from: 1 } },
    { id: "t-t", char: "1", x: 500, y: 178, color: "ink", show: { from: 1 }, ring: { color: "cyan", show: { from: 3, to: 3 } } },
    {
      id: "t-u",
      char: "2",
      x: 560,
      y: 178,
      color: "ink",
      show: { from: 1 },
      ring: { color: "yellow", show: { from: 1, to: 1 } },
    },
    { id: "p1-t", char: "6", x: 500, y: 268, color: "yellow", show: { from: 2 } },
    { id: "p1-u", char: "8", x: 560, y: 268, color: "yellow", show: { from: 2 } },
    { id: "p2-h", char: "3", x: 440, y: 328, color: "cyan", show: { from: 3 } },
    { id: "p2-t", char: "4", x: 500, y: 328, color: "cyan", show: { from: 3 } },
    {
      id: "p2-u",
      char: "0",
      x: 560,
      y: 328,
      color: "cyan",
      show: { from: 3 },
      ring: { color: "pink", show: { from: 3, to: 3 } },
    },
    { id: "r-h", char: "4", x: 440, y: 408, color: "green", show: { from: 4 } },
    { id: "r-t", char: "0", x: 500, y: 408, color: "green", show: { from: 4 } },
    { id: "r-u", char: "8", x: 560, y: 408, color: "green", show: { from: 4 } },
  ],
  lines: [
    { id: "sep1", x1: 400, y1: 228, x2: 620, y2: 228, show: { from: 1 } },
    { id: "sep2", x1: 400, y1: 378, x2: 620, y2: 378, show: { from: 4 }, accent: true },
  ],
  notes: [
    {
      id: "n-units",
      text: "empezamos por las unidades: 2",
      x: 88,
      y: 168,
      show: { from: 1, to: 1 },
      arrow: [280, 178, 340, 150, 548, 188],
    },
    {
      id: "n-row68",
      text: "2 × 34 = 68, ¡primera fila!",
      x: 72,
      y: 248,
      show: { from: 2, to: 2 },
      arrow: [300, 248, 360, 220, 540, 262],
    },
    {
      id: "n-tens",
      text: "ahora las decenas: el 1 vale 10",
      x: 64,
      y: 148,
      show: { from: 3, to: 3 },
      arrow: [290, 158, 350, 130, 508, 178],
    },
    {
      id: "n-row340",
      text: "1 × 34 = 34, ¡y corrido! → 340",
      x: 56,
      y: 308,
      show: { from: 3, to: 3 },
      arrow: [280, 308, 340, 280, 520, 322],
    },
    {
      id: "n-zero",
      text: "este 0 guarda el sitio",
      x: 600,
      y: 292,
      show: { from: 3, to: 3 },
      arrow: [580, 272, 600, 250, 572, 318],
    },
    {
      id: "n-sum",
      text: "68 + 340 = 408",
      x: 120,
      y: 388,
      show: { from: 4, to: 4 },
      arrow: [300, 388, 380, 360, 500, 398],
    },
  ],
  liveBySub: {
    1: "Empezamos por las unidades: multiplicamos por 2.",
    2: "2 × 34 = 68. Primera fila de la multiplicación.",
    3: "Multiplicamos por las decenas; el 1 vale 10. La fila 340 queda corrida; el cero guarda el sitio.",
    4: "Sumamos 68 + 340. Resultado: 408.",
  },
};

export function chalkboardFor(multiplicand: number, multiplier: number): ChalkboardLesson | null {
  if (multiplicand === 34 && multiplier === 12) {
    return MULTIPLICACION_MANO_34X12;
  }
  return null;
}
