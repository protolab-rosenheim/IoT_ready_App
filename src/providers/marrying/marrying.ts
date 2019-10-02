import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';

import { VirtualCarriage } from '../../app/shared/models/VirtualCarriage';
import { Protocol } from '../app-preference/Protocol';
import { UrlProvider } from '../url/url';

/*
  Generated class for the MarryingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MarryingProvider {

  urlSuffix = 'marrying';
  marryingPort = '5000';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
  }

  marrying(serviceUrl: string, orders: Order[], vCarriages: VirtualCarriage[],
    assemblyGroups: AssemblyGroup[], parts: Part[], coatings: Coating[], prodsteps: ProductionStep[]): Observable<any> {
    const body = {
      'orders': orders,
      'vCarriages': vCarriages,
      'assemblyGroups': assemblyGroups,
      'parts': parts,
      'coatings': coatings,
      'prodSteps': prodsteps
    };

    return this.urlProvider.build(Protocol.HTTP, serviceUrl, this.marryingPort).
      pipe(mergeMap((webServiceUrl: string) => {
        const url = `${webServiceUrl}${this.urlSuffix}`;
        return this.http.put<Observable<any>>(url, body);
      }));
  }
}
