import Navbar from "../../components/Navbar";
import GoldBlogSection from "../../components/GoldBlogSection";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function GoldBlogPage() {
  return (
    <main className="homePage goldblogPage" id="top">
      <Navbar />

      <GoldBlogSection />

      <FooterSection />
    </main>
  );
}