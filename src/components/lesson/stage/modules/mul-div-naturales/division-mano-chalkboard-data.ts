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

/** Layout común: viewBox 800×520, algoritmo centrado a la derecha de la columna de chips. */
const LAYOUT = {
  hookX: 368,
  topY: 122,
  bottomY: 438,
  barRightX: 548,
  digitSpacing: 52,
  x1: 388,
  yDivisor: 168,
  yQuotient: 96,
  yPartial1: 228,
  yLine1: 258,
  yRemainder1: 298,
  yPartial2: 358,
  yLine2: 388,
  yRemainder2: 418,
  divisorX: 328,
} as const;

function dividendXs() {
  const { x1, digitSpacing } = LAYOUT;
  return [x1, x1 + digitSpacing, x1 + 2 * digitSpacing] as const;
}

function build150x6(): DivisionManoLesson {
  const [x1, x2, x3] = dividendXs();
  const {
    hookX,
    topY,
    bottomY,
    barRightX,
    yDivisor,
    yQuotient,
    yPartial1,
    yLine1,
    yRemainder1,
    yPartial2,
    yLine2,
    yRemainder2,
    divisorX,
  } = LAYOUT;

  return {
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
      { id: "v", char: "6", x: divisorX, y: yDivisor, show: { from: 1 } },
      { id: "d1", char: "1", x: x1, y: yDivisor, show: { from: 1 } },
      { id: "d2", char: "5", x: x2, y: yDivisor, show: { from: 1 } },
      { id: "d3", char: "0", x: x3, y: yDivisor, show: { from: 1 } },
      { id: "q1", char: "2", x: x2, y: yQuotient, accent: true, show: { from: 1 } },
      { id: "q2", char: "5", x: x3, y: yQuotient, accent: true, show: { from: 5 } },
      { id: "p12a", char: "1", x: x1, y: yPartial1, accent: true, show: { from: 2 } },
      { id: "p12b", char: "2", x: x2, y: yPartial1, accent: true, show: { from: 2 } },
      { id: "r3", char: "3", x: x2, y: yRemainder1, accent: true, show: { from: 3 } },
      { id: "b0", char: "0", x: x3, y: yRemainder1, accent: true, show: { from: 4 } },
      { id: "p30a", char: "3", x: x2, y: yPartial2, accent: true, show: { from: 5 } },
      { id: "p30b", char: "0", x: x3, y: yPartial2, accent: true, show: { from: 5 } },
      { id: "r0", char: "0", x: x3, y: yRemainder2, accent: true, show: { from: 5 } },
    ],
    lines: [
      { id: "hook", x1: hookX, y1: topY, x2: hookX, y2: bottomY, show: { from: 1 } },
      { id: "top", x1: hookX, y1: topY, x2: barRightX, y2: topY, show: { from: 1 } },
      { id: "s1", x1: x1 - 8, y1: yLine1, x2: x3 + 8, y2: yLine1, show: { from: 2 } },
      { id: "s2", x1: x2 - 8, y1: yLine1 + 40, x2: x3 + 8, y2: yLine1 + 40, show: { from: 3 } },
      { id: "s3", x1: x2 - 8, y1: yLine2, x2: x3 + 8, y2: yLine2, show: { from: 5 } },
      { id: "s4", x1: x3 - 8, y1: yLine2 + 40, x2: x3 + 8, y2: yLine2 + 40, show: { from: 5 } },
    ],
    notes: [
      {
        id: "n1",
        text: "6 en 15 → 2 veces",
        x: 72,
        y: 248,
        show: { from: 1, to: 1 },
        arrow: [248, 248, 310, 210, x2 - 4, yDivisor + 4],
      },
      {
        id: "n2",
        text: "2 · 6 = 12",
        x: 88,
        y: 308,
        show: { from: 2, to: 2 },
        arrow: [248, 308, 320, 278, x2, yPartial1],
      },
      {
        id: "n3",
        text: "sobran 3",
        x: 120,
        y: 358,
        show: { from: 3, to: 3 },
        arrow: [248, 358, 320, 328, x2, yRemainder1],
      },
      {
        id: "n4",
        text: "bajamos el 0",
        x: 100,
        y: 408,
        show: { from: 4, to: 4 },
        arrow: [248, 408, 340, 360, x3, yRemainder1],
      },
      {
        id: "n5",
        text: "6 en 30 → 5 veces",
        x: 72,
        y: 268,
        show: { from: 5, to: 5 },
        arrow: [248, 268, 330, 300, x3, yQuotient + 8],
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
}

function build156x6(): DivisionManoLesson {
  const [x1, x2, x3] = dividendXs();
  const {
    hookX,
    topY,
    bottomY,
    barRightX,
    yDivisor,
    yQuotient,
    yPartial1,
    yLine1,
    yRemainder1,
    yPartial2,
    yLine2,
    yRemainder2,
    divisorX,
  } = LAYOUT;

  return {
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
      { id: "v", char: "6", x: divisorX, y: yDivisor, show: { from: 1 } },
      { id: "d1", char: "1", x: x1, y: yDivisor, show: { from: 1 } },
      { id: "d2", char: "5", x: x2, y: yDivisor, show: { from: 1 } },
      { id: "d3", char: "6", x: x3, y: yDivisor, show: { from: 1 } },
      { id: "q1", char: "2", x: x2, y: yQuotient, accent: true, show: { from: 1 } },
      { id: "q2", char: "6", x: x3, y: yQuotient, accent: true, show: { from: 5 } },
      { id: "p12a", char: "1", x: x1, y: yPartial1, accent: true, show: { from: 2 } },
      { id: "p12b", char: "2", x: x2, y: yPartial1, accent: true, show: { from: 2 } },
      { id: "r3", char: "3", x: x2, y: yRemainder1, accent: true, show: { from: 3 } },
      { id: "b6", char: "6", x: x3, y: yRemainder1, accent: true, show: { from: 4 } },
      { id: "p36a", char: "3", x: x2, y: yPartial2, accent: true, show: { from: 5 } },
      { id: "p36b", char: "6", x: x3, y: yPartial2, accent: true, show: { from: 5 } },
      { id: "r0", char: "0", x: x3, y: yRemainder2, accent: true, show: { from: 5 } },
    ],
    lines: [
      { id: "hook", x1: hookX, y1: topY, x2: hookX, y2: bottomY, show: { from: 1 } },
      { id: "top", x1: hookX, y1: topY, x2: barRightX, y2: topY, show: { from: 1 } },
      { id: "s1", x1: x1 - 8, y1: yLine1, x2: x3 + 8, y2: yLine1, show: { from: 2 } },
      { id: "s2", x1: x2 - 8, y1: yLine1 + 40, x2: x3 + 8, y2: yLine1 + 40, show: { from: 3 } },
      { id: "s3", x1: x2 - 8, y1: yLine2, x2: x3 + 8, y2: yLine2, show: { from: 5 } },
      { id: "s4", x1: x3 - 8, y1: yLine2 + 40, x2: x3 + 8, y2: yLine2 + 40, show: { from: 5 } },
    ],
    notes: [
      {
        id: "n1",
        text: "6 en 15 → 2 veces",
        x: 72,
        y: 248,
        show: { from: 1, to: 1 },
        arrow: [248, 248, 310, 210, x2 - 4, yDivisor + 4],
      },
      {
        id: "n2",
        text: "2 · 6 = 12",
        x: 88,
        y: 308,
        show: { from: 2, to: 2 },
        arrow: [248, 308, 320, 278, x2, yPartial1],
      },
      {
        id: "n3",
        text: "sobran 3",
        x: 120,
        y: 358,
        show: { from: 3, to: 3 },
        arrow: [248, 358, 320, 328, x2, yRemainder1],
      },
      {
        id: "n4",
        text: "bajamos el 6",
        x: 100,
        y: 408,
        show: { from: 4, to: 4 },
        arrow: [248, 408, 340, 360, x3, yRemainder1],
      },
      {
        id: "n5",
        text: "6 en 36 → 6 veces",
        x: 72,
        y: 268,
        show: { from: 5, to: 5 },
        arrow: [248, 268, 330, 300, x3, yQuotient + 8],
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
}

/** 150 ÷ 6 = 25 (exacta), alineado con el ejemplo de reparto del temario. */
export const DIVISION_MANO_150X6: DivisionManoLesson = build150x6();

/** 156 ÷ 6 = 26 (exacta), primera vuelta completa en 5 sub-pasos. */
export const DIVISION_MANO_156X6: DivisionManoLesson = build156x6();

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
