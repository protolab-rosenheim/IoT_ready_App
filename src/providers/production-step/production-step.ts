import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseHttpProvider } from '../BaseHttpProvider';
import { Filter } from '../Filter';
import { UrlProvider } from '../url/url';
/*
  Generated class for the ProductionStepProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductionStepProvider extends BaseHttpProvider {
  ressourceName = 'production_step';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
    super(http, urlProvider);
  }

  getProductionSteps(): Observable<WebserviceResponse<ProductionStep>> {
    return this.fetchMany<ProductionStep>();
  }

  getOutstandingProductionSteps(productionStepName: string): Observable<WebserviceResponse<ProductionStep>> {
    const filters = [new Filter('name', '==', productionStepName), new Filter('status', '==', 'outstanding')];
    return this.fetchMany<ProductionStep>(filters);
  }

  getProductionStepsByPartNumber(partNumber: number, productionStepName: string): Observable<WebserviceResponse<ProductionStep>> {
    const filters = [new Filter('name', '==', productionStepName), new Filter('part_number', '==', partNumber.toString())];
    return this.fetchMany<ProductionStep>(filters);
  }

  getProductionStepsByPartNumbers(partNumbers: number[], serverIp?: string, port?: string): Observable<WebserviceResponse<ProductionStep>> {
    const filters = [new Filter('part_number', 'in', partNumbers)];
    return this.fetchMany<ProductionStep>(filters, serverIp, port);
  }

  putProductionStep(productionStep: ProductionStep): Observable<ProductionStep> {
    return this.updateOne<ProductionStep>(productionStep.id, productionStep);
  }

  putManyProductionSteps(productionStepsNumbers: number[]): Observable<UpdateManyResponse> {
    const body = {
      'status': 'finished',
      'q': { 'filters': [{ 'name': 'id', 'op': 'in', 'val': productionStepsNumbers }] }
    };
    return this.updateMany<UpdateManyResponse>(body);
  }

}
