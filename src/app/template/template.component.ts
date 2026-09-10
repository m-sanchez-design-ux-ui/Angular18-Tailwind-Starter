import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb/breadcrumb.component';
import { FeatherModule } from 'angular-feather';
import { NotificationsComponent } from '../shared/notifications/notifications.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { initFlowbite } from 'flowbite';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { DatatablesComponent } from '../shared/datatables/datatables.component';
import { Config } from 'datatables.net';
import { LoadingService } from '../shared/loading/loading.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { NotificationsService } from '../shared/notifications/notifications.service';
import { NotificationType } from '../shared/notifications/notifications-models/notification-type';
import { ModalDefaultExampleComponent } from '../shared/modals/modal-default-example/modal-default-example.component';
import { EditModalComponent } from '../shared/modals/edit/edit-modal.component';
import { CreateModalComponent } from '../shared/modals/create/create-modal.component';
import { ModalDeleteComponent } from '../shared/modals/delete/modal-delete.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FeatherModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    DatatablesComponent,
    LoadingComponent,
    NotificationsComponent,
    ModalDefaultExampleComponent,
    EditModalComponent,
    CreateModalComponent,
    ModalDeleteComponent,
    RouterLink,
  ],
  providers: [LoadingService, NotificationsService],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent implements OnInit, AfterViewInit {
  //Multiselect Start

  items = [
    { label: 'Opción 01', value: 1 },
    { label: 'Opción 02', value: 2 },
    { label: 'Opción 03', value: 3 },
    { label: 'Opción 04', value: 4 },
    { label: 'Opción 05', value: 5 },
  ];

  selectedItems: number[] = [];

  //Multiselect End

  //Breadcrumb Start

  breadcrumb: BreadcrumbItem[] = [
    {
      text: 'Título template',
      isLink: false,
      routerLink: '',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.666 11.667H15.8327V15.0003C15.8327 15.2213 15.7449 15.4333 15.5886 15.5896C15.4323 15.7459 15.2204 15.8337 14.9993 15.8337C14.7783 15.8337 14.5664 15.7459 14.4101 15.5896C14.2538 15.4333 14.166 15.2213 14.166 15.0003V11.667H13.3327V15.0003C13.3327 15.2213 13.2449 15.4333 13.0886 15.5896C12.9323 15.7459 12.7204 15.8337 12.4993 15.8337C12.2783 15.8337 12.0664 15.7459 11.9101 15.5896C11.7538 15.4333 11.666 15.2213 11.666 15.0003V11.667H10.8327V15.0003C10.8327 15.2213 10.7449 15.4333 10.5886 15.5896C10.4323 15.7459 10.2204 15.8337 9.99935 15.8337C9.77834 15.8337 9.56637 15.7459 9.41009 15.5896C9.25381 15.4333 9.16602 15.2213 9.16602 15.0003V11.667H8.33268V10.8337H4.99935C4.77834 10.8337 4.56637 10.7459 4.41009 10.5896C4.25381 10.4333 4.16602 10.2213 4.16602 10.0003C4.16602 9.77931 4.25381 9.56735 4.41009 9.41107C4.56637 9.25479 4.77834 9.16699 4.99935 9.16699H8.33268V8.30116C8.27841 8.31777 8.22255 8.32866 8.16602 8.33366H4.99935C4.77834 8.33366 4.56637 8.24586 4.41009 8.08958C4.25381 7.9333 4.16602 7.72134 4.16602 7.50033C4.16602 7.27931 4.25381 7.06735 4.41009 6.91107C4.56637 6.75479 4.77834 6.66699 4.99935 6.66699H8.17018C8.22672 6.67199 8.28258 6.68288 8.33685 6.69949V5.83366H4.99935C4.77834 5.83366 4.56637 5.74586 4.41009 5.58958C4.25381 5.4333 4.16602 5.22134 4.16602 5.00033C4.16602 4.77931 4.25381 4.56735 4.41009 4.41107C4.56637 4.25479 4.77834 4.16699 4.99935 4.16699H8.33268V3.33366C8.33268 2.89163 8.15709 2.46771 7.84453 2.15515C7.53197 1.84259 7.10804 1.66699 6.66602 1.66699H3.33268C2.89065 1.66699 2.46673 1.84259 2.15417 2.15515C1.84161 2.46771 1.66602 2.89163 1.66602 3.33366V17.5003C1.66602 17.7213 1.75381 17.9333 1.91009 18.0896C2.06637 18.2459 2.27834 18.3337 2.49935 18.3337H16.666C17.108 18.3337 17.532 18.1581 17.8445 17.8455C18.1571 17.5329 18.3327 17.109 18.3327 16.667V13.3337C18.3327 12.8916 18.1571 12.4677 17.8445 12.1551C17.532 11.8426 17.108 11.667 16.666 11.667ZM5.41602 15.8337C5.16879 15.8337 4.92711 15.7603 4.72155 15.623C4.51599 15.4856 4.35578 15.2904 4.26117 15.062C4.16656 14.8336 4.1418 14.5823 4.19003 14.3398C4.23827 14.0973 4.35732 13.8746 4.53213 13.6998C4.70695 13.525 4.92968 13.4059 5.17215 13.3577C5.41463 13.3094 5.66596 13.3342 5.89437 13.4288C6.12278 13.5234 6.318 13.6836 6.45535 13.8892C6.5927 14.0948 6.66602 14.3364 6.66602 14.5837C6.66602 14.9152 6.53432 15.2331 6.2999 15.4675C6.06548 15.702 5.74754 15.8337 5.41602 15.8337Z" fill="currentColor"/>
                </svg>`,
    },
    { text: 'Detalle', isLink: false, routerLink: '' },
  ];

  //Breadcrumb End

  //Select Start
  selectedOption: string = '';

  options = [
    { value: '1', label: 'Opción 01' },
    { value: '2', label: 'Opción 02' },
    { value: '3', label: 'Opción 03' },
    { value: '4', label: 'Opción 04' },
  ];
  //Select End

  // Separate handler to be able to remove it and avoid duplicates
  toggleHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;

    // Only applies if the input has the "toggle-switch" class
    if (target && target.classList.contains('toggle-switch')) {
      const label = target.closest('div')?.querySelector('.status-label') as HTMLElement;

      if (!label) return;

      if (target.checked) {
        label.textContent = 'Activo';
        label.classList.remove('bg-red-200', 'text-red-800', 'border', 'border-red-300');
        label.classList.add('bg-green-200', 'text-green-800', 'border', 'border-green-300');
      } else {
        label.textContent = 'Inactivo';
        label.classList.remove('bg-green-200', 'text-green-800', 'border', 'border-green-300');
        label.classList.add('bg-red-200', 'text-red-800', 'border', 'border-red-300');
      }
    }
  };

  // Method that initializes the listeners once
  initSwitches() {
    const tableBody = document.querySelector('.table tbody');

    if (!tableBody) return;

    tableBody.removeEventListener('change', this.toggleHandler);
    tableBody.addEventListener('change', this.toggleHandler);
  }

  ngAfterViewInit() {
    flatpickr('#datepicker-range-start', {
      locale: Spanish,
      dateFormat: 'd/m/Y',
      // Without this, flatpickr falls back to the native OS date
      // picker on touch devices instead of its own styled calendar.
      disableMobile: true,
      // maxDate: "today", // Do not allow future dates to be selected (optional)
    });

    flatpickr('#datepicker-range-end', {
      locale: Spanish,
      dateFormat: 'd/m/Y',
      disableMobile: true,
      // maxDate: "today",
    });

    //for the table with the toggle
    setTimeout(() => {
      this.initSwitches();
    }, 100);
  }

  //Datatable Start
  dtOptions: Config = {};

  titlesList: string[] = ['']; //Here are the table titles when connected

  data: any[] = [
    {
      nombre: 'Combo Clásico',
      sucursal: 'Palermo',
      platos: 2,
      entradas: 1,
      bebida: 'Gaseosa',
      postre: 'Flan',
      precio: '$2.500',
      estado: 'Activo',
    },
    {
      nombre: 'Combo Ejecutivo',
      sucursal: 'Belgrano',
      platos: 3,
      entradas: 2,
      bebida: 'Agua',
      postre: 'Helado',
      precio: '$3.100',
      estado: 'Activo',
    },
    {
      nombre: 'Combo Familiar',
      sucursal: 'Caballito',
      platos: 4,
      entradas: 2,
      bebida: 'Vino',
      postre: 'Tarta',
      precio: '$4.800',
      estado: 'Inactivo',
    },
    {
      nombre: 'Combo Light',
      sucursal: 'Recoleta',
      platos: 1,
      entradas: 1,
      bebida: 'Jugo',
      postre: 'Fruta',
      precio: '$2.100',
      estado: 'Activo',
    },
    {
      nombre: 'Combo Infantil',
      sucursal: 'Almagro',
      platos: 1,
      entradas: 1,
      bebida: 'Limonada',
      postre: 'Gelatina',
      precio: '$1.800',
      estado: 'Activo',
    },
    {
      nombre: 'Combo Vegano',
      sucursal: 'San Telmo',
      platos: 2,
      entradas: 1,
      bebida: 'Agua',
      postre: 'Brownie vegano',
      precio: '$2.900',
      estado: 'Inactivo',
    },
    {
      nombre: 'Combo Premium',
      sucursal: 'Puerto Madero',
      platos: 3,
      entradas: 2,
      bebida: 'Cocktail',
      postre: 'Cheesecake',
      precio: '$5.500',
      estado: 'Activo',
    },
    {
      nombre: 'Combo Tradicional',
      sucursal: 'Villa Urquiza',
      platos: 2,
      entradas: 1,
      bebida: 'Cerveza',
      postre: 'Budín',
      precio: '$2.600',
      estado: 'Activo',
    },
    {
      nombre: 'Combo Express',
      sucursal: 'Microcentro',
      platos: 1,
      entradas: 0,
      bebida: 'Café',
      postre: 'Cookie',
      precio: '$1.300',
      estado: 'Inactivo',
    },
    {
      nombre: 'Combo Especial',
      sucursal: 'Barracas',
      platos: 3,
      entradas: 1,
      bebida: 'Gaseosa',
      postre: 'Mousse',
      precio: '$3.800',
      estado: 'Activo',
    },
  ];

  ngOnInit(): void {
    initFlowbite();

    this.dtOptions = {
      data: this.data,
      order: [[2, 'asc']], // Third column, ascending order
      columns: [
        {
          data: null,
          orderable: false,
          width: '65px',
          render: function (data, type, row, meta) {
            return `
              <div class="flex justify-center items-center">
                  <input id="row-checkbox-${meta.row}" type="checkbox" value="" class="row-checkbox w-4 h-4 text-primary dark:!text-primary_dark bg-gray-100 border-gray-300 rounded-sm focus:ring-primary focus:ring-2">
                  <label for="row-checkbox-${meta.row}" class="sr-only ms-2 text-sm font-medium text-gray-900">Checkbox</label>
              </div>
            `;
          },
        },
        {
          data: 'null',
          title: 'Imagen',
          orderable: false,
          render: function (_data, _type, _row, _meta) {
            return `<div class="overflow-hidden size-10 border-2 border-gray-300 bg-gray-100 rounded-lg"><img class="object-cover w-full h-full [image-rendering:auto]" alt="image default Origin" src="images/cover/cover-default.svg"></div>`;
          },
        },
        { data: 'nombre', title: 'Nombre' },
        { data: 'sucursal', title: 'Sucursal' },
        { data: 'platos', title: 'Platos' },
        { data: 'entradas', title: 'Entradas' },
        { data: 'bebida', title: 'Bebida' },
        { data: 'postre', title: 'Postre' },
        { data: 'precio', title: 'Precio' },
        {
          data: null,
          title: 'Estado',
          render: (data, type, row) => {
            const isChecked = row.activo ? 'checked' : '';
            const labelText = row.activo ? 'Activo' : 'Inactivo';

            return `
            <div class="flex items-center gap-4">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer toggle-switch" ${isChecked} />
                <div class="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-primary_dark dark:bg-gray-500"></div>
              </label>
              <span class="status-label text-xs font-medium px-2.5 py-0.5 rounded-md leading-normal bg-red-200 text-red-800 border border-red-300">
                ${labelText}
              </span>
            </div>
          `;
          },
        },
        {
          title: 'Acciones',
          orderable: false,
          data: null,
          render: function (data, type, row, meta) {
            return `
            <div class="bg-transparent flex gap-4">

              <button onclick="window.location.href='/dashboard'" data-tooltip-target="tooltip-view-detail-${meta.row}" class="group flex justify-center items-center size-8 bg-transparent bg-opacity-100 hover:bg-primary hover:dark:bg-primary_dark hover:bg-opacity-20 rounded-lg">
                <span class="relative size-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6 fill-none">
                    <path class="fill-gray-700 group-hover:fill-white dark:fill-gray-400" d="M12 16C11.2089 16 10.4355 15.7654 9.77772 15.3259C9.11992 14.8864 8.60723 14.2616 8.30448 13.5307C8.00173 12.7998 7.92252 11.9956 8.07686 11.2196C8.2312 10.4437 8.61216 9.73098 9.17157 9.17157C9.73098 8.61216 10.4437 8.2312 11.2196 8.07686C11.9956 7.92252 12.7998 8.00173 13.5307 8.30448C14.2616 8.60723 14.8864 9.11992 15.3259 9.77772C15.7654 10.4355 16 11.2089 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 10C11.6044 10 11.2178 10.1173 10.8889 10.3371C10.56 10.5568 10.3036 10.8692 10.1522 11.2346C10.0009 11.6001 9.96126 12.0022 10.0384 12.3902C10.1156 12.7781 10.3061 13.1345 10.5858 13.4142C10.8655 13.6939 11.2219 13.8844 11.6098 13.9616C11.9978 14.0387 12.3999 13.9991 12.7654 13.8478C13.1308 13.6964 13.4432 13.44 13.6629 13.1111C13.8827 12.7822 14 12.3956 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z"/>
                    <path class="fill-gray-700 group-hover:fill-white dark:fill-gray-400" d="M12 19C5.546 19 2 13.742 2 12C2 10.336 6.612 5 12 5C17.388 5 22 10.336 22 12C22 13.742 18.454 19 12 19ZM4.013 12.028C4.72447 13.5376 5.85657 14.8098 7.27335 15.6917C8.69013 16.5737 10.3314 17.028 12 17C13.6686 17.028 15.3099 16.5737 16.7267 15.6917C18.1434 14.8098 19.2755 13.5376 19.987 12.028C19.624 11.058 16.255 7 12 7C7.745 7 4.376 11.058 4.013 12.028Z"/>
                  </svg>
                </span>              
              </button>

              <div id="tooltip-view-detail-${meta.row}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip">
                  Ver detalle
                  <div class="tooltip-arrow" data-popper-arrow></div>
              </div>

                <button data-modal-target="edit-modal" data-modal-toggle="edit-modal" data-tooltip-target="tooltip-edit-${meta.row}" class="group flex justify-center items-center size-8 bg-transparent bg-opacity-100 hover:bg-primary dark:hover:bg-primary_dark hover:bg-opacity-20 rounded-lg">
                <span class="relative size-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6 fill-none">
                    <path class="fill-gray-700 group-hover:fill-white dark:fill-gray-400" d="M15.7618 18.9188C15.7618 18.9614 15.7458 19.0022 15.7173 19.0322C15.6887 19.0623 15.65 19.0792 15.6096 19.0792H4.97535C4.93498 19.0792 4.89626 19.0623 4.86771 19.0322C4.83916 19.0022 4.82312 18.9614 4.82312 18.9188V7.71491C4.82312 7.67237 4.83916 7.63157 4.86771 7.6015C4.89626 7.57142 4.93498 7.55452 4.97535 7.55452H11.5167L13.3398 5.63374H4.97535C4.4516 5.63425 3.94945 5.85368 3.5791 6.24386C3.20875 6.63404 3.00048 7.1631 3 7.71491V18.9188C3.00048 19.4706 3.20875 19.9997 3.5791 20.3899C3.94945 20.7801 4.4516 20.9995 4.97535 21H15.6096C16.1334 20.9995 16.6355 20.7801 17.0059 20.3899C17.3762 19.9997 17.5845 19.4706 17.585 18.9188V12.0271L15.7618 13.9478V18.9188Z"/>
                    <path class="fill-gray-700 group-hover:fill-white dark:fill-gray-400" d="M20.1957 3.84357C19.6828 3.30343 18.9874 3 18.2623 3C17.5371 3 16.8417 3.30343 16.3288 3.84357L9.23781 11.3135C9.11071 11.4476 9.02412 11.6184 8.98895 11.8043L8.34448 15.2002C8.31744 15.3397 8.3202 15.4839 8.35256 15.6222C8.38493 15.7605 8.44608 15.8894 8.53159 15.9998C8.6171 16.1101 8.72483 16.199 8.84697 16.26C8.96912 16.321 9.10262 16.3527 9.23781 16.3527C9.29898 16.3525 9.36 16.3463 9.42012 16.3344L12.6425 15.6554C12.819 15.6181 12.9811 15.5265 13.1083 15.3923L20.1984 7.92235C20.4528 7.65454 20.6545 7.33651 20.792 6.98646C20.9296 6.63641 21.0003 6.26122 21 5.88236C20.9997 5.5035 20.9286 5.12842 20.7906 4.77857C20.6525 4.42873 20.4504 4.111 20.1957 3.84357ZM18.9067 5.20156C18.9915 5.29076 19.0587 5.39668 19.1046 5.51327C19.1505 5.62986 19.1741 5.75483 19.1741 5.88104C19.1741 6.00725 19.1505 6.13222 19.1046 6.24881C19.0587 6.3654 18.9915 6.47132 18.9067 6.56052L18.4181 7.07433L17.1292 5.71633L17.6178 5.20156C17.7887 5.02152 18.0205 4.92037 18.2623 4.92037C18.504 4.92037 18.7358 5.02152 18.9067 5.20156ZM12.0117 13.8249L10.4 14.1649L10.7227 12.466L15.8402 7.07433L17.1292 8.43232L12.0117 13.8249Z"/>
                  </svg>
                </span>              
              </button>

              <div id="tooltip-edit-${meta.row}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip">
                  Editar
                  <div class="tooltip-arrow" data-popper-arrow></div>
              </div>

              <button data-modal-target="delete-modal" data-modal-toggle="delete-modal" data-tooltip-target="tooltip-delete-${meta.row}" class="group flex justify-center items-center size-8 bg-transparent hover:bg-red-600 dark:hover:bg-red-300 hover:bg-opacity-20 rounded-lg">
                <span class="relative size-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6 fill-none">
                    <path class="fill-gray-700 group-hover:fill-red-600 dark:fill-gray-400" d="M20 6.21053H16V4.10526C16 3.54691 15.7893 3.01143 15.4142 2.61662C15.0391 2.2218 14.5304 2 14 2H10C9.46957 2 8.96086 2.2218 8.58579 2.61662C8.21071 3.01143 8 3.54691 8 4.10526V6.21053H4C3.73478 6.21053 3.48043 6.32143 3.29289 6.51884C3.10536 6.71624 3 6.98398 3 7.26316C3 7.54233 3.10536 7.81007 3.29289 8.00748C3.48043 8.20489 3.73478 8.31579 4 8.31579H5V19.8947C5 20.4531 5.21071 20.9886 5.58579 21.3834C5.96086 21.7782 6.46957 22 7 22H17C17.5304 22 18.0391 21.7782 18.4142 21.3834C18.7893 20.9886 19 20.4531 19 19.8947V8.31579H20C20.2652 8.31579 20.5196 8.20489 20.7071 8.00748C20.8946 7.81007 21 7.54233 21 7.26316C21 6.98398 20.8946 6.71624 20.7071 6.51884C20.5196 6.32143 20.2652 6.21053 20 6.21053ZM10 4.10526H14V6.21053H10V4.10526ZM17 19.8947H7V8.31579H17V19.8947Z"/>
                    <path class="fill-gray-700 group-hover:fill-red-600 dark:fill-gray-400" d="M10 9.36842C9.73478 9.36842 9.48043 9.47932 9.29289 9.67673C9.10536 9.87414 9 10.1419 9 10.4211V17.7895C9 18.0686 9.10536 18.3364 9.29289 18.5338C9.48043 18.7312 9.73478 18.8421 10 18.8421C10.2652 18.8421 10.5196 18.7312 10.7071 18.5338C10.8946 18.3364 11 18.0686 11 17.7895V10.4211C11 10.1419 10.8946 9.87414 10.7071 9.67673C10.5196 9.47932 10.2652 9.36842 10 9.36842Z"/>
                    <path class="fill-gray-700 group-hover:fill-red-600 dark:fill-gray-400" d="M14 9.36842C13.7348 9.36842 13.4804 9.47932 13.2929 9.67673C13.1054 9.87414 13 10.1419 13 10.4211V17.7895C13 18.0686 13.1054 18.3364 13.2929 18.5338C13.4804 18.7312 13.7348 18.8421 14 18.8421C14.2652 18.8421 14.5196 18.7312 14.7071 18.5338C14.8946 18.3364 15 18.0686 15 17.7895V10.4211C15 10.1419 14.8946 9.87414 14.7071 9.67673C14.5196 9.47932 14.2652 9.36842 14 9.36842Z"/>
                  </svg>
                </span>              
              </button>

              <div id="tooltip-delete-${meta.row}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip">
                  Borrar
                  <div class="tooltip-arrow" data-popper-arrow></div>
              </div>

            </div>
          `;
          },
        },
      ],
      drawCallback: () => {
        initFlowbite(); // Restart Flowbite tooltips and components if you use any
        this.initSwitches(); // Reassign listeners for visible switches
      },
    };
  }

  onSelectAll(_event: boolean) {
    // TODO: wire up bulk actions for selected rows (demo placeholder).
  }
  //Datatable End

  //Constructor for Loading Service Start
  constructor(
    private readonly loadingService: LoadingService,
    private readonly notifications: NotificationsService,
    private readonly router: Router
  ) {
    //console.log('TemplateComponent cargado');
  }
  //Constructor for Loading Service End

  //Show Loading Function Start
  public showLoading() {
    //This is for show the loading
    this.loadingService.show();
    //This is for hide the loading
    setTimeout(() => {
      this.loadingService.hide();
    }, 5000);
  }
  //Show Loading Function End

  //Toast Notification Start

  ShowNotificationToastDanger() {
    this.notifications.show({
      //Toast Danger---------------------
      data: {
        text: `Item has been deleted.`,
      },
      type: NotificationType.toastDanger,
      timeout: true, // Here you take control if you need to close the toast notification in some time
    });
  }

  ShowNotificationToastSuccess() {
    this.notifications.show({
      //Toast Successs-------------------
      data: {
        text: `Item moved successfully.`,
      },
      type: NotificationType.toastSuccess,
      timeout: true, // Here you take control if you need to close the toast notification
    });
  }

  ShowNotificationToastWarning() {
    this.notifications.show({
      //Toast Warning---------------------
      data: {
        text: `Improve password difficulty.`,
      },
      type: NotificationType.toastWarning,
      timeout: true, // Here you take control if you need to close the toast notification
    });
  }

  ShowNotificationToastInfo() {
    this.notifications.show({
      //Toast Info---------------------
      data: {
        text: `Message info here.`,
      },
      type: NotificationType.toastInfo,
      timeout: true, // Here you take control if you need to close the toast notification
    });
  }

  //Toast Notification End
}
