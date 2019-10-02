import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { SortModalPage } from '../../pages/sort-modal/sort-modal';

/**
 * Generated class for the SortBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sort-box',
  templateUrl: 'sort-box.html'
})
export class SortBoxComponent {

  @Input() sortBy: SortByCriteria[];
  @Output() onSortingChanged = new EventEmitter<SortByCriteria[]>();
  text: string;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.updateText();
  }

  openModal(event): void {
    // Deep copy this.sortBy to prevent changing data by simply dragging the items in the modal
    const sortByCopy = JSON.parse(JSON.stringify(this.sortBy));
    const sortModal = this.modalCtrl.create(SortModalPage, sortByCopy, { cssClass: 'sort-box-modal' });
    sortModal.onDidDismiss(data => {
      if (data) {
        this.sortBy = data;
        this.updateText();
        this.onSortingChanged.emit(this.sortBy);
      } else {
        // Do nothing, the modal was dismissed without changing the sort order
      }
    });
    sortModal.present();
  }

  updateText() {
    if (this.sortBy && this.sortBy.length > 0) {
      this.text = this.sortBy.map(criteria => criteria.displayTitle).join(', ');
    }
  }
}
