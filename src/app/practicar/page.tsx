import { redirect } from "next/navigation";
import { curriculum, getConceptById, getOrderedConcepts } from "@/content";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { isContentPreviewModeEnabled, PREVIEW_GUEST_ID } from "@/lib/content-preview/mode";
import { getCourseOverview } from "@/lib/learning/queries";
import { pickPracticeConceptSlug } from "@/lib/learning/pick-practice-concept";
import { getStudentRecommendation } from "@/lib/recommendations/queries";

export default async function PracticarIndexPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId && !isContentPreviewModeEnabled()) {
    redirect("/entrar");
  }

  const effectiveStudentId = studentId ?? PREVIEW_GUEST_ID;

  const [overview, recommendation] = await Promise.all([
    getCourseOverview(),
    getStudentRecommendation(effectiveStudentId),
  ]);

  if (recommendation?.conceptId) {
    const concept = getConceptById(recommendation.conceptId, curriculum);
    if (concept) {
      redirect(`/practicar/${concept.slug}`);
    }
  }

  const slug =
    pickPracticeConceptSlug(overview.concepts) ??
    getOrderedConcepts(curriculum)[0]?.slug;

  if (!slug) {
    redirect("/aprender");
  }

  redirect(`/practicar/${slug}`);
}
