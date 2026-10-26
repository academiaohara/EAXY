"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Proyecciones de una pieza de torres de cubos 3 × 3: alzado (por columna), perfil izquierdo (por fila, de delante a atrás) y planta. */
export function proyecciones(h: readonly number[]) {
  const alzado = [0, 1, 2].map((c) => Math.max(h[c]!, h[3 + c]!, h[6 + c]!));
  const perfil = [0, 1, 2].map((r) => Math.max(h[r * 3]!, h[r * 3 + 1]!, h[r * 3 + 2]!));
  const planta = h.map((v) => v > 0);
  return { alzado, perfil, planta, cubos: h.reduce((a, b) => a + b, 0) };
}

export const ESCALAS_DIB = [
  { txt: "1:1", f: 1 },
  { txt: "1:2", f: 1 / 2 },
  { txt: "1:5", f: 1 / 5 },
  { txt: "1:10", f: 1 / 10 },
  { txt: "1:20", f: 1 / 20 },
  { txt: "1:50", f: 1 / 50 },
  { txt: "1:100", f: 1 / 100 },
  { txt: "2:1", f: 2 },
  { txt: "5:1", f: 5 },
] as const;

export const aDibujo = (realMm: number, f: number) => realMm * f;
export const aReal = (dibujoMm: number, f: number) => (f > 0 ? dibujoMm / f : Infinity);

/** Escala de reducción normalizada más grande con la que un objeto de `realMm` cabe en `papelMm` de papel. */
export function escalaQueCabe(realMm: number, papelMm = 277) {
  return ESCALAS_DIB.slice(0, 7).find((e) => aDibujo(realMm, e.f) <= papelMm) ?? null;
}

/** Área real (m²) de una habitación dibujada con `wMm` × `hMm` milímetros a escala 1:`n`. */
export const areaRealM2 = (wMm: number, hMm: number, n: number) => (wMm * n * (hMm * n)) / 1e6;

export type OpCad = "agujero" | "esquinas" | "matriz";
/** Área de material (mm²) de una placa de 120 × 70 mm con las operaciones aplicadas. */
export function areaPlaca(ops: readonly OpCad[]) {
  let a = 120 * 70;
  if (ops.includes("agujero")) a -= Math.PI * 8 ** 2;
  if (ops.includes("esquinas")) a -= (4 - Math.PI) * 10 ** 2;
  if (ops.includes("matriz")) a -= 4 * Math.PI * 3 ** 2;
  return a;
}

/** Volumen (mm³) de un prisma con un taladro cilíndrico de diámetro `d` y profundidad `prof` mm. */
export const volumenSolido = (L: number, A: number, H: number, d: number, prof: number) => L * A * H - Math.PI * (d / 2) ** 2 * Math.min(H, prof);
export const masaGramos = (volMm3: number, densidad: number) => (volMm3 / 1000) * densidad;

export const ELEMENTOS_LAMINA = ["Marco y márgenes", "Cajetín con título y nombre", "Vistas normalizadas", "Cotas completas", "Escala indicada", "Lista de piezas", "Unidades indicadas (mm)"] as const;
export const puntuacionLamina = (on: readonly boolean[]) => ({ n: on.filter(Boolean).length, falta: ELEMENTOS_LAMINA.filter((_, i) => !on[i]) });

/* ───────────── 1. Vistas de una pieza ───────────── */

const CS = 26;

export function PiezaVistasExplorador({ block }: { block: ToolBlock }) {
  const base = [2, 1, 1, 2, 1, 1, 1, 1, 1];
  const init = { h: base.map((v, i) => (block.params?.n === 1 ? (i === 0 ? 3 : 1) : v)) };
  const [s, setS] = useState(init);
  const p = proyecciones(s.h);
  const ciclo = (i: number) => setS((x) => ({ h: x.h.map((v, k) => (k === i ? (v + 1) % 4 : v)) }));
  // isométrica: x a la derecha, y (fila) hacia el fondo; se ven las caras superior, frontal e izquierda
  const iso = (x: number, y: number, z: number) => [380 + (x - y) * 17.4, 175 - (x + y) * 10 - z * 20] as const;
  const cells: { c: number; r: number; z: number }[] = [];
  for (let r = 0; r < 3; r += 1) for (let c = 0; c < 3; c += 1) for (let z = 0; z < s.h[r * 3 + c]!; z += 1) cells.push({ c, r, z });
  cells.sort((a, b) => b.c + b.r - (a.c + a.r) || a.z - b.z);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa una casilla para cambiar la altura de su torre (0 a 3 cubos). Las vistas del sistema europeo se calculan solas."}
      onReset={() => setS(init)}
      controls={
        <div className="sm:col-span-2">
          <div className="mb-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">Alturas (fila de delante abajo)</div>
          <div className="inline-grid grid-cols-3 gap-1" role="group" aria-label="Alturas de las torres">
            {[2, 1, 0].flatMap((r) => [0, 1, 2].map((c) => ({ r, c }))).map(({ r, c }) => (
              <button key={`${r}${c}`} type="button" className={TOOL_BTN} aria-label={`Fila ${r + 1}, columna ${c + 1}: ${s.h[r * 3 + c]} cubos`} onClick={() => ciclo(r * 3 + c)}>
                {s.h[r * 3 + c]}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <Svg w={520} h={256} testId="pieza-vistas" maxH={270}>
        {cells.map((q, i) => {
          const { c, r, z } = q;
          const pts = (a: readonly (readonly number[])[]) => a.map((v) => v.join(",")).join(" ");
          return (
            <g key={i} stroke={MANIM.surface} strokeWidth={1.2}>
              <polygon points={pts([iso(c, r, z + 1), iso(c + 1, r, z + 1), iso(c + 1, r + 1, z + 1), iso(c, r + 1, z + 1)])} fill={MANIM.surface} />
              <polygon points={pts([iso(c, r, z + 1), iso(c + 1, r, z + 1), iso(c + 1, r, z), iso(c, r, z)])} fill={MANIM.surface} />
              <polygon points={pts([iso(c, r, z + 1), iso(c, r + 1, z + 1), iso(c, r + 1, z), iso(c, r, z)])} fill={MANIM.surface} />
              <polygon points={pts([iso(c, r, z + 1), iso(c + 1, r, z + 1), iso(c + 1, r + 1, z + 1), iso(c, r + 1, z + 1)])} fill={MANIM.green} fillOpacity={0.55} />
              <polygon points={pts([iso(c, r, z + 1), iso(c + 1, r, z + 1), iso(c + 1, r, z), iso(c, r, z)])} fill={MANIM.blue} fillOpacity={0.5} />
              <polygon points={pts([iso(c, r, z + 1), iso(c, r + 1, z + 1), iso(c, r + 1, z), iso(c, r, z)])} fill={MANIM.purple} fillOpacity={0.5} />
            </g>
          );
        })}
        {/* alzado */}
        <text x={360} y={20} fill={MANIM.muted} fontSize={11}>
          isométrica
        </text>
        {[0, 1, 2].map((c) => (
          <g key={`a${c}`}>
            {Array.from({ length: p.alzado[c]! }, (_, z) => (
              <rect key={z} x={30 + c * CS} y={132 - (z + 1) * CS + 0} width={CS} height={CS} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={1.5} />
            ))}
          </g>
        ))}
        <text x={30} y={20} fill={MANIM.blue} fontSize={12} fontWeight={700}>
          Alzado
        </text>
        {/* perfil izquierdo (delante a la izquierda) */}
        {[0, 1, 2].map((r) => (
          <g key={`p${r}`}>
            {Array.from({ length: p.perfil[r]! }, (_, z) => (
              <rect key={z} x={150 + r * CS} y={132 - (z + 1) * CS} width={CS} height={CS} fill={MANIM.purple} fillOpacity={0.35} stroke={MANIM.purple} strokeWidth={1.5} />
            ))}
          </g>
        ))}
        <text x={150} y={20} fill={MANIM.purple} fontSize={12} fontWeight={700}>
          Perfil izq.
        </text>
        {/* planta: delante abajo */}
        {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => ({ r, c }))).map(({ r, c }) => (
          <rect key={`pl${r}${c}`} x={30 + c * CS} y={150 + (2 - r) * CS} width={CS} height={CS} fill={p.planta[r * 3 + c] ? MANIM.green : "none"} fillOpacity={0.35} stroke={MANIM.green} strokeWidth={1.5} />
        ))}
        <text x={30} y={248} fill={MANIM.green} fontSize={12} fontWeight={700}>
          Planta
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Cubos de la pieza">{p.cubos}</Stat>
        <Stat color={MANIM.green} label="Casillas ocupadas en planta">{p.planta.filter(Boolean).length}</Stat>
        <Stat color={MANIM.purple} label="Altura máxima">{Math.max(...s.h)}</Stat>
      </Readout>
      <Note>En el sistema europeo, la planta se dibuja debajo del alzado y el perfil izquierdo a la derecha. Cada vista es la «sombra» de la pieza sobre un plano: los huecos que no se ven de frente se descubren en las otras vistas.</Note>
    </Frame>
  );
}

/* ───────────── 2. Escalas: de la realidad al papel ───────────── */

export function EscalaConversionExplorador({ block }: { block: ToolBlock }) {
  const init = { e: Math.round(num(block.params?.n, 3, 0, ESCALAS_DIB.length - 1)), real: Math.round(num(block.params?.a, 2400, 10, 6000) / 10) * 10 };
  const [s, setS] = useState(init);
  const esc = ESCALAS_DIB[s.e]!;
  const dib = aDibujo(s.real, esc.f);
  const cabe = dib <= 277;
  const rec = escalaQueCabe(s.real);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige la escala y el tamaño real del objeto. ¿Cabe en un folio A4 (277 mm útiles)? Prueba la escala que recomienda el programa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Escala" items={ESCALAS_DIB.map((e, value) => ({ value, label: e.txt }))} value={s.e} onChange={(e) => setS((x) => ({ ...x, e }))} />
          <Slider label="Medida real" value={s.real} min={10} max={6000} step={10} unit=" mm" color={MANIM.orange} onChange={(real) => setS((x) => ({ ...x, real }))} />
        </>
      }
    >
      <Svg w={520} h={90} testId="escala-conv" maxH={100}>
        <rect x={20} y={12} width={480} height={20} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="5 4" />
        <text x={500} y={46} fill={MANIM.muted} fontSize={11} textAnchor="end">
          ancho útil de un A4 (277 mm)
        </text>
        <rect x={20} y={55} width={Math.min(480, Math.max(2, (dib / 277) * 480))} height={20} rx={3} fill={cabe ? MANIM.green : MANIM.red} fillOpacity={0.55} stroke={cabe ? MANIM.green : MANIM.red} strokeWidth={2} />
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Medida real">{fmtEs(s.real, 0)} mm</Stat>
        <Stat color={MANIM.blue} label={`En el dibujo (${esc.txt})`}>{f1(dib)} mm</Stat>
        <Stat color={cabe ? MANIM.green : MANIM.red} label="¿Cabe en un A4?">{cabe ? "Sí" : "No"}</Stat>
        <Stat color={MANIM.yellow} label="Mayor escala que cabe">{rec ? rec.txt : "ninguna (usar un formato mayor)"}</Stat>
      </Readout>
      <Note>Escala = medida del dibujo ÷ medida real. En 1:50, 1 mm del papel son 50 mm reales; en 2:1 (ampliación), 1 mm real se dibuja como 2 mm. La escala se escribe siempre en el cajetín, y las cotas indican las medidas reales.</Note>
    </Frame>
  );
}

/* ───────────── 3. Perspectiva cónica ───────────── */

export function PerspectivaConicaExplorador({ block }: { block: ToolBlock }) {
  const init = { k: Math.round(num(block.params?.a, 60, 30, 90)), vx: Math.round(num(block.params?.b, 330, 100, 440)), hy: 70 };
  const [s, setS] = useState(init);
  const k = s.k / 100;
  const F = [[190, 120], [300, 120], [300, 230], [190, 230]] as const;
  const V = { x: s.vx, y: s.hy };
  const Bk = F.map(([x, y]) => [V.x + (x - V.x) * k, V.y + (y - V.y) * k] as const);
  const pts = (a: readonly (readonly number[])[]) => a.map((p) => p.join(",")).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "En una perspectiva cónica con un punto de fuga, las líneas de profundidad convergen en un punto del horizonte. Mueve el punto y la profundidad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Profundidad (cara trasera)" value={s.k} min={30} max={90} step={5} unit=" %" color={MANIM.blue} onChange={(k2) => setS((x) => ({ ...x, k: k2 }))} />
          <Slider label="Punto de fuga: posición horizontal" value={s.vx} min={100} max={440} step={10} color={MANIM.orange} onChange={(vx) => setS((x) => ({ ...x, vx }))} />
          <Slider label="Línea de horizonte: altura" value={s.hy} min={20} max={200} step={10} color={MANIM.purple} onChange={(hy) => setS((x) => ({ ...x, hy }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="conica" maxH={260}>
        <line x1={0} y1={V.y} x2={520} y2={V.y} stroke={MANIM.purple} strokeWidth={2} strokeDasharray="8 5" />
        <text x={10} y={V.y - 6} fill={MANIM.purple} fontSize={12}>
          horizonte
        </text>
        {F.map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={V.x} y2={V.y} stroke={MANIM.orange} strokeWidth={1} strokeDasharray="4 5" opacity={0.7} />
        ))}
        <polygon points={pts(Bk)} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.blue} strokeWidth={2} />
        {F.map(([x, y], i) => {
          const j = (i + 1) % 4;
          return <polygon key={i} points={pts([[x, y], F[j]!, Bk[j]!, Bk[i]!])} fill={MANIM.green} fillOpacity={0.12} stroke={MANIM.green} strokeWidth={1.5} />;
        })}
        <polygon points={pts(F)} fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={3.5} />
        <circle cx={V.x} cy={V.y} r={6} fill={MANIM.orange} />
        <text x={V.x + 10} y={V.y - 8} fill={MANIM.orange} fontSize={12}>
          punto de fuga
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Tamaño de la cara trasera">{s.k} % de la delantera</Stat>
        <Stat color={MANIM.purple} label="Horizonte">{s.hy < 120 ? "por encima de la caja: se ve la cara inferior" : "a la altura de la caja"}</Stat>
      </Readout>
      <Note>La cónica imita la visión real: los objetos lejanos se ven más pequeños y las líneas paralelas de profundidad se juntan en el punto de fuga. En isométrica y caballera esas líneas siguen paralelas, lo que permite medir directamente.</Note>
    </Frame>
  );
}

/* ───────────── 4. Planos y simbología ───────────── */

export const HABITACIONES = [
  { nombre: "Salón", w: 5000, h: 4000 },
  { nombre: "Cocina", w: 3000, h: 3000 },
  { nombre: "Dormitorio", w: 3500, h: 3000 },
] as const;

export const SIMBOLOS_PLANO = [
  { nombre: "Puerta", txt: "Un arco indica hacia dónde se abre la hoja; la línea gruesa es la hoja abierta." },
  { nombre: "Ventana", txt: "Una pared interrumpida con dos o tres líneas finas que representan el cristal." },
  { nombre: "Enchufe", txt: "Un círculo con una línea pegado a la pared, que indica una toma de corriente." },
  { nombre: "Interruptor", txt: "Un pequeño círculo con una «S» que se coloca junto a la puerta." },
  { nombre: "Cotas", txt: "Líneas finas con flechas y un número: indican la medida real en milímetros, no la del papel." },
] as const;

export function PlanoViviendaExplorador({ block }: { block: ToolBlock }) {
  const init = { hab: Math.round(num(block.params?.n, 0, 0, HABITACIONES.length - 1)), n: block.params?.a === 100 ? 100 : 50, sim: 0 };
  const [s, setS] = useState(init);
  const h = HABITACIONES[s.hab]!;
  const wDib = h.w / s.n;
  const hDib = h.h / s.n;
  const area = areaRealM2(wDib, hDib, s.n);
  const sc = 1.4;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una habitación y la escala del plano (1:50 o 1:100). Compara lo que mide en el papel con lo que mide en la realidad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Habitación" items={HABITACIONES.map((x, value) => ({ value, label: x.nombre }))} value={s.hab} onChange={(hab) => setS((x) => ({ ...x, hab }))} />
          <Choice label="Escala del plano" items={[{ value: 50, label: "1:50" }, { value: 100, label: "1:100" }]} value={s.n} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Choice label="Símbolo" items={SIMBOLOS_PLANO.map((x, value) => ({ value, label: x.nombre }))} value={s.sim} onChange={(sim) => setS((x) => ({ ...x, sim }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="plano-vivienda" maxH={200}>
        <rect x={40} y={30} width={wDib * sc * (s.n === 50 ? 1.3 : 2.6)} height={hDib * sc * (s.n === 50 ? 1.3 : 2.6)} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={5} />
        <text x={50} y={22} fill={MANIM.blue} fontSize={13} fontWeight={700}>
          {h.nombre} — dibujo: {fmtEs(wDib, 0)} × {fmtEs(hDib, 0)} mm
        </text>
        {s.sim === 0 ? <path d="M 120 30 L 120 80 A 50 50 0 0 0 70 30" fill="none" stroke={MANIM.yellow} strokeWidth={3} transform="translate(0,0)" /> : null}
        {s.sim === 1 ? <g stroke={MANIM.yellow} strokeWidth={3}><line x1={160} y1={30} x2={230} y2={30} /><line x1={160} y1={34} x2={230} y2={34} /><line x1={160} y1={38} x2={230} y2={38} /></g> : null}
        {s.sim === 2 ? <g stroke={MANIM.yellow} strokeWidth={3} fill="none"><circle cx={60} cy={100} r={8} /><line x1={40} y1={100} x2={52} y2={100} /></g> : null}
        {s.sim === 3 ? <g stroke={MANIM.yellow} strokeWidth={3} fill="none"><circle cx={130} cy={45} r={8} /><text x={125} y={50} fill={MANIM.yellow} fontSize={12} stroke="none">S</text></g> : null}
        {s.sim === 4 ? <g stroke={MANIM.yellow} strokeWidth={2}><line x1={40} y1={175} x2={40 + wDib * sc * (s.n === 50 ? 1.3 : 2.6)} y2={175} /><text x={150} y={170} fill={MANIM.yellow} fontSize={13} stroke="none">{fmtEs(h.w, 0)}</text></g> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Medidas reales">{fmtEs(h.w, 0)} × {fmtEs(h.h, 0)} mm</Stat>
        <Stat color={MANIM.orange} label={`Medidas en el papel (1:${s.n})`}>{fmtEs(wDib, 0)} × {fmtEs(hDib, 0)} mm</Stat>
        <Stat color={MANIM.green} label="Superficie real">{f2(area)} m²</Stat>
      </Readout>
      <Note>{SIMBOLOS_PLANO[s.sim]!.txt}</Note>
    </Frame>
  );
}

/* ───────────── 5. CAD 2D: construir una placa ───────────── */

export function CadComandosExplorador({ block }: { block: ToolBlock }) {
  const init = { ops: [] as OpCad[], cotas: block.params?.n === 1 };
  const [s, setS] = useState(init);
  const alterna = (o: OpCad) => setS((x) => ({ ...x, ops: x.ops.includes(o) ? x.ops.filter((q) => q !== o) : [...x.ops, o] }));
  const area = areaPlaca(s.ops);
  const k = 3;
  const x0 = 90;
  const y0 = 40;
  const entidades = 1 + (s.ops.includes("agujero") ? 1 : 0) + (s.ops.includes("matriz") ? 4 : 0) + (s.ops.includes("esquinas") ? 4 : 0) + (s.cotas ? 2 : 0);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aplica órdenes de CAD a una placa de 120 × 70 mm y observa cómo cambian el dibujo, el número de entidades y el material."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Órdenes de CAD">
          <button type="button" className={TOOL_BTN} aria-pressed={s.ops.includes("agujero")} onClick={() => alterna("agujero")}>
            Círculo Ø16 en el centro
          </button>
          <button type="button" className={TOOL_BTN} aria-pressed={s.ops.includes("matriz")} onClick={() => alterna("matriz")}>
            Matriz 2 × 2 de círculos Ø6
          </button>
          <button type="button" className={TOOL_BTN} aria-pressed={s.ops.includes("esquinas")} onClick={() => alterna("esquinas")}>
            Redondear esquinas R10
          </button>
          <button type="button" className={TOOL_BTN} aria-pressed={s.cotas} onClick={() => setS((x) => ({ ...x, cotas: !x.cotas }))}>
            Acotar
          </button>
        </div>
      }
    >
      <Svg w={520} h={290} testId="cad-comandos" maxH={300}>
        <rect x={x0} y={y0} width={120 * k} height={70 * k} rx={s.ops.includes("esquinas") ? 10 * k : 0} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.blue} strokeWidth={3} />
        {s.ops.includes("agujero") ? <circle cx={x0 + 60 * k} cy={y0 + 35 * k} r={8 * k} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} /> : null}
        {s.ops.includes("matriz")
          ? [15, 105].flatMap((x) => [15, 55].map((y) => <circle key={`${x}-${y}`} cx={x0 + x * k} cy={y0 + y * k} r={3 * k} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />))
          : null}
        {s.cotas ? (
          <g stroke={MANIM.yellow} strokeWidth={1.5} fill={MANIM.yellow}>
            <line x1={x0} y1={y0 + 70 * k + 20} x2={x0 + 120 * k} y2={y0 + 70 * k + 20} />
            <text x={x0 + 60 * k} y={y0 + 70 * k + 38} fontSize={14} textAnchor="middle" stroke="none">
              120
            </text>
            <line x1={x0 - 20} y1={y0} x2={x0 - 20} y2={y0 + 70 * k} />
            <text x={x0 - 28} y={y0 + 35 * k} fontSize={14} textAnchor="end" stroke="none">
              70
            </text>
          </g>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Entidades del dibujo">{entidades}</Stat>
        <Stat color={MANIM.green} label="Área de la placa">{fmtEs(area, 0)} mm²</Stat>
        <Stat color={MANIM.orange} label="Material quitado">{f1((1 - area / 8400) * 100)} %</Stat>
      </Readout>
      <Note>Las órdenes de edición como la matriz multiplican un elemento con una sola instrucción; los redondeos y los taladros eliminan material. El área se recalcula automáticamente, algo imposible de hacer con tanta rapidez a mano.</Note>
    </Frame>
  );
}

/* ───────────── 6. Modelado 3D: prisma con taladro ───────────── */

const DENS = [
  { n: "PLA (1,24 g/cm³)", d: 1.24 },
  { n: "Aluminio (2,7 g/cm³)", d: 2.7 },
  { n: "Acero (7,85 g/cm³)", d: 7.85 },
] as const;

export function SolidoOperacionesExplorador({ block }: { block: ToolBlock }) {
  const init = { L: Math.round(num(block.params?.a, 60, 20, 80)), A: 40, H: Math.round(num(block.params?.b, 30, 10, 50)), d: 12, pas: 1, m: 0 };
  const [s, setS] = useState(init);
  const dMax = Math.max(0, s.A - 6);
  const d = Math.min(s.d, dMax);
  const prof = s.pas === 1 ? s.H : s.H / 2;
  const V0 = s.L * s.A * s.H;
  const V = volumenSolido(s.L, s.A, s.H, d, prof);
  const g = masaGramos(V, DENS[s.m]!.d);
  const e = 1.3;
  const iso = (x: number, y: number, z: number) => [200 + (x - y) * 0.87 * e, 150 + (x + y) * 0.5 * e - z * e] as const;
  const pol = (p: readonly (readonly number[])[]) => p.map((q) => q.join(",")).join(" ");
  const c = iso(s.L / 2, s.A / 2, s.H);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Quita material con un taladro (pasante o ciego) y observa el volumen, la masa y el ahorro de material."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Largo L" value={s.L} min={20} max={80} step={5} unit=" mm" color={MANIM.blue} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Ancho A" value={s.A} min={20} max={60} step={5} unit=" mm" color={MANIM.purple} onChange={(A) => setS((x) => ({ ...x, A }))} />
          <Slider label="Alto H" value={s.H} min={10} max={50} step={5} unit=" mm" color={MANIM.orange} onChange={(H) => setS((x) => ({ ...x, H }))} />
          <Slider label="Diámetro del taladro" value={d} min={0} max={Math.max(1, dMax)} step={1} unit=" mm" color={MANIM.green} onChange={(dd) => setS((x) => ({ ...x, d: dd }))} />
          <Choice label="Taladro" items={[{ value: 1, label: "Pasante" }, { value: 0, label: "Ciego (mitad)" }]} value={s.pas} onChange={(pas) => setS((x) => ({ ...x, pas }))} />
          <Choice label="Material" items={DENS.map((m, value) => ({ value, label: m.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="solido-ops" maxH={250}>
        <polygon points={pol([iso(0, 0, s.H), iso(s.L, 0, s.H), iso(s.L, s.A, s.H), iso(0, s.A, s.H)])} fill={MANIM.green} fillOpacity={0.35} stroke={MANIM.green} strokeWidth={2} />
        <polygon points={pol([iso(0, s.A, s.H), iso(s.L, s.A, s.H), iso(s.L, s.A, 0), iso(0, s.A, 0)])} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={2} />
        <polygon points={pol([iso(s.L, 0, s.H), iso(s.L, s.A, s.H), iso(s.L, s.A, 0), iso(s.L, 0, 0)])} fill={MANIM.purple} fillOpacity={0.35} stroke={MANIM.purple} strokeWidth={2} />
        {d > 0 ? <ellipse cx={c[0]} cy={c[1]} rx={(d / 2) * 0.87 * e * 1.15} ry={(d / 2) * 0.5 * e * 1.15} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={2} /> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Volumen del bloque">{f1(V0 / 1000)} cm³</Stat>
        <Stat color={MANIM.green} label="Volumen tras el taladro">{f1(V / 1000)} cm³</Stat>
        <Stat color={MANIM.orange} label="Material quitado">{f1((1 - V / V0) * 100)} %</Stat>
        <Stat color={MANIM.yellow} label="Masa">{f1(g)} g</Stat>
      </Readout>
      <Note>El programa de CAD calcula el volumen y la masa a partir de las operaciones: V = L · A · H − π · (d/2)² · profundidad. Un taladro ciego quita menos material que uno pasante, y los materiales más densos pesan más con el mismo volumen.</Note>
    </Frame>
  );
}

/* ───────────── 7. Lámina de proyecto: qué le falta ───────────── */

export function LaminaExplorador({ block }: { block: ToolBlock }) {
  const init = { on: ELEMENTOS_LAMINA.map((_, i) => i < Math.round(num(block.params?.n, 3, 0, ELEMENTOS_LAMINA.length))) };
  const [s, setS] = useState(init);
  const r = puntuacionLamina(s.on);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Activa o quita elementos de la lámina y comprueba qué le falta para considerarse un plano completo."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Elementos de la lámina">
          {ELEMENTOS_LAMINA.map((e, i) => (
            <button key={e} type="button" className={TOOL_BTN} aria-pressed={s.on[i]} onClick={() => setS((x) => ({ on: x.on.map((v, k) => (k === i ? !v : v)) }))}>
              {e}
            </button>
          ))}
        </div>
      }
    >
      <Svg w={520} h={240} testId="lamina" maxH={250}>
        <rect x={110} y={10} width={300} height={220} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2} />
        {s.on[0] ? <rect x={120} y={20} width={280} height={200} fill="none" stroke={MANIM.ink} strokeWidth={3} /> : null}
        {s.on[2] ? (
          <g fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2}>
            <rect x={140} y={40} width={80} height={50} />
            <rect x={140} y={105} width={80} height={40} />
            <rect x={240} y={40} width={40} height={50} />
          </g>
        ) : null}
        {s.on[3] ? (
          <g stroke={MANIM.yellow} strokeWidth={1.5}>
            <line x1={140} y1={98} x2={220} y2={98} />
            <line x1={230} y1={40} x2={230} y2={90} />
          </g>
        ) : null}
        {s.on[5] ? (
          <g stroke={MANIM.green} strokeWidth={1.5} fill="none">
            <rect x={300} y={40} width={90} height={60} />
            <line x1={300} y1={60} x2={390} y2={60} />
            <line x1={300} y1={80} x2={390} y2={80} />
          </g>
        ) : null}
        {s.on[1] ? (
          <g stroke={MANIM.orange} strokeWidth={2} fill="none">
            <rect x={260} y={180} width={140} height={40} />
            <line x1={260} y1={200} x2={400} y2={200} />
            <text x={266} y={194} fill={MANIM.orange} fontSize={10} stroke="none">
              Título · Nombre
            </text>
          </g>
        ) : null}
        {s.on[4] ? (
          <text x={270} y={214} fill={MANIM.orange} fontSize={10}>
            Escala 1:2 {s.on[6] ? "· mm" : ""}
          </text>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Elementos presentes">{r.n} de {ELEMENTOS_LAMINA.length}</Stat>
        <Stat color={r.falta.length ? MANIM.yellow : MANIM.green} label="Falta">{r.falta.length ? r.falta.join(", ") : "Nada: la lámina está completa"}</Stat>
      </Readout>
      <Note>Un plano debe poder interpretarlo cualquier persona sin explicaciones: marco, cajetín con título y autor, vistas, cotas, escala y unidades, y una lista de piezas si hay más de una.</Note>
    </Frame>
  );
}
