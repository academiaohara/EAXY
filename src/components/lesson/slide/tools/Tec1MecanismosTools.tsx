"use client";

import { useState, type ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const rad = (d: number) => (d * Math.PI) / 180;

/** Duración (s) de una vuelta en pantalla: proporcional a 1/rpm, acotada para que siempre se vea. */
const vuelta = (rpm: number) => clamp(100 / Math.max(Math.abs(rpm), 0.01), 0.25, 20);

/** Grupo que gira en su sitio (o se queda quieto si está en pausa). */
function Gira({ cx, cy, rpm, dir = 1, playing, children }: { cx: number; cy: number; rpm: number; dir?: 1 | -1; playing: boolean; children: ReactNode }) {
  return (
    <g>
      {children}
      {playing && rpm > 0 ? <animateTransform attributeName="transform" type="rotate" from={dir === 1 ? `0 ${cx} ${cy}` : `360 ${cx} ${cy}`} to={dir === 1 ? `360 ${cx} ${cy}` : `0 ${cx} ${cy}`} dur={`${vuelta(rpm)}s`} repeatCount="indefinite" /> : null}
    </g>
  );
}

function PlayBtn({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button type="button" className={TOOL_BTN} aria-pressed={playing} onClick={onToggle}>
      {playing ? "Pausar el giro" : "Reanudar el giro"}
    </button>
  );
}

/* ───────────── 3.1 Desmontaje virtual de una máquina ───────────── */

type Rol = "Entrada" | "Transmisión" | "Transformación" | "Salida";
const ROLES: Record<Rol, string> = { Entrada: MANIM.green, Transmisión: MANIM.blue, Transformación: MANIM.orange, Salida: MANIM.purple };
const MAQUINAS = [
  {
    n: "Bicicleta",
    piezas: [
      { n: "Pedales y bielas", rol: "Entrada" as Rol, fn: "El ciclista aplica una fuerza que se convierte en giro del eje del pedalier.", mov: "circular" },
      { n: "Plato", rol: "Transmisión" as Rol, fn: "Rueda dentada grande: arrastra la cadena.", mov: "circular" },
      { n: "Cadena", rol: "Transmisión" as Rol, fn: "Lleva el movimiento del plato al piñón, a distancia.", mov: "circular → circular" },
      { n: "Piñón", rol: "Transmisión" as Rol, fn: "Rueda dentada pequeña: multiplica el giro (relación de transmisión).", mov: "circular" },
      { n: "Rueda trasera", rol: "Salida" as Rol, fn: "Convierte el giro en avance al contactar con el suelo.", mov: "circular → lineal" },
    ],
  },
  {
    n: "Taladro de columna",
    piezas: [
      { n: "Motor eléctrico", rol: "Entrada" as Rol, fn: "Aporta el giro rápido con potencia eléctrica.", mov: "circular" },
      { n: "Poleas y correa", rol: "Transmisión" as Rol, fn: "Reducen la velocidad del motor y aumentan el par; permiten elegir varias velocidades.", mov: "circular" },
      { n: "Piñón y cremallera de avance", rol: "Transformación" as Rol, fn: "La palanca hace girar un piñón que mueve la cremallera: giro → movimiento lineal.", mov: "circular → lineal" },
      { n: "Husillo y broca", rol: "Salida" as Rol, fn: "Gira y baja para hacer el agujero.", mov: "circular + lineal" },
    ],
  },
  {
    n: "Limpiaparabrisas",
    piezas: [
      { n: "Motor eléctrico", rol: "Entrada" as Rol, fn: "Aporta el giro.", mov: "circular" },
      { n: "Reductor de tornillo sin fin", rol: "Transmisión" as Rol, fn: "Reduce mucho la velocidad y multiplica el par.", mov: "circular" },
      { n: "Biela-manivela", rol: "Transformación" as Rol, fn: "Convierte el giro continuo en movimiento de vaivén.", mov: "circular → oscilante" },
      { n: "Brazo y escobilla", rol: "Salida" as Rol, fn: "Barren el cristal con movimiento oscilante.", mov: "oscilante" },
    ],
  },
];

export function MaquinaDesmontajeExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, MAQUINAS.length - 1)), p: 0, vistas: [0] as number[] };
  const [s, setS] = useState(init);
  const maq = MAQUINAS[s.m]!;
  const p = maq.piezas[s.p]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa cada pieza de la cadena cinemática: ¿recibe el movimiento, lo transmite, lo transforma o lo entrega?"}
      onReset={() => setS(init)}
      controls={<Choice label="Máquina" items={MAQUINAS.map((x, i) => ({ value: i, label: x.n }))} value={s.m} onChange={(m) => setS({ m, p: 0, vistas: [0] })} />}
    >
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Piezas">
        {maq.piezas.map((x, i) => (
          <span key={x.n} className="flex items-center gap-2">
            <button type="button" aria-pressed={s.p === i} className={`${TOOL_BTN} ${s.p === i ? "bg-white/15" : ""}`} style={{ borderColor: ROLES[x.rol] }} onClick={() => setS((a) => ({ ...a, p: i, vistas: a.vistas.includes(i) ? a.vistas : [...a.vistas, i] }))}>
              {x.n}
            </button>
            {i < maq.piezas.length - 1 ? <span aria-hidden className="text-[color:var(--stage-muted,#b8c2d0)]">→</span> : null}
          </span>
        ))}
      </div>
      <div className="rounded-lg border p-3 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: ROLES[p.rol] }} data-testid="maquina-detalle">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-bold">{p.n}</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-sm font-bold" style={{ color: ROLES[p.rol] }}>
            {p.rol}
          </span>
          <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">movimiento: {p.mov}</span>
        </div>
        <p className="mt-2">{p.fn}</p>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Piezas identificadas">
          {s.vistas.length} de {maq.piezas.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 3.2 Poleas y correa ───────────── */

export function PoleasCorreasExplorador({ block }: { block: ToolBlock }) {
  const init = { d1: Math.round(num(block.params?.a, 60, 20, 200)), d2: Math.round(num(block.params?.b, 120, 20, 200)), n1: Math.round(num(block.params?.c, 1200, 100, 3000)), cruz: false, desl: 0, play: true };
  const [s, setS] = useState(init);
  const n2 = (s.n1 * s.d1 * (1 - s.desl / 100)) / s.d2;
  const i = s.d1 / s.d2;
  const v = (Math.PI * (s.d1 / 1000) * s.n1) / 60;
  const r1 = 20 + s.d1 * 0.45;
  const r2 = 20 + s.d2 * 0.45;
  const c1 = 110;
  const c2 = 110 + r1 + r2 + 90;
  const cy = 125;
  const vis1 = s.n1 / 12;
  const vis2 = n2 / 12;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La polea conducida gira más despacio si es mayor. Prueba la correa cruzada (cambia el sentido) y el deslizamiento (pérdida de velocidad)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Diámetro de la polea motriz, d₁" value={s.d1} min={20} max={200} step={5} unit=" mm" color={MANIM.blue} onChange={(d1) => setS((x) => ({ ...x, d1 }))} />
          <Slider label="Diámetro de la polea conducida, d₂" value={s.d2} min={20} max={200} step={5} unit=" mm" color={MANIM.orange} onChange={(d2) => setS((x) => ({ ...x, d2 }))} />
          <Slider label="Velocidad de entrada, n₁" value={s.n1} min={100} max={3000} step={50} unit=" rpm" format={f0} color={MANIM.green} onChange={(n1) => setS((x) => ({ ...x, n1 }))} />
          <Slider label="Deslizamiento de la correa" value={s.desl} min={0} max={5} step={0.5} unit=" %" format={f1} color={MANIM.red} onChange={(desl) => setS((x) => ({ ...x, desl }))} />
          <Choice label="Correa" items={[{ value: 0, label: "Abierta" }, { value: 1, label: "Cruzada" }]} value={s.cruz ? 1 : 0} onChange={(v2) => setS((x) => ({ ...x, cruz: v2 === 1 }))} />
          <PlayBtn playing={s.play} onToggle={() => setS((x) => ({ ...x, play: !x.play }))} />
        </>
      }
    >
      <Svg w={Math.max(520, c2 + r2 + 30)} h={250} maxH={260} testId="tool-poleas">
        {s.cruz ? (
          <>
            <line x1={c1} y1={cy - r1} x2={c2} y2={cy + r2} stroke={MANIM.muted} strokeWidth={3} />
            <line x1={c1} y1={cy + r1} x2={c2} y2={cy - r2} stroke={MANIM.muted} strokeWidth={3} />
          </>
        ) : (
          <>
            <line x1={c1} y1={cy - r1} x2={c2} y2={cy - r2} stroke={MANIM.muted} strokeWidth={3} />
            <line x1={c1} y1={cy + r1} x2={c2} y2={cy + r2} stroke={MANIM.muted} strokeWidth={3} />
          </>
        )}
        <Gira cx={c1} cy={cy} rpm={vis1 * 12} dir={1} playing={s.play}>
          <circle cx={c1} cy={cy} r={r1} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
          <line x1={c1} y1={cy} x2={c1 + r1 - 4} y2={cy} stroke={MANIM.yellow} strokeWidth={4} />
        </Gira>
        <Gira cx={c2} cy={cy} rpm={vis2 * 12} dir={s.cruz ? -1 : 1} playing={s.play}>
          <circle cx={c2} cy={cy} r={r2} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={4} />
          <line x1={c2} y1={cy} x2={c2 + r2 - 4} y2={cy} stroke={MANIM.yellow} strokeWidth={4} />
        </Gira>
        <text x={c1} y={235} textAnchor="middle" fill={MANIM.blue} fontSize={13}>
          motriz
        </text>
        <text x={c2} y={235} textAnchor="middle" fill={MANIM.orange} fontSize={13}>
          conducida
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Velocidad de salida, n₂ = n₁·d₁/d₂">
          {f0(n2)} rpm
        </Stat>
        <Stat color={MANIM.blue} label="Relación de transmisión, i = n₂/n₁">
          {f2(i)}
        </Stat>
        <Stat color={MANIM.green} label="Velocidad de la correa">
          {f2(v)} m/s
        </Stat>
        <Stat color={MANIM.yellow} label="Sentido de giro">
          {s.cruz ? "Contrario" : "El mismo"}
        </Stat>
      </Readout>
      <Note>{i < 1 ? "Reductor: la salida gira más lenta y entrega más par." : i > 1 ? "Multiplicador: la salida gira más rápida y entrega menos par." : "Relación 1: misma velocidad."} La rotación dibujada es proporcional a las rpm reales (muy ralentizada).</Note>
    </Frame>
  );
}

/* ───────────── 3.3 Engranajes y trenes ───────────── */

export function relacionTren(z: number[]) {
  // z = [z1 motriz, z2 conducida, (z3 motriz, z4 conducida)…]
  let i = 1;
  for (let k = 0; k + 1 < z.length; k += 2) {
    i *= z[k]! / z[k + 1]!;
  }
  return i;
}

export function EngranajesExplorador({ block }: { block: ToolBlock }) {
  const init = { comp: num(block.params?.n, 0, 0, 1) >= 0.5, z1: Math.round(num(block.params?.a, 15, 8, 60)), z2: Math.round(num(block.params?.b, 45, 8, 60)), z3: 12, z4: 36, n1: Math.round(num(block.params?.c, 900, 60, 3000)), play: true };
  const [s, setS] = useState(init);
  const zs = s.comp ? [s.z1, s.z2, s.z3, s.z4] : [s.z1, s.z2];
  const i = relacionTren(zs);
  const n2 = s.n1 * i;
  const sentido = s.comp ? "El mismo que la entrada" : "Contrario al de entrada";
  const rr = (z: number) => 10 + z * 0.8;
  const cy = 130;
  const x1 = 70;
  const x2 = x1 + rr(s.z1) + rr(s.z2);
  const x3 = x2; // el 3 comparte eje con el 2
  const x4 = x3 + rr(s.z3) + rr(s.z4);
  const nB = (s.n1 * s.z1) / s.z2;
  const gear = (cx: number, z: number, rpm: number, dir: 1 | -1, color: string, key: string, r = rr(z), yy = cy) => (
    <Gira key={key} cx={cx} cy={yy} rpm={rpm / 12} dir={dir} playing={s.play}>
      <circle cx={cx} cy={yy} r={r} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={8} strokeDasharray={`${(Math.PI * r) / z} ${(Math.PI * r) / z}`} />
      <circle cx={cx} cy={yy} r={r - 5} fill="none" stroke={color} strokeWidth={2} />
      <line x1={cx} y1={yy} x2={cx + r - 8} y2={yy} stroke={MANIM.yellow} strokeWidth={4} />
    </Gira>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un solo par invierte el sentido; dos pares lo restituyen. La relación total es el producto (motrices ÷ conducidas) de cada par."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tren" items={[{ value: 0, label: "Simple (un par)" }, { value: 1, label: "Compuesto (dos pares)" }]} value={s.comp ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, comp: v === 1 }))} />
          <Slider label="Dientes z₁ (motriz)" value={s.z1} min={8} max={60} color={MANIM.blue} onChange={(z1) => setS((x) => ({ ...x, z1 }))} />
          <Slider label="Dientes z₂ (conducida)" value={s.z2} min={8} max={60} color={MANIM.orange} onChange={(z2) => setS((x) => ({ ...x, z2 }))} />
          <Slider label="Dientes z₃ (motriz, 2.º par)" value={s.z3} min={8} max={60} color={MANIM.green} disabled={!s.comp} onChange={(z3) => setS((x) => ({ ...x, z3 }))} />
          <Slider label="Dientes z₄ (conducida, 2.º par)" value={s.z4} min={8} max={60} color={MANIM.purple} disabled={!s.comp} onChange={(z4) => setS((x) => ({ ...x, z4 }))} />
          <Slider label="Velocidad de entrada, n₁" value={s.n1} min={60} max={3000} step={30} unit=" rpm" format={f0} color={MANIM.yellow} onChange={(n1) => setS((x) => ({ ...x, n1 }))} />
          <PlayBtn playing={s.play} onToggle={() => setS((x) => ({ ...x, play: !x.play }))} />
        </>
      }
    >
      <Svg w={520} h={Math.max(260, 2 * rr(60) + 20)} maxH={280} testId="tool-engranajes">
        {gear(x1, s.z1, s.n1, 1, MANIM.blue, "g1")}
        {gear(x2, s.z2, nB, -1, MANIM.orange, "g2")}
        {s.comp ? (
          <>
            {gear(x3, s.z3, nB, -1, MANIM.green, "g3", rr(s.z3) * 0.8)}
            {gear(x4, s.z4, n2, 1, MANIM.purple, "g4")}
          </>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Relación de transmisión, i = n_salida / n_entrada">
          {zs.length === 2 ? `${s.z1}/${s.z2}` : `(${s.z1}/${s.z2})·(${s.z3}/${s.z4})`} = {fmtEs(i, 3)}
        </Stat>
        <Stat color={MANIM.orange} label="Velocidad de salida">
          {f0(n2)} rpm
        </Stat>
        <Stat color={MANIM.green} label="Sentido de la salida">
          {sentido}
        </Stat>
      </Readout>
      <Note>{i < 1 ? "Tren reductor: sale más lento y con más par (sin pérdidas, el par se multiplica por 1/i)." : "Tren multiplicador: sale más rápido y con menos par."} El dibujo no mantiene el engrane exacto de los dientes.</Note>
    </Frame>
  );
}

/* ───────────── 3.4 Bicicleta y tornillo sin fin ───────────── */

export function BicicletaExplorador({ block }: { block: ToolBlock }) {
  const init = { plato: Math.round(num(block.params?.a, 44, 24, 53)), pinon: Math.round(num(block.params?.b, 16, 11, 34)), cad: Math.round(num(block.params?.c, 80, 30, 120)) };
  const [s, setS] = useState(init);
  const i = s.plato / s.pinon;
  const L = 2.1; // perímetro de rueda de carretera (m)
  const desarrollo = i * L;
  const v = (desarrollo * s.cad * 60) / 1000;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Plato grande y piñón pequeño: más metros por pedalada, pero más fuerza en el pedal. Al revés, más fácil de pedalear y más lento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Plato (dientes)" value={s.plato} min={24} max={53} color={MANIM.blue} onChange={(plato) => setS((x) => ({ ...x, plato }))} />
          <Slider label="Piñón (dientes)" value={s.pinon} min={11} max={34} color={MANIM.orange} onChange={(pinon) => setS((x) => ({ ...x, pinon }))} />
          <Slider label="Cadencia de pedaleo" value={s.cad} min={30} max={120} step={5} unit=" rpm" color={MANIM.green} onChange={(cad) => setS((x) => ({ ...x, cad }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Relación plato/piñón">
          {s.plato}/{s.pinon} = {f2(i)}
        </Stat>
        <Stat color={MANIM.orange} label="Vueltas de rueda por pedalada">
          {f2(i)}
        </Stat>
        <Stat color={MANIM.green} label="Desarrollo (distancia por pedalada)">
          {f2(desarrollo)} m
        </Stat>
        <Stat color={MANIM.yellow} label="Velocidad">
          {f1(v)} km/h
        </Stat>
      </Readout>
      <Svg w={520} h={120} maxH={130} testId="tool-bici">
        <circle cx={110} cy={60} r={10 + s.plato * 0.9} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={4} strokeDasharray="4 3" />
        <circle cx={330} cy={60} r={6 + s.pinon * 0.9} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={4} strokeDasharray="4 3" />
        <line x1={110} y1={60 - (10 + s.plato * 0.9)} x2={330} y2={60 - (6 + s.pinon * 0.9)} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={110} y1={60 + (10 + s.plato * 0.9)} x2={330} y2={60 + (6 + s.pinon * 0.9)} stroke={MANIM.muted} strokeWidth={3} />
        <text x={110} y={116} textAnchor="middle" fill={MANIM.blue} fontSize={12}>
          plato
        </text>
        <text x={330} y={116} textAnchor="middle" fill={MANIM.orange} fontSize={12}>
          piñón
        </text>
      </Svg>
      <Note>Rueda de 2,10 m de perímetro (700×25c aprox.). No se tiene en cuenta el rozamiento ni el desnivel: es la velocidad teórica a esa cadencia.</Note>
    </Frame>
  );
}

export function SinFinExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 1500, 100, 3000)), z: Math.round(num(block.params?.b, 30, 10, 80)), e: Math.round(num(block.params?.c, 1, 1, 3)) };
  const [s, setS] = useState(init);
  const i = s.e / s.z;
  const nOut = s.n * i;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada vuelta del tornillo avanza tantos dientes como entradas tiene: la corona da una vuelta cuando el tornillo ha dado z/entradas vueltas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad del tornillo" value={s.n} min={100} max={3000} step={50} unit=" rpm" format={f0} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Dientes de la corona, z" value={s.z} min={10} max={80} color={MANIM.orange} onChange={(z) => setS((x) => ({ ...x, z }))} />
          <Slider label="Entradas del tornillo" value={s.e} min={1} max={3} color={MANIM.green} onChange={(e) => setS((x) => ({ ...x, e }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Relación i = entradas / z">
          {s.e}/{s.z} = {fmtEs(i, 3)}
        </Stat>
        <Stat color={MANIM.orange} label="Velocidad de la corona">
          {f1(nOut)} rpm
        </Stat>
        <Stat color={MANIM.green} label="Vueltas del tornillo por vuelta de corona">
          {f1(s.z / s.e)}
        </Stat>
      </Readout>
      <Note>
        {s.e === 1 ? "Con una entrada y poco ángulo, el sistema suele ser irreversible: la corona no puede mover al tornillo (útil en elevadores y cerraduras), pero el rendimiento es bajo." : "Más entradas aumentan el ángulo de hélice: mejora el rendimiento, pero se pierde la irreversibilidad."} El tornillo sin fin permite grandes reducciones en una sola etapa.
      </Note>
    </Frame>
  );
}

/* ───────────── 3.5 Transformación del movimiento ───────────── */

/** Posición del pie de biela (mm desde el eje de la manivela) para un ángulo en grados. */
export function posicionPiston(theta: number, R: number, L: number): number {
  const t = rad(theta);
  return R * Math.cos(t) + Math.sqrt(Math.max(0, L * L - (R * Math.sin(t)) ** 2));
}

export function BielaManivelaExplorador({ block }: { block: ToolBlock }) {
  const init = { th: Math.round(num(block.params?.a, 60, 0, 360)), R: Math.round(num(block.params?.b, 30, 10, 60)), L: Math.round(num(block.params?.c, 110, 70, 160)) };
  const [s, setS] = useState(init);
  const L = Math.max(s.L, s.R * 1.2);
  const x = posicionPiston(s.th, s.R, L);
  const xmax = s.R + L;
  const xmin = L - s.R;
  const k = 2.4;
  const ox = 90;
  const oy = 110;
  const px = ox + x * k;
  const mx = ox + s.R * Math.cos(rad(s.th)) * k;
  const my = oy - s.R * Math.sin(rad(s.th)) * k;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Gira la manivela: el émbolo va y viene. La carrera total es siempre 2·R, sea cual sea la longitud de la biela."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de la manivela, θ" value={s.th} min={0} max={360} step={5} unit=" °" color={MANIM.yellow} onChange={(th) => setS((a) => ({ ...a, th }))} />
          <Slider label="Radio de la manivela, R" value={s.R} min={10} max={60} unit=" mm" color={MANIM.blue} onChange={(R) => setS((a) => ({ ...a, R }))} />
          <Slider label="Longitud de la biela, L" value={s.L} min={70} max={160} step={5} unit=" mm" color={MANIM.orange} onChange={(L2) => setS((a) => ({ ...a, L: L2 }))} />
        </>
      }
    >
      <Svg w={520} h={220} maxH={230} testId="tool-biela">
        <rect x={ox + xmin * k - 6} y={oy - 28} width={(xmax - xmin) * k + 40} height={56} fill="none" stroke={MANIM.grid} strokeWidth={2} strokeDasharray="4 4" />
        <rect x={px - 14} y={oy - 24} width={28} height={48} rx={3} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={3} className="anim-t" />
        <line x1={mx} y1={my} x2={px} y2={oy} stroke={MANIM.orange} strokeWidth={5} strokeLinecap="round" />
        <line x1={ox} y1={oy} x2={mx} y2={my} stroke={MANIM.blue} strokeWidth={6} strokeLinecap="round" />
        <circle cx={ox} cy={oy} r={7} fill={MANIM.muted} />
        <circle cx={mx} cy={my} r={6} fill={MANIM.yellow} />
        <circle cx={ox} cy={oy} r={s.R * k} fill="none" stroke={MANIM.blue} strokeOpacity={0.35} strokeWidth={1.5} />
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Posición del émbolo">
          {f1(x)} mm
        </Stat>
        <Stat color={MANIM.yellow} label="Carrera, 2·R">
          {f0(2 * s.R)} mm
        </Stat>
        <Stat color={MANIM.orange} label="Límites del recorrido">
          {f1(xmin)} – {f1(xmax)} mm
        </Stat>
      </Readout>
      <Note>Con θ = 0° el émbolo está en el punto muerto exterior (x = L + R); con θ = 180°, en el interior (x = L − R). En los puntos muertos la velocidad del émbolo es nula.</Note>
    </Frame>
  );
}

/** Elevación del seguidor de punta sobre una leva circular excéntrica (mm). */
export function elevacionLeva(theta: number, e: number, R: number): number {
  const t = rad(theta);
  const y = e * Math.cos(t) + Math.sqrt(Math.max(0, R * R - (e * Math.sin(t)) ** 2));
  return y - (R - e);
}

export function LevaSeguidorExplorador({ block }: { block: ToolBlock }) {
  const init = { th: Math.round(num(block.params?.a, 90, 0, 360)), e: Math.round(num(block.params?.b, 10, 0, 25)) };
  const [s, setS] = useState(init);
  const R = 30;
  const lift = elevacionLeva(s.th, s.e, R);
  const X = (t: number) => 300 + (t / 360) * 200;
  const Y = (l: number) => 200 - l * 3.2;
  const curva = Array.from({ length: 73 }, (_, i) => `${i ? "L" : "M"} ${X(i * 5).toFixed(1)} ${Y(elevacionLeva(i * 5, s.e, R)).toFixed(1)}`).join(" ");
  const cx = 130;
  const cy = 150;
  const k = 1.6;
  const centro = { x: cx + s.e * k * Math.sin(rad(s.th)), y: cy - s.e * k * Math.cos(rad(s.th)) };
  const punta = cy - k * (lift + (R - s.e));
  return (
    <Frame
      stacked
      hint={block.hint ?? "El seguidor sube y baja una vez por vuelta. Cuanto más excéntrica es la leva, mayor es la elevación; con excentricidad 0 no se mueve."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de la leva, θ" value={s.th} min={0} max={360} step={5} unit=" °" color={MANIM.yellow} onChange={(th) => setS((a) => ({ ...a, th }))} />
          <Slider label="Excentricidad, e" value={s.e} min={0} max={25} unit=" mm" color={MANIM.orange} onChange={(e) => setS((a) => ({ ...a, e }))} />
        </>
      }
    >
      <Svg w={520} h={230} maxH={240} testId="tool-leva">
        <circle cx={centro.x} cy={centro.y} r={R * k} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={4} />
        <circle cx={cx} cy={cy} r={5} fill={MANIM.yellow} />
        <line x1={cx} y1={cy} x2={centro.x} y2={centro.y} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="3 3" />
        <rect x={cx - 4} y={punta - 70} width={8} height={70} fill={MANIM.green} />
        <path d={curva} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <line x1={300} y1={200} x2={500} y2={200} stroke={MANIM.muted} strokeWidth={1.5} />
        <circle cx={X(s.th)} cy={Y(lift)} r={6} fill={MANIM.yellow} />
        <text x={500} y={218} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          ángulo θ (0°–360°)
        </text>
        <text x={300} y={30} fill={MANIM.muted} fontSize={12}>
          elevación del seguidor
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Elevación del seguidor">
          {f1(lift)} mm
        </Stat>
        <Stat color={MANIM.yellow} label="Elevación máxima, 2·e">
          {f0(2 * s.e)} mm
        </Stat>
      </Readout>
      <Note>Leva circular excéntrica con seguidor de punta alineado con el eje. Con otros perfiles de leva (ovalados, con tramos de reposo) la curva cambia: la forma de la leva <strong>programa</strong> el movimiento del seguidor.</Note>
    </Frame>
  );
}

export function CremalleraTornilloExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: num(block.params?.n, 0, 0, 1) >= 0.5 ? 1 : 0, r: Math.round(num(block.params?.a, 20, 5, 60)), p: num(block.params?.b, 2, 0.5, 10), rpm: Math.round(num(block.params?.c, 60, 10, 600)) };
  const [s, setS] = useState(init);
  const omega = (2 * Math.PI * s.rpm) / 60;
  const v = s.modo === 0 ? omega * s.r : (s.p * s.rpm) / 60; // mm/s
  const porVuelta = s.modo === 0 ? 2 * Math.PI * s.r : s.p;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En el piñón-cremallera, cada vuelta recorre la longitud de la circunferencia del piñón; en el tornillo-tuerca, un paso."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Mecanismo" items={[{ value: 0, label: "Piñón-cremallera" }, { value: 1, label: "Tornillo-tuerca" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          {s.modo === 0 ? (
            <Slider label="Radio del piñón, r" value={s.r} min={5} max={60} unit=" mm" color={MANIM.blue} onChange={(r) => setS((x) => ({ ...x, r }))} />
          ) : (
            <Slider label="Paso de rosca, p" value={s.p} min={0.5} max={10} step={0.5} unit=" mm" format={f1} color={MANIM.blue} onChange={(p) => setS((x) => ({ ...x, p }))} />
          )}
          <Slider label="Velocidad de giro" value={s.rpm} min={10} max={600} step={10} unit=" rpm" color={MANIM.green} onChange={(rpm) => setS((x) => ({ ...x, rpm }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label={s.modo === 0 ? "Avance por vuelta, 2πr" : "Avance por vuelta, p"}>
          {f1(porVuelta)} mm
        </Stat>
        <Stat color={MANIM.green} label="Velocidad lineal">
          {f1(v)} mm/s ({f2(v * 0.06)} m/min)
        </Stat>
      </Readout>
      <Note>{s.modo === 0 ? "El piñón-cremallera avanza rápido pero es reversible: una fuerza sobre la cremallera puede hacer girar el piñón." : "El tornillo-tuerca avanza poco por vuelta (mucha fuerza, poca velocidad) y, con paso pequeño, es irreversible: sostiene la carga sin freno."}</Note>
    </Frame>
  );
}

/* ───────────── 3.6 Palancas y polipastos ───────────── */

export function generoPalanca(apoyo: number, carga: number, fuerza: number): 1 | 2 | 3 {
  if ((carga - apoyo) * (fuerza - apoyo) < 0) return 1;
  return Math.abs(carga - apoyo) < Math.abs(fuerza - apoyo) ? 2 : 3;
}

export function PalancaExplorador({ block }: { block: ToolBlock }) {
  const init = { A: Math.round(num(block.params?.a, 60, 0, 100)), Q: Math.round(num(block.params?.b, 20, 1, 100)), xq: Math.round(num(block.params?.c, 20, 0, 100)), xf: 100, F: 40 };
  const [s, setS] = useState(init);
  const Qn = s.Q * 9.81;
  const dq = Math.abs(s.xq - s.A) / 100;
  const df = Math.abs(s.xf - s.A) / 100;
  const Mq = Qn * dq;
  const Mf = s.F * df;
  const Fnec = df > 0 ? Mq / df : Infinity;
  const gen = generoPalanca(s.A, s.xq, s.xf);
  const sgn = (x: number) => (x === s.A ? 0 : x > s.A ? 1 : -1);
  const sq = sgn(s.xq);
  const sf = sgn(s.xf);
  // La fuerza se aplica en el sentido que se opone al giro de la carga: hacia arriba si está del mismo lado del apoyo y hacia abajo si está del contrario.
  const fArriba = sq === 0 ? true : sq * sf >= 0;
  const giroF = sq === 0 ? -sf : -sq;
  const neto = sq * Mq + giroF * Mf; // positivo: gira en sentido horario (cae por la derecha)
  const ang = clamp(neto * 1.2, -14, 14);
  const X = (c: number) => 60 + c * 4;
  const ay = 130;
  const equilibrio = Math.abs(neto) < 0.25;
  const ventaja = Fnec > 0 && Number.isFinite(Fnec) ? Qn / Fnec : NaN;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el apoyo o la carga: con la fuerza justa la barra se equilibra (momentos iguales). Fíjate en qué género de palanca resulta."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición del apoyo" value={s.A} min={0} max={100} unit=" cm" color={MANIM.yellow} onChange={(A) => setS((x) => ({ ...x, A }))} />
          <Slider label="Carga, Q" value={s.Q} min={1} max={100} unit=" kg" color={MANIM.red} onChange={(Q) => setS((x) => ({ ...x, Q }))} />
          <Slider label="Posición de la carga" value={s.xq} min={0} max={100} unit=" cm" color={MANIM.orange} onChange={(xq) => setS((x) => ({ ...x, xq }))} />
          <Slider label="Posición de la fuerza" value={s.xf} min={0} max={100} unit=" cm" color={MANIM.blue} onChange={(xf) => setS((x) => ({ ...x, xf }))} />
          <Slider label="Fuerza aplicada, F" value={s.F} min={0} max={1000} step={5} unit=" N" color={MANIM.green} onChange={(F) => setS((x) => ({ ...x, F }))} />
        </>
      }
    >
      <Svg w={520} h={220} maxH={230} testId="tool-palanca">
        <g transform={`rotate(${ang} ${X(s.A)} ${ay})`} className="anim-t">
          <line x1={X(0)} y1={ay} x2={X(100)} y2={ay} stroke={MANIM.muted} strokeWidth={8} strokeLinecap="round" />
          <rect x={X(s.xq) - 18} y={ay - 40} width={36} height={32} fill={MANIM.red} fillOpacity={0.5} stroke={MANIM.red} strokeWidth={3} />
          <text x={X(s.xq)} y={ay - 18} textAnchor="middle" fill={MANIM.ink} fontSize={13}>
            {s.Q} kg
          </text>
          {fArriba ? (
            <>
              <line x1={X(s.xf)} y1={ay + 70} x2={X(s.xf)} y2={ay + 12} stroke={MANIM.blue} strokeWidth={5} />
              <polygon points={`${X(s.xf)},${ay + 6} ${X(s.xf) - 7},${ay + 22} ${X(s.xf) + 7},${ay + 22}`} fill={MANIM.blue} />
            </>
          ) : (
            <>
              <line x1={X(s.xf)} y1={ay - 70} x2={X(s.xf)} y2={ay - 12} stroke={MANIM.blue} strokeWidth={5} />
              <polygon points={`${X(s.xf)},${ay - 6} ${X(s.xf) - 7},${ay - 22} ${X(s.xf) + 7},${ay - 22}`} fill={MANIM.blue} />
            </>
          )}
        </g>
        <polygon points={`${X(s.A)},${ay + 4} ${X(s.A) - 16},${ay + 44} ${X(s.A) + 16},${ay + 44}`} fill={MANIM.yellow} fillOpacity={0.6} stroke={MANIM.yellow} strokeWidth={2} />
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Momento de la carga, Q·g·b_Q">
          {f1(Mq)} N·m
        </Stat>
        <Stat color={MANIM.blue} label="Momento de F, F·b_F">
          {f1(Mf)} N·m
        </Stat>
        <Stat color={equilibrio ? MANIM.green : MANIM.orange} label="Estado">
          {equilibrio ? "En equilibrio" : neto > 0 ? "Cae por la derecha" : "Cae por la izquierda"}
        </Stat>
        <Stat color={MANIM.yellow} label="F necesaria para equilibrar">
          {Number.isFinite(Fnec) ? `${f1(Fnec)} N` : "—"}
        </Stat>
        <Stat color={MANIM.purple} label="Género / ventaja mecánica">
          {gen}.º género · {Number.isFinite(ventaja) ? f2(ventaja) : "—"}
        </Stat>
      </Readout>
      <Note>Condición de equilibrio: F·b_F = Q·g·b_Q (suma de momentos respecto al apoyo igual a cero). Ventaja mecánica = Q·g / F; en el 3.º género es menor que 1: se pierde fuerza para ganar recorrido y velocidad.</Note>
    </Frame>
  );
}

export function PolipastoExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 4, 1, 8)), Q: Math.round(num(block.params?.b, 120, 10, 500)), eta: Math.round(num(block.params?.c, 90, 50, 100)), h: 2 };
  const [s, setS] = useState(init);
  const F = (s.Q * 9.81) / (s.n * (s.eta / 100));
  const cuerda = s.n * s.h;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuantas más cuerdas sostienen la carga, menos fuerza hay que hacer, pero hay que tirar de más cuerda. El trabajo no se ahorra."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Cuerdas que sostienen la carga, N" value={s.n} min={1} max={8} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Carga" value={s.Q} min={10} max={500} step={10} unit=" kg" color={MANIM.red} onChange={(Q) => setS((x) => ({ ...x, Q }))} />
          <Slider label="Rendimiento del polipasto" value={s.eta} min={50} max={100} step={5} unit=" %" color={MANIM.green} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
          <Slider label="Altura a elevar" value={s.h} min={1} max={6} unit=" m" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Fuerza de tiro, F = Q·g / (N·η)">
          {f0(F)} N
        </Stat>
        <Stat color={MANIM.orange} label="Cuerda que hay que recoger">
          {f1(cuerda)} m
        </Stat>
        <Stat color={MANIM.green} label="Trabajo a realizar">
          {f0(F * cuerda)} J
        </Stat>
        <Stat color={MANIM.yellow} label="Trabajo útil (Q·g·h)">
          {f0(s.Q * 9.81 * s.h)} J
        </Stat>
      </Readout>
      <Note>Sin rozamiento (η = 100 %) el trabajo es igual con cualquier N: se gana fuerza a costa de recorrido. Con η &lt; 100 % hay que hacer más trabajo del útil.</Note>
    </Frame>
  );
}

/* ───────────── 3.7 Disco giratorio ───────────── */

export function DiscoGiratorioExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 300, 10, 3000)), r: Math.round(num(block.params?.b, 15, 2, 60)), play: true };
  const [s, setS] = useState(init);
  const w = (2 * Math.PI * s.n) / 60;
  const f = s.n / 60;
  const T = 1 / f;
  const v = w * (s.r / 100);
  const ac = w * w * (s.r / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Fija las rpm y cambia el radio: la velocidad angular es la misma en todos los puntos del disco, pero la tangencial crece con la distancia al eje."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad, n" value={s.n} min={10} max={3000} step={10} unit=" rpm" format={f0} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Radio del punto, r" value={s.r} min={2} max={60} unit=" cm" color={MANIM.orange} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <PlayBtn playing={s.play} onToggle={() => setS((x) => ({ ...x, play: !x.play }))} />
        </>
      }
    >
      <Svg w={520} h={230} maxH={240} testId="tool-disco">
        <Gira cx={260} cy={115} rpm={s.n / 12} playing={s.play}>
          <circle cx={260} cy={115} r={100} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.blue} strokeWidth={3} />
          <line x1={260} y1={115} x2={260 + (s.r / 60) * 100} y2={115} stroke={MANIM.yellow} strokeWidth={3} />
          <circle cx={260 + (s.r / 60) * 100} cy={115} r={7} fill={MANIM.orange} />
        </Gira>
        <circle cx={260} cy={115} r={4} fill={MANIM.muted} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad angular, ω = 2π·n/60">
          {f2(w)} rad/s
        </Stat>
        <Stat color={MANIM.green} label="Frecuencia, f">
          {f2(f)} Hz
        </Stat>
        <Stat color={MANIM.purple} label="Periodo, T">
          {fmtEs(T, 3)} s
        </Stat>
        <Stat color={MANIM.orange} label="Velocidad tangencial, v = ω·r">
          {f2(v)} m/s ({f1(v * 3.6)} km/h)
        </Stat>
        <Stat color={MANIM.red} label="Aceleración centrípeta, ω²·r">
          {f1(ac)} m/s²
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 3.8 Motor virtual: par, velocidad y potencia ───────────── */

export function MotorVirtualExplorador({ block }: { block: ToolBlock }) {
  const init = { M: num(block.params?.a, 8, 0, 30), n: Math.round(num(block.params?.b, 1200, 0, 3000)), Pn: Math.round(num(block.params?.c, 1500, 200, 5000)), t: 10 };
  const [s, setS] = useState(init);
  const w = (2 * Math.PI * s.n) / 60;
  const P = s.M * w;
  const E = P * s.t;
  const sobrecarga = P > s.Pn;
  const X = (ww: number) => 50 + (ww / 320) * 440;
  const Y = (m: number) => 190 - (m / 30) * 170;
  const hip = Array.from({ length: 60 }, (_, i) => {
    const ww = 15 + i * 5;
    const m = Math.min(30, s.Pn / ww);
    return `${i ? "L" : "M"} ${X(ww).toFixed(1)} ${Y(m).toFixed(1)}`;
  }).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "La potencia es el producto del par por la velocidad angular. Para una misma potencia, más par significa menos velocidad. Cruza la curva naranja y el motor se sobrecarga."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Par, M" value={s.M} min={0} max={30} step={0.5} unit=" N·m" format={f1} color={MANIM.blue} onChange={(M) => setS((x) => ({ ...x, M }))} />
          <Slider label="Velocidad, n" value={s.n} min={0} max={3000} step={50} unit=" rpm" format={f0} color={MANIM.green} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Potencia nominal del motor" value={s.Pn} min={200} max={5000} step={100} unit=" W" format={f0} color={MANIM.orange} onChange={(Pn) => setS((x) => ({ ...x, Pn }))} />
          <Slider label="Tiempo de funcionamiento" value={s.t} min={1} max={60} unit=" s" color={MANIM.purple} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Svg w={520} h={230} maxH={240} testId="tool-motor">
        <line x1={50} y1={190} x2={500} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={190} x2={50} y2={15} stroke={MANIM.muted} strokeWidth={2} />
        <path d={hip} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <circle cx={X(w)} cy={Y(s.M)} r={7} fill={sobrecarga ? MANIM.red : MANIM.green} />
        <text x={500} y={210} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          ω (rad/s)
        </text>
        <text x={56} y={26} fill={MANIM.muted} fontSize={12}>
          M (N·m) · curva: P = potencia nominal
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad angular, ω">
          {f1(w)} rad/s
        </Stat>
        <Stat color={sobrecarga ? MANIM.red : MANIM.green} label="Potencia, P = M·ω">
          {f0(P)} W
        </Stat>
        <Stat color={MANIM.purple} label="Energía / trabajo en ese tiempo">
          {f0(E)} J
        </Stat>
      </Readout>
      <Note>{sobrecarga ? "El punto de trabajo supera la potencia nominal: el motor se sobrecalienta si se mantiene." : "Dentro de la potencia nominal."} 1 CV ≈ 735,5 W: este motor equivale a {f2(s.Pn / 735.5)} CV.</Note>
    </Frame>
  );
}

/* ───────────── 3.9 Reductor con pérdidas ───────────── */

export function ReductorRendimientoExplorador({ block }: { block: ToolBlock }) {
  const init = { P: Math.round(num(block.params?.a, 1000, 100, 5000)), n: Math.round(num(block.params?.b, 1500, 300, 3000)), i: Math.round(num(block.params?.c, 10, 1, 40)), eta: 90 };
  const [s, setS] = useState(init);
  const wIn = (2 * Math.PI * s.n) / 60;
  const Min = s.P / wIn;
  const nOut = s.n / s.i;
  const Pout = s.P * (s.eta / 100);
  const Mout = Min * s.i * (s.eta / 100);
  const perd = s.P - Pout;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un reductor baja las rpm y sube el par en la misma proporción, pero el rozamiento se lleva una parte de la potencia: el rendimiento nunca llega al 100 %."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Potencia de entrada" value={s.P} min={100} max={5000} step={100} unit=" W" format={f0} color={MANIM.blue} onChange={(P) => setS((x) => ({ ...x, P }))} />
          <Slider label="Velocidad de entrada" value={s.n} min={300} max={3000} step={100} unit=" rpm" format={f0} color={MANIM.green} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Reducción, 1 : i" value={s.i} min={1} max={40} color={MANIM.orange} onChange={(i) => setS((x) => ({ ...x, i }))} />
          <Slider label="Rendimiento, η" value={s.eta} min={40} max={100} step={1} unit=" %" color={MANIM.red} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
        </>
      }
    >
      <div className="flex h-8 w-full overflow-hidden rounded-md border border-[color:var(--stage-border,#3d4f66)]" data-testid="tool-sankey">
        <div className="anim-t flex items-center justify-center text-sm font-bold" style={{ width: `${s.eta}%`, background: MANIM.green, color: MANIM.surface }}>
          útil {f0(Pout)} W
        </div>
        <div className="anim-t flex items-center justify-center text-sm font-bold" style={{ width: `${100 - s.eta}%`, background: MANIM.red, color: MANIM.surface }}>
          {s.eta < 90 ? `pérdidas ${f0(perd)} W` : ""}
        </div>
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="Par de entrada, M₁ = P/ω">
          {f2(Min)} N·m
        </Stat>
        <Stat color={MANIM.green} label="Velocidad de salida, n₁/i">
          {f0(nOut)} rpm
        </Stat>
        <Stat color={MANIM.orange} label="Par de salida, M₁·i·η">
          {f1(Mout)} N·m
        </Stat>
        <Stat color={MANIM.red} label="Pérdidas">
          {f0(perd)} W
        </Stat>
      </Readout>
      <Note>La potencia de salida es P·η. Las pérdidas se transforman en calor por rozamiento: por eso un reductor se calienta y necesita lubricación.</Note>
    </Frame>
  );
}

/* ───────────── 3.10 Editor de transmisiones ───────────── */

const TIPOS_ETAPA = [
  { id: "ninguna", n: "Sin etapa", eta: 1 },
  { id: "polea", n: "Poleas", eta: 0.95 },
  { id: "engranaje", n: "Engranajes", eta: 0.97 },
  { id: "cadena", n: "Cadena", eta: 0.95 },
] as const;
type TipoEtapa = (typeof TIPOS_ETAPA)[number]["id"];

export function TransmisionEditorExplorador({ block }: { block: ToolBlock }) {
  const init = {
    n0: Math.round(num(block.params?.a, 1450, 500, 3000)),
    et: [
      { t: "polea" as TipoEtapa, a: 20, b: 40 },
      { t: "engranaje" as TipoEtapa, a: 15, b: 45 },
      { t: "ninguna" as TipoEtapa, a: 20, b: 20 },
    ],
  };
  const [s, setS] = useState(init);
  const objetivo = { min: 150, max: 250 };
  const pasos = s.et.reduce<{ n: number; eta: number }[]>((acc, e) => {
    const prev = acc[acc.length - 1] ?? { n: s.n0, eta: 1 };
    const tipo = TIPOS_ETAPA.find((x) => x.id === e.t)!;
    return [...acc, e.t === "ninguna" ? prev : { n: (prev.n * e.a) / e.b, eta: prev.eta * tipo.eta }];
  }, []);
  const fin = pasos[pasos.length - 1]!;
  const ok = fin.n >= objetivo.min && fin.n <= objetivo.max;
  const iTotal = fin.n / s.n0;
  const setE = (idx: number, patch: Partial<(typeof init.et)[number]>) => setS((x) => ({ ...x, et: x.et.map((e, j) => (j === idx ? { ...e, ...patch } : e)) }));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Reto: consigue una salida entre 150 y 250 rpm partiendo del motor. Combina etapas (conductora ÷ conducida) y observa cuánto rendimiento total se pierde."}
      onReset={() => setS(init)}
      controls={
        <>
          {s.et.map((e, i) => (
            <div key={i} className="flex flex-col gap-2 sm:col-span-2">
              <Choice label={`Etapa ${i + 1}`} items={TIPOS_ETAPA.map((t) => ({ value: t.id, label: t.n }))} value={e.t} onChange={(t) => setE(i, { t })} />
              {e.t !== "ninguna" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Slider label="Dientes o diámetro conductor" value={e.a} min={10} max={60} color={MANIM.blue} onChange={(a) => setE(i, { a })} />
                  <Slider label="Dientes o diámetro conducido" value={e.b} min={10} max={120} color={MANIM.orange} onChange={(b) => setE(i, { b })} />
                </div>
              ) : null}
            </div>
          ))}
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2 text-[color:var(--stage-ink,#fff)]" data-testid="transmision-cadena">
        <span className="rounded-md border px-2 py-1 text-sm" style={{ borderColor: MANIM.green }}>
          Motor {f0(s.n0)} rpm
        </span>
        {s.et.map((e, i) => (
          <span key={i} className="flex items-center gap-2">
            <span aria-hidden>→</span>
            <span className="rounded-md border px-2 py-1 text-sm" style={{ borderColor: e.t === "ninguna" ? MANIM.grid : MANIM.blue }}>
              {e.t === "ninguna" ? "—" : `${TIPOS_ETAPA.find((x) => x.id === e.t)!.n} ${e.a}:${e.b}`} · {f0(pasos[i]!.n)} rpm
            </span>
          </span>
        ))}
      </div>
      <Readout>
        <Stat color={ok ? MANIM.green : MANIM.red} label="Velocidad de salida">
          {f0(fin.n)} rpm
        </Stat>
        <Stat color={MANIM.blue} label="Relación total">
          {fmtEs(iTotal, 3)}
        </Stat>
        <Stat color={MANIM.orange} label="Rendimiento total">
          {f1(fin.eta * 100)} %
        </Stat>
      </Readout>
      <Note>{ok ? "Cumple el requisito: la salida está en el intervalo 150–250 rpm." : "No cumple todavía: ajusta alguna relación."} Rendimientos orientativos: poleas 95 %, engranajes 97 %, cadena 95 %.</Note>
    </Frame>
  );
}
