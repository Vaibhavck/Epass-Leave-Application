import React from 'react';
import styles from '../style.module.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function OtpVerify(props) {
	var currentOTP = "";
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [loading, setloading] = React.useState(false);
	axios.defaults.withCredentials = true;

	const handleInputChange = (e) => {
		currentOTP = e.target.value;
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleErrorSnackbarClick = () => {
		setOpenErrorSnackbar(true);
	};

	const handleErrorSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
		return;
		}

		setOpenErrorSnackbar(false);
	};

	const confirmOtp = (e) => {
		setloading(true);
		e.preventDefault();
		console.log("value", props.requiredOTP, currentOTP);
		var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
		try{
			if(Number(currentOTP) === Number(props.requiredOTP)){
				let config = {
					headers: {
						'X-Requested-With': 'XMLHttpRequest'
					}
				}
				console.log("same otp");

				// handleClickOpen();
				axios	
				.post( apiBaseUrl + '/application/generateApplication', {
					// userData: props.userData,
					...props.userData,
					dateFrom: props.data.dateFrom,
					dateTo: props.data.dateTo,
					reasonForLeave: props.data.reasonForLeave,
				}, config)
				.then(function(res) {
					setloading(false);
					console.log(res.data);
					if(res.data.status){
						props.nextStep();
					}
				}).catch((error)=>{
					setloading(false);
					handleErrorSnackbarClick();
				})
			}else{
				setloading(false);
				handleErrorSnackbarClick();
			}
		}catch(e){
			console.log("something went wront");
		}
	};
	
	return (
		<>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				fullWidth
				maxWidth='sm'
			>
				<DialogContent>Please wait...</DialogContent>
				<DialogContent><LinearProgress /></DialogContent>
			</Dialog>
			<Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleErrorSnackbarClose}>
				<Alert onClose={handleErrorSnackbarClose} severity="error">Please Enter Correct OTP</Alert>
			</Snackbar>
			<div className={styles}>
				<form style={{textAlign: 'center'}} onSubmit={confirmOtp}>
					<div className={styles.heading}>Enter One Time Password</div>
					<TextField
						id="filled-secondary"
						label="Enter OTP"
						name="otp"
						variant="filled"
						color="primary"
						type="text"
						margin="normal"
						onChange={handleInputChange}
						required
						disabled={loading}
					/>
					<br/>
					<Button style={loading ? {background: 'skyblue'} : null} disabled={loading} type="submit" variant="contained" color="primary" >
						{loading ? 'Verifying OTP...' : 'Confirm OTP'}
					</Button>
				</form>
			</div>
		</>
	);
}

export default OtpVerify;