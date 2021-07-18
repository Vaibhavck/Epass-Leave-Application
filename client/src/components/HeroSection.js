import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import '../App.css';
import { Button } from './shared/Button';
import getCurrentUser from '../store/actions/publicActions';
import './HeroSection.css';
import LoadingPage from './shared/LoadingPage';
import { Redirect } from 'react-router-dom';
import Typer from './shared/TypeWriterText';

function HeroSection() {
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Home | PICT-Epass</title>
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className='hero-container'>
        <video src='/videos/video-1.mp4' autoPlay loop muted />
        <h1>Welcome to PICT EPASS</h1>
        <p>
          <Typer
            dataText={[  
              'Go Ahead to proceed your Application.', 
              'Check Application Status.',
              'Download Applications.',
              'Check Your Attendence',
            ]}
          />
        </p>
        <div className='hero-btns'>
          <Button
            to='/login'
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            LOGIN
          </Button>
        </div>
      </div>
    </div>
  );
}

class Home extends React.Component {
  componentDidMount(){
    this.props.getCurrentUser();
  }
  render() {
    if(this.props.userData === '')
        return <HeroSection />
    if(!this.props.userData)
        return <LoadingPage/>
    if(this.props.userData)
        return <Redirect to={`/${this.props.userData.regiId}/dashboard`} />
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
)(Home);

// export default HeroSection;