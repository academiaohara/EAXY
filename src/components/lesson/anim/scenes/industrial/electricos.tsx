import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

const rad = (deg: number) => (deg * Math.PI) / 180;
const f1 = (v: number, d = 1) => v.toFixed(d).replace(".", ",");

/* ───────────── Experiencia de Oersted ───────────── */

export function buildOersted(): AnimBuild {
  const rot = [0, -90, 90, 0];
  const cur = [0, 1, -1, 0];
  const cx = 300;
  const cy = 290;
  return {
    label: "Experiencia de Oersted: una corriente desvía la aguja de una brújula",
    beatMs: 5400,
    captions: [
      "Una aguja imantada se orienta con el campo terrestre, **paralela** al cable. Si no pasa corriente por el hilo, la aguja no se mueve.",
      "Al pasar una corriente en un sentido, la aguja gira hasta quedar **perpendicular** al hilo. La corriente actúa como un imán.",
      "Si se **invierte el sentido** de la corriente, la aguja vuelve a girar y apunta hacia el lado contrario, pero sigue perpendicular.",
      "Una corriente es un conjunto de **cargas en movimiento**, y una carga en movimiento equivale a un imán. El campo magnético forma **círculos concéntricos** alrededor del hilo (regla de la mano derecha: pulgar con la corriente, los demás dedos con el campo).",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 2}>
          <line x1={80} y1={130} x2={520} y2={130} stroke={MANIM.orange} strokeWidth={9} strokeLinecap="round" />
          <Txt x={300} y={100} size={18} color={MANIM.muted}>
            hilo conductor
          </Txt>
          <Fade show={beat >= 1 && beat <= 2}>
            <Arrow x1={cur[beat] > 0 ? 150 : 450} y1={130} x2={cur[beat] > 0 ? 450 : 150} y2={130} color={MANIM.yellow} width={4} />
            <Txt x={300} y={168} size={20} color={MANIM.yellow}>
              I
            </Txt>
          </Fade>
          <g className="anim-t" style={{ transform: `translate(${cx}px, ${cy}px) rotate(${rot[beat]}deg)` }}>
            <polygon points="-60,-9 60,-9 85,0 60,9 -60,9" fill={MANIM.red} fillOpacity={0.25} />
            <polygon points="-60,-9 0,-9 0,9 -60,9" fill={MANIM.blue} fillOpacity={0.9} />
            <polygon points="0,-9 60,-9 85,0 60,9 0,9" fill={MANIM.red} fillOpacity={0.9} />
            <circle cx={0} cy={0} r={5} fill={MANIM.ink} />
          </g>
          <Txt x={cx} y={cy + 100} size={18} color={MANIM.muted}>
            aguja imantada (N rojo · S azul)
          </Txt>
          <Txt x={640} y={cy} size={22} color={beat === 0 ? MANIM.muted : MANIM.green} anchor="middle">
            {beat === 0 ? "sin corriente: paralela" : "con corriente: perpendicular"}
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          {[40, 80, 120].map((r) => (
            <circle key={r} cx={400} cy={210} r={r} fill="none" stroke={MANIM.blue} strokeWidth={3} strokeOpacity={0.8} />
          ))}
          <circle cx={400} cy={210} r={16} fill={MANIM.orange} />
          <circle cx={400} cy={210} r={4} fill={MANIM.surface} />
          <Txt x={400} y={400} size={18} color={MANIM.muted}>
            vista frontal: la corriente sale del papel (⊙) y B gira en sentido antihorario
          </Txt>
          {[0, 90, 180, 270].map((a) => {
            const x = 400 + 80 * Math.cos(rad(a));
            const y = 210 - 80 * Math.sin(rad(a));
            const t = rad(a + 90);
            return <Arrow key={a} x1={x} y1={y} x2={x + 26 * Math.cos(t)} y2={y - 26 * Math.sin(t)} color={MANIM.blue} width={4} head={10} />;
          })}
          <Txt x={400} y={44} size={22} color={MANIM.yellow}>
            B ⟂ I, en círculos alrededor del hilo
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Fuerza entre dos hilos paralelos ───────────── */

export function buildHilosParalelos(): AnimBuild {
  const cfg = [
    { gap: 160, dir2: 1, f: 36, i2: "I₂" },
    { gap: 160, dir2: -1, f: 36, i2: "I₂" },
    { gap: 160, dir2: 1, f: 72, i2: "2·I₂" },
    { gap: 320, dir2: 1, f: 18, i2: "I₂" },
  ];
  return {
    label: "Fuerza entre dos corrientes paralelas: atracción si van en el mismo sentido, repulsión si van en sentidos contrarios",
    beatMs: 5400,
    captions: [
      "Dos hilos paralelos con corrientes del **mismo sentido** se **atraen**. La fuerza por unidad de longitud es $\\dfrac{F}{l} = \\dfrac{\\mu_0}{2\\pi}\\,\\dfrac{I_1 I_2}{a}$.",
      "Si las corrientes van en **sentidos contrarios**, los hilos se **repelen**.",
      "Si se **duplica** una intensidad, la fuerza se duplica: el campo que crea esa corriente es el doble.",
      "Si se **duplica la distancia** $a$, la fuerza se reduce a la mitad. (No hay cuadrado de la distancia, como en el campo eléctrico o el gravitatorio.)",
    ],
    render: (beat) => {
      const c = cfg[beat]!;
      const y1 = 215 - c.gap / 2;
      const y2 = 215 + c.gap / 2;
      const attract = c.dir2 > 0;
      return (
        <Canvas>
          <line x1={120} y1={y1} x2={680} y2={y1} stroke={MANIM.orange} strokeWidth={10} strokeLinecap="round" className="anim-t" />
          <line x1={120} y1={y2} x2={680} y2={y2} stroke={MANIM.blue} strokeWidth={10} strokeLinecap="round" className="anim-t" />
          <Arrow x1={300} y1={y1} x2={460} y2={y1} color={MANIM.ink} width={4} />
          <Arrow x1={c.dir2 > 0 ? 300 : 460} y1={y2} x2={c.dir2 > 0 ? 460 : 300} y2={y2} color={MANIM.ink} width={c.f > 50 ? 7 : 4} />
          <Txt x={110} y={y1 + 6} size={22} color={MANIM.orange} anchor="end">
            I₁
          </Txt>
          <Txt x={110} y={y2 + 6} size={22} color={MANIM.blue} anchor="end">
            {c.i2}
          </Txt>
          <g className="anim-t" style={{ transform: `translate(0px, ${0}px)` }}>
            <Arrow x1={560} y1={y1} x2={560} y2={attract ? y1 + c.f : y1 - c.f} color={MANIM.red} width={6} />
            <Arrow x1={560} y1={y2} x2={560} y2={attract ? y2 - c.f : y2 + c.f} color={MANIM.red} width={6} />
          </g>
          <Txt x={600} y={215 + 6} size={22} color={MANIM.red} anchor="start">
            F ({attract ? "atracción" : "repulsión"})
          </Txt>
          <line x1={150} y1={y1} x2={150} y2={y2} stroke={MANIM.green} strokeWidth={2} strokeDasharray="5 5" />
          <Txt x={160} y={215 + 6} size={20} color={MANIM.green} anchor="start">
            a
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Carga en un campo magnético ───────────── */

export function buildLorentzCarga(): AnimBuild {
    const circlePos = "M 400 215 A 90 90 0 0 0 400 35 A 90 90 0 0 0 400 215";
  const circleNeg = "M 400 215 A 90 90 0 0 1 400 395 A 90 90 0 0 1 400 215";
  const crosses = [] as { x: number; y: number }[];
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      crosses.push({ x: 120 + i * 70, y: 40 + j * 85 });
    }
  }
  return {
    label: "Carga en movimiento en un campo magnético: la fuerza de Lorentz curva su trayectoria",
    beatMs: 5600,
    captions: [
      "Un campo magnético $\\mathbf{B}$ entra en el papel (aspas). Una carga positiva $+q$ entra con velocidad $\\mathbf{v}$ **perpendicular** al campo.",
      "Sobre ella actúa la **fuerza de Lorentz** $\\mathbf{F} = q\\,\\mathbf{v}\\times\\mathbf{B}$, perpendicular a $\\mathbf{v}$ y a $\\mathbf{B}$ (regla del sacacorchos). Su módulo es $F = q\\,v\\,B$.",
      "Como $\\mathbf{F}\\perp\\mathbf{v}$, la fuerza **no realiza trabajo**: cambia la dirección de la velocidad, pero no su módulo. La trayectoria es una **circunferencia** de radio $r = \\dfrac{m\\,v}{q\\,B}$.",
      "Una carga **negativa** con la misma velocidad es desviada al **lado contrario**: la fuerza cambia de sentido.",
    ],
    render: (beat) => (
      <Canvas>
        {crosses.map((c, i) => (
          <g key={i} opacity={0.55}>
            <line x1={c.x - 6} y1={c.y - 6} x2={c.x + 6} y2={c.y + 6} stroke={MANIM.blue} strokeWidth={2} />
            <line x1={c.x - 6} y1={c.y + 6} x2={c.x + 6} y2={c.y - 6} stroke={MANIM.blue} strokeWidth={2} />
          </g>
        ))}
        <Txt x={760} y={30} size={20} color={MANIM.blue} anchor="end">
          B (entrando)
        </Txt>
        <DrawPath show={beat >= 2} d={circlePos} color={MANIM.green} width={4} />
        <DrawPath show={beat >= 3} d={circleNeg} color={MANIM.orange} width={4} />
        <circle cx={400} cy={215} r={14} fill={MANIM.red} />
        <Txt x={400} y={221} size={20} color={MANIM.ink}>
          +
        </Txt>
        <Fade show={beat >= 0}>
          <Arrow x1={414} y1={215} x2={520} y2={215} color={MANIM.yellow} width={5} />
          <Txt x={535} y={222} size={22} color={MANIM.yellow} anchor="start">
            v
          </Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <Arrow x1={400} y1={199} x2={400} y2={115} color={MANIM.green} width={6} />
          <Txt x={420} y={150} size={22} color={MANIM.green} anchor="start">
            F = q·v·B
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={100} y={215} size={22} color={MANIM.green} anchor="start">
            r = m·v / (q·B)
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <circle cx={400} cy={215} r={14} fill={MANIM.blue} />
          <Txt x={400} y={221} size={20} color={MANIM.ink}>
            −
          </Txt>
          <Arrow x1={400} y1={231} x2={400} y2={315} color={MANIM.orange} width={6} />
          <Txt x={420} y={285} size={22} color={MANIM.orange} anchor="start">
            F (−q)
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Espira en un campo: momento ───────────── */

export function buildEspiraMomento(): AnimBuild {
  const phis = [90, 50, 0, 0];
  const cx = 280;
  const cy = 215;
  const half = 85;
  return {
    label: "Espira en un campo magnético uniforme: el momento M = I·S·B·sen φ la hace girar hasta que su vector S se alinea con B",
    beatMs: 5600,
    captions: [
      "Vista de perfil de una espira por la que circula $I$, en un campo $\\mathbf{B}$ horizontal. El vector superficie $\\mathbf{S}$ (perpendicular a la espira) forma un ángulo $\\varphi = 90°$ con $\\mathbf{B}$.",
      "Sobre los dos lados que cortan el campo actúan fuerzas $F_1 = I\\,a\\,B$ **iguales y opuestas**: su suma es cero, pero forman un **par** que hace girar la espira. $M = I\\,S\\,B\\,\\operatorname{sen}\\varphi$.",
      "A medida que $\\varphi$ disminuye, el brazo del par se acorta y el momento baja: es **máximo** con $\\varphi = 90°$ y se anula con $\\varphi = 0$, cuando $\\mathbf{S}$ queda paralelo a $\\mathbf{B}$.",
      "En ese punto la espira se detendría. Los motores usan **varias espiras** (bobina de $N$ espiras, $M = N\\,I\\,S\\,B\\,\\operatorname{sen}\\varphi$) y el **colector** invierte la corriente para que siempre haya alguna en posición de recibir par.",
    ],
    render: (beat) => {
      const phi = phis[beat]!;
      const ex = -half * Math.sin(rad(phi));
      const ey = half * Math.cos(rad(phi));
      const M = Math.sin(rad(phi));
      return (
        <Canvas>
          {[110, 170, 230, 290, 350].map((y) => (
            <Arrow key={y} x1={60} y1={y} x2={520} y2={y} color={MANIM.blue} width={2} head={10} />
          ))}
          <Txt x={535} y={110} size={22} color={MANIM.blue} anchor="start">
            B
          </Txt>
          <g className="anim-t" style={{ transform: `translate(${cx}px, ${cy}px) rotate(${90 - phi}deg)` }}>
            <line x1={-half} y1={0} x2={half} y2={0} stroke={MANIM.orange} strokeWidth={8} strokeLinecap="round" />
            <circle cx={-half} cy={0} r={12} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
            <circle cx={half} cy={0} r={12} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
            <line x1={0} y1={0} x2={0} y2={-70} stroke={MANIM.green} strokeWidth={5} strokeLinecap="round" />
            <polygon points="0,-84 -8,-68 8,-68" fill={MANIM.green} />
            <Txt x={14} y={-78} size={20} color={MANIM.green} anchor="start">
              S
            </Txt>
          </g>
          <g className="anim-t" style={{ transform: `translate(${cx + ex}px, ${cy - ey}px)`, opacity: M > 0.02 ? 1 : 0.0 }}>
            <Arrow x1={0} y1={0} x2={0} y2={ey < 0 ? 70 : -70} color={MANIM.red} width={6} />
          </g>
          <g className="anim-t" style={{ transform: `translate(${cx - ex}px, ${cy + ey}px)`, opacity: M > 0.02 ? 1 : 0.0 }}>
            <Arrow x1={0} y1={0} x2={0} y2={ey < 0 ? -70 : 70} color={MANIM.red} width={6} />
          </g>
          <Fade show={beat === 1}>
            <Txt x={cx} y={400} size={20} color={MANIM.red}>
              F₁ = I·a·B (par de fuerzas)
            </Txt>
          </Fade>
          <Txt x={650} y={215} size={26} color={MANIM.yellow}>
            φ = {phi}°
          </Txt>
          <Txt x={650} y={255} size={22} color={MANIM.green}>
            M = M_máx · {f1(M, 2)}
          </Txt>
          <Fade show={beat === 3}>
            <Txt x={650} y={310} size={18} color={MANIM.muted}>
              M = N·I·S·B·sen φ
            </Txt>
            <Txt x={650} y={336} size={18} color={MANIM.muted}>
              (colector + varias espiras)
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Barra móvil: fem inducida ───────────── */

export function buildFaradayVarilla(): AnimBuild {
  const rodY = [300, 300, 230, 150];
  const top = 90;
  const Lx = 250;
  const Rx = 550;
  const cross = [] as { x: number; y: number }[];
  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      cross.push({ x: 190 + i * 70, y: 130 + j * 70 });
    }
  }
  return {
    label: "Fuerza electromotriz inducida en una barra que se mueve en un campo magnético",
    beatMs: 5600,
    captions: [
      "Una barra conductora de longitud $l$ sobre un conductor en U, en un campo $\\mathbf{B}$ que entra en el papel. Al principio está parada.",
      "Al moverla hacia arriba con velocidad $\\mathbf{v}$, la fuerza $\\mathbf{F} = q\\,\\mathbf{v}\\times\\mathbf{B}$ empuja los electrones hacia un extremo: se separan cargas y la barra se comporta como una **pila**.",
      "Con el circuito cerrado circula una corriente $I$. Sobre la barra aparece una fuerza $I\\,l\\,B$ **contraria al movimiento**: hay que hacer fuerza (potencia mecánica $F\\,v$) para mantenerlo.",
      "Igualando la potencia mecánica $I\\,l\\,B\\,v$ con la eléctrica $\\varepsilon\\,I$ resulta $\\varepsilon = B\\,l\\,v$. Es la variación de flujo por segundo: $\\varepsilon = -\\dfrac{\\Delta\\Phi}{\\Delta t}$ (**ley de Faraday**).",
    ],
    render: (beat) => {
      const y = rodY[beat]!;
      return (
        <Canvas>
          {cross.map((c, i) => (
            <g key={i} opacity={0.35}>
              <line x1={c.x - 5} y1={c.y - 5} x2={c.x + 5} y2={c.y + 5} stroke={MANIM.blue} strokeWidth={2} />
              <line x1={c.x - 5} y1={c.y + 5} x2={c.x + 5} y2={c.y - 5} stroke={MANIM.blue} strokeWidth={2} />
            </g>
          ))}
          <path d={`M ${Lx} 380 L ${Lx} ${top} L ${Rx} ${top} L ${Rx} 380`} fill="none" stroke={MANIM.muted} strokeWidth={6} />
          <rect className="anim-t" x={Lx} y={top} width={Rx - Lx} height={y - top} fill={MANIM.green} fillOpacity={beat >= 3 ? 0.14 : 0} />
          <line className="anim-t" x1={Lx - 20} y1={y} x2={Rx + 20} y2={y} stroke={MANIM.orange} strokeWidth={10} strokeLinecap="round" style={{ transition: "all 0.8s ease" }} />
          <Txt x={Lx - 30} y={y + 6} size={22} color={MANIM.orange} anchor="end">
            A
          </Txt>
          <Txt x={Rx + 30} y={y + 6} size={22} color={MANIM.orange} anchor="start">
            B
          </Txt>
          <Txt x={(Lx + Rx) / 2} y={400} size={20} color={MANIM.muted}>
            l
          </Txt>
          <Fade show={beat >= 1}>
            <Arrow x1={650} y1={300} x2={650} y2={200} color={MANIM.yellow} width={5} />
            <Txt x={670} y={250} size={22} color={MANIM.yellow} anchor="start">
              v
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <circle cx={Rx - 10} cy={y + 20} r={7} fill={MANIM.blue} />
            <circle cx={Rx - 40} cy={y + 20} r={7} fill={MANIM.blue} />
            <circle cx={Rx - 70} cy={y + 20} r={7} fill={MANIM.blue} />
            <Txt x={Rx - 10} y={y - 22} size={18} color={MANIM.blue} anchor="end">
              e⁻ en B (−)
            </Txt>
            <Txt x={Lx + 10} y={y - 22} size={18} color={MANIM.red} anchor="start">
              + en A
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <path d={`M ${Lx + 40} ${y - 12} L ${Lx + 40} ${top + 30} L ${Rx - 40} ${top + 30} L ${Rx - 40} ${y - 12}`} fill="none" stroke={MANIM.green} strokeWidth={3} strokeDasharray="10 8" />
            <Txt x={(Lx + Rx) / 2} y={top + 58} size={22} color={MANIM.green}>
              I
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Arrow x1={(Lx + Rx) / 2} y1={y + 10} x2={(Lx + Rx) / 2} y2={y + 70} color={MANIM.red} width={6} />
            <Txt x={(Lx + Rx) / 2 + 20} y={y + 50} size={20} color={MANIM.red} anchor="start">
              I·l·B (frena)
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Txt x={650} y={90} size={26} color={MANIM.yellow}>
              ε = B·l·v
            </Txt>
            <Txt x={650} y={125} size={20} color={MANIM.green}>
              = ΔΦ / Δt
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Motor de corriente continua: del arranque al equilibrio ───────────── */

export function buildMotorCcBloques(): AnimBuild {
  const Rr = 2;
  const U = 250;
  const steps = [
    { E: 0, n: "0 rpm" },
    { E: 0, n: "arranca" },
    { E: 120, n: "acelera" },
    { E: 230, n: "1 500 rpm" },
    { E: 230, n: "1 500 rpm" },
  ];
  const cap = [
    `Se aplica una tensión $U = ${U}$ V al motor parado. Aún no hay fuerza contraelectromotriz: $E' = 0$.`,
    `Aparece una **intensidad grande** en el inducido, $I_i = U/r_i = ${U}/${Rr} = ${U / Rr}$ A (la del arranque), y un campo magnético: surge un **par** $M_i$ que hace girar el rotor.`,
    "Al girar, el inducido corta las líneas del campo y se genera una **fuerza contraelectromotriz** $E'$, proporcional a la velocidad y al flujo: $E' = K'\\,n\\,\\Phi$. Se opone a la tensión aplicada.",
    `La intensidad baja, $I_i = \\dfrac{U - E'}{r_i}$, y con ella el par, hasta que par motor y par resistente se igualan. Con $E' = 230$ V: $I_i = \\dfrac{${U} - 230}{${Rr}} = 10$ A.`,
    "Equilibrio: el motor gira a velocidad constante. Eléctricamente es una resistencia $r_i$ en serie con un generador $E'$ que se opone a la red: $U = E' + r_i\\,I_i$.",
  ];
  return {
    label: "Motor de corriente continua: de la tensión aplicada al equilibrio con la fuerza contraelectromotriz",
    beatMs: 5800,
    captions: cap,
    render: (beat) => {
      const E = steps[beat]!.E;
      const I = (U - E) / Rr;
      const labels = ["Aplicamos U", "Aparece I_i y B", "Surge M_i: gira", "Aparece E'", "I_i baja: equilibrio"];
      const colors = [MANIM.red, MANIM.orange, MANIM.green, MANIM.blue, MANIM.yellow];
      return (
        <Canvas>
          {labels.map((l, i) => (
            <Box key={l} x={90 + i * 155} y={80} w={140} h={64} color={colors[i]!} label={l} active={i <= beat} size={15} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <Fade key={i} show={i < beat}>
              <Arrow x1={162 + i * 155} y1={80} x2={182 + i * 155} y2={80} color={MANIM.muted} width={3} head={9} />
            </Fade>
          ))}
          <Txt x={140} y={190} size={20} color={MANIM.muted}>
            Intensidad del inducido
          </Txt>
          <rect x={60} y={205} width={680} height={38} fill={MANIM.panel} />
          <rect className="anim-t" x={60} y={205} width={(I / (U / Rr)) * 680} height={38} fill={MANIM.red} fillOpacity={0.85} />
          <Txt x={400} y={232} size={22} color={MANIM.ink}>
            I_i = {f1(I, 0)} A
          </Txt>
          <Txt x={140} y={290} size={20} color={MANIM.muted}>
            Fuerza contraelectromotriz
          </Txt>
          <rect x={60} y={305} width={680} height={38} fill={MANIM.panel} />
          <rect className="anim-t" x={60} y={305} width={(E / U) * 680} height={38} fill={MANIM.blue} fillOpacity={0.85} />
          <Txt x={400} y={332} size={22} color={MANIM.ink}>
            E&apos; = {E} V
          </Txt>
          <Txt x={400} y={392} size={22} color={MANIM.yellow}>
            {steps[beat]!.n}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Campo magnético giratorio del estator trifásico ───────────── */

export function buildCampoGiratorio(): AnimBuild {
  const cx = 190;
  const cy = 215;
  const R = 120;
  const axis = [90, -30, -150];
  const colors = [MANIM.red, MANIM.green, MANIM.blue];
  const names = ["a", "b", "c"];
  const ths = [0, 60, 120, 180, 240, 300, 360];
  const I = (th: number, k: number) => 10 * Math.cos(rad(th - 120 * k));
  const px = (th: number) => 430 + (th / 360) * 320;
  const py = (v: number) => 215 - v * 7;
  const curve = (k: number) =>
    Array.from({ length: 73 }, (_, i) => `${i ? "L" : "M"} ${px(i * 5).toFixed(1)} ${py(I(i * 5, k)).toFixed(1)}`).join(" ");
  const caps = [
    "El estator lleva **tres devanados** iguales, desfasados $120°$ en el espacio. Les aplicamos un sistema trifásico: tres corrientes iguales desfasadas $120°$ en el tiempo. En el instante 1: $I_a = 10$ A, $I_b = I_c = -5$ A.",
    "Cada devanado crea un campo a lo largo de su eje; la **suma** de los tres es un campo de módulo constante. En el instante 2 ($60°$) la resultante ha girado $60°$.",
    "Instante 3 ($120°$): ha girado otros $60°$.",
    "Instante 4 ($180°$): ahora $I_a$ es la más negativa y la resultante apunta al lado opuesto.",
    "Instante 5 ($240°$).",
    "Instante 6 ($300°$).",
    "Instante 7 ($360°$): la configuración se repite. El campo da **una vuelta por ciclo**: gira a $n_1 = \\dfrac{60\\,f_1}{p}$ rpm (velocidad de sincronismo), con $p$ pares de polos.",
  ];
  return {
    label: "Campo magnético giratorio creado por tres corrientes alternas desfasadas 120°",
    beatMs: 4200,
    captions: caps,
    render: (beat) => {
      const th = ths[beat]!;
      const fieldAng = 90 - th;
      const fx = cx + 1.0 * 100 * Math.cos(rad(fieldAng));
      const fy = cy - 1.0 * 100 * Math.sin(rad(fieldAng));
      return (
        <Canvas>
          <circle cx={cx} cy={cy} r={R + 20} fill="none" stroke={MANIM.muted} strokeWidth={14} strokeOpacity={0.3} />
          <circle cx={cx} cy={cy} r={R - 6} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={2} />
          {axis.map((a, k) => {
            const x = cx + (R + 38) * Math.cos(rad(a));
            const y = cy - (R + 38) * Math.sin(rad(a));
            return (
              <g key={k}>
                <line x1={cx - (R + 20) * Math.cos(rad(a))} y1={cy + (R + 20) * Math.sin(rad(a))} x2={cx + (R + 20) * Math.cos(rad(a))} y2={cy - (R + 20) * Math.sin(rad(a))} stroke={colors[k]} strokeWidth={3} strokeOpacity={0.55} strokeDasharray="6 6" />
                <Txt x={x} y={y + 6} size={20} color={colors[k]}>
                  {names[k]}
                </Txt>
              </g>
            );
          })}
          <Arrow x1={cx} y1={cy} x2={fx} y2={fy} color={MANIM.yellow} width={8} head={18} />
          <Txt x={cx} y={cy + 8} size={16} color={MANIM.ink}>
            B
          </Txt>
          <Txt x={cx} y={400} size={20} color={MANIM.yellow}>
            ωt = {th}°
          </Txt>
          <Axes x0={430} y0={215} x1={770} y1={50} xLabel="ángulo" yLabel="I (A)" />
          {[0, 1, 2].map((k) => (
            <path key={k} d={curve(k)} fill="none" stroke={colors[k]} strokeWidth={3} />
          ))}
          <line x1={px(th)} y1={70} x2={px(th)} y2={360} stroke={MANIM.ink} strokeWidth={2} strokeDasharray="5 5" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <circle className="anim-t" cx={px(th)} cy={py(I(th, k))} r={7} fill={colors[k]} />
              <Txt x={450 + k * 112} y={34} size={17} color={colors[k]} anchor="start">
                I{names[k]} = {f1(I(th, k), 1)} A
              </Txt>
            </g>
          ))}
        </Canvas>
      );
    },
  };
}

/* ───────────── Arranque estrella-triángulo ───────────── */

export function buildEstrellaTriangulo(): AnimBuild {
  const cap = [
    "Un motor preparado para trabajar en **triángulo** arranca con los devanados en **estrella**: cada uno recibe la tensión de línea dividida por $\\sqrt{3}$.",
    "Con tensión reducida a $U_L/\\sqrt{3}$, la corriente baja en esa proporción y el par, con el **cuadrado** de la tensión: $I \\propto U$ y $M \\propto U^2$. Tomamos como unidad el arranque en estrella.",
    "Cuando el motor ha cogido velocidad, se conecta en **triángulo**: cada devanado recibe $U_L$. Corriente de arranque y par serían **3 veces mayores** si se arrancara directamente en triángulo.",
    "Conclusión: $I_{a\\Delta} = 3\\,I_{aY}$ y $M_{a\\Delta} = 3\\,M_{aY}$. Con estrella-triángulo se divide **por 3** la corriente de arranque (y también el par de arranque).",
  ];
  const Y = [1, 1, 3, 3];
  const showD = [false, false, true, true];
  return {
    label: "Arranque estrella-triángulo: la corriente y el par de arranque se reducen a la tercera parte",
    beatMs: 5600,
    captions: cap,
    render: (beat) => (
      <Canvas>
        <g>
          <Txt x={150} y={50} size={22} color={MANIM.orange}>
            Estrella (Y)
          </Txt>
          {[90, 210, 330].map((a) => (
            <line key={a} x1={150} y1={150} x2={150 + 70 * Math.cos(rad(a))} y2={150 - 70 * Math.sin(rad(a))} stroke={MANIM.orange} strokeWidth={7} strokeLinecap="round" />
          ))}
          <Txt x={150} y={255} size={18} color={MANIM.muted}>
            U_f = U_L / √3
          </Txt>
        </g>
        <Fade show={showD[beat]!}>
          <Txt x={150} y={310} size={22} color={MANIM.green}>
            Triángulo (Δ)
          </Txt>
          <polygon points="150,335 100,405 200,405" fill="none" stroke={MANIM.green} strokeWidth={7} strokeLinejoin="round" />
          <Txt x={270} y={380} size={18} color={MANIM.muted} anchor="start">
            U_f = U_L
          </Txt>
        </Fade>
        {[
          { x: 480, label: "Corriente de arranque", color: MANIM.red },
          { x: 680, label: "Par de arranque", color: MANIM.blue },
        ].map((b, i) => (
          <g key={b.label}>
            <rect x={b.x - 40} y={80} width={80} height={270} fill={MANIM.panel} />
            <rect className="anim-t" x={b.x - 40} y={350 - (beat === 0 ? 0 : (Y[beat]! / 3) * 270 * (i === 0 ? 1 : 1))} width={80} height={beat === 0 ? 0 : (Y[beat]! / 3) * 270} fill={b.color} fillOpacity={0.85} />
            <Txt x={b.x} y={380} size={17} color={MANIM.muted}>
              {b.label}
            </Txt>
            <Txt x={b.x} y={340 - (beat === 0 ? 0 : (Y[beat]! / 3) * 270) - 8} size={22} color={b.color}>
              {beat === 0 ? "" : Y[beat] === 1 ? (i === 0 ? "I_Y" : "M_Y") : i === 0 ? "3 · I_Y" : "3 · M_Y"}
            </Txt>
          </g>
        ))}
        <Fade show={beat === 3}>
          <Txt x={580} y={34} size={20} color={MANIM.yellow}>
            I_aΔ = 3·I_aY · M_aΔ = 3·M_aY
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Motor monofásico: por qué no arranca solo ───────────── */

export function buildMonofasicoArranque(): AnimBuild {
  const cx = 200;
  const cy = 215;
  const R = 110;
  const ph = (ang: number, len: number, color: string, w = 4) => (
    <Arrow x1={cx} y1={cy} x2={cx + len * Math.cos(rad(ang))} y2={cy - len * Math.sin(rad(ang))} color={color} width={w} head={12} />
  );
  const phasor = (ang: number, len: number, color: string, label: string) => (
    <g>
      <Arrow x1={560} y1={215} x2={560 + len * Math.cos(rad(ang))} y2={215 - len * Math.sin(rad(ang))} color={color} width={4} head={11} />
      <Txt x={560 + (len + 22) * Math.cos(rad(ang))} y={215 - (len + 12) * Math.sin(rad(ang)) + 6} size={20} color={color}>
        {label}
      </Txt>
    </g>
  );
  return {
    label: "Motor monofásico: el campo alternativo no gira, por eso hace falta un devanado auxiliar desfasado",
    beatMs: 5800,
    captions: [
      "Con corriente **monofásica** en el devanado principal aparece un campo **alternativo de eje fijo**: crece, se anula y cambia de sentido, siempre en la misma dirección. No gira.",
      "Ese campo equivale a **dos campos giratorios** de la mitad de amplitud y sentidos **opuestos**. Producen pares iguales y contrarios: el **par de arranque es cero** y el motor no arranca solo.",
      "Un **devanado auxiliar** a $90°$ (en el espacio), con una corriente **desfasada** de la principal, crea un campo **giratorio**: el motor arranca. Es el método de **fase partida**; después se desconecta el auxiliar.",
      "Si se coloca un **condensador** en serie con el devanado auxiliar, las corrientes quedan desfasadas casi $90°$ y el par de arranque es **mayor**. Un interruptor centrífugo abre el circuito auxiliar al llegar a la velocidad nominal.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={cx} cy={cy} r={R + 14} fill="none" stroke={MANIM.muted} strokeWidth={12} strokeOpacity={0.3} />
        <circle cx={cx} cy={cy} r={R - 8} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={cx} y1={cy - R - 10} x2={cx} y2={cy + R + 10} stroke={MANIM.red} strokeWidth={3} strokeDasharray="6 6" />
        <Txt x={cx} y={cy - R - 22} size={16} color={MANIM.red}>
          principal
        </Txt>
        <Fade show={beat === 0}>
          <Arrow x1={cx} y1={cy + 70} x2={cx} y2={cy - 90} color={MANIM.yellow} width={7} />
          <Txt x={cx + 20} y={cy - 30} size={22} color={MANIM.yellow} anchor="start">
            B(t)
          </Txt>
          <Txt x={cx} y={400} size={18} color={MANIM.muted}>
            campo alternativo, eje fijo
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          {ph(45, 70, MANIM.blue)}
          {ph(135, 70, MANIM.green)}
          <Arrow x1={cx} y1={cy} x2={cx} y2={cy - 100} color={MANIM.yellow} width={7} head={16} />
          <Txt x={cx + 90} y={cy - 70} size={18} color={MANIM.blue} anchor="start">
            ↻ B/2
          </Txt>
          <Txt x={cx - 90} y={cy - 70} size={18} color={MANIM.green} anchor="end">
            B/2 ↺
          </Txt>
          <Txt x={cx} y={400} size={17} color={MANIM.muted}>
            dos campos opuestos: M_arranque = 0
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={cx - R - 10} y1={cy} x2={cx + R + 10} y2={cy} stroke={MANIM.green} strokeWidth={3} strokeDasharray="6 6" />
          <Txt x={cx + R + 28} y={cy + 6} size={16} color={MANIM.green} anchor="start">
            auxiliar
          </Txt>
          {ph(beat === 2 ? 50 : 35, 100, MANIM.yellow, 8)}
          <path d={`M ${cx + 60} ${cy - 20} A 60 60 0 0 0 ${cx} ${cy - 70}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={cx} y={400} size={18} color={MANIM.yellow}>
            campo giratorio: el motor arranca
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={560} y={60} size={20} color={MANIM.muted}>
            diagrama vectorial
          </Txt>
          {phasor(0, 150, MANIM.ink, "U")}
          {phasor(beat === 2 ? -20 : -20, 130, MANIM.red, "I_p")}
          {phasor(beat === 2 ? -55 : 70, 110, MANIM.green, "I_a")}
          <Txt x={560} y={340} size={18} color={MANIM.muted}>
            {beat === 2 ? "desfase pequeño (≈ 35°)" : "con condensador: ≈ 90°"}
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <rect x={650} y={118} width={14} height={40} fill={MANIM.blue} />
          <rect x={668} y={118} width={14} height={40} fill={MANIM.blue} />
          <Txt x={690} y={102} size={16} color={MANIM.blue} anchor="middle">
            condensador
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
