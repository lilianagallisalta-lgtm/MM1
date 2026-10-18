import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  addMonths,
  isAfter,
  isBefore,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subMonths
} from 'date-fns';
import {
  HkCalendarOptions,
  HkRangeChange
} from '../../models/hk-datepicker.models';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'hk-range-calendar',
  templateUrl: './hk-range-calendar.component.html',
  styleUrls: ['./hk-range-calendar.component.scss']
})
export class HkRangeCalendarComponent implements OnInit, OnChanges {

  @Input() start: Date;

  @Input() end: Date;

  @Input() set: 'start' | 'end';

  @Output() rangeChange: EventEmitter<HkRangeChange> = new EventEmitter();

  @Output() selectedChange: EventEmitter<Date> = new EventEmitter();

  @Output() willSet: EventEmitter<'start' | 'end'> = new EventEmitter();

  startDatepickerOptions: HkCalendarOptions = {
    minDate: startOfDay(new Date()),
  };

  endDatepickerOptions: HkCalendarOptions = {
    minDate: startOfDay(new Date()),
  };

  _currentMonth = startOfMonth(new Date());
  _nextMonth = addMonths(new Date(), 1);

  _willSet: 'start' | 'end' = 'start';

  prevMonthDisabled: boolean = isSameMonth(this._currentMonth, new Date());
  nextMonthDisabled: boolean = false;

  constructor(
    public media: MediaObserver,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if ('start' in changes) {
      this.setStart(changes['start'].currentValue);
    }

    if ('end' in changes) {
      this.setEnd(changes['end'].currentValue);
    }

    if ('set' in changes && changes['set'].currentValue !== changes['set'].previousValue) {
      this.changeWillSet(changes['set'].currentValue);
    }
  }

  _selectedChange(date: Date) {
    if (this._willSet === 'start') {
      if (this.end && isAfter(date, this.end)) {
        this.setStart(date);
        this.setEnd(null);
        this.changeWillSet('end');
      } else {
        this.setStart(date);
        this.changeWillSet('end');
      }
    } else if (this._willSet === 'end') {
      if (this.start && isBefore(date, this.start)) {
        this.setEnd(date);
        this.setStart(null);
        this.changeWillSet('start');
      } else {
        this.setEnd(date);
        this.changeWillSet('start');
      }
    }
    //
    // if (! this.start || isBefore(date, this.start)) {
    //   this.setStart(date);
    //   this.changeWillSet('end');
    // } else if (! this.end || isAfter(date, this.end)) {
    //   this.setEnd(date);
    //   this.changeWillSet('start');
    // } else {
    //   if (this._willSet === 'start') {
    //     this.setStart(date);
    //     this.changeWillSet('end');
    //   } else {
    //     this.setEnd(date);
    //     this.changeWillSet('start');
    //   }
    // }

    this.rangeChange.emit({
      start: this.start,
      end: this.end,
    });

    this.selectedChange.emit(date);

    this.changeWillSet(this._willSet);
  }

  private changeWillSet(willSet: 'start' | 'end') {
    if (willSet !== this._willSet) {
      this.willSet.emit(willSet);
    }

    this._willSet = willSet;
  }

  private checkPrevMonthDisabled(): boolean {
    if (isSameMonth(this._currentMonth, new Date())) {
      this.prevMonthDisabled = true;
      return true;
    }

    return false;
  }

  prevMonth() {
    if (this.checkPrevMonthDisabled()) {
      return;
    }

    this._currentMonth = subMonths(this._currentMonth, 1);
    this._nextMonth = subMonths(this._nextMonth, 1);

    this.checkPrevMonthDisabled();
  }

  nextMonth() {
    this.prevMonthDisabled = false;
    this._currentMonth = addMonths(this._currentMonth, 1);
    this._nextMonth = addMonths(this._nextMonth, 1);
  }

  private setStart(date: Date) {
    this._log('setStart', date);
    this.start = date;

    // this.endDatepickerOptions = {
    //   minDate: date,
    // };
  }

  private setEnd(date: Date) {
    this._log('setEnd', date);
    this.end = date;
  }

  private _log(...args) {
    // console.debug('[hk-daterangepicker]', ...args);
  }

}
