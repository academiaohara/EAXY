"use client";

export function OrigenContarScene() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-2 text-center">
      <p className="max-w-2xl text-base leading-relaxed text-[color:var(--stage-muted,#94a3b8)] sm:text-lg">
        Antes de hablar de sumas o de redondeos, conviene recordar para qué inventamos los números.
      </p>
      <div className="w-full max-w-2xl border border-rose-400/50 bg-rose-500/10 px-6 py-8">
        <p className="text-lg leading-relaxed text-[color:var(--stage-ink,#e8edf5)] sm:text-xl">
          Los números naturales surgen por la necesidad de{" "}
          <span className="font-bold text-rose-300">contar cosas</span>.
        </p>
      </div>
      <p className="max-w-xl text-sm text-[color:var(--stage-muted,#94a3b8)]">
        Cada cultura inventó símbolos para llevar la cuenta. En el siguiente paso probarás tres formas
        distintas antes de llegar al sistema decimal.
      </p>
    </div>
  );
}
