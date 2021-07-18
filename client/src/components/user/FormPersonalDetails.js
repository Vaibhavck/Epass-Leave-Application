import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class FormPersonalDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values, handleChange } = this.props;

        return (
            <div>
            <Grid container spacing={2} >
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <TextField
                  // id="outlined-password-input"
                  label="Contact"
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
                  value="not in db yet  "
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
            </Grid>
            <Grid container spacing={3}>
              <Grid style={{textAlign: 'right'}} item xs={6}>
                <Button variant="contained" disableElevation>
                  Back
                </Button>
              </Grid>
              <Grid style={{textAlign: 'left'}} item xs={6}>
                <Button onClick={this.continue} variant="contained" color="primary" disableElevation>
                  Continue
                </Button>
              </Grid>
            </Grid>
        </div>
            /*<div
                style={{
                    // position: 'fixed', 
                    // left: '50%', 
                    // top: '50%',
                    // transform: 'translate(-50%, -50%)'
                }}
            >
            <MuiThemeProvider>
                <React.Fragment>
                    
                    <TextField
                    fullWidth
                    hintText = "Enter Your First Name"
                    floatingLabelText="First Name"
                    onChange={handleChange('firstName')}
                    defaultValue = {values.firstName}
                    />
                    <TextField
                    
                    hintText = "Enter Your Last Name"
                    floatingLabelText="Last Name"
                    onChange={handleChange('lastName')}
                    defaultValue = {values.lastName}
                    />
                    <TextField
                    hintText = "Enter Your Email"
                    floatingLabelText="Email"
                    onChange={handleChange('email')}
                    defaultValue = {values.email}
                    />
                    <br />
                    <RaisedButton 
                        label="Continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    />

                </React.Fragment>
            </MuiThemeProvider>
            </div>*/
        );
    }
}
export default FormPersonalDetails


/*
    <TextField
                    hintText = "Enter Your Contact Number"
                    floatingLabelText="Contact Number"
                    onChange={handleChange('personalPhone')}
                    defaultValue = {values.personalPhone}
                    />
                    <br />
                    <TextField
                    hintText = "Enter Your Parents Number"
                    floatingLabelText="Parents Phone"
                    onChange={handleChange('')}
                    defaultValue = {values.parentPhone}
                    />
                    <br />
                    <TextField
                    hintText = "Enter Your Roll No."
                    floatingLabelText="rollNo"
                    onChange={handleChange('rollNo')}
                    defaultValue = {values.rollNo}
                    />
                    <br />
                    <TextField
                    hintText = "Enter Your Class"
                    floatingLabelText="section"
                    onChange={handleChange('section')}
                    defaultValue = {values.section}
                    />
                    <br />
                    <RaisedButton 
                        label="Continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    />
                    <RaisedButton 
                        label="Back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back}
                    />
 */