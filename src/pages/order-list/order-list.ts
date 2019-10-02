import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { ShredderProvider } from '../../providers/shredder/shredder';
import { ToastProvider } from '../../providers/toast/toast';
import { ShredderPage } from '../shredder/shredder';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  orders: Order[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private toastProvider: ToastProvider,
    private loadingCtrl: LoadingController,
    private shredderProvider: ShredderProvider) {

  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: 'Daten werden geladen'
    });
    loading.present();

    this.shredderProvider.getOrdersByStatus('created').subscribe(data => {
      if (data) {
        this.orders = data.objects;
        loading.dismiss();
      }
    }, () => { loading.dismiss(); });
  }

  onScanTapped() {
    this.barcodeScanner.scan({ formats: 'CODE_128' }).then(barcodeData => {
      if (!barcodeData.cancelled) {
        const orderId = Number(barcodeData.text);

        if (isNaN(orderId)) {
          this.toastProvider.presentToast('Barcode nicht erkannt');
          return;
        }
        this.shredderProvider.getOrderById(orderId).subscribe(data => {
          this.navCtrl.push(ShredderPage, data);
        }, () => {
          this.toastProvider.presentToast('Barcode nicht erkannt');
        });
      }
    }, () => {
      this.toastProvider.presentToast('Barcode-Scanner nicht verfügbar');
    });
  }
}
