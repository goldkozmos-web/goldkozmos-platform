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
        Google ile bir kez girmen yeterli; kaydın kalıcı kalır. İstersen
        telefonuna kod da gönderebiliriz.
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
