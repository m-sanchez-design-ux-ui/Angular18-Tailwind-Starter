import { ActivatedRoute } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { icons } from '../../../shared/icons/icons';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { SignInService } from '../../services/sign-in.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    // The real component reads the origin company id (backed by
    // ConfigService's runtime-loaded settings, never loaded in a unit
    // test) on init, so SignInService is mocked here instead.
    const signInServiceStub = {
      getOriginCompanyId: () => 'demo-company-id',
    };

    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [
        provideHttpClient(),
        provideNoopAnimations(),
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

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
