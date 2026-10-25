"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const rad = (d: number) => (d * Math.PI) / 180;

/* ───────────── 2.1 Trazados básicos: paralela, perpendicular y mediatriz ───────────── */

const TRAZADOS = ["Paralela por un punto", "Perpendicular por un punto", "Mediatriz de un segmento"] as const;

export function TrazadosBasicosExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, 2)), ang: Math.round(num(block.params?.a, 20, -35, 35)), len: Math.round(num(block.params?.b, 200, 100, 320)) };
  const [s, setS] = useState(init);
  const a = rad(s.ang);
  const u = { x: Math.cos(a), y: -Math.sin(a) };
  const nrm = { x: -u.y, y: u.x };
  const O = { x: 260, y: 225 };
  const P = { x: 330, y: 80 };
  const ext = (c: { x: number; y: number }, d: { x: number; y: number }, l: number) => ({ x1: c.x - d.x * l, y1: c.y - d.y * l, x2: c.x + d.x * l, y2: c.y + d.y * l });
  const L1 = ext(O, u, 230);
  // pie de la perpendicular desde P
  const t = (P.x - O.x) * u.x + (P.y - O.y) * u.y;
  const F = { x: O.x + u.x * t, y: O.y + u.y * t };
  const A = { x: O.x - (u.x * s.len) / 2, y: O.y - (u.y * s.len) / 2 };
  const B = { x: O.x + (u.x * s.len) / 2, y: O.y + (u.y * s.len) / 2 };
  const r = s.len * 0.62;
  const med = ext(O, nrm, 120);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Inclina la recta y mira cómo el trazado se adapta: la paralela conserva el ángulo, la perpendicular forma 90° y la mediatriz corta por la mitad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Trazado" items={TRAZADOS.map((x, i) => ({ value: i, label: x }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Inclinación de la recta" value={s.ang} min={-35} max={35} step={1} unit="°" color={MANIM.blue} onChange={(ang) => setS((x) => ({ ...x, ang }))} />
          {s.m === 2 ? <Slider label="Longitud del segmento" value={s.len} min={100} max={320} step={10} unit=" mm" color={MANIM.orange} onChange={(len) => setS((x) => ({ ...x, len }))} /> : null}
        </>
      }
    >
      <Svg w={520} h={290} testId="trazados" maxH={300}>
        {s.m === 2 ? (
          <>
            <circle cx={A.x} cy={A.y} r={r} fill="none" stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="4 5" opacity={0.6} />
            <circle cx={B.x} cy={B.y} r={r} fill="none" stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="4 5" opacity={0.6} />
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={MANIM.blue} strokeWidth={4} strokeLinecap="round" />
            <line x1={med.x1} y1={med.y1} x2={med.x2} y2={med.y2} stroke={MANIM.green} strokeWidth={3} />
            {[A, B, O].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={5} fill={MANIM.yellow} />
            ))}
            <text x={A.x - 6} y={A.y + 22} fill={MANIM.ink} fontSize={15} textAnchor="end">
              A
            </text>
            <text x={B.x + 6} y={B.y + 22} fill={MANIM.ink} fontSize={15}>
              B
            </text>
            <text x={O.x + 10} y={O.y + 20} fill={MANIM.yellow} fontSize={14}>
              punto medio
            </text>
          </>
        ) : (
          <>
            <line x1={L1.x1} y1={L1.y1} x2={L1.x2} y2={L1.y2} stroke={MANIM.blue} strokeWidth={4} />
            <circle cx={P.x} cy={P.y} r={6} fill={MANIM.yellow} />
            <text x={P.x + 10} y={P.y - 8} fill={MANIM.yellow} fontSize={15}>
              P
            </text>
            {s.m === 0 ? (
              (() => {
                const e = ext(P, u, 230);
                return <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={MANIM.green} strokeWidth={3} />;
              })()
            ) : (
              <>
                {(() => {
                  const e = ext(P, nrm, 190);
                  return <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={MANIM.green} strokeWidth={3} />;
                })()}
                <path d={`M ${F.x - u.x * 14} ${F.y - u.y * 14} L ${F.x - u.x * 14 + nrm.x * -14} ${F.y - u.y * 14 + nrm.y * -14} L ${F.x + nrm.x * -14} ${F.y + nrm.y * -14}`} fill="none" stroke={MANIM.red} strokeWidth={2.5} />
              </>
            )}
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Ángulo entre las dos rectas">
          {s.m === 0 ? "0° (paralelas)" : s.m === 1 ? "90° (perpendiculares)" : "90° y corta por la mitad"}
        </Stat>
        {s.m === 2 ? (
          <Stat color={MANIM.orange} label="Cada mitad mide">
            {f1(s.len / 2)} mm
          </Stat>
        ) : null}
      </Readout>
      <Note>
        {s.m === 0 ? "Con escuadra y cartabón: se apoya uno sobre la recta, se desliza el otro como regla y se traza la paralela por P." : s.m === 1 ? "Con escuadra: se apoya el cateto en la recta y se traza por el otro cateto, que forma un ángulo recto." : "Con compás: se abre más de la mitad del segmento, se hacen arcos desde A y desde B y se unen los dos cortes."}
      </Note>
    </Frame>
  );
}

/* ───────────── 2.2 Acotación de una pieza ───────────── */

export function AcotacionExplorador({ block }: { block: ToolBlock }) {
  const init = { L: Math.round(num(block.params?.a, 100, 40, 120)), W: Math.round(num(block.params?.b, 60, 30, 80)), d: Math.round(num(block.params?.c, 12, 6, 20)), modo: 1 };
  const [s, setS] = useState(init);
  const k = 3.2;
  const x0 = 70;
  const y0 = 50;
  const wpx = s.L * k;
  const hpx = s.W * k;
  const hx = x0 + wpx * 0.3;
  const hy = y0 + hpx / 2;
  const cota = (x1: number, y1: number, x2: number, y2: number, txt: string, color: string, vertical = false) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.6} markerStart="url(#flecha)" markerEnd="url(#flecha)" />
      <text x={(x1 + x2) / 2 + (vertical ? 8 : 0)} y={(y1 + y2) / 2 + (vertical ? 0 : -6)} fill={color} fontSize={14} textAnchor="middle" transform={vertical ? `rotate(-90 ${(x1 + x2) / 2 + 8} ${(y1 + y2) / 2})` : undefined}>
        {txt}
      </text>
    </g>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara la pieza sin acotar, bien acotada y mal acotada. Una buena acotación da cada medida una sola vez."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Representación" items={[{ value: 0, label: "Sin acotar" }, { value: 1, label: "Bien acotada" }, { value: 2, label: "Mal acotada" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label="Largo" value={s.L} min={40} max={120} step={5} unit=" mm" color={MANIM.blue} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Ancho" value={s.W} min={30} max={80} step={5} unit=" mm" color={MANIM.green} onChange={(W) => setS((x) => ({ ...x, W }))} />
          <Slider label="Diámetro del agujero" value={s.d} min={6} max={20} step={1} unit=" mm" color={MANIM.orange} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <Svg w={520} h={320} testId="acotacion" maxH={320}>
        <defs>
          <marker id="flecha" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="context-stroke" />
          </marker>
        </defs>
        <rect x={x0} y={y0} width={wpx} height={hpx} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.ink} strokeWidth={2.5} />
        <circle cx={hx} cy={hy} r={(s.d * k) / 2} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={2.5} />
        <line x1={hx - 14 - (s.d * k) / 2} y1={hy} x2={hx + 14 + (s.d * k) / 2} y2={hy} stroke={MANIM.muted} strokeWidth={1} strokeDasharray="8 3 2 3" />
        <line x1={hx} y1={hy - 14 - (s.d * k) / 2} x2={hx} y2={hy + 14 + (s.d * k) / 2} stroke={MANIM.muted} strokeWidth={1} strokeDasharray="8 3 2 3" />
        {s.modo >= 1 ? (
          <>
            <line x1={x0} y1={y0 + hpx} x2={x0} y2={y0 + hpx + 30} stroke={MANIM.muted} strokeWidth={1} />
            <line x1={x0 + wpx} y1={y0 + hpx} x2={x0 + wpx} y2={y0 + hpx + 30} stroke={MANIM.muted} strokeWidth={1} />
            {cota(x0, y0 + hpx + 24, x0 + wpx, y0 + hpx + 24, `${s.L}`, MANIM.yellow)}
            <line x1={x0 + wpx} y1={y0} x2={x0 + wpx + 30} y2={y0} stroke={MANIM.muted} strokeWidth={1} />
            <line x1={x0 + wpx} y1={y0 + hpx} x2={x0 + wpx + 30} y2={y0 + hpx} stroke={MANIM.muted} strokeWidth={1} />
            {cota(x0 + wpx + 24, y0, x0 + wpx + 24, y0 + hpx, `${s.W}`, MANIM.yellow, true)}
            <line x1={hx} y1={y0 - 6} x2={hx} y2={y0 - 24} stroke={MANIM.muted} strokeWidth={1} />
            <line x1={x0} y1={y0 - 6} x2={x0} y2={y0 - 24} stroke={MANIM.muted} strokeWidth={1} />
            {cota(x0, y0 - 20, hx, y0 - 20, `${f0((hx - x0) / k)}`, MANIM.yellow)}
            <text x={hx + (s.d * k) / 2 + 12} y={hy - (s.d * k) / 2 - 6} fill={MANIM.yellow} fontSize={14}>
              Ø {s.d}
            </text>
          </>
        ) : null}
        {s.modo === 2 ? (
          <>
            {cota(x0, y0 + hpx + 58, hx, y0 + hpx + 58, `${f0((hx - x0) / k)}`, MANIM.red)}
            {cota(hx, y0 + hpx + 58, x0 + wpx, y0 + hpx + 58, `${f0(s.L - (hx - x0) / k)}`, MANIM.red)}
            {cota(x0 + 20, y0 + 20, x0 + wpx - 20, y0 + 20, `${s.L - 8}`, MANIM.red)}
          </>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Pieza">
          {s.L} × {s.W} mm
        </Stat>
        <Stat color={s.modo === 2 ? MANIM.red : s.modo === 1 ? MANIM.green : MANIM.muted} label="Estado">
          {s.modo === 0 ? "No se puede fabricar: faltan medidas" : s.modo === 1 ? "Acotación correcta" : "Cotas repetidas y fuera de lugar"}
        </Stat>
      </Readout>
      <Note>
        {s.modo === 2 ? "En rojo, los errores: la medida total ya se obtiene sumando las parciales, así que repetirla es redundante; y una cota dibujada encima de la pieza dificulta la lectura." : "Cada cota lleva línea de cota con flechas, líneas auxiliares y el número en milímetros, sin escribir la unidad."}
      </Note>
    </Frame>
  );
}

/* ───────────── 2.3 Escalas ───────────── */

export const ESCALAS = [
  { n: "1:1", f: 1 },
  { n: "1:2", f: 1 / 2 },
  { n: "1:5", f: 1 / 5 },
  { n: "1:10", f: 1 / 10 },
  { n: "1:50", f: 1 / 50 },
  { n: "1:100", f: 1 / 100 },
  { n: "2:1", f: 2 },
  { n: "5:1", f: 5 },
] as const;

/** Longitud en el dibujo (mm) de un objeto de `real` mm a la escala `f`. */
export const enDibujo = (real: number, f: number) => real * f;

export function EscalaDibujoExplorador({ block }: { block: ToolBlock }) {
  const init = { e: Math.round(num(block.params?.n, 4, 0, ESCALAS.length - 1)), real: Math.round(num(block.params?.a, 6000, 10, 10000) / 10) * 10 };
  const [s, setS] = useState(init);
  const esc = ESCALAS[s.e]!;
  const dib = enDibujo(s.real, esc.f);
  const cabe = dib <= 297;
  const barra = clamp(dib / 297, 0.004, 1) * 100;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una escala y la medida real: ¿cabe el dibujo en una hoja A4 (297 mm de largo)?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Escala (dibujo : realidad)" items={ESCALAS.map((x, i) => ({ value: i, label: x.n }))} value={s.e} onChange={(e) => setS((x) => ({ ...x, e }))} />
          <Slider label="Medida real" value={s.real} min={10} max={10000} step={10} unit=" mm" format={f0} color={MANIM.blue} onChange={(real) => setS((x) => ({ ...x, real }))} />
        </>
      }
    >
      <div className="flex flex-col gap-2 text-sm text-[color:var(--stage-ink,#fff)]" data-testid="escala-barras">
        <span className="text-[color:var(--stage-muted,#b8c2d0)]">Ancho de una hoja A4 apaisada (297 mm)</span>
        <div className="h-8 w-full overflow-hidden rounded border border-[color:var(--stage-border,#3d4f66)] bg-white/5">
          <div className="anim-t flex h-full items-center justify-end pr-1 text-xs font-bold" style={{ width: `${barra}%`, background: cabe ? MANIM.green : MANIM.red, color: MANIM.surface }}>
            {barra > 14 ? `${f1(dib)} mm` : ""}
          </div>
        </div>
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="Medida real">
          {f0(s.real)} mm
        </Stat>
        <Stat color={MANIM.yellow} label="En el dibujo">
          {fmtEs(dib, 2)} mm
        </Stat>
        <Stat color={cabe ? MANIM.green : MANIM.red} label="En un A4">
          {cabe ? "Cabe" : "No cabe: usa otra escala"}
        </Stat>
      </Readout>
      <Note>
        {esc.f < 1 ? `Escala de reducción: el objeto real es ${f0(1 / esc.f)} veces más grande que su dibujo.` : esc.f > 1 ? `Escala de ampliación: el dibujo es ${f0(esc.f)} veces más grande que la pieza real (útil para piezas pequeñas).` : "Escala natural: el dibujo mide lo mismo que el objeto."}
      </Note>
    </Frame>
  );
}

/* ───────────── 2.4 Vistas de una pieza hecha con cubos ───────────── */

type Alturas = number[]; // 3×3, índice y*3 + x, valores 0–3
const PIEZAS: { n: string; h: Alturas }[] = [
  { n: "Pieza en L", h: [2, 2, 2, 1, 0, 0, 1, 0, 0] },
  { n: "Escalera", h: [1, 2, 3, 1, 2, 3, 1, 2, 3] },
  { n: "Torre con base", h: [1, 1, 1, 1, 3, 1, 1, 1, 1] },
];

/** Casillas ocupadas en cada vista: alzado (x,z), planta (x,y) y perfil izquierdo (y invertida, z). */
export function vistasDe(h: Alturas) {
  const alzado = new Set<string>();
  const planta = new Set<string>();
  const perfil = new Set<string>();
  for (let y = 0; y < 3; y += 1) {
    for (let x = 0; x < 3; x += 1) {
      const n = h[y * 3 + x] ?? 0;
      if (n > 0) planta.add(`${x},${y}`);
      for (let z = 0; z < n; z += 1) {
        alzado.add(`${x},${z}`);
        perfil.add(`${2 - y},${z}`);
      }
    }
  }
  return { alzado, planta, perfil };
}

function CuadriculaVista({ cells, rows, color, titulo }: { cells: Set<string>; rows: number; color: string; titulo: string }) {
  const c = 26;
  const w = 3 * c;
  const hh = rows * c;
  return (
    <div className="flex flex-col items-center gap-1" data-testid={`vista-${titulo.toLowerCase()}`}>
      <svg viewBox={`-2 -2 ${w + 4} ${hh + 4}`} width={w + 4} height={hh + 4} aria-hidden focusable="false">
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: 3 }, (_, q) => {
            const key = `${q},${rows - 1 - r}`;
            const on = cells.has(key);
            return <rect key={`${r}${q}`} x={q * c} y={r * c} width={c} height={c} fill={on ? color : "none"} fillOpacity={0.55} stroke={on ? MANIM.ink : MANIM.grid} strokeWidth={on ? 1.6 : 1} />;
          }),
        )}
      </svg>
      <span className="text-sm font-bold" style={{ color }}>
        {titulo}
      </span>
    </div>
  );
}

function Iso({ h }: { h: Alturas }) {
  const u = 26;
  const cx = 170;
  const cy = 190;
  const P = (x: number, y: number, z: number) => [cx + (x - y) * u * 0.866, cy - (x + y) * u * 0.5 - z * u] as const;
  const poly = (pts: (readonly [number, number])[], fill: string) => <polygon points={pts.map((p) => p.join(",")).join(" ")} fill={fill} stroke={MANIM.surface} strokeWidth={1.5} />;
  const cubes: [number, number, number][] = [];
  for (let y = 0; y < 3; y += 1) for (let x = 0; x < 3; x += 1) for (let z = 0; z < (h[y * 3 + x] ?? 0); z += 1) cubes.push([x, y, z]);
  cubes.sort((a, b) => b[0] + b[1] - (a[0] + a[1]) || a[2] - b[2]);
  return (
    <svg viewBox="0 0 340 250" className="mx-auto block h-auto w-full max-w-[320px]" aria-hidden focusable="false" data-testid="vistas-iso">
      {cubes.map(([x, y, z]) => (
        <g key={`${x}${y}${z}`}>
          {poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], MANIM.blue)}
          {poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], MANIM.green)}
          {poly([P(x, y, z), P(x, y + 1, z), P(x, y + 1, z + 1), P(x, y, z + 1)], MANIM.orange)}
        </g>
      ))}
    </svg>
  );
}

export function VistasPiezaExplorador({ block }: { block: ToolBlock }) {
  const init = { h: PIEZAS[Math.round(num(block.params?.n, 0, 0, PIEZAS.length - 1))]!.h };
  const [s, setS] = useState(init);
  const v = vistasDe(s.h);
  const total = s.h.reduce((a, b) => a + b, 0);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa una casilla de la planta para añadir cubos (hasta 3) y mira cómo cambian el alzado, la planta y el perfil."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Piezas de ejemplo">
          {PIEZAS.map((p) => (
            <button key={p.n} type="button" className={TOOL_BTN} onClick={() => setS({ h: p.h })}>
              {p.n}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Iso h={s.h} />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="grid grid-cols-3 gap-1" role="group" aria-label="Alturas de la pieza (vista desde arriba, la fila de abajo es la de delante)">
              {[2, 1, 0].flatMap((y) =>
                [0, 1, 2].map((x) => (
                  <button key={`${x}${y}`} type="button" aria-label={`Casilla ${x + 1}-${y + 1}: ${s.h[y * 3 + x]} cubos`} className={`${TOOL_BTN} h-10 w-10 !px-0 tabular-nums`} onClick={() => setS((a) => ({ h: a.h.map((n, i) => (i === y * 3 + x ? (n + 1) % 4 : n)) }))}>
                    {s.h[y * 3 + x]}
                  </button>
                )),
              )}
            </div>
            <span className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">cubos por casilla (delante, abajo)</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-center gap-6">
        <CuadriculaVista cells={v.alzado} rows={3} color={MANIM.green} titulo="Alzado" />
        <CuadriculaVista cells={v.planta} rows={3} color={MANIM.blue} titulo="Planta" />
        <CuadriculaVista cells={v.perfil} rows={3} color={MANIM.orange} titulo="Perfil" />
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Cubos de la pieza">
          {total}
        </Stat>
        <Stat color={MANIM.green} label="Casillas del alzado">
          {v.alzado.size}
        </Stat>
        <Stat color={MANIM.blue} label="Casillas de la planta">
          {v.planta.size}
        </Stat>
      </Readout>
      <Note>El alzado se ve desde delante (cara verde), la planta desde arriba (cara azul) y el perfil desde la izquierda (cara naranja). Las tres vistas dibujan la misma pieza.</Note>
    </Frame>
  );
}

/* ───────────── 2.5 Perspectiva caballera frente a isométrica ───────────── */

export function PerspectivaExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), L: Math.round(num(block.params?.a, 60, 20, 80)), H: Math.round(num(block.params?.b, 40, 20, 60)), D: Math.round(num(block.params?.c, 50, 20, 80)), ang: 45 };
  const [s, setS] = useState(init);
  const k = 2.3;
  const cab = s.modo === 0;
  const P = (l: number, h: number, d: number) =>
    cab
      ? { x: 90 + l * k + d * 0.5 * k * Math.cos(rad(s.ang)), y: 230 - h * k - d * 0.5 * k * Math.sin(rad(s.ang)) }
      : { x: 260 + (l - d) * k * 0.866, y: 235 - h * k - (l + d) * k * 0.5 };
  const pts = (arr: [number, number, number][]) => arr.map(([l, h, d]) => `${P(l, h, d).x},${P(l, h, d).y}`).join(" ");
  const { L, H, D } = s;
  const proy = cab ? D * 0.5 : D;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En la caballera la cara frontal se dibuja en verdadera magnitud y el fondo se reduce a la mitad. En la isométrica todo se dibuja con la misma escala a 30°."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Perspectiva" items={[{ value: 0, label: "Caballera" }, { value: 1, label: "Isométrica" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label="Largo" value={s.L} min={20} max={80} step={5} unit=" mm" color={MANIM.blue} onChange={(L2) => setS((x) => ({ ...x, L: L2 }))} />
          <Slider label="Alto" value={s.H} min={20} max={60} step={5} unit=" mm" color={MANIM.green} onChange={(H2) => setS((x) => ({ ...x, H: H2 }))} />
          <Slider label="Fondo" value={s.D} min={20} max={80} step={5} unit=" mm" color={MANIM.orange} onChange={(D2) => setS((x) => ({ ...x, D: D2 }))} />
          {cab ? <Slider label="Ángulo del fondo" value={s.ang} min={30} max={60} step={15} unit="°" color={MANIM.yellow} onChange={(ang) => setS((x) => ({ ...x, ang }))} /> : null}
        </>
      }
    >
      <Svg w={520} h={290} testId="perspectiva" maxH={290}>
        {/* cara superior */}
        <polygon points={pts([[0, H, 0], [L, H, 0], [L, H, D], [0, H, D]])} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.ink} strokeWidth={2} />
        {/* cara lateral: derecha en caballera, izquierda en isométrica */}
        {cab ? (
          <polygon points={pts([[L, 0, 0], [L, 0, D], [L, H, D], [L, H, 0]])} fill={MANIM.orange} fillOpacity={0.35} stroke={MANIM.ink} strokeWidth={2} />
        ) : (
          <polygon points={pts([[0, 0, 0], [0, 0, D], [0, H, D], [0, H, 0]])} fill={MANIM.orange} fillOpacity={0.35} stroke={MANIM.ink} strokeWidth={2} />
        )}
        {/* cara frontal */}
        <polygon points={pts([[0, 0, 0], [L, 0, 0], [L, H, 0], [0, H, 0]])} fill={MANIM.green} fillOpacity={0.35} stroke={MANIM.ink} strokeWidth={2} />
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Fondo real">
          {s.D} mm
        </Stat>
        <Stat color={MANIM.yellow} label="Fondo dibujado">
          {f1(proy)} mm {cab ? "(×0,5)" : "(×1)"}
        </Stat>
        <Stat color={MANIM.green} label="Cara frontal">
          {cab ? "Verdadera magnitud" : "Deformada (inclinada)"}
        </Stat>
      </Readout>
      <Note>{cab ? "La caballera es rápida de dibujar porque el frente no se deforma. El coeficiente de reducción de 0,5 evita que el fondo parezca demasiado largo." : "La isométrica reparte las tres dimensiones por igual: parece más natural, pero ninguna cara conserva su forma exacta."}</Note>
    </Frame>
  );
}
