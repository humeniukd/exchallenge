import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = (props) => {
  const { start, onConfirm, text, title, button} = props;
  const [open, setOpen] = useState(start);

  useEffect(() => {
    setOpen(start)
  }, [start]);

  const handler = flag => {
    setOpen(false);
    onConfirm(flag);
  };
  return (
    <Dialog
      open={open}
      onClose={() => handler(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle color="primary" id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handler(true)} color="primary">
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;