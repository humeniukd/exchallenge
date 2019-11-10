import {actionTypes, updateAmount, setAmount, setCurrency, exchange, getLatestRates} from './actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'
import {API} from './config';

export const mockStore = configureMockStore([thunk]);

describe('Actions', () => {
  let store;
  const rates = {EUR: 10, GBP: 0.1, USD: 1};

  beforeEach(() => {
    store = mockStore({
      display: {
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        amountFrom: 1
      },
      rates,
      pockets: {}
    });
  });
  afterEach(() => {
    fetchMock.restore()
  });

  it('properly fetches data', async () => {
    fetchMock.get(API, {rates});
    await store.dispatch(getLatestRates());
    const expected = [
      { type: actionTypes.FETCH_RATES_START },
      { type: actionTypes.FETCH_RATES_SUCCESS, rates },
      { type: actionTypes.SET_AMOUNT_TO, amount: 0.01 }
    ];
    expect(store.getActions()).toEqual(expected)
  });

  it('properly sets amount', async () => {
    const amountFrom = 19.01;
    store = mockStore({
      display: {
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        amountFrom
      },
      rates
    });
    await store.dispatch(setAmount(19.01));
    const expected = [
      { type: actionTypes.SET_AMOUNT_FROM, amount: amountFrom },
      { type: actionTypes.SET_AMOUNT_TO, amount: 0.19 }
    ];
    expect(store.getActions()).toEqual(expected)
  });

  it('properly sets dest amount', async () => {
    const amountTo = 19.01;
    store = mockStore({
      display: {
        reverse: true,
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        amountTo
      },
      rates
    });
    await store.dispatch(setAmount(19.01));
    const expected = [
      { type: actionTypes.SET_AMOUNT_TO, amount: amountTo },
      { type: actionTypes.SET_AMOUNT_FROM, amount: 1901 }
    ];
    expect(store.getActions()).toEqual(expected)
  });

  it('properly updates amount', async () => {
    const amountFrom = 10;
    const amountTo = 10;
    store = mockStore({
      display: {
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        amountFrom,
        amountTo
      },
      rates
    });
    await store.dispatch(updateAmount());
    const expected = [
      { type: actionTypes.SET_AMOUNT_TO, amount: 0.1 }
    ];
    expect(store.getActions()).toEqual(expected)
  });
  it('properly updates dest amount', async () => {
    const amountFrom = 10;
    const amountTo = 10;
    store = mockStore({
      display: {
        reverse: true,
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        amountFrom,
        amountTo
      },
      rates
    });
    await store.dispatch(updateAmount());
    const expected = [
      { type: actionTypes.SET_AMOUNT_FROM, amount: 1000 }
    ];
    expect(store.getActions()).toEqual(expected)
  });

  it('properly sets currency', async () => {
    const currencyFrom = 'EUR';
    const currencyTo = 'GBP';
    const currency = 'USD';
    store = mockStore({
      display: {
        currencyFrom,
        currencyTo,
        amountFrom: 10,
        amountTo: 10
      },
      rates
    });
    await store.dispatch(setCurrency(currency));
    const expected = [
      { type: actionTypes.SET_CURRENCY_FROM, currency},
      { type: actionTypes.SET_AMOUNT_TO, amount: 0.1}
    ];
    expect(store.getActions()).toEqual(expected)
  });

  it('properly sets dest currency', async () => {
    const currencyFrom = 'EUR';
    const currencyTo = 'GBP';
    const currency = 'USD';
    store = mockStore({
      display: {
        currencyFrom,
        currencyTo,
        amountFrom: 10,
        amountTo: 10
      },
      rates
    });
    await store.dispatch(setCurrency(currency, true));
    const expected = [
      { type: actionTypes.SET_CURRENCY_TO, currency},
      { type: actionTypes.SET_AMOUNT_TO, amount: 0.1}
    ];
    expect(store.getActions()).toEqual(expected)
  });

  it('properly updates pocket', async () => {
    const pockets = {EUR: 100, GBP: 100};
    store = mockStore({
      display: {
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        amountFrom: 10,
        amountTo: 10
      },
      pockets,
      rates
    });
    await store.dispatch(exchange());
    const expected = [
      { type: actionTypes.UPDATE_POCKET, currency: 'EUR', amount: 90},
      { type: actionTypes.UPDATE_POCKET, currency: 'GBP', amount: 110},
      { type: actionTypes.SET_AMOUNT_TO,  amount: 0},
      { type: actionTypes.SET_AMOUNT_FROM,  amount: 0},
      { type: actionTypes.SET_AMOUNT_TO,  amount: 0.1}
    ];
    expect(store.getActions()).toEqual(expected)
  });
});
