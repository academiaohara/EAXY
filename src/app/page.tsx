import Link from "next/link";
import { HeroEquation } from "@/components/marketing/hero-equation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
            Eaxy
          </Link>
          <Link
            href="/entrar"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-cobalt"
          >
            Entrar
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="space-y-6">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
                Matemáticas que se adaptan a ti
              </h1>
              <p className="max-w-md text-lg text-ink-muted">
                Eaxy es aprendizaje adaptativo de matemáticas: estudia por tu cuenta o con tu
                aula, con ejercicios que avanzan a tu ritmo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/registro">
                  <Button size="lg">Crear cuenta</Button>
                </Link>
                <Link href="/entrar">
                  <Button variant="outline" size="lg">Soy alumno</Button>
                </Link>
              </div>
            </div>

            <HeroEquation />
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Dos formas de aprender
            </h2>

            <div className="mt-12 space-y-14">
              <div className="max-w-xl">
                <h3 className="font-display text-xl font-medium text-ink">Aprendizaje personal</h3>
                <p className="mt-3 text-ink-muted">
                  Practica por tu cuenta con un recorrido que se ajusta a lo que ya dominas y a lo
                  que necesitas repasar. Sin esperar al resto del grupo.
                </p>
              </div>

              <div className="max-w-xl border-l-2 border-cobalt pl-6">
                <h3 className="font-display text-xl font-medium text-ink">Aulas</h3>
                <p className="mt-3 text-ink-muted">
                  Tu profesor crea el aula, da de alta a los alumnos y sigue el progreso del grupo.
                  Cada alumno entra con su usuario y contraseña.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-xl space-y-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Empieza hoy
              </h2>
              <p className="text-ink-muted">
                Regístrate gratis y empieza a practicar. Si eres profesor, podrás crear tu aula en
                cuanto esté disponible el acceso docente.
              </p>
              <Link href="/registro">
                <Button>Registrarse</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Eaxy</p>
          <div className="flex gap-4">
            <Link href="/entrar" className="transition-colors hover:text-cobalt">
              Entrar como alumno
            </Link>
            <Link href="/login" className="transition-colors hover:text-cobalt">
              Acceso docente
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
