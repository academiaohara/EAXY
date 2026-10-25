import { describe, expect, it } from "vitest";
import { callPython, pyRepr, runPython, PyFloat } from "@/lib/lesson/mini-python";

const out = (src: string) => runPython(src, { maxSteps: 2000 });

describe("mini-python: expresiones y tipos", () => {
  it("distingue enteros y decimales como Python", () => {
    expect(out("print(7 / 2)\nprint(6 / 3)\nprint(7 // 2)\nprint(-7 // 2)\nprint(7 % 3)\nprint(-7 % 3)\nprint(2 ** 10)\nprint(2 ** -1)").output).toEqual(["3.5", "2.0", "3", "-4", "1", "2", "1024", "0.5"]);
  });

  it("suma de decimales con el error típico de coma flotante", () => {
    expect(out("print(0.1 + 0.2)").output).toEqual(["0.30000000000000004"]);
  });

  it("cadenas, f-strings y conversiones", () => {
    const r = out('nombre = "Ana"\nedad = 16\nprint("Hola " + nombre)\nprint(f"{nombre} tiene {edad} años")\nprint(f"{3.14159:.2f}")\nprint(int("42") + 1)\nprint(float("2.5") * 2)\nprint(str(5) + "5")\nprint("ab" * 3)');
    expect(r.error).toBeUndefined();
    expect(r.output).toEqual(["Hola Ana", "Ana tiene 16 años", "3.14", "43", "5.0", "55", "ababab"]);
  });

  it("operadores lógicos, comparaciones encadenadas y pertenencia", () => {
    expect(out("x = 5\nprint(1 < x < 10)\nprint(x > 3 and x < 4)\nprint(not x == 5)\nprint(3 in [1, 2, 3])\nprint('a' in 'casa')\nprint(x != 4 or False)").output).toEqual(["True", "False", "False", "True", "True", "True"]);
  });

  it("funciones integradas", () => {
    expect(out("print(len('hola'), abs(-3), max(3, 9, 4), min([5, 2, 8]), sum([1, 2, 3]), round(2.5), round(3.5), round(3.14159, 2))\nprint(sorted([3, 1, 2]))\nprint(list_ok)").error?.kind).toBe("NameError");
    expect(out("print(len('hola'), abs(-3), max(3, 9, 4), min([5, 2, 8]), sum([1, 2, 3]), round(2.5), round(3.5), round(3.14159, 2))\nprint(sorted([3, 1, 2]))").output).toEqual(["4 3 9 2 6 2 4 3.14", "[1, 2, 3]"]);
  });

  it("listas: índices, índices negativos, append y asignación por índice", () => {
    expect(out("a = [10, 20, 30]\na.append(40)\na[0] = 5\nprint(a[0], a[-1], len(a))\nprint(a)").output).toEqual(["5 40 4", "[5, 20, 30, 40]"]);
  });
});

describe("mini-python: control de flujo", () => {
  it("if / elif / else", () => {
    const src = (n: number) => `nota = ${n}\nif nota >= 9:\n    r = "sobresaliente"\nelif nota >= 5:\n    r = "aprobado"\nelse:\n    r = "suspenso"\nprint(r)`;
    expect(out(src(9.5)).output).toEqual(["sobresaliente"]);
    expect(out(src(6)).output).toEqual(["aprobado"]);
    expect(out(src(2)).output).toEqual(["suspenso"]);
  });

  it("for con range, acumulador y break/continue", () => {
    expect(out("s = 0\nfor i in range(1, 5):\n    s += i\nprint(s)").output).toEqual(["10"]);
    expect(out("for i in range(5):\n    if i == 1:\n        continue\n    if i == 3:\n        break\n    print(i)").output).toEqual(["0", "2"]);
    expect(out("for x in [3, 4]:\n    print(x * 2)\nfor c in 'ab':\n    print(c)").output).toEqual(["6", "8", "a", "b"]);
  });

  it("while con contador", () => {
    expect(out("n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint('fin')").output).toEqual(["3", "2", "1", "fin"]);
  });

  it("funciones con parámetros, valor devuelto y ámbito", () => {
    const r = out("def cuadrado(x):\n    return x * x\ndef suma(a, b):\n    total = a + b\n    return total\nprint(cuadrado(5), suma(2, 3))");
    expect(r.output).toEqual(["25 5"]);
    expect(out("def f():\n    y = 1\nf()\nprint(y)").error?.kind).toBe("NameError");
  });

  it("recursión sencilla y límite de profundidad", () => {
    expect(out("def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\nprint(fact(5))").output).toEqual(["120"]);
    expect(out("def f(n):\n    return f(n + 1)\nf(0)").error?.kind).toBe("RecursionError");
  });

  it("intercambio con asignación múltiple", () => {
    expect(out("a = 1\nb = 2\na, b = b, a\nprint(a, b)").output).toEqual(["2 1"]);
  });
});

describe("mini-python: traza", () => {
  it("registra la línea y las variables antes de cada sentencia, y un paso final", () => {
    const r = runPython("a = 2\nb = a * 3\nprint(b)");
    expect(r.steps.map((s) => s.line)).toEqual([1, 2, 3, -1]);
    expect(r.steps[1]!.vars).toEqual({ a: "2" });
    expect(r.steps[3]!.vars).toEqual({ a: "2", b: "6" });
    expect(r.steps[2]!.outLen).toBe(0);
    expect(r.steps[3]!.outLen).toBe(1);
  });

  it("un bucle repite la línea del for en cada iteración", () => {
    const r = runPython("s = 0\nfor i in range(3):\n    s += i");
    expect(r.steps.filter((s) => s.line === 2)).toHaveLength(4);
    expect(r.steps[r.steps.length - 1]!.vars).toEqual({ s: "3", i: "2" });
  });

  it("dentro de una función el marco cambia", () => {
    const r = runPython("def doble(x):\n    return x * 2\ny = doble(4)");
    const dentro = r.steps.find((s) => s.frame === "doble");
    expect(dentro?.vars).toEqual({ x: "4" });
  });

  it("detiene los bucles infinitos con un mensaje claro", () => {
    const r = runPython("n = 1\nwhile n > 0:\n    n += 1", { maxSteps: 100 });
    expect(r.error?.kind).toBe("LimitError");
    expect(r.error?.msg).toContain("bucle infinito");
  });
});

describe("mini-python: errores en español", () => {
  it.each([
    ["print(1 / 0)", "ZeroDivisionError"],
    ["print(x)", "NameError"],
    ['print("a" + 1)', "TypeError"],
    ["a = [1]\nprint(a[3])", "IndexError"],
    ['print(int("abc"))', "ValueError"],
    ["if True\n    print(1)", "SyntaxError"],
    ["if True:\nprint(1)", "IndentationError"],
    ["print(1))", "SyntaxError"],
    ["x = ", "SyntaxError"],
    ['print("hola)', "SyntaxError"],
    ["  x = 1\ny = 2", "IndentationError"],
    ["for i in 5:\n    pass", "TypeError"],
  ])("%j produce %s", (src, kind) => {
    const r = out(src);
    expect(r.error?.kind).toBe(kind);
    expect(r.error?.msg.length).toBeGreaterThan(5);
    expect(r.error?.line).toBeGreaterThan(0);
  });

  it("informa del número de línea del error", () => {
    expect(out("a = 1\nb = 2\nc = a / 0").error?.line).toBe(3);
  });

  it("pide convertir texto y número", () => {
    expect(out('print("a" + 1)').error?.msg).toContain("convierte");
  });
});

describe("mini-python: callPython (pruebas automáticas)", () => {
  const src = "def clasifica(n):\n    if n < 0:\n        return 'negativo'\n    elif n == 0:\n        return 'cero'\n    return 'positivo'";
  it("llama a una función y devuelve su valor", () => {
    expect(callPython(src, "clasifica", [-3]).value).toBe("negativo");
    expect(callPython(src, "clasifica", [0]).value).toBe("cero");
    expect(callPython(src, "clasifica", [4]).value).toBe("positivo");
  });
  it("informa de funciones que faltan y de errores", () => {
    expect(callPython(src, "otra", [1]).error?.kind).toBe("NameError");
    expect(callPython("def f(x):\n    return x / 0", "f", [1]).error?.kind).toBe("ZeroDivisionError");
    expect(callPython("def f(x):\n    return x", "f", []).error?.kind).toBe("TypeError");
  });
  it("sin return devuelve None", () => {
    expect(callPython("def f(x):\n    y = x", "f", [1]).value).toBeNull();
    expect(pyRepr(null)).toBe("None");
    expect(pyRepr(new PyFloat(2))).toBe("2.0");
  });
});
