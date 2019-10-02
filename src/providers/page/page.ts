import { Injectable } from '@angular/core';

import { AssemblyPage } from '../../pages/assembly/assembly';
import { CutOrdersPage } from '../../pages/cut-orders/cut-orders';
import { DrillPage } from '../../pages/drill/drill';
import { EdgePage } from '../../pages/edge/edge';
import { HomePage } from '../../pages/home/home';
import { OrderListPage } from '../../pages/order-list/order-list';
import { SortPage } from '../../pages/sort/sort';
import { WorkstationPage } from '../../pages/workstation/workstation';

import { PageInfo } from './PageInfo';

/*
  Generated class for the PageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PageProvider {

  // Order of pages matters for display in home page and next-destination page!
  private pages = [
    { name: 'Schredder', component: OrderListPage, image: 'custom-shredder', proGloveCode: 'Shredder', message: 'Aufträge werden ausgewählt, Container werden zur Verfügung gestellt.' },
    { name: 'Säge', component: CutOrdersPage, productionStepName: 'CU1', image: 'custom-saw', proGloveCode: 'Saw', message: 'Aus dem Rohmaterial werden Teile gesägt.' },
    { name: 'Bekanten', component: EdgePage, productionStepName: 'EB1', image: 'custom-edge', proGloveCode: 'Edge', message: 'Kanten werden angeleimt.' },
    { name: 'Sortieren', component: SortPage, productionStepName: 'SR1', image: 'custom-robot', proGloveCode: 'Sort', message: 'Teile werden sortiert.' },
    { name: 'Bohren', component: DrillPage, productionStepName: 'DR1', image: 'custom-drill', proGloveCode: 'Drill', message: 'Teile werden gebohrt und gefräst.' },
    { name: 'Montage', component: AssemblyPage, productionStepName: 'AS1', image: 'custom-assembly', proGloveCode: 'Assembly', message: 'Teile werden zum Endstück montiert.' },
    { name: 'Arbeitsplatz einrichten', component: WorkstationPage, image: 'custom-config', proGloveCode: 'Workstation', message: 'Beschlägetürme werden konfiguriert.' },
    { name: 'Home', component: HomePage, proGloveCode: 'Home' }
  ];

  getPages(): PageInfo[] {
    return this.pages;
  }

  getPage(name: string): PageInfo {
    return this.pages.find(page => page.name === name);
  }

  getPageNameByProgloveCode(proGloveCode: string): string {
    const nextPage = this.pages.find(page => page.proGloveCode === proGloveCode);
    if (nextPage) {
      return nextPage.name;
    }
    return undefined;
  }

  getPagesWithProductionStep(): PageInfo[] {
    return this.pages.filter(page => page.hasOwnProperty('productionStepName'));
  }
}
