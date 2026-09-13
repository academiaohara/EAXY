import { redirect } from "next/navigation";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getDefaultCourseId } from "@/lib/curriculum/queries";

export default async function CursoIndexPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId) {
    redirect("/entrar");
  }

  const courseId = await getDefaultCourseId();

  if (!courseId) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-6 sm:p-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Curso</h1>
        <p className="text-muted-foreground">No hay cursos publicados todavía.</p>
      </main>
    );
  }

  redirect(`/curso/${courseId}`);
}
