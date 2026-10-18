import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const LEFT_X = 190;
const RIGHT_X = 610;
const BEAM_Y = 110;
const PAN_Y = 300;
const BOX = 46;
const STEP = 26;
const GROUP_COLORS = [MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple];

type Kind = "intro" | "remove" | "add" | "split" | "result";

/** Posición (centro) de la bolita `i` en una cuadrícula que crece hacia arriba desde el plato. */
function slot(i: number, x0: number, cols: number) {
  return { cx: x0 + (i % cols) * STEP + STEP / 2, cy: PAN_Y - 16 - Math.floor(i / cols) * STEP };
}

/**
 * Balanza en equilibrio: resolver `a·x + b = c` (`sign: "+"`) o `x − b = c` (`sign: "-"`)
 * haciendo lo mismo en los dos platos hasta dejar la caja x sola.
 */
export function buildBalanzaEcuacion(params: { a?: number; b?: number; c?: number; sign?: "+" | "-" }): AnimBuild {
  const minus = params.sign === "-";
  const a = minus ? 1 : Math.max(1, params.a ?? 1);
  const b = Math.max(0, params.b ?? (minus ? 2 : 4));
  const c = Math.max(1, params.c ?? (minus ? 6 : 7));
  const total = minus ? c + b : c - b;
  const v = Math.max(1, Math.round(total / a));
  const ax = a > 1 ? `${a}x` : "x";

  const seq: Kind[] = ["intro"];
  if (b > 0) {
    seq.push(minus ? "add" : "remove");
  }
  if (a > 1) {
    seq.push("split");
  }
  seq.push("result");
  const at = (k: Kind) => seq.indexOf(k);

  const eq: Record<Kind, string> = {
    intro: minus ? `x − ${b} = ${c}` : b > 0 ? `${ax} + ${b} = ${c}` : `${ax} = ${c}`,
    remove: `${ax} + ${b} − ${b} = ${c} − ${b}`,
    add: `x − ${b} + ${b} = ${c} + ${b}`,
    split: `${ax} = ${total}`,
    result: `x = ${v}`,
  };
  const eqAfterAdd = `x = ${total}`;

  const captions: string[] = seq.map((k) => {
    if (k === "intro") {
      return minus
        ? `La balanza está en equilibrio: en un plato la caja **x** y un hueco de $${b}$ (lo que falta), en el otro $${c}$.`
        : `La balanza está en equilibrio: en un plato ${a > 1 ? `**${a}** cajas **x**` : "la caja **x**"}${b > 0 ? ` y $${b}$ bolitas` : ""}, en el otro $${c}$ bolitas.`;
    }
    if (k === "remove") {
      return `Quitamos $${b}$ bolitas **de los dos platos**. Si haces lo mismo a los dos lados, sigue equilibrada: $${ax} = ${c - b}$.`;
    }
    if (k === "add") {
      return `Para tapar el hueco añadimos $${b}$ bolitas **a los dos platos**: la balanza sigue equilibrada.`;
    }
    if (k === "split") {
      return `Ahora ${a} cajas pesan $${total}$. Las repartimos en ${a} grupos iguales: **una** caja pesa $${total} : ${a} = ${v}$.`;
    }
    return `La caja sola pesa $${v}$: **$x = ${v}$**.`;
  });

  return {
    label: `Balanza en equilibrio que resuelve ${eq.intro}: se hace lo mismo en los dos platos hasta obtener x = ${v}`,
    captions,
    render: (beat) => {
      const kind = seq[Math.min(beat, seq.length - 1)]!;
      const addAt = at("add");
      const removeAt = at("remove");
      const splitAt = at("split");
      const resultAt = at("result");
      const removed = removeAt >= 0 && beat >= removeAt;
      const added = addAt >= 0 && beat >= addAt;
      const cancelled = addAt >= 0 && beat > addAt;
      const split = splitAt >= 0 && beat >= splitAt;
      const done = beat >= resultAt;

      const rightCount = minus ? c + b : c;
      const rightShown = (i: number) => {
        if (done && a > 1) {
          return i < v;
        }
        if (minus) {
          return i < c || (added && i < c + b);
        }
        return removed ? i < c - b : true;
      };
      const leftX0 = LEFT_X - 130;
      const dotsX0 = leftX0 + a * (BOX + 8) + 8;
      const leftCols = Math.max(2, Math.floor((LEFT_X + 130 - dotsX0) / STEP));
      const rightX0 = RIGHT_X - 130;
      const rightCols = 9;
      const groupColor = (i: number) => (split ? GROUP_COLORS[Math.floor(i / v) % GROUP_COLORS.length]! : MANIM.yellow);

      const eqText = (() => {
        if (done) {
          return eq.result;
        }
        if (kind === "intro") {
          return eq.intro;
        }
        if (kind === "remove") {
          return eq.remove;
        }
        if (kind === "add") {
          return eq.add;
        }
        return minus && !split ? eqAfterAdd : eq.split;
      })();

      return (
        <Canvas>
          <Txt x={400} y={52} size={34} color={done ? MANIM.green : MANIM.yellow}>
            {eqText}
          </Txt>
          {/* soporte y brazo */}
          <line x1={400} y1={BEAM_Y} x2={400} y2={348} stroke={MANIM.muted} strokeWidth={6} strokeLinecap="round" />
          <rect x={350} y={344} width={100} height={12} rx={6} fill={MANIM.muted} />
          <line x1={LEFT_X - 10} y1={BEAM_Y} x2={RIGHT_X + 10} y2={BEAM_Y} stroke={MANIM.ink} strokeWidth={8} strokeLinecap="round" />
          <circle cx={400} cy={BEAM_Y} r={9} fill={MANIM.yellow} />
          {[LEFT_X, RIGHT_X].map((px) => (
            <g key={px}>
              <line x1={px} y1={BEAM_Y} x2={px - 140} y2={PAN_Y} stroke={MANIM.grid} strokeWidth={3} />
              <line x1={px} y1={BEAM_Y} x2={px + 140} y2={PAN_Y} stroke={MANIM.grid} strokeWidth={3} />
              <path d={`M ${px - 150} ${PAN_Y} H ${px + 150} Q ${px + 140} ${PAN_Y + 28} ${px} ${PAN_Y + 28} Q ${px - 140} ${PAN_Y + 28} ${px - 150} ${PAN_Y} Z`} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
            </g>
          ))}
          {/* plato izquierdo: cajas x */}
          {Array.from({ length: a }, (_, i) => (
            <Fade key={`box-${i}`} show={!(done && i > 0)} dy={-8}>
              <rect
                x={leftX0 + i * (BOX + 8)}
                y={PAN_Y - BOX}
                width={BOX}
                height={BOX}
                rx={7}
                fill={split ? GROUP_COLORS[i % GROUP_COLORS.length]! : MANIM.blue}
                fillOpacity={0.9}
                stroke={MANIM.ink}
                strokeWidth={2}
                className="anim-t"
              />
              <Txt x={leftX0 + i * (BOX + 8) + BOX / 2} y={PAN_Y - BOX / 2 + 9} size={26} color={MANIM.surface} weight={800}>
                x
              </Txt>
            </Fade>
          ))}
          {/* plato izquierdo: bolitas (suma) o huecos (resta) */}
          {Array.from({ length: b }, (_, i) => {
            const p = slot(i, dotsX0, leftCols);
            return minus ? (
              <g key={`hole-${i}`}>
                <Fade show={!cancelled} dy={-8}>
                  <circle cx={p.cx} cy={p.cy} r={11} fill="none" stroke={MANIM.red} strokeWidth={3} strokeDasharray="4 3" />
                </Fade>
                <Fade show={added && !cancelled} dy={-10}>
                  <circle cx={p.cx} cy={p.cy - STEP * Math.ceil(b / leftCols) - 6} r={11} fill={MANIM.yellow} />
                </Fade>
              </g>
            ) : (
              <Fade key={`l-${i}`} show={!removed} dy={-8}>
                <circle cx={p.cx} cy={p.cy} r={11} fill={MANIM.yellow} />
              </Fade>
            );
          })}
          {/* plato derecho */}
          {Array.from({ length: rightCount }, (_, i) => {
            const p = slot(i, rightX0, rightCols);
            const fresh = minus && i >= c;
            return (
              <Fade key={`r-${i}`} show={rightShown(i)} dy={fresh ? -14 : -8}>
                <circle cx={p.cx} cy={p.cy} r={11} fill={groupColor(i)} className="anim-t" />
              </Fade>
            );
          })}
        </Canvas>
      );
    },
  };
}
