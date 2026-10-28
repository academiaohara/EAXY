"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { caballera } from "@/components/lesson/slide/tools/DtAxonometricoTools";
import { proyeccionConica } from "@/components/lesson/slide/tools/DtConicoTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;
type V3 = [number, number, number];

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Proyección isométrica a escala 1 de un punto (x, y, z): los tres ejes se ven con la misma longitud y 120° entre sí. */
export const isometrica = (x: number, y: number, z: number): Pt => [(x - y) * Math.cos(30 * RAD), (x + y) * Math.sin(30 * RAD) - z];
/** Caras laterales de un prisma o pirámide recto de base regular (n lados, vértice i a 360°·i/n) visibles desde el observador isométrico (+, +, +). */
export function carasVisiblesIso(n: number): boolean[] {
  return Array.from({ length: n }, (_, i) => {
    const am = (2 * Math.PI * (i + 0.5)) / n;
    return Math.cos(am) + Math.sin(am) > 1e-9;
  });
}
/** Dimétrica y trimétrica quedan fuera: aquí solo el factor de ampliación del dibujo isométrico a escala 1 frente al real (coeficiente √(2/3)). */
export const AMPLIACION_ISO = 1 / Math.sqrt(2 / 3);

/** Razón entre el área proyectada y el área real, en caballera, de una figura contenida en un plano coordenado (XZ frontal, XY horizontal, YZ lateral). */
export function razonAreaCaballera(plano: "XZ" | "XY" | "YZ", alphaDeg: number, k: number) {
  if (plano === "XZ") return 1;
  return plano === "XY" ? Math.abs(k * Math.sin(alphaDeg * RAD)) : Math.abs(k * Math.cos(alphaDeg * RAD));
}
/** Puntos de una circunferencia de radio r y centro c contenida en un plano coordenado, proyectada en caballera. */
export function circuloCaballera(plano: "XZ" | "XY" | "YZ", c: V3, r: number, alphaDeg: number, k: number, n = 72): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    const u = r * Math.cos(t);
    const v = r * Math.sin(t);
    const p: V3 = plano === "XZ" ? [c[0] + u, c[1], c[2] + v] : plano === "XY" ? [c[0] + u, c[1] + v, c[2]] : [c[0], c[1] + u, c[2] + v];
    return caballera(p[0], p[1], p[2], alphaDeg, k);
  });
}

/** Casa en perspectiva cónica: cuerpo de a × b × c y tejado a dos aguas de altura r, girada θ alrededor de un eje vertical. Vértices: 0–3 base, 4–7 aleros, 8–9 caballete. */
export function casaGirada(a: number, b: number, c: number, r: number, thetaDeg: number, cx = -3) {
  const th = thetaDeg * RAD;
  const cy = b / 2;
  const rot = (x: number, y: number, z: number): V3 => [cx + x * Math.cos(th) - y * Math.sin(th), cy + x * Math.sin(th) + y * Math.cos(th), z];
  const pts: V3[] = [];
  for (const z of [0, c]) for (const [x, y] of [[-a / 2, -b / 2], [a / 2, -b / 2], [a / 2, b / 2], [-a / 2, b / 2]] as [number, number][]) pts.push(rot(x, y, z));
  pts.push(rot(-a / 2, 0, c + r), rot(a / 2, 0, c + r));
  const caras = [[0, 1, 2, 3], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7], [4, 5, 9, 8], [7, 6, 9, 8], [4, 7, 8], [5, 6, 9]];
  return { pts, caras };
}
/** Caras de un sólido convexo visibles desde el observador (0, −d, h). */
export function carasVisiblesConvexo(pts: V3[], caras: number[][], d: number, h: number): boolean[] {
  const cen = pts.reduce((s, p) => [s[0] + p[0] / pts.length, s[1] + p[1] / pts.length, s[2] + p[2] / pts.length] as V3, [0, 0, 0] as V3);
  return caras.map((f) => {
    const [a, b, c] = [pts[f[0]!]!, pts[f[1]!]!, pts[f[2]!]!];
    const u: V3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const v: V3 = [c[0] - b[0], c[1] - b[1], c[2] - b[2]];
    let n: V3 = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const fc = f.reduce((s, i) => [s[0] + pts[i]![0] / f.length, s[1] + pts[i]![1] / f.length, s[2] + pts[i]![2] / f.length] as V3, [0, 0, 0] as V3);
    if (n[0] * (fc[0] - cen[0]) + n[1] * (fc[1] - cen[1]) + n[2] * (fc[2] - cen[2]) < 0) n = [-n[0], -n[1], -n[2]];
    return n[0] * (0 - fc[0]) + n[1] * (-d - fc[1]) + n[2] * (h - fc[2]) > 1e-9;
  });
}

/** Perfil de una explanación: plataforma horizontal a cota Z0 junto al terreno z = zt0 + pt·y (y, hacia la derecha). Si Z0 < zt0 hay desmonte (talud que sube, pendiente s); si Z0 > zt0, terraplén (talud que baja). Devuelve el punto de encuentro con el terreno. */
export function explanacion(zt0: number, Z0: number, pt: number, s: number) {
  if (Math.abs(Z0 - zt0) < 1e-9) return { tipo: "a nivel" as const, y: 0, z: Z0, altura: 0, valido: true };
  if (Z0 < zt0) {
    const y = s - pt > 1e-9 ? (zt0 - Z0) / (s - pt) : NaN;
    return { tipo: "desmonte" as const, y, z: Z0 + s * y, altura: zt0 - Z0, valido: Number.isFinite(y) && y > 0 };
  }
  const y = s + pt > 1e-9 ? (Z0 - zt0) / (s + pt) : NaN;
  return { tipo: "terraplén" as const, y, z: Z0 - s * y, altura: Z0 - zt0, valido: Number.isFinite(y) && y > 0 };
}

export type SistemaId = "diedrico" | "axonometrico" | "caballera" | "conico" | "acotado";
export const SISTEMAS: Record<SistemaId, { nombre: string; vistas: string; proyeccion: string; uso: string; realismo: number; medidas: number; facilidad: number }> = {
  diedrico: { nombre: "Diédrico", vistas: "Dos o más vistas (alzado, planta, perfil)", proyeccion: "Ortogonal sobre dos planos perpendiculares", uso: "Piezas y planos de construcción; problemas de geometría descriptiva", realismo: 1, medidas: 5, facilidad: 3 },
  axonometrico: { nombre: "Axonométrico ortogonal", vistas: "Una sola vista", proyeccion: "Ortogonal sobre un plano oblicuo a los ejes", uso: "Despieces, catálogos e instrucciones de montaje", realismo: 4, medidas: 3, facilidad: 3 },
  caballera: { nombre: "Perspectiva caballera", vistas: "Una sola vista", proyeccion: "Oblicua: la cara frontal se ve en verdadera forma", uso: "Bocetos rápidos con caras frontales circulares o complejas", realismo: 3, medidas: 4, facilidad: 5 },
  conico: { nombre: "Cónico", vistas: "Una sola vista", proyeccion: "Central, desde un punto de vista a distancia finita", uso: "Arquitectura, urbanismo e infografía: la imagen más realista", realismo: 5, medidas: 1, facilidad: 2 },
  acotado: { nombre: "Planos acotados", vistas: "Una sola proyección, con cotas", proyeccion: "Ortogonal sobre un plano horizontal, con la altura en números", uso: "Topografía, cubiertas, carreteras y obras públicas", realismo: 1, medidas: 4, facilidad: 3 },
};
export const NECESIDADES = ["medir", "boceto", "cliente", "terreno", "montaje"] as const;
export type Necesidad = (typeof NECESIDADES)[number];
export const sistemaRecomendado = (n: Necesidad): SistemaId => ({ medir: "diedrico", boceto: "caballera", cliente: "conico", terreno: "acotado", montaje: "axonometrico" } as const)[n];
const NECESIDAD_TEXTO: Record<Necesidad, string> = { medir: "Medir con exactitud una pieza", boceto: "Hacer un boceto rápido", cliente: "Enseñar el resultado a un cliente", terreno: "Representar un terreno o una cubierta", montaje: "Explicar un montaje" };

/* ───────────── 1. Isométrica de prismas y pirámides ───────────── */

const SOL = [
  { value: "prisma", label: "Prisma" },
  { value: "piramide", label: "Pirámide" },
] as const;

export function SolidoIsometricoDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { tipo: (num(block.params?.n, 0, 0, 1) >= 0.5 ? "piramide" : "prisma") as "prisma" | "piramide", n: Math.round(num(block.params?.a, 5, 3, 8)), r: num(block.params?.b, 1.5, 1, 2.5), h: Math.round(num(block.params?.c, 3, 1, 4)) };
  const [s, setS] = useState(init);
  const { n, r, h, tipo } = s;
  const ang = (i: number) => (2 * Math.PI * i) / n;
  const B = Array.from({ length: n }, (_, i) => isometrica(r * Math.cos(ang(i)), r * Math.sin(ang(i)), 0));
  const T = tipo === "prisma" ? Array.from({ length: n }, (_, i) => isometrica(r * Math.cos(ang(i)), r * Math.sin(ang(i)), h)) : [isometrica(0, 0, h)];
  const todos = [...B, ...T];
  const minX = Math.min(...todos.map((p) => p[0]));
  const maxX = Math.max(...todos.map((p) => p[0]));
  const minY = Math.min(...todos.map((p) => p[1]));
  const maxY = Math.max(...todos.map((p) => p[1]));
  const U = Math.min(40, 440 / (maxX - minX), 210 / (maxY - minY));
  const sc = (p: Pt): Pt => [260 + (p[0] - (minX + maxX) / 2) * U, 140 + (p[1] - (minY + maxY) / 2) * U];
  const vis = carasVisiblesIso(n);
  const arista = (a: Pt, b: Pt, oculta: boolean, k: string) => <Seg key={k} a={sc(a)} b={sc(b)} color={oculta ? MANIM.muted : MANIM.ink} width={oculta ? 1.2 : 2.5} dashed={oculta} />;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En isométrica los tres ejes forman 120° y las medidas sobre ellos se llevan a la misma escala."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sólido" items={SOL} value={s.tipo} onChange={(t) => setS((o) => ({ ...o, tipo: t }))} />
          <Slider label="Lados de la base" value={s.n} min={3} max={8} step={1} color={MANIM.purple} onChange={(v) => setS((o) => ({ ...o, n: v }))} />
          <Slider label="Radio de la base" value={s.r} min={1} max={2.5} step={0.5} unit=" cm" color={MANIM.orange} format={f1} onChange={(v) => setS((o) => ({ ...o, r: v }))} />
          <Slider label="Altura" value={s.h} min={1} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, h: v }))} />
        </>
      }
    >
      <Svg w={520} h={280} testId="solido-isometrico" maxH={300}>
        {vis.map((v, i) => {
          const j = (i + 1) % n;
          const cara: Pt[] = tipo === "prisma" ? [B[i]!, B[j]!, T[j]!, T[i]!] : [B[i]!, B[j]!, T[0]!];
          return v ? <polygon key={i} points={cara.map((p) => sc(p).join(",")).join(" ")} fill={i % 2 ? MANIM.green : MANIM.orange} fillOpacity={0.22} stroke="none" /> : null;
        })}
        {tipo === "prisma" ? <polygon points={T.map((p) => sc(p).join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.28} stroke="none" /> : null}
        {B.map((p, i) => arista(p, B[(i + 1) % n]!, !vis[i], `b${i}`))}
        {tipo === "prisma"
          ? [
              ...T.map((p, i) => arista(p, T[(i + 1) % n]!, false, `t${i}`)),
              ...B.map((p, i) => arista(p, T[i]!, !vis[i] && !vis[(i + n - 1) % n], `v${i}`)),
            ]
          : B.map((p, i) => arista(p, T[0]!, !vis[i] && !vis[(i + n - 1) % n], `a${i}`))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Caras laterales vistas">{`${vis.filter(Boolean).length} de ${n}`}</Stat>
        <Stat color={MANIM.muted} label="Ángulo entre ejes">120°</Stat>
        <Stat color={MANIM.blue} label="Si se usa el coeficiente 0,82">{`el dibujo a escala 1 es ${f2(AMPLIACION_ISO)} veces mayor`}</Stat>
      </Readout>
      <Note>En <b>axonometría ortogonal</b> un prisma o una pirámide se dibujan llevando las coordenadas de sus vértices sobre los ejes. En <b>isométrica</b> los ejes forman <b>120°</b> y las tres direcciones se reducen igual, por lo que se suele <b>dibujar a escala 1</b> (el dibujo queda 1,22 veces mayor que la proyección real). Las aristas <b>ocultas</b> (discontinuas) son las que quedan detrás de las caras que miran al observador: una arista es visible si pertenece a, al menos, una cara visible.</Note>
    </Frame>
  );
}

/* ───────────── 2. Caballera: circunferencias en las tres caras ───────────── */

export function CaballeraCirculosDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { alpha: Math.round(num(block.params?.a, 45, 15, 75)), k: num(block.params?.b, 0.5, 0.3, 1) };
  const [s, setS] = useState(init);
  const a = 3;
  const r = 1.2;
  const U = 38;
  const O: Pt = [150, 235];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const P = (x: number, y: number, z: number) => sc(caballera(x, y, z, s.alpha, s.k));
  const cara = (pts: Pt[], color: string) => <polygon points={pts.map((p) => p.join(",")).join(" ")} fill={color} fillOpacity={0.14} stroke={MANIM.ink} strokeWidth={2} strokeLinejoin="round" />;
  const curva = (pl: "XZ" | "XY" | "YZ", c: V3, color: string) => <polygon points={circuloCaballera(pl, c, r, s.alpha, s.k).map((p) => sc(p).join(",")).join(" ")} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={2.5} />;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En caballera, una circunferencia de la cara frontal se ve como circunferencia; en las otras caras se deforma en elipse."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de las fugantes α" value={s.alpha} min={15} max={75} step={5} unit="°" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, alpha: v }))} />
          <Slider label="Coeficiente de reducción k" value={s.k} min={0.3} max={1} step={0.1} color={MANIM.blue} format={f1} onChange={(v) => setS((o) => ({ ...o, k: v }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="caballera-circulos" maxH={290}>
        {cara([P(0, 0, 0), P(a, 0, 0), P(a, 0, a), P(0, 0, a)], MANIM.blue)}
        {cara([P(0, 0, a), P(a, 0, a), P(a, a, a), P(0, a, a)], MANIM.green)}
        {cara([P(a, 0, 0), P(a, a, 0), P(a, a, a), P(a, 0, a)], MANIM.orange)}
        {curva("XZ", [a / 2, 0, a / 2], MANIM.blue)}
        {curva("XY", [a / 2, a / 2, a], MANIM.green)}
        {curva("YZ", [a, a / 2, a / 2], MANIM.orange)}
        <text x={sc([0.2, 0])[0]} y={sc([0, 0])[1] + 18} fill={MANIM.blue} fontSize={12} fontWeight={700}>frontal: sin deformar</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Cara frontal (XZ): razón de áreas">{f2(razonAreaCaballera("XZ", s.alpha, s.k))}</Stat>
        <Stat color={MANIM.green} label="Cara superior (XY): k · sen α">{f2(razonAreaCaballera("XY", s.alpha, s.k))}</Stat>
        <Stat color={MANIM.orange} label="Cara lateral (YZ): k · cos α">{f2(razonAreaCaballera("YZ", s.alpha, s.k))}</Stat>
      </Readout>
      <Note>En la <b>perspectiva caballera</b> el plano frontal XZ es paralelo al cuadro y se dibuja <b>en verdadera forma</b>: sus circunferencias salen <b>circunferencias</b>. En los otros dos planos las figuras se <b>deforman</b>: es una afinidad cuya razón de áreas es <b>k·sen α</b> (cara superior) y <b>k·cos α</b> (cara lateral). Por eso conviene que las caras con <b>círculos</b> o formas complejas sean las frontales. Con α = 45° y k = 0,5 (la caballera habitual) ambas valen unos 0,35.</Note>
    </Frame>
  );
}

/* ───────────── 3. Cónica de una casa ───────────── */

export function ConicaCasaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { th: Math.round(num(block.params?.a, 30, 10, 60)), d: Math.round(num(block.params?.b, 12, 6, 20)), h: Math.round(num(block.params?.c, 3, 0, 8)) };
  const [s, setS] = useState(init);
  const { pts, caras } = casaGirada(4, 3, 3, 1.5, s.th);
  const proj = pts.map((p) => proyeccionConica(p, s.d, s.h));
  const ok = proj.every((p): p is Pt => p !== null);
  const vis = ok ? carasVisiblesConvexo(pts, caras, s.d, s.h) : [];
  const U = 30;
  const O: Pt = [300, 225];
  const sc = (q: Pt): Pt => [O[0] + q[0] * U, O[1] - q[1] * U];
  const colores = [MANIM.muted, MANIM.green, MANIM.orange, MANIM.green, MANIM.orange, MANIM.red, MANIM.red, MANIM.blue, MANIM.blue];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El caballete del tejado y los aleros son paralelos y convergen en el mismo punto de fuga de la línea del horizonte."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Giro de la casa respecto al cuadro" value={s.th} min={10} max={60} step={5} unit="°" color={MANIM.purple} onChange={(v) => setS((o) => ({ ...o, th: v }))} />
          <Slider label="Distancia del observador al cuadro" value={s.d} min={6} max={20} step={1} unit=" cm" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, d: v }))} />
          <Slider label="Altura del observador (horizonte)" value={s.h} min={0} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, h: v }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="conica-casa" maxH={300}>
        <line x1={10} y1={O[1]} x2={510} y2={O[1]} stroke={MANIM.ink} strokeWidth={2} />
        <text x={470} y={O[1] + 16} fill={MANIM.muted} fontSize={12} fontWeight={700}>LT</text>
        <line x1={10} y1={sc([0, s.h])[1]} x2={510} y2={sc([0, s.h])[1]} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="6 5" />
        <text x={14} y={sc([0, s.h])[1] - 5} fill={MANIM.yellow} fontSize={12} fontWeight={700}>LH</text>
        {ok ? caras.map((f, i) => (vis[i] ? <polygon key={i} points={f.map((j) => sc(proj[j]!).join(",")).join(" ")} fill={colores[i]} fillOpacity={0.24} stroke={MANIM.ink} strokeWidth={2} strokeLinejoin="round" /> : null)) : (
          <text x={260} y={110} textAnchor="middle" fill={MANIM.red} fontSize={15} fontWeight={700}>El objeto queda delante del observador</text>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Caras visibles">{ok ? `${vis.filter(Boolean).length} de ${caras.length}` : "—"}</Stat>
        <Stat color={MANIM.yellow} label="Horizonte">{`${f1(s.h)} cm sobre la LT`}</Stat>
      </Readout>
      <Note>Una <b>casa</b> es un prisma (el cuerpo) coronado por un segundo prisma triangular (el <b>tejado a dos aguas</b>). En cónica, todas las rectas paralelas entre sí (aleros y caballete, por un lado; los lados cortos, por otro) convergen en un <b>punto de fuga</b> de la <b>línea del horizonte</b>. Para construirla se perspectivan primero la <b>planta</b> y los vértices del cuerpo, y la altura del caballete se lleva con el mismo método. Si el horizonte está <b>por encima</b> del tejado, se ve la cubierta desde arriba.</Note>
    </Frame>
  );
}

/* ───────────── 4. Explanación: desmonte y terraplén ───────────── */

export function ExplanacionDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { Z0: Math.round(num(block.params?.a, 7, 6, 14)), s: num(block.params?.b, 1, 0.75, 2), pt: num(block.params?.c, 0.2, -0.3, 0.3) };
  const [s, setS] = useState(init);
  const zt0 = 10;
  const e = explanacion(zt0, s.Z0, s.pt, s.s);
  const y0 = -5;
  const yMax = Math.max(8, (e.valido ? e.y : 0) + 2);
  const terrenoZ = (y: number) => zt0 + s.pt * y;
  const zs = [s.Z0, terrenoZ(y0), terrenoZ(yMax), e.valido ? e.z : s.Z0];
  const zmin = Math.min(...zs) - 1;
  const zmax = Math.max(...zs) + 1;
  const U = Math.min(440 / (yMax - y0), 220 / (zmax - zmin));
  const sc = (y: number, z: number): Pt => [30 + (y - y0) * U, 245 - (z - zmin) * U];
  const talud: Pt[] = e.valido ? [sc(0, s.Z0), sc(e.y, e.z)] : [];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El talud corta al terreno donde coinciden sus cotas; si la plataforma está por debajo del terreno hay desmonte, y por encima, terraplén."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Cota de la plataforma" value={s.Z0} min={6} max={14} step={1} unit=" m" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, Z0: v }))} />
          <Slider label="Pendiente del talud (m por m)" value={s.s} min={0.75} max={2} step={0.25} color={MANIM.blue} format={f2} onChange={(v) => setS((o) => ({ ...o, s: v }))} />
          <Slider label="Pendiente del terreno (m por m)" value={s.pt} min={-0.3} max={0.3} step={0.1} color={MANIM.green} format={f1} onChange={(v) => setS((o) => ({ ...o, pt: v }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="explanacion" maxH={300}>
        <Seg a={sc(y0, terrenoZ(y0))} b={sc(yMax, terrenoZ(yMax))} color={MANIM.green} width={3} />
        <Seg a={sc(y0, s.Z0)} b={sc(0, s.Z0)} color={MANIM.orange} width={4} />
        {e.valido ? <Seg a={talud[0]!} b={talud[1]!} color={MANIM.blue} width={3} /> : null}
        {e.valido ? <Dot p={sc(e.y, e.z)} color={MANIM.yellow} r={5} /> : null}
        <Dot p={sc(0, s.Z0)} color={MANIM.orange} r={4} />
        <text x={sc(y0, s.Z0)[0]} y={sc(y0, s.Z0)[1] - 8} fill={MANIM.orange} fontSize={12} fontWeight={700}>plataforma</text>
        <text x={sc(yMax, terrenoZ(yMax))[0] - 50} y={sc(yMax, terrenoZ(yMax))[1] - 8} fill={MANIM.green} fontSize={12} fontWeight={700}>terreno</text>
        {e.valido ? <text x={sc(e.y, e.z)[0] + 8} y={sc(e.y, e.z)[1] + 18} fill={MANIM.yellow} fontSize={12} fontWeight={700}>encuentro con el terreno</text> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Tipo">{e.tipo}</Stat>
        <Stat color={MANIM.blue} label="Distancia horizontal del talud">{e.valido ? `${f2(e.y)} m` : "—"}</Stat>
        <Stat color={MANIM.yellow} label="Cota del encuentro">{e.valido ? `${f2(e.z)} m` : "—"}</Stat>
        <Stat color={MANIM.muted} label="Ángulo del talud">{`${f1(Math.atan(s.s) / RAD)}°`}</Stat>
      </Readout>
      <Note>Una <b>explanación</b> prepara una plataforma horizontal en un terreno inclinado. Si la plataforma queda <b>por debajo</b> del terreno hay <b>desmonte</b> (se excava) y el <b>talud</b> sube hasta cortar al terreno; si queda <b>por encima</b>, hay <b>terraplén</b> (se rellena) y el talud baja. El punto de encuentro es donde coinciden las cotas del talud y del terreno: en <b>planos acotados</b>, donde se cortan las <b>curvas de nivel</b> de uno y otro plano. En el perfil: y = (diferencia de cotas) / (pendiente del talud ∓ pendiente del terreno).</Note>
    </Frame>
  );
}

/* ───────────── 5. Elegir el sistema de representación ───────────── */

export function ElegirSistemaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { n: NECESIDADES[Math.round(num(block.params?.n, 0, 0, 4))]! };
  const [s, setS] = useState<{ n: Necesidad }>(init);
  const id = sistemaRecomendado(s.n);
  const sis = SISTEMAS[id];
  const barras: [string, number, string][] = [["Realismo visual", sis.realismo, MANIM.blue], ["Conserva las medidas", sis.medidas, MANIM.green], ["Facilidad de dibujo", sis.facilidad, MANIM.orange]];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada sistema tiene sus ventajas: elegir bien depende de lo que se necesite comunicar."}
      onReset={() => setS(init)}
      controls={<Choice label="Necesito…" items={NECESIDADES.map((n) => ({ value: n, label: NECESIDAD_TEXTO[n] }))} value={s.n} onChange={(n) => setS({ n })} />}
    >
      <Svg w={520} h={170} testId="elegir-sistema" maxH={190}>
        <text x={20} y={30} fill={MANIM.yellow} fontSize={20} fontWeight={700}>{sis.nombre}</text>
        {barras.map(([t, v, c], i) => (
          <g key={t}>
            <text x={20} y={68 + i * 34} fill={MANIM.muted} fontSize={13}>{t}</text>
            {[0, 1, 2, 3, 4].map((k) => (
              <rect key={k} x={200 + k * 56} y={54 + i * 34} width={50} height={18} rx={4} fill={k < v ? c : MANIM.grid} fillOpacity={k < v ? 0.9 : 0.4} />
            ))}
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.muted} label="Vistas">{sis.vistas}</Stat>
        <Stat color={MANIM.muted} label="Proyección">{sis.proyeccion}</Stat>
        <Stat color={MANIM.yellow} label="Uso típico">{sis.uso}</Stat>
      </Readout>
      <Note>No hay un sistema «mejor»: cada uno responde a una necesidad. El <b>diédrico</b> mide con exactitud pero exige <b>varias vistas</b> y cuesta interpretarlo. Los <b>axonométricos</b> y la <b>caballera</b> muestran el objeto en <b>una sola vista</b> con medidas controladas. El <b>cónico</b> es el más realista pero <b>no conserva medidas</b>. Los <b>planos acotados</b> son el sistema del terreno, la cubierta y la obra civil. Muchos proyectos combinan varios: planos diédricos para construir y una perspectiva cónica para presentar.</Note>
    </Frame>
  );
}
