import {
  Component, ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {format} from 'date-fns';
import * as esLocale from 'date-fns/locale/es';
import {
  HkCalendarOptions,
  HkRangeChange
} from '../../models/hk-datepicker.models';
import {IonInput} from '@ionic/angular';
import {MdePopoverTarget, MdePopoverTrigger} from '@material-extended/mde';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'hk-daterangepicker',
  templateUrl: './hk-daterangepicker.component.html',
  styleUrls: ['./hk-daterangepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HkDaterangepickerComponent),
      multi: true,
    },
  ],
})
export class HkDaterangepickerComponent implements OnInit, ControlValueAccessor {

  @Input() startLabel: string = 'Desde';
  @Input() endLabel: string = 'Hasta';

  @Input() options: any = {};

  @Input() showBackdrop: boolean = false;

  @Input('popoverTarget') foreignTarget: ElementRef;

  /**
   * Indica el modo en el que se mostrarán los inputs.
   */
  @Input() inputMode: 'vertical'|'horizontal'|'auto' = 'auto';

  @Output() rangeChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('startInput') startInput: IonInput;

  @ViewChild('endInput') endInput: IonInput;

  @ViewChild(MdePopoverTrigger) popoverTrigger: MdePopoverTrigger;

  range: HkRangeChange = {
    start: null,
    end: null,
  };

  startDisplayValue: string;
  endDisplayValue: string;

  datepickerOptions: HkCalendarOptions = {
    minDate: new Date(),
  };

  locale: object;

  _willSet: 'start' | 'end';

  private onTouchedCallback: () => void = () => { };

  private onChangeCallback: (_: any) => void = () => { };

  get value(): any {
    return this.range;
  }

  set value(val: any) {
    this.range = val;

    this.onChangeCallback(this.range);
  }

  constructor(
    public media: MediaObserver,
  ) { }

  ngOnInit() {
    this.setOptions();
  }

  _rangeChange($event: HkRangeChange) {
    this.range = $event;

    this.setDisplayValue();

    this.writeValue($event);

    this.rangeChange.emit($event);
  }

  setFocusToInput($event: 'start' | 'end') {
    if ($event === 'start') {
      this.startInput.setFocus();
    } else {
      this.endInput.setFocus();
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (this.value !== obj) {
      this.value = obj;
      this._rangeChange(obj);
    } else {
      this.value = obj;
    }
  }

  setDisplayValue() {
    if (this.range && this.range.start) {
      this.startDisplayValue = format(this.range.start, this.options.startDisplayFormat, this.locale);
    } else {
      this.startDisplayValue = null;
    }

    if (this.range && this.range.end) {
      this.endDisplayValue = format(this.range.end, this.options.endDisplayFormat, this.locale);
    } else {
      this.endDisplayValue = null;
    }
  }

  clear() {
    this.writeValue({
      start: null,
      end: null,
    });

    this.setDisplayValue();
  }

  submit() {
    this.popoverTrigger.closePopover();
  }

  willSet(willSet: 'start' | 'end') {
    if (willSet === this._willSet) {
      return;
    }

    this._willSet = willSet;
    this.setFocusToInput(willSet);
  }

  private setOptions(): void {
    this.options = {
      startDisplayFormat: this.options && this.options.displayFormat || 'DD/MM/YYYY',
      endDisplayFormat: this.options && this.options.displayFormat || 'DD/MM/YYYY',
    };

    this.locale = this.options && { locale: this.options.locale } || esLocale;
  }

  showTarget() {
    // this.popoverTrigger.closePopover();
    // // // this.popoverTrigger._elementRef.nativeElement.style.top = 0;
    // // // this.popoverTrigger._elementRef.nativeElement.style.left = 0;
    // // // this.popoverTrigger._elementRef.nativeElement.style.position = 'fixed';
    // setTimeout(() => {
    //   this.popoverTrigger.openPopover();
    // }, 50);
  }

}
