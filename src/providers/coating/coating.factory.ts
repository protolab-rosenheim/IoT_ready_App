import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { CoatingProvider } from './coating';
import { DemoCoatingProvider } from './demo-coating';

export function coatingFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoCoatingProvider(http);
    } else {
        return new CoatingProvider(http, urlProvider);
    }
}
