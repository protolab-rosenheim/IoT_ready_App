import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DemoBaseProvider } from '../DemoBaseProvider';

/*
  Generated class for the DemoCoatingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoCoatingProvider extends DemoBaseProvider {
    demoDataFileName = 'coating.json';

    getCoatingsByPartNumbers(partNumbers: number[]): Observable<WebserviceResponse<Coating>> {
        return this.getDemoData<Coating>(this.demoDataFileName)
            .map(coatings => coatings.filter(coating => partNumbers.indexOf(coating.part_number) !== -1))
            .map(response => this.wrapInResponse(response));
    }

    getSlotsByCoatingNames(): Observable<Slot[]> {
        return Observable.of([]);
    }
}
