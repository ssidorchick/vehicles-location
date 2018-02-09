import { VehicleLocation } from '../models';
import * as actions from './app.actions';

export interface State {
  readonly vehicles: VehicleLocation[];
}

export const initialState: State = {
  vehicles: []
};

export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {
    case actions.Types.GET_VEHICLES_LOCATION_SUCCESS: {
      const {vehicles} = action;
      return {
        ...state,
        vehicles,
      };
    }

    default: {
      return state;
    }
  }
}
