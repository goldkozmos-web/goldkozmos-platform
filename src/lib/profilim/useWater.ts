"use client";
import { useCallback, useEffect, useState } from "react";
import { WATER_EVENT, readWaterDay, writeWaterDay, waterRevision, readWaterSettings, writeWaterSettings } from "./waterStore";
import { WATER_DEFAULTS, readWaterPreferences } from './water-schedule';

export function useWater(userId: string) {
  const [glasses,setGlasses]=useState(0);
  const [preferences,setPreferences]=useState(WATER_DEFAULTS);
  const [status,setStatus]=useState("");
  const [pending,setPending]=useState(false);
  useEffect(()=>{
    let active=true;
    function sync(){if(active){setGlasses(readWaterDay(userId).glasses);setPreferences(readWaterSettings(userId));}}
    const initial=setTimeout(sync,0);
    const revision=waterRevision(userId);
    void fetch("/api/profilim/water",{cache:"no-store"}).then(async response=>{
      if(!response.ok)throw Error("Su takibin şu an hesabından alınamadı; cihazındaki kayıt gösteriliyor.");
      const result=await response.json() as {glasses:number|null;preferences:unknown};if(!active)return;
      const prefs=readWaterPreferences(result.preferences);writeWaterSettings(userId,prefs);setPreferences(prefs);
      if(revision!==waterRevision(userId))return;
      if(result.glasses===null){const local=readWaterDay(userId).glasses;if(local>0)void fetch("/api/profilim/water",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({glasses:local})});}
      else{writeWaterDay(userId,result.glasses);sync();}
    }).catch(error=>{if(active)setStatus(error.message);});
    window.addEventListener(WATER_EVENT,sync);window.addEventListener("storage",sync);window.addEventListener("focus",sync);
    const timer=setInterval(sync,30000);
    return()=>{active=false;clearTimeout(initial);clearInterval(timer);window.removeEventListener(WATER_EVENT,sync);window.removeEventListener("storage",sync);window.removeEventListener("focus",sync);};
  },[userId]);
  const save=useCallback(async(next:number)=>{
    if(pending)return;setPending(true);setStatus("");
    const previous=readWaterDay(userId).glasses;writeWaterDay(userId,next);
    try{const response=await fetch("/api/profilim/water",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({glasses:next})});if(!response.ok)throw Error("Hesabına kaydedilemedi. Yeniden deneyebilirsin.");setStatus("Su takibin hesabına kaydedildi.");}
    catch(error){writeWaterDay(userId,previous);setStatus(error instanceof Error?error.message:"Kaydedilemedi.");}
    finally{setPending(false);}
  },[pending,userId]);
  return {glasses,status,pending,save,goal:preferences.goal,preferences};
}
