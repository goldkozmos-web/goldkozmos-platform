import Navbar from "../../components/Navbar";
import WhatsAppSection from "../../components/WhatsAppSection";
import FAQSection from "../../components/FAQSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function AppointmentPage() {
  return (
    <main className="homePage appointmentPage" id="top">
      <Navbar />

      <WhatsAppSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}