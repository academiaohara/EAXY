import { AdultLoginForm } from "@/components/auth/adult-login-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      title="Iniciar sesión"
      description="Entra para guardar tu progreso y continuar desde cualquier dispositivo."
    >
      <AdultLoginForm />
    </AuthShell>
  );
}
