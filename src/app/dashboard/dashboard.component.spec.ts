import { icons } from '../shared/icons/icons';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SignInService } from '../auth/services/sign-in.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    // The real component decodes the current auth token on init to read
    // an "applications" payload. There's no real logged-in session in a
    // unit test, so SignInService is mocked here instead of relying on
    // a real (or fake) token in localStorage.
    const signInServiceStub = {
      getDecodedToken: () => ({ applications: '[]' }),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        importProvidersFrom(FeatherModule.pick(icons)),
        { provide: SignInService, useValue: signInServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
