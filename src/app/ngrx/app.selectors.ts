import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Vehicle } from '../entities';
import { State } from './app.reducers';

export const getAppState = createFeatureSelector<State>('app');
export const getEnabledRoutes = createSelector(
  getAppState,
  (state) => state.routes,
);
export const getVehicleLocations = createSelector(
  getAppState,
  (state) => state.vehicles,
);
