import { HttpClient } from '@angular/common/http';

import { AppPreferenceProvider } from '../app-preference/app-preference';
import { UrlProvider } from '../url/url';

import { DemoSlotProvider } from './demo-slot';
import { SlotProvider } from './slot';

export function slotFactory(http: HttpClient, urlProvider: UrlProvider, appPreferences: AppPreferenceProvider) {
    const data = appPreferences.toggleData;
    if (data) {
        return new DemoSlotProvider(http);
    } else {
        return new SlotProvider(http, urlProvider);
    }
}
