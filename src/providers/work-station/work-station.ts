import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { WorkStation } from '../../app/shared/models/WorkStation';
import { WorkStationType } from '../../app/shared/models/WorkStationType';

/*
  Generated class for the WorkStationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WorkStationProvider {

  workstationKey = 'workstations';

  constructor(private storage: Storage) {
  }

  getWorkStations(): Promise<WorkStation[]> {
    return this.storage.get(this.workstationKey);
  }

  async addWorkstation(stationToAdd: WorkStation): Promise<WorkStation[]> {
    let stations = await this.getWorkStations();
    if (stations === null) {
      stations = [];
    }
    stations.push(stationToAdd);
    return this.storage.set(this.workstationKey, stations);
  }

  async deleteWorkStation(stationToRemove: WorkStation): Promise<WorkStation[]> {
    const stations = await this.getWorkStations();
    const indexToRemove = await this.findWorkstationIndex(stationToRemove);
    if (indexToRemove > -1) {
      stations.splice(indexToRemove, 1);
    }
    return this.storage.set(this.workstationKey, stations);
  }

  async getTower(): Promise<WorkStation> {
    const stations = await this.getWorkStations();
    return stations.find(station => {
      return station.type === WorkStationType.tower;
    });
  }

  async findWorkstationIndex(stationToFindIndexFor: WorkStation): Promise<number> {
    const stations = await this.getWorkStations();
    const stationIds = stations.map(station => station.id);
    // indexOf won't work on objects as it uses strict equality
    // see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Beschreibung
    // therefore we're comparing ids to find the correct index
    return stationIds.indexOf(stationToFindIndexFor.id);
  }
}
