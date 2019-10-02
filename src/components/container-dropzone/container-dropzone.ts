import { Component, Input } from '@angular/core';

import { HistoryItem } from '../../app/shared/models/HistoryItem';
import { VirtualCarriage } from '../../app/shared/models/VirtualCarriage';
import { ArrayHelperProvider } from '../../providers/array-helper/array-helper';
import { HistoryProvider } from '../../providers/history/history';
import { PartsDroppedProvider } from '../../providers/parts-dropped/parts-dropped';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the ContainerDropzoneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'container-dropzone',
  templateUrl: 'container-dropzone.html'
})
export class ContainerDropzoneComponent {

  @Input() container: VirtualCarriage;
  @Input() iconName: string;

  fillLevel: number;
  isDragOver = false;

  constructor(private toastProvider: ToastProvider,
    private partDroppedService: PartsDroppedProvider,
    private history: HistoryProvider,
    private arrayHelper: ArrayHelperProvider) {
    this.history.onUndoLastItem.subscribe(itemToUndo => this.onUndo(itemToUndo));
  }

  ngOnInit() {
    this.updateFillLevel();
  }

  allowDrop(event): void {
    event.preventDefault();
  }

  dragEnter(event): void {
    this.allowDrop(event);
    this.isDragOver = true;
  }

  dragleave($event): void {
    this.isDragOver = false;
  }

  drop(event: DragEvent): void {
    const droppedParts = this.getDroppedParts(event);
    this.isDragOver = false;

    if (!droppedParts || droppedParts.length === 0) {
      // Preventing empty drops
      return;
    }

    if (this.dropIsAllowed(droppedParts)) {
      this.container.parts = this.container.parts.concat(droppedParts);
      this.updateFillLevel();

      const droppedPartIds = droppedParts.map(part => part.part_number);
      this.partDroppedService.onPartsDropped.emit(droppedPartIds);
      this.history.write({ from: 'list', to: this.container.name, movedParts: droppedParts });
    } else {
      const message = 'Teile konnten nicht zugewiesen werden! ' +
        this.container.name + ' ist überbucht';
      this.showToast(message);
    }
  }

  getDroppedParts(dragEvent: DragEvent): Part[] {
    const dataTransfer = dragEvent.dataTransfer.getData('text');
    if (dataTransfer === '') {
      return undefined;
    }
    try {
      return JSON.parse(dataTransfer);
    } catch (error) {
      return undefined;
    }
  }

  dropIsAllowed(droppedParts: Part[]): boolean {
    const freeSlots = this.container.slotsAvailable - this.container.parts.length;
    return freeSlots >= droppedParts.length;
  }

  updateFillLevel(): void {
    this.fillLevel = this.container.parts.length / this.container.slotsAvailable;
  }

  onUndo(itemToUndo: HistoryItem): void {
    if (itemToUndo.to === this.container.name) {
      const partIdsToRemove = itemToUndo.movedParts.map(part => part.part_number);
      this.container.parts = this.arrayHelper.removeElementsFromArrayById(this.container.parts, partIdsToRemove, 'part_number');
      this.updateFillLevel();
    }
  }

  showToast(message: string): void {
    this.toastProvider.presentToast(message);
  }
}
