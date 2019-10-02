import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DemoBaseProvider } from '../DemoBaseProvider';

/*
  Generated class for the DemoOrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoOrderProvider extends DemoBaseProvider {
    demoDataFileName = 'order.json';

    getOrders(): Observable<WebserviceResponse<Order>> {
        return this.getDemoData<Order>(this.demoDataFileName)
            .map(response => this.wrapInResponse(response));
    }

    getOrdersByStatus(status: string): Observable<WebserviceResponse<Order>> {
        return this.getDemoData<Order>(this.demoDataFileName)
            .map(orders => orders.filter(order => order.status === status))
            .map(response => this.wrapInResponse(response));
    }

    getOrderById(orderId: number): Observable<Order> {
        return this.getDemoData<Order>(this.demoDataFileName)
            .map(orders => orders.find(demoOrder => demoOrder.id === orderId));
    }

    updateOrder(order: Order): Observable<Order> {
        return this.getOrderById(order.id);
    }

    createOrder(body, serverIp?: string, port?: string): Observable<Order> {
        const id = 0;
        return this.getOrderById(id);
      }

}
