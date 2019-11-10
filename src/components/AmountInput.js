import React, { useEffect, useState  } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  amountInput: {
    '& .MuiInputBase-input': {
      textAlign: 'right',
      fontSize: theme.spacing(4),
    }
  }
}));

export default ({
    label, helperText, startAdornment, error,
    currentValue, autoFocus, toggleFocus, onChangeAmount }) => {

  const [value, setValue] = useState(String(currentValue));

  useEffect(() => {
    setValue(String(currentValue))
  }, [currentValue]);

  const onChange = ({target}) => {
    const newVal = target.value;
    if (target.validity.valid) {
      setValue(newVal);
      onChangeAmount(parseFloat(newVal || 0));
    }
  };

  const classes = useStyles();
  const attributes = {
    autoFocus,
    value,
    label,
    onChange,
    onFocus: () => toggleFocus(!autoFocus),
    helperText,
    error
  };
  
  return (
    <TextField
        {...attributes}
        className={`${classes.textField} ${classes.amountInput}`}
        fullWidth
        margin="normal"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        variant="outlined"
        type="text"
        inputProps={{pattern: '[0-9]+\\.?([0-9]{1,2})?'}}
        InputProps={{
          startAdornment
        }}
    />
  );
};