"use client";

import type { ReactNode } from "react";
import { clamp, enCirculo, type Pt } from "./geometry";
import { Compas, poseCompas } from "./instruments";
import { AMBAR, Arco, INK } from "./scenes";
import { ReglaTrazando, lerp, lerpP } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { ArcoPlano } from "./scenes-trazados";

/**
 * Línea de tiempo de una construcción con compás: cada acción pertenece a un paso de la escena y se anima en orden
 * (el compás sale, se pincha, se abre, gira trazando el arco, se lleva a otro punto, la regla traza la recta…).
 */
type Base = {
  /** Paso de la escena en el que ocurre. */
  paso: number;
  /** Último paso en el que sigue dibujado (por defecto, hasta el final). */
  hasta?: number;
  /** Anima esta acción más deprisa (construcciones largas y repetidas). */
  rapido?: boolean;
};

export type Acc = Base &
  (
    | { k: "entrar"; n: Pt; m: Pt }
    | { k: "ir"; n: Pt; m: Pt }
    | { k: "salir" }
    | { k: "arco"; c: Pt; r: number; a1: number; a2: number; color?: string }
    | { k: "marca"; p: Pt; color?: string; texto?: string; dx?: number; dy?: number }
    | { k: "rayo"; v: Pt; a: number; len: number; color?: string }
    | { k: "recta"; a: Pt; b: Pt; color?: string }
    | { k: "ang"; v: Pt; a1: number; a2: number; r: number; color: string; texto: string; dr?: number }
  );

const PESO: Record<Acc["k"], number> = { entrar: 0.8, ir: 0.65, salir: 0.6, arco: 1.2, marca: 0.2, rayo: 0.9, recta: 0.9, ang: 0.3 };
const peso = (a: Acc) => PESO[a.k] * (a.rapido ? 0.55 : 1);
const suave = (t: number) => t * t * (3 - 2 * t);
type Pose = { n: Pt; m: Pt };
const FUERA: Pt = [330, -130];

/** Duración total (en unidades de peso) de las acciones de un paso. */
export function pesoPaso(accs: Acc[], paso: number): number {
  return accs.filter((a) => a.paso === paso).reduce((s, a) => s + peso(a), 0);
}

/** Milisegundos que dura la animación de un paso (mínimo 1 si no hay nada que animar). */
export function msPaso(accs: Acc[], paso: number, msPorPeso = 1000): number {
  const w = pesoPaso(accs, paso);
  return w > 0 ? Math.round(w * msPorPeso) : 1;
}

/** Dibuja lo hecho hasta `step`, lo que se está haciendo en este instante (`p`, de 0 a 1) y el compás. */
export function montarLinea(accs: Acc[], step: number, p: number): { nodos: ReactNode[]; compas: ReactNode | null } {
  const nodos: ReactNode[] = [];
  const total = pesoPaso(accs, step);
  const habraCompas = accs.some((a) => a.paso === step && (a.k === "entrar" || a.k === "ir" || a.k === "arco" || a.k === "salir"));
  const e: { pose: Pose | null } = { pose: null };
  let acum = 0;
  accs.forEach((a, i) => {
    if (a.paso > step) return;
    const actual = a.paso === step;
    const w = peso(a);
    const t = actual ? clamp((p * total - acum) / w, 0, 1) : 1;
    if (actual) acum += w;
    const visible = step <= (a.hasta ?? Infinity);
    const key = `lt${i}`;
    switch (a.k) {
      case "entrar": {
        const destino: Pose = { n: a.n, m: a.m };
        if (t > 0) e.pose = { n: lerpP([a.n[0] + FUERA[0], a.n[1] + FUERA[1]], a.n, suave(t)), m: lerpP([a.m[0] + FUERA[0], a.m[1] + FUERA[1]], a.m, suave(t)) };
        if (t >= 1) e.pose = destino;
        break;
      }
      case "ir": {
        if (t > 0 && e.pose) e.pose = { n: lerpP(e.pose.n, a.n, suave(t)), m: lerpP(e.pose.m, a.m, suave(t)) };
        else if (t > 0) e.pose = { n: a.n, m: a.m };
        break;
      }
      case "salir": {
        if (t > 0 && e.pose) {
          const q = e.pose;
          e.pose = t >= 1 ? null : { n: lerpP(q.n, [q.n[0] + FUERA[0], q.n[1] + FUERA[1]], suave(t)), m: lerpP(q.m, [q.m[0] + FUERA[0], q.m[1] + FUERA[1]], suave(t)) };
        }
        break;
      }
      case "arco": {
        if (t > 0) e.pose = { n: a.c, m: enCirculo(a.c, a.r, lerp(a.a1, a.a2, t)) };
        if (visible && t > 0) nodos.push(<ArcoPlano key={key} c={a.c} r={a.r} a1={a.a1} a2={a.a1 + (a.a2 - a.a1) * t} color={a.color ?? "#6b7480"} />);
        break;
      }
      case "marca":
        if (visible && t > 0) {
          nodos.push(<circle key={key} cx={a.p[0]} cy={a.p[1]} r={3.6} fill={a.color ?? AMBAR} />);
          if (a.texto) nodos.push(<Txt key={`${key}t`} p={[a.p[0] + (a.dx ?? 6), a.p[1] + (a.dy ?? -8)]} color={a.color ?? AMBAR}>{a.texto}</Txt>);
        }
        break;
      case "rayo": {
        const fin = enCirculo(a.v, a.len, a.a);
        if (!visible || t <= 0) break;
        if (t >= 1) nodos.push(<Seg key={key} a={a.v} b={fin} color={a.color ?? INK} w={2} />);
        else nodos.push(<ReglaTrazando key={key} a={a.v} b={fin} p={t} ext={0} color={a.color ?? INK} />);
        break;
      }
      case "recta": {
        if (!visible || t <= 0) break;
        if (t >= 1) nodos.push(<Seg key={key} a={a.a} b={a.b} color={a.color ?? INK} w={1.6} />);
        else nodos.push(<ReglaTrazando key={key} a={a.a} b={a.b} p={t} ext={0} color={a.color ?? INK} />);
        break;
      }
      case "ang":
        if (visible && t > 0) nodos.push(<Arco key={key} v={a.v} a1={-a.a1} a2={-a.a2} r={a.r} color={a.color} text={a.texto} textSize={13} dr={a.dr ?? 14} />);
        break;
    }
  });
  const pp = e.pose;
  const compas = habraCompas && pp ? (() => {
    const c = poseCompas(pp.n, pp.m);
    return (
      <g data-testid="bench-compas" pointerEvents="none">
        <Compas pose={c.pose} open={c.open} />
      </g>
    );
  })() : null;
  return { nodos, compas };
}
