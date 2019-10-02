import { Component, Input, ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { ThreeComponent } from '../three/three';

/**
 * Generated class for the ThreePartListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'three-part-list',
  templateUrl: 'three-part-list.html'
})
export class ThreePartListComponent {

  @ViewChild('three') three: ThreeComponent;

  @Input() parts: Part[] = [];
  @Input() selectedParts: Part[] = [];

  private _shownParts: Part[] = [];
  @Input() set shownParts(parts: Part[]) {
    this._shownParts = parts;
    this.updateThreeViewer();
  }
  get shownParts(): Part[] { return this._shownParts; }

  constructor(public loadingCtrl: LoadingController) { }

  ngOnInit() {
    const loading = this.loadingCtrl.create({
      content: 'Daten werden geladen'
    });
    loading.present();

    this.three.loadFile('P22_Protolab_Demokueche_small_t.wrl').subscribe(vrmlData => {
      this.startRendering(vrmlData);
      this.updateThreeViewer();
      loading.dismiss();
    });
  }

  ionViewWillLeave() {
    // Stop animation on page leave to prevent high CPU usage
    this.three.stopAnimation();
  }

  startRendering(data: string): void {
    this.three.renderData(data);
    this.three.startAnimation();
  }

  updateThreeViewer(): void {
    this.three.restoreElementVisiblity(false);
    const toShow = this.findPartsToShow();
    this.showParts(toShow);
  }

  findPartsToShow(): Part[] {
    // Find all parts in this.parts that are in this.shownParts
    return this.parts.filter(value => this.shownParts.indexOf(value) !== -1);
  }

  showParts(parts: Part[]): void {
    this.three.setPartsVisibility(parts, true);
  }
}
