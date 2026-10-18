import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
  ) { }

  confirmDelete(message?: string, title?: string) {
    return new Observable(observer => {
      this.alertController.create({
        header: title || '¿Estás seguro?',
        message: message || '',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              observer.next();
              observer.complete();
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              observer.complete();
            },
          }
        ],
      }).then((alert) => {
        alert.present();
      });
    });
  }

  confirm(title: string, message?: string) {
    return new Observable(observer => {
      this.alertController.create({
        header: title,
        message: message || '',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              observer.next();
              observer.complete();
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              observer.complete();
            },
          }
        ],
      }).then((alert) => {
        alert.present();
      });
    });
  }

}
