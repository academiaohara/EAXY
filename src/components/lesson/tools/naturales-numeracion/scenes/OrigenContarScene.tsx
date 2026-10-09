"use client";

export function OrigenContarScene() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-2 text-center">
      <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
        Antes de hablar de sumas o de redondeos, conviene recordar para qué inventamos los números.
      </p>
      <div className="w-full max-w-2xl rounded-2xl border-[3px] border-rose-400 bg-white px-6 py-8 shadow-sm">
        <p className="text-lg leading-relaxed text-ink sm:text-xl">
          Los números naturales surgen por la necesidad de{" "}
          <span className="font-bold text-rose-500">contar cosas</span>.
        </p>
      </div>
      <p className="max-w-xl text-sm text-ink-muted">
        Cada cultura inventó símbolos para llevar la cuenta. En el siguiente paso probarás tres formas
        distintas antes de llegar al sistema decimal.
      </p>
    </div>
  );
}
