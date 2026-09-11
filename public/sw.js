self.addEventListener("push", (event) => {
  let payload = { title: "GoldKozmos", body: "Yeni hareket var.", url: "/admin" };
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
      icon: "/icon.png",
      badge: "/icon.png",
      data: { url: payload.url || "/admin" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/admin";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      for (const client of windows) {
        if (String(client.url || "").includes("/admin") && "focus" in client) {
          return client.focus();
        }
      }
      return self.clients.openWindow(target);
    }),
  );
});
