"use client";

import { useState } from "react";

import AyarlarFrame from "./AyarlarFrame";

export default function AyarlarSorun() {
  const [note, setNote] = useState("");

  return (
    <AyarlarFrame title="Sorun Bildir" backHref="/ayarlar">
      {() => (
        <form
          className="ayarlarCard ayarlarForm"
          onSubmit={(event) => {
            event.preventDefault();
            const text = note.trim() || "Merhaba, bir sorun bildirmek istiyorum.";
            window.location.href = `https://wa.me/905054722153?text=${encodeURIComponent(text)}`;
          }}
        >
          <label>
            Ne oldu?
            <textarea
              value={note}
              rows={5}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Kısaca yaz."
            />
          </label>
          <button type="submit">WhatsApp ile gönder</button>
        </form>
      )}
    </AyarlarFrame>
  );
}
