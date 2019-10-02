import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { ChuteConfigPage } from './chute-config';

@NgModule({
  declarations: [
    ChuteConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ChuteConfigPage),
    ComponentsModule
  ],
})
export class ChuteConfigPageModule { }
