import { SET_CURRENT_TIME } from './actions';
import moment from 'moment';

const defaultState = {
  currentTime: moment()
};
export const commonReducer = (state = defaultState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_CURRENT_TIME: {
      return {...state, currentTime: payload};
    }
  }
  return state;
};
