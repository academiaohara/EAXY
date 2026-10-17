import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const U = 26; // lado de una unidad en el lienzo
const GAP = 4;

function Unit({ x, y, color = MANIM.blue }: { x: number; y: number; color?: string }) {
  return <rect x={x} y={y} width={U} height={U} rx={4} fill={color} fillOpacity={0.85} stroke={MANIM.surface} strokeWidth={1.5} />;
}

/** Fila de 10 unidades, o la barra en que se convierten al agruparlas. */
function Row({ x, y, color, merged }: { x: number; y: number; color: string; merged: boolean }) {
  const w = 10 * U + 9 * GAP;
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => (
        <Fade key={i} show={!merged} dx={(4.5 - i) * 10} delay={i * 30}>
          <Unit x={x + i * (U + GAP)} y={y} color={color} />
        </Fade>
      ))}
      <Fade show={merged} scale={0.9}>
        <rect x={x} y={y} width={w} height={U} rx={6} fill={color} fillOpacity={0.9} stroke={MANIM.surface} strokeWidth={1.5} />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={x + (i + 1) * (U + GAP) - GAP / 2} y1={y + 3} x2={x + (i + 1) * (U + GAP) - GAP / 2} y2={y + U - 3} stroke={MANIM.surface} strokeOpacity={0.5} />
        ))}
      </Fade>
    </g>
  );
}

function Card({ x, title, value, children, show, color }: { x: number; title: string; value: string; children: React.ReactNode; show: boolean; color: string }) {
  return (
    <Fade show={show} dy={14}>
      <rect x={x} y={120} width={140} height={200} rx={14} fill="rgba(255,255,255,0.04)" stroke={color} strokeWidth={2} />
      <Txt x={x + 70} y={150} size={20} color={color}>
        {title}
      </Txt>
      {children}
      <Txt x={x + 70} y={300} size={26} color={MANIM.ink}>
        {value}
      </Txt>
    </Fade>
  );
}

/** Diez de un orden = una unidad del orden siguiente: el «canje» que sostiene el sistema decimal. */
export function buildDecimalCanje(): AnimBuild {
  const rowX = 270;
  return {
    label: "Diez unidades forman una decena, diez decenas una centena, diez centenas un millar",
    captions: [
      "Contamos **unidades**. Aquí hay 10.",
      "**Diez unidades = una decena.** Se agrupan en una sola pieza.",
      "Diez decenas…",
      "…forman **una centena**. Otra vez: el mismo canje, a mayor escala.",
      "En cada orden, **diez de uno = uno del siguiente**. Por eso el sistema es de **base 10**.",
    ],
    render: (beat) => (
      <Canvas>
        {/* Escenas 0-1: unidades -> decena */}
        <Fade show={beat <= 1} dy={-10}>
          <Txt x={400} y={70} size={28} color={MANIM.blue}>
            {beat === 0 ? "10 unidades" : "1 decena"}
          </Txt>
          <Row x={rowX - 40} y={180} color={MANIM.blue} merged={beat >= 1} />
          <Txt x={400} y={270} size={30} color={MANIM.yellow}>
            {beat === 0 ? "10 · 1 = 10" : "= 10 unidades"}
          </Txt>
        </Fade>

        {/* Escenas 2-3: decenas -> centena */}
        <Fade show={beat === 2 || beat === 3} dy={-10}>
          <Txt x={400} y={52} size={28} color={MANIM.green}>
            {beat === 2 ? "10 decenas" : "1 centena"}
          </Txt>
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <Fade show={beat === 2} dy={-(i - 4.5) * 6} delay={i * 30}>
                <rect
                  x={rowX - 40}
                  y={80 + i * (U + 2)}
                  width={10 * U + 9 * GAP}
                  height={U}
                  rx={6}
                  fill={MANIM.green}
                  fillOpacity={0.85}
                  stroke={MANIM.surface}
                  strokeWidth={1.5}
                />
              </Fade>
            </g>
          ))}
          <Fade show={beat === 3} scale={0.85}>
            <rect x={rowX - 40} y={80} width={10 * U + 9 * GAP} height={10 * (U + 2) - 2} rx={10} fill={MANIM.green} fillOpacity={0.9} stroke={MANIM.surface} strokeWidth={1.5} />
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={i}>
                <line x1={rowX - 40 + (i + 1) * (U + GAP) - GAP / 2} y1={84} x2={rowX - 40 + (i + 1) * (U + GAP) - GAP / 2} y2={80 + 10 * (U + 2) - 6} stroke={MANIM.surface} strokeOpacity={0.35} />
                <line y1={80 + (i + 1) * (U + 2) - 1} x1={rowX - 36} y2={80 + (i + 1) * (U + 2) - 1} x2={rowX - 44 + 10 * U + 9 * GAP} stroke={MANIM.surface} strokeOpacity={0.35} />
              </g>
            ))}
          </Fade>
          <Txt x={rowX - 40 + (10 * U + 9 * GAP) + 60} y={225} size={26} color={MANIM.yellow} anchor="start">
            {beat === 2 ? "10 · 10 = 100" : "= 100 unidades"}
          </Txt>
        </Fade>

        {/* Escena 4: la escalera de órdenes */}
        <Card x={30} title="unidad" value="1" show={beat === 4} color={MANIM.blue}>
          <Unit x={87} y={200} color={MANIM.blue} />
        </Card>
        <Card x={230} title="decena" value="10" show={beat === 4} color={MANIM.green}>
          <rect x={250} y={205} width={100} height={18} rx={4} fill={MANIM.green} fillOpacity={0.9} />
        </Card>
        <Card x={430} title="centena" value="100" show={beat === 4} color={MANIM.orange}>
          <rect x={470} y={175} width={60} height={60} rx={6} fill={MANIM.orange} fillOpacity={0.9} />
        </Card>
        <Card x={630} title="millar" value="1 000" show={beat === 4} color={MANIM.purple}>
          <rect x={662} y={200} width={50} height={42} rx={4} fill={MANIM.purple} fillOpacity={0.5} />
          <rect x={656} y={192} width={50} height={42} rx={4} fill={MANIM.purple} fillOpacity={0.7} />
          <rect x={650} y={184} width={50} height={42} rx={4} fill={MANIM.purple} fillOpacity={0.95} />
        </Card>
        {[200, 400, 600].map((x) => (
          <Fade key={x} show={beat === 4} dx={-10} delay={300}>
            <Txt x={x} y={228} size={26} color={MANIM.yellow}>
              ×10
            </Txt>
            <path d={`M ${x - 22} 242 L ${x + 22} 242`} stroke={MANIM.yellow} strokeWidth={3} strokeLinecap="round" />
          </Fade>
        ))}
        <Fade show={beat === 4} dy={8} delay={400}>
          <Txt x={400} y={90} size={26} color={MANIM.ink}>
            10 de un orden = 1 del siguiente
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
