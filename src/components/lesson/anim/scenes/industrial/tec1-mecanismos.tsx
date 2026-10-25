import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Entrada, transmisión, transformación, salida ───────────── */

export function buildTransmisionFlujo(): AnimBuild {
  const bloques = [
    { x: 110, t: "Entrada", s: "motor", c: MANIM.green },
    { x: 310, t: "Transmisión", s: "reductor", c: MANIM.blue },
    { x: 510, t: "Transformación", s: "biela-manivela", c: MANIM.orange },
    { x: 700, t: "Salida", s: "escobilla", c: MANIM.purple },
  ];
  return {
    label: "Cadena de una máquina: entrada, transmisión, transformación y salida (limpiaparabrisas)",
    beatMs: 5600,
    captions: [
      "Toda máquina tiene una **cadena cinemática**: recibe movimiento y energía (**entrada**), los lleva (**transmisión**), cambia su tipo si hace falta (**transformación**) y los entrega (**salida**).",
      "**Entrada**: el motor aporta un giro rápido y con poco par.",
      "**Transmisión**: un reductor baja las rpm y **multiplica el par**. El movimiento sigue siendo giratorio.",
      "**Transformación**: la biela-manivela convierte el giro continuo en un **movimiento de vaivén**.",
      "**Salida**: la escobilla barre el parabrisas con ese vaivén. Entre la entrada y la salida se perdió algo de energía por rozamiento.",
    ],
    render: (beat) => (
      <Canvas>
        {bloques.map((b, i) => (
          <g key={b.t}>
            <Box x={b.x} y={190} w={150} h={90} color={b.c} label={b.t} size={18} active={beat === 0 || beat === i + 1} />
            <Txt x={b.x} y={252} size={16} color={MANIM.muted}>
              {b.s}
            </Txt>
            {i < 3 ? <Arrow x1={b.x + 80} y1={190} x2={bloques[i + 1]!.x - 80} y2={190} color={MANIM.muted} width={3} /> : null}
          </g>
        ))}
        <Fade show={beat === 1}>
          <Txt x={110} y={90} size={18} color={MANIM.green}>
            giro rápido · par bajo
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={310} y={90} size={18} color={MANIM.blue}>
            giro lento · par alto
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={510} y={90} size={18} color={MANIM.orange}>
            giro → vaivén
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={700} y={90} size={18} color={MANIM.purple}>
            movimiento oscilante
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Correa abierta y correa cruzada ───────────── */

export function buildCorreaAbiertaCruzada(): AnimBuild {
  const c1 = { x: 260, y: 200, r: 50 };
  const c2 = { x: 540, y: 200, r: 100 };
  return {
    label: "Transmisión por correa: sentido de giro y relación de diámetros",
    beatMs: 5600,
    captions: [
      "Con una **correa abierta**, las dos poleas giran en el **mismo sentido**.",
      "Con una **correa cruzada**, la polea conducida gira en **sentido contrario**. La correa se desgasta más al rozar consigo misma.",
      "La correa recorre la misma longitud en cada polea, así que $v = \\omega_1 r_1 = \\omega_2 r_2$. Con $d_2 = 2\\,d_1$: $n_2 = n_1\\,d_1/d_2 = n_1/2$. **Polea mayor, giro más lento y más par**.",
    ],
    render: (beat) => {
      const cruz = beat >= 1;
      return (
        <Canvas>
          {cruz ? (
            <>
              <line x1={c1.x} y1={c1.y - c1.r} x2={c2.x} y2={c2.y + c2.r} stroke={MANIM.muted} strokeWidth={4} />
              <line x1={c1.x} y1={c1.y + c1.r} x2={c2.x} y2={c2.y - c2.r} stroke={MANIM.muted} strokeWidth={4} />
            </>
          ) : (
            <>
              <line x1={c1.x} y1={c1.y - c1.r} x2={c2.x} y2={c2.y - c2.r} stroke={MANIM.muted} strokeWidth={4} />
              <line x1={c1.x} y1={c1.y + c1.r} x2={c2.x} y2={c2.y + c2.r} stroke={MANIM.muted} strokeWidth={4} />
            </>
          )}
          <circle cx={c1.x} cy={c1.y} r={c1.r} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={5} />
          <circle cx={c2.x} cy={c2.y} r={c2.r} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={5} />
          <Txt x={c1.x} y={c1.y + 12} size={34} color={MANIM.blue}>
            ↻
          </Txt>
          <Txt x={c2.x} y={c2.y + 14} size={44} color={MANIM.orange}>
            {cruz ? "↺" : "↻"}
          </Txt>
          <Txt x={c1.x} y={c1.y + c1.r + 36} size={18} color={MANIM.blue}>
            motriz d₁
          </Txt>
          <Txt x={c2.x} y={c2.y + c2.r + 30} size={18} color={MANIM.orange}>
            conducida d₂ = 2·d₁
          </Txt>
          <Fade show={beat === 2}>
            <Txt x={400} y={55} size={22} color={MANIM.yellow}>
              n₂ = n₁ · d₁ / d₂ = n₁ / 2
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Engranajes: dientes y vueltas ───────────── */

function Rueda({ cx, cy, r, z, ang, color }: { cx: number; cy: number; r: number; z: number; ang: number; color: string }) {
  const paso = (Math.PI * r) / z;
  return (
    <g className="anim-t" style={{ transform: `rotate(${ang}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={14} strokeDasharray={`${paso} ${paso}`} />
      <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={color} strokeWidth={3} />
      <line x1={cx} y1={cy} x2={cx + r - 10} y2={cy} stroke={MANIM.yellow} strokeWidth={6} />
      <circle cx={cx} cy={cy} r={6} fill={MANIM.yellow} />
    </g>
  );
}

export function buildEngranajesGiro(): AnimBuild {
  const z1 = 10;
  const z2 = 20;
  const r1 = 60;
  const r2 = 120;
  const c1 = { x: 260, y: 210 };
  const c2 = { x: c1.x + r1 + r2, y: 210 };
  const giros = [0, 180, 360, 720];
  return {
    label: "Engranajes: cada diente de uno empuja un diente del otro; la rueda con más dientes gira menos",
    beatMs: 5600,
    captions: [
      "Dos engranajes engranan: la rueda **motriz** de $z_1 = 10$ dientes y la **conducida** de $z_2 = 20$. Las marcas amarillas parten alineadas.",
      "Media vuelta de la motriz ($5$ dientes) arrastra **5 dientes** de la conducida, que es solo **un cuarto** de su vuelta. Además **gira en sentido contrario**.",
      "Una vuelta completa de la motriz mueve 10 dientes: la conducida da **media vuelta**. La relación de transmisión es $i = z_1/z_2 = 1/2$.",
      "Con dos vueltas de la motriz, la conducida da una: $n_2 = n_1\\,z_1/z_2$. Menos velocidad y **más par**: así funciona un reductor.",
    ],
    render: (beat) => {
      const a1 = giros[beat]!;
      return (
        <Canvas>
          <Rueda cx={c1.x} cy={c1.y} r={r1} z={z1} ang={a1} color={MANIM.blue} />
          <Rueda cx={c2.x} cy={c2.y} r={r2} z={z2} ang={-a1 / 2} color={MANIM.orange} />
          <Txt x={c1.x} y={c1.y + r1 + 44} size={18} color={MANIM.blue}>
            z₁ = 10 · gira {a1}°
          </Txt>
          <Txt x={c2.x} y={c2.y + r2 + 32} size={18} color={MANIM.orange}>
            z₂ = 20 · gira {a1 / 2}° en sentido contrario
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Biela-manivela ───────────── */

export function buildBielaManivelaCiclo(): AnimBuild {
  const R = 50;
  const L = 170;
  const ox = 150;
  const oy = 210;
  const angs = [0, 90, 180, 270];
  const pos = (th: number) => {
    const t = (th * Math.PI) / 180;
    return R * Math.cos(t) + Math.sqrt(L * L - (R * Math.sin(t)) ** 2);
  };
  return {
    label: "Biela-manivela: el giro continuo de la manivela se convierte en el vaivén del émbolo",
    beatMs: 5600,
    captions: [
      "Con la manivela a $0^\\circ$, el émbolo está en su **punto muerto exterior**: lo más lejos del eje, a $L + R$.",
      "A $90^\\circ$ el émbolo retrocede. Es donde se mueve más deprisa.",
      "A $180^\\circ$ llega al **punto muerto interior**, a $L - R$. La **carrera** es la distancia entre los dos: $2R$.",
      "A $270^\\circ$ vuelve a avanzar. Una vuelta de la manivela = un vaivén completo. Con el émbolo como entrada, es el principio del motor de combustión.",
    ],
    render: (beat) => {
      const th = (angs[beat]! * Math.PI) / 180;
      const mx = ox + R * Math.cos(th);
      const my = oy - R * Math.sin(th);
      const px = ox + pos(angs[beat]!);
      return (
        <Canvas>
          <rect x={ox + L - R - 30} y={oy - 40} width={2 * R + 100} height={80} fill="none" stroke={MANIM.grid} strokeWidth={3} strokeDasharray="6 5" />
          <rect x={px - 24} y={oy - 34} width={48} height={68} rx={4} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={4} />
          <line x1={mx} y1={my} x2={px} y2={oy} stroke={MANIM.orange} strokeWidth={8} strokeLinecap="round" />
          <circle cx={ox} cy={oy} r={R} fill="none" stroke={MANIM.blue} strokeOpacity={0.4} strokeWidth={2} />
          <line x1={ox} y1={oy} x2={mx} y2={my} stroke={MANIM.blue} strokeWidth={9} strokeLinecap="round" />
          <circle cx={ox} cy={oy} r={9} fill={MANIM.muted} />
          <circle cx={mx} cy={my} r={8} fill={MANIM.yellow} />
          <Txt x={ox} y={oy + 90} size={19} color={MANIM.blue}>
            manivela R · θ = {angs[beat]}°
          </Txt>
          <Txt x={560} y={oy + 90} size={19} color={MANIM.green}>
            émbolo
          </Txt>
          <Fade show={beat === 2}>
            <Txt x={400} y={60} size={20} color={MANIM.yellow}>
              carrera = 2R
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Géneros de palanca ───────────── */

export function buildPalancaGeneros(): AnimBuild {
  const y = 230;
  const X0 = 120;
  const X1 = 680;
  const casos = [
    { t: "1.er género: apoyo entre la fuerza y la carga", ej: "tijeras, balancín, alicates", A: 400, Q: 200, F: 600, Fup: false },
    { t: "2.º género: la carga entre el apoyo y la fuerza", ej: "carretilla, cascanueces, abrebotellas", A: 120, Q: 330, F: 680, Fup: true },
    { t: "3.er género: la fuerza entre el apoyo y la carga", ej: "pinzas, caña de pescar, antebrazo", A: 120, Q: 680, F: 330, Fup: true },
  ];
  return {
    label: "Los tres géneros de palanca según la posición del apoyo, la fuerza y la carga",
    beatMs: 5600,
    captions: [
      "**1.er género**: el **apoyo** está entre la fuerza $F$ y la carga $Q$. Según dónde esté, puede ganar fuerza o recorrido (tijeras, balancín).",
      "**2.º género**: la **carga** está entre el apoyo y la fuerza. Siempre gana fuerza: $b_F > b_Q$ (carretilla, cascanueces).",
      "**3.er género**: la **fuerza** está entre el apoyo y la carga. Pierde fuerza ($b_F < b_Q$) pero gana recorrido y velocidad (pinzas, caña de pescar). En todos: $F\\cdot b_F = Q\\cdot b_Q$.",
    ],
    render: (beat) => {
      const c = casos[beat]!;
      return (
        <Canvas>
          <Txt x={400} y={55} size={22} color={MANIM.yellow}>
            {c.t}
          </Txt>
          <line x1={X0} y1={y} x2={X1} y2={y} stroke={MANIM.muted} strokeWidth={12} strokeLinecap="round" />
          <polygon points={`${c.A},${y + 6} ${c.A - 28},${y + 62} ${c.A + 28},${y + 62}`} fill={MANIM.yellow} fillOpacity={0.5} stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={c.A} y={y + 90} size={18} color={MANIM.yellow}>
            apoyo
          </Txt>
          <Arrow x1={c.Q} y1={y - 90} x2={c.Q} y2={y - 10} color={MANIM.red} width={7} />
          <Txt x={c.Q} y={y - 105} size={20} color={MANIM.red}>
            Q (carga)
          </Txt>
          {c.Fup ? (
            <>
              <Arrow x1={c.F} y1={y + 90} x2={c.F} y2={y + 12} color={MANIM.blue} width={7} />
              <Txt x={c.F} y={y + 112} size={20} color={MANIM.blue}>
                F
              </Txt>
            </>
          ) : (
            <>
              <Arrow x1={c.F} y1={y - 90} x2={c.F} y2={y - 10} color={MANIM.blue} width={7} />
              <Txt x={c.F} y={y - 105} size={20} color={MANIM.blue}>
                F
              </Txt>
            </>
          )}
          <Txt x={400} y={370} size={18} color={MANIM.muted}>
            Ejemplos: {c.ej}
          </Txt>
        </Canvas>
      );
    },
  };
}
