import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import History from './History';
import axios from 'axios';
import {connect} from 'react-redux';
import {compose} from 'redux';
import getCurrentUser from '../../store/actions/publicActions';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

function CustomTabPanel(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [applications, setApplications] = React.useState(null);
  const [filteredApplications, setFilteredApplications] = React.useState([]);
  var _isMounted = true;

  
  useEffect(async () => {
    
    await props.getCurrentUser();
    if(props.userData)
    axios({
      url: `${process.env.REACT_APP_API_BASE_URL}/application/getApplicationHistroy`,
      method : "POST",
      data : {
        regiId : 'I2K18102462',
        isStaff: false,
        isHOD: false,
        isPrincipal: false,
      }
    }).then((res)=>{
      if(_isMounted){
        setApplications(res.data.applications)
        setFilteredApplications(res.data.applications)
      }
    });
    return () => {
      _isMounted = false;
    }
  }, [])

  const handleChange = (_, newValue) => {
    var filterStatus;
    if(newValue === 1) filterStatus = true;
    else if(newValue === 2) filterStatus = false;
    else filterStatus = null;
    setFilteredApplications(applications.filter(application=>{
      if(filterStatus === null || application.status === filterStatus) return true;
    }))
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Accepted" {...a11yProps(1)} />
          <Tab label="Rejected" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            {filteredApplications ?
				(
					filteredApplications.length ?
					<History applicationHistroy={filteredApplications} statusFilter={value} />
              		:
              		<h1>Nothing to show here!</h1>
				) : <h1>Loading Application History...</h1>
            }
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
			{filteredApplications ?
				(
					filteredApplications.length ?
					<History applicationHistroy={filteredApplications} statusFilter={value} />
              		:
              		<h1>Nothing to show here!</h1>
				) : <h1>Loading Application History...</h1>
            }
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
			{filteredApplications ?
				(
					filteredApplications.length ?
					<History applicationHistroy={filteredApplications} statusFilter={value} />
              		:
              		<h1>Nothing to show here!</h1>
				) : <h1>Loading Application History...</h1>
            }
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
      userData : state.public.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getCurrentUser: () => dispatch(getCurrentUser()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(CustomTabPanel);