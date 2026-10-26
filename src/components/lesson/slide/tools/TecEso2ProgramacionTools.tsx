"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── 1. Traza de un programa paso a paso ───────────── */

export type Valor = number | string | boolean;
export type EstadoTraza = { linea: number; vars: Record<string, Valor>; salida: string[] };
export type ProgramaTraza = { nombre: string; codigo: string[]; traza: EstadoTraza[] };

const CODIGOS = [
  { nombre: "Suma de 1 a 5", codigo: ["suma ← 0", "para i de 1 a 5:", "    suma ← suma + i", "mostrar suma"] },
  { nombre: "Aprobado o suspenso", codigo: ["leer nota", "si nota ≥ 5:", "    mostrar «Aprobado»", "si no:", "    mostrar «Suspenso»"] },
  { nombre: "Cuenta atrás", codigo: ["n ← 3", "mientras n > 0:", "    mostrar n", "    n ← n − 1", "mostrar «¡Despegue!»"] },
  { nombre: "Factorial de 4", codigo: ["f ← 1", "para i de 1 a 4:", "    f ← f · i", "mostrar f"] },
] as const;

/** Ejecuta el programa `n` y devuelve la secuencia de estados (línea resaltada, variables y salida). `param` es la nota del programa 1. */
export function trazar(n: number, param = 6): ProgramaTraza {
  const def = CODIGOS[n]!;
  const t: EstadoTraza[] = [];
  const salida: string[] = [];
  const push = (linea: number, vars: Record<string, Valor>) => t.push({ linea, vars: { ...vars }, salida: [...salida] });
  if (n === 0) {
    let suma = 0;
    push(0, { suma });
    for (let i = 1; i <= 5; i += 1) {
      push(1, { suma, i });
      suma += i;
      push(2, { suma, i });
    }
    salida.push(String(suma));
    push(3, { suma, i: 5 });
  } else if (n === 1) {
    const nota = Math.round(param);
    push(0, { nota });
    push(1, { nota });
    if (nota >= 5) {
      salida.push("Aprobado");
      push(2, { nota });
    } else {
      push(3, { nota });
      salida.push("Suspenso");
      push(4, { nota });
    }
  } else if (n === 2) {
    let k = 3;
    push(0, { n: k });
    while (k > 0) {
      push(1, { n: k });
      salida.push(String(k));
      push(2, { n: k });
      k -= 1;
      push(3, { n: k });
    }
    push(1, { n: k });
    salida.push("¡Despegue!");
    push(4, { n: k });
  } else {
    let f = 1;
    push(0, { f });
    for (let i = 1; i <= 4; i += 1) {
      push(1, { f, i });
      f *= i;
      push(2, { f, i });
    }
    salida.push(String(f));
    push(3, { f, i: 4 });
  }
  return { nombre: def.nombre, codigo: [...def.codigo], traza: t };
}

export function TrazaExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, CODIGOS.length - 1)), nota: Math.round(num(block.params?.a, 6, 0, 10)), paso: 0 };
  const [s, setS] = useState(init);
  const prog = trazar(s.p, s.nota);
  const paso = Math.min(s.paso, prog.traza.length - 1);
  const est = prog.traza[paso]!;
  const fin = paso === prog.traza.length - 1;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa «Paso» para ejecutar el programa línea a línea y mira cómo cambian las variables. Es lo que hace el ordenador, pero despacio."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Programa" items={CODIGOS.map((c, value) => ({ value, label: c.nombre }))} value={s.p} onChange={(p) => setS((x) => ({ ...x, p, paso: 0 }))} />
          {s.p === 1 ? <Slider label="Nota" value={s.nota} min={0} max={10} step={1} color={MANIM.blue} onChange={(nota) => setS((x) => ({ ...x, nota, paso: 0 }))} /> : null}
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button type="button" className={TOOL_BTN} disabled={fin} onClick={() => setS((x) => ({ ...x, paso: Math.min(prog.traza.length - 1, paso + 1) }))}>
              Paso
            </button>
            <button type="button" className={TOOL_BTN} disabled={paso === 0} onClick={() => setS((x) => ({ ...x, paso: Math.max(0, paso - 1) }))}>
              Paso atrás
            </button>
            <button type="button" className={TOOL_BTN} disabled={fin} onClick={() => setS((x) => ({ ...x, paso: prog.traza.length - 1 }))}>
              Ejecutar todo
            </button>
          </div>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2" data-testid="traza">
        <pre className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm leading-relaxed">
          {prog.codigo.map((l, i) => (
            <div key={i} className="rounded px-1" style={i === est.linea ? { background: "rgba(252,213,76,0.25)", color: MANIM.yellow, fontWeight: 700 } : undefined}>
              {i + 1}. {l}
            </div>
          ))}
        </pre>
        <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
          <div className="mb-1 text-xs uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">Variables</div>
          {Object.entries(est.vars).map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span>{k}</span>
              <span className="font-bold tabular-nums" style={{ color: MANIM.blue }}>
                {String(v)}
              </span>
            </div>
          ))}
          <div className="mt-2 text-xs uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">Pantalla</div>
          <div className="font-bold" style={{ color: MANIM.green }}>
            {est.salida.length ? est.salida.join(" · ") : "—"}
          </div>
        </div>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Paso">{paso + 1} de {prog.traza.length}</Stat>
        <Stat color={MANIM.green} label="Estado">{fin ? "Programa terminado" : "En ejecución"}</Stat>
      </Readout>
      <Note>Un programa se ejecuta una instrucción tras otra; las variables guardan valores que cambian con cada paso. Seguir la «traza» con una tabla es la mejor forma de entender qué hace un bucle o una condición.</Note>
    </Frame>
  );
}

/* ───────────── 2. Tipos de datos ───────────── */

export const DATOS = [
  { txt: "7", tipo: "entero", v: 7 },
  { txt: "3", tipo: "entero", v: 3 },
  { txt: "2,5", tipo: "decimal", v: 2.5 },
  { txt: "«7»", tipo: "texto", v: "7" },
  { txt: "«hola»", tipo: "texto", v: "hola" },
  { txt: "verdadero", tipo: "booleano", v: true },
] as const;

/** Suma o compara dos datos según su tipo. */
export function opera(a: number, b: number, op: "+" | "="): { resultado: string; tipo: string; nota: string } {
  const A = DATOS[a]!;
  const B = DATOS[b]!;
  const numA = typeof A.v === "number";
  const numB = typeof B.v === "number";
  if (op === "=") {
    const igual = typeof A.v === typeof B.v && A.v === B.v;
    return { resultado: igual ? "verdadero" : "falso", tipo: "booleano", nota: typeof A.v !== typeof B.v ? "Aunque se parezcan, un número y un texto son tipos distintos: no son iguales." : "Mismo tipo: se comparan los valores." };
  }
  if (numA && numB) return { resultado: fmtEs((A.v as number) + (B.v as number), 2), tipo: Number.isInteger((A.v as number) + (B.v as number)) ? "entero" : "decimal", nota: "Número + número: suma aritmética." };
  if (A.tipo === "texto" && B.tipo === "texto") return { resultado: `«${A.v}${B.v}»`, tipo: "texto", nota: "Texto + texto: se unen (concatenación), no se suman." };
  return { resultado: "error de tipos", tipo: "—", nota: "No se pueden sumar tipos distintos sin convertir antes uno de ellos (por ejemplo, de texto a número)." };
}

export function TiposDatosExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.n, 0, 0, DATOS.length - 1)), b: Math.round(num(block.params?.a, 3, 0, DATOS.length - 1)), op: 0 };
  const [s, setS] = useState(init);
  const r = opera(s.a, s.b, s.op === 0 ? "+" : "=");
  const A = DATOS[s.a]!;
  const B = DATOS[s.b]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Combina dos datos y mira qué ocurre: 7 + 3 suma, pero «7» + «7» se une. El tipo de dato decide qué se puede hacer."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Primer dato" items={DATOS.map((d, value) => ({ value, label: d.txt }))} value={s.a} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Choice label="Segundo dato" items={DATOS.map((d, value) => ({ value, label: d.txt }))} value={s.b} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Choice label="Operación" items={[{ value: 0, label: "Suma (+)" }, { value: 1, label: "Comparación (=)" }]} value={s.op} onChange={(op) => setS((x) => ({ ...x, op }))} />
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-4 text-xl font-bold" data-testid="tipos">
        <span className="rounded-lg border px-3 py-2" style={{ borderColor: MANIM.blue, color: MANIM.blue }}>
          {A.txt} <small className="block text-xs font-normal">{A.tipo}</small>
        </span>
        <span>{s.op === 0 ? "+" : "="}</span>
        <span className="rounded-lg border px-3 py-2" style={{ borderColor: MANIM.orange, color: MANIM.orange }}>
          {B.txt} <small className="block text-xs font-normal">{B.tipo}</small>
        </span>
        <span>→</span>
        <span className="rounded-lg border px-3 py-2" style={{ borderColor: r.tipo === "—" ? MANIM.red : MANIM.green, color: r.tipo === "—" ? MANIM.red : MANIM.green }}>
          {r.resultado} <small className="block text-xs font-normal">{r.tipo}</small>
        </span>
      </div>
      <Note>{r.nota}</Note>
    </Frame>
  );
}

/* ───────────── 3. Operadores ───────────── */

export function aritmeticos(a: number, b: number) {
  return { suma: a + b, resta: a - b, producto: a * b, division: b === 0 ? NaN : a / b, cociente: b === 0 ? NaN : Math.floor(a / b), resto: b === 0 ? NaN : a % b };
}

export const logico = (p: boolean, q: boolean) => ({ y: p && q, o: p || q, noP: !p });

export function OperadoresExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 2)), a: Math.round(num(block.params?.a, 17, 0, 60)), b: Math.round(num(block.params?.b, 5, 0, 20)) };
  const [s, setS] = useState(init);
  const r = aritmeticos(s.a, s.b);
  const cond = { p: s.a > 10, q: s.b < 3 };
  const l = logico(cond.p, cond.q);
  const chip = (t: string, v: boolean) => (
    <span className="rounded-lg border px-3 py-1 font-bold" style={{ borderColor: v ? MANIM.green : MANIM.red, color: v ? MANIM.green : MANIM.red }}>
      {t}: {v ? "verdadero" : "falso"}
    </span>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia a y b y observa el resultado de cada operador. Fíjate en el resto (%) y en cómo se combinan las condiciones."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de operador" items={[{ value: 0, label: "Aritméticos" }, { value: 1, label: "Comparación" }, { value: 2, label: "Lógicos" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label="a" value={s.a} min={0} max={60} step={1} color={MANIM.blue} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="b" value={s.b} min={0} max={20} step={1} color={MANIM.orange} onChange={(b) => setS((x) => ({ ...x, b }))} />
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-3" data-testid="operadores">
        {s.modo === 0 ? (
          <>
            {[["a + b", r.suma], ["a − b", r.resta], ["a · b", r.producto], ["a / b", r.division], ["a // b (cociente)", r.cociente], ["a % b (resto)", r.resto]].map(([t, v]) => (
              <span key={t as string} className="rounded-lg border border-white/10 px-3 py-1 font-bold">
                {t as string} = <span style={{ color: MANIM.green }}>{Number.isNaN(v as number) ? "no definido" : fmtEs(v as number, 2)}</span>
              </span>
            ))}
          </>
        ) : null}
        {s.modo === 1 ? (
          <>
            {chip("a > b", s.a > s.b)}
            {chip("a < b", s.a < s.b)}
            {chip("a = b", s.a === s.b)}
            {chip("a ≠ b", s.a !== s.b)}
            {chip("a ≥ b", s.a >= s.b)}
          </>
        ) : null}
        {s.modo === 2 ? (
          <>
            {chip("p = (a > 10)", cond.p)}
            {chip("q = (b < 3)", cond.q)}
            {chip("p y q", l.y)}
            {chip("p o q", l.o)}
            {chip("no p", l.noP)}
          </>
        ) : null}
      </div>
      <Note>
        {s.modo === 0 && "El resto (%) es lo que sobra al dividir; sirve para saber si un número es par (n % 2 = 0) o para repetir ciclos. Dividir entre 0 no está definido."}
        {s.modo === 1 && "Las comparaciones devuelven siempre verdadero o falso. Ojo: «=» compara y «←» asigna un valor a una variable."}
        {s.modo === 2 && "«y» exige que se cumplan las dos condiciones; «o» basta con una; «no» invierte el resultado."}
      </Note>
    </Frame>
  );
}

/* ───────────── 4. Funciones con parámetros ───────────── */

export const FUNCIONES = [
  { nombre: "area_rectangulo(base, altura)", cuerpo: "devolver base · altura", p1: "base", p2: "altura", u1: " cm", u2: " cm", r1: [1, 30] as const, r2: [1, 30] as const, res: "cm²" },
  { nombre: "a_fahrenheit(celsius)", cuerpo: "devolver celsius · 9 / 5 + 32", p1: "celsius", p2: "", u1: " °C", u2: "", r1: [-20, 100] as const, r2: [0, 0] as const, res: "°F" },
  { nombre: "precio_final(precio, descuento)", cuerpo: "devolver precio · (1 − descuento / 100)", p1: "precio", p2: "descuento", u1: " €", u2: " %", r1: [5, 200] as const, r2: [0, 90] as const, res: "€" },
] as const;

export function aplicaFuncion(f: number, a: number, b: number): number {
  if (f === 0) return a * b;
  if (f === 1) return (a * 9) / 5 + 32;
  return a * (1 - b / 100);
}

export function FuncionProgramaExplorador({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.n, 0, 0, FUNCIONES.length - 1)), a: Math.round(num(block.params?.a, 8, 1, 30)), b: Math.round(num(block.params?.b, 5, 1, 30)) };
  const [s, setS] = useState(init);
  const F = FUNCIONES[s.f]!;
  const a = Math.min(F.r1[1], Math.max(F.r1[0], s.a));
  const b = F.p2 ? Math.min(F.r2[1], Math.max(F.r2[0], s.b)) : 0;
  const res = aplicaFuncion(s.f, a, b);
  const llamada = F.p2 ? `${F.nombre.split("(")[0]}(${a}, ${b})` : `${F.nombre.split("(")[0]}(${a})`;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una función se define una vez y se llama las veces que haga falta con distintos argumentos. Cambia los argumentos y observa lo que devuelve."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Función" items={FUNCIONES.map((x, value) => ({ value, label: x.nombre.split("(")[0]! }))} value={s.f} onChange={(f) => setS((x) => ({ ...x, f }))} />
          <Slider label={F.p1} value={a} min={F.r1[0]} max={F.r1[1]} step={1} unit={F.u1} color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, a: v }))} />
          {F.p2 ? <Slider label={F.p2} value={b} min={F.r2[0]} max={F.r2[1]} step={1} unit={F.u2} color={MANIM.orange} onChange={(v) => setS((x) => ({ ...x, b: v }))} /> : null}
        </>
      }
    >
      <pre className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm leading-relaxed" data-testid="funcion">
        {`definir ${F.nombre}:\n    ${F.cuerpo}\n\n`}
        <span style={{ color: MANIM.yellow }}>{`mostrar ${llamada}`}</span>
      </pre>
      <Readout>
        <Stat color={MANIM.yellow} label="Llamada">{llamada}</Stat>
        <Stat color={MANIM.green} label="Devuelve">{fmtEs(res, 2)} {F.res}</Stat>
      </Readout>
      <Note>Los parámetros son los nombres que usa la función por dentro (base, altura…); los argumentos son los valores concretos de cada llamada. Una buena función hace una sola cosa y se puede reutilizar.</Note>
    </Frame>
  );
}

/* ───────────── 5. Pruebas y depuración: año bisiesto ───────────── */

export const bisiestoMalo = (y: number) => y % 4 === 0;
export const bisiesto = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

export function PruebasExplorador({ block }: { block: ToolBlock }) {
  const init = { y: Math.round(num(block.params?.a, 2024, 1800, 2200)), casos: [] as number[], corregido: false };
  const [s, setS] = useState(init);
  const f = s.corregido ? bisiesto : bisiestoMalo;
  const fallos = s.casos.filter((y) => f(y) !== bisiesto(y));
  const PRESETS = [2023, 2024, 1900, 2000];
  const prueba = (y: number) => setS((x) => (x.casos.includes(y) ? x : { ...x, casos: [...x.casos, y] }));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Prueba años y compara lo esperado con lo que devuelve la función. Un buen conjunto de pruebas incluye casos normales y casos límite."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Año a probar" value={s.y} min={1800} max={2200} step={1} color={MANIM.blue} onChange={(y) => setS((x) => ({ ...x, y }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Casos de prueba">
            <button type="button" className={TOOL_BTN} onClick={() => prueba(s.y)}>
              Probar {s.y}
            </button>
            {PRESETS.map((y) => (
              <button key={y} type="button" className={TOOL_BTN} onClick={() => prueba(y)}>
                {y}
              </button>
            ))}
            <button type="button" className={TOOL_BTN} aria-pressed={s.corregido} onClick={() => setS((x) => ({ ...x, corregido: !x.corregido }))}>
              {s.corregido ? "Volver a la versión con error" : "Aplicar la corrección"}
            </button>
          </div>
        </>
      }
    >
      <pre className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm leading-relaxed" data-testid="pruebas">
        {s.corregido ? "es_bisiesto(año):\n    devolver (año % 4 = 0 y año % 100 ≠ 0) o (año % 400 = 0)" : "es_bisiesto(año):\n    devolver año % 4 = 0"}
      </pre>
      <div className="flex flex-col gap-1 text-sm">
        {s.casos.length === 0 ? <span className="text-[color:var(--stage-muted,#b8c2d0)]">Aún no hay casos de prueba.</span> : null}
        {s.casos.map((y) => {
          const ok = f(y) === bisiesto(y);
          return (
            <span key={y} style={{ color: ok ? MANIM.green : MANIM.red }}>
              {ok ? "✓" : "✗"} {y}: esperado {bisiesto(y) ? "bisiesto" : "no bisiesto"}, obtenido {f(y) ? "bisiesto" : "no bisiesto"}
            </span>
          );
        })}
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="Casos probados">{s.casos.length}</Stat>
        <Stat color={fallos.length ? MANIM.red : MANIM.green} label="Fallos detectados">{fallos.length}</Stat>
      </Readout>
      <Note>{fallos.length ? "Un fallo en un caso concreto revela el error: los años como 1900 son múltiplos de 4 pero no son bisiestos. Los casos límite son los que más errores descubren." : s.corregido ? "Con la regla completa todos los casos coinciden con lo esperado." : "Con años «normales» el programa parece correcto. Prueba también años múltiplos de 100."}</Note>
    </Frame>
  );
}

/* ───────────── 6. Adivina el número ───────────── */

export const pistaNumero = (secreto: number, intento: number) => (intento === secreto ? "¡Acertaste!" : intento < secreto ? "Mayor" : "Menor");

/** Secuencia de intentos de la estrategia de mitades (búsqueda binaria) en 1..n. */
export function estrategiaMitades(secreto: number, n = 100): number[] {
  const out: number[] = [];
  let lo = 1;
  let hi = n;
  while (lo <= hi) {
    const m = Math.floor((lo + hi) / 2);
    out.push(m);
    if (m === secreto) break;
    if (m < secreto) lo = m + 1;
    else hi = m - 1;
  }
  return out;
}

export function AdivinaExplorador({ block }: { block: ToolBlock }) {
  const init = { secreto: Math.round(num(block.params?.a, 37, 1, 100)), g: 50, intentos: [] as number[] };
  const [s, setS] = useState(init);
  const mitades = estrategiaMitades(s.secreto);
  const acertado = s.intentos.includes(s.secreto);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Adivina el número entre 1 y 100 con las pistas «mayor» y «menor». Después compara con la estrategia de mitades."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tu intento" value={s.g} min={1} max={100} step={1} color={MANIM.blue} onChange={(g) => setS((x) => ({ ...x, g }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button type="button" className={TOOL_BTN} disabled={acertado} onClick={() => setS((x) => ({ ...x, intentos: [...x.intentos, x.g] }))}>
              Probar {s.g}
            </button>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-1 text-sm" data-testid="adivina">
        {s.intentos.length === 0 ? <span className="text-[color:var(--stage-muted,#b8c2d0)]">Empieza a probar números.</span> : null}
        {s.intentos.map((g, i) => (
          <span key={i} style={{ color: g === s.secreto ? MANIM.green : MANIM.ink }}>
            {i + 1}. {g} → {pistaNumero(s.secreto, g)}
          </span>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="Tus intentos">{s.intentos.length}</Stat>
        <Stat color={MANIM.green} label="Estrategia de mitades">{mitades.length} intentos</Stat>
        <Stat color={MANIM.yellow} label="Máximo posible (1 a 100)">7 intentos</Stat>
      </Readout>
      <Note>
        {acertado ? `La estrategia de mitades lo habría encontrado con: ${mitades.join(" → ")}. Cada intento descarta la mitad de las opciones, y por eso 7 intentos bastan para 100 números (2⁷ = 128).` : "Pista: prueba siempre el número del medio del intervalo que aún es posible."}
      </Note>
    </Frame>
  );
}
