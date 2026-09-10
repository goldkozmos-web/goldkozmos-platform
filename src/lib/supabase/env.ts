function unwrapEnvValue(value: string, names: string[]) {
  let next = value.trim();

  if (
    (next.startsWith('"') && next.endsWith('"')) ||
    (next.startsWith("'") && next.endsWith("'"))
  ) {
    next = next.slice(1, -1).trim();
  }

  for (const name of names) {
    const prefix = `${name}=`;
    if (next.startsWith(prefix)) {
      next = next.slice(prefix.length).trim();
    }
  }

  return next;
}

export function getSupabasePublicEnv() {
  const url = unwrapEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", [
    "NEXT_PUBLIC_SUPABASE_URL",
  ]);
  const publishableKey = unwrapEnvValue(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "",
    [
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    ],
  );

  if (!url || !publishableKey) {
    return null;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }
  } catch {
    return null;
  }

  return { url, publishableKey };
}

export function hasSupabaseConfig() {
  return getSupabasePublicEnv() !== null;
}
