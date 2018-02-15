import { initialState } from './app.reducers';
import * as selectors from './app.selectors';

describe('app selectors', () => {
  it('getEnabledRoutes should return enabled routes', () => {
    const routes = ['1', 'b'];
    const state = {...initialState, routes};
    const result = selectors.getEnabledRoutes.projector(state);
    expect(result).toEqual(routes);
  });

  it('getVehicles should return vehicles', () => {
    const vehicles = [{
      id: '1',
      location: {
        lat: 1,
        lng: 1,
      },
      route: 'b',
    }];
    const state = {...initialState, vehicles};
    const result = selectors.getVehicles.projector(state);
    expect(result).toEqual(vehicles);
  });
});
