import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

window['THREE'] = THREE;

/**
 * Generated class for the ThreeBaseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'three-base',
  templateUrl: 'three-base.html'
})
export class ThreeBaseComponent implements OnInit {

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderLoopActive: boolean;
  light: THREE.PointLight;
  @Input() cameraDistance = 5000;

  @Input() highlightingEnabled = false;
  @Output() objectSelected = new EventEmitter<string>();
  private lastObject;
  private lastObjectOriginalColor;

  constructor(public elementRef: ElementRef, public angularRenderer: Renderer2) {

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.setTimeout(() => {
      const node = this.elementRef.nativeElement.childNodes[0];
      if (node.clientWidth === 0 && node.clientHeight === 0) {
        // Bug fix: Do not set size if element will be hidden
        return;
      }
      this.renderer.setSize(node.clientWidth, node.clientHeight);
      this.camera.aspect = node.clientWidth / node.clientHeight;
      this.camera.updateProjectionMatrix();
    }, 300);
  }

  ngOnInit() {
    if (this.highlightingEnabled) {
      this.angularRenderer.listen(this.elementRef.nativeElement, 'touchstart', event => this.detectIntersections(event));
    }
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000, 1);
    this.elementRef.nativeElement.childNodes[0].appendChild(this.renderer.domElement);
    this.initScene();
  }

  detectIntersections(event) {
    const bounds = event.touches[0].target.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.touches[0].clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.y = -((event.touches[0].clientY - bounds.top) / bounds.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.scene.children, true);
    if (intersects && intersects[0] && intersects[0]) {
      const object = intersects[0].object as THREE.Mesh;
      if (object.userData.originalVrmlNode) {
        event['imosId'] = object.userData.originalVrmlNode.geometry.coord.name;
        this.objectSelected.emit(event);
        this.processHighlighting(object);
      }
    }
  }

  startAnimation() {
    this.renderLoopActive = true;
    this.render();
  }

  stopAnimation() {
    this.renderLoopActive = false;
  }

  private initScene() {
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.elementRef.nativeElement.childNodes[0].clientWidth / this.elementRef.nativeElement.childNodes[0].clientHeight, 1, 25000);
    this.camera.position.z = this.cameraDistance;
    this.camera.position.y = 500;

    // PointLight
    this.light = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.4);
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.scene.add(this.light);

    this.scene.add(new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.5));

    // Controls
    const controls: THREE.OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enablePan = false;
    controls.maxDistance = 6000;

    // Sky
    const skyBoxGeometry = new THREE.BoxGeometry(25000, 25000, 25000);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({
      color: 0xE3E3E3,
      side: THREE.BackSide
    });
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    this.scene.add(skyBox);

    this.onResize();
  }

  centerFirstGroupInScene() {
    const groups = this.scene.children.filter(child => child.type === 'Group');
    if (groups.length > 0) {
      this.center(groups[0]);
    }
  }

  private center(objectToCenter: THREE.Object3D): void {
    // See https://stackoverflow.com/a/46165381/5730444
    new THREE.Box3().setFromObject(objectToCenter).getCenter(objectToCenter.position).multiplyScalar(- 1);
  }

  render() {
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
    if (this.renderLoopActive) {
      requestAnimationFrame(() => this.render());
    }
  }

  setPartsVisibility(parts: Part[], visibility: boolean): void {
    const imosIds = parts.map(part => this.getImosId(part));
    const meshes = this.getMeshesByImosIds(imosIds);
    meshes.forEach(mesh => mesh.visible = visibility);
  }

  getImosId(part: Part): string {
    return `BT${part.imos_id}CO`;
  }

  restoreElementVisiblity(visibility: boolean): void {
    if (!this.scene || !this.scene.children) {
      return;
    }
    const groups = this.scene.children.filter(child => child.type === 'Group');
    if (groups.length === 1) {
      groups[0].traverse((child: THREE.Mesh) => {
        if (child.type === 'Mesh') {
          child.visible = visibility;
        }
      });
    }
  }

  addGroup(group: THREE.Group): void {
    this.center(group);
    this.scene.add(group);
  }

  getMeshesByImosIds(imosIds: string[]): THREE.Mesh[] {
    const meshes = [];
    if (!this.scene || !this.scene.children) {
      return meshes;
    }
    for (const item of this.scene.children) {
      item.traverse((child: THREE.Mesh) => {
        if (child.type === 'Mesh'
          && child.userData.originalVrmlNode
          && imosIds.indexOf(child.userData.originalVrmlNode.geometry.coord.name) !== -1) {
          meshes.push(child);
        }
      });
    }
    return meshes;
  }

  private processHighlighting(currentObject: THREE.Mesh) {
    // If last Object is defined - restore its color
    if (this.lastObject) {
      this.setColorForGroup(this.lastObject, this.lastObjectOriginalColor);
    }

    // Save currentObject for restoring its color later
    this.lastObject = currentObject;
    this.lastObjectOriginalColor = (currentObject.clone().material as THREE.MeshBasicMaterial).color.getHex();

    // Color currentObject
    this.setColorForGroup(currentObject, 0xACB173);
  }

  private setColorForGroup(object: THREE.Object3D, color: number) {
    object.parent.parent.parent.traverse((child: THREE.Mesh) => {
      if (child.type === 'Mesh') {
        (child.material as THREE.MeshBasicMaterial).color.setHex(color);
      }
    });
  }

}
