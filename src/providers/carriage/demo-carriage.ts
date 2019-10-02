import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DemoBaseProvider } from '../DemoBaseProvider';

/*
  Generated class for the DemoCarriageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoCarriageProvider extends DemoBaseProvider {
    demoDataFileName = 'carriage.json';

    getCarriages(): Observable<WebserviceResponse<Carriage>> {
        return this.getDemoData<Carriage>(this.demoDataFileName)
            .map(response => this.wrapInResponse(response));
    }

    putCarriage(): Observable<Carriage> {
        return this.getDemoData<Carriage>(this.demoDataFileName)
            .map(response => response[0]);
    }

}
