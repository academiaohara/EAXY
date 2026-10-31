"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export function tipoParalelogramo(a: number, b: number, angDeg: number) {
  const igual = Math.abs(a - b) < 1e-9;
  const recto = Math.abs(angDeg - 90) < 1e-9;
  return igual && recto ? "cuadrado" : igual ? "rombo" : recto ? "rectángulo" : "romboide";
}
export function diagonalesParalelogramo(a: number, b: number, angDeg: number): [number, number] {
  const c = Math.cos(angDeg * RAD);
  return [Math.sqrt(Math.max(0, a * a + b * b + 2 * a * b * c)), Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * c))];
}
export const areaParalelogramo = (a: number, b: number, angDeg: number) => a * b * Math.sin(angDeg * RAD);

/** Polígono regular de n lados inscrito en una circunferencia de radio R. */
export function poligonoRegular(n: number, R: number) {
  const lado = 2 * R * Math.sin(Math.PI / n);
  const apotema = R * Math.cos(Math.PI / n);
  return { lado, apotema, area: (n * lado * apotema) / 2, interior: (180 * (n - 2)) / n, central: 360 / n, perimetro: n * lado, sumaInteriores: 180 * (n - 2), diagonales: (n * (n - 3)) / 2 };
}
/** Radio de la circunferencia circunscrita a un polígono regular de n lados de longitud l. */
export const radioDadoLado = (n: number, l: number) => l / (2 * Math.sin(Math.PI / n));

export const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));
/** {n/k} es un polígono estrellado propio si mcd(n, k) = 1 y 2 ≤ k < n/2. */
export const esEstrellado = (n: number, k: number) => k >= 2 && 2 * k < n && mcd(n, k) === 1;
/** Ángulo de cada punta de la estrella {n/k}. */
export const anguloPunta = (n: number, k: number) => (180 * (n - 2 * k)) / n;

/* ───────────── 3. Paralelogramos ───────────── */

export function CuadrilateroDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 5, 2, 8)), b: Math.round(num(block.params?.b, 3, 2, 8)), ang: 70 };
  const [s, setS] = useState(init);
  const tipo = tipoParalelogramo(s.a, s.b, s.ang);
  const [d1, d2] = diagonalesParalelogramo(s.a, s.b, s.ang);
  const u = Math.min(34, 330 / (s.a + s.b), 190 / s.b);
  const th = s.ang * RAD;
  const O: Pt = [70, 225];
  const pt = (x: number, y: number): Pt => [O[0] + x * u, O[1] - y * u];
  const P = [pt(0, 0), pt(s.a, 0), pt(s.a + s.b * Math.cos(th), s.b * Math.sin(th)), pt(s.b * Math.cos(th), s.b * Math.sin(th))];
  const lados = tipo === "cuadrado" ? "4 lados y 4 ángulos iguales" : tipo === "rombo" ? "4 lados iguales" : tipo === "rectángulo" ? "4 ángulos rectos" : "lados y ángulos opuestos iguales";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia los lados y el ángulo: ¿cuándo el paralelogramo se convierte en rectángulo, rombo o cuadrado?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Lado a" value={s.a} min={2} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label="Lado b" value={s.b} min={2} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(b) => setS((v) => ({ ...v, b }))} />
          <Slider label="Ángulo entre los lados" value={s.ang} min={30} max={150} step={5} unit="°" color={MANIM.purple} onChange={(ang) => setS((v) => ({ ...v, ang }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="cuadrilatero" maxH={280}>
        <polygon points={P.map((p) => p.join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={2.5} />
        <Seg a={P[0]!} b={P[2]!} color={MANIM.green} width={2} dashed />
        <Seg a={P[1]!} b={P[3]!} color={MANIM.orange} width={2} dashed />
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Tipo">{tipo}</Stat>
        <Stat color={MANIM.muted} label="Propiedad">{lados}</Stat>
        <Stat color={MANIM.blue} label="Diagonales">{f2(d1)} cm · {f2(d2)} cm</Stat>
        <Stat color={MANIM.purple} label="Área = a·b·sen α">{f2(areaParalelogramo(s.a, s.b, s.ang))} cm²</Stat>
      </Readout>
      <Note>Los <b>paralelogramos</b> tienen los lados opuestos paralelos e iguales y las diagonales se cortan en su punto medio. Si además los 4 ángulos son rectos es un <b>rectángulo</b> (diagonales iguales); si los 4 lados son iguales, un <b>rombo</b> (diagonales perpendiculares); si ambas cosas, un <b>cuadrado</b>. Los <b>trapecios</b> tienen solo un par de lados paralelos y los <b>trapezoides</b> ninguno.</Note>
    </Frame>
  );
}

/* ───────────── 4. Polígonos regulares ───────────── */

export function PoligonoRegularDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 6, 3, 16)), R: Math.round(num(block.params?.a, 4, 1, 8)) };
  const [s, setS] = useState(init);
  const p = poligonoRegular(s.n, s.R);
  const U = 90 / s.R;
  const C: Pt = [260, 135];
  const V = Array.from({ length: s.n }, (_, i): Pt => [C[0] + s.R * U * Math.sin((2 * Math.PI * i) / s.n), C[1] - s.R * U * Math.cos((2 * Math.PI * i) / s.n)]);
  const mid: Pt = [(V[0]![0] + V[1]![0]) / 2, (V[0]![1] + V[1]![1]) / 2];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con más lados, el polígono se parece cada vez más a su circunferencia circunscrita."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Número de lados n" value={s.n} min={3} max={16} step={1} color={MANIM.blue} onChange={(n) => setS((v) => ({ ...v, n }))} />
          <Slider label="Radio R de la circunferencia circunscrita" value={s.R} min={1} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(R) => setS((v) => ({ ...v, R }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="poligono-regular" maxH={300}>
        <circle cx={C[0]} cy={C[1]} r={s.R * U} fill="none" stroke={MANIM.muted} strokeWidth={1} strokeDasharray="5 5" />
        <polygon points={V.map((q) => q.join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.18} stroke={MANIM.blue} strokeWidth={2.5} />
        <Seg a={C} b={V[0]!} color={MANIM.orange} width={2} />
        <Seg a={C} b={V[1]!} color={MANIM.orange} width={2} />
        <Seg a={C} b={mid} color={MANIM.green} width={2.5} />
        <Dot p={C} color={MANIM.ink} r={4} />
        <text x={(C[0] + mid[0]) / 2 + 6} y={(C[1] + mid[1]) / 2 + 4} fill={MANIM.green} fontSize={13} fontWeight={700}>a</text>
        <text x={(C[0] + V[0]![0]) / 2 - 12} y={(C[1] + V[0]![1]) / 2} fill={MANIM.orange} fontSize={13} fontWeight={700}>R</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Ángulo central 360°/n">{f1(p.central)}°</Stat>
        <Stat color={MANIM.blue} label="Ángulo interior 180°(n − 2)/n">{f1(p.interior)}°</Stat>
        <Stat color={MANIM.purple} label="Lado l = 2R·sen(180°/n)">{f2(p.lado)} cm</Stat>
        <Stat color={MANIM.green} label="Apotema a = R·cos(180°/n)">{f2(p.apotema)} cm</Stat>
        <Stat color={MANIM.yellow} label="Área = perímetro · apotema / 2">{f2(p.area)} cm²</Stat>
      </Readout>
      <Note>En un polígono regular los lados y los ángulos son iguales y siempre se puede <b>inscribir en una circunferencia</b> (centro O). El <b>ángulo central</b> es 360°/n y el <b>apotema</b> es la distancia del centro al lado. El hexágono es especial: su lado es igual al radio. Tiene {fmtEs(p.diagonales, 0)} diagonales y la suma de sus ángulos interiores vale {fmtEs(p.sumaInteriores, 0)}°.</Note>
    </Frame>
  );
}

/* ───────────── 6. Polígonos estrellados ───────────── */

export function EstrelladoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 5, 5, 12)), k: Math.round(num(block.params?.a, 2, 2, 5)) };
  const [s, setS] = useState(init);
  const k = Math.min(s.k, Math.max(1, Math.floor((s.n - 1) / 2)));
  const propio = esEstrellado(s.n, k);
  const g = mcd(s.n, k);
  const U = 110;
  const C: Pt = [260, 135];
  const V = Array.from({ length: s.n }, (_, i): Pt => [C[0] + U * Math.sin((2 * Math.PI * i) / s.n), C[1] - U * Math.cos((2 * Math.PI * i) / s.n)]);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Une cada vértice con el que está k lugares más allá. Solo es una estrella de un solo trazo si n y k no tienen divisores comunes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Puntos de la circunferencia n" value={s.n} min={5} max={12} step={1} color={MANIM.blue} onChange={(n) => setS((v) => ({ ...v, n }))} />
          <Slider label="Salto k" value={k} min={2} max={5} step={1} color={MANIM.orange} onChange={(kk) => setS((v) => ({ ...v, k: kk }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="estrellado" maxH={300}>
        <circle cx={C[0]} cy={C[1]} r={U} fill="none" stroke={MANIM.muted} strokeWidth={1} strokeDasharray="5 5" />
        {V.map((p, i) => (
          <Seg key={i} a={p} b={V[(i + k) % s.n]!} color={propio ? MANIM.purple : MANIM.orange} width={2.5} />
        ))}
        {V.map((p, i) => (
          <Dot key={i} p={p} r={3.5} />
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Símbolo de Schläfli">{`{${s.n}/${k}}`}</Stat>
        <Stat color={propio ? MANIM.green : MANIM.orange} label="Tipo">{propio ? "polígono estrellado de un solo trazo" : g > 1 ? `compuesto de ${g} polígonos` : "polígono convexo"}</Stat>
        <Stat color={MANIM.blue} label="Ángulo de cada punta 180°(n − 2k)/n">{propio ? `${f1(anguloPunta(s.n, k))}°` : "—"}</Stat>
      </Readout>
      <Note>Un <b>polígono estrellado</b> se obtiene uniendo los n vértices de un polígono regular saltando k. Es de <b>un solo trazo</b> si n y k son primos entre sí (el pentagrama {"{5/2}"} es el más conocido). Si tienen divisores comunes, queda formado por varios polígonos (el hexagrama {"{6/2}"} son dos triángulos). Para construir un polígono regular conocido su <b>lado</b> l, el radio es R = l / (2·sen(180°/n)).</Note>
    </Frame>
  );
}
