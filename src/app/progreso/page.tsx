import { redirect } from "next/navigation";

/** El progreso vive ahora en el perfil de la persona usuaria. */
export default function ProgresoPage() {
  redirect("/perfil");
}
