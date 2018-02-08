import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as actions from './app.actions';

@Injectable()
export class AppEffects {
  @Effect({dispatch: false})
  testEffect$ = this.actions$.pipe(
    ofType(actions.Types.TEST),
    tap(action => {
      console.log(action);
    })
  );

  constructor(private actions$: Actions) { }
}
