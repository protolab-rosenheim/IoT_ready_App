import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { mergeMap } from 'rxjs/operators';

import { VirtualCarriage } from '../../app/shared/models/VirtualCarriage';
import { AppPreferenceProvider } from '../app-preference/app-preference';
import { AssemblyGroupProvider } from '../assembly-group/assembly-group';
import { CoatingProvider } from '../coating/coating';
import { OrderProvider } from '../order/order';
import { PartProvider } from '../part/part';
import { ProductionStepProvider } from '../production-step/production-step';
import { UrlProvider } from '../url/url';
import { VirtualCarriageProvider } from '../virtual-carriage/virtual-carriage';

/*
  Generated class for the ShredderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShredderProvider {

  shredderPort = '5000';

  constructor(public http: HttpClient,
    public urlProvider: UrlProvider,
    public appPreferences: AppPreferenceProvider,
    public orderProvider: OrderProvider,
    public partProvider: PartProvider,
    public virtualCarriageProvider: VirtualCarriageProvider,
    public assemblyGroupProvider: AssemblyGroupProvider,
    public coatingProvider: CoatingProvider,
    public productionStepProvider: ProductionStepProvider) {

  }

  getOrders(): Observable<WebserviceResponse<Order>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.orderProvider.getOrders(ip, this.shredderPort);
    }));
  }

  getReorderedParts(): Observable<WebserviceResponse<Part>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.partProvider.getReorderedParts(ip, this.shredderPort);
    }));
  }

  getPartByPartNumber(partNumber): Observable<Part> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.partProvider.getPartByPartNumber(partNumber, ip, this.shredderPort);
    }));
  }

  createOrder(body): Observable<Order> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.orderProvider.createOrder(body, ip, this.shredderPort);
    }));
  }

  updatePart(part: Part): Observable<Part> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.partProvider.putPart(part, ip, this.shredderPort);
    }));
  }

  putManyPartsNotOnboardWithNewOrder(vcrId, orderId, partNumbers: number[]): Observable<UpdateManyResponse> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.partProvider.putManyPartsNotOnboardWithNewOrder(vcrId, orderId, partNumbers, ip, this.shredderPort);
    }));
  }

  getOrdersByStatus(status: string): Observable<WebserviceResponse<Order>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.orderProvider.getOrdersByStatus(status, ip, this.shredderPort);
    }));
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.orderProvider.getOrderById(orderId, ip, this.shredderPort);
    }));
  }

  updateOrder(order: Order): Observable<Order> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.orderProvider.updateOrder(order, ip, this.shredderPort);
    }));
  }

  getPartsByOrderId(orderId: number): Observable<WebserviceResponse<Part>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.partProvider.getPartsByOrderId(orderId, ip, this.shredderPort);
    }));
  }

  getPartsByVirtualCarriageId(virtual_carriage_id: number): Observable<WebserviceResponse<Part>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.partProvider.getPartsByVirtualCarriageId(virtual_carriage_id, ip, this.shredderPort);
    }));
  }

  getAssemblyGroupsByOrderId(orderId: number): Observable<WebserviceResponse<AssemblyGroup>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.assemblyGroupProvider.getAssemblyGroupsByOrderId(orderId, ip, this.shredderPort);
    }));
  }

  postCarriage(carriage: VirtualCarriage): Observable<VirtualCarriage> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.virtualCarriageProvider.postCarriage(carriage, ip, this.shredderPort);
    }));
  }

  createCarriage(body): Observable<VirtualCarriage> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.virtualCarriageProvider.createCarriage(body, ip, this.shredderPort);
    }));
  }

  getVirtualCarriages(): Observable<WebserviceResponse<VirtualCarriage>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.virtualCarriageProvider.getVirtualCarriages(ip, this.shredderPort);
    }));
  }

  getVirtualCarriagesById(virtual_carriage_id: number): Observable<VirtualCarriage> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.virtualCarriageProvider.getVirtualCarriageById(virtual_carriage_id, ip, this.shredderPort);
    }));
  }

  getAssemblyGroups(): Observable<WebserviceResponse<AssemblyGroup>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.assemblyGroupProvider.getAssemblyGroups(ip, this.shredderPort);
    }));
  }

  getCoatingsByPartNumbers(partNumbers: number[]): Observable<WebserviceResponse<Coating>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.coatingProvider.getCoatingsByPartNumbers(partNumbers, ip, this.shredderPort);
    }));
  }

  getProductionStepsByPartNumbers(partNumbers: number[]): Observable<WebserviceResponse<ProductionStep>> {
    return this.appPreferences.fetchShredderIp().pipe(mergeMap(ip => {
      return this.productionStepProvider.getProductionStepsByPartNumbers(partNumbers, ip, this.shredderPort);
    }));
  }

  getDataForMarriage(virtual_carriage_id: number, order_id: number): Observable<{}> {
    const observables1 = [];
    const observables2 = [];
    observables1.push(this.getOrderById(order_id));
    observables1.push(this.getVirtualCarriagesById(virtual_carriage_id));
    observables1.push(this.getAssemblyGroupsByOrderId(order_id));
    observables1.push(this.getPartsByVirtualCarriageId(Number(virtual_carriage_id)));
    return forkJoin(observables1).pipe(mergeMap(([order, vCarriage, asg, part]) => {
      const parts = part['objects'];
      const partNumbers = [];
      parts.map(prt => { partNumbers.push(prt.part_number); });
      observables2.push(this.getCoatingsByPartNumbers(partNumbers));
      observables2.push(this.getProductionStepsByPartNumbers(partNumbers));
      return forkJoin(observables2).pipe(mergeMap(([coating, prodstep]) => {
        return ([[order, vCarriage, asg, part, coating, prodstep]]);
      }));
    }));
  }
}
