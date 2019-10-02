import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the HttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptorProvider {

  constructor(public http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Replace auth string with value from secure storage
    const dupReq = req.clone({ headers: req.headers.set('Authorization', 'Basic aXJrOlByb3RvTGFiMTgh') });
    return next.handle(dupReq);
  }

}
