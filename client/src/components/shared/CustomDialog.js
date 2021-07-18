import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export default function CustomDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };

  const icon = props.listTitle === 'Logout' ? 'sign-out-alt' : 'mobile';

  return (
    <div>
        <ListItem onClick={handleClickOpen} button key={Math.random()}>
          <ListItemIcon><Icon className={"fa fa-" + icon} /></ListItemIcon>
          <ListItemText primary={props.listTitle} />
        </ListItem>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
