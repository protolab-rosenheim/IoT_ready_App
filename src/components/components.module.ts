import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DirectivesModule } from '../directives/directives.module';

import { ContainerDropzoneComponent } from './container-dropzone/container-dropzone';
import { ContainerListComponent } from './container-list/container-list';
import { FilterAccordeonComponent } from './filter-accordeon/filter-accordeon';
import { LevelBarComponent } from './level-bar/level-bar';
import { NumberBoxComponent } from './number-box/number-box';
import { OrderCardComponent } from './order-card/order-card';
import { PartListComponent } from './part-list/part-list';
import { ProtoCardComponent } from './proto-card/proto-card';
import { ProtoFooterComponent } from './proto-footer/proto-footer';
import { ProtoHeaderComponent } from './proto-header/proto-header';
import { SortBoxComponent } from './sort-box/sort-box';
import { ThreeBaseComponent } from './three-base/three-base';
import { ThreePartListComponent } from './three-part-list/three-part-list';
import { ThreeComponent } from './three/three';
import { WorkstationCardComponent } from './workstation-card/workstation-card';
@NgModule({
    declarations: [
        ThreeComponent,
        SortBoxComponent,
        NumberBoxComponent,
        OrderCardComponent,
        ContainerListComponent,
        PartListComponent,
        ContainerDropzoneComponent,
        LevelBarComponent,
        WorkstationCardComponent,
        ProtoCardComponent,
        ProtoHeaderComponent,
        ProtoFooterComponent,
        FilterAccordeonComponent,
        ThreePartListComponent,
        ThreeBaseComponent],
    imports: [IonicModule, DirectivesModule],
    exports: [
        ThreeComponent,
        SortBoxComponent,
        NumberBoxComponent,
        OrderCardComponent,
        ContainerListComponent,
        PartListComponent,
        ContainerDropzoneComponent,
        LevelBarComponent,
        WorkstationCardComponent,
        ProtoCardComponent,
        ProtoHeaderComponent,
        ProtoFooterComponent,
        FilterAccordeonComponent,
        ThreePartListComponent,
        ThreeBaseComponent]
})
export class ComponentsModule { }
