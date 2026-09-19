export const SITE_DRAWER_EVENT = "goldkozmos:open-drawer";

export type SiteDrawerId = "journal" | "duyguRehberi";

export function openSiteDrawer(id: SiteDrawerId) {
  window.dispatchEvent(
    new CustomEvent(SITE_DRAWER_EVENT, { detail: { id } }),
  );
}
