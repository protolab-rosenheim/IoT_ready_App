import { Component, Inject, forwardRef } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { CarriageProvider } from '../../providers/carriage/carriage';
import { OpcUaProvider } from '../../providers/opc-ua/opc-ua';
import { PageProvider } from '../../providers/page/page';
import { PartProvider } from '../../providers/part/part';
import { ProGloveProvider } from '../../providers/pro-glove/pro-glove';
import { ShredderProvider } from '../../providers/shredder/shredder';
import { SlotProvider } from '../../providers/slot/slot';
import { ToastProvider } from '../../providers/toast/toast';
import { FetchCarriageandReorderPartPage } from '../FetchCarriageandReorderPartPage';

/**
 * Generated class for the DrillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drill',
  templateUrl: 'drill.html',
})
export class DrillPage extends FetchCarriageandReorderPartPage {

  productionStepName = 'DR1';

  outstandingParts: Part[] = [];
  selectedIndex: number;

  sortByCriteria: SortByCriteria[] = [{ displayTitle: 'Dicke', fieldname: 'finished_thickness' },
  { displayTitle: 'Länge', fieldname: 'finished_length' },
  { displayTitle: 'Kantenwert', fieldname: 'edge_value' }];

  // True if parts were updated the first time after entering this page
  updateOPartsCalled: boolean;
  // True If long polling every x ms should be called
  updateOPartsRefresh: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public partProvider: PartProvider,
    public slotProvider: SlotProvider,
    public opcuaProvider: OpcUaProvider,
    public proGloveProvider: ProGloveProvider,
    public carriageProvider: CarriageProvider,
    public toastProvider: ToastProvider,
    public modalCtrl: ModalController,
    public barcodeScanner: BarcodeScanner,
    public shredderProvider: ShredderProvider,
    @Inject(forwardRef(() => PageProvider)) public pageProvider) {
    super(navCtrl, navParams, modalCtrl, toastProvider, partProvider, proGloveProvider, barcodeScanner, shredderProvider);
  }

  ionViewDidLoad() {
    this.updateOPartsCalled = false;
    this.updateOPartsRefresh = true;
    this.updateOutstandingParts();
    this.carriageProvider.getCarriages().subscribe(data => {
      if (data.objects.length === 1) {
        const carriage = data.objects[0];
        carriage.current_location = 'DR1';
        carriage.carriage_status = 'in use';
        this.carriageProvider.putCarriage(carriage).subscribe();
      }
    });
  }

  ionViewDidLeave() {
    this.updateOPartsRefresh = false;
  }

  onSortingChanged(sortByCriteria: SortByCriteria[]) {
    this.sortByCriteria = sortByCriteria;
  }

  onSelect(part: Part, index: number) {
    this.selectedIndex = index;
    this.illuminateCorrespondingSlot(part.part_number);
    this.opcuaProvider.loadBhxProgram(part.part_number);
  }

  updateOutstandingParts(): void {
    if (this.updateOPartsCalled && this.updateOPartsRefresh) {
      this.partProvider.getOutstandingParts(this.productionStepName, this.sortByCriteria, 1000)
        .subscribe(data => {
          if (data && data['objects'].length > 0) {
            if (this.outstandingParts[0]['part_number'] !== data['objects'][0]['part_number']) {
              this.onSelect(data['objects'][0], 0);
            }
            this.outstandingParts = data['objects'];
            this.updateOutstandingParts();
          } else if (data) {
            this.outstandingParts = data['objects'];
          }
        });
    } else if (this.updateOPartsRefresh) {
      this.partProvider.getOutstandingParts(this.productionStepName, this.sortByCriteria)
        .subscribe(data => {
          if (data) {
            this.outstandingParts = data['objects'];
            this.updateOPartsCalled = true;
            this.updateOutstandingParts();
          }
        });
    }
  }

  illuminateCorrespondingSlot(part_number) {
    this.slotProvider.getSlotByPartNumber(part_number).subscribe(data => {
      if (data.num_results === 1) {
        const slotNumber = data.objects[0].slot_name;
        this.opcuaProvider.illuminateSlotWithHistory(slotNumber, 'green', 1);
      } else {
        // If there is no corresponding slot turn off all lights
        this.opcuaProvider.allOff();
      }
    });
  }

}
