export function youtubeIdFromUrl(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|v=|embed\/)([\w-]{11})/,
  );

  return match?.[1] ?? null;
}

export function youtubeEmbedSrc(
  id: string,
  autoplay = true,
  startSeconds = 0,
) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1",
  });

  const start = Math.floor(Math.max(0, startSeconds));

  if (start > 1 && start < 4 * 60 * 60) {
    params.set("start", String(start));
  }

  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function sendYoutubeCommand(
  iframe: HTMLIFrameElement | null,
  func: "playVideo" | "pauseVideo" | "stopVideo" | "seekTo",
  args: unknown[] = [],
) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({
      event: "command",
      func,
      args,
    }),
    "*",
  );
}

export function listenToYoutube(iframe: HTMLIFrameElement | null) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "listening", id: "goldkozmos" }),
    "*",
  );
}
