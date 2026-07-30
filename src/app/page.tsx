import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import IntentSection from "../components/IntentSection";
import ServicesSection from "../components/ServicesSection";
import WorkFinderSection from "../components/WorkFinderSection";
import EventCalendarSection from "../components/EventCalendarSection";
import TestimonialsSection from "../components/TestimonialsSection";
import InstagramSection from "../components/InstagramSection";
import WhatsAppSection from "../components/WhatsAppSection";
import AboutSection from "../components/AboutSection";
import FAQSection from "../components/FAQSection";
import FooterSection from "../components/FooterSection";

import "../styles/home.css";
import "../styles/mobile-home.css";

export default function Home() {
  return (
    <main className="homePage" id="top">
      <Navbar />
      <Hero />
      <IntentSection />
      <ServicesSection />
      <WorkFinderSection />
      <EventCalendarSection />
      <TestimonialsSection />
      <InstagramSection />
      <WhatsAppSection />
      <AboutSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}