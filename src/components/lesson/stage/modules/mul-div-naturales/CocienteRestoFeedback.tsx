"use client";

import Image from "next/image";
import { useEffect } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";

const ASSETS = {
  bombones: "/lesson/mul-div-naturales/bombones.png",
  cajabombones: "/lesson/mul-div-naturales/cajabombones.png",
} as const;

export type CocienteRestoFeedbackProps = {
  /** Total de bombones (D). */
  total: number;
  /** Bombones por caja llena (d). */
  perBox: number;
  /** Cajas llenas que eligió el alumno (c). */
  quotient: number;
  /** Sobrantes que eligió el alumno (r). */
  remainder: number;
  isCorrect: boolean;
  /** Inversa: fija cajas y por caja, pregunta total. */
  variant?: "divide" | "inverse";
  onReadyChange?: (ready: boolean) => void;
};

function MiniCaja({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <Image
        src={ASSETS.cajabombones}
        alt=""
        width={56}
        height={48}
        className="h-11 w-14 object-contain"
        aria-hidden
      />
      <span className="rounded border border-white/25 bg-slate-900/50 px-1.5 font-mono text-xs font-bold text-sky-200">
        {count}
      </span>
    </div>
  );
}

export function CocienteRestoFeedback({
  total,
  perBox,
  quotient,
  remainder,
  isCorrect,
  variant = "divide",
  onReadyChange,
}: CocienteRestoFeedbackProps) {
  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  const attemptSum = quotient * perBox + remainder;
  const mismatchTotal = variant === "divide" && attemptSum !== total;
  const remainderTooBig = remainder >= perBox;

  const noteClass = "font-[family-name:var(--font-caveat)] text-lg leading-snug text-[color:var(--stage-ink,#e8edf5)]";

  let note: React.ReactNode = null;
  let equation = "";

  if (isCorrect) {
    if (variant === "inverse") {
      equation = `${total} = ${perBox} \\cdot ${quotient} + ${remainder}`;
      note = (
        <>
          Correcto: {quotient} cajas de {perBox} y sobran {remainder}.
          <br />
          <span className="text-base text-emerald-200/90">Total: {total} bombones.</span>
        </>
      );
    } else if (remainder === 0) {
      equation = `${total} = ${perBox} \\cdot ${quotient}`;
      note = (
        <>
          {quotient} cajas llenas, no sobra nada → división exacta.
          <br />
          <span className="text-base text-emerald-200/90">Cociente {quotient}, resto 0.</span>
        </>
      );
    } else {
      equation = `${total} = ${perBox} \\cdot ${quotient} + ${remainder}`;
      note = (
        <>
          {quotient} cajas con {perBox} y sobran {remainder}.
          <br />
          <span className="text-base text-emerald-200/90">Cociente {quotient}, resto {remainder}.</span>
        </>
      );
    }
  } else if (remainderTooBig && attemptSum === total) {
    equation = `${perBox} \\cdot ${quotient} + ${remainder} = ${attemptSum}`;
    note = (
      <>
        Las cuentas cuadran, pero sobran {remainder} y en cada caja caben {perBox}.
        <br />
        <span className="text-amber-100">Caben {perBox} más: otra caja.</span>
        <br />
        <span className="text-sm text-[color:var(--stage-muted,#94a3b8)]">
          El resto siempre es menor que el divisor.
        </span>
      </>
    );
  } else if (mismatchTotal) {
    equation = `${perBox} \\cdot ${quotient} + ${remainder} = ${attemptSum}`;
    note = (
      <>
        Tu intento suma {attemptSum}, no {total}.
        <br />
        <span className="text-amber-100">Comprueba con multiplicar y sumar el resto.</span>
      </>
    );
  } else if (variant === "inverse") {
    equation = `${perBox} \\cdot ${quotient} + ${remainder} = ${attemptSum}`;
    note = (
      <>
        Con {quotient} cajas de {perBox} y {remainder} sueltos hay {attemptSum} bombones, no {total}.
        <br />
        <span className="text-amber-100">Recuerda: total = cajas · cada caja + sobrantes.</span>
      </>
    );
  } else {
    equation = `${perBox} \\cdot ${quotient} + ${remainder} = ${attemptSum}`;
    note = "Revisa cuántas cajas llenas caben y cuántos sobran.";
  }

  const boxCount = Math.min(quotient, 10);
  const showEllipsis = quotient > 10;

  return (
    <div
      className="space-y-4 rounded-2xl border-2 border-white/10 bg-slate-900/40 p-4"
      aria-live="polite"
      data-testid="cociente-resto-feedback"
    >
      <div className="flex flex-wrap justify-center gap-1.5">
        {Array.from({ length: boxCount }, (_, i) => (
          <MiniCaja key={i} count={perBox} />
        ))}
        {showEllipsis ? <span className="self-center text-sm text-slate-400">+{quotient - 10} cajas</span> : null}
      </div>
      <div
        className={cn(
          "mx-auto flex max-w-xs flex-col items-center rounded-xl border-2 px-3 py-2",
          remainder > 0 ? "border-amber-400/40 bg-amber-500/10" : "border-white/10 opacity-50",
        )}
      >
        <Image src={ASSETS.bombones} alt="" width={80} height={64} className="h-12 w-auto object-contain" aria-hidden />
        <span className="font-mono text-sm font-bold text-amber-200">{remainder} sueltos</span>
      </div>
      <p className={noteClass}>{note}</p>
      {equation ? (
        <p className="text-center text-sm font-medium text-[color:var(--stage-ink,#e8edf5)]">
          <MathRenderer text={`$${equation}$`} />
        </p>
      ) : null}
    </div>
  );
}
