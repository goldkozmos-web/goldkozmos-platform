"use client";

import Navbar from "../../components/Navbar";
import WorkFinderSection from "../../components/WorkFinderSection";
import ServicesSection from "../../components/ServicesSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function WorkFinderPage() {
  return (
    <main
      className="homeV3Page homePage workFinderPage"
      id="top"
    >
      {/* NAVBAR */}

      <Navbar />

      {/* TEST */}

      <WorkFinderSection />

      {/* ÇALIŞMA ALANLARI */}

      <ServicesSection />

      {/* SSS */}

      <FAQSection />

      {/* FOOTER */}

      <FooterSection />
    </main>
  );
}