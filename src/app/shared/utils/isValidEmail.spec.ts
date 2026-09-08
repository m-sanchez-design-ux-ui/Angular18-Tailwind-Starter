import { isValidEmail } from './isValidEmail';

describe('isValidEmail', () => {
  it('returns true for a standard valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('returns true for an email with dots and dashes in the domain', () => {
    expect(isValidEmail('user.name@my-domain.co.uk')).toBe(true);
  });

  it('returns true for an IP-address-based domain', () => {
    expect(isValidEmail('user@[192.168.0.1]')).toBe(true);
  });

  it('returns false when there is no @ symbol', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('returns false when the domain has no TLD', () => {
    expect(isValidEmail('user@localhost')).toBe(false);
  });

  it('returns false for an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('is case-insensitive', () => {
    expect(isValidEmail('USER@EXAMPLE.COM')).toBe(true);
  });
});
