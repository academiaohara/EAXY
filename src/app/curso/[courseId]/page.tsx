import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CourseOutlineView } from "@/components/curriculum/course-outline";
import { Button } from "@/components/ui/button";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseOutline } from "@/lib/curriculum/queries";

type CursoPageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CursoPage({ params }: CursoPageProps) {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId) {
    redirect("/entrar");
  }

  const { courseId } = await params;
  const outline = await getCourseOutline(studentId, courseId);

  if (!outline) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6 sm:p-8">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            {outline.course.title}
          </h1>
          <Link href="/aprender">
            <Button variant="outline">Volver a Aprender</Button>
          </Link>
        </div>
        {outline.course.description && (
          <p className="text-muted-foreground">{outline.course.description}</p>
        )}
      </header>

      <CourseOutlineView outline={outline} />
    </main>
  );
}
