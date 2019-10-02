import { ModalController, NavController, NavParams } from 'ionic-angular';

import { ToastProvider } from '../providers/toast/toast';

import { NextDestinationPage } from './next-destination/next-destination';

export class FetchCarriagePage {

    productionStepName: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public toastProvider: ToastProvider) {

    }

    onFetchCarriageClick(event): void {
        const profileModal = this.modalCtrl.create(NextDestinationPage, { productionStep: this.productionStepName }, { cssClass: 'next-destination-modal' });
        profileModal.onDidDismiss(data => {
            if (data) {
                // TODO: Actually order a carriage
                this.toastProvider.presentToast('Ein fahrerloses Transportsystem macht sich auf den Weg zu Ihnen');
                this.navCtrl.pop();
            } else {
                // Do nothing, the modal was dismissed without choosing a destination
            }
        });
        profileModal.present();
    }
}
