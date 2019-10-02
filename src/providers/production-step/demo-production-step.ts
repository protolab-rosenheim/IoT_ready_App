import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DemoBaseProvider } from '../DemoBaseProvider';
/*
  Generated class for the DemoProductionStepProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoProductionStepProvider extends DemoBaseProvider {
    demoDataFileName = 'production-step.json';

    getProductionSteps(): Observable<WebserviceResponse<ProductionStep>> {
        return this.getDemoData<ProductionStep>(this.demoDataFileName)
            .map(response => this.wrapInResponse(response));
    }

    getOutstandingProductionSteps(productionStepName: string): Observable<WebserviceResponse<ProductionStep>> {
        return this.getDemoData<ProductionStep>(this.demoDataFileName)
            .map(steps => steps.filter(step => step.name === productionStepName && step.status === 'outstanding'))
            .map(response => this.wrapInResponse(response));
    }

    getProductionStepsByPartNumber(partNumber: number, productionStepName: string): Observable<WebserviceResponse<ProductionStep>> {
        return this.getDemoData<ProductionStep>(this.demoDataFileName)
            .map(steps => steps.filter(step => step.name === productionStepName && step.part_number === partNumber))
            .map(response => this.wrapInResponse(response));
    }

    getProductionStepsByPartNumbers(partNumbers: number[]): Observable<WebserviceResponse<ProductionStep>> {
        return this.getDemoData<ProductionStep>(this.demoDataFileName)
            .map(steps => steps.filter(step => partNumbers.indexOf(step.part_number) !== -1))
            .map(response => this.wrapInResponse(response));
    }

    putProductionStep(productionStep: ProductionStep): Observable<ProductionStep> {
        return this.getDemoData<ProductionStep>(this.demoDataFileName)
            .map(steps => steps.find(step => step.id === productionStep.id));
    }

    putManyProductionSteps(productionStepsNumbers: number[]): Observable<UpdateManyResponse> {
        return Observable.of({
            num_modified: productionStepsNumbers.length
        });
    }

}
