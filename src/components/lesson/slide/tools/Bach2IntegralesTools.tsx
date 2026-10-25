"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { FnPlot } from "@/components/lesson/slide/tools/Bach1FuncTools";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const sg = (x: number) => String(x).replace("-", "−");
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
/** Fracción irreducible en texto: 4/3, −5, 1/2. */
const frac = (n: number, d: number) => {
  const k = gcd(n, d) || 1;
  const [p, q] = [n / k, d / k];
  const [pp, qq] = q < 0 ? [-p, -q] : [p, q];
  return qq === 1 ? sg(pp) : `${sg(pp)}/${qq}`;
};
/** Coeficiente fraccionario + potencia: "(1/3)x³". */
const term = (n: number, d: number, pot: string) => {
  if (n === 0) return "";
  const c = frac(n, d);
  const body = c === "1" ? pot || "1" : c === "−1" ? `−${pot || "1"}` : c.includes("/") ? `${c.startsWith("−") ? "−" : ""}(${c.replace("−", "")})${pot}` : `${c}${pot}`;
  return body;
};
const join = (ts: string[]) => {
  const t = ts.filter(Boolean);
  if (t.length === 0) return "0";
  return t.map((s, i) => (i === 0 ? s : s.startsWith("−") ? ` − ${s.slice(1)}` : ` + ${s}`)).join("");
};

/** `initial`: [a, b, c (−3 a 3), C (−5 a 5)]. f(x) = ax² + bx + c; F(x) = (a/3)x³ + (b/2)x² + cx + C. */
export function IntegralPolinomioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 3, -3, 3), b: int(ini[1], 0, -3, 3), c: int(ini[2], 1, -3, 3), C: int(ini[3], 0, -5, 5) };
  const [v, setV] = useState(init);
  const fx = (x: number) => v.a * x * x + v.b * x + v.c;
  const Fx = (x: number) => (v.a * x ** 3) / 3 + (v.b * x * x) / 2 + v.c * x + v.C;
  const ftxt = join([term(v.a, 1, "x²"), term(v.b, 1, "x"), v.c === 0 ? "" : sg(v.c)]);
  const Ftxt = join([term(v.a, 3, "x³"), term(v.b, 2, "x²"), term(v.c, 1, "x"), v.C === 0 ? "" : sg(v.C)]);
  return (
    <Frame
      hint={block.hint ?? "Cambia los coeficientes de f y la constante C: la primitiva F siempre tiene a f como derivada, y C solo la sube o la baja."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a (coef. de x²)" value={v.a} min={-3} max={3} color={MANIM.blue} format={sg} onChange={(a) => setV((s) => ({ ...s, a }))} />
          <Slider label="b (coef. de x)" value={v.b} min={-3} max={3} color={MANIM.green} format={sg} onChange={(b) => setV((s) => ({ ...s, b }))} />
          <Slider label="c (término independiente)" value={v.c} min={-3} max={3} color={MANIM.orange} format={sg} onChange={(c) => setV((s) => ({ ...s, c }))} />
          <Slider label="C (constante de integración)" value={v.C} min={-5} max={5} color={MANIM.purple} format={sg} onChange={(C) => setV((s) => ({ ...s, C }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="f(x)" plain><span data-testid="tool-ip-f">{ftxt}</span></Stat>
        <Stat color={MANIM.yellow} label="F(x) = ∫ f(x) dx" plain><span data-testid="tool-ip-F">{Ftxt}</span></Stat>
      </Readout>
      <FnPlot
        testId="tool-ip-grafica"
        curves={[{ fn: fx, color: MANIM.blue }, { fn: Fx, color: MANIM.yellow }]}
        xr={[-3, 3]}
        yr={[-12, 12]}
      />
    </Frame>
  );
}

type Fun = { label: string; f: (x: number) => number; a: number; b: number; exacto: number; exTxt: string; ymax: number };
const RIEMANN: Fun[] = [
  { label: "x² en [0, 3]", f: (x) => x * x, a: 0, b: 3, exacto: 9, exTxt: "9", ymax: 10 },
  { label: "sen x en [0, π]", f: Math.sin, a: 0, b: Math.PI, exacto: 2, exTxt: "2", ymax: 1.2 },
  { label: "√x en [0, 4]", f: Math.sqrt, a: 0, b: 4, exacto: 16 / 3, exTxt: "16/3", ymax: 2.4 },
  { label: "1/x en [1, 3]", f: (x) => 1 / x, a: 1, b: 3, exacto: Math.log(3), exTxt: "ln 3", ymax: 1.2 },
];
const METODOS = [{ value: 0, label: "Izquierda" }, { value: 1, label: "Derecha" }, { value: 2, label: "Punto medio" }] as const;

/** `initial`: [función (0–3), n rectángulos (1–60), método (0 izq, 1 der, 2 medio)]. Sumas de Riemann. */
export function RiemannExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, RIEMANN.length - 1), n: int(ini[1], 6, 1, 60), m: int(ini[2], 0, 0, 2) };
  const [v, setV] = useState(init);
  const F = RIEMANN[v.i]!;
  const d = (F.b - F.a) / v.n;
  const alto = (k: number) => F.f(F.a + (k + (v.m === 0 ? 0 : v.m === 1 ? 1 : 0.5)) * d);
  let suma = 0;
  for (let k = 0; k < v.n; k++) suma += alto(k) * d;
  const W = 520;
  const H = 280;
  const px = (x: number) => 30 + ((x - F.a) / (F.b - F.a)) * (W - 60);
  const py = (y: number) => H - 24 - (y / F.ymax) * (H - 50);
  const curva = Array.from({ length: 121 }, (_, k) => {
    const x = F.a + ((F.b - F.a) * k) / 120;
    return `${px(x)},${py(F.f(x))}`;
  }).join(" ");
  return (
    <Frame
      hint={block.hint ?? "Más rectángulos, mejor aproximación: la suma se acerca al área exacta, que es la integral definida."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={RIEMANN.map((r, i) => ({ value: i, label: r.label }))} value={v.i} onChange={(i) => setV((s) => ({ ...s, i }))} />
          <Choice label="Altura de cada rectángulo" items={METODOS} value={v.m} onChange={(m) => setV((s) => ({ ...s, m }))} />
          <Slider label="Número de rectángulos" value={v.n} min={1} max={60} color={MANIM.orange} onChange={(n) => setV((s) => ({ ...s, n }))} />
        </>
      }
    >
      <Svg w={W} h={H} testId="tool-rm-grafica">
        <line x1={20} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.6} />
        {Array.from({ length: v.n }, (_, k) => (
          <rect key={k} x={px(F.a + k * d)} y={py(Math.max(alto(k), 0))} width={Math.max(px(F.a + d) - px(F.a), 0.5)} height={Math.abs(py(alto(k)) - py(0))} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={v.n > 25 ? 0.4 : 1.2} />
        ))}
        <polyline points={curva} fill="none" stroke={MANIM.blue} strokeWidth={3} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`Suma con ${v.n} rectángulos`} plain><span data-testid="tool-rm-suma">{fmtEs(suma, 4)}</span></Stat>
        <Stat color={MANIM.green} label="Integral exacta" plain><span data-testid="tool-rm-exacta">{`${F.exTxt} ≈ ${fmtEs(F.exacto, 4)}`}</span></Stat>
        <Stat color={MANIM.red} label="Error" plain><span data-testid="tool-rm-error">{fmtEs(Math.abs(suma - F.exacto), 4)}</span></Stat>
      </Readout>
    </Frame>
  );
}

/** Primitiva de x² − 4 multiplicada por 3: G(x) = x³ − 12x, con F = G/3. */
const G = (x: number) => x ** 3 - 12 * x;

/** `initial`: [a, b (−3 a 3)]. Regla de Barrow con f(x) = x² − 4, F(x) = x³/3 − 4x. */
export function BarrowExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], -3, -3, 3), b: int(ini[1], 3, -3, 3) };
  const [v, setV] = useState(init);
  const [lo, hi] = v.a <= v.b ? [v.a, v.b] : [v.b, v.a];
  const signo = v.a <= v.b ? 1 : -1;
  const numerador = signo * (G(hi) - G(lo));
  const f = (x: number) => x * x - 4;
  let geo = 0;
  const N = 600;
  for (let k = 0; k < N; k++) geo += Math.abs(f(lo + ((hi - lo) * (k + 0.5)) / N)) * ((hi - lo) / N);
  const W = 520;
  const H = 300;
  const xr: [number, number] = [-3.4, 3.4];
  const yr: [number, number] = [-5, 6];
  const px = (x: number) => 20 + ((x - xr[0]) / (xr[1] - xr[0])) * (W - 40);
  const py = (y: number) => H - 14 - ((y - yr[0]) / (yr[1] - yr[0])) * (H - 28);
  const trozos = Array.from({ length: 120 }, (_, k) => lo + ((hi - lo) * (k + 0.5)) / 120);
  const curva = Array.from({ length: 141 }, (_, k) => {
    const x = -3.4 + (6.8 * k) / 140;
    return `${px(x)},${py(f(x))}`;
  }).join(" ");
  return (
    <Frame
      hint={block.hint ?? "Barrow: ∫ de a a b de f = F(b) − F(a). Si f es negativa en el tramo, ese trozo resta; el área geométrica suma el valor absoluto de cada trozo."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Límite inferior a" value={v.a} min={-3} max={3} color={MANIM.blue} format={sg} onChange={(a) => setV((s) => ({ ...s, a }))} />
          <Slider label="Límite superior b" value={v.b} min={-3} max={3} color={MANIM.orange} format={sg} onChange={(b) => setV((s) => ({ ...s, b }))} />
        </>
      }
    >
      <Svg w={W} h={H} testId="tool-bw-grafica">
        <line x1={10} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.6} />
        <line x1={px(0)} y1={8} x2={px(0)} y2={H - 8} stroke={MANIM.ink} strokeWidth={1.6} />
        {trozos.map((x, k) => (
          <rect key={k} x={px(x - (hi - lo) / 240)} y={py(Math.max(f(x), 0))} width={Math.max(((hi - lo) / 120) * ((W - 40) / 6.8) + 0.6, 0)} height={Math.abs(py(f(x)) - py(0))} fill={f(x) >= 0 ? MANIM.green : MANIM.red} fillOpacity={0.45} />
        ))}
        <polyline points={curva} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <line x1={px(v.a)} y1={py(-5)} x2={px(v.a)} y2={py(5.5)} stroke={MANIM.blue} strokeWidth={1.4} strokeDasharray="5 5" />
        <line x1={px(v.b)} y1={py(-5)} x2={px(v.b)} y2={py(5.5)} stroke={MANIM.orange} strokeWidth={1.4} strokeDasharray="5 5" />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="∫ f(x) dx de a a b" plain><span data-testid="tool-bw-integral">{frac(numerador, 3)}</span></Stat>
        <Stat color={MANIM.green} label="Área geométrica" plain><span data-testid="tool-bw-area">{fmtEs(geo, 3)}</span></Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-bw-calculo">{`F(x) = x³/3 − 4x;  F(${sg(v.b)}) − F(${sg(v.a)}) = ${frac(G(v.b), 3)} − (${frac(G(v.a), 3)}) = ${frac(G(v.b) - G(v.a), 3)}`}</p>
    </Frame>
  );
}

/** `initial`: [m (1 a 5)]. Área entre y = mx e y = x²: m³/6. */
export function AreaCurvasExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { m: int(ini[0], 2, 1, 5) };
  const [v, setV] = useState(init);
  const W = 520;
  const H = 300;
  const xr: [number, number] = [-0.4, 5.4];
  const yr: [number, number] = [-1, 26];
  const px = (x: number) => 20 + ((x - xr[0]) / (xr[1] - xr[0])) * (W - 40);
  const py = (y: number) => H - 14 - ((y - yr[0]) / (yr[1] - yr[0])) * (H - 28);
  const xs = Array.from({ length: 61 }, (_, k) => (v.m * k) / 60);
  const region = [...xs.map((x) => `${px(x)},${py(v.m * x)}`), ...[...xs].reverse().map((x) => `${px(x)},${py(x * x)}`)].join(" ");
  const c1 = Array.from({ length: 101 }, (_, k) => { const x = (5.2 * k) / 100; return `${px(x)},${py(x * x)}`; }).filter((_, k) => k < 101 && ((5.2 * k) / 100) ** 2 <= 25).join(" ");
  return (
    <Frame
      hint={block.hint ?? "Las curvas se cortan en x = 0 y x = m. El área entre ellas es la integral de (arriba − abajo) = ∫ (mx − x²) dx = m³/6."}
      onReset={() => setV(init)}
      controls={<Slider label="Pendiente m de la recta y = m·x" value={v.m} min={1} max={5} color={MANIM.green} onChange={(m) => setV({ m })} />}
    >
      <Svg w={W} h={H} testId="tool-ac-grafica">
        <line x1={10} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.6} />
        <line x1={px(0)} y1={8} x2={px(0)} y2={H - 8} stroke={MANIM.ink} strokeWidth={1.6} />
        <polygon points={region} fill={MANIM.yellow} fillOpacity={0.35} />
        <polyline points={c1} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <line x1={px(0)} y1={py(0)} x2={px(5.2)} y2={py(5.2 * v.m)} stroke={MANIM.green} strokeWidth={3} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`Área entre y = ${v.m}x e y = x²`} plain><span data-testid="tool-ac-area">{frac(v.m ** 3, 6)}</span></Stat>
        <Stat color={MANIM.muted} label="Valor decimal" plain><span data-testid="tool-ac-dec">{fmtEs(v.m ** 3 / 6, 3)}</span></Stat>
      </Readout>
    </Frame>
  );
}

type Perfil = { label: string; r: (x: number, b: number) => number; x0: (b: number) => number; x1: (b: number) => number; k: (b: number) => [number, number]; formula: string };
const PERFILES: Perfil[] = [
  { label: "Cono: y = x en [0, b]", r: (x) => x, x0: () => 0, x1: (b) => b, k: (b) => [b ** 3, 3], formula: "V = π b³ / 3" },
  { label: "Paraboloide: y = √x en [0, b]", r: (x) => Math.sqrt(x), x0: () => 0, x1: (b) => b, k: (b) => [b * b, 2], formula: "V = π b² / 2" },
  { label: "Esfera: y = √(b² − x²) en [−b, b]", r: (x, b) => Math.sqrt(Math.max(b * b - x * x, 0)), x0: (b) => -b, x1: (b) => b, k: (b) => [4 * b ** 3, 3], formula: "V = 4π b³ / 3" },
];

/** `initial`: [perfil (0 cono, 1 paraboloide, 2 esfera), b (1 a 5)]. Volumen por discos. */
export function VolumenRevolucionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { p: int(ini[0], 1, 0, PERFILES.length - 1), b: int(ini[1], 3, 1, 5) };
  const [v, setV] = useState(init);
  const P = PERFILES[v.p]!;
  const [n, d] = P.k(v.b);
  const W = 520;
  const H = 280;
  const x0 = P.x0(v.b);
  const x1 = P.x1(v.b);
  const rmax = Math.max(...Array.from({ length: 41 }, (_, k) => P.r(x0 + ((x1 - x0) * k) / 40, v.b)));
  const esc = Math.min((W - 60) / (x1 - x0 + 1e-9), (H / 2 - 20) / (rmax + 1e-9));
  const cx0 = (W - (x1 - x0) * esc) / 2;
  const px = (x: number) => cx0 + (x - x0) * esc;
  const py = (y: number) => H / 2 - y * esc;
  const pts = Array.from({ length: 81 }, (_, k) => x0 + ((x1 - x0) * k) / 80);
  const arriba = pts.map((x) => `${px(x)},${py(P.r(x, v.b))}`).join(" ");
  const abajo = pts.map((x) => `${px(x)},${py(-P.r(x, v.b))}`).join(" ");
  const discos = Array.from({ length: 9 }, (_, k) => x0 + ((x1 - x0) * (k + 0.5)) / 9);
  return (
    <Frame
      hint={block.hint ?? "El sólido se corta en discos de radio f(x) y grosor dx: V = π ∫ [f(x)]² dx. Cambia el perfil y el valor de b."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Perfil que gira alrededor del eje X" items={PERFILES.map((q, i) => ({ value: i, label: q.label }))} value={v.p} onChange={(p) => setV((s) => ({ ...s, p }))} />
          <Slider label="b" value={v.b} min={1} max={5} color={MANIM.orange} onChange={(b) => setV((s) => ({ ...s, b }))} />
        </>
      }
    >
      <Svg w={W} h={H} testId="tool-vr-grafica">
        <line x1={10} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.6} />
        {discos.map((x, k) => (
          <ellipse key={k} cx={px(x)} cy={py(0)} rx={Math.max(((x1 - x0) / 18) * esc * 0.5, 2)} ry={Math.max(P.r(x, v.b) * esc, 0.5)} fill={MANIM.yellow} fillOpacity={0.18} stroke={MANIM.yellow} strokeWidth={1.4} />
        ))}
        <polyline points={arriba} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <polyline points={abajo} fill="none" stroke={MANIM.blue} strokeWidth={3} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={P.formula} plain><span data-testid="tool-vr-volumen">{`${frac(n, d)}·π`}</span></Stat>
        <Stat color={MANIM.green} label="Volumen (u³)" plain><span data-testid="tool-vr-dec">{fmtEs((Math.PI * n) / d, 2)}</span></Stat>
      </Readout>
    </Frame>
  );
}

type Metodo = {
  label: string;
  f: (x: number) => number;
  F: (x: number) => number;
  /** Texto de la primitiva y pasos mostrados uno a uno. */
  Ftxt: string;
  pasos: string[];
  x0: number;
  xr: [number, number];
  yr: [number, number];
  ok?: (x: number) => boolean;
};

const METODOS_INT: Metodo[] = [
  { label: "∫ x⁵ dx", f: (x) => x ** 5, F: (x) => x ** 6 / 6, Ftxt: "x⁶/6 + C", pasos: ["Potencia con n = 5.", "Se suma 1 al exponente: x⁶.", "Se divide entre el nuevo exponente: x⁶/6."], x0: 1, xr: [-2, 2], yr: [-8, 8] },
  { label: "∫ ∛x dx", f: Math.cbrt, F: (x) => 0.75 * Math.cbrt(x) ** 4, Ftxt: "(3/4)·x^(4/3) + C", pasos: ["Se escribe como potencia: ∛x = x^(1/3).", "Se suma 1 al exponente: 1/3 + 1 = 4/3.", "Se divide entre 4/3, o se multiplica por 3/4."], x0: 8, xr: [-8, 8], yr: [-6, 8] },
  { label: "∫ 1/x³ dx", f: (x) => x ** -3, F: (x) => -1 / (2 * x * x), Ftxt: "−1/(2x²) + C", pasos: ["Se escribe como potencia: 1/x³ = x⁻³.", "Se suma 1 al exponente: −3 + 1 = −2.", "Se divide entre −2: −x⁻²/2 = −1/(2x²)."], x0: 1, xr: [0.4, 3], yr: [-4, 4], ok: (x) => x > 0 },
  { label: "∫ (3eˣ − 2 sen x) dx", f: (x) => 3 * Math.exp(x) - 2 * Math.sin(x), F: (x) => 3 * Math.exp(x) + 2 * Math.cos(x), Ftxt: "3eˣ + 2cos x + C", pasos: ["La integral de una suma es la suma de las integrales.", "∫ 3eˣ dx = 3eˣ.", "∫ −2 sen x dx = −2·(−cos x) = 2cos x."], x0: 0, xr: [-3, 2], yr: [-6, 14] },
  { label: "∫ x(x²+2)⁵ dx", f: (x) => x * (x * x + 2) ** 5, F: (x) => (x * x + 2) ** 6 / 12, Ftxt: "(x²+2)⁶/12 + C", pasos: ["La derivada de x² + 2 es 2x: falta un 2.", "Se multiplica y divide entre 2: ½∫(x²+2)⁵·2x dx.", "Potencia de f con f′: ½·(x²+2)⁶/6 = (x²+2)⁶/12."], x0: 1, xr: [-1.6, 1.6], yr: [-60, 400] },
  { label: "∫ x√(x+1) dx", f: (x) => x * Math.sqrt(x + 1), F: (x) => 0.4 * (x + 1) ** 2.5 - (2 / 3) * (x + 1) ** 1.5, Ftxt: "(2/5)(x+1)^(5/2) − (2/3)(x+1)^(3/2) + C", pasos: ["Cambio u = x + 1, así x = u − 1 y dx = du.", "∫ (u − 1)√u du = ∫ (u^(3/2) − u^(1/2)) du.", "= (2/5)u^(5/2) − (2/3)u^(3/2); se deshace el cambio."], x0: 3, xr: [-1, 4], yr: [-2, 12], ok: (x) => x >= -1 },
  { label: "∫ x·eˣ dx", f: (x) => x * Math.exp(x), F: (x) => (x - 1) * Math.exp(x), Ftxt: "(x − 1)·eˣ + C", pasos: ["Por partes: u = x, dv = eˣ dx, du = dx, v = eˣ.", "∫ u dv = u·v − ∫ v du = x·eˣ − ∫ eˣ dx.", "= x·eˣ − eˣ = (x − 1)·eˣ."], x0: 1, xr: [-3, 2], yr: [-3, 8] },
  { label: "∫ (3x+5)/((x−1)(x+3)) dx", f: (x) => (3 * x + 5) / ((x - 1) * (x + 3)), F: (x) => 2 * Math.log(Math.abs(x - 1)) + Math.log(Math.abs(x + 3)), Ftxt: "2·ln|x−1| + ln|x+3| + C", pasos: ["Descomposición: A/(x−1) + B/(x+3).", "Sustituyendo x = 1 se obtiene A = 2; con x = −3, B = 1.", "∫ 2/(x−1) dx + ∫ 1/(x+3) dx = 2 ln|x−1| + ln|x+3|."], x0: 2, xr: [1.1, 5], yr: [-4, 4], ok: (x) => x > 1 },
  { label: "∫ ln x dx", f: Math.log, F: (x) => x * Math.log(x) - x, Ftxt: "x·ln x − x + C", pasos: ["Por partes: u = ln x, dv = dx, du = dx/x, v = x.", "∫ ln x dx = x·ln x − ∫ x·(1/x) dx.", "= x·ln x − x."], x0: 2, xr: [0.2, 5], yr: [-3, 5], ok: (x) => x > 0 },
];

/** `initial`: [integral (0–8), pasos mostrados (0–3)]. Cada método paso a paso y comprobación F′ = f. */
export function IntegralMetodosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, METODOS_INT.length - 1), k: int(ini[1], 3, 0, 3) };
  const [v, setV] = useState(init);
  const [t, setT] = useState(0);
  const M = METODOS_INT[v.i]!;
  const x = clamp(M.x0 + t, M.xr[0] + 0.05, M.xr[1] - 0.05);
  const h = 1e-5;
  const dF = (M.F(x + h) - M.F(x - h)) / (2 * h);
  return (
    <Frame
      hint={block.hint ?? "Avanza paso a paso en cada integral y comprueba el resultado: la derivada de la primitiva debe coincidir con la función inicial en cualquier punto."}
      onReset={() => { setV(init); setT(0); }}
      controls={
        <>
          <Choice label="Integral" items={METODOS_INT.map((m, i) => ({ value: i, label: m.label }))} value={v.i} onChange={(i) => { setV((s) => ({ ...s, i })); setT(0); }} />
          <Slider label="Pasos mostrados" value={v.k} min={0} max={3} color={MANIM.orange} onChange={(k) => setV((s) => ({ ...s, k }))} />
          <Slider label="Desplaza el punto de comprobación" value={Math.round(t * 10)} min={-10} max={10} color={MANIM.blue} format={(n) => String(n / 10).replace(".", ",").replace("-", "−")} onChange={(n) => setT(n / 10)} />
        </>
      }
    >
      <ol className="list-decimal pl-5 text-base text-[color:var(--stage-ink,#fff)]" data-testid="tool-im-pasos">
        {M.pasos.slice(0, v.k).map((p, i) => <li key={i}>{p}</li>)}
      </ol>
      <Readout>
        <Stat color={MANIM.yellow} label="F(x)" plain><span data-testid="tool-im-F">{v.k === 3 ? M.Ftxt : "…"}</span></Stat>
        <Stat color={MANIM.blue} label={`f(${fmtEs(x, 2)})`} plain><span data-testid="tool-im-f">{fmtEs(M.f(x), 4)}</span></Stat>
        <Stat color={MANIM.green} label={`F′(${fmtEs(x, 2)})`} plain><span data-testid="tool-im-dF">{fmtEs(dF, 4)}</span></Stat>
      </Readout>
      <FnPlot
        testId="tool-im-grafica"
        curves={[{ fn: M.f, color: MANIM.blue, ok: M.ok }, { fn: M.F, color: MANIM.yellow, ok: M.ok }]}
        xr={M.xr}
        yr={M.yr}
        marks={[{ x, y: M.f(x), color: MANIM.blue }, { x, y: M.F(x), color: MANIM.yellow }]}
      />
    </Frame>
  );
}
