import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import DashboardAppBar from './AppBar';
import CustomDialog from './CustomDialog';
require('dotenv').config();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function CustomDashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout=()=>{
    var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    var token = localStorage.getItem('token');
    axios({
      url: apiBaseUrl + '/auth/logout' ,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: "POST",
      withCredentials: true
    }).then(()=>{
      localStorage.removeItem('token');
      props.history.push('/login');
    });
  }

  const logoutAll=()=>{
    var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    var token = localStorage.getItem('token');
    axios({
      url: apiBaseUrl + '/auth/logoutAll' ,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: "POST",
      withCredentials: true
    }).then(()=>{
      localStorage.removeItem('token');
      props.history.push('/login');
    });
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem onClick={()=>props.history.push('./dashboard')}  button key={Math.random()}>
          <ListItemIcon><Icon className="fa fa-house-user" /></ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem onClick={()=>props.history.push('./apply')}  button key={Math.random()}>
          <ListItemIcon><Icon className="fa fa-location-arrow" /></ListItemIcon>
          <ListItemText primary={"Apply For Leave"} />
        </ListItem>
        <ListItem onClick={()=>props.history.push('/checkStatus')}  button key={Math.random()}>
          <ListItemIcon><Icon className="fa fa-check-double" /></ListItemIcon>
          <ListItemText primary={"Check Status"} />
        </ListItem>
        <ListItem onClick={()=>props.history.push('./profile')}  button key={Math.random()}>
          <ListItemIcon><Icon className="fa fa-user" /></ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem onClick={()=>props.history.push('./help')}  button key={Math.random()}>
          <ListItemIcon><Icon className="fa fa-question-circle" /></ListItemIcon>
          <ListItemText primary={"Help"} />
        </ListItem>
        <CustomDialog onClick={logout} listTitle="Logout" alertMessage="Logout from PICT Epass ?"/>
        <CustomDialog onClick={logoutAll} listTitle="Logout from all devices" alertMessage="Logout from All Devices ?"/>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DashboardAppBar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.render()}
      </main>
    </div>
  );
}

CustomDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};



export default withRouter(CustomDashboard);

// export default withRouter(CustomDashboard);
