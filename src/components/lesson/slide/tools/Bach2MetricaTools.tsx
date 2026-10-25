"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { anguloPlanos, anguloRectaPlano, anguloRectas, decEs, dist2PuntoPlano, dist2PuntoRecta, dist2Rectas, planoTxt, posRectas, proyeccionPuntoPlano, proyeccionPuntoRecta, puntoTxt, raizRacional, simetrico, type Plano } from "@/components/lesson/anim/geo3d";
import { dot, normaTxt, type V3 } from "@/components/lesson/anim/vec3";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { MatrixEditor, gridFrom } from "@/components/lesson/slide/tools/matrix-ui";
import { Frame, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { q } from "@/components/lesson/anim/matrices";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f3 = (m: number[][], i: number): V3 => [m[i]![0]!, m[i]![1]!, m[i]![2]!];

const MODOS_ANG = ["Dos rectas", "Recta y plano", "Dos planos"];

/** `initial`: [modo (0–2)] y 6 valores: dos vectores (directores o normales), entre −9 y 9. */
export function AngulosEspacioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { modo: int(ini[0], 0, 0, 2), M: gridFrom(ini, 1, 2, 3, [[1, 1, 0], [1, 0, 0]]) };
  const [s, setS] = useState(init);
  const a = f3(s.M, 0);
  const b = f3(s.M, 1);
  const nulo = dot(a, a) === 0 || dot(b, b) === 0;
  const ang = nulo ? null : s.modo === 0 ? anguloRectas(a, b) : s.modo === 1 ? anguloRectaPlano(a, b) : anguloPlanos(a, b);
  const nombres = s.modo === 0 ? ["u (recta r)", "v (recta s)"] : s.modo === 1 ? ["v (recta)", "n (plano)"] : ["n₁ (plano 1)", "n₂ (plano 2)"];
  const formula = s.modo === 1 ? "sen α = |v·n| / (|v||n|)" : "cos α = |u·v| / (|u||v|)";
  return (
    <Frame
      hint={block.hint ?? "El ángulo entre rectas o entre planos es agudo (se usa el valor absoluto). Entre recta y plano se usa el seno con la normal del plano."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Ángulo entre…" value={s.modo} onChange={(modo) => setS((p) => ({ ...p, modo }))} items={MODOS_ANG.map((t, i) => ({ value: i, label: t }))} />
          <MatrixEditor name={`Filas ${nombres[0]}, ${nombres[1]}`} m={s.M} rows={2} cols={3} onChange={(M) => setS((p) => ({ ...p, M }))} />
        </>
      }
    >
      <p className="text-base text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-ae-formula">{formula}</p>
      <Readout>
        <Stat color={MANIM.yellow} label="Producto escalar" plain><span data-testid="tool-ae-dot">{String(dot(a, b))}</span></Stat>
        <Stat color={MANIM.blue} label="Módulos" plain><span data-testid="tool-ae-mod">{`${normaTxt(a)} y ${normaTxt(b)}`}</span></Stat>
        <Stat color={MANIM.green} label="Ángulo" plain><span data-testid="tool-ae-ang">{ang === null ? "no definido (vector nulo)" : `${decEs(ang, 2)}°`}</span></Stat>
      </Readout>
      {ang !== null && Math.abs(ang - 90) < 1e-9 ? <p className="text-base" style={{ color: MANIM.yellow }} data-testid="tool-ae-perp">Son perpendiculares.</p> : null}
    </Frame>
  );
}

const MODOS_PROY = ["Sobre un plano", "Sobre una recta", "Sobre un punto"];

/** `initial`: [modo (0–2)], P (3) y después: plano (4 valores) en modo 0, punto A y vector v (6) en modo 1, punto M (3) en modo 2. */
export function ProyeccionSimetricoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    modo: int(ini[0], 0, 0, 2),
    P: gridFrom(ini, 1, 1, 3, [[5, 2, 3]], -9, 9),
    pl: gridFrom(ini, 4, 1, 4, [[2, -1, 2, -4]], -9, 9),
    rc: gridFrom(ini, 4, 2, 3, [[2, 2, 1], [3, 1, 2]], -9, 9),
    pm: gridFrom(ini, 4, 1, 3, [[0, -1, 2]], -9, 9),
  };
  const [s, setS] = useState(init);
  const P = f3(s.P, 0);
  const pl = s.pl[0] as Plano;
  const nulo = s.modo === 0 ? pl[0] === 0 && pl[1] === 0 && pl[2] === 0 : s.modo === 1 ? dot(f3(s.rc, 1), f3(s.rc, 1)) === 0 : false;
  const F = nulo ? null : s.modo === 0 ? proyeccionPuntoPlano(P, pl) : s.modo === 1 ? proyeccionPuntoRecta(P, f3(s.rc, 0), f3(s.rc, 1)) : f3(s.pm, 0).map((x) => q(x));
  const S = F ? simetrico(P, F) : null;
  return (
    <Frame
      hint={block.hint ?? "El simétrico de P es el punto S tal que el pie F de la perpendicular es el punto medio de PS: S = 2F − P."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Proyección y simétrico" value={s.modo} onChange={(modo) => setS((p) => ({ ...p, modo }))} items={MODOS_PROY.map((t, i) => ({ value: i, label: t }))} />
          <MatrixEditor name="Punto P" m={s.P} rows={1} cols={3} onChange={(P2) => setS((p) => ({ ...p, P: P2 }))} />
          {s.modo === 0 ? <MatrixEditor name="Plano A B C D" m={s.pl} rows={1} cols={4} onChange={(m) => setS((p) => ({ ...p, pl: m }))} color={MANIM.orange} /> : null}
          {s.modo === 1 ? <MatrixEditor name="Filas A, v (recta)" m={s.rc} rows={2} cols={3} onChange={(m) => setS((p) => ({ ...p, rc: m }))} color={MANIM.orange} /> : null}
          {s.modo === 2 ? <MatrixEditor name="Punto M" m={s.pm} rows={1} cols={3} onChange={(m) => setS((p) => ({ ...p, pm: m }))} color={MANIM.orange} /> : null}
        </>
      }
    >
      {s.modo === 0 ? <p className="text-base" data-testid="tool-ps-plano">{`Plano: ${planoTxt(pl)}`}</p> : null}
      <Readout>
        <Stat color={MANIM.green} label={s.modo === 2 ? "Punto M (pie)" : "Pie de la perpendicular F"} plain><span data-testid="tool-ps-pie">{F ? puntoTxt(F) : "datos no válidos"}</span></Stat>
        <Stat color={MANIM.purple} label="Simétrico P′ = 2F − P" plain><span data-testid="tool-ps-sim">{S ? puntoTxt(S) : "—"}</span></Stat>
      </Readout>
    </Frame>
  );
}

const MODOS_DIST = ["Punto – plano", "Punto – recta", "Dos rectas"];

/** `initial`: [modo (0–2)]; modo 0: P (3) y plano (4); modo 1: P (3), A (3), v (3); modo 2: P, u, Q, v (12). */
export function DistanciasEspacioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    modo: int(ini[0], 0, 0, 2),
    pp: gridFrom(ini, 1, 1, 3, [[1, 1, 3]], -9, 9),
    pl: gridFrom(ini, 4, 1, 4, [[2, -1, 1, 3]], -9, 9),
    pr: gridFrom(ini, 1, 3, 3, [[1, 3, 1], [0, 0, 0], [3, 0, 0]], -9, 9),
    rr: gridFrom(ini, 1, 4, 3, [[0, 0, 0], [1, 0, 0], [0, 0, 5], [0, 1, 0]], -9, 9),
  };
  const [s, setS] = useState(init);
  const pl = s.pl[0] as Plano;
  let d2 = null as ReturnType<typeof dist2PuntoPlano> | null;
  let nota = "";
  if (s.modo === 0 && (pl[0] || pl[1] || pl[2])) d2 = dist2PuntoPlano(f3(s.pp, 0), pl);
  if (s.modo === 1 && dot(f3(s.pr, 2), f3(s.pr, 2)) > 0) d2 = dist2PuntoRecta(f3(s.pr, 0), f3(s.pr, 1), f3(s.pr, 2));
  if (s.modo === 2) {
    const [P, u, Q, v] = [f3(s.rr, 0), f3(s.rr, 1), f3(s.rr, 2), f3(s.rr, 3)];
    if (dot(u, u) > 0 && dot(v, v) > 0) {
      const pos = posRectas(P, u, Q, v);
      d2 = pos.tipo === "secantes" || pos.tipo === "coincidentes" ? { n: 0, d: 1 } : dist2Rectas(P, u, Q, v);
      nota = { secantes: "Son secantes: distancia 0.", coincidentes: "Son la misma recta: distancia 0.", paralelas: "Paralelas: distancia de un punto de una a la otra.", cruzan: "Se cruzan: distancia = |[u, v, PQ]| / |u × v|." }[pos.tipo];
    }
  }
  return (
    <Frame
      hint={block.hint ?? "Todas las distancias salen de un cociente: un producto vectorial o mixto (o la ecuación del plano) entre un módulo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Distancia entre…" value={s.modo} onChange={(modo) => setS((p) => ({ ...p, modo }))} items={MODOS_DIST.map((t, i) => ({ value: i, label: t }))} />
          {s.modo === 0 ? (
            <>
              <MatrixEditor name="Punto P" m={s.pp} rows={1} cols={3} onChange={(m) => setS((p) => ({ ...p, pp: m }))} />
              <MatrixEditor name="Plano A B C D" m={s.pl} rows={1} cols={4} onChange={(m) => setS((p) => ({ ...p, pl: m }))} color={MANIM.orange} />
            </>
          ) : null}
          {s.modo === 1 ? <MatrixEditor name="Filas P, A, v" m={s.pr} rows={3} cols={3} onChange={(m) => setS((p) => ({ ...p, pr: m }))} /> : null}
          {s.modo === 2 ? <MatrixEditor name="Filas P, u, Q, v" m={s.rr} rows={4} cols={3} onChange={(m) => setS((p) => ({ ...p, rr: m }))} /> : null}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Distancia exacta" plain><span data-testid="tool-de-exacta">{d2 ? raizRacional(d2) : "datos no válidos"}</span></Stat>
        <Stat color={MANIM.green} label="Valor aproximado" plain><span data-testid="tool-de-dec">{d2 ? decEs(Math.sqrt(d2.n / d2.d), 3) : "—"}</span></Stat>
      </Readout>
      {nota ? <p className="text-base" data-testid="tool-de-nota">{nota}</p> : null}
    </Frame>
  );
}
