import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProtoHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'proto-header',
  templateUrl: 'proto-header.html'
})
export class ProtoHeaderComponent {

  @Input() title = '';
  @Input() subTitle = '';
  @Input() isLineSolid = false;

}
