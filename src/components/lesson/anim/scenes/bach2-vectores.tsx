import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow3D, Axes3D, Caja3D, Dot3D, Poly3D, Seg3D, stdProj } from "@/components/lesson/anim/space3d";
import { cross, mixto, norma2, normaTxt, raizTxt, sumaV, vecTxt, type V3 } from "@/components/lesson/anim/vec3";

const clampInt = (v: number | undefined, fb: number, lo = -5, hi = 5) => (Number.isFinite(v) ? Math.max(lo, Math.min(hi, Math.round(v as number))) : fb);
const tex = (n: number) => String(n).replace("-", "-");
const vtex = (v: V3) => `(${v.map(tex).join(",\\ ")})`;

function triple(nums: number[] | undefined, start: number, fb: V3): V3 {
  return [0, 1, 2].map((i) => clampInt(nums?.[start + i], fb[i]!)) as V3;
}

/** Un vector en el espacio: punto, flecha desde el origen, componentes y módulo. `a`, `b`, `c`: coordenadas del punto. */
export function buildVectorComponentes3d(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const P: V3 = [clampInt(params.a, 3, 0, 5), clampInt(params.b, 2, 0, 5), clampInt(params.c, 4, 0, 5)];
  const proj = stdProj(36, 330, 280);
  const [a, b, c] = P;
  return {
    label: "Componentes y módulo de un vector",
    captions: [
      "En el espacio cada punto tiene **tres coordenadas** $(x, y, z)$ respecto de los ejes. El origen es $O = (0, 0, 0)$.",
      `El vector $\\vec{v} = \\overrightarrow{OP}$ une el origen con $P(${a},\\ ${b},\\ ${c})$. Sus **componentes** son las coordenadas del punto: $\\vec{v} = (${a},\\ ${b},\\ ${c})$.`,
      `Las componentes son los desplazamientos sobre cada eje: $${a}$ en $x$, $${b}$ en $y$ y $${c}$ en $z$ (la «escalera» hasta $P$).`,
      `Dos veces Pitágoras dan el **módulo**: $|\\vec{v}| = \\sqrt{${a}^2 + ${b}^2 + ${c}^2} = \\sqrt{${a * a + b * b + c * c}}$.`,
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} />
        <Fade show={beat >= 2}>
          <Caja3D proj={proj} b={P} />
          <Arrow3D proj={proj} from={[0, 0, 0]} to={[a, 0, 0]} color={MANIM.red} width={4} label={String(a)} labelDy={20} />
          <Arrow3D proj={proj} from={[a, 0, 0]} to={[a, b, 0]} color={MANIM.green} width={4} label={String(b)} labelDx={14} labelDy={18} />
          <Arrow3D proj={proj} from={[a, b, 0]} to={P} color={MANIM.blue} width={4} label={String(c)} labelDx={16} />
        </Fade>
        <Fade show={beat >= 1}>
          <Arrow3D proj={proj} to={P} color={MANIM.yellow} width={5} />
        </Fade>
        <Dot3D proj={proj} p={P} label={`P(${a}, ${b}, ${c})`} dx={12} dy={-14} />
        <Fade show={beat === 3} dy={10}>
          <Txt x={610} y={110} size={28} color={MANIM.yellow}>{`|v| = √${a * a + b * b + c * c}`}</Txt>
          <Txt x={610} y={146} size={20} color={MANIM.muted}>{`≈ ${Math.sqrt(a * a + b * b + c * c).toFixed(2).replace(".", ",")}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Suma de vectores: regla de la poligonal y del paralelogramo. `nums`: `[ux, uy, uz, vx, vy, vz]`. */
export function buildVectoresSuma3d(params: { nums?: number[] }): AnimBuild {
  const u = triple(params.nums, 0, [3, 0, 1]);
  const v = triple(params.nums, 3, [0, 3, 2]);
  const w = sumaV(u, v);
  const proj = stdProj(34, 330, 290);
  return {
    label: "Suma de vectores en el espacio",
    captions: [
      `Partimos de $\\vec{u} = ${vtex(u)}$ dibujado desde el origen.`,
      `Se coloca $\\vec{v} = ${vtex(v)}$ **a continuación**: su origen es el extremo de $\\vec{u}$.`,
      `$\\vec{u} + \\vec{v}$ va del origen de $\\vec{u}$ al extremo de $\\vec{v}$. Se suman las componentes: $\\vec{u} + \\vec{v} = ${vtex(w)}$.`,
      "Si se colocan los dos vectores desde un mismo punto, la suma es la **diagonal del paralelogramo** que forman (regla del paralelogramo).",
    ],
    beatMs: 5000,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} floor={false} />
        <Arrow3D proj={proj} to={u} color={MANIM.blue} width={4.5} label="u" />
        <Fade show={beat >= 1}>
          <Arrow3D proj={proj} from={u} to={w} color={MANIM.green} width={4.5} label="v" />
        </Fade>
        <Fade show={beat >= 2}>
          <Arrow3D proj={proj} to={w} color={MANIM.yellow} width={5} label="u + v" labelDx={14} />
        </Fade>
        <Fade show={beat === 3}>
          <Arrow3D proj={proj} to={v} color={MANIM.green} width={3} dashed />
          <Seg3D proj={proj} a={v} b={w} color={MANIM.blue} dashed width={2.5} />
          <Poly3D proj={proj} pts={[[0, 0, 0], u, w, v]} color={MANIM.yellow} fillOpacity={0.12} stroke={false} />
        </Fade>
        <Fade show={beat >= 2} dx={20}>
          <Txt x={640} y={90} size={24} color={MANIM.blue} anchor="start">{`u = ${vecTxt(u)}`}</Txt>
          <Txt x={640} y={124} size={24} color={MANIM.green} anchor="start">{`v = ${vecTxt(v)}`}</Txt>
          <Txt x={640} y={162} size={26} color={MANIM.yellow} anchor="start">{`u+v = ${vecTxt(w)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Producto escalar en el plano de los dos vectores: proyección y `u·v = |u|·|v|·cos α`. `a`: ángulo en grados (0–180). */
export function buildProductoEscalarProyeccion(params: { a?: number }): AnimBuild {
  const alfa = Number.isFinite(params.a) ? Math.max(0, Math.min(180, Math.round(params.a as number))) : 50;
  const rad = (alfa * Math.PI) / 180;
  const U = 5;
  const V = 4;
  const O: [number, number] = [150, 280];
  const k = 48;
  const vx = O[0] + k * V * Math.cos(rad);
  const vy = O[1] - k * V * Math.sin(rad);
  const ux = O[0] + k * U;
  const proy = V * Math.cos(rad);
  const px = O[0] + k * proy;
  const prod = U * proy;
  const fmt = (x: number) => x.toFixed(2).replace(/\.?0+$/, "").replace(".", ",");
  const fmtT = (x: number) => fmt(x).replace(",", "{,}");
  return {
    label: "Producto escalar y proyección",
    captions: [
      `Dos vectores con el mismo origen forman un ángulo $\\alpha = ${alfa}^\\circ$. Sus módulos son $|\\vec{u}| = ${U}$ y $|\\vec{v}| = ${V}$.`,
      `La **proyección** de $\\vec{v}$ sobre $\\vec{u}$ mide $|\\vec{v}|\\cos\\alpha = ${fmtT(proy)}$ (negativa si el ángulo es obtuso).`,
      `El **producto escalar** es el módulo de $\\vec{u}$ por esa proyección: $\\vec{u}\\cdot\\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\alpha = ${U}\\cdot ${fmtT(proy)} = ${fmtT(prod)}$. Es un **número**, no un vector.`,
      "El signo depende del ángulo: **positivo** si es agudo, **negativo** si es obtuso y **cero** si los vectores son perpendiculares ($\\alpha = 90^\\circ$).",
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        <line x1={O[0] - 40} y1={O[1]} x2={ux + 80} y2={O[1]} stroke={MANIM.grid} strokeWidth={1.5} />
        <path d={`M ${O[0] + 36} ${O[1]} A 36 36 0 0 0 ${O[0] + 36 * Math.cos(rad)} ${O[1] - 36 * Math.sin(rad)}`} fill="none" stroke={MANIM.yellow} strokeWidth={2.5} />
        <Txt x={O[0] + 62 * Math.cos(rad / 2)} y={O[1] - 62 * Math.sin(rad / 2) + 8} size={22} color={MANIM.yellow}>α</Txt>
        <line x1={O[0]} y1={O[1]} x2={ux} y2={O[1]} stroke={MANIM.blue} strokeWidth={5} strokeLinecap="round" />
        <polygon points={`${ux},${O[1]} ${ux - 14},${O[1] - 7} ${ux - 14},${O[1] + 7}`} fill={MANIM.blue} />
        <Txt x={ux + 14} y={O[1] + 30} size={24} color={MANIM.blue}>u</Txt>
        <line x1={O[0]} y1={O[1]} x2={vx} y2={vy} stroke={MANIM.green} strokeWidth={5} strokeLinecap="round" />
        <circle cx={vx} cy={vy} r={6} fill={MANIM.green} />
        <Txt x={vx + 16} y={vy - 6} size={24} color={MANIM.green}>v</Txt>
        <Fade show={beat >= 1}>
          <line x1={vx} y1={vy} x2={vx} y2={O[1]} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          <line x1={O[0]} y1={O[1] + 22} x2={px} y2={O[1] + 22} stroke={MANIM.orange} strokeWidth={5} strokeLinecap="round" />
          <Txt x={(O[0] + px) / 2} y={O[1] + 52} size={20} color={MANIM.orange}>{`proy = ${fmt(proy)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={10}>
          <Txt x={560} y={140} size={28} color={MANIM.yellow} anchor="start">{`u · v = ${fmt(prod)}`}</Txt>
          <Txt x={560} y={176} size={20} color={MANIM.muted} anchor="start">{`${U} · ${V} · cos ${alfa}°`}</Txt>
        </Fade>
        <Fade show={beat === 3} dy={10}>
          <Txt x={560} y={226} size={20} color={alfa < 90 ? MANIM.green : alfa === 90 ? MANIM.yellow : MANIM.red} anchor="start">
            {alfa < 90 ? "ángulo agudo: positivo" : alfa === 90 ? "perpendiculares: cero" : "ángulo obtuso: negativo"}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Producto vectorial: vector perpendicular cuyo módulo es el área del paralelogramo. `nums`: `[ux, uy, uz, vx, vy, vz]`. */
export function buildProductoVectorial3d(params: { nums?: number[] }): AnimBuild {
  const u = triple(params.nums, 0, [3, 0, 0], );
  const v = triple(params.nums, 3, [1, 3, 0]);
  const w = cross(u, v);
  const proj = stdProj(34, 300, 290);
  const wMax = Math.max(Math.abs(w[0]), Math.abs(w[1]), Math.abs(w[2]), 1);
  const wDraw = w.map((x) => (x / wMax) * 4.5) as V3;
  const area2 = norma2(w);
  return {
    label: "Producto vectorial",
    captions: [
      `Dos vectores del espacio, $\\vec{u} = ${vtex(u)}$ y $\\vec{v} = ${vtex(v)}$, con el mismo origen.`,
      "Forman un **paralelogramo**. Su área será el módulo del producto vectorial.",
      `$\\vec{u}\\times\\vec{v} = ${vtex(w)}$ es un vector **perpendicular a los dos** (a su plano). El sentido lo da la regla de la mano derecha (o del sacacorchos).`,
      `Su **módulo** es el área del paralelogramo: $|\\vec{u}\\times\\vec{v}| = \\sqrt{${area2}} = ${area2 === 0 ? 0 : raizTxt(area2).replace("√", "\\sqrt{") + (raizTxt(area2).includes("√") ? "}" : "")}$. Si los vectores son paralelos, vale $0$.`.replace(/\\sqrt\{(\d+)\}\{?/, "\\sqrt{$1}"),
    ],
    beatMs: 5400,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} floor={false} />
        <Fade show={beat >= 1}>
          <Poly3D proj={proj} pts={[[0, 0, 0], u, sumaV(u, v), v]} color={MANIM.yellow} fillOpacity={0.2} />
        </Fade>
        <Arrow3D proj={proj} to={u} color={MANIM.blue} width={4.5} label="u" />
        <Arrow3D proj={proj} to={v} color={MANIM.green} width={4.5} label="v" />
        <Fade show={beat >= 2}>
          <Arrow3D proj={proj} to={wDraw} color={MANIM.red} width={5} label="u × v" labelDx={16} />
        </Fade>
        <Fade show={beat >= 2} dx={20}>
          <Txt x={560} y={96} size={24} color={MANIM.blue} anchor="start">{`u = ${vecTxt(u)}`}</Txt>
          <Txt x={560} y={130} size={24} color={MANIM.green} anchor="start">{`v = ${vecTxt(v)}`}</Txt>
          <Txt x={560} y={172} size={24} color={MANIM.red} anchor="start">{`u×v = ${vecTxt(w)}`}</Txt>
        </Fade>
        <Fade show={beat === 3} dy={10}>
          <Txt x={560} y={230} size={24} color={MANIM.yellow} anchor="start">{`|u×v| = ${normaTxt(w)}`}</Txt>
          <Txt x={560} y={262} size={18} color={MANIM.muted} anchor="start">área del paralelogramo</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Paralelepípedo y volumen con el producto mixto. `nums`: `[ux,uy,uz, vx,vy,vz, wx,wy,wz]`. */
export function buildParalelepipedoVolumen(params: { nums?: number[] }): AnimBuild {
  const u = triple(params.nums, 0, [3, 0, 0]);
  const v = triple(params.nums, 3, [1, 3, 0]);
  const w = triple(params.nums, 6, [1, 1, 3]);
  const m = mixto(u, v, w);
  const proj = stdProj(30, 280, 300);
  const A = (a: V3, b: V3) => sumaV(a, b);
  const O: V3 = [0, 0, 0];
  const base = [O, u, A(u, v), v];
  const top = base.map((p) => A(p, w));
  const tri = Math.abs(m) / 6;
  const fmt = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(2).replace(".", ","));
  const fmtT = (x: number) => fmt(x).replace(",", "{,}");
  return {
    label: "Producto mixto y volumen",
    captions: [
      `Tres vectores con el mismo origen: $\\vec{u} = ${vtex(u)}$, $\\vec{v} = ${vtex(v)}$ y $\\vec{w} = ${vtex(w)}$.`,
      "$\\vec{u}$ y $\\vec{v}$ forman la **base**: un paralelogramo de área $|\\vec{u}\\times\\vec{v}|$.",
      "$\\vec{w}$ marca la **altura** (inclinada): el paralelepípedo es el cuerpo que generan los tres vectores.",
      `El **producto mixto** $[\\vec{u}, \\vec{v}, \\vec{w}] = \\vec{u}\\cdot(\\vec{v}\\times\\vec{w}) = ${m}$ es el determinante de las tres filas. Su valor absoluto es el volumen: $V = ${Math.abs(m)}$. El tetraedro correspondiente ocupa la sexta parte: $${fmtT(tri)}$.`,
    ],
    beatMs: 5400,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} floor={false} />
        <Fade show={beat >= 1}>
          <Poly3D proj={proj} pts={base} color={MANIM.yellow} fillOpacity={0.22} />
        </Fade>
        <Fade show={beat >= 3}>
          {[
            [base[0]!, base[1]!, top[1]!, top[0]!],
            [base[1]!, base[2]!, top[2]!, top[1]!],
            [base[2]!, base[3]!, top[3]!, top[2]!],
            [base[3]!, base[0]!, top[0]!, top[3]!],
            top,
          ].map((pts, i) => <Poly3D key={i} proj={proj} pts={pts} color={MANIM.purple} fillOpacity={0.1} />)}
        </Fade>
        <Arrow3D proj={proj} to={u} color={MANIM.blue} width={4.5} label="u" />
        <Arrow3D proj={proj} to={v} color={MANIM.green} width={4.5} label="v" />
        <Fade show={beat >= 2}>
          <Arrow3D proj={proj} to={w} color={MANIM.red} width={4.5} label="w" />
        </Fade>
        <Fade show={beat === 3} dx={20}>
          <Txt x={560} y={120} size={26} color={MANIM.yellow} anchor="start">{`[u, v, w] = ${m}`}</Txt>
          <Txt x={560} y={158} size={24} color={MANIM.purple} anchor="start">{`Paralelepípedo: ${Math.abs(m)}`}</Txt>
          <Txt x={560} y={192} size={24} color={MANIM.orange} anchor="start">{`Tetraedro: ${fmt(tri)}`}</Txt>
        </Fade>
        <Fade show={beat === 1} dx={20}>
          <Txt x={560} y={120} size={22} color={MANIM.yellow} anchor="start">{`|u × v| = ${normaTxt(cross(u, v))}`}</Txt>
          <Txt x={560} y={150} size={18} color={MANIM.muted} anchor="start">área de la base</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

