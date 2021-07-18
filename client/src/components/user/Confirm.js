import React, { Component } from 'react'
import MultilineTextField from '../shared/MultilineInput';
import Uploader from '../shared/FileUploader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class FormApplicationDetails extends Component {

    state = {
        dateFrom : this.props.values.dateFrom,
        dateTo : this.props.values.dateTo,
        reasonForLeave: '',
        loading: false,
    }

    handleInputChange = (e) => {
        this.props.handleChange(e);
    }

    formatDMY(d) {
        // Default to today
        d = d || new Date();
        return ('0' + d.getDate()).slice(-2) + '/' +
                ('0' + (d.getMonth() + 1)).slice(-2) + '/' +
                ('000' + d.getFullYear()).slice(-4);
    }

    handleDateInputChange(date, type){
        this.props.handleDateInputChange(date, type);
        switch (type) {
            case 'TO':
                this.setState({
                    ...this.state,
                    dateTo : date,
				        });       
                break;
            case 'FROM':
                this.setState({
                    ...this.state,
                    dateFrom : date,
                    dateTo: date
                });
                break;
            default:
        }
    }

    

    sendOTP = () => {
      console.log("sendOtp");
      // handleClickOpen();
      var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      axios
        .post( apiBaseUrl + '/verification/sendOTP', {
          receiverEmail: this.props.userData.email,
        })
        .then((res) => {
          // const hash = res.data.hash;
          // hashHandleChange(hash);
          if(res.data.status){
            this.setState({loading: false});
            this.props.getGeneratedOTP(res.data.otp);
            this.props.nextStep();
          }else{
            this.setState({loading:false});
          }
        }).catch((error)=>{
          this.setState({loading: false});
        })
    };


    continue = e => {
        this.setState({loading: true});
        e.preventDefault();
        this.sendOTP(e);
        // this.props.nextStep();
    }
    render() {
        return (
            <form style={{textAlign:'center'}} onSubmit={this.continue}>
            <Grid style={{textAlign: 'center'}} container spacing={2} >
                <Grid style={{textAlign: 'center'}} item sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        disabled={this.state.loading}
                        required
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date From"
                        name="dateFrom"
                        format="dd/MM/yyyy"
                        value={this.state.dateFrom}
                        onChange={(date)=>this.handleDateInputChange(date, 'FROM')}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
              <Grid style={{textAlign: 'center'}} item sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        disabled={this.state.loading}
                        required
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date To"
                        name="dateFrom"
                        format="dd/MM/yyyy"
                        value={this.state.dateTo}
                        minDate={this.state.dateFrom}
                        onChange={(date)=>this.handleDateInputChange(date, 'TO')}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid style={{textAlign: 'center'}} item sm={12}>
                <MultilineTextField disabled={this.state.loading} handleInputChange={this.handleInputChange}/>
              </Grid>
            </Grid>
            <Grid style={{textAlign: 'center'}} container>
              <Uploader handleFileUpload={this.props.handleFileUpload}/>
            </Grid>
            <br/>
            <Grid style={{textAlign: 'center'}} container spacing={3}>
              <Grid style={{textAlign: 'right', verticalAlign: 'center'}} item xs={6}>
                <Button disabled={this.state.loading} onClick={this.props.prevStep} variant="contained" disableElevation>
                  Back
                </Button>
              </Grid>
              <Grid style={{textAlign: 'left'}} item xs={6}>
                <Button style={this.state.loading ? {background: 'skyblue'} : null} disabled={this.state.loading} type="submit" variant="contained" color="primary" >
                  {this.state.loading ? 'Please wait..' : 'Apply'}
                </Button>
              </Grid>
              {/*<Grid style={{textAlign: 'center'}} item xs={12}>
                <button type="submit" variant="contained" color="primary" disableElevation>
                  <CircularIntegration sendOTP={this.sendOTP} />
                </button>
                    </Grid>*/}
          </Grid>
        </form>
        );
    }
}

export default FormApplicationDetails
