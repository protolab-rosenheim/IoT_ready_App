import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// tslint:disable:no-import-side-effect
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { DemoBaseProvider } from '../DemoBaseProvider';

/*
  Generated class for the DemoPartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoPartProvider extends DemoBaseProvider {
    demoDataFileName = 'part.json';

    constructor(http: HttpClient) {
        super(http);
    }

    getParts(): Observable<WebserviceResponse<Part>> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(response => this.wrapInResponse(response));
    }

    getPartByPartNumber(partNumber: number, serverIp?: string, port?: string): Observable<Part> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(parts => parts.find(demoPart => demoPart.part_number === partNumber));
    }

    getReorderedParts(serverIp?: string, port?: string): Observable<WebserviceResponse<Part>> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(parts => parts.filter(part => part.status === 'reordered'))
            .map(response => this.wrapInResponse(response));
    }

    getPartByImosId(imosId: number): Observable<WebserviceResponse<Part>> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(parts => parts.filter(part => part.imos_id === imosId))
            .map(response => this.wrapInResponse(response));
    }

    getPartsByOrderId(orderId: number, serverIp?: string, port?: string): Observable<WebserviceResponse<Part>> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(parts => parts.filter(part => part.order_id === orderId))
            .map(response => this.wrapInResponse(response));
    }

    getPartsByVirtualCarriageId(virtual_carriage_id: number, serverIp?: string, port?: string): Observable<WebserviceResponse<Part>> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(parts => parts.filter(part => part.virtual_carriage_id === virtual_carriage_id))
            .map(response => this.wrapInResponse(response));
    }

    putPart(part: Part): Observable<Part> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(parts => parts.find(demoPart => demoPart.part_number === part.part_number));
    }

    putManyPartsNotOnboardWithNewOrder(vcrId: number, orderId: number, partNumbers: number[], serverIp?: string, port?: string): Observable<UpdateManyResponse> {
        return Observable.of({
            num_modified: partNumbers.length
        });
    }

    putManyPartsNotOnboard(otherpartNumbers: number[], serverIp?: string, port?: string): Observable<UpdateManyResponse> {
        return Observable.of({
            num_modified: otherpartNumbers.length
        });
    }

    countPartsOnboard(): Observable<number> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(parts => parts.filter(part => part.status === 'onboard'))
            .map(response => response.length);
    }

    // lpTimeout -> timeout in ms for long polling requests
    getOutstandingParts(productionStepName: string, sortCriteria: SortByCriteria[], lpTimeout?: number): Observable<WebserviceResponse<Part>> {
        return this.getDemoData<Part>(this.demoDataFileName)
            .map(parts => parts.filter(part => part.production_steps.some(step => step.name === productionStepName && step.status === 'outstanding')))
            .map(parts => {
                let result = parts;
                // Deep copy sortCritria to prevent side effects
                const critariaCopy = JSON.parse(JSON.stringify(sortCriteria));
                // Reverse the sortCriteria -> So we'll sort by the most important criterion last
                const reversedCriteria = critariaCopy.reverse();
                reversedCriteria.forEach(criterion => {
                    result = this.sortByFieldname(parts, criterion.fieldname);
                });
                return result;
            })
            .map(response => this.wrapInResponse(response))
            .delay(1000);
    }

    compare(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    }

    sortByFieldname(arrayToSort: Part[], fieldname: string) {
        if (fieldname === 'edge_value') {
            return this.sortEdgeValues(arrayToSort);
        } else {
            return arrayToSort.sort((n1, n2) => this.compare(n1[fieldname], n2[fieldname]));
        }
    }

    sortEdgeValues(resp: Part[]) {
        return resp.sort((n1, n2) => this.compare(n1.production_steps[1].edge_value,
            n2.production_steps[1].edge_value));
    }
}
