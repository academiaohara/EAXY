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
const f3 = (v: number) => fmtEs(v, 3);

const RAD = Math.PI / 180;
const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const baricentro = (a: Pt, b: Pt, c: Pt): Pt => [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3];
/** Circuncentro (NaN si los tres puntos están alineados). */
export function circuncentro(a: Pt, b: Pt, c: Pt): Pt {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  if (Math.abs(d) < 1e-12) return [NaN, NaN];
  const a2 = a[0] ** 2 + a[1] ** 2;
  const b2 = b[0] ** 2 + b[1] ** 2;
  const c2 = c[0] ** 2 + c[1] ** 2;
  return [(a2 * (b[1] - c[1]) + b2 * (c[1] - a[1]) + c2 * (a[1] - b[1])) / d, (a2 * (c[0] - b[0]) + b2 * (a[0] - c[0]) + c2 * (b[0] - a[0])) / d];
}
/** Ortocentro: H = A + B + C − 2·O (relación de Euler, O = circuncentro). */
export function ortocentro(a: Pt, b: Pt, c: Pt): Pt {
  const o = circuncentro(a, b, c);
  return [a[0] + b[0] + c[0] - 2 * o[0], a[1] + b[1] + c[1] - 2 * o[1]];
}
/** Incentro y radio de la circunferencia inscrita. */
export function incentro(a: Pt, b: Pt, c: Pt) {
  const la = dist(b, c);
  const lb = dist(a, c);
  const lc = dist(a, b);
  const p = la + lb + lc;
  if (p === 0) return { centro: [NaN, NaN] as Pt, r: NaN };
  const area = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
  return { centro: [(la * a[0] + lb * b[0] + lc * c[0]) / p, (la * a[1] + lb * b[1] + lc * c[1]) / p] as Pt, r: (2 * area) / p };
}

export const existeTriangulo = (a: number, b: number, c: number) => a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
/** Ángulos (grados) opuestos a los lados a, b y c por el teorema del coseno. */
export function angulosTriangulo(a: number, b: number, c: number): [number, number, number] {
  if (!existeTriangulo(a, b, c)) return [NaN, NaN, NaN];
  const ang = (x: number, y: number, z: number) => Math.acos((y * y + z * z - x * x) / (2 * y * z)) / RAD;
  return [ang(a, b, c), ang(b, a, c), ang(c, a, b)];
}
export function clasificaTriangulo(a: number, b: number, c: number) {
  if (!existeTriangulo(a, b, c)) return { lados: "no existe", angulos: "no existe" };
  const eps = 1e-9;
  const lados = Math.abs(a - b) < eps && Math.abs(b - c) < eps ? "equilátero" : Math.abs(a - b) < eps || Math.abs(b - c) < eps || Math.abs(a - c) < eps ? "isósceles" : "escaleno";
  const [x, y, z] = [a, b, c].sort((p, q) => p - q) as [number, number, number];
  const d = z * z - (x * x + y * y);
  const angulos = Math.abs(d) < 1e-9 ? "rectángulo" : d > 0 ? "obtusángulo" : "acutángulo";
  return { lados, angulos };
}

export function tipoParalelogramo(a: number, b: number, angDeg: number) {
  const igual = Math.abs(a - b) < 1e-9;
  const recto = Math.abs(angDeg - 90) < 1e-9;
  return igual && recto ? "cuadrado" : igual ? "rombo" : recto ? "rectángulo" : "romboide";
}
export function diagonalesParalelogramo(a: number, b: number, angDeg: number): [number, number] {
  const c = Math.cos(angDeg * RAD);
  return [Math.sqrt(Math.max(0, a * a + b * b + 2 * a * b * c)), Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * c))];
}
export const areaParalelogramo = (a: number, b: number, angDeg: number) => a * b * Math.sin(angDeg * RAD);

/** Polígono regular de n lados inscrito en una circunferencia de radio R. */
export function poligonoRegular(n: number, R: number) {
  const lado = 2 * R * Math.sin(Math.PI / n);
  const apotema = R * Math.cos(Math.PI / n);
  return { lado, apotema, area: (n * lado * apotema) / 2, interior: (180 * (n - 2)) / n, central: 360 / n, perimetro: n * lado, sumaInteriores: 180 * (n - 2), diagonales: (n * (n - 3)) / 2 };
}
/** Radio de la circunferencia circunscrita a un polígono regular de n lados de longitud l. */
export const radioDadoLado = (n: number, l: number) => l / (2 * Math.sin(Math.PI / n));

/**
 * Método general (aproximado) para inscribir un polígono de n lados en una circunferencia de radio R:
 * se divide el diámetro vertical AB en n partes, se hallan P y P′ (arcos de radio AB centrados en A y B) y la recta que
 * une P con la segunda división corta a la circunferencia en el vértice V; AV es el lado aproximado.
 */
export function metodoGeneral(n: number, R = 1) {
  const A: Pt = [0, R];
  const B: Pt = [0, -R];
  const P: Pt = [R * Math.sqrt(3), 0];
  const D2: Pt = [0, R - (2 * R * 2) / n];
  const dx = D2[0] - P[0];
  const dy = D2[1] - P[1];
  // |P + t·d| = R  →  t² |d|² + 2t (P·d) + |P|² − R² = 0 ; el vértice es la raíz mayor (lado opuesto a P)
  const qa = dx * dx + dy * dy;
  const qb = 2 * (P[0] * dx + P[1] * dy);
  const qc = P[0] * P[0] + P[1] * P[1] - R * R;
  const disc = qb * qb - 4 * qa * qc;
  const t = (-qb + Math.sqrt(Math.max(0, disc))) / (2 * qa);
  const V: Pt = [P[0] + t * dx, P[1] + t * dy];
  const aproximado = dist(A, V);
  const exacto = 2 * R * Math.sin(Math.PI / n);
  return { A, B, P, D2, V, aproximado, exacto, error: (aproximado - exacto) / exacto };
}

export const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));
/** {n/k} es un polígono estrellado propio si mcd(n, k) = 1 y 2 ≤ k < n/2. */
export const esEstrellado = (n: number, k: number) => k >= 2 && 2 * k < n && mcd(n, k) === 1;
/** Ángulo de cada punta de la estrella {n/k}. */
export const anguloPunta = (n: number, k: number) => (180 * (n - 2 * k)) / n;

/* ───────────── 1. Puntos notables del triángulo ───────────── */

type Centro = "baricentro" | "incentro" | "circuncentro" | "ortocentro";
const CENTROS: { value: Centro; label: string }[] = [
  { value: "baricentro", label: "Baricentro (medianas)" },
  { value: "incentro", label: "Incentro (bisectrices)" },
  { value: "circuncentro", label: "Circuncentro (mediatrices)" },
  { value: "ortocentro", label: "Ortocentro (alturas)" },
];

export function PuntosNotablesDt1Explorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 0, 0, 3));
  const init = { c: CENTROS[idx]!.value, x: 4, y: 4.5 };
  const [s, setS] = useState<{ c: Centro; x: number; y: number }>(init);
  const A: Pt = [0, 0];
  const B: Pt = [6, 0];
  const C: Pt = [s.x, s.y];
  const U = 32;
  const sc = (p: Pt): Pt => [100 + p[0] * U, 250 - p[1] * U];
  const G = baricentro(A, B, C);
  const I = incentro(A, B, C);
  const O = circuncentro(A, B, C);
  const H = ortocentro(A, B, C);
  const M = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const poly = [A, B, C].map((p) => sc(p).join(",")).join(" ");
  const R = dist(O, A);
  const pie = (v: Pt, p: Pt, q: Pt): Pt => {
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const t = ((v[0] - p[0]) * dx + (v[1] - p[1]) * dy) / (dx * dx + dy * dy);
    return [p[0] + t * dx, p[1] + t * dy];
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el vértice C y observa dónde caen los cuatro puntos notables. ¿Cuándo salen del triángulo?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Punto notable resaltado" items={CENTROS} value={s.c} onChange={(c) => setS((v) => ({ ...v, c }))} />
          <Slider label="Posición horizontal de C" value={s.x} min={-2} max={8} step={0.5} unit=" cm" color={MANIM.blue} onChange={(x) => setS((v) => ({ ...v, x }))} />
          <Slider label="Altura de C" value={s.y} min={1} max={7} step={0.5} unit=" cm" color={MANIM.orange} onChange={(y) => setS((v) => ({ ...v, y }))} />
        </>
      }
    >
      <Svg w={520} h={290} testId="puntos-notables" maxH={320}>
        <polygon points={poly} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={2.5} />
        {s.c === "baricentro"
          ? [
              [A, M(B, C)],
              [B, M(A, C)],
              [C, M(A, B)],
            ].map(([p, q], i) => <Seg key={i} a={sc(p as Pt)} b={sc(q as Pt)} color={MANIM.blue} width={2} />)
          : null}
        {s.c === "circuncentro" && Number.isFinite(R) ? (
          <>
            <circle cx={sc(O)[0]} cy={sc(O)[1]} r={R * U} fill="none" stroke={MANIM.purple} strokeWidth={2} />
            {[
              [A, B],
              [B, C],
              [A, C],
            ].map(([p, q], i) => <Seg key={i} a={sc(M(p as Pt, q as Pt))} b={sc(O)} color={MANIM.purple} width={2} dashed />)}
          </>
        ) : null}
        {s.c === "incentro" && Number.isFinite(I.r) ? <circle cx={sc(I.centro)[0]} cy={sc(I.centro)[1]} r={I.r * U} fill="none" stroke={MANIM.green} strokeWidth={2} /> : null}
        {s.c === "ortocentro"
          ? [
              [A, B, C],
              [B, A, C],
              [C, A, B],
            ].map(([v, p, q], i) => <Seg key={i} a={sc(v as Pt)} b={sc(pie(v as Pt, p as Pt, q as Pt))} color={MANIM.orange} width={2} />)
          : null}
        <Dot p={sc(G)} color={MANIM.blue} r={s.c === "baricentro" ? 7 : 4.5} />
        <Dot p={sc(I.centro)} color={MANIM.green} r={s.c === "incentro" ? 7 : 4.5} />
        {Number.isFinite(O[0]) ? <Dot p={sc(O)} color={MANIM.purple} r={s.c === "circuncentro" ? 7 : 4.5} /> : null}
        {Number.isFinite(H[0]) ? <Dot p={sc(H)} color={MANIM.orange} r={s.c === "ortocentro" ? 7 : 4.5} /> : null}
        <text x={sc(A)[0] - 14} y={sc(A)[1] + 18} fill={MANIM.ink} fontSize={15} fontWeight={700}>A</text>
        <text x={sc(B)[0] + 4} y={sc(B)[1] + 18} fill={MANIM.ink} fontSize={15} fontWeight={700}>B</text>
        <text x={sc(C)[0] + 6} y={sc(C)[1] - 8} fill={MANIM.ink} fontSize={15} fontWeight={700}>C</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Baricentro G">({f2(G[0])}; {f2(G[1])})</Stat>
        <Stat color={MANIM.green} label="Incentro I · radio inscrito">({f2(I.centro[0])}; {f2(I.centro[1])}) · r = {f2(I.r)}</Stat>
        <Stat color={MANIM.purple} label="Circuncentro O">({f2(O[0])}; {f2(O[1])})</Stat>
        <Stat color={MANIM.orange} label="Ortocentro H">({f2(H[0])}; {f2(H[1])})</Stat>
      </Readout>
      <Note>El <b>baricentro</b> (cortan las medianas) divide cada mediana en razón 2:1. El <b>incentro</b> (bisectrices) es el centro de la circunferencia <b>inscrita</b>. El <b>circuncentro</b> (mediatrices) es el centro de la <b>circunscrita</b> y sale del triángulo si este es obtusángulo. El <b>ortocentro</b> (alturas) coincide con el vértice del ángulo recto en un triángulo rectángulo. G, O y H están siempre alineados: es la <b>recta de Euler</b>, con H = 3G − 2O.</Note>
    </Frame>
  );
}

/* ───────────── 2. Triángulo a partir de sus lados ───────────── */

export function TrianguloDatosDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 4, 1, 10)), b: Math.round(num(block.params?.b, 5, 1, 10)), c: Math.round(num(block.params?.c, 6, 1, 10)) };
  const [s, setS] = useState(init);
  const ok = existeTriangulo(s.a, s.b, s.c);
  const [A, B, C] = angulosTriangulo(s.a, s.b, s.c);
  const cls = clasificaTriangulo(s.a, s.b, s.c);
  const u = 300 / Math.max(s.c, s.a, s.b, 1);
  const x = (s.b * s.b + s.c * s.c - s.a * s.a) / (2 * s.c);
  const y = ok ? Math.sqrt(Math.max(0, s.b * s.b - x * x)) : 0;
  const P0: Pt = [80, 250];
  const pt = (px: number, py: number): Pt => [P0[0] + px * u, P0[1] - py * u];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un triángulo existe solo si cada lado es menor que la suma de los otros dos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Lado a (BC)" value={s.a} min={1} max={10} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label="Lado b (AC)" value={s.b} min={1} max={10} step={1} unit=" cm" color={MANIM.orange} onChange={(b) => setS((v) => ({ ...v, b }))} />
          <Slider label="Lado c (AB)" value={s.c} min={1} max={10} step={1} unit=" cm" color={MANIM.purple} onChange={(c) => setS((v) => ({ ...v, c }))} />
        </>
      }
    >
      <Svg w={520} h={280} testId="triangulo-datos" maxH={310}>
        {ok ? (
          <>
            <polygon points={[pt(0, 0), pt(s.c, 0), pt(x, y)].map((p) => p.join(",")).join(" ")} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={2.5} />
            <text x={pt(0, 0)[0] - 14} y={pt(0, 0)[1] + 18} fill={MANIM.ink} fontSize={15} fontWeight={700}>A</text>
            <text x={pt(s.c, 0)[0] + 4} y={pt(s.c, 0)[1] + 18} fill={MANIM.ink} fontSize={15} fontWeight={700}>B</text>
            <text x={pt(x, y)[0] + 6} y={pt(x, y)[1] - 8} fill={MANIM.ink} fontSize={15} fontWeight={700}>C</text>
          </>
        ) : (
          <>
            <Seg a={pt(0, 0)} b={pt(s.c, 0)} color={MANIM.purple} width={4} />
            <text x={260} y={120} textAnchor="middle" fill={MANIM.red} fontSize={18} fontWeight={700}>
              Con esos lados no se cierra el triángulo
            </text>
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={ok ? MANIM.green : MANIM.red} label="¿Existe?">{ok ? "sí" : `no: ${[s.a, s.b, s.c].sort((p, q) => q - p)[0]} ≥ ${[s.a, s.b, s.c].reduce((p, q) => p + q, 0) - [s.a, s.b, s.c].sort((p, q) => q - p)[0]!}`}</Stat>
        <Stat color={MANIM.blue} label="Ángulos A · B · C">{ok ? `${f1(A)}° · ${f1(B)}° · ${f1(C)}°` : "—"}</Stat>
        <Stat color={MANIM.orange} label="Por sus lados">{cls.lados}</Stat>
        <Stat color={MANIM.purple} label="Por sus ángulos">{cls.angulos}</Stat>
      </Readout>
      <Note><b>Desigualdad triangular:</b> cada lado debe ser menor que la suma de los otros dos. Se construye con compás: se traza AB = c y se corta con un arco de radio b desde A y otro de radio a desde B; el cruce es C. Los ángulos salen del <b>teorema del coseno</b>. Un triángulo es <b>rectángulo</b> si el cuadrado del mayor lado es la suma de los otros dos, y <b>obtusángulo</b> si es mayor.</Note>
    </Frame>
  );
}

/* ───────────── 3. Paralelogramos ───────────── */

export function CuadrilateroDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 5, 2, 8)), b: Math.round(num(block.params?.b, 3, 2, 8)), ang: 70 };
  const [s, setS] = useState(init);
  const tipo = tipoParalelogramo(s.a, s.b, s.ang);
  const [d1, d2] = diagonalesParalelogramo(s.a, s.b, s.ang);
  const u = Math.min(34, 330 / (s.a + s.b), 190 / s.b);
  const th = s.ang * RAD;
  const O: Pt = [70, 225];
  const pt = (x: number, y: number): Pt => [O[0] + x * u, O[1] - y * u];
  const P = [pt(0, 0), pt(s.a, 0), pt(s.a + s.b * Math.cos(th), s.b * Math.sin(th)), pt(s.b * Math.cos(th), s.b * Math.sin(th))];
  const lados = tipo === "cuadrado" ? "4 lados y 4 ángulos iguales" : tipo === "rombo" ? "4 lados iguales" : tipo === "rectángulo" ? "4 ángulos rectos" : "lados y ángulos opuestos iguales";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia los lados y el ángulo: ¿cuándo el paralelogramo se convierte en rectángulo, rombo o cuadrado?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Lado a" value={s.a} min={2} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label="Lado b" value={s.b} min={2} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(b) => setS((v) => ({ ...v, b }))} />
          <Slider label="Ángulo entre los lados" value={s.ang} min={30} max={150} step={5} unit="°" color={MANIM.purple} onChange={(ang) => setS((v) => ({ ...v, ang }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="cuadrilatero" maxH={280}>
        <polygon points={P.map((p) => p.join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={2.5} />
        <Seg a={P[0]!} b={P[2]!} color={MANIM.green} width={2} dashed />
        <Seg a={P[1]!} b={P[3]!} color={MANIM.orange} width={2} dashed />
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Tipo">{tipo}</Stat>
        <Stat color={MANIM.muted} label="Propiedad">{lados}</Stat>
        <Stat color={MANIM.blue} label="Diagonales">{f2(d1)} cm · {f2(d2)} cm</Stat>
        <Stat color={MANIM.purple} label="Área = a·b·sen α">{f2(areaParalelogramo(s.a, s.b, s.ang))} cm²</Stat>
      </Readout>
      <Note>Los <b>paralelogramos</b> tienen los lados opuestos paralelos e iguales y las diagonales se cortan en su punto medio. Si además los 4 ángulos son rectos es un <b>rectángulo</b> (diagonales iguales); si los 4 lados son iguales, un <b>rombo</b> (diagonales perpendiculares); si ambas cosas, un <b>cuadrado</b>. Los <b>trapecios</b> tienen solo un par de lados paralelos y los <b>trapezoides</b> ninguno.</Note>
    </Frame>
  );
}

/* ───────────── 4. Polígonos regulares ───────────── */

export function PoligonoRegularDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 6, 3, 16)), R: Math.round(num(block.params?.a, 4, 1, 8)) };
  const [s, setS] = useState(init);
  const p = poligonoRegular(s.n, s.R);
  const U = 90 / s.R;
  const C: Pt = [260, 135];
  const V = Array.from({ length: s.n }, (_, i): Pt => [C[0] + s.R * U * Math.sin((2 * Math.PI * i) / s.n), C[1] - s.R * U * Math.cos((2 * Math.PI * i) / s.n)]);
  const mid: Pt = [(V[0]![0] + V[1]![0]) / 2, (V[0]![1] + V[1]![1]) / 2];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con más lados, el polígono se parece cada vez más a su circunferencia circunscrita."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Número de lados n" value={s.n} min={3} max={16} step={1} color={MANIM.blue} onChange={(n) => setS((v) => ({ ...v, n }))} />
          <Slider label="Radio R de la circunferencia circunscrita" value={s.R} min={1} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(R) => setS((v) => ({ ...v, R }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="poligono-regular" maxH={300}>
        <circle cx={C[0]} cy={C[1]} r={s.R * U} fill="none" stroke={MANIM.muted} strokeWidth={1} strokeDasharray="5 5" />
        <polygon points={V.map((q) => q.join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.18} stroke={MANIM.blue} strokeWidth={2.5} />
        <Seg a={C} b={V[0]!} color={MANIM.orange} width={2} />
        <Seg a={C} b={V[1]!} color={MANIM.orange} width={2} />
        <Seg a={C} b={mid} color={MANIM.green} width={2.5} />
        <Dot p={C} color={MANIM.ink} r={4} />
        <text x={(C[0] + mid[0]) / 2 + 6} y={(C[1] + mid[1]) / 2 + 4} fill={MANIM.green} fontSize={13} fontWeight={700}>a</text>
        <text x={(C[0] + V[0]![0]) / 2 - 12} y={(C[1] + V[0]![1]) / 2} fill={MANIM.orange} fontSize={13} fontWeight={700}>R</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Ángulo central 360°/n">{f1(p.central)}°</Stat>
        <Stat color={MANIM.blue} label="Ángulo interior 180°(n − 2)/n">{f1(p.interior)}°</Stat>
        <Stat color={MANIM.purple} label="Lado l = 2R·sen(180°/n)">{f2(p.lado)} cm</Stat>
        <Stat color={MANIM.green} label="Apotema a = R·cos(180°/n)">{f2(p.apotema)} cm</Stat>
        <Stat color={MANIM.yellow} label="Área = perímetro · apotema / 2">{f2(p.area)} cm²</Stat>
      </Readout>
      <Note>En un polígono regular los lados y los ángulos son iguales y siempre se puede <b>inscribir en una circunferencia</b> (centro O). El <b>ángulo central</b> es 360°/n y el <b>apotema</b> es la distancia del centro al lado. El hexágono es especial: su lado es igual al radio. Tiene {fmtEs(p.diagonales, 0)} diagonales y la suma de sus ángulos interiores vale {fmtEs(p.sumaInteriores, 0)}°.</Note>
    </Frame>
  );
}

/* ───────────── 5. Método general de construcción ───────────── */

export function MetodoGeneralDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 7, 5, 12)) };
  const [s, setS] = useState(init);
  const m = metodoGeneral(s.n);
  const U = 105;
  const C: Pt = [260, 150];
  const sc = (p: Pt): Pt => [C[0] + p[0] * U, C[1] - p[1] * U];
  const exacto: Pt = [Math.sin((2 * Math.PI) / s.n), Math.cos((2 * Math.PI) / s.n)];
  const marcas = Array.from({ length: s.n + 1 }, (_, i): Pt => [0, 1 - (2 * i) / s.n]);
  const ex: Pt = [-exacto[0], exacto[1]]; // vértice exacto del mismo lado que V
  return (
    <Frame
      stacked
      hint={block.hint ?? "El método general es aproximado: compara el lado obtenido con el exacto 2R·sen(180°/n)."}
      onReset={() => setS(init)}
      controls={<Slider label="Número de lados n" value={s.n} min={5} max={12} step={1} color={MANIM.blue} onChange={(n) => setS({ n })} />}
    >
      <Svg w={520} h={300} testId="metodo-general" maxH={330}>
        <circle cx={C[0]} cy={C[1]} r={U} fill="none" stroke={MANIM.muted} strokeWidth={1.5} />
        <Seg a={sc(m.A)} b={sc(m.B)} color={MANIM.ink} width={3} />
        {marcas.map((p, i) => (
          <circle key={i} cx={sc(p)[0]} cy={sc(p)[1]} r={i === 2 ? 5 : 3} fill={i === 2 ? MANIM.orange : MANIM.ink} />
        ))}
        <Seg a={sc(m.P)} b={sc(m.V)} color={MANIM.purple} width={2} />
        <Dot p={sc(m.P)} color={MANIM.purple} r={5} />
        <Seg a={sc(m.A)} b={sc(m.V)} color={MANIM.green} width={3} />
        <Seg a={sc(m.A)} b={sc(ex)} color={MANIM.yellow} width={2} dashed />
        <Dot p={sc(m.V)} color={MANIM.green} r={6} />
        <text x={sc(m.P)[0] - 6} y={sc(m.P)[1] - 10} fill={MANIM.purple} fontSize={14} fontWeight={700}>P</text>
        <text x={sc(m.A)[0] + 8} y={sc(m.A)[1] + 4} fill={MANIM.ink} fontSize={14} fontWeight={700}>A</text>
        <text x={sc(m.B)[0] + 8} y={sc(m.B)[1] + 4} fill={MANIM.ink} fontSize={14} fontWeight={700}>B</text>
        <text x={sc(m.V)[0] - 18} y={sc(m.V)[1] + 4} fill={MANIM.green} fontSize={14} fontWeight={700}>V</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Lado con el método general AV">{f3(m.aproximado)} R</Stat>
        <Stat color={MANIM.yellow} label="Lado exacto 2·sen(180°/n)">{f3(m.exacto)} R</Stat>
        <Stat color={Math.abs(m.error) < 0.01 ? MANIM.green : MANIM.red} label="Error relativo">{f2(m.error * 100)} %</Stat>
      </Readout>
      <Note><b>Método general:</b> se divide el diámetro AB en n partes iguales (Thales), se hallan P con dos arcos de radio AB centrados en A y B, se une P con la segunda división y se prolonga hasta cortar la circunferencia en V. <b>AV</b> es el lado del polígono. Funciona para cualquier n, pero es <b>aproximado</b>: es exacto para n = 3, 4 y 6, muy preciso hasta n ≈ 8 y el error crece con n (cerca del 1,5 % para n = 12). Los polígonos de 3, 4, 5, 6, 8, 10 y 12 lados tienen además construcciones <b>exactas</b>.</Note>
    </Frame>
  );
}

/* ───────────── 6. Polígonos estrellados ───────────── */

export function EstrelladoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 5, 5, 12)), k: Math.round(num(block.params?.a, 2, 2, 5)) };
  const [s, setS] = useState(init);
  const k = Math.min(s.k, Math.max(1, Math.floor((s.n - 1) / 2)));
  const propio = esEstrellado(s.n, k);
  const g = mcd(s.n, k);
  const U = 110;
  const C: Pt = [260, 135];
  const V = Array.from({ length: s.n }, (_, i): Pt => [C[0] + U * Math.sin((2 * Math.PI * i) / s.n), C[1] - U * Math.cos((2 * Math.PI * i) / s.n)]);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Une cada vértice con el que está k lugares más allá. Solo es una estrella de un solo trazo si n y k no tienen divisores comunes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Puntos de la circunferencia n" value={s.n} min={5} max={12} step={1} color={MANIM.blue} onChange={(n) => setS((v) => ({ ...v, n }))} />
          <Slider label="Salto k" value={k} min={2} max={5} step={1} color={MANIM.orange} onChange={(kk) => setS((v) => ({ ...v, k: kk }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="estrellado" maxH={300}>
        <circle cx={C[0]} cy={C[1]} r={U} fill="none" stroke={MANIM.muted} strokeWidth={1} strokeDasharray="5 5" />
        {V.map((p, i) => (
          <Seg key={i} a={p} b={V[(i + k) % s.n]!} color={propio ? MANIM.purple : MANIM.orange} width={2.5} />
        ))}
        {V.map((p, i) => (
          <Dot key={i} p={p} r={3.5} />
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Símbolo de Schläfli">{`{${s.n}/${k}}`}</Stat>
        <Stat color={propio ? MANIM.green : MANIM.orange} label="Tipo">{propio ? "polígono estrellado de un solo trazo" : g > 1 ? `compuesto de ${g} polígonos` : "polígono convexo"}</Stat>
        <Stat color={MANIM.blue} label="Ángulo de cada punta 180°(n − 2k)/n">{propio ? `${f1(anguloPunta(s.n, k))}°` : "—"}</Stat>
      </Readout>
      <Note>Un <b>polígono estrellado</b> se obtiene uniendo los n vértices de un polígono regular saltando k. Es de <b>un solo trazo</b> si n y k son primos entre sí (el pentagrama {"{5/2}"} es el más conocido). Si tienen divisores comunes, queda formado por varios polígonos (el hexagrama {"{6/2}"} son dos triángulos). Para construir un polígono regular conocido su <b>lado</b> l, el radio es R = l / (2·sen(180°/n)).</Note>
    </Frame>
  );
}
