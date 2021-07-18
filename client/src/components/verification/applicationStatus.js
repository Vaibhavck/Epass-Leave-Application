import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CustomizedProgress from '../shared/CircularProgress';
import styles from '../style.module.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { CardContent} from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';


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

export default function  ApplicationStatus(props){
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [applicationId, setApplicationId] = React.useState('');
    const [applicationStatus, setApplicationStatus]= React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        setLoading(true);
        axios({
            url: apiBaseUrl + '/application/checkStatus',
            method: "POST",
            data: {
                applicationId: applicationId
            },
            withCredentials: true
        }).then((res)=>{
            setLoading(false);
            if(res.data){
                console.log("res.data", res.data);
                console.log("res.data.applicationFound", res.data.applicationFound);
                if(res.data.applicationFound) setApplicationStatus(res.data.status);
                else setApplicationStatus("Application Not Found");
            }
        }).catch((err)=>{
            setLoading(false);
            setApplicationStatus("Something went wrong!");
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles}>
                <div className={styles.background}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <div className={styles.heading}>Check Application Status</div>
                            <div>Using application Id sent on your mobile number</div>
                            <br/>

                            <TextField
                                fullWidth
                                label="Application Id"
                                name="applicationId"
                                variant="outlined"
                                color="primary"
                                onChange={(e)=>{
                                    setApplicationId(e.target.value);
                                }}
                                type="text"
                                margin="normal"
                                required
                                disabled={loading}
                            />
                            <Button 
                                // style={ loading ? {background: 'skyblue'} : null} 
                                style={{position: 'relative'}}
                                disabled={loading} 
                                type="submit" 
                                variant="contained" 
                                color="primary" >
                                {loading ? <CustomizedProgress/> : 'Check Status'}
                            </Button>
                            <br/><br/>
                            {applicationStatus ?
                                 <div>
                                    <h2>Application Status : {applicationStatus}</h2><br/>
                                    <h4><Link to="/login">Login</Link> for details</h4>
                                </div>
                            : null}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}