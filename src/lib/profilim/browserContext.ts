export function googleBrowserLaunch(userAgent: string, standalone: boolean) {
  const embedded = /Instagram|FBAN|FBAV|FB_IAB|Line\/|\bwv\b|WebView/i.test(userAgent);
  if (embedded && /Android/i.test(userAgent)) {
    return { embedded, external: true, href: "intent://goldkozmos.com/auth/google#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=https%3A%2F%2Fgoldkozmos.com%2Fprofilim;end" };
  }
  return { embedded, external: standalone || embedded, href: "/auth/google" };
}
