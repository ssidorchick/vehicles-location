import { Action } from '@ngrx/store';

import { VehicleLocation } from '../models';

export enum Types {
  GET_VEHICLES_LOCATION =         '[App] Get vehicles location',
  GET_VEHICLES_LOCATION_SUCCESS = '[App] Get Vehicles location success'
}

export class GetVehiclesLocation implements Action {
  readonly type = Types.GET_VEHICLES_LOCATION;
}

export class GetVehiclesLocationSuccess implements Action {
  readonly type = Types.GET_VEHICLES_LOCATION_SUCCESS;

  constructor(public vehicles: VehicleLocation[]) { }
}

export type Actions
  = GetVehiclesLocation
  | GetVehiclesLocationSuccess;
