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

/** Clasificación de una transformación lineal del plano (x, y) → (a·x + b·y, c·x + d·y). */
export function clasificaMatriz(a: number, b: number, c: number, d: number, tol = 1e-6) {
  const det = a * d - b * c;
  const n1 = Math.hypot(a, c);
  const n2 = Math.hypot(b, d);
  const dot = a * b + c * d;
  let tipo: string;
  if (Math.abs(det) < tol) tipo = "degenerada (aplasta la figura)";
  else if (Math.abs(dot) < tol && Math.abs(n1 - n2) < tol) {
    if (Math.abs(n1 - 1) < tol) tipo = det > 0 ? "movimiento directo: giro (o identidad)" : "movimiento inverso: simetría";
    else tipo = det > 0 ? "semejanza directa (giro y homotecia)" : "semejanza inversa";
  } else tipo = "afinidad general";
  const angulo = n1 > 0 && n2 > 0 ? Math.acos(Math.max(-1, Math.min(1, dot / (n1 * n2)))) / RAD : NaN;
  return { det, razonAreas: Math.abs(det), tipo, angulo, n1, n2 };
}

/** Afinidad de eje y = 0, dirección δ (grados) y razón k: el homólogo de P está en la paralela a la dirección por P y a distancia k·y del eje. */
export function afinidad(p: Pt, k: number, deltaDeg: number): Pt {
  const s = Math.sin(deltaDeg * RAD);
  if (Math.abs(s) < 1e-9) return [NaN, NaN];
  return [p[0] + ((k - 1) * p[1] * Math.cos(deltaDeg * RAD)) / s, k * p[1]];
}
export const areaTriangulo = (p: readonly Pt[]) => Math.abs((p[1]![0] - p[0]![0]) * (p[2]![1] - p[0]![1]) - (p[2]![0] - p[0]![0]) * (p[1]![1] - p[0]![1])) / 2;

/** Elipse obtenida por afinidad ortogonal de una circunferencia de radio a con razón k = b/a. */
export function elipseAfinidad(a: number, b: number) {
  const k = a > 0 ? b / a : NaN;
  const mayor = Math.max(a, b);
  const menor = Math.min(a, b);
  const c = Math.sqrt(Math.max(0, mayor * mayor - menor * menor));
  const h = ((mayor - menor) / (mayor + menor)) ** 2;
  return { k, area: Math.PI * a * b, c, excentricidad: mayor > 0 ? c / mayor : NaN, perimetro: Math.PI * (mayor + menor) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h))) };
}

/** Homología plana de eje y = 0, centro O y parámetro μ: (x, y) → ((x + μ·y·Ox)/(1 + μ·y), y·(1 + μ·Oy)/(1 + μ·y)). Devuelve null si el punto está en la recta límite. */
export function homologia(p: Pt, o: Pt, mu: number): Pt | null {
  const w = 1 + mu * p[1];
  if (Math.abs(w) < 1e-9) return null;
  return [(p[0] + mu * p[1] * o[0]) / w, (p[1] * (1 + mu * o[1])) / w];
}
/** Rectas límite (de la figura y de su imagen) de la homología: y = −1/μ y y = (1 + μ·Oy)/μ. */
export function rectasLimite(o: Pt, mu: number) {
  return Math.abs(mu) < 1e-12 ? { figura: NaN, imagen: NaN } : { figura: -1 / mu, imagen: (1 + mu * o[1]) / mu };
}

/** Proyección horizontal de una figura plana contenida en un plano inclinado φ respecto del PH: afinidad ortogonal de razón cos φ. */
export const razonProyeccion = (phiDeg: number) => Math.cos(phiDeg * RAD);

/* ───────────── 1. Clasificación de transformaciones ───────────── */

const PRESETS = [
  { value: "giro", label: "Giro 30°", m: [Math.cos(30 * RAD), -Math.sin(30 * RAD), Math.sin(30 * RAD), Math.cos(30 * RAD)] },
  { value: "simetria", label: "Simetría (eje X)", m: [1, 0, 0, -1] },
  { value: "homotecia", label: "Homotecia 1,5", m: [1.5, 0, 0, 1.5] },
  { value: "cizalla", label: "Cizalla", m: [1, 0.75, 0, 1] },
  { value: "afin", label: "Afinidad (k = 0,5 en y)", m: [1, 0, 0, 0.5] },
];

export function TransformacionesGeneralesDt2Explorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 3, 0, PRESETS.length - 1));
  const init = { m: PRESETS[idx]!.m };
  const [s, setS] = useState<number[]>(init.m);
  const [a, b, c, d] = s as [number, number, number, number];
  const cls = clasificaMatriz(a, b, c, d, 0.011);
  const sq: Pt[] = [[0, 0], [2, 0], [2, 2], [0, 2]];
  const img = sq.map((p): Pt => [a * p[0] + b * p[1], c * p[0] + d * p[1]]);
  const U = 26;
  const O: Pt = [200, 135];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const poly = (pts: Pt[]) => pts.map((p) => sc(p).join(",")).join(" ");
  const set = (i: number, v: number) => setS((m) => m.map((x, j) => (j === i ? v : x)));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada transformación del plano se resume en una matriz. Observa qué se conserva: paralelismo, ángulos, áreas."}
      onReset={() => setS(init.m)}
      controls={
        <>
          <Choice label="Ejemplos" items={PRESETS.map((p) => ({ value: p.value, label: p.label }))} value={PRESETS.find((p) => p.m.every((x, i) => Math.abs(x - s[i]!) < 1e-9))?.value ?? "giro"} onChange={(v) => setS([...PRESETS.find((p) => p.value === v)!.m])} />
          <Slider label="a" value={Math.round(a * 100) / 100} min={-2} max={2} step={0.05} color={MANIM.orange} format={f2} onChange={(v) => set(0, v)} />
          <Slider label="b" value={Math.round(b * 100) / 100} min={-2} max={2} step={0.05} color={MANIM.orange} format={f2} onChange={(v) => set(1, v)} />
          <Slider label="c" value={Math.round(c * 100) / 100} min={-2} max={2} step={0.05} color={MANIM.blue} format={f2} onChange={(v) => set(2, v)} />
          <Slider label="d" value={Math.round(d * 100) / 100} min={-2} max={2} step={0.05} color={MANIM.blue} format={f2} onChange={(v) => set(3, v)} />
        </>
      }
    >
      <Svg w={520} h={270} testId="transformaciones-generales" maxH={300}>
        <Seg a={sc([-6, 0])} b={sc([10, 0])} color={MANIM.muted} width={1.2} />
        <Seg a={sc([0, -4])} b={sc([0, 5])} color={MANIM.muted} width={1.2} />
        <polygon points={poly(sq)} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2.5} />
        <polygon points={poly(img)} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={2.5} />
        {sq.map((p, i) => (
          <Seg key={i} a={sc(p)} b={sc(img[i]!)} color={MANIM.muted} width={0.8} dashed />
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Tipo de transformación">{cls.tipo}</Stat>
        <Stat color={MANIM.purple} label="Determinante · razón de áreas">{f2(cls.det)} · ×{f2(cls.razonAreas)}</Stat>
        <Stat color={MANIM.muted} label="Ángulo entre los ejes transformados">{Number.isFinite(cls.angulo) ? `${f1(cls.angulo)}°` : "—"}</Stat>
      </Readout>
      <Note>Las transformaciones se ordenan por lo que <b>conservan</b>. Las <b>isometrías</b> (traslación, giro, simetría) conservan distancias, ángulos y áreas. La <b>semejanza</b> (homotecia + movimiento) conserva ángulos y las <b>razones</b> entre longitudes. La <b>afinidad</b> conserva el <b>paralelismo</b> y la <b>razón simple</b> de tres puntos alineados, pero no los ángulos ni las longitudes; multiplica las áreas por |det|. La <b>homología</b> (proyectiva) conserva solo la <b>alineación</b> y la <b>razón doble</b>. Cada una contiene a la anterior como caso particular.</Note>
    </Frame>
  );
}

/* ───────────── 2. Afinidad plana ───────────── */

export function AfinidadDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { k: Math.max(-2, Math.min(2, Math.round(num(block.params?.a, 1.5, -2, 2) * 4) / 4)), delta: Math.round(num(block.params?.b, 60, 30, 150) / 15) * 15 };
  const [s, setS] = useState(init);
  const tri: Pt[] = [[1, 1], [4, 1.5], [2.5, 3.5]];
  const img = tri.map((p) => afinidad(p, s.k, s.delta));
  const U = 28;
  const O: Pt = [100, 150];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const poly = (pts: Pt[]) => pts.map((p) => sc(p).join(",")).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "En una afinidad los puntos homólogos están en rectas paralelas a la dirección, y sus distancias al eje están en razón k."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Razón de afinidad k" value={s.k} min={-2} max={2} step={0.25} color={MANIM.purple} format={f2} onChange={(k) => setS((v) => ({ ...v, k }))} />
          <Slider label="Dirección de afinidad" value={s.delta} min={30} max={150} step={15} unit="°" color={MANIM.orange} onChange={(delta) => setS((v) => ({ ...v, delta }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="afinidad" maxH={300}>
        <Seg a={sc([-1, 0])} b={sc([14, 0])} color={MANIM.ink} width={2.5} />
        <text x={sc([13, 0])[0]} y={sc([13, 0])[1] + 16} fill={MANIM.ink} fontSize={13} fontWeight={700}>eje e</text>
        {tri.map((p, i) => (
          <Seg key={i} a={sc(p)} b={sc(img[i]!)} color={MANIM.muted} width={1.2} dashed />
        ))}
        <polygon points={poly(tri)} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2.5} />
        <polygon points={poly(img)} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={2.5} />
        {tri.map((p, i) => (
          <g key={`d${i}`}>
            <Dot p={sc(p)} color={MANIM.blue} r={4} />
            <Dot p={sc(img[i]!)} color={MANIM.orange} r={4} />
          </g>
        ))}
        <text x={sc(tri[2]!)[0] - 14} y={sc(tri[2]!)[1] - 8} fill={MANIM.blue} fontSize={13} fontWeight={700}>C</text>
        <text x={sc(img[2]!)[0] + 6} y={sc(img[2]!)[1] - 8} fill={MANIM.orange} fontSize={13} fontWeight={700}>C′</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Razón de áreas |k|">{f2(Math.abs(s.k))}</Stat>
        <Stat color={MANIM.blue} label="Área original">{f2(areaTriangulo(tri))}</Stat>
        <Stat color={MANIM.orange} label="Área de la imagen">{f2(areaTriangulo(img))}</Stat>
        <Stat color={MANIM.green} label="Tipo">{s.k === 1 ? "identidad" : s.k === -1 ? (s.delta === 90 ? "simetría axial" : "simetría oblicua") : s.k === 0 ? "degenerada" : s.delta === 90 ? "afinidad ortogonal" : "afinidad oblicua"}</Stat>
      </Readout>
      <Note>Una <b>afinidad</b> queda determinada por su <b>eje</b> e (puntos <b>dobles</b>, que se corresponden consigo mismos), su <b>dirección</b> d y su <b>razón</b> k, o por un par de puntos homólogos. Los puntos <b>homólogos</b> están en rectas paralelas a la dirección y cumplen <b>distancia al eje de A′ = k · distancia al eje de A</b>. Las <b>rectas homólogas</b> se cortan en el <b>eje</b> y las <b>paralelas</b> se transforman en <b>paralelas</b>. Las áreas se multiplican por |k|. Si la dirección es perpendicular al eje, es una afinidad <b>ortogonal</b>; si k = −1 es una <b>simetría</b>.</Note>
    </Frame>
  );
}

/* ───────────── 3. Elipse por afinidad con la circunferencia ───────────── */

export function ElipseAfinidadDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 5, 2, 8)), b: Math.round(num(block.params?.b, 3, 1, 8)) };
  const [s, setS] = useState(init);
  const e = elipseAfinidad(s.a, s.b);
  const U = Math.min(26, 220 / Math.max(s.a, s.b, 1));
  const O: Pt = [260, 130];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const marcas = Array.from({ length: 16 }, (_, i) => (i * 2 * Math.PI) / 16 + 0.2);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La elipse es la afín de una circunferencia: cada punto sube o baja en vertical según la razón k = b/a."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Semieje a (radio de la circunferencia)" value={s.a} min={2} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label="Semieje b" value={s.b} min={1} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(b) => setS((v) => ({ ...v, b }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="elipse-afinidad" maxH={290}>
        <Seg a={sc([-s.a - 1, 0])} b={sc([s.a + 1, 0])} color={MANIM.ink} width={2} />
        <circle cx={O[0]} cy={O[1]} r={s.a * U} fill="none" stroke={MANIM.blue} strokeWidth={2.5} />
        <ellipse cx={O[0]} cy={O[1]} rx={s.a * U} ry={s.b * U} fill={MANIM.orange} fillOpacity={0.12} stroke={MANIM.orange} strokeWidth={3} />
        {marcas.map((t, i) => {
          const p: Pt = [s.a * Math.cos(t), s.a * Math.sin(t)];
          const q: Pt = [p[0], e.k * p[1]];
          return (
            <g key={i}>
              <Seg a={sc(p)} b={sc(q)} color={MANIM.muted} width={0.9} dashed />
              <Dot p={sc(p)} color={MANIM.blue} r={3} />
              <Dot p={sc(q)} color={MANIM.orange} r={3} />
            </g>
          );
        })}
        {e.c > 0 ? (
          <>
            <Dot p={s.a >= s.b ? sc([e.c, 0]) : sc([0, e.c])} color={MANIM.yellow} r={4} />
            <Dot p={s.a >= s.b ? sc([-e.c, 0]) : sc([0, -e.c])} color={MANIM.yellow} r={4} />
          </>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Razón de afinidad k = b/a">{f2(e.k)}</Stat>
        <Stat color={MANIM.orange} label="Área de la elipse π·a·b">{f2(e.area)} cm²</Stat>
        <Stat color={MANIM.yellow} label="Semidistancia focal c">{f2(e.c)} cm</Stat>
        <Stat color={MANIM.muted} label="Excentricidad c/a">{f2(e.excentricidad)}</Stat>
      </Readout>
      <Note>La <b>elipse</b> es la <b>afín ortogonal</b> de una circunferencia: si el eje es el eje mayor, la dirección es perpendicular a él y la razón k = b/a, cada punto de la circunferencia se desplaza en vertical a una distancia del eje k veces menor. Por eso el <b>área</b> de la elipse es k·πa² = π·a·b. Esta propiedad permite <b>construir</b> la elipse punto a punto con las circunferencias de diámetros 2a y 2b. Los <b>focos</b> (amarillo) están a la distancia c = √(a² − b²) del centro. Si k &gt; 1 el eje mayor es el vertical.</Note>
    </Frame>
  );
}

/* ───────────── 4. Homología plana ───────────── */

export function HomologiaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { mu: Math.round(num(block.params?.a, 20, -25, 50)), ox: Math.round(num(block.params?.b, 0, -4, 6)), oy: 5 };
  const [s, setS] = useState(init);
  const mu = s.mu / 100;
  const O: Pt = [s.ox, s.oy];
  const tri: Pt[] = [[1, 1.5], [4, 1.5], [2.5, 3.5]];
  const img = tri.map((p) => homologia(p, O, mu));
  const ok = img.every((p): p is Pt => p !== null);
  const rl = rectasLimite(O, mu);
  const U = 24;
  const C: Pt = [180, 215];
  const sc = (p: Pt): Pt => [C[0] + p[0] * U, C[1] - p[1] * U];
  const poly = (pts: Pt[]) => pts.map((p) => sc(p).join(",")).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Los puntos homólogos están alineados con el centro O; las rectas homólogas se cortan en el eje."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Parámetro μ de la homología" value={s.mu} min={-25} max={50} step={5} unit=" %" color={MANIM.purple} onChange={(m) => setS((v) => ({ ...v, mu: m }))} />
          <Slider label="Centro O: posición x" value={s.ox} min={-4} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(ox) => setS((v) => ({ ...v, ox }))} />
          <Slider label="Centro O: altura y" value={s.oy} min={2} max={8} step={1} unit=" cm" color={MANIM.green} onChange={(oy) => setS((v) => ({ ...v, oy }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="homologia" maxH={300}>
        <Seg a={sc([-5, 0])} b={sc([16, 0])} color={MANIM.ink} width={2.5} />
        <text x={sc([14.5, 0])[0]} y={sc([14.5, 0])[1] + 16} fill={MANIM.ink} fontSize={13} fontWeight={700}>eje e</text>
        {Number.isFinite(rl.figura) && rl.figura > -2 && rl.figura < 8 ? <Seg a={sc([-5, rl.figura])} b={sc([16, rl.figura])} color={MANIM.blue} width={1.2} dashed /> : null}
        {Number.isFinite(rl.imagen) && rl.imagen > -2 && rl.imagen < 11 ? <Seg a={sc([-5, rl.imagen])} b={sc([16, rl.imagen])} color={MANIM.orange} width={1.2} dashed /> : null}
        <polygon points={poly(tri)} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2.5} />
        {ok ? <polygon points={poly(img as Pt[])} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={2.5} /> : null}
        {ok
          ? tri.map((p, i) => (
              <Seg key={i} a={sc(O)} b={sc(img[i] as Pt)} color={MANIM.muted} width={0.9} dashed />
            ))
          : null}
        <Dot p={sc(O)} color={MANIM.red} r={6} />
        <text x={sc(O)[0] + 8} y={sc(O)[1] - 6} fill={MANIM.red} fontSize={14} fontWeight={700}>O</text>
      </Svg>
      <Readout>
        <Stat color={ok ? MANIM.green : MANIM.red} label="Estado">{ok ? "figura y homóloga visibles" : "la figura toca la recta límite"}</Stat>
        <Stat color={MANIM.blue} label="Recta límite de la figura (y =)">{Number.isFinite(rl.figura) ? f2(rl.figura) : "en el infinito"}</Stat>
        <Stat color={MANIM.orange} label="Recta límite de la imagen (y =)">{Number.isFinite(rl.imagen) ? f2(rl.imagen) : "en el infinito"}</Stat>
      </Readout>
      <Note>Una <b>homología</b> queda determinada por su <b>eje</b> (rectas y puntos <b>dobles</b>), su <b>centro O</b> (punto doble) y un par de puntos homólogos o una razón. Los homólogos están <b>alineados con O</b> y las <b>rectas homólogas se cortan en el eje</b>. La <b>recta límite</b> (azul) es la que se transforma en la recta del infinito de la otra figura, y la de la imagen (naranja) es la imagen de los puntos del infinito: son <b>paralelas al eje</b>. Si el centro se aleja al infinito, la homología es una <b>afinidad</b>; si el eje se va al infinito, una <b>homotecia</b>. La <b>perspectiva</b> de un plano sobre el cuadro es una homología.</Note>
    </Frame>
  );
}

/* ───────────── 5. El abatimiento como afinidad ortogonal ───────────── */

export function AbatimientoAfinidadDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { phi: Math.round(num(block.params?.a, 55, 0, 85) / 5) * 5 };
  const [s, setS] = useState(init);
  const k = razonProyeccion(s.phi);
  const tri: Pt[] = [[1, 1], [5, 1.5], [2.5, 4]]; // figura abatida (verdadera forma)
  const proj = tri.map((p) => afinidad(p, k, 90));
  const U = 30;
  const O: Pt = [100, 160];
  const sc = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  const poly = (pts: Pt[]) => pts.map((p) => sc(p).join(",")).join(" ");
  const areaReal = areaTriangulo(tri);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Al inclinar el plano, la proyección sobre el PH es la afín de la verdadera forma, con razón cos φ y el eje en la traza."}
      onReset={() => setS(init)}
      controls={<Slider label="Inclinación del plano φ con el PH" value={s.phi} min={0} max={85} step={5} unit="°" color={MANIM.purple} onChange={(phi) => setS({ phi })} />}
    >
      <Svg w={520} h={270} testId="abatimiento-afinidad" maxH={300}>
        <Seg a={sc([-1, 0])} b={sc([10, 0])} color={MANIM.ink} width={2.5} />
        <text x={sc([8.5, 0])[0]} y={sc([8.5, 0])[1] + 16} fill={MANIM.ink} fontSize={13} fontWeight={700}>traza (eje)</text>
        {tri.map((p, i) => (
          <Seg key={i} a={sc(p)} b={sc(proj[i]!)} color={MANIM.muted} width={1} dashed />
        ))}
        <polygon points={poly(tri)} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2.5} />
        <polygon points={poly(proj)} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={2.5} />
        <text x={sc(tri[2]!)[0] + 8} y={sc(tri[2]!)[1]} fill={MANIM.blue} fontSize={12} fontWeight={700}>verdadera forma (abatida)</text>
        <text x={sc(proj[2]!)[0] + 8} y={sc(proj[2]!)[1]} fill={MANIM.orange} fontSize={12} fontWeight={700}>proyección</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Razón de afinidad k = cos φ">{f2(k)}</Stat>
        <Stat color={MANIM.blue} label="Área real">{f2(areaReal)} cm²</Stat>
        <Stat color={MANIM.orange} label="Área de la proyección">{f2(areaReal * k)} cm²</Stat>
        <Stat color={MANIM.muted} label="Un círculo de R = 4 se proyecta en una elipse de semiejes">4 y {f2(4 * k)} cm</Stat>
      </Readout>
      <Note>Cuando una figura plana está en un plano inclinado, su <b>proyección</b> sobre el plano de proyección es una <b>afinidad ortogonal</b> de la figura <b>abatida</b>: el <b>eje</b> es la <b>traza</b> del plano, la <b>dirección</b> es perpendicular a ella y la <b>razón</b> es <b>cos φ</b>. Por eso, a partir de una proyección y la traza se puede <b>recuperar la verdadera forma</b> con una afinidad inversa (razón 1/cos φ). Las <b>circunferencias</b> se proyectan como <b>elipses</b> y las áreas se reducen en un factor cos φ. Es la base de los <b>abatimientos</b> del sistema diédrico que se verán en los siguientes temas.</Note>
    </Frame>
  );
}
