import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Viscosidad: ley de Newton con dos placas ───────────── */

export function buildViscosidadPlacas(): AnimBuild {
  const levels = [0, 1, 2, 3];
  return {
    label: "Viscosidad: el fluido entre una placa móvil y una fija se reparte en capas con velocidad lineal",
    beatMs: 5600,
    captions: [
      "Dos placas paralelas separadas una distancia $y$, con aceite entre ellas. La placa inferior está **fija**.",
      "Se tira de la placa superior con una fuerza $F$ constante: se mueve con velocidad $U$. El aceite pegado a ella **se mueve con ella** y el pegado a la fija **se queda quieto**.",
      "Entre medias, la velocidad varía de forma **lineal**: unas capas arrastran a otras por el **rozamiento interno**. $\\dfrac{\\Delta v}{\\Delta y}$ es la variación de velocidad con la distancia.",
      "Ley de Newton: $\\tau = \\dfrac{F}{S} = \\mu\\,\\dfrac{\\Delta v}{\\Delta y}$. $\\mu$ es la **viscosidad dinámica**. Aceite espeso: $\\mu$ alto (cuesta más arrastrar); agua: $\\mu$ baja.",
    ],
    render: (beat) => {
      const U = beat >= 1 ? 1 : 0;
      return (
        <Canvas>
          <rect x={150} y={290} width={480} height={18} fill={MANIM.muted} fillOpacity={0.6} />
          <Txt x={110} y={304} size={17} color={MANIM.muted} anchor="end">
            placa fija
          </Txt>
          <rect className="anim-t" x={150} y={90} width={480} height={18} fill={MANIM.orange} fillOpacity={0.85} style={{ transform: `translate(${U * 36}px, 0px)` }} />
          <Txt x={110} y={104} size={17} color={MANIM.orange} anchor="end">
            placa móvil
          </Txt>
          <rect x={150} y={108} width={480} height={182} fill={MANIM.blue} fillOpacity={0.14} />
          {levels.map((k) => {
            const y = 124 + k * 52;
            const f = (290 - y) / 182;
            return (
              <g key={k}>
                <line x1={170} y1={y} x2={610} y2={y} stroke={MANIM.blue} strokeWidth={2} strokeOpacity={0.5} />
                <g className="anim-t" style={{ transform: `translate(${U * f * 36}px, 0px)` }}>
                  {[0, 1, 2].map((i) => (
                    <circle key={i} cx={230 + i * 150} cy={y} r={7} fill={MANIM.blue} />
                  ))}
                </g>
              </g>
            );
          })}
          <Fade show={beat >= 1}>
            <Arrow x1={640} y1={99} x2={730} y2={99} color={MANIM.red} width={6} />
            <Txt x={690} y={78} size={22} color={MANIM.red}>
              F · U
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <line x1={700} y1={290} x2={700} y2={108} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 5" />
            <polygon points="700,290 780,290 700,108" fill={MANIM.yellow} fillOpacity={0.18} stroke={MANIM.yellow} strokeWidth={2} />
            <Txt x={745} y={330} size={17} color={MANIM.yellow}>
              v(y) lineal
            </Txt>
          </Fade>
          <line x1={140} y1={108} x2={140} y2={290} stroke={MANIM.green} strokeWidth={2.5} />
          <Txt x={128} y={205} size={22} color={MANIM.green} anchor="end">
            y
          </Txt>
          <Fade show={beat === 3}>
            <Txt x={400} y={372} size={26} color={MANIM.yellow}>
              τ = F/S = μ · Δv/Δy
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Flujo laminar y turbulento ───────────── */

export function buildFlujoLaminarTurbulento(): AnimBuild {
  const ys = [90, 130, 170, 210, 250];
  const turb = (y: number, i: number) => {
    const a = (i % 2 ? 1 : -1) * (14 + (i % 3) * 7);
    return `M 80 ${y} L 240 ${y} L 290 ${y + a} L 340 ${y - a} L 390 ${y + a * 0.7} L 440 ${y - a} L 490 ${y + a * 0.5} L 560 ${y}`;
  };
  return {
    label: "Régimen laminar (capas que no se mezclan) y turbulento (remolinos)",
    beatMs: 5600,
    captions: [
      "En **régimen laminar** las partículas siguen trayectorias paralelas, las **líneas de corriente**: unas capas deslizan sobre otras sin mezclarse. La viscosidad amortigua cualquier tendencia a turbulencia.",
      "En un tubo real la velocidad no es uniforme: es **máxima en el centro** y casi nula junto a la pared, por la viscosidad. Cada capa tiene una velocidad distinta.",
      "Si hay obstáculos, cambios de dirección o más velocidad, el flujo se vuelve **turbulento**: remolinos y mezcla. Aumentan las pérdidas de carga.",
      "Velocidades habituales en una instalación oleohidráulica: de $1{,}5$ a $2{,}5$ m/s en **aspiración y descarga** y de $2{,}5$ a $5$ m/s en tuberías de **presión**.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={80} y={60} width={480} height={220} fill="none" stroke={MANIM.muted} strokeWidth={4} />
        {beat <= 1
          ? ys.map((y, i) => <line key={i} x1={90} y1={y} x2={550} y2={y} stroke={MANIM.blue} strokeWidth={4} strokeOpacity={0.8} />)
          : ys.map((y, i) => <path key={i} d={turb(y, i)} fill="none" stroke={MANIM.orange} strokeWidth={4} strokeOpacity={0.85} />)}
        <Fade show={beat === 1}>
          {ys.map((y, i) => {
            const v = 1 - ((y - 170) / 110) ** 2;
            return <Arrow key={i} x1={600} y1={y} x2={600 + v * 130} y2={y} color={MANIM.green} width={4} head={10} />;
          })}
          <path d="M 600 60 Q 760 170 600 280" fill="none" stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="6 5" />
          <Txt x={680} y={310} size={16} color={MANIM.yellow}>
            v máx en el centro
          </Txt>
        </Fade>
        <Txt x={320} y={330} size={22} color={beat >= 2 && beat !== 3 ? MANIM.orange : MANIM.blue}>
          {beat === 2 ? "turbulento: remolinos" : beat === 3 ? "1,5–2,5 m/s aspiración · 2,5–5 m/s presión" : "laminar: líneas de corriente"}
        </Txt>
      </Canvas>
    ),
  };
}

/* ───────────── Prensa hidráulica ───────────── */

export function buildPrensaHidraulica(): AnimBuild {
  const dy = [0, 0, 36, 36];
  return {
    label: "Prensa hidráulica: la misma presión sobre dos émbolos multiplica la fuerza",
    beatMs: 5800,
    captions: [
      "Dos cilindros de **distinta sección** ($S_1 = 2{,}5$ cm², $S_2 = 150$ cm²) unidos por una conducción y llenos de aceite, que es prácticamente **incompresible**.",
      "Pascal: la presión aplicada a un fluido confinado se transmite **íntegramente** en todas las direcciones. Con $F_1 = 50$ N: $p = F_1/S_1$ es la misma en los dos émbolos.",
      "Igualando presiones, $\\dfrac{F_1}{S_1} = \\dfrac{F_2}{S_2}$: $F_2 = F_1\\,\\dfrac{S_2}{S_1} = 50\\cdot\\dfrac{150}{2{,}5} = 3\\,000$ N. **La fuerza se multiplica por 60.**",
      "Pero el volumen que sale del pequeño es el que entra en el grande: $S_1\\,l_1 = S_2\\,l_2$. Lo que se gana en fuerza se pierde en **recorrido**: hacen falta $86$ emboladas para subir $10$ cm.",
    ],
    render: (beat) => {
      const small = dy[beat]!;
      const bigUp = beat >= 2 ? (beat === 2 ? 4 : 28) : 0;
      return (
        <Canvas>
          <rect x={120} y={190} width={80} height={170} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.muted} strokeWidth={4} />
          <rect x={480} y={230} width={200} height={130} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.muted} strokeWidth={4} />
          <rect x={200} y={330} width={280} height={30} fill={MANIM.blue} fillOpacity={0.35} />
          <rect className="anim-t" x={124} y={170 + small} width={72} height={22} fill={MANIM.muted} />
          <line className="anim-t" x1={160} y1={170 + small} x2={160} y2={110 + small} stroke={MANIM.muted} strokeWidth={8} />
          <rect className="anim-t" x={484} y={210 - bigUp} width={192} height={22} fill={MANIM.muted} />
          <rect className="anim-t" x={470} y={190 - bigUp} width={220} height={20} fill={MANIM.orange} fillOpacity={0.85} />
          <Txt x={580} y={178 - bigUp} size={17} color={MANIM.orange}>
            carga
          </Txt>
          <Fade show={beat >= 1}>
            <Arrow x1={160} y1={50 + small} x2={160} y2={104 + small} color={MANIM.red} width={6} />
            <Txt x={190} y={80 + small} size={22} color={MANIM.red} anchor="start">
              F₁ = 50 N
            </Txt>
            <Txt x={300} y={310} size={20} color={MANIM.green}>
              p = F₁/S₁ = F₂/S₂
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Arrow x1={580} y1={140 - bigUp} x2={580} y2={60 - bigUp} color={MANIM.green} width={9} head={18} />
            <Txt x={620} y={110 - bigUp} size={22} color={MANIM.green} anchor="start">
              F₂ = 3 000 N
            </Txt>
          </Fade>
          <Txt x={160} y={385} size={16} color={MANIM.muted}>
            S₁ = 2,5 cm²
          </Txt>
          <Txt x={580} y={385} size={16} color={MANIM.muted}>
            S₂ = 150 cm²
          </Txt>
          <Fade show={beat === 3}>
            <Txt x={400} y={40} size={22} color={MANIM.yellow}>
              S₁·l₁ = S₂·l₂ · el émbolo pequeño recorre 60 veces más
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Continuidad y Bernoulli en un estrechamiento ───────────── */

export function buildContinuidadBernoulli(): AnimBuild {
  const d1 = 140;
  const d2 = 50;
  const top = (d: number) => 215 - d / 2;
  const bot = (d: number) => 215 + d / 2;
  const tube = `M 60 ${top(d1)} L 260 ${top(d1)} L 340 ${top(d2)} L 460 ${top(d2)} L 540 ${top(d1)} L 740 ${top(d1)} L 740 ${bot(d1)} L 540 ${bot(d1)} L 460 ${bot(d2)} L 340 ${bot(d2)} L 260 ${bot(d1)} L 60 ${bot(d1)} Z`;
  const col = (x: number, h: number, c: string) => (
    <g>
      <rect x={x - 14} y={top(d1) - 100} width={28} height={100} fill="none" stroke={MANIM.muted} strokeWidth={2} />
      <rect className="anim-t" x={x - 12} y={top(d1) - h} width={24} height={h} fill={c} fillOpacity={0.8} />
    </g>
  );
  return {
    label: "Un estrechamiento: la velocidad aumenta (continuidad) y la presión disminuye (Bernoulli)",
    beatMs: 5800,
    captions: [
      "Un líquido **incompresible** circula por una tubería con un estrechamiento. Por cada sección pasa **el mismo caudal** en cada instante: $Q_1 = Q_2$.",
      "Ley de **continuidad**: $S_1\\,v_1 = S_2\\,v_2$. Donde la sección es menor, la velocidad es mayor. Con diámetros: $D_1^2\\,v_1 = D_2^2\\,v_2$ (la velocidad varía con el inverso del **cuadrado** del diámetro).",
      "**Bernoulli** (tubería horizontal): $p_1 + \\tfrac12 d\\,v_1^2 = p_2 + \\tfrac12 d\\,v_2^2$. Al aumentar la velocidad, la **presión baja**: el manómetro del estrechamiento marca menos.",
      "Este efecto sirve para **medir el caudal**: $v_1 = S_2\\sqrt{\\dfrac{2(p_1 - p_2)}{d\\,(S_1^2 - S_2^2)}}$ y $Q = v_1\\,S_1$. Si la presión baja hasta la de vapor, aparece la **cavitación**.",
    ],
    render: (beat) => (
      <Canvas>
        <path d={tube} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.muted} strokeWidth={4} />
        <Fade show={beat >= 1}>
          <Arrow x1={100} y1={215} x2={170} y2={215} color={MANIM.green} width={4} head={12} />
          <Txt x={135} y={196} size={18} color={MANIM.green}>
            v₁ (lenta)
          </Txt>
          <Arrow x1={350} y1={215} x2={450} y2={215} color={MANIM.red} width={8} head={16} />
          <Txt x={400} y={178} size={18} color={MANIM.red}>
            v₂ (rápida)
          </Txt>
          <Txt x={135} y={300} size={18} color={MANIM.muted}>
            S₁
          </Txt>
          <Txt x={400} y={300} size={18} color={MANIM.muted}>
            S₂ &lt; S₁
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          {col(160, 78, MANIM.green)}
          {col(400, 38, MANIM.red)}
          <Txt x={160} y={top(d1) - 112} size={18} color={MANIM.green}>
            p₁ alta
          </Txt>
          <Txt x={400} y={top(d1) - 112} size={18} color={MANIM.red}>
            p₂ baja
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={600} y={330} size={20} color={MANIM.yellow}>
            Q = v₁ · S₁ (venturi)
          </Txt>
        </Fade>
        <Fade show={beat === 0}>
          <Txt x={400} y={340} size={22} color={MANIM.yellow}>
            Q₁ = Q₂
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Bomba de engranajes ───────────── */

export function buildBombaEngranajes(): AnimBuild {
  const R = 52;
  const teeth = 10;
  const gear = (cx: number, cy: number, rot: number, color: string) => (
    <g className="anim-t" style={{ transform: `translate(${cx}px, ${cy}px) rotate(${rot}deg)` }}>
      <circle cx={0} cy={0} r={R} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={4} />
      {Array.from({ length: teeth }, (_, i) => (
        <rect key={i} x={-7} y={-R - 14} width={14} height={20} fill={color} transform={`rotate(${(360 / teeth) * i})`} />
      ))}
      <circle cx={0} cy={0} r={8} fill={MANIM.surface} stroke={color} strokeWidth={3} />
    </g>
  );
  const r = [0, 25, 60, 100];
  return {
    label: "Bomba de engranajes: el aceite viaja entre los dientes y la carcasa",
    beatMs: 5600,
    captions: [
      "Dos ruedas dentadas **gemelas** engranan dentro de una carcasa. Por un lado está la **entrada** (aspiración) y por el otro la **salida** (impulsión).",
      "Al girar, los dientes **se separan** en el lado de entrada: se crea un hueco y el aceite lo llena (aspiración).",
      "Las cámaras entre dientes y carcasa **arrastran el aceite** por la periferia hasta la salida: no pasa por el centro porque ahí los dientes engranan y cierran.",
      "En la salida los dientes **vuelven a engranar** y expulsan el aceite hacia el circuito. Caudal: $Q = \\dfrac{\\pi\\,z\\,m^2\\,h\\,n}{500\\,000}$ l/min. Es la bomba más usada en maquinaria móvil.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={190} y={80} width={290} height={190} rx={50} fill="none" stroke={MANIM.muted} strokeWidth={5} />
        {gear(280, 175, r[beat]!, MANIM.blue)}
        {gear(390, 175, -r[beat]! + 18, MANIM.green)}
        <Arrow x1={90} y1={175} x2={180} y2={175} color={MANIM.blue} width={7} />
        <Txt x={100} y={150} size={20} color={MANIM.blue}>
          entrada
        </Txt>
        <Arrow x1={490} y1={175} x2={590} y2={175} color={MANIM.red} width={7} />
        <Txt x={560} y={150} size={20} color={MANIM.red}>
          salida
        </Txt>
        <Fade show={beat === 1}>
          <Txt x={335} y={300} size={17} color={MANIM.blue}>
            se abre el hueco → aspira
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <path d="M 225 110 Q 335 40 445 110" fill="none" stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="8 6" />
          <path d="M 225 240 Q 335 310 445 240" fill="none" stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="8 6" />
          <Txt x={335} y={320} size={18} color={MANIM.yellow}>
            el aceite viaja por la pared
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={335} y={330} size={20} color={MANIM.yellow}>
            Q = π·z·m²·h·n / 500 000
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Unidad hidráulica con válvula limitadora ───────────── */

export function buildLimitadoraDescarga(): AnimBuild {
  return {
    label: "Válvula limitadora de presión: descarga el aceite al depósito al superar el valor tarado",
    beatMs: 5800,
    captions: [
      "La **bomba** aspira aceite del depósito y lo envía al circuito. La válvula limitadora, colocada justo detrás, está **cerrada** por su muelle: la presión de trabajo es la normal.",
      "El cilindro llega al **final de carrera** y no admite más aceite: la presión sube más y más, porque la bomba sigue impulsando caudal.",
      "Cuando la presión supera la fuerza del muelle ($F = p_s\\,S$), la válvula **abre** y el aceite vuelve al depósito: la presión no pasa del valor tarado.",
      "Con una válvula distribuidora de **tres posiciones y centro abierto**, en reposo el aceite va directo al depósito **sin pasar por la limitadora**: la bomba trabaja en vacío y el aceite no se calienta.",
    ],
    render: (beat) => {
      const open = beat === 2;
      const p = [60, 60, 150, 20][beat]!;
      return (
        <Canvas>
          <Box x={140} y={330} w={170} h={50} color={MANIM.blue} label="Depósito" size={17} />
          <Box x={140} y={170} w={120} h={90} color={MANIM.green} label="Bomba" size={17} />
          <line x1={140} y1={305} x2={140} y2={216} stroke={MANIM.blue} strokeWidth={5} />
          <path d="M 200 170 L 330 170" fill="none" stroke={MANIM.orange} strokeWidth={6} />
          <path d="M 270 170 L 270 250" fill="none" stroke={open ? MANIM.red : MANIM.muted} strokeWidth={5} className="anim-t" />
          <rect x={246} y={250} width={48} height={60} fill={MANIM.panel} stroke={open ? MANIM.red : MANIM.muted} strokeWidth={3} />
          <Txt x={270} y={285} size={14} color={open ? MANIM.red : MANIM.muted}>
            {open ? "abre" : "cierra"}
          </Txt>
          <path d={`M 270 310 L 270 340 L 225 340`} fill="none" stroke={open ? MANIM.red : MANIM.muted} strokeWidth={5} className="anim-t" />
          <Txt x={286} y={236} size={14} color={MANIM.muted} anchor="start">
            limitadora
          </Txt>
          <rect x={410} y={145} width={260} height={50} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <rect className="anim-t" x={414} y={149} width={beat === 0 ? 20 : 140} height={42} fill={MANIM.orange} fillOpacity={0.5} />
          <rect className="anim-t" x={414 + (beat === 0 ? 20 : 140)} y={149} width={14} height={42} fill={MANIM.green} />
          <path d="M 330 170 L 410 170" fill="none" stroke={MANIM.orange} strokeWidth={6} />
          <Txt x={540} y={130} size={16} color={MANIM.muted}>
            cilindro
          </Txt>
          <rect x={440} y={250} width={220} height={26} fill={MANIM.panel} />
          <rect className="anim-t" x={440} y={250} width={(p / 150) * 220} height={26} fill={p >= 150 ? MANIM.red : MANIM.green} fillOpacity={0.9} />
          <Txt x={550} y={242} size={16} color={MANIM.muted}>
            presión en la línea
          </Txt>
          <Txt x={550} y={310} size={20} color={MANIM.yellow}>
            {["trabajo normal", "cilindro a tope: sube p", "p = presión de tarado: descarga", "centro abierto: bomba en vacío"][beat]}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Válvula 4/3 y cilindro de doble efecto ───────────── */

export function buildValvula43Cilindro(): AnimBuild {
  const pos = [1, 0, 2, 1];
  const px = [0, 1, 0, 0.5];
  return {
    label: "Cilindro de doble efecto gobernado por una válvula 4/3: avance, parada y retroceso",
    beatMs: 5800,
    captions: [
      "Posición **central**: la válvula 4/3 está en reposo y el aceite de la bomba **vuelve al depósito** (P → R). El cilindro está parado, con las dos cámaras bloqueadas.",
      "Se acciona la posición 1: **P conecta con B** (cámara trasera) y **A con el escape R**. El vástago **avanza**.",
      "Se acciona la posición 3: **P conecta con A** y **B con el escape**. El vástago **retrocede**.",
      "Si en cualquier momento se vuelve a la posición central, el cilindro **se detiene** en el punto en que esté, porque el aceite es incompresible: el actuador se puede parar en cualquier posición (con aire oscilaría).",
    ],
    render: (beat) => {
      const L = 330;
      const W = 330;
      const x = px[beat]!;
      const pX = L + 8 + x * (W - 50);
      return (
        <Canvas>
          <rect x={L} y={60} width={W} height={56} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <rect className="anim-t" x={L + 3} y={63} width={pX - L - 3} height={50} fill={MANIM.orange} fillOpacity={beat === 1 ? 0.5 : 0.2} />
          <rect className="anim-t" x={pX + 18} y={63} width={L + W - pX - 21} height={50} fill={MANIM.blue} fillOpacity={beat === 2 ? 0.5 : 0.2} />
          <rect className="anim-t" x={pX} y={64} width={18} height={48} fill={MANIM.green} />
          <rect className="anim-t" x={pX + 18} y={82} width={L + W - pX + 40 - 30} height={10} fill={MANIM.ink} fillOpacity={0.85} />
          {[0, 1, 2].map((k) => {
            const x0 = 180 + k * 82;
            const on = pos[beat] === k;
            const nuevo = k === 0 ? "1" : k === 1 ? "2" : "3";
            return (
              <g key={k}>
                <rect className="anim-t" x={x0} y={230} width={82} height={80} fill={on ? MANIM.yellow : MANIM.panel} fillOpacity={on ? 0.22 : 0.5} stroke={on ? MANIM.yellow : MANIM.muted} strokeWidth={on ? 5 : 3} />
                <Txt x={x0 + 41} y={330} size={15} color={on ? MANIM.yellow : MANIM.muted}>
                  pos. {nuevo}
                </Txt>
              </g>
            );
          })}
          <path d="M 138 270 l 8 -10 l 8 20 l 8 -20 l 8 20 l 8 -10" fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <path d="M 426 270 l 8 -10 l 8 20 l 8 -20 l 8 20 l 8 -10" fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={205} y={226} size={15} color={MANIM.orange}>
            B
          </Txt>
          <Txt x={287} y={226} size={15} color={MANIM.green}>
            P
          </Txt>
          <Txt x={369} y={226} size={15} color={MANIM.blue}>
            A
          </Txt>
          <path d="M 205 230 L 205 160 L 345 160 L 345 116" fill="none" stroke={MANIM.orange} strokeWidth={5} />
          <path d="M 369 230 L 369 180 L 610 180 L 610 116" fill="none" stroke={MANIM.blue} strokeWidth={5} />
          <path d="M 287 310 L 287 360 L 100 360" fill="none" stroke={MANIM.green} strokeWidth={5} />
          <Txt x={100} y={384} size={16} color={MANIM.muted} anchor="start">
            P ← bomba / R → depósito
          </Txt>
          <Txt x={560} y={230} size={21} color={MANIM.yellow}>
            {["Centro: cilindro parado", "Pos. 1: avanza", "Pos. 3: retrocede", "Centro: se detiene a mitad"][beat]}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Regulación del caudal de entrada ───────────── */

export function buildRegulacionCaudalHid(): AnimBuild {
  return {
    label: "Válvula reguladora de caudal con compensación de presión: caudal constante aunque cambie la carga",
    beatMs: 5800,
    captions: [
      "Una válvula de **caudal fijo** es un orificio estrecho de sección constante: crea una **caída de presión** $\\Delta p = p_{e1} - p_{e2}$. El caudal depende de la sección, de $\\Delta p$ y de la viscosidad.",
      "Una de **caudal variable** tiene un **tornillo de regulación** que cambia la sección del orificio: más cerrado, menos caudal y menor velocidad del cilindro.",
      "Pero si cambia la carga, cambia la presión y con ella el caudal. La válvula de **presión diferencial** coloca un émbolo con un muelle: $S\\,p_{e1} = S\\,p_{e2} + F_m$.",
      "Entonces $p_{e1} - p_{e2} = F_m/S$ es **constante** (la fuerza del muelle y la sección no cambian): el caudal por el estrangulamiento es constante con independencia de la presión de entrada.",
    ],
    render: (beat) => {
      const gap = [34, 20, 20, 20][beat]!;
      return (
        <Canvas>
          <rect x={150} y={150} width={500} height={120} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <rect x={150} y={150} width={500} height={30} fill={MANIM.surface} />
          <path d={`M 150 ${210 - 30} L 360 ${210 - 30} L 380 ${210 - gap / 2} L 440 ${210 - gap / 2} L 460 ${210 - 30} L 650 ${210 - 30} L 650 ${210 + 30} L 460 ${210 + 30} L 440 ${210 + gap / 2} L 380 ${210 + gap / 2} L 360 ${210 + 30} L 150 ${210 + 30} Z`} fill={MANIM.blue} fillOpacity={0.35} className="anim-t" />
          <Arrow x1={70} y1={210} x2={140} y2={210} color={MANIM.blue} width={6} />
          <Arrow x1={660} y1={210} x2={730} y2={210} color={MANIM.blue} width={6} />
          <Txt x={110} y={190} size={17} color={MANIM.blue}>
            pₑ₁
          </Txt>
          <Txt x={700} y={190} size={17} color={MANIM.blue}>
            pₑ₂
          </Txt>
          <Fade show={beat >= 1}>
            <line x1={410} y1={90} x2={410} y2={210 - gap / 2 - 4} stroke={MANIM.red} strokeWidth={10} className="anim-t" />
            <rect x={380} y={70} width={60} height={22} fill={MANIM.red} fillOpacity={0.8} />
            <Txt x={410} y={60} size={16} color={MANIM.red}>
              tornillo de regulación
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <rect x={540} y={150} width={50} height={120} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={3} />
            <path d="M 596 210 l 8 -12 l 8 24 l 8 -24 l 8 24 l 8 -12" fill="none" stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={565} y={300} size={16} color={MANIM.green}>
              émbolo + muelle
            </Txt>
          </Fade>
          <Txt x={400} y={360} size={22} color={MANIM.yellow}>
            {["orificio fijo: Δp = pₑ₁ − pₑ₂", "orificio variable: se regula el caudal", "equilibrio: S·pₑ₁ = S·pₑ₂ + F_m", "Δp = F_m / S = constante → caudal constante"][beat]}
          </Txt>
        </Canvas>
      );
    },
  };
}
