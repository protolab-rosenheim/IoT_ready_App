import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseHttpProvider } from '../BaseHttpProvider';
import { Filter } from '../Filter';
import { UrlProvider } from '../url/url';

/*
  Generated class for the SlotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SlotProvider extends BaseHttpProvider {
  ressourceName = 'slot';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
    super(http, urlProvider);
  }

  getSlotByPartNumber(partNumber: number): Observable<WebserviceResponse<Slot>> {
    const filters = [new Filter('part_number', '==', partNumber)];
    return this.fetchMany<Slot>(filters);
  }

  getSlotsByPartNumbers(partNumbers: number[]): Observable<WebserviceResponse<Slot>> {
    const filters = [new Filter('part_number', 'in', partNumbers)];
    return this.fetchMany<Slot>(filters);
  }

  getSlotsBySlotIds(serverIp: string, slot_ids: number[]): Observable<WebserviceResponse<Slot>> {
    const filters = [new Filter('id', 'in', slot_ids)];
    return this.fetchMany<Slot>(filters, serverIp);
  }

  getSlotBySlotId(serverIp: string, slot_id: number): Observable<Slot> {
    return this.fetchOne(slot_id, serverIp);
  }

  putSlot(serverIp: string, slot: Slot): Observable<Slot> {
    return this.updateOne(slot.id, slot, serverIp);
  }

}
