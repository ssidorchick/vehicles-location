import { Action } from '@ngrx/store';

import { Vehicle } from '../models';

export enum Types {
  START_VEHICLES_AUTOUPDATE = '[App] Start vehicles autoupdate',
  STOP_VEHICLES_AUTOUPDATE =  '[App] Stop vehicles autoupdate',
  GET_VEHICLES =              '[App] Get vehicles location',
  GET_VEHICLES_SUCCESS =      '[App] Get Vehicles location success'
}

export class StartVehiclesAutoupdate implements Action {
  readonly type = Types.START_VEHICLES_AUTOUPDATE;
}

export class StopVehiclesAutoupdate implements Action {
  readonly type = Types.STOP_VEHICLES_AUTOUPDATE;
}

export class GetVehicles implements Action {
  readonly type = Types.GET_VEHICLES;
}

export class GetVehiclesSuccess implements Action {
  readonly type = Types.GET_VEHICLES_SUCCESS;

  constructor(public vehicles: Vehicle[]) { }
}

export type Actions
  = GetVehicles
  | GetVehiclesSuccess;
