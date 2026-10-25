"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── Piezas de dibujo comunes ───────────── */

/** Bombilla con brillo según `luz` (0–1). */
function Bombilla({ x, y, luz, fundida = false }: { x: number; y: number; luz: number; fundida?: boolean }) {
  return (
    <g>
      {luz > 0 ? <circle cx={x} cy={y} r={34} fill={MANIM.yellow} fillOpacity={0.12 + 0.3 * luz} className="anim-t" /> : null}
      <circle cx={x} cy={y} r={20} fill={MANIM.surface} stroke={luz > 0 ? MANIM.yellow : MANIM.muted} strokeWidth={4} className="anim-t" />
      <line x1={x - 14} y1={y - 14} x2={x + 14} y2={y + 14} stroke={luz > 0 ? MANIM.yellow : MANIM.muted} strokeWidth={3} opacity={fundida ? 0.2 : 1} />
      <line x1={x + 14} y1={y - 14} x2={x - 14} y2={y + 14} stroke={luz > 0 ? MANIM.yellow : MANIM.muted} strokeWidth={3} opacity={fundida ? 0.2 : 1} />
    </g>
  );
}

/** Pila: dos placas (la larga es el polo positivo). */
function Pila({ x, y, gastada = false }: { x: number; y: number; gastada?: boolean }) {
  const c = gastada ? MANIM.muted : MANIM.green;
  return (
    <g>
      <line x1={x - 8} y1={y - 22} x2={x - 8} y2={y + 22} stroke={c} strokeWidth={4} />
      <line x1={x + 8} y1={y - 12} x2={x + 8} y2={y + 12} stroke={c} strokeWidth={8} />
      <text x={x - 20} y={y - 14} fill={c} fontSize={14} fontWeight={700}>
        +
      </text>
      <text x={x + 14} y={y - 14} fill={c} fontSize={14} fontWeight={700}>
        −
      </text>
    </g>
  );
}

/** Interruptor horizontal con palanca abierta o cerrada. */
function Interruptor({ x, y, cerrado, color = MANIM.blue }: { x: number; y: number; cerrado: boolean; color?: string }) {
  return (
    <g>
      <circle cx={x - 26} cy={y} r={4} fill={color} />
      <circle cx={x + 26} cy={y} r={4} fill={color} />
      <line x1={x - 26} y1={y} x2={cerrado ? x + 26 : x + 18} y2={cerrado ? y : y - 24} stroke={color} strokeWidth={4} strokeLinecap="round" className="anim-t" />
    </g>
  );
}

/** Puntos de carga que recorren el rectángulo del circuito. */
function Corriente({ activa, path }: { activa: boolean; path: string }) {
  if (!activa) return null;
  return (
    <g>
      {[0, 0.2, 0.4, 0.6, 0.8].map((d) => (
        <circle key={d} r={5} fill={MANIM.blue} stroke={MANIM.ink} strokeWidth={1}>
          <animateMotion dur="3s" begin={`-${d * 3}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
    </g>
  );
}

const LAZO = "M 100 105 L 100 40 L 420 40 L 420 170 L 100 170 Z";

/* ───────────── 6.1 Conductores y aislantes ───────────── */

export const OBJETOS_COND = [
  { n: "Moneda", cond: true, t: "Metal: sus electrones se mueven con libertad." },
  { n: "Clip metálico", cond: true, t: "Metal (acero): conduce la corriente." },
  { n: "Mina de lápiz (grafito)", cond: true, t: "El grafito es una forma del carbono que, excepcionalmente, conduce." },
  { n: "Agua con sal", cond: true, t: "Los iones de la sal conducen; el agua pura casi no." },
  { n: "Goma de borrar", cond: false, t: "Material plástico-elástico: aislante." },
  { n: "Regla de plástico", cond: false, t: "Plástico: los electrones no se mueven con libertad." },
  { n: "Trozo de madera seca", cond: false, t: "Madera seca: aislante (húmeda conduce un poco)." },
  { n: "Vidrio", cond: false, t: "Aislante." },
  { n: "Papel", cond: false, t: "Aislante en condiciones secas." },
  { n: "Lámina de aluminio", cond: true, t: "Metal: buen conductor." },
] as const;

export function ConductoresAislantesExplorador({ block }: { block: ToolBlock }) {
  const init = { o: Math.round(num(block.params?.n, 0, 0, OBJETOS_COND.length - 1)), probados: [] as number[] };
  const [s, setS] = useState(init);
  const ob = OBJETOS_COND[s.o]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Coloca cada objeto en el hueco del circuito: si la bombilla se enciende, el objeto es conductor; si no, es aislante."}
      onReset={() => setS(init)}
      controls={<Choice label="Objeto entre los dos cables" items={OBJETOS_COND.map((x, i) => ({ value: i, label: x.n }))} value={s.o} onChange={(o) => setS((x) => ({ o, probados: x.probados.includes(o) ? x.probados : [...x.probados, o] }))} />}
    >
      <Svg w={520} h={210} testId="conductores" maxH={220}>
        <path d="M 100 105 L 100 40 L 200 40 M 320 40 L 420 40 L 420 170 L 100 170 L 100 105" fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <Pila x={100} y={105} />
        <Bombilla x={420} y={105} luz={ob.cond ? 1 : 0} />
        <rect x={200} y={26} width={120} height={28} rx={6} fill={ob.cond ? MANIM.green : MANIM.red} fillOpacity={0.3} stroke={ob.cond ? MANIM.green : MANIM.red} strokeWidth={3} className="anim-t" />
        <text x={260} y={46} fill={MANIM.ink} fontSize={12} textAnchor="middle">
          {ob.n.length > 18 ? ob.n.slice(0, 17) + "…" : ob.n}
        </text>
        <Corriente activa={ob.cond} path={LAZO} />
      </Svg>
      <Readout>
        <Stat color={ob.cond ? MANIM.green : MANIM.red} label="Bombilla">
          {ob.cond ? "Encendida: es conductor" : "Apagada: es aislante"}
        </Stat>
        <Stat color={MANIM.yellow} label="Objetos probados">
          {s.probados.length} de {OBJETOS_COND.length}
        </Stat>
      </Readout>
      <Note>{ob.t}</Note>
    </Frame>
  );
}

/* ───────────── 6.2 Circuito sencillo: ¿por qué no luce? ───────────── */

/** Un circuito simple solo conduce si todas sus partes están bien. */
export const circuitoCerrado = (st: { sw: boolean; cable: boolean; lamp: boolean; pila: boolean }) => st.sw && st.cable && st.lamp && st.pila;

export function CircuitoSimpleExplorador({ block }: { block: ToolBlock }) {
  const init = { sw: false, cable: true, lamp: true, pila: true };
  const [s, setS] = useState(init);
  const ok = circuitoCerrado(s);
  const motivos = [!s.sw && "el interruptor está abierto", !s.cable && "hay un cable cortado", !s.lamp && "la bombilla está fundida", !s.pila && "la pila está agotada"].filter(Boolean);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Para que haya corriente el camino debe estar completo y cerrado. Cambia cada pieza y mira qué pasa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Interruptor" items={[{ value: 0, label: "Abierto" }, { value: 1, label: "Cerrado" }]} value={s.sw ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, sw: v === 1 }))} />
          <Choice label="Cable" items={[{ value: 1, label: "Intacto" }, { value: 0, label: "Cortado" }]} value={s.cable ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, cable: v === 1 }))} />
          <Choice label="Bombilla" items={[{ value: 1, label: "Buena" }, { value: 0, label: "Fundida" }]} value={s.lamp ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, lamp: v === 1 }))} />
          <Choice label="Pila" items={[{ value: 1, label: "Cargada" }, { value: 0, label: "Agotada" }]} value={s.pila ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, pila: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={210} testId="circuito-simple" maxH={220}>
        <path d="M 100 105 L 100 40 L 234 40 M 286 40 L 420 40 L 420 170 L 280 170 M 240 170 L 100 170 L 100 105" fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <path d="M 280 170 L 240 170" fill="none" stroke={s.cable ? MANIM.ink : MANIM.red} strokeWidth={s.cable ? 4 : 0} />
        {!s.cable ? (
          <g>
            <line x1={240} y1={170} x2={252} y2={158} stroke={MANIM.red} strokeWidth={4} />
            <line x1={280} y1={170} x2={268} y2={182} stroke={MANIM.red} strokeWidth={4} />
            <text x={260} y={200} fill={MANIM.red} fontSize={13} textAnchor="middle">
              cable cortado
            </text>
          </g>
        ) : null}
        <Pila x={100} y={105} gastada={!s.pila} />
        <Interruptor x={260} y={40} cerrado={s.sw} />
        <Bombilla x={420} y={105} luz={ok ? 1 : 0} fundida={!s.lamp} />
        <Corriente activa={ok} path={LAZO} />
      </Svg>
      <Readout>
        <Stat color={ok ? MANIM.green : MANIM.red} label="Circuito">
          {ok ? "Cerrado: circula corriente" : "Abierto: no circula corriente"}
        </Stat>
        <Stat color={ok ? MANIM.yellow : MANIM.muted} label="Bombilla">
          {ok ? "Encendida" : "Apagada"}
        </Stat>
      </Readout>
      <Note>{ok ? "Todo el camino está completo: la pila empuja las cargas, que recorren los cables y encienden la bombilla." : `No luce porque ${motivos.join(", ")}. Basta una sola interrupción para que no circule corriente.`}</Note>
    </Frame>
  );
}

/* ───────────── 6.3 Símbolos eléctricos ───────────── */

export const SIMBOLOS = [
  { id: "pila", n: "Pila (generador)", f: "Produce la tensión que empuja las cargas. La placa larga es el polo positivo.", ej: "Pila de botón, batería del móvil" },
  { id: "bombilla", n: "Lámpara", f: "Receptor que transforma la energía eléctrica en luz (y algo de calor).", ej: "Bombilla, linterna" },
  { id: "interruptor", n: "Interruptor", f: "Elemento de control: abre o cierra el circuito y se queda en esa posición.", ej: "Interruptor de la luz" },
  { id: "pulsador", n: "Pulsador", f: "Cierra (o abre) el circuito solo mientras se mantiene pulsado.", ej: "Timbre, botón del ascensor" },
  { id: "motor", n: "Motor", f: "Receptor que transforma la energía eléctrica en movimiento.", ej: "Ventilador, juguete" },
  { id: "zumbador", n: "Zumbador", f: "Receptor que transforma la energía eléctrica en sonido.", ej: "Alarma, timbre de zumbido" },
  { id: "resistencia", n: "Resistencia", f: "Limita la corriente que pasa por el circuito.", ej: "Protege un LED" },
  { id: "fusible", n: "Fusible", f: "Protege el circuito: su hilo se funde si pasa demasiada corriente y corta el paso.", ej: "Cuadro eléctrico del coche" },
] as const;

function Simbolo({ id, x, y, color }: { id: (typeof SIMBOLOS)[number]["id"]; x: number; y: number; color: string }) {
  const w = { stroke: color, strokeWidth: 5, fill: "none" as const, strokeLinecap: "round" as const };
  return (
    <g>
      <line x1={x - 110} y1={y} x2={x - 40} y2={y} {...w} />
      <line x1={x + 40} y1={y} x2={x + 110} y2={y} {...w} />
      {id === "pila" ? (
        <>
          <line x1={x - 40} y1={y} x2={x - 12} y2={y} {...w} />
          <line x1={x - 12} y1={y - 34} x2={x - 12} y2={y + 34} {...w} />
          <line x1={x + 12} y1={y - 20} x2={x + 12} y2={y + 20} {...w} strokeWidth={10} />
          <line x1={x + 12} y1={y} x2={x + 40} y2={y} {...w} />
        </>
      ) : null}
      {id === "bombilla" ? (
        <>
          <circle cx={x} cy={y} r={32} {...w} />
          <line x1={x - 22} y1={y - 22} x2={x + 22} y2={y + 22} {...w} />
          <line x1={x + 22} y1={y - 22} x2={x - 22} y2={y + 22} {...w} />
        </>
      ) : null}
      {id === "interruptor" ? (
        <>
          <circle cx={x - 40} cy={y} r={5} fill={color} />
          <circle cx={x + 40} cy={y} r={5} fill={color} />
          <line x1={x - 40} y1={y} x2={x + 28} y2={y - 34} {...w} />
        </>
      ) : null}
      {id === "pulsador" ? (
        <>
          <circle cx={x - 40} cy={y} r={5} fill={color} />
          <circle cx={x + 40} cy={y} r={5} fill={color} />
          <line x1={x - 40} y1={y - 8} x2={x + 40} y2={y - 8} {...w} />
          <line x1={x} y1={y - 8} x2={x} y2={y - 40} {...w} />
          <line x1={x - 16} y1={y - 40} x2={x + 16} y2={y - 40} {...w} />
        </>
      ) : null}
      {id === "motor" ? (
        <>
          <circle cx={x} cy={y} r={32} {...w} />
          <text x={x} y={y + 12} fill={color} fontSize={34} fontWeight={700} textAnchor="middle">
            M
          </text>
        </>
      ) : null}
      {id === "zumbador" ? (
        <>
          <path d={`M ${x - 40} ${y - 30} L ${x} ${y - 30} L ${x + 30} ${y - 50} L ${x + 30} ${y + 50} L ${x} ${y + 30} L ${x - 40} ${y + 30} Z`} {...w} />
        </>
      ) : null}
      {id === "resistencia" ? <rect x={x - 40} y={y - 16} width={80} height={32} {...w} /> : null}
      {id === "fusible" ? (
        <>
          <rect x={x - 40} y={y - 16} width={80} height={32} {...w} />
          <line x1={x - 40} y1={y} x2={x + 40} y2={y} {...w} strokeWidth={3} />
        </>
      ) : null}
    </g>
  );
}

export function SimbolosElectricosExplorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, SIMBOLOS.length - 1)), oculto: false, vistos: [] as number[] };
  const [s, setS] = useState(init);
  const sim = SIMBOLOS[s.i]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un componente y mira su símbolo. Activa «Ocultar nombre» para repasar: adivina qué es antes de pulsar «Mostrar»."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Componente" items={SIMBOLOS.map((x, i) => ({ value: i, label: x.id === "bombilla" ? "Lámpara" : x.n.split(" ")[0]! }))} value={s.i} onChange={(i) => setS((x) => ({ ...x, i, oculto: x.oculto, vistos: x.vistos.includes(i) ? x.vistos : [...x.vistos, i] }))} />
          <Choice label="Modo" items={[{ value: 0, label: "Ver el nombre" }, { value: 1, label: "Ocultar nombre (repaso)" }]} value={s.oculto ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, oculto: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="simbolo" maxH={170}>
        <rect x={10} y={10} width={500} height={140} rx={10} fill={MANIM.panel} />
        <Simbolo id={sim.id} x={260} y={90} color={MANIM.yellow} />
      </Svg>
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-3 text-[color:var(--stage-ink,#fff)]" data-testid="simbolo-detalle">
        {s.oculto ? (
          <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, oculto: false }))}>
            Mostrar nombre y función
          </button>
        ) : (
          <>
            <p className="text-lg font-bold">{sim.n}</p>
            <p className="mt-1">{sim.f}</p>
            <p className="mt-1 text-[color:var(--stage-muted,#b8c2d0)]">Ejemplo: {sim.ej}</p>
          </>
        )}
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Símbolos revisados">
          {Math.max(s.vistos.length, 1)} de {SIMBOLOS.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 6.4 Interruptor, pulsador y conmutadores ───────────── */

/** Con dos conmutadores en «escalera», la lámpara luce cuando ambos están en la misma posición. */
export const luceConmutadores = (a: boolean, b: boolean) => a === b;

export function ControlLuzExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 2)), sw: false, pulsado: false, a: false, b: false };
  const [s, setS] = useState(init);
  const luce = s.modo === 0 ? s.sw : s.modo === 1 ? s.pulsado : luceConmutadores(s.a, s.b);
  const suelta = () => setS((x) => ({ ...x, pulsado: false }));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Prueba los tres controles: el interruptor mantiene la posición, el pulsador solo cierra mientras lo mantienes pulsado y dos conmutadores controlan una misma lámpara."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Elemento de control" items={[{ value: 0, label: "Interruptor" }, { value: 1, label: "Pulsador" }, { value: 2, label: "Dos conmutadores" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo, sw: false, pulsado: false }))} />
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            {s.modo === 0 ? (
              <button type="button" className={TOOL_BTN} aria-pressed={s.sw} onClick={() => setS((x) => ({ ...x, sw: !x.sw }))}>
                {s.sw ? "Abrir el interruptor" : "Cerrar el interruptor"}
              </button>
            ) : s.modo === 1 ? (
              <button type="button" className={TOOL_BTN} aria-pressed={s.pulsado} onMouseDown={() => setS((x) => ({ ...x, pulsado: true }))} onMouseUp={suelta} onMouseLeave={suelta} onKeyDown={(e) => (e.key === " " || e.key === "Enter") && setS((x) => ({ ...x, pulsado: true }))} onKeyUp={suelta} onBlur={suelta}>
                Mantén pulsado el timbre
              </button>
            ) : (
              <>
                <button type="button" className={TOOL_BTN} aria-pressed={s.a} onClick={() => setS((x) => ({ ...x, a: !x.a }))}>
                  Conmutador de la entrada: {s.a ? "arriba" : "abajo"}
                </button>
                <button type="button" className={TOOL_BTN} aria-pressed={s.b} onClick={() => setS((x) => ({ ...x, b: !x.b }))}>
                  Conmutador del dormitorio: {s.b ? "arriba" : "abajo"}
                </button>
              </>
            )}
          </div>
        </>
      }
    >
      <Svg w={520} h={210} testId="control-luz" maxH={220}>
        <path d={LAZO} fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <Pila x={100} y={105} />
        {s.modo === 0 ? <Interruptor x={260} y={40} cerrado={s.sw} /> : null}
        {s.modo === 1 ? (
          <g>
            <circle cx={234} cy={40} r={4} fill={MANIM.blue} />
            <circle cx={286} cy={40} r={4} fill={MANIM.blue} />
            <line x1={234} y1={s.pulsado ? 40 : 34} x2={286} y2={s.pulsado ? 40 : 34} stroke={MANIM.blue} strokeWidth={4} className="anim-t" />
            <line x1={260} y1={s.pulsado ? 40 : 34} x2={260} y2={s.pulsado ? 16 : 10} stroke={MANIM.blue} strokeWidth={4} className="anim-t" />
          </g>
        ) : null}
        {s.modo === 2 ? (
          <g>
            <rect x={150} y={22} width={72} height={36} rx={5} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={2} />
            <line x1={160} y1={40} x2={206} y2={s.a ? 28 : 52} stroke={MANIM.blue} strokeWidth={4} className="anim-t" />
            <rect x={298} y={22} width={72} height={36} rx={5} fill={MANIM.panel} stroke={MANIM.orange} strokeWidth={2} />
            <line x1={308} y1={s.b ? 28 : 52} x2={354} y2={40} stroke={MANIM.orange} strokeWidth={4} className="anim-t" />
            <path d={`M 222 ${s.a ? 28 : 52} L 298 ${s.b ? 28 : 52}`} fill="none" stroke={luce ? MANIM.green : MANIM.red} strokeWidth={3} strokeDasharray="6 4" />
          </g>
        ) : null}
        <Bombilla x={420} y={105} luz={luce ? 1 : 0} />
        <Corriente activa={luce} path={LAZO} />
      </Svg>
      <Readout>
        <Stat color={luce ? MANIM.yellow : MANIM.muted} label="Lámpara">
          {luce ? "Encendida" : "Apagada"}
        </Stat>
      </Readout>
      <Note>{s.modo === 0 ? "El interruptor mantiene su posición: la lámpara sigue encendida aunque lo sueltes." : s.modo === 1 ? "El pulsador es normalmente abierto: solo deja pasar la corriente mientras lo mantienes pulsado. Se usa en timbres y botones de ascensor." : "Con dos conmutadores puedes encender y apagar la misma luz desde dos sitios: cada cambio de cualquiera de ellos invierte el estado de la lámpara."}</Note>
    </Frame>
  );
}

/* ───────────── 6.5 Lámparas en serie y en paralelo ───────────── */

/** Brillo relativo (0–1) de cada lámpara y corriente relativa de la pila. */
export function brilloLamparas(modo: "serie" | "paralelo", n: number, quitadas: number[]) {
  const total = Array.from({ length: n }, (_, i) => i);
  if (modo === "serie") {
    const rota = quitadas.some((q) => q < n);
    const luz = rota ? 0 : 1 / n ** 2; // la potencia de cada lámpara es (V/n)² / R
    return { luces: total.map(() => luz), corriente: rota ? 0 : 1 / n, rotas: rota };
  }
  const luces = total.map((i) => (quitadas.includes(i) ? 0 : 1));
  return { luces, corriente: luces.filter((l) => l > 0).length, rotas: false };
}

export function SerieParaleloExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), n: Math.round(num(block.params?.a, 2, 1, 4)), quitadas: [] as number[] };
  const [s, setS] = useState(init);
  const m = s.modo === 0 ? "serie" : "paralelo";
  const r = brilloLamparas(m, s.n, s.quitadas);
  const xs = Array.from({ length: s.n }, (_, i) => 110 + ((i + 0.5) * 340) / s.n);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Quita una lámpara (desenrósca­la) en cada montaje y observa qué pasa con las demás."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Montaje" items={[{ value: 0, label: "En serie" }, { value: 1, label: "En paralelo" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo, quitadas: [] }))} />
          <Slider label="Número de lámparas" value={s.n} min={1} max={4} step={1} color={MANIM.yellow} onChange={(n) => setS((x) => ({ ...x, n, quitadas: [] }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Quitar lámparas">
            {Array.from({ length: s.n }, (_, i) => (
              <button key={i} type="button" className={TOOL_BTN} aria-pressed={s.quitadas.includes(i)} onClick={() => setS((x) => ({ ...x, quitadas: x.quitadas.includes(i) ? x.quitadas.filter((q) => q !== i) : [...x.quitadas, i] }))}>
                {s.quitadas.includes(i) ? `Poner la lámpara ${i + 1}` : `Quitar la lámpara ${i + 1}`}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Svg w={520} h={210} testId="serie-paralelo" maxH={220}>
        {m === "serie" ? (
          <>
            <path d="M 60 105 L 60 40 L 460 40 L 460 170 L 60 170 Z" fill="none" stroke={MANIM.ink} strokeWidth={4} />
            <Pila x={60} y={105} />
            {xs.map((x, i) => (
              <g key={i}>
                <rect x={x - 26} y={26} width={52} height={28} fill={MANIM.surface} />
                {s.quitadas.includes(i) ? (
                  <text x={x} y={45} fill={MANIM.red} fontSize={12} textAnchor="middle">
                    hueco
                  </text>
                ) : (
                  <Bombilla x={x} y={40} luz={r.luces[i]! > 0 ? 0.2 + 0.8 * Math.sqrt(r.luces[i]!) : 0} />
                )}
              </g>
            ))}
          </>
        ) : (
          <>
            <path d="M 60 105 L 60 40 L 470 40 M 60 105 L 60 170 L 470 170" fill="none" stroke={MANIM.ink} strokeWidth={4} />
            <Pila x={60} y={105} />
            {xs.map((x, i) => (
              <g key={i}>
                <line x1={x} y1={40} x2={x} y2={170} stroke={MANIM.ink} strokeWidth={4} />
                <rect x={x - 26} y={79} width={52} height={52} fill={MANIM.surface} />
                {s.quitadas.includes(i) ? (
                  <text x={x} y={109} fill={MANIM.red} fontSize={12} textAnchor="middle">
                    hueco
                  </text>
                ) : (
                  <Bombilla x={x} y={105} luz={r.luces[i]!} />
                )}
              </g>
            ))}
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Lámparas encendidas">
          {r.luces.filter((l) => l > 0).length} de {s.n}
        </Stat>
        <Stat color={MANIM.blue} label="Corriente que da la pila (relativa)">
          {fmtEs(r.corriente, 2)}
        </Stat>
        <Stat color={MANIM.green} label="Tensión en cada lámpara (pila de 4,5 V)">
          {m === "serie" ? (r.rotas ? "0 V (circuito abierto)" : `${fmtEs(4.5 / s.n, 2)} V`) : "4,5 V"}
        </Stat>
      </Readout>
      <Note>{m === "serie" ? "En serie solo hay un camino: si una lámpara falta, se corta el paso a todas. Además, la tensión de la pila se reparte entre las lámparas y cada una luce menos." : "En paralelo cada lámpara tiene su propio camino: si una falla, las demás siguen encendidas, y todas reciben la tensión completa de la pila. La pila da más corriente y se gasta antes."}</Note>
    </Frame>
  );
}

/* ───────────── 6.6 Montaje de un circuito conectando terminales ───────────── */

type Term = "p+" | "p-" | "s1" | "s2" | "l1" | "l2";
const TERMINALES: { id: Term; x: number; y: number; t: string; color: string }[] = [
  { id: "p+", x: 50, y: 70, t: "Pila +", color: MANIM.green },
  { id: "p-", x: 50, y: 170, t: "Pila −", color: MANIM.green },
  { id: "s1", x: 284, y: 50, t: "Interruptor A", color: MANIM.blue },
  { id: "s2", x: 336, y: 50, t: "Interruptor B", color: MANIM.blue },
  { id: "l1", x: 270, y: 190, t: "Lámpara A", color: MANIM.yellow },
  { id: "l2", x: 350, y: 190, t: "Lámpara B", color: MANIM.yellow },
];

/** Evalúa un conjunto de cables entre terminales: circuito, cortocircuito o abierto. */
export function evaluaMontaje(cables: [Term, Term][], interruptorCerrado: boolean): { estado: "luce" | "abierto" | "corto"; mensaje: string } {
  const conectados = (extra: [Term, Term][]) => {
    const padre = new Map<string, string>();
    const raiz = (a: string): string => {
      if (!padre.has(a)) padre.set(a, a);
      let r = a;
      while (padre.get(r) !== r) r = padre.get(r)!;
      return r;
    };
    for (const [a, b] of [...cables, ...extra]) padre.set(raiz(a), raiz(b));
    return raiz("p+") === raiz("p-");
  };
  const interruptor: [Term, Term][] = interruptorCerrado ? [["s1", "s2"]] : [];
  if (conectados([])) return { estado: "corto", mensaje: "¡Cortocircuito! Los cables unen los dos polos de la pila sin ningún receptor en medio: circularía muchísima corriente y los cables se calentarían." };
  if (conectados(interruptor)) return { estado: "corto", mensaje: "Hay un camino de cables que no pasa por la lámpara: es un cortocircuito." };
  if (conectados([...interruptor, ["l1", "l2"]])) return { estado: "luce", mensaje: "El circuito está cerrado: la corriente sale del polo +, pasa por la lámpara (y por el interruptor si está en el camino) y vuelve al polo −." };
  return { estado: "abierto", mensaje: "El circuito está abierto: falta algún cable o el interruptor está abierto, así que no hay camino completo de vuelta a la pila." };
}

export function MontajeCircuitoExplorador({ block }: { block: ToolBlock }) {
  const init = { cables: [] as [Term, Term][], sel: null as Term | null, cerrado: true };
  const [s, setS] = useState(init);
  const ev = evaluaMontaje(s.cables, s.cerrado);
  const pulsa = (t: Term) =>
    setS((x) => {
      if (x.sel === null) return { ...x, sel: t };
      if (x.sel === t) return { ...x, sel: null };
      const ya = x.cables.findIndex(([a, b]) => (a === x.sel && b === t) || (a === t && b === x.sel));
      return { ...x, sel: null, cables: ya >= 0 ? x.cables.filter((_, i) => i !== ya) : [...x.cables, [x.sel, t]] };
    });
  const pos = (t: Term) => TERMINALES.find((q) => q.id === t)!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa un terminal y luego otro para unirlos con un cable (pulsa de nuevo el mismo par para quitarlo). Enciende la lámpara sin hacer un cortocircuito."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Interruptor" items={[{ value: 1, label: "Cerrado" }, { value: 0, label: "Abierto" }]} value={s.cerrado ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, cerrado: v === 1 }))} />
          <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, cables: [], sel: null }))}>
            Quitar todos los cables
          </button>
        </>
      }
    >
      <div className="relative mx-auto w-full max-w-xl">
        <Svg w={420} h={240} testId="montaje">
          <rect x={5} y={5} width={410} height={230} rx={10} fill={MANIM.panel} />
          <line x1={50} y1={70} x2={50} y2={100} stroke={MANIM.green} strokeWidth={3} />
          <line x1={50} y1={140} x2={50} y2={170} stroke={MANIM.green} strokeWidth={3} />
          <line x1={28} y1={100} x2={72} y2={100} stroke={MANIM.green} strokeWidth={4} />
          <line x1={38} y1={140} x2={62} y2={140} stroke={MANIM.green} strokeWidth={9} />
          <text x={78} y={106} fill={MANIM.green} fontSize={14} fontWeight={700}>
            +
          </text>
          <text x={72} y={152} fill={MANIM.green} fontSize={14} fontWeight={700}>
            −
          </text>
          <Interruptor x={310} y={50} cerrado={s.cerrado} />
          <text x={310} y={96} fill={MANIM.blue} fontSize={13} textAnchor="middle">
            Interruptor
          </text>
          <text x={62} y={205} fill={MANIM.green} fontSize={13}>
            Pila
          </text>
          <text x={310} y={232} fill={MANIM.yellow} fontSize={13} textAnchor="middle">
            Lámpara
          </text>
          <line x1={270} y1={190} x2={290} y2={190} stroke={MANIM.yellow} strokeWidth={3} />
          <line x1={330} y1={190} x2={350} y2={190} stroke={MANIM.yellow} strokeWidth={3} />
          <Bombilla x={310} y={190} luz={ev.estado === "luce" ? 1 : 0} />
          {s.cables.map(([a, b], i) => {
            const A = pos(a);
            const B = pos(b);
            return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={ev.estado === "corto" ? MANIM.red : MANIM.ink} strokeWidth={4} strokeLinecap="round" />;
          })}
          {TERMINALES.map((t) => (
            <circle key={t.id} cx={t.x} cy={t.y} r={9} fill={s.sel === t.id ? t.color : MANIM.surface} stroke={t.color} strokeWidth={3} />
          ))}
        </Svg>
        {TERMINALES.map((t) => (
          <button key={t.id} type="button" aria-label={`Terminal ${t.t}`} aria-pressed={s.sel === t.id} className="absolute size-9 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${(t.x / 420) * 100}%`, top: `${(t.y / 240) * 100}%` }} onClick={() => pulsa(t.id)} />
        ))}
      </div>
      <Readout>
        <Stat color={ev.estado === "luce" ? MANIM.green : ev.estado === "corto" ? MANIM.red : MANIM.yellow} label="Estado">
          {ev.estado === "luce" ? "Funciona" : ev.estado === "corto" ? "Cortocircuito" : "Circuito abierto"}
        </Stat>
        <Stat color={MANIM.blue} label="Cables puestos">
          {s.cables.length}
        </Stat>
      </Readout>
      <Note>{s.sel ? `Terminal seleccionado: ${pos(s.sel).t}. Pulsa otro para unirlo.` : ev.mensaje}</Note>
    </Frame>
  );
}

/* ───────────── 6.7 Seguridad: ¿peligroso o seguro? ───────────── */

export const SITUACIONES = [
  { t: "Cambias una bombilla con la luz encendida, de pie sobre una silla.", peligro: true, e: "Hay que cortar la corriente antes de manipular un portalámparas y no subirse a una silla inestable." },
  { t: "Desenchufas un aparato tirando de la clavija, no del cable.", peligro: false, e: "Es lo correcto: tirar del cable lo daña y puede dejar hilos al descubierto." },
  { t: "Usas un secador de pelo con las manos mojadas junto al lavabo.", peligro: true, e: "El agua conduce la electricidad. Las manos deben estar secas y los aparatos alejados del agua." },
  { t: "Conectas seis aparatos de mucha potencia a una sola regleta.", peligro: true, e: "Se sobrecarga la instalación: los cables se calientan y puede producirse un incendio." },
  { t: "Un cable de un cargador tiene el aislante roto y se ve el cobre. Lo sigues usando.", peligro: true, e: "Un cable pelado puede dar descargas o provocar cortocircuitos. Hay que sustituirlo." },
  { t: "Tapas los enchufes que no usas con protectores si hay niños pequeños.", peligro: false, e: "Es una medida de prevención: evita que metan objetos en los enchufes." },
  { t: "Metes un clavo en un enchufe para ver qué pasa.", peligro: true, e: "Nunca se introducen objetos en un enchufe: es posible electrocutarse." },
  { t: "Antes de abrir un aparato para repararlo, lo desenchufas.", peligro: false, e: "Siempre se desconecta de la red antes de manipularlo." },
] as const;

export function SeguridadElectricaExplorador({ block }: { block: ToolBlock }) {
  const init = { i: 0, aciertos: 0, fallos: 0, msg: "" };
  const [s, setS] = useState(init);
  const fin = s.i >= SITUACIONES.length;
  const sit = SITUACIONES[Math.min(s.i, SITUACIONES.length - 1)]!;
  const responde = (peligro: boolean) => {
    const ok = peligro === sit.peligro;
    setS((a) => ({ i: a.i + 1, aciertos: a.aciertos + (ok ? 1 : 0), fallos: a.fallos + (ok ? 0 : 1), msg: `${ok ? "¡Correcto! " : "Ojo: "}${sit.e}` }));
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Lee cada situación y decide si es peligrosa o segura. Después verás la explicación."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button type="button" className={TOOL_BTN} disabled={fin} style={{ borderColor: MANIM.red, color: MANIM.red }} onClick={() => responde(true)}>
            Es peligroso
          </button>
          <button type="button" className={TOOL_BTN} disabled={fin} style={{ borderColor: MANIM.green, color: MANIM.green }} onClick={() => responde(false)}>
            Es seguro
          </button>
        </div>
      }
    >
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-4 text-lg text-[color:var(--stage-ink,#fff)]" data-testid="situacion-actual">
        {fin ? `Has terminado: ${s.aciertos} de ${SITUACIONES.length} bien.` : sit.t}
      </div>
      {s.msg ? <Note>{s.msg}</Note> : null}
      <Readout>
        <Stat color={MANIM.green} label="Aciertos">
          {s.aciertos}
        </Stat>
        <Stat color={MANIM.red} label="Fallos">
          {s.fallos}
        </Stat>
        <Stat color={MANIM.yellow} label="Situación">
          {Math.min(s.i + 1, SITUACIONES.length)} de {SITUACIONES.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

