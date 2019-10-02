import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { WorkstationPage } from './workstation';

@NgModule({
  declarations: [
    WorkstationPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkstationPage),
    ComponentsModule,
  ],
})
export class WorkstationPageModule { }
