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

function ResonanceCards({ items }: { items: WorkCard[] }) {
  return (
    <div className="homeV3ResonanceGrid">
      {items.map((item, index) => (
        <article className="homeV3ResonanceCard" key={item.title}>
          <a className="homeV3ResonanceImage" {...linkProps(item.href)}>
            <img src={item.image} alt={item.title} />
          </a>
          <div className="homeV3ResonanceContent">
            <p className="homeV3CardEyebrow">
              {String(index + 1).padStart(2, "0")} · {item.title.split(" ")[0].toUpperCase()}
            </p>
            <h3>{item.title}</h3>
            <p className="homeV3ResonanceText">{item.text}</p>
            <div className="homeV3ResonanceBottom">
              {item.price ? <strong>{item.price}</strong> : <span />}
              <a {...linkProps(item.href)}>
                {item.cta}
                <span>→</span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function OtherCards({ items }: { items: WorkCard[] }) {
  return (
    <div className="homeV3OtherSlider">
      {items.map((item) => (
        <a
          className="homeV3OtherCard"
          key={item.title}
          {...linkProps(item.href)}
        >
          <div className="homeV3OtherVisual">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="homeV3OtherContent">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="homeV3OtherCardBottom">
              {item.price ? <strong>{item.price}</strong> : <span />}
              <span className="homeV3OtherCardCta">
                {item.cta}
                <span>→</span>
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function ArchiveCards({ items }: { items: WorkCard[] }) {
  return (
    <div className="homeV3LiveArchiveGrid">
      {items.map((item) => (
        <article className="homeV3LiveArchiveCard" key={item.title}>
            <a
              key={`${item.title}-image`}
              className="homeV3LiveArchiveImage"
              {...linkProps(item.href)}
            >
            <img src={item.image} alt={item.title} />
          </a>
          <div className="homeV3LiveArchiveBody">
            <p>{item.duration ?? "Çalışma"}</p>
            <h3>{item.title}</h3>
            <div className="homeV3LiveArchiveText">{item.text}</div>
            <div className="homeV3LiveArchiveBottom">
              {item.price ? <strong>{item.price}</strong> : <span />}
              <a {...linkProps(item.href)}>
                {item.cta}
                <span>→</span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function EnergyCards({ items }: { items: WorkCard[] }) {
  return (
    <div className="homeV3AudioEnergyGrid">
      {items.map((item) => {
        const href = item.buyHref ?? item.href;
        return (
          <article className="homeV3AudioEnergyProduct" key={item.title}>
            <a
              className="homeV3AudioEnergyImage"
              {...linkProps(href)}
              aria-label={`${item.title} incele`}
            >
              <img src={item.image} alt={item.title} />
            </a>
            <div className="homeV3AudioEnergyBody">
              <p className="homeV3AudioEnergyCategory">
                {[item.duration, item.price].filter(Boolean).join(" · ") ||
                  "Enerji çalışması"}
              </p>
              <h3>{item.title}</h3>
              <div className="homeV3AudioEnergyText">{item.text}</div>
              <div className="homeV3AudioEnergyBottom">
                {item.price ? <strong>{item.price}</strong> : <span />}
                <a {...linkProps(item.href)}>
                  {item.cta}
                  <span>{isExternal(item.href) ? "↗" : "→"}</span>
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function CalismalarHub() {
  const cards = allWorkCards();

  return (
    <main className="homeV3Page gkRouteIn" id="top">
      <HomeNavbar />

      {WORK_HUB_SECTIONS.map((section) => {
        const items = cards.filter((item) => item.group === section.id);
        if (!items.length) return null;

        if (section.variant === "resonance") {
          return (
            <section
              className="homeV3Resonance"
              id={section.id}
              key={section.id}
            >
              <div className="homeV3Container">
                <div className="homeV3SectionHeading">
                  <div>
                    <p className="homeV3Eyebrow">{section.eyebrow}</p>
                    <h2>
                      {section.title}
                      <span> {section.accent}</span>
                    </h2>
                  </div>
                  <p>{section.lead}</p>
                </div>
                <ResonanceCards items={items} />
              </div>
            </section>
          );
        }

        if (section.variant === "other") {
          return (
            <section className="homeV3Other" id={section.id} key={section.id}>
              <div className="homeV3Container">
                <div className="homeV3PersonalHub">
                  <div className="homeV3PersonalLeft">
                    <div className="homeV3PersonalHeading">
                      <p className="homeV3Eyebrow">{section.eyebrow}</p>
                      <h2>
                        {section.title}
                        <span> {section.accent}</span>
                      </h2>
                      <p className="homeV3PersonalDescription">{section.lead}</p>
                    </div>
                    <OtherCards items={items} />
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (section.variant === "energy") {
          return (
            <section
              className="homeV3AudioEnergy"
              id={section.id}
              key={section.id}
            >
              <div className="homeV3AudioEnergyInner">
                <div className="homeV3AudioEnergyHeading">
                  <div>
                    <p className="homeV3Eyebrow">{section.eyebrow}</p>
                    <h2>
                      {section.title}
                      <span> {section.accent}</span>
                    </h2>
                  </div>
                  <p>{section.lead}</p>
                </div>
                <EnergyCards items={items} />
              </div>
            </section>
          );
        }

        return (
          <section
            className="homeV3LiveArchive"
            id={section.id}
            key={section.id}
          >
            <div className="homeV3LiveArchiveInner">
              <div className="homeV3LiveArchiveHeading">
                <div>
                  <p className="homeV3Eyebrow">{section.eyebrow}</p>
                  <h2>
                    {section.title}
                    <span> {section.accent}</span>
                  </h2>
                </div>
                <p>{section.lead}</p>
              </div>
              <ArchiveCards items={items} />
            </div>
          </section>
        );
      })}

      <FooterSection />
    </main>
  );
}
