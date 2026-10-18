"use client";

import { CalculatorIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CALC_INITIAL, pressKey, showDisplay, type CalcKey, type CalcOp } from "@/lib/lesson/calculator";
import { cn } from "@/lib/utils";

const OP_LABEL: Record<CalcOp, string> = { "+": "+", "-": "−", "*": "×", "/": "÷" };

const ROWS: { key: CalcKey; label: string; tone?: "op" | "clear" | "eq" }[][] = [
  [
    { key: "C", label: "C", tone: "clear" },
    { key: "<", label: "⌫", tone: "clear" },
    { key: "/", label: "÷", tone: "op" },
    { key: "*", label: "×", tone: "op" },
  ],
  [{ key: "7", label: "7" }, { key: "8", label: "8" }, { key: "9", label: "9" }, { key: "-", label: "−", tone: "op" }],
  [{ key: "4", label: "4" }, { key: "5", label: "5" }, { key: "6", label: "6" }, { key: "+", label: "+", tone: "op" }],
  [{ key: "1", label: "1" }, { key: "2", label: "2" }, { key: "3", label: "3" }, { key: "=", label: "=", tone: "eq" }],
  [{ key: "0", label: "0" }, { key: ",", label: "," }],
];

const KEYBOARD: Record<string, CalcKey> = {
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "=": "=",
  Enter: "=",
  ",": ",",
  ".": ",",
  Backspace: "<",
  Escape: "C",
};

/** Botón de calculadora que abre una calculadora de bolsillo (con teclado y coma decimal). */
export function CalculatorPopover({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(CALC_INITIAL);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  const press = (key: CalcKey) => setState((s) => pressKey(s, key));

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label={open ? "Cerrar calculadora" : "Abrir calculadora"}
        aria-expanded={open}
        data-testid="lesson-calculator-toggle"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex size-11 items-center justify-center rounded-full border transition",
          open
            ? "border-[color:var(--stage-accent,var(--cobalt))] bg-[color:var(--stage-accent,var(--cobalt))]/20 text-[color:var(--stage-accent,var(--cobalt))]"
            : "border-white/20 bg-white/[0.05] text-[color:var(--stage-muted,var(--ink-muted))] hover:border-[color:var(--stage-accent,var(--cobalt))] hover:text-[color:var(--stage-accent,var(--cobalt))]",
        )}
      >
        <CalculatorIcon className="size-5" aria-hidden />
      </button>
      {open ? (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="group"
          aria-label="Calculadora"
          data-testid="lesson-calculator"
          onKeyDown={(e) => {
            const key: CalcKey | undefined = /^[0-9]$/.test(e.key) ? (e.key as CalcKey) : KEYBOARD[e.key];
            if (key) {
              e.preventDefault();
              press(key);
            }
          }}
          className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-60 rounded-2xl border border-white/15 bg-[#1a2332] p-3 text-white shadow-[0_16px_40px_rgb(0_0_0/0.45)] outline-none"
        >
          <div className="mb-2 rounded-xl bg-black/35 px-3 py-2 text-right" aria-live="polite">
            <div className="h-4 text-xs text-[#b8c2d0]">{state.acc !== null && state.op ? `${showDisplay(String(state.acc))} ${OP_LABEL[state.op]}` : ""}</div>
            <div className="truncate text-2xl font-semibold tabular-nums" data-testid="lesson-calculator-display">
              {showDisplay(state.display)}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {ROWS.flat().map(({ key, label, tone }) => (
              <button
                key={key}
                type="button"
                onClick={() => press(key)}
                className={cn(
                  "min-h-10 rounded-lg text-lg font-semibold transition active:scale-95",
                  key === "0" && "col-span-2",
                  tone === "op" && "bg-[#58c4dd]/20 text-[#58c4dd] hover:bg-[#58c4dd]/30",
                  tone === "clear" && "bg-[#fc6255]/20 text-[#fc6255] hover:bg-[#fc6255]/30",
                  tone === "eq" && "row-span-2 bg-[#ffd866] text-[#1a2332] hover:bg-[#ffd866]/90",
                  !tone && "bg-white/10 hover:bg-white/20",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
