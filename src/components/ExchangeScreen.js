import React, {Fragment, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/InputAdornment";

import {convert, getSymbol, formatAmount} from '../utils';
import AmountInput from './AmountInput';
import SwapCurrencies from './SwapCurrencies';
import ExchangeButton from './ExchangeButton';
import Modal from './Modal';
import CurrencySelect from "./CurrencySelect";

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.spacing(1.5)
  },
  swap: {
    width: 48,
    margin: 'auto'
  }
}));

export default ({ onChangeAmount, onCurrencyChange, fetchLatestRates, swapCurrencies, toggleFocus,
    onExchange, pockets, display, rates, error }) => {

  const classes = useStyles();
  const {amountFrom, amountTo, currencyFrom, currencyTo} = display;
  const availableCurrencies = Object.keys(pockets);

  const createLabel = currency => `You have ${getSymbol(currency)}${formatAmount(pockets[currency])}`;
  const createHelperText = (currencyFrom, currencyTo) =>
      `1${getSymbol(currencyFrom)} = ${getSymbol(currencyTo)}${convert(
          1, currencyFrom, currencyTo, rates, 4
      )}`;

  const getAdornment = (currency, second) => (
      <InputAdornment position="start">
        <CurrencySelect
            availableCurrencies={availableCurrencies}
            onCurrencyChange={e => onCurrencyChange(e, second)}
            currency={currency}
        />
      </InputAdornment>
  );
  const [modal, setModal] = useState(false);
  const isNotEnough = () => amountFrom > pockets[currencyFrom];
  const onConfirm = flag => {
      setModal(false);
      flag && onExchange();
  };

  return (
    <Fragment>
      <Grid className={classes.padding} item>
        <AmountInput
          startAdornment={getAdornment(currencyFrom)}
          onChangeAmount={onChangeAmount}
          label={createLabel(currencyFrom)}
          helperText={createHelperText(currencyFrom, currencyTo)}
          currentValue={amountFrom}
          error={isNotEnough()}
          toggleFocus={toggleFocus}
          autoFocus
        />
      </Grid>
      <Grid className={classes.swap} item>
        <SwapCurrencies swapCurrencies={swapCurrencies} />
      </Grid>
      <Grid className={classes.padding} item>
        <AmountInput
          label={createLabel(currencyTo)}
          helperText={createHelperText(currencyTo, currencyFrom)}
          onChangeAmount={e => onChangeAmount(e, true)}
          startAdornment={getAdornment(currencyTo, true)}
          currentValue={amountTo}
          toggleFocus={toggleFocus}
        />
        <ExchangeButton
          disabled={!amountFrom || isNotEnough()}
          onClick={() => setModal(true)}
        />
      </Grid>
      <Modal
        title="Confirm Exchange"
        start={modal}
        onConfirm={onConfirm}
        button="Ok"
        text={`Please confirm exchange
            of ${amountFrom}${currencyFrom} 
            to ${amountTo}${currencyTo}`
        }
      />
      <Modal
        title="Error"
        start={error}
        onConfirm={flag => flag && fetchLatestRates()}
        button="Retry"
        text="Oops, something went wrong!"
      />
    </Fragment> 
  )
}