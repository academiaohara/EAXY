"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { capitalizacion, cuotaAmortizacion, round, saldoTras, tae } from "@/components/lesson/anim/finanzas1b";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const num = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi);
const pick = (v: number | undefined, allowed: readonly number[], fallback: number) =>
  allowed.includes(v as number) ? (v as number) : fallback;
const eur = (x: number) => `${fmtEs(round(x, 2), 2)} €`;
const PAGOS = [
  { value: 1, label: "Anual" },
  { value: 2, label: "Semestral" },
  { value: 4, label: "Trimestral" },
  { value: 12, label: "Mensual" },
] as const;
const ALLOWED_N = PAGOS.map((p) => p.value);

/* ───────────── Anualidades de capitalización ───────────── */

/** `initial`: [aportación, rédito anual %, años, pagos al año (1, 2, 4 o 12)]. */
export function CapitalizacionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: num(ini[0], 90, 10, 2000), r: num(ini[1], 3, 0, 8), años: Math.round(num(ini[2], 20, 1, 40)), n: pick(ini[3], ALLOWED_N, 4) };
  const [v, setV] = useState(init);
  const T = v.años * v.n;
  const C = capitalizacion(v.a, v.r, v.n, T);
  const aportado = v.a * T;
  const pts = Array.from({ length: v.años + 1 }, (_, y) => ({ y, c: capitalizacion(v.a, v.r, v.n, y * v.n), ap: v.a * y * v.n }));
  const top = Math.max(...pts.map((p) => p.c), 1);
  const bx = (y: number) => 24 + (y / v.años) * 380;
  const by = (c: number) => 150 - (c / top) * 130;
  return (
    <Frame
      hint={block.hint ?? "Cada aportación se capitaliza desde el principio de su periodo hasta el final. La curva azul es el capital; la gris, lo aportado: la diferencia son los intereses."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Aportación por periodo" value={v.a} min={10} max={2000} step={10} color={MANIM.blue} unit=" €" onChange={(a) => setV((p) => ({ ...p, a }))} format={(x) => fmtEs(x, 0)} />
          <Slider label="Rédito anual" value={v.r} min={0} max={8} step={0.5} color={MANIM.orange} unit=" %" onChange={(r) => setV((p) => ({ ...p, r }))} format={(x) => fmtEs(x, 1)} />
          <Slider label="Años" value={v.años} min={1} max={40} color={MANIM.green} onChange={(años) => setV((p) => ({ ...p, años }))} />
          <Choice label="Aportaciones" items={PAGOS} value={v.n} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Capital final" plain>
          <span data-testid="tool-cap-capital">{eur(C)}</span>
        </Stat>
        <Stat color={MANIM.muted} label="Aportado" plain>
          <span data-testid="tool-cap-aportado">{eur(aportado)}</span>
        </Stat>
        <Stat color={MANIM.green} label="Intereses" plain>
          <span data-testid="tool-cap-intereses">{eur(C - aportado)}</span>
        </Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-cap-periodos">
        {`${T} periodos al ${fmtEs(v.r / v.n, 3)} % cada uno`}
      </p>
      <Svg w={420} h={170} testId="tool-cap-grafica">
        <line x1={24} y1={150} x2={404} y2={150} stroke={MANIM.grid} strokeWidth={2} />
        <polyline points={pts.map((p) => `${bx(p.y)},${by(p.ap)}`).join(" ")} fill="none" stroke={MANIM.muted} strokeWidth={3} />
        <polyline points={pts.map((p) => `${bx(p.y)},${by(p.c)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <circle cx={bx(v.años)} cy={by(C)} r={6} fill={MANIM.yellow} />
      </Svg>
    </Frame>
  );
}

/* ───────────── Anualidades de amortización (préstamo) ───────────── */

/** `initial`: [deuda, rédito anual %, años, cuotas al año (1, 2, 4 o 12)]. */
export function PrestamoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { d: num(ini[0], 72000, 1000, 300000), r: num(ini[1], 2, 0, 8), años: Math.round(num(ini[2], 20, 1, 30)), n: pick(ini[3], ALLOWED_N, 12) };
  const [v, setV] = useState(init);
  const T = v.años * v.n;
  const a = cuotaAmortizacion(v.d, v.r, v.n, T);
  const total = a * T;
  const pts = Array.from({ length: T + 1 }, (_, k) => ({ k, s: Math.max(0, saldoTras(v.d, v.r, v.n, T, k)) }));
  const bx = (k: number) => 24 + (k / T) * 380;
  const by = (s: number) => 150 - (s / v.d) * 130;
  return (
    <Frame
      hint={block.hint ?? "Las cuotas son iguales y se pagan al final de cada periodo. Al principio casi todo son intereses; con los años, la cuota amortiza cada vez más deuda."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Deuda" value={v.d} min={1000} max={300000} step={1000} color={MANIM.blue} unit=" €" onChange={(d) => setV((p) => ({ ...p, d }))} format={(x) => fmtEs(x, 0)} />
          <Slider label="Rédito anual" value={v.r} min={0} max={8} step={0.5} color={MANIM.orange} unit=" %" onChange={(r) => setV((p) => ({ ...p, r }))} format={(x) => fmtEs(x, 1)} />
          <Slider label="Años" value={v.años} min={1} max={30} color={MANIM.green} onChange={(años) => setV((p) => ({ ...p, años }))} />
          <Choice label="Cuotas" items={PAGOS} value={v.n} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Cuota" plain>
          <span data-testid="tool-pre-cuota">{eur(a)}</span>
        </Stat>
        <Stat color={MANIM.muted} label="Total pagado" plain>
          <span data-testid="tool-pre-total">{eur(total)}</span>
        </Stat>
        <Stat color={MANIM.red} label="Intereses" plain>
          <span data-testid="tool-pre-intereses">{eur(total - v.d)}</span>
        </Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-pre-periodos">
        {`${T} cuotas al ${fmtEs(v.r / v.n, 3)} % por periodo`}
      </p>
      <Svg w={420} h={170} testId="tool-pre-grafica">
        <line x1={24} y1={150} x2={404} y2={150} stroke={MANIM.grid} strokeWidth={2} />
        <polyline points={pts.map((p) => `${bx(p.k)},${by(p.s)}`).join(" ")} fill="none" stroke={MANIM.red} strokeWidth={3.5} />
        <text x={30} y={16} fontSize={12} fill={MANIM.muted}>deuda pendiente</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── TAE ───────────── */

/** `initial`: [rédito nominal %, periodos de capitalización al año (1, 2, 4 o 12)]. */
export function TaeExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { r: num(ini[0], 2, 0.5, 12), n: pick(ini[1], ALLOWED_N, 4) };
  const [v, setV] = useState(init);
  const t = tae(v.r, v.n);
  const per = v.r / v.n;
  const maxT = tae(v.r, 12) || 1;
  return (
    <Frame
      hint={block.hint ?? "Con el mismo rédito nominal, capitalizar más veces al año da más dinero: la TAE sube. Es el rédito anual que daría el mismo montante cobrando una sola vez al año."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Rédito nominal anual" value={v.r} min={0.5} max={12} step={0.5} color={MANIM.orange} unit=" %" onChange={(r) => setV((p) => ({ ...p, r }))} format={(x) => fmtEs(x, 1)} />
          <Choice label="Capitalización" items={PAGOS} value={v.n} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="TAE" plain>
          <span data-testid="tool-tae-valor">{`${fmtEs(round(t, 3), 3)} %`}</span>
        </Stat>
        <Stat color={MANIM.muted} label="Por periodo" plain>
          <span data-testid="tool-tae-periodo">{`${fmtEs(round(per, 4), 4)} %`}</span>
        </Stat>
        <Stat color={MANIM.green} label="1 000 € en un año" plain>
          <span data-testid="tool-tae-montante">{eur(1000 * (1 + t / 100))}</span>
        </Stat>
      </Readout>
      <Svg w={420} h={150} testId="tool-tae-barras">
        {PAGOS.map((p, i) => {
          const h = (tae(v.r, p.value) / maxT) * 90;
          const on = p.value === v.n;
          return (
            <g key={p.value}>
              <rect x={30 + i * 95} y={110 - h} width={60} height={Math.max(h, 2)} rx={4} fill={on ? MANIM.yellow : MANIM.blue} fillOpacity={on ? 0.95 : 0.5} />
              <text x={60 + i * 95} y={128} fontSize={12} textAnchor="middle" fill={MANIM.muted}>{p.label}</text>
              <text x={60 + i * 95} y={104 - h} fontSize={12} textAnchor="middle" fill={MANIM.ink}>{`${fmtEs(round(tae(v.r, p.value), 3), 3)} %`}</text>
            </g>
          );
        })}
      </Svg>
    </Frame>
  );
}
