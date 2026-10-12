/**
 * Generador de la pizarra de división "a mano" (estilo España):
 *
 *      150 | 6
 *     -12  |----
 *      --  | 25
 *       30
 *      -30
 *      ---
 *        0
 *
 * Todo se coloca en una CUADRÍCULA (col, row), nunca en píxeles.
 * El componente convierte col/row a coordenadas SVG.
 *
 * Limitación: no soporta cocientes con ceros intermedios (306 : 3) ni
 * dividendo < divisor. En esos casos devuelve null.
 */

export type DivisionPhase = "cuantas" | "multiplica" | "resta" | "baja";

export type BoardText = {
  kind: "text";
  id: string;
  char: string;
  /** Centro de la celda, en columnas. */
  col: number;
  /** Centro de la celda, en filas. */
  row: number;
  /** Paso (0-based) desde el que es visible. */
  from: number;
  /** Último paso en que es visible (por defecto, hasta el final). */
  to?: number;
};

export type BoardLine = {
  kind: "line";
  id: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  from: number;
  to?: number;
};

export type BoardItem = BoardText | BoardLine;

export type BoardStep = {
  /** Fase del ciclo que se ilumina en los chips; null en colocar/final. */
  phase: DivisionPhase | null;
  caption: string;
  /** ids que se resaltan en ámbar: "lo que estoy usando". */
  focus: string[];
};

export type DivisionBoard = {
  items: BoardItem[];
  steps: BoardStep[];
  /** Caja que ocupa el dibujo, en unidades de cuadrícula. */
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
};

export const DIVISION_CYCLE: { id: DivisionPhase; label: string }[] = [
  { id: "cuantas", label: "¿Cuántas?" },
  { id: "multiplica", label: "Multiplica" },
  { id: "resta", label: "Resta" },
  { id: "baja", label: "Baja" },
];

export function isVisible(item: BoardItem, step: number): boolean {
  return step >= item.from && (item.to === undefined || step <= item.to);
}

export function buildDivisionBoard(dividend: number, divisor: number): DivisionBoard | null {
  if (!Number.isInteger(dividend) || !Number.isInteger(divisor) || divisor < 1 || dividend < divisor) {
    return null;
  }

  const digits = String(dividend).split("").map(Number);
  const n = digits.length;
  const divisorStr = String(divisor);
  const quotientStr = String(Math.floor(dividend / divisor));

  const items: BoardItem[] = [];
  const steps: BoardStep[] = [];
  const addStep = (step: BoardStep) => steps.push(step) - 1;

  const BAR_X = n - 0.15; // barra vertical, a la derecha del dividendo
  const SIDE = n + 0.55; // primera columna de divisor y cociente

  const divisorIds = divisorStr.split("").map((_, i) => `v${i}`);

  // ---- Paso 0: colocar ----
  addStep({
    phase: null,
    caption: `Colocamos el dividendo ${dividend} a la izquierda y el divisor ${divisor} a la derecha. El cociente irá debajo del divisor.`,
    focus: [],
  });
  digits.forEach((d, i) => items.push({ kind: "text", id: `d${i}`, char: String(d), col: i, row: 0, from: 0 }));
  divisorStr
    .split("")
    .forEach((c, i) => items.push({ kind: "text", id: `v${i}`, char: c, col: SIDE + i, row: 0, from: 0 }));
  items.push({ kind: "line", id: "bar", x1: BAR_X, x2: BAR_X, y1: -0.5, y2: 1.5, from: 0 });
  items.push({
    kind: "line",
    id: "under-divisor",
    x1: BAR_X,
    x2: SIDE + Math.max(divisorStr.length, quotientStr.length) - 0.5,
    y1: 0.5,
    y2: 0.5,
    from: 0,
  });

  // ---- Primer trozo: cifras hasta que el divisor quepa ----
  let idx = 0;
  let chunk = 0;
  while (idx < n && chunk < divisor) {
    chunk = chunk * 10 + digits[idx]!;
    idx += 1;
  }
  let chunkIds = digits.slice(0, idx).map((_, i) => `d${i}`);
  let workRow = 0;
  let qi = 0;
  const quotientIds: string[] = [];
  let lastRemIds: string[] = [];

  for (;;) {
    const q = Math.floor(chunk / divisor);
    const prod = q * divisor;
    const r = chunk - prod;
    const endCol = idx - 1;
    const prodStr = String(prod);
    const prodRow = workRow + 1;
    const remRow = workRow + 2;
    const qId = `q${qi}`;

    // 1) ¿Cuántas?
    const intro =
      qi === 0 && idx > 1
        ? `${divisor} no cabe en ${Math.floor(chunk / 10)}, así que cogemos ${chunk}. `
        : "";
    const sCuantas = addStep({
      phase: "cuantas",
      caption: `${intro}¿Cuántas veces cabe ${divisor} en ${chunk}? ${q} ${q === 1 ? "vez" : "veces"}: ${q} · ${divisor} = ${prod}, y con ${q + 1} nos pasamos (${prod + divisor}). Escribimos ${q} en el cociente.`,
      focus: [...chunkIds, ...divisorIds],
    });
    items.push({ kind: "text", id: qId, char: String(q), col: SIDE + qi, row: 1, from: sCuantas });
    quotientIds.push(qId);

    // 2) Multiplica
    const sMult = addStep({
      phase: "multiplica",
      caption: `Multiplicamos: ${q} · ${divisor} = ${prod}. Lo escribimos debajo de ${chunk}, alineado por la derecha, con un menos delante.`,
      focus: [qId, ...divisorIds],
    });
    const prodIds: string[] = [];
    prodStr.split("").forEach((c, i) => {
      const id = `p${qi}-${i}`;
      prodIds.push(id);
      items.push({
        kind: "text",
        id,
        char: c,
        col: endCol - (prodStr.length - 1) + i,
        row: prodRow,
        from: sMult,
      });
    });
    const minusId = `m${qi}`;
    prodIds.push(minusId);
    items.push({ kind: "text", id: minusId, char: "−", col: endCol - prodStr.length, row: prodRow, from: sMult });

    // 3) Resta
    const isLast = idx === n;
    const sResta = addStep({
      phase: "resta",
      caption: `Restamos: ${chunk} − ${prod} = ${r}. ${r === 0 ? "No sobra nada." : `Sobran ${r}.`}${isLast ? " Ya no quedan cifras por bajar." : ""}`,
      focus: prodIds,
    });
    items.push({
      kind: "line",
      id: `l${qi}`,
      x1: endCol - prodStr.length - 0.5,
      x2: endCol + 0.5,
      y1: prodRow + 0.5,
      y2: prodRow + 0.5,
      from: sResta,
    });
    const remStr = String(r);
    const remIds: string[] = [];
    remStr.split("").forEach((c, i) => {
      const id = `r${qi}-${i}`;
      remIds.push(id);
      items.push({
        kind: "text",
        id,
        char: c,
        col: endCol - (remStr.length - 1) + i,
        row: remRow,
        from: sResta,
      });
    });
    lastRemIds = remIds;

    if (isLast) {
      break;
    }

    // 4) Baja
    const digit = digits[idx]!;
    const nextChunk = r * 10 + digit;
    if (nextChunk < divisor) {
      return null; // cociente con cero intermedio: no soportado
    }
    const sBaja = addStep({
      phase: "baja",
      caption: `Bajamos el ${digit} del dividendo y lo ponemos junto al resto. Ahora trabajamos con ${nextChunk}.`,
      focus: [`d${idx}`],
    });
    const downId = `b${idx}`;
    items.push({ kind: "text", id: downId, char: String(digit), col: idx, row: remRow, from: sBaja });
    if (r === 0) {
      // el cero del resto no se escribe delante del número que baja
      for (const item of items) {
        if (item.kind === "text" && remIds.includes(item.id)) {
          item.to = sBaja - 1;
        }
      }
      chunkIds = [downId];
    } else {
      chunkIds = [...remIds, downId];
    }
    chunk = nextChunk;
    workRow = remRow;
    idx += 1;
    qi += 1;
  }

  // ---- Paso final ----
  const quotient = Math.floor(dividend / divisor);
  const rest = dividend % divisor;
  addStep({
    phase: null,
    caption:
      rest === 0
        ? `Cociente ${quotient} y resto 0: la división es exacta. Comprobamos: ${quotient} · ${divisor} = ${dividend}.`
        : `Cociente ${quotient} y resto ${rest}. Comprobamos: ${divisor} · ${quotient} + ${rest} = ${dividend}.`,
    focus: [...quotientIds, ...lastRemIds],
  });

  // ---- Caja que ocupa el dibujo ----
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const item of items) {
    if (item.kind === "text") {
      minX = Math.min(minX, item.col - 0.5);
      maxX = Math.max(maxX, item.col + 0.5);
      minY = Math.min(minY, item.row - 0.5);
      maxY = Math.max(maxY, item.row + 0.5);
    } else {
      minX = Math.min(minX, item.x1, item.x2);
      maxX = Math.max(maxX, item.x1, item.x2);
      minY = Math.min(minY, item.y1, item.y2);
      maxY = Math.max(maxY, item.y1, item.y2);
    }
  }

  return { items, steps, bounds: { minX, maxX, minY, maxY } };
}
