import {
  Component,
  EventEmitter,
  forwardRef,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  addDays,
  addMonths,
  eachDay,
  endOfMonth,
  format,
  getDate,
  getDay,
  getMonth,
  getYear, isAfter, isBefore, isEqual,
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  setDay,
  setYear,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths
} from 'date-fns';
import * as esLocale from 'date-fns/locale/es/index.js';
import {isNil} from '../../utils/hk-datepicker-utils';
import {
  HkCalendarOptions,
  HkDay, HkRangeChange,
  HKYear
} from '../../models/hk-datepicker.models';

@Component({
  selector: 'hk-calendar',
  templateUrl: './hk-calendar.component.html',
  styleUrls: ['./hk-calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HkCalendarComponent),
      multi: true,
    },
  ],
})
export class HkCalendarComponent implements OnInit, OnChanges, ControlValueAccessor {

  /**
   * Indica la fecha (mes) en la que se muestra el calendario por defecto.
   */
  @Input() startAt: Date = new Date();
  _startAt: Date;

  @Input() start: Date;
  @Input() end: Date;

  /**
   * Opciones para el calendario.
   */
  @Input() options: HkCalendarOptions;

  /**
   * Input's label.
   */
  @Input() label = 'Fecha';

  /**
   * Indica si mostrar o no el botón para limpiar el valor del input.
   */
  @Input() clearInput = false;

  @Input() showNextMonthButton: boolean = true;

  @Input() showPrevMonthButton: boolean = true;

  @Input() showOthersMonthsDays: boolean = true;

  /**
   * Indica si el componente padre se va a encargar de setear el rango o no.
   */
  @Input() customRangleHandler: boolean = false;

  /**
   * Indica si el calendario debe permitir seleccionar un rango de fechas.
   */
  @Input() rangeMode: boolean = false;

  /**
   * Emite el rango de fecha seleccionado cuando está en modo `rangeMode`.
   */
  @Output() rangeChange: EventEmitter<HkRangeChange> = new EventEmitter();

  /**
   * Emite la fecha seleccionada cuando está en modo `normal`.
   */
  @Output() selectedChange: EventEmitter<Date> = new EventEmitter();

  innerValue: any;

  displayValue: string;
  displayFormat: string;

  barTitle: string;
  barTitleFormat: string;

  minYear: number;
  maxYear: number;

  /**
   * El primer día de la semana (por defecto 0).
   */
  firstCalendarDay: number;

  /**
   * El tipo de calendario que se debe mostrar (días o años).
   */
  view: 'days' | 'years' = 'days';

  /**
   * Lista de los nombres de los días de la semana.
   */
  dayNames: string[];

  /**
   * Formato para mostrar la lista de los días de la semana.
   */
  dayNamesFormat: string;

  /**
   * Días que se muestran.
   */
  days: HkDay[];

  /**
   * Años qe se muestran.
   */
  years: HKYear[];

  /**
   * Localización.
   */
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

    this._startAt = this.startAt;

    this.setOptions();

    this.initDayNames();

    this.initYears();

    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    let reinit: boolean = false;

    if ('options' in changes) {
      this.setOptions();
      this.initDayNames();

      reinit = true;
    }

    if (this.rangeMode) {
      if ('start' in changes) {
        this.start = changes['start'].currentValue;
        reinit = true;
      }

      if ('end' in changes) {
        this.end = changes['end'].currentValue;
        reinit = true;
      }
    }

    if ('startAt' in changes) {
      this._startAt = changes['startAt'].currentValue;
      reinit = true;
    }

    if (reinit) {
      this.init();
    }
  }

  nextMonth(): void {
    this._startAt = addMonths(this._startAt, 1);
    this.init();
  }

  prevMonth(): void {
    this._startAt = subMonths(this._startAt, 1);
    this.init();
  }

  setDate(i: number): void {
    const date = this.days[i].date;
    this._log('setDate', date);

    if (this.rangeMode) {
      if (this.customRangleHandler) {
        this.selectedChange.emit(date);
        return;
      }

      if (! this.start || isBefore(date, this.start)) {
        this.start = date;
      } else if (! this.end || isAfter(date, this.end)) {
        this.end = date;
      } else {
        this.start = date;
      }

      this.rangeChange.emit({
        start: this.start,
        end: this.end,
      });

      this.init();
    } else {
      this.value = date;

      this.init();

      this.selectedChange.emit(date);
    }
  }

  setYear(i: number): void {
    this._startAt = setYear(this._startAt, this.years[i].year);
    this.init();
    this.initYears();
    this.view = 'days';
  }

  init(): void {
    const start = startOfMonth(this._startAt);
    const end = endOfMonth(this._startAt);

    // Agrega los días del corriente mes.
    this.days = eachDay(start, end).map(date => this.parseDay(date));

    // Agrega los días anteriores al primero del corrientes mes, necesarios
    // para completar la fila de la semana (sólo para que visualmente quede bien).
    const tmp = getDay(start) - this.firstCalendarDay;
    const prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;
    for (let i = 1; i <= prevDays; i++) {
      const date = subDays(start, i);

      this.days.unshift(this.parseDay(startOfDay(date)));
    }

    // Agrega los días posteriores al último del corrientes mes, necesarios
    // para completar la fila de la semana (sólo para que visualmente quede bien).
    const nextDays = 7 - getDay(end) > 0 ? 7 - getDay(end) : 7;
    for (let i = 1; i < nextDays; i++) {
      const date = addDays(end, i);
      this.days.push(this.parseDay(startOfDay(date)));
    }

    this.setDisplayValue();

    this.setBarTitle();
  }

  /**
   * Cambia el tipo de vista (mes o años).
   */
  toggleView(): void {
    this.view = this.view === 'days' ? 'years' : 'days';
  }

  /**
   * Resetea el componente.
   */
  reset(): void {
    this._startAt = this.startAt;
    this.innerValue = null;
    this.init();
  }

  writeValue(val: Date) {
    if (val) {
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

  /**
   * Devuelve un día con atributos seteados (como por ej si corresponde al corriente
   * mes, si está seleccionado, si está dentro del rango, etc).
   */
  private parseDay(date): HkDay {
    // this._log('parseDay', date);

    let isSelected: boolean = false;
    let isInRange: boolean = false;

    if (this.rangeMode) {
      const isStart = isEqual(date, this.start) && isSameMonth(date, this._startAt);
      const isEnd = isEqual(date, this.end) && isSameMonth(date, this._startAt);

      isSelected = isStart || isEnd;

      if (this.start != null && this.end != null && isBefore(this.start, date) && isBefore(date, this.end)) {
        isInRange = true;
      }
    } else {
      isSelected = isEqual(date, this.innerValue);
    }

    return {
      date: date,
      day: getDate(date),
      month: getMonth(date),
      year: getYear(date),
      inThisMonth: isSameMonth(date, this._startAt),
      isToday: isToday(date),
      isSelected: isSelected,
      isSelectable: this.isDateSelectable(date),
      isRangeStart: isEqual(date, this.start),
      isRangeEnd: isEqual(date, this.end),
      isInRange: isInRange,
      show: isSameMonth(date, this._startAt) || this.showOthersMonthsDays,
    };
  }

  /**
   * Checks if specified date is in range of min and max dates
   * @param date
   */
  private isDateSelectable(date: Date): boolean {
    if (isNil(this.options)) {
      return true;
    }

    const minDateSet = ! isNil(this.options.minDate);
    const maxDateSet = ! isNil(this.options.maxDate);
    const timestamp = date.valueOf();

    if (minDateSet && (timestamp < this.options.minDate.valueOf())) {
      return false;
    }

    if (maxDateSet && (timestamp > this.options.maxDate.valueOf())) {
      return false;
    }

    return true;
  }

  private setDisplayValue() {
    if (! this.innerValue) {
      this.displayValue = '';
      return;
    }

    this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
  }

  private setBarTitle() {
    this.barTitle = format(this._startAt, this.barTitleFormat, this.locale);
  }

  private setOptions(): void {
    const today = new Date();

    this.minYear = this.options && this.options.minYear || getYear(today);
    this.maxYear = this.options && this.options.maxYear || getYear(today) + 30;

    this.barTitleFormat = this.options && this.options.barTitleFormat || 'MMMM YYYY';

    this.displayFormat = this.options && this.options.displayFormat || 'DD/MM/YYYY';
    this.dayNamesFormat = this.options && this.options.dayNamesFormat || 'ddd';

    this.firstCalendarDay = this.options && this.options.firstCalendarDay || 0;

    this.locale = this.options && this.options.locale ? this.options.locale : esLocale;

    this.view = this.options && this.options.view ? this.options.view : 'days';
  }

  /**
   * Inicializa los nombre de los días.
   */
  private initDayNames(): void {
    this.dayNames = [];
    const start = this.firstCalendarDay;
    for (let i = start; i <= 6 + start; i++) {
      const date = setDay(new Date(), i);
      this.dayNames.push(format(date, this.dayNamesFormat, this.locale));
    }
  }

  /**
   * Inicializa los años.
   */
  private initYears(): void {
    const range = this.maxYear - this.minYear;
    this.years = Array.from(new Array(range), (x, i) => i + this.minYear).map(year => {
      return {
        year: year,
        isThisYear: year === getYear(new Date()),
        isSelected: year === getYear(this._startAt),
      };
    });
  }

  private _log(...args) {
    // console.debug('[hk-calendar]', ...args);
  }

}
