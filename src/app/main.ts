import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
// tslint:disable-next-line:no-import-side-effect
import './polyfills.ts';

platformBrowserDynamic().bootstrapModule(AppModule);
