import { Suspense } from "react";

import ProfilimSignIn from "./ProfilimSignIn";

export default function ProfilimGate() {
  return (
    <section className="profilimGate">
      <p className="profilimGateEyebrow">GOLDKOZMOS · PROFİLİM</p>
      <h1>
        Kendi
        <span> kozmosuna gir</span>
      </h1>
      <p className="profilimGateLead">
        Google ile gir, ardından kısa üyelik kartını doldur. Bilgilerin gizli
        kalır; yalnızca senin kozmosun için.
      </p>
      <div className="profilimGateMotto">
        <span />
        <small>Kendi Kozmosunu Bul.</small>
      </div>
      <Suspense>
        <ProfilimSignIn />
      </Suspense>
    </section>
  );
}
