import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { PartProvider } from '../../providers/part/part';
import { ProGloveProvider } from '../../providers/pro-glove/pro-glove';
import { ShredderProvider } from '../../providers/shredder/shredder';
import { ToastProvider } from '../../providers/toast/toast';
import { FetchCarriageandReorderPartPage } from '../FetchCarriageandReorderPartPage';

/**
 * Generated class for the SortPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sort',
  templateUrl: 'sort.html',
})
export class SortPage extends FetchCarriageandReorderPartPage {

  productionStepName = 'SR1';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastProvider: ToastProvider,
    public modalCtrl: ModalController,
    public partProvider: PartProvider,
    public proGloveProvider: ProGloveProvider,
    public barcodeScanner: BarcodeScanner,
    public shredderProvider: ShredderProvider) {
    super(navCtrl, navParams, modalCtrl, toastProvider, partProvider, proGloveProvider, barcodeScanner, shredderProvider);
  }
}
