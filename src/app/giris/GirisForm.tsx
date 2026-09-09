"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export default function GirisForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/goldblog";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setLoading(false);
      setError("Giriş altyapısı henüz bağlanmadı.");
      return;
    }

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              display_name: displayName.trim(),
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setInfo("Hesabını doğrulamak için e-postanı kontrol et.");
          return;
        }

        router.replace(nextPath);
        router.refresh();
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Giriş yapılamadı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="goldAuthForm" onSubmit={handleSubmit}>
      {mode === "signup" ? (
        <label>
          Görünen ad
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            autoComplete="name"
          />
        </label>
      ) : null}

      <label>
        E-posta
        <input
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
      </label>

      <label>
        Şifre
        <input
          type="password"
          value={password}
          required
          minLength={6}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
      </label>

      {error ? <p className="goldAuthError">{error}</p> : null}
      {info ? <p className="goldAuthInfo">{info}</p> : null}

      <button type="submit" disabled={loading}>
        {loading ? "Bekle…" : mode === "signup" ? "Hesap Oluştur" : "Giriş Yap"}
      </button>

      <button
        type="button"
        className="goldAuthSwitch"
        onClick={() => {
          setMode(mode === "signup" ? "signin" : "signup");
          setError("");
          setInfo("");
        }}
      >
        {mode === "signup"
          ? "Zaten hesabın var mı? Giriş yap"
          : "Hesabın yok mu? Kayıt ol"}
      </button>
    </form>
  );
}
