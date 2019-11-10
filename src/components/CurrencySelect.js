import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  menu: {
      width: 100,
      '& .MuiInput-formControl': {
          fontSize: theme.spacing(4),
      }
  }
}));

export default ({ availableCurrencies, onCurrencyChange, currency }) => {
  const classes = useStyles();
  const menuItems = availableCurrencies.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
  return (
    <TextField
      select
      className={classes.menu}
      value={currency}
      onChange={(e) => onCurrencyChange(e)}
      SelectProps={{
        disableUnderline: true,
        MenuProps: {
          className: classes.menu,
        },
      }}
      margin="normal"
    >
      {menuItems}
    </TextField>
  )
};