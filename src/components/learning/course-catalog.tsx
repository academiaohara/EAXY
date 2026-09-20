import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CourseCatalogEntry } from "@/lib/curriculum/types";

type CourseCatalogViewProps = {
  courses: CourseCatalogEntry[];
};

function lessonCountLabel(count: number): string {
  if (count === 0) {
    return "Próximamente";
  }
  return count === 1 ? "1 lección" : `${count} lecciones`;
}

export function CourseCatalogView({ courses }: CourseCatalogViewProps) {
  return (
    <div className="space-y-4" data-testid="course-catalog">
      <header className="space-y-2">
        <h2 className="font-heading text-xl font-medium">Niveles</h2>
        <p className="text-sm text-muted-foreground">
          Elige tu curso. Iremos añadiendo temas y lecciones en cada nivel.
        </p>
      </header>

      <div className="grid gap-3">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/aprender/curso/${course.id}`}
            data-testid={`course-link-${course.id}`}
          >
            <Card className="p-4 transition-colors hover:bg-paper-raised">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-medium">{course.title}</h3>
                  {course.description ? (
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  ) : null}
                </div>
                <Badge variant={course.lessonCount > 0 ? "default" : "outline"}>
                  {lessonCountLabel(course.lessonCount)}
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
