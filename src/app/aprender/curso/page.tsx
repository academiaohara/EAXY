import Link from "next/link";
import { requireAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { getDefaultCourseOutline } from "@/lib/content/queries";
import { CourseOutlineView } from "@/components/learning/course-outline";
import { Button } from "@/components/ui/button";

export default async function CursoPage() {
  const studentId = await requireAuthenticatedUserOrRedirect();
  const course = await getDefaultCourseOutline(studentId);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-8">
      <Button variant="outline" className="w-fit" asChild>
        <Link href="/aprender">Volver a Aprender</Link>
      </Button>
      <CourseOutlineView course={course} />
    </main>
  );
}
