import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmtEs } from "@/components/lesson/anim/arith";
import { binomPmf, densidadN } from "@/components/lesson/anim/distrib1b";

const tx = (x: number, d = 2) => fmtEs(x, d).replace(",", "{,}").replace("−", "-");

/* ───────────── Cuantía de las caras en 3 monedas ───────────── */

const OUT3 = ["+++", "++C", "+C+", "C++", "+CC", "C+C", "CC+", "CCC"];
const caras = (s: string) => [...s].filter((c) => c === "C").length;

/** Tres monedas: de los 8 resultados a la función de cuantía y a la de distribución. */
export function buildCuantiaMonedas(): AnimBuild {
  const cols = [0, 1, 2, 3];
  const X = (x: number) => 130 + x * 180;
  const counts = [1, 3, 3, 1];
  const acc = [1 / 8, 4 / 8, 7 / 8, 1];
  return {
    label: "Variable aleatoria discreta: número de caras en 3 monedas",
    captions: [
      "Al lanzar tres monedas hay $8$ resultados equiprobables. La variable aleatoria $X$ asigna a cada uno el **número de caras**.",
      "Agrupamos los resultados según el valor de $X$: $0$ caras (1 resultado), $1$ (3), $2$ (3) y $3$ (1).",
      "La **función de cuantía** $p(x) = P(X = x)$ es la fracción de resultados de cada grupo: $\\tfrac18,\\ \\tfrac38,\\ \\tfrac38,\\ \\tfrac18$. Suman $1$.",
      "La **función de distribución** $F(x) = P(X \\leq x)$ acumula: $\\tfrac18,\\ \\tfrac48,\\ \\tfrac78,\\ 1$. Siempre es creciente y termina en $1$.",
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        {beat === 0
          ? OUT3.map((o, i) => (
              <Txt key={o} x={120 + (i % 4) * 190} y={150 + Math.floor(i / 4) * 90} size={40} color={MANIM.ink}>{o}</Txt>
            ))
          : cols.map((x) => {
              const grupo = OUT3.filter((o) => caras(o) === x);
              return (
                <g key={x}>
                  <Txt x={X(x)} y={50} size={26} color={MANIM.yellow}>{`X = ${x}`}</Txt>
                  {grupo.map((o, i) => (
                    <Txt key={o} x={X(x)} y={110 + i * 40} size={26} color={MANIM.ink}>{o}</Txt>
                  ))}
                  <Fade show={beat >= 2}>
                    <rect x={X(x) - 38} y={365 - counts[x]! * 36} width={76} height={counts[x]! * 36} fill={MANIM.blue} fillOpacity={0.8} />
                    <Txt x={X(x)} y={355 - counts[x]! * 36} size={24} color={MANIM.blue}>{["1/8", "3/8", "3/8", "1/8"][x]!}</Txt>
                  </Fade>
                  <Fade show={beat >= 3}>
                    <Txt x={X(x)} y={402} size={24} color={MANIM.green}>{`F = ${tx(acc[x]!, 3).replace("{,}", ",")}`}</Txt>
                  </Fade>
                </g>
              );
            })}
        {beat >= 2 ? <line x1={60} y1={365} x2={740} y2={365} stroke={MANIM.ink} strokeWidth={2} /> : null}
      </Canvas>
    ),
  };
}

/* ───────────── Esperanza: el juego de los dos dados ───────────── */

/** 36 jugadas: 25 pierden 10 €, 10 ganan 20 € y 1 gana 40 €. */
export function buildEsperanzaJuego(): AnimBuild {
  const cell = (i: number) => {
    const a = Math.floor(i / 6) + 1;
    const b = (i % 6) + 1;
    const cincos = (a === 5 ? 1 : 0) + (b === 5 ? 1 : 0);
    return cincos === 0 ? 0 : cincos === 1 ? 1 : 2;
  };
  const color = (k: number) => [MANIM.red, MANIM.green, MANIM.yellow][k]!;
  return {
    label: "Esperanza matemática de un juego con dos dados",
    captions: [
      "Se lanzan dos dados: por cada $5$ que salga se ganan $20$ €, y si no sale ninguno se pierden $10$ €. Las $36$ parejas son equiprobables.",
      "Resultados: ninguna $5$ en $25$ parejas (**−10 €**), un solo $5$ en $10$ parejas (**+20 €**) y dos $5$ en $1$ pareja (**+40 €**).",
      "La esperanza pondera cada ganancia por su probabilidad: $E(X) = -10\\cdot\\tfrac{25}{36} + 20\\cdot\\tfrac{10}{36} + 40\\cdot\\tfrac{1}{36}$.",
      "$E(X) = \\dfrac{-250 + 200 + 40}{36} = -\\dfrac{10}{36} \\approx -0{,}28$ €. Como es **negativa**, el juego es desventajoso: en $36$ jugadas se espera perder $10$ €.",
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        {Array.from({ length: 36 }, (_, i) => {
          const k = cell(i);
          const on = beat >= 1;
          return <rect key={i} x={70 + (i % 6) * 54} y={50 + Math.floor(i / 6) * 54} width={46} height={46} rx={6} fill={on ? color(k) : MANIM.panel} fillOpacity={on ? 0.85 : 1} stroke={MANIM.grid} strokeWidth={1.5} />;
        })}
        <Fade show={beat >= 1}>
          <Txt x={560} y={96} size={24} color={MANIM.red}>25 casos: −10 €</Txt>
          <Txt x={560} y={146} size={24} color={MANIM.green}>10 casos: +20 €</Txt>
          <Txt x={560} y={196} size={24} color={MANIM.yellow}>1 caso: +40 €</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={560} y={262} size={22} color={MANIM.ink}>E = Σ x · p(x)</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <rect x={470} y={286} width={260} height={64} rx={12} fill={MANIM.surface} stroke={MANIM.red} strokeWidth={3} />
          <Txt x={600} y={329} size={30} color={MANIM.red}>E = −10/36 € </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Binomial: de las barras a la campana ───────────── */

/** Histogramas de B(n, 1/2) para n = 1, 3, 5, 10 y 20. */
export function buildBinomialForma(): AnimBuild {
  const ns = [1, 3, 5, 10, 20];
  return {
    label: "La distribución binomial B(n, 1/2) al aumentar n",
    captions: [
      "Con $n = 1$ lanzamiento hay dos barras iguales: $B(1, \\tfrac12)$.",
      "Con $n = 3$: $\\tfrac18,\\ \\tfrac38,\\ \\tfrac38,\\ \\tfrac18$. La barra central es la más alta y el reparto es **simétrico**.",
      "Con $n = 5$ las barras de los extremos ya son muy pequeñas.",
      "Con $n = 10$ el perfil empieza a parecerse a una **campana**: $\\mu = np = 5$ y $\\sigma = \\sqrt{npq} \\approx 1{,}58$.",
      "Con $n = 20$ la silueta es casi una curva normal con $\\mu = 10$ y $\\sigma \\approx 2{,}24$. De aquí sale la aproximación de la binomial por la normal.",
    ],
    beatMs: 5000,
    render: (beat) => {
      const n = ns[Math.min(beat, ns.length - 1)]!;
      const probs = Array.from({ length: n + 1 }, (_, k) => binomPmf(n, 0.5, k));
      const maxP = Math.max(...probs);
      const bw = Math.min(60, 640 / (n + 1));
      const x0 = 400 - ((n + 1) * bw) / 2;
      return (
        <Canvas>
          <line x1={40} y1={340} x2={760} y2={340} stroke={MANIM.ink} strokeWidth={2.5} />
          {probs.map((p, k) => {
            const h = (p / maxP) * 250;
            return (
              <g key={k}>
                <rect x={x0 + k * bw + 1.5} y={340 - h} width={bw - 3} height={h} fill={MANIM.blue} fillOpacity={0.85} />
                {n <= 10 ? <Txt x={x0 + (k + 0.5) * bw} y={366} size={18} color={MANIM.muted}>{String(k)}</Txt> : null}
              </g>
            );
          })}
          <Txt x={400} y={44} size={30} color={MANIM.yellow}>{`B(${n}; 1/2)`}</Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Campana normal y la regla 68–95–99,7 ───────────── */

function Campana({ mu, s, x0, x1, from, to, color, opacity = 0.4, px, py }: { mu: number; s: number; x0: number; x1: number; from?: number; to?: number; color?: string; opacity?: number; px: (x: number) => number; py: (y: number) => number }): ReactNode {
  const N = 120;
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const x = x0 + (i / N) * (x1 - x0);
    return [x, densidadN(x, mu, s)] as const;
  });
  const sh = from !== undefined && to !== undefined ? pts.filter(([x]) => x >= from && x <= to) : [];
  return (
    <g>
      {sh.length > 1 ? <path d={`M ${px(sh[0]![0])} ${py(0)} ${sh.map(([x, y]) => `L ${px(x)} ${py(y)}`).join(" ")} L ${px(sh[sh.length - 1]![0])} ${py(0)} Z`} fill={color} fillOpacity={opacity} /> : null}
      <polyline points={pts.map(([x, y]) => `${px(x)},${py(y)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={4} />
    </g>
  );
}

/** N(μ, σ): simetría, puntos de inflexión y áreas 68–95–99,7. */
export function buildCampanaNormal(): AnimBuild {
  const mu = 0;
  const s = 1;
  const x0 = -4;
  const x1 = 4;
  const px = (x: number) => 400 + x * 85;
  const py = (y: number) => 350 - y * 650;
  const areas = [
    { k: 1, p: "68,3", c: MANIM.green },
    { k: 2, p: "95,4", c: MANIM.yellow },
    { k: 3, p: "99,7", c: MANIM.orange },
  ];
  return {
    label: "La campana de Gauss y la regla 68–95–99,7",
    captions: [
      "La distribución normal $N(\\mu, \\sigma)$ tiene forma de **campana**, simétrica respecto de la media $\\mu$, donde está el máximo. Media, mediana y moda coinciden.",
      "La desviación típica $\\sigma$ controla la anchura: en $x = \\mu \\pm \\sigma$ la curva tiene sus **puntos de inflexión**.",
      "Entre $\\mu - \\sigma$ y $\\mu + \\sigma$ queda el $68{,}3\\,\\%$ de la probabilidad.",
      "Entre $\\mu - 2\\sigma$ y $\\mu + 2\\sigma$, el $95{,}4\\,\\%$.",
      "Y entre $\\mu - 3\\sigma$ y $\\mu + 3\\sigma$, el $99{,}7\\,\\%$: casi todo. Los valores fuera de $\\mu \\pm 3\\sigma$ son rarísimos.",
    ],
    beatMs: 5000,
    render: (beat) => {
      const a = beat >= 2 ? areas[beat - 2]! : null;
      return (
        <Canvas>
          <line x1={40} y1={py(0)} x2={760} y2={py(0)} stroke={MANIM.ink} strokeWidth={2.5} />
          <Campana mu={mu} s={s} x0={x0} x1={x1} from={a ? -a.k : undefined} to={a ? a.k : undefined} color={a?.c} px={px} py={py} />
          <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(densidadN(0, 0, 1))} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
            <Txt key={k} x={px(k)} y={py(0) + 34} size={20} color={MANIM.muted}>{k === 0 ? "μ" : `${k > 0 ? "μ+" : "μ−"}${Math.abs(k) === 1 ? "" : Math.abs(k)}σ`}</Txt>
          ))}
          <Fade show={beat === 1}>
            {[-1, 1].map((k) => (
              <g key={k}>
                <circle cx={px(k)} cy={py(densidadN(k, 0, 1))} r={9} fill={MANIM.red} />
                <Txt x={px(k)} y={py(densidadN(k, 0, 1)) - 20} size={20} color={MANIM.red}>inflexión</Txt>
              </g>
            ))}
          </Fade>
          {a ? <Txt x={400} y={70} size={34} color={a.c}>{`${a.p} %`}</Txt> : null}
        </Canvas>
      );
    },
  };
}

/* ───────────── Tipificación ───────────── */

/** De N(5,7; 1,1) a N(0, 1): restar la media y dividir por σ. */
export function buildTipificacionNormal(): AnimBuild {
  const mu = 5.7;
  const s = 1.1;
  const base = 340;
  const xs = [5, 6];
  const zs = xs.map((x) => (x - mu) / s);
  return {
    label: "Tipificación: pasar de N(μ, σ) a N(0, 1)",
    captions: [
      "El consumo diario de electricidad sigue una $N(5{,}7;\\ 1{,}1)$ kW. Queremos $P(5 < X < 6)$, pero las tablas solo existen para $N(0, 1)$.",
      "Primero **restamos la media**: $X - \\mu$. La campana se traslada y queda centrada en $0$.",
      "Después **dividimos entre $\\sigma$**: $Z = \\dfrac{X - \\mu}{\\sigma}$. La campana se estrecha hasta tener desviación típica $1$.",
      `Los extremos pasan a $z = \\dfrac{5 - 5{,}7}{1{,}1} = ${tx(zs[0]!, 3)}$ y $z = \\dfrac{6 - 5{,}7}{1{,}1} = ${tx(zs[1]!, 3)}$. El área entre ellos no cambia.`,
      "Con la tabla: $P(5 < X < 6) = \\Phi(0{,}27) - \\Phi(-0{,}64) = 0{,}6064 - (1 - 0{,}7389) = 0{,}3453$.",
    ],
    beatMs: 5200,
    render: (beat) => {
      const standard = beat >= 2;
      const centered = beat >= 1;
      const mu2 = centered ? 0 : mu;
      const s2 = standard ? 1 : s;
      const px = (x: number) => 400 + (x - mu2) * 70;
      const lo = standard ? zs[0]! : centered ? xs[0]! - mu : xs[0]!;
      const hi = standard ? zs[1]! : centered ? xs[1]! - mu : xs[1]!;
      const tickVals = centered ? [-2, -1, 0, 1, 2] : [3.5, 4.6, 5.7, 6.8, 7.9];
      return (
        <Canvas>
          <line x1={40} y1={base} x2={760} y2={base} stroke={MANIM.ink} strokeWidth={2.5} />
          <Campana mu={mu2} s={s2} x0={mu2 - 4.5 * s2} x1={mu2 + 4.5 * s2} from={lo} to={hi} color={MANIM.yellow} opacity={0.45} px={px} py={(y) => base - y * 520} />
          {tickVals.map((t) => (
            <Txt key={t} x={px(t)} y={base + 32} size={20} color={MANIM.muted}>{tx(t, 1).replace("{,}", ",").replace("-", "−")}</Txt>
          ))}
          <Txt x={400} y={52} size={30} color={MANIM.yellow}>{standard ? "Z ~ N(0, 1)" : centered ? "X − μ ~ N(0; 1,1)" : "X ~ N(5,7; 1,1)"}</Txt>
          <Fade show={beat >= 3}>
            <Txt x={px(lo) - 34} y={base - 60} size={22} color={MANIM.orange}>{tx(zs[0]!, 2).replace("{,}", ",").replace("-", "−")}</Txt>
            <Txt x={px(hi) + 30} y={base - 60} size={22} color={MANIM.orange}>{tx(zs[1]!, 2).replace("{,}", ",")}</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <rect x={540} y={110} width={220} height={54} rx={12} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={650} y={146} size={28} color={MANIM.green}>0,3453</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Intervalo de confianza ───────────── */

/** 700 de 2 000: p̂ = 0,35 y el intervalo al 95 %. */
export function buildIntervaloConfianza(): AnimBuild {
  const ph = 0.35;
  const n = 2000;
  const se = Math.sqrt((ph * (1 - ph)) / n);
  const e = 1.96 * se;
  const px = (p: number) => 400 + (p - ph) * 9000;
  const x0 = ph - 4 * se;
  const x1 = ph + 4 * se;
  return {
    label: "Intervalo de confianza para una proporción",
    captions: [
      "En una muestra de $n = 2\\,000$ votantes, $700$ apoyan a un partido: la proporción muestral es $\\hat p = \\dfrac{700}{2000} = 0{,}35$. Es una **estimación puntual** de la proporción real $p$.",
      `Esa estimación varía de una muestra a otra. Su desviación típica es el **error típico** $\\sqrt{\\dfrac{\\hat p\\,(1-\\hat p)}{n}} \\approx ${tx(se, 4)}$.`,
      "Con un nivel de confianza del $95\\,\\%$, el valor crítico es $z = 1{,}96$: en una normal queda el $95\\,\\%$ del área entre $-1{,}96$ y $1{,}96$.",
      `El **error máximo** es $E = 1{,}96\\cdot ${tx(se, 4)} \\approx ${tx(e, 4)}$, y el intervalo es $\\hat p \\pm E = (${tx(ph - e, 3)};\\ ${tx(ph + e, 3)})$.`,
      "Conclusión: con un $95\\,\\%$ de confianza, entre el $33\\,\\%$ y el $37\\,\\%$ de los $8$ millones de votantes apoyan al partido, es decir, entre unos $2{,}63$ y $2{,}97$ millones.",
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        <line x1={40} y1={320} x2={760} y2={320} stroke={MANIM.ink} strokeWidth={2.5} />
        <Fade show={beat >= 1}>
          <Campana mu={ph} s={se} x0={x0} x1={x1} from={beat >= 2 ? ph - e : undefined} to={beat >= 2 ? ph + e : undefined} color={MANIM.green} opacity={0.4} px={px} py={(y) => 320 - y * 5.3} />
        </Fade>
        <circle cx={px(ph)} cy={320} r={9} fill={MANIM.yellow} />
        <Txt x={px(ph)} y={356} size={22} color={MANIM.yellow}>{`p̂ = ${tx(ph, 2).replace("{,}", ",")}`}</Txt>
        <Fade show={beat >= 3}>
          <line x1={px(ph - e)} y1={90} x2={px(ph + e)} y2={90} stroke={MANIM.green} strokeWidth={8} strokeLinecap="round" />
          <Txt x={px(ph - e)} y={70} size={22} color={MANIM.green}>{tx(ph - e, 3).replace("{,}", ",")}</Txt>
          <Txt x={px(ph + e)} y={70} size={22} color={MANIM.green}>{tx(ph + e, 3).replace("{,}", ",")}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={400} y={190} size={24} color={MANIM.green}>95 %</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={400} y={34} size={24} color={MANIM.ink}>entre 2,63 y 2,97 millones de votos</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
