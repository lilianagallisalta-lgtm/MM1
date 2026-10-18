import {Component, OnInit, OnDestroy, Input, ElementRef} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'hk-list',
  templateUrl: 'hk-list.component.html'
})
export class HkListComponent implements OnInit, OnDestroy {
  @Input() size: string = 'small';

  @Input('listClass') listClassList: string = '';

  private _destroyed$: Subject<boolean> = new Subject();

  constructor(
    public elementRef: ElementRef,
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
  }
}
