import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";
import {
  TTT_A1,
  TTT_BF,
  TTT_BS,
  TTT_MF,
  TTT_MS,
  TTT_PF,
  TTT_PS,
  TTT_X_MAX,
  TTT_X_MIN,
  coolingEndX,
  coolingT,
  tttResult,
  type Pt2,
} from "@/components/lesson/anim/scenes/industrial/ttt";

const rnd = (i: number, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ───────────── Austenita (FCC) → martensita (BCT) ───────────── */

const CS = 150;
const CDX = 74;
const CDY = 62;
const CX0 = 110;
const CY0 = 320;

function cubePt(u: number, v: number, w: number, c: number): [number, number] {
  return [CX0 + u * CS + w * CDX, CY0 - v * CS * c - w * CDY];
}

function FeAtom({ p, show = true, r = 17, back = false }: { p: [number, number]; show?: boolean; r?: number; back?: boolean }) {
  return (
    <g className="anim-t" style={{ transform: `translate(${p[0]}px, ${p[1]}px)`, opacity: show ? (back ? 0.6 : 1) : 0 }}>
      <circle r={r} fill="#b7c2d3" stroke="#e9eef6" strokeWidth={2} />
    </g>
  );
}

export function buildAustenitaMartensita(): AnimBuild {
  const corners: [number, number, number][] = [];
  for (const u of [0, 1]) for (const v of [0, 1]) for (const w of [0, 1]) corners.push([u, v, w]);
  const faces: [number, number, number][] = [
    [0.5, 0.5, 0],
    [0.5, 0.5, 1],
    [0.5, 0, 0.5],
    [0.5, 1, 0.5],
    [0, 0.5, 0.5],
    [1, 0.5, 0.5],
  ];
  const edges: [[number, number, number], [number, number, number]][] = [];
  for (const u of [0, 1]) for (const v of [0, 1]) edges.push([[u, v, 0], [u, v, 1]]);
  for (const u of [0, 1]) for (const w of [0, 1]) edges.push([[u, 0, w], [u, 1, w]]);
  for (const v of [0, 1]) for (const w of [0, 1]) edges.push([[0, v, w], [1, v, w]]);
  return {
    label: "Paso de la austenita (FCC) a la martensita (tetragonal) por enfriamiento rápido",
    beatMs: 4200,
    captions: [
      "A la temperatura de austenización el hierro $\\gamma$ tiene red **cúbica centrada en las caras (FCC)**. Admite hasta un $2{,}08\\,\\%$ de C en los huecos de las aristas.",
      "Con enfriamiento **lento** la red pasa a **BCC** (hierro $\\alpha$), que casi no admite carbono ($0{,}025\\,\\%$). El C sale y forma cementita $Fe_3C$: ferrita + cementita es perlita.",
      "Con enfriamiento **rápido** no hay tiempo para reordenar los átomos ni para que el carbono salga: queda **atrapado** en las aristas.",
      "La red cúbica se alarga en la dirección del carbono atrapado: pasa a **tetragonal centrada en el cuerpo (BCT)**. Es la **martensita**.",
      "Esa deformación crea **tensiones internas** muy grandes: de ahí la gran dureza (y fragilidad) de la martensita.",
    ],
    render: (beat) => {
      const fcc = beat === 0;
      const c = beat >= 3 ? 1.28 : 1;
      const cPos: [number, number, number] = beat === 0 ? [0.5, 0, 0] : [0, 0.5, 0];
      const carbonOut = beat === 1;
      const cp = cubePt(cPos[0], cPos[1], cPos[2], c);
      return (
        <Canvas>
          <g stroke={MANIM.muted} strokeWidth={2} opacity={0.7}>
            {edges.map(([a, b], i) => {
              const pa = cubePt(a[0], a[1], a[2], c);
              const pb = cubePt(b[0], b[1], b[2], c);
              return <line key={i} x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} strokeDasharray={a[2] === 1 && b[2] === 1 ? "6 5" : undefined} />;
            })}
          </g>
          {corners
            .filter(([, , w]) => w === 1)
            .map(([u, v, w], i) => (
              <FeAtom key={`b${i}`} p={cubePt(u, v, w, c)} r={14} back />
            ))}
          {faces
            .filter(([, , w]) => w === 1 || w === 0.5)
            .map(([u, v, w], i) => (
              <FeAtom key={`fb${i}`} p={cubePt(u, v, w, c)} r={14} show={fcc} back={w !== 0} />
            ))}
          <FeAtom p={cubePt(0.5, 0.5, 0.5, c)} r={14} show={!fcc} back />
          {corners
            .filter(([, , w]) => w === 0)
            .map(([u, v, w], i) => (
              <FeAtom key={`f${i}`} p={cubePt(u, v, w, c)} />
            ))}
          {faces
            .filter(([, , w]) => w === 0)
            .map(([u, v, w], i) => (
              <FeAtom key={`ff${i}`} p={cubePt(u, v, w, c)} show={fcc} />
            ))}
          <g className="anim-t" style={{ transform: `translate(${carbonOut ? cp[0] + 330 : cp[0]}px, ${carbonOut ? cp[1] - 90 : cp[1]}px)`, opacity: beat === 1 ? 0.9 : 1 }}>
            <circle r={9} fill="#0d1520" stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={0} y={5} size={11} color={MANIM.yellow} weight={800}>
              C
            </Txt>
          </g>
          <Txt x={CX0 + CS / 2 + 30} y={CY0 + 50} size={22} color={fcc ? MANIM.blue : beat === 1 ? MANIM.green : MANIM.orange}>
            {fcc ? "Austenita: FCC" : beat === 1 ? "Ferrita: BCC" : beat === 2 ? "BCC con C atrapado" : "Martensita: BCT"}
          </Txt>
          <Fade show={beat === 1} dx={30}>
            <rect x={540} y={100} width={200} height={50} rx={8} fill={MANIM.panel} stroke={MANIM.green} strokeWidth={2.5} />
            <Txt x={640} y={133} size={24} color={MANIM.green}>
              Fe₃C (cementita)
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <line x1={CX0 - 40} y1={cubePt(0, 0, 0, 1)[1]} x2={CX0 - 40} y2={cubePt(0, 1, 0, c)[1]} stroke={MANIM.red} strokeWidth={4} />
            <Txt x={CX0 - 56} y={(cubePt(0, 0, 0, 1)[1] + cubePt(0, 1, 0, c)[1]) / 2} size={20} color={MANIM.red} anchor="end">
              c &gt; a
            </Txt>
          </Fade>
          <Fade show={beat >= 4}>
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${480 + i * 46} 290 l 0 -${26 + i * 4} m -9 8 l 9 -9 l 9 9`} stroke={MANIM.red} strokeWidth={4} fill="none" strokeLinecap="round" />
            ))}
            <Txt x={570} y={330} size={21} color={MANIM.red}>
              tensiones internas → dureza
            </Txt>
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={520} y={180} size={20} color={MANIM.muted} anchor="start" weight={500}>
              Radio del Fe: 0,129 nm
            </Txt>
            <Txt x={520} y={214} size={20} color={MANIM.muted} anchor="start" weight={500}>
              Hueco máx.: 0,414 · R
            </Txt>
            <Txt x={520} y={248} size={20} color={MANIM.yellow} anchor="start" weight={600}>
              Carbono: 0,075 nm
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Ensayo Jominy ───────────── */

const JX = 400;
const JW = 340;
const jx = (d: number) => JX + (d / 50) * JW;
const jy = (h: number) => 340 - ((h - 20) / 50) * 270;
const jominyCurve = (hi: number, lo: number, len: number) => {
  const pts = Array.from({ length: 21 }, (_, i) => {
    const d = (i / 20) * 50;
    const h = lo + (hi - lo) * Math.exp(-((d / len) ** 1.6));
    return `${jx(d).toFixed(1)} ${jy(h).toFixed(1)}`;
  });
  return `M ${pts.join(" L ")}`;
};

export function buildJominyEnsayo(): AnimBuild {
  return {
    label: "Ensayo Jominy para medir la templabilidad de un acero",
    beatMs: 4200,
    captions: [
      "Una probeta normalizada de $25$ mm de diámetro y $100$ mm de longitud se calienta hasta la **temperatura de austenización**.",
      "Se saca del horno y se enfría **solo por un extremo** con un chorro de agua de caudal y temperatura constantes.",
      "La velocidad de enfriamiento es **máxima en el extremo** templado y **disminuye a lo largo** de la probeta: la estructura cambia con la distancia.",
      "Se rebaja una tira de $0{,}4$ mm y se mide la **dureza** a lo largo de los primeros $50$ mm: es la **curva de templabilidad**.",
      "Un acero de **alta templabilidad** mantiene valores altos de dureza a distancias largas; uno de baja templabilidad la pierde enseguida.",
    ],
    render: (beat) => (
      <Canvas>
        <defs>
          <linearGradient id="jominy-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={MANIM.blue} />
            <stop offset="0.35" stopColor={MANIM.yellow} />
            <stop offset="1" stopColor={MANIM.red} />
          </linearGradient>
        </defs>
        <rect x={110} y={50} width={56} height={280} rx={4} fill={beat === 0 ? MANIM.red : "url(#jominy-grad)"} fillOpacity={0.9} className="anim-t" style={{ opacity: beat >= 2 ? 1 : beat === 0 ? 0.95 : 0.9 }} />
        <rect x={110} y={50} width={56} height={280} rx={4} fill="none" stroke={MANIM.ink} strokeWidth={2.5} />
        <rect x={160} y={52} width={14} height={278} fill={MANIM.panel} opacity={0.6} />
        <Fade show={beat === 0}>
          <Txt x={138} y={36} size={19} color={MANIM.red}>
            T austenización
          </Txt>
        </Fade>
        <Fade show={beat >= 1} dy={20}>
          <rect x={126} y={330} width={24} height={60} fill={MANIM.blue} fillOpacity={0.85} />
          {[-1, 0, 1].map((k) => (
            <path key={k} d={`M ${138} 332 q ${k * 36} 12 ${k * 52} 30`} stroke={MANIM.blue} strokeWidth={4} fill="none" />
          ))}
          <Txt x={138} y={408} size={18} color={MANIM.blue}>
            chorro de agua
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={230} y={320} size={17} color={MANIM.blue} anchor="start" weight={600}>
            enfriamiento rápido
          </Txt>
          <Txt x={230} y={90} size={17} color={MANIM.red} anchor="start" weight={600}>
            enfriamiento lento
          </Txt>
        </Fade>
        <Axes x0={JX} y0={340} x1={JX + JW + 30} y1={46} yLabel="Dureza (HRC)" />
        <Txt x={JX + JW / 2} y={394} size={17} color={MANIM.muted} weight={500}>
          Distancia al extremo templado (mm)
        </Txt>
        {[0, 10, 20, 30, 40, 50].map((d) => (
          <Txt key={d} x={jx(d)} y={362} size={14} color={MANIM.muted} weight={500}>
            {d}
          </Txt>
        ))}
        <DrawPath show={beat >= 3} d={jominyCurve(62, 24, 9)} color={MANIM.orange} width={5} />
        <Fade show={beat >= 3}>
          <Txt x={jx(18)} y={jy(30)} size={18} color={MANIM.orange} anchor="start">
            baja templabilidad
          </Txt>
        </Fade>
        <DrawPath show={beat >= 4} d={jominyCurve(62, 36, 38)} color={MANIM.green} width={5} />
        <Fade show={beat >= 4}>
          <Txt x={jx(24)} y={jy(55)} size={18} color={MANIM.green} anchor="start">
            alta templabilidad
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Diagrama TTT ───────────── */

const TX = (x: number) => 100 + ((x - TTT_X_MIN) / (TTT_X_MAX - TTT_X_MIN)) * 620;
const TY = (t: number) => 365 - t * 0.4;
const tttPath = (pts: readonly Pt2[]) => `M ${pts.map(([x, t]) => `${TX(x).toFixed(1)} ${TY(t).toFixed(1)}`).join(" L ")}`;

export function tttCoolingPath(m: number): string {
  const x1 = coolingEndX(m);
  return `M ${TX(TTT_X_MIN)} ${TY(800)} L ${TX(x1)} ${TY(coolingT(m, x1))}`;
}

export { TX as tttX, TY as tttY, tttPath };

export function buildTttLectura(): AnimBuild {
  const cools = [
    { m: 21.4, color: MANIM.blue, label: "v₁: lento" },
    { m: 155, color: MANIM.green, label: "v₂: medio" },
    { m: 500, color: MANIM.red, label: "v₃: rápido" },
  ];
  return {
    label: "Lectura de las curvas TTT de un acero eutectoide",
    beatMs: 4200,
    captions: [
      "Las curvas **TTT** (tiempo–temperatura–transformación) dicen cuánto tiempo hace falta, a cada temperatura, para que empiece y acabe una transformación. Arriba de $A_1$ todo es **austenita**.",
      "$P_s$ marca el **inicio** de la transformación a perlita y $P_f$ el **final**. Por su forma se llaman también curvas «S».",
      "Si la austenita se enfría un poco más deprisa, se transforma en **bainita**: $B_s$ (inicio) y $B_f$ (fin).",
      "Las líneas horizontales $M_s$ y $M_f$ marcan el inicio y el final de la transformación **martensítica**, que ocurre sin tiempo de espera.",
      "El resultado depende de la **velocidad de enfriamiento**: $v_1$ da perlita gruesa, $v_2$ perlita fina y bainita, y $v_3$, que esquiva las curvas «S» y corta $M_s$, da **martensita**.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={100} y0={365} x1={745} y1={34} xLabel="Tiempo (s), escala logarítmica" yLabel="Temperatura (°C)" />
        {[-1, 0, 1, 2, 3, 4, 5, 6].map((x) => (
          <g key={x}>
            <line x1={TX(x)} y1={365} x2={TX(x)} y2={371} stroke={MANIM.muted} strokeWidth={2} />
            <Txt x={TX(x)} y={388} size={14} color={MANIM.muted} weight={500}>
              {["0,1", "1", "10", "10²", "10³", "10⁴", "10⁵", "10⁶"][x + 1]}
            </Txt>
          </g>
        ))}
        <line x1={100} y1={TY(TTT_A1)} x2={720} y2={TY(TTT_A1)} stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="8 6" />
        <Txt x={96} y={TY(TTT_A1) - 8} size={17} color={MANIM.yellow} anchor="end">
          A₁
        </Txt>
        <Txt x={420} y={TY(TTT_A1) - 16} size={20} color={MANIM.blue}>
          Austenita (hierro γ)
        </Txt>
        <DrawPath show={beat >= 1} d={tttPath(TTT_PS)} color={MANIM.red} width={4.5} />
        <DrawPath show={beat >= 1} d={tttPath(TTT_PF)} color="#3bb8a6" width={4.5} />
        <Fade show={beat >= 1}>
          <Txt x={TX(1.2)} y={TY(620)} size={18} color={MANIM.red}>
            Ps
          </Txt>
          <Txt x={TX(5.1)} y={TY(655)} size={18} color="#3bb8a6">
            Pf
          </Txt>
          <Txt x={TX(2.2)} y={TY(700)} size={17} color={MANIM.muted} weight={600}>
            Perlita
          </Txt>
        </Fade>
        <DrawPath show={beat >= 2} d={tttPath(TTT_BS)} color={MANIM.orange} width={4.5} />
        <DrawPath show={beat >= 2} d={tttPath(TTT_BF)} color="#b07a52" width={4.5} />
        <Fade show={beat >= 2}>
          <Txt x={TX(1.3)} y={TY(380)} size={18} color={MANIM.orange}>
            Bs
          </Txt>
          <Txt x={TX(4.2)} y={TY(352)} size={17} color={MANIM.muted} weight={600}>
            Bainita
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={100} y1={TY(TTT_MS)} x2={720} y2={TY(TTT_MS)} stroke={MANIM.blue} strokeWidth={3} />
          <line x1={100} y1={TY(TTT_MF)} x2={720} y2={TY(TTT_MF)} stroke="#5b6cff" strokeWidth={3} />
          <Txt x={96} y={TY(TTT_MS) + 5} size={16} color={MANIM.blue} anchor="end">
            Ms
          </Txt>
          <Txt x={96} y={TY(TTT_MF) + 5} size={16} color="#8b97ff" anchor="end">
            Mf
          </Txt>
          <Txt x={TX(5.4)} y={TY(165)} size={17} color={MANIM.muted} weight={600}>
            γ + M
          </Txt>
          <Txt x={TX(5.4)} y={TY(52)} size={17} color={MANIM.muted} weight={600}>
            Martensita
          </Txt>
        </Fade>
        {cools.map((c, i) => {
          const x1 = coolingEndX(c.m);
          const ex = TX(x1);
          const ey = TY(coolingT(c.m, x1));
          return (
            <g key={c.m}>
              <DrawPath show={beat >= 4} d={tttCoolingPath(c.m)} color={c.color} width={3} delay={i * 350} />
              <Fade show={beat >= 4} delay={i * 350 + 400}>
                <Txt x={i === 0 ? ex - 6 : i === 1 ? ex - 8 : ex + 10} y={i === 0 ? ey + 28 : i === 1 ? ey - 12 : ey - 8} size={16} color={c.color} anchor={i === 0 ? "end" : i === 1 ? "end" : "start"}>
                  {c.label}: {tttResult(c.m).name}
                </Txt>
              </Fade>
            </g>
          );
        })}
      </Canvas>
    ),
  };
}

/* ───────────── Ciclos de tratamiento térmico ───────────── */

const CYCLES: { name: string; d: string; color: string; note: string }[] = [
  { name: "Normalizado", d: "M110 360 L170 100 L300 100 C360 150 420 300 520 360", color: MANIM.blue, note: "calentar 55–85 °C por encima de $A_3$ y enfriar al aire" },
  { name: "Temple total", d: "M110 360 L170 100 L300 100 L330 345 L345 360", color: MANIM.orange, note: "austenizar por encima de $A_3$ (hipoeutectoides) y enfriar rápido hasta pasar $M_f$" },
  { name: "Temple incompleto", d: "M110 360 L170 150 L300 150 L325 360", color: MANIM.green, note: "hipereutectoides: unos 50 °C por encima de $A_1$; queda cementita sin disolver" },
  { name: "Martempering", d: "M110 360 L170 100 L280 100 L300 270 L450 270 C500 280 520 330 560 360", color: MANIM.purple, note: "se mantiene en baño de sales justo por encima de $M_s$ y luego se enfría" },
  { name: "Austempering", d: "M110 360 L170 100 L280 100 L300 220 L560 220 L600 360", color: MANIM.yellow, note: "se mantiene el tiempo suficiente para que la austenita se transforme en bainita" },
  { name: "Revenido", d: "M110 360 L200 190 L330 190 C400 230 450 300 500 360", color: MANIM.red, note: "se calienta la pieza templada por debajo de $A_1$ y se enfría más bien rápido" },
];

export function buildCiclosTratamiento(): AnimBuild {
  const yAc3 = 120;
  const yAc1 = 170;
  const yMs = 285;
  const yMf = 325;
  return {
    label: "Ciclos de temperatura en función del tiempo del normalizado, el temple y el revenido",
    beatMs: 4200,
    captions: [
      "Todos los ciclos tienen tres partes: **calentar**, **mantener** y **enfriar**. Las líneas de referencia son $A_{c3}$, $A_{c1}$, $M_s$ y $M_f$.",
      ...CYCLES.map((c) => `**${c.name}**: ${c.note}.`),
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={90} y0={370} x1={750} y1={40} xLabel="Tiempo" yLabel="Temperatura" />
        {[
          { y: yAc3, label: "Ac3", color: MANIM.red },
          { y: yAc1, label: "Ac1", color: MANIM.orange },
          { y: yMs, label: "Ms", color: MANIM.blue },
          { y: yMf, label: "Mf", color: "#8b97ff" },
        ].map((l) => (
          <g key={l.label}>
            <line x1={90} y1={l.y} x2={730} y2={l.y} stroke={l.color} strokeWidth={1.8} strokeDasharray="6 7" opacity={0.7} />
            <Txt x={736} y={l.y + 5} size={15} color={l.color} anchor="start">
              {l.label}
            </Txt>
          </g>
        ))}
        {CYCLES.map((c, i) => (
          <DrawPath key={c.name} show={beat === i + 1} d={c.d} color={c.color} width={5} />
        ))}
        <Fade show={beat >= 1}>
          <Txt x={640} y={90} size={24} color={CYCLES[Math.max(0, beat - 1)]!.color}>
            {CYCLES[Math.max(0, beat - 1)]!.name}
          </Txt>
        </Fade>
        <Fade show={beat === 2 || beat === 3}>
          <Txt x={420} y={336} size={16} color={MANIM.muted} weight={500}>
            agua, aceite o aire
          </Txt>
        </Fade>
        <Fade show={beat === 5}>
          <Txt x={440} y={254} size={16} color={MANIM.yellow} weight={500}>
            bainita
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Cementación ───────────── */

export function buildCementacionDifusion(): AnimBuild {
  const px = 80;
  const pw = 280;
  const top = 200;
  return {
    label: "Cementación: el carbono difunde en la superficie de un acero de bajo carbono",
    beatMs: 4200,
    captions: [
      "Una pieza de acero de bajo carbono ($0{,}2\\,\\%$ C) se calienta por encima de $A_3$, en estado de **austenita**, dentro de una atmósfera rica en monóxido de carbono.",
      "En la superficie ocurre la reacción $Fe_\\gamma + 2CO \\rightarrow (Fe_\\gamma + C) + CO_2$: el carbono se disuelve en el hierro.",
      "Con el tiempo el carbono **difunde hacia el interior**: la capa cementada crece. Su espesor depende del tiempo y de la temperatura.",
      "Tras el **temple**, la capa rica en carbono queda muy dura (martensita) y el núcleo sigue blando y **tenaz**: dureza superficial y resiliencia interior.",
    ],
    render: (beat) => {
      const caseDepth = beat === 0 ? 0 : beat === 1 ? 14 : 52;
      const dots = Array.from({ length: 26 }, (_, i) => ({ i, x: px + 12 + rnd(i) * (pw - 24), y: top + 6 + rnd(i, 1) * 48 }));
      return (
        <Canvas>
          <rect x={px} y={top} width={pw} height={170} fill="#8b97a6" fillOpacity={0.55} stroke={MANIM.muted} strokeWidth={2.5} />
          <rect x={px} y={top} width={pw} height={caseDepth} fill={MANIM.orange} fillOpacity={0.55} className="anim-t" style={{ transition: "height 1.2s ease" }} />
          {beat >= 2 ? (
            <line x1={px} y1={top + caseDepth} x2={px + pw} y2={top + caseDepth} stroke={MANIM.orange} strokeWidth={3} strokeDasharray="8 6" />
          ) : null}
          {dots.map(({ i, x, y }) => (
            <circle key={i} className="anim-t" cx={x} cy={top + 6} r={3.5} fill="#0d1520" stroke={MANIM.yellow} strokeWidth={1.5} style={{ transform: `translateY(${beat === 0 ? -30 : beat === 1 ? Math.min(y - top, 16) - 4 : y - top - 6}px)`, opacity: beat === 0 ? 0 : 1, transitionDelay: `${(i % 6) * 80}ms` }} />
          ))}
          <Fade show={beat <= 1}>
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i} className="anim-t" style={{ transform: `translate(${px + 20 + i * 34}px, ${beat === 0 ? 120 + (i % 2) * 20 : 150 + (i % 2) * 14}px)` }}>
                <circle r={9} fill={MANIM.blue} fillOpacity={0.8} />
                <circle cx={14} r={7} fill={MANIM.red} fillOpacity={0.9} />
              </g>
            ))}
            <Txt x={px + pw / 2} y={96} size={20} color={MANIM.blue}>
              CO (atmósfera cementante)
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <Txt x={px + pw / 2} y={186} size={18} color={MANIM.yellow}>
              Fe + 2CO → (Fe + C) + CO₂
            </Txt>
          </Fade>
          <Txt x={px + pw / 2} y={top + 200} size={20} color={MANIM.muted} weight={500}>
            {beat >= 3 ? "Núcleo: blando y tenaz" : "Acero de 0,2 % de C"}
          </Txt>
          <Fade show={beat >= 2}>
            <Txt x={px + pw / 2} y={top + caseDepth + 26} size={18} color={MANIM.orange}>
              capa cementada
            </Txt>
          </Fade>
          <Axes x0={470} y0={370} x1={750} y1={90} xLabel="Profundidad" yLabel="Dureza" />
          <DrawPath show={beat >= 3} d="M 470 150 L 520 152 C 570 160 600 250 640 330 L 740 340" color={MANIM.orange} width={5} />
          <Fade show={beat >= 3}>
            <Txt x={540} y={130} size={17} color={MANIM.orange}>
              superficie dura
            </Txt>
            <Txt x={680} y={320} size={17} color={MANIM.green}>
              núcleo tenaz
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Pila electroquímica Fe–Cu ───────────── */

export function buildPilaCorrosion(): AnimBuild {
  const fx = 250;
  const cx = 530;
  const top = 150;
  const bot = 312;
  return {
    label: "Pila electroquímica de hierro y cobre: ánodo, cátodo y flujo de electrones",
    beatMs: 4200,
    captions: [
      "Una barra de **hierro** y otra de **cobre** en disoluciones $1$ M de sus iones, separadas por una membrana semipermeable. Con el circuito abierto el voltímetro marcaría $0{,}78$ V.",
      "Al cerrar el circuito, los **electrones** circulan por el cable desde el hierro hacia el cobre.",
      "**Ánodo (Fe)**: se oxida, $Fe \\rightarrow Fe^{2+} + 2e^-$. La barra va perdiendo material y pasa a la disolución: se **corroe**.",
      "**Cátodo (Cu)**: se reduce, $Cu^{2+} + 2e^- \\rightarrow Cu$. El cobre se **deposita** sobre la barra (electrodeposición).",
      "En conjunto: $Cu^{2+} + Fe \\rightarrow Cu + Fe^{2+}$. La diferencia de potencial es $0{,}34 - (-0{,}44) = 0{,}78$ V.",
    ],
    render: (beat) => {
      const closed = beat >= 1;
      return (
        <Canvas>
          <rect x={180} y={top - 20} width={190} height={bot - top + 40} fill={MANIM.blue} fillOpacity={0.14} />
          <rect x={460} y={top - 20} width={190} height={bot - top + 40} fill={MANIM.orange} fillOpacity={0.12} />
          <line x1={415} y1={top - 30} x2={415} y2={bot + 30} stroke={MANIM.muted} strokeWidth={2.5} strokeDasharray="7 7" />
          <Txt x={415} y={bot + 52} size={15} color={MANIM.muted} weight={500}>
            membrana
          </Txt>
          <Txt x={275} y={bot + 52} size={17} color={MANIM.blue}>
            Fe²⁺ 1 M
          </Txt>
          <Txt x={555} y={bot + 52} size={17} color={MANIM.orange}>
            Cu²⁺ 1 M
          </Txt>
          <rect x={fx - 14} y={top - 70} width={28} height={bot - top + 70} fill="#8b9bb3" className="anim-t" style={{ transform: `scaleY(${beat >= 2 ? 0.82 : 1})`, transformOrigin: `${fx}px ${bot}px` }} />
          <rect x={cx - 14} y={top - 70} width={28} height={bot - top + 70} fill="#d98b4f" className="anim-t" style={{ transform: `scaleX(${beat >= 3 ? 1.35 : 1})`, transformOrigin: `${cx}px ${bot}px` }} />
          <Txt x={fx} y={top - 80} size={19} color={MANIM.ink}>
            Fe
          </Txt>
          <Txt x={cx} y={top - 80} size={19} color={MANIM.ink}>
            Cu
          </Txt>
          <path d={`M ${fx} ${top - 70} L ${fx} 52 L ${cx} 52 L ${cx} ${top - 70}`} stroke={MANIM.ink} strokeWidth={3} fill="none" />
          <circle cx={(fx + cx) / 2} cy={52} r={24} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={(fx + cx) / 2} y={58} size={16} color={MANIM.yellow}>
            {closed ? "V" : "0,78 V"}
          </Txt>
          {[0, 1, 2].map((i) => (
            <g key={i} className="anim-t" style={{ transform: `translate(${closed ? 70 + i * 40 : 0}px, 0)`, opacity: closed ? 1 : 0 }}>
              <circle cx={fx + 20 + i * 12} cy={52} r={6} fill={MANIM.yellow} />
            </g>
          ))}
          <Fade show={closed}>
            <path d={`M ${fx + 40} 30 L ${cx - 40} 30`} stroke={MANIM.yellow} strokeWidth={3} markerEnd="url(#pila-arrow)" />
            <polygon points={`${cx - 40},30 ${cx - 52},24 ${cx - 52},36`} fill={MANIM.yellow} />
            <Txt x={(fx + cx) / 2} y={20} size={16} color={MANIM.yellow}>
              e⁻
            </Txt>
          </Fade>
          <Fade show={beat >= 2} dx={-10}>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx={fx + 36 + i * 22} cy={top + 20 + i * 50} r={11} fill={MANIM.blue} fillOpacity={0.9} />
                <Txt x={fx + 36 + i * 22} y={top + 25 + i * 50} size={10} color={MANIM.surface} weight={800}>
                  Fe²⁺
                </Txt>
              </g>
            ))}
            <Txt x={fx} y={bot + 82} size={17} color={MANIM.red}>
              ÁNODO: Fe → Fe²⁺ + 2e⁻
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={cx - 30 - i * 20} cy={top + 60 + i * 40} r={9} fill={MANIM.orange} />
            ))}
            <Txt x={cx} y={bot + 82} size={17} color={MANIM.green}>
              CÁTODO: Cu²⁺ + 2e⁻ → Cu
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Corrosión por aireación diferencial ───────────── */

export function buildAireacionDiferencial(): AnimBuild {
  const plate = "M 150 70 L 650 70 L 650 190 L 330 190 L 330 230 L 650 230 L 650 330 L 150 330 Z";
  return {
    label: "Corrosión por aireación diferencial en una rendija de una unión metálica",
    beatMs: 4200,
    captions: [
      "En una unión remachada o con rendijas se acumulan suciedad y humedad: el agua llena el hueco entre las dos piezas de acero.",
      "El oxígeno llega fácilmente a la zona **exterior**, pero se consume en el **interior** de la rendija y allí no se puede renovar.",
      "La zona **pobre en oxígeno** actúa como **ánodo** ($Fe \\rightarrow Fe^{2+} + 2e^-$) y la **exterior**, bien aireada, como **cátodo** ($O_2 + 2H_2O + 4e^- \\rightarrow 4OH^-$). Los electrones circulan por el metal.",
      "Los iones $OH^-$ se combinan con $Fe^{2+}$ y forman $Fe(OH)_2$, herrumbre. El hueco crece y la corrosión se acelera. Se evita **soldando** y sin zonas estancas.",
    ],
    render: (beat) => (
      <Canvas>
        <path d={plate} fill="#8b97a6" fillOpacity={0.5} stroke={MANIM.muted} strokeWidth={3} strokeLinejoin="round" />
        <rect x={330} y={190} width={320} height={40} fill={MANIM.blue} fillOpacity={0.35} />
        <Txt x={250} y={40} size={18} color={MANIM.muted} weight={500}>
          pieza superior
        </Txt>
        <Txt x={250} y={364} size={18} color={MANIM.muted} weight={500}>
          pieza inferior
        </Txt>
        <Txt x={490} y={215} size={17} color={MANIM.blue} weight={600}>
          rendija con agua
        </Txt>
        <Fade show={beat >= 1}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle cx={690 + (i % 2) * 22} cy={150 + i * 34} r={12} fill={MANIM.green} fillOpacity={0.95} />
              <Txt x={690 + (i % 2) * 22} y={155 + i * 34} size={11} color={MANIM.surface} weight={800}>
                O₂
              </Txt>
            </g>
          ))}
          <Txt x={725} y={116} size={18} color={MANIM.green}>
            mucho O₂
          </Txt>
          <Txt x={400} y={256} size={16} color={MANIM.muted} weight={500}>
            poco O₂
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <rect x={150} y={210} width={180} height={20} fill={MANIM.red} fillOpacity={0.6} />
          <Txt x={240} y={290} size={20} color={MANIM.red}>
            ÁNODO
          </Txt>
          <Txt x={240} y={312} size={15} color={MANIM.red} weight={500}>
            (interior, sin O₂)
          </Txt>
          <rect x={560} y={236} width={90} height={14} fill={MANIM.green} fillOpacity={0.6} />
          <Txt x={605} y={278} size={20} color={MANIM.green}>
            CÁTODO
          </Txt>
          <Txt x={605} y={300} size={15} color={MANIM.green} weight={500}>
            (exterior)
          </Txt>
          <path d="M 300 262 C 330 340 520 360 600 262" stroke={MANIM.yellow} strokeWidth={3.5} fill="none" strokeDasharray="9 6" />
          <polygon points="600,262 588,270 598,277" fill={MANIM.yellow} />
          <Txt x={450} y={378} size={17} color={MANIM.yellow}>
            e⁻ por el metal
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          {[0, 1].map((i) => (
            <g key={i}>
              <circle cx={350 + i * 34} cy={206} r={11} fill={MANIM.blue} />
              <Txt x={350 + i * 34} y={210} size={9} color={MANIM.surface} weight={800}>
                Fe²⁺
              </Txt>
            </g>
          ))}
          <ellipse cx={318} cy={210} rx={22} ry={13} fill="#a4572c" />
          <Txt x={300} y={186} size={17} color="#e0a077" anchor="end">
            Fe(OH)₂ herrumbre
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Protección catódica ───────────── */

export function buildProteccionCatodica(): AnimBuild {
  const ax = 200;
  const bx = 600;
  const py = 270;
  return {
    label: "Protección catódica con ánodo de sacrificio y con corriente impuesta",
    beatMs: 4200,
    captions: [
      "Una **tubería de acero enterrada** se corroe: algunas zonas de su superficie actúan como ánodo y pierden metal.",
      "**Ánodo de sacrificio**: se conecta a la tubería un metal con potencial **menor** (Mg). El magnesio se corroe ($Mg \\rightarrow Mg^{2+} + 2e^-$) y la tubería pasa a ser **cátodo**.",
      "**Corriente impuesta**: una fuente de corriente continua conecta su polo **negativo** a la tubería y el positivo a chatarra de hierro, que hace de ánodo. Fuerza a la tubería a actuar de cátodo.",
      "En los dos casos el metal que se protege **deja de ser ánodo** y se fuerza a que sea **cátodo**.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={20} y={110} width={760} height={260} fill="#6a5a45" fillOpacity={0.35} />
        <line x1={20} y1={110} x2={780} y2={110} stroke={MANIM.muted} strokeWidth={3} />
        <Txt x={400} y={98} size={15} color={MANIM.muted} weight={500}>
          pavimento
        </Txt>
        {[ax, bx].map((x, k) => (
          <g key={x}>
            <circle cx={x - 60} cy={py} r={44} fill="#8b97a6" fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={4} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={x - 60 + 44 * Math.cos((i * Math.PI) / 3)} y1={py + 44 * Math.sin((i * Math.PI) / 3)} x2={x - 60 + 30 * Math.cos((i * Math.PI) / 3)} y2={py + 30 * Math.sin((i * Math.PI) / 3)} stroke={MANIM.muted} strokeWidth={2} />
            ))}
            <Fade show={beat === 0 || (k === 0 && beat > 2) || (k === 1 && beat > 2)}>
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={x - 60 + 54 * Math.cos(-0.6 + i * 0.7)} cy={py + 54 * Math.sin(-0.6 + i * 0.7)} r={5} fill={MANIM.red} />
              ))}
            </Fade>
          </g>
        ))}
        <Fade show={beat === 0}>
          <Txt x={400} y={190} size={20} color={MANIM.red}>
            la tubería se corroe
          </Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <rect x={ax + 70} y={py - 40} width={70} height={80} fill={MANIM.blue} fillOpacity={0.8} stroke={MANIM.blue} strokeWidth={3} />
          <Txt x={ax + 105} y={py + 8} size={24} color={MANIM.surface} weight={800}>
            Mg
          </Txt>
          <path d={`M ${ax - 16} ${py - 44} L ${ax - 16} 140 L ${ax + 105} 140 L ${ax + 105} ${py - 40}`} stroke={MANIM.green} strokeWidth={3} fill="none" />
          <Txt x={ax + 150} y={py - 56} size={14} color={MANIM.blue} anchor="start">
            Mg²⁺ →
          </Txt>
          <path d={`M ${ax + 105} 150 L ${ax - 10} 150`} stroke={MANIM.yellow} strokeWidth={3} />
          <polygon points={`${ax - 10},150 ${ax},144 ${ax},156`} fill={MANIM.yellow} />
          <Txt x={ax + 40} y={142} size={14} color={MANIM.yellow}>
            e⁻
          </Txt>
          <Txt x={ax - 20} y={py + 76} size={19} color={MANIM.green}>
            a) ánodo de sacrificio
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <rect x={bx - 100} y={128} width={110} height={44} rx={6} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={bx - 45} y={156} size={17} color={MANIM.yellow}>
            fuente c.c.
          </Txt>
          <path d={`M ${bx - 76} 172 L ${bx - 76} ${py - 44}`} stroke={MANIM.yellow} strokeWidth={3} fill="none" />
          <path d={`M ${bx - 2} 172 L ${bx - 2} ${py - 22}`} stroke={MANIM.yellow} strokeWidth={3} fill="none" />
          <rect x={bx - 20} y={py - 20} width={90} height={60} fill="#7b8798" stroke={MANIM.muted} strokeWidth={3} />
          <Txt x={bx + 25} y={py + 16} size={15} color={MANIM.ink} weight={600}>
            chatarra
          </Txt>
          <Txt x={bx - 90} y={186} size={18} color={MANIM.red}>
            −
          </Txt>
          <Txt x={bx + 4} y={186} size={18} color={MANIM.red}>
            +
          </Txt>
          <Txt x={bx - 40} y={py + 76} size={19} color={MANIM.green}>
            b) corriente impuesta
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Desgaste por rozamiento ───────────── */

function teeth(x0: number, x1: number, y: number, up: number, n: number, jitter = 0): string {
  const w = (x1 - x0) / n;
  const pts: string[] = [`${x0},${y}`];
  for (let i = 0; i < n; i += 1) {
    const h = up * (1 + (jitter ? (rnd(i, 7) - 0.5) * jitter : 0));
    pts.push(`${(x0 + i * w + w / 2).toFixed(1)},${(y + h).toFixed(1)}`, `${(x0 + (i + 1) * w).toFixed(1)},${y}`);
  }
  return pts.join(" ");
}

export function buildDesgasteAsperezas(): AnimBuild {
  return {
    label: "Desgaste de dos superficies en contacto y movimiento relativo",
    beatMs: 4200,
    captions: [
      "Dos superficies metálicas en contacto y con **movimiento relativo** presionan una contra otra. A escala microscópica ambas son **rugosas**.",
      "Los salientes de la rugosidad **se encajan**: al moverse, las crestas de una chocan con las de la otra.",
      "Una cresta se **rompe** y se desprende una partícula (el «atasco» provoca la rotura): hay pérdida de material.",
      "Las partículas desprendidas actúan como **abrasivo**: erosionan la superficie y crean nuevas asperezas que vuelven a encajarse y a partirse.",
    ],
    render: (beat) => {
      const shift = beat === 0 ? 0 : beat === 1 ? 16 : 40;
      return (
        <Canvas>
          <polygon points={`${teeth(120, 680, 300, 26, 14, beat >= 3 ? 1.4 : 0)} 680,380 120,380`} fill="#8b97a6" fillOpacity={0.6} stroke={MANIM.muted} strokeWidth={2.5} />
          <g className="anim-t" style={{ transform: `translateX(${shift}px)` }}>
            <polygon points={`${teeth(120, 680, 262, -26, 14)} 680,160 120,160`} fill="#8b97a6" fillOpacity={0.6} stroke={MANIM.muted} strokeWidth={2.5} />
          </g>
          <Fade show={beat >= 0}>
            <path d="M 400 100 L 400 140" stroke={MANIM.red} strokeWidth={5} />
            <polygon points="400,148 390,132 410,132" fill={MANIM.red} />
            <Txt x={420} y={120} size={20} color={MANIM.red} anchor="start">
              esfuerzo
            </Txt>
            <path d="M 150 120 L 230 120" stroke={MANIM.green} strokeWidth={5} />
            <polygon points="238,120 222,110 222,130" fill={MANIM.green} />
            <Txt x={150} y={104} size={20} color={MANIM.green} anchor="start">
              movimiento
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <circle cx={400} cy={282} r={34} fill="none" stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="7 6" />
            <Txt x={400} y={344} size={19} color={MANIM.yellow}>
              encaje de las crestas
            </Txt>
          </Fade>
          <Fade show={beat >= 2} dy={-20}>
            <polygon points="396,290 408,290 402,277" fill={MANIM.orange} />
            <g className="anim-t" style={{ transform: `translateY(${beat >= 3 ? 40 : 0}px)` }}>
              <polygon points="450,278 462,278 456,266" fill={MANIM.orange} />
              <polygon points="320,282 330,282 325,271" fill={MANIM.orange} />
            </g>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={460} y={344} size={19} color={MANIM.orange}>
              se desprende una partícula
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={400} y={400} size={19} color={MANIM.orange}>
              partículas abrasivas → nuevas asperezas
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Cavitación ───────────── */

export function buildCavitacion(): AnimBuild {
  const wy = 330;
  return {
    label: "Erosión líquida por cavitación: crecimiento y colapso de una burbuja junto a una pared",
    beatMs: 4200,
    captions: [
      "Un líquido con burbujas de gas entra en una región de **baja presión** (hélices, rotores, bombas hidráulicas).",
      "Allí las burbujas **crecen**.",
      "Al volver a una zona de mayor presión, las burbujas **colapsan** de golpe y la onda de choque ejerce **presiones de cientos de atmósferas** contra un punto de la pared.",
      "La pared pierde material: se forman **picaduras**. Se evita bajando la velocidad, con aceros duros o recubrimientos poliméricos que amortigüen el impacto.",
    ],
    render: (beat) => {
      const r = beat === 0 ? 20 : beat === 1 ? 62 : beat === 2 ? 14 : 0;
      return (
        <Canvas>
          <rect x={0} y={60} width={800} height={wy - 60} fill={MANIM.blue} fillOpacity={0.12} />
          <rect x={0} y={wy} width={800} height={90} fill="#8b97a6" fillOpacity={0.6} />
          <line x1={0} y1={wy} x2={800} y2={wy} stroke={MANIM.muted} strokeWidth={3} />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} className="anim-t" cx={120 + i * 150} cy={120 + (i % 2) * 40} r={beat === 1 ? 10 : 6} fill="none" stroke={MANIM.blue} strokeWidth={2} opacity={0.6} />
          ))}
          <g className="anim-t" style={{ transform: `translate(400px, ${beat >= 2 ? 262 : 215}px)` }}>
            <circle r={r} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={3} className="anim-t" />
          </g>
          <Fade show={beat === 2} scale={0.3}>
            {[40, 70, 100].map((rad, i) => (
              <circle key={rad} cx={400} cy={wy - 10} r={rad} fill="none" stroke={MANIM.yellow} strokeWidth={3} opacity={1 - i * 0.28} />
            ))}
            <path d="M 400 280 L 400 322" stroke={MANIM.red} strokeWidth={5} />
            <polygon points="400,330 391,314 409,314" fill={MANIM.red} />
          </Fade>
          <Fade show={beat >= 3}>
            <path d={`M 385 ${wy} Q 400 ${wy + 28} 415 ${wy}`} fill={MANIM.surface} stroke={MANIM.red} strokeWidth={3} />
            <polygon points={`370,${wy + 6} 380,${wy + 6} 375,${wy - 6}`} fill={MANIM.orange} />
            <polygon points={`430,${wy + 6} 440,${wy + 6} 435,${wy - 6}`} fill={MANIM.orange} />
            <Txt x={400} y={wy + 62} size={20} color={MANIM.red}>
              picadura en la pared
            </Txt>
          </Fade>
          <Txt x={400} y={44} size={21} color={MANIM.blue}>
            {beat === 0 ? "Zona de baja presión" : beat === 1 ? "La burbuja crece" : beat === 2 ? "Colapso: onda de choque" : "Erosión del material"}
          </Txt>
        </Canvas>
      );
    },
  };
}
