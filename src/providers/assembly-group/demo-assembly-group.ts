import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DemoBaseProvider } from '../DemoBaseProvider';

/*
  Generated class for the DemoAssemblyGroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoAssemblyGroupProvider extends DemoBaseProvider {
    demoDataFileName = 'assembly-group.json';

    constructor(http: HttpClient) {
        super(http);
    }

    getAssemblyGroups(serverIp?: string, port?: string): Observable<WebserviceResponse<AssemblyGroup>> {
        return this.getDemoData<AssemblyGroup>(this.demoDataFileName)
            .map(response => this.wrapInResponse(response));
    }

    getAssemblyGroupsByAssembledStatus(assembled: boolean): Observable<WebserviceResponse<AssemblyGroup>> {
        return this.getDemoData<AssemblyGroup>(this.demoDataFileName)
            .map(groups => groups.filter(group => group.assembled === assembled))
            .map(response => this.wrapInResponse(response));
    }

    getAssemblyGroupsByOrderId(orderId: number, serverIp?: string, port?: string): Observable<WebserviceResponse<AssemblyGroup>> {
        return this.getDemoData<AssemblyGroup>(this.demoDataFileName)
        .map(groups => groups.filter(group => group.order_id === orderId))
        .map(response => this.wrapInResponse(response));
      }

    putAssemblyGroup(group: AssemblyGroup): Observable<AssemblyGroup> {
        return this.getDemoData<AssemblyGroup>(this.demoDataFileName)
            .map(groups => groups.find(demoGroup => demoGroup.group_id === group.group_id));
    }
}
