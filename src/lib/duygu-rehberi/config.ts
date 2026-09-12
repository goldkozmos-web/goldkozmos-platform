export const DUYGU_REHBERI_PUBLIC_PDF_PATH = "/guides/duygu-rehberi.pdf";
export const DUYGU_REHBERI_MANIFEST_PATH = "/guides/duygu-rehberi.json";
export const DUYGU_REHBERI_DOWNLOAD_NAME = "GoldKozmos-Duygu-Rehberi.pdf";

export type DuyguRehberiManifest = {
  pdfUrl?: string;
  downloadName?: string;
};

export function duyguRehberiEnvPdfUrl() {
  return (process.env.NEXT_PUBLIC_DUYGU_REHBERI_PDF_URL ?? "").trim();
}

export function duyguRehberiManifestUrl() {
  return (
    (process.env.NEXT_PUBLIC_DUYGU_REHBERI_MANIFEST_URL ?? "").trim() ||
    DUYGU_REHBERI_MANIFEST_PATH
  );
}
