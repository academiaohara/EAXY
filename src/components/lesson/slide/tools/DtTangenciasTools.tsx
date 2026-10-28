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

/** Longitud de la tangente desde un punto a distancia d del centro de una circunferencia de radio R (NaN si el punto está dentro). */
export const longitudTangente = (R: number, d: number) => (d >= R ? Math.sqrt(d * d - R * R) : NaN);
/** Ángulo (grados) que forman las dos tangentes trazadas desde un punto exterior. */
export const anguloTangentes = (R: number, d: number) => (d >= R && d > 0 ? (2 * Math.asin(R / d)) / RAD : NaN);

/** Posición relativa de dos circunferencias de radios R y r con centros a distancia d, y número de tangentes comunes. */
export function posicionCircunferencias(R: number, r: number, d: number, eps = 1e-9) {
  const suma = R + r;
  const dif = Math.abs(R - r);
  if (d < eps && dif < eps) return { pos: "coincidentes", tangentes: Infinity };
  if (d < eps) return { pos: "concéntricas", tangentes: 0 };
  if (d > suma + eps) return { pos: "exteriores", tangentes: 4 };
  if (Math.abs(d - suma) <= eps) return { pos: "tangentes exteriores", tangentes: 3 };
  if (d > dif + eps) return { pos: "secantes", tangentes: 2 };
  if (Math.abs(d - dif) <= eps) return { pos: "tangentes interiores", tangentes: 1 };
  return { pos: "interiores", tangentes: 0 };
}
/** Longitud de cada tangente común exterior entre los puntos de tangencia (NaN si no existe). */
export const tangenteExterior = (R: number, r: number, d: number) => (d >= Math.abs(R - r) ? Math.sqrt(d * d - (R - r) ** 2) : NaN);
/** Longitud de cada tangente común interior entre los puntos de tangencia (NaN si no existe). */
export const tangenteInterior = (R: number, r: number, d: number) => (d >= R + r ? Math.sqrt(d * d - (R + r) ** 2) : NaN);

/** Enlace de radio r entre dos rectas que forman el ángulo α: distancia del vértice a los puntos de tangencia y al centro. */
export function enlaceDosRectas(alphaDeg: number, r: number) {
  const m = (alphaDeg * RAD) / 2;
  if (!(m > 0) || !(m < Math.PI / 2)) return { t: NaN, d: NaN };
  return { t: r / Math.tan(m), d: r / Math.sin(m) };
}

/** Óvalo de semiejes a > b formado por 4 arcos: los pequeños de radio r (centros en el eje mayor) y los grandes de radio R (centros en el eje menor). */
export function ovalo(a: number, b: number, r: number) {
  if (!(a > b) || !(r > 0) || !(r < b)) return { R: NaN, x1: NaN, yc: NaN, psi: NaN, perimetro: NaN, elipse: NaN };
  const R = (a * a + b * b - 2 * a * r) / (2 * (b - r));
  const x1 = a - r;
  const yc = R - b;
  const psi = Math.atan2(x1, yc); // semiángulo de cada arco grande
  const perimetro = 4 * R * psi + 2 * r * (Math.PI - 2 * psi);
  const h = ((a - b) / (a + b)) ** 2;
  const elipse = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h))); // aproximación de Ramanujan
  return { R, x1, yc, psi, perimetro, elipse };
}

/** Espiral de dos centros: el arco k (semicircunferencia) tiene radio k·d. */
export const radioArcoEspiral = (k: number, d: number) => k * d;
export const longitudEspiral = (n: number, d: number) => (Math.PI * d * n * (n + 1)) / 2;
/** Evolvente de una circunferencia de radio r tras desenrollar el ángulo θ (radianes). */
export const evolvente = (r: number, theta: number): Pt => [r * (Math.cos(theta) + theta * Math.sin(theta)), r * (Math.sin(theta) - theta * Math.cos(theta))];

/* ───────────── 1. Tangentes desde un punto exterior ───────────── */

export function TangentePuntoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { R: Math.round(num(block.params?.a, 3, 1, 6)), d: num(block.params?.b, 8, 1, 14) };
  const [s, setS] = useState({ R: init.R, d: Math.max(init.d, init.R) });
  const d = Math.max(s.d, s.R);
  const U = Math.min(26, 230 / Math.max(d + s.R, 1));
  const O: Pt = [100, 135];
  const P: Pt = [O[0] + d * U, O[1]];
  const beta = Math.acos(s.R / d);
  const T1: Pt = [O[0] + s.R * U * Math.cos(beta), O[1] - s.R * U * Math.sin(beta)];
  const T2: Pt = [O[0] + s.R * U * Math.cos(beta), O[1] + s.R * U * Math.sin(beta)];
  const L = longitudTangente(s.R, d);
  const ang = anguloTangentes(s.R, d);
  const M: Pt = [(O[0] + P[0]) / 2, O[1]];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Acerca y aleja P de la circunferencia. La tangente forma un ángulo recto con el radio en el punto de tangencia."}
      onReset={() => setS({ R: init.R, d: Math.max(init.d, init.R) })}
      controls={
        <>
          <Slider label="Radio R" value={s.R} min={1} max={6} step={1} unit=" cm" color={MANIM.blue} onChange={(R) => setS((v) => ({ ...v, R }))} />
          <Slider label="Distancia OP" value={d} min={s.R} max={14} step={0.5} unit=" cm" color={MANIM.orange} onChange={(dd) => setS((v) => ({ ...v, d: dd }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="tangente-punto" maxH={300}>
        <circle cx={O[0]} cy={O[1]} r={s.R * U} fill="none" stroke={MANIM.ink} strokeWidth={2.5} />
        <circle cx={M[0]} cy={M[1]} r={(d * U) / 2} fill="none" stroke={MANIM.muted} strokeWidth={1.2} strokeDasharray="5 5" />
        <Seg a={O} b={P} color={MANIM.muted} width={1.5} dashed />
        <Seg a={P} b={T1} color={MANIM.green} width={3} />
        <Seg a={P} b={T2} color={MANIM.green} width={3} />
        <Seg a={O} b={T1} color={MANIM.orange} width={2} />
        <Seg a={O} b={T2} color={MANIM.orange} width={2} />
        <Dot p={O} r={4} />
        <Dot p={P} color={MANIM.green} r={5} />
        <Dot p={T1} color={MANIM.orange} r={5} />
        <Dot p={T2} color={MANIM.orange} r={5} />
        <text x={O[0] - 14} y={O[1] + 20} fill={MANIM.ink} fontSize={15} fontWeight={700}>O</text>
        <text x={P[0] + 8} y={P[1] + 5} fill={MANIM.green} fontSize={15} fontWeight={700}>P</text>
        <text x={T1[0] + 4} y={T1[1] - 8} fill={MANIM.orange} fontSize={14} fontWeight={700}>T₁</text>
        <text x={T2[0] + 4} y={T2[1] + 18} fill={MANIM.orange} fontSize={14} fontWeight={700}>T₂</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Longitud de la tangente PT = √(OP² − R²)">{f2(L)} cm</Stat>
        <Stat color={MANIM.purple} label="Ángulo entre las dos tangentes">{f1(ang)}°</Stat>
        <Stat color={MANIM.muted} label="Ángulo OT·TP">90°</Stat>
      </Readout>
      <Note>La <b>tangente</b> a una circunferencia es perpendicular al radio en el punto de tangencia. Desde un punto exterior P hay <b>dos tangentes iguales</b>. Para construirlas se traza la circunferencia de <b>diámetro OP</b> (centro en el punto medio): corta a la dada en T₁ y T₂, porque el ángulo inscrito en una semicircunferencia es recto (Thales). Si P está sobre la circunferencia, hay una sola tangente.</Note>
    </Frame>
  );
}

/* ───────────── 2. Posiciones relativas de dos circunferencias ───────────── */

export function CircunferenciasTangentesDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { R: Math.round(num(block.params?.a, 3, 1, 6)), r: Math.round(num(block.params?.b, 2, 1, 6)), d: 7 };
  const [s, setS] = useState(init);
  const p = posicionCircunferencias(s.R, s.r, s.d);
  const te = tangenteExterior(s.R, s.r, s.d);
  const ti = tangenteInterior(s.R, s.r, s.d);
  const U = Math.min(24, 380 / (s.R + s.d + s.r + 1));
  const O1: Pt = [60 + s.R * U, 135];
  const O2: Pt = [O1[0] + s.d * U, 135];
  const color = p.tangentes === 4 ? MANIM.green : p.tangentes === 3 || p.tangentes === 1 ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve la distancia entre centros. Fíjate en cuándo las circunferencias se tocan y cuántas tangentes comunes tienen."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Radio R" value={s.R} min={1} max={6} step={1} unit=" cm" color={MANIM.blue} onChange={(R) => setS((v) => ({ ...v, R }))} />
          <Slider label="Radio r" value={s.r} min={1} max={6} step={1} unit=" cm" color={MANIM.orange} onChange={(r) => setS((v) => ({ ...v, r }))} />
          <Slider label="Distancia entre centros" value={s.d} min={0} max={14} step={0.5} unit=" cm" color={MANIM.purple} onChange={(d) => setS((v) => ({ ...v, d }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="circunferencias" maxH={300}>
        <circle cx={O1[0]} cy={O1[1]} r={s.R * U} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.blue} strokeWidth={2.5} />
        <circle cx={O2[0]} cy={O2[1]} r={s.r * U} fill={MANIM.orange} fillOpacity={0.15} stroke={MANIM.orange} strokeWidth={2.5} />
        <Seg a={O1} b={O2} color={MANIM.muted} width={1.5} dashed />
        <Dot p={O1} r={4} />
        <Dot p={O2} r={4} />
      </Svg>
      <Readout>
        <Stat color={color} label="Posición">{p.pos}</Stat>
        <Stat color={color} label="Tangentes comunes">{Number.isFinite(p.tangentes) ? p.tangentes : "infinitas"}</Stat>
        <Stat color={MANIM.green} label="Tangente exterior (entre puntos)">{f2(te)} cm</Stat>
        <Stat color={MANIM.purple} label="Tangente interior (entre puntos)">{f2(ti)} cm</Stat>
      </Readout>
      <Note>Con distancia d entre centros: <b>exteriores</b> si d &gt; R + r (4 tangentes comunes: 2 exteriores y 2 interiores), <b>tangentes exteriores</b> si d = R + r (3), <b>secantes</b> si |R − r| &lt; d &lt; R + r (2 exteriores), <b>tangentes interiores</b> si d = |R − r| (1) e <b>interiores</b> si d &lt; |R − r| (0). El punto de tangencia de dos circunferencias <b>siempre está en la recta que une sus centros</b>.</Note>
    </Frame>
  );
}

/* ───────────── 3. Enlace entre dos rectas ───────────── */

export function EnlaceDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { alpha: Math.round(num(block.params?.a, 90, 30, 150) / 5) * 5, r: Math.round(num(block.params?.b, 2, 1, 6)) };
  const [s, setS] = useState(init);
  const { t, d } = enlaceDosRectas(s.alpha, s.r);
  const al = s.alpha * RAD;
  const U = Math.min(30, 220 / Math.max(t + 1, d, s.r * 2, 4));
  const V: Pt = [80, 230];
  const at = (len: number, ang: number): Pt => [V[0] + len * U * Math.cos(ang), V[1] - len * U * Math.sin(ang)];
  const C = at(d, al / 2);
  const T1 = at(t, 0);
  const T2 = at(t, al);
  const reach = Math.max(t + 2, 6);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un enlace redondea la esquina entre dos rectas con un arco tangente a ambas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo entre las rectas" value={s.alpha} min={30} max={150} step={5} unit="°" color={MANIM.purple} onChange={(alpha) => setS((v) => ({ ...v, alpha }))} />
          <Slider label="Radio del enlace" value={s.r} min={1} max={6} step={1} unit=" cm" color={MANIM.orange} onChange={(r) => setS((v) => ({ ...v, r }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="enlace" maxH={290}>
        <Seg a={V} b={at(reach, 0)} color={MANIM.ink} width={3} />
        <Seg a={V} b={at(reach, al)} color={MANIM.ink} width={3} />
        <Seg a={V} b={C} color={MANIM.muted} width={1.5} dashed />
        <circle cx={C[0]} cy={C[1]} r={s.r * U} fill="none" stroke={MANIM.muted} strokeWidth={1} strokeDasharray="4 4" />
        <path d={`M ${T1[0]} ${T1[1]} A ${s.r * U} ${s.r * U} 0 0 0 ${T2[0]} ${T2[1]}`} fill="none" stroke={MANIM.green} strokeWidth={4} />
        <Seg a={C} b={T1} color={MANIM.orange} width={1.5} />
        <Seg a={C} b={T2} color={MANIM.orange} width={1.5} />
        <Dot p={V} r={4} />
        <Dot p={C} color={MANIM.blue} r={5} />
        <Dot p={T1} color={MANIM.orange} r={5} />
        <Dot p={T2} color={MANIM.orange} r={5} />
        <text x={V[0] - 18} y={V[1] + 18} fill={MANIM.ink} fontSize={15} fontWeight={700}>V</text>
        <text x={C[0] + 8} y={C[1] - 8} fill={MANIM.blue} fontSize={15} fontWeight={700}>O</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Vértice → puntos de tangencia t = r / tan(α/2)">{f2(t)} cm</Stat>
        <Stat color={MANIM.blue} label="Vértice → centro d = r / sen(α/2)">{f2(d)} cm</Stat>
        <Stat color={MANIM.green} label="Longitud del arco de enlace">{f2(s.r * (Math.PI - al))} cm</Stat>
      </Readout>
      <Note>El centro del enlace está a <b>distancia r de ambas rectas</b>: es el corte de dos <b>paralelas</b> a las rectas dadas (a distancia r) y está en la <b>bisectriz</b> del ángulo. Los <b>puntos de tangencia</b> son los pies de las perpendiculares desde el centro. Cuanto <b>menor</b> es el ángulo o <b>mayor</b> el radio, más lejos del vértice empieza el arco. Es la base de los <b>redondeos</b> de esquinas en piezas y trazados de carreteras.</Note>
    </Frame>
  );
}

/* ───────────── 4. Óvalo ───────────── */

export function OvaloDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 6, 3, 8)), b: Math.round(num(block.params?.b, 4, 2, 6)), f: 50 };
  const [s, setS] = useState(init);
  const b = Math.min(s.b, s.a - 1);
  const r = (s.f / 100) * b;
  const o = ovalo(s.a, b, r);
  const U = Math.min(30, 230 / s.a, 120 / Math.max(b, 1));
  const O: Pt = [260, 135];
  const sc = (x: number, y: number): Pt => [O[0] + x * U, O[1] - y * U];
  const arc = (cx: number, cy: number, rad: number, a0: number, a1: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const th = a0 + ((a1 - a0) * i) / 40;
      const p = sc(cx + rad * Math.cos(th), cy + rad * Math.sin(th));
      pts.push(`${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const ok = Number.isFinite(o.R);
  const jr = ok ? Math.atan2(o.yc, o.x1) : 0; // ángulo del punto de tangencia visto desde el centro del arco pequeño
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un óvalo se construye con cuatro arcos tangentes. Cambia el radio del arco pequeño y observa el grande."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Semieje mayor a" value={s.a} min={3} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label="Semieje menor b" value={b} min={2} max={Math.max(2, Math.min(6, s.a - 1))} step={1} unit=" cm" color={MANIM.orange} onChange={(bb) => setS((v) => ({ ...v, b: bb }))} />
          <Slider label="Radio del arco pequeño (% de b)" value={s.f} min={10} max={90} step={5} unit=" %" color={MANIM.purple} onChange={(f) => setS((v) => ({ ...v, f }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="ovalo" maxH={300}>
        {ok ? (
          <>
            <path d={arc(o.x1, 0, r, -jr, jr)} fill="none" stroke={MANIM.purple} strokeWidth={3.5} />
            <path d={arc(-o.x1, 0, r, Math.PI - jr, Math.PI + jr)} fill="none" stroke={MANIM.purple} strokeWidth={3.5} />
            <path d={arc(0, -o.yc, o.R, jr, Math.PI - jr)} fill="none" stroke={MANIM.green} strokeWidth={3.5} />
            <path d={arc(0, o.yc, o.R, Math.PI + jr, 2 * Math.PI - jr)} fill="none" stroke={MANIM.green} strokeWidth={3.5} />
            <Seg a={sc(-s.a - 0.5, 0)} b={sc(s.a + 0.5, 0)} color={MANIM.muted} width={1} dashed />
            <Seg a={sc(0, -b - 0.5)} b={sc(0, b + 0.5)} color={MANIM.muted} width={1} dashed />
            <Dot p={sc(o.x1, 0)} color={MANIM.purple} r={4} />
            <Dot p={sc(-o.x1, 0)} color={MANIM.purple} r={4} />
            <Dot p={sc(0, -o.yc)} color={MANIM.green} r={4} />
            <Dot p={sc(0, o.yc)} color={MANIM.green} r={4} />
          </>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Radio de los arcos pequeños r">{f2(r)} cm</Stat>
        <Stat color={MANIM.green} label="Radio de los arcos grandes R">{f2(o.R)} cm</Stat>
        <Stat color={MANIM.blue} label="Perímetro del óvalo">{f2(o.perimetro)} cm</Stat>
        <Stat color={MANIM.muted} label="Perímetro de la elipse de iguales ejes">{f2(o.elipse)} cm</Stat>
      </Readout>
      <Note>Un <b>óvalo</b> es una curva cerrada de <b>cuatro arcos de circunferencia</b> tangentes entre sí, con dos ejes de simetría. Los centros de los arcos pequeños están en el eje mayor y los de los grandes en el menor; los <b>puntos de enlace</b> están en las rectas que unen los centros. Con la condición de tangencia (a − r)² + (R − b)² = (R − r)² se obtiene R. <b>No es una elipse</b>, aunque se le parece: se usa porque se traza con compás y se mecaniza con facilidad.</Note>
    </Frame>
  );
}

/* ───────────── 5. Espirales y evolvente ───────────── */

export function EspiralEvolventeDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { m: (Math.round(num(block.params?.n, 0, 0, 1)) === 1 ? "evolvente" : "espiral") as "espiral" | "evolvente", n: Math.round(num(block.params?.a, 6, 2, 12)), t: 270 };
  const [s, setS] = useState(init);
  const U = s.m === "evolvente" ? 14 : 18;
  const O: Pt = [260, 135];
  const sc = (x: number, y: number): Pt => [O[0] + x * U, O[1] - y * U];
  const d = 1;
  const pts: string[] = [];
  if (s.m === "espiral") {
    for (let k = 1; k <= s.n; k++) {
      const cx = k % 2 === 1 ? 0 : d;
      const rad = k * d;
      for (let i = 0; i <= 30; i++) {
        const th = k % 2 === 1 ? (i * Math.PI) / 30 : Math.PI + (i * Math.PI) / 30;
        const p = sc(cx + rad * Math.cos(th), rad * Math.sin(th));
        pts.push(`${pts.length === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`);
      }
    }
  } else {
    const r = 1;
    for (let i = 0; i <= 80; i++) {
      const th = (i / 80) * (s.t * RAD);
      const p = evolvente(r, th);
      const q = sc(p[0], p[1]);
      pts.push(`${i === 0 ? "M" : "L"} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`);
    }
  }
  const thT = s.t * RAD;
  const P = evolvente(1, thT);
  const tang: Pt = [Math.cos(thT), Math.sin(thT)];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos curvas técnicas muy usadas: la espiral de dos centros y la evolvente de la circunferencia (perfil de los dientes de engranaje)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Curva" items={[{ value: "espiral", label: "Espiral de dos centros" }, { value: "evolvente", label: "Evolvente de la circunferencia" }]} value={s.m} onChange={(m) => setS((v) => ({ ...v, m }))} />
          {s.m === "espiral" ? (
            <Slider label="Semicircunferencias" value={s.n} min={2} max={12} step={1} color={MANIM.blue} onChange={(n) => setS((v) => ({ ...v, n }))} />
          ) : (
            <Slider label="Ángulo desenrollado θ" value={s.t} min={30} max={540} step={10} unit="°" color={MANIM.orange} onChange={(t) => setS((x) => ({ ...x, t }))} />
          )}
        </>
      }
    >
      <Svg w={520} h={270} testId="espiral-evolvente" maxH={300}>
        {s.m === "evolvente" ? (
          <>
            <circle cx={sc(0, 0)[0]} cy={sc(0, 0)[1]} r={U} fill="none" stroke={MANIM.muted} strokeWidth={1.5} />
            <Seg a={sc(tang[0], tang[1])} b={sc(P[0], P[1])} color={MANIM.orange} width={2} />
            <Dot p={sc(P[0], P[1])} color={MANIM.orange} r={5} />
          </>
        ) : (
          <>
            <Dot p={sc(0, 0)} color={MANIM.blue} r={4} />
            <Dot p={sc(d, 0)} color={MANIM.orange} r={4} />
          </>
        )}
        <path d={pts.join(" ")} fill="none" stroke={s.m === "espiral" ? MANIM.green : MANIM.purple} strokeWidth={3} />
      </Svg>
      <Readout>
        {s.m === "espiral" ? (
          <>
            <Stat color={MANIM.blue} label="Radio del último arco">{f1(radioArcoEspiral(s.n, d))} d</Stat>
            <Stat color={MANIM.green} label="Longitud total">{f1(longitudEspiral(s.n, d))} d</Stat>
            <Stat color={MANIM.muted} label="Paso (por vuelta completa)">{f1(2 * d)} d</Stat>
          </>
        ) : (
          <>
            <Stat color={MANIM.orange} label="Longitud de la tangente = r · θ">{f2(thT)} r</Stat>
            <Stat color={MANIM.muted} label="La tangente es normal a la curva">en cada punto</Stat>
          </>
        )}
      </Readout>
      <Note>La <b>espiral de dos centros</b> se construye con <b>semicircunferencias</b> alternas centradas en dos puntos separados una distancia d, con radios d, 2d, 3d…; el paso por vuelta es 2d. La <b>evolvente</b> de una circunferencia es la curva que describe el extremo de un hilo tenso que se desenrolla de ella: el hilo siempre es <b>tangente a la circunferencia</b> y <b>normal a la evolvente</b>. Es el perfil de los dientes de los <b>engranajes</b>.</Note>
    </Frame>
  );
}
