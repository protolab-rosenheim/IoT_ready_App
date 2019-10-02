import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { AssemblyDetailPage } from './assembly-detail';

@NgModule({
  declarations: [
    AssemblyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AssemblyDetailPage),
    ComponentsModule
  ],
})
export class AssemblyDetailPageModule { }
