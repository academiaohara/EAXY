import type { ReactNode } from "react";
import { SparklesIcon } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <main className="campus-motion grid min-h-dvh flex-1 grid-cols-[minmax(0,1fr)_minmax(24rem,0.86fr)] bg-paper">
      <section className="relative flex min-h-full flex-col overflow-hidden bg-ink p-10 text-white lg:p-14">
        <span
          className="absolute -left-20 top-1/3 size-64 rounded-full bg-coral/80"
          aria-hidden
        />
        <span
          className="absolute -right-16 -top-16 size-64 rounded-full bg-sun"
          aria-hidden
        />
        <BrandLogo className="relative z-10 w-fit text-white [&>span]:bg-white [&>span]:text-ink" />

        <div className="relative z-10 my-auto max-w-xl space-y-6 py-14">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <SparklesIcon className="size-5 text-sun" aria-hidden />
          </span>
          <p className="font-display text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
            Aprende con calma. Avanza con intención.
          </p>
          <p className="max-w-md text-base leading-relaxed text-white/65">
            Tu espacio para entender, practicar y ver cómo todo empieza a
            encajar.
          </p>
        </div>

        <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Matemáticas · Física · Tecnología · Dibujo técnico
        </p>
      </section>

      <section
        className="flex min-h-full items-center justify-center bg-paper-raised px-10 py-14"
        role="region"
        aria-labelledby="auth-shell-title"
      >
        <div className="w-full max-w-md">
          <header className="mb-8 space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink-muted">
              Eaxy Campus
            </p>
            <h1
              id="auth-shell-title"
              className="font-display text-4xl font-extrabold tracking-tight text-ink"
            >
              {title}
            </h1>
            <p className="leading-relaxed text-ink-muted">{description}</p>
          </header>
          {children}
        </div>
      </section>
    </main>
  );
}
