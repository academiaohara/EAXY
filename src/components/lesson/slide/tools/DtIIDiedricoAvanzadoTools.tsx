"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { EpuraBase, ep, tag, type P3 } from "@/components/lesson/slide/tools/DtDiedricoTools";
import { verdaderaMagnitud } from "@/components/lesson/slide/tools/DtDiedrico2Tools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Abatimiento de un punto de un plano inclinado φ sobre el PH, con la traza horizontal paralela a la LT: a la cota z le corresponden una distancia real a la traza z / sen φ y una distancia horizontal z / tg φ. */
export function abatePunto(z: number, phiDeg: number) {
  const s = Math.sin(phiDeg * RAD);
  const t = Math.tan(phiDeg * RAD);
  return { real: s > 1e-9 ? z / s : NaN, horiz: Math.abs(t) > 1e-9 ? z / t : NaN };
}

/** Un punto (u, v) de un plano que pasa por la LT e inclina φ respecto del PH: proyección horizontal (u, v·cos φ), vertical (u, −v·sen φ) y abatimiento (u, v). */
export function puntoDePlanoPorLT(u: number, v: number, phiDeg: number) {
  return { horiz: [u, v * Math.cos(phiDeg * RAD)] as Pt, vert: [u, -v * Math.sin(phiDeg * RAD)] as Pt, abatido: [u, v] as Pt };
}
export const areaPoligono = (p: readonly Pt[]) => Math.abs(p.reduce((s, q, i) => s + (q[0] * p[(i + 1) % p.length]![1] - p[(i + 1) % p.length]![0] * q[1]), 0)) / 2;

/** Giro de un punto alrededor de un eje vertical (perpendicular al PH) que pasa por O: la proyección horizontal gira θ y la vertical se desplaza en horizontal. */
export function giroEjeVertical(p: P3, o: Pt, thetaDeg: number): P3 {
  const c = Math.cos(thetaDeg * RAD);
  const s = Math.sin(thetaDeg * RAD);
  const dx = p[0] - o[0];
  const de = p[1] - o[1];
  return [o[0] + dx * c - de * s, o[1] + dx * s + de * c, p[2]];
}
/** Giro (grados) que hace paralela a la LT la proyección horizontal de AB: la recta pasa a ser frontal y se ve en verdadera magnitud en el PV. */
export const giroParaFrontal = (a: P3, b: P3) => -Math.atan2(b[1] - a[1], b[0] - a[0]) / RAD;

/** Cambio de plano vertical: la nueva LT′ forma ψ con la LT. Las nuevas coordenadas del punto son x′ (sobre LT′), e′ (distancia a LT′) y la misma cota. */
export function cambioPlanoVertical(p: P3, psiDeg: number) {
  const c = Math.cos(psiDeg * RAD);
  const s = Math.sin(psiDeg * RAD);
  return { x: p[0] * c + p[1] * s, e: -p[0] * s + p[1] * c, z: p[2] };
}

/** Longitud real de AB y ángulos que forma con el PH y con el PV. */
export function magnitudYAngulos(a: P3, b: P3) {
  const m = verdaderaMagnitud(a, b);
  const de = Math.abs(b[1] - a[1]);
  return { ...m, conPH: m.inclinacion, conPV: m.real > 0 ? Math.asin(Math.min(1, de / m.real)) / RAD : NaN };
}

const cruz = (u: P3, v: P3): P3 => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const resta = (u: P3, v: P3): P3 => [u[0] - v[0], u[1] - v[1], u[2] - v[2]];
const norma = (u: P3) => Math.hypot(u[0], u[1], u[2]);
const dot = (u: P3, v: P3) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];

/** Distancia del punto P a la recta AB. */
export function distanciaPuntoRecta(p: P3, a: P3, b: P3) {
  const ab = resta(b, a);
  const n = norma(ab);
  return n > 0 ? norma(cruz(resta(p, a), ab)) / n : NaN;
}
/** Vista del punto P mirando según la dirección de AB: la recta se ve como un punto (el origen) y P a su distancia verdadera. */
export function vistaDeFrente(p: P3, a: P3, b: P3) {
  const ab = resta(b, a);
  const n = norma(ab);
  if (n < 1e-9) return { coord: [NaN, NaN] as Pt, d: NaN };
  const u: P3 = [ab[0] / n, ab[1] / n, ab[2] / n];
  let w1 = cruz(u, [0, 0, 1]);
  if (norma(w1) < 1e-9) w1 = [1, 0, 0];
  const n1 = norma(w1);
  w1 = [w1[0] / n1, w1[1] / n1, w1[2] / n1];
  const w2 = cruz(u, w1);
  const ap = resta(p, a);
  const coord: Pt = [dot(ap, w1), dot(ap, w2)];
  return { coord, d: Math.hypot(coord[0], coord[1]) };
}

/* ───────────── 1. Abatimiento de un punto de un plano ───────────── */

export function AbatimientoPuntoDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { z: num(block.params?.a, 1.5, 1, 2), phi: Math.round(num(block.params?.b, 55, 40, 85)) };
  const [s, setS] = useState(init);
  const yT = 1.5;
  const ab = abatePunto(s.z, s.phi);
  const x0 = 0;
  const P1: Pt = ep(x0, yT + ab.horiz);
  const P0: Pt = ep(x0, yT + ab.real);
  const T0: Pt = ep(x0, yT);
  const P2: Pt = ep(x0, -s.z);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El abatimiento gira el plano alrededor de su traza hasta el PH: la distancia real del punto a la traza es la hipotenusa del triángulo cota–distancia horizontal."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Cota del punto z" value={s.z} min={1} max={2} step={0.5} unit=" cm" color={MANIM.blue} format={f1} onChange={(z) => setS((o) => ({ ...o, z }))} />
          <Slider label="Inclinación del plano φ con el PH" value={s.phi} min={40} max={85} step={5} unit="°" color={MANIM.orange} onChange={(phi) => setS((o) => ({ ...o, phi }))} />
        </>
      }
    >
      <EpuraBase testId="abatimiento-punto" h={300}>
        <Seg a={ep(-4, yT)} b={ep(4, yT)} color={MANIM.yellow} width={3} />
        <text x={ep(-4, yT)[0]} y={ep(-4, yT)[1] + 16} fill={MANIM.yellow} fontSize={12} fontWeight={700}>traza horizontal (charnela)</text>
        <Seg a={P2} b={P1} color={MANIM.muted} width={1.2} dashed />
        <Seg a={T0} b={P0} color={MANIM.green} width={3} />
        <Dot p={P2} color={MANIM.blue} r={5} />
        <Dot p={P1} color={MANIM.orange} r={5} />
        <Dot p={P0} color={MANIM.green} r={5} />
        {tag(P2, "P″", MANIM.blue, 10, -6)}
        {tag(P1, "P′", MANIM.orange, 10, 4)}
        {tag(P0, "P₀", MANIM.green, 10, 6)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.blue} label="Cota z">{f2(s.z)} cm</Stat>
        <Stat color={MANIM.orange} label="Distancia horizontal z / tg φ">{f2(ab.horiz)} cm</Stat>
        <Stat color={MANIM.green} label="Distancia real a la traza z / sen φ">{f2(ab.real)} cm</Stat>
      </Readout>
      <Note>Para <b>abatir</b> un plano se gira alrededor de una de sus trazas (la <b>charnela</b>) hasta hacerlo coincidir con el PH. Un punto P del plano a cota z se proyecta en P′, a la distancia horizontal z / tg φ de la traza. Al abatir, P pasa a P₀, sobre la perpendicular a la traza por P′, a la <b>distancia real</b> z / sen φ: la hipotenusa del triángulo rectángulo de catetos la <b>cota</b> y la <b>distancia horizontal</b>. Cuanto más inclinado está el plano, más cerca están P′ y P₀.</Note>
    </Frame>
  );
}

/* ───────────── 2. Verdadera forma de una figura plana ───────────── */

const TRI: Pt[] = [[-2.5, 1], [1.5, 1.4], [-0.5, 4.2]];

export function VerdaderaFormaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { phi: Math.round(num(block.params?.a, 50, 15, 85)) };
  const [s, setS] = useState(init);
  const pts = TRI.map((q) => puntoDePlanoPorLT(q[0], q[1], s.phi));
  const real = areaPoligono(TRI);
  const aH = areaPoligono(pts.map((q) => q.horiz));
  const aV = areaPoligono(pts.map((q) => q.vert));
  const nombres = ["A", "B", "C"];
  const poly = (arr: Pt[]) => arr.map((q) => ep(q[0], q[1]).join(",")).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las proyecciones se deforman; el abatimiento sobre el PH devuelve la figura en verdadera forma."}
      onReset={() => setS(init)}
      controls={<Slider label="Inclinación del plano φ con el PH" value={s.phi} min={15} max={85} step={5} unit="°" color={MANIM.orange} onChange={(phi) => setS((o) => ({ ...o, phi }))} />}
    >
      <EpuraBase testId="verdadera-forma" h={300}>
        <polygon points={poly(pts.map((q) => q.abatido))} fill={MANIM.green} fillOpacity={0.12} stroke={MANIM.green} strokeWidth={2.5} strokeDasharray="6 4" />
        <polygon points={poly(pts.map((q) => q.horiz))} fill={MANIM.orange} fillOpacity={0.18} stroke={MANIM.orange} strokeWidth={3} />
        <polygon points={poly(pts.map((q) => q.vert))} fill={MANIM.blue} fillOpacity={0.18} stroke={MANIM.blue} strokeWidth={3} />
        {pts.map((q, i) => (
          <g key={i}>
            <Dot p={ep(q.horiz[0], q.horiz[1])} color={MANIM.orange} r={4} />
            <Dot p={ep(q.vert[0], q.vert[1])} color={MANIM.blue} r={4} />
            <Dot p={ep(q.abatido[0], q.abatido[1])} color={MANIM.green} r={4} />
            {tag(ep(q.horiz[0], q.horiz[1]), `${nombres[i]}′`, MANIM.orange, i === 2 ? -26 : 8, i === 2 ? 14 : -6)}
            {tag(ep(q.vert[0], q.vert[1]), `${nombres[i]}″`, MANIM.blue, 8, 14)}
            {tag(ep(q.abatido[0], q.abatido[1]), `${nombres[i]}₀`, MANIM.green, i === 1 ? 10 : -26, 14)}
          </g>
        ))}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.green} label="Área real (abatida)">{f2(real)} cm²</Stat>
        <Stat color={MANIM.orange} label="Proyección horizontal · cos φ">{f2(aH)} cm²</Stat>
        <Stat color={MANIM.blue} label="Proyección vertical · sen φ">{f2(aV)} cm²</Stat>
      </Readout>
      <Note>El triángulo ABC está en un plano que pasa por la LT. Sus <b>proyecciones</b> (naranja en el PH, azul en el PV) están <b>deformadas</b>: el área horizontal es el área real por <b>cos φ</b> y la vertical, por <b>sen φ</b>. El <b>abatimiento</b> (verde) gira el plano hasta el PH y muestra la figura en <b>verdadera forma</b>, igual para cualquier inclinación. Es la afinidad ortogonal que se estudió en el tema 2: <b>eje</b> = traza, razón = cos φ.</Note>
    </Frame>
  );
}

/* ───────────── 3. Giro de una recta para hacerla frontal ───────────── */

const GA: P3 = [-1.5, 1, 1];
const GB: P3 = [GA[0] + 4 * Math.cos(30 * RAD), GA[1] + 4 * Math.sin(30 * RAD), 3.5];

export function GiroRectaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { th: Math.round(num(block.params?.a, 0, -60, 60)) };
  const [s, setS] = useState(init);
  const o: Pt = [GA[0], GA[1]];
  const B = giroEjeVertical(GB, o, s.th);
  const ideal = giroParaFrontal(GA, GB);
  const lv = Math.hypot(B[0] - GA[0], GB[2] - GA[2]);
  const real = verdaderaMagnitud(GA, GB).real;
  const frontal = Math.abs(B[1] - GA[1]) < 0.02;
  const r = Math.hypot(GB[0] - GA[0], GB[1] - GA[1]);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Al girar la recta alrededor de un eje vertical por A, su proyección vertical solo se estira: es máxima cuando la recta es frontal."}
      onReset={() => setS(init)}
      controls={<Slider label="Ángulo de giro θ" value={s.th} min={-60} max={60} step={5} unit="°" color={MANIM.orange} onChange={(th) => setS((o2) => ({ ...o2, th }))} />}
    >
      <EpuraBase testId="giro-recta" h={300}>
        <circle cx={ep(o[0], o[1])[0]} cy={ep(o[0], o[1])[1]} r={r * 26} fill="none" stroke={MANIM.muted} strokeWidth={1.2} strokeDasharray="5 4" />
        <Seg a={ep(GA[0], GA[1])} b={ep(GB[0], GB[1])} color={MANIM.muted} width={1.5} dashed />
        <Seg a={ep(GA[0], GA[1])} b={ep(B[0], B[1])} color={MANIM.orange} width={3} />
        <Seg a={ep(GA[0], -GA[2])} b={ep(B[0], -B[2])} color={MANIM.blue} width={3} />
        <Seg a={ep(B[0], B[1])} b={ep(B[0], -B[2])} color={MANIM.muted} width={1} dashed />
        <Dot p={ep(GA[0], GA[1])} color={MANIM.yellow} r={5} />
        <Dot p={ep(B[0], B[1])} color={MANIM.orange} r={5} />
        <Dot p={ep(GA[0], -GA[2])} color={MANIM.yellow} r={5} />
        <Dot p={ep(B[0], -B[2])} color={MANIM.blue} r={5} />
        {tag(ep(GA[0], GA[1]), "A′", MANIM.yellow, -26, 18)}
        {tag(ep(B[0], B[1]), "B′", MANIM.orange, 8, 18)}
        {tag(ep(GA[0], -GA[2]), "A″", MANIM.yellow, -28, -4)}
        {tag(ep(B[0], -B[2]), "B″", MANIM.blue, 8, -8)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.blue} label="Longitud de la proyección vertical">{f2(lv)} cm</Stat>
        <Stat color={MANIM.green} label="Longitud real de AB">{f2(real)} cm</Stat>
        <Stat color={MANIM.purple} label="Giro que la hace frontal">{f1(ideal)}°</Stat>
        <Stat color={MANIM.muted} label="Estado">{frontal ? "frontal: se ve en verdadera magnitud" : "oblicua"}</Stat>
      </Readout>
      <Note>Un <b>giro</b> mueve un punto en una circunferencia alrededor de un <b>eje</b> sin deformar la figura. Con un eje <b>vertical</b> (perpendicular al PH) la proyección horizontal gira el ángulo θ sobre un arco, y la vertical se desplaza en horizontal, conservando la cota. Al girar AB hasta que su proyección horizontal quede <b>paralela a la LT</b>, la recta es <b>frontal</b> y su proyección vertical mide la <b>longitud real</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Cambio de plano vertical ───────────── */

export function CambioPlanoDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { psi: Math.round(num(block.params?.a, 35, 0, 90)), x: Math.round(num(block.params?.b, 2, -4, 4)), e: 3, z: 2 };
  const [s, setS] = useState(init);
  const P: P3 = [s.x, s.e, s.z];
  const n = cambioPlanoVertical(P, s.psi);
  const U = 24;
  const O1: Pt = [130, 95];
  const pl = (p: Pt): Pt => [O1[0] + p[0] * U, O1[1] + p[1] * U];
  const c = Math.cos(s.psi * RAD);
  const sn = Math.sin(s.psi * RAD);
  const foot: Pt = [n.x * c, n.x * sn];
  const O2: Pt = [390, 190];
  const q = (p: Pt): Pt => [O2[0] + p[0] * U, O2[1] - p[1] * U];
  const L = 3.6;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Al cambiar el plano vertical, la cota no varía; cambian la posición sobre la nueva LT y el alejamiento (distancia a la nueva LT)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo ψ de la nueva LT′" value={s.psi} min={0} max={90} step={5} unit="°" color={MANIM.orange} onChange={(psi) => setS((o) => ({ ...o, psi }))} />
          <Slider label="Posición lateral x" value={s.x} min={-4} max={4} step={1} unit=" cm" color={MANIM.ink} onChange={(x) => setS((o) => ({ ...o, x }))} />
          <Slider label="Alejamiento e" value={s.e} min={0} max={4} step={1} unit=" cm" color={MANIM.green} onChange={(e) => setS((o) => ({ ...o, e }))} />
          <Slider label="Cota z" value={s.z} min={1} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(z) => setS((o) => ({ ...o, z }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="cambio-plano" maxH={280}>
        <text x={12} y={16} fill={MANIM.muted} fontSize={12}>Planta (PH)</text>
        <text x={290} y={16} fill={MANIM.muted} fontSize={12}>Nuevo alzado sobre PV′</text>
        <Seg a={pl([-L, 0])} b={pl([L, 0])} color={MANIM.ink} width={2.5} />
        <text x={pl([L, 0])[0] - 22} y={pl([L, 0])[1] - 6} fill={MANIM.ink} fontSize={12} fontWeight={700}>LT</text>
        <Seg a={pl([-L * c, -L * sn])} b={pl([L * c, L * sn])} color={MANIM.orange} width={2.5} />
        <text x={pl([L * c, L * sn])[0] - 10} y={pl([L * c, L * sn])[1] + 14} fill={MANIM.orange} fontSize={12} fontWeight={700}>LT′</text>
        <Seg a={pl([s.x, s.e])} b={pl(foot)} color={MANIM.green} width={2} dashed />
        <Dot p={pl([s.x, s.e])} color={MANIM.green} r={5} />
        {tag(pl([s.x, s.e]), "P′", MANIM.green, 8, 16)}
        <Seg a={q([-L, 0])} b={q([L, 0])} color={MANIM.orange} width={2.5} />
        <text x={q([L, 0])[0] - 22} y={q([L, 0])[1] + 16} fill={MANIM.orange} fontSize={12} fontWeight={700}>LT′</text>
        <Seg a={q([n.x, 0])} b={q([n.x, n.z])} color={MANIM.muted} width={1.2} dashed />
        <Dot p={q([n.x, n.z])} color={MANIM.blue} r={5} />
        {tag(q([n.x, n.z]), "P‴", MANIM.blue, 8, -6)}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Posición sobre LT′ (x′)">{f2(n.x)} cm</Stat>
        <Stat color={MANIM.green} label="Nuevo alejamiento e′">{f2(n.e)} cm</Stat>
        <Stat color={MANIM.blue} label="Cota (no cambia)">{f2(n.z)} cm</Stat>
      </Readout>
      <Note>En un <b>cambio de plano vertical</b> se sustituye el PV por otro plano vertical PV′, cuya línea de tierra LT′ forma el ángulo ψ con la LT. El PH no cambia, así que la <b>cota se conserva</b>. La nueva proyección vertical P‴ queda sobre la perpendicular a LT′ por P′, a la altura de la cota. Con ψ = 90° se ve el objeto de perfil. Elegir bien el plano permite que una recta o un plano queden paralelos a PV′ y se vean en <b>verdadera magnitud</b>.</Note>
    </Frame>
  );
}

/* ───────────── 5. Verdadera magnitud y ángulos de una recta ───────────── */

const MA: P3 = [-3, 1, 1];

export function MagnitudAngulosDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { x: Math.round(num(block.params?.a, 2, -1, 4)), e: Math.round(num(block.params?.b, 3, 1, 4)), z: Math.round(num(block.params?.c, 3, 0, 4)) };
  const [s, setS] = useState(init);
  const B: P3 = [s.x, s.e, s.z];
  const m = magnitudYAngulos(MA, B);
  const dh: Pt = [B[0] - MA[0], B[1] - MA[1]];
  const lh = Math.hypot(dh[0], dh[1]);
  const nrm: Pt = lh > 1e-9 ? [-dh[1] / lh, dh[0] / lh] : [0, 1];
  const dz = B[2] - MA[2];
  const B0: Pt = [B[0] + nrm[0] * Math.abs(dz), B[1] + nrm[1] * Math.abs(dz)];
  return (
    <Frame
      stacked
      hint={block.hint ?? "La longitud real es la hipotenusa del triángulo cuyos catetos son la proyección horizontal y la diferencia de cotas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición x de B" value={s.x} min={-1} max={4} step={1} unit=" cm" color={MANIM.ink} onChange={(x) => setS((o) => ({ ...o, x }))} />
          <Slider label="Alejamiento de B" value={s.e} min={1} max={4} step={1} unit=" cm" color={MANIM.green} onChange={(e) => setS((o) => ({ ...o, e }))} />
          <Slider label="Cota de B" value={s.z} min={0} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(z) => setS((o) => ({ ...o, z }))} />
        </>
      }
    >
      <EpuraBase testId="magnitud-angulos" h={300}>
        <Seg a={ep(MA[0], MA[1])} b={ep(B[0], B[1])} color={MANIM.orange} width={3} />
        <Seg a={ep(MA[0], -MA[2])} b={ep(B[0], -B[2])} color={MANIM.blue} width={3} />
        <Seg a={ep(B[0], B[1])} b={ep(B[0], -B[2])} color={MANIM.muted} width={1} dashed />
        <Seg a={ep(MA[0], MA[1])} b={ep(MA[0], -MA[2])} color={MANIM.muted} width={1} dashed />
        {Math.abs(dz) > 1e-9 ? (
          <>
            <Seg a={ep(B[0], B[1])} b={ep(B0[0], B0[1])} color={MANIM.yellow} width={2} />
            <Seg a={ep(MA[0], MA[1])} b={ep(B0[0], B0[1])} color={MANIM.green} width={3.5} />
          </>
        ) : null}
        <Dot p={ep(MA[0], MA[1])} color={MANIM.orange} r={5} />
        <Dot p={ep(B[0], B[1])} color={MANIM.orange} r={5} />
        <Dot p={ep(MA[0], -MA[2])} color={MANIM.blue} r={5} />
        <Dot p={ep(B[0], -B[2])} color={MANIM.blue} r={5} />
        {tag(ep(MA[0], MA[1]), "A′", MANIM.orange, -26, 16)}
        {tag(ep(B[0], B[1]), "B′", MANIM.orange, 8, 16)}
        {tag(ep(MA[0], -MA[2]), "A″", MANIM.blue, -28, -6)}
        {tag(ep(B[0], -B[2]), "B″", MANIM.blue, 8, -6)}
        {Math.abs(dz) > 1e-9 ? tag(ep(B0[0], B0[1]), "B₀", MANIM.green, 8, 6) : null}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.orange} label="Proyección horizontal">{f2(m.horiz)} cm</Stat>
        <Stat color={MANIM.yellow} label="Diferencia de cotas">{f2(m.dz)} cm</Stat>
        <Stat color={MANIM.green} label="Longitud real AB">{f2(m.real)} cm</Stat>
        <Stat color={MANIM.purple} label="Ángulo con el PH">{f1(m.conPH)}°</Stat>
        <Stat color={MANIM.blue} label="Ángulo con el PV">{f1(m.conPV)}°</Stat>
      </Readout>
      <Note>El <b>triángulo de abatimiento</b> da la <b>verdadera magnitud</b> de un segmento: se levanta en B′ una perpendicular a A′B′ de longitud igual a la <b>diferencia de cotas</b>; la hipotenusa A′B₀ es la longitud real AB, y el ángulo que forma con A′B′ es el que la recta forma con el <b>PH</b>. El mismo triángulo construido con la proyección vertical y la diferencia de alejamientos da el ángulo con el <b>PV</b>. Con cota igual (recta horizontal) la proyección ya es la verdadera longitud.</Note>
    </Frame>
  );
}

/* ───────────── 6. Distancia de un punto a una recta por cambio de plano ───────────── */

const DA: P3 = [-2, 1, 1];
const DB: P3 = [2, 3, 3];

export function DistanciaPuntoRectaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { x: Math.round(num(block.params?.a, 1, -4, 4)), e: Math.round(num(block.params?.b, 4, 0, 5)), z: Math.round(num(block.params?.c, 1, 0, 4)) };
  const [s, setS] = useState(init);
  const P: P3 = [s.x, s.e, s.z];
  const d = distanciaPuntoRecta(P, DA, DB);
  const v = vistaDeFrente(P, DA, DB);
  const U = 24;
  const O1: Pt = [140, 40];
  const pl = (p: Pt): Pt => [O1[0] + p[0] * U, O1[1] + p[1] * U];
  const O2: Pt = [395, 130];
  const q = (p: Pt): Pt => [O2[0] + p[0] * U, O2[1] - p[1] * U];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con dos cambios de plano la recta se ve como un punto: la distancia de P a ese punto es la distancia pedida."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición x de P" value={s.x} min={-4} max={4} step={1} unit=" cm" color={MANIM.ink} onChange={(x) => setS((o) => ({ ...o, x }))} />
          <Slider label="Alejamiento de P" value={s.e} min={0} max={5} step={1} unit=" cm" color={MANIM.green} onChange={(e) => setS((o) => ({ ...o, e }))} />
          <Slider label="Cota de P" value={s.z} min={0} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(z) => setS((o) => ({ ...o, z }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="distancia-punto-recta" maxH={280}>
        <text x={12} y={16} fill={MANIM.muted} fontSize={12}>Planta (PH)</text>
        <text x={290} y={16} fill={MANIM.muted} fontSize={12}>Vista según la recta</text>
        <Seg a={pl([DA[0], DA[1]])} b={pl([DB[0], DB[1]])} color={MANIM.orange} width={3} />
        <Dot p={pl([s.x, s.e])} color={MANIM.green} r={5} />
        {tag(pl([s.x, s.e]), "P′", MANIM.green, 8, 16)}
        {tag(pl([DB[0], DB[1]]), "r′", MANIM.orange, 8, -6)}
        {Number.isNaN(d) ? null : (
          <>
            <circle cx={O2[0]} cy={O2[1]} r={d * U} fill="none" stroke={MANIM.muted} strokeWidth={1.2} strokeDasharray="5 4" />
            <Seg a={q([0, 0])} b={q(v.coord)} color={MANIM.green} width={3.5} />
            <Dot p={q([0, 0])} color={MANIM.orange} r={6} />
            <Dot p={q(v.coord)} color={MANIM.green} r={5} />
            {tag(q([0, 0]), "r", MANIM.orange, 10, -8)}
            {tag(q(v.coord), "P", MANIM.green, 8, -8)}
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Distancia de P a la recta">{f2(d)} cm</Stat>
      </Readout>
      <Note>Para hallar la <b>distancia de un punto a una recta</b> basta ver la recta <b>de punta</b>, es decir, como un punto. Con un primer cambio de plano la recta se hace paralela al nuevo plano de proyección (se ve en verdadera magnitud) y con un segundo cambio, perpendicular: entonces se proyecta como un <b>punto</b>, y el segmento que une ese punto con la proyección de P mide la <b>distancia buscada</b>, porque es perpendicular a la recta. Aquí se muestra directamente esa última vista.</Note>
    </Frame>
  );
}
