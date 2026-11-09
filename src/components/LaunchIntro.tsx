"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LaunchIntro.module.css";
export default function LaunchIntro(){
 const [visible,setVisible]=useState(true);
 useEffect(()=>{const timer=window.setTimeout(()=>setVisible(false),1400);return()=>window.clearTimeout(timer);},[]);
 if(!visible)return null;
 return <div className={styles.intro} aria-hidden="true"><div className={styles.content}><div className={styles.emblem}><span className={styles.orbit}/><span className={styles.innerOrbit}/><Image src="/images/brand/goldkozmos-gk-google-logo.png" alt="" width={112} height={112} priority/><span className={styles.spark}>✦</span></div><p className={styles.brand}>GOLDKOZMOS<sup>®</sup></p><p className={styles.motto}>Kendi Kozmosunu Bul</p><span className={styles.line}/></div></div>;
}
