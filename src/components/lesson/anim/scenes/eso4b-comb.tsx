import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const clampInt = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? (v as number) : d)));

const LEVEL_COLORS = [MANIM.blue, MANIM.orange, MANIM.green];

/**
 * Diagrama en árbol: `a` ramas en el primer paso, `b` en el segundo y `c` (opcional) en el tercero.
 * Se cuentan las hojas multiplicando.
 */
export function buildArbolConteo(params: { a?: number; b?: number; c?: number; titles?: string[] }): AnimBuild {
  const a = clampInt(params.a, 3, 1, 6);
  const b = clampInt(params.b, 3, 1, 6);
  let c = clampInt(params.c, 0, 0, 6);
  if (a * b * Math.max(c, 1) > 24) c = 0;
  const sizes = c > 0 ? [a, b, c] : [a, b];
  const total = sizes.reduce((x, y) => x * y, 1);
  const titles = params.titles ?? ["1.er paso", "2.º paso", "3.er paso"];
  const left = 70;
  const top = 50;
  const bottom = 380;
  const colW = 190;
  const leafY = (i: number) => top + ((i + 0.5) * (bottom - top)) / total;
  // Posición vertical de cada nodo: media de las hojas que cuelgan de él.
  const nodeY = (level: number, idx: number) => {
    const per = sizes.slice(level + 1).reduce((x, y) => x * y, 1);
    return (leafY(idx * per) + leafY(idx * per + per - 1)) / 2;
  };
  const counts = sizes.map((_, l) => sizes.slice(0, l + 1).reduce((x, y) => x * y, 1));
  const formula = sizes.join(" · ");
  const captions = [
    "Se parte de un único punto: todavía no se ha tomado ninguna decisión.",
    ...sizes.map((s, l) =>
      l === 0
        ? `**${titles[0]}**: ${s} posibilidades, una rama para cada una.`
        : `**${titles[l]}**: de cada rama salen otras ${s}. Ahora hay ${s} · ${counts[l - 1]} = ${counts[l]} ramas.`,
    ),
    `Cada camino de la raíz a una hoja es un resultado distinto: $${formula.replace(/ · /g, " \\cdot ")} = ${total}$.`,
  ];
  const labeled = total <= 12;
  return {
    label: `Diagrama en árbol con ${sizes.join(" y ")} ramas por paso: ${total} resultados`,
    captions,
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        <circle cx={left} cy={(top + bottom) / 2} r={9} fill={MANIM.ink} />
        {sizes.map((size, l) => {
          const nodes = counts[l]!;
          return (
            <Fade key={l} show={beat >= l + 1}>
              {Array.from({ length: nodes }, (_, i) => {
                const py = l === 0 ? (top + bottom) / 2 : nodeY(l - 1, Math.floor(i / size));
                const px = l === 0 ? left : left + colW * l;
                const x = left + colW * (l + 1);
                const y = nodeY(l, i);
                return (
                  <g key={i}>
                    <line x1={px} y1={py} x2={x} y2={y} stroke={LEVEL_COLORS[l]} strokeWidth={2.5} />
                    <circle cx={x} cy={y} r={labeled ? 7 : 4.5} fill={LEVEL_COLORS[l]} />
                  </g>
                );
              })}
              {l < sizes.length ? <Txt x={left + colW * (l + 0.5)} y={30} size={22} color={LEVEL_COLORS[l]}>{titles[l]}</Txt> : null}
            </Fade>
          );
        })}
        <Fade show={beat >= sizes.length + 1} dx={20}>
          <Txt x={left + colW * (sizes.length + 0.35)} y={150} size={42} color={MANIM.yellow} anchor="start">{formula}</Txt>
          <Txt x={left + colW * (sizes.length + 0.35)} y={215} size={64} color={MANIM.green} anchor="start">{`= ${total}`}</Txt>
          <Txt x={left + colW * (sizes.length + 0.35)} y={255} size={22} color={MANIM.muted} anchor="start">resultados distintos</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

const NAMES = ["A", "B", "C"];

/** Permutaciones de A, B, C: el árbol 3 · 2 · 1 = 6 con cada ordenación escrita al final. */
export function buildPermutacionesArbol(): AnimBuild {
  const perms: string[][] = [];
  for (const x of NAMES) for (const y of NAMES) for (const z of NAMES) if (x !== y && y !== z && x !== z) perms.push([x, y, z]);
  const top = 40;
  const bottom = 390;
  const leafY = (i: number) => top + ((i + 0.5) * (bottom - top)) / 6;
  const x0 = 90;
  const colW = 130;
  // Nivel 1: 3 nodos (cada 2 hojas), nivel 2: 6 nodos, nivel 3: 6 hojas (un solo hijo cada uno).
  const y1 = (i: number) => (leafY(i * 2) + leafY(i * 2 + 1)) / 2;
  const y2 = (i: number) => leafY(i);
  return {
    label: "Permutaciones de tres elementos: 3 · 2 · 1 = 6 ordenaciones",
    captions: [
      "Ordenar A, B y C en tres puestos. Primer puesto: **3** candidatos.",
      "Segundo puesto: ya hay uno colocado, quedan **2** para cada rama.",
      "Tercer puesto: solo queda **1** elemento por rama.",
      "En total, $3 \\cdot 2 \\cdot 1 = 6$ ordenaciones. A este producto se le llama **3 factorial**: $3! = 6$.",
    ],
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <circle cx={x0} cy={(top + bottom) / 2} r={9} fill={MANIM.ink} />
        <Fade show={beat >= 0}>
          {NAMES.map((n, i) => (
            <g key={n}>
              <line x1={x0} y1={(top + bottom) / 2} x2={x0 + colW} y2={y1(i)} stroke={MANIM.blue} strokeWidth={2.5} />
              <circle cx={x0 + colW} cy={y1(i)} r={16} fill={MANIM.surface} stroke={MANIM.blue} strokeWidth={3} />
              <Txt x={x0 + colW} y={y1(i) + 8} size={22} color={MANIM.blue}>{n}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 1}>
          {perms.map((p, i) => (
            <g key={i}>
              <line x1={x0 + colW} y1={y1(Math.floor(i / 2))} x2={x0 + 2 * colW} y2={y2(i)} stroke={MANIM.orange} strokeWidth={2.5} />
              <circle cx={x0 + 2 * colW} cy={y2(i)} r={16} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
              <Txt x={x0 + 2 * colW} y={y2(i) + 8} size={22} color={MANIM.orange}>{p[1]!}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          {perms.map((p, i) => (
            <g key={i}>
              <line x1={x0 + 2 * colW} y1={y2(i)} x2={x0 + 3 * colW} y2={y2(i)} stroke={MANIM.green} strokeWidth={2.5} />
              <circle cx={x0 + 3 * colW} cy={y2(i)} r={16} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} />
              <Txt x={x0 + 3 * colW} y={y2(i) + 8} size={22} color={MANIM.green}>{p[2]!}</Txt>
              <Txt x={x0 + 3 * colW + 50} y={y2(i) + 8} size={24} color={MANIM.ink} anchor="start">{p.join("")}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 3} dx={20}>
          <Txt x={x0 + 3 * colW + 130} y={190} size={34} color={MANIM.yellow} anchor="start">3 · 2 · 1</Txt>
          <Txt x={x0 + 3 * colW + 130} y={250} size={48} color={MANIM.green} anchor="start">= 6</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Cuatro amigos juegan todos contra todos: 4 · 3 = 12 parejas ordenadas, cada partido contado dos veces. */
export function buildCombinacionesDividir(): AnimBuild {
  const names = ["A", "B", "C", "D"];
  const pairs: [string, string][] = [];
  names.forEach((x) => names.forEach((y) => x !== y && pairs.push([x, y])));
  // Parejas con el mismo conjunto reciben el mismo color.
  const unique = names.flatMap((x, i) => names.slice(i + 1).map((y) => `${x}${y}`));
  const colorOf = (p: [string, string]) => {
    const key = [...p].sort().join("");
    return [MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple, MANIM.red, MANIM.yellow][unique.indexOf(key)]!;
  };
  const cols = 4;
  const cellW = 150;
  const cellH = 70;
  const x0 = 100;
  const y0 = 80;
  // Segunda disposición: las dos formas de un mismo partido, una junto a otra.
  const grouped: [string, string][] = unique.flatMap((u) => [[u[0]!, u[1]!] as [string, string], [u[1]!, u[0]!] as [string, string]]);
  const pos = (i: number, beat: number) => {
    const idx = beat >= 2 ? grouped.findIndex((q) => q[0] === pairs[i]![0] && q[1] === pairs[i]![1]) : i;
    return { x: x0 + (idx % cols) * cellW, y: y0 + Math.floor(idx / cols) * cellH };
  };
  return {
    label: "Cuatro amigos, todos contra todos: 12 parejas ordenadas, 6 partidos",
    captions: [
      "Si importara el orden (quién es el primero), habría $4 \\cdot 3 = 12$ parejas: AB, BA, AC, CA…",
      "Pero el partido AB y el BA son **el mismo partido**: cada partido está contado dos veces. Se colorean los que coinciden.",
      "Se agrupan por parejas: cada partido aparece **dos veces**.",
      "El número de partidos es $\\dfrac{4 \\cdot 3}{2} = 6$. Estrategia: se cuenta como si importara el orden y se divide entre las veces que se repite cada caso.",
    ],
    beatMs: 4000,
    render: (beat) => (
      <Canvas>
        {pairs.map((p, i) => {
          const { x, y } = pos(i, beat);
          const color = beat >= 1 ? colorOf(p) : MANIM.ink;
          return (
            <g key={i} className="anim-t" style={{ transform: `translate(${x}px, ${y}px)` }}>
              <rect x={-4} y={-34} width={100} height={52} rx={10} fill={MANIM.panel} stroke={color} strokeWidth={3} />
              <Txt x={46} y={4} size={32} color={color}>{p.join("")}</Txt>
            </g>
          );
        })}
        <Fade show={beat >= 3} dx={20}>
          <Txt x={400} y={400} size={36} color={MANIM.yellow}>{"4 · 3 / 2 = 6 partidos"}</Txt>
        </Fade>
        <Fade show={beat < 3}>
          <Txt x={400} y={400} size={30} color={MANIM.muted}>{beat >= 2 ? "cada partido, dos veces" : "12 parejas ordenadas"}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
