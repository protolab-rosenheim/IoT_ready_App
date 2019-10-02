import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { DemoVirtualCarriageProvider } from './demo-virtual-carriage';
import { VirtualCarriageProvider } from './virtual-carriage';

export function virtualCarriageFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoVirtualCarriageProvider(http);
    } else {
        return new VirtualCarriageProvider(http, urlProvider);
    }
}
