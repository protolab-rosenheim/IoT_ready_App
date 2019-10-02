import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { DemoOpcUaProvider } from './demo-opc-ua';
import { OpcUaProvider } from './opc-ua';

export function opcUaFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoOpcUaProvider();
    } else {
        return new OpcUaProvider(http, urlProvider, appPreferences);
    }
}
