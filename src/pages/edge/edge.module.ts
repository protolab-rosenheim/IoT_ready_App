import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { EdgePage } from './edge';

@NgModule({
  declarations: [
    EdgePage,
  ],
  imports: [
    IonicPageModule.forChild(EdgePage),
    ComponentsModule,
  ],
})
export class EdgePageModule { }
