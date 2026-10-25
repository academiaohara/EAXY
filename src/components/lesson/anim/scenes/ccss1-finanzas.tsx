import { Canvas, Fade, Txt, quadArrowHead } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmtEs } from "@/components/lesson/anim/arith";
import { cuotaAmortizacion, deudaDeCuota, round } from "@/components/lesson/anim/finanzas1b";

const clampInt = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? (v as number) : d)));
const tex = (x: number, d = 2) => fmtEs(round(x, d), d).replace(",", "{,}").replace(/ /g, "\\,");
const eur = (x: number) => `${fmtEs(round(x, 2), 2)} €`;

/** Interés simple frente a compuesto: los intereses también producen intereses. */
export function buildInteresCompuestoBarras(params: { a?: number; b?: number }): AnimBuild {
  const c0 = clampInt(params.a, 1000, 100, 100000);
  const r = clampInt(params.b, 10, 1, 30);
  const f = 1 + r / 100;
  const years = 3;
  const comp = Array.from({ length: years + 1 }, (_, k) => c0 * f ** k);
  const simp = Array.from({ length: years + 1 }, (_, k) => c0 * (1 + (r / 100) * k));
  const top = comp[years]! * 1.1;
  const X = (k: number) => 130 + k * 150;
  const H = (v: number) => (v / top) * 260;
  const base = 340;
  return {
    label: "Interés compuesto: el capital crece con sus propios intereses",
    captions: [
      `Se coloca un capital $C = ${tex(c0, 0)}$ € al $${r}\\,\\%$ anual. Si los intereses se **retiran** cada año, solo el capital inicial produce intereses.`,
      `Al acabar el primer año hay $C(1 + r) = ${tex(comp[1]!)}$ €. Si los intereses **se quedan en la cuenta**, ese será el nuevo capital: es el **interés compuesto**.`,
      `En el segundo año los intereses se calculan sobre ${tex(comp[1]!)} €, no sobre ${tex(c0, 0)} €: $M_2 = C(1 + r)^2 = ${tex(comp[2]!)}$ €. Con interés simple solo habría ${tex(simp[2]!)} €.`,
      `Tras tres años, $M_3 = C(1 + r)^3 = ${tex(comp[3]!)}$ €, frente a ${tex(simp[3]!)} € con interés simple. La diferencia crece cada año.`,
      "Con tanto por uno $r$, el montante tras $t$ periodos es $M = C(1 + r)^t$. Es una progresión geométrica de razón $1 + r$.",
    ],
    beatMs: 5200,
    render: (beat) => {
      const shown = Math.min(Math.max(beat, 0), years);
      return (
        <Canvas>
          <line x1={60} y1={base} x2={720} y2={base} stroke={MANIM.ink} strokeWidth={2.5} />
          {Array.from({ length: years + 1 }, (_, k) => {
            const on = k <= shown;
            return (
              <g key={k}>
                <Txt x={X(k) + 40} y={base + 30} size={20} color={MANIM.muted}>{k === 0 ? "inicio" : `año ${k}`}</Txt>
                <Fade show={on}>
                  {k > 0 ? <rect x={X(k) + 52} y={base - H(simp[k]!)} width={34} height={H(simp[k]!)} fill={MANIM.muted} fillOpacity={0.55} /> : null}
                  <rect x={X(k)} y={base - H(comp[k]!)} width={50} height={H(comp[k]!)} fill={MANIM.blue} fillOpacity={0.85} />
                  <Txt x={X(k) + 25} y={base - H(comp[k]!) - 10} size={20} color={MANIM.yellow}>{tex(comp[k]!, 0)}</Txt>
                </Fade>
              </g>
            );
          })}
          <Fade show={beat >= 1}>
            <rect x={560} y={46} width={22} height={14} fill={MANIM.blue} />
            <Txt x={680} y={59} size={20} color={MANIM.blue}>compuesto</Txt>
            <rect x={560} y={74} width={22} height={14} fill={MANIM.muted} />
            <Txt x={670} y={87} size={20} color={MANIM.muted}>simple</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <rect x={120} y={36} width={330} height={56} rx={12} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={285} y={74} size={30} color={MANIM.green}>M = C·(1 + r)ᵗ</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

type Pago = { k: number; from: number; to: number };

/** Dibuja la línea de tiempo con `t` años y los puntos 0…t. */
function Timeline({ t, x0, x1, y }: { t: number; x0: number; x1: number; y: number }) {
  const X = (k: number) => x0 + (k / t) * (x1 - x0);
  return (
    <g>
      <line x1={x0 - 20} y1={y} x2={x1 + 30} y2={y} stroke={MANIM.ink} strokeWidth={3} />
      {Array.from({ length: t + 1 }, (_, k) => (
        <g key={k}>
          <line x1={X(k)} y1={y - 9} x2={X(k)} y2={y + 9} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={X(k)} y={y + 36} size={20} color={MANIM.muted}>{String(k)}</Txt>
        </g>
      ))}
      <Txt x={x1 + 62} y={y + 36} size={18} color={MANIM.muted}>años</Txt>
    </g>
  );
}

function Salto({ x1, x2, y, h, color }: { x1: number; x2: number; y: number; h: number; color: string }) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <path d={`M ${x1} ${y} Q ${mid} ${y - h * 1.6} ${x2} ${y}`} fill="none" stroke={color} strokeWidth={3} />
      <polygon points={quadArrowHead(mid, y - h * 0.8, x2, y, 11)} fill={color} />
    </g>
  );
}

/** Anualidades de capitalización: cada aportación (a principio de año) crece hasta el final. */
export function buildAnualidadCapitalizacion(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = clampInt(params.a, 1000, 50, 10000);
  const r = clampInt(params.b, 5, 1, 12);
  const t = clampInt(params.c, 4, 3, 5);
  const f = 1 + r / 100;
  const x0 = 90;
  const x1 = 640;
  const X = (k: number) => x0 + (k / t) * (x1 - x0);
  const y = 300;
  const pagos: Pago[] = Array.from({ length: t }, (_, i) => ({ k: i + 1, from: i, to: t }));
  const monto = (p: Pago) => a * f ** (t - p.from);
  const total = pagos.reduce((s, p) => s + monto(p), 0);
  const formula = (a * f * (f ** t - 1)) / (f - 1);
  return {
    label: "Anualidades de capitalización: cada aportación genera su propio montante",
    captions: [
      `Se aporta $a = ${tex(a, 0)}$ € **al principio** de cada año durante $t = ${t}$ años, a un $${r}\\,\\%$ anual compuesto. Las aportaciones están en los instantes $0, 1, \\dots, ${t - 1}$.`,
      `La 1.ª aportación está en el banco los $${t}$ años: se convierte en $a(1 + r)^{${t}} = ${tex(monto(pagos[0]!))}$ €.`,
      `La 2.ª está $${t - 1}$ años: $a(1 + r)^{${t - 1}} = ${tex(monto(pagos[1]!))}$ €. Cada una queda **un año menos** que la anterior; la última solo genera un año de intereses.`,
      `El capital final es la suma de todos los montantes: $${pagos.map((p) => tex(monto(p))).join(" + ")} = ${tex(total)}$ €.`,
      `Son los términos de una progresión geométrica de razón $1 + r$, así que no hace falta sumarlos uno a uno: $C = \\dfrac{a(1 + r)\\left[(1 + r)^t - 1\\right]}{r} = ${tex(formula)}$ €.`,
    ],
    beatMs: 5600,
    render: (beat) => {
      const arcs = beat === 0 ? 0 : beat === 1 ? 1 : pagos.length;
      return (
        <Canvas>
          <Timeline t={t} x0={x0} x1={x1} y={y} />
          {pagos.map((p) => (
            <g key={p.k}>
              <circle cx={X(p.from)} cy={y} r={12} fill={MANIM.orange} />
              <Txt x={X(p.from)} y={y - 24} size={18} color={MANIM.orange}>a</Txt>
            </g>
          ))}
          {pagos.slice(0, arcs).map((p, i) => (
            <Fade key={p.k} show>
              <Salto x1={X(p.from)} x2={X(p.to) - 4} y={y - 12} h={50 + (t - 1 - i) * 30} color={i % 2 ? MANIM.blue : MANIM.green} />
              <Txt x={X(p.from) + 26} y={y - 70 - (t - 1 - i) * 36} size={18} color={i % 2 ? MANIM.blue : MANIM.green}>{`a(1+r)^${t - p.from} = ${tex(monto(p), 0)}`}</Txt>
            </Fade>
          ))}
          <Fade show={beat >= 3}>
            <rect x={X(t) - 6} y={y - 60} width={150} height={40} rx={10} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={X(t) + 69} y={y - 32} size={24} color={MANIM.yellow}>{`C = ${tex(total, 0)}`}</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <Txt x={400} y={44} size={24} color={MANIM.green}>suma de t términos de razón (1 + r)</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/** Anualidades de amortización: la deuda capitalizada iguala a las cuotas capitalizadas. */
export function buildAnualidadAmortizacion(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = clampInt(params.a, 1000, 50, 10000);
  const r = clampInt(params.b, 5, 1, 12);
  const t = clampInt(params.c, 4, 3, 5);
  const f = 1 + r / 100;
  const D = deudaDeCuota(a, r, 1, t);
  const x0 = 90;
  const x1 = 640;
  const X = (k: number) => x0 + (k / t) * (x1 - x0);
  const y = 300;
  const cuotas = Array.from({ length: t }, (_, i) => ({ k: i + 1, valor: a * f ** (t - (i + 1)) }));
  const total = cuotas.reduce((s, c) => s + c.valor, 0);
  const cuota = cuotaAmortizacion(D, r, 1, t);
  return {
    label: "Anualidades de amortización: devolver una deuda con cuotas iguales",
    captions: [
      `Se pide una deuda $D$ y se devuelve con **$${t}$ cuotas iguales $a$ al final de cada año**, a un $${r}\\,\\%$ anual compuesto.`,
      `Si no se pagara nada, la deuda crecería hasta $D(1 + r)^{${t}}$ al cabo de $${t}$ años.`,
      `Las cuotas se pagan en los instantes $1, 2, \\dots, ${t}$. La 1.ª genera intereses $${t - 1}$ años: $a(1 + r)^{${t - 1}} = ${tex(cuotas[0]!.valor)}$ €.`,
      `Cada cuota genera un año menos; la última, la del año ${t}, no genera intereses: vale $a = ${tex(a, 0)}$ €. Las cuotas suman $${tex(total)}$ € al final.`,
      `La deuda queda saldada cuando ambas cantidades coinciden: $D(1 + r)^t = a\\,\\dfrac{(1 + r)^t - 1}{r}$. Despejando, $a = \\dfrac{D\\,r\\,(1 + r)^t}{(1 + r)^t - 1}$. Aquí $D = ${tex(D)}$ € y $a = ${tex(cuota, 0)}$ €.`,
    ],
    beatMs: 5600,
    render: (beat) => {
      const cuotasVis = beat >= 2 ? cuotas.length : 0;
      return (
        <Canvas>
          <Timeline t={t} x0={x0} x1={x1} y={y} />
          <circle cx={X(0)} cy={y} r={14} fill={MANIM.red} />
          <Txt x={X(0)} y={y - 28} size={20} color={MANIM.red}>D</Txt>
          <Fade show={beat >= 1}>
            <Salto x1={X(0) + 6} x2={X(t) - 4} y={y - 14} h={170} color={MANIM.red} />
            <Txt x={(X(0) + X(t)) / 2} y={y - 280} size={22} color={MANIM.red}>{`D(1+r)^${t}`}</Txt>
          </Fade>
          {cuotas.slice(0, cuotasVis).map((c, i) => (
            <Fade key={c.k} show>
              <circle cx={X(c.k)} cy={y} r={12} fill={MANIM.green} />
              {c.k < t ? <Salto x1={X(c.k) + 4} x2={X(t) - 6} y={y - 12} h={34 + (t - 1 - c.k) * 22} color={MANIM.green} /> : null}
              <Txt x={X(c.k)} y={y - 28 - (c.k < t ? 0 : 0)} size={16} color={MANIM.green}>{c.k < t ? `a(1+r)^${t - c.k}`.replace("^1", "") : "a"}</Txt>
              <Txt x={X(c.k)} y={y + 64} size={16} color={MANIM.green}>{i < t ? tex(c.valor, 0) : ""}</Txt>
            </Fade>
          ))}
          <Fade show={beat >= 4}>
            <rect x={150} y={36} width={500} height={56} rx={12} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={400} y={74} size={26} color={MANIM.yellow}>deuda capitalizada = cuotas capitalizadas</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
