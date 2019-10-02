import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PageProvider } from '../../providers/page/page';
import { ProGloveProvider } from '../../providers/pro-glove/pro-glove';
import { BasePage } from '../BasePage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage extends BasePage {

  cardInfos = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public proGloveProvider: ProGloveProvider,
    public pageProvider: PageProvider) {
    super(navCtrl, navParams, proGloveProvider, pageProvider);
    this.cardInfos = this.pageProvider.getPages();
    this.pageName = 'Home';
  }

  ionViewWillEnter() {
    this.updateLocation = true;
    this.proGloveProvider.setLocation(this.pageName).subscribe(() => {
      this.goToLocation();
    });
  }

  ionViewDidLeave() {
    this.updateLocation = false;
  }
}
