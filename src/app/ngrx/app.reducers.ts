import { Vehicle } from '../models';
import * as actions from './app.actions';

export interface State {
  readonly routeLayers: string[];
  readonly vehicles: Vehicle[];
}

export const initialState: State = {
  routeLayers: [
    'arteries',
    'freeways',
    'neighborhoods',
    // 'streets'
  ],
  vehicles: []
};

export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {
    case actions.Types.GET_VEHICLES_SUCCESS: {
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
