import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { PartProvider } from '../../providers/part/part';
import { ShredderProvider } from '../../providers/shredder/shredder';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the PartInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-part-info',
  templateUrl: 'part-info.html',
})
export class PartInfoPage {

  reorderedPart: Part;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public shredderProvider: ShredderProvider,
    public toastProvider: ToastProvider,
    public partProvider: PartProvider) {
    this.reorderedPart = navParams.data['reorderedPart'];
  }

  onCancel(): void {
    this.viewCtrl.dismiss();
  }

  onAccept(): void {
    // part exists in shredder and has to be updated in shredder and actual carriage
    this.shredderProvider.updatePart(this.reorderedPart).subscribe(part => {
      this.toastProvider.presentToast('Das Teil mit der Nummer ' + this.reorderedPart.part_number + ' wurde nachbestellt');

      this.partProvider.putPart(this.reorderedPart).subscribe(data => {
        this.viewCtrl.dismiss();
      }, err => {
        // modal has to be closed even if part does not exist in webservice
        this.viewCtrl.dismiss();
      });
    });
  }

}
