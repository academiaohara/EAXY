"use client";

import type { ReactNode } from "react";
import { AnimDesliza, AnimPerpendicular, type DatosDesliza } from "./escuadra-perpendicular";
import { angDe, dist, enCirculo, type Pt } from "./geometry";
import { Compas, poseCompas } from "./instruments";
import { AMBAR, INK, type BenchBlock } from "./scenes";
import { ArcoCompas, CompasEn, Lamina, TransportadorMarca, VERDE_RELLENO, AnguloDato, Dato, usePasoAnim } from "./scenes-construcciones";
import { MSHEET, MV, Practica, ReglaTrazando, animParaleloEscuadra, lerp, tramo, type Def, type Est } from "./scenes-compas";
import { CONSTRUCCIONES, etiqueta, fasesPractica, instrumentoAngulo, type Construccion, type ConstruccionId, type Op } from "./construcciones-datos";
import { Seg } from "./scenes-proporcion";
import { AUX, Circ, Dot, Poli } from "./scenes-teoria";
import { Punto } from "./scenes-trazados";

/**
 * Animación paso a paso y práctica interactiva de las construcciones de `construcciones-datos.ts`. La práctica reproduce
 * la animación con los instrumentos: el alumno toma las medidas, clava el compás, traza los arcos, pasa la regla, etc.
 */
const vista = { ...MV, sheet: MSHEET };
const C = (id: ConstruccionId) => CONSTRUCCIONES[id] as Construccion;
const pt = (c: Construccion, n: string): Pt => c.pts[n];

/** Datos de la hoja que no cambian: nombres de los puntos que se rotulan y centro de la figura (para colocar los rótulos). */
function centroFigura(c: Construccion): Pt {
  const ps = Object.entries(c.pts).filter(([k]) => !k.startsWith("_") && !c.datos.some((d) => d.a === k || d.b === k || d.mitad === k)).map(([, p]) => p);
  return [ps.reduce((a, p) => a + p[0], 0) / ps.length, ps.reduce((a, p) => a + p[1], 0) / ps.length];
}

function Rotulo({ c, n, color = INK }: { c: Construccion; n: string; color?: string }) {
  const p = pt(c, n);
  const g = centroFigura(c);
  const dx = p[0] >= g[0] ? 8 : -8 - 7 * etiqueta(n).length;
  const dy = p[1] > 345 ? -8 : p[1] >= g[1] ? 18 : -9;
  return (
    <g>
      <Dot p={p} color={color} r={3.2} />
      <Punto p={p} nombre={etiqueta(n)} dx={dx} dy={dy} color={color} />
    </g>
  );
}

/** Radio del compás en la operación `i`: la última medida tomada antes. */
function radioEn(c: Construccion, i: number): number {
  for (let j = i; j >= 0; j -= 1) {
    const o = c.ops[j];
    if (o.k === "medir") return dist(pt(c, o.de), pt(c, o.a));
  }
  return 0;
}

/** Ángulos (absolutos) que recorre el arco de la operación. */
function angulosArco(c: Construccion, o: Extract<Op, { k: "arco" | "circulo" }>): [number, number] {
  const th = angDe(pt(c, o.c), pt(c, o.hacia));
  if (o.k === "circulo") return [th, th + 360];
  if (o.abs) return o.abs;
  const [lo, hi] = o.ang ?? [-12, 12];
  return [th + lo, th + hi];
}

const ms = (o: Op): number => {
  switch (o.k) {
    case "medir": return 1900;
    case "arco": return 2800;
    case "circulo": return 4200;
    case "recta": return 2000;
    case "perp": return 4200;
    case "angulo": return 3600;
    case "paralelas": return 2600 * o.marcas.length;
    case "lados": return 900 * o.pts.length + 500;
    default: return 1;
  }
};

/** Pasos de la animación: el de los datos y uno por operación (las marcas no son pasos). */
function plan(c: Construccion) {
  const ops: number[] = [];
  c.ops.forEach((o, i) => {
    if (o.k !== "marca") ops.push(i);
  });
  return { ops, ms: [1, ...ops.map((i) => ms(c.ops[i]))] };
}

/** Pasada del cartabón o la escuadra que traza un ángulo de 30°, 45° o 60°. */
function datosAngulo(c: Construccion, o: Extract<Op, { k: "angulo" }>): DatosDesliza {
  const v = pt(c, o.v);
  const signo = o.signo ?? 1;
  const largo = o.largo ?? 160;
  return { recta: [v, enCirculo(v, 100, o.base)], punto: v, traza: [v, enCirculo(v, largo, o.base + signo * o.obj)], angulo: { base: o.base, obj: o.obj, signo } };
}

/** Extremos de una recta de la regla, prolongada `ext` por cada lado. */
function prolongar(a: Pt, b: Pt, ext: number): [Pt, Pt] {
  const d = dist(a, b) || 1;
  const u: Pt = [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
  return [[a[0] - u[0] * ext, a[1] - u[1] * ext], [b[0] + u[0] * ext, b[1] + u[1] * ext]];
}

function BaseHoja({ c, visibles }: { c: Construccion; visibles: Set<string> }) {
  return (
    <g>
      {c.circulos?.map((x, i) => <Circ key={`c${i}`} c={pt(c, x.c)} r={x.r} color={AUX} w={1.4} />)}
      {c.base?.map(([a, b], i) => <Seg key={`b${i}`} a={pt(c, a)} b={pt(c, b)} color={AUX} w={1.4} />)}
      {c.datos.map((d) => (
        <g key={d.nombre}>
          <Dato a={pt(c, d.a)} b={pt(c, d.b)} nombre={d.nombre} color={d.color === "ambar" ? AMBAR : undefined} />
          {d.mitad ? <Seg a={[pt(c, d.mitad)[0], pt(c, d.mitad)[1] - 6]} b={[pt(c, d.mitad)[0], pt(c, d.mitad)[1] + 6]} color={INK} w={1.2} /> : null}
        </g>
      ))}
      {c.angDatos?.map((a) => <AnguloDato key={a.nombre} v={a.v} ang={a.ang} nombre={a.nombre} />)}
      {[...visibles].filter((n) => !n.startsWith("_") && !c.datos.some((d) => d.a === n || d.b === n || d.mitad === n)).map((n) => <Rotulo key={n} c={c} n={n} />)}
    </g>
  );
}

/* ───────────── Animación ───────────── */

export function ConstruccionAnim({ block, id }: { block: BenchBlock; id: ConstruccionId }) {
  const c = C(id);
  const pl = plan(c);
  const { step, setStep, p } = usePasoAnim(pl.ms);
  const o = step === 0 ? -1 : pl.ops[step - 1];
  const actual = o >= 0 ? c.ops[o] : null;
  const ext = c.ext ?? 30;

  // puntos a la vista: los dados y las marcas de las operaciones ya terminadas (las de la actual, al acabarla)
  const visibles = new Set<string>(c.dados);
  c.ops.forEach((x, j) => {
    if (x.k !== "marca") return;
    let previa = j - 1;
    while (previa >= 0 && c.ops[previa].k === "marca") previa -= 1;
    if (o > previa || (o === previa && p > 0.88)) visibles.add(x.p);
  });
  c.ops.forEach((x, j) => {
    if (x.k === "paralelas" && (j < o || (j === o && p > 0.95))) x.cortes.forEach((q) => visibles.add(q));
  });

  /** Opacidad de un arco auxiliar: desaparece cuando una recta posterior «limpia» la hoja. */
  const opacidadArco = (j: number) => {
    let op = 1;
    c.ops.forEach((y, k) => {
      if (k > j && y.k === "recta" && y.limpia) {
        if (k < o) op = 0;
        else if (k === o) op = Math.min(op, 1 - tramo(p, 0.9, 1));
      }
    });
    return op;
  };

  /** Los trazos auxiliares que ya han dado su punto se aclaran para que no estorben. */
  const LUZ = 0.28;
  const luz = (j: number) => {
    const x = c.ops[j];
    let fin = -1; // índice de la operación tras la que el trazo ya no hace falta
    if (x.k === "arco") {
      let m = j + 1;
      while (m < c.ops.length && c.ops[m].k === "arco") m += 1;
      if (c.ops[m]?.k === "marca") {
        while (c.ops[m + 1]?.k === "marca") m += 1;
        fin = m;
      }
    } else if (x.k === "recta") {
      if (c.ops[j + 1]?.k === "marca") fin = j + 1;
      else {
        c.ops.forEach((y, k) => {
          if (k > j && y.k === "paralelas" && [...y.marcas, ...y.cortes].some((n) => n === x.a || n === x.b)) fin = k;
        });
      }
    }
    if (fin < 0) return 1;
    if (o > fin) return LUZ;
    if (o === fin) return 1 - (1 - LUZ) * tramo(p, 0.85, 1);
    return 1;
  };

  const nodos: ReactNode[] = [];
  let instrumento: ReactNode = null;
  const ultimoLados = c.ops.map((x) => x.k).lastIndexOf("lados");
  c.ops.forEach((x, j) => {
    if (j > o) return;
    const t = j === o ? p : 1;
    const key = `op${j}`;
    switch (x.k) {
      case "arco":
      case "circulo": {
        const fade = x.k === "arco" ? opacidadArco(j) : 1;
        if (fade <= 0) break;
        const r = radioEn(c, j);
        const [a1, a2] = angulosArco(c, x);
        nodos.push(
          <g key={key} opacity={fade * luz(j)}>
            {x.k === "circulo" && t >= 0.999 ? <circle cx={pt(c, x.c)[0]} cy={pt(c, x.c)[1]} r={r} fill="none" stroke={AUX} strokeWidth="1.4" /> : <ArcoCompas c={pt(c, x.c)} r={r} a1={a1} a2={a2} t={t} mostrarCompas={false} />}
          </g>,
        );
        if (j === o && t > 0 && t < 1) {
          const cp = poseCompas(pt(c, x.c), enCirculo(pt(c, x.c), r, lerp(a1, a2, t)));
          instrumento = (
            <g data-testid="bench-compas" pointerEvents="none">
              <Compas pose={cp.pose} open={cp.open} />
            </g>
          );
        }
        break;
      }
      case "recta": {
        const [a, b] = prolongar(pt(c, x.a), pt(c, x.b), ext);
        nodos.push(<g key={key} opacity={luz(j)}><ReglaTrazando a={a} b={b} p={t} ext={0} color={AUX} w={1.1} /></g>);
        break;
      }
      case "perp":
        nodos.push(<AnimPerpendicular key={key} recta={[pt(c, x.recta[0]), pt(c, x.recta[1])]} punto={pt(c, x.punto)} linea={[pt(c, x.traza[0]), pt(c, x.traza[1])]} p={t} />);
        break;
      case "angulo": {
        if (instrumentoAngulo(x.obj)) {
          nodos.push(<AnimDesliza key={key} datos={datosAngulo(c, x)} p={t} />);
          break;
        }
        const largo = x.largo ?? 160;
        const v = pt(c, x.v);
        const fin = enCirculo(v, largo, x.base + (x.signo ?? 1) * x.obj);
        if (j === o && p < 0.5) instrumento = <TransportadorMarca v={v} base={x.base} objetivo={x.obj} signo={x.signo ?? 1} t={tramo(p, 0, 0.5)} />;
        if (j < o || p >= 0.5) nodos.push(<ReglaTrazando key={key} a={v} b={fin} p={j < o ? 1 : tramo(p, 0.5, 1)} ext={0} color={AUX} w={1.1} />);
        break;
      }
      case "paralelas": {
        const n = x.marcas.length;
        x.marcas.forEach((m, k) => {
          const sub = j < o ? 1 : tramo(p, k / n, (k + 1) / n);
          if (sub <= 0) return;
          const r = animParaleloEscuadra(pt(c, x.recta[0]), pt(c, x.recta[1]), pt(c, m), [pt(c, m), pt(c, x.cortes[k])], sub, "#6b7480");
          nodos.push(<g key={`${key}-${k}`}>{r.nodos}</g>);
        });
        break;
      }
      case "lados": {
        const pts = x.pts.map((n) => pt(c, n));
        const n = pts.length;
        if (t >= 0.97 || j < o) nodos.push(<Poli key={key} pts={pts} color={INK} w={3} fill={j === ultimoLados ? VERDE_RELLENO : "none"} />);
        else
          pts.forEach((q, k) => {
            const sub = tramo(t, k / n, (k + 1) / n);
            if (sub > 0) nodos.push(<ReglaTrazando key={`${key}-${k}`} a={q} b={pts[(k + 1) % n]} p={sub} ext={0} color={INK} w={3} />);
          });
        break;
      }
      default:
        break;
    }
  });
  if (actual?.k === "medir") instrumento = <CompasEn n={pt(c, actual.de)} m={pt(c, actual.a)} opacidad={tramo(p, 0, 0.3)} />;

  return (
    <Lamina scene={`c-${id}`} block={block} step={step} setStep={setStep} label={c.titulo} titulo={c.titulo} testId={`bench-c-${id}`}>
      <BaseHoja c={c} visibles={visibles} />
      {nodos}
      {instrumento}
    </Lamina>
  );
}

/* ───────────── Práctica ───────────── */

type Meta = { op: Op; opIdx: number };

function defDe(id: ConstruccionId): Def {
  const c = C(id);
  const fases = fasesPractica(c);
  const meta: Meta[] = [];
  c.ops.forEach((o, i) => {
    if (o.k === "medir" || o.k === "marca" || o.k === "recta" || o.k === "perp" || o.k === "angulo") meta.push({ op: o, opIdx: i });
    else if (o.k === "arco" || o.k === "circulo") meta.push({ op: o, opIdx: i }, { op: o, opIdx: i });
    else if (o.k === "paralelas") o.marcas.forEach(() => meta.push({ op: o, opIdx: i }));
  });
  const arcos = c.ops.filter((o): o is Extract<Op, { k: "arco" | "circulo" }> => o.k === "arco" || o.k === "circulo");
  const inicioFase = (opIdx: number) => meta.findIndex((m) => m.opIdx === opIdx);
  const faseActual = (est: Est) => meta[est.fase]?.op;
  const lados = c.ops.filter((o): o is Extract<Op, { k: "lados" }> => o.k === "lados");

  return {
    scene: `c-${id}-practica`,
    fases,
    trazoFino: true,
    grosorAuto: 3,
    extTrazo: c.ext ?? 30,
    reiniciarEscuadra: true,
    autoLados: () => lados.flatMap((l) => l.pts.map((n, k) => [pt(c, n), pt(c, l.pts[(k + 1) % l.pts.length])] as [Pt, Pt])),
    papel: (est: Est) => {
      const visibles = new Set<string>(c.dados);
      meta.forEach((m, f) => {
        if (m.op.k === "marca" && est.fase > f) visibles.add(m.op.p);
        if (m.op.k === "paralelas" && est.fase > f) {
          const k = meta.slice(0, f + 1).filter((x) => x.op === m.op).length - 1;
          visibles.add(m.op.cortes[k]);
        }
      });
      const hecha = est.fase >= fases.length;
      return (
        <g>
          <BaseHoja c={c} visibles={visibles} />
          {c.ops.map((o, j) => {
            const f = inicioFase(j);
            if (f < 0 || est.fase <= f + (o.k === "arco" || o.k === "circulo" ? 1 : 0)) return null;
            if (o.k === "angulo" && !instrumentoAngulo(o.obj)) {
              const v = pt(c, o.v);
              return <Seg key={j} a={v} b={enCirculo(v, o.largo ?? 160, o.base + (o.signo ?? 1) * o.obj)} color={AUX} w={1.1} />;
            }
            if (o.k === "paralelas") {
              const hechas = meta.slice(0, est.fase).filter((x) => x.op === o).length;
              return (
                <g key={j}>
                  {o.marcas.slice(0, hechas).map((m, k) => (
                    <g key={k} data-testid="bench-paralela-trazada">
                      <Seg a={pt(c, m)} b={pt(c, o.cortes[k])} color="#6b7480" w={1.1} />
                    </g>
                  ))}
                </g>
              );
            }
            if (o.k === "circulo" && hecha) return <circle key={j} cx={pt(c, o.c)[0]} cy={pt(c, o.c)[1]} r={radioEn(c, j)} fill="none" stroke={AUX} strokeWidth="1.4" />;
            return null;
          })}
          {hecha ? lados.map((l, k) => <Poli key={`l${k}`} pts={l.pts.map((n) => pt(c, n))} color={INK} w={3} fill={k === lados.length - 1 ? VERDE_RELLENO : "none"} />) : null}
        </g>
      );
    },
    candidatos: (_est, idx) => {
      const o = arcos[idx];
      return o ? [pt(c, o.c)] : [];
    },
    medibles: (est) => {
      const o = faseActual(est);
      return o?.k === "medir" ? [pt(c, o.de), pt(c, o.a)] : [];
    },
    compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
    radioLim: () => [40, 215],
    radioIni: () => 100,
    rhoIni: (n) => {
      const o = arcos[n];
      if (!o) return 0;
      if (o.k === "circulo") return -175;
      const [a1, a2] = angulosArco(c, o);
      return -(Math.abs(a2 - a1) / 2 + 8);
    },
    arco: (_est, n, _r, centro) => {
      const o = arcos[n];
      if (o.k === "circulo") return { centro, base: 0, signo: 1, rhoMin: -180, rhoMax: 180, req: [-170, 170] };
      const [a1, a2] = angulosArco(c, o);
      const half = Math.abs(a2 - a1) / 2;
      return { centro, base: (a1 + a2) / 2, signo: 1, rhoMin: -Math.min(half + 20, 178), rhoMax: Math.min(half + 20, 178), req: [-(half - 4), half - 4] };
    },
    cortes: (est) => {
      const o = faseActual(est);
      if (o?.k === "marca") return [pt(c, o.p)];
      if (o?.k === "recta") return [pt(c, o.a), pt(c, o.b)];
      return [];
    },
    perpendicular: (est) => {
      const o = faseActual(est)!;
      if (o.k === "angulo") return datosAngulo(c, o);
      const q = o as Extract<Op, { k: "perp" }>;
      return { recta: [pt(c, q.recta[0]), pt(c, q.recta[1])], punto: pt(c, q.punto), traza: [pt(c, q.traza[0]), pt(c, q.traza[1])] };
    },
    angulo: (est) => {
      const o = faseActual(est) as Extract<Op, { k: "angulo" }>;
      return { centro: pt(c, o.v), base: o.base, objetivo: o.obj, largo: o.largo ?? 160, signo: o.signo };
    },
    escuadra: (est) => {
      const o = faseActual(est) as Extract<Op, { k: "paralelas" }>;
      // el motor indexa los objetivos por el nº de fases «escuadra» ya hechas: se rellena con los de las operaciones previas
      const previas = c.ops.slice(0, c.ops.indexOf(o)).reduce((n, x) => n + (x.k === "paralelas" ? x.marcas.length : 0), 0);
      const propios = o.marcas.map((m, k) => ({ marca: pt(c, m), corte: pt(c, o.cortes[k]) }));
      return { recta: [pt(c, o.recta[0]), pt(c, o.recta[1])], objetivos: [...Array.from({ length: previas }, () => propios[0]), ...propios] };
    },
    ocultarArcos: (est) => {
      const out: number[] = [];
      c.ops.forEach((o, j) => {
        if (o.k !== "recta" || !o.limpia) return;
        const f = inicioFase(j);
        if (est.fase <= f) return;
        let n = 0;
        c.ops.forEach((y, k) => {
          if (y.k === "arco" || y.k === "circulo") {
            if (k < j && y.k === "arco") out.push(n);
            n += 1;
          }
        });
      });
      return out;
    },
    evaluar: () => ({ ok: true, mensaje: `Correcto: ${c.titulo.charAt(0).toLowerCase()}${c.titulo.slice(1)}. Las líneas auxiliares van finas y la figura, en trazo grueso.` }),
  };
}

const cacheDefs = new Map<ConstruccionId, Def>();

export function ConstruccionPractica({ block, id }: { block: BenchBlock; id: ConstruccionId }) {
  let def = cacheDefs.get(id);
  if (!def) {
    def = defDe(id);
    cacheDefs.set(id, def);
  }
  return <Practica block={block} def={def} vista={vista} />;
}

