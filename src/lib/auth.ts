import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET env var — set it to a long random string.");
  }
  return secret;
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

function sign(expiresAt: number): string {
  const hmac = crypto.createHmac("sha256", getSessionSecret()).update(String(expiresAt)).digest("hex");
  return `${expiresAt}.${hmac}`;
}

/** Pure token check — used both from Server Components/Actions and from proxy.ts. */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiresAtRaw, hmac] = token.split(".");
  if (!expiresAtRaw || !hmac) return false;
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  const expected = crypto.createHmac("sha256", getSessionSecret()).update(expiresAtRaw).digest("hex");
  return timingSafeEqualStrings(hmac, expected);
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("Missing ADMIN_PASSWORD env var — set it before enabling the admin panel.");
  }
  return timingSafeEqualStrings(password, expected);
}

export function newSessionCookieValue(): { value: string; expires: Date } {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  return { value: sign(expiresAt), expires: new Date(expiresAt) };
}

/**
 * Defense-in-depth check for every admin Server Action: proxy.ts already
 * gates page navigation, but Server Actions are invoked as their own POST
 * requests and can be reached directly, bypassing a route-based proxy
 * matcher — see Next's own Proxy docs warning on this. Call this first in
 * every admin mutation.
 */
export async function requireAdminSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    throw new Error("Not authenticated");
  }
}
