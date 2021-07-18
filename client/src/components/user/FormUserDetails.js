import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

class FormUserDetails extends Component {
    render() {

        return (
            <div>
            <Grid container spacing={2} >
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="First Name"
                  value={this.props.userData.name.toString().split(" ")[0]} 
                  type="text"
                  // autoComplete="current-password"
                  variant="outlined"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="Last Name"
                  value={this.props.userData.name.toString().split(" ")[1]} 
                  type="text"
                  // autoComplete="current-password"
                  variant="outlined"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="Email"
                  value={this.props.userData.email} 
                  type="email"
                  // autoComplete="current-password"
                  variant="outlined"
                  disabled
                  fullWidth
                  />
              </Grid>
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="Roll Number"
                  value={this.props.userData.rollNo} 
                  type="email"
                  // autoComplete="current-password"
                  variant="outlined"
                  disabled
                  fullWidth
                  />
              </Grid>
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="Registration ID"
                  value={this.props.userData.regiId} 
                  type="text"
                  // autoComplete="current-password"
                  variant="outlined"
                  disabled
                  fullWidth
                  />
              </Grid>
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="Class"
                  value={this.props.userData.class} 
                  type="text"
                  // autoComplete="current-password"
                  variant="outlined"
                  disabled
                  fullWidth
                  />
              </Grid>
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="Student Mobile Number"
                  value={this.props.userData.mobNo} 
                  type="text"
                  // autoComplete="current-password"
                  variant="outlined"
                  disabled
                  fullWidth
                  />
              </Grid>
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="Parent's Contact"
                  value={this.props.userData.parentMobNo} 
                  type="text"
                  // autoComplete="current-password"
                  variant="outlined"
                  disabled
                  fullWidth
                  />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid style={{textAlign: 'right'}} item xs={6}>
                <Link to='./dashboard' style={{textDecoration:'none'}} >
                <Button variant="contained" disableElevation>
                  Back
                </Button></Link>
              </Grid>
              <Grid style={{textAlign: 'left'}} item xs={6}>
                <Button onClick={this.props.nextStep} variant="contained" color="primary" disableElevation>
                  Continue
                </Button>
              </Grid>
            </Grid>
        </div>
        );
    }
}

export default FormUserDetails
