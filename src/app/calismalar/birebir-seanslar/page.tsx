import Navbar from "../../../components/Navbar";
import OneToOneDetailSection from "../../../components/OneToOneDetailSection";
import FooterSection from "../../../components/FooterSection";
import "../../../styles/home.css";

export default function OneToOneSessionsPage() {
  return (
    <main className="homePage oneToOnePage" id="top">
      <Navbar />

      <OneToOneDetailSection />

      <FooterSection />
    </main>
  );
}