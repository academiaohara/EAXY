import type { SubVisibility } from "@/components/lesson/stage/modules/mul-div-naturales/chalkboard-shared";

export type CyclePhase = "cuantas" | "multiplica" | "resta" | "baja";

export type DivisionChalkDigit = {
  id: string;
  char: string;
  x: number;
  y: number;
  accent?: boolean;
  show: SubVisibility;
};

export type DivisionChalkNote = {
  id: string;
  text: string;
  x: number;
  y: number;
  show: SubVisibility;
  arrow?: [number, number, number, number, number, number];
};

export type DivisionChalkLine = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  show: SubVisibility;
};

export type DivisionManoLesson = {
  dividend: number;
  divisor: number;
  digits: DivisionChalkDigit[];
  lines: DivisionChalkLine[];
  notes: DivisionChalkNote[];
  liveBySub: Record<number, string>;
  cycleBySub: Record<number, CyclePhase>;
};

/** 150 ÷ 6 = 25 (exacta), alineado con el ejemplo de reparto del temario. */
export const DIVISION_MANO_150X6: DivisionManoLesson = {
  dividend: 150,
  divisor: 6,
  cycleBySub: {
    1: "cuantas",
    2: "multiplica",
    3: "resta",
    4: "baja",
    5: "cuantas",
  },
  digits: [
    { id: "d1", char: "1", x: 420, y: 200, show: { from: 1 } },
    { id: "d2", char: "5", x: 470, y: 200, show: { from: 1 } },
    { id: "d3", char: "0", x: 520, y: 200, show: { from: 1 } },
    { id: "v", char: "6", x: 340, y: 200, show: { from: 1 } },
    { id: "q1", char: "2", x: 470, y: 130, accent: true, show: { from: 1 } },
    { id: "q2", char: "5", x: 520, y: 130, accent: true, show: { from: 5 } },
    { id: "w15", char: "1", x: 420, y: 260, show: { from: 1, to: 3 } },
    { id: "w15b", char: "5", x: 470, y: 260, accent: true, show: { from: 1, to: 3 } },
    { id: "p12a", char: "1", x: 420, y: 310, accent: true, show: { from: 2 } },
    { id: "p12b", char: "2", x: 470, y: 310, accent: true, show: { from: 2 } },
    { id: "r3", char: "3", x: 470, y: 360, accent: true, show: { from: 3 } },
    { id: "b0", char: "0", x: 520, y: 360, accent: true, show: { from: 4 } },
    { id: "w30a", char: "3", x: 420, y: 410, show: { from: 4 } },
    { id: "w30b", char: "0", x: 470, y: 410, accent: true, show: { from: 4 } },
    { id: "p30a", char: "3", x: 420, y: 460, accent: true, show: { from: 5 } },
    { id: "p30b", char: "0", x: 470, y: 460, accent: true, show: { from: 5 } },
    { id: "r0", char: "0", x: 470, y: 510, accent: true, show: { from: 5 } },
  ],
  lines: [
    { id: "hook", x1: 380, y1: 170, x2: 380, y2: 430, show: { from: 1 } },
    { id: "top", x1: 380, y1: 170, x2: 560, y2: 170, show: { from: 1 } },
    { id: "s1", x1: 400, y1: 290, x2: 540, y2: 290, show: { from: 2 } },
    { id: "s2", x1: 400, y1: 340, x2: 500, y2: 340, show: { from: 3 } },
    { id: "s3", x1: 400, y1: 440, x2: 540, y2: 440, show: { from: 5 } },
    { id: "s4", x1: 400, y1: 490, x2: 500, y2: 490, show: { from: 5 } },
  ],
  notes: [
    {
      id: "n1",
      text: "6 en 15 → 2 veces",
      x: 72,
      y: 248,
      show: { from: 1, to: 1 },
      arrow: [250, 248, 310, 220, 455, 255],
    },
    {
      id: "n2",
      text: "2 · 6 = 12",
      x: 88,
      y: 308,
      show: { from: 2, to: 2 },
      arrow: [250, 308, 310, 290, 445, 305],
    },
    {
      id: "n3",
      text: "sobran 3",
      x: 120,
      y: 358,
      show: { from: 3, to: 3 },
      arrow: [250, 358, 310, 340, 468, 355],
    },
    {
      id: "n4",
      text: "bajamos el 0",
      x: 100,
      y: 408,
      show: { from: 4, to: 4 },
      arrow: [250, 408, 320, 380, 515, 355],
    },
    {
      id: "n5",
      text: "6 en 30 → 5 veces",
      x: 72,
      y: 248,
      show: { from: 5, to: 5 },
      arrow: [250, 248, 310, 220, 455, 405],
    },
  ],
  liveBySub: {
    1: "¿Cuántas veces cabe 6 en 15? Dos veces. Escribimos 2 en el cociente.",
    2: "Multiplicamos: 2 por 6 igual 12. Lo escribimos bajo el 15.",
    3: "Restamos: 15 menos 12 igual 3. Sobran 3 bombones sin repartir.",
    4: "Bajamos el 0 del dividendo. Trabajamos con 30.",
    5: "¿Cuántas veces cabe 6 en 30? Cinco veces. Cociente 25 y resto 0.",
  },
};

/** 156 ÷ 6 = 26 (exacta), primera vuelta completa en 5 sub-pasos. */
export const DIVISION_MANO_156X6: DivisionManoLesson = {
  dividend: 156,
  divisor: 6,
  cycleBySub: {
    1: "cuantas",
    2: "multiplica",
    3: "resta",
    4: "baja",
    5: "cuantas",
  },
  digits: [
    { id: "d1", char: "1", x: 420, y: 200, show: { from: 1 } },
    { id: "d2", char: "5", x: 470, y: 200, show: { from: 1 } },
    { id: "d3", char: "6", x: 520, y: 200, show: { from: 1 } },
    { id: "v", char: "6", x: 340, y: 200, show: { from: 1 } },
    { id: "q1", char: "2", x: 470, y: 130, accent: true, show: { from: 1 } },
    { id: "q2", char: "6", x: 520, y: 130, accent: true, show: { from: 5 } },
    { id: "w15", char: "1", x: 420, y: 260, show: { from: 1, to: 3 } },
    { id: "w15b", char: "5", x: 470, y: 260, accent: true, show: { from: 1, to: 3 } },
    { id: "p12a", char: "1", x: 420, y: 310, accent: true, show: { from: 2 } },
    { id: "p12b", char: "2", x: 470, y: 310, accent: true, show: { from: 2 } },
    { id: "r3", char: "3", x: 470, y: 360, accent: true, show: { from: 3 } },
    { id: "b6", char: "6", x: 520, y: 360, accent: true, show: { from: 4 } },
    { id: "w36a", char: "3", x: 420, y: 410, show: { from: 4 } },
    { id: "w36b", char: "6", x: 470, y: 410, accent: true, show: { from: 4 } },
    { id: "p36a", char: "3", x: 420, y: 460, accent: true, show: { from: 5 } },
    { id: "p36b", char: "6", x: 470, y: 460, accent: true, show: { from: 5 } },
    { id: "r0", char: "0", x: 470, y: 510, accent: true, show: { from: 5 } },
  ],
  lines: [
    { id: "hook", x1: 380, y1: 170, x2: 380, y2: 430, show: { from: 1 } },
    { id: "top", x1: 380, y1: 170, x2: 560, y2: 170, show: { from: 1 } },
    { id: "s1", x1: 400, y1: 290, x2: 540, y2: 290, show: { from: 2 } },
    { id: "s2", x1: 400, y1: 340, x2: 500, y2: 340, show: { from: 3 } },
    { id: "s3", x1: 400, y1: 440, x2: 540, y2: 440, show: { from: 5 } },
    { id: "s4", x1: 400, y1: 490, x2: 500, y2: 490, show: { from: 5 } },
  ],
  notes: [
    {
      id: "n1",
      text: "6 en 15 → 2 veces",
      x: 72,
      y: 248,
      show: { from: 1, to: 1 },
      arrow: [250, 248, 310, 220, 455, 255],
    },
    {
      id: "n2",
      text: "2 · 6 = 12",
      x: 88,
      y: 308,
      show: { from: 2, to: 2 },
      arrow: [250, 308, 310, 290, 445, 305],
    },
    {
      id: "n3",
      text: "sobran 3",
      x: 120,
      y: 358,
      show: { from: 3, to: 3 },
      arrow: [250, 358, 310, 340, 468, 355],
    },
    {
      id: "n4",
      text: "bajamos el 6",
      x: 100,
      y: 408,
      show: { from: 4, to: 4 },
      arrow: [250, 408, 320, 380, 515, 355],
    },
    {
      id: "n5",
      text: "6 en 36 → 6 veces",
      x: 72,
      y: 248,
      show: { from: 5, to: 5 },
      arrow: [250, 248, 310, 220, 455, 405],
    },
  ],
  liveBySub: {
    1: "¿Cuántas veces cabe 6 en 15? Dos veces. Escribimos 2 en el cociente.",
    2: "Multiplicamos: 2 por 6 igual 12. Lo escribimos bajo el 15.",
    3: "Restamos: 15 menos 12 igual 3. Sobran 3 bombones sin repartir.",
    4: "Bajamos el 6 del dividendo. Trabajamos con 36.",
    5: "¿Cuántas veces cabe 6 en 36? Seis veces. Cociente 26 y resto 0.",
  },
};

export function divisionManoLesson(dividend: number, divisor: number): DivisionManoLesson | null {
  if (dividend === 150 && divisor === 6) {
    return DIVISION_MANO_150X6;
  }
  if (dividend === 156 && divisor === 6) {
    return DIVISION_MANO_156X6;
  }
  return null;
}

export const DIVISION_CYCLE: { id: CyclePhase; label: string }[] = [
  { id: "cuantas", label: "¿Cuántas?" },
  { id: "multiplica", label: "Multiplica" },
  { id: "resta", label: "Resta" },
  { id: "baja", label: "Baja" },
];
