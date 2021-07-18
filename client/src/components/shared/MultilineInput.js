import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
    //   width: '25ch',
    },
  },
}));

export default function MultilineTextField(props) {
  const classes = useStyles();
  // const [reasonForLeave, setReason] = React.useState(props.reasonForLeave);

  return (
    <div className={classes.root}>
      <div>
        <TextField
            id="filled-multiline-flexible"
            disabled={props.disabled}
            label="Reason For Leave"
            multiline
            rows={4}
            rowsMax={10}
            name="reasonForLeave"
            onChange={props.handleInputChange}
            variant="filled"
            fullWidth
            required
        />
      </div>
    </div>
  );
}
