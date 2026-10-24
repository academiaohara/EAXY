import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";
import { Lamp, Lines, poly } from "@/components/lesson/anim/scenes/industrial/sensores";

/* ───────────── Elementos comunes ───────────── */

export type GateKind = "and" | "or" | "not" | "nand" | "nor" | "xor";

/** Puerta lógica centrada en (x, y). Cuerpo de ±32 en horizontal y ±28 en vertical. */
export function Gate({ kind, x, y, color = MANIM.ink, fill = MANIM.panel, label }: { kind: GateKind; x: number; y: number; color?: string; fill?: string; label?: ReactNode }) {
  const bubble = kind === "not" || kind === "nand" || kind === "nor";
  const body = (() => {
    if (kind === "and" || kind === "nand") {
      return `M ${x - 30} ${y - 28} L ${x} ${y - 28} Q ${x + 32} ${y - 28} ${x + 32} ${y} Q ${x + 32} ${y + 28} ${x} ${y + 28} L ${x - 30} ${y + 28} Z`;
    }
    if (kind === "or" || kind === "nor" || kind === "xor") {
      return `M ${x - 30} ${y - 28} Q ${x + 8} ${y - 28} ${x + 34} ${y} Q ${x + 8} ${y + 28} ${x - 30} ${y + 28} Q ${x - 12} ${y} ${x - 30} ${y - 28} Z`;
    }
    return `M ${x - 24} ${y - 26} L ${x - 24} ${y + 26} L ${x + 28} ${y} Z`;
  })();
  return (
    <g className="anim-t">
      <path d={body} fill={fill} stroke={color} strokeWidth={3.5} strokeLinejoin="round" />
      {kind === "xor" ? <path d={`M ${x - 40} ${y - 28} Q ${x - 22} ${y} ${x - 40} ${y + 28}`} fill="none" stroke={color} strokeWidth={3.5} /> : null}
      {bubble ? <circle cx={kind === "not" ? x + 34 : x + 40} cy={y} r={6} fill={MANIM.surface} stroke={color} strokeWidth={3.5} /> : null}
      {label ? (
        <Txt x={x - 4} y={y + 6} size={15} color={color}>
          {label}
        </Txt>
      ) : null}
    </g>
  );
}

export const wire = (pts: [number, number][], color: string = MANIM.muted, width = 3) => <path d={poly(pts)} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" className="anim-t" />;

/** Interruptor: cerrado (línea recta) o abierto (palanca levantada). */
export function Sw({ x, y, closed, label, color = MANIM.blue, w = 70 }: { x: number; y: number; closed: boolean; label: string; color?: string; w?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={color} />
      <circle cx={x + w} cy={y} r={4} fill={color} />
      <line x1={x} y1={y} x2={closed ? x + w : x + w - 14} y2={closed ? y : y - 26} stroke={closed ? MANIM.green : color} strokeWidth={4} strokeLinecap="round" className="anim-t" />
      <Txt x={x + w / 2} y={y + 28} size={16} color={color}>
        {label}
      </Txt>
    </g>
  );
}

/** Pequeña tabla de verdad en SVG con una fila resaltada. */
export function MiniTable({ x, y, head, rows, hi, colors }: { x: number; y: number; head: string[]; rows: (number | string)[][]; hi: number; colors?: string[] }) {
  const cw = 46;
  const rh = 32;
  return (
    <g>
      {head.map((h, i) => (
        <Txt key={i} x={x + i * cw + cw / 2} y={y} size={17} color={colors?.[i] ?? MANIM.muted}>
          {h}
        </Txt>
      ))}
      <line x1={x} y1={y + 10} x2={x + head.length * cw} y2={y + 10} stroke={MANIM.grid} strokeWidth={2} />
      {rows.map((r, ri) => (
        <g key={ri}>
          {ri === hi ? <rect x={x - 4} y={y + 16 + ri * rh} width={head.length * cw + 8} height={rh - 2} rx={6} fill={MANIM.yellow} fillOpacity={0.2} stroke={MANIM.yellow} strokeWidth={2} /> : null}
          {r.map((c, ci) => (
            <Txt key={ci} x={x + ci * cw + cw / 2} y={y + 38 + ri * rh} size={20} color={ri === hi ? MANIM.yellow : MANIM.ink} mono>
              {c}
            </Txt>
          ))}
        </g>
      ))}
    </g>
  );
}

/* ───────────── 2. Decimal → binario por divisiones ───────────── */

export function buildConversionBases(): AnimBuild {
  const rows = [
    { d: 45, q: 22, r: 1 },
    { d: 22, q: 11, r: 0 },
    { d: 11, q: 5, r: 1 },
    { d: 5, q: 2, r: 1 },
    { d: 2, q: 1, r: 0 },
    { d: 1, q: 0, r: 1 },
  ];
  const frac = [
    { f: "0,36", p: "0,72", b: 0 },
    { f: "0,72", p: "1,44", b: 1 },
    { f: "0,44", p: "0,88", b: 0 },
    { f: "0,88", p: "1,76", b: 1 },
  ];
  return {
    label: "De decimal a binario: divisiones sucesivas entre 2 y multiplicaciones para la parte decimal",
    beatMs: 5600,
    captions: [
      "Para pasar **45** a binario se divide entre 2 una y otra vez, anotando cada **resto** (que solo puede ser 0 o 1).",
      "Se sigue dividiendo el **cociente** hasta que el último cociente sea menor que 2: aquí, hasta llegar a 0.",
      "Todas las divisiones hechas. Cada fila produce un bit: el resto.",
      "Se leen los restos de **abajo arriba**: el último es el bit más significativo (MSB). Resultado: $45_{(10)} = 101101_{(2)}$.",
      "La parte **decimal** se multiplica por 2: la cifra entera que sale es el siguiente bit y se sigue con la parte decimal. $0{,}36_{(10)} \\approx 0{,}0101_{(2)}$.",
    ],
    render: (beat) => {
      if (beat === 4) {
        return (
          <Canvas>
            <Txt x={400} y={44} size={22} color={MANIM.orange}>
              Parte decimal: 0,36
            </Txt>
            {["Fracción", "× 2", "Cifra"].map((h, i) => (
              <Txt key={h} x={190 + i * 150} y={92} size={18} color={MANIM.muted}>
                {h}
              </Txt>
            ))}
            {frac.map((r, i) => (
              <g key={i}>
                <Txt x={190} y={140 + i * 50} size={24} mono>
                  {r.f}
                </Txt>
                <Txt x={340} y={140 + i * 50} size={24} mono color={MANIM.blue}>
                  {r.p}
                </Txt>
                <Txt x={490} y={140 + i * 50} size={28} mono color={MANIM.yellow}>
                  {r.b}
                </Txt>
              </g>
            ))}
            <Arrow x1={560} y1={130} x2={560} y2={310} color={MANIM.green} width={4} head={12} />
            <Txt x={640} y={225} size={18} color={MANIM.green}>
              se lee hacia abajo
            </Txt>
            <Txt x={400} y={385} size={30} color={MANIM.yellow} mono>
              0,36 ≈ 0,0101
            </Txt>
          </Canvas>
        );
      }
      const shown = beat === 0 ? 1 : beat === 1 ? 3 : 6;
      return (
        <Canvas>
          {["Dividendo", "Cociente", "Resto"].map((h, i) => (
            <Txt key={h} x={130 + i * 130} y={52} size={18} color={MANIM.muted}>
              {h}
            </Txt>
          ))}
          {rows.map((r, i) => (
            <Fade key={i} show={i < shown} dy={-10}>
              <Txt x={130} y={105 + i * 48} size={24} mono>
                {r.d} : 2
              </Txt>
              <Txt x={260} y={105 + i * 48} size={24} mono color={MANIM.blue}>
                {r.q}
              </Txt>
              <Txt x={390} y={105 + i * 48} size={26} mono color={beat >= 3 ? MANIM.yellow : MANIM.orange}>
                {r.r}
              </Txt>
            </Fade>
          ))}
          <Fade show={beat >= 3}>
            <Arrow x1={440} y1={375 - 35} x2={440} y2={95} color={MANIM.green} width={4} head={12} />
            <Txt x={458} y={230} size={16} color={MANIM.green} anchor="start">
              leer hacia arriba
            </Txt>
            <rect x={610} y={150} width={170} height={90} rx={12} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={695} y={190} size={17} color={MANIM.muted}>
              MSB … LSB
            </Txt>
            <Txt x={695} y={225} size={32} mono color={MANIM.yellow}>
              101101
            </Txt>
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={620} y={150} size={20} color={MANIM.blue}>
              45 : 2 = 22
            </Txt>
            <Txt x={620} y={180} size={20} color={MANIM.orange}>
              resto 1
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── 4. Lógica de niveles ───────────── */

export function buildLogicaNiveles(): AnimBuild {
  const levels = [1, 1, 0, 1, 0, 0, 1, 0];
  return {
    label: "Lógica positiva y lógica negativa sobre la misma señal",
    beatMs: 5600,
    captions: [
      "Un circuito digital solo distingue **dos niveles de tensión**: +5 V (alto) y 0 V (bajo). Los asociamos a los estados lógicos 1 y 0.",
      "En **lógica positiva** el nivel más alto es el **1** y el más bajo el **0**. Es el convenio que usaremos en toda la unidad.",
      "En **lógica negativa** es al revés: el nivel más bajo es el **1**. La misma señal física transmite un mensaje distinto.",
    ],
    render: (beat) => {
      const pos = beat < 2;
      const X0 = 120;
      const W = 70;
      return (
        <Canvas>
          <line x1={90} y1={110} x2={720} y2={110} stroke={MANIM.grid} strokeDasharray="5 5" strokeWidth={2} />
          <line x1={90} y1={220} x2={720} y2={220} stroke={MANIM.grid} strokeDasharray="5 5" strokeWidth={2} />
          <Txt x={82} y={116} size={18} color={MANIM.muted} anchor="end">
            +5 V
          </Txt>
          <Txt x={82} y={226} size={18} color={MANIM.muted} anchor="end">
            0 V
          </Txt>
          <path d={levels.map((l, i) => `${i ? "L" : "M"} ${X0 + i * W} ${l ? 110 : 220} L ${X0 + (i + 1) * W} ${l ? 110 : 220}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={4} strokeLinejoin="round" />
          <Fade show={beat >= 1}>
            {levels.map((l, i) => {
              const bit = pos ? l : 1 - l;
              return (
                <Txt key={i} x={X0 + i * W + W / 2} y={290} size={32} color={bit ? MANIM.green : MANIM.muted} mono>
                  {bit}
                </Txt>
              );
            })}
            <Txt x={400} y={340} size={22} color={pos ? MANIM.green : MANIM.orange}>
              {pos ? "Lógica positiva: alto = 1, bajo = 0" : "Lógica negativa: alto = 0, bajo = 1"}
            </Txt>
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={400} y={290} size={20} color={MANIM.muted}>
              ¿Qué mensaje transmite?
            </Txt>
          </Fade>
          <Txt x={400} y={44} size={20} color={MANIM.yellow}>
            Misma señal de tensión
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── 5. OR, AND y NOT con interruptores ───────────── */

export function buildPuertasLogicasBasicas(): AnimBuild {
  return {
    label: "Suma lógica (OR), producto lógico (AND) y negación (NOT) con interruptores",
    beatMs: 5600,
    captions: [
      "**OR** ($S = a + b$): dos interruptores en **paralelo**. Con los dos abiertos la lámpara está apagada.",
      "Basta que **uno** esté cerrado para que la lámpara encienda: la salida es 1 cuando $a$ o $b$ (o los dos) valen 1.",
      "**AND** ($S = a \\cdot b$): dos interruptores en **serie**. Con uno solo cerrado, la corriente no pasa.",
      "Solo cuando **los dos** están cerrados la lámpara enciende: $S = 1$ únicamente si $a = 1$ y $b = 1$.",
      "**NOT** ($S = \\bar a$): un contacto **complementario**. Si $a$ está abierto, $\\bar a$ está cerrado, y al revés.",
    ],
    render: (beat) => {
      const mode = beat <= 1 ? "or" : beat <= 3 ? "and" : "not";
      const a = beat === 1 ? 1 : beat === 3 ? 1 : beat === 4 ? 0 : 0;
      const b = beat === 3 ? 1 : 0;
      const out = mode === "or" ? (a | b) : mode === "and" ? (a & b) : 1 - a;
      const row = mode === "not" ? a : a + 2 * b;
      return (
        <Canvas>
          <Txt x={220} y={40} size={24} color={mode === "or" ? MANIM.green : mode === "and" ? MANIM.blue : MANIM.purple}>
            {mode === "or" ? "Suma lógica: OR" : mode === "and" ? "Producto lógico: AND" : "Negación: NOT"}
          </Txt>
          {/* batería */}
          <line x1={60} y1={170} x2={60} y2={210} stroke={MANIM.ink} strokeWidth={4} />
          <line x1={74} y1={180} x2={74} y2={200} stroke={MANIM.ink} strokeWidth={8} />
          <Txt x={44} y={160} size={15} color={MANIM.muted}>
            +V
          </Txt>
          {mode === "or" ? (
            <g>
              {wire([[60, 170], [60, 110], [120, 110]])}
              {wire([[60, 170], [60, 280], [120, 280]])}
              <Sw x={120} y={110} closed={a === 1} label="a" />
              <Sw x={120} y={280} closed={b === 1} label="b" color={MANIM.orange} />
              {wire([[190, 110], [330, 110], [330, 195]], a === 1 ? MANIM.green : MANIM.muted)}
              {wire([[190, 280], [330, 280], [330, 195]], b === 1 ? MANIM.green : MANIM.muted)}
              {wire([[330, 195], [390, 195]], out ? MANIM.green : MANIM.muted)}
            </g>
          ) : null}
          {mode === "and" ? (
            <g>
              {wire([[60, 170], [60, 195], [100, 195]])}
              <Sw x={100} y={195} closed={a === 1} label="a" />
              {wire([[170, 195], [220, 195]], a === 1 ? MANIM.green : MANIM.muted)}
              <Sw x={220} y={195} closed={b === 1} label="b" color={MANIM.orange} />
              {wire([[290, 195], [390, 195]], a === 1 && b === 1 ? MANIM.green : MANIM.muted)}
            </g>
          ) : null}
          {mode === "not" ? (
            <g>
              {wire([[60, 170], [60, 195], [100, 195]])}
              <Sw x={100} y={195} closed={a === 0} label="ā" color={MANIM.purple} w={90} />
              {wire([[190, 195], [390, 195]], a === 0 ? MANIM.green : MANIM.muted)}
              <Txt x={145} y={150} size={18} color={MANIM.blue}>
                a = {a}
              </Txt>
            </g>
          ) : null}
          <Lamp x={420} y={195} on={out === 1} r={22} />
          {wire([[442, 195], [470, 195], [470, 330], [60, 330], [60, 210]], MANIM.grid)}
          <Txt x={420} y={248} size={18} color={out ? MANIM.yellow : MANIM.muted}>
            S = {out}
          </Txt>
          {/* tabla de verdad */}
          {mode === "not" ? (
            <MiniTable x={560} y={110} head={["a", "S"]} rows={[[0, 1], [1, 0]]} hi={a} colors={[MANIM.blue, MANIM.green]} />
          ) : mode === "or" ? (
            <MiniTable x={540} y={110} head={["b", "a", "S"]} rows={[[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]]} hi={row} colors={[MANIM.orange, MANIM.blue, MANIM.green]} />
          ) : (
            <MiniTable x={540} y={110} head={["b", "a", "S"]} rows={[[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]]} hi={row} colors={[MANIM.orange, MANIM.blue, MANIM.green]} />
          )}
        </Canvas>
      );
    },
  };
}

/* ───────────── 7. NOR, NAND y XOR ───────────── */

export function buildPuertasUniversales(): AnimBuild {
  return {
    label: "NOR y NAND como OR y AND negadas; la XOR detecta entradas distintas",
    beatMs: 5800,
    captions: [
      "**NOR** es una OR con la salida **invertida** (el círculo del símbolo): $S = \\overline{a+b}$, que por Morgan es $\\bar a \\cdot \\bar b$. Solo vale 1 si **las dos** entradas valen 0.",
      "**NAND** es una AND con la salida invertida: $S = \\overline{a\\cdot b}$, igual a $\\bar a + \\bar b$. Solo vale 0 si **las dos** entradas valen 1.",
      "**XOR** (O exclusiva): $S = a \\oplus b$ vale 1 cuando las entradas **no coinciden**. Es un comparador binario de un bit.",
      "NOR y NAND son **puertas universales**: con cualquiera de ellas se puede construir cualquier otra función lógica. Circuitos TTL: 7402 (NOR), 7400 (NAND), 7486 (XOR).",
    ],
    render: (beat) => {
      const defs: { kind: GateKind; name: string; rows: number[][]; c: string; base: string }[] = [
        { kind: "nor", name: "NOR", rows: [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 0]], c: MANIM.green, base: "OR" },
        { kind: "nand", name: "NAND", rows: [[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 0]], c: MANIM.blue, base: "AND" },
        { kind: "xor", name: "XOR", rows: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]], c: MANIM.orange, base: "" },
      ];
      if (beat === 3) {
        return (
          <Canvas>
            <Txt x={400} y={60} size={26} color={MANIM.yellow}>
              Puertas universales
            </Txt>
            <Gate kind="nand" x={200} y={150} color={MANIM.blue} />
            <Gate kind="nor" x={600} y={150} color={MANIM.green} />
            <Txt x={200} y={215} size={20} color={MANIM.blue}>
              NAND
            </Txt>
            <Txt x={600} y={215} size={20} color={MANIM.green}>
              NOR
            </Txt>
            <Lines
              x={400}
              y={290}
              size={21}
              gap={34}
              anchor="middle"
              items={[
                { t: "NOT, AND y OR se construyen solo con NAND", c: MANIM.blue },
                { t: "NOT, AND y OR se construyen solo con NOR", c: MANIM.green },
                { t: "Basta un tipo de puerta para cualquier circuito", c: MANIM.yellow },
              ]}
            />
          </Canvas>
        );
      }
      const d = defs[beat]!;
      return (
        <Canvas>
          <Txt x={230} y={44} size={26} color={d.c}>
            Puerta {d.name}
          </Txt>
          {wire([[60, 146], [176, 146]], MANIM.muted)}
          {wire([[60, 174], [176, 174]], MANIM.muted)}
          <Gate kind={d.kind} x={200} y={160} color={d.c} />
          {wire([[d.kind === "xor" ? 234 : 246, 160], [330, 160]], d.c)}
          <Txt x={48} y={152} size={20} color={MANIM.blue} anchor="end">
            a
          </Txt>
          <Txt x={48} y={180} size={20} color={MANIM.orange} anchor="end">
            b
          </Txt>
          <Txt x={350} y={166} size={20} color={d.c} anchor="start">
            S
          </Txt>
          <Txt x={230} y={285} size={18} color={MANIM.muted}>
            {d.name === "XOR" ? "1 si a ≠ b" : `${d.base} + círculo de inversión`}
          </Txt>
          <MiniTable x={500} y={90} head={["b", "a", "S"]} rows={d.rows} hi={-1} colors={[MANIM.orange, MANIM.blue, d.c]} />
        </Canvas>
      );
    },
  };
}

/* ───────────── 9. Agrupar unos en un mapa de Karnaugh ───────────── */

export function buildKarnaughAgrupar(): AnimBuild {
  // Ejemplo 13 del libro: S = Σ(1, 2, 4, 5, 6)
  const ones = [1, 2, 4, 5, 6];
  const colsAB = ["00", "01", "11", "10"];
  const idx = (c: number, r: number) => [0, 2, 3, 1][c]! + 4 * r;
  const X0 = 150;
  const Y0 = 120;
  const U = 84;
  const groups = [
    { cells: [4, 6], color: MANIM.green, term: "c · ā", why: "cambia b → se elimina" },
    { cells: [2, 6], color: MANIM.orange, term: "b · ā", why: "cambia c → se elimina" },
    { cells: [1, 5], color: MANIM.blue, term: "b̄ · a", why: "cambia c → se elimina" },
  ];
  const pos = (i: number) => {
    for (let r = 0; r < 2; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        if (idx(c, r) === i) {
          return { c, r };
        }
      }
    }
    return { c: 0, r: 0 };
  };
  return {
    label: "Simplificar con un mapa de Karnaugh de tres variables",
    beatMs: 6000,
    captions: [
      "Una lámpara se enciende con un solo pulsador, o con dos que no sean a y b: $S = \\sum(1,2,4,5,6)$. Se colocan **unos** en las celdas de esas combinaciones.",
      "**Grupo 1** (celdas 4 y 6): entre ellas cambia $b$, que se **elimina**. Quedan $c = 1$ y $a = 0$: $c\\cdot\\bar a$.",
      "**Grupo 2** (celdas 2 y 6): cambia $c$, que se elimina. Quedan $b = 1$ y $a = 0$: $b\\cdot\\bar a$. El 6 puede estar en varios grupos.",
      "**Grupo 3** (celdas 1 y 5): cambia $c$. Quedan $b = 0$ y $a = 1$: $\\bar b\\cdot a$.",
      "La función simplificada es la **suma** de los términos de cada grupo: $S = c\\cdot\\bar a + b\\cdot\\bar a + \\bar b\\cdot a$.",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={X0 - 70} y={Y0 - 38} size={16} color={MANIM.muted} anchor="start">
          c \ ab
        </Txt>
        {colsAB.map((l, c) => (
          <Txt key={l} x={X0 + c * U + U / 2} y={Y0 - 16} size={19} color={MANIM.muted} mono>
            {l}
          </Txt>
        ))}
        {[0, 1].map((r) => (
          <Txt key={r} x={X0 - 18} y={Y0 + r * U + U / 2 + 7} size={19} color={MANIM.muted} mono>
            {r}
          </Txt>
        ))}
        {[0, 1].map((r) =>
          [0, 1, 2, 3].map((c) => {
            const i = idx(c, r);
            const one = ones.includes(i);
            return (
              <g key={i}>
                <rect x={X0 + c * U} y={Y0 + r * U} width={U} height={U} fill={one ? MANIM.panel : MANIM.surface} stroke={MANIM.muted} strokeWidth={2.5} />
                <Txt x={X0 + c * U + 14} y={Y0 + r * U + 20} size={14} color={MANIM.muted}>
                  {i}
                </Txt>
                <Txt x={X0 + c * U + U / 2} y={Y0 + r * U + U / 2 + 10} size={32} color={one ? MANIM.green : MANIM.muted} mono>
                  {one ? 1 : 0}
                </Txt>
              </g>
            );
          }),
        )}
        {groups.map((g, k) => {
          const ps = g.cells.map(pos);
          const minC = Math.min(...ps.map((p) => p.c));
          const maxC = Math.max(...ps.map((p) => p.c));
          const minR = Math.min(...ps.map((p) => p.r));
          const maxR = Math.max(...ps.map((p) => p.r));
          const inset = 6 + k * 4;
          return (
            <Fade key={k} show={beat >= k + 1}>
              <rect x={X0 + minC * U + inset} y={Y0 + minR * U + inset} width={(maxC - minC + 1) * U - inset * 2} height={(maxR - minR + 1) * U - inset * 2} rx={16} fill="none" stroke={g.color} strokeWidth={4} />
            </Fade>
          );
        })}
        {groups.map((g, k) => (
          <Fade key={k} show={beat >= k + 1} dx={10}>
            <Txt x={540} y={136 + k * 62} size={24} color={g.color} anchor="start" mono>
              {g.term}
            </Txt>
            <Txt x={540} y={160 + k * 62} size={15} color={MANIM.muted} anchor="start">
              {g.why}
            </Txt>
          </Fade>
        ))}
        <Fade show={beat === 4}>
          <rect x={150} y={330} width={500} height={52} rx={12} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={400} y={364} size={26} color={MANIM.yellow} mono>
            S = c·ā + b·ā + b̄·a
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── 11. NOT, AND y OR solo con NAND ───────────── */

export function buildNandImplementacion(): AnimBuild {
  return {
    label: "Construir NOT, AND y OR con puertas NAND",
    beatMs: 6000,
    captions: [
      "**NOT con NAND**: se unen las dos entradas. Si $a = 0$, la NAND da 1; si $a = 1$, da 0. Es un inversor: $S = \\overline{a\\cdot a} = \\bar a$.",
      "**AND con NAND**: una NAND da $\\overline{a\\cdot b}$; si se invierte con una segunda NAND (entradas unidas) se recupera $a\\cdot b$.",
      "**OR con NAND**: se invierte cada entrada y se aplica NAND. Por Morgan, $\\overline{\\bar a\\cdot\\bar b} = a + b$.",
      "Toda función se puede escribir como **suma de productos**; con doble inversión es una NAND final de NAND de cada producto. Ej.: $S = c + b\\bar a + \\bar b a$.",
    ],
    render: (beat) => {
      const mid = 210;
      return (
        <Canvas>
          {beat === 0 ? (
            <g>
              {wire([[60, mid], [120, mid]], MANIM.blue)}
              {wire([[120, mid - 14], [120, mid + 14]], MANIM.blue)}
              {wire([[120, mid - 14], [170, mid - 14]], MANIM.blue)}
              {wire([[120, mid + 14], [170, mid + 14]], MANIM.blue)}
              <Gate kind="nand" x={200} y={mid} color={MANIM.blue} />
              {wire([[246, mid], [340, mid]], MANIM.green)}
              <Txt x={50} y={mid + 6} size={20} color={MANIM.blue} anchor="end">
                a
              </Txt>
              <Txt x={360} y={mid + 6} size={22} color={MANIM.green} anchor="start">
                S = ā
              </Txt>
              <Txt x={400} y={320} size={20} color={MANIM.muted}>
                Entradas unidas: NAND = inversor
              </Txt>
            </g>
          ) : null}
          {beat === 1 ? (
            <g>
              {wire([[60, 160], [120, 160], [120, 196], [170, 196]], MANIM.blue)}
              {wire([[60, 260], [120, 260], [120, 224], [170, 224]], MANIM.orange)}
              <Gate kind="nand" x={200} y={210} color={MANIM.blue} />
              {wire([[246, 210], [300, 210]], MANIM.muted)}
              {wire([[300, 196], [300, 224]], MANIM.muted)}
              {wire([[300, 196], [350, 196]], MANIM.muted)}
              {wire([[300, 224], [350, 224]], MANIM.muted)}
              <Gate kind="nand" x={380} y={210} color={MANIM.blue} />
              {wire([[426, 210], [520, 210]], MANIM.green)}
              <Txt x={48} y={166} size={20} color={MANIM.blue} anchor="end">
                a
              </Txt>
              <Txt x={48} y={266} size={20} color={MANIM.orange} anchor="end">
                b
              </Txt>
              <Txt x={540} y={216} size={22} color={MANIM.green} anchor="start">
                S = a·b
              </Txt>
              <Txt x={400} y={330} size={20} color={MANIM.muted}>
                NAND + NAND (inversor)
              </Txt>
            </g>
          ) : null}
          {beat === 2 ? (
            <g>
              {wire([[60, 130], [100, 130]], MANIM.blue)}
              {wire([[100, 116], [100, 144]], MANIM.blue)}
              {wire([[100, 116], [140, 116]], MANIM.blue)}
              {wire([[100, 144], [140, 144]], MANIM.blue)}
              <Gate kind="nand" x={170} y={130} color={MANIM.blue} />
              {wire([[216, 130], [260, 130], [260, 196], [310, 196]], MANIM.blue)}
              {wire([[60, 290], [100, 290]], MANIM.orange)}
              {wire([[100, 276], [100, 304]], MANIM.orange)}
              {wire([[100, 276], [140, 276]], MANIM.orange)}
              {wire([[100, 304], [140, 304]], MANIM.orange)}
              <Gate kind="nand" x={170} y={290} color={MANIM.orange} />
              {wire([[216, 290], [260, 290], [260, 224], [310, 224]], MANIM.orange)}
              <Gate kind="nand" x={340} y={210} color={MANIM.blue} />
              {wire([[386, 210], [480, 210]], MANIM.green)}
              <Txt x={48} y={136} size={20} color={MANIM.blue} anchor="end">
                a
              </Txt>
              <Txt x={48} y={296} size={20} color={MANIM.orange} anchor="end">
                b
              </Txt>
              <Txt x={500} y={216} size={22} color={MANIM.green} anchor="start">
                S = a + b
              </Txt>
              <Txt x={400} y={370} size={20} color={MANIM.muted}>
                Cada entrada se invierte con una NAND de entradas unidas
              </Txt>
            </g>
          ) : null}
          {beat === 3 ? (
            <g>
              <Txt x={400} y={52} size={24} color={MANIM.yellow} mono>
                S = c + b·ā + b̄·a
              </Txt>
              <Lines
                x={70}
                y={110}
                size={20}
                gap={40}
                items={[
                  { t: "1. Doble negación: S = ¬¬(c + b·ā + b̄·a)", c: MANIM.ink },
                  { t: "2. Morgan: S = ¬( c̄ · ¬(b·ā) · ¬(b̄·a) )", c: MANIM.blue },
                  { t: "3. Cada ¬(producto) es una NAND", c: MANIM.green },
                  { t: "4. c̄ se obtiene con una NAND de entradas unidas", c: MANIM.orange },
                  { t: "5. La salida es una NAND de tres entradas", c: MANIM.purple },
                ]}
              />
            </g>
          ) : null}
        </Canvas>
      );
    },
  };
}

/* ───────────── 12. Multiplexor, decodificador y comparador ───────────── */

export function buildMuxDecoder(): AnimBuild {
  const D = [0, 1, 1, 0];
  const muxBox = (sel: number) => {
    const ys = [110, 160, 210, 260];
    return (
      <g>
        <polygon points="300,90 440,130 440,250 300,290" fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={4} />
        <Txt x={370} y={196} size={19} color={MANIM.muted}>
          MUX
        </Txt>
        {ys.map((y, i) => (
          <g key={i}>
            {wire([[210, y], [300, y]], i === sel ? MANIM.yellow : MANIM.muted, i === sel ? 5 : 3)}
            <Txt x={190} y={y + 6} size={18} color={i === sel ? MANIM.yellow : MANIM.muted} anchor="end">
              D{i} = {D[i]}
            </Txt>
          </g>
        ))}
        {wire([[440, 190], [560, 190]], D[sel] ? MANIM.green : MANIM.muted, 5)}
        <Txt x={600} y={196} size={22} color={D[sel] ? MANIM.green : MANIM.muted}>
          W = {D[sel]}
        </Txt>
        <Txt x={370} y={340} size={19} color={MANIM.orange}>
          selección BA = {sel.toString(2).padStart(2, "0")} → D{sel}
        </Txt>
        <line x1={340} y1={298} x2={340} y2={320} stroke={MANIM.orange} strokeWidth={3} />
        <line x1={400} y1={282} x2={400} y2={320} stroke={MANIM.orange} strokeWidth={3} />
      </g>
    );
  };
  return {
    label: "Multiplexor, decodificador y comparador: cajas negras combinacionales",
    beatMs: 5800,
    captions: [
      "El **multiplexor** canaliza una de sus $2^n$ entradas de datos hacia **una única salida**. Con selección $BA = 00$ la salida es $D_0$.",
      "Con la combinación $BA = 10$ (2 en binario) pasa $D_2$: el mismo circuito, otra entrada. El 74151 es un multiplexor de **8 canales**.",
      "El **decodificador** hace lo contrario: con $n$ entradas activa **una de $2^n$ salidas**, la del número binario que llega. Ahora llega 11 y se activa $Y_3$.",
      "El **comparador** (7485) recibe dos palabras de $n$ bits y activa una de tres salidas: $A > B$, $A = B$ o $A < B$.",
    ],
    render: (beat) => {
      if (beat <= 1) {
        return <Canvas>{muxBox(beat === 0 ? 0 : 2)}</Canvas>;
      }
      if (beat === 2) {
        return (
          <Canvas>
            <rect x={250} y={80} width={150} height={240} rx={12} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={4} />
            <Txt x={325} y={205} size={19} color={MANIM.muted}>
              DEC
            </Txt>
            {wire([[150, 160], [250, 160]], MANIM.yellow, 5)}
            {wire([[150, 240], [250, 240]], MANIM.yellow, 5)}
            <Txt x={130} y={166} size={20} color={MANIM.yellow} anchor="end">
              B = 1
            </Txt>
            <Txt x={130} y={246} size={20} color={MANIM.yellow} anchor="end">
              A = 1
            </Txt>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                {wire([[400, 110 + i * 60], [470, 110 + i * 60]], i === 3 ? MANIM.green : MANIM.muted, i === 3 ? 5 : 3)}
                <Lamp x={500} y={110 + i * 60} on={i === 3} color={MANIM.green} r={14} />
                <Txt x={535} y={116 + i * 60} size={19} color={i === 3 ? MANIM.green : MANIM.muted} anchor="start">
                  Y{i}
                </Txt>
              </g>
            ))}
          </Canvas>
        );
      }
      return (
        <Canvas>
          <rect x={270} y={80} width={150} height={240} rx={12} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={4} />
          <Txt x={345} y={205} size={19} color={MANIM.muted}>
            COMP
          </Txt>
          {wire([[150, 140], [270, 140]], MANIM.blue, 5)}
          {wire([[150, 260], [270, 260]], MANIM.orange, 5)}
          <Txt x={130} y={134} size={19} color={MANIM.blue} anchor="end">
            A = 1001
          </Txt>
          <Txt x={130} y={266} size={19} color={MANIM.orange} anchor="end">
            B = 0110
          </Txt>
          {[
            { t: "A > B", on: true },
            { t: "A = B", on: false },
            { t: "A < B", on: false },
          ].map((o, i) => (
            <g key={o.t}>
              {wire([[420, 130 + i * 60], [480, 130 + i * 60]], o.on ? MANIM.green : MANIM.muted, o.on ? 5 : 3)}
              <Lamp x={505} y={130 + i * 60} on={o.on} color={MANIM.green} r={14} />
              <Txt x={540} y={136 + i * 60} size={19} color={o.on ? MANIM.green : MANIM.muted} anchor="start">
                {o.t}
              </Txt>
            </g>
          ))}
        </Canvas>
      );
    },
  };
}

/* ───────────── 13. Suma binaria columna a columna ───────────── */

export function buildSumadorBinario(): AnimBuild {
  const A = [0, 1, 0, 1, 1]; // 2⁴..2⁰ → 01011 = 11
  const B = [0, 0, 1, 1, 0]; // 00110 = 6
  const carry = [1, 1, 1, 0, 0]; // acarreo escrito sobre cada columna (el que produce la columna de su derecha)
  const result = [1, 0, 0, 0, 1];
  const X = (col: number) => 330 + col * 86;
  return {
    label: "Suma binaria 1011 + 0110 con acarreos",
    beatMs: 6000,
    captions: [
      "Se suman $1011_{(2)} = 11$ y $0110_{(2)} = 6$ como en decimal, **de derecha a izquierda**, con la tabla $0+0=0$, $0+1=1$, $1+1=10$ (se escribe 0 y **se lleva 1**).",
      "Columna $2^0$: $1 + 0 = 1$. No hay acarreo.",
      "Columna $2^1$: $1 + 1 = 10$. Se escribe **0** y se lleva **1** a la columna siguiente.",
      "Columna $2^2$: $0 + 1 + 1$ (acarreo) $= 10$. Se escribe 0 y se lleva 1.",
      "Columna $2^3$: $1 + 0 + 1 = 10$. Se escribe 0 y el acarreo **1** pasa al quinto bit: resultado $10001_{(2)} = 17$. Cada columna es un **sumador completo**.",
    ],
    render: (beat) => {
      const cols = [4, 3, 2, 1]; // índices de columna (derecha a izquierda): 2⁰ en col 4
      const active = beat >= 1 && beat <= 4 ? cols[beat - 1]! : -1;
      return (
        <Canvas>
          {["2⁴", "2³", "2²", "2¹", "2⁰"].map((h, c) => (
            <Txt key={h} x={X(c)} y={52} size={19} color={MANIM.muted}>
              {h}
            </Txt>
          ))}
          {active >= 0 ? <rect x={X(active) - 38} y={70} width={76} height={296} rx={12} fill={MANIM.yellow} fillOpacity={0.14} stroke={MANIM.yellow} strokeWidth={3} /> : null}
          <Txt x={200} y={120} size={20} color={MANIM.red} anchor="end">
            acarreo
          </Txt>
          {carry.map((c, col) => {
            // el acarreo que entra en la columna `col` lo produce la columna de su derecha, en el beat 4 − col
            return (
              <Fade key={col} show={beat >= 4 - col && c === 1}>
                <Txt x={X(col)} y={122} size={26} color={MANIM.red} mono>
                  1
                </Txt>
              </Fade>
            );
          })}
          <Txt x={200} y={196} size={22} color={MANIM.blue} anchor="end">
            A
          </Txt>
          <Txt x={200} y={256} size={22} color={MANIM.orange} anchor="end">
            + B
          </Txt>
          {A.map((a, c) => (
            <Txt key={`a${c}`} x={X(c)} y={198} size={32} color={MANIM.blue} mono>
              {a}
            </Txt>
          ))}
          {B.map((b, c) => (
            <Txt key={`b${c}`} x={X(c)} y={258} size={32} color={MANIM.orange} mono>
              {b}
            </Txt>
          ))}
          <line x1={240} y1={276} x2={X(4) + 40} y2={276} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={200} y={330} size={22} color={MANIM.green} anchor="end">
            S
          </Txt>
          {result.map((r, c) => {
            const col = 4 - c; // posición desde la derecha
            const showAt = col + 1; // 2⁰ aparece en beat 1
            const visible = c === 0 ? beat >= 4 : beat >= showAt;
            return (
              <Fade key={`s${c}`} show={visible} dy={-8}>
                <Txt x={X(c)} y={332} size={34} color={MANIM.green} mono>
                  {r}
                </Txt>
              </Fade>
            );
          })}
          <Txt x={700} y={332} size={18} color={MANIM.muted} anchor="start">
            {beat >= 4 ? "= 17" : ""}
          </Txt>
        </Canvas>
      );
    },
  };
}
