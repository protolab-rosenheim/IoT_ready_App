import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DemoBaseProvider } from '../DemoBaseProvider';

/*
  Generated class for the DemoSlotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoSlotProvider extends DemoBaseProvider {
    demoDataFileName = 'slot.json';

    getSlotByPartNumber(partNumber: number): Observable<WebserviceResponse<Slot>> {
        return this.getDemoData<Slot>(this.demoDataFileName)
            .map(slots => slots.filter(slot => slot.part_number === partNumber))
            .map(response => this.wrapInResponse(response));
    }

    getSlotsByPartNumbers(partNumbers: number[]): Observable<WebserviceResponse<Slot>> {
        return this.getDemoData<Slot>(this.demoDataFileName)
            .map(slots => slots.filter(slot => partNumbers.indexOf(slot.part_number) !== -1))
            .map(response => this.wrapInResponse(response));
    }

    getSlotsBySlotIds(serverIp: string, slot_ids: number[]): Observable<WebserviceResponse<Slot>> {
        return this.getDemoData<Slot>(this.demoDataFileName)
            .map(slots => slots.filter(slot => slot_ids.indexOf(slot.id) !== -1))
            .map(response => this.wrapInResponse(response));
    }

    getSlotBySlotId(serverIp: string, slot_id: number): Observable<Slot> {
        return this.getDemoData<Slot>(this.demoDataFileName)
            .map(slots => slots.find(slot => slot.id === slot_id));
    }

    putSlot(serverIp: string, slot: Slot): Observable<Slot> {
        return Observable.of(slot);
    }
}
