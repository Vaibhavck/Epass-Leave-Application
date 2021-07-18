import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import getCurrentUser from '../../store/actions/publicActions';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {ApplicationForm} from './StudentForm';
import CustomDashboard from '../shared/DashboardLayout';
import LoadingPage from '../shared/LoadingPage';

class ApplyPage extends React.Component{

  _isMounted = false;

  state = {
    applicationHistroy : null
  }

  async componentDidMount(){
    this._isMounted = true;
    await this.props.getCurrentUser();
    var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    axios({
      url: apiBaseUrl + '/application/getApplicationHistroy',
      method : "POST",
      data : {
        regiId : this.props.match.params.regiId
      }
    }).then((res)=>{
      if(this._isMounted)
        this.setState({applicationHistroy : res.data.history});
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render(){
    if(!this.props.userData){
      if(this.props.userData === "" ) return <Redirect to={`/login`} />
      else if(!this.props.userData) return <LoadingPage/>
    }else{
      return (this.props.userData.regiId === this.props.match.params.regiId) ? 
      <CustomDashboard
        render={()=><ApplicationForm userData={this.props.userData} />}
      /> : <div>Cannot Access this page right now</div>
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
)(ApplyPage);


// export default ApplyPage;