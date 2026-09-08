import { FormControl, FormGroup } from '@angular/forms';
import { MustMatch } from './form-validator.service';

describe('MustMatch', () => {
  it('returns null when both controls have the same value', () => {
    const form = new FormGroup(
      {
        password: new FormControl('secret123'),
        passwordRepeat: new FormControl('secret123'),
      },
      { validators: MustMatch('password', 'passwordRepeat') }
    );

    expect(form.errors).toBeNull();
    expect(form.get('passwordRepeat')?.errors).toBeNull();
  });

  it('sets a mustMatch error on the matching control when values differ', () => {
    const form = new FormGroup(
      {
        password: new FormControl('secret123'),
        passwordRepeat: new FormControl('somethingElse'),
      },
      { validators: MustMatch('password', 'passwordRepeat') }
    );

    expect(form.get('passwordRepeat')?.errors).toEqual({ mustMatch: true });
  });

  it('clears a previously set mustMatch error once values match again', () => {
    const form = new FormGroup(
      {
        password: new FormControl('secret123'),
        passwordRepeat: new FormControl('somethingElse'),
      },
      { validators: MustMatch('password', 'passwordRepeat') }
    );
    expect(form.get('passwordRepeat')?.errors).toEqual({ mustMatch: true });

    form.get('passwordRepeat')?.setValue('secret123');
    form.updateValueAndValidity();

    expect(form.get('passwordRepeat')?.errors).toBeNull();
  });
});
