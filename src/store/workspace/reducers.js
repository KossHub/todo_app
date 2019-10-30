import { TOGGLE_MIGRATE_DATEPICKER } from './actions';

const defaultState = {
  isMigrateDatepickerShown: false
};
export const workspaceReducer = (state = defaultState, action) => {
  const { payload, type } = action;
  switch (type) {
    case TOGGLE_MIGRATE_DATEPICKER: {
      return {...state, isMigrateDatepickerShown: payload};
    }
  }
  return state;
};
