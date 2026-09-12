"use client";

import { useEffect, useState } from "react";

import {
  DUYGU_REHBERI_CARD_COPY,
  DUYGU_REHBERI_FAMILIES,
  DUYGU_REHBERI_LEAD,
  DUYGU_REHBERI_SECTIONS,
} from "../../data/duygu-rehberi";
import {
  DUYGU_REHBERI_DOWNLOAD_NAME,
  DUYGU_REHBERI_PUBLIC_PDF_PATH,
  duyguRehberiEnvPdfUrl,
  duyguRehberiManifestUrl,
  type DuyguRehberiManifest,
} from "../../lib/duygu-rehberi/config";

type PdfState = {
  url: string;
  downloadName: string;
  ready: boolean;
};

async function loadPdfState(): Promise<PdfState> {
  const envUrl = duyguRehberiEnvPdfUrl();
  let url = envUrl;
  let downloadName = DUYGU_REHBERI_DOWNLOAD_NAME;

  if (!url) {
    try {
      const response = await fetch(duyguRehberiManifestUrl(), {
        cache: "no-store",
      });
      if (response.ok) {
        const manifest = (await response.json()) as DuyguRehberiManifest;
        url = (manifest.pdfUrl ?? "").trim();
        if (manifest.downloadName?.trim()) {
          downloadName = manifest.downloadName.trim();
        }
      }
    } catch {
      url = "";
    }
  }

  if (!url) {
    url = DUYGU_REHBERI_PUBLIC_PDF_PATH;
  }

  let ready = Boolean(envUrl);
  try {
    const head = await fetch(url, { method: "HEAD", cache: "no-store" });
    ready = head.ok;
  } catch {
    ready = Boolean(envUrl);
  }

  return { url, downloadName, ready };
}

export default function DuyguRehberiPanel() {
  const [pdf, setPdf] = useState<PdfState | null>(null);
  const [openFamily, setOpenFamily] = useState<string | null>(null);

  useEffect(() => {
    void loadPdfState().then(setPdf);
  }, []);

  return (
    <div className="profilimDrawerStack duyguRehberiPanel">
      <p className="profilimDrawerNote duyguRehberiLead">{DUYGU_REHBERI_LEAD}</p>

      <article className="profilimPdfCard duyguRehberiPdfCard">
        <strong>Duygu Rehberi</strong>
        <small>{DUYGU_REHBERI_CARD_COPY}</small>
        <div className="profilimPdfActions">
          {pdf?.ready ? (
            <>
              <a href={pdf.url} target="_blank" rel="noreferrer">
                PDF’yi Aç
              </a>
              <a href={pdf.url} download={pdf.downloadName}>
                İndir
              </a>
            </>
          ) : (
            <>
              <span>PDF’yi Aç</span>
              <span>İndir</span>
            </>
          )}
        </div>
        {pdf && !pdf.ready ? (
          <small>PDF eklendiğinde buradan açılır ve indirilir.</small>
        ) : null}
      </article>

      <div>
        <p className="profilimDrawerEyebrow">REHBERİN YAPISI</p>
        <ul className="duyguRehberiOutline">
          {DUYGU_REHBERI_SECTIONS.map((section) => (
            <li key={section.id}>{section.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="profilimDrawerEyebrow">ANA DUYGU AİLELERİ</p>
        <ul className="duyguRehberiFamilies">
          {DUYGU_REHBERI_FAMILIES.map((family) => {
            const open = openFamily === family.id;
            return (
              <li key={family.id}>
                <button
                  type="button"
                  className={`duyguRehberiFamily${open ? " isOpen" : ""}`}
                  aria-expanded={open}
                  onClick={() =>
                    setOpenFamily(open ? null : family.id)
                  }
                >
                  <strong>{family.name}</strong>
                  <span>{family.hint}</span>
                </button>
                {open ? (
                  <ul className="duyguRehberiChildren">
                    {family.children.map((child) => (
                      <li key={child}>{child}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
