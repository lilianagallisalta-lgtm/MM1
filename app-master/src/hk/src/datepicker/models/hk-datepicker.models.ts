export interface HkCalendarOptions {
  minYear?: number; // default: current year - 30
  maxYear?: number; // default: current year + 30
  displayFormat?: string; // default: 'MMM D[,] YYYY'
  barTitleFormat?: string; // default: 'MMMM YYYY'
  dayNamesFormat?: string; // default 'ddd'
  firstCalendarDay?: number; // 0 = Sunday (default), 1 = Monday, ..
  locale?: object;
  minDate?: Date;
  maxDate?: Date;
  view?: 'days' | 'years';
}

export interface HkDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  inThisMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isSelectable: boolean;

  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;

  show: boolean;
}

export interface HKYear {
  year: number;
  isThisYear: boolean;
  isSelected: boolean;
}

export interface HkRangeChange {
  start: Date;
  end: Date;
}
