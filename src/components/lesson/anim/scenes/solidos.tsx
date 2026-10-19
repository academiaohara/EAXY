import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

export type SolidKind = "prism" | "pyramid";
export type SolidHighlight = "none" | "base" | "lateral" | "edges" | "vertices";

const RAD = Math.PI / 180;
const poly = (p: readonly Pt[]) => p.map((q) => q.join(",")).join(" ");

/** Cuerpo con base de `n` lados visto desde arriba (prisma o pirámide), con las aristas ocultas punteadas. */
export function Solid3D({
  kind,
  n,
  c = [220, 300],
  r = 130,
  h = 190,
  tilt = 0.32,
  highlight = "none",
}: {
  kind: SolidKind;
  n: number;
  c?: Pt;
  r?: number;
  h?: number;
  tilt?: number;
  highlight?: SolidHighlight;
}) {
  const rot = 90 + 180 / n;
  const ang = (i: number) => (rot + (360 / n) * i) * RAD;
  const base: Pt[] = Array.from({ length: n }, (_, i) => [c[0] + r * Math.cos(ang(i)), c[1] + r * tilt * Math.sin(ang(i))]);
  const front = (i: number) => Math.sin(ang(i)) > 1e-6;
  const sideFront = (i: number) => Math.sin((ang(i) + ang(i + 1)) / 2) > 1e-6 && Math.sin(ang(i) + 0.001) > -2;
  const top: Pt[] = kind === "prism" ? base.map((p) => [p[0], p[1] - h] as Pt) : [];
  const apex: Pt = [c[0], c[1] - h];
  const upper = (i: number): Pt => (kind === "prism" ? top[i]! : apex);
  const edgeColor = highlight === "edges" ? MANIM.green : MANIM.ink;
  const edgeW = highlight === "edges" ? 4.5 : 3.5;
  const hid = highlight === "edges" ? MANIM.green : MANIM.muted;

  const lines: { a: Pt; b: Pt; hidden: boolean }[] = [];
  for (let i = 0; i < n; i += 1) {
    const j = (i + 1) % n;
    lines.push({ a: base[i]!, b: base[j]!, hidden: !sideFront(i) });
    if (kind === "prism") {
      lines.push({ a: top[i]!, b: top[j]!, hidden: false });
    }
    lines.push({ a: base[i]!, b: upper(i), hidden: !front(i) });
  }
  const dots: { p: Pt; hidden: boolean }[] = [
    ...base.map((p, i) => ({ p, hidden: !front(i) })),
    ...(kind === "prism" ? top.map((p) => ({ p, hidden: false })) : [{ p: apex, hidden: false }]),
  ];

  return (
    <g>
      {highlight === "base" ? (
        <>
          <polygon points={poly(base)} fill={MANIM.blue} fillOpacity={0.35} />
          {kind === "prism" ? <polygon points={poly(top)} fill={MANIM.blue} fillOpacity={0.35} /> : null}
        </>
      ) : null}
      {Array.from({ length: n }, (_, i) => {
        if (!sideFront(i)) {
          return null;
        }
        const j = (i + 1) % n;
        const pts = kind === "prism" ? [base[i]!, base[j]!, top[j]!, top[i]!] : [base[i]!, base[j]!, apex];
        return <polygon key={i} points={poly(pts)} fill={highlight === "lateral" ? MANIM.orange : MANIM.blue} fillOpacity={highlight === "lateral" ? 0.4 : 0.1} />;
      })}
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.a[0]}
          y1={l.a[1]}
          x2={l.b[0]}
          y2={l.b[1]}
          stroke={l.hidden ? hid : edgeColor}
          strokeWidth={l.hidden ? 2 : edgeW}
          strokeDasharray={l.hidden ? "7 6" : undefined}
          strokeLinecap="round"
        />
      ))}
      {highlight === "vertices" || kind === "pyramid"
        ? dots.map((d, i) => (
            <g key={i} opacity={highlight === "vertices" || (kind === "pyramid" && i === dots.length - 1) ? 1 : 0}>
              <Dot p={d.p} color={kind === "pyramid" && i === dots.length - 1 ? MANIM.yellow : MANIM.purple} r={d.hidden ? 5 : 7} />
            </g>
          ))
        : null}
    </g>
  );
}

/* ───────────── Cubo y sus elementos ───────────── */

const F: Pt[] = [[90, 150], [270, 150], [270, 330], [90, 330]];
const D: Pt = [80, -70];
const B: Pt[] = F.map((p) => [p[0] + D[0], p[1] + D[1]] as Pt);

function Cube({ face, edges, verts }: { face: boolean; edges: boolean; verts: boolean }) {
  const lines: [Pt, Pt, boolean][] = [
    ...F.map((p, i): [Pt, Pt, boolean] => [p, F[(i + 1) % 4]!, false]),
    [B[0]!, B[1]!, false],
    [B[1]!, B[2]!, false],
    [B[2]!, B[3]!, true],
    [B[3]!, B[0]!, true],
    ...F.map((p, i): [Pt, Pt, boolean] => [p, B[i]!, i === 3]),
  ];
  const all = [...F, ...B];
  return (
    <g>
      <polygon points={poly(F)} fill={MANIM.blue} fillOpacity={face ? 0.38 : 0.1} className="anim-t" />
      <polygon points={poly([F[0]!, F[1]!, B[1]!, B[0]!])} fill={MANIM.green} fillOpacity={face ? 0.38 : 0.1} className="anim-t" />
      <polygon points={poly([F[1]!, B[1]!, B[2]!, F[2]!])} fill={MANIM.orange} fillOpacity={face ? 0.38 : 0.1} className="anim-t" />
      {lines.map(([a, b, hidden], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={edges ? MANIM.green : hidden ? MANIM.muted : MANIM.ink} strokeWidth={hidden ? 2 : edges ? 5 : 3.5} strokeDasharray={hidden ? "7 6" : undefined} strokeLinecap="round" className="anim-t" />
      ))}
      <Fade show={verts}>
        {all.map((p, i) => (
          <Dot key={i} p={p} color={MANIM.purple} r={7} />
        ))}
      </Fade>
    </g>
  );
}

const SQ = 70;
const NET_X = 480;
const NET_Y = 140;
const NET: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];

export function buildPoliedroElementos(): AnimBuild {
  return {
    label: "Elementos de un poliedro sobre un cubo: 6 caras, 12 aristas, 8 vértices, y su desarrollo plano",
    captions: [
      "Un **poliedro** es un cuerpo limitado por polígonos. Tomamos un cubo como ejemplo.",
      "Las **caras** son los polígonos que lo limitan: el cubo tiene $6$ cuadrados.",
      "Las **aristas** son los lados comunes a dos caras: $12$. Las ocultas se dibujan punteadas.",
      "Los **vértices** son los puntos donde se unen tres o más caras: $8$.",
      "Si lo **desplegamos** sobre un plano obtenemos su **desarrollo**: seis cuadrados unidos, útiles para construirlo con cartón.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 3}>
          <Cube face={beat === 1} edges={beat === 2} verts={beat === 3} />
        </Fade>
        <Fade show={beat === 1} dy={6}>
          <Txt x={560} y={180} size={34} color={MANIM.blue} anchor="start">Caras</Txt>
          <Txt x={560} y={226} size={30} color={MANIM.ink} anchor="start">6 cuadrados</Txt>
        </Fade>
        <Fade show={beat === 2} dy={6}>
          <Txt x={560} y={180} size={34} color={MANIM.green} anchor="start">Aristas</Txt>
          <Txt x={560} y={226} size={30} color={MANIM.ink} anchor="start">12 segmentos</Txt>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <Txt x={560} y={180} size={34} color={MANIM.purple} anchor="start">Vértices</Txt>
          <Txt x={560} y={226} size={30} color={MANIM.ink} anchor="start">8 esquinas</Txt>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          {NET.map(([i, j], k) => (
            <rect key={k} x={NET_X - 40 + i * SQ} y={NET_Y + j * SQ} width={SQ} height={SQ} fill={[MANIM.blue, MANIM.green, MANIM.orange, MANIM.red, MANIM.purple, MANIM.yellow][k]} fillOpacity={0.4} stroke={MANIM.ink} strokeWidth={3} />
          ))}
          <Txt x={NET_X + 70} y={NET_Y - 24} size={30} color={MANIM.yellow}>Desarrollo del cubo</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Los cinco poliedros regulares ───────────── */

const PLATONICOS = [
  { name: "Tetraedro", sides: 3, color: MANIM.blue, c: 4, v: 4, a: 6, face: "triángulos" },
  { name: "Hexaedro (cubo)", sides: 4, color: MANIM.green, c: 6, v: 8, a: 12, face: "cuadrados" },
  { name: "Octaedro", sides: 3, color: MANIM.purple, c: 8, v: 6, a: 12, face: "triángulos" },
  { name: "Dodecaedro", sides: 5, color: MANIM.orange, c: 12, v: 20, a: 30, face: "pentágonos" },
  { name: "Icosaedro", sides: 3, color: MANIM.red, c: 20, v: 12, a: 30, face: "triángulos" },
] as const;

function FaceIcon({ sides, cx, cy, color }: { sides: number; cx: number; cy: number; color: string }) {
  const pts: Pt[] = Array.from({ length: sides }, (_, i) => {
    const a = (90 + (360 / sides) * i) * RAD;
    return [cx + 17 * Math.cos(a), cy - 17 * Math.sin(a)] as Pt;
  });
  return <polygon points={poly(pts)} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={3} strokeLinejoin="round" />;
}

export function buildPoliedrosRegulares(): AnimBuild {
  return {
    label: "Tabla de los cinco poliedros regulares con la forma de sus caras y su número de caras, vértices y aristas, y la comprobación de la fórmula de Euler",
    captions: [
      "Un poliedro es **regular** si todas sus caras son el mismo polígono regular y en cada vértice se juntan el mismo número de caras.",
      "El **tetraedro**: $4$ caras que son triángulos equiláteros.",
      "El **hexaedro**, o cubo: $6$ caras cuadradas.",
      "El **octaedro**: $8$ triángulos equiláteros.",
      "El **dodecaedro**: $12$ pentágonos regulares.",
      "El **icosaedro**: $20$ triángulos equiláteros. Solo existen estos **cinco**, los sólidos platónicos.",
      "En todos se cumple la fórmula de Euler: $C + V = A + 2$.",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={300} y={46} size={22} color={MANIM.muted} anchor="end">caras</Txt>
        <Txt x={400} y={46} size={22} color={MANIM.muted} anchor="end">vértices</Txt>
        <Txt x={500} y={46} size={22} color={MANIM.muted} anchor="end">aristas</Txt>
        <Fade show={beat === 6}>
          <Txt x={780} y={46} size={22} color={MANIM.yellow} anchor="end">C + V = A + 2</Txt>
        </Fade>
        {PLATONICOS.map((p, i) => {
          const y = 100 + i * 66;
          return (
            <Fade key={p.name} show={beat >= i + 1 || beat === 0 ? beat >= i + 1 : false} dx={-10}>
              <FaceIcon sides={p.sides} cx={36} cy={y} color={p.color} />
              <Txt x={68} y={y + 8} size={24} color={p.color} anchor="start">{p.name}</Txt>
              <Txt x={300} y={y + 8} size={26} color={MANIM.ink} anchor="end">{p.c}</Txt>
              <Txt x={400} y={y + 8} size={26} color={MANIM.ink} anchor="end">{p.v}</Txt>
              <Txt x={500} y={y + 8} size={26} color={MANIM.ink} anchor="end">{p.a}</Txt>
              <Fade show={beat < 6}>
                <Txt x={530} y={y + 8} size={20} color={MANIM.muted} anchor="start">{p.face}</Txt>
              </Fade>
              <Fade show={beat === 6}>
                <Txt x={780} y={y + 8} size={24} color={MANIM.yellow} anchor="end">{`${p.c} + ${p.v} = ${p.a} + 2`}</Txt>
              </Fade>
            </Fade>
          );
        })}
        <Fade show={beat === 0}>
          <Txt x={400} y={210} size={32} color={MANIM.ink}>Caras: el mismo polígono regular</Txt>
          <Txt x={400} y={256} size={28} color={MANIM.muted}>y el mismo número de caras en cada vértice</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Prisma y pirámide ───────────── */

const PANEL = 450;

export function buildPrismaElementos(): AnimBuild {
  return {
    label: "Un prisma pentagonal con sus dos bases, sus cinco caras laterales rectangulares y el recuento de caras, vértices y aristas",
    captions: [
      "Un **prisma** es un poliedro con dos polígonos iguales y paralelos, las **bases**, unidos por caras laterales.",
      "Las **bases** dan nombre al prisma: aquí son pentágonos, así que es un prisma **pentagonal**.",
      "Las **caras laterales** son paralelogramos (rectángulos si el prisma es recto): una por cada lado de la base, $n = 5$.",
      "Caras: las $n$ laterales más las $2$ bases, $n + 2 = 7$.",
      "Vértices: $n$ arriba y $n$ abajo, $2n = 10$. Aristas: $n$ arriba, $n$ abajo y $n$ verticales, $3n = 15$.",
    ],
    render: (beat) => {
      const hl: SolidHighlight = beat === 1 ? "base" : beat === 2 ? "lateral" : beat === 3 ? "none" : beat === 4 ? "vertices" : "none";
      return (
        <Canvas>
          <Solid3D kind="prism" n={5} c={[220, 310]} r={130} h={200} highlight={hl} />
          <Fade show={beat === 0} dy={6}>
            <Txt x={PANEL} y={190} size={34} color={MANIM.blue} anchor="start">Prisma</Txt>
            <Txt x={PANEL} y={236} size={22} color={MANIM.ink} anchor="start">2 bases iguales y paralelas</Txt>
          </Fade>
          <Fade show={beat === 1} dy={6}>
            <Txt x={PANEL} y={190} size={34} color={MANIM.blue} anchor="start">2 bases</Txt>
            <Txt x={PANEL} y={236} size={22} color={MANIM.ink} anchor="start">pentágonos: prisma pentagonal</Txt>
          </Fade>
          <Fade show={beat === 2} dy={6}>
            <Txt x={PANEL} y={190} size={34} color={MANIM.orange} anchor="start">5 caras laterales</Txt>
            <Txt x={PANEL} y={236} size={26} color={MANIM.ink} anchor="start">paralelogramos</Txt>
          </Fade>
          <Fade show={beat === 3} dy={6}>
            <Txt x={PANEL} y={190} size={34} color={MANIM.yellow} anchor="start">Caras = n + 2</Txt>
            <Txt x={PANEL} y={236} size={28} color={MANIM.ink} anchor="start">5 + 2 = 7</Txt>
          </Fade>
          <Fade show={beat === 4} dy={6}>
            <Txt x={PANEL} y={170} size={30} color={MANIM.purple} anchor="start">Vértices = 2n = 10</Txt>
            <Txt x={PANEL} y={220} size={30} color={MANIM.green} anchor="start">Aristas = 3n = 15</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

export function buildPiramideElementos(): AnimBuild {
  return {
    label: "Una pirámide pentagonal con su base, sus cinco caras laterales triangulares, su cúspide y el recuento de caras, vértices y aristas",
    captions: [
      "Una **pirámide** es un poliedro con una sola **base** (un polígono) y caras laterales triangulares.",
      "La **base** da nombre a la pirámide: aquí es un pentágono, luego la pirámide es **pentagonal**.",
      "Las **caras laterales** son triángulos, uno por cada lado de la base, y todos se juntan en un punto: la **cúspide**.",
      "Caras: la base más $n$ triángulos, $n + 1 = 6$. Vértices: los $n$ de la base más la cúspide, $n + 1 = 6$.",
      "Aristas: $n$ en la base y $n$ que suben a la cúspide, $2n = 10$. Y se cumple Euler: $6 + 6 = 10 + 2$.",
    ],
    render: (beat) => {
      const hl: SolidHighlight = beat === 1 ? "base" : beat === 2 ? "lateral" : beat === 3 ? "vertices" : beat === 4 ? "edges" : "none";
      return (
        <Canvas>
          <Solid3D kind="pyramid" n={5} c={[220, 320]} r={140} h={250} highlight={hl} />
          <Fade show={beat === 0} dy={6}>
            <Txt x={PANEL} y={190} size={34} color={MANIM.blue} anchor="start">Pirámide</Txt>
            <Txt x={PANEL} y={236} size={22} color={MANIM.ink} anchor="start">1 base y caras triangulares</Txt>
          </Fade>
          <Fade show={beat === 1} dy={6}>
            <Txt x={PANEL} y={190} size={34} color={MANIM.blue} anchor="start">1 base</Txt>
            <Txt x={PANEL} y={236} size={22} color={MANIM.ink} anchor="start">pentágono: pirámide pentagonal</Txt>
          </Fade>
          <Fade show={beat === 2} dy={6}>
            <Txt x={PANEL} y={190} size={34} color={MANIM.orange} anchor="start">5 triángulos</Txt>
            <Txt x={PANEL} y={236} size={22} color={MANIM.yellow} anchor="start">con vértice común: cúspide</Txt>
          </Fade>
          <Fade show={beat === 3} dy={6}>
            <Txt x={PANEL} y={170} size={30} color={MANIM.yellow} anchor="start">Caras = n + 1 = 6</Txt>
            <Txt x={PANEL} y={220} size={30} color={MANIM.purple} anchor="start">Vértices = n + 1 = 6</Txt>
          </Fade>
          <Fade show={beat === 4} dy={6}>
            <Txt x={PANEL} y={170} size={30} color={MANIM.green} anchor="start">Aristas = 2n = 10</Txt>
            <Txt x={PANEL} y={220} size={26} color={MANIM.ink} anchor="start">6 + 6 = 10 + 2</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
