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
        "credential-card flex aspect-[1.6/1] min-h-44 flex-col justify-between rounded-lg border border-dashed border-border bg-white p-4 text-card-foreground",
        className,
      )}
      data-testid="credential-card"
    >
      <header className="border-b border-border pb-2">
        <p className="font-heading text-lg font-semibold tracking-tight">Eaxy</p>
        <p className="text-xs text-muted-foreground">Acceso de alumno</p>
      </header>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Nombre:</span> {displayName}
        </p>
        <p data-testid="credential-username">
          <span className="font-medium">Usuario:</span>{" "}
          <span className="font-mono">{username}</span>
        </p>
        <p data-testid="credential-password">
          <span className="font-medium">Contraseña:</span>{" "}
          <span className="font-mono">{password}</span>
        </p>
      </div>
    </article>
  );
}
