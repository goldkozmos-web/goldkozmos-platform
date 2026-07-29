import Script from "next/script";
import { createElement } from "react";

const instagramUrl = "https://www.instagram.com/goldkozmos/";
const beholdFeedId = "3MpT5dx7OCNoVskguei6";

export default function InstagramSection() {
  return (
    <section className="instagramSection" id="instagram">
      <Script
        id="behold-instagram-widget"
        src="https://w.behold.so/widget.js"
        type="module"
        strategy="afterInteractive"
      />

      <div className="instagramContainer">
        <header className="instagramHeading">
          <div>
            <p className="sectionEyebrow">
              <span>
                GOLDKOZMOS
                <sup className="registeredSymbol">®</sup>
              </span>

              <br />

              <span>INSTAGRAM</span>
            </p>

            <h2>
              Kozmosun günlük notlarına
              <span> Instagram’dan eşlik et.</span>
            </h2>
          </div>

          <div className="instagramIntro">
            <p>
              Aşk, ilişkiler, para, enerji, Spiritüel Stoa ve sosyoloji
              üzerine hazırlanan güncel Goldkozmos® içeriklerini keşfet.
            </p>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              @goldkozmos
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <div
          className="instagramLiveFeed"
          style={{
            width: "100%",
            minHeight: "280px",
            marginTop: "42px",
            marginBottom: "42px",
          }}
        >
          {createElement("behold-widget", {
            "feed-id": beholdFeedId,
          })}
        </div>

        <div className="instagramProfileCard">
          <div className="instagramProfileMark" aria-hidden="true">
            
          </div>

          <div className="instagramProfileContent">
            <p>GOLDKOZMOS® ENERJİ EKOLÜ</p>

            <h3>@goldkozmos</h3>

            <span>
              İnsan değişmeden hayat değişmez.
              <br />
              Kendi kozmosunu bul.
            </span>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Instagram’da Takip Et
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}