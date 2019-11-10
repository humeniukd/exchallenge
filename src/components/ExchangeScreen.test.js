import React from 'react';
import ReactDOM from 'react-dom';
import ExchangeScreen from './ExchangeScreen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExchangeScreen
      display={{
        amountFrom: 0,
        amountTo: 0,
        currencyFrom: 'EUR',
        currencyTo: 'GBP'
      }}
      pockets={{
        EUR: 0,
        GBP: 0
      }}
      rates={{EUR: 1}}
      error />, div);
  ReactDOM.unmountComponentAtNode(div);
});
