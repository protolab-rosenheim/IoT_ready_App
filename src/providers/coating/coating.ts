import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { BaseHttpProvider } from '../BaseHttpProvider';
import { Filter } from '../Filter';
import { UrlProvider } from '../url/url';

/*
  Generated class for the CoatingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoatingProvider extends BaseHttpProvider {
  ressourceName = 'coating';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
    super(http, urlProvider);
  }

  getCoatingById(serverIp: string, id: string): Observable<TowerCoating> {
    return this.fetchOne<TowerCoating>(id, serverIp);
  }

  putCoating(serverIp: string, coating: TowerCoating): Observable<TowerCoating> {
    return this.updateOne<TowerCoating>(coating.name, coating, serverIp);
  }

  getCoatingsByPartNumbers(partNumbers: number[], serverIp?: string, port?: string): Observable<WebserviceResponse<Coating>> {
    const filters = [new Filter('part_number', 'in', partNumbers)];
    return this.fetchMany<Coating>(filters, serverIp, port);
  }

  getSlotsByCoatingNames(serverIp: string, coatingNames: string[]): Observable<Slot[]> {
    const filters = [new Filter('name', 'in', coatingNames)];
    return this.fetchMany<TowerCoating>(filters, serverIp).pipe(map(data => {
      if (data) {
        // Filter coatings that aren't in a slot and return the others
        return data.objects.filter(coating => coating.slot)
          .map(coating => coating.slot);
      }
    }));
  }
}
