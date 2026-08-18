import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #090705 0%, #251408 58%, #0b0805 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            border:
              "1px solid rgba(210, 166, 82, 0.22)",
            right: -100,
            top: -120,
          }}
        />

        <div
          style={{
            color: "#d5a94e",
            fontSize: 23,
            letterSpacing: 8,
            marginBottom: 24,
          }}
        >
          GOLDKOZMOS®
        </div>

        <div
          style={{
            fontFamily: "serif",
            fontSize: 74,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          İnsan değişmeden
        </div>

        <div
          style={{
            fontFamily: "serif",
            fontSize: 74,
            lineHeight: 1.05,
            color: "#d5a94e",
            maxWidth: 900,
          }}
        >
          hayat değişmez.
        </div>

        <div
          style={{
            marginTop: 34,
            color: "#d7d0c5",
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          KİŞİSEL GELİŞİM · STOA · REZONANS
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}