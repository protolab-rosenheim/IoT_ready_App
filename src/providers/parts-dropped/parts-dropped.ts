import { EventEmitter, Injectable } from '@angular/core';

/*
  Generated class for the PartsDroppedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartsDroppedProvider {
  onPartsDropped = new EventEmitter<number[]>();
}
