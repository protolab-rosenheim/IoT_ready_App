import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { SortPage } from './sort';

@NgModule({
  declarations: [
    SortPage,
  ],
  imports: [
    IonicPageModule.forChild(SortPage),
    ComponentsModule
  ],
})
export class SortPageModule { }
