import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Profile(props) {
  const classes = useStyles();
  return (
    <div style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <img src={props.userData.profile} style={{width: 200, height: 150}}></img>
      <Title>{props.userData.regiId}</Title>
    </div>
  );
}