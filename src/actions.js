import { API } from './config';
import { convert } from './utils';

export const actionTypes = {
    FETCH_RATES_START: 'FETCH_RATES_START',
    FETCH_RATES_SUCCESS: 'FETCH_RATES_SUCCESS',
    FETCH_RATES_FAIL: 'FETCH_RATES_FAIL',
    SET_CURRENCY_FROM: 'SET_CURRENCY_FROM',
    SET_CURRENCY_TO: 'SET_CURRENCY_TO',
    SET_AMOUNT_FROM: 'SET_AMOUNT_FROM',
    SET_AMOUNT_TO: 'SET_AMOUNT_TO',
    TOGGLE_REVERSE: 'TOGGLE_REVERSE',
    UPDATE_POCKET: 'UPDATE_POCKET'
};

export const getLatestRates = () => dispatch => {
    dispatch({
        type: actionTypes.FETCH_RATES_START
    });
    return fetch(API).then(res => res.json()).then(data => {
        dispatch({
            type: actionTypes.FETCH_RATES_SUCCESS,
            rates: data.rates
        });
        dispatch(updateAmount());
    }).catch(error => {
         dispatch({
             type: actionTypes.FETCH_RATES_FAIL
         });
         console.warn(error);
    })
};

export const updateAmount = () => (dispatch, getState) => {
    const {display, rates} = getState();
    const {currencyFrom, currencyTo, amountFrom, amountTo, reverse} = display;

    if (reverse) {
        const amount = convert(amountTo, currencyTo, currencyFrom, rates);
        dispatch({
            type: actionTypes.SET_AMOUNT_FROM,
            amount,
        });
    } else {
        const amount = convert(amountFrom, currencyFrom, currencyTo, rates);
        dispatch({
            type: actionTypes.SET_AMOUNT_TO,
            amount,
        });
    }
};

export const setAmount = amount => (dispatch, getState) => {
    const {display} = getState();
    const {reverse} = display;
    if (amount === '' || amount === 0) { //reset dest amount
        dispatch({
            type: reverse ? actionTypes.SET_AMOUNT_FROM : actionTypes.SET_AMOUNT_TO,
            amount,
        });
    }
    dispatch({
        type: reverse ? actionTypes.SET_AMOUNT_TO : actionTypes.SET_AMOUNT_FROM,
        amount
    });

    dispatch(updateAmount())
};

export const setCurrency = (currency, second) => (dispatch, getState) => {
    const { display } = getState();
    const { currencyFrom, currencyTo } = display;
    if (!second && currency === currencyTo) { // auto change dest currency
      dispatch({
        type: actionTypes.SET_CURRENCY_TO,
        currency: currencyFrom,
      });
    }
    if (second && currency === currencyFrom) { // auto change src currency
      dispatch({
        type: actionTypes.SET_CURRENCY_FROM,
        currency: currencyTo,
      });
    }
    dispatch({
      type: second ? actionTypes.SET_CURRENCY_TO : actionTypes.SET_CURRENCY_FROM,
      currency
    });

    dispatch(updateAmount())
  };

export const swapCurrencies = () => (dispatch, getState) => {
    const { display } = getState();
    const { currencyFrom, currencyTo, amountFrom, amountTo, reverse } = display;
    dispatch({
        type: actionTypes.SET_CURRENCY_TO,
        currency: currencyFrom,
    });
    dispatch({
        type: actionTypes.SET_CURRENCY_FROM,
        currency: currencyTo,
    });
    dispatch({
        type: actionTypes.SET_AMOUNT_TO,
        amount: amountFrom,
    });
    dispatch({
        type: actionTypes.SET_AMOUNT_FROM,
        amount: amountTo,
    });
    dispatch(toggleReverse(!reverse));
};

export const updatePocket = (currency, amount) => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_POCKET,
        currency,
        amount
    });
};

export const toggleReverse = (reverse) => dispatch => {
    dispatch({
        type: actionTypes.TOGGLE_REVERSE,
        reverse
    });
};

export const exchange = () => (dispatch, getState) => {
    const {pockets, display} = getState();
    const {currencyFrom, currencyTo, amountFrom, amountTo} = display;

    const fromPocket = pockets[currencyFrom];
    const toPocket = pockets[currencyTo];

    if (amountFrom && fromPocket >= amountFrom) {
        const newFromPocket = fromPocket - amountFrom;
        const newToPocket = toPocket + amountTo;

        dispatch(updatePocket(currencyFrom, newFromPocket));
        dispatch(updatePocket(currencyTo, newToPocket));
        dispatch(setAmount(0));
    }
};