import { Injectable } from '@angular/core';

import { SortDirection } from '../../app/shared/models/SortDirection';

/*
  Generated class for the ArrayHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArrayHelperProvider {

  removeElementsFromArrayById<T>(array: T[], idsToRemove: number[], idProperty: string): T[] {
    return array.filter(
      arrayElement => idsToRemove.indexOf(arrayElement[idProperty]) === -1);
  }

  sortArray(array: any[]): any[] {
    if (array.every(item => typeof item === 'string')) {
      return array.sort();
    } else {
      // Prevent sorting numbers alphabetically like [1, 10, 2]
      // See https://stackoverflow.com/a/1063027/5730444
      return array.sort((a, b) => a - b);
    }
  }

  sortArrayBy<T>(array: T[], sortProperty: string, direction: SortDirection = SortDirection.Ascending): T[] {
    if (direction === SortDirection.Ascending) {
      return array.sort((a, b) => this.sortFunction(a, b, sortProperty));
    } else {
      // Inverse a,b to b,a to sort descending
      return array.sort((a, b) => this.sortFunction(b, a, sortProperty));
    }
  }

  private sortFunction(a, b, sortProperty: string): number {
    if (a[sortProperty] > b[sortProperty]) {
      return 1;
    }
    if (a[sortProperty] < b[sortProperty]) {
      return -1;
    }
    return 0;
  }

  flatten<T>(array: T[][]): T[] {
    return array.reduce((acc, val) => acc.concat(val), []);
  }
}
