import { Component, OnInit } from '@angular/core';
import {AppQuery} from '../../../app/state/app.query';
import {AppStore} from '../../../app/state/app.store';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {

  cookieConscent$ = this.appQuery.cookieConscent$;

  constructor(
    private appQuery: AppQuery,
    private appSore: AppStore,
  ) {
  }

  ngOnInit() { }

}
