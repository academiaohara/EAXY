"use client";

import { useState, type ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { EpuraBase, ep, tag } from "@/components/lesson/slide/tools/DtDiedricoTools";
import { areaPoligono } from "@/components/lesson/slide/tools/DtIIDiedricoAvanzadoTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Vértices de un polígono regular de n lados inscrito en una circunferencia de radio r (el primero hacia delante). */
export function poligonoRegular(n: number, r: number): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const a = Math.PI / 2 + (2 * Math.PI * i) / n;
    return [r * Math.cos(a), r * Math.sin(a)] as Pt;
  });
}

/** Prisma o pirámide recta de base regular: área de la base, lado, volumen y área lateral. */
export function medidasSolido(tipo: "prisma" | "piramide", n: number, r: number, h: number) {
  const base = 0.5 * n * r * r * Math.sin((2 * Math.PI) / n);
  const lado = 2 * r * Math.sin(Math.PI / n);
  const apotema = r * Math.cos(Math.PI / n);
  if (tipo === "prisma") return { base, lado, volumen: base * h, lateral: n * lado * h, apotemaLateral: NaN };
  const ap = Math.hypot(h, apotema);
  return { base, lado, volumen: (base * h) / 3, lateral: (n * lado * ap) / 2, apotemaLateral: ap };
}

/** Sección de un prisma recto de base regular (eje vertical, altura h) por un plano proyectante vertical z = zc + tg α · x: los puntos de las aristas, su verdadera forma (abatida) y el área real. */
export function seccionPrisma(n: number, r: number, alphaDeg: number, zc: number, h: number) {
  const base = poligonoRegular(n, r);
  const t = Math.tan(alphaDeg * RAD);
  const cosA = Math.cos(alphaDeg * RAD);
  const z = base.map((p) => zc + t * p[0]);
  const real = base.map((p) => [p[0] / cosA, p[1]] as Pt);
  return { z, real, areaBase: areaPoligono(base), areaReal: areaPoligono(real), valida: z.every((v) => v >= 0 && v <= h) };
}

/** Sección de un cilindro (radio r) o de un cono (radio R en la base, altura H) de eje vertical por un plano proyectante z = zc + tg α · x: curva en planta y verdadera forma. */
export function seccionRevolucion(tipo: "cilindro" | "cono", r: number, H: number, alphaDeg: number, zc: number, n = 180) {
  const t = Math.tan(alphaDeg * RAD);
  const cosA = Math.cos(alphaDeg * RAD);
  const k = r / H;
  const planta: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const th = (2 * Math.PI * i) / n;
    const rho = tipo === "cilindro" ? r : (k * (H - zc)) / (1 + k * t * Math.cos(th));
    planta.push([rho * Math.cos(th), rho * Math.sin(th)]);
  }
  const real = planta.map((p) => [p[0] / cosA, p[1]] as Pt);
  const xs = real.map((p) => p[0]);
  const ys = real.map((p) => p[1]);
  const a = (Math.max(...xs) - Math.min(...xs)) / 2;
  const b = (Math.max(...ys) - Math.min(...ys)) / 2;
  return { planta, real, a, b, area: areaPoligono(real), valida: tipo === "cilindro" || Math.abs(k * t) < 1 };
}

export const POLIEDROS = ["tetraedro", "cubo", "octaedro", "dodecaedro", "icosaedro"] as const;
export type Poliedro = (typeof POLIEDROS)[number];
const S5 = Math.sqrt(5);
const S3 = Math.sqrt(3);
/** Datos de un poliedro regular de arista a. */
export function poliedroRegular(p: Poliedro, a: number) {
  const d = {
    tetraedro: { caras: 4, aristas: 6, vertices: 4, lados: 3, area: S3 * a * a, volumen: (a * a * a) / (6 * Math.SQRT2), rc: (a * Math.sqrt(6)) / 4 },
    cubo: { caras: 6, aristas: 12, vertices: 8, lados: 4, area: 6 * a * a, volumen: a * a * a, rc: (a * S3) / 2 },
    octaedro: { caras: 8, aristas: 12, vertices: 6, lados: 3, area: 2 * S3 * a * a, volumen: (Math.SQRT2 / 3) * a * a * a, rc: a / Math.SQRT2 },
    dodecaedro: { caras: 12, aristas: 30, vertices: 20, lados: 5, area: 3 * Math.sqrt(25 + 10 * S5) * a * a, volumen: ((15 + 7 * S5) / 4) * a * a * a, rc: (a * S3 * (1 + S5)) / 4 },
    icosaedro: { caras: 20, aristas: 30, vertices: 12, lados: 3, area: 5 * S3 * a * a, volumen: ((5 * (3 + S5)) / 12) * a * a * a, rc: (a / 4) * Math.sqrt(10 + 2 * S5) },
  }[p];
  return { ...d, euler: d.vertices - d.aristas + d.caras };
}

/** Desarrollo de un cono: sector de radio g (generatriz) y ángulo 360·R/g. */
export function desarrolloCono(R: number, H: number) {
  const g = Math.hypot(R, H);
  return { g, angulo: (360 * R) / g, lateral: Math.PI * R * g };
}
/** Desarrollo de un cilindro: rectángulo de 2πr × h. */
export const desarrolloCilindro = (r: number, h: number) => ({ ancho: 2 * Math.PI * r, alto: h, lateral: 2 * Math.PI * r * h });
/** Desarrollo de una pirámide regular: n triángulos isósceles de base el lado y altura la apotema lateral. */
export function desarrolloPiramide(n: number, r: number, h: number) {
  const m = medidasSolido("piramide", n, r, h);
  return { lado: m.lado, apotemaLateral: m.apotemaLateral, lateral: m.lateral, apotemaBase: r * Math.cos(Math.PI / n) };
}

/* ───────────── 1. Prismas y pirámides en diédrico ───────────── */

const TIPOS_SOL = [
  { value: "prisma", label: "Prisma" },
  { value: "piramide", label: "Pirámide" },
] as const;

export function SolidoDiedricoDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { tipo: (num(block.params?.n, 0, 0, 1) >= 0.5 ? "piramide" : "prisma") as "prisma" | "piramide", n: Math.round(num(block.params?.a, 5, 3, 8)), r: num(block.params?.b, 2, 1, 2.5), h: Math.round(num(block.params?.c, 3, 1, 4)) };
  const [s, setS] = useState(init);
  const base = poligonoRegular(s.n, s.r);
  const cy = 3;
  const m = medidasSolido(s.tipo, s.n, s.r, s.h);
  const xs = base.map((p) => p[0]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un sólido apoyado en el PH se ve en planta como su base y en alzado como un rectángulo (prisma) o un triángulo (pirámide)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sólido" items={TIPOS_SOL} value={s.tipo} onChange={(tipo) => setS((o) => ({ ...o, tipo }))} />
          <Slider label="Lados de la base" value={s.n} min={3} max={8} step={1} color={MANIM.purple} onChange={(n) => setS((o) => ({ ...o, n }))} />
          <Slider label="Radio de la base" value={s.r} min={1} max={2.5} step={0.5} unit=" cm" color={MANIM.orange} format={f1} onChange={(r) => setS((o) => ({ ...o, r }))} />
          <Slider label="Altura" value={s.h} min={1} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, h }))} />
        </>
      }
    >
      <EpuraBase testId="solido-diedrico" h={300}>
        <polygon points={base.map((p) => ep(p[0], cy + p[1]).join(",")).join(" ")} fill={MANIM.orange} fillOpacity={0.12} stroke={MANIM.orange} strokeWidth={3} />
        {s.tipo === "piramide" ? base.map((p, i) => <Seg key={i} a={ep(0, cy)} b={ep(p[0], cy + p[1])} color={MANIM.orange} width={1.5} dashed />) : null}
        <Dot p={ep(0, cy)} color={MANIM.yellow} r={3} />
        {s.tipo === "prisma" ? (
          <>
            <rect x={ep(minX, 0)[0]} y={ep(0, -s.h)[1]} width={(maxX - minX) * 26} height={s.h * 26} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={3} />
            {Array.from(new Set(xs.map((x) => Math.round(x * 1000)))).map((k) => (
              <Seg key={k} a={ep(k / 1000, 0)} b={ep(k / 1000, -s.h)} color={MANIM.blue} width={1.5} />
            ))}
          </>
        ) : (
          <>
            <polygon points={`${ep(minX, 0).join(",")} ${ep(0, -s.h).join(",")} ${ep(maxX, 0).join(",")}`} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={3} />
            {Array.from(new Set(xs.map((x) => Math.round(x * 1000)))).map((k) => (
              <Seg key={k} a={ep(k / 1000, 0)} b={ep(0, -s.h)} color={MANIM.blue} width={1.5} />
            ))}
          </>
        )}
        {s.tipo === "piramide" ? tag(ep(0, -s.h), "V″", MANIM.blue, 10, -4) : null}
        {tag(ep(maxX, cy), "base′", MANIM.orange, 12, 4)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.orange} label="Área de la base">{f2(m.base)} cm²</Stat>
        <Stat color={MANIM.muted} label="Lado de la base">{f2(m.lado)} cm</Stat>
        <Stat color={MANIM.blue} label="Volumen">{f2(m.volumen)} cm³</Stat>
        <Stat color={MANIM.green} label="Área lateral">{f2(m.lateral)} cm²</Stat>
      </Readout>
      <Note>Un <b>prisma</b> o una <b>pirámide</b> rectos de base regular apoyados en el PH se representan con la <b>base en verdadera forma</b> en la proyección horizontal y las aristas laterales proyectadas como <b>puntos</b> (prisma) o como rectas que concurren en el <b>vértice</b> (pirámide). En el alzado, la base queda sobre la LT y la altura se ve en <b>verdadera magnitud</b>. Volumen: <b>A·h</b> en el prisma y <b>A·h / 3</b> en la pirámide.</Note>
    </Frame>
  );
}

/* ───────────── 2. Sección de un prisma por un plano proyectante ───────────── */

export function SeccionPrismaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 4, 3, 8)), alpha: Math.round(num(block.params?.b, 30, 10, 40)), zc: num(block.params?.c, 2, 1, 3) };
  const [s, setS] = useState(init);
  const r = 2;
  const h = 4;
  const sec = seccionPrisma(s.n, r, s.alpha, s.zc, h);
  const base = poligonoRegular(s.n, r);
  const t = Math.tan(s.alpha * RAD);
  const cy = 3;
  const cxP = -3.5;
  const cxR = 4;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El plano es proyectante: en el alzado es una recta, la planta de la sección coincide con la base y la verdadera forma se obtiene por abatimiento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Lados de la base" value={s.n} min={3} max={8} step={1} color={MANIM.purple} onChange={(n) => setS((o) => ({ ...o, n }))} />
          <Slider label="Inclinación del plano α" value={s.alpha} min={10} max={40} step={5} unit="°" color={MANIM.orange} onChange={(alpha) => setS((o) => ({ ...o, alpha }))} />
          <Slider label="Altura a la que corta el eje" value={s.zc} min={1} max={3} step={0.5} unit=" cm" color={MANIM.blue} format={f1} onChange={(zc) => setS((o) => ({ ...o, zc }))} />
        </>
      }
    >
      <EpuraBase testId="seccion-prisma" h={300}>
        <rect x={ep(cxP - r, 0)[0]} y={ep(0, -h)[1]} width={2 * r * 26} height={h * 26} fill={MANIM.blue} fillOpacity={0.08} stroke={MANIM.blue} strokeWidth={2.5} />
        <Seg a={ep(cxP - r, -(s.zc - t * r))} b={ep(cxP + r, -(s.zc + t * r))} color={MANIM.orange} width={3.5} />
        <polygon points={base.map((p) => ep(cxP + p[0], cy + p[1]).join(",")).join(" ")} fill={MANIM.orange} fillOpacity={0.2} stroke={MANIM.orange} strokeWidth={3} />
        <polygon points={sec.real.map((p) => ep(cxR + p[0], cy + p[1]).join(",")).join(" ")} fill={MANIM.green} fillOpacity={0.2} stroke={MANIM.green} strokeWidth={3} />
        {base.map((p, i) => (
          <Dot key={i} p={ep(cxP + p[0], -sec.z[i]!)} color={MANIM.orange} r={3.5} />
        ))}
        {tag(ep(cxP + r, -(s.zc + t * r)), "plano α", MANIM.orange, 8, -4)}
        {tag(ep(cxR, cy + 3), "verdadera forma", MANIM.green, -52, 22)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.orange} label="Área de la base (= planta de la sección)">{f2(sec.areaBase)} cm²</Stat>
        <Stat color={MANIM.green} label="Área real de la sección">{f2(sec.areaReal)} cm²</Stat>
        <Stat color={MANIM.purple} label="Cociente 1 / cos α">{f2(1 / Math.cos(s.alpha * RAD))}</Stat>
        <Stat color={MANIM.muted} label="Plano dentro del prisma">{sec.valida ? "sí" : "se sale: sección incompleta"}</Stat>
      </Readout>
      <Note>Cuando el plano de corte es <b>proyectante</b> (perpendicular al PV), en el alzado es <b>una recta</b> y los puntos de la sección en las aristas se ven directamente. Como las aristas del prisma son verticales, la <b>proyección horizontal de la sección coincide con la base</b>. La <b>verdadera forma</b> se obtiene abatiendo el plano: es una <b>afinidad</b> de la base de razón <b>1 / cos α</b> en la dirección de la traza, así que el <b>área real</b> es el área de la base dividida por cos α.</Note>
    </Frame>
  );
}

/* ───────────── 3. Sección de un cilindro o un cono ───────────── */

const REV = [
  { value: "cilindro", label: "Cilindro" },
  { value: "cono", label: "Cono" },
] as const;

export function SeccionRevolucionDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { tipo: (num(block.params?.n, 0, 0, 1) >= 0.5 ? "cono" : "cilindro") as "cilindro" | "cono", alpha: Math.round(num(block.params?.a, 30, 10, 40)), zc: num(block.params?.b, 2, 1, 3) };
  const [s, setS] = useState(init);
  const r = 2;
  const H = 4;
  const sec = seccionRevolucion(s.tipo, r, H, s.alpha, s.zc);
  const t = Math.tan(s.alpha * RAD);
  const cy = 3;
  const cxP = -3.5;
  const cxR = 4;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un plano proyectante corta el cilindro o el cono en una elipse: en planta se ve deformada y abatida muestra su verdadera forma."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Cuerpo" items={REV} value={s.tipo} onChange={(tipo) => setS((o) => ({ ...o, tipo }))} />
          <Slider label="Inclinación del plano α" value={s.alpha} min={10} max={40} step={5} unit="°" color={MANIM.orange} onChange={(alpha) => setS((o) => ({ ...o, alpha }))} />
          <Slider label="Altura a la que corta el eje" value={s.zc} min={1} max={3} step={0.5} unit=" cm" color={MANIM.blue} format={f1} onChange={(zc) => setS((o) => ({ ...o, zc }))} />
        </>
      }
    >
      <EpuraBase testId="seccion-revolucion" h={300}>
        {s.tipo === "cilindro" ? (
          <rect x={ep(cxP - r, 0)[0]} y={ep(0, -H)[1]} width={2 * r * 26} height={H * 26} fill={MANIM.blue} fillOpacity={0.08} stroke={MANIM.blue} strokeWidth={2.5} />
        ) : (
          <polygon points={`${ep(cxP - r, 0).join(",")} ${ep(cxP, -H).join(",")} ${ep(cxP + r, 0).join(",")}`} fill={MANIM.blue} fillOpacity={0.08} stroke={MANIM.blue} strokeWidth={2.5} />
        )}
        <Seg a={ep(cxP - r, -(s.zc - t * r))} b={ep(cxP + r, -(s.zc + t * r))} color={MANIM.orange} width={3.5} />
        <circle cx={ep(cxP, cy)[0]} cy={ep(cxP, cy)[1]} r={r * 26} fill="none" stroke={MANIM.blue} strokeWidth={1.5} strokeDasharray="5 4" />
        <polygon points={sec.planta.map((p) => ep(cxP + p[0], cy + p[1]).join(",")).join(" ")} fill={MANIM.orange} fillOpacity={0.2} stroke={MANIM.orange} strokeWidth={3} />
        <polygon points={sec.real.map((p) => ep(cxR + p[0], cy + p[1]).join(",")).join(" ")} fill={MANIM.green} fillOpacity={0.2} stroke={MANIM.green} strokeWidth={3} />
        {tag(ep(cxR, cy + 3), "verdadera forma", MANIM.green, -52, 22)}
      </EpuraBase>
      <Readout>
        <Stat color={MANIM.green} label="Semieje mayor real">{f2(sec.a)} cm</Stat>
        <Stat color={MANIM.green} label="Semieje menor real">{f2(sec.b)} cm</Stat>
        <Stat color={MANIM.purple} label="Área real de la elipse π·a·b">{f2(Math.PI * sec.a * sec.b)} cm²</Stat>
        <Stat color={MANIM.muted} label="Sección">{sec.valida ? "elipse" : "no es elipse (plano más inclinado que la generatriz)"}</Stat>
      </Readout>
      <Note>La sección de un <b>cilindro</b> de eje vertical por un plano proyectante inclinado α es una <b>elipse</b> de semiejes <b>r</b> y <b>r / cos α</b>; en planta se ve como la propia circunferencia de la base. La del <b>cono</b> es también una elipse mientras el plano sea menos inclinado que las generatrices (si no, sería parábola o hipérbola, como vimos en el tema 4); en planta es una elipse <b>no centrada</b> en el eje. En ambos casos, la <b>verdadera forma</b> sale de abatir el plano de corte: es la afinidad de la planta con razón 1 / cos α.</Note>
    </Frame>
  );
}

/* ───────────── 4. Poliedros regulares ───────────── */

const NOMBRES: Record<Poliedro, string> = { tetraedro: "Tetraedro", cubo: "Cubo", octaedro: "Octaedro", dodecaedro: "Dodecaedro", icosaedro: "Icosaedro" };

export function PoliedrosRegularesDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { p: POLIEDROS[Math.round(num(block.params?.n, 1, 0, 4))]!, a: Math.round(num(block.params?.a, 3, 1, 6)) };
  const [s, setS] = useState<{ p: Poliedro; a: number }>(init);
  const d = poliedroRegular(s.p, s.a);
  const c: Pt = [130, 130];
  const R = 70;
  const cara = poligonoRegular(d.lados, R).map((q) => [c[0] + q[0], c[1] - q[1]] as Pt);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Solo existen cinco poliedros regulares; todos cumplen la relación de Euler: vértices − aristas + caras = 2."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Poliedro" items={POLIEDROS.map((p) => ({ value: p, label: NOMBRES[p] }))} value={s.p} onChange={(p) => setS((o) => ({ ...o, p }))} />
          <Slider label="Arista a" value={s.a} min={1} max={6} step={1} unit=" cm" color={MANIM.orange} onChange={(a) => setS((o) => ({ ...o, a }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="poliedros-regulares" maxH={280}>
        <text x={12} y={18} fill={MANIM.muted} fontSize={12}>Forma de cada cara</text>
        <polygon points={cara.map((q) => q.join(",")).join(" ")} fill={MANIM.orange} fillOpacity={0.15} stroke={MANIM.orange} strokeWidth={3} />
        {cara.map((q, i) => <Dot key={i} p={q} color={MANIM.yellow} r={4} />)}
        <text x={c[0] - 14} y={c[1] + 5} fill={MANIM.ink} fontSize={16} fontWeight={700}>{d.lados}</text>
        {[["Caras", d.caras], ["Aristas", d.aristas], ["Vértices", d.vertices]].map(([n, v], i) => (
          <g key={String(n)}>
            <text x={290 + i * 80} y={110} fill={MANIM.muted} fontSize={13}>{n}</text>
            <text x={290 + i * 80} y={150} fill={[MANIM.blue, MANIM.green, MANIM.yellow][i]} fontSize={34} fontWeight={700}>{v}</text>
          </g>
        ))}
        <text x={290} y={200} fill={MANIM.ink} fontSize={15} fontWeight={700}>{`V − A + C = ${d.vertices} − ${d.aristas} + ${d.caras} = ${d.euler}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Área total">{f2(d.area)} cm²</Stat>
        <Stat color={MANIM.blue} label="Volumen">{f2(d.volumen)} cm³</Stat>
        <Stat color={MANIM.purple} label="Radio de la esfera circunscrita">{f2(d.rc)} cm</Stat>
      </Readout>
      <Note>Un <b>poliedro regular</b> tiene todas las caras iguales (polígonos regulares) y en cada vértice concurren el mismo número de caras. Solo hay <b>cinco</b>, los <b>sólidos platónicos</b>: tetraedro, cubo, octaedro, dodecaedro e icosaedro. Todos verifican la <b>relación de Euler</b>: V − A + C = 2. El cubo y el octaedro son <b>duales</b> (los centros de las caras de uno son los vértices del otro), igual que el dodecaedro y el icosaedro; el tetraedro es dual de sí mismo.</Note>
    </Frame>
  );
}

/* ───────────── 5. Desarrollos ───────────── */

const DESARROLLOS = [
  { value: "cilindro", label: "Cilindro" },
  { value: "cono", label: "Cono" },
  { value: "piramide", label: "Pirámide cuadrada" },
] as const;

export function DesarrolloCuerposDt2Explorador({ block }: { block: ToolBlock }) {
  const kinds = ["cilindro", "cono", "piramide"] as const;
  const init = { tipo: kinds[Math.round(num(block.params?.n, 1, 0, 2))]!, r: num(block.params?.a, 2, 1, 3), h: Math.round(num(block.params?.b, 4, 1, 5)) };
  const [s, setS] = useState<{ tipo: (typeof kinds)[number]; r: number; h: number }>(init);
  let dibujo: ReactNode;
  let datos: ReactNode;
  if (s.tipo === "cilindro") {
    const d = desarrolloCilindro(s.r, s.h);
    const U = Math.min(26, 440 / d.ancho);
    const x0 = 260 - (d.ancho * U) / 2;
    dibujo = (
      <>
        <rect x={x0} y={70} width={d.ancho * U} height={d.alto * U} fill={MANIM.orange} fillOpacity={0.15} stroke={MANIM.orange} strokeWidth={3} />
        <circle cx={x0 + s.r * U} cy={70 - s.r * U} r={s.r * U} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={2.5} />
        <circle cx={x0 + s.r * U} cy={70 + d.alto * U + s.r * U} r={s.r * U} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={2.5} />
        <text x={260 - 40} y={70 + (d.alto * U) / 2} fill={MANIM.ink} fontSize={13} fontWeight={700}>2πr × h</text>
      </>
    );
    datos = <Stat color={MANIM.green} label="Rectángulo lateral">{`${f2(d.ancho)} × ${f2(d.alto)} cm`}</Stat>;
  } else if (s.tipo === "cono") {
    const d = desarrolloCono(s.r, s.h);
    const U = Math.min(38, 220 / d.g);
    const ang = d.angulo * RAD;
    const C: Pt = [260, 20];
    const a0 = Math.PI / 2 - ang / 2;
    const a1 = Math.PI / 2 + ang / 2;
    const P0: Pt = [C[0] + d.g * U * Math.cos(a0), C[1] + d.g * U * Math.sin(a0)];
    const P1: Pt = [C[0] + d.g * U * Math.cos(a1), C[1] + d.g * U * Math.sin(a1)];
    dibujo = (
      <>
        <path d={`M ${C[0]} ${C[1]} L ${P0[0]} ${P0[1]} A ${d.g * U} ${d.g * U} 0 ${ang > Math.PI ? 1 : 0} 1 ${P1[0]} ${P1[1]} Z`} fill={MANIM.orange} fillOpacity={0.15} stroke={MANIM.orange} strokeWidth={3} />
        <text x={C[0] + 8} y={C[1] + 18} fill={MANIM.ink} fontSize={13} fontWeight={700}>{`${f1(d.angulo)}°`}</text>
        <text x={C[0] + 10 + (P0[0] - C[0]) / 2} y={C[1] + (P0[1] - C[1]) / 2} fill={MANIM.yellow} fontSize={13} fontWeight={700}>g</text>
      </>
    );
    datos = <Stat color={MANIM.green} label="Sector: generatriz g · ángulo">{`${f2(d.g)} cm · ${f1(d.angulo)}°`}</Stat>;
  } else {
    const d = desarrolloPiramide(4, s.r, s.h);
    const lado = d.lado;
    const ap = d.apotemaLateral;
    const U = Math.min(26, 125 / (lado / 2 + ap));
    const C: Pt = [260, 150];
    const hl = (lado / 2) * U;
    const tri = (dir: number): string => {
      // triángulo pegado al lado dir (0 arriba, 1 derecha, 2 abajo, 3 izquierda)
      const v: Pt[] = [[-hl, -hl], [hl, -hl], [hl, hl], [-hl, hl]];
      const a = v[dir]!;
      const b = v[(dir + 1) % 4]!;
      const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const nn: Pt = [mid[0] / hl, mid[1] / hl];
      const apx: Pt = [mid[0] + nn[0] * ap * U, mid[1] + nn[1] * ap * U];
      return [a, b, apx].map((q) => `${C[0] + q[0]},${C[1] + q[1]}`).join(" ");
    };
    dibujo = (
      <>
        <rect x={C[0] - hl} y={C[1] - hl} width={2 * hl} height={2 * hl} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.blue} strokeWidth={2.5} />
        {[0, 1, 2, 3].map((k) => (
          <polygon key={k} points={tri(k)} fill={MANIM.orange} fillOpacity={0.15} stroke={MANIM.orange} strokeWidth={3} />
        ))}
      </>
    );
    datos = <Stat color={MANIM.green} label="Triángulos: base · altura (apotema lateral)">{`${f2(lado)} · ${f2(ap)} cm`}</Stat>;
  }
  const lateral = s.tipo === "cilindro" ? desarrolloCilindro(s.r, s.h).lateral : s.tipo === "cono" ? desarrolloCono(s.r, s.h).lateral : desarrolloPiramide(4, s.r, s.h).lateral;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El desarrollo extiende la superficie lateral en un plano: es la forma real del patrón de corte."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Cuerpo" items={DESARROLLOS} value={s.tipo} onChange={(tipo) => setS((o) => ({ ...o, tipo }))} />
          <Slider label={s.tipo === "piramide" ? "Radio de la base (circunscrito)" : "Radio de la base"} value={s.r} min={1} max={3} step={0.5} unit=" cm" color={MANIM.orange} format={f1} onChange={(r) => setS((o) => ({ ...o, r }))} />
          <Slider label="Altura" value={s.h} min={1} max={5} step={1} unit=" cm" color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, h }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="desarrollo-cuerpos" maxH={300}>{dibujo}</Svg>
      <Readout>
        {datos}
        <Stat color={MANIM.purple} label="Área lateral">{f2(lateral)} cm²</Stat>
      </Readout>
      <Note>El <b>desarrollo</b> de un cuerpo es la figura plana que se obtiene al extender su superficie. El <b>cilindro</b> da un <b>rectángulo</b> de lados 2πr y h (más dos círculos). El <b>cono</b> da un <b>sector circular</b> de radio la generatriz g y ángulo 360° · R / g. La <b>pirámide</b> da tantos <b>triángulos</b> como lados de la base, cuya altura es la <b>apotema lateral</b>. Las medidas reales de generatrices y aristas se hallan con los métodos del tema anterior (triángulo de abatimiento).</Note>
    </Frame>
  );
}
