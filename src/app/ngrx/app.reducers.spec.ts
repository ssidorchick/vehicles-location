import * as actions from './app.actions';
import { reducer, initialState } from './app.reducers';

describe('app reducers', () => {
  it('should handle initial state', () => {
    const state = reducer(undefined, {type: null});
    expect(state).toBe(initialState);
  });

  it('should handle ENABLE_ROUTES', () => {
    const routes = ['1', 'b'];
    const action = new actions.EnableRoutesAction(routes);
    const newState = reducer(initialState, action);
    expect(newState.routes).toEqual(routes);
  });

  it('should handle GET_VEHICLES_SUCCESS', () => {
    const vehicles = [{
      id: '1',
      location: {
        lat: 1,
        lng: 1,
      },
      route: 'b',
    }];
    const action = new actions.GetVehiclesSuccessAction(vehicles);
    const newState = reducer(initialState, action);
    expect(newState.vehicles).toEqual(vehicles);
  });
});
