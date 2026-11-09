import Image from "next/image";
import FooterSection from "../FooterSection";
import HomeNavbar from "../HomeNavbar";
import {
  WORK_HUB_SECTIONS,
  allWorkCards,
  type WorkCard,
} from "../../data/worksCatalog";

function isExternal(href: string) {
  return href.startsWith("http");
}

function linkProps(href: string) {
  return isExternal(href)
    ? { href, target: "_blank" as const, rel: "noreferrer" }
    : { href };
}

function WorkCards({ items, compact = false }: { items: WorkCard[]; compact?: boolean }) {
  const priceValue = (item: WorkCard) => item.price ? Number(item.price.replace(/[^0-9]/g, "")) : Number.POSITIVE_INFINITY;
  const sortedItems = [...items].sort((a, b) => priceValue(a) - priceValue(b));
  return (
    <div className="homeV3ResonanceGrid">
      {sortedItems.map((item, index) => (
        <article className="homeV3ResonanceCard" key={item.title}>
          <a className="homeV3ResonanceImage" {...linkProps(item.href)}>
            <Image src={item.image} alt={item.title} width={600} height={600} sizes="(max-width:700px) 85vw, 380px" />
          </a>
          <div className="homeV3ResonanceContent">
            {!compact ? <p className="homeV3CardEyebrow">
              {item.eyebrow ??
                `${String(index + 1).padStart(2, "0")} · ${item.title.split(" ")[0].toUpperCase()}`}
            </p> : null}
            <h3>{item.title}</h3>
            {item.duration ? (
              <p className="calismalarHubDuration">{item.duration}</p>
            ) : null}
            <p className="homeV3ResonanceText">{item.text}</p>
            <div className="homeV3ResonanceBottom">
              {item.price ? <strong>{item.price}</strong> : <span />}
              <a {...linkProps(item.href)}>
                {item.cta}
                <span>{isExternal(item.href) ? "↗" : "→"}</span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function CalismalarHub() {
  const cards = allWorkCards();
  const personalCards: WorkCard[] = [
    ...cards.filter((item) => item.group === "birebir").map((item) => ({
      ...item,
      image: item.slug === "tek-birebir-seans"
        ? "/images/services/birebir-enerji-bagi-premium-v2.webp"
        : item.slug === "5-gunluk-yogun-calisma"
          ? "/images/services/bes-gun-kristal-premium-v2.webp"
          : item.slug === "4-haftalik-calisma-paketi"
            ? "/images/services/dort-hafta-lotus-premium-v2.webp"
            : item.image,
      title: item.slug === "tek-birebir-seans" ? "Birebir Çalışma" : item.title,
      duration: item.duration,
      text: item.slug === "tek-birebir-seans"
        ? "Önce sen anlatırsın, ardından konuştuğumuz konulara yönelik enerji çalışması yaparız."
        : item.text,
    })),
    {
      slug: "enerji-calismalari",
      group: "enerji",
      title: "Enerji Odaklı Çalışma",
      duration: "30 dk",
      price: "1.000 TL",
      text: "İhtiyacına uygun enerji çalışmasını seç, içsel dengene ve kendi merkezine odaklan.",
      image: "/images/services/enerji-eller-premium-v2.webp",
      href: "/calismalar/enerji-calismalari",
      cta: "Detayları Gör",
    },
  ];

  return (
    <main className="homeV3Page gkRouteIn calismalarHub" id="top">
      <HomeNavbar />

      <section className="homeV3Resonance calismalarHubBand calismalarHubBand--brown" id="birebir">
        <div className="homeV3Container">
          <div className="homeV3SectionHeading">
            <div>
              <p className="homeV3Eyebrow">BİREBİR ÇALIŞMALAR</p>
              <h1>Kozmik enerji ve <span>kişisel gelişim çalışmaları.</span></h1>
            </div>
          </div>
          <WorkCards items={personalCards} compact />
        </div>
      </section>

      {WORK_HUB_SECTIONS.filter((section) => !["birebir", "yogun-calisma", "enerji", "dijital"].includes(section.id)).map((section) => {
        const items = cards.filter(
          (item) =>
            item.group === section.group &&
            (!section.duration || item.duration === section.duration),
        ).map(item => ({
          ...item,
          image: item.slug === "kendilik-rezonansi"
            ? "/images/services/kendilik-kozmos-ayna-v2.webp"
            : item.slug === "iliski-rezonansi"
              ? "/images/services/iliski-altin-halkalar-v2.webp"
              : item.slug === "bolluk-rezonansi"
                ? "/images/services/bolluk-yasam-agaci-v2.webp"
                : item.image,
        }));
        if (!items.length) return null;
        const bandClass = `calismalarHubBand calismalarHubBand--${section.tone}${items.length === 1 ? " calismalarHubBand--single" : ""}`;
        const heading = (
          <>
            <p className="homeV3Eyebrow">{section.eyebrow}</p>
            <h2>
              {section.title}
              <span> {section.accent}</span>
            </h2>
          </>
        );

        if (section.variant === "other") {
          return (
            <section className={`homeV3Other ${bandClass}`} id={section.id} key={section.id}>
              <div className="homeV3Container">
                <div className="homeV3PersonalHub">
                  <div className="homeV3PersonalLeft">
                    <div className="homeV3PersonalHeading">
                      {heading}
                      <p className="homeV3PersonalDescription">{section.lead}</p>
                    </div>
                    <WorkCards items={items} />
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (section.variant === "energy") {
          return (
            <section
              className={`homeV3AudioEnergy ${bandClass}`}
              id={section.id}
              key={section.id}
            >
              <div className="homeV3AudioEnergyInner">
                <div className="homeV3AudioEnergyHeading">
                  <div>{heading}</div>
                  <p>{section.lead}</p>
                </div>
                <a className="calismalarHubExplore" href="/calismalar/enerji-calismalari">
                  Detayları Gör <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>
          );
        }

        if (section.variant === "archive") {
          return (
            <section
              className={`homeV3LiveArchive ${bandClass}`}
              id={section.id}
              key={section.id}
            >
              <div className="homeV3LiveArchiveInner">
                <div className="homeV3LiveArchiveHeading">
                  <div>{heading}</div>
                  <p>{section.lead}</p>
                </div>
                <WorkCards items={items} />
              </div>
            </section>
          );
        }

        return (
          <section className={`homeV3Resonance ${bandClass}`} id={section.id} key={section.id}>
            <div className="homeV3Container">
              <div className="homeV3SectionHeading">
                <div>{heading}</div>
                <p>{section.lead}</p>
              </div>
              <WorkCards items={items} />
            </div>
          </section>
        );
      })}

      <FooterSection />
    </main>
  );
}


