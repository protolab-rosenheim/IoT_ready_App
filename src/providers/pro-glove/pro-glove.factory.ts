import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { DemoProGloveProvider } from './demo-pro-glove';
import { ProGloveProvider } from './pro-glove';

export function proGloveFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoProGloveProvider(http);
    } else {
        return new ProGloveProvider(http, urlProvider, appPreferences);
    }
}
