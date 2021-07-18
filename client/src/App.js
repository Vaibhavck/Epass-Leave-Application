import React, {Fragment} from 'react';
import './App.css';
import Navbar from './components/shared/Navbar';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import LoginForm from './components/user/Login';
import UserDashboard from './components/user/dashboard';
import ApplyPage from './components/user/Apply';
import PageNotFound from './components/shared/PageNotFound';
import ApplicationStatus from './components/verification/applicationStatus';
import CustomStepper from './components/shared/Stepper';

function App() {
  return (
      <div>
          <BrowserRouter>
            <Switch>
              <Route path="/:regiId/dashboard" exact component={UserDashboard}  />
              <Route path="/:regiId/apply" exact component={ApplyPage}  />
              <Route path="/testing" exact component={CustomStepper}  />
              <Fragment>
                <Navbar/>
                <Switch>
                  <Route path="/checkStatus" exact component={ApplicationStatus} />
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={LoginForm}  />
                  <Route exact path="*" render={()=><PageNotFound/>} />
                </Switch>
              </Fragment>
            </Switch>
          </BrowserRouter>
      </div>
  );
}


export default App;
