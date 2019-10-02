import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WorkStation } from '../../app/shared/models/WorkStation';
import { CoatingProvider } from '../../providers/coating/coating';
import { SlotProvider } from '../../providers/slot/slot';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the ChuteConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chute-config',
  templateUrl: 'chute-config.html',
})
export class ChuteConfigPage {

  tower: WorkStation;

  scannedSlot: Slot;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private toastProvider: ToastProvider,
    private slotProvider: SlotProvider,
    private coatingProvider: CoatingProvider) {
    this.tower = navParams.data;
  }

  scanSlot() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (!barcodeData.cancelled) {
        // TODO: Sanity checks: Have we actually scanned a slot?
        // Does this slot belong to the tower/side we're connected to?
        try {
          const scannedSlot = JSON.parse(barcodeData.text).data;

          this.slotProvider.getSlotBySlotId(this.tower.ip, scannedSlot.id).subscribe(data => {
            this.scannedSlot = data;
          });
        } catch (e) {
          this.scannedSlot = undefined;
          this.toastProvider.presentToast('Barcode nicht erkannt');
        }
      }
    }, () => {
      this.toastProvider.presentToast('Barcode-Scanner nicht verfügbar');
    });
  }

  scanCoating() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (!barcodeData.cancelled) {
        // TODO: Sanity checks: Have we actually scanned a coating?

        const coatingId = barcodeData.text;
        this.coatingProvider.getCoatingById(this.tower.ip, coatingId).subscribe(data => {
          const coating = data;

          // TODO check if slot is already taken!?
          if (this.scannedSlot.coating !== undefined) {
            // Reset scannedSlot.coating to prevent IntegrityError
            this.scannedSlot.coating = undefined;
            this.slotProvider.putSlot(this.tower.ip, this.scannedSlot).subscribe(() => {
              coating.slot_id = this.scannedSlot.id;
              this.updateCoating(coating);
            }, () => {
              this.scannedSlot = undefined;
              this.toastProvider.presentToast('Beschlag konnte nicht mit Platz verknüpft werden');
            });
          } else {
            coating.slot_id = this.scannedSlot.id;
            this.updateCoating(coating);
          }
        }, () => {
          this.toastProvider.presentToast('Beschlag konnte nicht in der Datenbank gefunden werden');
        });

      }
    }, () => {
      this.toastProvider.presentToast('Barcode-Scanner nicht verfügbar');
    });
  }

  updateCoating(coating: TowerCoating) {
    this.coatingProvider.putCoating(this.tower.ip, coating).subscribe(() => {
      this.scannedSlot = undefined;
      this.toastProvider.presentToast('Beschlag mit neuem Platz vebunden');
    }, () => {
      this.scannedSlot = undefined;
      this.toastProvider.presentToast('Beschlag konnte nicht mit Platz verknüpft werden');
    });
  }
}
