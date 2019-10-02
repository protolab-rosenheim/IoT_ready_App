import { Component, Input } from '@angular/core';

/**
 * Generated class for the LevelBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'level-bar',
  templateUrl: 'level-bar.html'
})
export class LevelBarComponent {

  @Input() percentage: number;

  constructor() {
    this.percentage = 0;
  }

}
