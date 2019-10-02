import { Component } from '@angular/core';

import { VirtualCarriage } from '../../app/shared/models/VirtualCarriage';

/**
 * Generated class for the ContainerListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'container-list',
  templateUrl: 'container-list.html'
})
export class ContainerListComponent {

  containers: VirtualCarriage[] = [];

  config = {
    Container: {
      displayString: 'Container',
      capacity: 50
    },
    Flachwagen: {
      displayString: 'Flachwagen',
      capacity: 20
    }
  };

  addContainer(type: string): void {
    this.containers.push({
      id: undefined,
      order_id: undefined,
      name: this.createDisplayName(type),
      slotsAvailable: this.config[type].capacity,
      parts: [],
      type
    });
  }

  createDisplayName(containerType: string): string {
    return this.config[containerType].displayString + ' ' + this.getNextContainerId(containerType);
  }

  getNextContainerId(containerType: string): number {
    const containersSameType = this.containers.filter(container => container.type === containerType);
    return containersSameType.length + 1;
  }
}
