// ---------------------------------------------------------------------------
// DEMO MOCK DATA
// ---------------------------------------------------------------------------
// This file exists only in this portfolio-demo fork of the project.
// This is a generic starter kit/template — every screen here is
// self-contained UI with no real backend behind it, except login, which
// is mocked below so the app is reachable without a real backend.
// ---------------------------------------------------------------------------

function base64UrlEncode(obj: object): string {
  const json = JSON.stringify(obj);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// The app calls jwtDecode() on the token to read `id`, `sub`, and `role`
// (role must contain something with "admin" to unlock the demo's
// admin-only UI). A plain string token would make jwtDecode throw and
// break the authorized layout, so this needs a real JWT *shape* — the
// signature itself is never verified anywhere in this front-end-only demo.
export function buildFakeJwt(): string {
  const header = { alg: 'none', typ: 'JWT' };
  const payload = {
    id: 'demo-user-id',
    sub: 'demo@example.com',
    role: ['admin'],
    iat: Math.floor(Date.now() / 1000),
  };
  return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.demo-signature`;
}
