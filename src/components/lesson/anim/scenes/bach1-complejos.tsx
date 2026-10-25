import type { ReactNode } from "react";
import { Canvas, Fade, Txt, quadArrowHead } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmtEs } from "@/components/lesson/anim/arith";
import { add, argDeg, binomText, binomTex, degText, fromPolar, modulus, mul, type Cx } from "@/components/lesson/anim/complex";

const CX = 400;
const CY = 215;

const clampInt = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? (v as number) : d)));
const clampNum = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Number.isFinite(v) ? (v as number) : d));

/** Escala (px por unidad) para que quepan todos los puntos con un margen. */
function scaleFor(points: Cx[], min = 3, max = 44): number {
  const ext = Math.max(min, ...points.map((p) => Math.max(Math.abs(p.x) * 0.55, Math.abs(p.y)))) + 0.9;
  return Math.min(max, 188 / ext);
}

type Px = (z: Cx) => [number, number];
const px = (u: number): Px => (z) => [CX + z.x * u, CY - z.y * u];

function Plane({ u }: { u: number }) {
  const nx = Math.floor(380 / u);
  const ny = Math.floor(200 / u);
  const xs = Array.from({ length: 2 * nx + 1 }, (_, i) => i - nx);
  const ys = Array.from({ length: 2 * ny + 1 }, (_, i) => i - ny);
  return (
    <g>
      {xs.map((t) => (
        <line key={`x${t}`} x1={CX + t * u} y1={CY - ny * u} x2={CX + t * u} y2={CY + ny * u} stroke={MANIM.grid} strokeWidth={t === 0 ? 0 : 1} opacity={0.55} />
      ))}
      {ys.map((t) => (
        <line key={`y${t}`} x1={CX - nx * u} y1={CY - t * u} x2={CX + nx * u} y2={CY - t * u} stroke={MANIM.grid} strokeWidth={t === 0 ? 0 : 1} opacity={0.55} />
      ))}
      <line x1={CX - nx * u - 6} y1={CY} x2={CX + nx * u + 6} y2={CY} stroke={MANIM.ink} strokeWidth={2.5} />
      <line x1={CX} y1={CY + ny * u + 6} x2={CX} y2={CY - ny * u - 6} stroke={MANIM.ink} strokeWidth={2.5} />
      <Txt x={CX + nx * u - 10} y={CY + 22} size={18} color={MANIM.muted} anchor="end">Re</Txt>
      <Txt x={CX + 12} y={CY - ny * u + 6} size={18} color={MANIM.muted} anchor="start">Im</Txt>
    </g>
  );
}

function Arrow({ from, to, color, width = 4, dashed = false }: { from: [number, number]; to: [number, number]; color: string; width?: number; dashed?: boolean }) {
  return (
    <g>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? "8 6" : undefined} />
      <polygon points={quadArrowHead(from[0], from[1], to[0], to[1], 14)} fill={color} />
    </g>
  );
}

function Tag({ at, dx = 14, dy = -12, color, children, size = 22 }: { at: [number, number]; dx?: number; dy?: number; color: string; children: ReactNode; size?: number }) {
  return <Txt x={at[0] + dx} y={at[1] + dy} size={size} color={color} anchor={dx >= 0 ? "start" : "end"}>{children}</Txt>;
}

/** Arco desde el eje real positivo hasta `deg` (radio `r` px). */
function Arc({ deg, r, color, from = 0 }: { deg: number; r: number; color: string; from?: number }) {
  const a0 = (from * Math.PI) / 180;
  const a1 = (deg * Math.PI) / 180;
  const p0 = [CX + r * Math.cos(a0), CY - r * Math.sin(a0)];
  const p1 = [CX + r * Math.cos(a1), CY - r * Math.sin(a1)];
  const large = Math.abs(deg - from) > 180 ? 1 : 0;
  const sweep = deg >= from ? 0 : 1;
  return <path d={`M ${p0[0]} ${p0[1]} A ${r} ${r} 0 ${large} ${sweep} ${p1[0]} ${p1[1]}`} fill="none" stroke={color} strokeWidth={4} />;
}

const dot = (p: [number, number], color: string, r = 7) => <circle cx={p[0]} cy={p[1]} r={r} fill={color} stroke={MANIM.surface} strokeWidth={2} />;

/** Suma de complejos = suma de vectores (regla del paralelogramo). `a+bi` y `c+di`. */
export function buildComplejoSumaVectores(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const z1: Cx = { x: clampInt(params.a, 2, -4, 4), y: clampInt(params.b, 3, -4, 4) };
  const z2: Cx = { x: clampInt(params.c, 3, -4, 4), y: clampInt(params.d, -1, -4, 4) };
  const s = add(z1, z2);
  const u = scaleFor([z1, z2, s], 4);
  const P = px(u);
  const o: [number, number] = [CX, CY];
  return {
    label: `Suma de los complejos ${binomText(z1)} y ${binomText(z2)} como suma de vectores`,
    captions: [
      `$z_1 = ${binomTex(z1)}$ es el punto $(${z1.x}, ${z1.y})$: la parte real en el eje horizontal, la imaginaria en el vertical. Se dibuja como vector desde el origen.`,
      `Lo mismo con $z_2 = ${binomTex(z2)}$, el punto $(${z2.x}, ${z2.y})$.`,
      `Se traslada $z_2$ hasta la punta de $z_1$ (y al revés): los dos caminos cierran un **paralelogramo**.`,
      `La diagonal es $z_1 + z_2 = ${binomTex(s)}$. Coincide con sumar por separado partes reales ($${z1.x}${z2.x < 0 ? "" : "+"}${z2.x}$) e imaginarias ($${z1.y}${z2.y < 0 ? "" : "+"}${z2.y}$).`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Plane u={u} />
        <Arrow from={o} to={P(z1)} color={MANIM.blue} />
        <Tag at={P(z1)} color={MANIM.blue}>{`z₁ = ${binomText(z1)}`}</Tag>
        <Fade show={beat >= 1}>
          <Arrow from={o} to={P(z2)} color={MANIM.orange} />
          <Tag at={P(z2)} color={MANIM.orange}>{`z₂ = ${binomText(z2)}`}</Tag>
        </Fade>
        <Fade show={beat >= 2}>
          <Arrow from={P(z1)} to={P(s)} color={MANIM.orange} width={3} dashed />
          <Arrow from={P(z2)} to={P(s)} color={MANIM.blue} width={3} dashed />
        </Fade>
        <Fade show={beat >= 3}>
          <Arrow from={o} to={P(s)} color={MANIM.green} width={5} />
          <Tag at={P(s)} color={MANIM.green} size={26}>{`z₁ + z₂ = ${binomText(s)}`}</Tag>
          {dot(P(s), MANIM.green)}
        </Fade>
      </Canvas>
    ),
  };
}

/** Multiplicar por i gira 90°. `a+bi` es el número que se gira. */
export function buildComplejoGiroI(params: { a?: number; b?: number }): AnimBuild {
  const z: Cx = { x: clampInt(params.a, 3, -4, 4), y: clampInt(params.b, 1, -4, 4) };
  const safe: Cx = z.x === 0 && z.y === 0 ? { x: 3, y: 1 } : z;
  const z1 = mul(safe, { x: 0, y: 1 });
  const z2 = mul(z1, { x: 0, y: 1 });
  const z3 = mul(z2, { x: 0, y: 1 });
  const u = scaleFor([safe, z1, z2, z3], 3);
  const P = px(u);
  const o: [number, number] = [CX, CY];
  const r = modulus(safe) * u;
  const a0 = argDeg(safe);
  return {
    label: `Multiplicar ${binomText(safe)} por i gira el vector 90 grados`,
    captions: [
      `Partimos de $z = ${binomTex(safe)}$, a una distancia $|z| = ${fmtEs(modulus(safe), 2).replace(",", "{,}")}$ del origen.`,
      `$i \\cdot z = i(${binomTex(safe)}) = ${binomTex(z1)}$ (porque $i^2 = -1$). El vector ha girado **90°** en sentido contrario a las agujas del reloj, con la misma longitud.`,
      `Otra vez por $i$: $i^2 \\cdot z = ${binomTex(z2)} = -z$. Dos giros de 90° dan media vuelta.`,
      `$i^3 z = ${binomTex(z3)}$ y $i^4 z = z$: a la cuarta vuelta de 90° se regresa al punto de partida. Por eso las potencias de $i$ se repiten cada 4.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Plane u={u} />
        <circle cx={CX} cy={CY} r={r} fill="none" stroke={MANIM.grid} strokeWidth={2} strokeDasharray="5 6" />
        <Arrow from={o} to={P(safe)} color={MANIM.blue} />
        <Tag at={P(safe)} color={MANIM.blue}>z</Tag>
        <Fade show={beat >= 1}>
          <Arrow from={o} to={P(z1)} color={MANIM.green} />
          <Tag at={P(z1)} color={MANIM.green}>i·z</Tag>
          <Arc from={a0} deg={a0 + 90} r={Math.min(r * 0.45, 60) + 10} color={MANIM.yellow} />
          <Txt
            x={CX + (Math.min(r * 0.45, 60) + 36) * Math.cos(((a0 + 45) * Math.PI) / 180)}
            y={CY - (Math.min(r * 0.45, 60) + 36) * Math.sin(((a0 + 45) * Math.PI) / 180) + 6}
            size={20}
            color={MANIM.yellow}
          >+90°</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Arrow from={o} to={P(z2)} color={MANIM.orange} />
          <Tag at={P(z2)} color={MANIM.orange}>i²·z = −z</Tag>
        </Fade>
        <Fade show={beat >= 3}>
          <Arrow from={o} to={P(z3)} color={MANIM.purple} />
          <Tag at={P(z3)} color={MANIM.purple}>i³·z</Tag>
          <Txt x={CX} y={400} size={24} color={MANIM.yellow}>i⁴·z = z: se cierra el ciclo</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Módulo, argumento y paso a forma trigonométrica. `a+bi`. */
export function buildComplejoPolar(params: { a?: number; b?: number }): AnimBuild {
  const raw: Cx = { x: clampInt(params.a, 3, -5, 5), y: clampInt(params.b, 2, -5, 5) };
  const z: Cx = raw.x === 0 && raw.y === 0 ? { x: 3, y: 2 } : raw;
  const r = modulus(z);
  const th = argDeg(z);
  const u = scaleFor([z], 3);
  const P = px(u);
  const o: [number, number] = [CX, CY];
  const rTxt = fmtEs(r, 2);
  const sq = z.x * z.x + z.y * z.y;
  const radTex = `\\sqrt{${sq}}`;
  const sqrtIsInt = Number.isInteger(Math.sqrt(sq));
  return {
    label: `Módulo y argumento de ${binomText(z)}`,
    captions: [
      `El número $z = ${binomTex(z)}$ es el punto $(${z.x}, ${z.y})$. Para situarlo también podemos decir **a qué distancia está del origen** y **hacia dónde apunta**.`,
      `La distancia es el **módulo**: por Pitágoras, $|z| = \\sqrt{${z.x < 0 ? `(${z.x})` : z.x}^2 + ${z.y < 0 ? `(${z.y})` : z.y}^2} = ${sqrtIsInt ? String(Math.sqrt(sq)) : `${radTex} \\approx ${rTxt.replace(",", "{,}")}`}$.`,
      `El **argumento** es el ángulo que forma el vector con el semieje real positivo: $\\theta = ${fmtEs(th, 1).replace(",", "{,}")}^\\circ$ (argumento principal, entre $-180^\\circ$ y $180^\\circ$).`,
      `Con $x = r\\cos\\theta$ e $y = r\\sin\\theta$ queda la **forma trigonométrica**: $z = r(\\cos\\theta + i\\sin\\theta)$. Y en forma polar, $z = ${rTxt.replace(",", "{,}")}_{${fmtEs(th, 1).replace(",", "{,}")}^\\circ}$.`,
    ],
    beatMs: 4600,
    render: (beat) => {
      const proj: [number, number] = [P(z)[0], CY];
      const side = (z.y >= 0 ? 1 : -1) * (Math.abs(th) > 90 ? -1 : 1);
      const arcR = Math.min(r * u * 0.25, 34) + 8;
      return (
        <Canvas>
          <Plane u={u} />
          <Arrow from={o} to={P(z)} color={MANIM.blue} />
          {dot(P(z), MANIM.blue)}
          <Tag at={P(z)} dx={z.x >= 0 ? 14 : -14} color={MANIM.blue}>{`z = ${binomText(z)}`}</Tag>
          <Fade show={beat >= 1}>
            <line x1={proj[0]} y1={proj[1]} x2={P(z)[0]} y2={P(z)[1]} stroke={MANIM.grid} strokeWidth={2.5} strokeDasharray="6 5" />
            <line x1={o[0]} y1={o[1]} x2={proj[0]} y2={proj[1]} stroke={MANIM.orange} strokeWidth={4} />
            <Txt x={(o[0] + proj[0]) / 2} y={CY + (z.y >= 0 ? 24 : -12)} size={20} color={MANIM.orange}>{`x = ${z.x}`}</Txt>
            <Txt x={proj[0] + (z.x >= 0 ? 12 : -12)} y={(CY + P(z)[1]) / 2} size={20} color={MANIM.orange} anchor={z.x >= 0 ? "start" : "end"}>{`y = ${z.y}`}</Txt>
            <Txt
              x={(o[0] + P(z)[0]) / 2 + side * -Math.sin((th * Math.PI) / 180) * 40}
              y={(o[1] + P(z)[1]) / 2 + side * -Math.cos((th * Math.PI) / 180) * 40 + 6}
              size={22}
              color={MANIM.yellow}
            >{`r = ${rTxt}`}</Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Arc deg={th} r={arcR} color={MANIM.green} />
            <Txt x={CX + (th >= 0 ? 1 : 1) * (arcR + 22)} y={CY + (th >= 0 ? -10 : 30)} size={22} color={MANIM.green} anchor="start">{`θ = ${degText(th)}`}</Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <rect x={150} y={348} width={500} height={56} rx={10} fill={MANIM.panel} stroke={MANIM.grid} />
            <Txt x={400} y={385} size={26} color={MANIM.yellow}>{`z = ${rTxt}·(cos ${degText(th)} + i·sen ${degText(th)})`}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/** Producto en forma polar: se multiplican módulos y se suman argumentos. `a`,`b` = r₁,θ₁ ; `c`,`d` = r₂,θ₂ (grados). */
export function buildComplejoProductoPolar(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const r1 = clampNum(params.a, 2, 0.5, 3);
  const t1 = clampInt(params.b, 30, -180, 180);
  const r2 = Math.min(clampNum(params.c, 1.5, 0.5, 3), 6 / r1);
  const t2 = clampInt(params.d, 45, -180, 180);
  const z1 = fromPolar(r1, t1);
  const z2 = fromPolar(r2, t2);
  const zp = mul(z1, z2);
  const rp = r1 * r2;
  const tp = argDeg(zp);
  const u = scaleFor([z1, z2, zp], 3);
  const P = px(u);
  const o: [number, number] = [CX, CY];
  const f = (v: number) => fmtEs(v, 2).replace(",", "{,}");
  const sum = t1 + t2;
  return {
    label: `Producto en forma polar: módulos que se multiplican y argumentos que se suman`,
    captions: [
      `$z_1 = ${f(r1)}_{${t1}^\\circ}$: módulo ${fmtEs(r1, 2)} y argumento ${t1}°.`,
      `$z_2 = ${f(r2)}_{${t2}^\\circ}$: módulo ${fmtEs(r2, 2)} y argumento ${t2}°.`,
      `Los **módulos se multiplican**: $${f(r1)}\\cdot ${f(r2)} = ${f(rp)}$. Y los **argumentos se suman**: $${t1}^\\circ + ${t2}^\\circ = ${sum}^\\circ$.`,
      `Resultado: $z_1 z_2 = ${f(rp)}_{${sum}^\\circ}$${sum !== tp ? ` (que es el mismo ángulo que ${degText(tp)})` : ""}, es decir, $${binomTex(zp)}$ en forma binómica. Multiplicar es **girar y estirar**.`,
    ],
    beatMs: 4600,
    render: (beat) => (
      <Canvas>
        <Plane u={u} />
        <Arrow from={o} to={P(z1)} color={MANIM.blue} />
        <Tag at={P(z1)} dx={z1.x >= 0 ? 12 : -12} dy={26} color={MANIM.blue}>{`z₁ (${fmtEs(r1, 2)}, ${t1}°)`}</Tag>
        <Fade show={beat >= 1}>
          <Arrow from={o} to={P(z2)} color={MANIM.orange} />
          <Tag at={P(z2)} dx={z2.x >= 0 ? 12 : -12} color={MANIM.orange}>{`z₂ (${fmtEs(r2, 2)}, ${t2}°)`}</Tag>
        </Fade>
        <Fade show={beat >= 2}>
          <Arc from={t1} deg={t1 + t2} r={Math.min(rp * u * 0.5, 64) + 14} color={MANIM.yellow} />
          <Txt x={CX} y={404} size={24} color={MANIM.yellow}>{`módulos: ${fmtEs(r1, 2)} · ${fmtEs(r2, 2)} = ${fmtEs(rp, 2)}   ·   ángulos: ${t1}° + ${t2}° = ${sum}°`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Arrow from={o} to={P(zp)} color={MANIM.green} width={5} />
          <Tag at={P(zp)} dx={zp.x >= 0 ? 14 : -14} color={MANIM.green} size={24}>{`z₁·z₂ = ${binomText(zp)}`}</Tag>
        </Fade>
      </Canvas>
    ),
  };
}

/** Raíces n-ésimas de un complejo `r_θ`: n puntos equiespaciados sobre una circunferencia. `a`=r, `b`=θ°, `c`=n. */
export function buildComplejoRaices(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const r = clampInt(params.a, 8, 1, 64);
  const th = clampInt(params.b, 0, -180, 180);
  const n = clampInt(params.c, 3, 2, 8);
  const rho = Math.pow(r, 1 / n);
  const u = 150 / rho;
  const P = px(u);
  const o: [number, number] = [CX, CY];
  const roots = Array.from({ length: n }, (_, k) => fromPolar(rho, (th + 360 * k) / n));
  const first = roots[0]!;
  const step = 360 / n;
  const f = (v: number) => fmtEs(v, 2).replace(",", "{,}");
  const wTex = `${r}_{${th}^\\circ}`;
  return {
    label: `Las ${n} raíces ${n === 2 ? "cuadradas" : n === 3 ? "cúbicas" : `de índice ${n}`} de un complejo forman un polígono regular`,
    captions: [
      `Buscamos $\\sqrt[${n}]{${wTex}}$. Una raíz $n$-ésima tiene módulo $\\sqrt[${n}]{${r}} = ${f(rho)}$: todas las raíces están en la **misma circunferencia**.`,
      `La primera raíz tiene argumento $\\dfrac{${th}^\\circ}{${n}} = ${f(th / n)}^\\circ$ (se divide el argumento entre el índice).`,
      `Como $z$ tiene infinitos argumentos ($${th}^\\circ + 360^\\circ k$), al dividir entre ${n} salen **${n} raíces distintas**, cada una ${f(step)}° después de la anterior.`,
      `Las ${n} raíces son los vértices de un **polígono regular** de ${n} lados inscrito en la circunferencia de radio ${f(rho)}. Más de ${n} no hay: la siguiente repetiría la primera.`,
    ],
    beatMs: 4600,
    render: (beat) => (
      <Canvas>
        <Plane u={Math.max(u, 16)} />
        <Fade show={beat >= 0}>
          <circle cx={CX} cy={CY} r={rho * u} fill="none" stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 7" />
          <Txt x={CX + rho * u * 0.7 + 8} y={CY + rho * u * 0.7 + 20} size={20} color={MANIM.yellow} anchor="start">{`radio ${fmtEs(rho, 2)}`}</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <Arrow from={o} to={P(first)} color={MANIM.blue} />
          <Arc deg={th / n} r={34} color={MANIM.green} />
          <Tag at={P(first)} dx={first.x >= 0 ? 10 : -10} color={MANIM.blue}>{`k = 0 · ${fmtEs(th / n, 1)}°`}</Tag>
        </Fade>
        <Fade show={beat >= 2}>
          {roots.slice(1).map((p, k) => (
            <g key={k}>
              <Arrow from={o} to={P(p)} color={MANIM.orange} width={3} />
              <Tag at={P(p)} dx={p.x >= 0 ? 10 : -10} dy={p.y >= 0 ? -10 : 22} color={MANIM.orange} size={18}>{`k = ${k + 1}`}</Tag>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 3}>
          <polygon points={roots.map((p) => P(p).join(",")).join(" ")} fill={MANIM.green} fillOpacity={0.14} stroke={MANIM.green} strokeWidth={3.5} />
          {roots.map((p, k) => (
            <g key={k}>{dot(P(p), MANIM.green, 8)}</g>
          ))}
        </Fade>
      </Canvas>
    ),
  };
}

