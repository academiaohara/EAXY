/** Calculadora de bolsillo (la de las lecciones): lógica pura, sin eval y con coma decimal. */

export type CalcOp = "+" | "-" | "*" | "/";

export type CalcState = {
  /** Lo que se ve en pantalla (con punto interno; se muestra con coma). */
  display: string;
  acc: number | null;
  op: CalcOp | null;
  /** El siguiente dígito empieza un número nuevo. */
  fresh: boolean;
};

export type CalcKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "," | CalcOp | "=" | "C" | "<";

export const CALC_INITIAL: CalcState = { display: "0", acc: null, op: null, fresh: true };

const ERROR = "Error";

function apply(a: number, op: CalcOp, b: number): number | null {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? null : a / b;
  }
}

/** Quita el ruido de la coma flotante (0,1 + 0,2 → 0,3). */
function clean(n: number): string {
  return String(Number(n.toPrecision(12)));
}

export function pressKey(state: CalcState, key: CalcKey): CalcState {
  if (key === "C") {
    return CALC_INITIAL;
  }
  if (state.display === ERROR) {
    return /^[0-9,]$/.test(key) ? pressKey(CALC_INITIAL, key) : CALC_INITIAL;
  }
  if (/^[0-9]$/.test(key)) {
    if (state.fresh || state.display === "0") {
      return { ...state, display: key, fresh: false };
    }
    return state.display.replace(/[-.]/g, "").length >= 12 ? state : { ...state, display: state.display + key };
  }
  if (key === ",") {
    if (state.fresh) {
      return { ...state, display: "0.", fresh: false };
    }
    return state.display.includes(".") ? state : { ...state, display: `${state.display}.` };
  }
  if (key === "<") {
    if (state.fresh) {
      return state;
    }
    const next = state.display.slice(0, -1);
    return { ...state, display: next === "" || next === "-" ? "0" : next };
  }
  // operadores e igual: se resuelve lo pendiente
  const current = Number(state.display);
  let acc = current;
  if (state.acc !== null && state.op !== null && !state.fresh) {
    const result = apply(state.acc, state.op, current);
    if (result === null) {
      return { display: ERROR, acc: null, op: null, fresh: true };
    }
    acc = Number(clean(result));
  } else if (state.acc !== null && state.op !== null && state.fresh) {
    acc = state.acc;
  }
  if (key === "=") {
    return { display: clean(acc), acc: null, op: null, fresh: true };
  }
  return { display: clean(acc), acc, op: key as CalcOp, fresh: true };
}

/** Número tal como se escribe en España: coma decimal. */
export function showDisplay(display: string): string {
  return display.replace(".", ",");
}
