import React, { useState } from 'react';
import VerifyInput from './verifyInput';
import Otpverify from './otpVerify';
const VerifySection = (props) => {
	const [ state, setState ] = useState({
		email: '',
		regiId: '',
		hash: '',
		otp: '',
		requiredOTP: ""
	});

	const [step, setStep] = useState(1)
	
	const handleChange = (e) => {
		setState({...state, [e.target.name]: e.target.value });
	};
	const hashHandleChange = (hash) => {
		setState({...state, hash : hash})
	}
	const nextStep = () => {
		setStep(prevStep => prevStep + 1)
	};

	const prevStep = () => {
        
		setStep(prevStep => prevStep - 1)
	};

	const getRequiredOTP = (otp) => {
		console.log("req otp", otp);
		setState({...state, requiredOTP : otp})
	}
	
	const {email, regiId, hash, otp, requiredOTP } = state;
	const value = {email, regiId, hash, otp, requiredOTP };

	switch (step) {
		case 1:
			return <VerifyInput getRequiredOTP={getRequiredOTP} nextStep={nextStep} hashHandleChange={hashHandleChange} handleChange={handleChange} value={value} />;
		case 2:
            return <Otpverify nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} value={value} />;
        default:
            return <VerifyInput getRequiredOTP={getRequiredOTP}  nextStep={nextStep} handleChange={handleChange} value={value} />  
            
    }
};

export default VerifySection;