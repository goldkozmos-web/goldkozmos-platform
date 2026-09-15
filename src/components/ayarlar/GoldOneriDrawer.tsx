"use client";

import { useState } from "react";

import { SuggestPanel } from "../profilim/ProfilimPanels";
import ProfilimDrawer from "../profilim/ProfilimDrawer";

export default function GoldOneriDrawer({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <ProfilimDrawer eyebrow="DESTEK" title="Gold’a Öneri" onClose={onClose}>
      <SuggestPanel />
    </ProfilimDrawer>
  );
}

export function useGoldOneri() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
