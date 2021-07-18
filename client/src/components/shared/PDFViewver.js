import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PDFViewver(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadFile = (url) => {
    // props.downloadDocument(url);
  }

  return (
    <div>
      <Button 
        disabled={props.applicationDetails.status === "rejected"} 
        variant="outlined" 
        color="primary" 
        onClick={handleClickOpen}
      >
        View
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.applicationDetails.filename}.pdf
            </Typography>
            <Button autoFocus color="inherit">
              Status : {props.applicationDetails.status ? (props.applicationDetails.status === true ? "accepted" : "rejected") : "under process"}
            </Button>
          </Toolbar>
        </AppBar>
        <iframe 
            src={props.applicationDetails.downloadURL + " #toolbar=0"}
            type="application/pdf"
            // height="2000px"
            height="100%"
        />
      </Dialog>
    </div>
  );
}
