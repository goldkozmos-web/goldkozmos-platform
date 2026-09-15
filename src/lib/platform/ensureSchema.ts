export function isMissingRelation(message: string | undefined) {
  const text = (message || "").toLowerCase();
  return (
    text.includes("schema cache") ||
    text.includes("does not exist") ||
    text.includes("could not find the table")
  );
}

export async function recoverMissingTable(message: string | undefined) {
  if (!isMissingRelation(message)) return false;
  const response = await fetch("/api/platform/ensure-schema", {
    method: "POST",
    credentials: "same-origin",
  });
  return response.ok;
}
