import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'hk-list-actions',
  templateUrl: 'hk-list-actions.component.html'
})
export class HkListActionsComponent implements OnInit, OnDestroy {
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
