import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseHttpProvider } from '../BaseHttpProvider';
import { UrlProvider } from '../url/url';

/*
  Generated class for the CarriageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarriageProvider extends BaseHttpProvider {
  ressourceName = 'carriage';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
    super(http, urlProvider);
  }

  getCarriages(): Observable<WebserviceResponse<Carriage>> {
    return this.fetchMany<Carriage>();
  }

  putCarriage(carriage: Carriage): Observable<Carriage> {
    return this.updateOne<Carriage>(carriage.id, carriage);
  }

}
