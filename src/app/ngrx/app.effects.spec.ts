import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { cold, hot } from 'jasmine-marbles';

import { StoreMock } from 'app/common/ngrx/testing';
import { Vehicle } from '../entities';
import { VehiclesService } from '../services';
import { VehiclesServiceMock } from '../services/testing';
import * as actions from './app.actions';
import * as selectors from './app.selectors';
import { AppEffects } from './app.effects';

describe('AppEffects', () => {
  let store: StoreMock;
  let actions$: Observable<any>;
  let vehiclesService: VehiclesService;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        {provide: Store, useClass: StoreMock},
        {provide: VehiclesService, useClass: VehiclesServiceMock},
      ],
    });

    store = TestBed.get(Store);
    vehiclesService = TestBed.get(VehiclesService);
    effects = TestBed.get(AppEffects);
  });

  it('vehiclesAutoupdate$ should handle START_VEHICLES_AUTOUPDATE action', () => {
    const action = new actions.StartVehiclesAutoupdateAction();
    const completion = new actions.GetVehiclesAction();

    actions$ = hot('-a--', {a: action});
    const expected = cold('-b', {b: completion});

    expect(effects.vehiclesAutoupdate$).toBeObservable(expected);
  });

  it('getVehicles$ should handle GET_VEHICLES action', () => {
    const vehicles = [{id: '1'} as Vehicle];
    const action = new actions.GetVehiclesAction();
    const completion = new actions.GetVehiclesSuccessAction(vehicles);
    store.mockSelection(selectors.getEnabledRoutes, ['1', 'b']);

    actions$ = hot('-a--', {a: action});
    const res = cold('--a|', {a: vehicles});
    const expected = cold('---b', {b: completion});
    spyOn(vehiclesService, 'get').and.returnValue(res);

    expect(effects.getVehicles$).toBeObservable(expected);
  });

  it('getVehicles$ should handle ENABLE_ROUTES action', () => {
    const vehicles = [{id: '1'} as Vehicle];
    const routes = ['1', 'b'];
    const action = new actions.EnableRoutesAction(routes);
    const completion = new actions.GetVehiclesSuccessAction(vehicles);
    store.mockSelection(selectors.getEnabledRoutes, routes);

    actions$ = hot('-a--', {a: action});
    const res = cold('--a|', {a: vehicles});
    const expected = cold('---b', {b: completion});
    spyOn(vehiclesService, 'get').and.returnValue(res);

    expect(effects.getVehicles$).toBeObservable(expected);
  });
});
