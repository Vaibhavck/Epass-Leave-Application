import React, { useState } from 'react'
import CustomizedProgress from '../shared/CircularProgress';
import LoadingPage from '../shared/LoadingPage';
import {connect} from 'react-redux';
import {compose} from 'redux';
import getCurrentUser from '../../store/actions/publicActions';
import styles from '../style.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardContent} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
	root: {
	  '& > *': {
		margin: theme.spacing(1),
	  },
    },
    errorMessage:{
        color: 'red',
    },
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	  },
	  title: {
		fontSize: 14,
	  },
	  pos: {
		marginBottom: 12,
	  },
}));

function LoginForm(props){
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const classes = useStyles();
    const [registrationId, setRegistrationId] = useState("");
    const [password, setPassword] = useState("");
    const [regiIdError, setRegiIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateInput = () => {
        var isValid = true;
        if(!registrationId) {
            setRegiIdError('Registration Id cannot be empty');
            isValid = false;
        }
        if(!password) {
            setPasswordError('Password cannot be empty');
            isValid = false;
        }
        if(password && password.length < 5) {
            setPasswordError('Password of at least 5 character is required');
            isValid = false;
        }

        return isValid;
    }

    const login = (e) => {
        var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        e.preventDefault();
        var isValid = validateInput();
        setErrorMessage('');
        if(isValid){
            setLoading(true);
            axios({
                url: apiBaseUrl + '/auth/login',
                method: "POST",
                data: {
                    regiId: registrationId,
                    password: password,
                },
                withCredentials: true,
            }).then((res)=>{
                setLoading(false);
                if(res.status === 200){
                    var responseData = res.data;
                    var userData = responseData.user;
                    var token = responseData.token;
                    localStorage.setItem('token', token);
                    props.history.push(`/${userData.regiId}/dashboard`);
                }else{
                    throw new Error();
                }
            }).catch((err)=>{
                setLoading(false);
                console.log("errr", err);
                setErrorMessage('Invalid Username or Password');
            });
        }
    }

    return (
        <form onSubmit={login}>
            <div className={styles}>
                <div className={styles.background}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <div className={styles.heading}>Login</div>
                            <div>With Your MIS Account</div>
                            <br/>
                            <h4 className={classes.errorMessage} >{errorMessage}</h4>

                            <TextField
                                fullWidth
                                label="Registration Id"
                                name="regiId"
                                onChange={(e)=>{
                                    setRegiIdError('');
                                    setRegistrationId(e.target.value);
                                }}
                                variant="outlined"
                                color="primary"
                                type="text"
                                margin="normal"
                                helperText={regiIdError}
                                // required
                                disabled={loading}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                onChange={(e)=>{
                                    setPasswordError('');
                                    setPassword(e.target.value)
                                }}
                                variant="outlined"
                                color="primary"
                                type="password"
                                margin="normal"
                                helperText={passwordError}
                                // required
                                disabled={loading}
                            />
                            <Button 
                                // style={ loading ? {background: 'skyblue'} : null} 
                                style={{position: 'relative'}}
                                disabled={loading} 
                                type="submit" 
                                variant="contained" 
                                color="primary" >
                                {loading ? <CustomizedProgress/> : 'Login'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}

class Login extends React.Component{
    componentDidMount(){
        this.props.getCurrentUser();
    }
    render(){
        if(this.props.userData === '') 
            return <LoginForm {...this.props} />
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
  )(Login);

// export default LoginForm