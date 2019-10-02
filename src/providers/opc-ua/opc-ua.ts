import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Protocol } from '../app-preference/Protocol';
import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

/*
  Generated class for the OpcUaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OpcUaProvider {

  urlSuffix = 'call';

  constructor(public http: HttpClient,
    public urlProvider: UrlProvider,
    public appPreferences: AppPreferenceProvider) {

  }

  illuminateSlot(slot, color: string): Subscription {
    const params = [slot, color];
    const methodPath = ['0:Objects', '3:art_net', '3:node_1_illuminate_slot'];
    return this.callOpcUaBridge(methodPath, undefined, params);
  }

  illuminateSlotWithHistory(slotName: string, color: string, historySize: number): Subscription {
    const slot = slotName.replace('slot_', '');
    const params = [slot, color, historySize];
    const methodPath = ['0:Objects', '3:art_net', '3:node_1_illuminate_slot_with_history'];
    return this.callOpcUaBridge(methodPath, undefined, params);
  }

  illuminateMultipleSlots(slots: Slot[], color: string, opcServerIp?: string): Subscription {
    const slotNames = slots.map(slot => slot.slot_name.replace('slot_', '')).join(';');
    const methodPath = ['0:Objects', '3:art_net', '3:node_1_illuminate_multiple_slots'];
    return this.callOpcUaBridge(methodPath, opcServerIp, [slotNames, color]);
  }

  illuminateAllSlots(color: string, opcServerIp?: string): Subscription {
    const methodPath = ['0:Objects', '3:art_net', '3:node_1_illuminate_all'];
    return this.callOpcUaBridge(methodPath, opcServerIp, [color]);
  }

  allOff(opcServerIp?: string): Subscription {
    const methodPath = ['0:Objects', '3:art_net', '3:node_1_all_off'];
    return this.callOpcUaBridge(methodPath, opcServerIp);
  }

  loadBhxProgram(partNumber: number): Subscription {
    const bhxOpcUaPort = '4841';
    const bhxServerIp = this.appPreferences.fetchBhxIp();
    const methodPath = ['0:Objects', '2:BHX', '2:send_program'];
    return this.callOpcUaBridge(methodPath, bhxServerIp, [partNumber.toString()], bhxOpcUaPort);
  }

  callOpcUaBridge(opcMethodPath: string[], opcServerIp?: string | Observable<string>, params?: any[], opcServerPort?: string): Subscription {
    const webServiceUrl = this.urlProvider.build(Protocol.HTTP);
    const opcUaUrl = this.urlProvider.build(Protocol.OPCUA, opcServerIp, opcServerPort);

    return forkJoin(webServiceUrl, opcUaUrl).subscribe(resultArray => {
      const serviceUrl = `${resultArray['0']}${this.urlSuffix}`;

      const body = this.createPostBody(opcMethodPath, resultArray['1'], params);
      return this.http.post(serviceUrl, body).subscribe();
    });
  }

  createPostBody(methodPath: string[], serviceUrl: string, params?: string[]): {} {
    if (params) {
      return {
        'methodPath': methodPath,
        'serverUrl': serviceUrl,
        'params': [...params]
      };
    } else {
      return {
        'methodPath': methodPath,
        'serverUrl': serviceUrl
      };
    }
  }
}
