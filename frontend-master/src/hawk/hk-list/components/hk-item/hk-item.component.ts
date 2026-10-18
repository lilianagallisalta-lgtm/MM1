import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'hk-item',
  templateUrl: 'hk-item.component.html'
})
export class HkItemComponent implements OnInit, OnDestroy {
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
