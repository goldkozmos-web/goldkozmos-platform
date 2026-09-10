const SHOW_TO_LATEST_EPISODE: Record<string, string> = {
  // Kendilik Rezonansı — “Belki de Seni Yoran Hayat Değil, Kendinsin”
  "0343du5jxaHZOJhqDJZKYQ": "2OUemDgzVGfHOcweo3TNLX",
};

export type SpotifyEmbedController = {
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  loadUri: (
    uri: string,
    preferVideo?: boolean,
    startAt?: number,
    theme?: string,
  ) => void;
  destroy: () => void;
  addListener: (
    event: "ready" | "playback_started" | "playback_update",
    callback: (event: {
      data?: {
        isPaused?: boolean;
        position?: number;
        duration?: number;
      };
    }) => void,
  ) => void;
};

type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: {
      uri?: string;
      url?: string;
      width?: string | number;
      height?: string | number;
    },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

export function spotifyEpisodeId(embedUrl: string) {
  try {
    const url = new URL(embedUrl, "https://open.spotify.com");
    const showMatch = url.pathname.match(/\/(?:embed\/)?show\/([A-Za-z0-9]+)/);
    const episodeMatch = url.pathname.match(
      /\/(?:embed\/)?episode\/([A-Za-z0-9]+)/,
    );

    if (showMatch && SHOW_TO_LATEST_EPISODE[showMatch[1]]) {
      return SHOW_TO_LATEST_EPISODE[showMatch[1]];
    }

    return episodeMatch?.[1] ?? null;
  } catch {
    return null;
  }
}

export function spotifyEpisodeUri(embedUrl: string) {
  const id = spotifyEpisodeId(embedUrl);
  return id ? `spotify:episode:${id}` : null;
}

export function spotifyEpisodePageUrl(embedUrl: string) {
  const id = spotifyEpisodeId(embedUrl);
  return id ? `https://open.spotify.com/episode/${id}` : embedUrl;
}

export function spotifyEmbedSrc(embedUrl: string) {
  const id = spotifyEpisodeId(embedUrl);

  if (!id) {
    return embedUrl;
  }

  return `https://open.spotify.com/embed/episode/${id}?utm_source=generator`;
}

let iframeApiPromise: Promise<SpotifyIFrameAPI> | null = null;

export function loadSpotifyIframeApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Spotify iframe API needs a browser."));
  }

  if (!iframeApiPromise) {
    iframeApiPromise = new Promise((resolve) => {
      const previous = window.onSpotifyIframeApiReady;
      window.onSpotifyIframeApiReady = (api) => {
        previous?.(api);
        resolve(api);
      };

      if (!document.querySelector('script[data-goldkozmos-spotify-embed]')) {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        script.dataset.goldkozmosSpotifyEmbed = "true";
        document.body.appendChild(script);
      }
    });
  }

  return iframeApiPromise;
}
