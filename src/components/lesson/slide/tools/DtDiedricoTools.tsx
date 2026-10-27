"use client";

import { useState, type ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/** Punto del espacio: [x, alejamiento, cota]. El alejamiento es positivo delante del PV; la cota, encima del PH. */
export type P3 = readonly [number, number, number];

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Cuadrante (1–4) o posición especial de un punto según su alejamiento e y su cota z. */
export function cuadrante(e: number, z: number): { n: number; nombre: string } {
  if (e > 0 && z > 0) return { n: 1, nombre: "1.er cuadrante" };
  if (e < 0 && z > 0) return { n: 2, nombre: "2.º cuadrante" };
  if (e < 0 && z < 0) return { n: 3, nombre: "3.er cuadrante" };
  if (e > 0 && z < 0) return { n: 4, nombre: "4.º cuadrante" };
  if (e === 0 && z === 0) return { n: 0, nombre: "en la línea de tierra" };
  if (z === 0) return { n: 0, nombre: e > 0 ? "en el PH anterior (entre el 1.º y el 4.º)" : "en el PH posterior (entre el 2.º y el 3.º)" };
  return { n: 0, nombre: z > 0 ? "en el PV superior (entre el 1.º y el 2.º)" : "en el PV inferior (entre el 3.º y el 4.º)" };
}
/** Proyecciones en la épura: la horizontal queda bajo la LT a distancia e; la vertical, sobre la LT a distancia z. Coordenadas (x, y) con y hacia abajo desde la LT. */
export const proyeccionesPunto = (p: P3): { horiz: Pt; vert: Pt } => ({ horiz: [p[0], p[1]], vert: [p[0], -p[2]] });

/** Trazas de la recta AB: la horizontal H (corte con el PH, cota 0) y la vertical V (corte con el PV, alejamiento 0). */
export function trazasRecta(a: P3, b: P3) {
  const de = b[1] - a[1];
  const dz = b[2] - a[2];
  const pt = (t: number): P3 => [a[0] + t * (b[0] - a[0]), a[1] + t * de, a[2] + t * dz];
  const H = dz !== 0 ? pt(-a[2] / dz) : null;
  const V = de !== 0 ? pt(-a[1] / de) : null;
  return { H, V };
}
export function tipoRecta(a: P3, b: P3) {
  const dx = b[0] - a[0];
  const de = b[1] - a[1];
  const dz = b[2] - a[2];
  if (dx === 0 && de === 0 && dz === 0) return "es un punto";
  if (de === 0 && dz === 0) return "paralela a la línea de tierra";
  if (dx === 0 && dz === 0) return "de punta (perpendicular al PV)";
  if (dx === 0 && de === 0) return "vertical (perpendicular al PH)";
  if (dx === 0) return "de perfil";
  if (dz === 0) return "horizontal (paralela al PH)";
  if (de === 0) return "frontal (paralela al PV)";
  return "oblicua";
}
/** Longitud real de AB y longitudes de sus proyecciones horizontal y vertical. */
export function longitudesRecta(a: P3, b: P3) {
  const dx = b[0] - a[0];
  const de = b[1] - a[1];
  const dz = b[2] - a[2];
  return { real: Math.hypot(dx, de, dz), horiz: Math.hypot(dx, de), vert: Math.hypot(dx, dz) };
}

/** Plano definido por sus trazas, que pasan por un punto de la LT: α₁ forma el ángulo φ₁ con la LT en la proyección horizontal y α₂ el ángulo φ₂ en la vertical. Normal (x, e, z). */
export function normalPlano(phi1: number, phi2: number): P3 {
  const [s1, c1, s2, c2] = [Math.sin(phi1 * RAD), Math.cos(phi1 * RAD), Math.sin(phi2 * RAD), Math.cos(phi2 * RAD)];
  return [-s1 * s2, -c1 * s2, s1 * c2];
}
/** Ángulos (grados) que forma el plano con el PH y con el PV. */
export function inclinacionesPlano(phi1: number, phi2: number) {
  const n = normalPlano(phi1, phi2);
  const m = Math.hypot(...n);
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  return { conPH: Math.acos(clamp(Math.abs(n[2]) / m)) / RAD, conPV: Math.acos(clamp(Math.abs(n[1]) / m)) / RAD };
}
export function tipoPlano(phi1: number, phi2: number) {
  const r1 = Math.abs(phi1 - 90) < 1e-9;
  const r2 = Math.abs(phi2 - 90) < 1e-9;
  if (r1 && r2) return "de perfil (perpendicular a la LT)";
  if (r2) return "proyectante horizontal (perpendicular al PH)";
  if (r1) return "proyectante vertical (perpendicular al PV)";
  return "oblicuo";
}
/** Cota que debe tener el punto (x, e) para pertenecer al plano (NaN si el plano es perpendicular al PH). */
export function cotaEnPlano(phi1: number, phi2: number, x: number, e: number) {
  const n = normalPlano(phi1, phi2);
  return Math.abs(n[2]) < 1e-12 ? NaN : -(n[0] * x + n[1] * e) / n[2];
}
export function perteneceAPlano(phi1: number, phi2: number, p: P3, tol = 1e-6) {
  const n = normalPlano(phi1, phi2);
  return Math.abs(n[0] * p[0] + n[1] * p[1] + n[2] * p[2]) <= tol;
}

/* ───────────── Dibujo de la épura ───────────── */

export const X0 = 260;
export const Y0 = 150;
export const U = 26;
/** Punto de la épura (x, y) con y hacia abajo desde la LT. */
export const ep = (x: number, y: number): Pt => [X0 + x * U, Y0 + y * U];

export function EpuraBase({ children, h = 300, testId }: { children: ReactNode; h?: number; testId: string }) {
  return (
    <Svg w={520} h={h} testId={testId} maxH={330}>
      <line x1={10} y1={Y0} x2={510} y2={Y0} stroke={MANIM.ink} strokeWidth={2.5} />
      <line x1={14} y1={Y0 + 5} x2={30} y2={Y0 + 5} stroke={MANIM.ink} strokeWidth={1.5} />
      <line x1={20} y1={Y0 + 9} x2={36} y2={Y0 + 9} stroke={MANIM.ink} strokeWidth={1.5} />
      <text x={470} y={Y0 + 20} fill={MANIM.muted} fontSize={13} fontWeight={700}>LT</text>
      <text x={16} y={18} fill={MANIM.muted} fontSize={12}>PV (sobre la LT)</text>
      <text x={16} y={h - 8} fill={MANIM.muted} fontSize={12}>PH (bajo la LT)</text>
      {children}
    </Svg>
  );
}

export const tag = (p: Pt, t: string, color: string, dx = 8, dy = -8) => (
  <text x={p[0] + dx} y={p[1] + dy} fill={color} fontSize={15} fontWeight={700}>
    {t}
  </text>
);

/* ───────────── 1. Punto y cuadrantes ───────────── */

export function PuntoDiedricoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { x: 0, e: Math.round(num(block.params?.a, 3, -5, 5)), z: Math.round(num(block.params?.b, 2, -5, 5)) };
  const [s, setS] = useState(init);
  const P: P3 = [s.x, s.e, s.z];
  const { horiz, vert } = proyeccionesPunto(P);
  const c = cuadrante(s.e, s.z);
  const color = c.n === 1 ? MANIM.green : c.n === 0 ? MANIM.yellow : MANIM.blue;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El alejamiento es la distancia al PV y la cota, la distancia al PH. Sus signos deciden el cuadrante."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición lateral x" value={s.x} min={-4} max={4} step={1} unit=" cm" color={MANIM.ink} onChange={(x) => setS((v) => ({ ...v, x }))} />
          <Slider label="Alejamiento e (delante del PV +)" value={s.e} min={-5} max={5} step={1} unit=" cm" color={MANIM.orange} onChange={(e) => setS((v) => ({ ...v, e }))} />
          <Slider label="Cota z (encima del PH +)" value={s.z} min={-5} max={5} step={1} unit=" cm" color={MANIM.blue} onChange={(z) => setS((v) => ({ ...v, z }))} />
        </>
      }
    >
      <EpuraBase testId="diedrico-punto">
        <Seg a={ep(horiz[0], vert[1])} b={ep(horiz[0], horiz[1])} color={MANIM.muted} width={1.5} dashed />
        <Dot p={ep(vert[0], vert[1])} color={MANIM.blue} r={6} />
        <Dot p={ep(horiz[0], horiz[1])} color={MANIM.orange} r={6} />
        {tag(ep(vert[0], vert[1]), "a′", MANIM.blue)}
        {tag(ep(horiz[0], horiz[1]), "a", MANIM.orange, 8, 16)}
      </EpuraBase>
      <Readout>
        <Stat color={color} label="Posición">{c.nombre}</Stat>
        <Stat color={MANIM.blue} label="Distancia al PH (|cota|)">{f1(Math.abs(s.z))} cm</Stat>
        <Stat color={MANIM.orange} label="Distancia al PV (|alejamiento|)">{f1(Math.abs(s.e))} cm</Stat>
        <Stat color={MANIM.muted} label="Separación a′ – a en la épura">{f1(Math.abs(vert[1] - horiz[1]))} cm</Stat>
      </Readout>
      <Note>Un punto se define por <b>dos proyecciones</b>: la <b>horizontal a</b> (sobre el PH) y la <b>vertical a′</b> (sobre el PV). En la épura, a y a′ están en la misma <b>línea de referencia</b> (perpendicular a la LT). Con alejamiento y cota <b>positivos</b> está en el <b>1.er cuadrante</b>, el que se usa por defecto: la proyección vertical queda sobre la LT y la horizontal bajo ella. En el <b>2.º y 4.º</b> las dos proyecciones quedan al mismo lado de la LT; en el <b>3.º</b> están invertidas.</Note>
    </Frame>
  );
}

/* ───────────── 2. Recta: proyecciones y trazas ───────────── */

export function RectaDiedricoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { ae: Math.round(num(block.params?.a, 1, -4, 4)), az: 4, be: Math.round(num(block.params?.b, 4, -4, 4)), bz: 1 };
  const [s, setS] = useState(init);
  const A: P3 = [-3, s.ae, s.az];
  const B: P3 = [3, s.be, s.bz];
  const tr = trazasRecta(A, B);
  const tipo = tipoRecta(A, B);
  const cuad = new Set<number>();
  for (let t = -4; t <= 5; t += 0.1) {
    const q: P3 = [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1]), A[2] + t * (B[2] - A[2])];
    const cc = cuadrante(Math.abs(q[1]) < 1e-9 ? 0 : q[1], Math.abs(q[2]) < 1e-9 ? 0 : q[2]);
    if (cc.n > 0) cuad.add(cc.n);
  }
  const ext = (a: Pt, b: Pt): [Pt, Pt] => {
    const d: Pt = [b[0] - a[0], b[1] - a[1]];
    const k = 8;
    return [[a[0] - k * d[0], a[1] - k * d[1]], [a[0] + k * d[0], a[1] + k * d[1]]];
  };
  const hA = proyeccionesPunto(A);
  const hB = proyeccionesPunto(B);
  const [h0, h1] = ext(hA.horiz, hB.horiz);
  const [v0, v1] = ext(hA.vert, hB.vert);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La recta se define por las proyecciones de dos puntos. Sus trazas son los puntos donde atraviesa los planos de proyección."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Alejamiento de A" value={s.ae} min={-4} max={4} step={1} unit=" cm" color={MANIM.orange} onChange={(ae) => setS((v) => ({ ...v, ae }))} />
          <Slider label="Cota de A" value={s.az} min={-4} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(az) => setS((v) => ({ ...v, az }))} />
          <Slider label="Alejamiento de B" value={s.be} min={-4} max={4} step={1} unit=" cm" color={MANIM.orange} onChange={(be) => setS((v) => ({ ...v, be }))} />
          <Slider label="Cota de B" value={s.bz} min={-4} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(bz) => setS((v) => ({ ...v, bz }))} />
        </>
      }
    >
      <EpuraBase testId="diedrico-recta">
        <Seg a={ep(...h0)} b={ep(...h1)} color={MANIM.orange} width={1.2} dashed />
        <Seg a={ep(...v0)} b={ep(...v1)} color={MANIM.blue} width={1.2} dashed />
        <Seg a={ep(...hA.horiz)} b={ep(...hB.horiz)} color={MANIM.orange} width={3.5} />
        <Seg a={ep(...hA.vert)} b={ep(...hB.vert)} color={MANIM.blue} width={3.5} />
        {tag(ep(...hA.horiz), "a", MANIM.orange, -14, 16)}
        {tag(ep(...hB.horiz), "b", MANIM.orange, 6, 16)}
        {tag(ep(...hA.vert), "a′", MANIM.blue, -20, -6)}
        {tag(ep(...hB.vert), "b′", MANIM.blue, 6, -6)}
        {tr.H ? (
          <>
            <Dot p={ep(tr.H[0], tr.H[1])} color={MANIM.green} r={6} />
            {tag(ep(tr.H[0], tr.H[1]), "H", MANIM.green, 8, 16)}
          </>
        ) : null}
        {tr.V ? (
          <>
            <Dot p={ep(tr.V[0], -tr.V[2])} color={MANIM.purple} r={6} />
            {tag(ep(tr.V[0], -tr.V[2]), "V′", MANIM.purple, 8, -8)}
          </>
        ) : null}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.green} label="Traza horizontal H">{tr.H ? `x = ${f1(tr.H[0])}, alej. ${f1(tr.H[1])}` : "no tiene (paralela al PH)"}</Stat>
        <Stat color={MANIM.purple} label="Traza vertical V">{tr.V ? `x = ${f1(tr.V[0])}, cota ${f1(tr.V[2])}` : "no tiene (paralela al PV)"}</Stat>
        <Stat color={MANIM.yellow} label="Cuadrantes que atraviesa">{cuad.size ? [...cuad].sort().map((n) => `${n}.º`).join(", ") : "—"}</Stat>
        <Stat color={MANIM.blue} label="Tipo de recta">{tipo}</Stat>
      </Readout>
      <Note>Una recta queda definida por las proyecciones <b>ab</b> y <b>a′b′</b> de dos de sus puntos. Sus <b>trazas</b> son los puntos donde corta a los planos de proyección: la <b>traza horizontal H</b> (cota 0) tiene la proyección vertical sobre la LT, y la <b>traza vertical V</b> (alejamiento 0) tiene la proyección horizontal sobre la LT. Entre las trazas, la recta está en el <b>1.er cuadrante</b> si sus dos proyecciones se alejan de la LT. Prueba a dar a A y B cotas de distinto signo.</Note>
    </Frame>
  );
}

/* ───────────── 3. Posiciones particulares de la recta ───────────── */

type TipoRecta = "lt" | "horizontal" | "frontal" | "vertical" | "punta" | "perfil" | "oblicua";
const RECTAS: { value: TipoRecta; label: string; a: P3; b: P3; nota: string }[] = [
  { value: "lt", label: "Paralela a la LT", a: [-3, 2, 2], b: [3, 2, 2], nota: "a′b′ y ab son paralelas a la LT: las dos se ven en verdadera magnitud." },
  { value: "horizontal", label: "Horizontal", a: [-3, 1, 2], b: [2, 4, 2], nota: "a′b′ es paralela a la LT; ab está en verdadera magnitud y su ángulo con la LT es el que la recta forma con el PV." },
  { value: "frontal", label: "Frontal", a: [-3, 2, 1], b: [2, 2, 4], nota: "ab es paralela a la LT; a′b′ está en verdadera magnitud y su ángulo con la LT es el que la recta forma con el PH." },
  { value: "vertical", label: "Vertical", a: [1, 2, 1], b: [1, 2, 5], nota: "Perpendicular al PH: su proyección horizontal es un punto y a′b′ es perpendicular a la LT, en verdadera magnitud." },
  { value: "punta", label: "De punta", a: [1, 1, 2], b: [1, 5, 2], nota: "Perpendicular al PV: su proyección vertical es un punto y ab es perpendicular a la LT, en verdadera magnitud." },
  { value: "perfil", label: "De perfil", a: [1, 1, 1], b: [1, 4, 4], nota: "Está en un plano perpendicular a la LT: ab y a′b′ son perpendiculares a la LT y no bastan para saber dónde están sus puntos." },
  { value: "oblicua", label: "Oblicua", a: [-3, 1, 1], b: [3, 4, 5], nota: "No es paralela a ningún plano: ninguna proyección está en verdadera magnitud." },
];

export function PosicionesRectaDt1Explorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 0, 0, RECTAS.length - 1));
  const init = RECTAS[idx]!.value;
  const [t, setT] = useState<TipoRecta>(init);
  const r = RECTAS.find((x) => x.value === t)!;
  const L = longitudesRecta(r.a, r.b);
  const pa = proyeccionesPunto(r.a);
  const pb = proyeccionesPunto(r.b);
  const puntoH = Math.abs(L.horiz) < 1e-9;
  const puntoV = Math.abs(L.vert) < 1e-9;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una posición y observa cómo son las proyecciones. Compara la longitud real con la de cada proyección."}
      onReset={() => setT(init)}
      controls={<Choice label="Posición de la recta" items={RECTAS.map((x) => ({ value: x.value, label: x.label }))} value={t} onChange={setT} />}
    >
      <EpuraBase testId="diedrico-posiciones">
        {puntoH ? null : <Seg a={ep(...pa.horiz)} b={ep(...pb.horiz)} color={MANIM.orange} width={3.5} />}
        {puntoV ? null : <Seg a={ep(...pa.vert)} b={ep(...pb.vert)} color={MANIM.blue} width={3.5} />}
        <Dot p={ep(...pa.horiz)} color={MANIM.orange} r={5} />
        <Dot p={ep(...pb.horiz)} color={MANIM.orange} r={5} />
        <Dot p={ep(...pa.vert)} color={MANIM.blue} r={5} />
        <Dot p={ep(...pb.vert)} color={MANIM.blue} r={5} />
        {tag(ep(...pa.horiz), puntoH ? "a ≡ b" : "a", MANIM.orange, -16, 18)}
        {puntoH ? null : tag(ep(...pb.horiz), "b", MANIM.orange, 8, 18)}
        {tag(ep(...pa.vert), puntoV ? "a′ ≡ b′" : "a′", MANIM.blue, -18, -8)}
        {puntoV ? null : tag(ep(...pb.vert), "b′", MANIM.blue, 8, -8)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.green} label="Longitud real AB">{f2(L.real)} cm</Stat>
        <Stat color={Math.abs(L.horiz - L.real) < 1e-9 ? MANIM.green : MANIM.orange} label="Proyección horizontal ab">{f2(L.horiz)} cm</Stat>
        <Stat color={Math.abs(L.vert - L.real) < 1e-9 ? MANIM.green : MANIM.blue} label="Proyección vertical a′b′">{f2(L.vert)} cm</Stat>
      </Readout>
      <Note><b>{r.label}.</b> {r.nota} Una proyección aparece en <b>verdadera magnitud</b> cuando la recta es paralela al plano sobre el que se proyecta; si no, se ve <b>más corta</b>. En verde, las proyecciones que miden lo mismo que la recta real.</Note>
    </Frame>
  );
}

/* ───────────── 4. Plano: trazas, tipos e inclinaciones ───────────── */

export function PlanoTrazasDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { f1: Math.round(num(block.params?.a, 140, 20, 160) / 5) * 5, f2: Math.round(num(block.params?.b, 50, 20, 160) / 5) * 5 };
  const [s, setS] = useState(init);
  const inc = inclinacionesPlano(s.f1, s.f2);
  const tipo = tipoPlano(s.f1, s.f2);
  const L = 7;
  const d1: Pt = [Math.cos(s.f1 * RAD), -Math.sin(s.f1 * RAD)];
  const d2: Pt = [Math.cos(s.f2 * RAD), -Math.sin(s.f2 * RAD)];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un plano se define por sus dos trazas, que se cortan en la línea de tierra. Cambia sus ángulos y mira de qué tipo es."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de la traza horizontal α₁ con la LT" value={s.f1} min={20} max={160} step={5} unit="°" color={MANIM.orange} onChange={(f1v) => setS((v) => ({ ...v, f1: f1v }))} />
          <Slider label="Ángulo de la traza vertical α₂ con la LT" value={s.f2} min={20} max={160} step={5} unit="°" color={MANIM.blue} onChange={(f2v) => setS((v) => ({ ...v, f2: f2v }))} />
        </>
      }
    >
      <EpuraBase testId="diedrico-plano">
        <Seg a={ep(0, 0)} b={ep(-L * d1[0], -L * d1[1])} color={MANIM.orange} width={3.5} />
        <Seg a={ep(0, 0)} b={ep(L * d1[0], L * d1[1])} color={MANIM.orange} width={1.5} dashed />
        <Seg a={ep(0, 0)} b={ep(L * d2[0], L * d2[1])} color={MANIM.blue} width={3.5} />
        <Seg a={ep(0, 0)} b={ep(-L * d2[0], -L * d2[1])} color={MANIM.blue} width={1.5} dashed />
        {tag(ep(-0.6 * L * d1[0], -0.6 * L * d1[1]), "α₁", MANIM.orange, 8, 14)}
        {tag(ep(0.6 * L * d2[0], 0.6 * L * d2[1]), "α₂", MANIM.blue, 8, -6)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.green} label="Tipo de plano">{tipo}</Stat>
        <Stat color={MANIM.orange} label="Ángulo con el PH">{f1(inc.conPH)}°</Stat>
        <Stat color={MANIM.blue} label="Ángulo con el PV">{f1(inc.conPV)}°</Stat>
      </Readout>
      <Note>Un plano oblicuo queda definido por sus <b>trazas</b>: la <b>horizontal α₁</b> (corte con el PH) y la <b>vertical α₂</b> (corte con el PV), que se cortan en un punto de la LT. Si la traza vertical es perpendicular a la LT, el plano es <b>proyectante horizontal</b> (perpendicular al PH); si lo es la horizontal, <b>proyectante vertical</b>; si lo son las dos, de <b>perfil</b>. Si las trazas son paralelas a la LT, el plano es <b>paralelo a la LT</b>. Los planos <b>horizontales</b> y <b>frontales</b> solo tienen una traza.</Note>
    </Frame>
  );
}

/* ───────────── 5. Pertenencia de un punto a un plano ───────────── */

const PHI1 = 135;
const PHI2 = 45;

export function PertenenciaPlanoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { x: Math.round(num(block.params?.a, 3, 0, 4)), e: Math.round(num(block.params?.b, 1, -2, 3)), z: 3 };
  const [s, setS] = useState(init);
  const zReq = cotaEnPlano(PHI1, PHI2, s.x, s.e);
  const pertenece = Math.abs(s.z - zReq) < 0.26;
  const d1: Pt = [Math.cos(PHI1 * RAD), -Math.sin(PHI1 * RAD)];
  const d2: Pt = [Math.cos(PHI2 * RAD), -Math.sin(PHI2 * RAD)];
  const L = 7;
  const m2 = Math.tan(PHI2 * RAD);
  const xq = s.z / m2; // punto de α₂ a la cota del punto: allí empieza la recta horizontal h
  const color = pertenece ? MANIM.green : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un punto pertenece al plano si su proyección horizontal está en una recta horizontal del plano cuya proyección vertical pasa por la proyección vertical del punto."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición lateral x del punto" value={s.x} min={0} max={4} step={1} unit=" cm" color={MANIM.ink} onChange={(x) => setS((v) => ({ ...v, x }))} />
          <Slider label="Alejamiento e" value={s.e} min={-2} max={3} step={1} unit=" cm" color={MANIM.orange} onChange={(e) => setS((v) => ({ ...v, e }))} />
          <Slider label="Cota z" value={s.z} min={0} max={5} step={0.5} unit=" cm" color={MANIM.blue} onChange={(z) => setS((v) => ({ ...v, z }))} />
        </>
      }
    >
      <EpuraBase testId="diedrico-pertenencia">
        <Seg a={ep(0, 0)} b={ep(-L * d1[0], -L * d1[1])} color={MANIM.orange} width={3} />
        <Seg a={ep(0, 0)} b={ep(L * d1[0], L * d1[1])} color={MANIM.orange} width={1.2} dashed />
        <Seg a={ep(0, 0)} b={ep(L * d2[0], L * d2[1])} color={MANIM.blue} width={3} />
        {tag(ep(-0.55 * L * d1[0], -0.55 * L * d1[1]), "α₁", MANIM.orange, 8, 14)}
        {tag(ep(0.45 * L * d2[0], 0.45 * L * d2[1]), "α₂", MANIM.blue, 8, -6)}
        {/* recta horizontal h del plano a la cota del punto: h′ paralela a la LT, h paralela a α₁ por el corte con la LT */}
        <Seg a={ep(-1, -s.z)} b={ep(6, -s.z)} color={MANIM.purple} width={1.5} dashed />
        <Seg a={ep(xq, 0)} b={ep(xq + 5 * d1[0], 5 * d1[1])} color={MANIM.purple} width={2} dashed />
        <Seg a={ep(xq, 0)} b={ep(xq - 5 * d1[0], -5 * d1[1])} color={MANIM.purple} width={2} dashed />
        <Seg a={ep(s.x, -s.z)} b={ep(s.x, s.e)} color={MANIM.muted} width={1.2} dashed />
        <Dot p={ep(s.x, -s.z)} color={color} r={6} />
        <Dot p={ep(s.x, s.e)} color={color} r={6} />
        {tag(ep(s.x, -s.z), "a′", color, 8, -8)}
        {tag(ep(s.x, s.e), "a", color, 8, 16)}
        {tag(ep(5.6, -s.z), "h′", MANIM.purple, 0, -6)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.blue} label="Cota que debería tener para pertenecer">{Number.isFinite(zReq) ? `${f2(zReq)} cm` : "—"}</Stat>
        <Stat color={color} label="¿Pertenece al plano?">{pertenece ? "sí (a está sobre h)" : "no"}</Stat>
      </Readout>
      <Note>Un punto A pertenece a un plano si está en una <b>recta del plano</b>. Se toma la <b>recta horizontal h</b> que pasa por A: su proyección vertical <b>h′</b> es paralela a la LT y pasa por a′; corta a la traza α₂ y de ahí se baja a la LT. Su proyección horizontal <b>h</b> es <b>paralela a la traza α₁</b> y pasa por ese punto. A pertenece al plano si <b>a está sobre h</b>. Cambia el alejamiento y la cota hasta que a caiga sobre la recta.</Note>
    </Frame>
  );
}
