export function youtubeIdFromUrl(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|v=|embed\/)([\w-]{11})/,
  );

  return match?.[1] ?? null;
}

export function youtubeEmbedSrc(id: string, autoplay = true) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1",
  });

  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function sendYoutubeCommand(
  iframe: HTMLIFrameElement | null,
  func: "playVideo" | "pauseVideo" | "stopVideo",
) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({
      event: "command",
      func,
      args: [],
    }),
    "*",
  );
}
