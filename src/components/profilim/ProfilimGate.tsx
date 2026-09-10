import ProfilimGoogleButton from "./ProfilimGoogleButton";

export default function ProfilimGate() {
  return (
    <section className="profilimGate">
      <p className="profilimGateEyebrow">GOLDKOZMOS · PROFİLİM</p>
      <h1>
        Kendi
        <span> kozmosuna gir</span>
      </h1>
      <p className="profilimGateLead">
        Google hesabınla devam et. Girişten sonra gelişim panelin, kütüphanen
        ve yolculuğun burada toplanır.
      </p>
      <div className="profilimGateMotto">
        <span />
        <small>Kendi Kozmosunu Bul.</small>
      </div>
      <ProfilimGoogleButton />
    </section>
  );
}
