import Navbar from "../../components/Navbar";
import EnergySchoolSection from "../../components/EnergySchoolSection";
import WhyGoldkozmos from "../../components/WhyGoldkozmos";
import WorkFinderSection from "../../components/WorkFinderSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function EnergySchoolPage() {
  return (
    <main className="homePage" id="top">
      <Navbar />

      <EnergySchoolSection />
      <WhyGoldkozmos />
      <WorkFinderSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}