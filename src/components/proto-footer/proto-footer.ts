import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the ProtoFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'proto-footer',
  templateUrl: 'proto-footer.html'
})
export class ProtoFooterComponent {

  @Input() title = '';
  @Input() buttonTextCarriage;
  @Input() buttonTextReorder;
  @Input() buttonTextShredder;
  @Input() buttonTextAssembled;
  @Output() buttonCarriagePressed = new EventEmitter();
  @Output() buttonReorderPressed = new EventEmitter();
  @Output() buttonShredderPressed = new EventEmitter();
  @Output() buttonAssemblyPressed = new EventEmitter();

  emitCarriage(): void {
    this.buttonCarriagePressed.emit();
  }

  emitReorder(): void {
    this.buttonReorderPressed.emit();
  }

  emitShredder(): void {
    this.buttonShredderPressed.emit();
  }

  emitAssembled(): void {
    this.buttonAssemblyPressed.emit();
  }

}
