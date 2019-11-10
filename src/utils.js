const SYMBOLS = {
  EUR: '€',
  USD: '$',
  GBP: '£'
};

export const formatAmount = (num, maxFractionDigits = 4) => {
  return parseFloat(num.toFixed(maxFractionDigits));
};

export const convert = (fromAmount, fromCurrency, toCurrency, rates, maxFractionDigits=2) => {
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  const toAmount = fromAmount / fromRate * toRate;
  return formatAmount(toAmount, maxFractionDigits);
};

export const getSymbol = currency => {
  return SYMBOLS[currency];
};