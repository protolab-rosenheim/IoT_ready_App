import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';

import { Protocol } from '../app-preference/Protocol';
import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

/*
  Generated class for the ProGloveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProGloveProvider {

  proGlovePort = '5000';

  constructor(public http: HttpClient, public urlProvider: UrlProvider, public appPreferences: AppPreferenceProvider) {
  }

  getLastAction(lpTimeout?: number): Observable<any> {
    const proGloveServerIp = this.appPreferences.fetchProgloveIp();
    return this.urlProvider.build(Protocol.HTTP, proGloveServerIp, this.proGlovePort).pipe(mergeMap((webserviceUrl: string) => {
      const url = webserviceUrl + 'lastaction';

      if (lpTimeout > 0) {
        const body = new HttpParams({
          fromObject: {
            'lpTimeout': lpTimeout.toString()
          }
        });
        return this.http.get<any>(url, { params: body });
      } else {
        return this.http.get<any>(url);
      }
    }));
  }

  setLocation(location: string): Observable<any> {
    const proGloveServerIp = this.appPreferences.fetchProgloveIp();
    return this.urlProvider.build(Protocol.HTTP, proGloveServerIp, this.proGlovePort).pipe(mergeMap((webserviceUrl: string) => {
      const url = webserviceUrl + 'setlocation';
      const body = {
        'location': location
      };
      return this.http.post(url, body);
    }));
  }

  getPartNumber(): Observable<any> {
    const proGloveServerIp = this.appPreferences.fetchProgloveIp();
    return this.urlProvider.build(Protocol.HTTP, proGloveServerIp, this.proGlovePort).pipe(mergeMap((webserviceUrl: string) => {
      const url = webserviceUrl + 'reorder';
      return this.http.get<any>(url);
    }));
  }

}
