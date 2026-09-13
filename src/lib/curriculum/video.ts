/**
 * Convierte una URL de YouTube en URL de embed. Devuelve null si no es reconocible.
 */
export function getYouTubeEmbedUrl(videoUrl: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,
  ];

  for (const pattern of patterns) {
    const match = videoUrl.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
}
