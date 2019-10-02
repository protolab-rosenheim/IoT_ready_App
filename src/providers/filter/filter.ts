import { Injectable } from '@angular/core';

/*
  Generated class for the FilterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterProvider {

  front = 'Front';

  isFront(part: Part): boolean {
    return this.getGroupNameByDescription(part.description) === this.front;
  }

  getGroupNameByDescription(value: string | number): any {
    switch (value) {
      case 'Klappe':
      case 'Einzeltür rechts':
      case 'Einzeltür links':
      case 'Tür-Blende':
        return this.front;
      case 'Mittelboden-Traverse':
      case 'Oberboden-Traverse':
        return 'Traverse';
      case 'Mittelboden':
      case 'Oberboden':
      case 'Unterboden':
        return 'Boden';
      case 'Schubkasten-Hinterstück':
      case 'Schubkasten-Seite':
      case 'Schubkasten-Boden':
        return 'Schubkastenteil';
      case 'Wange':
      case 'Sockelleiste stehend':
        return 'Langteil/Sichtseite';
      default:
        return value;
    }
  }

}
