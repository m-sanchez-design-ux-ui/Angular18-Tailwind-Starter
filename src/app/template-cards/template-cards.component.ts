import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb/breadcrumb.component';
import { FeatherModule } from 'angular-feather';
import { NotificationsComponent } from '../shared/notifications/notifications.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-template-cards',
  standalone: true,
  imports: [BreadcrumbComponent, FeatherModule, NotificationsComponent, CommonModule, FormsModule],
  templateUrl: './template-cards.component.html',
  styleUrl: './template-cards.component.css',
})
export class TemplateCardsComponent implements OnInit {
  breadcrumb: BreadcrumbItem[] = [
    {
      text: 'Cards',
      isLink: false,
      routerLink: '',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.666 3.33301H3.33268C2.41352 3.33301 1.66602 4.08051 1.66602 4.99967V14.9997C1.66602 15.9188 2.41352 16.6663 3.33268 16.6663H16.666C17.5852 16.6663 18.3327 15.9188 18.3327 14.9997V4.99967C18.3327 4.08051 17.5852 3.33301 16.666 3.33301ZM5.83268 13.333C5.37268 13.333 4.99935 12.9597 4.99935 12.4997C4.99935 12.0397 5.37268 11.6663 5.83268 11.6663C6.29268 11.6663 6.66602 12.0397 6.66602 12.4997C6.66602 12.9597 6.29268 13.333 5.83268 13.333ZM5.83268 10.833C5.37268 10.833 4.99935 10.4597 4.99935 9.99967C4.99935 9.53967 5.37268 9.16634 5.83268 9.16634C6.29268 9.16634 6.66602 9.53967 6.66602 9.99967C6.66602 10.4597 6.29268 10.833 5.83268 10.833ZM5.83268 8.33301C5.37268 8.33301 4.99935 7.95967 4.99935 7.49967C4.99935 7.03967 5.37268 6.66634 5.83268 6.66634C6.29268 6.66634 6.66602 7.03967 6.66602 7.49967C6.66602 7.95967 6.29268 8.33301 5.83268 8.33301ZM14.166 13.333H9.16602C8.70518 13.333 8.33268 12.9597 8.33268 12.4997C8.33268 12.0397 8.70518 11.6663 9.16602 11.6663H14.166C14.6268 11.6663 14.9993 12.0397 14.9993 12.4997C14.9993 12.9597 14.6268 13.333 14.166 13.333ZM14.166 10.833H9.16602C8.70518 10.833 8.33268 10.4597 8.33268 9.99967C8.33268 9.53967 8.70518 9.16634 9.16602 9.16634H14.166C14.6268 9.16634 14.9993 9.53967 14.9993 9.99967C14.9993 10.4597 14.6268 10.833 14.166 10.833ZM14.166 8.33301H9.16602C8.70518 8.33301 8.33268 7.95967 8.33268 7.49967C8.33268 7.03967 8.70518 6.66634 9.16602 6.66634H14.166C14.6268 6.66634 14.9993 7.03967 14.9993 7.49967C14.9993 7.95967 14.6268 8.33301 14.166 8.33301Z" fill="currentColor"/>
                </svg>`,
    },
  ];

  selectedOptionMO: string = '';

  optionsMO = [
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
    { value: '7', label: 'Domingo' },
  ];

  selectedOptionTU: string = '';

  optionsTU = [
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
    { value: '7', label: 'Domingo' },
  ];

  selectedOptionWE: string = '';

  optionsWE = [
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
    { value: '7', label: 'Domingo' },
  ];

  selectedOptionTH: string = '';

  optionsTH = [
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
    { value: '7', label: 'Domingo' },
  ];

  selectedOptionFR: string = '';

  optionsFR = [
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
    { value: '7', label: 'Domingo' },
  ];

  selectedOptionSA: string = '';

  optionsSA = [
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
    { value: '7', label: 'Domingo' },
  ];

  selectedOptionSU: string = '';

  optionsSU = [
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
    { value: '7', label: 'Domingo' },
  ];

  selectedOption1: string = '';

  options1 = [
    { value: '1', label: 'Horas' },
    { value: '2', label: 'Minutos' },
    { value: '3', label: 'Segundos' },
  ];

  selectedOption2: string = '';

  options2 = [
    { value: '1', label: 'Horas' },
    { value: '2', label: 'Minutos' },
    { value: '3', label: 'Segundos' },
  ];

  selectedOption3: string = '';

  options3 = [
    { value: '1', label: 'Horas' },
    { value: '2', label: 'Minutos' },
    { value: '3', label: 'Segundos' },
  ];

  ngOnInit(): void {
    initFlowbite();
  }
}
