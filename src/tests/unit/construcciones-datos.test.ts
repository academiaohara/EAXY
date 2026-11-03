import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES, PASOS_CONSTRUCCION, type Construccion, type ConstruccionId, type P } from "@/components/lesson/bench/construcciones-datos";

const d = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const ids = Object.keys(CONSTRUCCIONES) as ConstruccionId[];

/** Recorre las operaciones llevando la cuenta del radio del compás y de los puntos ya visibles. */
function recorrer(c: Construccion) {
  const visibles = new Set<string>([...c.dados, ...c.datos.flatMap((x) => [x.a, x.b, ...(x.mitad ? [x.mitad] : [])])]);
  let radio: number | null = null;
  const problemas: string[] = [];
  const pt = (n: string): P => {
    const p = c.pts[n];
    if (!p) problemas.push(`punto desconocido ${n}`);
    return p ?? [0, 0];
  };
  const visible = (n: string, donde: string) => {
    if (!c.pts[n]) problemas.push(`${donde}: punto desconocido ${n}`);
    else if (!n.startsWith("_") && !visibles.has(n)) problemas.push(`${donde}: ${n} aún no está a la vista`);
  };
  c.ops.forEach((o, i) => {
    const donde = `op ${i} (${o.k})`;
    switch (o.k) {
      case "medir":
        visible(o.de, donde);
        visible(o.a, donde);
        radio = d(pt(o.de), pt(o.a));
        break;
      case "arco":
      case "circulo":
        visible(o.c, donde);
        if (radio === null) problemas.push(`${donde}: arco sin medida`);
        else if (Math.abs(d(pt(o.c), pt(o.hacia)) - radio) > 1.5) problemas.push(`${donde}: ${o.c}→${o.hacia} mide ${d(pt(o.c), pt(o.hacia)).toFixed(1)} y el compás ${radio.toFixed(1)}`);
        break;
      case "marca":
        if (!c.pts[o.p]) problemas.push(`${donde}: punto desconocido ${o.p}`);
        visibles.add(o.p);
        break;
      case "recta":
        visible(o.a, donde);
        visible(o.b, donde);
        break;
      case "perp": {
        const [a, b] = [pt(o.recta[0]), pt(o.recta[1])];
        const [t0, t1] = [pt(o.traza[0]), pt(o.traza[1])];
        visible(o.punto, donde);
        const u: P = [(b[0] - a[0]) / d(a, b), (b[1] - a[1]) / d(a, b)];
        const v: P = [(t1[0] - t0[0]) / d(t0, t1), (t1[1] - t0[1]) / d(t0, t1)];
        if (Math.abs(u[0] * v[0] + u[1] * v[1]) > 0.02) problemas.push(`${donde}: la traza no es perpendicular a la recta`);
        const p = pt(o.punto);
        const cruz = Math.abs((p[0] - t0[0]) * v[1] - (p[1] - t0[1]) * v[0]);
        if (cruz > 1.5) problemas.push(`${donde}: la traza no pasa por ${o.punto}`);
        break;
      }
      case "angulo":
        visible(o.v, donde);
        break;
      case "paralelas":
        o.cortes.forEach((x) => visibles.add(x));
        break;
      case "lados":
        o.pts.forEach((x) => visible(x, donde));
        break;
      case "solucion":
        visible(o.c, donde);
        if (!c.pts[o.hacia]) problemas.push(`${donde}: punto desconocido ${o.hacia}`);
        if (o.hasta && !c.pts[o.hasta]) problemas.push(`${donde}: punto desconocido ${o.hasta}`);
        if (o.por && !c.pts[o.por]) problemas.push(`${donde}: punto desconocido ${o.por}`);
        break;
      case "curva":
        [o.a, o.c, o.b].forEach((x) => visible(x, donde));
        break;
      case "curvaPuntos":
        o.pts.forEach((x) => visible(x, donde));
        break;
      case "elipse":
        visible(o.c, donde);
        break;
    }
  });
  return problemas;
}

describe("construcciones del tema 5: datos", () => {
  it.each(ids)("%s: radios, puntos a la vista y perpendiculares coherentes", (id) => {
    expect(recorrer(CONSTRUCCIONES[id])).toEqual([]);
  });

  it.each(ids)("%s: el polígono final de los regulares tiene los lados iguales", (id) => {
    const c = CONSTRUCCIONES[id];
    const lados = c.ops.filter((o) => o.k === "lados");
    const ultimo = lados[lados.length - 1];
    if (!ultimo || ultimo.k !== "lados" || !/(division-(5|10|7|9|n|6-3|4-8)|pentagono|hexagono|heptagono|octogono|eneagono)/.test(id)) return;
    const v = ultimo.pts.map((n) => c.pts[n]);
    const L = v.map((p, i) => d(p, v[(i + 1) % v.length]));
    const media = L.reduce((a, b) => a + b, 0) / L.length;
    for (const l of L) expect(Math.abs(l - media) / media, `${id}: lados ${L.map((x) => x.toFixed(1)).join(", ")}`).toBeLessThan(id === "eneagono-lado" ? 0.05 : 0.025);
  });

  it("hay una escena de animación y otra de práctica por construcción, con pasos", () => {
    for (const id of ids) {
      expect(PASOS_CONSTRUCCION[`c-${id}`]).toBeGreaterThanOrEqual(2);
      expect(PASOS_CONSTRUCCION[`c-${id}-practica`]).toBeGreaterThanOrEqual(3);
    }
  });
});
