import {
  Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef, Output, EventEmitter,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  setYear,
  eachDay,
  getDate,
  getMonth,
  getYear,
  isToday,
  isSameDay,
  isSameMonth,
  isSameYear,
  format,
  getDay,
  subDays,
  addDays,
  setDay, startOfDay, isBefore, isAfter
} from 'date-fns';
import {MdePopoverTrigger} from '@material-extended/mde';
import * as esLocale from 'date-fns/locale/es';
import {isNil} from '../../utils/hk-datepicker-utils';
import {
  HkCalendarOptions,
  HkRangeChange
} from '../../models/hk-datepicker.models';

@Component({
  selector: 'hk-datepicker',
  templateUrl: 'hk-datepicker.component.html',
  styleUrls: ['./hk-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HkDatepickerComponent),
      multi: true,
    },
  ],
})
export class HkDatepickerComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() options: HkCalendarOptions;

  /**
   * Indica si el calendario está abierto.
   */
  @Input() isOpened = false;

  /**
   * Input's label.
   */
  @Input() label = 'Fecha';

  /**
   * Indica si se pasó un template personalizado con `<ng-content>`.
   */
  @Input() customContent = false;

  /**
   * Indica si el componente se debe mostrar en modo `range` (usando `from` y
   */
  @Input() range = false;

  /**
   * Indica si mostrar o no el botón para limpiar el valor del input.
   */
  @Input() clearInput = false;

  /**
   * Emite los cambios de `from` y `to`.
   */
  @Output() rangeChange: EventEmitter<HkRangeChange> = new EventEmitter();

  _from: Date;
  @Input() set from(from: Date) {
    this._from = from;
    this.fromChange.emit(this._from);
  }
  get from() {
    return this._from;
  }
  @Output() fromChange: EventEmitter<Date> = new EventEmitter();

  _to: Date;
  @Input() set to(to: Date) {
    this._to = to;
    this.toChange.emit(this._to);
  }
  get to() {
    return this._to;
  }
  @Output() toChange: EventEmitter<Date> = new EventEmitter();

  @Output() popoverClosed: EventEmitter<any> = new EventEmitter();

  @ViewChild(MdePopoverTrigger) hkCalendarPopoverTrigger: MdePopoverTrigger;

  innerValue: any;

  fromDisplayValue: string;
  toDisplayValue: string;

  displayValue: string;
  displayFormat: string;

  date: Date;

  barTitle: string;
  barTitleFormat: string;

  minYear: number;
  maxYear: number;

  firstCalendarDay: number;

  view = 'days';

  years: {
    year: number;
    isThisYear: boolean;
    isSelected: boolean;
  }[];

  dayNames: string[];
  dayNamesFormat: string;
  days: {
    date: Date;
    day: number;
    month: number;
    year: number;
    inThisMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isSelectable: boolean;
    isFrom: boolean;
    isTo: boolean;
    inRange: boolean;
  }[];
  locale: object;

  private onTouchedCallback: () => void = () => { };

  private onChangeCallback: (_: any) => void = () => { };

  get value(): any {
    return this.innerValue;
  }

  set value(val: any) {
    this.innerValue = val;

    this.onChangeCallback(this.innerValue);
  }

  constructor() {}

  ngOnInit() {
    this.view = 'days';

    this.date = new Date();

    this.setOptions();

    this.initDayNames();

    this.initYears();

    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes) {
      this.setOptions();
      this.initDayNames();
      this.init();
      this.initYears();
    }
  }

  setOptions(): void {
    const today = new Date();

    this.minYear = this.options && this.options.minYear || getYear(today);
    this.maxYear = this.options && this.options.maxYear || getYear(today) + 30;

    this.barTitleFormat = this.options && this.options.barTitleFormat || 'MMMM YYYY';

    this.displayFormat = this.options && this.options.displayFormat || 'DD/MM/YYYY';
    this.dayNamesFormat = this.options && this.options.dayNamesFormat || 'ddd';

    this.firstCalendarDay = this.options && this.options.firstCalendarDay || 0;

    this.locale = this.options && { locale: this.options.locale } || esLocale;

    this.view = this.options && this.options.view ? this.options.view : 'days';
  }

  nextMonth(): void {
    this.date = addMonths(this.date, 1);
    this.init();
  }

  prevMonth(): void {
    this.date = subMonths(this.date, 1);
    this.init();
  }

  setDate(i: number): void {
    const date = this.days[i].date;

    if (this.range) {
      if (this.from && date.valueOf() < this.from.valueOf()) {
        // Ya hay un `from` seteado y ahora el usuario quizo seleccionar un
        // `to` anterior. Se hace null a `from` para que `date` sea seteado como `from`.
        this.from = null;
      }

      if (this.from && this.to) {
        this.from = date;
        this.to = null;
      } else if (this.from) {
        this.to = date;
      } else {
        this.from = date;
        this.to = null;
      }

      this.init();

      if (this.from && this.to) {
        this.value = {
          start: this.from,
          end: this.to,
        };

        this.setDisplayValue();

        this.rangeChange.emit({
          start: this._from,
          end: this._to,
        });

        this.close();
      }

      return;
    }

    this.date = date;
    this.value = this.date;
    this.init();
    this.toggle();
  }

  setYear(i: number): void {
    this.date = setYear(this.date, this.years[i].year);
    this.init();
    this.initYears();
    this.view = 'days';
  }

  /**
   * Checks if specified date is in range of min and max dates
   * @param date
   */
  private isDateSelectable(date: Date): boolean {
    if (isNil(this.options)) {
      return true;
    }

    const minDateSet = !isNil(this.options.minDate);
    const maxDateSet = !isNil(this.options.maxDate);
    const timestamp = date.valueOf();

    if (minDateSet && (timestamp < this.options.minDate.valueOf())) {
      return false;
    }

    if (maxDateSet && (timestamp > this.options.maxDate.valueOf())) {
      return false;
    }

    return true;
  }

  init(): void {
    const start = startOfMonth(this.date);
    const end = endOfMonth(this.date);

    this.days = eachDay(start, end).map(date => {
      let isSelected = false;
      let inRange = false;
      let isFrom = false;
      let isTo = false;

      if (this.range) {
        isFrom = isSameDay(date, this.from) && isSameMonth(date, this.from) && isSameYear(date, this.from);
        isTo = isSameDay(date, this.to) && isSameMonth(date, this.to) && isSameYear(date, this.to);
        isSelected = isFrom || isTo;
        inRange = isAfter(date, this.from) && isBefore(date, this.to);
      } else {
        isSelected = isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue);
      }

      return {
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: true,
        isToday: isToday(date),
        isSelected: isSelected,
        isSelectable: this.isDateSelectable(date),
        inRange: inRange,
        isFrom: isFrom,
        isTo: isTo,
      };
    });

    const tmp = getDay(start) - this.firstCalendarDay;
    const prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;

    const nextDays = 7 - getDay(end) > 0 ? 7 - getDay(end) : 7;

    for (let i = 1; i <= prevDays; i++) {
      const date = startOfDay(subDays(start, i));
      const isFrom = isSameDay(date, this.from) && isSameMonth(date, this.from) && isSameYear(date, this.from);
      const isTo = isSameDay(date, this.to) && isSameMonth(date, this.to) && isSameYear(date, this.to);
      const isSelected = isFrom || isTo;
      const inRange = isAfter(date, this.from) && isBefore(date, this.to);

      this.days.unshift({
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: false,
        isToday: isToday(date),
        isSelected: isSelected,
        isSelectable: this.isDateSelectable(date),
        isFrom: isFrom,
        isTo: isTo,
        inRange: inRange,
      });
    }

    for (let i = 1; i < nextDays; i++) {
      const date = startOfDay(addDays(end, i));
      const isFrom = isSameDay(date, this.from) && isSameMonth(date, this.from) && isSameYear(date, this.from);
      const isTo = isSameDay(date, this.to) && isSameMonth(date, this.to) && isSameYear(date, this.to);
      const isSelected = isFrom || isTo;
      const inRange = isAfter(date, this.from) && isBefore(date, this.to);

      this.days.push({
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: false,
        isToday: isToday(date),
        isSelected: isSelected,
        isSelectable: this.isDateSelectable(date),
        isFrom: isFrom,
        isTo: isTo,
        inRange: inRange,
      });
    }

    this.setDisplayValue();

    if (this.innerValue) {
      this.barTitle = format(start, this.barTitleFormat, this.locale);
    } else {
      // Por defecto muestra utiliza `this.date`, que puede ser cambiado
      // para indicar un mes/año en particular.

      this.barTitle =  format(this.date, this.barTitleFormat, this.locale);
    }
  }

  initYears(): void {
    const range = this.maxYear - this.minYear;
    this.years = Array.from(new Array(range), (x, i) => i + this.minYear).map(year => {
      return {
        year: year,
        isThisYear: year === getYear(new Date()),
        isSelected: year === getYear(this.date),
      };
    });
  }

  initDayNames(): void {
    this.dayNames = [];
    const start = this.firstCalendarDay;
    for (let i = start; i <= 6 + start; i++) {
      const date = setDay(new Date(), i);
      this.dayNames.push(format(date, this.dayNamesFormat, this.locale));
    }
  }

  toggleView(): void {
    this.view = this.view === 'days' ? 'years' : 'days';
  }

  reset(): void {
    this.date = null;
    this.innerValue = null;
    this.init();
  }

  writeValue(val: Date) {
    if (val) {
      this.date = val;
      this.innerValue = val;
      this.init();
      this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
      this.barTitle = format(startOfMonth(val), this.barTitleFormat, this.locale);
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  hkCalendarPopoverOpened() {
    if (! this.isOpened) {
      this.open();
    }
  }

  toggle(): void {
    this._log('toggle');

    if (this.isOpened === true) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    this._log('open');

    this.isOpened = true;
  }

  public openPopover() {
    this.hkCalendarPopoverTrigger.openPopover();
  }

  close(): void {
    this._log('close');

    setTimeout(() => {
      this.isOpened = false;

      this.hkCalendarPopoverTrigger.closePopover();

      this.popoverClosed.emit(true);
    }, 100);
  }

  private _log(...args) {
    // console.debug('[hk-datepicker]', ...args);
  }

  private setDisplayValue() {
    if (this.range) {
      if (! this.from || ! this.to) {
        this.displayValue = '';
        return;
      }

      this.fromDisplayValue = format(this.from, this.displayFormat, this.locale);
      this.toDisplayValue = format(this.to, this.displayFormat, this.locale);
      this.displayValue = this.fromDisplayValue + ' - ' + this.toDisplayValue;
    } else {
      if (! this.innerValue) {
        this.displayValue = '';
        return;
      }

      this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
    }
  }
}
