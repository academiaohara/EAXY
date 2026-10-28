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

/** Duración (s) de una vuelta en pantalla: proporcional a 1/rpm y acotada para que siempre se vea. */
const vuelta = (rpm: number) => clamp(120 / Math.max(Math.abs(rpm), 0.01), 0.4, 24);

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
      {playing ? "Pausar el movimiento" : "Reanudar el movimiento"}
    </button>
  );
}

/** Rueda dentada dibujada con un trazo discontinuo grueso (los dientes). */
function Rueda({ cx, cy, z, color, playing, rpm, dir }: { cx: number; cy: number; z: number; color: string; playing: boolean; rpm: number; dir: 1 | -1 }) {
  const r = z * 4.2;
  const paso = (Math.PI * r) / z;
  return (
    <Gira cx={cx} cy={cy} rpm={rpm} dir={dir} playing={playing}>
      <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={12} strokeDasharray={`${paso} ${paso}`} />
      <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={color} strokeWidth={3} />
      <line x1={cx} y1={cy} x2={cx + r - 10} y2={cy} stroke={MANIM.yellow} strokeWidth={5} />
      <circle cx={cx} cy={cy} r={5} fill={MANIM.yellow} />
    </Gira>
  );
}

/* ───────────── 5.1 Tipos de movimiento ───────────── */

export const MOVIMIENTOS = [
  { n: "Lineal", ej: "Cinta transportadora, ascensor al subir, cajón al abrirlo", d: "El objeto se desplaza siguiendo una línea recta." },
  { n: "Circular", ej: "Rueda, ventilador, tambor de la lavadora, manecillas del reloj", d: "El objeto gira alrededor de un eje y cada punto describe una circunferencia." },
  { n: "Alternativo", ej: "Sierra de calar, émbolo de una bomba, aguja de la máquina de coser", d: "El objeto va y vuelve por la misma trayectoria recta, una y otra vez." },
] as const;

export function MovimientosExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, 2)), v: Math.round(num(block.params?.a, 5, 1, 10)), play: true };
  const [s, setS] = useState(init);
  const mv = MOVIMIENTOS[s.m]!;
  const dur = `${clamp(6 - s.v * 0.5, 0.6, 5.5)}s`;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un tipo de movimiento y cambia la velocidad. Fíjate en la trayectoria que sigue el objeto."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Movimiento" items={MOVIMIENTOS.map((x, i) => ({ value: i, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Velocidad" value={s.v} min={1} max={10} step={1} color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <PlayBtn playing={s.play} onToggle={() => setS((x) => ({ ...x, play: !x.play }))} />
        </>
      }
    >
      <Svg w={520} h={220} testId="movimientos" maxH={230}>
        {s.m === 0 ? (
          <>
            <line x1={40} y1={150} x2={480} y2={150} stroke={MANIM.grid} strokeWidth={4} strokeDasharray="8 6" />
            <g>
              <rect x={40} y={104} width={60} height={46} rx={6} fill={MANIM.blue} fillOpacity={0.4} stroke={MANIM.blue} strokeWidth={4} />
              {s.play ? <animateTransform attributeName="transform" type="translate" from="0 0" to="380 0" dur={dur} repeatCount="indefinite" /> : null}
            </g>
            <text x={260} y={190} fill={MANIM.muted} fontSize={15} textAnchor="middle">
              trayectoria: línea recta
            </text>
          </>
        ) : s.m === 1 ? (
          <>
            <circle cx={260} cy={105} r={70} fill="none" stroke={MANIM.grid} strokeWidth={3} strokeDasharray="8 6" />
            <Gira cx={260} cy={105} rpm={s.play ? s.v * 12 : 0} playing={s.play}>
              <circle cx={330} cy={105} r={16} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={4} />
              <line x1={260} y1={105} x2={330} y2={105} stroke={MANIM.muted} strokeWidth={2} />
            </Gira>
            <circle cx={260} cy={105} r={5} fill={MANIM.yellow} />
            <text x={260} y={206} fill={MANIM.muted} fontSize={15} textAnchor="middle">
              trayectoria: circunferencia
            </text>
          </>
        ) : (
          <>
            <line x1={90} y1={150} x2={430} y2={150} stroke={MANIM.grid} strokeWidth={4} strokeDasharray="8 6" />
            <g>
              <rect x={90} y={104} width={60} height={46} rx={6} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={4} />
              {s.play ? <animateTransform attributeName="transform" type="translate" values="0 0; 280 0; 0 0" dur={dur} repeatCount="indefinite" /> : null}
            </g>
            <text x={260} y={190} fill={MANIM.muted} fontSize={15} textAnchor="middle">
              trayectoria: recta, de ida y vuelta
            </text>
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Movimiento">
          {mv.n}
        </Stat>
      </Readout>
      <Note>
        {mv.d} <em>Ejemplos:</em> {mv.ej}.
      </Note>
    </Frame>
  );
}

/* ───────────── 5.2 Ley de la palanca ───────────── */

/** Fuerza (kg) que equilibra una resistencia `r` a distancia `dr` del apoyo si se aplica a `df`. */
export const fuerzaPalanca = (r: number, dr: number, df: number) => (r * dr) / df;

export function PalancaEquilibrioExplorador({ block }: { block: ToolBlock }) {
  const init = { R: Math.round(num(block.params?.a, 30, 5, 50)), dR: Math.round(num(block.params?.b, 40, 10, 100)), F: 20, dF: 60 };
  const [s, setS] = useState(init);
  const mR = s.R * s.dR;
  const mF = s.F * s.dF;
  const dif = mF - mR;
  const eq = Math.abs(dif) <= 20;
  const tilt = eq ? 0 : clamp((dif / Math.max(mR, mF)) * 18, -18, 18);
  const fx = 260;
  const fy = 150;
  const k = 2;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La palanca se equilibra cuando fuerza × distancia a un lado = resistencia × distancia al otro. Ajusta la fuerza para igualarlas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Resistencia (carga), R" value={s.R} min={5} max={50} step={5} unit=" kg" color={MANIM.orange} onChange={(R) => setS((x) => ({ ...x, R }))} />
          <Slider label="Distancia de la carga al apoyo, dR" value={s.dR} min={10} max={100} step={10} unit=" cm" color={MANIM.orange} onChange={(dR) => setS((x) => ({ ...x, dR }))} />
          <Slider label="Fuerza aplicada, F" value={s.F} min={5} max={50} step={5} unit=" kg" color={MANIM.blue} onChange={(F) => setS((x) => ({ ...x, F }))} />
          <Slider label="Distancia de la fuerza al apoyo, dF" value={s.dF} min={10} max={100} step={10} unit=" cm" color={MANIM.blue} onChange={(dF) => setS((x) => ({ ...x, dF }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="palanca" maxH={240}>
        <g transform={`rotate(${tilt} ${fx} ${fy})`} className="anim-t">
          <rect x={fx - 100 * k} y={fy - 7} width={200 * k} height={14} rx={4} fill={MANIM.muted} fillOpacity={0.5} stroke={MANIM.muted} strokeWidth={3} />
          <rect x={fx - s.dR * k - 24} y={fy - 14 - 20 - s.R * 0.5} width={48} height={20 + s.R * 0.5} rx={4} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={3} />
          <text x={fx - s.dR * k} y={fy - 42 - s.R * 0.5} fill={MANIM.orange} fontSize={14} textAnchor="middle">
            {s.R} kg
          </text>
          <rect x={fx + s.dF * k - 24} y={fy - 14 - 20 - s.F * 0.5} width={48} height={20 + s.F * 0.5} rx={4} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={3} />
          <text x={fx + s.dF * k} y={fy - 42 - s.F * 0.5} fill={MANIM.blue} fontSize={14} textAnchor="middle">
            {s.F} kg
          </text>
        </g>
        <polygon points={`${fx - 26},${fy + 70} ${fx + 26},${fy + 70} ${fx},${fy + 7}`} fill={MANIM.yellow} fillOpacity={0.4} stroke={MANIM.yellow} strokeWidth={3} />
        <line x1={20} y1={fy + 70} x2={500} y2={fy + 70} stroke={MANIM.grid} strokeWidth={4} />
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="R · dR">
          {f0(mR)} kg·cm
        </Stat>
        <Stat color={MANIM.blue} label="F · dF">
          {f0(mF)} kg·cm
        </Stat>
        <Stat color={eq ? MANIM.green : MANIM.red} label="Resultado">
          {eq ? "Equilibrio" : dif > 0 ? "Gana la fuerza: baja el lado de F" : "Gana la carga: baja el lado de R"}
        </Stat>
        <Stat color={MANIM.yellow} label="F necesaria para equilibrar">
          {f1(fuerzaPalanca(s.R, s.dR, s.dF))} kg
        </Stat>
      </Readout>
      <Note>Alejar la fuerza del apoyo (brazo largo) permite levantar una carga grande con poca fuerza, pero hay que recorrer más distancia con la mano.</Note>
    </Frame>
  );
}

/* ───────────── 5.3 Poleas y polipastos ───────────── */

/** Fuerza (kg) para sostener una carga con `n` cuerdas (sin rozamiento). */
export const fuerzaAparejo = (carga: number, n: number) => carga / Math.max(1, n);

export function PoleasAparejoExplorador({ block }: { block: ToolBlock }) {
  const init = { carga: Math.round(num(block.params?.a, 80, 10, 200)), n: Math.round(num(block.params?.n, 1, 1, 6)), h: 2 };
  const [s, setS] = useState(init);
  const F = fuerzaAparejo(s.carga, s.n);
  const cuerda = s.n * s.h;
  const tipo = s.n === 1 ? "Polea fija" : s.n === 2 ? "Polea móvil" : "Polipasto (aparejo)";
  const xs = Array.from({ length: s.n }, (_, i) => 200 + (i * 120) / Math.max(1, s.n - 1 || 1));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta el número de cuerdas que sostienen la carga: la fuerza baja, pero tendrás que tirar de más cuerda."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Cuerdas que sostienen la carga, n" value={s.n} min={1} max={6} step={1} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Peso de la carga" value={s.carga} min={10} max={200} step={10} unit=" kg" color={MANIM.orange} onChange={(carga) => setS((x) => ({ ...x, carga }))} />
          <Slider label="Altura a la que se sube la carga" value={s.h} min={1} max={5} step={1} unit=" m" color={MANIM.green} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="poleas" maxH={260}>
        <rect x={160} y={20} width={220} height={16} rx={4} fill={MANIM.muted} fillOpacity={0.6} />
        {s.n === 1 ? (
          <>
            <circle cx={270} cy={62} r={24} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
            <line x1={246} y1={62} x2={246} y2={180} stroke={MANIM.ink} strokeWidth={3} />
            <line x1={294} y1={62} x2={294} y2={210} stroke={MANIM.ink} strokeWidth={3} />
          </>
        ) : (
          xs.map((x, i) => <line key={i} x1={x + 70 - 30 + (i * 0)} y1={36} x2={x + 70 - 30} y2={150} stroke={MANIM.ink} strokeWidth={3} />)
        )}
        <rect x={s.n === 1 ? 232 : 200} y={s.n === 1 ? 180 : 150} width={s.n === 1 ? 62 : 190} height={s.n === 1 ? 62 : 22} rx={6} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={4} />
        <text x={s.n === 1 ? 263 : 295} y={s.n === 1 ? 218 : 166} fill={MANIM.ink} fontSize={15} textAnchor="middle" fontWeight={700}>
          {s.carga} kg
        </text>
        {s.n > 1 ? <line x1={xs[xs.length - 1]! + 40} y1={36} x2={xs[xs.length - 1]! + 40 + 70} y2={210} stroke={MANIM.blue} strokeWidth={3} /> : null}
        <line x1={420} y1={190} x2={420} y2={236} stroke={MANIM.blue} strokeWidth={6} markerEnd="url(#fuerzaTiro)" />
        <defs>
          <marker id="fuerzaTiro" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={MANIM.blue} />
          </marker>
        </defs>
        <text x={440} y={222} fill={MANIM.blue} fontSize={16} fontWeight={700}>
          F = {f1(F)} kg
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Tipo">
          {tipo}
        </Stat>
        <Stat color={MANIM.blue} label="Fuerza necesaria">
          {f1(F)} kg
        </Stat>
        <Stat color={MANIM.green} label="Cuerda que hay que recoger">
          {f0(cuerda)} m
        </Stat>
      </Readout>
      <Note>{s.n === 1 ? "La polea fija solo cambia la dirección de la fuerza: tirar hacia abajo para subir una carga. No reduce el esfuerzo." : "Cada cuerda soporta una parte de la carga: F = carga ÷ n. Lo que se gana en fuerza se paga en recorrido: hay que tirar n veces más cuerda que la altura que sube la carga."}</Note>
    </Frame>
  );
}

/* ───────────── 5.4 Rueda y eje ───────────── */

/** Fuerza (kg) que hay que hacer en el borde de la rueda para subir una carga que cuelga del eje. */
export const fuerzaRuedaEje = (carga: number, rEje: number, rRueda: number) => (carga * rEje) / rRueda;

export function RuedaEjeExplorador({ block }: { block: ToolBlock }) {
  const init = { R: Math.round(num(block.params?.a, 30, 10, 60)), r: Math.round(num(block.params?.b, 5, 2, 10)), carga: 60 };
  const [s, setS] = useState(init);
  const F = fuerzaRuedaEje(s.carga, s.r, s.R);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una rueda grande unida a un eje pequeño multiplica la fuerza: como un torno o una manivela. Cambia los radios."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Radio de la rueda o manivela, R" value={s.R} min={10} max={60} step={5} unit=" cm" color={MANIM.blue} onChange={(R) => setS((x) => ({ ...x, R }))} />
          <Slider label="Radio del eje, r" value={s.r} min={2} max={10} step={1} unit=" cm" color={MANIM.green} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <Slider label="Carga que cuelga del eje" value={s.carga} min={10} max={100} step={10} unit=" kg" color={MANIM.orange} onChange={(carga) => setS((x) => ({ ...x, carga }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="rueda-eje" maxH={250}>
        <circle cx={230} cy={110} r={s.R * 1.6} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.blue} strokeWidth={4} />
        <circle cx={230} cy={110} r={s.r * 1.6} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={4} />
        <circle cx={230} cy={110} r={4} fill={MANIM.yellow} />
        <line x1={230 - s.r * 1.6} y1={110} x2={230 - s.r * 1.6} y2={200} stroke={MANIM.ink} strokeWidth={3} />
        <rect x={230 - s.r * 1.6 - 22} y={200} width={44} height={32} rx={4} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={3} />
        <line x1={230 + s.R * 1.6} y1={110} x2={230 + s.R * 1.6} y2={170} stroke={MANIM.blue} strokeWidth={5} markerEnd="url(#fRueda)" />
        <defs>
          <marker id="fRueda" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={MANIM.blue} />
          </marker>
        </defs>
        <text x={230 + s.R * 1.6 + 12} y={150} fill={MANIM.blue} fontSize={16} fontWeight={700}>
          F
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ventaja mecánica (R ÷ r)">
          {f1(s.R / s.r)}
        </Stat>
        <Stat color={MANIM.blue} label="Fuerza necesaria en el borde">
          {f1(F)} kg
        </Stat>
      </Readout>
      <Note>La rueda y el eje son una palanca que da vueltas: el punto de apoyo es el centro. Cuanto mayor es la rueda respecto al eje, menos fuerza se necesita (a cambio de dar más vueltas).</Note>
    </Frame>
  );
}

/* ───────────── 5.5 Engranajes y correas ───────────── */

/** Revoluciones por minuto de la rueda conducida. */
export const rpmConducida = (n1: number, z1: number, z2: number) => (n1 * z1) / z2;

export function EngranajesEsoExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), z1: Math.round(num(block.params?.a, 10, 8, 40)), z2: Math.round(num(block.params?.b, 20, 8, 40)), n1: 60, play: true };
  const [s, setS] = useState(init);
  const n2 = rpmConducida(s.n1, s.z1, s.z2);
  const i = s.z1 / s.z2;
  const r1 = s.z1 * 4.2;
  const r2 = s.z2 * 4.2;
  const engr = s.modo === 0;
  const gap = engr ? 0 : 50;
  const total = r1 + r2 + gap;
  const c1x = 260 - total / 2 + r1;
  const c2x = c1x + r1 + gap + r2;
  const cy = 150;
  const sentido2: 1 | -1 = engr ? -1 : 1;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el número de dientes de cada rueda: la que tiene menos dientes gira más rápido. Compara engranajes y correa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sistema" items={[{ value: 0, label: "Engranajes" }, { value: 1, label: "Poleas con correa" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label={engr ? "Dientes de la rueda conductora, z₁" : "Tamaño de la polea conductora, d₁"} value={s.z1} min={8} max={40} step={2} color={MANIM.blue} onChange={(z1) => setS((x) => ({ ...x, z1 }))} />
          <Slider label={engr ? "Dientes de la rueda conducida, z₂" : "Tamaño de la polea conducida, d₂"} value={s.z2} min={8} max={40} step={2} color={MANIM.orange} onChange={(z2) => setS((x) => ({ ...x, z2 }))} />
          <Slider label="Velocidad de entrada" value={s.n1} min={10} max={200} step={10} unit=" rpm" color={MANIM.green} onChange={(n1) => setS((x) => ({ ...x, n1 }))} />
          <PlayBtn playing={s.play} onToggle={() => setS((x) => ({ ...x, play: !x.play }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="engranajes" maxH={300}>
        {engr ? (
          <>
            <Rueda cx={c1x} cy={cy} z={s.z1} color={MANIM.blue} playing={s.play} rpm={s.n1} dir={1} />
            <Rueda cx={c2x} cy={cy} z={s.z2} color={MANIM.orange} playing={s.play} rpm={n2} dir={sentido2} />
          </>
        ) : (
          <>
            <line x1={c1x} y1={cy - r1} x2={c2x} y2={cy - r2} stroke={MANIM.muted} strokeWidth={5} />
            <line x1={c1x} y1={cy + r1} x2={c2x} y2={cy + r2} stroke={MANIM.muted} strokeWidth={5} />
            <Gira cx={c1x} cy={cy} rpm={s.n1} playing={s.play}>
              <circle cx={c1x} cy={cy} r={r1} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={5} />
              <line x1={c1x} y1={cy} x2={c1x + r1 - 6} y2={cy} stroke={MANIM.yellow} strokeWidth={5} />
            </Gira>
            <Gira cx={c2x} cy={cy} rpm={n2} playing={s.play}>
              <circle cx={c2x} cy={cy} r={r2} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={5} />
              <line x1={c2x} y1={cy} x2={c2x + r2 - 6} y2={cy} stroke={MANIM.yellow} strokeWidth={5} />
            </Gira>
          </>
        )}
        <text x={c1x} y={cy + 6} fill={MANIM.ink} fontSize={16} textAnchor="middle" fontWeight={700}>
          {s.z1}
        </text>
        <text x={c2x} y={cy + 6} fill={MANIM.ink} fontSize={16} textAnchor="middle" fontWeight={700}>
          {s.z2}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Relación de transmisión, i = z₁ ÷ z₂">
          {f2(i)}
        </Stat>
        <Stat color={MANIM.orange} label="Velocidad de salida">
          {f1(n2)} rpm
        </Stat>
        <Stat color={MANIM.green} label="Efecto">
          {i < 0.995 ? "Reductor: gira más lenta y con más fuerza" : i > 1.005 ? "Multiplicador: gira más rápida y con menos fuerza" : "1 a 1: misma velocidad"}
        </Stat>
        <Stat color={MANIM.blue} label="Sentido de giro">
          {engr ? "Contrario al de entrada" : "El mismo (correa abierta)"}
        </Stat>
      </Readout>
      <Note>La rueda conducida gira más despacio si tiene más dientes (o más diámetro) que la conductora: n₂ = n₁ · z₁ ÷ z₂. Con una correa abierta las poleas giran en el mismo sentido; con engranajes directos, en sentido contrario.</Note>
    </Frame>
  );
}

/* ───────────── 5.6 Tren de engranajes ───────────── */

/** Relación de transmisión de un tren de dos etapas (z1→z2 y z3→z4). */
export const relacionTren = (z: readonly number[]) => (z[0]! / z[1]!) * (z[2]! / z[3]!);

export function TrenEngranajesExplorador({ block }: { block: ToolBlock }) {
  const init = { z: [12, 36, 12, 36] as number[], n1: Math.round(num(block.params?.a, 900, 100, 3000)) };
  const [s, setS] = useState(init);
  const i1 = s.z[0]! / s.z[1]!;
  const i2 = s.z[2]! / s.z[3]!;
  const it = relacionTren(s.z);
  const n2 = s.n1 * i1;
  const n4 = s.n1 * it;
  const etiquetas = ["z₁ (entrada)", "z₂ (en el eje intermedio)", "z₃ (en el eje intermedio)", "z₄ (salida)"];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un tren de dos etapas multiplica las relaciones: dos reducciones de 1/3 dan una reducción de 1/9."}
      onReset={() => setS(init)}
      controls={
        <>
          {s.z.map((z, i) => (
            <Slider key={i} label={etiquetas[i]!} value={z} min={8} max={60} step={2} color={[MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple][i]!} onChange={(v) => setS((x) => ({ ...x, z: x.z.map((q, j) => (j === i ? v : q)) }))} />
          ))}
          <Slider label="Velocidad de entrada" value={s.n1} min={100} max={3000} step={100} unit=" rpm" format={f0} color={MANIM.yellow} onChange={(n1) => setS((x) => ({ ...x, n1 }))} />
        </>
      }
    >
      <Svg w={520} h={220} testId="tren" maxH={230}>
        {(() => {
          const [za, zb, zc, zd] = s.z as [number, number, number, number];
          const ang = rad(38);
          // posiciones en «unidades de diente» (radio = z)
          const u2 = za + zb;
          const u4x = u2 + (zc + zd) * Math.cos(ang);
          const u4y = (zc + zd) * Math.sin(ang);
          const ancho = Math.max(u2 + zb, u4x + zd) + za;
          const alto = Math.max(za, zb, zc) + Math.max(zb, zc, u4y + zd);
          const k = Math.min(1.3, 480 / ancho, 170 / alto);
          const x1 = 20 + za * k;
          const yTop = 34 + Math.max(za, zb, zc) * k;
          const x2 = x1 + u2 * k;
          const x4 = x1 + u4x * k;
          const y4 = yTop + u4y * k;
          const cols = [MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple];
          return (
            <>
              <circle cx={x1} cy={yTop} r={za * k} fill={cols[0]} fillOpacity={0.25} stroke={cols[0]} strokeWidth={4} />
              <circle cx={x2} cy={yTop} r={zb * k} fill={cols[1]} fillOpacity={0.2} stroke={cols[1]} strokeWidth={4} />
              <circle cx={x2} cy={yTop} r={zc * k} fill={cols[2]} fillOpacity={0.45} stroke={cols[2]} strokeWidth={4} />
              <circle cx={x4} cy={y4} r={zd * k} fill={cols[3]} fillOpacity={0.25} stroke={cols[3]} strokeWidth={4} />
              {[
                [x1, yTop + 5, "z₁", cols[0]],
                [x2, yTop - zb * k - 6, "z₂", cols[1]],
                [x2, yTop + 5, "z₃", cols[2]],
                [x4, y4 + 5, "z₄", cols[3]],
              ].map(([x, y, t, c]) => (
                <text key={String(t)} x={Number(x)} y={Number(y)} fill={String(c)} fontSize={14} textAnchor="middle" fontWeight={700}>
                  {String(t)}
                </text>
              ))}
            </>
          );
        })()}
        <text x={260} y={16} fill={MANIM.muted} fontSize={13} textAnchor="middle">
          z₂ y z₃ están en el mismo eje: giran a la misma velocidad
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Etapa 1 (z₁ ÷ z₂)">
          {f2(i1)}
        </Stat>
        <Stat color={MANIM.purple} label="Etapa 2 (z₃ ÷ z₄)">
          {f2(i2)}
        </Stat>
        <Stat color={MANIM.yellow} label="Relación total">
          {f2(it)}
        </Stat>
        <Stat color={MANIM.green} label="Velocidad intermedia → salida">
          {f0(n2)} → {f0(n4)} rpm
        </Stat>
      </Readout>
      <Note>En un tren de engranajes las relaciones se multiplican: i total = (z₁ ÷ z₂) · (z₃ ÷ z₄). Por eso un reductor de dos etapas puede bajar mucho la velocidad con ruedas pequeñas. Como hay dos pares engranados, el sentido de giro final es el mismo que el de entrada.</Note>
    </Frame>
  );
}

/* ───────────── 5.7 Marchas de una bicicleta ───────────── */

export const PLATOS = [28, 38, 48] as const;
export const PINONES = [11, 13, 15, 17, 21, 25, 28, 34] as const;
const DIAM_RUEDA = 0.67; // m

/** Metros que avanza la bicicleta en cada vuelta de pedal. */
export const avancePorPedalada = (plato: number, pinon: number) => (plato / pinon) * Math.PI * DIAM_RUEDA;

export function BiciMarchasExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 1, 0, 2)), q: Math.round(num(block.params?.a, 4, 0, 7)), cad: 70 };
  const [s, setS] = useState(init);
  const plato = PLATOS[s.p]!;
  const pinon = PINONES[s.q]!;
  const i = plato / pinon;
  const avance = avancePorPedalada(plato, pinon);
  const v = (avance * s.cad * 60) / 1000;
  const dura = i > 3;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Plato grande y piñón pequeño = marcha dura (avanzas mucho por pedalada). Plato pequeño y piñón grande = marcha ligera (para subir)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Plato (dientes)" items={PLATOS.map((x, k) => ({ value: k, label: String(x) }))} value={s.p} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Choice label="Piñón (dientes)" items={PINONES.map((x, k) => ({ value: k, label: String(x) }))} value={s.q} onChange={(q) => setS((x) => ({ ...x, q }))} />
          <Slider label="Cadencia de pedaleo" value={s.cad} min={40} max={120} step={5} unit=" rpm" color={MANIM.green} onChange={(cad) => setS((x) => ({ ...x, cad }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="bici" maxH={210}>
        <circle cx={110} cy={100} r={plato * 1.3} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={5} strokeDasharray={`${(Math.PI * plato * 1.3) / plato} ${(Math.PI * plato * 1.3) / plato}`} />
        <circle cx={360} cy={100} r={pinon * 1.3} fill={MANIM.orange} fillOpacity={0.2} stroke={MANIM.orange} strokeWidth={5} strokeDasharray={`${(Math.PI * pinon * 1.3) / pinon} ${(Math.PI * pinon * 1.3) / pinon}`} />
        <line x1={110} y1={100 - plato * 1.3} x2={360} y2={100 - pinon * 1.3} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={110} y1={100 + plato * 1.3} x2={360} y2={100 + pinon * 1.3} stroke={MANIM.muted} strokeWidth={3} />
        <circle cx={430} cy={100} r={64} fill="none" stroke={MANIM.ink} strokeWidth={3} strokeOpacity={0.4} />
        <text x={110} y={106} fill={MANIM.ink} fontSize={16} textAnchor="middle" fontWeight={700}>
          {plato}
        </text>
        <text x={360} y={106} fill={MANIM.ink} fontSize={16} textAnchor="middle" fontWeight={700}>
          {pinon}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Vueltas de rueda por pedalada">
          {f2(i)}
        </Stat>
        <Stat color={MANIM.green} label="Avance por pedalada">
          {f1(avance)} m
        </Stat>
        <Stat color={MANIM.blue} label={`Velocidad a ${s.cad} rpm`}>
          {f1(v)} km/h
        </Stat>
        <Stat color={dura ? MANIM.red : MANIM.green} label="Tipo de marcha">
          {dura ? "Marcha dura (rápida, cuesta pedalear)" : i < 1.5 ? "Marcha muy ligera (para cuestas)" : "Marcha intermedia"}
        </Stat>
      </Readout>
      <Note>El cambio de marchas elige la relación entre plato y piñón. En una cuesta se usa una marcha ligera: avanzas poco por pedalada, pero la fuerza que haces es menor.</Note>
    </Frame>
  );
}
