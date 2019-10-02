import { Component, Input } from '@angular/core';

/**
 * Generated class for the PartListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'part-list',
  templateUrl: 'part-list.html'
})
export class PartListComponent {
  @Input() shownParts: Part[] = [];
  @Input() selectedParts: Part[] = [];

  allPartsSelected = false;

  previouslySelectedPart: Part;

  dragStartElement: Element;
  dragCheckboxIcon = new Image();

  ngOnChanges(changes) {
    // On any changes update allPartsSelected
    this.allPartsSelected = this.areAllPartsSelected();
  }

  areAllPartsSelected(): boolean {
    return this.selectedParts.length === this.shownParts.length;
  }

  toggleSelection(selectedPart: Part): void {
    const indexOfPart = this.selectedParts.indexOf(selectedPart);
    if (indexOfPart === -1) {
      this.selectedParts = this.selectedParts.concat(selectedPart);
    } else {
      this.selectedParts.splice(indexOfPart, 1);
    }
    this.allPartsSelected = this.areAllPartsSelected();
  }

  toggleSelectionForDrags(selectedPart: Part): void {
    if (selectedPart !== this.previouslySelectedPart) {
      // Prevent (un-)selecting a part we have just selected, as the ondragleave event is a stream of events
      // Throttling the event actually works way worse
      this.previouslySelectedPart = selectedPart;
      this.toggleSelection(selectedPart);
    }
  }

  toggleSelectAll(): void {
    this.selectedParts = [];
    if (!this.allPartsSelected) {
      this.selectedParts = this.selectedParts.concat(this.shownParts);
    }
    this.allPartsSelected = !this.allPartsSelected;
  }

  isSelected(part: Part): boolean {
    const indexOfPart = this.selectedParts.indexOf(part);
    return indexOfPart !== -1;
  }

  //#region Drag and drop handlers
  startDraggingItems(event: DragEvent): void {
    this.dragStartElement = event.srcElement;
    event.dataTransfer.setData('text', JSON.stringify(this.selectedParts));

    // TODO Use i18nPluralPipe to differentiate between Teil and Teile
    const partsString = this.selectedParts.length;
    const dragImageText = `${partsString} Teile ausgewählt`;
    const dragImage = this.createDragImage(dragImageText);
    event.dataTransfer.setDragImage(dragImage, 0, 0);
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
  //#endregion

  createDragImage(text: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    ctx.font = '17px Rubik_Light';
    // Place the text in the middle of the canvas
    ctx.fillText(text, canvas.width / 4, canvas.height / 2);
    return canvas;
  }
}
