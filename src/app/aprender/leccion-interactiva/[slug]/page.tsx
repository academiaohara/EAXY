import { permanentRedirect } from "next/navigation";
import { getInteractiveLessonContext } from "@/content";
import { interactiveLessonHref } from "@/lib/navigation/learning-trail";
import { notFound } from "next/navigation";

type LegacyInteractiveLessonPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ reiniciar?: string }>;
};

/** Redirige URLs planas antiguas a la ruta curso → tema → lección. */
export default async function LegacyInteractiveLessonPage({
  params,
  searchParams,
}: LegacyInteractiveLessonPageProps) {
  const { slug } = await params;
  const { reiniciar } = await searchParams;
  const context = getInteractiveLessonContext(slug);

  if (!context) {
    notFound();
  }

  const base = interactiveLessonHref(context.course.slug, context.module.slug, slug);
  const href =
    reiniciar === "1" || reiniciar === "true" ? `${base}?reiniciar=1` : base;

  permanentRedirect(href);
}
