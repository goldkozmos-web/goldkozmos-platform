export default function EducationComingSoonNotice() {
  return (
    <aside
      className="rezonansEgitimleriNotice"
      aria-label="Eğitim kayıtları hakkında bilgi"
    >
      <span
        className="rezonansEgitimleriNoticeIcon"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <rect
            x="5.5"
            y="10.5"
            width="13"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M8.5 10.5V8.4a3.5 3.5 0 0 1 7 0v2.1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <div>
        <strong>Eğitim kayıtları hazırlanıyor.</strong>
        <p>Yakında bu alan kullanıma açılacaktır.</p>
      </div>
    </aside>
  );
}
