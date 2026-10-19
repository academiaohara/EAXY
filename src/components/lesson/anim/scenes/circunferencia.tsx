import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, RightMark, Seg, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Circunferencia y círculo ───────────── */

const C0: Pt = [240, 215];
const R0 = 140;

export function buildCircunferenciaElementos(): AnimBuild {
  return {
    label: "La circunferencia es la línea que rodea al círculo; se señalan el centro, el radio, el diámetro, una cuerda y un arco",
    captions: [
      "La **circunferencia** es la **línea** formada por todos los puntos que están a la misma distancia del centro.",
      "El **círculo** es la superficie que queda dentro: la circunferencia es solo su contorno.",
      "El **radio** $r$ une el centro con cualquier punto de la circunferencia.",
      "El **diámetro** $d$ es una cuerda que pasa por el centro y mide el doble que el radio: $d = 2r$.",
      "Una **cuerda** une dos puntos de la circunferencia; cada trozo de circunferencia entre ellos es un **arco**.",
    ],
    render: (beat) => {
      const rEnd: Pt = [C0[0] + R0 * Math.cos(-0.5), C0[1] + R0 * Math.sin(-0.5)];
      const cA: Pt = [C0[0] - R0 * Math.sin(0.9), C0[1] - R0 * Math.cos(0.9)];
      const cB: Pt = [C0[0] + R0 * Math.sin(0.9), C0[1] - R0 * Math.cos(0.9)];
      return (
        <Canvas>
          <circle cx={C0[0]} cy={C0[1]} r={R0} fill={MANIM.blue} fillOpacity={beat >= 1 ? 0.2 : 0} stroke={MANIM.blue} strokeWidth={beat === 0 ? 7 : 4} className="anim-t" />
          <Fade show={beat >= 2}>
            <Dot p={C0} color={MANIM.yellow} r={6} />
            <Txt x={C0[0] - 16} y={C0[1] + 26} size={24} color={MANIM.yellow}>O</Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Seg a={C0} b={rEnd} color={MANIM.yellow} width={4} />
            <Txt x={(C0[0] + rEnd[0]) / 2 + 6} y={(C0[1] + rEnd[1]) / 2 - 14} size={26} color={MANIM.yellow}>r</Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Seg a={[C0[0] - R0, C0[1]]} b={[C0[0] + R0, C0[1]]} color={MANIM.green} width={4} />
            <Txt x={C0[0]} y={C0[1] - 14} size={26} color={MANIM.green}>d = 2r</Txt>
          </Fade>
          <Fade show={beat === 4}>
            <Seg a={cA} b={cB} color={MANIM.orange} width={4} />
            <Txt x={C0[0]} y={cA[1] + 30} size={24} color={MANIM.orange}>cuerda</Txt>
            <path d={`M ${cA[0]} ${cA[1]} A ${R0} ${R0} 0 0 1 ${cB[0]} ${cB[1]}`} fill="none" stroke={MANIM.red} strokeWidth={7} strokeLinecap="round" />
            <Txt x={C0[0]} y={C0[1] - R0 - 14} size={24} color={MANIM.red}>arco</Txt>
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={520} y={190} size={32} color={MANIM.blue} anchor="start">Circunferencia</Txt>
            <Txt x={520} y={236} size={26} color={MANIM.ink} anchor="start">la línea</Txt>
          </Fade>
          <Fade show={beat === 1}>
            <Txt x={520} y={190} size={32} color={MANIM.blue} anchor="start">Círculo</Txt>
            <Txt x={520} y={236} size={26} color={MANIM.ink} anchor="start">la superficie interior</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Recta y circunferencia ───────────── */

const CR: Pt = [250, 240];
const RR = 100;
const YS = [CR[1] - RR - 50, CR[1] - RR, CR[1] - 50]; // exterior (d=150), tangente (d=100), secante (d=50)

export function buildCircunferenciaRecta(): AnimBuild {
  const half = Math.sqrt(RR * RR - 50 * 50);
  return {
    label: "Una recta y una circunferencia pueden ser exteriores, tangentes (un punto) o secantes (dos puntos), según la distancia d del centro a la recta",
    captions: [
      "Si la distancia del centro a la recta es **mayor que el radio** ($d > r$), son **exteriores**: no tienen ningún punto común.",
      "Si $d = r$, son **tangentes**: se tocan en un solo punto, y el radio que llega a él es **perpendicular** a la recta.",
      "Si $d < r$, la recta es **secante**: corta a la circunferencia en dos puntos.",
    ],
    render: (beat) => {
      const y = YS[beat]!;
      return (
        <Canvas>
          <circle cx={CR[0]} cy={CR[1]} r={RR} fill={MANIM.blue} fillOpacity={0.14} stroke={MANIM.blue} strokeWidth={4} />
          <Dot p={CR} color={MANIM.yellow} r={5} />
          <Txt x={CR[0] + 14} y={CR[1] + 24} size={22} color={MANIM.yellow} anchor="start">O</Txt>
          <Move x={0} y={y - YS[1]!}>
            <line x1={50} y1={YS[1]} x2={450} y2={YS[1]} stroke={MANIM.orange} strokeWidth={4} strokeLinecap="round" />
          </Move>
          {[0, 1, 2].map((i) => (
            <Fade key={i} show={beat === i}>
              <Seg a={CR} b={[CR[0], YS[i]!]} color={MANIM.yellow} width={3} dashed />
              <Txt x={CR[0] - 14} y={(CR[1] + YS[i]!) / 2 + 8} size={24} color={MANIM.yellow} anchor="end">{i === 1 ? "r = d" : "d"}</Txt>
            </Fade>
          ))}
          <Fade show={beat === 1}>
            <Dot p={[CR[0], YS[1]!]} color={MANIM.red} r={7} />
            <RightMark v={[CR[0], YS[1]!]} a={270} b={0} size={16} color={MANIM.ink} />
          </Fade>
          <Fade show={beat === 2}>
            <Dot p={[CR[0] - half, YS[2]!]} color={MANIM.red} r={7} />
            <Dot p={[CR[0] + half, YS[2]!]} color={MANIM.red} r={7} />
          </Fade>
          <Txt x={520} y={150} size={34} color={MANIM.orange} anchor="start">{["Exteriores", "Tangentes", "Secantes"][beat]!}</Txt>
          <Txt x={520} y={206} size={30} color={MANIM.ink} anchor="start">{["d > r", "d = r", "d < r"][beat]!}</Txt>
          <Txt x={520} y={254} size={26} color={MANIM.muted} anchor="start">{["0 puntos comunes", "1 punto común", "2 puntos comunes"][beat]!}</Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Dos circunferencias ───────────── */

const O1: Pt = [190, 215];
const R1 = 90;
const R2 = 50;
const STATES = [
  { title: "Exteriores", rule: "d > R + r", d: 185, color: MANIM.green },
  { title: "Tangentes exteriores", rule: "d = R + r", d: 140, color: MANIM.yellow },
  { title: "Secantes", rule: "R − r < d < R + r", d: 100, color: MANIM.orange },
  { title: "Tangentes interiores", rule: "d = R − r", d: 40, color: MANIM.yellow },
  { title: "Interiores", rule: "0 < d < R − r", d: 20, color: MANIM.purple },
  { title: "Concéntricas", rule: "d = 0 (mismo centro)", d: 0, color: MANIM.red },
] as const;

export function buildCircunferenciasPosiciones(): AnimBuild {
  const secX = (100 * 100 + R1 * R1 - R2 * R2) / (2 * 100);
  const secY = Math.sqrt(R1 * R1 - secX * secX);
  return {
    label: "Posiciones relativas de dos circunferencias de radios R y r según la distancia d entre sus centros: exteriores, tangentes, secantes, interiores y concéntricas",
    captions: [
      "Si la distancia entre centros es mayor que la suma de los radios, son **exteriores**: no se tocan.",
      "Si $d = R + r$, son **tangentes exteriores**: tienen un único punto común.",
      "Si $R - r < d < R + r$, son **secantes**: se cortan en dos puntos.",
      "Si $d = R - r$, son **tangentes interiores**: una dentro de la otra, tocándose en un punto.",
      "Si $d < R - r$, son **interiores**: una está dentro de la otra sin tocarse.",
      "Si los centros coinciden ($d = 0$), son **concéntricas**.",
    ],
    render: (beat) => {
      const s = STATES[beat]!;
      return (
        <Canvas>
          <circle cx={O1[0]} cy={O1[1]} r={R1} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={4} />
          <Dot p={O1} color={MANIM.blue} r={5} />
          <Move x={STATES[beat]!.d} y={0}>
            <circle cx={O1[0]} cy={O1[1]} r={R2} fill={MANIM.orange} fillOpacity={0.18} stroke={MANIM.orange} strokeWidth={4} />
            <Dot p={O1} color={MANIM.orange} r={5} />
          </Move>
          <Fade show={beat === 1 || beat === 3}>
            <Dot p={[O1[0] + R1, O1[1]]} color={MANIM.red} r={7} />
          </Fade>
          <Fade show={beat === 2}>
            <Dot p={[O1[0] + secX, O1[1] - secY]} color={MANIM.red} r={7} />
            <Dot p={[O1[0] + secX, O1[1] + secY]} color={MANIM.red} r={7} />
          </Fade>
          <Txt x={440} y={140} size={30} color={s.color} anchor="start">{s.title}</Txt>
          <Txt x={440} y={190} size={28} color={MANIM.ink} anchor="start">{s.rule}</Txt>
          <Txt x={440} y={250} size={21} color={MANIM.muted} anchor="start">R = radio mayor · r = radio menor</Txt>
          <Txt x={440} y={282} size={21} color={MANIM.muted} anchor="start">d = distancia entre centros</Txt>
        </Canvas>
      );
    },
  };
}
