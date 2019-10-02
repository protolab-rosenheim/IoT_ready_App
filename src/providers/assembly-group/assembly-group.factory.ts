import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { AssemblyGroupProvider } from './assembly-group';
import { DemoAssemblyGroupProvider } from './demo-assembly-group';

export function assemblyGroupFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoAssemblyGroupProvider(http);
    } else {
        return new AssemblyGroupProvider(http, urlProvider);
    }

}
