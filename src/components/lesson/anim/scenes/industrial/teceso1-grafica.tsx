import { Canvas, Fade, Move, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

const rad = (d: number) => (d * Math.PI) / 180;

/* ───────────── Paralela con escuadra y cartabón ───────────── */

export function buildTrazoParalelaEscuadra(): AnimBuild {
  return {
    label: "Trazar una paralela por un punto con escuadra y cartabón",
    beatMs: 5600,
    captions: [
      "Queremos la **paralela** a la recta $r$ que pase por el punto $P$.",
      "Se apoya un lado del **cartabón** sobre la recta $r$.",
      "Se coloca la **escuadra** pegada a otro lado del cartabón. La escuadra no se moverá.",
      "Se **desliza el cartabón** a lo largo de la escuadra hasta que su borde toque el punto $P$. Todos los bordes mantienen la misma inclinación.",
      "Se traza la línea por el borde del cartabón: es **paralela** a $r$ y pasa por $P$.",
    ],
    render: (beat) => (
      <Canvas>
        <g transform="rotate(-8 400 250)">
          <line x1={150} y1={300} x2={720} y2={300} stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={735} y={292} size={22} color={MANIM.blue}>
            r
          </Txt>
          <circle cx={350} cy={190} r={7} fill={MANIM.yellow} />
          <Txt x={366} y={176} size={22} color={MANIM.yellow}>
            P
          </Txt>
          <Fade show={beat >= 2}>
            <polygon points="688,309 150,40 167,6 705,275" fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={3} />
            <Txt x={600} y={222} size={20} color={MANIM.orange}>
              escuadra
            </Txt>
          </Fade>
          <Fade show={beat >= 1}>
            <Move x={beat >= 3 ? -220 : 0} y={beat >= 3 ? -110 : 0}>
              <polygon points="450,300 670,300 450,190" fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={3.5} />
              <Txt x={500} y={282} size={19} color={MANIM.green}>
                cartabón
              </Txt>
            </Move>
          </Fade>
          <WriteLine show={beat >= 4} x1={120} y1={190} x2={520} y2={190} color={MANIM.yellow} width={4} />
        </g>
      </Canvas>
    ),
  };
}

/* ───────────── Cómo se acota una pieza ───────────── */

export function buildAcotarPiezaPasos(): AnimBuild {
  const x0 = 200;
  const y0 = 90;
  const w = 400;
  const h = 200;
  return {
    label: "Acotar una pieza: líneas auxiliares, línea de cota, flechas y cifra",
    beatMs: 5400,
    captions: [
      "Una pieza se dibuja primero con **trazo continuo grueso** y el agujero con su **eje de simetría** (línea de trazo y punto).",
      "Se trazan **líneas auxiliares** finas que salen de los extremos de la medida, sin tocar el contorno.",
      "Entre ellas se dibuja la **línea de cota**, fina, con una flecha en cada extremo.",
      "Sobre la línea de cota se escribe la **cifra**, en milímetros y sin poner la unidad.",
      "El agujero se acota con su **diámetro** (Ø) y la distancia de su centro al borde.",
      "Cada medida se escribe **una sola vez**. El largo total no se repite si ya se puede obtener sumando.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={x0} y={y0} width={w} height={h} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.ink} strokeWidth={4} />
        <circle cx={x0 + 130} cy={y0 + h / 2} r={38} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={4} />
        <line x1={x0 + 130 - 62} y1={y0 + h / 2} x2={x0 + 130 + 62} y2={y0 + h / 2} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="14 5 3 5" />
        <line x1={x0 + 130} y1={y0 + h / 2 - 62} x2={x0 + 130} y2={y0 + h / 2 + 62} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="14 5 3 5" />
        <Fade show={beat >= 1}>
          <line x1={x0} y1={y0 + h + 6} x2={x0} y2={y0 + h + 52} stroke={MANIM.muted} strokeWidth={1.8} />
          <line x1={x0 + w} y1={y0 + h + 6} x2={x0 + w} y2={y0 + h + 52} stroke={MANIM.muted} strokeWidth={1.8} />
          <line x1={x0 + w + 6} y1={y0} x2={x0 + w + 52} y2={y0} stroke={MANIM.muted} strokeWidth={1.8} />
          <line x1={x0 + w + 6} y1={y0 + h} x2={x0 + w + 52} y2={y0 + h} stroke={MANIM.muted} strokeWidth={1.8} />
        </Fade>
        <Fade show={beat >= 2}>
          <Arrow x1={x0 + w / 2} y1={y0 + h + 40} x2={x0} y2={y0 + h + 40} color={MANIM.yellow} width={2.5} head={11} />
          <Arrow x1={x0 + w / 2} y1={y0 + h + 40} x2={x0 + w} y2={y0 + h + 40} color={MANIM.yellow} width={2.5} head={11} />
          <Arrow x1={x0 + w + 40} y1={y0 + h / 2} x2={x0 + w + 40} y2={y0} color={MANIM.yellow} width={2.5} head={11} />
          <Arrow x1={x0 + w + 40} y1={y0 + h / 2} x2={x0 + w + 40} y2={y0 + h} color={MANIM.yellow} width={2.5} head={11} />
        </Fade>
        <Fade show={beat >= 3}>
          <rect x={x0 + w / 2 - 28} y={y0 + h + 22} width={56} height={26} fill={MANIM.surface} />
          <Txt x={x0 + w / 2} y={y0 + h + 42} size={24} color={MANIM.yellow}>
            100
          </Txt>
          <rect x={x0 + w + 28} y={y0 + h / 2 - 14} width={26} height={30} fill={MANIM.surface} />
          <Txt x={x0 + w + 41} y={y0 + h / 2 + 8} size={24} color={MANIM.yellow}>
            50
          </Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <line x1={x0} y1={y0 - 8} x2={x0} y2={y0 - 44} stroke={MANIM.muted} strokeWidth={1.8} />
          <line x1={x0 + 130} y1={y0 - 8} x2={x0 + 130} y2={y0 - 44} stroke={MANIM.muted} strokeWidth={1.8} />
          <Arrow x1={x0 + 65} y1={y0 - 34} x2={x0} y2={y0 - 34} color={MANIM.green} width={2.5} head={10} />
          <Arrow x1={x0 + 65} y1={y0 - 34} x2={x0 + 130} y2={y0 - 34} color={MANIM.green} width={2.5} head={10} />
          <rect x={x0 + 50} y={y0 - 52} width={32} height={24} fill={MANIM.surface} />
          <Txt x={x0 + 65} y={y0 - 33} size={22} color={MANIM.green}>
            30
          </Txt>
          <Txt x={x0 + 130 + 70} y={y0 + h / 2 - 50} size={24} color={MANIM.green}>
            Ø 24
          </Txt>
          <Arrow x1={x0 + 130 + 48} y1={y0 + h / 2 - 44} x2={x0 + 130 + 28} y2={y0 + h / 2 - 28} color={MANIM.green} width={2} head={9} />
        </Fade>
        <Fade show={beat >= 5}>
          <Txt x={400} y={400} size={20} color={MANIM.red}>
            ✗ No repetir: una medida, una cota
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Vistas de una pieza: alzado, planta y perfil ───────────── */

const PIEZA_L = [2, 2, 2, 1, 0, 0, 1, 0, 0];

function cuboVistas(h: number[]) {
  const alzado = new Set<string>();
  const planta = new Set<string>();
  const perfil = new Set<string>();
  for (let y = 0; y < 3; y += 1) {
    for (let x = 0; x < 3; x += 1) {
      const n = h[y * 3 + x] ?? 0;
      if (n > 0) planta.add(`${x},${y}`);
      for (let z = 0; z < n; z += 1) {
        alzado.add(`${x},${z}`);
        perfil.add(`${2 - y},${z}`);
      }
    }
  }
  return { alzado, planta, perfil };
}

function Vista({ cells, x, y, c, color, label }: { cells: Set<string>; x: number; y: number; c: number; color: string; label: string }) {
  return (
    <g>
      {Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 3 }, (_, q) => {
          const on = cells.has(`${q},${2 - r}`);
          return <rect key={`${r}${q}`} x={x + q * c} y={y + r * c} width={c} height={c} fill={on ? color : "none"} fillOpacity={0.5} stroke={on ? MANIM.ink : MANIM.grid} strokeWidth={on ? 2.5 : 1} />;
        }),
      )}
      <Txt x={x + (3 * c) / 2} y={y + 3 * c + 24} size={20} color={color}>
        {label}
      </Txt>
    </g>
  );
}

export function buildVistasProyeccion(): AnimBuild {
  const u = 36;
  const cx = 150;
  const cy = 290;
  const P = (x: number, y: number, z: number) => [cx + (x - y) * u * 0.866, cy - (x + y) * u * 0.5 - z * u] as const;
  const poly = (pts: (readonly [number, number])[], fill: string) => <polygon points={pts.map((p) => p.join(",")).join(" ")} fill={fill} fillOpacity={0.85} stroke={MANIM.surface} strokeWidth={1.5} />;
  const cubes: [number, number, number][] = [];
  for (let y = 0; y < 3; y += 1) for (let x = 0; x < 3; x += 1) for (let z = 0; z < (PIEZA_L[y * 3 + x] ?? 0); z += 1) cubes.push([x, y, z]);
  cubes.sort((a, b) => b[0] + b[1] - (a[0] + a[1]) || a[2] - b[2]);
  const v = cuboVistas(PIEZA_L);
  const c = 46;
  return {
    label: "Una pieza y sus tres vistas principales: alzado, planta y perfil",
    beatMs: 5600,
    captions: [
      "Una pieza en 3D se describe con **vistas**: dibujos planos de cómo se ve desde distintos lados.",
      "**Alzado**: la pieza vista **de frente**. Muestra el ancho y la altura.",
      "**Planta**: la pieza vista **desde arriba**. Se dibuja justo debajo del alzado y muestra el ancho y el fondo.",
      "**Perfil**: la pieza vista **desde la izquierda**. Se dibuja a la derecha del alzado y muestra la altura y el fondo.",
      "Las vistas se **alinean**: el ancho coincide en alzado y planta; la altura, en alzado y perfil. Así se lee la pieza completa.",
    ],
    render: (beat) => (
      <Canvas>
        {cubes.map(([x, y, z]) => (
          <g key={`${x}${y}${z}`}>
            {poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], MANIM.blue)}
            {poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], MANIM.green)}
            {poly([P(x, y, z), P(x, y + 1, z), P(x, y + 1, z + 1), P(x, y, z + 1)], MANIM.orange)}
          </g>
        ))}
        <Fade show={beat === 1}>
          <Txt x={150} y={395} size={18} color={MANIM.green}>
            alzado: se mira la cara verde
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Arrow x1={150} y1={70} x2={150} y2={125} color={MANIM.blue} width={4} />
          <Txt x={150} y={58} size={18} color={MANIM.blue}>
            planta: se mira desde arriba
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={150} y={395} size={18} color={MANIM.orange}>
            perfil: se mira la cara naranja
          </Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <Vista cells={v.alzado} x={390} y={30} c={c} color={MANIM.green} label="Alzado" />
        </Fade>
        <Fade show={beat >= 2}>
          <Vista cells={v.planta} x={390} y={235} c={c} color={MANIM.blue} label="Planta" />
        </Fade>
        <Fade show={beat >= 3}>
          <Vista cells={v.perfil} x={600} y={30} c={c} color={MANIM.orange} label="Perfil" />
        </Fade>
        <Fade show={beat === 4}>
          <line x1={390} y1={28} x2={390} y2={380} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="6 5" />
          <line x1={390 + 3 * c} y1={28} x2={390 + 3 * c} y2={380} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="6 5" />
          <line x1={388} y1={30} x2={738} y2={30} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="6 5" />
          <line x1={388} y1={30 + 3 * c} x2={738} y2={30 + 3 * c} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="6 5" />
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Perspectiva caballera paso a paso ───────────── */

export function buildCaballeraPasos(): AnimBuild {
  const L = 210;
  const H = 130;
  const D = 160; // fondo real en px
  const ang = rad(45);
  const x0 = 170;
  const y0 = 340;
  const dx = D * 0.5 * Math.cos(ang);
  const dy = D * 0.5 * Math.sin(ang);
  const A = [x0, y0] as const;
  const B = [x0 + L, y0] as const;
  const C = [x0 + L, y0 - H] as const;
  const E = [x0, y0 - H] as const;
  return {
    label: "Perspectiva caballera: cara frontal real, fondo a 45° y reducido a la mitad",
    beatMs: 5600,
    captions: [
      "Se empieza por la **cara frontal**, dibujada tal cual: sus medidas son las reales, sin deformar.",
      "Desde cada vértice se trazan rectas **a 45°**, que representan la profundidad (el fondo).",
      "Sobre ellas se mide el fondo **reducido a la mitad** (coeficiente 0,5): si el fondo real es 80 mm, se dibujan 40 mm.",
      "Se une el extremo de las rectas con una **cara trasera** idéntica a la frontal, desplazada.",
      "Las aristas ocultas se dibujan de **trazo discontinuo** y se refuerza el contorno visible.",
    ],
    render: (beat) => {
      const Ar = [A[0] + dx, A[1] - dy] as const;
      const Br = [B[0] + dx, B[1] - dy] as const;
      const Cr = [C[0] + dx, C[1] - dy] as const;
      const Er = [E[0] + dx, E[1] - dy] as const;
      return (
        <Canvas>
          <polygon points={`${A} ${B} ${C} ${E}`} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={4} />
          <Fade show={beat >= 1}>
            {[B, C, E].map((p, i) => (
              <line key={i} x1={p[0]} y1={p[1]} x2={p[0] + dx * (beat === 1 ? 1.5 : 1)} y2={p[1] - dy * (beat === 1 ? 1.5 : 1)} stroke={MANIM.orange} strokeWidth={2.5} strokeDasharray={beat === 1 ? "8 6" : "0"} />
            ))}
            <Txt x={B[0] + 80} y={B[1] - 74} size={20} color={MANIM.orange}>
              45°
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={B[0] + 90} y={B[1] - 16} size={19} color={MANIM.yellow}>
              fondo × 0,5
            </Txt>
            <circle cx={Br[0]} cy={Br[1]} r={6} fill={MANIM.yellow} />
            <circle cx={Cr[0]} cy={Cr[1]} r={6} fill={MANIM.yellow} />
            <circle cx={Er[0]} cy={Er[1]} r={6} fill={MANIM.yellow} />
          </Fade>
          <Fade show={beat >= 3}>
            <polygon points={`${E} ${C} ${Cr} ${Er}`} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={3.5} />
            <polygon points={`${B} ${Br} ${Cr} ${C}`} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={3.5} />
          </Fade>
          <Fade show={beat >= 4}>
            <line x1={Ar[0]} y1={Ar[1]} x2={Br[0]} y2={Br[1]} stroke={MANIM.muted} strokeWidth={2.5} strokeDasharray="8 6" />
            <line x1={Ar[0]} y1={Ar[1]} x2={Er[0]} y2={Er[1]} stroke={MANIM.muted} strokeWidth={2.5} strokeDasharray="8 6" />
            <line x1={A[0]} y1={A[1]} x2={Ar[0]} y2={Ar[1]} stroke={MANIM.muted} strokeWidth={2.5} strokeDasharray="8 6" />
            <Txt x={Ar[0] - 40} y={Ar[1] + 8} size={18} color={MANIM.muted}>
              oculta
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Perspectiva isométrica paso a paso ───────────── */

export function buildIsometricaPasos(): AnimBuild {
  const s = 120;
  const c30 = Math.cos(rad(30));
  const s30 = Math.sin(rad(30));
  const O = [400, 330] as const;
  const P = (l: number, h: number, d: number) => [O[0] + (l - d) * s * c30, O[1] - h * s - (l + d) * s * s30] as const;
  const pl = (arr: [number, number, number][]) => arr.map(([l, h, d]) => P(l, h, d).join(",")).join(" ");
  return {
    label: "Perspectiva isométrica: tres ejes a 120° y la misma escala en todos",
    beatMs: 5600,
    captions: [
      "Se dibujan **tres ejes** desde un punto: uno **vertical** y los otros dos a **30°** con la horizontal. Entre ejes quedan 120°.",
      "Sobre cada eje se miden las dimensiones con la **misma escala** (largo, alto y fondo). Por eso se llama isométrica: «igual medida».",
      "Se dibujan **paralelas** a los ejes por esos puntos para construir las caras visibles.",
      "Se completan las tres caras: **superior, frontal y lateral**. Todas las aristas paralelas del objeto quedan paralelas en el dibujo.",
      "Se refuerza el contorno. Ninguna cara conserva su forma real, pero las medidas se leen sobre las aristas.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 1}>
          <line x1={O[0]} y1={O[1]} x2={O[0]} y2={O[1] - 250} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          <line x1={O[0]} y1={O[1]} x2={O[0] + 310 * c30} y2={O[1] - 310 * s30} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          <line x1={O[0]} y1={O[1]} x2={O[0] - 310 * c30} y2={O[1] - 310 * s30} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={O[0] + 70} y={O[1] - 8} size={20} color={MANIM.yellow}>
            30°
          </Txt>
          <Txt x={O[0] - 70} y={O[1] - 8} size={20} color={MANIM.yellow}>
            30°
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          {[
            { p: P(1, 0, 0), c: MANIM.green, t: "largo" },
            { p: P(0, 1, 0), c: MANIM.blue, t: "alto" },
            { p: P(0, 0, 1), c: MANIM.orange, t: "fondo" },
          ].map((m) => (
            <g key={m.t}>
              <circle cx={m.p[0]} cy={m.p[1]} r={7} fill={m.c} />
              <Txt x={m.p[0] + (m.t === "fondo" ? -34 : m.t === "largo" ? 36 : 28)} y={m.p[1] + 6} size={18} color={m.c}>
                {m.t}
              </Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          <polygon points={pl([[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]])} fill={MANIM.blue} fillOpacity={beat >= 3 ? 0.35 : 0} stroke={MANIM.blue} strokeWidth={3} />
        </Fade>
        <Fade show={beat >= 3}>
          <polygon points={pl([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]])} fill={MANIM.green} fillOpacity={0.35} stroke={MANIM.green} strokeWidth={3} />
          <polygon points={pl([[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]])} fill={MANIM.orange} fillOpacity={0.35} stroke={MANIM.orange} strokeWidth={3} />
        </Fade>
        <Fade show={beat >= 4}>
          <polygon points={pl([[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1], [0, 0, 1]])} fill="none" stroke={MANIM.ink} strokeWidth={4.5} strokeLinejoin="round" />
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Boceto, croquis y plano ───────────── */

function trazoTemblon(x1: number, y1: number, x2: number, y2: number, seed: number): string {
  const n = 5;
  let d = `M ${x1} ${y1}`;
  for (let i = 1; i <= n; i += 1) {
    const t = i / n;
    const off = Math.sin(seed * 12.9898 + i * 4.1) * 3.2;
    const nx = -(y2 - y1);
    const ny = x2 - x1;
    const len = Math.hypot(nx, ny) || 1;
    d += ` L ${x1 + (x2 - x1) * t + (nx / len) * off} ${y1 + (y2 - y1) * t + (ny / len) * off}`;
  }
  return d;
}

export function buildBocetoCroquisPlano(): AnimBuild {
  const paneles = [
    { x: 30, t: "Boceto", c: MANIM.orange },
    { x: 290, t: "Croquis", c: MANIM.green },
    { x: 550, t: "Plano", c: MANIM.blue },
  ];
  const bx = (px: number) => px + 20;
  const by = 110;
  const w = 180;
  const h = 110;
  return {
    label: "Boceto, croquis y plano de una misma pieza: de la idea al documento de fabricación",
    beatMs: 5400,
    captions: [
      "La misma pieza se puede representar de tres formas, cada una con su finalidad.",
      "**Boceto**: dibujo rápido a mano alzada para **explorar ideas**. No lleva medidas ni se preocupa de la precisión.",
      "**Croquis**: dibujo a mano alzada pero **proporcionado y acotado**. Sirve para tomar datos de un objeto real o comunicar una idea con medidas.",
      "**Plano**: dibujo hecho con instrumentos, a escala y normalizado (cajetín, cotas, vistas). Es el documento con el que se **fabrica**.",
    ],
    render: (beat) => (
      <Canvas>
        {paneles.map((p, i) => (
          <g key={p.t}>
            <rect x={p.x} y={50} width={220} height={300} rx={12} fill={MANIM.panel} stroke={p.c} strokeWidth={beat === i + 1 ? 4 : 2} className="anim-t" opacity={beat === 0 || beat === i + 1 ? 1 : 0.4} />
            <Txt x={p.x + 110} y={86} size={24} color={p.c}>
              {p.t}
            </Txt>
          </g>
        ))}
        {/* boceto */}
        <g opacity={beat === 0 || beat === 1 ? 1 : 0.4} className="anim-t">
          <path d={trazoTemblon(bx(30), by, bx(30) + w, by + 6, 1)} stroke={MANIM.orange} strokeWidth={3} fill="none" />
          <path d={trazoTemblon(bx(30) + w, by + 6, bx(30) + w - 4, by + h, 2)} stroke={MANIM.orange} strokeWidth={3} fill="none" />
          <path d={trazoTemblon(bx(30) + w - 4, by + h, bx(30) - 3, by + h + 5, 3)} stroke={MANIM.orange} strokeWidth={3} fill="none" />
          <path d={trazoTemblon(bx(30) - 3, by + h + 5, bx(30), by, 4)} stroke={MANIM.orange} strokeWidth={3} fill="none" />
          <circle cx={bx(30) + 55} cy={by + 58} r={19} stroke={MANIM.orange} strokeWidth={3} fill="none" />
          <Txt x={30 + 110} y={300} size={17} color={MANIM.muted}>
            ¿y si lleva un agujero?
          </Txt>
        </g>
        {/* croquis */}
        <g opacity={beat === 0 || beat === 2 ? 1 : 0.4} className="anim-t">
          <path d={trazoTemblon(bx(290), by, bx(290) + w, by + 3, 5)} stroke={MANIM.green} strokeWidth={3} fill="none" />
          <path d={trazoTemblon(bx(290) + w, by + 3, bx(290) + w - 2, by + h, 6)} stroke={MANIM.green} strokeWidth={3} fill="none" />
          <path d={trazoTemblon(bx(290) + w - 2, by + h, bx(290) - 1, by + h + 2, 7)} stroke={MANIM.green} strokeWidth={3} fill="none" />
          <path d={trazoTemblon(bx(290) - 1, by + h + 2, bx(290), by, 8)} stroke={MANIM.green} strokeWidth={3} fill="none" />
          <circle cx={bx(290) + 55} cy={by + 56} r={19} stroke={MANIM.green} strokeWidth={3} fill="none" />
          <Txt x={290 + 110} y={by + h + 42} size={18} color={MANIM.yellow}>
            100
          </Txt>
          <Txt x={bx(290) + w - 20} y={by + 64} size={18} color={MANIM.yellow}>
            60
          </Txt>
          <Txt x={bx(290) + 55} y={by + 24} size={16} color={MANIM.yellow}>
            Ø 12
          </Txt>
        </g>
        {/* plano */}
        <g opacity={beat === 0 || beat === 3 ? 1 : 0.4} className="anim-t">
          <rect x={bx(550)} y={by} width={w} height={h} fill="none" stroke={MANIM.blue} strokeWidth={3} />
          <circle cx={bx(550) + 55} cy={by + 55} r={19} stroke={MANIM.blue} strokeWidth={3} fill="none" />
          <line x1={bx(550)} y1={by + h + 22} x2={bx(550) + w} y2={by + h + 22} stroke={MANIM.yellow} strokeWidth={1.5} />
          <Txt x={550 + 110} y={by + h + 18} size={17} color={MANIM.yellow}>
            100
          </Txt>
          <rect x={550 + 20} y={290} width={180} height={44} fill="none" stroke={MANIM.blue} strokeWidth={2} />
          <Txt x={550 + 110} y={310} size={14} color={MANIM.muted}>
            Soporte · Escala 1:1
          </Txt>
          <Txt x={550 + 110} y={326} size={13} color={MANIM.muted}>
            Cotas en mm
          </Txt>
        </g>
      </Canvas>
    ),
  };
}

/* ───────────── Una escala de reducción: 1:50 ───────────── */

export function buildEscalaReduccion(): AnimBuild {
  return {
    label: "Escala de reducción 1:50: de una pared real de 6 m a un dibujo de 12 cm",
    beatMs: 5600,
    captions: [
      "Una pared mide **6 m** en la realidad. Es imposible dibujarla a tamaño natural en una hoja.",
      "La escala **1:50** significa: 1 unidad en el dibujo equivale a 50 iguales en la realidad. **1 cm del dibujo = 50 cm reales**.",
      "Para dibujar, se **divide** la medida real entre 50: $600\\text{ cm} : 50 = 12\\text{ cm}$. Cabe en un folio.",
      "Al revés, para leer un plano se **multiplica**: si el pasillo mide 8 cm en el dibujo, en la realidad mide $8 \\times 50 = 400\\text{ cm} = 4\\text{ m}$.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={80} y={90} width={640} height={50} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={4} />
        <Txt x={400} y={80} size={22} color={MANIM.blue}>
          Pared real: 6 m
        </Txt>
        <Fade show={beat >= 1}>
          <Arrow x1={400} y1={160} x2={400} y2={225} color={MANIM.yellow} width={4} />
          <Txt x={470} y={200} size={24} color={MANIM.yellow}>
            ÷ 50
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <rect x={344} y={245} width={12.8 * 4.4} height={34} fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={400} y={308} size={22} color={MANIM.green}>
            Dibujo: 12 cm
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={400} y={370} size={24} color={MANIM.orange}>
            8 cm en el plano × 50 = 400 cm = 4 m reales
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
