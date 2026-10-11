"use client";

export function OrigenContarScene() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-2 text-center">
      <div className="lesson-definition-box w-full max-w-2xl rounded-xl border-2 border-[color:var(--stage-accent)]/35 bg-[color:var(--stage-accent)]/12 px-6 py-8">
        <p className="text-lg leading-relaxed text-[color:var(--stage-ink,#e8edf5)] sm:text-xl">
          Cada cultura inventó símbolos para llevar la cuenta. En el siguiente paso probarás{" "}
          <span className="font-bold text-[color:var(--stage-accent,#58c4dd)]">tres formas distintas</span>{" "}
          antes de llegar al sistema decimal.
        </p>
      </div>
    </div>
  );
}
