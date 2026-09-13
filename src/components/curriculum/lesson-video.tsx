import { getYouTubeEmbedUrl } from "@/lib/curriculum/video";

type LessonVideoProps = {
  videoUrl: string;
  title: string;
};

export function LessonVideo({ videoUrl, title }: LessonVideoProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <p className="text-sm text-muted-foreground">
        El vídeo de esta lección no está disponible todavía.
      </p>
    );
  }

  return (
    <div
      className="aspect-video overflow-hidden rounded-lg border border-border bg-black"
      data-testid="lesson-video"
    >
      <iframe
        src={embedUrl}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
