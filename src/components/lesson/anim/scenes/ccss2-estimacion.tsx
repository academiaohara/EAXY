import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import { densidadN } from "@/components/lesson/anim/distrib1b";

const dec = (x: number, d = 2) => x.toFixed(d).replace(".", "{,}");

/** Población de 60 individuos, muestra de 10 y paso de la muestra a la población. */
export function buildPoblacionMuestra(): AnimBuild {
  const cols = 10;
  const pos = (i: number) => ({ x: 130 + (i % cols) * 54, y: 90 + Math.floor(i / cols) * 54 });
  const muestra = new Set([3, 11, 17, 22, 28, 34, 39, 45, 51, 58]);
  return {
    label: "Población y muestra",
    captions: [
      "La **población** es el conjunto de todos los individuos que se estudian ($60$ en el dibujo). Sus valores característicos, como la media $\\mu$, son **parámetros**: casi siempre desconocidos.",
      "Como estudiar a todos es caro o imposible, se selecciona una **muestra** de $n = 10$ individuos. Los valores calculados con ella, como la media muestral $\\bar{x}$, son **estadísticos**.",
      "La **inferencia estadística** usa el estadístico para estimar el parámetro, siempre con cierta incertidumbre. Si se estudiara a todos, sería un **censo**.",
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        {Array.from({ length: 60 }, (_, i) => {
          const { x, y } = pos(i);
          const enMuestra = muestra.has(i);
          const marcado = beat >= 1 && enMuestra;
          return <circle key={i} cx={x} cy={y} r={marcado ? 15 : 12} fill={marcado ? MANIM.yellow : MANIM.blue} fillOpacity={marcado ? 1 : beat >= 1 ? 0.35 : 0.8} />;
        })}
        <Txt x={400} y={30} size={24} color={MANIM.blue}>Población: μ = parámetro</Txt>
        <Fade show={beat >= 1}>
          <Txt x={400} y={405} size={24} color={MANIM.yellow}>Muestra n = 10: x̄ = estadístico</Txt>
        </Fade>
        <Fade show={beat === 2}>
          <path d="M 650 360 C 700 260 700 160 660 100" fill="none" stroke={MANIM.green} strokeWidth={3} strokeDasharray="8 6" />
          <Txt x={680} y={235} size={22} color={MANIM.green} anchor="start">estimar μ</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Cuatro tipos de muestreo aleatorio sobre una población de 40 individuos (cuadrícula 4 × 10). */
export function buildTiposMuestreo(): AnimBuild {
  const cols = 10;
  const pos = (i: number) => ({ x: 120 + (i % cols) * 60, y: 90 + Math.floor(i / cols) * 70, fila: Math.floor(i / cols), col: i % cols });
  const sets: number[][] = [
    [1, 7, 12, 18, 23, 26, 33, 38],
    [2, 7, 12, 17, 22, 27, 32, 37],
    [3, 8, 14, 16, 22, 29, 31, 35],
    [4, 5, 14, 15, 24, 25, 34, 35],
  ];
  const nombres = ["Muestreo aleatorio simple", "Muestreo sistemático (cada 5.º)", "Muestreo estratificado (2 por estrato)", "Muestreo por conglomerados"];
  const colores = [MANIM.yellow, MANIM.green, MANIM.orange, MANIM.red];
  return {
    label: "Tipos de muestreo aleatorio",
    captions: [
      "**Aleatorio simple:** todos los individuos tienen la misma probabilidad de entrar en la muestra (por ejemplo, sorteando números).",
      "**Sistemático:** se ordena la población, se elige un punto de partida al azar y se toma uno de cada $k$ (aquí $k = 5$).",
      "**Estratificado:** se divide en grupos homogéneos (**estratos**, una fila) y se toma una muestra aleatoria simple en cada uno; si es proporcional al tamaño del estrato, mejor.",
      "**Por conglomerados:** se divide en grupos que reproducen a la población (columnas contiguas) y se estudian por completo uno o varios elegidos al azar.",
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        {Array.from({ length: 40 }, (_, i) => {
          const p = pos(i);
          const dentro = sets[beat]!.includes(i);
          return <circle key={i} cx={p.x} cy={p.y} r={dentro ? 17 : 11} fill={dentro ? colores[beat] : MANIM.blue} fillOpacity={dentro ? 1 : 0.4} />;
        })}
        {beat === 2 && [0, 1, 2, 3].map((f) => <rect key={f} x={95} y={90 + f * 70 - 30} width={595} height={58} fill="none" stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="6 5" rx={10} />)}
        {beat === 3 && [0, 1, 2, 3, 4].map((c) => <rect key={c} x={90 + c * 120} y={52} width={120} height={270} fill="none" stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="6 5" rx={10} />)}
        <Txt x={400} y={385} size={26} color={colores[beat]}>{nombres[beat]!}</Txt>
      </Canvas>
    ),
  };
}

const pmfSuma = (n: number) => {
  let p = [1];
  for (let k = 0; k < n; k++) {
    const q = new Array(p.length + 5).fill(0);
    p.forEach((v, i) => { for (let c = 1; c <= 6; c++) q[i + c - 1] += v / 6; });
    p = q;
  }
  return p; // p[s] = P(suma = s + n)
};

/** Teorema central del límite: la media de n dados tiende a una normal de media 3,5 y desviación típica 1,708/√n. */
export function buildTclMedias(): AnimBuild {
  const ns = [1, 2, 4, 10];
  const area: PlotArea = { left: 90, bottom: 340, ux: 120, uy: 1, xMin: 0.5, yMin: 0 };
  const sigma = Math.sqrt(35 / 12);
  return {
    label: "Teorema central del límite",
    captions: ns.map((n) =>
      n === 1
        ? "Un dado equilibrado: $\\mu = 3{,}5$ y $\\sigma \\approx 1{,}71$. La distribución es **uniforme**, nada parecida a una campana."
        : `Media de $n = ${n}$ dados: media $3{,}5$ y desviación típica $\\dfrac{\\sigma}{\\sqrt{n}} \\approx ${dec(sigma / Math.sqrt(n), 3)}$. ${n === 10 ? "Ya es casi una **normal**: es el teorema central del límite." : "La forma empieza a parecerse a una campana."}`,
    ),
    beatMs: 5600,
    render: (beat) => {
      const n = ns[beat]!;
      const pmf = pmfSuma(n);
      const maxP = Math.max(...pmf);
      const hMax = 240;
      const esc = hMax / (n === 1 ? maxP * 1.25 : maxP * 1.2);
      const sd = sigma / Math.sqrt(n);
      const bw = Math.min(30, (area.ux / n) * 0.8);
      const curva = Array.from({ length: 101 }, (_, i) => {
        const x = 0.8 + (i / 100) * 5.4;
        return [x, (densidadN(x, 3.5, sd) / n) * esc] as [number, number];
      });
      return (
        <Canvas>
          <line x1={mapX(area, 0.6)} y1={area.bottom} x2={mapX(area, 6.4)} y2={area.bottom} stroke={MANIM.ink} strokeWidth={2} />
          {[1, 2, 3, 4, 5, 6].map((x) => <Txt key={x} x={mapX(area, x)} y={area.bottom + 28} size={18} color={MANIM.muted}>{String(x)}</Txt>)}
          {pmf.map((p, s) => {
            const m = (s + n) / n;
            return <rect key={s} x={mapX(area, m) - bw / 2} y={area.bottom - p * esc} width={bw} height={p * esc} fill={MANIM.blue} fillOpacity={0.7} />;
          })}
          <Fade show={beat >= 1}>
            <polyline points={curva.map(([x, y]) => `${mapX(area, x)},${area.bottom - y}`).join(" ")} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} />
          </Fade>
          <Txt x={640} y={80} size={24} color={MANIM.ink}>{`n = ${n}`}</Txt>
          <Txt x={640} y={116} size={20} color={MANIM.muted}>{`σ/√n ≈ ${dec(sd, 3).replace("{,}", ",")}`}</Txt>
        </Canvas>
      );
    },
  };
}

/** Contraste de hipótesis sobre la media: H₀: μ = 2, σ = 0,4, n = 100 (σ/√n = 0,04), x̄ = 1,8. */
export function buildContrasteRegion(): AnimBuild {
  const area: PlotArea = { left: 60, bottom: 330, ux: 1400, uy: 22, xMin: 1.78, yMin: 0 };
  const mu = 2;
  const sd = 0.04;
  const curve = (a: number, b: number) => {
    const xs = Array.from({ length: 81 }, (_, i) => a + ((b - a) * i) / 80);
    return xs.map((x) => `${mapX(area, x)},${mapY(area, densidadN(x, mu, sd) / 1)}`).join(" ");
  };
  const zona = (a: number, b: number) => `${mapX(area, a)},${mapY(area, 0)} ${curve(a, b)} ${mapX(area, b)},${mapY(area, 0)}`;
  const lo = mu - 1.96 * sd;
  const hi = mu + 1.96 * sd;
  const xbar = 1.8;
  return {
    label: "Contraste de hipótesis: zona de aceptación",
    captions: [
      "Hipótesis nula $H_0: \\mu = 2$ frente a $H_1: \\mu \\neq 2$. Si $H_0$ fuera cierta, la media muestral con $n = 100$ y $\\sigma = 0{,}4$ seguiría $N(2;\\ 0{,}04)$.",
      "Con un nivel de significación $\\alpha = 0{,}05$, la **zona de aceptación** es $\\mu_0 \\pm 1{,}96\\,\\dfrac{\\sigma}{\\sqrt{n}} = (1{,}9216;\\ 2{,}0784)$. En las dos colas (**zona crítica**) queda el $5\\,\\%$.",
      "La muestra da $\\bar{x} = 1{,}8$, que cae en la zona crítica: **se rechaza $H_0$**. Con ese nivel de significación no se acepta que la media sea $2$.",
      "En un contraste **unilateral** ($H_0: \\mu \\geq 2$) toda la zona crítica está en una cola: se rechaza si $\\bar{x} < 2 - 1{,}645\\cdot 0{,}04 = 1{,}9342$. Como $1{,}8 < 1{,}9342$, también se rechaza.",
    ],
    beatMs: 6000,
    render: (beat) => (
      <Canvas>
        <line x1={mapX(area, 1.78)} y1={mapY(area, 0)} x2={mapX(area, 2.22)} y2={mapY(area, 0)} stroke={MANIM.ink} strokeWidth={2} />
        {[1.8, 1.9, 2, 2.1, 2.2].map((x) => <Txt key={x} x={mapX(area, x)} y={mapY(area, 0) + 28} size={18} color={MANIM.muted}>{String(x).replace(".", ",")}</Txt>)}
        <Fade show={beat === 1 || beat === 2}>
          <polygon points={zona(lo, hi)} fill={MANIM.green} fillOpacity={0.35} />
          <polygon points={zona(1.78, lo)} fill={MANIM.red} fillOpacity={0.5} />
          <polygon points={zona(hi, 2.22)} fill={MANIM.red} fillOpacity={0.5} />
        </Fade>
        <Fade show={beat === 3}>
          <polygon points={zona(mu - 1.645 * sd, 2.22)} fill={MANIM.green} fillOpacity={0.35} />
          <polygon points={zona(1.78, mu - 1.645 * sd)} fill={MANIM.red} fillOpacity={0.5} />
        </Fade>
        <polyline points={curve(1.78, 2.22)} fill="none" stroke={MANIM.blue} strokeWidth={4} />
        <Fade show={beat >= 2}>
          <line x1={mapX(area, xbar)} y1={mapY(area, 0)} x2={mapX(area, xbar)} y2={mapY(area, 4)} stroke={MANIM.yellow} strokeWidth={4} />
          <circle cx={mapX(area, xbar)} cy={mapY(area, 0)} r={8} fill={MANIM.yellow} />
          <Txt x={mapX(area, xbar)} y={mapY(area, 4.6)} size={22} color={MANIM.yellow}>x̄ = 1,8</Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={mapX(area, 2)} y={mapY(area, 11)} size={22} color={MANIM.green}>aceptación 95 %</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={640} y={60} size={26} color={MANIM.red}>Se rechaza H₀</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
