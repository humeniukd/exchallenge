import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const SwapCurrencies = props => {
  const { swapCurrencies } = props;
  return (
    <IconButton color="secondary"
      onClick={swapCurrencies}
    >
      <Icon>
        unfold_more
      </Icon>
    </IconButton>
  )
}

export default SwapCurrencies;