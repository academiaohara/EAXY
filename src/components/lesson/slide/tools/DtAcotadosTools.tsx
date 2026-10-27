"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Recta acotada definida por A y B (x, y en el plano de comparación y cota h). */
export function rectaAcotada(a: readonly [number, number, number], b: readonly [number, number, number]) {
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const dh = b[2] - a[2];
  const pendiente = d > 0 ? dh / d : NaN;
  const real = Math.hypot(d, dh);
  const intervalo = dh !== 0 ? d / Math.abs(dh) : Infinity;
  // graduación: puntos de la recta con cota entera entre A y B (posición medida desde A sobre la proyección)
  const grad: { cota: number; pos: number }[] = [];
  if (dh !== 0 && d > 0) {
    const lo = Math.min(a[2], b[2]);
    const hi = Math.max(a[2], b[2]);
    for (let c = Math.ceil(lo); c <= hi + 1e-9; c++) grad.push({ cota: c, pos: ((c - a[2]) / dh) * d });
    grad.sort((p, q) => p.pos - q.pos);
  }
  return { d, dh, pendiente, porcentaje: pendiente * 100, angulo: Math.atan(Math.abs(pendiente)) / RAD, intervalo, real, grad };
}
/** Intervalo (distancia horizontal por cada unidad de cota) de un plano de pendiente p (m/m). */
export const intervaloPlano = (p: number) => (p > 0 ? 1 / p : Infinity);
export const anguloPendiente = (p: number) => Math.atan(p) / RAD;

/** Cubierta a cuatro aguas con la misma pendiente en todos los faldones sobre una planta rectangular a × b. */
export function cubierta(a: number, b: number, p: number) {
  const largo = Math.max(a, b);
  const corto = Math.min(a, b);
  return { altura: (p * corto) / 2, cumbrera: largo - corto, angulo: anguloPendiente(p), area: largo * corto * Math.sqrt(1 + p * p) };
}

/** Colina elíptica: cota máxima H y semiejes de la base Rx y Ry. Curvas de nivel cada `eq` metros. */
export function colina(H: number, Rx: number, Ry: number, eq: number) {
  const n = eq > 0 ? Math.max(0, Math.ceil(H / eq) - 1) : 0;
  const cotas = Array.from({ length: n }, (_, i) => (i + 1) * eq).filter((c) => c < H);
  return { cotas, sepX: eq * (Rx / H), sepY: eq * (Ry / H), pendX: H / Rx, pendY: H / Ry };
}

/* ───────────── 1. Recta en planos acotados ───────────── */

export function RectaAcotadaDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { dx: Math.round(num(block.params?.a, 8, 1, 12)), dy: Math.round(num(block.params?.b, 6, -8, 8)), hb: 5 };
  const [s, setS] = useState(init);
  const A: [number, number, number] = [0, 0, 2];
  const B: [number, number, number] = [s.dx, s.dy, s.hb];
  const r = rectaAcotada(A, B);
  const U = 17;
  const O: Pt = [70, 150];
  const sc = (x: number, y: number): Pt => [O[0] + x * U, O[1] - y * U];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una recta se define por dos puntos acotados. La pendiente es el desnivel entre la distancia horizontal; el intervalo, su inversa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Avance de B en x" value={s.dx} min={1} max={12} step={1} unit=" m" color={MANIM.orange} onChange={(dx) => setS((v) => ({ ...v, dx }))} />
          <Slider label="Avance de B en y" value={s.dy} min={-8} max={8} step={1} unit=" m" color={MANIM.green} onChange={(dy) => setS((v) => ({ ...v, dy }))} />
          <Slider label="Cota de B (la de A es 2)" value={s.hb} min={0} max={9} step={1} unit=" m" color={MANIM.blue} onChange={(hb) => setS((v) => ({ ...v, hb }))} />
        </>
      }
    >
      <Svg w={520} h={290} testId="recta-acotada" maxH={320}>
        <Seg a={sc(0, 0)} b={sc(s.dx, s.dy)} color={MANIM.ink} width={3} />
        {r.grad.map((g) => {
          const k = r.d > 0 ? g.pos / r.d : 0;
          const p = sc(s.dx * k, s.dy * k);
          const nx = r.d > 0 ? -s.dy / r.d : 0;
          const ny = r.d > 0 ? s.dx / r.d : 0;
          return (
            <g key={g.cota}>
              <line x1={p[0] - 6 * nx} y1={p[1] + 6 * ny} x2={p[0] + 6 * nx} y2={p[1] - 6 * ny} stroke={MANIM.yellow} strokeWidth={2} />
              <text x={p[0] + 10 * nx - 4} y={p[1] - 10 * ny + 14} fill={MANIM.yellow} fontSize={11} fontWeight={700}>
                {g.cota}
              </text>
            </g>
          );
        })}
        <Dot p={sc(0, 0)} color={MANIM.blue} r={6} />
        <Dot p={sc(s.dx, s.dy)} color={MANIM.orange} r={6} />
        <text x={sc(0, 0)[0] - 26} y={sc(0, 0)[1] + 16} fill={MANIM.blue} fontSize={14} fontWeight={700}>A₂</text>
        <text x={sc(s.dx, s.dy)[0] + 8} y={sc(s.dx, s.dy)[1] - 8} fill={MANIM.orange} fontSize={14} fontWeight={700}>B{s.hb < 10 ? String.fromCharCode(0x2080 + s.hb) : s.hb}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.muted} label="Distancia horizontal">{f2(r.d)} m</Stat>
        <Stat color={MANIM.blue} label="Pendiente p = Δh / d">{Number.isFinite(r.pendiente) ? `${f1(r.porcentaje)} % (${f1(r.angulo)}°)` : "—"}</Stat>
        <Stat color={MANIM.yellow} label="Intervalo i = d / Δh">{Number.isFinite(r.intervalo) ? `${f2(r.intervalo)} m` : "recta horizontal"}</Stat>
        <Stat color={MANIM.green} label="Longitud real">{f2(r.real)} m</Stat>
      </Readout>
      <Note>En el <b>sistema de planos acotados</b> se proyecta ortogonalmente sobre un <b>plano horizontal de comparación</b> y cada punto lleva su <b>cota</b> (altura) como subíndice. La <b>pendiente</b> de una recta es el desnivel dividido por la distancia horizontal; el <b>intervalo</b> es la distancia horizontal que corresponde a <b>una unidad de cota</b>. <b>Graduar</b> una recta es señalar los puntos de cota entera: en el dibujo, las marcas amarillas.</Note>
    </Frame>
  );
}

/* ───────────── 2. Plano acotado: curvas de nivel y escala de pendiente ───────────── */

export function PlanoAcotadoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.a, 50, 10, 100)), rumbo: Math.round(num(block.params?.b, 30, 0, 345) / 15) * 15 };
  const [s, setS] = useState(init);
  const p = s.p / 100;
  const i = intervaloPlano(p);
  const th = s.rumbo * RAD;
  const dir: Pt = [Math.cos(th), Math.sin(th)]; // sentido en que baja el plano (máxima pendiente)
  const U = 20;
  const C: Pt = [260, 135];
  const sc = (x: number, y: number): Pt => [C[0] + x * U, C[1] - y * U];
  const lines: { cota: number; a: Pt; b: Pt }[] = [];
  // curvas: puntos con cota c = 4 − p·(x·dir_x + y·dir_y)  (cota 4 en el centro)
  for (let c = -2; c <= 10; c++) {
    const t = (4 - c) / p; // distancia sobre la dirección de máxima pendiente
    const base: Pt = [dir[0] * t, dir[1] * t];
    const perp: Pt = [-dir[1], dir[0]];
    lines.push({ cota: c, a: [base[0] - 14 * perp[0], base[1] - 14 * perp[1]], b: [base[0] + 14 * perp[0], base[1] + 14 * perp[1]] });
  }
  const vis = lines.filter((l) => Math.abs((4 - l.cota) / p) < 12);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un plano se representa por sus horizontales (curvas de nivel), paralelas y equidistantes. La máxima pendiente es perpendicular a ellas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Pendiente del plano" value={s.p} min={10} max={100} step={5} unit=" %" color={MANIM.blue} onChange={(pp) => setS((v) => ({ ...v, p: pp }))} />
          <Slider label="Dirección de bajada (rumbo)" value={s.rumbo} min={0} max={345} step={15} unit="°" color={MANIM.orange} onChange={(rumbo) => setS((v) => ({ ...v, rumbo }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="plano-acotado" maxH={300}>
        <clipPath id="clip-acotado">
          <rect x={20} y={10} width={480} height={250} />
        </clipPath>
        <g clipPath="url(#clip-acotado)">
          {vis.map((l) => {
            const a = sc(l.a[0], l.a[1]);
            const b = sc(l.b[0], l.b[1]);
            return <line key={l.cota} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={l.cota % 5 === 0 ? MANIM.yellow : MANIM.blue} strokeWidth={l.cota % 5 === 0 ? 2.5 : 1.5} />;
          })}
          {vis.map((l) => {
            const c = sc((l.a[0] + l.b[0]) / 2 + 3 * -dir[1], (l.a[1] + l.b[1]) / 2 + 3 * dir[0]);
            return (
              <text key={`t${l.cota}`} x={c[0]} y={c[1]} fill={MANIM.muted} fontSize={11} textAnchor="middle">
                {l.cota}
              </text>
            );
          })}
          <Seg a={sc(-4 * dir[0], -4 * dir[1])} b={sc(4 * dir[0], 4 * dir[1])} color={MANIM.orange} width={3} />
        </g>
        <polygon
          points={`${sc(4 * dir[0] + 0.5 * dir[1], 4 * dir[1] - 0.5 * dir[0]).join(",")} ${sc(4 * dir[0] - 0.5 * dir[1], 4 * dir[1] + 0.5 * dir[0]).join(",")} ${sc(5 * dir[0], 5 * dir[1]).join(",")}`}
          fill={MANIM.orange}
        />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Pendiente p">{s.p} % ({f1(anguloPendiente(p))}°)</Stat>
        <Stat color={MANIM.yellow} label="Intervalo i = 1 / p">{f2(i)} m</Stat>
        <Stat color={MANIM.orange} label="Máxima pendiente">perpendicular a las horizontales</Stat>
      </Readout>
      <Note>Un <b>plano</b> se representa por sus <b>horizontales</b> (curvas de nivel de cota entera), que son <b>rectas paralelas y equidistantes</b>: la distancia entre dos consecutivas es el <b>intervalo</b> i = 1/p. La <b>recta de máxima pendiente</b> es perpendicular a ellas y su <b>graduación</b> es la <b>escala de pendiente</b> del plano (la flecha naranja indica el sentido de bajada). Cuanto mayor es la pendiente, <b>más juntas</b> están las horizontales.</Note>
    </Frame>
  );
}

/* ───────────── 3. Cubierta a cuatro aguas ───────────── */

export function CubiertaDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 10, 4, 14)), b: Math.round(num(block.params?.b, 6, 2, 10)), p: 50 };
  const [s, setS] = useState(init);
  const a = Math.max(s.a, s.b);
  const b = Math.min(s.a, s.b);
  const cu = cubierta(a, b, s.p / 100);
  const U = Math.min(26, 440 / a, 200 / b);
  const C: Pt = [260, 135];
  const P = (x: number, y: number): Pt => [C[0] + (x - a / 2) * U, C[1] + (y - b / 2) * U];
  const r0 = P(0, 0);
  const r1 = P(a, 0);
  const r2 = P(a, b);
  const r3 = P(0, b);
  const c1 = P(b / 2, b / 2);
  const c2 = P(a - b / 2, b / 2);
  const niveles = Math.floor(cu.altura);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Si todos los faldones tienen la misma pendiente, la cumbrera queda a la altura (pendiente × lado corto / 2)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Largo de la planta" value={s.a} min={4} max={14} step={1} unit=" m" color={MANIM.orange} onChange={(aa) => setS((v) => ({ ...v, a: aa }))} />
          <Slider label="Ancho de la planta" value={s.b} min={2} max={10} step={1} unit=" m" color={MANIM.green} onChange={(bb) => setS((v) => ({ ...v, b: bb }))} />
          <Slider label="Pendiente de los faldones" value={s.p} min={20} max={100} step={5} unit=" %" color={MANIM.blue} onChange={(p) => setS((v) => ({ ...v, p }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="cubierta" maxH={300}>
        <polygon points={[r0, r1, r2, r3].map((q) => q.join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.ink} strokeWidth={3} />
        <Seg a={r0} b={c1} color={MANIM.orange} width={2.5} />
        <Seg a={r3} b={c1} color={MANIM.orange} width={2.5} />
        <Seg a={r1} b={c2} color={MANIM.orange} width={2.5} />
        <Seg a={r2} b={c2} color={MANIM.orange} width={2.5} />
        <Seg a={c1} b={c2} color={MANIM.green} width={4} />
        <Dot p={c1} color={MANIM.green} r={5} />
        <Dot p={c2} color={MANIM.green} r={5} />
        <text x={(c1[0] + c2[0]) / 2} y={c1[1] - 10} textAnchor="middle" fill={MANIM.green} fontSize={13} fontWeight={700}>
          cumbrera, cota {f2(cu.altura)}
        </text>
        <text x={r0[0] + 4} y={r0[1] - 6} fill={MANIM.muted} fontSize={12}>aleros, cota 0</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Altura de la cumbrera">{f2(cu.altura)} m</Stat>
        <Stat color={MANIM.green} label="Longitud de la cumbrera">{f2(cu.cumbrera)} m</Stat>
        <Stat color={MANIM.blue} label="Ángulo de los faldones">{f1(cu.angulo)}°</Stat>
        <Stat color={MANIM.yellow} label="Superficie real del tejado">{f1(cu.area)} m²</Stat>
        <Stat color={MANIM.muted} label="Horizontales enteras entre aleros y cumbrera">{niveles}</Stat>
      </Readout>
      <Note>Una <b>cubierta</b> con todos los faldones a la <b>misma pendiente</b> tiene como aristas de encuentro las <b>limatesas</b> (diagonales de las esquinas, que son las <b>bisectrices</b> de la planta, en naranja) y la <b>cumbrera</b> (horizontal, en verde). Cada faldón es un plano acotado con las horizontales paralelas al alero. La superficie real de cada faldón es la de su proyección dividida por cos α, es decir, multiplicada por √(1 + p²). Los <b>limahoyas</b> aparecen en los entrantes de plantas con forma de L.</Note>
    </Frame>
  );
}

/* ───────────── 4. Curvas de nivel de una colina ───────────── */

export function CurvasNivelDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { H: Math.round(num(block.params?.a, 100, 30, 150) / 10) * 10, rx: 200, ry: 100, eq: 10 };
  const [s, setS] = useState(init);
  const c = colina(s.H, s.rx, s.ry, s.eq);
  const U = 0.9;
  const C: Pt = [260, 135];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las curvas de nivel están más juntas donde el terreno es más pendiente. Compara el lado corto y el largo de la colina."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Altura de la colina" value={s.H} min={30} max={150} step={10} unit=" m" color={MANIM.green} onChange={(H) => setS((v) => ({ ...v, H }))} />
          <Slider label="Semieje de la base en x" value={s.rx} min={100} max={250} step={10} unit=" m" color={MANIM.orange} onChange={(rx) => setS((v) => ({ ...v, rx }))} />
          <Slider label="Semieje de la base en y" value={s.ry} min={60} max={140} step={10} unit=" m" color={MANIM.blue} onChange={(ry) => setS((v) => ({ ...v, ry }))} />
          <Slider label="Equidistancia entre curvas" value={s.eq} min={5} max={30} step={5} unit=" m" color={MANIM.purple} onChange={(eq) => setS((v) => ({ ...v, eq }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="curvas-nivel" maxH={300}>
        <ellipse cx={C[0]} cy={C[1]} rx={s.rx * U} ry={s.ry * U} fill="none" stroke={MANIM.muted} strokeWidth={1.2} strokeDasharray="4 4" />
        {c.cotas.map((h) => {
          const k = 1 - h / s.H;
          const principal = h % (s.eq * 5) === 0;
          return <ellipse key={h} cx={C[0]} cy={C[1]} rx={s.rx * U * k} ry={s.ry * U * k} fill="none" stroke={principal ? MANIM.yellow : MANIM.green} strokeWidth={principal ? 2.5 : 1.5} />;
        })}
        <Dot p={C} color={MANIM.red} r={4} />
        <text x={C[0] + 8} y={C[1] - 6} fill={MANIM.red} fontSize={12} fontWeight={700}>{s.H}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Número de curvas entre la base y la cima">{c.cotas.length}</Stat>
        <Stat color={MANIM.orange} label="Separación entre curvas en x · pendiente">{f1(c.sepX)} m · {f1(c.pendX * 100)} %</Stat>
        <Stat color={MANIM.blue} label="Separación entre curvas en y · pendiente">{f1(c.sepY)} m · {f1(c.pendY * 100)} %</Stat>
      </Readout>
      <Note>Las <b>curvas de nivel</b> unen puntos de la misma cota; la diferencia entre dos consecutivas es la <b>equidistancia</b>. Donde están <b>más juntas</b> el terreno es <b>más inclinado</b>: la separación entre curvas es la equidistancia dividida por la pendiente. Las curvas no se cortan ni se cruzan, y cada cierto número se dibujan <b>más gruesas</b> (curvas directoras) con su cota escrita. Con ellas se pueden obtener <b>perfiles</b> y <b>secciones</b> del terreno (en Dibujo Técnico II).</Note>
    </Frame>
  );
}
