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

function WorkCards({ items }: { items: WorkCard[] }) {
  return (
    <div className="homeV3ResonanceGrid">
      {items.map((item, index) => (
        <article className="homeV3ResonanceCard" key={item.title}>
          <a className="homeV3ResonanceImage" {...linkProps(item.href)}>
            <img src={item.image} alt={item.title} />
          </a>
          <div className="homeV3ResonanceContent">
            <p className="homeV3CardEyebrow">
              {item.eyebrow ??
                `${String(index + 1).padStart(2, "0")} · ${item.title.split(" ")[0].toUpperCase()}`}
            </p>
            <h3>{item.title}</h3>
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

  return (
    <main className="homeV3Page gkRouteIn calismalarHub" id="top">
      <HomeNavbar />

      {WORK_HUB_SECTIONS.map((section) => {
        const items = cards.filter((item) => item.group === section.id);
        if (!items.length) return null;
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
            <section className="homeV3Other" id={section.id} key={section.id}>
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
              className="homeV3AudioEnergy"
              id={section.id}
              key={section.id}
            >
              <div className="homeV3AudioEnergyInner">
                <div className="homeV3AudioEnergyHeading">
                  <div>{heading}</div>
                  <p>{section.lead}</p>
                </div>
                <WorkCards items={items} />
              </div>
            </section>
          );
        }

        if (section.variant === "archive") {
          return (
            <section
              className="homeV3LiveArchive"
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
          <section className="homeV3Resonance" id={section.id} key={section.id}>
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
