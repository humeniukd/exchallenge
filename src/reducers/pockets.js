import { actionTypes } from '../actions';

const initialState = {
  EUR: 1000,
  USD: 1000,
  GBP: 1000
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_POCKET: {
      const { currency, amount } = action;
      return {
        ...state,
        [currency]: amount
      }
    }
    default:
      return state;
  }
};