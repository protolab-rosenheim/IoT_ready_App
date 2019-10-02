import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SortModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sort-modal',
  templateUrl: 'sort-modal.html',
})
export class SortModalPage {

  sortBy: SortByCriteria[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.sortBy = navParams.data;
  }

  reorderItems(indexes: ReorderEvent): void {
    const element = this.sortBy[indexes.from];
    this.sortBy.splice(indexes.from, 1);
    this.sortBy.splice(indexes.to, 0, element);
  }

  onAccept(): void {
    this.viewCtrl.dismiss(this.sortBy);
  }

  onCancel(): void {
    this.viewCtrl.dismiss();
  }
}
