import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { BaseHttpProvider } from '../BaseHttpProvider';
import { Filter } from '../Filter';
import { UrlProvider } from '../url/url';

/*
  Generated class for the PartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartProvider extends BaseHttpProvider {
  ressourceName = 'part';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
    super(http, urlProvider);
  }

  getParts(): Observable<WebserviceResponse<Part>> {
    return this.fetchMany<Part>();
  }

  getPartByPartNumber(partNumber: number, serverIp?: string, port?: string): Observable<Part> {
    return this.fetchOne<Part>(partNumber, serverIp, port);
  }

  getReorderedParts(serverIp?: string, port?: string): Observable<WebserviceResponse<Part>> {
    const filters = [new Filter('status', '==', 'reordered')];
    return this.fetchMany<Part>(filters, serverIp, port);
  }

  getPartByImosId(imosId: number): Observable<WebserviceResponse<Part>> {
    const filters = [new Filter('imos_id', '==', imosId)];
    return this.fetchMany<Part>(filters);
  }

  getPartsByOrderId(orderId: number, serverIp?: string, port?: string): Observable<WebserviceResponse<Part>> {
    const filters = [new Filter('order_id', '==', orderId)];
    return this.fetchMany<Part>(filters, serverIp, port);
  }

  getPartsByVirtualCarriageId(virtual_carriage_id: number, serverIp?: string, port?: string): Observable<WebserviceResponse<Part>> {
    const filters = [new Filter('virtual_carriage_id', '==', virtual_carriage_id)];
    return this.fetchMany<Part>(filters, serverIp, port);
  }

  putPart(part: Part, serverIp?: string, port?: string): Observable<Part> {
    return this.updateOne<Part>(part.part_number, part, serverIp, port);
  }

  putManyPartsNotOnboardWithNewOrder(vcrId: number, orderId: number, partNumbers: number[], serverIp?: string, port?: string): Observable<UpdateManyResponse> {
    const body = {
      'order_id': orderId,
      'status': 'not_onboard',
      'virtual_carriage_id' : vcrId,
      'q': { 'filters': [{ 'name': 'part_number', 'op': 'in', 'val': partNumbers }] }
    };
    return this.updateMany<UpdateManyResponse>(body, serverIp, port);
  }

  putManyPartsNotOnboard(partNumbers: number[], serverIp?: string, port?: string): Observable<UpdateManyResponse> {
    const body = {
      'status': 'not_onboard',
      'q': { 'filters': [{ 'name': 'part_number', 'op': 'in', 'val': partNumbers }] }
    };
    return this.updateMany<UpdateManyResponse>(body, serverIp, port);
  }

  countPartsOnboard(): Observable<number> {
    const filters = [new Filter('status', '==', 'onboard')];
    return this.fetchMany<Part>(filters).pipe(map(response => response.num_results));
  }

  // lpTimeout -> timeout in ms for long polling requests
  getOutstandingParts(productionStepName: string, sortCriteria: SortByCriteria[], lpTimeout?: number): Observable<WebserviceResponse<Part>> {

    const formattedSortCriteria = this.formatSortCriteria(sortCriteria);
    const paramsObject = { 'step': productionStepName, 'sorting': formattedSortCriteria };

    if (lpTimeout > 0) {
      paramsObject['lpTimeout'] = lpTimeout.toString();
    }
    const params = new HttpParams({ fromObject: paramsObject });

    return this.customGet('outstanding', params);
  }

  private formatSortCriteria(sortCriteria: SortByCriteria[]): string {
    return sortCriteria.map(criterion => criterion.fieldname).join(',');
  }

}
