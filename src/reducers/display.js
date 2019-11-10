import { actionTypes } from '../actions';

const initialState = {
  currencyFrom: 'EUR',
  currencyTo: 'GBP',
  amountFrom: 0,
  amountTo: 0,
  reverse: false
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {

    case actionTypes.SET_CURRENCY_FROM:
      return { ...state, currencyFrom: action.currency };   
    
    case actionTypes.SET_CURRENCY_TO:
      return { ...state, currencyTo: action.currency };  
      
    case actionTypes.SET_AMOUNT_FROM:
      return { ...state, amountFrom: action.amount };   
    
    case actionTypes.SET_AMOUNT_TO:
      return { ...state, amountTo: action.amount };

    case actionTypes.TOGGLE_REVERSE:
      return { ...state, reverse: action.reverse };
    default:
      return state;
  }
};