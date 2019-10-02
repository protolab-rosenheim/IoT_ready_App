import { Component, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';

import { WorkStation } from '../../app/shared/models/WorkStation';
import { ThreeBaseComponent } from '../../components/three-base/three-base';
import { AssemblyGroupProvider } from '../../providers/assembly-group/assembly-group';
import { CoatingProvider } from '../../providers/coating/coating';
import { FilterProvider } from '../../providers/filter/filter';
import { OpcUaProvider } from '../../providers/opc-ua/opc-ua';
import { PartProvider } from '../../providers/part/part';
import { ProGloveProvider } from '../../providers/pro-glove/pro-glove';
import { ShredderProvider } from '../../providers/shredder/shredder';
import { SlotProvider } from '../../providers/slot/slot';
import { ToastProvider } from '../../providers/toast/toast';
import { WorkStationProvider } from '../../providers/work-station/work-station';
import { FetchCarriageandReorderPartPage } from '../FetchCarriageandReorderPartPage';

/**
 * Generated class for the AssemblyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assembly-detail',
  templateUrl: 'assembly-detail.html',
})
export class AssemblyDetailPage extends FetchCarriageandReorderPartPage {

  group: AssemblyGroup;
  coatings: Coating[];
  @ViewChild('three') three: ThreeBaseComponent;

  hideFront = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private workStationProvider: WorkStationProvider,
    private slotProvider: SlotProvider,
    private coatingProvider: CoatingProvider,
    private opcuaProvider: OpcUaProvider,
    private assemblyGroupProvider: AssemblyGroupProvider,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public partProvider: PartProvider,
    public toastProvider: ToastProvider,
    public proGloveProvider: ProGloveProvider,
    public barcodeScanner: BarcodeScanner,
    public shredderProvider: ShredderProvider,
    private filterProvider: FilterProvider) {
    super(navCtrl, navParams, modalCtrl, toastProvider, partProvider, proGloveProvider, barcodeScanner, shredderProvider);
    this.group = this.navParams.data.group;
  }

  ionViewDidLoad() {
    const partNumbers = this.group.parts.map(part => part.part_number);
    this.illuminateContainerSlots(partNumbers);

    this.coatingProvider.getCoatingsByPartNumbers(partNumbers).subscribe(data => {
      if (data) {
        this.coatings = this.joinDuplicateCoatings(data.objects);
        const coatingNames = this.coatings.map(coating => coating.name);
        this.workStationProvider.getTower().then(tower => {
          if (tower && tower.ip) {
            this.illuminateTowerSlots(tower, coatingNames);
          } else {
            // TODO Tell user that there's no tower registered
          }
        });
      }
    });
    this.three.startAnimation();
    this.three.addGroup(this.navParams.data.meshes);
  }

  ionViewWillLeave() {
    // Turn tower lights off
    this.workStationProvider.getTower().then(tower => {
      if (tower && tower.ip) {
        this.opcuaProvider.allOff(tower.ip);
      }
    });
    // Turn container lights off
    this.opcuaProvider.allOff();
    this.three.stopAnimation();
  }

  onDone(): void {
    const loading = this.loadingCtrl.create({
      content: 'Daten werden gespeichert'
    });
    loading.present();

    // Deep clone this.group to prevent the UI from updating
    const groupToPut = JSON.parse(JSON.stringify(this.group));
    // when we're deleting all parts to prevent unhashable type error
    delete groupToPut.parts;
    groupToPut.assembled = true;

    this.assemblyGroupProvider.putAssemblyGroup(groupToPut).subscribe(() => {
      loading.dismiss();
      this.navCtrl.pop();
    });
  }

  illuminateTowerSlots(tower: WorkStation, coatingNames: string[]): void {
    this.coatingProvider.getSlotsByCoatingNames(tower.ip, coatingNames).subscribe(slots => {
      if (slots) {
        this.opcuaProvider.illuminateMultipleSlots(slots, 'green', tower.ip);
      }
    });
  }

  illuminateContainerSlots(partNumbers: number[]): void {
    this.slotProvider.getSlotsByPartNumbers(partNumbers).subscribe(data => {
      if (data) {
        const slots = data.objects;
        this.opcuaProvider.illuminateMultipleSlots(slots, 'green');
      }
    });
  }

  joinDuplicateCoatings(coatings: Coating[]): Coating[] {
    const result: Coating[] = [];

    coatings.forEach(coating => {
      const duplicate = result.find(a => a.name === coating.name);
      if (duplicate === undefined) {
        result.push(coating);
      } else {
        // If there's a duplicate increase it's count
        duplicate.count = duplicate.count + coating.count;
      }
    });
    return result;
  }

  toggleFrontVisibility(): void {
    if (this.hideFront) {
      const fronts = this.group.parts
        .filter(part => this.filterProvider.isFront(part));
      this.three.setPartsVisibility(fronts, false);
    } else {
      this.three.restoreElementVisiblity(true);
    }

    this.hideFront = !this.hideFront;
  }
}
