"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { EpuraBase, ep, normalPlano, tag, type P3 } from "@/components/lesson/slide/tools/DtDiedricoTools";
import { Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/** Plano definido por sus trazas: ángulos φ₁ (horizontal) y φ₂ (vertical) con la LT, que se cortan en el punto (m, 0, 0) de la LT. */
export type PlanoTrazas = { phi1: number; phi2: number; m: number };

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

const dot = (a: P3, b: P3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norma = (a: P3) => Math.hypot(a[0], a[1], a[2]);

/** Trazas de la recta intersección de dos planos: H (x, e) con cota 0 y V (x, z) con alejamiento 0. Valen null si las trazas son paralelas. */
export function interseccionPlanos(a: PlanoTrazas, b: PlanoTrazas) {
  const na = normalPlano(a.phi1, a.phi2);
  const nb = normalPlano(b.phi1, b.phi2);
  const resolver = (a11: number, a12: number, a21: number, a22: number, r1: number, r2: number): Pt | null => {
    const det = a11 * a22 - a12 * a21;
    if (Math.abs(det) < 1e-9) return null;
    return [(r1 * a22 - a12 * r2) / det, (a11 * r2 - r1 * a21) / det];
  };
  const H = resolver(na[0], na[1], nb[0], nb[1], na[0] * a.m, nb[0] * b.m);
  const V = resolver(na[0], na[2], nb[0], nb[2], na[0] * a.m, nb[0] * b.m);
  return { H, V };
}
/** Ángulo agudo (grados) entre dos planos. */
export function anguloEntrePlanos(a: PlanoTrazas, b: PlanoTrazas) {
  const na = normalPlano(a.phi1, a.phi2);
  const nb = normalPlano(b.phi1, b.phi2);
  return Math.acos(Math.min(1, Math.abs(dot(na, nb)) / (norma(na) * norma(nb)))) / RAD;
}
export const planosParalelos = (a: PlanoTrazas, b: PlanoTrazas) => anguloEntrePlanos(a, b) < 1e-6;
/** Distancia entre dos planos paralelos con trazas que cortan la LT en puntos separados Δm. */
export function distanciaEntrePlanos(a: PlanoTrazas, b: PlanoTrazas) {
  if (!planosParalelos(a, b)) return NaN;
  const n = normalPlano(a.phi1, a.phi2);
  return (Math.abs(n[0]) * Math.abs(b.m - a.m)) / norma(n);
}
/** Distancia de un punto al plano (trazas por el punto m de la LT) y pie de la perpendicular. */
export function distanciaPuntoPlano(pl: PlanoTrazas, p: P3) {
  const n = normalPlano(pl.phi1, pl.phi2);
  const v: P3 = [p[0] - pl.m, p[1], p[2]];
  const k = dot(n, v) / dot(n, n);
  return { distancia: Math.abs(dot(n, v)) / norma(n), pie: [p[0] - k * n[0], p[1] - k * n[1], p[2] - k * n[2]] as P3 };
}
/** Verdadera magnitud de AB a partir de la proyección horizontal y la diferencia de cotas (triángulo rectángulo). */
export function verdaderaMagnitud(a: P3, b: P3) {
  const horiz = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const dz = Math.abs(b[2] - a[2]);
  const real = Math.hypot(horiz, dz);
  return { horiz, dz, real, inclinacion: Math.atan2(dz, horiz) / RAD };
}

const planoDir = (phi1: number, phi2: number): { d1: Pt; d2: Pt } => ({ d1: [Math.cos(phi1 * RAD), -Math.sin(phi1 * RAD)], d2: [Math.cos(phi2 * RAD), -Math.sin(phi2 * RAD)] });

/** Dibuja las trazas de un plano: la parte del primer cuadrante en trazo grueso y su prolongación fina. */
function Trazas({ pl, c1, c2, nombre }: { pl: PlanoTrazas; c1: string; c2: string; nombre: string }) {
  const { d1, d2 } = planoDir(pl.phi1, pl.phi2);
  const L = 7;
  return (
    <>
      <Seg a={ep(pl.m, 0)} b={ep(pl.m - L * d1[0], -L * d1[1])} color={c1} width={3.2} />
      <Seg a={ep(pl.m, 0)} b={ep(pl.m + L * d1[0], L * d1[1])} color={c1} width={1.2} dashed />
      <Seg a={ep(pl.m, 0)} b={ep(pl.m + L * d2[0], L * d2[1])} color={c2} width={3.2} />
      <Seg a={ep(pl.m, 0)} b={ep(pl.m - L * d2[0], -L * d2[1])} color={c2} width={1.2} dashed />
      {tag(ep(pl.m - 0.55 * L * d1[0], -0.55 * L * d1[1]), `${nombre}₁`, c1, 8, 14)}
      {tag(ep(pl.m + 0.55 * L * d2[0], 0.55 * L * d2[1]), `${nombre}₂`, c2, 8, -6)}
    </>
  );
}

const ALPHA: PlanoTrazas = { phi1: 135, phi2: 45, m: 0 };

/* ───────────── 1. Intersección de dos planos ───────────── */

export function InterseccionPlanosDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { phi1: Math.round(num(block.params?.a, 60, 20, 160) / 5) * 5, phi2: Math.round(num(block.params?.b, 75, 20, 160) / 5) * 5, m: 4 };
  const [s, setS] = useState(init);
  const beta: PlanoTrazas = { phi1: s.phi1, phi2: s.phi2, m: s.m };
  const { H, V } = interseccionPlanos(ALPHA, beta);
  const ext = (a: Pt, b: Pt): [Pt, Pt] => {
    const d: Pt = [b[0] - a[0], b[1] - a[1]];
    return [[a[0] - 6 * d[0], a[1] - 6 * d[1]], [a[0] + 6 * d[0], a[1] + 6 * d[1]]];
  };
  const hasLine = H !== null && V !== null;
  const lineH = hasLine ? ext([V![0], 0], [H![0], H![1]]) : null;
  const lineV = hasLine ? ext([H![0], 0], [V![0], -V![1]]) : null;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La intersección de dos planos es una recta. Sus trazas son las intersecciones de las trazas homónimas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de β₁ con la LT" value={s.phi1} min={20} max={160} step={5} unit="°" color={MANIM.green} onChange={(phi1) => setS((v) => ({ ...v, phi1 }))} />
          <Slider label="Ángulo de β₂ con la LT" value={s.phi2} min={20} max={160} step={5} unit="°" color={MANIM.purple} onChange={(phi2) => setS((v) => ({ ...v, phi2 }))} />
          <Slider label="Punto de la LT por donde pasan las trazas de β" value={s.m} min={-3} max={5} step={1} unit=" cm" color={MANIM.yellow} onChange={(m) => setS((v) => ({ ...v, m }))} />
        </>
      }
    >
      <EpuraBase testId="diedrico-interseccion">
        <Trazas pl={ALPHA} c1={MANIM.orange} c2={MANIM.blue} nombre="α" />
        <Trazas pl={beta} c1={MANIM.green} c2={MANIM.purple} nombre="β" />
        {lineH ? <Seg a={ep(...lineH[0])} b={ep(...lineH[1])} color={MANIM.red} width={2} /> : null}
        {lineV ? <Seg a={ep(...lineV[0])} b={ep(...lineV[1])} color={MANIM.red} width={2} dashed /> : null}
        {H ? <Dot p={ep(H[0], H[1])} color={MANIM.red} r={6} /> : null}
        {V ? <Dot p={ep(V[0], -V[1])} color={MANIM.red} r={6} /> : null}
        {H ? tag(ep(H[0], H[1]), "h", MANIM.red, 8, 16) : null}
        {V ? tag(ep(V[0], -V[1]), "v′", MANIM.red, 8, -8) : null}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.red} label="Traza horizontal H = α₁ ∩ β₁">{H ? `x = ${f2(H[0])}, alej. ${f2(H[1])}` : "paralelas: no se cortan"}</Stat>
        <Stat color={MANIM.red} label="Traza vertical V = α₂ ∩ β₂">{V ? `x = ${f2(V[0])}, cota ${f2(V[1])}` : "paralelas: no se cortan"}</Stat>
        <Stat color={MANIM.muted} label="Ángulo entre α y β">{f1(anguloEntrePlanos(ALPHA, beta))}°</Stat>
      </Readout>
      <Note>La <b>recta intersección</b> de dos planos tiene su <b>traza horizontal</b> en el corte de las <b>trazas horizontales</b> y su <b>traza vertical</b> en el corte de las <b>trazas verticales</b>. Basta unir h con v (proyección horizontal) y h′ con v′ (vertical). Si las trazas homónimas son <b>paralelas</b>, los planos son paralelos (o la recta es paralela a un plano de proyección). Para hallar el punto donde una <b>recta corta a un plano</b> se hace pasar un <b>plano auxiliar</b> (proyectante) por la recta, se busca su intersección con el plano dado y se corta con la recta.</Note>
    </Frame>
  );
}

/* ───────────── 2. Planos paralelos ───────────── */

export function PlanosParalelosDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { phi1: Math.round(num(block.params?.a, 135, 20, 160) / 5) * 5, phi2: Math.round(num(block.params?.b, 45, 20, 160) / 5) * 5, m: 3 };
  const [s, setS] = useState(init);
  const beta: PlanoTrazas = { phi1: s.phi1, phi2: s.phi2, m: s.m };
  const par = planosParalelos(ALPHA, beta);
  const ang = anguloEntrePlanos(ALPHA, beta);
  const d = distanciaEntrePlanos(ALPHA, beta);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos planos son paralelos si sus trazas homónimas son paralelas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de β₁ con la LT" value={s.phi1} min={20} max={160} step={5} unit="°" color={MANIM.green} onChange={(phi1) => setS((v) => ({ ...v, phi1 }))} />
          <Slider label="Ángulo de β₂ con la LT" value={s.phi2} min={20} max={160} step={5} unit="°" color={MANIM.purple} onChange={(phi2) => setS((v) => ({ ...v, phi2 }))} />
          <Slider label="Punto de la LT por donde pasan las trazas de β" value={s.m} min={-3} max={5} step={1} unit=" cm" color={MANIM.yellow} onChange={(m) => setS((v) => ({ ...v, m }))} />
        </>
      }
    >
      <EpuraBase testId="diedrico-paralelos">
        <Trazas pl={ALPHA} c1={MANIM.orange} c2={MANIM.blue} nombre="α" />
        <Trazas pl={beta} c1={MANIM.green} c2={MANIM.purple} nombre="β" />
      </EpuraBase>
      <Readout>
        <Stat color={s.phi1 === 135 ? MANIM.green : MANIM.red} label="β₁ ∥ α₁">{s.phi1 === 135 ? "sí" : "no"}</Stat>
        <Stat color={s.phi2 === 45 ? MANIM.green : MANIM.red} label="β₂ ∥ α₂">{s.phi2 === 45 ? "sí" : "no"}</Stat>
        <Stat color={par ? MANIM.green : MANIM.yellow} label="Planos">{par ? "paralelos" : `se cortan (${f1(ang)}°)`}</Stat>
        <Stat color={MANIM.blue} label="Distancia entre los planos">{par ? `${f2(d)} cm` : "—"}</Stat>
      </Readout>
      <Note>Dos planos son <b>paralelos</b> si sus trazas <b>homónimas son paralelas</b> (α₁ ∥ β₁ y α₂ ∥ β₂). Una <b>recta es paralela a un plano</b> si es paralela a una recta del plano (por ejemplo, a una horizontal). Dos <b>rectas son paralelas</b> si sus proyecciones homónimas son paralelas, salvo las de perfil, que necesitan una tercera proyección. La distancia entre dos planos paralelos es la distancia de un punto de uno al otro.</Note>
    </Frame>
  );
}

/* ───────────── 3. Perpendicularidad y distancia punto-plano ───────────── */

export function PerpendicularPlanoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { phi1: Math.round(num(block.params?.a, 135, 20, 160) / 5) * 5, phi2: Math.round(num(block.params?.b, 45, 20, 160) / 5) * 5, x: 1, e: 1, z: 3 };
  const [s, setS] = useState(init);
  const pl: PlanoTrazas = { phi1: s.phi1, phi2: s.phi2, m: 0 };
  const n = normalPlano(s.phi1, s.phi2);
  const mod = norma(n);
  const P: P3 = [s.x, s.e, s.z];
  const { distancia, pie } = distanciaPuntoPlano(pl, P);
  const dirH: Pt = [n[0] / mod, n[1] / mod];
  const dirV: Pt = [n[0] / mod, -n[2] / mod];
  const long = 12;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La recta perpendicular a un plano tiene la proyección horizontal perpendicular a la traza horizontal y la vertical perpendicular a la traza vertical."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de α₁ con la LT" value={s.phi1} min={20} max={160} step={5} unit="°" color={MANIM.orange} onChange={(phi1) => setS((v) => ({ ...v, phi1 }))} />
          <Slider label="Ángulo de α₂ con la LT" value={s.phi2} min={20} max={160} step={5} unit="°" color={MANIM.blue} onChange={(phi2) => setS((v) => ({ ...v, phi2 }))} />
          <Slider label="Posición lateral x del punto" value={s.x} min={-3} max={4} step={1} unit=" cm" color={MANIM.ink} onChange={(x) => setS((v) => ({ ...v, x }))} />
          <Slider label="Alejamiento e" value={s.e} min={-3} max={4} step={1} unit=" cm" color={MANIM.orange} onChange={(e) => setS((v) => ({ ...v, e }))} />
          <Slider label="Cota z" value={s.z} min={-3} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(z) => setS((v) => ({ ...v, z }))} />
        </>
      }
    >
      <EpuraBase testId="diedrico-perpendicular">
        <Trazas pl={pl} c1={MANIM.orange} c2={MANIM.blue} nombre="α" />
        <Seg a={ep(s.x - long * dirH[0], s.e - long * dirH[1])} b={ep(s.x + long * dirH[0], s.e + long * dirH[1])} color={MANIM.orange} width={1.5} dashed />
        <Seg a={ep(s.x - long * dirV[0], -s.z - long * dirV[1])} b={ep(s.x + long * dirV[0], -s.z + long * dirV[1])} color={MANIM.blue} width={1.5} dashed />
        <Dot p={ep(s.x, -s.z)} color={MANIM.green} r={6} />
        <Dot p={ep(s.x, s.e)} color={MANIM.green} r={6} />
        <Dot p={ep(pie[0], -pie[2])} color={MANIM.red} r={5} />
        <Dot p={ep(pie[0], pie[1])} color={MANIM.red} r={5} />
        {tag(ep(s.x, -s.z), "a′", MANIM.green, 8, -8)}
        {tag(ep(s.x, s.e), "a", MANIM.green, 8, 16)}
        {tag(ep(pie[0], -pie[2]), "f′", MANIM.red, 8, 14)}
        {tag(ep(pie[0], pie[1]), "f", MANIM.red, 8, -8)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.green} label="Distancia del punto al plano">{f2(distancia)} cm</Stat>
        <Stat color={MANIM.red} label="Pie de la perpendicular F (x; e; z)">({f1(pie[0])}; {f1(pie[1])}; {f1(pie[2])})</Stat>
        <Stat color={MANIM.muted} label="Proyecciones de la normal">r ⟂ α₁ · r′ ⟂ α₂</Stat>
      </Readout>
      <Note>Una <b>recta es perpendicular a un plano</b> si sus proyecciones son <b>perpendiculares a las trazas homónimas</b>: r ⟂ α₁ y r′ ⟂ α₂ (el ángulo recto se conserva en la proyección porque un lado es paralelo al plano de proyección). Un <b>plano es perpendicular a otro</b> si contiene una recta perpendicular al segundo. La <b>distancia de un punto a un plano</b> es la longitud del segmento hasta el <b>pie F</b> de la perpendicular; se halla cortando la recta con el plano y obteniendo la verdadera magnitud del segmento aF.</Note>
    </Frame>
  );
}

/* ───────────── 4. Distancia entre dos puntos (verdadera magnitud) ───────────── */

export function DistanciaPuntosDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { x: Math.round(num(block.params?.a, 2, -1, 5)), e: Math.round(num(block.params?.b, 4, -3, 5)), z: 5 };
  const [s, setS] = useState(init);
  const A: P3 = [-2, 1, 1];
  const B: P3 = [s.x, s.e, s.z];
  const vm = verdaderaMagnitud(A, B);
  const U2 = 11;
  const T0: Pt = [370, 262];
  return (
    <Frame
      stacked
      hint={block.hint ?? "La verdadera magnitud de AB es la hipotenusa de un triángulo rectángulo cuyos catetos son la proyección horizontal ab y la diferencia de cotas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición lateral x de B" value={s.x} min={-1} max={5} step={1} unit=" cm" color={MANIM.ink} onChange={(x) => setS((v) => ({ ...v, x }))} />
          <Slider label="Alejamiento de B" value={s.e} min={-3} max={5} step={1} unit=" cm" color={MANIM.orange} onChange={(e) => setS((v) => ({ ...v, e }))} />
          <Slider label="Cota de B" value={s.z} min={-3} max={5} step={1} unit=" cm" color={MANIM.blue} onChange={(z) => setS((v) => ({ ...v, z }))} />
        </>
      }
    >
      <EpuraBase testId="diedrico-distancia">
        <Seg a={ep(A[0], -A[2])} b={ep(B[0], -B[2])} color={MANIM.blue} width={3} />
        <Seg a={ep(A[0], A[1])} b={ep(B[0], B[1])} color={MANIM.orange} width={3} />
        <Dot p={ep(A[0], -A[2])} color={MANIM.blue} r={4} />
        <Dot p={ep(B[0], -B[2])} color={MANIM.blue} r={4} />
        <Dot p={ep(A[0], A[1])} color={MANIM.orange} r={4} />
        <Dot p={ep(B[0], B[1])} color={MANIM.orange} r={4} />
        {tag(ep(A[0], -A[2]), "a′", MANIM.blue, -18, -6)}
        {tag(ep(B[0], -B[2]), "b′", MANIM.blue, 6, -6)}
        {tag(ep(A[0], A[1]), "a", MANIM.orange, -12, 16)}
        {tag(ep(B[0], B[1]), "b", MANIM.orange, 6, 16)}
        <polygon points={`${T0[0]},${T0[1]} ${T0[0] + vm.horiz * U2},${T0[1]} ${T0[0] + vm.horiz * U2},${T0[1] - vm.dz * U2}`} fill={MANIM.green} fillOpacity={0.18} stroke={MANIM.green} strokeWidth={2.5} />
        <text x={T0[0] + (vm.horiz * U2) / 2} y={T0[1] + 16} textAnchor="middle" fill={MANIM.orange} fontSize={12} fontWeight={700}>ab</text>
        <text x={T0[0] + vm.horiz * U2 + 6} y={T0[1] - (vm.dz * U2) / 2} fill={MANIM.blue} fontSize={12} fontWeight={700}>Δcota</text>
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.orange} label="Proyección horizontal ab">{f2(vm.horiz)} cm</Stat>
        <Stat color={MANIM.blue} label="Diferencia de cotas">{f2(vm.dz)} cm</Stat>
        <Stat color={MANIM.green} label="Verdadera magnitud AB">{f2(vm.real)} cm</Stat>
        <Stat color={MANIM.muted} label="Ángulo de AB con el PH">{f1(vm.inclinacion)}°</Stat>
      </Readout>
      <Note>La <b>distancia entre dos puntos</b> es la <b>verdadera magnitud</b> del segmento que los une. En diédrico se obtiene con un <b>triángulo rectángulo</b>: un cateto es la <b>proyección horizontal ab</b>, el otro la <b>diferencia de cotas</b>, y la <b>hipotenusa</b> es AB. El ángulo en el cateto ab es el que forma la recta con el PH. De la misma manera, con la proyección vertical y la diferencia de alejamientos se halla el ángulo con el PV. Otras distancias (<b>punto–recta</b>, <b>entre rectas</b>) se reducen a esta usando planos auxiliares.</Note>
    </Frame>
  );
}
