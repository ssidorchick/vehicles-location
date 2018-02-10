import { createSelector, createFeatureSelector } from '@ngrx/store';

import { VehicleLocation } from '../models';
import { State } from './app.reducers';

export const getAppState = createFeatureSelector<State>('app');
export const getRouteLayerUrls = createSelector(
  getAppState,
  (state) => state.routeLayers.map(layer => `/assets/google-map-layers/${layer}.json`)
);
export const getVehicleLocations = createSelector(
  getAppState,
  (state) => state.vehicles
);
