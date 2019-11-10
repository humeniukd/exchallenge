import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import pockets from './reducers/pockets';
import display from './reducers/display';
import rates from './reducers/rates';
import {actionTypes} from './actions';

export default function() {
  return createStore(
    combineReducers({
      pockets,
      display,
      rates,
      error(state = false, action) {
          return action.type === actionTypes.FETCH_RATES_FAIL;
      }
    }),
    applyMiddleware(thunk)
  );
}

