import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseHttpProvider } from '../BaseHttpProvider';
import { Filter } from '../Filter';
import { UrlProvider } from '../url/url';

/*
  Generated class for the AssemblyGroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AssemblyGroupProvider extends BaseHttpProvider {
  ressourceName = 'assembly_group';

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {
    super(http, urlProvider);
  }

  getAssemblyGroups(serverIp?: string, port?: string): Observable<WebserviceResponse<AssemblyGroup>> {
    return this.fetchMany<AssemblyGroup>(undefined, serverIp, port);
  }

  getAssemblyGroupsByAssembledStatus(assembled: boolean): Observable<WebserviceResponse<AssemblyGroup>> {
    const filters = [new Filter('assembled', '==', assembled)];
    return this.fetchMany<AssemblyGroup>(filters);
  }

  getAssemblyGroupsByOrderId(orderId: number, serverIp?: string, port?: string): Observable<WebserviceResponse<AssemblyGroup>> {
    const filters = [new Filter('order_id', '==', orderId)];
    return this.fetchMany<AssemblyGroup>(filters, serverIp, port);
  }

  putAssemblyGroup(group: AssemblyGroup): Observable<AssemblyGroup> {
    return this.updateOne<AssemblyGroup>(group.group_id, group);
  }

}
