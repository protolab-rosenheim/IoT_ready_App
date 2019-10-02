import { Component, Inject, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { PageProvider } from '../../providers/page/page';

/**
 * Generated class for the NextDestinationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next-destination',
  templateUrl: 'next-destination.html',
})
export class NextDestinationPage {

  destinations = [];

  currentLocation: string;
  currentIndex: number;

  nextIndex: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    @Inject(forwardRef(() => PageProvider)) public pageProvider: PageProvider) {
    this.destinations = this.pageProvider.getPagesWithProductionStep();
    this.currentLocation = navParams.data['productionStep'];
    this.currentIndex = this.destinations.findIndex(destination => destination.productionStepName === this.currentLocation);
  }

  onCancel(): void {
    this.viewCtrl.dismiss();
  }

  onAccept(): void {
    this.viewCtrl.dismiss(this.destinations[this.nextIndex]);
  }

}
