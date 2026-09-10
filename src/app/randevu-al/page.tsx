import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import RandevuAlBooking from "../../components/randevu-al/RandevuAlBooking";
import "../../styles/home.css";
import "../../styles/randevu-al.css";

export const metadata: Metadata = {
  title: "Randevu Al",
  description:
    "GoldKozmos randevu talebi: günü ve çalışmayı seç, uygun saati WhatsApp üzerinden netleştir.",
  robots: { index: false, follow: false },
};

export default function RandevuAlPage() {
  return (
    <main className="randevuAlPage" id="top">
      <Navbar />
      <RandevuAlBooking />
    </main>
  );
}
