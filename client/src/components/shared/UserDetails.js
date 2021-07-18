import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    boxShadow: 1,
    fontSize: 24
    // color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Name : {props.userData.name}</Paper>
        </Grid>
        <Grid item xs={12}>
        <Paper className={classes.paper}>Dept. : {
          props.userData.regiId.toString()[0] === 'I' ? 'Information Technology' :
          (
            props.userData.regiId.toString()[0] === 'E' ? 'ENTC' : 'Computer'
          )
        }</Paper> 
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Class : TE11</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Roll No : {props.userData.rollNo}</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
