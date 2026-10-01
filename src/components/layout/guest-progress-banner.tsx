import Link from "next/link";

export function GuestProgressBanner() {
  return (
    <div
      className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950"
      data-app-chrome
      data-testid="guest-progress-banner"
    >
      <span>
        Estás usando Eaxy sin cuenta: tu progreso se guarda solo en este navegador y puedes perderlo
        al borrar datos o cambiar de dispositivo.{" "}
      </span>
      <Link href="/registro" className="font-medium text-cobalt underline-offset-4 hover:underline">
        Crear cuenta
      </Link>
      <span> o </span>
      <Link href="/login" className="font-medium text-cobalt underline-offset-4 hover:underline">
        iniciar sesión
      </Link>
      <span> para guardarlo en la nube.</span>
    </div>
  );
}
