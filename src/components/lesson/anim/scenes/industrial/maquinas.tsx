import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";

const G = 9.8;
const f1 = (v: number, d = 1) => v.toFixed(d).replace(".", ",");

function Arrow({ x1, y1, x2, y2, color, width = 4, head = 12 }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number; head?: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - Math.cos(a) * head;
  const hy = y2 - Math.sin(a) * head;
  const w = head * 0.55;
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${hx - Math.sin(a) * w},${hy + Math.cos(a) * w} ${hx + Math.sin(a) * w},${hy - Math.cos(a) * w}`} fill={color} />
    </g>
  );
}

/* ───────────── Plano inclinado: el trabajo no depende del ángulo ───────────── */

export function buildPlanoInclinado(): AnimBuild {
  const m = 120;
  const h = 0.8;
  const cases = [6, 3, 0.0001];
  const scale = 66;
  const gx = 90;
  const gy = 330;
  const calc = (base: number) => {
    const l = Math.hypot(base, h);
    const s = h / l;
    return { l, s, F: m * G * s, W: m * G * s * l };
  };
  return {
    label: "Trabajo para subir una carga por rampas de distinta inclinación",
    beatMs: 4200,
    captions: [
      "Un camión de mudanzas sube un mueble de $120$ kg a $0{,}8$ m de altura con una rampa de $6$ m de base. El **peso** $mg$ se descompone en una componente $mg\\,\\sin\\beta$ **paralela al plano** y otra $mg\\,\\cos\\beta$ perpendicular.",
      `Sin rozamiento, la fuerza para subir a velocidad constante es $F = mg\\,\\sin\\beta = ${f1(calc(6).F)}$ N y el recorrido es $e = ${f1(calc(6).l, 2)}$ m: $W = F\\,e = ${f1(calc(6).W, 0)}$ J.`,
      `Con una rampa más corta (base $3$ m) la fuerza sube a ${f1(calc(3).F)} N, pero el recorrido se reduce a ${f1(calc(3).l, 2)} m. El trabajo sigue siendo ${f1(calc(3).W, 0)} J.`,
      `Subiéndolo en vertical, $F = mg = ${f1(m * G, 0)}$ N sobre solo $0{,}8$ m: $W = ${f1(m * G * h, 0)}$ J. El trabajo es el mismo: $W = mgh$. La ventaja mecánica del plano es $\\sin\\beta$.`,
    ],
    render: (beat) => {
      const base = beat <= 1 ? cases[0]! : beat === 2 ? cases[1]! : cases[2]!;
      const bx = gx + base * scale;
      const top = gy - h * scale * 3;
      const res = calc(Math.max(base, 0.0001));
      const ang = Math.atan2(gy - top, bx - gx);
      const blockT = beat >= 1 ? 1 : 0;
      const ux = bx - gx;
      const uy = top - gy;
      const px = gx + ux * (0.12 + 0.62 * blockT);
      const py = gy + uy * (0.12 + 0.62 * blockT);
      return (
        <Canvas>
          <line x1={40} y1={gy} x2={760} y2={gy} stroke={MANIM.muted} strokeWidth={3} />
          <polygon className="anim-t" points={`${gx},${gy} ${bx},${gy} ${bx},${top}`} fill={MANIM.blue} fillOpacity={0.18} stroke={MANIM.blue} strokeWidth={3.5} />
          <line x1={bx} y1={gy} x2={bx} y2={top} stroke={MANIM.green} strokeWidth={3} strokeDasharray="6 5" />
          <Txt x={bx + 16} y={(gy + top) / 2 + 6} size={20} color={MANIM.green} anchor="start">
            h = 0,8 m
          </Txt>
          <g className="anim-t" style={{ transform: `translate(${px}px, ${py}px) rotate(${(ang * 180) / Math.PI * -1}deg)`, transformOrigin: "0 0" }}>
            <rect x={-26} y={-40} width={52} height={40} fill={MANIM.orange} fillOpacity={0.9} rx={4} />
            <Txt x={0} y={-14} size={15} color={MANIM.surface} weight={800}>
              120 kg
            </Txt>
          </g>
          <Fade show={beat === 0}>
            <g transform={`translate(${px} ${py - 20})`}>
              <Arrow x1={0} y1={0} x2={0} y2={90} color={MANIM.red} />
              <Txt x={14} y={100} size={18} color={MANIM.red} anchor="start">
                mg
              </Txt>
              <Arrow x1={0} y1={0} x2={Math.cos(ang) * 60} y2={-Math.sin(ang) * 60} color={MANIM.green} width={4} />
              <Txt x={68} y={-10} size={16} color={MANIM.green} anchor="start">
                F ∥ plano
              </Txt>
            </g>
          </Fade>
          <Fade show={beat >= 1}>
            <Txt x={400} y={52} size={26} color={MANIM.yellow}>
              {beat === 1 || beat === 2
                ? `F = ${f1(res.F)} N  ·  e = ${f1(res.l, 2)} m`
                : `F = ${f1(m * G, 0)} N  ·  e = 0,8 m`}
            </Txt>
            <Txt x={400} y={90} size={26} color={MANIM.green}>
              W = F·e = {f1(beat >= 3 ? m * G * h : res.W, 0)} J
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={400} y={128} size={20} color={MANIM.orange}>
              Mismo trabajo: W = m·g·h
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Trabajo de una fuerza variable: área bajo la curva ───────────── */

const FX = (x: number) => 50 * Math.sqrt(x);
const AREA_EXACT = (100 / 3) * (27 - 1);
function rects(n: number) {
  const w = 8 / n;
  return Array.from({ length: n }, (_, i) => ({ x: 1 + i * w, w, f: FX(1 + i * w) }));
}

export function buildTrabajoAreaCurva(): AnimBuild {
  const X0 = 90;
  const Y0 = 360;
  const sx = 70;
  const sy = 1.9;
  const px = (x: number) => X0 + x * sx - sx;
  const py = (f: number) => Y0 - f * sy;
  const sum = (n: number) => rects(n).reduce((a, r) => a + r.f * r.w, 0);
  const curve = `M ${Array.from({ length: 81 }, (_, i) => `${px(1 + i / 10).toFixed(1)} ${py(FX(1 + i / 10)).toFixed(1)}`).join(" L ")}`;
  return {
    label: "El trabajo de una fuerza variable como área bajo la curva fuerza-desplazamiento",
    beatMs: 4200,
    captions: [
      "Si la fuerza **cambia** con el desplazamiento, ya no vale $W = F\\,e$. En unos ejes $F$–$x$, el trabajo desde $x_1 = 1$ hasta $x_2 = 9$ debe tener en cuenta que $F$ varía.",
      `Se divide el recorrido en **4 tramos** y en cada uno se supone la fuerza constante: $\\Delta W = F\\,\\Delta x$. La suma de rectángulos da $${f1(sum(4), 0)}$ unidades.`,
      `Con **8 tramos** la aproximación mejora: $${f1(sum(8), 0)}$ unidades.`,
      `Con **16 tramos**: $${f1(sum(16), 0)}$. Cuanto más pequeños los intervalos, más nos acercamos al valor real.`,
      `En el límite, $W_{1,2} = \\sum F(x)\\,\\Delta x$ es el **área bajo la curva** $F(x)$: aquí $${f1(AREA_EXACT, 0)}$ unidades.`,
    ],
    render: (beat) => {
      const n = beat === 1 ? 4 : beat === 2 ? 8 : beat === 3 ? 16 : 0;
      const rs = n ? rects(n) : [];
      return (
        <Canvas>
          <Axes x0={X0} y0={Y0} x1={720} y1={50} xLabel="x" yLabel="F" />
          <Fade show={beat === 4}>
            <path d={`${curve} L ${px(9)} ${Y0} L ${px(1)} ${Y0} Z`} fill={MANIM.green} fillOpacity={0.35} />
            <Txt x={px(5.5)} y={py(40)} size={30} color={MANIM.green}>
              W
            </Txt>
          </Fade>
          {[4, 8, 16].map((k) => (
            <Fade key={k} show={n === k}>
              {rects(k).map((r, i) => (
                <rect key={i} x={px(r.x)} y={py(r.f)} width={r.w * sx - 1.5} height={r.f * sy} fill={MANIM.blue} fillOpacity={0.45} stroke={MANIM.blue} strokeWidth={1.5} />
              ))}
            </Fade>
          ))}
          <DrawPath show d={curve} color={MANIM.orange} width={4.5} />
          <Txt x={px(1)} y={Y0 + 28} size={18} color={MANIM.muted} weight={500}>
            x₁
          </Txt>
          <Txt x={px(9)} y={Y0 + 28} size={18} color={MANIM.muted} weight={500}>
            x₂
          </Txt>
          <Fade show={n > 0 || beat === 4}>
            <Txt x={560} y={330} size={22} color={MANIM.yellow}>
              {n ? `${n} tramos: ${f1(rs.reduce((a, r) => a + r.f * r.w, 0), 0)}` : `Área = ${f1(AREA_EXACT, 0)}`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Resorte: W = ½ k x² ───────────── */

function Spring({ x0, x1, y, coils = 9, amp = 18, color = MANIM.blue }: { x0: number; x1: number; y: number; coils?: number; amp?: number; color?: string }) {
  const pts: string[] = [`${x0},${y}`];
  const n = coils * 2;
  for (let i = 1; i < n; i += 1) {
    pts.push(`${(x0 + ((x1 - x0) * i) / n).toFixed(1)},${y + (i % 2 ? -amp : amp)}`);
  }
  pts.push(`${x1},${y}`);
  return <polyline className="anim-t" points={pts.join(" ")} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" />;
}

export function buildResorteTrabajo(): AnimBuild {
  const wall = 80;
  const k = 200;
  return {
    label: "Trabajo para estirar un resorte: área de un triángulo",
    beatMs: 4200,
    captions: [
      "Un resorte sin estirar ($x = 0$) fijo a una pared. La fuerza que ejerce al estirarlo es proporcional al alargamiento: $F = -k\\,x$ (**ley de Hooke**).",
      "Al estirarlo la mitad de un alargamiento $x$, la fuerza que hay que hacer vale solo la **mitad**: $F' = k\\,x/2$.",
      "Con el alargamiento completo $x$, $F' = k\\,x$. La fuerza no es constante: va **creciendo** desde $0$ hasta $k\\,x$.",
      "En la gráfica $F'$–$x$ es una recta y el trabajo es el **área del triángulo**: $W = \\tfrac{1}{2}\\,F\\,x = \\tfrac{1}{2}\\,k\\,x^2$.",
    ],
    render: (beat) => {
      const t = beat === 0 ? 0 : beat === 1 ? 0.5 : 1;
      const len = 100 + t * 150;
      const endX = wall + len;
      return (
        <Canvas>
          <rect x={wall - 20} y={110} width={20} height={150} fill="#6a7688" />
          <Spring x0={wall} x1={endX} y={190} coils={9} amp={beat === 0 ? 18 : 18 - t * 4} />
          <rect x={endX} y={150} width={50} height={80} rx={5} fill={MANIM.orange} fillOpacity={0.9} className="anim-t" style={{ transform: "translateX(0px)" }} />
          <line x1={wall + 100 + 50} y1={270} x2={wall + 100 + 50} y2={282} stroke={MANIM.muted} strokeWidth={2} opacity={0} />
          <Fade show={beat >= 1}>
            <line x1={wall + 100} y1={250} x2={endX} y2={250} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={(wall + 100 + endX) / 2} y={274} size={20} color={MANIM.green}>
              x = {f1(t * 0.5, 2)} m
            </Txt>
            <Arrow x1={endX + 50} y1={190} x2={endX + 50 + 20 + t * 90} y2={190} color={MANIM.red} width={5} />
            <Txt x={endX + 60} y={168} size={18} color={MANIM.red} anchor="start">
              F&apos; = {f1(k * t * 0.5, 0)} N
            </Txt>
          </Fade>
          <Axes x0={470} y0={370} x1={740} y1={290} xLabel="x" yLabel="F'" />
          <Fade show={beat >= 3}>
            <polygon points="470,370 700,370 700,310" fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={2.5} />
            <Txt x={620} y={352} size={20} color={MANIM.green}>
              W = ½ k x²
            </Txt>
          </Fade>
          <Fade show={beat >= 1}>
            <line x1={470} y1={370} x2={470 + t * 230} y2={370 - t * 60} stroke={MANIM.red} strokeWidth={3.5} />
            <circle cx={470 + t * 230} cy={370 - t * 60} r={6} fill={MANIM.red} />
          </Fade>
          <Txt x={wall + 40} y={90} size={18} color={MANIM.muted} weight={500}>
            k = {k} N/m
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Rodadura: el momento de inercia frena ───────────── */

export function buildRodaduraCarrera(): AnimBuild {
  const bodies = [
    { name: "Bloque sin rozamiento", k: 0, color: MANIM.blue },
    { name: "Esfera maciza", k: 0.4, color: MANIM.green },
    { name: "Cilindro macizo", k: 0.5, color: MANIM.yellow },
    { name: "Aro", k: 1, color: MANIM.red },
  ];
  const len = 460;
  const x0 = 100;
  const y0 = 90;
  const slope = 0.42;
  return {
    label: "Carrera por un plano inclinado de cuerpos con distinto momento de inercia",
    beatMs: 4800,
    captions: [
      "Cuatro cuerpos de la misma masa y radio en lo alto de un plano inclinado. Tres ruedan sin deslizar y uno resbala sin rozamiento.",
      "Se sueltan a la vez. La aceleración es $a = \\dfrac{g\\,\\sin\\theta}{1 + I/(m r^2)}$: cuanto **mayor es el momento de inercia**, más despacio avanza.",
      "La energía potencial se reparte entre energía cinética de **traslación** y de **rotación**. Cuanto más masa lejos del eje, más energía va a girar y menos a avanzar: $E_c = \\tfrac{1}{2}mv^2 + \\tfrac{1}{2}I\\omega^2$.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={`${x0},${y0 + 20} ${x0 + len},${y0 + 20 + len * slope} ${x0},${y0 + 20 + len * slope}`} fill="#6a7688" fillOpacity={0.3} stroke={MANIM.muted} strokeWidth={2} />
        {bodies.map((b, i) => {
          const a = 1 / (1 + b.k);
          const dist = beat >= 1 ? a * 0.92 : 0;
          const lane = i * 18;
          const cx = x0 + 30 + dist * (len - 60);
          const cy = y0 + 20 + (cx - x0) * slope - 28 - lane;
          return (
            <g
              key={b.name}
              style={{
                transform: `translate(${cx}px, ${cy}px)`,
                transition: beat >= 1 ? "transform 3.6s cubic-bezier(0.4, 0, 1, 1)" : "transform 0.5s ease",
              }}
            >
              {b.k === 0 ? <rect x={-14} y={-14} width={28} height={22} fill={b.color} fillOpacity={0.9} rx={3} /> : <circle r={14} fill={b.k === 1 ? "none" : b.color} fillOpacity={b.k === 1 ? 1 : 0.85} stroke={b.color} strokeWidth={b.k === 1 ? 5 : 2.5} />}
              {b.k !== 0 ? <line x1={0} y1={0} x2={13} y2={0} stroke={MANIM.surface} strokeWidth={2.5} /> : null}
            </g>
          );
        })}
        <g transform="translate(540 130)">
          {bodies.map((b, i) => (
            <g key={b.name} transform={`translate(0 ${i * 48})`}>
              <circle cx={6} cy={0} r={6} fill={b.color} />
              <Txt x={22} y={6} size={17} color={MANIM.ink} anchor="start" weight={500}>
                {b.name}
              </Txt>
              <Txt x={22} y={26} size={14} color={MANIM.muted} anchor="start" weight={500}>
                {b.k === 0 ? "sin giro" : `I = ${f1(b.k, 2)}·m·r²`} · a = {f1(1 / (1 + b.k), 2)}·g·sen θ
              </Txt>
            </g>
          ))}
        </g>
        <Fade show={beat >= 2}>
          <Txt x={400} y={392} size={21} color={MANIM.yellow}>
            Mismo punto de partida, distinta energía cinética de rotación
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Primer principio de la termodinámica ───────────── */

export function buildPrimerPrincipio(): AnimBuild {
  return {
    label: "Primer principio de la termodinámica en un motor térmico y en una máquina frigorífica",
    beatMs: 4500,
    captions: [
      "**Principio de conservación de la energía**: la energía no se crea ni se destruye, solo se transforma. En general, $\\sum E_{\\text{entra}} = \\sum E_{\\text{sale}}$.",
      "**Motor térmico**: entra calor $Q$ al sistema (gas quemado). Parte aumenta su energía interna $\\Delta U$ y parte sale como **trabajo útil** $W$.",
      "Así, $Q = \\Delta U + W$. El objetivo es aprovechar el calor para producir trabajo.",
      "**Máquina frigorífica**: un trabajo $W$ exterior (compresor) entra al sistema y se extrae calor $Q$ de un recinto.",
      "Aquí $W = \\Delta U + Q$: el trabajo aportado aumenta la energía interna y sale como calor.",
    ],
    render: (beat) => {
      const motor = beat === 1 || beat === 2;
      const frigo = beat >= 3;
      return (
        <Canvas>
          <ellipse cx={400} cy={210} rx={110} ry={80} fill={motor ? MANIM.red : frigo ? MANIM.blue : MANIM.muted} fillOpacity={0.22} stroke={motor ? MANIM.red : frigo ? MANIM.blue : MANIM.muted} strokeWidth={3} className="anim-t" />
          <Txt x={400} y={205} size={26} color={MANIM.ink}>
            Sistema
          </Txt>
          <Txt x={400} y={238} size={22} color={MANIM.yellow}>
            ΔU
          </Txt>
          <Fade show={motor} dx={-40}>
            <Arrow x1={130} y1={210} x2={285} y2={210} color={MANIM.red} width={14} head={26} />
            <Txt x={200} y={186} size={26} color={MANIM.red}>
              Q
            </Txt>
            <Arrow x1={515} y1={210} x2={680} y2={210} color={MANIM.blue} width={14} head={26} />
            <Txt x={600} y={186} size={26} color={MANIM.blue}>
              W
            </Txt>
            <Txt x={400} y={340} size={22} color={MANIM.muted} weight={500}>
              Motor térmico
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={400} y={60} size={34} color={MANIM.green}>
              Q = ΔU + W
            </Txt>
          </Fade>
          <Fade show={frigo} dx={-40}>
            <Arrow x1={130} y1={210} x2={285} y2={210} color={MANIM.blue} width={14} head={26} />
            <Txt x={200} y={186} size={26} color={MANIM.blue}>
              W
            </Txt>
            <Arrow x1={515} y1={210} x2={680} y2={210} color={MANIM.red} width={14} head={26} />
            <Txt x={600} y={186} size={26} color={MANIM.red}>
              Q
            </Txt>
            <Txt x={400} y={340} size={22} color={MANIM.muted} weight={500}>
              Máquina frigorífica
            </Txt>
          </Fade>
          <Fade show={beat === 4}>
            <Txt x={400} y={60} size={34} color={MANIM.green}>
              W = ΔU + Q
            </Txt>
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={400} y={80} size={28} color={MANIM.green}>
              Σ energía que entra = Σ energía que sale
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Par de fuerzas y trabajo de rotación ───────────── */

export function buildParTrabajo(): AnimBuild {
  const cx = 250;
  const cy = 210;
  const r = 110;
  return {
    label: "Par de fuerzas, momento y trabajo de rotación",
    beatMs: 4200,
    captions: [
      "Un cuerpo que gira sobre un eje recibe un **par de fuerzas**: dos fuerzas iguales, paralelas y de sentidos contrarios, separadas una distancia $d$.",
      "El **momento** del par vale $M = d\\,F$ (con $d$ y $F$ perpendiculares). Se mide en m·N y no debe confundirse con el trabajo, aunque tengan las mismas unidades.",
      "Si el cuerpo gira un ángulo $\\theta$ (en radianes), cada fuerza recorre un arco $\\theta\\,d/2$.",
      "El trabajo de las dos fuerzas es $W = 2F\\,\\theta\\,\\dfrac{d}{2} = F\\,d\\,\\theta = M\\,\\theta$: **momento por ángulo girado**.",
    ],
    render: (beat) => {
      const ang = beat >= 2 ? 70 : 0;
      return (
        <Canvas>
          <g className="anim-t" style={{ transform: `rotate(${ang}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
            <circle cx={cx} cy={cy} r={r} fill={MANIM.blue} fillOpacity={0.16} stroke={MANIM.blue} strokeWidth={4} />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <line key={a} x1={cx} y1={cy} x2={cx + r * Math.cos((a * Math.PI) / 180)} y2={cy + r * Math.sin((a * Math.PI) / 180)} stroke={MANIM.blue} strokeWidth={2} opacity={0.5} />
            ))}
            <circle cx={cx} cy={cy} r={8} fill={MANIM.ink} />
            <Arrow x1={cx + r} y1={cy + 60} x2={cx + r} y2={cy - 40} color={MANIM.red} width={6} head={18} />
            <Arrow x1={cx - r} y1={cy - 60} x2={cx - r} y2={cy + 40} color={MANIM.red} width={6} head={18} />
          </g>
          <Fade show={beat >= 1}>
            <line x1={cx - r} y1={cy + r + 28} x2={cx + r} y2={cy + r + 28} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={cx} y={cy + r + 54} size={22} color={MANIM.yellow}>
              d (brazo del par)
            </Txt>
          </Fade>
          <Txt x={cx + r + 18} y={cy - 54} size={24} color={MANIM.red} anchor="start">
            F
          </Txt>
          <Txt x={cx - r - 18} y={cy + 56} size={24} color={MANIM.red} anchor="end">
            F
          </Txt>
          <Fade show={beat >= 1}>
            <Txt x={620} y={140} size={30} color={MANIM.yellow}>
              M = d · F
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <path d={`M ${cx + r + 30} ${cy} A ${r + 30} ${r + 30} 0 0 1 ${cx + (r + 30) * Math.cos((70 * Math.PI) / 180)} ${cy + (r + 30) * Math.sin((70 * Math.PI) / 180)}`} stroke={MANIM.green} strokeWidth={4} fill="none" />
            <Txt x={620} y={196} size={26} color={MANIM.green}>
              θ (rad)
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={620} y={262} size={30} color={MANIM.orange}>
              W = M · θ
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Pistón: W = p ΔV ───────────── */

export function buildPistonTrabajo(): AnimBuild {
  const cx0 = 90;
  const cy = 250;
  const w = 230;
  const h = 110;
  const px0 = (x: number) => 480 + x * 40;
  return {
    label: "Trabajo de un gas que se expande en un cilindro a presión constante",
    beatMs: 4200,
    captions: [
      "Un gas encerrado en un cilindro con un pistón de sección $S$ y presión interior $p$. La presión es la fuerza repartida por la superficie: $p = F/S$.",
      "La fuerza sobre el pistón es $F = p\\,S$. Si **no cambia la presión** (transformación isobárica), el pistón se desplaza $\\Delta x$.",
      "El trabajo es $W = F\\,\\Delta x = p\\,S\\,\\Delta x = p\\,\\Delta V$.",
      "En el diagrama $p$–$V$ ese trabajo es el **área del rectángulo** entre $V_1$ y $V_2$.",
    ],
    render: (beat) => {
      const dx = beat >= 1 ? 90 : 0;
      return (
        <Canvas>
          <rect x={cx0} y={cy - h / 2} width={w + 100} height={h} fill="none" stroke={MANIM.muted} strokeWidth={4} />
          <rect x={cx0 + 4} y={cy - h / 2 + 4} width={w + dx - 8 > 0 ? 160 + dx : 0} height={h - 8} fill={MANIM.red} fillOpacity={0.2} className="anim-t" />
          <g className="anim-t" style={{ transform: `translateX(${dx}px)` }}>
            <rect x={cx0 + 160} y={cy - h / 2 + 3} width={18} height={h - 6} fill={MANIM.blue} />
            <line x1={cx0 + 178} y1={cy} x2={cx0 + 250} y2={cy} stroke={MANIM.blue} strokeWidth={8} />
          </g>
          <Txt x={cx0 + 60} y={cy + 6} size={26} color={MANIM.red}>
            gas, p
          </Txt>
          <Fade show={beat >= 1}>
            <line x1={cx0 + 160} y1={cy + h / 2 + 26} x2={cx0 + 250} y2={cy + h / 2 + 26} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={cx0 + 205} y={cy + h / 2 + 52} size={20} color={MANIM.green}>
              Δx
            </Txt>
            <Arrow x1={cx0 + 300} y1={cy} x2={cx0 + 345} y2={cy} color={MANIM.yellow} width={6} head={14} />
          </Fade>
          <Axes x0={470} y0={360} x1={740} y1={80} xLabel="V" yLabel="p" />
          <line x1={px0(0.8)} y1={200} x2={px0(5.8)} y2={200} stroke={MANIM.red} strokeWidth={4} />
          <Fade show={beat >= 3}>
            <rect x={px0(1.2)} y={200} width={px0(4.6) - px0(1.2)} height={160} fill={MANIM.green} fillOpacity={0.35} stroke={MANIM.green} strokeWidth={2.5} />
            <Txt x={(px0(1.2) + px0(4.6)) / 2} y={290} size={28} color={MANIM.green}>
              W = p (V₂ − V₁)
            </Txt>
            <Txt x={px0(1.2)} y={386} size={18} color={MANIM.muted}>
              V₁
            </Txt>
            <Txt x={px0(4.6)} y={386} size={18} color={MANIM.muted}>
              V₂
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Txt x={605} y={64} size={26} color={MANIM.yellow}>
              W = p·S·Δx = p·ΔV
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Presa: de energía potencial a eléctrica ───────────── */

export function buildPresaTurbina(): AnimBuild {
  return {
    label: "Cadena de energía en una central hidroeléctrica",
    beatMs: 4500,
    captions: [
      "El agua del embalse, a una altura $h$ sobre las turbinas, tiene **energía potencial**: $p = d\\,g\\,h$ en la base de la tubería.",
      "Al abrirse las compuertas el agua baja por la tubería: la energía potencial se transforma en **energía cinética** y en presión.",
      "El agua que entra en la turbina le cede su energía: la energía cinética se convierte en **trabajo** de giro.",
      "La turbina mueve el generador y el trabajo mecánico se convierte en **energía eléctrica**. Potencia máxima sin pérdidas: $P = p\\,Q = d\\,g\\,h\\,Q$.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points="60,70 260,70 260,330 60,330" fill={MANIM.blue} fillOpacity={0.3} />
        <polygon points="240,60 290,60 290,340 200,340" fill="#8b97a6" stroke={MANIM.muted} strokeWidth={3} />
        <line x1={20} y1={70} x2={240} y2={70} stroke={MANIM.blue} strokeWidth={3} />
        <Txt x={110} y={100} size={22} color={MANIM.blue}>
          Embalse
        </Txt>
        <Fade show={beat === 0}>
          <line x1={310} y1={70} x2={310} y2={330} stroke={MANIM.yellow} strokeWidth={3} />
          <polygon points="310,330 303,316 317,316" fill={MANIM.yellow} />
          <polygon points="310,70 303,84 317,84" fill={MANIM.yellow} />
          <Txt x={326} y={205} size={22} color={MANIM.yellow} anchor="start">
            h
          </Txt>
          <Txt x={110} y={150} size={20} color={MANIM.yellow}>
            Ep = m g h
          </Txt>
        </Fade>
        <path d="M 290 330 L 450 330" stroke={MANIM.blue} strokeWidth={22} opacity={0.4} />
        <Fade show={beat >= 1}>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={300 + i * 32} cy={330} r={5} fill={MANIM.blue} />
          ))}
          <Txt x={370} y={300} size={20} color={MANIM.blue}>
            {beat === 1 ? "Ep → Ec" : "tubería forzada"}
          </Txt>
        </Fade>
        <g className="anim-t" style={{ transform: `rotate(${beat >= 2 ? 360 : 0}deg)`, transformOrigin: "490px 330px", transitionDuration: "3.2s" }}>
          <circle cx={490} cy={330} r={36} fill="#8b97a6" fillOpacity={0.5} stroke={MANIM.muted} strokeWidth={3} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1={490} y1={330} x2={490 + 36 * Math.cos((a * Math.PI) / 180)} y2={330 + 36 * Math.sin((a * Math.PI) / 180)} stroke={MANIM.ink} strokeWidth={4} />
          ))}
        </g>
        <Txt x={490} y={392} size={18} color={MANIM.muted} weight={500}>
          Turbina
        </Txt>
        <Fade show={beat >= 3}>
          <line x1={526} y1={330} x2={600} y2={330} stroke={MANIM.ink} strokeWidth={6} />
          <rect x={600} y={296} width={80} height={68} rx={8} fill={MANIM.yellow} fillOpacity={0.8} />
          <Txt x={640} y={338} size={20} color={MANIM.surface} weight={800}>
            G
          </Txt>
          <Txt x={640} y={392} size={18} color={MANIM.muted} weight={500}>
            Generador
          </Txt>
          <path d="M 690 330 L 760 330" stroke={MANIM.yellow} strokeWidth={5} />
          <path d="M 735 305 L 710 335 L 735 335 L 715 360" stroke={MANIM.yellow} strokeWidth={4} fill="none" />
          <Txt x={680} y={266} size={22} color={MANIM.yellow}>
            P = p·Q
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={560} y={270} size={20} color={MANIM.green}>
            Ec → trabajo
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
