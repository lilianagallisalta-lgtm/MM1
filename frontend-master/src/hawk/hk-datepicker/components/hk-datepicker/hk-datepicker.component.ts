import {
  Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef,
  HostListener, forwardRef, Output, EventEmitter, Optional, Inject, Renderer2,
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
  setDay
} from 'date-fns';
import {MdePopoverTrigger} from "@material-extended/mde";
import * as esLocale from 'date-fns/locale/es';

export interface DatepickerOptions {
  minYear?: number; // default: current year - 30
  maxYear?: number; // default: current year + 30
  displayFormat?: string; // default: 'MMM D[,] YYYY'
  barTitleFormat?: string; // default: 'MMMM YYYY'
  dayNamesFormat?: string; // default 'ddd'
  barTitleIfEmpty?: string;
  firstCalendarDay?: number; // 0 = Sunday (default), 1 = Monday, ..
  locale?: object;
  minDate?: Date;
  maxDate?: Date;
  view?: string,
}

/**
 * Internal library helper that helps to check if value is empty
 * @param value
 */
const isNil = (value: Date | DatepickerOptions) => {
  return (typeof value === 'undefined') || (value === null);
};

@Component({
  selector: 'hk-datepicker',
  templateUrl: 'hk-datepicker.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HkDatepickerComponent), multi: true }
  ]
})
export class HkDatepickerComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: DatepickerOptions;

  /**
   * Disable datepicker's input
   */
  @Input() headless = false;

  /**
   * Set datepicker's visibility state
   */
  @Input() isOpened = false;

  /**
   * Datepicker dropdown position
   */
  @Input() position = 'bottom-right';

  @Input() label: string = 'Fecha';

  _from: Date;
  @Input() set from(from: Date) {
    this._from = from;
    this.fromChange.emit(this._from);
  }
  @Output() fromChange: EventEmitter<Date> = new EventEmitter();

  _to: Date;
  @Input() set to(to: Date) {
    this._to = to;
    this.toChange.emit(this._to);
  }
  @Output() toChange: EventEmitter<Date> = new EventEmitter();

  @Output() popoverClosed: EventEmitter<any> = new EventEmitter();

  @ViewChild(MdePopoverTrigger) hkCalendarPopoverTrigger: MdePopoverTrigger;

  private positions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];

  innerValue: Date;
  displayValue: string;
  displayFormat: string;
  date: Date;
  barTitle: string;
  barTitleFormat: string;
  barTitleIfEmpty: string;
  minYear: number;
  maxYear: number;
  firstCalendarDay: number;
  view: string = 'days';
  years: { year: number; isThisYear: boolean }[];
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
  }[];
  locale: object;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  get value(): Date {
    return this.innerValue;
  }

  set value(val: Date) {
    this.innerValue = val;
    this.onChangeCallback(this.innerValue);
  }

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2,
  ) {}

  ngOnInit() {
    this.view = 'days';

    this.date = new Date();

    this.setOptions();

    this.initDayNames();

    this.initYears();

    this.init();

    // Check if 'position' property is correct
    if (this.positions.indexOf(this.position) === -1) {
      throw new TypeError(`hk-datepicker: invalid position property value '${this.position}' (expected: ${this.positions.join(', ')})`);
    }
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
    const today = new Date(); // this const was added because during my tests, I noticed that at this level this.date is undefined
    this.minYear = this.options && this.options.minYear || getYear(today);
    this.maxYear = this.options && this.options.maxYear || getYear(today) + 30;
    this.displayFormat = this.options && this.options.displayFormat || 'MMM D[,] YYYY';
    this.barTitleFormat = this.options && this.options.barTitleFormat || 'MMMM YYYY';
    this.dayNamesFormat = this.options && this.options.dayNamesFormat || 'ddd';
    this.barTitleIfEmpty = this.options && this.options.barTitleIfEmpty || 'Cambiar año';
    this.firstCalendarDay = this.options && this.options.firstCalendarDay || 0;
    this.locale = this.options && { locale: this.options.locale } || esLocale;
    this.view = this.options && this.options.view || 'days';
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
    this.date = this.days[i].date;
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

    this.barTitle = format(start, this.barTitleFormat, this.locale);

    this._log('init', 'start', start, 'end', end, 'bartitle', this.barTitle);

    this.days = eachDay(start, end).map(date => {
      return {
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: true,
        isToday: isToday(date),
        isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
        isSelectable: this.isDateSelectable(date)
      };
    });

    const tmp = getDay(start) - this.firstCalendarDay;
    const prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;

    for (let i = 1; i <= prevDays; i++) {
      const date = subDays(start, i);
      this.days.unshift({
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: false,
        isToday: isToday(date),
        isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
        isSelectable: this.isDateSelectable(date)
      });
    }

    this.displayValue = this.innerValue ? format(this.innerValue, this.displayFormat, this.locale) : '';

    if (this.innerValue) {
      this.barTitle =  format(start, this.barTitleFormat, this.locale);
    }
  }

  initYears(): void {
    const range = this.maxYear - this.minYear;
    this.years = Array.from(new Array(range), (x, i) => i + this.minYear).map(year => {
      return { year: year, isThisYear: year === getYear(this.date) };
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

    this.isOpened = false;

    this.hkCalendarPopoverTrigger.closePopover();

    this.popoverClosed.emit(true);
  }

  private _log(...args) {
    // console.debug('[hk-datepicker]', ...args);
  }
}
