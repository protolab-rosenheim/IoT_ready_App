
import { DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppPreferences } from '@ionic-native/app-preferences';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ComponentsModule } from '../components/components.module';
import { AssemblyDetailPage } from '../pages/assembly-detail/assembly-detail';
import { AssemblyDetailPageModule } from '../pages/assembly-detail/assembly-detail.module';
import { AssemblyPage } from '../pages/assembly/assembly';
import { AssemblyPageModule } from '../pages/assembly/assembly.module';
import { ChuteConfigPage } from '../pages/chute-config/chute-config';
import { ChuteConfigPageModule } from '../pages/chute-config/chute-config.module';
import { CutOrdersPage } from '../pages/cut-orders/cut-orders';
import { CutOrdersPageModule } from '../pages/cut-orders/cut-orders.module';
import { DrillPage } from '../pages/drill/drill';
import { DrillPageModule } from '../pages/drill/drill.module';
import { EdgePage } from '../pages/edge/edge';
import { EdgePageModule } from '../pages/edge/edge.module';
import { HomePage } from '../pages/home/home';
import { NextDestinationPage } from '../pages/next-destination/next-destination';
import { NextDestinationPageModule } from '../pages/next-destination/next-destination.module';
import { OrderListPage } from '../pages/order-list/order-list';
import { OrderListPageModule } from '../pages/order-list/order-list.module';
import { PartInfoPage } from '../pages/part-info/part-info';
import { PartInfoPageModule } from '../pages/part-info/part-info.module';
import { ShredderPage } from '../pages/shredder/shredder';
import { ShredderPageModule } from '../pages/shredder/shredder.module';
import { SortModalPage } from '../pages/sort-modal/sort-modal';
import { SortModalPageModule } from '../pages/sort-modal/sort-modal.module';
import { SortPage } from '../pages/sort/sort';
import { SortPageModule } from '../pages/sort/sort.module';
import { WorkstationPage } from '../pages/workstation/workstation';
import { WorkstationPageModule } from '../pages/workstation/workstation.module';
import { AppPreferenceProvider } from '../providers/app-preference/app-preference';
import { ArrayHelperProvider } from '../providers/array-helper/array-helper';
import { AssemblyGroupProvider } from '../providers/assembly-group/assembly-group';
import { assemblyGroupFactory } from '../providers/assembly-group/assembly-group.factory';
import { CarriageProvider } from '../providers/carriage/carriage';
import { carriageFactory } from '../providers/carriage/carriage.factory';
import { CoatingProvider } from '../providers/coating/coating';
import { coatingFactory } from '../providers/coating/coating.factory';
import { FilterProvider } from '../providers/filter/filter';
import { HistoryProvider } from '../providers/history/history';
import { HttpInterceptorProvider } from '../providers/http-interceptor/http-interceptor';
import { MarryingProvider } from '../providers/marrying/marrying';
import { OpcUaProvider } from '../providers/opc-ua/opc-ua';
import { opcUaFactory } from '../providers/opc-ua/opc-ua.factory';
import { OrderProvider } from '../providers/order/order';
import { orderFactory } from '../providers/order/order.factory';
import { PageProvider } from '../providers/page/page';
import { PartProvider } from '../providers/part/part';
import { partFactory } from '../providers/part/part.factory';
import { PartsDroppedProvider } from '../providers/parts-dropped/parts-dropped';
import { ProGloveProvider } from '../providers/pro-glove/pro-glove';
import { proGloveFactory } from '../providers/pro-glove/pro-glove.factory';
import { ProductionStepProvider } from '../providers/production-step/production-step';
import { productionStepFactory } from '../providers/production-step/production-step.factory';
import { ShredderProvider } from '../providers/shredder/shredder';
import { SlotProvider } from '../providers/slot/slot';
import { slotFactory } from '../providers/slot/slot.factory';
import { ToastProvider } from '../providers/toast/toast';
import { UrlProvider } from '../providers/url/url';
import { VirtualCarriageProvider } from '../providers/virtual-carriage/virtual-carriage';
import { virtualCarriageFactory } from '../providers/virtual-carriage/virtual-carriage.factory';
import { WorkStationProvider } from '../providers/work-station/work-station';

import { MyApp } from './app.component';

registerLocaleData(localeDe);

export function init(appPreferences: AppPreferenceProvider) {
  return () => {
    setTimeout(() => {
      appPreferences.load();
    }, 500);
  };
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule,
    AssemblyPageModule,
    AssemblyDetailPageModule,
    DrillPageModule,
    EdgePageModule,
    ShredderPageModule,
    WorkstationPageModule,
    OrderListPageModule,
    CutOrdersPageModule,
    ChuteConfigPageModule,
    NextDestinationPageModule,
    SortPageModule,
    PartInfoPageModule,
    SortModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AssemblyPage,
    AssemblyDetailPage,
    DrillPage,
    EdgePage,
    ShredderPage,
    WorkstationPage,
    OrderListPage,
    CutOrdersPage,
    ChuteConfigPage,
    NextDestinationPage,
    SortPage,
    PartInfoPage,
    SortModalPage
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      'provide': APP_INITIALIZER,
      'useFactory': init,
      'deps': [AppPreferenceProvider, AppPreferences],
      'multi': true
    },
    AppPreferences,
    AppPreferenceProvider,
    {
      provide: AssemblyGroupProvider,
      useFactory: assemblyGroupFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    BarcodeScanner,
    {
      provide: CarriageProvider,
      useFactory: carriageFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    {
      provide: CoatingProvider,
      useFactory: coatingFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    {
      provide: OrderProvider,
      useFactory: orderFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    {
      provide: OpcUaProvider,
      useFactory: opcUaFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    PageProvider,
    PartsDroppedProvider,
    {
      provide: PartProvider,
      useFactory: partFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    {
      provide: ProductionStepProvider,
      useFactory: productionStepFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    {
      provide: ProGloveProvider,
      useFactory: proGloveFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    {
      provide: SlotProvider,
      useFactory: slotFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    SplashScreen,
    StatusBar,
    UrlProvider,
    WorkStationProvider,
    {
      provide: VirtualCarriageProvider,
      useFactory: virtualCarriageFactory,
      deps: [HttpClient, UrlProvider, AppPreferenceProvider]
    },
    HistoryProvider,
    ArrayHelperProvider,
    MarryingProvider,
    ShredderProvider,
    DatePipe,
    ToastProvider,
    FilterProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorProvider,
      multi: true
    },
  ]
})

export class AppModule { }
