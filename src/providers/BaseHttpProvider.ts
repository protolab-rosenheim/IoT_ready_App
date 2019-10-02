import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';

import { Filter } from './Filter';
import { Protocol } from './app-preference/Protocol';
import { UrlProvider } from './url/url';

export class BaseHttpProvider {
  ressourceName: string;

  httpProtocol = Protocol.HTTP;

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {

  }

  fetchOne<T>(id: number | string, serverIp?: string, port?: string): Observable<T> {
    return this.urlProvider.build(this.httpProtocol, serverIp, port).
      pipe(mergeMap((webServiceUrl: string) => {
        const url = `${webServiceUrl}${this.ressourceName}/${id}`;
        return this.http.get<T>(url);
      }));
  }

  fetchMany<T>(filters?: Filter[], serverIp?: string, port?: string): Observable<WebserviceResponse<T>> {
    return this.urlProvider.build(this.httpProtocol, serverIp, port).
      pipe(mergeMap((webServiceUrl: string) => {
        const url = `${webServiceUrl}${this.ressourceName}`;

        if (filters && filters.length > 0) {
          const params = Filter.toHttpParams(filters);
          return this.http.get<WebserviceResponse<T>>(url, { params });
        } else {
          return this.http.get<WebserviceResponse<T>>(url);
        }
      }));
  }

  customGet<T>(urlSuffix: string, params: HttpParams, serverIp?: string, port?: string): Observable<WebserviceResponse<T>> {
    return this.urlProvider.build(this.httpProtocol, serverIp, port).
      pipe(mergeMap((webServiceUrl: string) => {
        const url = `${webServiceUrl}${this.ressourceName}/${urlSuffix}`;
        return this.http.get<WebserviceResponse<T>>(url, { params });
      }));
  }

  updateOne<T>(id: number | string, object: T | {}, serverIp?: string, port?: string): Observable<T> {
    return this.urlProvider.build(this.httpProtocol, serverIp, port).
      pipe(mergeMap((webServiceUrl: string) => {
        const url = `${webServiceUrl}${this.ressourceName}/${id}`;
        return this.http.put<T>(url, object);
      }));
  }

  createOne<T>(object: T | {}, serverIp?: string, port?: string): Observable<T> {
    return this.urlProvider.build(this.httpProtocol, serverIp, port).
      pipe(mergeMap((webServiceUrl: string) => {
        const url = `${webServiceUrl}${this.ressourceName}`;
        return this.http.post<T>(url, object);
      }));
  }

  updateMany<UpdateManyResponse>(object: {}, serverIp?: string, port?: string): Observable<UpdateManyResponse> {
    return this.urlProvider.build(this.httpProtocol, serverIp, port).
      pipe(mergeMap((webServiceUrl: string) => {
        const url = `${webServiceUrl}${this.ressourceName}`;
        return this.http.patch<UpdateManyResponse>(url, object);
      }));
  }

}
