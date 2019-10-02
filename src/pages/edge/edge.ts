import { Component, Inject, forwardRef } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { OpcUaProvider } from '../../providers/opc-ua/opc-ua';
import { PageProvider } from '../../providers/page/page';
import { PartProvider } from '../../providers/part/part';
import { ProGloveProvider } from '../../providers/pro-glove/pro-glove';
import { ProductionStepProvider } from '../../providers/production-step/production-step';
import { ShredderProvider } from '../../providers/shredder/shredder';
import { SlotProvider } from '../../providers/slot/slot';
import { ToastProvider } from '../../providers/toast/toast';
import { FetchCarriageandReorderPartPage } from '../FetchCarriageandReorderPartPage';

/**
 * Generated class for the EdgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edge',
  templateUrl: 'edge.html',
})

export class EdgePage extends FetchCarriageandReorderPartPage {

  productionStepName = 'EB1';

  outstandingParts: Part[] = new Array();
  finishedParts: Part[] = new Array();
  selectedParts: Part[] = new Array();
  outstandingProdSteps: ProductionStep[] = new Array();
  selectedProdStepsNumbers: number[] = new Array();
  allEdgesNames = new Set();
  allPartsNumberOnBoard = 0;
  allPartsNumberNotOnboard = 0;

  partNumbertoEdgeValues = {};

  allPartsSelected = false;

  illuminateChecker = false;

  selectedIndex: number;

  previouslySelectedPart: Part;
  dragStartElement: Element;
  dragCheckboxIcon = new Image();

  sortByCriteria: SortByCriteria[] = [{ displayTitle: 'Dicke', fieldname: 'finished_thickness' },
  { displayTitle: 'Länge', fieldname: 'finished_length' },
  { displayTitle: 'Kantenwert', fieldname: 'edge_value' }];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productionStepProvider: ProductionStepProvider,
    public partProvider: PartProvider,
    public slotProvider: SlotProvider,
    public opcuaProvider: OpcUaProvider,
    public toastProvider: ToastProvider,
    public proGloveProvider: ProGloveProvider,
    public modalCtrl: ModalController,
    public barcodeScanner: BarcodeScanner,
    public shredderProvider: ShredderProvider,
    @Inject(forwardRef(() => PageProvider)) public pageProvider) {
    super(navCtrl, navParams, modalCtrl, toastProvider, partProvider, proGloveProvider, barcodeScanner, shredderProvider);
  }

  ionViewDidLoad() {
    this.updateOutstandingParts();
    this.updateAllPartsNumber();
  }

  ionViewWillLeave() {
    // Turn container lights off
    this.opcuaProvider.allOff();
  }

  onSortingChanged(sortByCriteria: SortByCriteria[]) {
    this.selectedParts = []; // clear Array
    this.allPartsSelected = false;  // uncheck upper checkbox
    this.sortByCriteria = sortByCriteria;
    this.updateOutstandingParts();
  }

  illuminateAllSlots(event) {
    this.illuminateMultipleCorrespondingSlots(this.selectedParts);
  }

  changeSelectedPartStatusToFinished(event) {
    if (this.illuminateChecker) {
      this.selectedProdStepsNumbers = [];
      this.selectedParts.forEach(part => {
        this.outstandingProdSteps.forEach(step => {
          if (part.part_number === step.part_number) {
            this.selectedProdStepsNumbers.push(step.id);
          }
        });
      });
      this.productionStepProvider.putManyProductionSteps(this.selectedProdStepsNumbers).subscribe(data => {
        this.updateOutstandingParts();
        this.selectedParts = []; // clear Array
        this.illuminateChecker = false;
        this.allPartsSelected = false;  // uncheck upper checkbox
        // After updating parts -> Turn pbl off
        this.opcuaProvider.allOff();
      });
    } else { this.toastProvider.presentToast('Ausgewählte Teile im Wagen anzeigen!'); }
  }

  updateOutstandingParts(): void {
    this.partProvider.getOutstandingParts(this.productionStepName, this.sortByCriteria)
      .subscribe(data => {
        if (data) {
          this.outstandingParts = data['objects'];
          this.updateEdgeValues();
        }
      });
  }

  updateAllPartsNumber(): void {
    this.partProvider.countPartsOnboard()
      .subscribe(data => {
        if (data) {
          this.allPartsNumberOnBoard = data;
        }
      });
  }

  updateEdgeValues(): void {
    this.outstandingParts.forEach(part => {
      this.partNumbertoEdgeValues[part.part_number] = [];
    });
    this.productionStepProvider.getOutstandingProductionSteps(this.productionStepName)
      .subscribe(data => {
        this.outstandingProdSteps = data['objects'];
        data.objects.forEach(step => {
          if (step.edge_value) {
            this.allEdgesNames.add(step.edge_value);
            this.outstandingParts.forEach(part => {
              if (step.part_number === part.part_number) {
                const set = new Set(this.partNumbertoEdgeValues[part.part_number]);
                set.add(step.edge_value);
                this.partNumbertoEdgeValues[part.part_number] = Array.from(set);
              }
            });
          }
        });
      });
  }

  toggleSelection(selectedPart: Part): void {
    const indexOfPart = this.selectedParts.indexOf(selectedPart);
    if (indexOfPart === -1) {
      this.selectedParts = this.selectedParts.concat(selectedPart);
    } else {
      this.selectedParts.splice(indexOfPart, 1);
    }
  }

  isSelected(part: Part): boolean {
    const indexOfPart = this.selectedParts.indexOf(part);
    if (this.selectedParts.length === 0) { this.illuminateChecker = false; }
    return indexOfPart !== -1;
  }

  toggleSelectAll(): void {
    this.selectedParts = [];
    if (!this.allPartsSelected) {
      this.selectedParts = this.selectedParts.concat(this.outstandingParts);
    }
    this.allPartsSelected = !this.allPartsSelected;
  }

  illuminateMultipleCorrespondingSlots(parts: Part[]) {
    const partNumbers = parts.map(part => part.part_number);
    this.slotProvider.getSlotsByPartNumbers(partNumbers).subscribe(data => {
      if (data && data.objects.length !== 0) {
        this.toastProvider.presentToast('Teile werden im Wagen angezeigt');
        this.illuminateChecker = true;
        this.opcuaProvider.illuminateMultipleSlots(data.objects, 'green');
      } else { this.illuminateChecker = false; }
    });
  }

  startDraggingCheckbox(event: DragEvent, part: Part): void {
    this.toggleSelectionForDrags(part);
    this.dragStartElement = event.srcElement;
    // Set the dragImage
    event.dataTransfer.setDragImage(this.dragCheckboxIcon, 0, 0);
  }

  onDragEnter(event: DragEvent, part: Part): void {
    // Prevent deselecting parts if we're dragging them to a container
    if (this.dragStartElement && this.dragStartElement.id === 'checkboxcolumn') {
      this.toggleSelectionForDrags(part);
    }
    event.preventDefault();
  }

  toggleSelectionForDrags(selectedPart: Part): void {
    if (selectedPart !== this.previouslySelectedPart) {
      // Prevent (un-)selecting a part we have just selected, as the ondragleave event is a stream of events
      // Throttling the event actually works way worse
      this.previouslySelectedPart = selectedPart;
      this.toggleSelection(selectedPart);
    }
  }

  refresh(): void {
    this.updateOutstandingParts();
    this.updateAllPartsNumber();
  }

}
