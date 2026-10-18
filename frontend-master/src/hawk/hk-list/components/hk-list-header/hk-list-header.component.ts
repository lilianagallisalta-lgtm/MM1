import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'hk-list-header',
  templateUrl: 'hk-list-header.component.html'
})
export class HkListHeaderComponent implements OnInit, OnDestroy {
  @Input('class') classList: string = '';

  private _destroyed$: Subject<boolean> = new Subject();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
  }
}
