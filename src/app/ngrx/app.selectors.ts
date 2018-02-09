import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State } from './app.reducers';

export const getAppState = createFeatureSelector<State>('app');
export const getVehicleLocations = createSelector(
  getAppState,
  (state) => state.vehicles
);
