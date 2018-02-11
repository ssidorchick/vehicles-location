import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, startWith } from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';
import { interval } from 'rxjs/observable/interval';

import { VehiclesService } from '../services';
import * as actions from './app.actions';

@Injectable()
export class AppEffects {
  @Effect()
  vehiclesAutoupdate$ = this.actions$.pipe(
    ofType(
      actions.Types.START_VEHICLES_AUTOUPDATE,
      actions.Types.STOP_VEHICLES_AUTOUPDATE,
    ),
    switchMap(action => {
      if (action.type === actions.Types.START_VEHICLES_AUTOUPDATE) {
        return interval(15000).pipe(
          startWith(0),
          map(() => new actions.GetVehicles())
        );
      }
      return empty();
    }),
  );

  @Effect()
  getVehiclesLocation$ = this.actions$.pipe(
    ofType(actions.Types.GET_VEHICLES),
    switchMap(() => this.vehiclesService.get()),
    map(vehicles => new actions.GetVehiclesSuccess(vehicles))
  );

  constructor(private actions$: Actions, private vehiclesService: VehiclesService) { }
}
