import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { VirtualCarriage } from '../../app/shared/models/VirtualCarriage';
import { BaseHttpProvider } from '../BaseHttpProvider';
import { UrlProvider } from '../url/url';

/*
  Generated class for the VirtualCarriageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VirtualCarriageProvider extends BaseHttpProvider {
  ressourceName = 'virtual_carriage';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
    super(http, urlProvider);
  }

  getVirtualCarriages(serverIp?: string, port?: string): Observable<WebserviceResponse<VirtualCarriage>> {
    return this.fetchMany<VirtualCarriage>(undefined, serverIp, port);
  }

  getVirtualCarriageById(id: number, serverIp?: string, port?: string): Observable<VirtualCarriage> {
    return this.fetchOne<VirtualCarriage>(id, serverIp, port);
  }

  postCarriage(carriage: VirtualCarriage, serverIp?: string, port?: string): Observable<VirtualCarriage> {
    // Delete slotsAvailable as it is not part of our DB data model
    delete carriage.slotsAvailable;
    // Performance optimaziation: Only store part_numbers to reduce response time
    carriage.parts = carriage.parts.map(part => ({ part_number: part.part_number })) as any;

    return this.createOne(carriage, serverIp, port);
  }

  createCarriage(body, serverIp?: string, port?: string): Observable<VirtualCarriage> {
    return this.createOne<VirtualCarriage>(body, serverIp, port);
  }
}
