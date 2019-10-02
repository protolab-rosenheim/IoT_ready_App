import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { DemoPartProvider } from './demo-part';
import { PartProvider } from './part';

export function partFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoPartProvider(http);
    } else {
        return new PartProvider(http, urlProvider);
    }
}
