import { Injectable } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the AppPreferenceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppPreferenceProvider {

  fallbackIpWebservice = '127.0.0.1';
  fallbackIpProglove = '127.0.0.1';
  fallbackIpShredder = '127.0.0.1';
  fallbaclIpBhx = '141.60.104.107';
  fallbackToggle = true; // https://github.com/apla/me.apla.cordova.app-preferences#preferences-interface-generator
  toggleData: any;

  constructor(public appPreferences: AppPreferences, public platform: Platform) {

  }

  load(): Promise<any> {
    return this.fetchDemoToggle().toPromise().then((data: any) => {
      this.toggleData = data;
    }).catch((err: any) => {
      Promise.resolve();
    });
  }

  fetchWebserviceIp(): Observable<string> {
    return this.fetchKey('WebserviceUrl', this.fallbackIpWebservice);
  }

  fetchProgloveIp(): Observable<string> {
    return this.fetchKey('ProgloveUrl', this.fallbackIpProglove);
  }

  fetchShredderIp(): Observable<string> {
    return this.fetchKey('ShredderUrl', this.fallbackIpShredder);
  }

  fetchBhxIp(): Observable<string> {
    return this.fetchKey('BhxUrl', this.fallbaclIpBhx);
  }

  fetchDemoToggle(): Observable<boolean> {
    return this.fetchKey('DemoDataToggle', this.fallbackToggle);
  }

  fetchKey<T>(key: string, fallback: T): Observable<T> {
    if (this.platform.is('cordova')) {
      // Our platform does support AppPreferences
      return this.wrapInObservable(this.appPreferences.fetch(key));
    } else {
      // Fallback for testing our app with `ionic serve` -> AppPreferences are not supported
      return this.wrapInObservable(fallback);
    }
  }

  wrapInObservable<T>(toBeWrapped: T | Promise<T>): Observable<T> {
    if (toBeWrapped instanceof Promise) {
      return fromPromise<T>(toBeWrapped);
    } else {
      return of<T>(toBeWrapped);
    }
  }
}
