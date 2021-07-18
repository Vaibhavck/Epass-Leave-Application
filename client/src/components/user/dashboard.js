import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import getCurrentUser from '../../store/actions/publicActions';
import axios from 'axios';
import DashboardHome from '../shared/DashboardHome';
import {Redirect} from 'react-router-dom';
import LoadingPage from '../shared/LoadingPage';
import CustomDashboard from '../shared/DashboardLayout';

class UserDashboard extends React.Component{

  _isMounted = false;

  state = {
    applicationHistroy : null
  }

  async componentDidMount(){
    this._isMounted = true;
    await this.props.getCurrentUser();
    var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    // console.log("testing | ", this.props.userData);
    if(this.props.userData)
    axios({
      url: apiBaseUrl + '/application/getApplicationHistroy',
      method : "POST",
      data : {
        regiId : this.props.match.params.regiId,
        isStaff: this.props.userData.isStaff,
        isHOD: this.props.userData.isHOD,
        isPrincipal: this.props.userData.isPrincipal,
      }
    }).then((res)=>{
      console.log("res | ", res.data.applications);
      if(this._isMounted)
        this.setState({applicationHistroy : res.data.applications});
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render(){

    var dashboardComponent;

    if(!this.props.userData){
      if(this.props.userData === '') return <Redirect to={`/login`} />
      else if(!this.props.userData) return <LoadingPage/>
    }else{
      return (this.props.userData.regiId === this.props.match.params.regiId) ? 
        <CustomDashboard render={()=><DashboardHome 
          {...this.props} applicationHistroy={this.state.applicationHistroy} 
          userData={this.props.userData}/>}/>
      : <div>Cannot Access this page right now</div>
    }
  }
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
)(UserDashboard);