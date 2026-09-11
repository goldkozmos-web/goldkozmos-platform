export function shouldClearProfilimUser(event: string | undefined) {
  return event === "SIGNED_OUT";
}
