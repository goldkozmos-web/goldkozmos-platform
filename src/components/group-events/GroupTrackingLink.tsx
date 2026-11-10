"use client";

import { useState } from "react";
import s from "./GroupEvents.module.css";

export default function GroupTrackingLink({ path, currentPage = false }: { path: string; currentPage?: boolean }) {
  const [copyMessage, setCopyMessage] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(new URL(path, window.location.origin).href);
      setCopyMessage("Kayıt takip bağlantısı kopyalandı.");
    } catch {
      setCopyMessage("Bağlantıyı açıp tarayıcının adres çubuğundan kopyalayabilirsiniz.");
    }
  }

  return <div className={s.trackingLink}>
    <div className={s.actions}>
      {!currentPage ? <a className={s.button} href={path} target="_blank" rel="noopener noreferrer">Kayıt takip sayfasını aç</a> : null}
      <button type="button" className={`${s.button} ${s.secondary}`} onClick={() => void copy()}>Takip bağlantısını kopyala</button>
    </div>
    <p className={s.note}>Kayıt durumunuza daha sonra erişmek için bu kişisel bağlantıyı saklayın. Başkalarıyla paylaşmayın.</p>
    {copyMessage ? <p className={s.note} role="status">{copyMessage}</p> : null}
  </div>;
}
