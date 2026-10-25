import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Movimiento lineal, circular y alternativo ───────────── */

export function buildMovimientosTipos(): AnimBuild {
  const paneles = [
    { x: 135, t: "Lineal", c: MANIM.blue, e: "cinta transportadora" },
    { x: 400, t: "Circular", c: MANIM.orange, e: "rueda" },
    { x: 665, t: "Alternativo", c: MANIM.green, e: "sierra de calar" },
  ];
  return {
    label: "Tres movimientos básicos: lineal, circular y alternativo",
    beatMs: 5400,
    captions: [
      "Un **mecanismo** produce, transmite o transforma un movimiento. Los tres movimientos básicos se distinguen por su **trayectoria**.",
      "**Lineal**: el objeto se desplaza **siguiendo una línea recta**. Ejemplo: una cinta transportadora.",
      "**Circular**: el objeto **gira** alrededor de un eje y cada punto describe una circunferencia. Ejemplo: una rueda.",
      "**Alternativo**: el objeto **va y vuelve** por la misma recta, repitiendo el ciclo. Ejemplo: la sierra de calar o el émbolo de una bomba.",
    ],
    render: (beat) => (
      <Canvas>
        {paneles.map((p, i) => (
          <g key={p.t} className="anim-t" opacity={beat === 0 || beat === i + 1 ? 1 : 0.3}>
            <rect x={p.x - 120} y={60} width={240} height={290} rx={12} fill={MANIM.panel} stroke={p.c} strokeWidth={beat === i + 1 ? 4 : 2} />
            <Txt x={p.x} y={100} size={24} color={p.c}>
              {p.t}
            </Txt>
            <Txt x={p.x} y={330} size={17} color={MANIM.muted}>
              {p.e}
            </Txt>
          </g>
        ))}
        <g opacity={beat === 0 || beat === 1 ? 1 : 0.3} className="anim-t">
          <line x1={50} y1={210} x2={220} y2={210} stroke={MANIM.blue} strokeWidth={3} strokeDasharray="8 6" />
          <Arrow x1={190} y1={210} x2={225} y2={210} color={MANIM.blue} width={4} />
          <rect x={beat === 1 ? 140 : 60} y={178} width={50} height={32} rx={5} fill={MANIM.blue} fillOpacity={0.4} stroke={MANIM.blue} strokeWidth={4} className="anim-t" />
        </g>
        <g opacity={beat === 0 || beat === 2 ? 1 : 0.3} className="anim-t">
          <circle cx={400} cy={210} r={64} fill="none" stroke={MANIM.orange} strokeWidth={3} strokeDasharray="8 6" />
          <circle cx={400} cy={210} r={5} fill={MANIM.yellow} />
          <circle cx={beat === 2 ? 400 : 464} cy={beat === 2 ? 146 : 210} r={14} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={4} className="anim-t" />
          <path d="M 440 150 A 64 64 0 0 1 466 190" fill="none" stroke={MANIM.orange} strokeWidth={4} />
          <polygon points="466,190 454,186 468,178" fill={MANIM.orange} />
        </g>
        <g opacity={beat === 0 || beat === 3 ? 1 : 0.3} className="anim-t">
          <line x1={580} y1={210} x2={750} y2={210} stroke={MANIM.green} strokeWidth={3} strokeDasharray="8 6" />
          <Arrow x1={645} y1={250} x2={600} y2={250} color={MANIM.green} width={4} />
          <Arrow x1={685} y1={250} x2={730} y2={250} color={MANIM.green} width={4} />
          <rect x={beat === 3 ? 690 : 600} y={178} width={50} height={32} rx={5} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={4} className="anim-t" />
        </g>
      </Canvas>
    ),
  };
}

/* ───────────── Ley de la palanca con números ───────────── */

export function buildPalancaLey(): AnimBuild {
  const fx = 400;
  const fy = 270;
  const k = 90; // px por metro
  return {
    label: "Ley de la palanca: fuerza por su brazo igual a resistencia por su brazo",
    beatMs: 5600,
    captions: [
      "Una **palanca** es una barra rígida que gira alrededor de un punto de apoyo. Tiene una **resistencia** (la carga), una **fuerza** (el esfuerzo) y dos **brazos**.",
      "La **resistencia** $R = 60\\text{ N}$ está a **1 m** del apoyo: brazo de la resistencia $d_R = 1\\text{ m}$.",
      "Para equilibrarla, la **fuerza** $F$ se aplica a **3 m** del apoyo: brazo de la fuerza $d_F = 3\\text{ m}$.",
      "**Ley de la palanca**: $F \\cdot d_F = R \\cdot d_R$. Entonces $F \\cdot 3 = 60 \\cdot 1$ y $F = 20\\text{ N}$: un brazo tres veces mayor necesita **tres veces menos fuerza**.",
      "Si la fuerza se aplica **cerca del apoyo** ($d_F = 1\\text{ m}$), necesitaría $F = 60\\text{ N}$: toda la fuerza, sin ayuda de la palanca.",
    ],
    render: (beat) => {
      const dF = beat === 4 ? 1 : 3;
      const F = beat === 4 ? 60 : 20;
      return (
        <Canvas>
          <polygon points={`${fx - 30},${fy + 70} ${fx + 30},${fy + 70} ${fx},${fy + 8}`} fill={MANIM.yellow} fillOpacity={0.4} stroke={MANIM.yellow} strokeWidth={3} />
          <line x1={80} y1={fy + 70} x2={720} y2={fy + 70} stroke={MANIM.grid} strokeWidth={4} />
          <rect x={fx - 3.3 * k} y={fy - 8} width={6.6 * k} height={16} rx={4} fill={MANIM.muted} fillOpacity={0.5} stroke={MANIM.muted} strokeWidth={3} />
          <Fade show={beat >= 1}>
            <rect x={fx - k - 28} y={fy - 8 - 66} width={56} height={66} rx={5} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={4} />
            <Txt x={fx - k} y={fy - 36} size={20} color={MANIM.ink}>
              R = 60 N
            </Txt>
            <line x1={fx - k} y1={fy + 95} x2={fx} y2={fy + 95} stroke={MANIM.orange} strokeWidth={3} />
            <Txt x={fx - k / 2} y={fy + 120} size={18} color={MANIM.orange}>
              d_R = 1 m
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Arrow x1={fx + dF * k} y1={fy - 100} x2={fx + dF * k} y2={fy - 10} color={MANIM.blue} width={6} />
            <Txt x={fx + dF * k + (beat === 4 ? 56 : 0)} y={fy - 112} size={22} color={MANIM.blue}>
              {beat >= 3 ? `F = ${F} N` : "F = ?"}
            </Txt>
            <line x1={fx} y1={fy + 95} x2={fx + dF * k} y2={fy + 95} stroke={MANIM.blue} strokeWidth={3} />
            <Txt x={fx + (dF * k) / 2} y={fy + 120} size={18} color={MANIM.blue}>
              d_F = {dF} m
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={400} y={50} size={26} color={MANIM.yellow}>
              F · d_F = R · d_R
            </Txt>
            <Txt x={400} y={85} size={22} color={MANIM.muted}>
              {F} · {dF} = 60 · 1
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Polea fija y polea móvil ───────────── */

export function buildPoleaFijaMovil(): AnimBuild {
  return {
    label: "Polea fija frente a polea móvil: dirección y fuerza",
    beatMs: 5600,
    captions: [
      "Subir directamente una carga de **60 N** exige una fuerza de **60 N** hacia arriba.",
      "Con una **polea fija** la fuerza sigue siendo **60 N**, pero ahora se tira **hacia abajo**: es más cómodo y usas tu propio peso. Solo **cambia la dirección**.",
      "En una **polea móvil** la carga cuelga de la polea y la cuerda tiene un extremo fijo. **Dos tramos** de cuerda sostienen la carga: cada uno soporta 30 N. La fuerza **se reduce a la mitad**.",
      "Pero hay un precio: para subir la carga **1 m**, hay que recoger **2 m** de cuerda. Lo que se gana en fuerza se pierde en recorrido.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={0} y={20} width={800} height={14} fill={MANIM.muted} fillOpacity={0.5} />
        {beat === 0 ? (
          <g>
            <line x1={400} y1={34} x2={400} y2={210} stroke={MANIM.ink} strokeWidth={4} />
            <rect x={360} y={210} width={80} height={80} rx={6} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={4} />
            <Txt x={400} y={260} size={20} color={MANIM.ink}>
              60 N
            </Txt>
            <Arrow x1={520} y1={290} x2={520} y2={190} color={MANIM.blue} width={6} />
            <Txt x={590} y={235} size={22} color={MANIM.blue}>
              F = 60 N
            </Txt>
          </g>
        ) : null}
        {beat === 1 ? (
          <g>
            <circle cx={400} cy={90} r={34} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={5} />
            <circle cx={400} cy={90} r={5} fill={MANIM.yellow} />
            <line x1={366} y1={90} x2={366} y2={240} stroke={MANIM.ink} strokeWidth={4} />
            <line x1={434} y1={90} x2={434} y2={320} stroke={MANIM.ink} strokeWidth={4} />
            <rect x={326} y={240} width={80} height={80} rx={6} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={4} />
            <Txt x={366} y={290} size={20} color={MANIM.ink}>
              60 N
            </Txt>
            <Arrow x1={434} y1={330} x2={434} y2={390} color={MANIM.blue} width={6} />
            <Txt x={600} y={370} size={22} color={MANIM.blue}>
              F = 60 N (hacia abajo)
            </Txt>
          </g>
        ) : null}
        {beat >= 2 ? (
          <g>
            <line x1={366} y1={34} x2={366} y2={230} stroke={MANIM.ink} strokeWidth={4} />
            <circle cx={400} cy={230} r={34} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={5} className="anim-t" />
            <circle cx={400} cy={230} r={5} fill={MANIM.yellow} />
            <path d="M 366 230 A 34 34 0 0 0 434 230" fill="none" stroke={MANIM.ink} strokeWidth={4} />
            <line x1={434} y1={230} x2={434} y2={34} stroke={MANIM.ink} strokeWidth={4} />
            <line x1={400} y1={264} x2={400} y2={300} stroke={MANIM.ink} strokeWidth={4} />
            <rect x={360} y={300} width={80} height={70} rx={6} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={4} />
            <Txt x={400} y={344} size={20} color={MANIM.ink}>
              60 N
            </Txt>
            <Arrow x1={434} y1={70} x2={434} y2={20} color={MANIM.blue} width={6} />
            <Txt x={560} y={60} size={22} color={MANIM.blue}>
              F = 30 N
            </Txt>
          </g>
        ) : null}
        <Fade show={beat === 3}>
          <Txt x={640} y={190} size={20} color={MANIM.yellow}>
            sube 1 m
          </Txt>
          <Txt x={640} y={220} size={20} color={MANIM.yellow}>
            tiras 2 m de cuerda
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
