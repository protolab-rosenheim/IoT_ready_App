import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the FilterAccordeonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-accordeon',
  templateUrl: 'filter-accordeon.html'
})
export class FilterAccordeonComponent {

  @Input() headerText: string;
  @Input() filterProperty: string;
  @Input() filters: Filters;
  @Input() columnsCount = 3;

  @Output() onFilterChanged = new EventEmitter<Filters>();

  open = true;

  filterOptions: FilterOption[];

  rows: Row[];

  ngOnInit() {
    this.filterOptions = this.filters[this.filterProperty];
    this.rows = this.calculateRows();
  }

  toggleOpen(): void {
    this.open = !this.open;
  }

  emitChanges(): void {
    this.onFilterChanged.emit(this.filters);
  }

  resetFilters(): void {
    this.filterOptions.forEach(option => option.isSelected = false);
    this.emitChanges();
  }

  calculateRows(): Row[] {
    // Inspired by https://stackoverflow.com/a/25655488/5730444
    const rows = [];
    for (let i = 0; i < this.filterOptions.length; i += this.columnsCount) {
      // Create rows with a start and end index
      // If this.filterOptions.length is smaller as i + this.columnsCount choose it as end index
      rows.push({ startIndex: i, endIndex: Math.min(i + this.columnsCount, this.filterOptions.length) });
    }
    return rows;
  }

  isActive(): boolean {
    if (Object.keys(this.filters).length === 0 && this.filters.constructor === Object) {
      // At startup this.filters might not yet be defined
      return false;
    }
    return this.filters[this.filterProperty].some(option => option.isSelected);
  }

  getDisplayText(): string {
    if (this.isActive()) {
      const filterValues = this.getFilteredItemValues().join(',');
      return `Nach ${this.headerText} ${filterValues} gefiltert`;
    } else {
      return `Nach ${this.headerText} filtern`;
    }
  }

  getFilteredItemValues(): string[] {
    return this.filterOptions.filter(option => option.isSelected).map(option => option.name);
  }
}
