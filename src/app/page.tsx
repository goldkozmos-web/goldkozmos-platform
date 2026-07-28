import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import IntentSection from "../components/IntentSection";
import EnergySchoolSection from "../components/EnergySchoolSection";
import WhyGoldkozmos from "../components/WhyGoldkozmos";
import ServicesSection from "../components/ServicesSection";
import WorkFinderSection from "../components/WorkFinderSection";
import EventCalendarSection from "../components/EventCalendarSection";
import TestimonialsSection from "../components/TestimonialsSection";
import GoldBookSection from "../components/GoldBookSection";
import GoldCastSection from "../components/GoldCastSection";
import GoldBlogSection from "../components/GoldBlogSection";
import GoldFrekansSection from "../components/GoldFrekansSection";
import InstagramSection from "../components/InstagramSection";
import WhatsAppSection from "../components/WhatsAppSection";
import AboutSection from "../components/AboutSection";
import FAQSection from "../components/src/components/FAQSection";
import "../styles/home.css";

export default function Home() {
  return (
    <main className="homePage">
      <Navbar />
      <Hero />
      <IntentSection />
      <EnergySchoolSection />
      <WhyGoldkozmos />
      <ServicesSection />
      <WorkFinderSection />
      <EventCalendarSection />
      <TestimonialsSection />
      <GoldBookSection />
      <GoldCastSection />
      <GoldBlogSection />
      <GoldFrekansSection />
      <InstagramSection />
      <WhatsAppSection />
      <AboutSection />
      <FAQSection />
    </main>
  );
}