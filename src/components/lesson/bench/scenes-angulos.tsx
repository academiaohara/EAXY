"use client";

import { type ReactNode } from "react";
import { angDe, dist, enCirculo, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, AZUL, Arco, BenchShell, usePaso, INK, SVG_CLASS, VERDE, type BenchBlock, type BenchSceneName } from "./scenes";
import { ArcoAnim, MSHEET, MV, ReglaTrazando, lerp, tramo, useProgreso } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { ArcoPlano } from "./scenes-trazados";

const AUX = "#6b7480";

function Hoja({ scene, block, step, setStep, label, testId, children }: { scene: BenchSceneName; block: BenchBlock; step: number; setStep: (n: number) => void; label: string; testId: string; children: ReactNode }) {
  return (
    <BenchShell scene={scene} notes={block.notes} step={step} setStep={setStep} label={label}>
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label={label} data-testid={testId}>
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        {children}
      </svg>
    </BenchShell>
  );
}

const Marca = ({ p, color = INK, r = 3 }: { p: Pt; color?: string; r?: number }) => <circle cx={p[0]} cy={p[1]} r={r} fill={color} />;
const Titulo = ({ children, sub }: { children: string; sub?: string }) => (
  <>
    <Txt p={[24, 34]} color={VERDE} size={15}>{children}</Txt>
    {sub ? <Txt p={[24, 56]} color={INK} size={13}>{sub}</Txt> : null}
  </>
);
const Rayo = ({ v, a, len = 220, color = INK, w = 1.8 }: { v: Pt; a: number; len?: number; color?: string; w?: number }) => <Seg a={v} b={enCirculo(v, len, a)} color={color} w={w} />;
/** Arco de ángulo entre las direcciones `a1` y `a2` (grados, eje Y hacia arriba) con su texto. */
const AngArco = ({ v, a1, a2, r, color, text, dr = 14 }: { v: Pt; a1: number; a2: number; r: number; color: string; text: string; dr?: number }) => <Arco v={v} a1={-a1} a2={-a2} r={r} color={color} text={text} dr={dr} textSize={13} />;

/* ───────────── Tipos de ángulos y relaciones ───────────── */

export function AngulosTipos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const V: Pt = [190, 290];
  const nodos: ReactNode[] = [];
  const base = <Seg a={[40, V[1]]} b={[580, V[1]]} w={1.2} color={AUX} />;
  const titulos = ["Ángulo: vértice y lados", "Ángulo recto", "Ángulo agudo", "Ángulo obtuso", "Ángulo llano", "Ángulos complementarios", "Ángulos suplementarios", "Ángulos consecutivos", "Ángulos opuestos por el vértice", "Ángulos adyacentes", "Sentido positivo y negativo", "Ángulos iguales"];
  switch (step) {
    case 0:
      nodos.push(<Rayo key="a" v={V} a={0} len={300} />, <Rayo key="b" v={V} a={38} len={300} />, <Marca key="v" p={V} />, <Txt key="tv" p={[V[0] - 20, V[1] + 20]}>V</Txt>, <Txt key="ta" p={[V[0] + 280, V[1] + 18]}>a</Txt>, <Txt key="tb" p={[V[0] + 238, V[1] - 160]}>b</Txt>);
      nodos.push(<AngArco key="g" v={V} a1={0} a2={38} r={60} color={AMBAR} text="A" />);
      nodos.push(<Txt key="n" p={[24, 58]} color={AZUL} size={13}>1° = 60′ ; 1′ = 60″ (sistema sexagesimal)</Txt>);
      break;
    case 1:
      nodos.push(<Rayo key="a" v={V} a={0} len={300} />, <Rayo key="b" v={V} a={90} len={230} />, <path key="r" d={`M${V[0] + 16} ${V[1]} v-16 h-16`} fill="none" stroke={AMBAR} strokeWidth="1.6" />, <Marca key="v" p={V} />);
      nodos.push(<Txt key="n" p={[V[0] + 30, V[1] - 20]} color={AMBAR} size={15}>90°</Txt>);
      break;
    case 2:
      nodos.push(<Rayo key="a" v={V} a={0} len={300} />, <Rayo key="b" v={V} a={55} len={260} />, <Marca key="v" p={V} />, <AngArco key="g" v={V} a1={0} a2={55} r={70} color={AMBAR} text="< 90°" />);
      break;
    case 3:
      nodos.push(<Rayo key="a" v={V} a={0} len={300} />, <Rayo key="b" v={V} a={125} len={250} />, <Marca key="v" p={V} />, <AngArco key="g" v={V} a1={0} a2={125} r={70} color={AMBAR} text="> 90°" />);
      break;
    case 4:
      nodos.push(<Seg key="a" a={[V[0] - 200, V[1]]} b={[V[0] + 200, V[1]]} w={1.8} />, <Marca key="v" p={V} />, <Marca key="o1" p={[V[0] - 200, V[1]]} />, <Marca key="o2" p={[V[0] + 200, V[1]]} />, <Txt key="ta" p={[V[0] - 210, V[1] + 22]}>A</Txt>, <Txt key="to" p={[V[0] - 4, V[1] + 22]}>O</Txt>, <Txt key="tb" p={[V[0] + 200, V[1] + 22]}>B</Txt>);
      nodos.push(<AngArco key="g" v={V} a1={0} a2={180} r={70} color={AMBAR} text="180°" dr={18} />);
      break;
    case 5:
      nodos.push(base, <Rayo key="a" v={V} a={0} len={300} />, <Rayo key="b" v={V} a={90} len={230} />, <Rayo key="c" v={V} a={35} len={260} color={VERDE} />, <Marca key="v" p={V} />);
      nodos.push(<AngArco key="g1" v={V} a1={0} a2={35} r={80} color={AMBAR} text="A" />, <AngArco key="g2" v={V} a1={35} a2={90} r={60} color={AZUL} text="B" />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>A + B = 90°</Txt>);
      break;
    case 6:
      nodos.push(<Seg key="a" a={[V[0] - 140, V[1]]} b={[V[0] + 300, V[1]]} w={1.8} />, <Rayo key="c" v={V} a={55} len={240} color={VERDE} />, <Marca key="v" p={V} />);
      nodos.push(<AngArco key="g1" v={V} a1={0} a2={55} r={80} color={AMBAR} text="A" />, <AngArco key="g2" v={V} a1={55} a2={180} r={55} color={AZUL} text="B" dr={16} />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>A + B = 180°</Txt>);
      break;
    case 7:
      nodos.push(<Rayo key="a" v={V} a={0} len={300} />, <Rayo key="c" v={V} a={30} len={260} color={VERDE} />, <Rayo key="b" v={V} a={75} len={240} />, <Marca key="v" p={V} />);
      nodos.push(<AngArco key="g1" v={V} a1={0} a2={30} r={85} color={AMBAR} text="α" />, <AngArco key="g2" v={V} a1={30} a2={75} r={65} color={AZUL} text="β" />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>comparten el vértice y un lado</Txt>);
      break;
    case 8: {
      const c: Pt = [310, 195];
      nodos.push(<Seg key="a" a={enCirculo(c, 200, 25)} b={enCirculo(c, 200, 205)} />, <Seg key="b" a={enCirculo(c, 200, 140)} b={enCirculo(c, 200, 320)} />, <Marca key="v" p={c} />, <Txt key="tv" p={[c[0] + 6, c[1] + 18]}>V</Txt>);
      nodos.push(<AngArco key="g1" v={c} a1={25} a2={140} r={55} color={AMBAR} text="α" />, <AngArco key="g2" v={c} a1={205} a2={320} r={55} color={AMBAR} text="α" dr={16} />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>los opuestos por el vértice son iguales</Txt>);
      break;
    }
    case 9:
      nodos.push(<Seg key="a" a={[V[0] - 150, V[1]]} b={[V[0] + 300, V[1]]} w={1.8} />, <Rayo key="b" v={V} a={60} len={240} />, <Marca key="v" p={V} />, <Txt key="tc" p={[V[0] - 150, V[1] + 20]}>C</Txt>, <Txt key="to" p={[V[0] - 4, V[1] + 20]}>O</Txt>, <Txt key="ta" p={[V[0] + 290, V[1] + 20]}>A</Txt>, <Txt key="tbb" p={[V[0] + 120, V[1] - 215]}>B</Txt>);
      nodos.push(<AngArco key="g1" v={V} a1={0} a2={60} r={80} color={AMBAR} text="α" />, <AngArco key="g2" v={V} a1={60} a2={180} r={55} color={AZUL} text="β" dr={16} />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>α y β son adyacentes: suman 180°</Txt>);
      break;
    case 10:
      nodos.push(<Rayo key="a" v={V} a={0} len={300} />, <Rayo key="b" v={V} a={45} len={250} />, <Rayo key="c" v={V} a={-45} len={220} />, <Marca key="v" p={V} />);
      nodos.push(<AngArco key="g1" v={V} a1={0} a2={45} r={90} color={VERDE} text="+" />, <AngArco key="g2" v={V} a1={-45} a2={0} r={90} color={AMBAR} text="−" />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>positivo: contrario a las agujas del reloj</Txt>);
      break;
    default: {
      const O: Pt = [140, 230];
      const M: Pt = [160, 340];
      nodos.push(<Rayo key="a" v={O} a={0} len={200} />, <Rayo key="b" v={O} a={52} len={190} />, <Marca key="o" p={O} />, <AngArco key="g1" v={O} a1={0} a2={52} r={55} color={AMBAR} text="α" />);
      nodos.push(<Rayo key="a2" v={[M[0] + 250, M[1] - 70]} a={0} len={200} />, <Rayo key="b2" v={[M[0] + 250, M[1] - 70]} a={52} len={190} />, <AngArco key="g2" v={[M[0] + 250, M[1] - 70]} a1={0} a2={52} r={55} color={AMBAR} text="α" />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>dos ángulos iguales miden lo mismo</Txt>);
    }
  }
  return (
    <Hoja scene="angulos-tipos" block={block} step={step} setStep={setStep} label="Hoja con los tipos de ángulos y sus relaciones" testId="bench-angulos-tipos">
      {nodos}
      <Titulo>{titulos[step]}</Titulo>
    </Hoja>
  );
}

/* ───────────── Ángulos en polígonos y circunferencias ───────────── */

export function AngulosCircunferencia({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const O: Pt = [310, 205];
  const R = 120;
  const nodos: ReactNode[] = [];
  const titulos = ["Cóncavo y convexo", "Ángulos interior y exterior de un polígono", "Ángulo central", "Ángulo inscrito", "Ángulo semiinscrito", "Ángulo interior a la circunferencia", "Ángulo exterior a la circunferencia"];
  const circ = <circle key="c" cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth="1.5" />;
  if (step === 0) {
    const conv: Pt[] = [[90, 300], [200, 120], [330, 100], [270, 300]];
    const conc: Pt[] = [[380, 300], [400, 120], [470, 200], [540, 120], [560, 300]];
    const path = (p: Pt[]) => `M${p.map((q) => q.join(" ")).join(" L")} Z`;
    nodos.push(<path key="a" d={path(conv)} fill="rgba(31,120,180,0.10)" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />, <path key="b" d={path(conc)} fill="rgba(31,157,85,0.10)" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />);
    nodos.push(<Txt key="ta" p={[130, 330]} color={AZUL} size={14}>B: convexo</Txt>, <Txt key="tb" p={[420, 330]} color={VERDE} size={14}>A: cóncavo</Txt>);
    nodos.push(<Arco key="ang" v={conc[2]} a1={-150} a2={-30} r={20} color={AMBAR} text="> 180°" textSize={12} dr={14} />);
  } else if (step === 1) {
    const P: Pt[] = [[150, 300], [180, 130], [360, 100], [440, 270]];
    nodos.push(<path key="p" d={`M${P.map((q) => q.join(" ")).join(" L")} Z`} fill="rgba(31,120,180,0.10)" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />);
    ["A", "B", "C", "D"].forEach((n, i) => nodos.push(<Marca key={`m${i}`} p={P[i]} />, <Txt key={`t${i}`} p={[P[i][0] + (i === 1 || i === 0 ? -20 : 8), P[i][1] + (i === 0 || i === 3 ? 20 : -8)]}>{n}</Txt>));
    nodos.push(<Seg key="ext" a={P[2]} b={[P[3][0] + (P[3][0] - P[2][0]) * 0.6, P[3][1] + (P[3][1] - P[2][1]) * 0.6]} color={AUX} w={1.4} dash="6 4" />, <Txt key="te" p={[P[3][0] + 14, P[3][1] + 52]} color={AMBAR} size={13}>D′: exterior</Txt>);
    nodos.push(<Txt key="ti" p={[24, 58]} color={VERDE} size={13}>A, B, C, D: ángulos interiores</Txt>);
  } else if (step === 2) {
    const A = enCirculo(O, R, 160);
    const B = enCirculo(O, R, 40);
    nodos.push(circ, <Seg key="a" a={O} b={A} color={AMBAR} w={2} />, <Seg key="b" a={O} b={B} color={AMBAR} w={2} />, <Marca key="o" p={O} />, <Marca key="pa" p={A} />, <Marca key="pb" p={B} />);
    nodos.push(<AngArco key="g" v={O} a1={40} a2={160} r={45} color={AMBAR} text="central" dr={18} />, <Txt key="n" p={[24, 56]} size={13}>el vértice está en el centro de la circunferencia</Txt>);
  } else if (step === 3) {
    const V = enCirculo(O, R, 270);
    const A = enCirculo(O, R, 160);
    const B = enCirculo(O, R, 40);
    nodos.push(circ, <Seg key="a" a={V} b={A} color={AMBAR} w={2} />, <Seg key="b" a={V} b={B} color={AMBAR} w={2} />, <Marca key="v" p={V} />, <Marca key="pa" p={A} />, <Marca key="pb" p={B} />);
    nodos.push(<AngArco key="g" v={V} a1={angDe(V, B)} a2={angDe(V, A)} r={40} color={AMBAR} text="inscrito" dr={18} />, <Txt key="n" p={[24, 56]} size={13}>el vértice está en la circunferencia y los lados la cortan</Txt>);
  } else if (step === 4) {
    const V = enCirculo(O, R, 270);
    const B = enCirculo(O, R, 40);
    nodos.push(circ, <Seg key="t" a={[V[0] - 180, V[1]]} b={[V[0] + 180, V[1]]} color={AMBAR} w={2} />, <Seg key="b" a={V} b={B} color={AMBAR} w={2} />, <Marca key="v" p={V} />, <Marca key="pb" p={B} />);
    nodos.push(<AngArco key="g" v={V} a1={0} a2={angDe(V, B)} r={50} color={AMBAR} text="semiinscrito" dr={20} />, <Txt key="n" p={[24, 56]} size={13}>un lado es tangente y el otro es una cuerda</Txt>);
  } else if (step === 5) {
    const P: Pt = [320, 195];
    nodos.push(circ, <Seg key="a" a={enCirculo(P, 160, 20)} b={enCirculo(P, 160, 200)} color={AMBAR} w={2} />, <Seg key="b" a={enCirculo(P, 160, 120)} b={enCirculo(P, 160, 300)} color={AMBAR} w={2} />, <Marca key="p" p={P} />);
    nodos.push(<AngArco key="g" v={P} a1={20} a2={120} r={36} color={AMBAR} text="interior" dr={18} />, <Txt key="n" p={[24, 56]} size={13}>el vértice es un punto interior; los lados son cuerdas</Txt>);
  } else {
    const P: Pt = [520, 205];
    const t1 = angDe(P, enCirculo(O, R, 150));
    nodos.push(circ, <Seg key="a" a={P} b={enCirculo(P, 340, 180 - 9)} color={AMBAR} w={2} />, <Seg key="b" a={P} b={enCirculo(P, 340, 180 + 24)} color={AMBAR} w={2} />, <Marca key="p" p={P} />);
    nodos.push(<AngArco key="g" v={P} a1={180 - 9} a2={180 + 24} r={70} color={AMBAR} text="exterior" dr={16} />, <Txt key="n" p={[24, 56]} size={13}>el vértice es exterior y los lados son secantes</Txt>);
    void t1;
  }
  return (
    <Hoja scene="angulos-circunferencia" block={block} step={step} setStep={setStep} label="Hoja con ángulos en polígonos y en la circunferencia" testId="bench-angulos-circ">
      {nodos}
      <Titulo>{titulos[step]}</Titulo>
    </Hoja>
  );
}

/* ───────────── Suma y diferencia de ángulos ───────────── */

const GA = 38;
const GB = 62;
const RA_ = 90;

/** Un ángulo de lado `a` y amplitud `ang`, con su arco y sus cuerdas. */
function AnguloCuerda({ v, ang, r, color, nombre, cuerda = true }: { v: Pt; ang: number; r: number; color: string; nombre: string; cuerda?: boolean }) {
  const p0 = enCirculo(v, r, 0);
  const p1 = enCirculo(v, r, ang);
  return (
    <g>
      <Rayo v={v} a={0} len={240} />
      <Rayo v={v} a={ang} len={230} />
      <ArcoPlano c={v} r={r} a1={0} a2={ang + 6} color={AUX} />
      {cuerda ? <Seg a={p0} b={p1} color={color} w={2} /> : null}
      <Marca p={v} />
      <AngArco v={v} a1={0} a2={ang} r={r * 0.55} color={color} text={nombre} />
    </g>
  );
}

export function SumaAngulos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  useProgreso(step, 1);
  const VA: Pt = [60, 150];
  const VB: Pt = [330, 150];
  const VC: Pt = [150, 330];
  const nodos: ReactNode[] = [];
  nodos.push(<AnguloCuerda key="a" v={VA} ang={GA} r={RA_} color={AMBAR} nombre="A" />, <AnguloCuerda key="b" v={VB} ang={GB} r={RA_} color={AZUL} nombre="B" />);
  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step >= 1) {
    nodos.push(<Rayo key="c0" v={VC} a={0} len={260} />, <Marca key="v" p={VC} />, <Txt key="tv" p={[VC[0] - 18, VC[1] + 18]}>V</Txt>, <ArcoPlano key="c1" c={VC} r={RA_} a1={0} a2={GA + GB + 8} color={AUX} />);
  }
  if (step >= 2) {
    const p1 = enCirculo(VC, RA_, GA);
    nodos.push(<Seg key="k1" a={enCirculo(VC, RA_, 0)} b={p1} color={AMBAR} w={2} />, <Marca key="m1" p={p1} color={AMBAR} />);
    nodos.push(<Rayo key="rA" v={VC} a={GA} len={230} color={AMBAR} w={1.4} />);
    if (step === 2) comp = poseCompas(enCirculo(VC, RA_, 0), p1);
  }
  if (step >= 3) {
    const p2 = enCirculo(VC, RA_, GA + GB);
    nodos.push(<Seg key="k2" a={enCirculo(VC, RA_, GA)} b={p2} color={AZUL} w={2} />, <Marca key="m2" p={p2} color={AZUL} />);
    nodos.push(<Rayo key="rB" v={VC} a={GA + GB} len={230} color={VERDE} w={2} />);
    if (step === 3) comp = poseCompas(enCirculo(VC, RA_, GA), p2);
  }
  if (step >= 4) nodos.push(<AngArco key="g" v={VC} a1={0} a2={GA + GB} r={50} color={VERDE} text="C = A + B" dr={28} />);
  return (
    <Hoja scene="suma-angulos-compas" block={block} step={step} setStep={setStep} label="Hoja con dos ángulos y su suma con el compás" testId="bench-suma-angulos">
      {nodos}
      <Titulo>Suma de ángulos</Titulo>
      {comp ? (
        <g data-testid="bench-compas" pointerEvents="none">
          <Compas pose={comp.pose} open={comp.open} />
        </g>
      ) : null}
    </Hoja>
  );
}

export function DiferenciaAngulos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const VA: Pt = [60, 150];
  const VB: Pt = [330, 150];
  const VC: Pt = [150, 330];
  const nodos: ReactNode[] = [];
  nodos.push(<AnguloCuerda key="a" v={VA} ang={GB} r={RA_} color={AMBAR} nombre="A" />, <AnguloCuerda key="b" v={VB} ang={GA} r={RA_} color={AZUL} nombre="B" />);
  if (step >= 1) {
    const p1 = enCirculo(VC, RA_, GB);
    nodos.push(<Rayo key="c0" v={VC} a={0} len={260} />, <Marca key="v" p={VC} />, <Rayo key="rA" v={VC} a={GB} len={230} color={AMBAR} />, <ArcoPlano key="c1" c={VC} r={RA_} a1={0} a2={GB + 8} color={AUX} />, <Seg key="k1" a={enCirculo(VC, RA_, 0)} b={p1} color={AMBAR} w={2} />, <Marca key="m1" p={p1} color={AMBAR} />);
  }
  if (step >= 2) {
    const p1 = enCirculo(VC, RA_, GB);
    const p2 = enCirculo(VC, RA_, GB - GA);
    nodos.push(<Seg key="k2" a={p1} b={p2} color={AZUL} w={2} />, <Marca key="m2" p={p2} color={AZUL} />);
  }
  if (step >= 3) {
    nodos.push(<Rayo key="rC" v={VC} a={GB - GA} len={230} color={VERDE} w={2} />, <AngArco key="g" v={VC} a1={0} a2={GB - GA} r={50} color={VERDE} text="C = A − B" dr={28} />);
  }
  return (
    <Hoja scene="diferencia-angulos-compas" block={block} step={step} setStep={setStep} label="Hoja con dos ángulos y su diferencia con el compás" testId="bench-dif-angulos">
      {nodos}
      <Titulo>Diferencia de ángulos</Titulo>
    </Hoja>
  );
}

/* ───────────── Bisectriz (segundo método) y división de un ángulo ───────────── */

export function BisectrizSegundoMetodo({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step === 1 || step === 2 ? 3600 : step === 3 ? 3000 : 1);
  const A: Pt = [90, 200];
  const ang = 40;
  const r = 200;
  const p1 = enCirculo(A, r, -ang / 2);
  const p2 = enCirculo(A, r, ang / 2);
  const r2 = 270;
  const p3 = enCirculo(A, r2, -ang / 2);
  const p4 = enCirculo(A, r2, ang / 2);
  const B = ((): Pt => {
    // corte de 2-3 con 1-4 (se cruzan en la bisectriz)
    const d = (a: Pt, b: Pt, c: Pt, e: Pt): Pt => {
      const s1: Pt = [b[0] - a[0], b[1] - a[1]];
      const s2: Pt = [e[0] - c[0], e[1] - c[1]];
      const t = ((c[0] - a[0]) * s2[1] - (c[1] - a[1]) * s2[0]) / (s1[0] * s2[1] - s1[1] * s2[0]);
      return [a[0] + s1[0] * t, a[1] + s1[1] * t];
    };
    return d(p2, p3, p1, p4);
  })();
  const nodos: ReactNode[] = [];
  nodos.push(<Rayo key="a" v={A} a={-ang / 2} len={440} />, <Rayo key="b" v={A} a={ang / 2} len={440} />, <Marca key="v" p={A} />, <Txt key="ta" p={[A[0] - 18, A[1] + 18]}>A</Txt>);
  if (step >= 1) nodos.push(<ArcoAnim key="c1" c={A} r={r} a1={-ang / 2 - 6} a2={ang / 2 + 6} t={step === 1 ? p : 1} />, <Marca key="m1" p={p1} color={AMBAR} />, <Marca key="m2" p={p2} color={AMBAR} />, <Txt key="t1" p={[p1[0] + 6, p1[1] + 16]} color={AMBAR}>1</Txt>, <Txt key="t2" p={[p2[0] + 6, p2[1] - 6]} color={AMBAR}>2</Txt>);
  if (step >= 2) nodos.push(<ArcoAnim key="c2" c={A} r={r2} a1={-ang / 2 - 6} a2={ang / 2 + 6} t={step === 2 ? p : 1} />, <Marca key="m3" p={p3} color={AZUL} />, <Marca key="m4" p={p4} color={AZUL} />, <Txt key="t3" p={[p3[0] + 6, p3[1] + 16]} color={AZUL}>3</Txt>, <Txt key="t4" p={[p4[0] + 6, p4[1] - 6]} color={AZUL}>4</Txt>);
  if (step >= 3) nodos.push(<ReglaTrazando key="x1" a={p2} b={p3} p={step === 3 ? tramo(p, 0, 0.5) : 1} ext={0} color={AUX} />, <ReglaTrazando key="x2" a={p1} b={p4} p={step === 3 ? tramo(p, 0.5, 1) : 1} ext={0} color={AUX} />);
  if (step >= 4) nodos.push(<Marca key="b" p={B} color={VERDE} r={4.5} />, <Txt key="tb" p={[B[0] - 4, B[1] - 8]} color={VERDE} size={15}>B</Txt>, <ReglaTrazando key="bis" a={A} b={B} p={1} ext={90} color={VERDE} />, <Txt key="n" p={[24, 58]} color={VERDE} size={13}>bisectriz: la recta A–B</Txt>);
  return (
    <Hoja scene="bisectriz-segundo-metodo" block={block} step={step} setStep={setStep} label="Hoja con el segundo método de la bisectriz de un ángulo" testId="bench-bisectriz-2">
      {nodos}
      <Titulo>Bisectriz de un ángulo: segundo método</Titulo>
    </Hoja>
  );
}

export function DivisionAngulo({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const V: Pt = [90, 200];
  const ang = 64;
  const nodos: ReactNode[] = [];
  nodos.push(<Rayo key="a" v={V} a={-ang / 2} len={360} />, <Rayo key="b" v={V} a={ang / 2} len={360} />, <Marca key="v" p={V} />, <Txt key="tv" p={[V[0] - 20, V[1] + 18]}>V</Txt>);
  const lineas: number[][] = [[0], [-ang / 4, ang / 4], [-3 * ang / 8, -ang / 8, ang / 8, 3 * ang / 8]];
  const colores = [VERDE, AZUL, AMBAR];
  for (let n = 0; n <= Math.min(step, 2); n += 1) {
    lineas[n].forEach((a, i) => nodos.push(<Rayo key={`l${n}-${i}`} v={V} a={a} len={400} color={colores[n]} w={1.6} />));
    const rad = 120 + n * 35;
    nodos.push(<ArcoPlano key={`arc${n}`} c={V} r={rad} a1={-ang / 2 - 4} a2={ang / 2 + 4} color={AUX} />);
  }
  const etiq = ["bisectriz c: 2 partes iguales", "bisectrices d y e: 4 partes iguales", "y así: 8, 16… partes iguales"][Math.min(step, 2)];
  return (
    <Hoja scene="division-angulo-2n" block={block} step={step} setStep={setStep} label="Hoja con la división de un ángulo en 2, 4 y 8 partes iguales" testId="bench-division-angulo">
      {nodos}
      <Titulo sub={step === 0 ? "ángulo de vértice V y lados a y b" : etiq}>División de un ángulo en 2, 4, 8… partes iguales</Titulo>
    </Hoja>
  );
}

/* ───────────── Construcción de ángulos con el compás ───────────── */

export function ConstruccionAngulos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const O: Pt = [110, 300];
  const R = 190;
  const A: Pt = [O[0] + R, O[1]];
  const nodos: ReactNode[] = [];
  const titulos = ["60°", "30°", "15°", "45°", "22° 30′", "75°"];
  const base = [<Seg key="o" a={[40, O[1]]} b={[580, O[1]]} w={1.6} />, <Marca key="po" p={O} />, <Txt key="to" p={[O[0] - 18, O[1] + 18]}>O</Txt>, <Marca key="pa" p={A} />, <Txt key="ta" p={[A[0] - 4, A[1] + 18]}>A</Txt>];
  const ray = (a: number, color: string, nombre: string, w = 2) => [<Rayo key={`r${nombre}`} v={O} a={a} len={R + 30} color={color} w={w} />, <Txt key={`t${nombre}`} p={[enCirculo(O, R + 38, a)[0] - 4, enCirculo(O, R + 38, a)[1] - 4]} color={color}>{nombre}</Txt>];
  nodos.push(...base);
  if (step === 0) {
    const B = enCirculo(O, R, 60);
    nodos.push(<ArcoPlano key="c1" c={O} r={R} a1={0} a2={70} color={AUX} />, <ArcoPlano key="c2" c={A} r={R} a1={180} a2={110} color={AUX} />, <Marca key="b" p={B} color={AMBAR} r={4} />, ...ray(60, AMBAR, "b"), <AngArco key="g" v={O} a1={0} a2={60} r={60} color={AMBAR} text="60°" />);
    nodos.push(<Txt key="n" p={[24, 58]} color={AZUL} size={13}>arcos iguales con centros en O y en A</Txt>);
  } else if (step === 1) {
    nodos.push(<ArcoPlano key="c1" c={O} r={R} a1={0} a2={70} color={AUX} />, ...ray(60, AUX, "b", 1.2), ...ray(30, VERDE, "c"), <AngArco key="g" v={O} a1={0} a2={30} r={70} color={VERDE} text="30°" />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>bisectriz c del ángulo de 60°</Txt>);
  } else if (step === 2) {
    nodos.push(...ray(30, AUX, "c", 1.2), ...ray(15, VERDE, "d"), <AngArco key="g" v={O} a1={0} a2={15} r={110} color={VERDE} text="15°" />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>bisectriz d del ángulo de 30°</Txt>);
  } else if (step === 3) {
    const B = enCirculo(O, R, 90);
    nodos.push(<ArcoPlano key="c1" c={O} r={R} a1={0} a2={180} color={AUX} />, ...ray(90, AUX, "c", 1.2), ...ray(45, VERDE, "d"), <path key="r" d={`M${O[0] + 16} ${O[1]} v-16 h-16`} fill="none" stroke={AMBAR} strokeWidth="1.5" />, <AngArco key="g" v={O} a1={0} a2={45} r={80} color={VERDE} text="45°" />, <Marca key="b" p={B} />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>bisectriz d del ángulo AOC de 90°</Txt>);
  } else if (step === 4) {
    nodos.push(...ray(45, AUX, "d", 1.2), ...ray(22.5, VERDE, "e"), <AngArco key="g" v={O} a1={0} a2={22.5} r={130} color={VERDE} text="22° 30′" dr={18} />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>bisectriz del ángulo de 45°</Txt>);
  } else {
    nodos.push(...ray(60, AUX, "60°", 1.2), ...ray(90, AUX, "90°", 1.2), ...ray(75, VERDE, "d"), <AngArco key="g" v={O} a1={0} a2={75} r={95} color={VERDE} text="75°" dr={22} />, <Txt key="n" p={[24, 58]} color={AZUL} size={13}>60° + 15° = 75° (15° es la mitad de COB = 30°)</Txt>);
  }
  return (
    <Hoja scene="construccion-angulos" block={block} step={step} setStep={setStep} label="Hoja con la construcción de ángulos de 60°, 30°, 15°, 45°, 22° 30′ y 75°" testId="bench-construccion-angulos">
      {nodos}
      <Titulo>{`Ángulo de ${titulos[step]}`}</Titulo>
    </Hoja>
  );
}

/* ───────────── Paralela por un punto con el compás ───────────── */

export const PAR_P: Pt = [300, 150];
export const PAR_Y = 300;
export const PAR_R = 170;
const PAR_DX = Math.sqrt(PAR_R * PAR_R - (PAR_Y - PAR_P[1]) ** 2);
export const PAR_N: Pt = [PAR_P[0] + PAR_DX, PAR_Y];
export const PAR_M: Pt = [PAR_N[0] - PAR_R, PAR_Y];
export const PAR_R2: Pt = [PAR_P[0] + PAR_R, PAR_P[1]];

export function ParaleloCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step === 1 || step === 2 || step === 4 ? 3600 : 1);
  const MP = dist(PAR_M, PAR_P);
  const nodos: ReactNode[] = [];
  nodos.push(<Seg key="t" a={[60, PAR_Y]} b={[580, PAR_Y]} w={1.8} />, <Txt key="tt" p={[560, PAR_Y - 8]}>t</Txt>, <Marca key="p" p={PAR_P} />, <Txt key="tp" p={[PAR_P[0] - 18, PAR_P[1] - 8]}>P</Txt>);
  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step >= 1) nodos.push(<ArcoAnim key="a1" c={PAR_P} r={PAR_R} a1={-66} a2={6} t={step === 1 ? p : 1} />);
  if (step >= 1 && (step > 1 || p > 0.95)) nodos.push(<Marca key="n" p={PAR_N} color={AMBAR} r={4} />, <Txt key="tn" p={[PAR_N[0] - 4, PAR_N[1] + 20]} color={AMBAR}>N</Txt>);
  if (step >= 2) nodos.push(<ArcoAnim key="a2" c={PAR_N} r={PAR_R} a1={118} a2={182} t={step === 2 ? p : 1} />);
  if (step >= 2 && (step > 2 || p > 0.95)) nodos.push(<Marca key="m" p={PAR_M} color={AMBAR} r={4} />, <Txt key="tm" p={[PAR_M[0] - 16, PAR_M[1] + 20]} color={AMBAR}>M</Txt>);
  if (step === 3) nodos.push(<Seg key="mp" a={PAR_M} b={PAR_P} color={VERDE} w={2} dash="6 4" />);
  if (step >= 4) nodos.push(<ArcoAnim key="a3" c={PAR_N} r={MP} a1={36} a2={82} t={step === 4 ? p : 1} />, <Marca key="r" p={PAR_R2} color={VERDE} r={4.5} />, <Txt key="tr" p={[PAR_R2[0] + 6, PAR_R2[1] - 6]} color={VERDE} size={15}>R</Txt>);
  if (step >= 5) nodos.push(<ReglaTrazando key="par" a={PAR_P} b={PAR_R2} p={1} ext={90} color={VERDE} />, <Txt key="np" p={[24, 58]} color={VERDE} size={13}>p ∥ t por P</Txt>);
  if (step === 1) comp = poseCompas(PAR_P, enCirculo(PAR_P, PAR_R, lerp(-66, 6, p)));
  if (step === 2) comp = poseCompas(PAR_N, enCirculo(PAR_N, PAR_R, lerp(118, 182, p)));
  if (step === 3) comp = poseCompas(PAR_M, PAR_P);
  if (step === 4) comp = poseCompas(PAR_N, enCirculo(PAR_N, MP, lerp(36, 82, p)));
  return (
    <Hoja scene="paralelo-compas" block={block} step={step} setStep={setStep} label="Hoja con la paralela a una recta por un punto trazada con el compás" testId="bench-paralelo-compas">
      {nodos}
      {comp ? (
        <g data-testid="bench-compas" pointerEvents="none">
          <Compas pose={comp.pose} open={comp.open} />
        </g>
      ) : null}
      <Titulo>Paralela a t por un punto P</Titulo>
    </Hoja>
  );
}

export const ANGULOS_GEOM = { GA, GB };
