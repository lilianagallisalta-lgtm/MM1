import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {AppStore} from '../../../app/state/app.store';

@Component({
  selector: 'app-cookie-conscent',
  templateUrl: './cookie-conscent.component.html',
  styleUrls: ['./cookie-conscent.component.scss']
})
export class CookieConscentComponent implements OnInit {

  show: boolean = false;

  constructor(
    private storage: Storage,
    private appStore: AppStore,
  ) {
    this.storage.get('cookie-conscent').then((conscent) => {
      if (! conscent || conscent === false) {
        this.show = true;
      }

      this.appStore.changeCookieConscent(conscent === true);
    });
  }

  ngOnInit() {
  }

  ok() {
    this.storage.set('cookie-conscent', true).then(() => {
      this.show = false;
      this.appStore.changeCookieConscent(true);
    });
  }

}
