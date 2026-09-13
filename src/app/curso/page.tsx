import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseOutlinePanel } from "@/components/learning/course-outline";
import { getAuthenticatedUserId } from "@/lib/auth/session";
import { getDefaultCourseOutline } from "@/lib/content/queries";

export default async function CursoPage() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/entrar");
  }

  const course = await getDefaultCourseOutline();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/aprender"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Volver a Aprender
        </Link>
      </div>

      {!course ? (
        <div className="rounded-lg border border-border bg-paper-raised p-6 text-center">
          <p className="text-muted-foreground">No hay cursos disponibles todavía.</p>
        </div>
      ) : (
        <CourseOutlinePanel course={course} />
      )}
    </main>
  );
}
