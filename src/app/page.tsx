import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FooterSection from "../components/FooterSection";
import "../styles/home.css";

export default function HomePage() {
  return (
    <main className="homePage" id="top">
      <Navbar />
      <Hero />
      <FooterSection />
    </main>
  );
}