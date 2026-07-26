export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",

        background: "linear-gradient(135deg, #ffffff 0%, #fffefd 100%)",        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <section
        style={{
          textAlign: "center",
          maxWidth: "700px",
        }}
      >
        <p
          style={{
            color: "#5a3f08",
            fontSize: "60px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: 650,
          }}
        >
          Goldkozmos
        </p>

        <h1
          style={{
            fontSize: "50px",
            lineHeight: 1,
            marginBottom: "24px",
          }}
        >
          İnsan Değişmeden
          <br />
          Hayat Değişmez.
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#302f2f",
            lineHeight: 1.8,
            marginBottom: "40px",
          }}
        >
          Kozmik enerji, numeroloji, tarot ve dönüşüm odaklı çalışmalarla
          kendi içsel yolculuğunu keşfet.
        </p>

        <button
          style={{
            background: "#ffffff",
            color: "#fff",
            border: "none",
            padding: "16px 36px",
            borderRadius: "999px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Çalışmaları Keşfet
        </button>
      </section>
    </main>
  );
}