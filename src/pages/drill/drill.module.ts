import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { DrillPage } from './drill';

@NgModule({
  declarations: [
    DrillPage,
  ],
  imports: [
    IonicPageModule.forChild(DrillPage),
    ComponentsModule,
  ],
})
export class DrillPageModule { }
