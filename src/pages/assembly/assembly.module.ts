import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { AssemblyPage } from './assembly';

@NgModule({
  declarations: [
    AssemblyPage,
  ],
  imports: [
    IonicPageModule.forChild(AssemblyPage),
    ComponentsModule
  ],
})
export class AssemblyPageModule { }
