import { jwtDecode } from 'jwt-decode';
import { buildFakeJwt } from './mock-data';

describe('buildFakeJwt', () => {
  it('produces a token with three dot-separated parts (header.payload.signature)', () => {
    const token = buildFakeJwt();
    expect(token.split('.').length).toBe(3);
  });

  it('produces a token that jwtDecode can actually decode', () => {
    const token = buildFakeJwt();
    const decoded = jwtDecode<{ id: string; sub: string; role: string[] }>(token);

    expect(decoded.id).toBe('demo-user-id');
    expect(decoded.sub).toBe('demo@example.com');
    expect(decoded.role).toContain('admin');
  });

  it('produces a fresh iat timestamp close to now', () => {
    const before = Math.floor(Date.now() / 1000);
    const token = buildFakeJwt();
    const decoded = jwtDecode<{ iat: number }>(token);

    expect(decoded.iat).toBeGreaterThanOrEqual(before);
  });
});
