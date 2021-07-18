import React from 'react';
import styles from '../style.module.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
	  '& > *': {
		margin: theme.spacing(1),
	  },
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


function VerifyInput(props) {
	const classes = useStyles();
	const { value, handleChange, hashHandleChange } = props;
	const [open, setOpen] = React.useState(false);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [fullWidth, setFullWidth] = React.useState(true);
  	const [maxWidth, setMaxWidth] = React.useState('sm');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSnackbarClick = () => {
		setOpenSnackbar(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
		return;
		}

		setOpenSnackbar(false);
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

	const sendOTP = (e) => {
		var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
		// if(email == '' || regiID == '') {
		// 	setError("Fields are required");
      	// 	return;
		// }
		e.preventDefault();
		handleClickOpen();
		axios
			.post( apiBaseUrl + '/verification/sendOTP', {
				receiverEmail: `${value.email}`,
			})
			.then(function(res) {
				const hash = res.data.hash;
				hashHandleChange(hash);
				if(res.data.status){
					handleClose();
					// handleSnackbarClick();
					console.log(props.getRequiredOTP);
					props.getRequiredOTP(res.data.otp);
					props.nextStep();
				}else{
					handleClose();
					handleErrorSnackbarClick();
				}
			}).catch((error)=>{
				console.log(error);
				handleClose();
				handleErrorSnackbarClick();
			})
	};
	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				fullWidth={fullWidth}
        		maxWidth={maxWidth}
			>
				<DialogContent>Sending OTP to {value.email}</DialogContent>
				<DialogContent><LinearProgress /></DialogContent>
			</Dialog>
			<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity="success">OTP sent Successfully</Alert>
			</Snackbar>
			<Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleErrorSnackbarClose}>
				<Alert onClose={handleErrorSnackbarClose} severity="error">Something went wrong! Refresh the page or try again later.</Alert>
			</Snackbar>
			<form onSubmit={sendOTP}>
			<div className={styles.heading}>Student Verification</div>

			<TextField
				fullWidth
				id="filled-secondary"
				label="Email"
				name="email"
				onChange={handleChange}
				variant="filled"
				color="primary"
				type="email"
				margin="normal"
				required
			/>

			<TextField
				fullWidth
				id="filled-secondary"
				label="Registration Id"
				name="regiId"
				onChange={handleChange}
				variant="filled"
				color="primary"
				type="text"
				margin="normal"
				required
			/>
			<button type="submit" className={styles.submit}>
				Send OTP
			</button>
			</form>
		</div>
	);
}

export default VerifyInput;