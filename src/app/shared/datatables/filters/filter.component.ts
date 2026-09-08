import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, AfterViewInit } from '@angular/core';
import { Datepicker } from 'flowbite';
import { FeatherModule } from 'angular-feather';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FeatherModule, FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './filter.component.html',
})
export class FilterComponent implements AfterViewInit {
  @Input() statusList: string[] = [];

  @Output() filterEmmiter = new EventEmitter<any[]>();

  batchCode = '';

  batchStatusFilter: number = 0;
  distributionStatusFilter: number = 0;

  datapickerEnd!: Datepicker;

  datapickerStart!: Datepicker;

  private select!: HTMLSelectElement;

  private readonly today: any = Date.now().toString();

  private minDate: any = null;

  private maxDate: any = null;

  errorDate = signal<boolean>(false);

  messsajeErrorDate = 'El formato de la fecha es inválido, verifique la fecha ingresada';

  private readonly idDatapickerEnd = 'datepicker-range-end';

  private readonly idDatepickerStart = 'datepicker-range-start';

  errorDateStart = false;
  errorDateEnd = false;

  constructor(
    private readonly datePipe: DatePipe,
    private readonly configService: ConfigService
  ) {}

  ngAfterViewInit(): void {
    // Aquí inicializamos el datepicker
    this.createDatePickers();
  }

  createDatePickers() {
    this.datapickerStart = this.createDatePicker(this.idDatepickerStart, null, this.today);

    this.datapickerEnd = this.createDatePicker(this.idDatapickerEnd, null, this.today);
  }

  toggleFilter() {
    this.createDatePickers();

    const accordeon = document.getElementById('accordion-arrow-icon-body-3');
    accordeon?.classList.contains('hidden')
      ? accordeon?.classList.remove('hidden')
      : accordeon?.classList.add('hidden');
  }

  createDatePicker(datepickerId: string, minDate: any, maxDate: any): Datepicker {
    const $datepickerEl = document.getElementById(datepickerId);

    const options = {
      format: 'dd/mm/yyyy',
      maxDate: maxDate,
      minDate: minDate,
      locale: {
        firstDayOfWeek: 1, // El primer día de la semana será el lunes
        format: 'dd/mm/yyyy', // Formato de fecha
        months: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      },
      onShow: () => {},
      onHide: () => {},
    };
    const instanceOptions = {
      id: datepickerId,
      override: true,
    };
    return new Datepicker($datepickerEl, options, instanceOptions);
  }

  changeStartDate() {
    if (this.datapickerStart.getDate() !== undefined) {
      const startDate = this.convertToDDMMAAAA(this.datapickerStart.getDate().toString());
      this.setNewMinDate(startDate);
    }
  }

  changeInputStartDate(event: Event) {
    const inputDate = (event.target as HTMLInputElement).value;

    if (this.validDate(inputDate)) {
      this.setNewMinDate(inputDate);
    } else {
      this.errorDate.set(true);
      this.errorDateStart = true;
      this.datapickerStart.hide();
    }
  }

  changeEndDate() {
    if (this.datapickerEnd.getDate() !== undefined) {
      const endDate = this.convertToDDMMAAAA(this.datapickerEnd.getDate().toString());
      this.setNewMaxDate(endDate);
    }
  }

  changeInputEndDate(event: Event) {
    const inputDate = (event.target as HTMLInputElement).value;

    if (this.validDate(inputDate)) {
      this.setNewMaxDate(inputDate);
    } else {
      this.errorDate.set(true);
      this.errorDateEnd = true;
      this.datapickerEnd.hide();
    }
  }

  compareDate(minDate: string, maxDate: string) {
    if (!minDate || !maxDate) {
      return true;
    }

    const [minDay, minMonth, minYear] = minDate.split('/');
    const [maxDay, maxMonth, maxYear] = maxDate.split('/');

    if (minYear > maxYear) {
      return false;
    }
    if (minYear === maxYear) {
      if (minMonth > maxMonth) {
        return false;
      }
      if (minMonth === maxMonth) {
        if (minDay > maxDay) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    }
    return true;
  }

  setNewMaxDate(date: any) {
    if (this.compareDate(this.minDate, date) || !this.minDate) {
      if (this.maxDate !== date) {
        this.errorDate.set(false);
        this.maxDate = date;
        const startDate = this.datapickerStart.getDate();
        this.datapickerStart = this.createDatePicker(this.idDatepickerStart, null, this.maxDate);
        if (startDate !== undefined) {
          this.datapickerStart.setDate(startDate);
        }
      }
    } else {
      if (this.maxDate === null) {
        this.datapickerEnd.setDate({
          clear: true,
        });
      } else {
        this.datapickerEnd.setDate(this.datapickerEnd.getDate());
      }
      this.datapickerEnd.hide();
    }
  }

  setNewMinDate(date: any) {
    if (this.compareDate(date, this.maxDate) || !this.maxDate) {
      if (this.minDate !== date) {
        this.errorDate.set(false);
        this.minDate = date;
        const endDate = this.datapickerEnd.getDate();
        this.datapickerEnd = this.createDatePicker(this.idDatapickerEnd, this.minDate, this.today);
        if (endDate !== undefined) {
          this.datapickerEnd.setDate(endDate);
        }
      }
    } else {
      if (this.minDate === null) {
        this.datapickerStart.setDate({
          clear: true,
        });
      } else {
        this.datapickerStart.setDate(this.datapickerStart.getDate());
      }
      this.datapickerStart.hide();
    }
  }

  validDate(date: string) {
    const [day, month, year] = date.split('/');
    const dateConversion = new Date(`${year}/${month}/${day}`);
    if (isNaN(dateConversion.getTime())) {
      this.messsajeErrorDate = 'El formato de la fecha es inválido, verifique la fecha ingresada';
      return false;
    }
    if (dateConversion > this.today) {
      this.messsajeErrorDate =
        'La fecha no puede ser mayor a la actual, verifique la fecha ingresada';
      return false;
    }
    return true;
  }

  convertToDDMMAAAA(date: string) {
    if (date === '') {
      return date;
    } else {
      return this.datePipe.transform(date, 'dd/MM/yyyy', undefined, this.configService.getLocale());
    }
  }

  applyFilters() {
    let startDate: any = this.datapickerStart.getDate()
      ? this.datapickerStart.getDate().toString()
      : '';

    let endDate: any = this.datapickerEnd.getDate() ? this.datapickerEnd.getDate().toString() : '';

    startDate = this.convertToDDMMAAAA(startDate);

    endDate = this.convertToDDMMAAAA(endDate);

    const filters = [
      this.batchCode,
      this.batchStatusFilter,
      this.distributionStatusFilter,
      startDate,
      endDate,
    ];

    this.filterEmmiter.emit(filters);
  }

  clearData() {
    this.batchCode = '';

    this.errorDate.set(false);

    if (this.select) {
      this.select.selectedIndex = 0;
      this.batchStatusFilter = 0;
      this.distributionStatusFilter = 0;
    }

    this.datapickerStart.setDate({
      clear: true,
    });

    this.datapickerEnd.setDate({
      clear: true,
    });

    this.minDate = null;

    this.maxDate = null;

    this.datapickerStart = this.createDatePicker(this.idDatepickerStart, null, this.today);

    this.datapickerEnd = this.createDatePicker(this.idDatapickerEnd, null, this.today);
  }

  clearFilters() {
    this.clearData();

    const filters = [this.batchCode, this.batchStatusFilter, this.distributionStatusFilter, '', ''];

    this.filterEmmiter.emit(filters);
  }

  onStatusSelect(event: Event) {
    this.select = event.target as HTMLSelectElement;

    switch (this.select.value) {
      case 'En proceso':
        this.batchStatusFilter = 1;
        this.distributionStatusFilter = 1;
        break;
      case 'Distribuyendo':
        this.batchStatusFilter = 0;
        this.distributionStatusFilter = 1;
        break;
      case 'Importado':
        this.batchStatusFilter = 2;
        this.distributionStatusFilter = 0;
        break;
      case 'Distribuido':
        this.batchStatusFilter = 0;
        this.distributionStatusFilter = 2;
        break;
      case 'Error de importación':
        this.batchStatusFilter = 99;
        this.distributionStatusFilter = 0;
        break;
      case 'Error de distribución':
        this.batchStatusFilter = 0;
        this.distributionStatusFilter = 99;
        break;
      default:
        this.batchStatusFilter = 0;
        this.distributionStatusFilter = 0;
    }
  }
}
