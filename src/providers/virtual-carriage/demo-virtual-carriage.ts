import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { VirtualCarriage } from '../../app/shared/models/VirtualCarriage';
import { DemoBaseProvider } from '../DemoBaseProvider';

/*
  Generated class for the DemoVirtualCarriageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoVirtualCarriageProvider extends DemoBaseProvider {
    demoDataFileName = 'production-step.json';

    getVirtualCarriages(): Observable<WebserviceResponse<VirtualCarriage>> {
        return this.getDemoData<VirtualCarriage>(this.demoDataFileName)
            .map(response => this.wrapInResponse(response));
    }

    getVirtualCarriageById(id: number, serverIp?: string, port?: string): Observable<VirtualCarriage> {
        return this.getDemoData<VirtualCarriage>(this.demoDataFileName)
        .map(vcs => vcs.find(vc => vc.id === id));
      }

    postCarriage(carriage: VirtualCarriage): Observable<VirtualCarriage> {
        return Observable.of(carriage);
    }
}
