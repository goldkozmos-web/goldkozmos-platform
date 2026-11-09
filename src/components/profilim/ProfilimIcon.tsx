const paths: Record<string, string> = {
 "BUGÜN": "M12 3v2m0 14v2M3 12h2m14 0h2m-15.4-6.4 1.4 1.4m10 10 1.4 1.4m-12.8 0 1.4-1.4m10-10 1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
 "NİYET": "m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4ZM12 9v6m-3-3h6",
 "GELİŞİM": "M4 19V5m0 14h16M8 15l4-5 4 2 4-7",
 "DEVAM": "M4 14v-3a8 8 0 0 1 16 0v3M4 12h3v7H4zm13 0h3v7h-3z",
 "GÖREV": "m4 7 2 2 3-4m-5 10 2 2 3-4M12 7h8m-8 8h8",
 "İSTATİSTİK": "M4 20h16M7 16v-5m5 5V4m5 12V8",
 "ROZET": "m8 3 1 5m7-5-1 5M6 3h12l-3 5H9ZM18 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-6-3 1 2 2 .3-1.5 1.5.3 2.2-1.8-1-1.8 1 .3-2.2L8 13.3l3-.3Z",
 inbox: "M4 5h16v14H4ZM4 6l8 6 8-6",
 favorites: "M6 3h12v18l-6-4-6 4Z",
 purchases: "M5 7h14l1 14H4ZM8 7V5a4 4 0 0 1 8 0v2",
 appointments: "M4 5h16v15H4ZM8 3v4m8-4v4M4 10h16m-12 4h2m4 0h2",
 library: "M4 4h5v16H4Zm6 0h5v16h-5Zm7 0 3 16",
 journey: "M5 19c0-8 14-2 14-10 0-4-8-1-8-5m-6 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM11 3h5",
 activityHistory: "M4 9a8 8 0 1 1 0 6M4 4v5h5m3-3v6l4 2",
 pdfs: "M6 3h9l4 4v14H6ZM14 3v5h5M9 12h7m-7 4h5",
 emotionJournal: "M12 20S3 15 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 11-9 11Z",
 dreamJournal: "M19 15A8 8 0 0 1 9 4a8 8 0 1 0 10 11Zm-2-11v4m-2-2h4",
 journal: "M5 3h14v18H5Zm4 5h6m-6 4h6m-6 4h4",
 letter: "M4 6h16v14H4Zm0 0 8 8 8-8",
 duyguRehberi: "M12 20S3 15 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 11-9 11Z",
 ritualDone: "M12 3c4 5 6 8 6 12a6 6 0 0 1-12 0c0-4 2-7 6-12Zm-3 12 2 2 4-4",
 ritualNotes: "M6 4h12v17H6Zm3 5h6m-6 4h6m-6 4h3",
 ritualSaved: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z",
};
export default function ProfilimIcon({ name }: { name: string }) {
 return <span className="profilimCardIcon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.journal} /></svg></span>;
}
