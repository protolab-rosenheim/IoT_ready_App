import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShredderPage } from '../../pages/shredder/shredder';

/**
 * Generated class for the OrderCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'order-card',
  templateUrl: 'order-card.html'
})
export class OrderCardComponent {

  @Input() order: Order;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {

  }

  onOrderSelected(order: Order): void {
    this.navCtrl.push(ShredderPage, order);
  }

}
