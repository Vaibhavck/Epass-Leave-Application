import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails';
import OtpVerify from '../verification/otpVerify';
import FormApplicationDetails from './Confirm';
import Success from './Success';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';
import PageNotFound from '../shared/PageNotFound';
import CustomStepper from '../shared/Stepper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  content: {
    flexGrow: 1,
    // height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}));

function getSteps(){
  return ['Confirm Information',
        'Apply for leave', 
        'Confirm OTP'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

export function ApplicationForm(props){
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
        <div>
          <Helmet>
              <meta charSet="utf-8" />
              <title>Apply For Leave | PICT-Epass</title>
              <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <main className={classes.content}>
              <Container maxWidth="lg" className={classes.container}>
                <main className={classes.content}>
                  <Container maxWidth="lg" className={classes.container}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                          {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                        <Paper className={classes.paper}>
                          <StudentForm 
                            {...props}
                            handleBack={handleBack} 
                            handleNext={handleNext}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Container>
                </main>
              </Container>
          </main>
        </div>
    )
}

class StudentForm extends Component {
  state = {
      step: 1,
      firstName: this.props.userData.name.toString().split(" ")[0],
      lastName: this.props.userData.name.toString().split(" ")[1],
      email: this.props.userData.email,
      isStaff: this.props.userData.isStaff,
      isHOD: this.props.userData.isHOD,
      personalPhone: this.props.userData.mobNo,
      parentPhone: '123456',
      rollNo: this.props.userData.rollNo,
      section: this.props.userData.class,
      dateFrom : null,
      dateTo : null,
      reasonForLeave: '',
      requiredOTP: '',
      file: null,
  }

  // Proceed to next step
  nextStep = () => {
    this.props.handleNext();
    const { step } = this.state;
        this.setState({
      ...this.state,
            step: step + 1
    });
  }

  prevStep = () => {
    this.props.handleBack();
      const { step } = this.state;
      this.setState({
    ...this.state,
          step: step - 1
      });
  }

  getGeneratedOTP = (otp) => {
    this.setState({...this.state, requiredOTP: otp});
  }

  handleChange = (e) => {
        this.setState({[e.target.name]: String(e.target.value).trim()});
	}

	formatDMY(d) {
    // Default to today
    d = d || new Date();
    return ('0' + d.getDate()).slice(-2) + '/' +
            ('0' + (d.getMonth() + 1)).slice(-2) + '/' +
            ('000' + d.getFullYear()).slice(-4);
  }
	
	handleDateInputChange = (date, type) => {
        switch (type) {
            case 'TO':
                this.setState({
                    ...this.state,
                    dateTo : this.formatDMY(date),
				        })       
                break;
            case 'FROM':
                this.setState({
                    ...this.state,
                    dateFrom : this.formatDMY(date),
                    dateTo: this.formatDMY(date)
                })
                break;
            default:
        }
    }

    handleFileUpload = (fileData) => {
      console.log("file | ", fileData);
      this.setState({...this.state, file:fileData});
    }


    render() {
        const { step } = this.state;
        switch(step) {
            case 1: 
                return (
                <FormUserDetails
                    userData={this.props.userData}
                    nextStep = {this.nextStep}
                    handleChange={this.handleChange}
                    values={this.state}
                />
                )
            case 2:
              console.log("step | ", step);
                return (
                  <FormApplicationDetails
                    userData={this.props.userData}
                    nextStep = {this.nextStep}
                    prevStep = {this.prevStep}
                    handleBack={this.props.handleBack} 
                    handleNext={this.props.handleNext}
                    handleChange={this.handleChange}
                    handleFileUpload={this.handleFileUpload}
                    handleDateInputChange={this.handleDateInputChange}
                    getGeneratedOTP={this.getGeneratedOTP}
                    values={this.state}
                  />
                )
            case 3:
                return (
                    <OtpVerify data={this.state} userData={this.props.userData} nextStep={this.nextStep}  requiredOTP={this.state.requiredOTP} />
                )
            case 4:
              return (
                  <Success data={this.state} {...this.props}/>
              )

            default:
              return <PageNotFound/>
        }
    }
}

export default StudentForm
