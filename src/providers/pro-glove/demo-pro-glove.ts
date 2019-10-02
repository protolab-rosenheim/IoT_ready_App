import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DemoBaseProvider } from '../DemoBaseProvider';

/*
  Generated class for the DemoProGloveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoProGloveProvider extends DemoBaseProvider {

    demoData = { 'action': 'check-in', 'device': 'proglove', 'location': 'Home' };

    getLastAction(): Observable<any> {
        return Observable.of(this.wrapInResponse(this.demoData as any)).delay(1000);
    }

    setLocation(): Observable<any> {
        return Observable.of({});
    }
}
