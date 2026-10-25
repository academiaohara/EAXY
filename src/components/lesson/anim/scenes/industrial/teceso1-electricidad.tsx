import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Qué es la corriente: electrones que se mueven ───────────── */

const ATOMOS = Array.from({ length: 24 }, (_, k) => ({ x: 180 + (k % 8) * 60, y: 150 + Math.floor(k / 8) * 70 }));
const LIBRES = [
  { x: 205, y: 178 }, { x: 290, y: 130 }, { x: 330, y: 215 }, { x: 410, y: 175 },
  { x: 460, y: 245 }, { x: 515, y: 135 }, { x: 560, y: 205 }, { x: 255, y: 250 },
];

export function buildElectronesCorriente(): AnimBuild {
  return {
    label: "Corriente eléctrica: electrones libres que se mueven en un conductor",
    beatMs: 5600,
    captions: [
      "Un metal está formado por **átomos fijos** y por **electrones libres** que se mueven en todas direcciones, sin ir a ningún sitio en concreto.",
      "Como se mueven sin orden, **no hay corriente**: por cada electrón que va a la derecha hay otro que va a la izquierda.",
      "Al conectar una **pila**, su tensión empuja a todos los electrones libres en el **mismo sentido**: eso es la **corriente eléctrica**.",
      "La **intensidad** mide cuántas cargas pasan por un punto cada segundo. Se mide en **amperios (A)**.",
      "En un **aislante** los electrones están ligados a sus átomos y no pueden moverse libremente: **no hay corriente**.",
    ],
    render: (beat) => {
      const corriente = beat === 2 || beat === 3;
      return (
        <Canvas>
          <rect x={140} y={110} width={520} height={190} rx={12} fill={MANIM.panel} stroke={beat === 4 ? MANIM.red : MANIM.blue} strokeWidth={3} />
          {ATOMOS.map((a, i) => (
            <g key={i}>
              <circle cx={a.x} cy={a.y} r={14} fill={beat === 4 ? MANIM.muted : MANIM.orange} fillOpacity={0.35} stroke={beat === 4 ? MANIM.muted : MANIM.orange} strokeWidth={3} />
              <Txt x={a.x} y={a.y + 5} size={14} color={MANIM.ink}>
                +
              </Txt>
            </g>
          ))}
          {beat === 4
            ? ATOMOS.map((a, i) => <circle key={i} cx={a.x + 18} cy={a.y - 8} r={5} fill={MANIM.blue} />)
            : LIBRES.map((e, i) => {
                const dx = corriente ? 70 : (i % 2 ? -22 : 22);
                const dy = corriente ? 0 : (i % 3 ? 14 : -14);
                return <circle key={i} cx={e.x + dx} cy={e.y + dy} r={7} fill={MANIM.blue} stroke={MANIM.ink} strokeWidth={1.5} className="anim-t" />;
              })}
          <Fade show={beat === 1}>
            {LIBRES.slice(0, 6).map((e, i) => (
              <Arrow key={i} x1={e.x} y1={e.y} x2={e.x + (i % 2 ? -26 : 26)} y2={e.y + (i % 3 ? 12 : -12)} color={MANIM.blue} width={2.5} head={8} />
            ))}
          </Fade>
          <Fade show={corriente}>
            <Arrow x1={200} y1={90} x2={600} y2={90} color={MANIM.blue} width={5} />
            <Txt x={400} y={70} size={22} color={MANIM.blue}>
              corriente: todos en el mismo sentido
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <line x1={400} y1={100} x2={400} y2={310} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" />
            <Txt x={400} y={345} size={20} color={MANIM.yellow}>
              intensidad (A) = cargas que cruzan cada segundo
            </Txt>
          </Fade>
          <Fade show={beat === 4}>
            <Txt x={400} y={345} size={20} color={MANIM.red}>
              aislante: electrones ligados, sin corriente
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Partes de un circuito y transformaciones de energía ───────────── */

export function buildCircuitoComponentes(): AnimBuild {
  return {
    label: "Un circuito eléctrico: generador, conductores, elemento de control y receptor",
    beatMs: 5600,
    captions: [
      "Un **circuito eléctrico** es un camino **cerrado** por el que circula la corriente. Tiene cuatro tipos de elementos.",
      "**Generador**: la pila o batería. Transforma energía química en **eléctrica** y empuja las cargas.",
      "**Conductores**: los cables. Llevan la corriente de unos elementos a otros.",
      "**Elemento de control**: el interruptor o el pulsador. Abre o cierra el circuito y decide cuándo hay corriente.",
      "**Receptor**: la bombilla, el motor o el zumbador. Transforma la energía eléctrica en luz, movimiento o sonido.",
    ],
    render: (beat) => (
      <Canvas>
        <path d="M 160 210 L 160 90 L 640 90 L 640 330 L 160 330 Z" fill="none" stroke={beat === 2 ? MANIM.yellow : MANIM.muted} strokeWidth={beat === 2 ? 7 : 4} className="anim-t" />
        <Box x={160} y={210} w={130} h={64} color={MANIM.green} label="Pila" size={20} active={beat === 0 || beat === 1} />
        <Box x={400} y={90} w={160} h={64} color={MANIM.blue} label="Interruptor" size={20} active={beat === 0 || beat === 3} />
        <Box x={640} y={210} w={130} h={64} color={MANIM.yellow} label="Bombilla" size={20} active={beat === 0 || beat === 4} />
        <Fade show={beat === 1}>
          <Txt x={160} y={290} size={18} color={MANIM.green}>
            generador
          </Txt>
          <Txt x={160} y={156} size={16} color={MANIM.muted}>
            química → eléctrica
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={400} y={360} size={20} color={MANIM.yellow}>
            conductores (cables)
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={400} y={150} size={18} color={MANIM.blue}>
            elemento de control
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={640} y={290} size={18} color={MANIM.yellow}>
            receptor
          </Txt>
          <Txt x={640} y={156} size={16} color={MANIM.muted}>
            eléctrica → luz
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Serie y paralelo: caminos ───────────── */

function Lampara({ x, y, on, quitada = false }: { x: number; y: number; on: boolean; quitada?: boolean }) {
  if (quitada) {
    return (
      <Txt x={x} y={y + 6} size={16} color={MANIM.red}>
        ✗ quitada
      </Txt>
    );
  }
  return (
    <g>
      {on ? <circle cx={x} cy={y} r={34} fill={MANIM.yellow} fillOpacity={0.3} /> : null}
      <circle cx={x} cy={y} r={20} fill={MANIM.surface} stroke={on ? MANIM.yellow : MANIM.muted} strokeWidth={4} />
      <line x1={x - 14} y1={y - 14} x2={x + 14} y2={y + 14} stroke={on ? MANIM.yellow : MANIM.muted} strokeWidth={3} />
      <line x1={x + 14} y1={y - 14} x2={x - 14} y2={y + 14} stroke={on ? MANIM.yellow : MANIM.muted} strokeWidth={3} />
    </g>
  );
}

export function buildSerieParaleloCamino(): AnimBuild {
  return {
    label: "Lámparas en serie (un camino) y en paralelo (varios caminos)",
    beatMs: 5600,
    captions: [
      "Dos montajes con dos lámparas y una pila. A la izquierda, **en serie**; a la derecha, **en paralelo**.",
      "**En serie**, las lámparas están una detrás de otra: la corriente tiene **un solo camino** y atraviesa las dos.",
      "**En paralelo**, cada lámpara está en su propia rama: la corriente se **reparte** entre varios caminos.",
      "Se quita una lámpara. **En serie** se corta el único camino: **se apagan las dos**.",
      "**En paralelo** la otra rama sigue cerrada: **la otra lámpara sigue encendida**. Por eso las luces de una casa están en paralelo.",
    ],
    render: (beat) => {
      const quitada = beat >= 3;
      const serieOn = !quitada;
      return (
        <Canvas>
          <Txt x={190} y={40} size={22} color={MANIM.orange}>
            En serie
          </Txt>
          <Txt x={600} y={40} size={22} color={MANIM.blue}>
            En paralelo
          </Txt>
          <path d="M 60 220 L 60 100 L 320 100 L 320 340 L 60 340 Z" fill="none" stroke={serieOn ? MANIM.ink : MANIM.muted} strokeWidth={4} />
          <Lampara x={130} y={100} on={serieOn} />
          <Lampara x={250} y={100} on={serieOn} quitada={beat >= 3} />
          <g transform="translate(60 220)">
            <line x1={-8} y1={-22} x2={-8} y2={22} stroke={MANIM.green} strokeWidth={4} />
            <line x1={8} y1={-12} x2={8} y2={12} stroke={MANIM.green} strokeWidth={8} />
          </g>
          <path d="M 480 220 L 480 100 L 740 100 M 480 220 L 480 340 L 740 340" fill="none" stroke={MANIM.ink} strokeWidth={4} />
          {[560, 680].map((x, i) => (
            <g key={x}>
              <line x1={x} y1={100} x2={x} y2={340} stroke={i === 1 && quitada ? MANIM.muted : MANIM.ink} strokeWidth={4} />
              <rect x={x - 26} y={196} width={52} height={52} fill={MANIM.surface} />
              <Lampara x={x} y={222} on={!(i === 1 && quitada)} quitada={i === 1 && quitada} />
            </g>
          ))}
          <g transform="translate(480 220)">
            <line x1={-8} y1={-22} x2={-8} y2={22} stroke={MANIM.green} strokeWidth={4} />
            <line x1={8} y1={-12} x2={8} y2={12} stroke={MANIM.green} strokeWidth={8} />
          </g>
          <Fade show={beat === 3}>
            <Txt x={190} y={390} size={20} color={MANIM.red}>
              se apagan las dos
            </Txt>
          </Fade>
          <Fade show={beat === 4}>
            <Txt x={190} y={390} size={20} color={MANIM.red}>
              se apagan las dos
            </Txt>
            <Txt x={610} y={390} size={20} color={MANIM.green}>
              la otra sigue encendida
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Cortocircuito y fusible ───────────── */

export function buildCortocircuitoFusible(): AnimBuild {
  return {
    label: "Cortocircuito: qué ocurre si un cable une los dos polos y cómo lo evita el fusible",
    beatMs: 5600,
    captions: [
      "En un circuito normal la **bombilla limita** la corriente que sale de la pila: circula una intensidad pequeña.",
      "Un cable une directamente los **dos polos**: es un **cortocircuito**. No hay nada que limite la corriente y esta se vuelve **muy grande**.",
      "El cable se **calienta mucho** y puede quemar su aislante e iniciar un **incendio**.",
      "El **fusible** lleva un hilo fino que se **funde** con esa corriente excesiva y **abre el circuito**: protege la instalación. Después hay que **cambiarlo** y buscar la causa.",
    ],
    render: (beat) => {
      const corto = beat >= 1;
      const fundido = beat === 3;
      return (
        <Canvas>
          <path d="M 160 210 L 160 90 L 640 90 L 640 330 L 160 330 Z" fill="none" stroke={beat === 2 ? MANIM.red : fundido ? MANIM.muted : MANIM.ink} strokeWidth={beat === 2 ? 8 : 4} className="anim-t" />
          <g transform="translate(160 210)">
            <line x1={-8} y1={-24} x2={-8} y2={24} stroke={MANIM.green} strokeWidth={4} />
            <line x1={8} y1={-12} x2={8} y2={12} stroke={MANIM.green} strokeWidth={8} />
          </g>
          <circle cx={640} cy={210} r={26} fill={MANIM.surface} stroke={corto ? MANIM.muted : MANIM.yellow} strokeWidth={4} />
          <Fade show={!corto}>
            <circle cx={640} cy={210} r={44} fill={MANIM.yellow} fillOpacity={0.25} />
            <Txt x={430} y={150} size={22} color={MANIM.green}>
              corriente pequeña
            </Txt>
          </Fade>
          <Fade show={corto}>
            <line x1={360} y1={90} x2={360} y2={330} stroke={fundido ? MANIM.muted : MANIM.red} strokeWidth={7} />
          </Fade>
          <Fade show={beat === 1 || beat === 2}>
            <Txt x={375} y={200} size={17} color={MANIM.red} anchor="start">
              cable directo
            </Txt>
            <Txt x={375} y={224} size={17} color={MANIM.red} anchor="start">
              entre los polos
            </Txt>
          </Fade>
          <Fade show={beat === 1 || beat === 2}>
            <Arrow x1={170} y1={330} x2={340} y2={330} color={MANIM.red} width={8} />
            <Txt x={250} y={375} size={22} color={MANIM.red}>
              corriente enorme
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={560} y={375} size={22} color={MANIM.orange}>
              el cable se calienta al rojo
            </Txt>
          </Fade>
          <rect x={215} y={74} width={70} height={32} fill={MANIM.surface} stroke={fundido ? MANIM.red : MANIM.yellow} strokeWidth={3} />
          <line x1={221} y1={90} x2={fundido ? 240 : 279} y2={90} stroke={MANIM.yellow} strokeWidth={3} />
          {fundido ? <line x1={262} y1={90} x2={279} y2={90} stroke={MANIM.yellow} strokeWidth={3} /> : null}
          <Txt x={250} y={58} size={16} color={MANIM.muted}>
            fusible
          </Txt>
          <Fade show={fundido}>
            <Txt x={440} y={150} size={20} color={MANIM.green}>
              el fusible se funde y abre el circuito
            </Txt>
            <Txt x={440} y={180} size={18} color={MANIM.muted}>
              sin corriente: no hay peligro
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
