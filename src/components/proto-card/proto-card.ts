import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProtoCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'proto-card',
  templateUrl: 'proto-card.html'
})
export class ProtoCardComponent {

  @Input() iconSrc = '';
  @Input() title = '';
  @Input() text = '';

}
