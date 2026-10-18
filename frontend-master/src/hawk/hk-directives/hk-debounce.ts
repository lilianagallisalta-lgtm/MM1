// https://github.com/numsu/angular2-debounce
import {Input, Output, EventEmitter, ElementRef, OnInit, Directive} from "@angular/core";
import {debounceTime} from "rxjs/internal/operators";
import {Observable} from "rxjs/Rx";

@Directive({
  selector: '[hk-debounce]'
})
export class HkDebounceDirective implements OnInit {
  @Input() delay: number = 700;
  @Output() start: EventEmitter<any> = new EventEmitter();
  @Output() func: EventEmitter<any> = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    // private model: NgModel
  ) {
  }

  ngOnInit(): void {
    Observable.fromEvent(this.elementRef.nativeElement, 'input')
    // .map(() => this.model.value)
      .subscribe((input: any) => this.start.emit(input.target.value));

    Observable.fromEvent(this.elementRef.nativeElement, 'input')
    // .map(() => this.model.value)
      .pipe(debounceTime(this.delay))
      .subscribe((input: any) => this.func.emit(input.target.value));
  }
}
