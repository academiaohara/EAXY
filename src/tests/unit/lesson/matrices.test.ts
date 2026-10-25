import { describe, expect, it } from "vitest";
import { adjuntoElemento, adjunta, caminos, contarMenores, desarrolloFila, det, escalonar, gaussJordan, inversa, mat, mEq, menorComplementario, mMul, mPow, mT, q, qText, rango } from "@/components/lesson/anim/matrices";

describe("álgebra de matrices exacta (2.º Bachillerato)", () => {
  it("multiplica A (2×3) por B (3×2) como en el libro", () => {
    const p = mMul(mat([[1, 2, 3], [4, 5, 6]]), mat([[2, 1], [3, 2], [4, 1]]))!;
    expect(mEq(p, mat([[20, 8], [47, 20]]))).toBe(true);
  });

  it("no multiplica cuando las dimensiones no encajan", () => {
    expect(mMul(mat([[1, 2]]), mat([[1, 2]]))).toBeNull();
  });

  it("calcula inversas por Gauss–Jordan y detecta las singulares", () => {
    const i1 = inversa(mat([[1, 2], [3, 4]]))!;
    expect(mEq(i1.inv, [[q(-2), q(1)], [q(3, 2), q(-1, 2)]])).toBe(true);
    const a = mat([[-1, 1, 2], [1, 0, 3], [4, 1, 1]]);
    const i3 = inversa(a)!;
    expect(qText(i3.inv[0]![0]!)).toBe("-3/16");
    expect(mEq(mMul(a, i3.inv)!, mat([[1, 0, 0], [0, 1, 0], [0, 0, 1]]))).toBe(true);
    expect(inversa(mat([[1, 2], [3, 6]]))).toBeNull();
  });

  it("anota las operaciones de Gauss–Jordan", () => {
    const p = gaussJordan(mat([[1, 2, 1, 0], [3, 4, 0, 1]]), 2);
    expect(p.map((x) => x.op)).toEqual(["", "F2 → F2 − 3·F1", "F2 → (−1/2)·F2", "F1 → F1 − 2·F2"]);
  });

  it("calcula rango, determinante y potencias", () => {
    expect(rango(mat([[0, 1, -3], [-1, 0, -4], [-1, 1, -7]]))).toBe(2);
    expect(rango(mat([[6, 3], [12, 6]]))).toBe(1);
    expect(qText(det(mat([[2, 1], [5, 3]])))).toBe("1");
    expect(mEq(mPow(mat([[0, -1], [1, 0]]), 4), mat([[1, 0], [0, 1]]))).toBe(true);
    expect(mEq(mT(mat([[1, 2, 3], [4, 5, 6]])), mat([[1, 4], [2, 5], [3, 6]]))).toBe(true);
    expect(escalonar(mat([[0, 1, -3], [-1, 0, -4], [-1, 1, -7]])).length).toBeGreaterThan(2);
  });

  it("cuenta caminos con las potencias de la matriz de adyacencia", () => {
    const g = [[0, 1, 0, 1], [0, 0, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
    expect(caminos(g, 2)).toEqual([[0, 0, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
  });
});

describe("determinantes, adjuntos y menores", () => {
  it("calcula determinantes de orden 2, 3 y 4", () => {
    expect(qText(det(mat([[2, 5], [1, 4]])))).toBe("3");
    expect(qText(det(mat([[1, 2, 3], [-1, 5, 1], [3, 6, -2]])))).toBe("-77");
    expect(qText(det(mat([[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]])))).toBe("160");
  });

  it("calcula menores, adjuntos y la matriz adjunta", () => {
    const B = mat([[1, 2, 3], [-1, 5, 1], [3, 6, -2]]);
    expect(qText(menorComplementario(B, 0, 1))).toBe("-1");
    expect(qText(adjuntoElemento(B, 0, 1))).toBe("1");
    expect(mEq(adjunta(B), mat([[-16, 1, -21], [22, -11, 0], [-13, -4, 7]]))).toBe(true);
    expect(mEq(mMul(B, mT(adjunta(B)))!, mat([[-77, 0, 0], [0, -77, 0], [0, 0, -77]]))).toBe(true);
  });

  it("desarrolla por adjuntos y cuenta menores no nulos", () => {
    const A = mat([[3, 1, 5], [2, 0, 3], [5, 7, 2]]);
    for (let i = 0; i < 3; i++) {
      expect(qText(desarrolloFila(A, i).total)).toBe("18");
    }
    expect(contarMenores(mat([[1, 3, 1, -2], [1, 4, 3, -1], [2, 3, -4, -7]]), 3)).toEqual({ total: 4, noNulos: 0 });
    expect(contarMenores(mat([[1, 0], [0, 1]]), 2)).toEqual({ total: 1, noNulos: 1 });
  });
});
