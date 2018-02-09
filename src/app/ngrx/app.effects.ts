import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { tap, switchMap, map } from 'rxjs/operators';

import { VehiclesLocationService } from '../services';
import * as actions from './app.actions';

@Injectable()
export class AppEffects {
  @Effect()
  getVehiclesLocation$ = this.actions$.pipe(
    ofType(actions.Types.GET_VEHICLES_LOCATION),
    switchMap(() => this.vehiclesLocationService.get()),
    map(vehicles => new actions.GetVehiclesLocationSuccess(vehicles))
  );

  constructor(private actions$: Actions, private vehiclesLocationService: VehiclesLocationService) { }
}
