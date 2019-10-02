import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { CutOrdersPage } from './cut-orders';

@NgModule({
  declarations: [
    CutOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(CutOrdersPage),
    ComponentsModule
  ],
})
export class CutOrdersPageModule { }
