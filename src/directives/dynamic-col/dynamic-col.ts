import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

/**
 * Generated class for the DynamicColDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[dynamic-col]' // Attribute selector
})
export class DynamicColDirective {

  @Input('dynamic-col') value: number;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'col-' + this.value, '');
  }

}
