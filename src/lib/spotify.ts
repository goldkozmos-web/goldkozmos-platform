const SHOW_TO_LATEST_EPISODE: Record<string, string> = {
  // Kendilik Rezonansı — “Belki de Seni Yoran Hayat Değil, Kendinsin”
  "0343du5jxaHZOJhqDJZKYQ": "2OUemDgzVGfHOcweo3TNLX",
};

export function spotifyEmbedSrc(embedUrl: string, autoplay = false): string {
  try {
    const url = new URL(embedUrl, "https://open.spotify.com");
    const showMatch = url.pathname.match(/\/(?:embed\/)?show\/([A-Za-z0-9]+)/);
    const episodeMatch = url.pathname.match(
      /\/(?:embed\/)?episode\/([A-Za-z0-9]+)/,
    );
    if (showMatch) {
      const episodeId = SHOW_TO_LATEST_EPISODE[showMatch[1]];
      if (episodeId) url.pathname = `/embed/episode/${episodeId}`;
    } else if (episodeMatch) {
      url.pathname = `/embed/episode/${episodeMatch[1]}`;
    }
    url.searchParams.set("utm_source", "generator");
    url.searchParams.set("utm_medium", "copy_link");
    url.searchParams.set("theme", "0");
    url.searchParams.delete("t");
    if (autoplay) url.searchParams.set("autoplay", "1");
    else url.searchParams.delete("autoplay");
    return url.toString();
  } catch {
    return embedUrl;
  }
}
