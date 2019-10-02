import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { DemoProductionStepProvider } from './demo-production-step';
import { ProductionStepProvider } from './production-step';

export function productionStepFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoProductionStepProvider(http);
    } else {
        return new ProductionStepProvider(http, urlProvider);
    }
}
