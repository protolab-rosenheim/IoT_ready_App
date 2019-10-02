import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PartInfoPage } from './part-info';

@NgModule({
  declarations: [
    PartInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PartInfoPage),
  ],
})
export class PartInfoPageModule {}
