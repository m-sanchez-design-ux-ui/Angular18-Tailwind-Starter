import { icons } from '../icons/icons';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesComponent } from './datatables.component';

describe('DatatablesComponent', () => {
  let component: DatatablesComponent;
  let fixture: ComponentFixture<DatatablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatablesComponent],
      providers: [provideHttpClient(), importProvidersFrom(FeatherModule.pick(icons))],
    }).compileComponents();

    fixture = TestBed.createComponent(DatatablesComponent);
    component = fixture.componentInstance;
    // titlesList is a required signal input with no default value.
    fixture.componentRef.setInput('titlesList', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
