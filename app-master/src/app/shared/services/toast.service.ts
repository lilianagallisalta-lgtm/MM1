import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

const UNKNOWN_ERROR = 'Ha ocurrido un error. Por favor intenta de nuevo.';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
  ) { }

  async show(message: string, duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });

    toast.present();

    return toast;
  }

  async error(message: string) {
    const toast = await this.toastController.create({
      message: message || UNKNOWN_ERROR,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'CERRAR',
      cssClass: 'hk-toast-error',
      duration: 5000,
    });

    toast.present();
  }

  async success(message?: string) {
    const toast = await this.toastController.create({
      message: message || 'OK',
      cssClass: 'hk-toast-success',
      duration: 3000,
    });

    toast.present();
  }

  async checkInternet() {
    return this.error('Revisa tu conexión a internet');
  }

}
