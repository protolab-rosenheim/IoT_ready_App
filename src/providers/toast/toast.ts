import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {
  }

  presentToast(message: string, duration?: number, position?: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: duration || 2000,
      position: position || 'bottom'
    });
    toast.present();
  }
}
