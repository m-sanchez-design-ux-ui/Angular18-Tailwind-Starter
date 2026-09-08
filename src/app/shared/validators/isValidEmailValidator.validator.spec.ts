import { FormControl } from '@angular/forms';
import { isValidEmailValidator } from './isValidEmailValidator.validator';

describe('isValidEmailValidator', () => {
  const validator = isValidEmailValidator();

  it('returns null for a valid email', () => {
    const control = new FormControl('user@example.com');
    expect(validator(control)).toBeNull();
  });

  it('returns a validation error for an invalid email', () => {
    const control = new FormControl('not-an-email');
    expect(validator(control)).toEqual({ isValidEmail: true });
  });

  it('returns a validation error for an empty value', () => {
    const control = new FormControl('');
    expect(validator(control)).toEqual({ isValidEmail: true });
  });

  it('returns null for an email with a subdomain', () => {
    const control = new FormControl('user@mail.example.com');
    expect(validator(control)).toBeNull();
  });
});
