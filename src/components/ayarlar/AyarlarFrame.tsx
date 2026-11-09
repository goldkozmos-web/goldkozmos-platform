"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useSettingsSession } from "./AyarlarSessionProvider";
import type { ProfilimUser } from "../../lib/profilim/types";
import ProfilimGate from "../profilim/ProfilimGate";

export default function AyarlarFrame({
  backHref = "/profilim",
  title,
  children,
}: {
  backHref?: string;
  title: string;
  children: (user: NonNullable<ProfilimUser>) => ReactNode;
}) {
  const router = useRouter();
  const { user, ready, error, retry } = useSettingsSession();

  if (!ready) {
    return (
      <div className="ayarlarShell">
        <header className="ayarlarHead">
          <a href={backHref} className="ayarlarBack" aria-label="Geri">
            ←
          </a>
          <h1>{title}</h1>
        </header>
        <p role="status">Ayarların açılıyor…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="ayarlarShell">
        {error ? <div className="adminPanel ayarlarCard ayarlarCopy" role="alert"><p>{error}</p><button type="button" onClick={retry}>Yeniden dene</button></div> : null}
        <ProfilimGate />
      </div>
    );
  }

  return (
    <div className="ayarlarShell">
      <header className="ayarlarHead">
        <a
          href={backHref}
          className="ayarlarBack"
          aria-label="Geri"
          onClick={(event) => {
            if (backHref === "/ayarlar" || backHref === "/profilim") {
              event.preventDefault();
              router.push(backHref);
            }
          }}
        >
          ←
        </a>
        <h1>{title}</h1>
      </header>
      {children(user)}
    </div>
  );
}
