import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'hk-label',
  templateUrl: 'hk-label.component.html'
})
export class HkLabelComponent implements OnInit, OnDestroy {
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
