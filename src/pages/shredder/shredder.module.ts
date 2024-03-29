import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { ShredderPage } from './shredder';

@NgModule({
  declarations: [
    ShredderPage
  ],
  imports: [
    IonicPageModule.forChild(ShredderPage),
    ComponentsModule,
  ]
})
export class ShredderPageModule { }
