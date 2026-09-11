export function bearerTokenFromRequest(request?: Request | null) {
  const header = request?.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
}
