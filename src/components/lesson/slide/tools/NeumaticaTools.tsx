"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, SplitBar, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

/** Etiquetas tal cual: llevan símbolos (p, ∅, ×) que las mayúsculas estropearían. */
const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

const PATM = 1.013;
const area = (dMm: number) => (Math.PI / 4) * (dMm / 10) ** 2; // cm²

/* ───────────── Presión relativa y absoluta ───────────── */

export function PresionNeumaticaExplorador({ block }: { block: ToolBlock }) {
  const init = { man: num(block.params?.a, 6, -0.9, 10), d: 30.5 };
  const [s, setS] = useState(init);
  const abs = s.man + PATM;
  const vacio = s.man < 0;
  const Y = (v: number) => 200 - (v / 11.5) * 180;
  const F = Math.abs(s.man) * 1e5 * area(s.d * 10) * 1e-4;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Pasa de presión manométrica positiva a negativa (vacío) y observa que la absoluta nunca baja de cero. Después calcula la fuerza sobre unas semiesferas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Presión manométrica (relativa)" value={s.man} min={-0.9} max={10} step={0.1} unit=" bar" format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(man) => setS((x) => ({ ...x, man }))} />
          <Slider label="Diámetro de las semiesferas" value={s.d} min={10} max={60} step={0.5} unit=" cm" format={(v) => fmtEs(v, 1)} color={MANIM.blue} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Relativa (manómetro)">
          {fmtEs(s.man, 2)} bar {vacio ? "(depresión)" : ""}
        </Stat>
        <Stat color={MANIM.green} label="Absoluta = relativa + 1,013">
          {fmtEs(abs, 2)} bar
        </Stat>
        <Stat color={MANIM.red} label="Fuerza sobre las semiesferas, F = Δp·S">
          {fmtEs(F, 0)} N ({fmtEs(F / 9.8, 0)} kp)
        </Stat>
      </Readout>
      <Svg w={520} h={220} maxH={225} testId="tool-presion-neumatica">
        <line x1={60} y1={Y(0)} x2={300} y2={Y(0)} stroke={MANIM.muted} strokeWidth={2} />
        <text x={306} y={Y(0) + 4} fill={MANIM.muted} fontSize={12}>
          cero absoluto (vacío)
        </text>
        <line x1={60} y1={Y(PATM)} x2={300} y2={Y(PATM)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
        <text x={306} y={Y(PATM) + 4} fill={MANIM.yellow} fontSize={12}>
          atmosférica ≈ 1 bar (relativa 0)
        </text>
        <rect className="anim-t" x={120} y={Math.min(Y(abs), Y(0))} width={40} height={Math.abs(Y(abs) - Y(0))} fill={MANIM.green} fillOpacity={0.8} />
        <text x={140} y={216} textAnchor="middle" fill={MANIM.green} fontSize={12}>
          absoluta
        </text>
        <rect className="anim-t" x={200} y={Math.min(Y(abs), Y(PATM))} width={40} height={Math.abs(Y(abs) - Y(PATM))} fill={vacio ? MANIM.red : MANIM.orange} fillOpacity={0.8} />
        <text x={220} y={216} textAnchor="middle" fill={MANIM.orange} fontSize={12}>
          relativa
        </text>
      </Svg>
      <MathRenderer text={`$F = \\Delta p\\cdot\\dfrac{\\pi D^2}{4} = ${fmtEs(Math.abs(s.man), 2)}\\cdot 10^5\\cdot\\dfrac{\\pi\\,(${fmtEs(s.d / 100, 3)})^2}{4} = ${fmtEs(F, 0)}\\ \\text{N}$`} className="text-base" />
      <Note>En Magdeburgo, con un vacío del 90 % (≈ −0,9 bar) y 30,5 cm de diámetro, la fuerza era de unos 6 575 N (671 kp). La presión absoluta se mide desde el vacío total; la relativa, desde la atmosférica.</Note>
    </Frame>
  );
}

/* ───────────── Caudal de un cilindro ───────────── */

export function CaudalCilindroExplorador({ block }: { block: ToolBlock }) {
  const init = { d: num(block.params?.a, 40, 10, 200), v: num(block.params?.b, 0.5, 0.05, 2), m: num(block.params?.c, 80, 5, 2000) };
  const [s, setS] = useState(init);
  const S = area(s.d); // cm²
  const p = (s.m * 9.8) / (S * 1e-4) / 1e5; // bar manométricos
  const Q = (S / 100) * (s.v * 600) ; // dm² · dm/min = l/min
  const Qatm = Q * (p + 1);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el diámetro y la velocidad: el caudal crece con el cuadrado del diámetro. La presión necesaria depende de la carga y de la sección."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Diámetro del cilindro, D" value={s.d} min={10} max={200} step={1} unit=" mm" color={MANIM.blue} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Velocidad del vástago, v" value={s.v} min={0.05} max={2} step={0.05} unit=" m/s" format={(v) => fmtEs(v, 2)} color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Masa que mueve" value={s.m} min={5} max={2000} step={5} unit=" kg" color={MANIM.orange} onChange={(m) => setS((x) => ({ ...x, m }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Sección, S = πD²/4">
          {fmtEs(S, 2)} cm²
        </Stat>
        <Stat color={MANIM.orange} label="Presión necesaria, p = m·g/S">
          {fmtEs(p, 1)} bar
        </Stat>
        <Stat color={MANIM.green} label="Caudal a esa presión, Q = S·v">
          {fmtEs(Q, 1)} l/min
        </Stat>
        <Stat color={MANIM.red} label="Caudal en condiciones atmosféricas">
          {fmtEs(Qatm, 0)} l/min
        </Stat>
      </Readout>
      <MathRenderer text={`$Q_{atm} = Q\\,(p + 1) = ${fmtEs(Q, 1)}\\cdot ${fmtEs(p + 1, 1)} = ${fmtEs(Qatm, 0)}\\ \\text{l/min}$`} className="text-lg" />
      <Note>El compresor entrega el caudal medido a presión atmosférica (aire libre): es el que hay que comparar con la placa del compresor. Con p = 6,4 bar manométricos, el volumen de aire atmosférico es 7,4 veces el comprimido.</Note>
    </Frame>
  );
}

/* ───────────── Relación de compresión ───────────── */

export function RelacionCompresionExplorador({ block }: { block: ToolBlock }) {
  const init = { p: num(block.params?.a, 6, 1, 15), v: 100 };
  const [s, setS] = useState(init);
  const r = (s.p + 1) / 1;
  const Vf = s.v / r;
  const etapas = s.p <= 10 ? "una etapa (hasta 10 bar)" : "dos etapas, con refrigeración (hasta 15 bar)";

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la presión de trabajo: el volumen de aire disminuye en proporción inversa (Boyle). Pasados los 10 bar, un compresor de émbolo necesita dos etapas."}
      onReset={() => setS(init)}
      controls={<Slider label="Presión de trabajo (manométrica)" value={s.p} min={1} max={15} step={0.5} unit=" bar" format={(v) => fmtEs(v, 1)} color={MANIM.red} onChange={(p) => setS((x) => ({ ...x, p }))} />}
    >
      <Readout>
        <Stat color={MANIM.red} label="Relación de compresión, p₂/p₁">
          {fmtEs(r, 1)}
        </Stat>
        <Stat color={MANIM.blue} label="100 litros de aire atmosférico ocupan">
          {fmtEs(Vf, 1)} l
        </Stat>
        <Stat color={MANIM.green} label="Compresor de émbolo">
          {etapas}
        </Stat>
      </Readout>
      <Svg w={520} h={90} maxH={95} testId="tool-relacion-compresion">
        <rect x={40} y={20} width={440} height={30} fill={MANIM.panel} />
        <rect className="anim-t" x={40} y={20} width={440 / r} height={30} fill={MANIM.blue} fillOpacity={0.9} />
        <text x={48} y={70} fill={MANIM.muted} fontSize={12}>
          el volumen original (atmosférico) frente al comprimido
        </text>
      </Svg>
      <MathRenderer text={`$p_1\\,V_1 = p_2\\,V_2\\ \\Rightarrow\\ V_2 = V_1\\,\\dfrac{1}{${fmtEs(r, 1)}} = ${fmtEs(Vf, 1)}\\ \\text{l}$`} className="text-lg" />
      <Note>La ley de Boyle-Mariotte exige presiones absolutas: p_abs = p_man + p_atm. La relación de compresión es adimensional e informa de cuánto aumenta la presión.</Note>
    </Frame>
  );
}

/* ───────────── Fuerza de un cilindro ───────────── */

export function FuerzaCilindroExplorador({ block }: { block: ToolBlock }) {
  const init = { tipo: "avance" as "simple" | "avance" | "retroceso", D: num(block.params?.a, 80, 10, 250), d: num(block.params?.b, 25, 4, 100), p: num(block.params?.c, 6, 1, 10) };
  const [s, setS] = useState(init);
  const d = Math.min(s.d, s.D - 2);
  const R = s.D / 20;
  const r = d / 20;
  const S = Math.PI * R * R;
  const Sr = Math.PI * (R * R - r * r);
  const Sut = s.tipo === "retroceso" ? Sr : S;
  const Ft = Sut * s.p * 10; // N (1 bar = 10 N/cm²)
  const Fr = 0.1 * Ft;
  const Fm = s.tipo === "simple" ? 0.06 * Ft : 0;
  const Fn = Ft - Fr - Fm;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara el avance y el retroceso de un cilindro de doble efecto: en el retroceso la superficie útil es menor (hay que restar el vástago)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Cilindro" value={s.tipo} onChange={(tipo) => setS((x) => ({ ...x, tipo }))} items={[{ value: "simple" as const, label: "Simple efecto" }, { value: "avance" as const, label: "Doble efecto: avance" }, { value: "retroceso" as const, label: "Doble efecto: retroceso" }]} />
          <Slider label="Diámetro del émbolo, D" value={s.D} min={10} max={250} step={1} unit=" mm" color={MANIM.blue} onChange={(D) => setS((x) => ({ ...x, D }))} />
          <Slider label="Diámetro del vástago, d" value={d} min={4} max={100} step={1} unit=" mm" color={MANIM.green} onChange={(dd) => setS((x) => ({ ...x, d: dd }))} />
          <Slider label="Presión de trabajo, p" value={s.p} min={1} max={10} step={0.5} unit=" bar" format={(v) => fmtEs(v, 1)} color={MANIM.red} onChange={(p) => setS((x) => ({ ...x, p }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Superficie útil">
          {fmtEs(Sut, 2)} cm²
        </Stat>
        <Stat color={MANIM.yellow} label="Fuerza teórica, F_t = S·p">
          {fmtEs(Ft, 0)} N
        </Stat>
        <Stat color={MANIM.green} label="Fuerza real, F_n">
          {fmtEs(Fn, 0)} N ({fmtEs(Fn / 9.8, 0)} kp)
        </Stat>
      </Readout>
      <SplitBar
        parts={[
          { value: Fn, color: MANIM.green, label: `F_n ${fmtEs(Fn, 0)}` },
          { value: Fr, color: MANIM.orange, label: "roz." },
          ...(Fm > 0 ? [{ value: Fm, color: MANIM.purple, label: "muelle" }] : []),
        ]}
      />
      <MathRenderer
        text={
          s.tipo === "simple"
            ? `$F_n = S\\,p - (F_r + F_m) = ${fmtEs(Ft, 0)} - (${fmtEs(Fr, 0)} + ${fmtEs(Fm, 0)}) = ${fmtEs(Fn, 0)}\\ \\text{N}$`
            : `$F_n = ${s.tipo === "avance" ? "S" : "S'"}\\,p - F_r = ${fmtEs(Ft, 0)} - ${fmtEs(Fr, 0)} = ${fmtEs(Fn, 0)}\\ \\text{N}$`
        }
        className="text-base"
      />
      <Note>Rozamiento: ≈ 10 % de F_t (entre 4 y 8 bar). En el simple efecto, el muelle de recuperación resta un ≈ 6 %. En el retroceso: S&apos; = π(R² − r²).</Note>
    </Frame>
  );
}

/* ───────────── Consumo de aire ───────────── */

export function ConsumoAireExplorador({ block }: { block: ToolBlock }) {
  const init = { tipo: "doble" as "simple" | "doble", D: num(block.params?.a, 80, 10, 250), d: 25, c: num(block.params?.b, 700, 10, 1500), p: 6, f: 5 };
  const [s, setS] = useState(init);
  const d = Math.min(s.d, s.D - 2);
  const l = s.c / 10; // cm
  const Vcil = s.tipo === "doble" ? ((Math.PI / 4) * (2 * (s.D / 10) ** 2 - (d / 10) ** 2) * l) / 1000 : (area(s.D) * l) / 1000; // litros
  const Vaire = (s.p + 1) * Vcil;
  const Q = Vaire * s.f;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mira cuánto aire gasta un ciclo y cuánto por minuto. ¿Qué cambia si pasas a simple efecto o bajas la presión?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Cilindro" value={s.tipo} onChange={(tipo) => setS((x) => ({ ...x, tipo }))} items={[{ value: "doble" as const, label: "Doble efecto" }, { value: "simple" as const, label: "Simple efecto" }]} />
          <Slider label="Diámetro del émbolo, D" value={s.D} min={10} max={250} step={1} unit=" mm" color={MANIM.blue} onChange={(D) => setS((x) => ({ ...x, D }))} />
          {s.tipo === "doble" ? <Slider label="Diámetro del vástago, d" value={d} min={4} max={100} step={1} unit=" mm" color={MANIM.green} onChange={(dd) => setS((x) => ({ ...x, d: dd }))} /> : null}
          <Slider label="Carrera, l" value={s.c} min={10} max={1500} step={10} unit=" mm" color={MANIM.purple} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Presión de trabajo (manométrica)" value={s.p} min={1} max={10} step={0.5} unit=" bar" format={(v) => fmtEs(v, 1)} color={MANIM.red} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Ciclos por minuto, f" value={s.f} min={1} max={60} step={1} unit=" /min" color={MANIM.orange} onChange={(f) => setS((x) => ({ ...x, f }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Volumen del cilindro por ciclo">
          {fmtEs(Vcil, 2)} l
        </Stat>
        <Stat color={MANIM.green} label="Aire libre por ciclo, (p + 1)·V">
          {fmtEs(Vaire, 1)} l
        </Stat>
        <Stat color={MANIM.red} label="Consumo, Q = V_aire·f">
          {fmtEs(Q, 0)} l/min
        </Stat>
      </Readout>
      <MathRenderer
        text={s.tipo === "doble" ? `$V_{cil} = \\dfrac{\\pi}{4}(2D^2 - d^2)\\,l\\qquad V_{aire} = \\dfrac{(p_{man}+1)\\,V_{cil}}{1}\\qquad Q = V_{aire}\\,f$` : `$V_{cil} = \\dfrac{\\pi}{4}D^2\\,l\\qquad V_{aire} = (p_{man}+1)\\,V_{cil}\\qquad Q = V_{aire}\\,f$`}
        className="text-base"
      />
      <Note>El consumo se da en condiciones normales (ISO R554: 20 °C, 1 013 mbar y 65 % de humedad). Un cilindro de simple efecto gasta aproximadamente la mitad que uno de doble efecto.</Note>
    </Frame>
  );
}

/* ───────────── Nomenclatura de una válvula ───────────── */

const PUERTOS: Record<number, { iso: string[]; cetop: string[] }> = {
  2: { iso: ["P", "A"], cetop: ["1", "2"] },
  3: { iso: ["P", "A", "R"], cetop: ["1", "2", "3"] },
  4: { iso: ["P", "A", "B", "R"], cetop: ["1", "2", "4", "3"] },
  5: { iso: ["P", "A", "B", "R", "S"], cetop: ["1", "2", "4", "3", "5"] },
};
const USOS: Record<string, string> = {
  "2/2": "abrir o cerrar el paso del aire (válvula de paso)",
  "3/2": "gobernar cilindros de simple efecto",
  "3/3": "gobernar cilindros de simple efecto con posición intermedia",
  "4/2": "gobernar cilindros de doble efecto",
  "5/2": "gobernar cilindros de doble efecto con escapes independientes",
  "4/3": "gobernar cilindros de doble efecto con posición intermedia (bloqueo o liberación)",
  "5/3": "gobernar cilindros de doble efecto con posición intermedia",
  "2/3": "poco habitual",
};

export function ValvulaNomenclaturaExplorador({ block }: { block: ToolBlock }) {
  const init = { vias: Math.round(num(block.params?.a, 3, 2, 5)), pos: Math.round(num(block.params?.b, 2, 2, 3)) };
  const [s, setS] = useState(init);
  const nombre = `${s.vias}/${s.pos}`;
  const pt = PUERTOS[s.vias]!;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el número de vías y de posiciones: el nombre se lee «vías/posiciones». Fíjate en los códigos de cada conducto y en para qué cilindro sirve."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Número de vías (orificios)" value={s.vias} onChange={(vias) => setS((x) => ({ ...x, vias }))} items={[2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))} />
          <Choice label="Número de posiciones (cuadrados)" value={s.pos} onChange={(pos) => setS((x) => ({ ...x, pos }))} items={[2, 3].map((v) => ({ value: v, label: String(v) }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Nombre">
          {nombre}
        </Stat>
        <Stat color={MANIM.blue} label="Conductos (ISO)">
          {pt.iso.join(" · ")}
        </Stat>
        <Stat color={MANIM.purple} label="Conductos (CETOP)">
          {pt.cetop.join(" · ")}
        </Stat>
      </Readout>
      <Svg w={520} h={120} maxH={125} testId="tool-valvula-nomenclatura">
        {Array.from({ length: s.pos }, (_, i) => {
          const x0 = 260 - (s.pos * 70) / 2 + i * 70;
          return (
            <g key={i}>
              <rect x={x0} y={20} width={70} height={70} fill={MANIM.panel} stroke={i === 0 ? MANIM.yellow : MANIM.muted} strokeWidth={3} />
              {Array.from({ length: s.vias }, (_, k) => (
                <g key={k}>
                  <line x1={x0 + 10 + (k * 50) / Math.max(1, s.vias - 1)} y1={90} x2={x0 + 10 + (k * 50) / Math.max(1, s.vias - 1)} y2={52} stroke={MANIM.ink} strokeWidth={2.5} />
                </g>
              ))}
            </g>
          );
        })}
        {pt.iso.map((l, k) => (
          <text key={l} x={260 - (s.pos * 70) / 2 + 10 + (k * 50) / Math.max(1, s.vias - 1)} y={110} textAnchor="middle" fill={MANIM.blue} fontSize={13}>
            {l}
          </text>
        ))}
      </Svg>
      <Note>Válvula {nombre}: {s.vias} vías y {s.pos} posiciones. Se usa para {USOS[nombre] ?? "—"}. En neumática no suelen usarse más de 4 o 5 vías. P es la alimentación (1), A y B son las salidas de trabajo (2, 4) y R, S los escapes (3, 5).</Note>
    </Frame>
  );
}

/* ───────────── Lógica neumática: válvula selectora y de simultaneidad ───────────── */

export function LogicaNeumaticaExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: (block.params?.a ?? 0) === 1 ? ("and" as const) : ("or" as const), a: false, b: false };
  const [s, setS] = useState(init);
  const out = s.modo === "or" ? s.a || s.b : s.a && s.b;
  const filas = [
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ] as const;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa las dos válvulas en todas las combinaciones. ¿En qué casos sale el cilindro con cada tipo de válvula?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Válvula" value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} items={[{ value: "or" as const, label: "Selectora (O)" }, { value: "and" as const, label: "Simultaneidad (Y)" }]} />
          <Choice label="Pulsador 1.2" value={s.a ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, a: v === 1 }))} items={[{ value: 0, label: "Sin pulsar" }, { value: 1, label: "Pulsado" }]} />
          <Choice label="Pulsador 1.4" value={s.b ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, b: v === 1 }))} items={[{ value: 0, label: "Sin pulsar" }, { value: 1, label: "Pulsado" }]} />
        </>
      }
    >
      <Readout>
        <Stat color={out ? MANIM.green : MANIM.red} label="Señal a la salida">
          {out ? "hay presión: el cilindro sale" : "sin presión: el cilindro está recogido"}
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={155} testId="tool-logica-neumatica">
        <circle cx={60} cy={40} r={16} fill={s.a ? MANIM.green : MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
        <circle cx={60} cy={110} r={16} fill={s.b ? MANIM.green : MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
        <text x={60} y={72} textAnchor="middle" fill={MANIM.muted} fontSize={13}>
          1.2
        </text>
        <text x={60} y={142} textAnchor="middle" fill={MANIM.muted} fontSize={13}>
          1.4
        </text>
        <path d="M 76 40 L 200 40 L 200 65" fill="none" stroke={s.a ? MANIM.green : MANIM.muted} strokeWidth={5} />
        <path d="M 76 110 L 200 110 L 200 85" fill="none" stroke={s.b ? MANIM.green : MANIM.muted} strokeWidth={5} />
        <rect x={160} y={62} width={80} height={26} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={200} y={80} textAnchor="middle" fill={MANIM.yellow} fontSize={14} fontWeight={700}>
          {s.modo === "or" ? "O" : "Y"}
        </text>
        <path d="M 240 75 L 320 75" fill="none" stroke={out ? MANIM.green : MANIM.muted} strokeWidth={5} />
        <rect x={320} y={55} width={150} height={40} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
        <rect className="anim-t" x={325 + (out ? 60 : 0)} y={60} width={14} height={30} fill={MANIM.green} />
        <rect className="anim-t" x={339 + (out ? 60 : 0)} y={72} width={80} height={6} fill={MANIM.ink} />
      </Svg>
      <table className="mx-auto text-base text-[color:var(--stage-ink,#fff)]">
        <thead>
          <tr className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
            <th className="px-4">1.2</th>
            <th className="px-4">1.4</th>
            <th className="px-4">Salida</th>
          </tr>
        </thead>
        <tbody>
          {filas.map(([a, b]) => {
            const o = s.modo === "or" ? a || b : a && b;
            const actual = a === s.a && b === s.b;
            return (
              <tr key={`${a}${b}`} className={actual ? "bg-white/10 font-bold" : ""}>
                <td className="px-4 text-center">{a ? 1 : 0}</td>
                <td className="px-4 text-center">{b ? 1 : 0}</td>
                <td className="px-4 text-center">{o ? 1 : 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Note>{s.modo === "or" ? "Selectora (válvula de doble retención): basta con que haya presión en una entrada. Sirve para mandar un cilindro desde dos puntos distintos." : "Simultaneidad: solo hay señal si hay presión en las dos entradas. Es un elemento de seguridad: una prensa solo baja si el operario pulsa con las dos manos."}</Note>
    </Frame>
  );
}

/* ───────────── Ventosa y técnica del vacío ───────────── */

export function VentosaVacioExplorador({ block }: { block: ToolBlock }) {
  const init = { alt: num(block.params?.a, 0, 0, 3000), vac: 80, area: 60 };
  const [s, setS] = useState(init);
  const patm = PATM * (1 - 0.01 * (s.alt / 100));
  const dp = (patm * s.vac) / 100; // bar de depresión
  const F = dp * 1e5 * (s.area * 1e-4);
  const m = F / 9.8;
  const m0 = (PATM * (s.vac / 100) * 1e5 * (s.area * 1e-4)) / 9.8;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la altitud de la fábrica: la presión atmosférica local baja un 1 % cada 100 m y la ventosa levanta menos. Ningún vacío industrial supera el 80 % de la presión local."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Altitud de la instalación" value={s.alt} min={0} max={3000} step={100} unit=" m" color={MANIM.orange} onChange={(alt) => setS((x) => ({ ...x, alt }))} />
          <Slider label="Nivel de vacío (% de la presión local)" value={s.vac} min={20} max={90} step={5} unit=" %" color={MANIM.blue} onChange={(vac) => setS((x) => ({ ...x, vac }))} />
          <Slider label="Superficie de la ventosa" value={s.area} min={10} max={300} step={5} unit=" cm²" color={MANIM.green} onChange={(area2) => setS((x) => ({ ...x, area: area2 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Presión atmosférica local">
          {fmtEs(patm, 3)} bar
        </Stat>
        <Stat color={MANIM.blue} label="Depresión útil">
          {fmtEs(dp, 3)} bar
        </Stat>
        <Stat color={MANIM.green} label="Masa que sujeta">
          {fmtEs(m, 1)} kg
        </Stat>
        <Stat color={MANIM.muted} label="A nivel del mar">
          {fmtEs(m0, 1)} kg
        </Stat>
      </Readout>
      <Note>
        No es que la ventosa «aspire»: al reducir la presión interior, la atmósfera empuja desde fuera. La fuerza máxima es F = Δp·S con Δp como mucho 1 atm, y en la práctica no se pasa del 80 % de la presión local. Por eso un sistema pensado para 50 kg a nivel del mar levanta bastante menos a 1 000 m.
      </Note>
    </Frame>
  );
}

/* ───────────── Numeración de los elementos de un circuito ───────────── */

export function NumeracionNeumaticaExplorador({ block }: { block: ToolBlock }) {
  const init = { g: Math.round(num(block.params?.a, 1, 0, 4)), n: Math.round(num(block.params?.b, 4, 0, 7)), cero: false };
  const [s, setS] = useState(init);
  const nombre = s.cero ? `${s.g}.0${s.n}` : `${s.g}.${s.n}`;
  let desc: string;
  let color: string = MANIM.green;
  if (s.g === 0) {
    desc = s.n === 0 ? "No es una numeración válida: el grupo 0 se reserva para elementos auxiliares (0.1, 0.2…)." : "Elemento auxiliar común a todo el circuito (por ejemplo, la unidad de mantenimiento 0.1 o la fuente de aire 0.2).";
    color = MANIM.purple;
  } else if (s.cero && s.n >= 1) {
    desc = `Elemento de regulación del grupo ${s.g} (válvula estranguladora o de escape rápido) que actúa sobre su cilindro.`;
    color = MANIM.orange;
  } else if (s.n === 0) {
    desc = `Elemento de trabajo: el cilindro del grupo ${s.g}.`;
    color = MANIM.blue;
  } else if (s.n === 1) {
    desc = `Órgano de gobierno (distribuidor de mando) del grupo ${s.g}.`;
    color = MANIM.red;
  } else {
    desc = `Captador de información del grupo ${s.g}: como la segunda cifra es ${s.n % 2 === 0 ? "par" : "impar"}, influye en ${s.n % 2 === 0 ? "la salida del vástago (avance)" : "el retroceso del vástago"}.`;
    color = MANIM.yellow;
  }

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la primera y la segunda cifra: la primera indica el grupo (cilindro) y la segunda el papel del elemento (trabajo, gobierno, par = avance, impar = retroceso)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Primera cifra: grupo" value={s.g} min={0} max={4} step={1} color={MANIM.blue} onChange={(g) => setS((x) => ({ ...x, g }))} />
          <Slider label="Segunda cifra" value={s.n} min={0} max={7} step={1} color={MANIM.green} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Choice label="Formato" value={s.cero ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, cero: v === 1 }))} items={[{ value: 0, label: "x.y" }, { value: 1, label: "x.0y (regulación)" }]} />
        </>
      }
    >
      <Readout>
        <Stat color={color} label="Elemento">
          {nombre}
        </Stat>
      </Readout>
      <Note>{desc}</Note>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Ejemplo de la figura 8.38: 1.0 cilindro, 1.1 distribuidor, 1.2 y 1.3 captadores de final de carrera, 1.02 y 1.03 reguladores; 0.1 unidad de mantenimiento.</p>
    </Frame>
  );
}
