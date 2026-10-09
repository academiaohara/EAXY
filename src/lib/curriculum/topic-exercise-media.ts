function parseUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function isSafeExternalMediaUrl(value: string): boolean {
  return parseUrl(value) !== null;
}

export function toYouTubeEmbedUrl(value: string): string | null {
  const url = parseUrl(value);
  if (!url) {
    return null;
  }

  if (url.hostname === "youtu.be") {
    const videoId = url.pathname.slice(1);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (url.hostname !== "www.youtube.com" && url.hostname !== "youtube.com") {
    return null;
  }

  if (url.pathname === "/watch") {
    const videoId = url.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (url.pathname.startsWith("/embed/")) {
    const videoId = url.pathname.slice("/embed/".length);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  return null;
}
