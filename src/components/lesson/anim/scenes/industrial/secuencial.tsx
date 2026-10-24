import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";
import { Lamp, Lines, poly } from "@/components/lesson/anim/scenes/industrial/sensores";
import { Gate, wire } from "@/components/lesson/anim/scenes/industrial/logica";

const lvl = (v: number | boolean) => (v ? MANIM.green : MANIM.muted);

/** Contacto vertical (norma IEC simplificada): terminales arriba y abajo, con numeración. */
export function Contact({ x, y, kind, closed, top, bottom, label, color = MANIM.blue, h = 60, labelBelow = false }: { x: number; y: number; kind: "no" | "nc"; closed: boolean; top?: string; bottom?: string; label?: string; color?: string; h?: number; labelBelow?: boolean }) {
  const bladeEnd: [number, number] = closed ? [x, y + h] : [x + 18, y + h - 12];
  return (
    <g>
      <line x1={x} y1={y - 14} x2={x} y2={y} stroke={MANIM.muted} strokeWidth={3} />
      <line x1={x} y1={y + h} x2={x} y2={y + h + 14} stroke={MANIM.muted} strokeWidth={3} />
      <circle cx={x} cy={y} r={4} fill={color} />
      <circle cx={x} cy={y + h} r={4} fill={color} />
      <line x1={x} y1={y} x2={bladeEnd[0]} y2={bladeEnd[1]} stroke={closed ? MANIM.green : color} strokeWidth={4} strokeLinecap="round" className="anim-t" />
      {kind === "nc" ? <line x1={x - 10} y1={y + h - 14} x2={x + 10} y2={y + h - 14} stroke={color} strokeWidth={3} /> : null}
      {top ? (
        <Txt x={x - 12} y={y - 2} size={14} color={MANIM.muted} anchor="end">
          {top}
        </Txt>
      ) : null}
      {bottom ? (
        <Txt x={x - 12} y={y + h + 6} size={14} color={MANIM.muted} anchor="end">
          {bottom}
        </Txt>
      ) : null}
      {label ? (
        <Txt x={labelBelow ? x : x + 26} y={labelBelow ? y + h + 34 : y + h / 2 + 5} size={16} color={color} anchor={labelBelow ? "middle" : "start"}>
          {label}
        </Txt>
      ) : null}
    </g>
  );
}

/** Onda cuadrada a partir de tramos [t0, t1] en alto, sobre la línea base `yb` con altura `hh`. */
export function Wave({ x0, sx, yb, hh, spans, color, tEnd }: { x0: number; sx: number; yb: number; hh: number; spans: [number, number][]; color: string; tEnd: number }) {
  const pts: [number, number][] = [[x0, yb]];
  for (const [a, b] of spans) {
    pts.push([x0 + a * sx, yb], [x0 + a * sx, yb - hh], [x0 + b * sx, yb - hh], [x0 + b * sx, yb]);
  }
  pts.push([x0 + tEnd * sx, yb]);
  return <path d={poly(pts)} fill="none" stroke={color} strokeWidth={3.5} strokeLinejoin="round" />;
}

/* ───────────── 1. Con y sin memoria ───────────── */

export function buildSecuencialIntro(): AnimBuild {
  return {
    label: "Un circuito sin memoria y otro con memoria ante el mismo pulsador",
    beatMs: 5600,
    captions: [
      "Dos circuitos reciben la misma orden. Arriba, uno **combinacional**: la lámpara depende solo del estado **actual** del pulsador. Abajo, uno **secuencial**, con memoria.",
      "Se **pulsa** (a = 1): las dos lámparas se encienden. De momento no se nota la diferencia.",
      "Se **suelta** (a = 0): la lámpara del circuito combinacional se apaga; la del secuencial **sigue encendida**: recuerda que hubo una orden de marcha.",
      "Para apagar el circuito con memoria hace falta una orden distinta: **reset**. Su estado depende de las entradas y de lo que ocurrió antes.",
    ],
    render: (beat) => {
      const a = beat === 1 ? 1 : 0;
      const combOn = a === 1;
      const seqOn = beat === 1 || beat === 2;
      const reset = beat === 3;
      return (
        <Canvas>
          {/* combinacional */}
          <Txt x={60} y={48} size={19} color={MANIM.blue} anchor="start">
            Combinacional: S = f(a)
          </Txt>
          <circle cx={90} cy={110} r={20} fill={a ? MANIM.blue : MANIM.surface} stroke={MANIM.blue} strokeWidth={3.5} className="anim-t" />
          <Txt x={90} y={116} size={18} color={a ? MANIM.surface : MANIM.blue}>
            a
          </Txt>
          <Txt x={90} y={150} size={14} color={MANIM.muted}>
            {a ? "pulsado" : "suelto"}
          </Txt>
          {wire([[112, 110], [250, 110]], lvl(a))}
          <Box x={340} y={110} w={150} h={60} color={MANIM.blue} label="Combinacional" size={17} />
          {wire([[416, 110], [560, 110]], lvl(combOn))}
          <Lamp x={600} y={110} on={combOn} r={22} />
          {/* secuencial */}
          <Txt x={60} y={216} size={19} color={MANIM.orange} anchor="start">
            Secuencial: S⁺ = f(a, S)
          </Txt>
          <circle cx={90} cy={278} r={20} fill={a ? MANIM.orange : MANIM.surface} stroke={MANIM.orange} strokeWidth={3.5} className="anim-t" />
          <Txt x={90} y={284} size={18} color={a ? MANIM.surface : MANIM.orange}>
            a
          </Txt>
          <circle cx={90} cy={352} r={20} fill={reset ? MANIM.red : MANIM.surface} stroke={MANIM.red} strokeWidth={3.5} className="anim-t" />
          <Txt x={90} y={358} size={16} color={reset ? MANIM.surface : MANIM.red}>
            R
          </Txt>
          {wire([[112, 278], [250, 278]], lvl(a))}
          {wire([[112, 352], [180, 352], [180, 306], [250, 306]], reset ? MANIM.red : MANIM.muted)}
          <Box x={340} y={290} w={150} h={90} color={MANIM.orange} label="Memoria" size={17} />
          {wire([[416, 278], [560, 278]], lvl(seqOn))}
          <Lamp x={600} y={278} on={seqOn} r={22} />
          <Fade show={beat === 2}>
            <Txt x={470} y={238} size={16} color={MANIM.orange}>
              recuerda la orden anterior
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── 2. Biestable R-S con puertas NOR ───────────── */

export function buildBiestableRs(): AnimBuild {
  const states = [
    { R: 0, S: 0, Q: 0, Qb: 1 },
    { R: 0, S: 1, Q: 1, Qb: 0 },
    { R: 0, S: 0, Q: 1, Qb: 0 },
    { R: 1, S: 0, Q: 0, Qb: 1 },
    { R: 1, S: 1, Q: 0, Qb: 0 },
  ];
  return {
    label: "Biestable R-S con dos puertas NOR realimentadas",
    beatMs: 6000,
    captions: [
      "Dos puertas **NOR** conectadas en cruz: la salida de cada una entra en la otra. Con $R = S = 0$ el circuito **mantiene** el estado que tenía (aquí $Q = 0$, $\\bar Q = 1$).",
      "**Set** ($S = 1$): la puerta de abajo da $\\bar Q = 0$ y la de arriba, $Q = \\overline{R + \\bar Q} = 1$. La salida $Q$ toma el valor 1.",
      "Se vuelve a $S = 0$ y $R = 0$: el biestable **se mantiene** con $Q = 1$. Este es el **efecto de memoria**: la salida depende también del estado anterior.",
      "**Reset** ($R = 1$): $Q$ pasa a 0 y $\\bar Q$ a 1, independientemente del estado anterior.",
      "Con $S = R = 1$ las dos salidas valen 0: dejan de ser complementarias. Es un estado **prohibido** y, al soltar las dos entradas a la vez, el resultado es **indeterminado**.",
    ],
    render: (beat) => {
      const st = states[beat]!;
      const bad = beat === 4;
      const cQ = bad ? MANIM.red : lvl(st.Q);
      const cQb = bad ? MANIM.red : lvl(st.Qb);
      return (
        <Canvas>
          {/* entradas */}
          {wire([[170, 106], [352, 106]], lvl(st.R))}
          {wire([[170, 274], [352, 274]], lvl(st.S))}
          <Txt x={150} y={112} size={22} color={MANIM.red} anchor="end">
            R = {st.R}
          </Txt>
          <Txt x={150} y={280} size={22} color={MANIM.green} anchor="end">
            S = {st.S}
          </Txt>
          <Gate kind="nor" x={380} y={120} color={cQ} />
          <Gate kind="nor" x={380} y={260} color={cQb} />
          {/* salidas */}
          {wire([[426, 120], [650, 120]], cQ)}
          {wire([[426, 260], [650, 260]], cQb)}
          <Txt x={680} y={128} size={24} color={cQ} anchor="middle">
            Q = {st.Q}
          </Txt>
          <Txt x={680} y={268} size={24} color={cQb} anchor="middle">
            Q̄ = {st.Qb}
          </Txt>
          {/* realimentaciones cruzadas */}
          {wire([[500, 120], [500, 190], [310, 190], [310, 246], [352, 246]], cQ)}
          {wire([[560, 260], [560, 160], [310, 160], [310, 134], [352, 134]], cQb)}
          <circle cx={500} cy={120} r={4} fill={cQ} />
          <circle cx={560} cy={260} r={4} fill={cQb} />
          <Txt x={400} y={360} size={20} color={bad ? MANIM.red : MANIM.muted}>
            {beat === 0 ? "R = S = 0: mantiene el estado" : beat === 1 ? "S = 1: Set → Q = 1" : beat === 2 ? "R = S = 0: memoria (Q sigue en 1)" : beat === 3 ? "R = 1: Reset → Q = 0" : "R = S = 1: ¡prohibido!"}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── 3. Biestable J-K por flanco (cronograma) ───────────── */

export function buildBiestableJkDT(): AnimBuild {
  const edges = [0, 1, 2, 3, 4];
  const JK = [
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 1],
  ];
  const Q = [1, 1, 0, 1, 0];
  const X0 = 150;
  const W = 120;
  /** Las entradas J y K cambian un poco antes del flanco (shift < 0); Q lo hace justo en el flanco. */
  const stepRow = (vals: number[], yb: number, color: string, upTo: number, shift: number) => {
    const pts: [number, number][] = [[X0 - 40, yb]];
    vals.forEach((v, i) => {
      if (i > upTo) {
        return;
      }
      const x = X0 + i * W + shift;
      pts.push([x, pts[pts.length - 1]![1]], [x, v ? yb - 28 : yb], [X0 + (i + 1) * W + shift, v ? yb - 28 : yb]);
    });
    return <path d={poly(pts)} fill="none" stroke={color} strokeWidth={3.5} strokeLinejoin="round" />;
  };
  return {
    label: "Biestable J-K activado por flanco de subida del reloj",
    beatMs: 5600,
    captions: [
      "En un biestable **síncrono por flanco** solo cuenta lo que valen $J$ y $K$ en el instante del **flanco de subida** del reloj. Primer flanco: $J = 1$, $K = 0$ → **Set**, $Q = 1$.",
      "Segundo flanco: $J = K = 0$ → el biestable **mantiene** $Q$. Entre flancos, aunque cambien las entradas, la salida no se mueve.",
      "Tercer flanco: $J = 0$, $K = 1$ → **Reset**, $Q = 0$.",
      "Cuarto flanco: $J = K = 1$ → la salida **cambia de estado** ($Q = 1$): a diferencia del R-S, la combinación 11 está permitida.",
      "Quinto flanco, otra vez $J = K = 1$: $Q$ vuelve a cambiar. Uniendo $J$ y $K$ se obtiene el biestable **T**: cambia de estado en cada flanco.",
    ],
    render: (beat) => {
      const clk: [number, number][] = [[X0 - 40, 100]];
      edges.forEach((i) => {
        const x = X0 + i * W;
        clk.push([x, 100], [x, 72], [x + 55, 72], [x + 55, 100]);
      });
      clk.push([X0 + edges.length * W, 100]);
      return (
        <Canvas>
          {[
            { n: "CLK", y: 100, c: MANIM.yellow },
            { n: "J", y: 190, c: MANIM.blue },
            { n: "K", y: 270, c: MANIM.orange },
            { n: "Q", y: 350, c: MANIM.green },
          ].map((r) => (
            <g key={r.n}>
              <Txt x={90} y={r.y - 6} size={22} color={r.c} anchor="end">
                {r.n}
              </Txt>
              <line x1={X0 - 40} y1={r.y} x2={X0 + 5 * W} y2={r.y} stroke={MANIM.grid} strokeWidth={1.5} strokeDasharray="4 5" />
            </g>
          ))}
          <path d={poly(clk)} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} strokeLinejoin="round" />
          {stepRow(JK.map((p) => p[0]!), 190, MANIM.blue, beat, -25)}
          {stepRow(JK.map((p) => p[1]!), 270, MANIM.orange, beat, -25)}
          {stepRow(Q, 350, MANIM.green, beat, 0)}
          {edges.map((i) => (
            <g key={i}>
              <line x1={X0 + i * W} y1={64} x2={X0 + i * W} y2={376} stroke={i === beat ? MANIM.yellow : MANIM.grid} strokeWidth={i === beat ? 2.5 : 1.5} strokeDasharray="6 5" opacity={i <= beat ? 1 : 0.4} />
              <Fade show={i <= beat}>
                <Txt x={X0 + i * W} y={48} size={17} color={i === beat ? MANIM.yellow : MANIM.muted}>
                  J={JK[i]![0]} K={JK[i]![1]}
                </Txt>
              </Fade>
            </g>
          ))}
        </Canvas>
      );
    },
  };
}

/* ───────────── 4. Registro de desplazamiento ───────────── */

export function buildRegistroDesplazamiento(): AnimBuild {
  const states = [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
  ];
  const seq = ["", "1", "0", "1", "1"];
  return {
    label: "Registro de desplazamiento de cuatro biestables D",
    beatMs: 5600,
    captions: [
      "Un **registro de desplazamiento** son biestables D en serie con un reloj común: en cada flanco, cada uno copia a su vecino de la izquierda. Parte de $0000$. Entrarán los bits $1, 0, 1, 1$.",
      "**Flanco 1**: entra un 1. $Q_1 = 1$; los demás siguen en 0.",
      "**Flanco 2**: entra un 0. El 1 se desplaza a $Q_2$ y en $Q_1$ queda el 0.",
      "**Flanco 3**: entra un 1. El primer 1 llega a $Q_3$.",
      "**Flanco 4**: entra el último 1. El primer bit llega a $Q_4$: la palabra serie $1011$ ha quedado almacenada en paralelo, $Q_4Q_3Q_2Q_1 = 1101$ (leída en el orden de llegada).",
    ],
    render: (beat) => {
      const st = states[beat]!;
      return (
        <Canvas>
          <Txt x={60} y={78} size={19} color={MANIM.muted} anchor="start">
            Entrada serie
          </Txt>
          <Txt x={60} y={112} size={30} color={MANIM.yellow} anchor="start" mono>
            {seq[beat] || "·"}
          </Txt>
          {wire([[130, 190], [190, 190]], MANIM.yellow)}
          {[0, 1, 2, 3].map((i) => {
            const x = 190 + i * 140;
            return (
              <g key={i}>
                <Box x={x + 40} y={190} w={80} h={100} color={st[i] ? MANIM.green : MANIM.muted} label="" />
                <Txt x={x + 16} y={182} size={19} color={MANIM.ink}>
                  D
                </Txt>
                <Txt x={x + 16} y={222} size={16} color={MANIM.muted}>
                  C
                </Txt>
                <Txt x={x + 64} y={182} size={19} color={st[i] ? MANIM.green : MANIM.muted}>
                  Q{i + 1}
                </Txt>
                {i < 3 ? wire([[x + 80, 176], [x + 140, 176]], lvl(st[i]!)) : wire([[x + 80, 176], [x + 120, 176]], lvl(st[i]!))}
                <Txt x={x + 40} y={268} size={34} color={st[i] ? MANIM.green : MANIM.muted} mono>
                  {st[i]}
                </Txt>
              </g>
            );
          })}
          {wire([[190, 330], [750, 330]], MANIM.yellow, 2.5)}
          {[0, 1, 2, 3].map((i) => wire([[230 + i * 140, 330], [230 + i * 140, 244]], MANIM.yellow, 2.5))}
          <Txt x={470} y={365} size={18} color={MANIM.yellow}>
            reloj común {beat > 0 ? `· flanco ${beat}` : ""}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── 5. Elementos del control cableado ───────────── */

export function buildCableadoLadder(): AnimBuild {
  return {
    label: "Pulsadores, contactores y temporizadores: símbolos y cronogramas",
    beatMs: 6000,
    captions: [
      "**Pulsador normalmente abierto** (contactos 13-14): en reposo está **abierto**; mientras se aprieta, **se cierra**, y al soltarlo vuelve a abrir. El interruptor, en cambio, se queda en la posición en que se deja.",
      "**Pulsador normalmente cerrado** (contactos 11-12): en reposo conduce; al pulsarlo, **abre**. Se usa para las órdenes de **paro**.",
      "**Contactor o relé**: al pasar corriente por la bobina (A1-A2) los contactos **normalmente abiertos** (13-14) se cierran y los **normalmente cerrados** (21-22) se abren.",
      "**Temporizador a la conexión**: al aplicar la orden empieza a contar; pasado el tiempo $t$ cierra sus contactos. Al quitar la orden, vuelven al reposo al instante.",
      "**Temporizador a la desconexión**: al aplicar la orden conmuta al instante; al quitarla cuenta el tiempo $t$ y solo entonces vuelve al reposo.",
    ],
    render: (beat) => {
      if (beat <= 1) {
        const no = beat === 0;
        return (
          <Canvas>
            <Txt x={400} y={42} size={24} color={no ? MANIM.green : MANIM.red}>
              {no ? "Pulsador normalmente abierto (NA)" : "Pulsador normalmente cerrado (NC)"}
            </Txt>
            {[
              { x: 230, pressed: false, t: "en reposo" },
              { x: 570, pressed: true, t: "pulsado" },
            ].map((p) => {
              const closed = no ? p.pressed : !p.pressed;
              return (
                <g key={p.t}>
                  <Contact x={p.x} y={130} kind={no ? "no" : "nc"} closed={closed} top={no ? "13" : "11"} bottom={no ? "14" : "12"} color={no ? MANIM.green : MANIM.red} h={90} />
                  <rect x={p.x - 40} y={86} width={80} height={14} rx={5} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2.5} className="anim-t" style={{ transform: `translateY(${p.pressed ? 18 : 0}px)` }} />
                  <Txt x={p.x} y={300} size={20} color={MANIM.ink}>
                    {p.t}
                  </Txt>
                  <Txt x={p.x} y={332} size={18} color={closed ? MANIM.green : MANIM.muted}>
                    {closed ? "contacto cerrado: conduce" : "contacto abierto: no conduce"}
                  </Txt>
                </g>
              );
            })}
          </Canvas>
        );
      }
      if (beat === 2) {
        return (
          <Canvas>
            <Txt x={400} y={42} size={24} color={MANIM.orange}>
              Contactor o relé
            </Txt>
            {[
              { x: 200, on: false, t: "bobina sin tensión" },
              { x: 560, on: true, t: "bobina con tensión" },
            ].map((p) => (
              <g key={p.t}>
                <rect x={p.x - 70} y={80} width={110} height={46} rx={6} fill={p.on ? MANIM.orange : MANIM.surface} fillOpacity={p.on ? 0.35 : 1} stroke={MANIM.orange} strokeWidth={3.5} className="anim-t" />
                <Txt x={p.x - 15} y={110} size={20} color={MANIM.orange}>
                  KM1
                </Txt>
                <Txt x={p.x - 78} y={104} size={14} color={MANIM.muted} anchor="end">
                  A1
                </Txt>
                <Txt x={p.x + 50} y={104} size={14} color={MANIM.muted} anchor="start">
                  A2
                </Txt>
                <Contact x={p.x - 40} y={170} kind="no" closed={p.on} top="13" bottom="14" label="NA" color={MANIM.green} labelBelow />
                <Contact x={p.x + 10} y={170} kind="nc" closed={!p.on} top="21" bottom="22" label="NC" color={MANIM.red} labelBelow />
                <Txt x={p.x - 15} y={300} size={19} color={MANIM.ink}>
                  {p.t}
                </Txt>
                <Txt x={p.x - 15} y={330} size={16} color={MANIM.muted}>
                  {p.on ? "NA cerrado · NC abierto" : "NA abierto · NC cerrado"}
                </Txt>
              </g>
            ))}
          </Canvas>
        );
      }
      const conexion = beat === 3;
      const T = 20;
      const sx = 560 / 60;
      const X0 = 150;
      return (
        <Canvas>
          <Txt x={400} y={40} size={22} color={conexion ? MANIM.blue : MANIM.purple}>
            {conexion ? "Temporizador a la conexión" : "Temporizador a la desconexión"}
          </Txt>
          <Txt x={110} y={146} size={20} color={MANIM.yellow} anchor="end">
            SA1
          </Txt>
          <Txt x={110} y={266} size={20} color={MANIM.green} anchor="end">
            H1
          </Txt>
          <Wave x0={X0} sx={sx} yb={160} hh={50} spans={[[8, 38]]} color={MANIM.yellow} tEnd={60} />
          <Wave x0={X0} sx={sx} yb={280} hh={50} spans={conexion ? [[8 + T, 38]] : [[8, 38 + T]]} color={MANIM.green} tEnd={60} />
          <line x1={X0 + 8 * sx} y1={90} x2={X0 + 8 * sx} y2={300} stroke={MANIM.grid} strokeDasharray="5 5" strokeWidth={2} />
          <line x1={X0 + (conexion ? 8 + T : 38) * sx} y1={90} x2={X0 + (conexion ? 8 + T : 38) * sx} y2={300} stroke={MANIM.grid} strokeDasharray="5 5" strokeWidth={2} />
          {conexion ? (
            <g>
              <line x1={X0 + 8 * sx} y1={310} x2={X0 + (8 + T) * sx} y2={310} stroke={MANIM.red} strokeWidth={3} />
              <Txt x={X0 + (8 + T / 2) * sx} y={338} size={19} color={MANIM.red}>
                t
              </Txt>
            </g>
          ) : (
            <g>
              <line x1={X0 + 38 * sx} y1={310} x2={X0 + (38 + T) * sx} y2={310} stroke={MANIM.red} strokeWidth={3} />
              <Txt x={X0 + (38 + T / 2) * sx} y={338} size={19} color={MANIM.red}>
                t
              </Txt>
            </g>
          )}
          <Txt x={400} y={385} size={18} color={MANIM.muted}>
            {conexion ? "La lámpara se enciende t después de SA1 y se apaga a la vez que SA1" : "La lámpara se enciende a la vez que SA1 y se apaga t después de soltarlo"}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── 6. Grafo bimodal y ecuación ───────────── */

export function buildGrafoBimodal(): AnimBuild {
  return {
    label: "Teoría bimodal: del grafo a la ecuación y al esquema eléctrico",
    beatMs: 6200,
    captions: [
      "Un **grafo** representa un elemento (aquí el relé $KM_1$) con un círculo. Las flechas que **entran** son las órdenes de **marcha**; las de **paro** salen y vuelven. Ej. 1: marcha con $SB_1$ (NA), paro con $SB_2$ (NC).",
      "El círculo doble indica que el elemento está **realimentado**: debe seguir conectado aunque la orden de marcha desaparezca (el pulsador dura poco).",
      "Del grafo sale la ecuación: **elemento = condiciones de paro · (condiciones de marcha + realimentación)**. Aquí $KM_1 = \\overline{SB_2}\\cdot(SB_1 + KM_1)$.",
      "Cada término es un contacto: el **paro** en serie ($SB_2$ NC), la **marcha** y la **realimentación** en paralelo ($SB_1$ NA y el contacto $KM_1$ NA), y la bobina.",
      "Se pulsa $SB_1$: la bobina se excita y su contacto $KM_1$ se cierra. Al soltar $SB_1$ el relé **sigue conectado** a través de ese contacto (autorretención); solo $SB_2$ lo desconecta.",
    ],
    render: (beat) => {
      const on = beat === 4;
      const pressed = beat === 4;
      return (
        <Canvas>
          {/* grafo */}
          <circle cx={130} cy={230} r={44} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={4} />
          <Fade show={beat >= 1}>
            <circle cx={130} cy={230} r={34} fill="none" stroke={MANIM.ink} strokeWidth={2.5} />
          </Fade>
          <Txt x={130} y={236} size={20} color={MANIM.ink}>
            KM₁
          </Txt>
          <Arrow x1={30} y1={320} x2={98} y2={262} color={MANIM.green} width={4} head={12} />
          <Txt x={26} y={344} size={17} color={MANIM.green} anchor="start">
            SB₁ (marcha)
          </Txt>
          <path d="M 108 192 C 70 110 190 110 152 192" fill="none" stroke={MANIM.red} strokeWidth={4} className="anim-t" />
          <polygon points="152,192 140,182 158,176" fill={MANIM.red} />
          <Txt x={130} y={118} size={17} color={MANIM.red}>
            SB̄₂ (paro)
          </Txt>
          {/* ecuación */}
          <Fade show={beat >= 2}>
            <rect x={30} y={30} width={330} height={44} rx={10} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={2.5} />
            <Txt x={195} y={60} size={20} color={MANIM.yellow} mono>
              KM₁ = SB̄₂ · (SB₁ + KM₁)
            </Txt>
          </Fade>
          {/* esquema eléctrico */}
          <Fade show={beat >= 3}>
            {wire([[430, 40], [690, 40]], MANIM.muted)}
            <Txt x={415} y={46} size={16} color={MANIM.muted} anchor="end">
              L1
            </Txt>
            {wire([[470, 40], [470, 90]], MANIM.muted)}
            <Contact x={470} y={90} kind="nc" closed top="11" bottom="12" label="SB₂" color={MANIM.red} h={50} />
            {wire([[470, 154], [470, 170], [640, 170]], on ? MANIM.green : MANIM.muted)}
            {wire([[520, 170], [520, 190]], on ? MANIM.green : MANIM.muted)}
            {wire([[620, 170], [620, 190]], on ? MANIM.green : MANIM.muted)}
            <Contact x={520} y={190} kind="no" closed={pressed} top="13" bottom="14" label="SB₁" color={MANIM.green} h={50} />
            <Contact x={620} y={190} kind="no" closed={on} top="13" bottom="14" label="KM₁" color={MANIM.orange} h={50} />
            {wire([[520, 254], [520, 280], [620, 280]], on ? MANIM.green : MANIM.muted)}
            {wire([[620, 254], [620, 280]], on ? MANIM.green : MANIM.muted)}
            {wire([[570, 280], [570, 300]], on ? MANIM.green : MANIM.muted)}
            <rect x={530} y={300} width={80} height={34} rx={6} fill={on ? MANIM.orange : MANIM.surface} fillOpacity={on ? 0.4 : 1} stroke={MANIM.orange} strokeWidth={3.5} className="anim-t" />
            <Txt x={570} y={323} size={19} color={MANIM.orange}>
              KM₁
            </Txt>
            {wire([[570, 334], [570, 372], [690, 372]], on ? MANIM.green : MANIM.muted)}
            <Txt x={705} y={378} size={16} color={MANIM.muted} anchor="start">
              N
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── 7. Cronograma de la secuencia con temporizadores (ejemplo 5) ───────────── */

export function buildTemporizadoresCronograma(): AnimBuild {
  const X0 = 190;
  const sx = 540 / 60;
  const rows = [
    { n: "SB₁", c: MANIM.yellow, y: 100, spans: [[0, 2]] as [number, number][], from: 0 },
    { n: "KA₁ = H₁", c: MANIM.green, y: 160, spans: [[0, 50]] as [number, number][], from: 0 },
    { n: "KT₁ (20 s)", c: MANIM.blue, y: 220, spans: [[20, 50]] as [number, number][], from: 1 },
    { n: "KA₂ = H₂", c: MANIM.orange, y: 280, spans: [[20, 50]] as [number, number][], from: 2 },
    { n: "KT₂ (30 s)", c: MANIM.purple, y: 340, spans: [[50, 60]] as [number, number][], from: 3 },
  ];
  return {
    label: "Dos lámparas con temporizadores: 20 s para la segunda y 30 s más para apagarlo todo",
    beatMs: 6200,
    captions: [
      "Ej. 5: al pulsar $SB_1$ se conecta el relé $KA_1$ (realimentado) y se enciende la lámpara $H_1$. $KA_1$ también alimenta el temporizador $KT_1$, de 20 s.",
      "Pasados **20 s**, el contacto de $KT_1$ se cierra y se activa el relé $KA_2$. $KT_1$ se queda cerrado mientras $KA_1$ esté conectado.",
      "$KA_2$ enciende la segunda lámpara $H_2$ y alimenta el temporizador $KT_2$, de 30 s.",
      "A los **30 s** de estar encendida $H_2$, $KT_2$ abre su contacto normalmente cerrado: $KA_1 = \\overline{KT_2}\\cdot(SB_1 + KA_1)$ se desconecta.",
      "Al caer $KA_1$ se apaga $H_1$ y, con ella, se desactivan $KT_1$ y $KA_2$ ($H_2$). Las dos lámparas se apagan **a los 50 s** ($20 + 30$).",
    ],
    render: (beat) => {
      const visible = (r: (typeof rows)[number]) => beat >= r.from;
      return (
        <Canvas>
          {[0, 10, 20, 30, 40, 50, 60].map((t) => (
            <g key={t}>
              <line x1={X0 + t * sx} y1={70} x2={X0 + t * sx} y2={360} stroke={MANIM.grid} strokeWidth={t === 20 || t === 50 ? 2.5 : 1} strokeDasharray={t === 20 || t === 50 ? "6 5" : "2 6"} />
              <Txt x={X0 + t * sx} y={384} size={14} color={MANIM.muted}>
                {t}
              </Txt>
            </g>
          ))}
          <Txt x={X0 + 60 * sx + 22} y={388} size={14} color={MANIM.muted} anchor="start">
            s
          </Txt>
          {rows.map((r) => (
            <Fade key={r.n} show={visible(r)} dx={-10}>
              <Txt x={X0 - 14} y={r.y - 8} size={17} color={r.c} anchor="end">
                {r.n}
              </Txt>
              <Wave x0={X0} sx={sx} yb={r.y} hh={30} spans={r.spans} color={r.c} tEnd={60} />
            </Fade>
          ))}
          <Fade show={beat >= 4}>
            <Txt x={X0 + 50 * sx} y={64} size={19} color={MANIM.red}>
              todo se apaga a los 50 s
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── 8. Arranque estrella-triángulo ───────────── */

export function buildEstrellaTrianguloControl(): AnimBuild {
  const box = (x: number, y: number, name: string, on: boolean, role: string) => (
    <g>
      <Box x={x} y={y} w={100} h={54} color={on ? MANIM.green : MANIM.muted} label={name} size={19} active={on} />
      <Txt x={x} y={y + 44} size={14} color={MANIM.muted}>
        {role}
      </Txt>
    </g>
  );
  return {
    label: "Arranque estrella-triángulo de un motor trifásico con tres contactores y un temporizador",
    beatMs: 6200,
    captions: [
      "El circuito de **potencia** lleva tres contactores: $KM_1$ (línea, general), $KM_3$ (conecta el motor en **estrella**) y $KM_2$ (en **triángulo**), más un relé térmico $FT_1$ de protección.",
      "Al pulsar $SB_1$ se conectan $KM_1$ y $KM_3$: el motor **arranca en estrella** (menor intensidad) y a la vez empieza a contar el temporizador $KT_1$.",
      "Pasado el tiempo, $KT_1$ **desconecta $KM_3$** y conecta $KM_2$: el motor pasa a **triángulo**, su conexión normal de trabajo.",
      "$KM_2$ y $KM_3$ están **enclavados**: un contacto cerrado de cada uno en la bobina del otro impide que los dos estén conectados a la vez (cortocircuito).",
      "En cualquier momento, el pulsador de paro $SB_0$ o el disparo del relé térmico $FT_1$ desconectan todo el circuito.",
    ],
    render: (beat) => {
      const km1 = beat >= 1 && beat <= 3;
      const km3 = beat === 1;
      const km2 = beat === 2 || beat === 3;
      const stop = beat === 4;
      return (
        <Canvas>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              {wire([[60, 70 + i * 24], [740, 70 + i * 24]], MANIM.grid, 2)}
              <Txt x={44} y={76 + i * 24} size={14} color={MANIM.muted} anchor="end">
                L{i + 1}
              </Txt>
            </g>
          ))}
          {box(150, 190, "KM₁", km1 && !stop, "línea")}
          {box(330, 190, "KM₃", km3 && !stop, "estrella")}
          {box(510, 190, "KM₂", km2 && !stop, "triángulo")}
          {wire([[150, 70], [150, 163]], km1 ? MANIM.green : MANIM.grid, 3)}
          {wire([[150, 217], [150, 280], [640, 280]], km1 ? MANIM.green : MANIM.grid, 3)}
          {wire([[330, 217], [330, 280]], km3 ? MANIM.green : MANIM.grid, 3)}
          {wire([[510, 217], [510, 280]], km2 ? MANIM.green : MANIM.grid, 3)}
          {/* motor */}
          <circle cx={680} cy={280} r={36} fill={MANIM.panel} stroke={km1 || km2 ? MANIM.green : MANIM.ink} strokeWidth={4} />
          <Txt x={680} y={286} size={19} color={MANIM.ink}>
            M 3~
          </Txt>
          {/* conexión del motor */}
          <Fade show={km3 && !stop}>
            <path d="M 660 340 L 680 360 L 700 340 M 680 360 L 680 385" stroke={MANIM.orange} strokeWidth={4} fill="none" strokeLinecap="round" />
            <Txt x={560} y={366} size={18} color={MANIM.orange}>
              estrella (Y)
            </Txt>
          </Fade>
          <Fade show={km2 && !stop}>
            <path d="M 660 385 L 700 385 L 680 345 Z" stroke={MANIM.blue} strokeWidth={4} fill="none" strokeLinejoin="round" />
            <Txt x={560} y={366} size={18} color={MANIM.blue}>
              triángulo (Δ)
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <Lines x={90} y={355} size={17} gap={24} items={[{ t: "KT₁ cuenta el tiempo de arranque", c: MANIM.blue }]} />
          </Fade>
          <Fade show={beat === 3}>
            <Lines x={90} y={355} size={17} gap={24} items={[{ t: "KM₂ y KM₃ nunca a la vez (enclavamiento)", c: MANIM.red }]} />
          </Fade>
          <Fade show={stop}>
            <Lines x={90} y={355} size={17} gap={24} items={[{ t: "SB₀ o FT₁ → todo desconectado", c: MANIM.red }]} />
          </Fade>
        </Canvas>
      );
    },
  };
}

