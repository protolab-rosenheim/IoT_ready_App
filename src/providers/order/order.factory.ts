import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { DemoOrderProvider } from './demo-order';
import { OrderProvider } from './order';

export function orderFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoOrderProvider(http);
    } else {
        return new OrderProvider(http, urlProvider);
    }
}
