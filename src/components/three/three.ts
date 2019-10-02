// tslint:disable:no-import-side-effect
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as THREE from 'three';
import 'vrmlparser/Renderer/ThreeJs.js';
import 'vrmlparser/Renderer/ThreeJs/Analyzer.js';
import 'vrmlparser/Renderer/ThreeJs/Animation.js';
import 'vrmlparser/Renderer/ThreeJs/SmoothEdges.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode/DirectionalLight.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode/IndexedFaceSet.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode/Interpolator.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode/NavigationInfo.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode/OrientationInterpolator.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode/PointLight.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode/PositionInterpolator.js';
import 'vrmlparser/Renderer/ThreeJs/VrmlNode/Viewpoint.js';
import 'vrmlparser/vrml.js';

import { ThreeBaseComponent } from '../three-base/three-base';

window['THREE'] = THREE;
declare let VrmlParser: any;
declare let vrmlParser: any;

@Component({
  selector: 'three',
  templateUrl: 'three.html'
})
export class ThreeComponent extends ThreeBaseComponent {

  constructor(public elementRef: ElementRef, public angularRenderer: Renderer2) {
    super(elementRef, angularRenderer);
  }

  loadFile(filename: string): Observable<string> {
    // Remove old model
    if (this.scene) {
      this.scene.remove(this.scene.children.filter(child => child.type === 'Group')[0]);
    }

    // Load new model
    const loader = new THREE.FileLoader();
    return Observable.bindCallback<string>(loader.load).call(loader, 'assets/wrl/' + filename);
  }

  renderData(data: string): void {
    const tree = vrmlParser.parse(data);
    const renderer = new VrmlParser.Renderer.ThreeJs();
    renderer.render(tree, this.scene);

    // THREE.DirectGeometry: Faceless geometries are not supported.
    // This Message can be ignored until the following PR is merged:
    // https://github.com/mrdoob/three.js/pull/14257

    this.removeUnneededElementsFromTree();
    this.centerFirstGroupInScene();
  }

  private removeUnneededElementsFromTree() {
    const blacklist = [
      'surrounding_CAD'
    ];
    this.scene.traverse(child => {
      if (blacklist.indexOf(child.name) > -1) {
        child.parent.remove(child);
      }
    });
  }

  clonePartsIntoNewGroup(parts: Part[]): THREE.Group {
    const imosIds = parts.map(part => this.getImosId(part));
    const meshes = this.getMeshesByImosIds(imosIds);
    const newGroup = new THREE.Group();
    meshes.forEach(mesh => {
      const clonedMesh = mesh.clone();
      clonedMesh.applyMatrix(mesh.matrixWorld);
      newGroup.add(clonedMesh);
    });
    return newGroup;
  }

}
