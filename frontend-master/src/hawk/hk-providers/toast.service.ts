import { Injectable } from '@angular/core';
import {ToastController, Toast} from "ionic-angular";

@Injectable()
export class ToastService {
  constructor (
    private toast: ToastController,
  ) { }

  show(message: string, cssClass: string = '', duration: number = 3000): Toast {
    let toast = this.toast.create({
      message: message,
      duration: duration,
      cssClass: cssClass,
    });

    toast.present();

    return toast;
  }

  success(message: string, duration: number = 5000): Toast {
    if (! message) {
      return null;
    }

    return this.show(message, 'toast-success', duration);
  }

  apiError(errors: any) {
    try {
      errors = errors.error;

      if (errors.errors) {
        const firstKey = Object.keys(errors.errors)[0];

        if (errors.errors[firstKey]) {
          const firstError =  errors.errors[firstKey];

          if (firstError[0].message) {
            this.error(firstError[0].message);
          } else if (firstError.message) {
            this.error(firstError.message);
          } else {
            this.unknownError();
          }
        }
      } else if (errors.message) {
        this.error(errors.message);
      } else {
        this.unknownError();
      }
    } catch (e) {
      this.unknownError();
    }
  }

  apiSuccess(response: any) {
    try {
      let message = response.message;

      if (typeof message === 'object') {
        let first = true;

        for (let key of Object.keys(message)) {
          let m = message[key];

          if (first) {
            this.success(m, 4000);
            first = false;
          } else {
            setTimeout(() => {
              this.success(m, 4000);
            }, 5000);
          }
        }
      } else if (message) {
        this.success(response.message);
      } else {
        this.success('OK');
      }
    } catch (e) {
      this.success('OK');
    }
  }

  unknownError(errors?: any) {
    this.error('Ocurrió un error. Por favor, intentá de nuevo.');
  }

  error(message: string) {
    this.show(message, 'hk-toast-error', 5000);
  }

  loading(infinite: boolean = true) {
    return this.show('Loading...', '', infinite ? null : 3000);
  }

  checkInternet() {
    this.error('Por favor revisa tu conexión a internet.');
  }
}
