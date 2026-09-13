import { cn } from "cn";

export type StudentCredentialCardData = {
  displayName: string;
  username: string;
  password: string;
};

type StudentCredentialCardProps = StudentCredentialCardData & {
  className?: string;
};

export function StudentCredentialCard({
  displayName,
  username,
  password,
  className,
}: StudentCredentialCardProps) {
  return (
    <article
      className={cn(
        "credential-card flex aspect-[1.6/1] min-h-48 flex-col justify-between rounded-lg border border-border bg-paper-raised p-5 text-ink",
        className,
      )}
      data-testid="credential-card"
    >
      <header className="border-b border-border pb-3">
        <p className="font-display text-xl font-semibold tracking-tight">Eaxy</p>
        <p className="text-xs text-ink-muted">Acceso de alumno</p>
      </header>

      <div className="space-y-3 text-sm">
        <p>
          <span className="font-medium text-ink">Nombre:</span>{" "}
          <span className="text-ink-muted">{displayName}</span>
        </p>

        <div className="rounded-md border border-border bg-cobalt-tint/40 px-3 py-2">
          <p className="text-xs font-medium text-ink-muted">Usuario</p>
          <p
            className="mt-0.5 font-mono text-sm font-medium tracking-wide text-ink"
            data-testid="credential-username"
          >
            {username}
          </p>
        </div>

        <div className="rounded-md border border-border bg-cobalt-tint/40 px-3 py-2">
          <p className="text-xs font-medium text-ink-muted">Contraseña</p>
          <p
            className="mt-0.5 font-mono text-sm font-medium tracking-wide text-ink"
            data-testid="credential-password"
          >
            {password}
          </p>
        </div>
      </div>
    </article>
  );
}
