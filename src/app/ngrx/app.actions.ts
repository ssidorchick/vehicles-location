import { Action } from '@ngrx/store';

import { Vehicle } from '../entities';

export enum Types {
  ENABLE_ROUTES =             '[App] Enable routes',
  START_VEHICLES_AUTOUPDATE = '[App] Start vehicles autoupdate',
  STOP_VEHICLES_AUTOUPDATE =  '[App] Stop vehicles autoupdate',
  GET_VEHICLES =              '[App] Get vehicles location',
  GET_VEHICLES_SUCCESS =      '[App] Get Vehicles location success',
}

export class EnableRoutesAction implements Action {
  readonly type = Types.ENABLE_ROUTES;

  constructor(public routes: string[]) { }
}

export class StartVehiclesAutoupdateAction implements Action {
  readonly type = Types.START_VEHICLES_AUTOUPDATE;
}

export class StopVehiclesAutoupdateAction implements Action {
  readonly type = Types.STOP_VEHICLES_AUTOUPDATE;
}

export class GetVehiclesAction implements Action {
  readonly type = Types.GET_VEHICLES;
}

export class GetVehiclesSuccessAction implements Action {
  readonly type = Types.GET_VEHICLES_SUCCESS;

  constructor(public vehicles: Vehicle[]) { }
}

export type Actions
  = EnableRoutesAction
  | StartVehiclesAutoupdateAction
  | StopVehiclesAutoupdateAction
  | GetVehiclesAction
  | GetVehiclesSuccessAction;
