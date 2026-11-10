import type { Metadata } from "next";
import GroupRegistrationTracking from "../../../components/group-events/GroupRegistrationTracking";

export const metadata: Metadata = {
  title: "Grup Çalışması Kayıt Takibi",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function GroupRegistrationTrackingPage() {
  return <main><GroupRegistrationTracking /></main>;
}
