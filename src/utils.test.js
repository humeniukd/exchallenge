import { formatAmount, convert } from './utils';

describe('utils functions tests', () => {

  it('should properly format the given number', () => { 
    const number = 120.1200;
    const formattedNumber = 120.12;
    expect(formatAmount(number)).toBe(formattedNumber)
  });
  describe('utils functions tests', () => {
    it('should properly convert the given number', () => {
      const amountFrom = 10;
      const currencyFrom = 'EUR';
      const currencyTo = 'GBP';
      const rates = {EUR: 10, GBP: 0.1};
      expect(convert(amountFrom, currencyFrom, currencyTo, rates)).toBe(0.25)
    });
    it('should properly convert more complex one', () => {
      const amountFrom = 400;
      const currencyFrom = 'EUR';
      const currencyTo = 'GBP';
      const rates = {GBP: 0.782779, EUR: 0.907528};
      expect(convert(amountFrom, currencyFrom, currencyTo, rates)).toBe(345.02)
    });
  });

});