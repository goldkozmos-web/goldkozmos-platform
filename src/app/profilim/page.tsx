import ProfilimClient from "./ProfilimClient";

export const metadata = {
  title: "Profilim",
};

export default function ProfilimPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 24px 120px",
        background: "#fffdf8",
        color: "#211811",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 32,
          fontWeight: 400,
        }}
      >
        Profilim
      </h1>
      <div style={{ marginTop: 24, display: "grid", gap: 12, maxWidth: 420 }}>
        <ProfilimClient />
      </div>
    </main>
  );
}
