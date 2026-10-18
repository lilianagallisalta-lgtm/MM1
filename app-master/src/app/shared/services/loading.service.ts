import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private loadingController: LoadingController,
  ) {
    this.loading$
      .subscribe((loading: boolean) => {
        this._log('loading$', loading);

        if (loading === true) {
          this.presentLoading();
        } else {
          setTimeout(() => {
            this.dismissLoading();
          }, 50);
        }
      });
  }

  async init() {
    // if (! this.loading) {
    //   this.loading = await this.loadingController.create({
    //     translucent: true,
    //     showBackdrop: false,
    //     cssClass: 'app-loading',
    //   });
    // }
    //
    // return this.loading;
  }

  async present() {
    this._log('present', this.loading);
    this.loading$.next(true);
  }

  async dismiss() {
    this._log('dismiss', this.loading);
    this.loading$.next(false);
  }

  private async presentLoading() {
    await this.init();

    if (this.loading) {
      await this.loading.present();
    }
  }

  private async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }

    this.loading = null;
  }

  private _log(...args) {
    // console.debug('[loadingservice]', args);
  }
}
