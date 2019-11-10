import { actionTypes } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    
    case actionTypes.FETCH_RATES_SUCCESS:
      const { rates } = action;
      return {
        ...state,
        ...rates
      };
      
    default:
      return state;
  }
};