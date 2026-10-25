/**
 * Intérprete mínimo de un subconjunto de Python para las lecciones de programación.
 *
 * Objetivo: ejecutar programas cortos paso a paso (traza de líneas y variables) con mensajes de
 * error en español. No es Python completo: admite variables, operadores, cadenas (incluidas las
 * f-strings sencillas), listas, `if/elif/else`, `while`, `for … in`, `def`/`return`, `break`,
 * `continue`, `pass` y las funciones `print, len, range, int, float, str, abs, min, max, round,
 * sum, sorted, bool` y el método `append`. No ejecuta código arbitrario ni usa `eval`.
 */

/** Número decimal de Python (para distinguir `2.0` de `2`). */
export class PyFloat {
  constructor(public v: number) {}
}

export class PyRange {
  constructor(
    public start: number,
    public stop: number,
    public step: number,
  ) {}
  get length(): number {
    if (this.step > 0) return Math.max(0, Math.ceil((this.stop - this.start) / this.step));
    return Math.max(0, Math.ceil((this.start - this.stop) / -this.step));
  }
  at(i: number): number {
    return this.start + i * this.step;
  }
}

export type PyVal = number | string | boolean | null | PyFloat | PyRange | PyVal[];

type PyFunc = { kind: "func"; name: string; params: string[]; body: Stmt[]; line: number };
type Stored = PyVal | PyFunc;

export type PyErrorKind = "SyntaxError" | "IndentationError" | "NameError" | "TypeError" | "ValueError" | "ZeroDivisionError" | "IndexError" | "RecursionError" | "LimitError";

export class PyError extends Error {
  constructor(
    public kind: PyErrorKind,
    public msg: string,
    public line: number,
  ) {
    super(`${kind}: ${msg}`);
  }
}

export type TraceStep = {
  /** Línea (1 = primera) que se va a ejecutar; -1 en el paso final. */
  line: number;
  /** Función en la que estamos («<programa>» fuera de funciones). */
  frame: string;
  /** Variables visibles en ese marco, ya formateadas como en Python. */
  vars: Record<string, string>;
  /** Cuántas líneas de salida se han impreso hasta este paso. */
  outLen: number;
};

export type RunResult = {
  steps: TraceStep[];
  output: string[];
  error?: { kind: PyErrorKind; msg: string; line: number };
};

/* ───────────── Representación de valores ───────────── */

function typeName(v: Stored): string {
  if (v === null) return "NoneType";
  if (typeof v === "boolean") return "bool";
  if (typeof v === "number") return "int";
  if (typeof v === "string") return "str";
  if (v instanceof PyFloat) return "float";
  if (v instanceof PyRange) return "range";
  if (Array.isArray(v)) return "list";
  return "function";
}

function fmtFloat(x: number): string {
  if (Number.isNaN(x)) return "nan";
  if (!Number.isFinite(x)) return x > 0 ? "inf" : "-inf";
  if (Number.isInteger(x) && Math.abs(x) < 1e16) return x.toFixed(1);
  return String(x);
}

export function pyRepr(v: Stored): string {
  if (v === null) return "None";
  if (typeof v === "boolean") return v ? "True" : "False";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return `'${v.replace(/'/g, "\\'")}'`;
  if (v instanceof PyFloat) return fmtFloat(v.v);
  if (v instanceof PyRange) return v.step === 1 ? `range(${v.start}, ${v.stop})` : `range(${v.start}, ${v.stop}, ${v.step})`;
  if (Array.isArray(v)) return `[${v.map(pyRepr).join(", ")}]`;
  return `<función ${v.name}>`;
}

export function pyStr(v: Stored): string {
  return typeof v === "string" ? v : pyRepr(v);
}

/* ───────────── Léxico ───────────── */

type Tok = { t: "num" | "str" | "fstr" | "name" | "op" | "end"; v: string; f?: boolean; raw?: string };

const KEYWORDS = new Set(["and", "or", "not", "in", "True", "False", "None"]);

function tokenize(src: string, line: number): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i]!;
    if (c === " " || c === "\t") {
      i += 1;
      continue;
    }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(src[i + 1] ?? ""))) {
      const m = /^(\d+\.\d*|\.\d+|\d+)([eE][+-]?\d+)?/.exec(src.slice(i))!;
      toks.push({ t: "num", v: m[0], f: m[0].includes(".") || /[eE]/.test(m[0]) });
      i += m[0].length;
      continue;
    }
    if (/[A-Za-z_áéíóúñÁÉÍÓÚÑ]/.test(c)) {
      const m = /^[A-Za-z_0-9áéíóúñÁÉÍÓÚÑ]+/.exec(src.slice(i))!;
      const next = src[i + m[0].length];
      if ((m[0] === "f" || m[0] === "F") && (next === '"' || next === "'")) {
        const q = next;
        let j = i + 2;
        let s = "";
        while (j < src.length && src[j] !== q) {
          s += src[j];
          j += 1;
        }
        if (j >= src.length) throw new PyError("SyntaxError", "falta cerrar las comillas de la cadena", line);
        toks.push({ t: "fstr", v: s });
        i = j + 1;
        continue;
      }
      toks.push({ t: "name", v: m[0] });
      i += m[0].length;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      let s = "";
      while (j < src.length && src[j] !== c) {
        if (src[j] === "\\" && j + 1 < src.length) {
          const e = src[j + 1]!;
          s += e === "n" ? "\n" : e === "t" ? "\t" : e;
          j += 2;
        } else {
          s += src[j];
          j += 1;
        }
      }
      if (j >= src.length) throw new PyError("SyntaxError", "falta cerrar las comillas de la cadena", line);
      toks.push({ t: "str", v: s });
      i = j + 1;
      continue;
    }
    const three = src.slice(i, i + 3);
    const two = src.slice(i, i + 2);
    if (three === "**=" || three === "//=") {
      toks.push({ t: "op", v: three });
      i += 3;
    } else if (["==", "!=", "<=", ">=", "//", "**", "+=", "-=", "*=", "/=", "%="].includes(two)) {
      toks.push({ t: "op", v: two });
      i += 2;
    } else if ("+-*/%<>()[],.:=".includes(c)) {
      toks.push({ t: "op", v: c });
      i += 1;
    } else {
      throw new PyError("SyntaxError", `carácter no válido: '${c}'`, line);
    }
  }
  toks.push({ t: "end", v: "" });
  return toks;
}

/* ───────────── Sintaxis de expresiones ───────────── */

type Expr =
  | { t: "const"; v: PyVal }
  | { t: "name"; n: string }
  | { t: "fstr"; parts: (string | { e: Expr; spec: string })[] }
  | { t: "list"; items: Expr[] }
  | { t: "bin"; op: string; l: Expr; r: Expr }
  | { t: "neg"; e: Expr }
  | { t: "not"; e: Expr }
  | { t: "bool"; op: "and" | "or"; l: Expr; r: Expr }
  | { t: "cmp"; first: Expr; rest: { op: string; e: Expr }[] }
  | { t: "call"; fn: Expr; args: Expr[] }
  | { t: "index"; e: Expr; i: Expr }
  | { t: "attr"; e: Expr; n: string };

class ExprParser {
  private p = 0;
  constructor(
    private toks: Tok[],
    private line: number,
  ) {}
  private get cur() {
    return this.toks[this.p]!;
  }
  private err(msg: string): never {
    throw new PyError("SyntaxError", msg, this.line);
  }
  private isOp(v: string) {
    return this.cur.t === "op" && this.cur.v === v;
  }
  private isKw(v: string) {
    return this.cur.t === "name" && this.cur.v === v;
  }
  done() {
    return this.cur.t === "end";
  }
  parseAll(): Expr {
    const e = this.or();
    if (!this.done()) this.err(`expresión no válida cerca de «${this.cur.v}»`);
    return e;
  }
  /** Lista de expresiones separadas por comas (hasta el final). */
  parseList(): Expr[] {
    const out = [this.or()];
    while (this.isOp(",")) {
      this.p += 1;
      if (this.done()) break;
      out.push(this.or());
    }
    if (!this.done()) this.err(`expresión no válida cerca de «${this.cur.v}»`);
    return out;
  }
  private or(): Expr {
    let l = this.and();
    while (this.isKw("or")) {
      this.p += 1;
      l = { t: "bool", op: "or", l, r: this.and() };
    }
    return l;
  }
  private and(): Expr {
    let l = this.not();
    while (this.isKw("and")) {
      this.p += 1;
      l = { t: "bool", op: "and", l, r: this.not() };
    }
    return l;
  }
  private not(): Expr {
    if (this.isKw("not")) {
      this.p += 1;
      return { t: "not", e: this.not() };
    }
    return this.cmp();
  }
  private cmp(): Expr {
    const first = this.add();
    const rest: { op: string; e: Expr }[] = [];
    for (;;) {
      let op: string | null = null;
      if (this.cur.t === "op" && ["==", "!=", "<", ">", "<=", ">="].includes(this.cur.v)) {
        op = this.cur.v;
        this.p += 1;
      } else if (this.isKw("in")) {
        op = "in";
        this.p += 1;
      } else if (this.isKw("not") && this.toks[this.p + 1]?.v === "in") {
        op = "not in";
        this.p += 2;
      }
      if (!op) break;
      rest.push({ op, e: this.add() });
    }
    return rest.length ? { t: "cmp", first, rest } : first;
  }
  private add(): Expr {
    let l = this.mul();
    while (this.isOp("+") || this.isOp("-")) {
      const op = this.cur.v;
      this.p += 1;
      l = { t: "bin", op, l, r: this.mul() };
    }
    return l;
  }
  private mul(): Expr {
    let l = this.unary();
    while (this.cur.t === "op" && ["*", "/", "//", "%"].includes(this.cur.v)) {
      const op = this.cur.v;
      this.p += 1;
      l = { t: "bin", op, l, r: this.unary() };
    }
    return l;
  }
  private unary(): Expr {
    if (this.isOp("-")) {
      this.p += 1;
      return { t: "neg", e: this.unary() };
    }
    if (this.isOp("+")) {
      this.p += 1;
      return this.unary();
    }
    return this.pow();
  }
  private pow(): Expr {
    const base = this.postfix();
    if (this.isOp("**")) {
      this.p += 1;
      return { t: "bin", op: "**", l: base, r: this.unary() };
    }
    return base;
  }
  private postfix(): Expr {
    let e = this.atom();
    for (;;) {
      if (this.isOp("(")) {
        this.p += 1;
        const args: Expr[] = [];
        while (!this.isOp(")")) {
          if (this.done()) this.err("falta cerrar el paréntesis");
          args.push(this.or());
          if (this.isOp(",")) this.p += 1;
          else if (!this.isOp(")")) this.err("falta una coma o un paréntesis de cierre");
        }
        this.p += 1;
        e = { t: "call", fn: e, args };
      } else if (this.isOp("[")) {
        this.p += 1;
        const i = this.or();
        if (!this.isOp("]")) this.err("falta cerrar el corchete");
        this.p += 1;
        e = { t: "index", e, i };
      } else if (this.isOp(".")) {
        this.p += 1;
        if (this.cur.t !== "name") this.err("se esperaba un nombre tras el punto");
        e = { t: "attr", e, n: this.cur.v };
        this.p += 1;
      } else break;
    }
    return e;
  }
  private atom(): Expr {
    const c = this.cur;
    if (c.t === "num") {
      this.p += 1;
      return { t: "const", v: c.f ? new PyFloat(Number(c.v)) : Number(c.v) };
    }
    if (c.t === "str") {
      this.p += 1;
      return { t: "const", v: c.v };
    }
    if (c.t === "fstr") {
      this.p += 1;
      return { t: "fstr", parts: parseFString(c.v, this.line) };
    }
    if (c.t === "name") {
      this.p += 1;
      if (c.v === "True") return { t: "const", v: true };
      if (c.v === "False") return { t: "const", v: false };
      if (c.v === "None") return { t: "const", v: null };
      if (KEYWORDS.has(c.v)) this.err(`no se puede usar «${c.v}» aquí`);
      return { t: "name", n: c.v };
    }
    if (this.isOp("(")) {
      this.p += 1;
      const e = this.or();
      if (!this.isOp(")")) this.err("falta cerrar el paréntesis");
      this.p += 1;
      return e;
    }
    if (this.isOp("[")) {
      this.p += 1;
      const items: Expr[] = [];
      while (!this.isOp("]")) {
        if (this.done()) this.err("falta cerrar el corchete");
        items.push(this.or());
        if (this.isOp(",")) this.p += 1;
        else if (!this.isOp("]")) this.err("falta una coma o un corchete de cierre");
      }
      this.p += 1;
      return { t: "list", items };
    }
    return this.err(c.t === "end" ? "la expresión está incompleta" : `no entiendo «${c.v}»`);
  }
}

function parseFString(s: string, line: number): (string | { e: Expr; spec: string })[] {
  const parts: (string | { e: Expr; spec: string })[] = [];
  let lit = "";
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i]!;
    if (c === "{" && s[i + 1] === "{") {
      lit += "{";
      i += 1;
    } else if (c === "}" && s[i + 1] === "}") {
      lit += "}";
      i += 1;
    } else if (c === "{") {
      const j = s.indexOf("}", i);
      if (j < 0) throw new PyError("SyntaxError", "f-string: falta cerrar la llave", line);
      const inner = s.slice(i + 1, j);
      const colon = inner.lastIndexOf(":");
      const code = colon >= 0 ? inner.slice(0, colon) : inner;
      const spec = colon >= 0 ? inner.slice(colon + 1) : "";
      if (lit) parts.push(lit);
      lit = "";
      parts.push({ e: new ExprParser(tokenize(code, line), line).parseAll(), spec });
      i = j;
    } else lit += c;
  }
  if (lit) parts.push(lit);
  return parts;
}

function parseExpr(src: string, line: number): Expr {
  if (!src.trim()) throw new PyError("SyntaxError", "falta una expresión", line);
  return new ExprParser(tokenize(src, line), line).parseAll();
}

/* ───────────── Sintaxis de sentencias ───────────── */

type Stmt =
  | { k: "assign"; line: number; targets: Expr[]; values: Expr[]; op?: string }
  | { k: "expr"; line: number; e: Expr }
  | { k: "if"; line: number; branches: { cond: Expr | null; line: number; body: Stmt[] }[] }
  | { k: "while"; line: number; cond: Expr; body: Stmt[] }
  | { k: "for"; line: number; v: string; iter: Expr; body: Stmt[] }
  | { k: "def"; line: number; name: string; params: string[]; body: Stmt[] }
  | { k: "return"; line: number; e: Expr | null }
  | { k: "pass" | "break" | "continue"; line: number };

type Line = { n: number; indent: number; text: string };

function stripComment(s: string): string {
  let q: string | null = null;
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i]!;
    if (q) {
      if (c === q) q = null;
    } else if (c === '"' || c === "'") q = c;
    else if (c === "#") return s.slice(0, i);
  }
  return s;
}

/** Posición del `=` de asignación al nivel superior (fuera de paréntesis y cadenas), o -1. */
function findAssign(s: string): { at: number; op: string } | null {
  let depth = 0;
  let q: string | null = null;
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i]!;
    if (q) {
      if (c === q) q = null;
      continue;
    }
    if (c === '"' || c === "'") q = c;
    else if ("([".includes(c)) depth += 1;
    else if (")]".includes(c)) depth -= 1;
    else if (c === "=" && depth === 0) {
      const prev = s[i - 1] ?? "";
      const next = s[i + 1] ?? "";
      if (next === "=" || "=!<>".includes(prev)) {
        if (next === "=") i += 1;
        continue;
      }
      if (["+", "-", "*", "/", "%"].includes(prev)) {
        const two = s[i - 2] ?? "";
        if ((prev === "*" || prev === "/") && two === prev) return { at: i - 2, op: prev + prev };
        return { at: i - 1, op: prev };
      }
      return { at: i, op: "" };
    }
  }
  return null;
}

function splitTopCommas(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let q: string | null = null;
  let cur = "";
  for (const c of s) {
    if (q) {
      if (c === q) q = null;
      cur += c;
      continue;
    }
    if (c === '"' || c === "'") q = c;
    if ("([".includes(c)) depth += 1;
    if (")]".includes(c)) depth -= 1;
    if (c === "," && depth === 0) {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out.filter((x, i) => x.trim() || i < out.length - 1);
}

function parseProgram(src: string): Stmt[] {
  const lines: Line[] = [];
  src.split("\n").forEach((raw, i) => {
    const code = stripComment(raw).replace(/\s+$/, "");
    if (!code.trim()) return;
    const lead = /^[ \t]*/.exec(code)![0];
    lines.push({ n: i + 1, indent: lead.replace(/\t/g, "    ").length, text: code.slice(lead.length) });
  });
  let pos = 0;

  const block = (indent: number): Stmt[] => {
    const out: Stmt[] = [];
    while (pos < lines.length && lines[pos]!.indent === indent) {
      out.push(statement(indent));
    }
    if (pos < lines.length && lines[pos]!.indent > indent) {
      throw new PyError("IndentationError", "sangría inesperada: esta línea está más metida de lo que toca", lines[pos]!.n);
    }
    return out;
  };

  const body = (header: Line): Stmt[] => {
    const next = lines[pos];
    if (!next || next.indent <= header.indent) {
      throw new PyError("IndentationError", "se esperaba un bloque con sangría después de los dos puntos", header.n);
    }
    return block(next.indent);
  };

  const headerText = (l: Line, kw: string): string => {
    const t = l.text.slice(kw.length).trim();
    if (!t.endsWith(":")) throw new PyError("SyntaxError", `falta «:» al final de la línea «${kw}»`, l.n);
    return t.slice(0, -1).trim();
  };

  const statement = (indent: number): Stmt => {
    const l = lines[pos]!;
    pos += 1;
    const t = l.text;
    if (/^if\s/.test(t) || t.startsWith("if(")) {
      const branches: { cond: Expr | null; line: number; body: Stmt[] }[] = [{ cond: parseExpr(headerText(l, "if"), l.n), line: l.n, body: body(l) }];
      for (;;) {
        const nx = lines[pos];
        if (!nx || nx.indent !== indent) break;
        if (/^elif\s/.test(nx.text)) {
          pos += 1;
          branches.push({ cond: parseExpr(headerText(nx, "elif"), nx.n), line: nx.n, body: body(nx) });
        } else if (/^else\s*:/.test(nx.text)) {
          pos += 1;
          branches.push({ cond: null, line: nx.n, body: body(nx) });
          break;
        } else break;
      }
      return { k: "if", line: l.n, branches };
    }
    if (/^(elif|else)\b/.test(t)) throw new PyError("SyntaxError", `«${t.split(/[\s:]/)[0]}» sin un «if» antes`, l.n);
    if (/^while\s/.test(t)) return { k: "while", line: l.n, cond: parseExpr(headerText(l, "while"), l.n), body: body(l) };
    if (/^for\s/.test(t)) {
      const h = headerText(l, "for");
      const m = /^([A-Za-z_áéíóúñ][A-Za-z_0-9áéíóúñ]*)\s+in\s+(.+)$/.exec(h);
      if (!m) throw new PyError("SyntaxError", "el «for» debe tener la forma «for variable in secuencia:»", l.n);
      return { k: "for", line: l.n, v: m[1]!, iter: parseExpr(m[2]!, l.n), body: body(l) };
    }
    if (/^def\s/.test(t)) {
      const h = headerText(l, "def");
      const m = /^([A-Za-z_áéíóúñ][A-Za-z_0-9áéíóúñ]*)\s*\((.*)\)$/.exec(h);
      if (!m) throw new PyError("SyntaxError", "la definición debe tener la forma «def nombre(parámetros):»", l.n);
      const params = m[2]!.trim() ? m[2]!.split(",").map((p) => p.trim()) : [];
      if (params.some((p) => !/^[A-Za-z_áéíóúñ][A-Za-z_0-9áéíóúñ]*$/.test(p))) throw new PyError("SyntaxError", "parámetro no válido en la definición", l.n);
      return { k: "def", line: l.n, name: m[1]!, params, body: body(l) };
    }
    if (t === "pass" || t === "break" || t === "continue") return { k: t, line: l.n };
    if (t === "return" || t.startsWith("return ")) return { k: "return", line: l.n, e: t === "return" ? null : parseExpr(t.slice(7), l.n) };
    if (/[:]$/.test(t) && /^[a-z]+\b/.test(t) && !findAssign(t)) throw new PyError("SyntaxError", `sentencia no reconocida: «${t.split(/[\s(]/)[0]}»`, l.n);
    const asg = findAssign(t);
    if (asg) {
      const left = t.slice(0, asg.at).trim();
      const right = t.slice(asg.at + (asg.op ? asg.op.length + 1 : 1)).trim();
      if (!left || !right) throw new PyError("SyntaxError", "asignación incompleta", l.n);
      const targets = splitTopCommas(left).map((x) => parseExpr(x.trim(), l.n));
      for (const tg of targets) {
        if (tg.t !== "name" && tg.t !== "index") throw new PyError("SyntaxError", "no se puede asignar a esta expresión", l.n);
      }
      const values = splitTopCommas(right).map((x) => parseExpr(x.trim(), l.n));
      if (asg.op && (targets.length !== 1 || values.length !== 1)) throw new PyError("SyntaxError", "asignación aumentada no válida", l.n);
      if (targets.length !== values.length) throw new PyError("ValueError", `hay ${targets.length} variables y ${values.length} valores`, l.n);
      return { k: "assign", line: l.n, targets, values, op: asg.op || undefined };
    }
    return { k: "expr", line: l.n, e: parseExpr(t, l.n) };
  };

  const prog = block(lines[0]?.indent ?? 0);
  if (pos < lines.length) throw new PyError("IndentationError", "sangría incoherente en esta línea", lines[pos]!.n);
  return prog;
}

/* ───────────── Evaluación ───────────── */

type Frame = { name: string; vars: Map<string, Stored> };
type Signal = { s: "break" } | { s: "continue" } | { s: "return"; v: PyVal };

const isFloat = (v: unknown): v is PyFloat => v instanceof PyFloat;
const isNum = (v: PyVal): v is number | boolean | PyFloat => typeof v === "number" || typeof v === "boolean" || isFloat(v);
const num = (v: number | boolean | PyFloat): number => (isFloat(v) ? v.v : Number(v));

function truthy(v: PyVal): boolean {
  if (v === null) return false;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") return v.length > 0;
  if (isFloat(v)) return v.v !== 0;
  if (v instanceof PyRange) return v.length > 0;
  return v.length > 0;
}

function toList(v: PyVal, line: number): PyVal[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") return v.split("");
  if (v instanceof PyRange) return Array.from({ length: v.length }, (_, i) => v.at(i));
  throw new PyError("TypeError", `un objeto de tipo ${typeName(v)} no es iterable`, line);
}

function equal(a: PyVal, b: PyVal): boolean {
  if (isNum(a) && isNum(b)) return num(a) === num(b);
  if (typeof a === "string" && typeof b === "string") return a === b;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((x, i) => equal(x, b[i]!));
  return false;
}

function compare(a: PyVal, b: PyVal, op: string, line: number): boolean {
  if (isNum(a) && isNum(b)) {
    const x = num(a);
    const y = num(b);
    return op === "<" ? x < y : op === ">" ? x > y : op === "<=" ? x <= y : x >= y;
  }
  if (typeof a === "string" && typeof b === "string") return op === "<" ? a < b : op === ">" ? a > b : op === "<=" ? a <= b : a >= b;
  throw new PyError("TypeError", `no se puede comparar con «${op}» un valor de tipo ${typeName(a)} con otro de tipo ${typeName(b)}`, line);
}

function arith(op: string, a: PyVal, b: PyVal, line: number): PyVal {
  if (op === "+" && typeof a === "string" && typeof b === "string") return a + b;
  if (op === "+" && Array.isArray(a) && Array.isArray(b)) return [...a, ...b];
  if (op === "*" && typeof a === "string" && typeof b === "number") return b > 0 ? a.repeat(b) : "";
  if (op === "*" && typeof b === "string" && typeof a === "number") return a > 0 ? b.repeat(a) : "";
  if (op === "*" && Array.isArray(a) && typeof b === "number") return Array.from({ length: Math.max(0, b) }, () => a).flat();
  if (!isNum(a) || !isNum(b)) {
    const verbo = op === "+" ? "sumar" : op === "-" ? "restar" : op === "*" ? "multiplicar" : op === "**" ? "elevar" : "dividir";
    throw new PyError("TypeError", `no se puede ${verbo} un valor de tipo ${typeName(a)} con otro de tipo ${typeName(b)}${typeof a === "string" || typeof b === "string" ? " (convierte con int(), float() o str())" : ""}`, line);
  }
  const x = num(a);
  const y = num(b);
  const real = isFloat(a) || isFloat(b);
  const out = (v: number): PyVal => (real ? new PyFloat(v) : v);
  switch (op) {
    case "+":
      return out(x + y);
    case "-":
      return out(x - y);
    case "*":
      return out(x * y);
    case "/":
      if (y === 0) throw new PyError("ZeroDivisionError", "división por cero", line);
      return new PyFloat(x / y);
    case "//":
      if (y === 0) throw new PyError("ZeroDivisionError", "división entera por cero", line);
      return out(Math.floor(x / y));
    case "%":
      if (y === 0) throw new PyError("ZeroDivisionError", "módulo por cero", line);
      return out(x - Math.floor(x / y) * y);
    case "**":
      if (!real && y < 0) return new PyFloat(x ** y);
      return out(x ** y);
    default:
      throw new PyError("SyntaxError", `operador desconocido «${op}»`, line);
  }
}

function roundHalfEven(x: number): number {
  const f = Math.floor(x);
  const d = x - f;
  if (d < 0.5) return f;
  if (d > 0.5) return f + 1;
  return f % 2 === 0 ? f : f + 1;
}

type Ctx = {
  steps: TraceStep[];
  out: string[];
  maxSteps: number;
  trace: boolean;
  depth: number;
  globals: Frame;
  opCount: number;
};

function snapshot(fr: Frame): Record<string, string> {
  const o: Record<string, string> = {};
  for (const [k, v] of fr.vars) {
    if (typeof v === "object" && v !== null && !Array.isArray(v) && !isFloat(v) && !(v instanceof PyRange) && (v as PyFunc).kind === "func") continue;
    o[k] = pyRepr(v);
  }
  return o;
}

function record(ctx: Ctx, line: number, fr: Frame) {
  if (!ctx.trace) {
    ctx.opCount += 1;
    if (ctx.opCount > 200000) throw new PyError("LimitError", "el programa tarda demasiado: ¿hay un bucle infinito?", line);
    return;
  }
  ctx.steps.push({ line, frame: fr.name, vars: snapshot(fr), outLen: ctx.out.length });
  if (ctx.steps.length > ctx.maxSteps) throw new PyError("LimitError", `el programa se detuvo tras ${ctx.maxSteps} pasos: ¿hay un bucle infinito?`, line);
}

function lookup(name: string, fr: Frame, ctx: Ctx, line: number): Stored {
  if (fr.vars.has(name)) return fr.vars.get(name)!;
  if (ctx.globals.vars.has(name)) return ctx.globals.vars.get(name)!;
  throw new PyError("NameError", `el nombre «${name}» no está definido (¿lo has escrito igual o lo has creado antes?)`, line);
}

const BUILTINS = new Set(["print", "len", "range", "int", "float", "str", "abs", "min", "max", "round", "sum", "sorted", "bool", "input"]);

function callBuiltin(name: string, args: PyVal[], ctx: Ctx, line: number): PyVal {
  const argc = (lo: number, hi = lo) => {
    if (args.length < lo || args.length > hi) throw new PyError("TypeError", `${name}() recibe ${lo === hi ? lo : `entre ${lo} y ${hi}`} argumento(s) y le has pasado ${args.length}`, line);
  };
  switch (name) {
    case "print":
      ctx.out.push(args.map(pyStr).join(" "));
      return null;
    case "len": {
      argc(1);
      const v = args[0]!;
      if (typeof v === "string" || Array.isArray(v)) return v.length;
      if (v instanceof PyRange) return v.length;
      throw new PyError("TypeError", `len() no se puede usar con un valor de tipo ${typeName(v)}`, line);
    }
    case "range": {
      argc(1, 3);
      const ints = args.map((a) => {
        if (typeof a !== "number") throw new PyError("TypeError", `range() solo admite números enteros (has pasado ${typeName(a)})`, line);
        return a;
      });
      const [a, b, c] = ints;
      if (c === 0) throw new PyError("ValueError", "el paso de range() no puede ser 0", line);
      if (ints.length === 1) return new PyRange(0, a!, 1);
      return new PyRange(a!, b!, c ?? 1);
    }
    case "int": {
      argc(1);
      const v = args[0]!;
      if (typeof v === "number") return v;
      if (typeof v === "boolean") return Number(v);
      if (isFloat(v)) return Math.trunc(v.v);
      if (typeof v === "string") {
        if (!/^\s*[+-]?\d+\s*$/.test(v)) throw new PyError("ValueError", `int() no puede convertir el texto '${v}' en un entero`, line);
        return parseInt(v, 10);
      }
      throw new PyError("TypeError", `int() no admite un valor de tipo ${typeName(v)}`, line);
    }
    case "float": {
      argc(1);
      const v = args[0]!;
      if (isNum(v)) return new PyFloat(num(v));
      if (typeof v === "string") {
        const s = v.trim().replace(",", ".");
        if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s)) throw new PyError("ValueError", `float() no puede convertir el texto '${v}' en un número`, line);
        return new PyFloat(Number(s));
      }
      throw new PyError("TypeError", `float() no admite un valor de tipo ${typeName(v)}`, line);
    }
    case "str":
      argc(1);
      return pyStr(args[0]!);
    case "bool":
      argc(1);
      return truthy(args[0]!);
    case "abs": {
      argc(1);
      const v = args[0]!;
      if (!isNum(v)) throw new PyError("TypeError", `abs() no admite un valor de tipo ${typeName(v)}`, line);
      return isFloat(v) ? new PyFloat(Math.abs(v.v)) : Math.abs(num(v));
    }
    case "min":
    case "max": {
      const items = args.length === 1 ? toList(args[0]!, line) : args;
      if (!items.length) throw new PyError("ValueError", `${name}() necesita al menos un valor`, line);
      return items.reduce((m, x) => (name === "min" ? (compare(x, m, "<", line) ? x : m) : compare(x, m, ">", line) ? x : m));
    }
    case "sum": {
      argc(1);
      return toList(args[0]!, line).reduce<PyVal>((a, x) => arith("+", a, x, line), 0);
    }
    case "sorted": {
      argc(1);
      return [...toList(args[0]!, line)].sort((a, b) => (compare(a, b, "<", line) ? -1 : compare(b, a, "<", line) ? 1 : 0));
    }
    case "round": {
      argc(1, 2);
      const v = args[0]!;
      if (!isNum(v)) throw new PyError("TypeError", `round() no admite un valor de tipo ${typeName(v)}`, line);
      if (args.length === 1) return roundHalfEven(num(v));
      const d = args[1]!;
      if (typeof d !== "number") throw new PyError("TypeError", "round() espera un entero como número de decimales", line);
      return new PyFloat(Number(num(v).toFixed(Math.max(0, Math.min(20, d)))));
    }
    case "input":
      throw new PyError("TypeError", "input() no está disponible en este simulador: guarda el dato en una variable (por ejemplo, edad = 15)", line);
    default:
      throw new PyError("NameError", `función desconocida «${name}»`, line);
  }
}

function formatSpec(v: PyVal, spec: string, line: number): string {
  if (!spec) return pyStr(v);
  const m = /^\.(\d+)f$/.exec(spec);
  if (m) {
    if (!isNum(v)) throw new PyError("ValueError", "el formato .Nf solo sirve para números", line);
    return num(v).toFixed(Number(m[1]));
  }
  return pyStr(v);
}

function evalExpr(e: Expr, fr: Frame, ctx: Ctx, line: number): PyVal {
  switch (e.t) {
    case "const":
      return e.v;
    case "name": {
      const v = lookup(e.n, fr, ctx, line);
      if (typeof v === "object" && v !== null && (v as PyFunc).kind === "func") throw new PyError("TypeError", `«${e.n}» es una función: añade paréntesis para llamarla`, line);
      return v as PyVal;
    }
    case "fstr":
      return e.parts.map((p) => (typeof p === "string" ? p : formatSpec(evalExpr(p.e, fr, ctx, line), p.spec, line))).join("");
    case "list":
      return e.items.map((x) => evalExpr(x, fr, ctx, line));
    case "neg": {
      const v = evalExpr(e.e, fr, ctx, line);
      if (!isNum(v)) throw new PyError("TypeError", `no se puede cambiar el signo de un valor de tipo ${typeName(v)}`, line);
      return isFloat(v) ? new PyFloat(-v.v) : -num(v);
    }
    case "not":
      return !truthy(evalExpr(e.e, fr, ctx, line));
    case "bool": {
      const l = evalExpr(e.l, fr, ctx, line);
      if (e.op === "and") return truthy(l) ? evalExpr(e.r, fr, ctx, line) : l;
      return truthy(l) ? l : evalExpr(e.r, fr, ctx, line);
    }
    case "bin":
      return arith(e.op, evalExpr(e.l, fr, ctx, line), evalExpr(e.r, fr, ctx, line), line);
    case "cmp": {
      let left = evalExpr(e.first, fr, ctx, line);
      for (const { op, e: re } of e.rest) {
        const right = evalExpr(re, fr, ctx, line);
        let ok: boolean;
        if (op === "==") ok = equal(left, right);
        else if (op === "!=") ok = !equal(left, right);
        else if (op === "in" || op === "not in") {
          let has: boolean;
          if (typeof right === "string") {
            if (typeof left !== "string") throw new PyError("TypeError", "con «in» sobre un texto hay que buscar otro texto", line);
            has = right.includes(left);
          } else has = toList(right, line).some((x) => equal(x, left));
          ok = op === "in" ? has : !has;
        } else ok = compare(left, right, op, line);
        if (!ok) return false;
        left = right;
      }
      return true;
    }
    case "index": {
      const base = evalExpr(e.e, fr, ctx, line);
      const i = evalExpr(e.i, fr, ctx, line);
      if (typeof i !== "number") throw new PyError("TypeError", "el índice debe ser un número entero", line);
      const items = typeof base === "string" || Array.isArray(base) ? base : base instanceof PyRange ? toList(base, line) : null;
      if (items === null) throw new PyError("TypeError", `un valor de tipo ${typeName(base)} no admite índices`, line);
      const k = i < 0 ? items.length + i : i;
      if (k < 0 || k >= items.length) throw new PyError("IndexError", `el índice ${i} está fuera de rango (la secuencia tiene ${items.length} elementos)`, line);
      return Array.isArray(items) ? (items[k] as PyVal) : (items as string)[k]!;
    }
    case "attr":
      throw new PyError("TypeError", `«.${e.n}» solo se puede usar llamándolo con paréntesis`, line);
    case "call": {
      const f = e.fn;
      if (f.t === "attr") {
        const target = evalExpr(f.e, fr, ctx, line);
        const args = e.args.map((a) => evalExpr(a, fr, ctx, line));
        if (f.n === "append" && Array.isArray(target)) {
          if (args.length !== 1) throw new PyError("TypeError", "append() recibe un único argumento", line);
          target.push(args[0]!);
          return null;
        }
        if (typeof target === "string") {
          if (f.n === "upper") return target.toUpperCase();
          if (f.n === "lower") return target.toLowerCase();
          if (f.n === "strip") return target.trim();
        }
        throw new PyError("TypeError", `un valor de tipo ${typeName(target)} no tiene el método «${f.n}» en este simulador`, line);
      }
      if (f.t !== "name") throw new PyError("TypeError", "solo se pueden llamar funciones por su nombre", line);
      const args = e.args.map((a) => evalExpr(a, fr, ctx, line));
      const fn = fr.vars.get(f.n) ?? ctx.globals.vars.get(f.n);
      if (fn && typeof fn === "object" && !Array.isArray(fn) && !isFloat(fn) && !(fn instanceof PyRange) && (fn as PyFunc).kind === "func") {
        return callFunction(fn as PyFunc, args, ctx, line);
      }
      if (BUILTINS.has(f.n)) return callBuiltin(f.n, args, ctx, line);
      throw new PyError("NameError", `la función «${f.n}» no está definida`, line);
    }
  }
}

function callFunction(fn: PyFunc, args: PyVal[], ctx: Ctx, line: number): PyVal {
  if (args.length !== fn.params.length) {
    throw new PyError("TypeError", `${fn.name}() espera ${fn.params.length} argumento(s) y se le han pasado ${args.length}`, line);
  }
  if (ctx.depth >= 60) throw new PyError("RecursionError", "demasiadas llamadas anidadas: ¿falta el caso base de la recursión?", line);
  const frame: Frame = { name: fn.name, vars: new Map(fn.params.map((p, i) => [p, args[i]!] as [string, Stored])) };
  ctx.depth += 1;
  try {
    const sig = execBlock(fn.body, frame, ctx);
    return sig && sig.s === "return" ? sig.v : null;
  } finally {
    ctx.depth -= 1;
  }
}

function assignTarget(t: Expr, v: PyVal, fr: Frame, ctx: Ctx, line: number) {
  if (t.t === "name") {
    fr.vars.set(t.n, v);
    return;
  }
  if (t.t === "index") {
    const base = evalExpr(t.e, fr, ctx, line);
    const i = evalExpr(t.i, fr, ctx, line);
    if (!Array.isArray(base)) throw new PyError("TypeError", `un valor de tipo ${typeName(base)} no admite asignación por índice`, line);
    if (typeof i !== "number") throw new PyError("TypeError", "el índice debe ser un número entero", line);
    const k = i < 0 ? base.length + i : i;
    if (k < 0 || k >= base.length) throw new PyError("IndexError", `el índice ${i} está fuera de rango`, line);
    base[k] = v;
  }
}

function execBlock(stmts: Stmt[], fr: Frame, ctx: Ctx): Signal | undefined {
  for (const s of stmts) {
    const sig = exec(s, fr, ctx);
    if (sig) return sig;
  }
  return undefined;
}

function exec(s: Stmt, fr: Frame, ctx: Ctx): Signal | undefined {
  switch (s.k) {
    case "assign": {
      record(ctx, s.line, fr);
      if (s.op) {
        const cur = evalExpr(s.targets[0]!, fr, ctx, s.line);
        assignTarget(s.targets[0]!, arith(s.op, cur, evalExpr(s.values[0]!, fr, ctx, s.line), s.line), fr, ctx, s.line);
      } else {
        const vals = s.values.map((v) => evalExpr(v, fr, ctx, s.line));
        s.targets.forEach((t, i) => assignTarget(t, vals[i]!, fr, ctx, s.line));
      }
      return undefined;
    }
    case "expr":
      record(ctx, s.line, fr);
      evalExpr(s.e, fr, ctx, s.line);
      return undefined;
    case "pass":
      record(ctx, s.line, fr);
      return undefined;
    case "break":
      record(ctx, s.line, fr);
      return { s: "break" };
    case "continue":
      record(ctx, s.line, fr);
      return { s: "continue" };
    case "return": {
      record(ctx, s.line, fr);
      return { s: "return", v: s.e ? evalExpr(s.e, fr, ctx, s.line) : null };
    }
    case "def":
      record(ctx, s.line, fr);
      fr.vars.set(s.name, { kind: "func", name: s.name, params: s.params, body: s.body, line: s.line });
      return undefined;
    case "if": {
      for (const b of s.branches) {
        record(ctx, b.line, fr);
        if (b.cond === null || truthy(evalExpr(b.cond, fr, ctx, b.line))) return execBlock(b.body, fr, ctx);
      }
      return undefined;
    }
    case "while": {
      for (;;) {
        record(ctx, s.line, fr);
        if (!truthy(evalExpr(s.cond, fr, ctx, s.line))) return undefined;
        const sig = execBlock(s.body, fr, ctx);
        if (sig?.s === "break") return undefined;
        if (sig?.s === "return") return sig;
      }
    }
    case "for": {
      const it = evalExpr(s.iter, fr, ctx, s.line);
      const n = it instanceof PyRange ? it.length : toList(it, s.line).length;
      const list = it instanceof PyRange ? null : toList(it, s.line);
      for (let i = 0; i < n; i += 1) {
        record(ctx, s.line, fr);
        fr.vars.set(s.v, it instanceof PyRange ? it.at(i) : list![i]!);
        const sig = execBlock(s.body, fr, ctx);
        if (sig?.s === "break") return undefined;
        if (sig?.s === "return") return sig;
      }
      record(ctx, s.line, fr);
      return undefined;
    }
  }
}

/** Ejecuta un programa registrando cada línea (traza) y la salida de `print`. */
export function runPython(src: string, opts: { maxSteps?: number; trace?: boolean } = {}): RunResult {
  const ctx: Ctx = { steps: [], out: [], maxSteps: opts.maxSteps ?? 400, trace: opts.trace ?? true, depth: 0, globals: { name: "<programa>", vars: new Map() }, opCount: 0 };
  try {
    const prog = parseProgram(src);
    execBlock(prog, ctx.globals, ctx);
    if (ctx.trace) ctx.steps.push({ line: -1, frame: "<programa>", vars: snapshot(ctx.globals), outLen: ctx.out.length });
    return { steps: ctx.steps, output: ctx.out };
  } catch (e) {
    if (e instanceof PyError) return { steps: ctx.steps, output: ctx.out, error: { kind: e.kind, msg: e.msg, line: e.line } };
    throw e;
  }
}

/** Define las funciones del programa y llama a una de ellas con unos argumentos (para pruebas automáticas). */
export function callPython(src: string, fname: string, args: PyVal[]): { value?: PyVal; error?: { kind: PyErrorKind; msg: string; line: number } } {
  const ctx: Ctx = { steps: [], out: [], maxSteps: 0, trace: false, depth: 0, globals: { name: "<programa>", vars: new Map() }, opCount: 0 };
  try {
    execBlock(parseProgram(src), ctx.globals, ctx);
    const fn = ctx.globals.vars.get(fname);
    if (!fn || typeof fn !== "object" || Array.isArray(fn) || isFloat(fn) || fn instanceof PyRange || (fn as PyFunc).kind !== "func") {
      return { error: { kind: "NameError", msg: `no encuentro la función «${fname}»`, line: 1 } };
    }
    return { value: callFunction(fn as PyFunc, args, ctx, (fn as PyFunc).line) };
  } catch (e) {
    if (e instanceof PyError) return { error: { kind: e.kind, msg: e.msg, line: e.line } };
    throw e;
  }
}
