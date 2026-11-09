import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { APPOINTMENT_WHATSAPP_URL } from "../../lib/appointments";
export const metadata: Metadata = { title: "WhatsApp’tan Randevu Al", robots: { index: false, follow: false } };
export default function RandevuAlPage() { redirect(APPOINTMENT_WHATSAPP_URL); }
