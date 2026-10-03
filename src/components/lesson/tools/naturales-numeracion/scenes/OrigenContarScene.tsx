"use client";

export function OrigenContarScene() {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <div className="w-full max-w-xl rounded-2xl border-[3px] border-rose-400 bg-white px-6 py-8 shadow-sm">
        <p className="text-lg leading-relaxed text-ink sm:text-xl">
          Los números naturales surgen por la necesidad de{" "}
          <span className="font-bold text-rose-500">contar cosas</span>.
        </p>
      </div>
      <p className="max-w-md text-sm text-ink-muted">
        Antes de escribir cifras como las usamos hoy, cada cultura inventó su forma de llevar la
        cuenta. En el siguiente paso las probarás tú mismo.
      </p>
    </div>
  );
}
