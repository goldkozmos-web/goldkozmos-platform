"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "../../styles/home-energy-cosmos.css";

export default function HomeEnergyCosmos() {

  const [burst, setBurst] = useState(0);
  const galaxy = useRef<HTMLDivElement>(null);
  const rotation = useRef<Animation | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      rotation.current?.cancel();
      rotation.current = null;
      if (!motion.matches && galaxy.current) {
        rotation.current = galaxy.current.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
          { duration: 90000, iterations: Infinity },
        );

      }
    };
    sync();
    motion.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      rotation.current?.cancel();
    };
  }, []);



  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  function energize() {

    setBurst(value => value + 1);
    rotation.current?.updatePlaybackRate(12);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => rotation.current?.updatePlaybackRate(1), 1800);
  }

  return <section className="homeEnergyCosmos" aria-label="Enerji çalışmalarını keşfet">
    <div className="homeEnergyCosmosFrame">
      <button type="button" className="homeEnergyCosmosArt" onClick={energize} aria-label="Galaksiye dokun, enerji dalgasını başlat">
        <div className="energyGalaxy" ref={galaxy}><Image src="/images/home/premium-galaxy.webp" alt="" fill sizes="(max-width: 600px) 90vw, 540px" /></div>
        <span className="energyGalaxyHalo" aria-hidden="true" />
        {burst > 0 && <span key={burst} className="energyGalaxyBurst" aria-hidden="true"><i /><i /><i /><b /></span>}
        <span className="energyGalaxyHint">DOKUN · ENERJİYİ HİSSET</span>
      </button>
      <div className="homeEnergyCosmosCopy"><span>GOLDKOZMOS · SANA ÖZEL BİR ALAN</span><h2>Tüm enerji çalışmalarımı <em>keşfet.</em></h2><p>Kendine uygun çalışmayı seç, ilk adımını at.</p><Link href="/calismalar" className="homeEnergyCosmosCta">Çalışmaları incele <span aria-hidden="true">↗</span></Link></div>
    </div>
  </section>;
}


