self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "GOLDKOZMOS_ACTIVATE") event.waitUntil(self.skipWaiting());
});

self.addEventListener("push", (event) => {
  let payload = { title: "GoldKozmos", body: "Yeni hareket var.", url: "/profilim" };
  try {
    payload = { ...payload, ...event.data.json() };
  } catch {
    try {
      const text = event.data && event.data.text();
      if (text) payload.body = text;
    } catch {
      // Keep defaults.
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || "GoldKozmos", {
      body: payload.body || "Yeni hareket var.",
      icon: "/notifications/goldkozmos-icon.png",
      badge: "/notifications/goldkozmos-badge.png?v=2",
      lang: "tr",
      vibrate: payload.vibration === false ? [] : [160, 80, 160],
      ...(payload.vibration === false ? { silent: true } : {}),
      data: { url: payload.url || "/profilim" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const raw = (event.notification.data && event.notification.data.url) || "/profilim";
  const parsed = new URL(raw, self.location.origin);
  const target = parsed.origin === self.location.origin ? parsed.href : new URL("/profilim", self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      for (const client of windows) {
        if ("focus" in client && new URL(client.url).origin === self.location.origin) {
          return client.navigate(target).then((navigated) => (navigated || client).focus());
        }
      }
      return self.clients.openWindow(target);
    }),
  );
});
