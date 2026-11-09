"use client";

import Navbar from "../../components/HomeNavbar";
import WorkFinderSection from "../../components/WorkFinderSection";
import ServicesSection from "../../components/ServicesSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";
import "../../styles/work-finder-refined.css";

export default function WorkFinderPage() {
  return (
    <main
      className="homeV3Page homePage workFinderPage"
      id="top"
    >
      {/* NAVBAR */}

      <Navbar />

      {/* TEST */}

      <WorkFinderSection standalone />

      {/* ÇALIŞMA ALANLARI */}

      <ServicesSection />

      {/* SSS */}

      <FAQSection compact />

      {/* FOOTER */}

      <FooterSection />
    </main>
  );
}
