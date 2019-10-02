import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseHttpProvider } from '../BaseHttpProvider';
import { Filter } from '../Filter';
import { UrlProvider } from '../url/url';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider extends BaseHttpProvider {
  ressourceName = 'order';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
    super(http, urlProvider);
  }

  getOrders(serverIp?: string, port?: string): Observable<WebserviceResponse<Order>> {
    return this.fetchMany<Order>(undefined, serverIp, port);
  }

  getOrdersByStatus(status: string, serverIp?: string, port?: string): Observable<WebserviceResponse<Order>> {
    const filters = [new Filter('status', '==', status)];
    return this.fetchMany<Order>(filters, serverIp, port);
  }

  getOrderById(orderId: number, serverIp?: string, port?: string): Observable<Order> {
    return this.fetchOne<Order>(orderId, serverIp, port);
  }

  updateOrder(order: Order, serverIp?: string, port?: string): Observable<Order> {
    return this.updateOne<Order>(order.id, order, serverIp, port);
  }

  createOrder(body, serverIp?: string, port?: string): Observable<Order> {
    return this.createOne<Order>(body, serverIp, port);
  }

}
