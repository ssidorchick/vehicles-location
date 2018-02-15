import { Vehicle } from '../entities';
import * as actions from './app.actions';

import { routes } from '../entities';

export interface State {
  readonly routes: string[];
  readonly vehicles: Vehicle[];
}

export const initialState: State = {
  routes,
  vehicles: []
};

export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {
    case actions.Types.ENABLE_ROUTES: {
      const {routes} = action;
      return {
        ...state,
        routes,
      };
    }

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
