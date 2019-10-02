import { Component, Inject, forwardRef } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WorkStation } from '../../app/shared/models/WorkStation';
import { WorkStationType } from '../../app/shared/models/WorkStationType';
import { PageProvider } from '../../providers/page/page';
import { ProGloveProvider } from '../../providers/pro-glove/pro-glove';
import { ToastProvider } from '../../providers/toast/toast';
import { WorkStationProvider } from '../../providers/work-station/work-station';
import { BasePage } from '../BasePage';

/**
 * Generated class for the WorkstationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workstation',
  templateUrl: 'workstation.html',
})
export class WorkstationPage extends BasePage {

  workstations: WorkStation[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public proGloveProvider: ProGloveProvider,
    public workStationProvider: WorkStationProvider,
    public barcodeScanner: BarcodeScanner,
    public toastProvider: ToastProvider,
    @Inject(forwardRef(() => PageProvider)) public pageProvider) {
    super(navCtrl, navParams, proGloveProvider, pageProvider);
    this.pageName = 'Workstation';
  }
  ionViewDidLoad() {
    this.workStationProvider.getWorkStations().then(stations => {
      if (stations === null) {
        this.workStationProvider.addWorkstation({ id: '2ffe033b-2f8a-4834-b2dc-4ba98e4b7385', type: WorkStationType.tower, side: 1, name: 'Beschlägeturm 1', ip: '141.60.104.172' })
          .then(demoStations => this.workstations = demoStations);
      } else {
        this.workstations = stations;
      }
    });
  }

  scanTapped(event): void {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.cancelled) { return; }

      if (isWorkStation(JSON.parse(barcodeData.text))) {
        // TODO Check if workstation already exists
        this.workStationProvider.addWorkstation(JSON.parse(barcodeData.text)).
          then(stations => this.workstations = stations);
      } else {
        this.toastProvider.presentToast('Der gescannte Barcode ist nicht valide');
      }

    }, err => {
      this.toastProvider.presentToast('Barcode-Scanner nicht verfügbar');
    });
  }

  removeWorkstation(stationToRemove: WorkStation) {
    this.workStationProvider.deleteWorkStation(stationToRemove).then(updatedStations => {
      this.workstations = updatedStations;
    });
  }
}

function isWorkStation(arg: any): arg is WorkStation {
  // TODO Better checks: Eg if tower has ip and side
  return arg.id !== undefined && arg.name !== undefined && arg.type !== undefined;
}
