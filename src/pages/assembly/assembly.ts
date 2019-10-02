import { Component, Inject, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { ThreeComponent } from '../../components/three/three';
import { ArrayHelperProvider } from '../../providers/array-helper/array-helper';
import { AssemblyGroupProvider } from '../../providers/assembly-group/assembly-group';
import { PageProvider } from '../../providers/page/page';
import { PartProvider } from '../../providers/part/part';
import { ProGloveProvider } from '../../providers/pro-glove/pro-glove';
import { BasePage } from '../BasePage';
import { AssemblyDetailPage } from '../assembly-detail/assembly-detail';

/**
 * Generated class for the AssemblyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assembly',
  templateUrl: 'assembly.html',
})
export class AssemblyPage extends BasePage implements OnDestroy {

  assemblyGroups: AssemblyGroup[];
  shownAsseblyGroups: AssemblyGroup[];

  selectedPart: Part;
  selectedAssemblyGroup: AssemblyGroup;

  @ViewChild('three') three: ThreeComponent;

  threeModelObservable: Observable<string>;
  threeModelRendered = false;

  lastOrientation: string | number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public assemblyGroupProvider: AssemblyGroupProvider,
    public partProvider: PartProvider,
    public proGloveProvider: ProGloveProvider,
    public arrayHelper: ArrayHelperProvider,
    @Inject(forwardRef(() => PageProvider)) public pageProvider: PageProvider) {
    super(navCtrl, navParams, proGloveProvider, pageProvider);
    this.pageName = 'Assembly';
  }

  ionViewDidLoad() {
    this.threeModelObservable = this.three.loadFile('P22_Protolab_Demokueche_small_t.wrl');
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: 'Daten werden geladen'
    });
    loading.present();

    const observables = [];
    observables.push(this.threeModelObservable);
    observables.push(this.assemblyGroupProvider.getAssemblyGroups());

    forkJoin(observables).subscribe((result: any[]) => {
      if (!this.threeModelRendered) {
        const vrmlData: string = result[0];
        this.three.renderData(vrmlData);
        this.threeModelRendered = true;
      }
      // If the model is already rendered, just start the animation
      this.three.startAnimation();

      if (this.lastOrientation !== undefined && this.lastOrientation !== window.orientation) {
        this.three.onResize();
      }

      this.assemblyGroups = result[1].objects;
      const unassembledGroups = this.assemblyGroups.filter(group => group.assembled === false);
      this.shownAsseblyGroups = this.arrayHelper.sortArrayBy(unassembledGroups, 'part_mapping');

      loading.dismiss();
    });
  }

  ionViewWillLeave() {
    // Stop animation on page leave to prevent high CPU usage
    this.three.stopAnimation();
    this.lastOrientation = window.orientation;
  }

  groupTapped(event, group: AssemblyGroup) {
    const meshes = this.three.clonePartsIntoNewGroup(group.parts);
    this.navCtrl.push(AssemblyDetailPage, {
      group, meshes
    });
  }

  objectSelectedEvent(event: Event) {
    const imosId = Number(event['imosId'].replace('BT', '').replace('CO', ''));

    this.partProvider.getPartByImosId(imosId).subscribe(parts => {
      if (parts.objects.length > 0) {
        this.selectedPart = parts.objects[0];
        this.selectedAssemblyGroup = this.assemblyGroups.find(group => group.group_id === this.selectedPart['assembly_group_id']);
      }
    });
  }
}
