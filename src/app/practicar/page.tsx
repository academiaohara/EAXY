import { redirect } from "next/navigation";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseOverview } from "@/lib/learning/queries";
import {
  resolveDefaultPracticePath,
  resolveRecommendedPracticePath,
} from "@/lib/learning/resolve-practice-path";
import { getStudentRecommendation } from "@/lib/recommendations/queries";

export default async function PracticarIndexPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (studentId) {
    const [overview, recommendation] = await Promise.all([
      getCourseOverview(),
      getStudentRecommendation(studentId),
    ]);

    const recommendedPath = resolveRecommendedPracticePath(recommendation?.conceptId);
    if (recommendedPath) {
      redirect(recommendedPath);
    }

    const path = resolveDefaultPracticePath(overview.concepts);
    if (path) {
      redirect(path);
    }
  } else {
    const path = resolveDefaultPracticePath();
    if (path) {
      redirect(path);
    }
  }

  redirect("/aprender");
}
