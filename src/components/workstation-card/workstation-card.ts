import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WorkStation } from '../../app/shared/models/WorkStation';
import { WorkStationType } from '../../app/shared/models/WorkStationType';
import { ChuteConfigPage } from '../../pages/chute-config/chute-config';

/**
 * Generated class for the WorkstationCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'workstation-card',
  templateUrl: 'workstation-card.html'
})
export class WorkstationCardComponent {

  @Input() station: WorkStation;

  @Output() onRemoveClicked = new EventEmitter<WorkStation>();

  constructor(public navCtrl: NavController) {

  }

  onRemove(station: WorkStation): void {
    this.onRemoveClicked.emit(station);
  }

  workstationTapped(station: WorkStation) {
    if (station.type === WorkStationType.tower) {
      this.navCtrl.push(ChuteConfigPage, station);
    }
  }
}
