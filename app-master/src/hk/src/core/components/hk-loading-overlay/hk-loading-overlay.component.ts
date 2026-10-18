import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'hk-loading-overlay',
  templateUrl: './hk-loading-overlay.component.html',
  styleUrls: ['./hk-loading-overlay.component.scss']
})
export class HkLoadingOverlayComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() position: string = 'fixed';
  // @Input('loading') loading$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
  }

}
