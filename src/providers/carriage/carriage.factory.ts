import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { CarriageProvider } from './carriage';
import { DemoCarriageProvider } from './demo-carriage';

export function carriageFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoCarriageProvider(http);
    } else {
        return new CarriageProvider(http, urlProvider);
    }
}
