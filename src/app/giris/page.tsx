import { Suspense } from "react";

import GirisForm from "./GirisForm";

export const metadata = {
  title: "Giriş Yap",
};

export default function GirisPage() {
  return (
    <main className="goldAuthPage">
      <style>{authPageStyles}</style>
      <p>GOLDKOZMOS</p>
      <h1>Giriş Yap</h1>
      <span>Yorum yazmak için hesabına gir.</span>
      <Suspense fallback={<p>Yükleniyor…</p>}>
        <GirisForm />
      </Suspense>
    </main>
  );
}

const authPageStyles = `
  .goldAuthPage {
    min-height: 100vh;
    padding: 72px 24px 120px;
    background: #fffdf8;
    color: #211811;
  }

  .goldAuthPage > p {
    margin: 0;
    color: #a8792a;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.18em;
  }

  .goldAuthPage h1 {
    margin: 10px 0 8px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 36px;
    font-weight: 400;
  }

  .goldAuthPage > span {
    display: block;
    margin-bottom: 28px;
    color: #6e675d;
    font-size: 15px;
  }

  .goldAuthForm {
    display: grid;
    gap: 14px;
    max-width: 420px;
  }

  .goldAuthForm label {
    display: grid;
    gap: 6px;
    color: #6b4a1e;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .goldAuthForm input {
    width: 100%;
    min-height: 48px;
    padding: 0 14px;
    border: 1px solid rgba(168, 124, 44, 0.24);
    border-radius: 14px;
    background: #fffaf2;
    color: #211811;
    font-size: 16px;
  }

  .goldAuthForm button[type="submit"] {
    min-height: 48px;
    border: 0;
    border-radius: 999px;
    background: linear-gradient(135deg, #2a1c13 0%, #1a120d 100%);
    color: #ddb362;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .goldAuthSwitch {
    border: 0;
    background: transparent;
    color: #8d6728;
    cursor: pointer;
    font-size: 13px;
  }

  .goldAuthError,
  .goldAuthInfo {
    margin: 0;
    font-size: 13px;
  }

  .goldAuthError {
    color: #8a2f1f;
  }
`;
