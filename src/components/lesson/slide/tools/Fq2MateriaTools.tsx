"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Densidad ρ = m / V (g/cm³ si la masa está en g y el volumen en cm³). */
export const densidad = (masaG: number, volumenCm3: number) => (volumenCm3 > 0 ? masaG / volumenCm3 : NaN);
/** Fracción del cuerpo que queda sumergida en un líquido: ρ / ρ_líquido, como máximo 1 (si no, se hunde). */
export const fraccionSumergida = (rho: number, rhoLiquido: number) => (rhoLiquido > 0 ? Math.min(1, rho / rhoLiquido) : NaN);
export const LIQUIDOS = {
  agua: { nombre: "Agua", rho: 1 },
  aceite: { nombre: "Aceite", rho: 0.92 },
  salada: { nombre: "Agua salada", rho: 1.03 },
  mercurio: { nombre: "Mercurio", rho: 13.6 },
} as const;
export type LiquidoId = keyof typeof LIQUIDOS;

export type Estado = "solido" | "liquido" | "gas";
export const ESTADOS: Record<Estado, { nombre: string; forma: string; volumen: string; comprimible: string; fluye: string; particulas: string; ordenSep: number }> = {
  solido: { nombre: "Sólido", forma: "Forma propia (fija)", volumen: "Volumen fijo", comprimible: "No se comprime", fluye: "No fluye", particulas: "Muy juntas y ordenadas", ordenSep: 1 },
  liquido: { nombre: "Líquido", forma: "Toma la forma del recipiente", volumen: "Volumen fijo", comprimible: "Casi no se comprime", fluye: "Fluye", particulas: "Juntas y desordenadas", ordenSep: 1.15 },
  gas: { nombre: "Gas", forma: "Toma la forma del recipiente", volumen: "Ocupa todo el volumen disponible", comprimible: "Se comprime con facilidad", fluye: "Fluye", particulas: "Muy separadas y libres", ordenSep: 3 },
};

/** Velocidad media relativa de las partículas respecto de T0 (K): proporcional a √T. */
export const velocidadRelativa = (T: number, T0 = 300) => (T > 0 ? Math.sqrt(T / T0) : 0);
/** Presión relativa de un gas encerrado: P ∝ T / V (frente a T0 y V0). */
export const presionRelativa = (T: number, V: number, T0 = 300, V0 = 100) => (V > 0 ? T / T0 / (V / V0) : NaN);

export const CAMBIOS = [
  { id: "fusion", nombre: "Fusión", de: "solido", a: "liquido", energia: "absorbe" },
  { id: "solidificacion", nombre: "Solidificación", de: "liquido", a: "solido", energia: "desprende" },
  { id: "vaporizacion", nombre: "Vaporización", de: "liquido", a: "gas", energia: "absorbe" },
  { id: "condensacion", nombre: "Condensación", de: "gas", a: "liquido", energia: "desprende" },
  { id: "sublimacion", nombre: "Sublimación", de: "solido", a: "gas", energia: "absorbe" },
  { id: "deposicion", nombre: "Sublimación inversa (deposición)", de: "gas", a: "solido", energia: "desprende" },
] as const;

export const SUSTANCIAS = {
  agua: { nombre: "Agua", fusion: 0, ebullicion: 100 },
  etanol: { nombre: "Etanol", fusion: -114, ebullicion: 78 },
  mercurio: { nombre: "Mercurio", fusion: -39, ebullicion: 357 },
  plomo: { nombre: "Plomo", fusion: 327, ebullicion: 1749 },
} as const;
export type SustanciaId = keyof typeof SUSTANCIAS;
/** Duración (min) de cada fase de un calentamiento didáctico a potencia constante: sólido, fusión, líquido, ebullición, gas. */
export const FASES_MIN = [2, 3, 5, 4, 2] as const;
export const TOTAL_MIN = FASES_MIN.reduce((s, v) => s + v, 0);
/** Temperatura y estado a los t minutos: sube en cada estado y se mantiene constante durante los cambios de estado. */
export function curvaCalentamiento(fusion: number, ebullicion: number, t: number) {
  const T0 = fusion - 20;
  const T1 = ebullicion + 20;
  const [a, b, c, d, e] = FASES_MIN;
  const tt = Math.min(Math.max(t, 0), TOTAL_MIN);
  if (tt <= a) return { T: T0 + ((fusion - T0) * tt) / a, estado: "sólido" };
  if (tt <= a + b) return { T: fusion, estado: "fusión (sólido + líquido)" };
  if (tt <= a + b + c) return { T: fusion + ((ebullicion - fusion) * (tt - a - b)) / c, estado: "líquido" };
  if (tt <= a + b + c + d) return { T: ebullicion, estado: "ebullición (líquido + gas)" };
  return { T: ebullicion + ((T1 - ebullicion) * (tt - a - b - c - d)) / e, estado: "gas" };
}

/** Posiciones deterministas (0–1) de n partículas, para dibujar el modelo cinético sin azar. */
export function posicionesParticulas(n: number): Pt[] {
  return Array.from({ length: n }, (_, i) => [((i * 37 + 11) % 97) / 97, ((i * 61 + 23) % 89) / 89] as Pt);
}

/* ───────────── 1. Densidad y flotación ───────────── */

export function DensidadFlotacionFq2Explorador({ block }: { block: ToolBlock }) {
  const ids: LiquidoId[] = ["agua", "aceite", "salada", "mercurio"];
  const init = { m: Math.round(num(block.params?.a, 80, 10, 500)), V: Math.round(num(block.params?.b, 100, 10, 200)), l: ids[Math.round(num(block.params?.n, 0, 0, 3))]! };
  const [s, setS] = useState<{ m: number; V: number; l: LiquidoId }>(init);
  const rho = densidad(s.m, s.V);
  const liq = LIQUIDOS[s.l];
  const fr = fraccionSumergida(rho, liq.rho);
  const lado = 40 + (s.V / 200) * 60;
  const nivel = 100;
  const base = 200;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un cuerpo flota si su densidad es menor que la del líquido; si es mayor, se hunde."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa del bloque" value={s.m} min={10} max={500} step={10} unit=" g" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Volumen del bloque" value={s.V} min={10} max={200} step={5} unit=" cm³" color={MANIM.blue} onChange={(V) => setS((o) => ({ ...o, V }))} />
          <Choice label="Líquido" items={ids.map((id) => ({ value: id, label: `${LIQUIDOS[id].nombre} (${fmtEs(LIQUIDOS[id].rho, 2)} g/cm³)` }))} value={s.l} onChange={(l) => setS((o) => ({ ...o, l }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="densidad-flotacion" maxH={250}>
        <rect x={120} y={nivel} width={280} height={base - nivel + 10} fill={MANIM.blue} fillOpacity={0.22} stroke={MANIM.blue} strokeWidth={2.5} />
        <Seg a={[110, nivel]} b={[410, nivel]} color={MANIM.blue} width={1.5} dashed />
        <rect x={260 - lado / 2} y={fr >= 1 ? base - lado : nivel - lado + lado * fr} width={lado} height={lado} fill={MANIM.orange} fillOpacity={0.7} stroke={MANIM.ink} strokeWidth={2.5} />
        <text x={260} y={(fr >= 1 ? base - lado : nivel - lado + lado * fr) + lado / 2 + 5} textAnchor="middle" fill={MANIM.ink} fontSize={14} fontWeight={700}>{`${f2(rho)} g/cm³`}</text>
        <text x={420} y={nivel - 8} fill={MANIM.blue} fontSize={13}>{`${liq.nombre} ${fmtEs(liq.rho, 2)} g/cm³`}</text>
        <text x={20} y={30} fill={MANIM.muted} fontSize={13}>{fr >= 1 ? "El bloque se hunde" : `El bloque flota: ${Math.round(fr * 100)} % sumergido`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Densidad ρ = m / V">{f2(rho)} g/cm³</Stat>
        <Stat color={MANIM.blue} label={`Densidad del líquido (${liq.nombre})`}>{fmtEs(liq.rho, 2)} g/cm³</Stat>
        <Stat color={fr >= 1 ? MANIM.red : MANIM.green} label="Resultado">{fr >= 1 ? "se hunde" : "flota"}</Stat>
      </Readout>
      <Note>La <b>densidad</b> relaciona la <b>masa</b> con el <b>volumen</b>: <b>ρ = m / V</b>; se mide en g/cm³ o en kg/m³ (1 g/cm³ = 1000 kg/m³). Es una <b>propiedad característica</b>: no depende de la cantidad de sustancia, sino de la sustancia. Si la densidad del cuerpo es <b>menor</b> que la del líquido, <b>flota</b> (y la fracción sumergida es ρ / ρ del líquido); si es <b>mayor</b>, se <b>hunde</b>. Por eso el aceite flota sobre el agua y el hierro flota sobre el mercurio.</Note>
    </Frame>
  );
}

/* ───────────── 2. Propiedades de los estados ───────────── */

export function EstadosPropiedadesFq2Explorador({ block }: { block: ToolBlock }) {
  const ids: Estado[] = ["solido", "liquido", "gas"];
  const init = { e: ids[Math.round(num(block.params?.n, 0, 0, 2))]! };
  const [s, setS] = useState<{ e: Estado }>(init);
  const st = ESTADOS[s.e];
  const pos = posicionesParticulas(30);
  const W = 220;
  const H = 150;
  const x0 = 60;
  const y0 = 40;
  const relleno = s.e === "gas" ? H : s.e === "liquido" ? H * 0.55 : H * 0.55;
  const ancho = s.e === "solido" ? W * 0.55 : W;
  const xa = s.e === "solido" ? x0 + (W - ancho) / 2 : x0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La forma, el volumen y la facilidad para comprimirse dependen de cómo estén las partículas."}
      onReset={() => setS(init)}
      controls={<Choice label="Estado de agregación" items={ids.map((id) => ({ value: id, label: ESTADOS[id].nombre }))} value={s.e} onChange={(e) => setS({ e })} />}
    >
      <Svg w={520} h={220} testId="estados-propiedades" maxH={240}>
        <rect x={x0} y={y0} width={W} height={H} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <rect x={xa} y={y0 + H - relleno} width={ancho} height={relleno} fill={s.e === "gas" ? MANIM.purple : s.e === "liquido" ? MANIM.blue : MANIM.orange} fillOpacity={0.15} />
        {pos.map((p, i) => {
          const px = xa + 10 + p[0] * (ancho - 20);
          const py = y0 + H - relleno + 10 + p[1] * (relleno - 20);
          const gx = s.e === "solido" ? xa + 14 + (i % 6) * ((ancho - 28) / 5) : px;
          const gy = s.e === "solido" ? y0 + H - relleno + 14 + Math.floor(i / 6) * ((relleno - 28) / 4) : py;
          return <circle key={i} cx={gx} cy={gy} r={6} fill={s.e === "gas" ? MANIM.purple : s.e === "liquido" ? MANIM.blue : MANIM.orange} />;
        })}
        {[["Forma", st.forma], ["Volumen", st.volumen], ["Compresibilidad", st.comprimible], ["Partículas", st.particulas]].map(([k, v], i) => (
          <g key={String(k)}>
            <text x={310} y={60 + i * 40} fill={MANIM.muted} fontSize={12}>{k}</text>
            <text x={310} y={78 + i * 40} fill={MANIM.ink} fontSize={14} fontWeight={600}>{v}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Estado">{st.nombre}</Stat>
        <Stat color={MANIM.green} label="Forma">{st.forma}</Stat>
        <Stat color={MANIM.blue} label="Volumen">{st.volumen}</Stat>
        <Stat color={MANIM.purple} label="Fluye">{st.fluye}</Stat>
      </Readout>
      <Note>Los <b>sólidos</b> tienen <b>forma y volumen propios</b>; los <b>líquidos</b> tienen volumen propio pero <b>toman la forma</b> del recipiente y <b>fluyen</b>; los <b>gases</b> no tienen ni forma ni volumen propios: <b>ocupan todo</b> el recipiente y se pueden <b>comprimir</b>. Estas diferencias se explican por cómo están las <b>partículas</b>: muy juntas y ordenadas en un sólido, juntas pero desordenadas en un líquido y muy separadas en un gas. Las propiedades de los materiales (dureza, elasticidad, conductividad…) dependen también de su estado.</Note>
    </Frame>
  );
}

/* ───────────── 3. Modelo cinético: temperatura, volumen y presión ───────────── */

export function ModeloCineticoFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { T: Math.round(num(block.params?.a, 300, 100, 600)), V: Math.round(num(block.params?.b, 100, 40, 100)) };
  const [s, setS] = useState(init);
  const pos = posicionesParticulas(24);
  const W = 260 * (s.V / 100);
  const H = 170;
  const x0 = 40;
  const y0 = 30;
  const v = velocidadRelativa(s.T);
  const len = 8 + 26 * v;
  const P = presionRelativa(s.T, s.V);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Al calentar, las partículas se mueven más deprisa y chocan más con las paredes; al reducir el volumen chocan más a menudo: la presión sube."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Temperatura" value={s.T} min={100} max={600} step={50} unit=" K" color={MANIM.red} onChange={(T) => setS((o) => ({ ...o, T }))} />
          <Slider label="Volumen del recipiente" value={s.V} min={40} max={100} step={10} unit=" %" color={MANIM.blue} onChange={(V) => setS((o) => ({ ...o, V }))} />
        </>
      }
    >
      <Svg w={520} h={220} testId="modelo-cinetico" maxH={240}>
        <rect x={x0} y={y0} width={W} height={H} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        {pos.map((p, i) => {
          const cx = x0 + 14 + p[0] * (W - 28);
          const cy = y0 + 14 + p[1] * (H - 28);
          const a = (i * 137) % 360;
          const dx = Math.cos((a * Math.PI) / 180) * len;
          const dy = Math.sin((a * Math.PI) / 180) * len;
          return (
            <g key={i}>
              <Seg a={[cx, cy]} b={[cx + dx, cy + dy]} color={MANIM.orange} width={2} />
              <circle cx={cx} cy={cy} r={5.5} fill={MANIM.purple} />
            </g>
          );
        })}
        <text x={330} y={80} fill={MANIM.muted} fontSize={13}>Velocidad (flechas)</text>
        <text x={330} y={102} fill={MANIM.orange} fontSize={20} fontWeight={700}>{`×${f2(v)}`}</text>
        <text x={330} y={140} fill={MANIM.muted} fontSize={13}>Presión</text>
        <text x={330} y={162} fill={MANIM.green} fontSize={20} fontWeight={700}>{`×${f2(P)}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Temperatura">{`${s.T} K (${s.T - 273} °C)`}</Stat>
        <Stat color={MANIM.orange} label="Velocidad media (relativa a 300 K)">{`×${f2(v)}`}</Stat>
        <Stat color={MANIM.green} label="Presión (relativa)">{`×${f2(P)}`}</Stat>
      </Readout>
      <Note>El <b>modelo cinético-molecular</b> dice que la materia está formada por <b>partículas en continuo movimiento</b> con espacios entre ellas. La <b>temperatura</b> mide la agitación media de las partículas: cuanto más alta, <b>más rápidas</b> se mueven. En un <b>gas encerrado</b>, la <b>presión</b> se debe a los <b>choques</b> de las partículas con las paredes: aumenta al <b>subir la temperatura</b> (más rápidas, choques más fuertes) y al <b>reducir el volumen</b> (más choques por segundo). En la escala <b>kelvin</b>, K = °C + 273.</Note>
    </Frame>
  );
}

/* ───────────── 4. Cambios de estado ───────────── */

export function CambiosEstadoFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, CAMBIOS.length - 1)) };
  const [s, setS] = useState(init);
  const c = CAMBIOS[s.i]!;
  const cx: Record<Estado, number> = { solido: 100, liquido: 260, gas: 420 };
  const nombres: Record<Estado, string> = { solido: "SÓLIDO", liquido: "LÍQUIDO", gas: "GAS" };
  const col: Record<Estado, string> = { solido: MANIM.orange, liquido: MANIM.blue, gas: MANIM.purple };
  const xa = cx[c.de];
  const xb = cx[c.a];
  const arco = c.de === "solido" && c.a === "gas" || c.de === "gas" && c.a === "solido";
  const yA = arco ? 190 : 140;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Para pasar a un estado con partículas más separadas hay que aportar energía; al revés, se desprende."}
      onReset={() => setS(init)}
      controls={<Choice label="Cambio de estado" items={CAMBIOS.map((x, i) => ({ value: i, label: x.nombre }))} value={s.i} onChange={(i) => setS({ i })} />}
    >
      <Svg w={520} h={230} testId="cambios-estado" maxH={250}>
        {(["solido", "liquido", "gas"] as Estado[]).map((e) => (
          <g key={e}>
            <rect x={cx[e] - 45} y={50} width={90} height={70} rx={10} fill={col[e]} fillOpacity={e === c.de || e === c.a ? 0.35 : 0.1} stroke={col[e]} strokeWidth={e === c.de || e === c.a ? 3.5 : 1.5} />
            <text x={cx[e]} y={92} textAnchor="middle" fill={col[e]} fontSize={18} fontWeight={700}>{nombres[e]}</text>
          </g>
        ))}
        <path d={arco ? `M ${xa} 125 Q ${(xa + xb) / 2} ${yA + 30} ${xb} 125` : `M ${xa + (xb > xa ? 45 : -45)} ${xb > xa ? 105 : 70} L ${xb + (xb > xa ? -45 : 45)} ${xb > xa ? 105 : 70}`} fill="none" stroke={c.energia === "absorbe" ? MANIM.red : MANIM.blue} strokeWidth={4} />
        {arco ? <path d={`M ${xb - 8} 138 L ${xb} 122 L ${xb + 8} 138`} fill="none" stroke={c.energia === "absorbe" ? MANIM.red : MANIM.blue} strokeWidth={4} /> : <path d={xb > xa ? `M ${xb - 45 - 10} ${105 - 8} L ${xb - 45} 105 L ${xb - 45 - 10} ${105 + 8}` : `M ${xb + 45 + 10} ${70 - 8} L ${xb + 45} 70 L ${xb + 45 + 10} ${70 + 8}`} fill="none" stroke={c.energia === "absorbe" ? MANIM.red : MANIM.blue} strokeWidth={4} />}
        <text x={(xa + xb) / 2} y={arco ? 175 : xb > xa ? 142 : 40} textAnchor="middle" fill={MANIM.ink} fontSize={18} fontWeight={700}>{c.nombre}</text>
        <text x={260} y={215} textAnchor="middle" fill={c.energia === "absorbe" ? MANIM.red : MANIM.blue} fontSize={15} fontWeight={700}>{c.energia === "absorbe" ? "La sustancia ABSORBE energía (calor)" : "La sustancia DESPRENDE energía (calor)"}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Cambio">{c.nombre}</Stat>
        <Stat color={MANIM.green} label="Paso">{`${nombres[c.de].toLowerCase()} → ${nombres[c.a].toLowerCase()}`}</Stat>
        <Stat color={c.energia === "absorbe" ? MANIM.red : MANIM.blue} label="Energía">{c.energia === "absorbe" ? "se absorbe" : "se desprende"}</Stat>
      </Readout>
      <Note>Los <b>cambios de estado</b> son cambios <b>físicos</b>: la sustancia sigue siendo la misma. <b>Fusión</b> (sólido → líquido), <b>vaporización</b> (líquido → gas, por <b>evaporación</b> o <b>ebullición</b>) y <b>sublimación</b> (sólido → gas) <b>absorben</b> energía, porque las partículas se separan. <b>Solidificación</b>, <b>condensación</b> y la sublimación inversa <b>desprenden</b> energía. La <b>evaporación</b> ocurre en la superficie a cualquier temperatura; la <b>ebullición</b>, en todo el líquido a la temperatura de ebullición.</Note>
    </Frame>
  );
}

/* ───────────── 5. Gráfica de calentamiento ───────────── */

export function CurvaCalentamientoFq2Explorador({ block }: { block: ToolBlock }) {
  const ids: SustanciaId[] = ["agua", "etanol", "mercurio", "plomo"];
  const init = { s: ids[Math.round(num(block.params?.n, 0, 0, 3))]!, t: Math.round(num(block.params?.a, 8, 0, TOTAL_MIN)) };
  const [st, setSt] = useState<{ s: SustanciaId; t: number }>(init);
  const sus = SUSTANCIAS[st.s];
  const T0 = sus.fusion - 20;
  const T1 = sus.ebullicion + 20;
  const cur = curvaCalentamiento(sus.fusion, sus.ebullicion, st.t);
  const X0 = 60;
  const Y0 = 190;
  const ux = 400 / TOTAL_MIN;
  const uy = 150 / (T1 - T0);
  const P = (t: number, T: number): Pt => [X0 + t * ux, Y0 - (T - T0) * uy];
  const puntos: Pt[] = Array.from({ length: TOTAL_MIN * 8 + 1 }, (_, i) => {
    const t = i / 8;
    return P(t, curvaCalentamiento(sus.fusion, sus.ebullicion, t).T);
  });
  return (
    <Frame
      stacked
      hint={block.hint ?? "Durante un cambio de estado la temperatura se mantiene constante aunque se siga aportando calor."}
      onReset={() => setSt(init)}
      controls={
        <>
          <Choice label="Sustancia" items={ids.map((id) => ({ value: id, label: SUSTANCIAS[id].nombre }))} value={st.s} onChange={(s2) => setSt((o) => ({ ...o, s: s2 }))} />
          <Slider label="Tiempo de calentamiento" value={st.t} min={0} max={TOTAL_MIN} step={1} unit=" min" color={MANIM.orange} onChange={(t) => setSt((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="curva-calentamiento" maxH={250}>
        <Seg a={P(0, T0)} b={P(TOTAL_MIN, T0)} color={MANIM.ink} width={2} />
        <Seg a={[X0, Y0 - 160]} b={[X0, Y0]} color={MANIM.ink} width={2} />
        <text x={470} y={Y0 + 22} fill={MANIM.muted} fontSize={12} textAnchor="end">tiempo (min)</text>
        <text x={16} y={20} fill={MANIM.muted} fontSize={12}>temperatura (°C)</text>
        <Seg a={P(0, sus.fusion)} b={P(TOTAL_MIN, sus.fusion)} color={MANIM.blue} width={1} dashed />
        <Seg a={P(0, sus.ebullicion)} b={P(TOTAL_MIN, sus.ebullicion)} color={MANIM.purple} width={1} dashed />
        <text x={X0 + 6} y={P(0, sus.fusion)[1] - 4} fill={MANIM.blue} fontSize={12}>{`fusión ${sus.fusion} °C`}</text>
        <text x={X0 + 6} y={P(0, sus.ebullicion)[1] - 4} fill={MANIM.purple} fontSize={12}>{`ebullición ${sus.ebullicion} °C`}</text>
        <polyline points={puntos.map((p) => p.join(",")).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={3.5} strokeLinejoin="round" />
        <Dot p={P(st.t, cur.T)} color={MANIM.yellow} r={7} />
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Temperatura">{f1(cur.T)} °C</Stat>
        <Stat color={MANIM.yellow} label="Estado">{cur.estado}</Stat>
        <Stat color={MANIM.muted} label="Fusión · ebullición">{`${sus.fusion} °C · ${sus.ebullicion} °C`}</Stat>
      </Readout>
      <Note>En una <b>gráfica de calentamiento</b> la temperatura <b>sube</b> mientras la sustancia está en un solo estado, y se queda en un <b>tramo horizontal</b> durante un <b>cambio de estado</b>: la energía que se aporta se emplea en <b>separar las partículas</b>, no en aumentar la temperatura. Esas temperaturas son el <b>punto de fusión</b> y el <b>punto de ebullición</b>, propiedades características de cada sustancia (por eso sirven para identificarla). Una sustancia pura mantiene la temperatura constante en el cambio; una mezcla, no. Las cifras son las de las sustancias a presión normal; los tiempos son <b>didácticos</b>.</Note>
    </Frame>
  );
}
