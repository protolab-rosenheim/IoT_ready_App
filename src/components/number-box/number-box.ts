import { Component, Input } from '@angular/core';

/**
 * Generated class for the NumberBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'number-box',
  templateUrl: 'number-box.html'
})
export class NumberBoxComponent {

  @Input() numberToDisplay: number;

  messagePluralMap = {
    '=0': 'Keine zu bearbeitenden Teile',
    '=1': '1 zu bearbeitendes Teil',
    'other': '# zu bearbeitende Teile'
  };
}
