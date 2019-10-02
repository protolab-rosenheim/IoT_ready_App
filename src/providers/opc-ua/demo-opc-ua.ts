import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

/*
  Generated class for the DemoOpcUaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemoOpcUaProvider {

    illuminateSlot(): Subscription {
        return new Subscription();
    }

    illuminateSlotWithHistory(): Subscription {
        return new Subscription();
    }

    illuminateMultipleSlots(): Subscription {
        return new Subscription();
    }

    illuminateAllSlots(): Subscription {
        return new Subscription();
    }

    allOff(): Subscription {
        return new Subscription();
    }

    loadBhxProgram(): Subscription {
        return new Subscription();
    }
}
