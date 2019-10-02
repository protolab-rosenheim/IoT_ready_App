import { EventEmitter, Injectable } from '@angular/core';

import { HistoryItem } from '../../app/shared/models/HistoryItem';

/*
  Generated class for the HistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoryProvider {

  history: HistoryItem[] = [];
  onUndoLastItem = new EventEmitter<HistoryItem>();

  write(item: HistoryItem): void {
    this.history.unshift(item);
  }

  canUndo(): boolean {
    return this.history.length !== 0;
  }

  undoLastItem(): void {
    const itemToUndo = this.history.shift();
    this.onUndoLastItem.emit(itemToUndo);
  }

  resetHistory(): void {
    this.history = [];
  }
}
