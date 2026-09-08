import { ActivatedRoute } from '@angular/router';
import { icons } from '../../shared/icons/icons';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedComponent } from './authorized.component';
import { SignInService } from '../../auth/services/sign-in.service';

describe('AuthorizedComponent', () => {
  let component: AuthorizedComponent;
  let fixture: ComponentFixture<AuthorizedComponent>;

  beforeEach(async () => {
    // The real component reads the current auth token's roles on init.
    // There's no real logged-in session in a unit test, so SignInService
    // is mocked here instead of relying on a real (or fake) token.
    const signInServiceStub = {
      getRoles: () => ['admin'],
    };

    await TestBed.configureTestingModule({
      imports: [AuthorizedComponent],
      providers: [
        provideHttpClient(),
        importProvidersFrom(FeatherModule.pick(icons)),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } },
            paramMap: { subscribe: () => {} },
            queryParams: { subscribe: () => {} },
          },
        },
        { provide: SignInService, useValue: signInServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
