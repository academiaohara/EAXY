"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Componentes horizontal y vertical de una fuerza de módulo F (N) y ángulo (grados) sobre la horizontal. */
export const componentes = (F: number, angDeg: number): [number, number] => [F * Math.cos(angDeg * RAD), F * Math.sin(angDeg * RAD)];

export const ASTROS = {
  tierra: { nombre: "Tierra", g: 9.8 },
  luna: { nombre: "Luna", g: 1.6 },
  marte: { nombre: "Marte", g: 3.7 },
  jupiter: { nombre: "Júpiter", g: 24.8 },
} as const;
export type AstroId = keyof typeof ASTROS;
/** Peso P = m · g (N, con la masa en kg). */
export const peso = (masaKg: number, g: number) => masaKg * g;

export const MUELLES = { blando: { nombre: "Muelle blando", k: 20 }, medio: { nombre: "Muelle medio", k: 50 }, duro: { nombre: "Muelle duro", k: 200 } } as const;
export type MuelleId = keyof typeof MUELLES;
/** Ley de Hooke: F = k · Δl, de donde Δl = F / k (m si k en N/m). */
export const alargamiento = (F: number, k: number) => (k > 0 ? F / k : NaN);
export const LIMITE_ELASTICO_M = 0.15;
export const superaLimite = (dl: number) => dl > LIMITE_ELASTICO_M + 1e-12;

export const SUPERFICIES = {
  hielo: { nombre: "Hielo", mu: 0.03 },
  madera: { nombre: "Madera", mu: 0.4 },
  goma: { nombre: "Goma sobre asfalto", mu: 0.8 },
} as const;
export type SuperficieId = keyof typeof SUPERFICIES;
/** Rozamiento con una fuerza aplicada F (N) a un bloque de masa m (kg): máximo μ·N, y movimiento si F lo supera. */
export function rozamiento(masaKg: number, mu: number, F: number, g = 9.8) {
  const N = masaKg * g;
  const max = mu * N;
  const mueve = F > max + 1e-12;
  const froz = mueve ? max : Math.max(0, F);
  const neta = F - froz;
  return { N, max, mueve, froz, neta, a: masaKg > 0 ? neta / masaKg : NaN };
}

/** Resultante de dos fuerzas en la misma recta (positivo hacia la derecha): F₁ hacia la derecha y F₂ hacia la izquierda. */
export const resultante = (f1: number, f2: number) => f1 - f2;
export const estadoResultante = (r: number) => (Math.abs(r) < 1e-9 ? "equilibrio: el cuerpo no cambia su movimiento" : r > 0 ? "se mueve (o acelera) hacia la derecha" : "se mueve (o acelera) hacia la izquierda");

const flecha = (a: Pt, b: Pt, color: string, w = 4) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L = Math.hypot(dx, dy);
  if (L < 1) return null;
  const ux = dx / L;
  const uy = dy / L;
  const p1: Pt = [b[0] - 12 * ux - 6 * uy, b[1] - 12 * uy + 6 * ux];
  const p2: Pt = [b[0] - 12 * ux + 6 * uy, b[1] - 12 * uy - 6 * ux];
  return (
    <g>
      <Seg a={a} b={b} color={color} width={w} />
      <polygon points={`${b.join(",")} ${p1.join(",")} ${p2.join(",")}`} fill={color} />
    </g>
  );
};

/* ───────────── 1. Fuerzas como vectores ───────────── */

export function FuerzaVectorFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { F: Math.round(num(block.params?.a, 40, 5, 100)), ang: Math.round(num(block.params?.b, 30, 0, 90)) };
  const [s, setS] = useState(init);
  const [fx, fy] = componentes(s.F, s.ang);
  const O: Pt = [140, 160];
  const k = 2.2;
  const P: Pt = [O[0] + fx * k, O[1] - fy * k];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una fuerza es un vector: tiene módulo (cuánto), dirección, sentido y punto de aplicación."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Módulo de la fuerza" value={s.F} min={5} max={100} step={5} unit=" N" color={MANIM.orange} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Ángulo con la horizontal" value={s.ang} min={0} max={90} step={5} unit="°" color={MANIM.blue} onChange={(ang) => setS((o) => ({ ...o, ang }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="fuerza-vector" maxH={220}>
        <rect x={O[0] - 24} y={O[1] - 18} width={48} height={36} rx={4} fill={MANIM.grid} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2} />
        <Seg a={[40, O[1] + 18]} b={[480, O[1] + 18]} color={MANIM.muted} width={1.5} />
        {fy > 0.1 ? flecha(O, [O[0], O[1] - fy * k], MANIM.green, 3) : null}
        {fx > 0.1 ? flecha(O, [O[0] + fx * k, O[1]], MANIM.purple, 3) : null}
        {flecha(O, P, MANIM.orange, 4.5)}
        <Dot p={O} color={MANIM.red} r={5} />
        <text x={P[0] + 8} y={P[1] - 6} fill={MANIM.orange} fontSize={14} fontWeight={700}>{`F = ${s.F} N`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Módulo">{`${s.F} N`}</Stat>
        <Stat color={MANIM.blue} label="Dirección y sentido">{`${s.ang}° sobre la horizontal, hacia la derecha`}</Stat>
        <Stat color={MANIM.purple} label="Efecto horizontal Fx">{`${f1(fx)} N`}</Stat>
        <Stat color={MANIM.green} label="Efecto vertical Fy">{`${f1(fy)} N`}</Stat>
      </Readout>
      <Note>Una <b>fuerza</b> es toda interacción capaz de <b>cambiar el movimiento</b> de un cuerpo (ponerlo en marcha, frenarlo, desviarlo) o de <b>deformarlo</b>. Se mide en <b>newton (N)</b> con un <b>dinamómetro</b>. Es una magnitud <b>vectorial</b>: se representa con una <b>flecha</b> cuya longitud es el <b>módulo</b>, con su <b>dirección</b> y <b>sentido</b>, y con el <b>punto de aplicación</b> en el origen de la flecha. Una fuerza oblicua se puede descomponer en un efecto <b>horizontal</b> y otro <b>vertical</b>. Las fuerzas pueden ser de <b>contacto</b> (empujar) o <b>a distancia</b> (gravedad, magnetismo).</Note>
    </Frame>
  );
}

/* ───────────── 2. Peso y masa ───────────── */

export function PesoMasaFq2Explorador({ block }: { block: ToolBlock }) {
  const ids: AstroId[] = ["tierra", "luna", "marte", "jupiter"];
  const init = { m: num(block.params?.a, 60, 1, 120), a: ids[Math.round(num(block.params?.n, 0, 0, 3))]! };
  const [s, setS] = useState<{ m: number; a: AstroId }>(init);
  const astro = ASTROS[s.a];
  const P = peso(s.m, astro.g);
  const PT = peso(s.m, ASTROS.tierra.g);
  const Lm = 24 + Math.min(150, P * 0.28);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La masa es la cantidad de materia y no cambia; el peso es la fuerza con que un astro atrae al cuerpo y depende de la gravedad del lugar."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa del cuerpo" value={s.m} min={1} max={120} step={1} unit=" kg" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Choice label="Astro" items={ids.map((id) => ({ value: id, label: `${ASTROS[id].nombre} (g = ${fmtEs(ASTROS[id].g, 1)} N/kg)` }))} value={s.a} onChange={(a) => setS((o) => ({ ...o, a }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="peso-masa" maxH={210}>
        <rect x={110} y={34} width={56} height={56} rx={6} fill={MANIM.orange} fillOpacity={0.7} stroke={MANIM.ink} strokeWidth={2.5} />
        <text x={138} y={68} textAnchor="middle" fill={MANIM.ink} fontSize={14} fontWeight={700}>{`${f1(s.m)} kg`}</text>
        {flecha([138, 94], [138, 94 + Lm * 0.6], MANIM.red, 5)}
        <text x={160} y={102 + Lm * 0.3} fill={MANIM.red} fontSize={14} fontWeight={700}>{`P = ${f1(P)} N`}</text>
        <Seg a={[40, 175]} b={[250, 175]} color={MANIM.muted} width={2} />
        <text x={300} y={70} fill={MANIM.muted} fontSize={13}>Masa (no cambia)</text>
        <text x={300} y={96} fill={MANIM.orange} fontSize={24} fontWeight={700}>{`${f1(s.m)} kg`}</text>
        <text x={300} y={134} fill={MANIM.muted} fontSize={13}>{`Peso en ${astro.nombre}`}</text>
        <text x={300} y={160} fill={MANIM.red} fontSize={24} fontWeight={700}>{`${f1(P)} N`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label={`Peso en ${astro.nombre}: P = m · g`}>{`${f1(P)} N`}</Stat>
        <Stat color={MANIM.blue} label="Peso en la Tierra">{`${f1(PT)} N`}</Stat>
        <Stat color={MANIM.purple} label="Cociente con el de la Tierra">{`× ${f2(P / PT)}`}</Stat>
      </Readout>
      <Note>La <b>masa</b> es la cantidad de materia de un cuerpo: se mide en <b>kg</b> con una balanza y es <b>la misma en cualquier lugar</b>. El <b>peso</b> es la <b>fuerza de atracción gravitatoria</b> que un astro ejerce sobre el cuerpo: se mide en <b>newton</b> con un dinamómetro, apunta hacia el centro del astro y depende de la <b>gravedad</b> del lugar: <b>P = m · g</b>. En la Tierra g ≈ 9,8 N/kg; en la Luna, unas 6 veces menos, por eso allí «pesas» menos pero sigues teniendo la misma masa. Los valores de g son aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 3. Fuerza elástica ───────────── */

export function MuelleHookeFq2Explorador({ block }: { block: ToolBlock }) {
  const ids: MuelleId[] = ["blando", "medio", "duro"];
  const init = { m: Math.round(num(block.params?.a, 200, 0, 500)), k: ids[Math.round(num(block.params?.n, 1, 0, 2))]! };
  const [s, setS] = useState<{ m: number; k: MuelleId }>(init);
  const k = MUELLES[s.k].k;
  const F = peso(s.m / 1000, 9.8);
  const dl = alargamiento(F, k);
  const lim = superaLimite(dl);
  const L0 = 60;
  const Lpx = L0 + Math.min(dl, 0.3) * 600;
  const X = 160;
  const Y0 = 20;
  const vueltas = 12;
  const pts = Array.from({ length: vueltas * 2 + 1 }, (_, i) => [X + (i % 2 === 0 ? 0 : i % 4 === 1 ? -14 : 14), Y0 + (i / (vueltas * 2)) * Lpx] as Pt);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ley de Hooke: el alargamiento de un muelle es proporcional a la fuerza que lo estira, mientras no se supere el límite elástico."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa colgada" value={s.m} min={0} max={500} step={25} unit=" g" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Choice label="Muelle" items={ids.map((id) => ({ value: id, label: `${MUELLES[id].nombre} (k = ${MUELLES[id].k} N/m)` }))} value={s.k} onChange={(kk) => setS((o) => ({ ...o, k: kk }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="muelle-hooke" maxH={270}>
        <Seg a={[X - 40, Y0]} b={[X + 40, Y0]} color={MANIM.ink} width={5} />
        <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={lim ? MANIM.red : MANIM.green} strokeWidth={3} />
        <rect x={X - 22} y={Y0 + Lpx} width={44} height={30} rx={4} fill={MANIM.orange} />
        <text x={X} y={Y0 + Lpx + 20} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>{`${s.m} g`}</text>
        <text x={300} y={80} fill={MANIM.muted} fontSize={13}>Fuerza (peso colgado)</text>
        <text x={300} y={106} fill={MANIM.orange} fontSize={22} fontWeight={700}>{`${f2(F)} N`}</text>
        <text x={300} y={150} fill={MANIM.muted} fontSize={13}>Alargamiento Δl = F / k</text>
        <text x={300} y={176} fill={lim ? MANIM.red : MANIM.green} fontSize={22} fontWeight={700}>{`${f1(dl * 100)} cm`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Fuerza F = m · g">{`${f2(F)} N`}</Stat>
        <Stat color={MANIM.green} label="Alargamiento Δl">{`${f1(dl * 100)} cm`}</Stat>
        <Stat color={lim ? MANIM.red : MANIM.green} label="Límite elástico (15 cm)">{lim ? "superado: deformación permanente" : "dentro del límite"}</Stat>
      </Readout>
      <Note>Un cuerpo <b>elástico</b> se deforma al aplicarle una fuerza y <b>recupera su forma</b> cuando esta cesa. La <b>ley de Hooke</b> dice que, en un muelle, el <b>alargamiento</b> es <b>directamente proporcional</b> a la fuerza: <b>F = k · Δl</b>, con <b>k</b> la <b>constante elástica</b> (N/m), que mide lo duro que es el muelle. Con k = 50 N/m, una fuerza de 1 N lo alarga 2 cm. Pasado el <b>límite elástico</b> el muelle se deforma para siempre y la ley deja de cumplirse. Así funciona el <b>dinamómetro</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Rozamiento ───────────── */

export function RozamientoFq2Explorador({ block }: { block: ToolBlock }) {
  const ids: SuperficieId[] = ["hielo", "madera", "goma"];
  const init = { F: Math.round(num(block.params?.a, 30, 0, 100)), m: 10, sup: ids[Math.round(num(block.params?.n, 1, 0, 2))]! };
  const [s, setS] = useState<{ F: number; m: number; sup: SuperficieId }>(init);
  const mu = SUPERFICIES[s.sup].mu;
  const r = rozamiento(s.m, mu, s.F);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El rozamiento se opone al movimiento y vale como máximo μ·N; si la fuerza aplicada no lo supera, el bloque no se mueve."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza aplicada" value={s.F} min={0} max={100} step={5} unit=" N" color={MANIM.orange} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Masa del bloque" value={s.m} min={1} max={20} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Choice label="Superficie" items={ids.map((id) => ({ value: id, label: `${SUPERFICIES[id].nombre} (μ ≈ ${fmtEs(SUPERFICIES[id].mu, 2)})` }))} value={s.sup} onChange={(sup) => setS((o) => ({ ...o, sup }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="rozamiento" maxH={190}>
        <Seg a={[30, 120]} b={[490, 120]} color={MANIM.ink} width={3} />
        <rect x={210} y={70} width={70} height={50} rx={5} fill={MANIM.blue} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2.5} />
        {flecha([282, 95], [282 + Math.max(2, s.F * 1.6), 95], MANIM.orange, 5)}
        {r.froz > 0.1 ? flecha([208, 95], [208 - Math.max(2, r.froz * 1.6), 95], MANIM.red, 5) : null}
        <text x={245} y={100} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>{`${s.m} kg`}</text>
        <text x={30} y={30} fill={r.mueve ? MANIM.green : MANIM.yellow} fontSize={16} fontWeight={700}>{r.mueve ? "El bloque SE MUEVE" : "El bloque NO se mueve (rozamiento compensa)"}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.muted} label="Fuerza normal N = m · g">{`${f1(r.N)} N`}</Stat>
        <Stat color={MANIM.red} label="Rozamiento máximo μ·N">{`${f1(r.max)} N`}</Stat>
        <Stat color={MANIM.red} label="Rozamiento actual">{`${f1(r.froz)} N`}</Stat>
        <Stat color={MANIM.green} label="Fuerza neta · aceleración">{`${f1(r.neta)} N · ${f2(r.a)} m/s²`}</Stat>
      </Readout>
      <Note>El <b>rozamiento</b> es una fuerza de contacto que <b>se opone al movimiento</b> (o a que empiece) entre dos superficies. Depende de cómo son las superficies (el coeficiente <b>μ</b>) y de la fuerza con que se aprietan (la <b>normal N</b>; en un suelo horizontal N = m · g): <b>F_roz = μ · N</b>. Mientras la fuerza aplicada <b>no supera</b> el máximo, el rozamiento <b>la iguala</b> y el cuerpo no se mueve. Si la supera, se mueve y la <b>fuerza neta</b> es la diferencia. Es <b>útil</b> (frenar, andar, agarrar) y <b>perjudicial</b> (desgaste, pérdida de energía); se reduce con <b>lubricantes</b>. Los coeficientes son aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 5. Resultante y equilibrio ───────────── */

export function EquilibrioFuerzasFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 40, 0, 100)), b: Math.round(num(block.params?.b, 40, 0, 100)) };
  const [s, setS] = useState(init);
  const R = resultante(s.a, s.b);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La resultante es la suma de las fuerzas (con signo); si es cero, el cuerpo está en equilibrio."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza hacia la derecha F₁" value={s.a} min={0} max={100} step={5} unit=" N" color={MANIM.orange} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Fuerza hacia la izquierda F₂" value={s.b} min={0} max={100} step={5} unit=" N" color={MANIM.blue} onChange={(b) => setS((o) => ({ ...o, b }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="equilibrio-fuerzas" maxH={180}>
        <rect x={225} y={60} width={70} height={50} rx={6} fill={MANIM.grid} fillOpacity={0.7} stroke={MANIM.ink} strokeWidth={2.5} />
        {s.a > 0 ? flecha([297, 85], [297 + s.a * 1.6, 85], MANIM.orange, 5) : null}
        {s.b > 0 ? flecha([223, 85], [223 - s.b * 1.6, 85], MANIM.blue, 5) : null}
        {Math.abs(R) > 0 ? flecha([260, 135], [260 + R * 1.6, 135], MANIM.green, 5) : <circle cx={260} cy={135} r={5} fill={MANIM.green} />}
        <text x={20} y={140} fill={MANIM.green} fontSize={13} fontWeight={700}>resultante</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Resultante R = F₁ − F₂">{`${R} N`}</Stat>
        <Stat color={Math.abs(R) < 1e-9 ? MANIM.green : MANIM.yellow} label="Estado">{estadoResultante(R)}</Stat>
      </Readout>
      <Note>Sobre un cuerpo suelen actuar <b>varias fuerzas</b>. Su efecto conjunto es el de una sola, la <b>resultante</b>. Si las fuerzas actúan en la <b>misma dirección y sentido</b>, se <b>suman</b>; si actúan en <b>sentidos opuestos</b>, se <b>restan</b> y la resultante va en el sentido de la mayor. Cuando la resultante es <b>cero</b>, las fuerzas están en <b>equilibrio</b>: el cuerpo, si estaba parado, sigue parado y, si se movía, mantiene su velocidad constante (primera ley de Newton, <b>ley de la inercia</b>). Si la resultante no es cero, el cuerpo <b>cambia su velocidad</b>.</Note>
    </Frame>
  );
}
