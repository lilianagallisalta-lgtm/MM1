import { Injectable } from '@angular/core';
import {Loading, LoadingController} from "ionic-angular";

@Injectable()
export class LoadingService {
  loading: Loading;

  constructor (
    private loadingCtrl: LoadingController,
  ) { }

  present(): Loading {
    this._log('present', this.loading);
    if (this.loading) {
      this.loading.present();
    } else {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<div class="loading-jeremboo loading-jeremboo1">
                    <div class="circle circle1"></div>
                    <div class="circle circle2"></div>
                    <div class="circle circle3"></div>
                  </div>`,
        // content: `<div class="loading-deineko"> <i class="preloader-deineko"></i> </div>`,
        // content: `<div fxLayout="column" fxLayoutAlign="center center" fxFlexFill class="hk-loading-wrapper">
        //             <div class="hk-spinner"></div>
        //           </div>`,
        cssClass: 'hk-loading',
        dismissOnPageChange: true,
      });

      this.loading.present();
    }

    return this.loading;
  }

  dismiss() {
    this._log('dismiss');

    if (! this.loading) {
      return;
    }

    this.loading.dismissAll();
    this.loading = null;
  }

  private _log(...args) {
    console.debug('[hk-loading]', ...args);
  }
}
