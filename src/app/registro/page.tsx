import { AdultRegisterForm } from "@/components/auth/adult-register-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default function RegistroPage() {
  return (
    <AuthShell
      title="Crear cuenta"
      description="Guarda lo que aprendes, sigue tu dominio y retoma cada lección donde la dejaste."
    >
      <AdultRegisterForm />
    </AuthShell>
  );
}
