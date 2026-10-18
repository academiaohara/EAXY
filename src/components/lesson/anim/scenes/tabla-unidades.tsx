import { Canvas, Fade, Move, Txt, quadArrowHead } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { parseDec } from "@/components/lesson/anim/decimal";
import {
  UNIT_COLS,
  UNIT_WIDTH,
  groupDec,
  groupTex,
  unitIndex,
  unitTex,
  type UnitFamily,
} from "@/components/lesson/anim/units";

const PAD = 2;
const AGRARIAN: Record<number, string> = { 1: "ha", 2: "a", 3: "ca" };

export type TablaUnidadesParams = {
  units?: UnitFamily;
  dec?: string;
  from?: string;
  to?: string;
  /** Cantidad compleja («3 dam», «8 m», «7 cm»): cada parte va en su columna. */
  parts?: string[];
};

type Layout = {
  family: UnitFamily;
  w: number;
  cells: number;
  cw: number;
  x0: number;
  /** Celda en la que empieza la columna `c` de la tabla. */
  colStart: (c: number) => number;
  /** Frontera (entre celdas) justo a la derecha de la columna `c`: ahí va la coma. */
  boundary: (c: number) => number;
};

function layoutFor(family: UnitFamily): Layout {
  const w = UNIT_WIDTH[family];
  const cells = 7 * w + PAD * 2;
  const cw = w === 1 ? 68 : 42;
  const x0 = (800 - cells * cw) / 2;
  return {
    family,
    w,
    cells,
    cw,
    x0,
    colStart: (c) => PAD + c * w,
    boundary: (c) => PAD + (c + 1) * w,
  };
}

/** Cifras de una cantidad con coma, colocadas alrededor de la frontera `b` (cada cifra en su celda). */
export function digitCells(dec: string, b: number): Map<number, string> {
  const { int, frac } = parseDec(dec);
  const cells = new Map<number, string>();
  [...int].forEach((d, i) => cells.set(b - int.length + i, d));
  [...frac].forEach((d, i) => cells.set(b + i, d));
  return cells;
}

/** Lee las celdas como número con coma en la frontera `b` (celdas vacías = 0). */
export function cellsToText(cells: Map<number, string>, b: number): string {
  const idx = [...cells.keys()];
  const lo = Math.min(b - 1, ...idx);
  const hi = Math.max(b - 1, ...idx);
  let int = "";
  let frac = "";
  for (let c = lo; c <= hi; c += 1) {
    const d = cells.get(c) ?? "0";
    if (c < b) int += d;
    else frac += d;
  }
  int = int.replace(/^0+(?=\d)/, "") || "0";
  frac = frac.replace(/0+$/, "");
  return frac ? `${int},${frac}` : int;
}

/** «3 dam» → { col, value }. */
function parsePart(family: UnitFamily, part: string): { col: number; value: string } {
  const [value = "0", ...unit] = part.trim().split(/\s+/);
  return { value, col: unitIndex(family, unit.join(" ")) };
}

/**
 * Tabla de múltiplos y submúltiplos: cambiar de unidad es mover la coma por las columnas.
 * Tres modos: `from`+`to` (cambio de unidad), `parts`+`to` (compleja → incompleja) y
 * `dec`+`from` sin `to` (incompleja → compleja).
 */
export function buildTablaUnidades(params: TablaUnidadesParams): AnimBuild {
  const family = params.units ?? "m";
  const L = layoutFor(family);
  const names = UNIT_COLS[family];
  const sq = family === "m2";
  const mode: "convert" | "compose" | "decompose" = params.parts ? "compose" : params.to ? "convert" : "decompose";

  // --- datos del caso ---
  const dec = params.dec ?? "15";
  const fromCol = params.from ? unitIndex(family, params.from) : 3;
  const toCol = params.to ? unitIndex(family, params.to) : fromCol;
  const parts = (params.parts ?? []).map((p) => parsePart(family, p));
  const b0 = L.boundary(fromCol);
  const b1 = L.boundary(toCol);

  const original = new Map<number, string>();
  const bFinal = mode === "compose" ? b1 : b1;
  if (mode === "compose") {
    for (const p of parts) {
      const end = L.boundary(p.col);
      const digits = p.value.padStart(L.w, "0");
      [...digits].forEach((d, i) => original.set(end - digits.length + i, d));
    }
  } else {
    for (const [c, d] of digitCells(dec, b0)) original.set(c, d);
  }

  const lo = Math.min(...original.keys());
  const hi = Math.max(...original.keys());
  const finalLo = Math.min(lo, bFinal - 1);
  const finalHi = Math.max(hi, bFinal - 1);
  if (finalLo < 0 || finalHi >= L.cells) {
    throw new Error(`La cantidad no cabe en la tabla (${dec} ${params.from ?? ""})`);
  }

  const resultCells = new Map(original);
  const answer = mode === "decompose" ? "" : cellsToText(resultCells, bFinal);

  // --- textos ---
  const fromTex = unitTex(family, fromCol);
  const toTex = unitTex(family, toCol);
  const jumps = Math.abs(toCol - fromCol);
  const places = jumps * L.w;
  const goRight = toCol > fromCol;
  const decTex = groupTex(dec);

  const complex = (() => {
    if (mode !== "decompose") return "";
    const out: string[] = [];
    for (let c = 0; c < 7; c += 1) {
      const start = L.colStart(c);
      let v = "";
      for (let k = 0; k < L.w; k += 1) v += original.get(start + k) ?? "0";
      const n = c === 0 ? cellsToTextInt(original, start + L.w) : String(Number(v));
      if (Number(n) > 0) out.push(`${n}\\,${unitTex(family, c)}`);
    }
    return out.join("\\ ");
  })();

  let captions: string[];
  let label: string;
  if (mode === "convert") {
    label = `${groupDec(dec)} ${names[fromCol]} = ${groupDec(answer)} ${names[toCol]}`;
    const move = jumps === 0 ? "" : goRight ? "a la derecha" : "a la izquierda";
    const why = goRight
      ? "La unidad es más pequeña: caben más, el número crece."
      : "La unidad es mayor: hacen falta menos, el número disminuye.";
    captions = [
      `Pasar $${decTex}\\,${fromTex}$ a $${toTex}$. Cada unidad tiene su columna en la tabla.`,
      `Las unidades de la cantidad van en la columna de $${fromTex}$; la coma queda **justo a su derecha**.`,
      sq
        ? `De $${fromTex}$ a $${toTex}$ hay **${jumps} salto${jumps > 1 ? "s" : ""}** ${move}. Cada salto son **2 cifras**: la coma se mueve **${places} lugares**.`
        : `De $${fromTex}$ a $${toTex}$ hay **${jumps} salto${jumps > 1 ? "s" : ""}** ${move}: la coma se mueve **${places} lugar${places > 1 ? "es" : ""}**.`,
      `${why} Los huecos se rellenan con ceros: $${decTex}\\,${fromTex} = ${groupTex(answer)}\\,${toTex}$.`,
    ];
  } else if (mode === "compose") {
    const joined = parts.map((p) => `${p.value}\\,${unitTex(family, p.col)}`).join("\\ ");
    label = `${params.parts!.join(" ")} = ${groupDec(answer)} ${names[toCol]}`;
    captions = [
      `Pasar $${joined}$ a $${toTex}$ (forma incompleja). Cada parte tiene su columna.`,
      sq
        ? `Cada parte se escribe en **su columna**; en superficie cada columna ocupa **dos cifras** ($8 \\to 08$).`
        : `Cada parte se escribe en **su columna**, de modo que las cifras ocupan **un hueco por unidad**.`,
      `Las columnas vacías se rellenan con **ceros** y la coma se coloca a la derecha de $${toTex}$.`,
      `Se lee el número de corrido: $${joined} = ${groupTex(answer)}\\,${toTex}$.`,
    ];
  } else {
    label = `${dec} ${names[fromCol]} en forma compleja`;
    captions = [
      `Pasar $${decTex}\\,${fromTex}$ a forma compleja (varias unidades). Cada unidad tiene su columna.`,
      `Se coloca la cantidad con la coma a la derecha de $${fromTex}$.`,
      `Cada columna con cifras es una parte de la cantidad: $${decTex}\\,${fromTex} = ${complex}$.`,
    ];
  }

  const colX = (c: number) => L.x0 + L.colStart(c) * L.cw;
  const cellX = (cell: number) => L.x0 + cell * L.cw + L.cw / 2;
  const boundaryX = (b: number) => L.x0 + b * L.cw;
  const HEAD_Y = 118;
  const ROW_Y = 160;
  const ROW_H = 84;
  const digitSize = L.w === 1 ? 44 : 34;

  const beats = captions.length;

  return {
    label,
    captions,
    beatMs: 3600,
    render: (beat) => {
      // qué celdas se ven en este paso
      const showDigits = beat >= 1;
      const finished = mode === "decompose" ? beat >= 2 : beat >= 3;
      const zerosAt = mode === "compose" ? beat >= 2 : finished;
      const commaBeat = mode === "convert" ? (beat >= 3 ? b1 : b0) : mode === "compose" ? b1 : b0;
      const commaShown = mode === "compose" ? beat >= 2 : showDigits;
      const arcsShown = mode === "convert" && beat >= 2 && jumps > 0;

      const cellList: { cell: number; digit: string; added: boolean; show: boolean }[] = [];
      for (let c = finalLo; c <= finalHi; c += 1) {
        const orig = original.get(c);
        cellList.push({
          cell: c,
          digit: orig ?? "0",
          added: orig === undefined,
          show: orig !== undefined ? showDigits : zerosAt,
        });
      }

      return (
        <Canvas>
          {/* cabecera de la tabla */}
          {names.map((n, c) => {
            const x = colX(c);
            const w = L.w * L.cw;
            const isFrom = c === fromCol && mode !== "compose";
            const isTo = c === toCol && mode !== "decompose" && beat >= 2;
            const color = isTo ? MANIM.green : isFrom && beat >= 1 ? MANIM.blue : MANIM.ink;
            return (
              <g key={n}>
                <rect x={x} y={HEAD_Y - 38} width={w} height={44} fill={MANIM.panel} stroke={MANIM.grid} strokeWidth={2} />
                <Txt x={x + w / 2} y={HEAD_Y - 8} size={sq ? 22 : 26} color={color}>
                  {n}
                </Txt>
                {sq && AGRARIAN[c] ? (
                  <Txt x={x + w / 2} y={ROW_Y + ROW_H + 54} size={17} color={MANIM.orange} weight={500}>
                    {AGRARIAN[c]}
                  </Txt>
                ) : null}
                <rect x={x} y={ROW_Y - 8} width={w} height={ROW_H} fill="rgba(255,255,255,0.03)" stroke={MANIM.grid} strokeWidth={2} />
              </g>
            );
          })}
          {/* separaciones de las cifras dentro de cada columna de superficie */}
          {sq
            ? Array.from({ length: 7 }, (_, c) => (
                <line key={c} x1={colX(c) + L.cw} y1={ROW_Y - 8} x2={colX(c) + L.cw} y2={ROW_Y - 8 + ROW_H} stroke={MANIM.grid} strokeWidth={1.5} strokeDasharray="4 5" />
              ))
            : null}

          {/* saltos entre columnas */}
          {Array.from({ length: jumps }, (_, i) => {
            const a = goRight ? fromCol + i : fromCol - i;
            const z = goRight ? a + 1 : a - 1;
            const x1 = colX(a) + (L.w * L.cw) / 2;
            const x2 = colX(z) + (L.w * L.cw) / 2;
            const mid = (x1 + x2) / 2;
            return (
              <Fade key={i} show={arcsShown} dy={6} delay={i * 220}>
                <path d={`M ${x1} ${HEAD_Y - 46} Q ${mid} ${HEAD_Y - 94} ${x2} ${HEAD_Y - 46}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} strokeLinecap="round" />
                <polygon points={quadArrowHead(mid, HEAD_Y - 94, x2, HEAD_Y - 46)} fill={MANIM.yellow} strokeLinejoin="round" />
              </Fade>
            );
          })}
          <Fade show={arcsShown} dy={4}>
            <Txt x={400} y={32} size={22} color={MANIM.yellow}>
              {sq
                ? `${jumps} salto${jumps > 1 ? "s" : ""} × 2 cifras = ${places} lugares`
                : `${jumps} salto${jumps > 1 ? "s" : ""}`}
            </Txt>
          </Fade>

          {/* cifras */}
          {cellList.map(({ cell, digit, added, show }) => (
            <Fade key={cell} show={show} dy={-10} delay={mode === "compose" ? (cell % 7) * 90 : 0}>
              <Txt x={cellX(cell)} y={ROW_Y + 46} size={digitSize} color={added ? MANIM.yellow : MANIM.ink} mono>
                {digit}
              </Txt>
            </Fade>
          ))}

          {/* coma */}
          <Move x={boundaryX(commaBeat)} y={0}>
            <Fade show={commaShown} dy={-8}>
              <rect x={-3} y={ROW_Y - 10} width={6} height={ROW_H + 4} rx={3} fill={MANIM.red} fillOpacity={0.9} />
              <Txt x={0} y={ROW_Y + ROW_H + 22} size={22} color={MANIM.red}>
                coma
              </Txt>
            </Fade>
          </Move>

          {/* resultado */}
          <Fade show={mode === "decompose" ? finished : beat >= beats - 1} dy={8}>
            {mode === "decompose" ? (
              <>
                {Array.from({ length: 7 }, (_, c) => {
                  const start = L.colStart(c);
                  const has = Array.from({ length: L.w }, (_, k) => original.get(start + k)).some((d) => d && d !== "0") || (c === 0 && hasLeft(original, start));
                  return has ? (
                    <rect key={c} x={colX(c) + 2} y={ROW_Y - 6} width={L.w * L.cw - 4} height={ROW_H - 4} rx={8} fill="none" stroke={MANIM.green} strokeWidth={3} />
                  ) : null;
                })}
              </>
            ) : null}
          </Fade>
          <Fade show={mode === "decompose" ? finished : beat >= beats - 1} dy={8}>
            <Txt x={400} y={ROW_Y + ROW_H + 86} size={34} color={MANIM.yellow}>
              {mode === "decompose" ? complexText(original, L, family) : `= ${groupDec(answer)} ${names[toCol]}`}
            </Txt>
          </Fade>
          <Fade show={beat === 0} dy={6}>
            <Txt x={400} y={ROW_Y + ROW_H + 86} size={30} color={MANIM.muted} weight={500}>
              {mode === "compose"
                ? `${params.parts!.join("  ")}  →  ${names[toCol]}`
                : mode === "convert"
                  ? `${groupDec(dec)} ${names[fromCol]}  →  ${names[toCol]}`
                  : `${groupDec(dec)} ${names[fromCol]}  →  forma compleja`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/** Parte entera (como número) de las celdas que quedan antes de la frontera `b`. */
function cellsToTextInt(cells: Map<number, string>, b: number): string {
  const idx = [...cells.keys()].filter((c) => c < b);
  if (idx.length === 0) return "0";
  const lo = Math.min(...idx);
  let s = "";
  for (let c = lo; c < b; c += 1) s += cells.get(c) ?? "0";
  return String(Number(s));
}

function hasLeft(cells: Map<number, string>, start: number): boolean {
  return [...cells.entries()].some(([c, d]) => c < start && d !== "0");
}

/** Texto plano de la forma compleja: «1 km 2 hm 6 m». */
function complexText(cells: Map<number, string>, L: Layout, family: UnitFamily): string {
  const out: string[] = [];
  for (let c = 0; c < 7; c += 1) {
    const start = L.colStart(c);
    const n = c === 0 ? cellsToTextInt(cells, start + L.w) : String(Number(Array.from({ length: L.w }, (_, k) => cells.get(start + k) ?? "0").join("")));
    if (Number(n) > 0) out.push(`${n} ${UNIT_COLS[family][c]}`);
  }
  return `= ${out.join(" ")}`;
}
