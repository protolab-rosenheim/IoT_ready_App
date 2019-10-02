import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { HistoryItem } from '../../app/shared/models/HistoryItem';
import { ContainerListComponent } from '../../components/container-list/container-list';
import { ArrayHelperProvider } from '../../providers/array-helper/array-helper';
import { FilterProvider } from '../../providers/filter/filter';
import { HistoryProvider } from '../../providers/history/history';
import { PartsDroppedProvider } from '../../providers/parts-dropped/parts-dropped';
import { ShredderProvider } from '../../providers/shredder/shredder';
import { HomePage } from '../home/home';

/**
 * Generated class for the ShredderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shredder',
  templateUrl: 'shredder.html',
})
export class ShredderPage {
  order: Order;

  parts: Part[] = [];
  shownParts: Part[] = [];
  selectedParts: Part[] = [];

  showList = false;

  filters: Filters;
  filterProperties = ['part_mapping', 'description'];

  messagePluralMap = {
    '=1': '# Teil',
    'other': '# Teile'
  };

  @ViewChild('containerList')
  containerList: ContainerListComponent;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private partDroppedService: PartsDroppedProvider,
    private history: HistoryProvider,
    private loadingCtrl: LoadingController,
    private arrayHelper: ArrayHelperProvider,
    private shredderProvider: ShredderProvider,
    private filterProvider: FilterProvider) {
    this.order = this.navParams.data;

    this.history.resetHistory();

    this.partDroppedService.onPartsDropped.subscribe(
      droppedPartIds => this.onPartsDropped(droppedPartIds)
    );
    this.history.onUndoLastItem.subscribe(itemToUndo => this.onUndo(itemToUndo));
  }

  ngOnInit() {
    const loading = this.loadingCtrl.create({
      content: 'Daten werden geladen'
    });
    loading.present();

    this.shredderProvider.getPartsByOrderId(this.order.id).subscribe(data => {
      if (data) {
        this.parts = data.objects;
        this.shownParts = this.parts;
        this.setupFilters();

        this.selectedParts = [];
        loading.dismiss();
      }
    });
  }

  undoLast(): void {
    if (this.history.canUndo()) {
      this.history.undoLastItem();
    }
  }

  onUndo(itemToUndo: HistoryItem): void {
    if (itemToUndo.from === 'list') {
      this.parts = this.parts.concat(itemToUndo.movedParts);
      this.parts = this.arrayHelper.sortArrayBy(this.parts, 'part_number');
      this.shownParts = this.parts;
      this.clearAllFilters();
    }
  }

  onPartsDropped(droppedPartIds: number[]): void {
    this.selectedParts = [];
    this.parts = this.arrayHelper.removeElementsFromArrayById(this.parts, droppedPartIds, 'part_number');
    this.shownParts = this.arrayHelper.removeElementsFromArrayById(this.shownParts, droppedPartIds, 'part_number');
  }

  //#region Filters
  setupFilters(): void {
    const allFilters = {};
    this.filterProperties.forEach(filterProperty => {
      // Find unique filter possibilities
      let filterPossibilities = this.parts
        .map(part => part[filterProperty]).filter((v, i, a) => a.indexOf(v) === i);
      filterPossibilities = this.arrayHelper.sortArray(filterPossibilities);
      allFilters[filterProperty] = this.setupFilterOptions(filterPossibilities);
    });
    // It's important to set all filters at once, otherwise the filter-accordeon might not be initalized correctly
    this.filters = allFilters;
  }

  setupFilterOptions(possibilities: (string | number)[]): FilterOption[] {
    const options: FilterOption[] = [];
    possibilities.forEach(possibility => {
      const name = this.filterProvider.getGroupNameByDescription(possibility);
      // Find duplicate names
      const duplicate = options.find(option => option.name === name);
      if (duplicate === undefined) {
        // If the name is new: Add a new option
        options.push({ name, value: [possibility], isSelected: false });
      } else {
        // Else add the value to the existing option
        duplicate.value.push(possibility);
      }
    });
    return options;
  }

  onFilterChanged($event: Filters): void {
    this.filters = $event;
    this.filterParts($event);

    // TODO Maybe keep the selected parts that are not filtered out
    this.selectedParts = [];
  }

  clearAllFilters(): void {
    this.filterProperties.forEach(property => {
      this.filters[property].forEach(filter => filter.isSelected = false);
    });
    this.onFilterChanged(this.filters);
  }

  filterParts(filters: Filters): void {
    const selectedPartMappings = this.getSelectedFilterValues(filters['part_mapping']);
    const selectedDescriptions = this.getSelectedFilterValues(filters['description']);

    this.shownParts = this.parts.filter(part => selectedPartMappings.includes(part['part_mapping']) &&
      selectedDescriptions.includes(part['description'])
    );
  }

  getSelectedFilterValues(filterOptions: FilterOption[]): (string | number)[] {
    if (filterOptions.some(filter => filter.isSelected)) {
      return this.arrayHelper.flatten(filterOptions.filter(filter => filter.isSelected).map(filter => filter.value));
    } else {
      // If no option is selected do not filter anything but return all filter values
      return this.arrayHelper.flatten(filterOptions.map(filter => filter.value));
    }

  }
  //#endregion

  onDone(): void {
    const loading = this.loadingCtrl.create({
      content: 'Daten werden gespeichert'
    });
    loading.present();

    const observables = [];

    // Create carriages in DB
    this.containerList.containers.forEach(carriage => {
      carriage.order_id = this.order.id;
      observables.push(this.shredderProvider.postCarriage(carriage));
    });

    // Update order.status
    this.order.status = 'shreddered';
    // Delete virtual_carriages and assembly_groups to prevent TypeError: unhashable type
    // TODO Find a less hacky way to prevent the error
    delete (this.order as any).virtual_carriages;
    delete this.order.assembly_groups;
    observables.push(this.shredderProvider.updateOrder(this.order));

    // Navigate back after all REST calls finished
    forkJoin(observables).subscribe(() => {
      loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    });
  }
}
