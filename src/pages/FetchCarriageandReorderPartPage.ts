import { OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';

import { PartProvider } from '../providers/part/part';
import { ProGloveProvider } from '../providers/pro-glove/pro-glove';
import { ShredderProvider } from '../providers/shredder/shredder';
import { ToastProvider } from '../providers/toast/toast';

import { NextDestinationPage } from './next-destination/next-destination';
import { PartInfoPage } from './part-info/part-info';

export class FetchCarriageandReorderPartPage implements OnDestroy {

    productionStepName: string;
    pollingData: Subscription;
    polledPartNumber: -1;
    nextdestinationmodal = 'next-destination-modal';

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public toastProvider: ToastProvider,
        public partProvider: PartProvider,
        public progloveProvider: ProGloveProvider,
        public barcodeScanner: BarcodeScanner,
        public shredderProvider: ShredderProvider) {
        this.restartProglovePolling();
    }

    ngOnDestroy() {
        this.pollingData.unsubscribe();
    }

    onFetchCarriageClick(event): void {
        const profileModal = this.modalCtrl.create(NextDestinationPage, { productionStep: this.productionStepName }, { cssClass: this.nextdestinationmodal });
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

    onReorderPartClick(event): void {
        this.barcodeScanner.scan({ formats: 'CODE_128' }).then(barcodeData => {
            if (!barcodeData.cancelled) {
                const partNumber = Number(barcodeData.text);
                if (isNaN(partNumber)) {
                    this.toastProvider.presentToast('Teilenummer nicht erkannt');
                } else {
                    this.shredderProvider.getPartByPartNumber(partNumber).subscribe(part => {
                        part.status = 'reordered';
                        delete part.coatings;
                        delete part.production_steps;
                        const profileModal = this.modalCtrl.create(PartInfoPage, { reorderedPart: part }, { cssClass: this.nextdestinationmodal });
                        profileModal.onDidDismiss(() => {
                            this.refresh();
                        });
                        profileModal.present();
                    });
                }
            }
        }, () => {
            this.toastProvider.presentToast('Barcode-Scanner nicht verfügbar');
        });
    }

    getPartNumberFromProglove(): void {
        this.progloveProvider.getPartNumber().subscribe(data => {
            this.polledPartNumber = data.objects;
            if (this.polledPartNumber !== -1) {
                this.pollingData.unsubscribe();
                this.shredderProvider.getPartByPartNumber(this.polledPartNumber).subscribe(part => {
                    part.status = 'reordered';
                    delete part.coatings;
                    delete part.production_steps;
                    const profileModal = this.modalCtrl.create(PartInfoPage, { reorderedPart: part }, { cssClass: this.nextdestinationmodal });
                    profileModal.onDidDismiss(() => {
                        this.restartProglovePolling();
                        this.refresh();
                    });
                    profileModal.present();
                }, err => {
                    this.restartProglovePolling();
                });
            }
        }, err => { this.pollingData.unsubscribe(); });
    }

    restartProglovePolling(): void {
        this.pollingData = Observable.interval(1000).subscribe(data => {
            this.getPartNumberFromProglove();
        });
    }

    refresh(): void {
        // overwritten in derivated classes
    }
}
