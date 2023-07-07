import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, MobileStepper, Paper, Box, Typography } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import axios from 'axios';
import config from '../configs/config';

function Login() {
    let authLogin = false;

    const location = useLocation();
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [result, setResult] = useState();
    const [message, setMessage] = useState('');

    let from = location.state?.from?.pathname || "/";

    if (authLogin) {
        navigate(from, { replace: true });
    }

    const firebaseConfig = {
        apiKey: 'AIzaSyDP0_mOUswh0-HbYWN5iAvPMP6SZDHr6D4',
        authDomain: 'elemental-leaf-303801.firebaseapp.com',
        databaseURL: 'https://elemental-leaf-303801-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'elemental-leaf-303801',
        storageBucket: 'elemental-leaf-303801.appspot.com',
        messagingSenderId: '1063714170045',
        measurementId: 'G-EG7DPSTYEV',
        appId: '1:1063714170045:web:50bfb4884288fa96c483d4'
    };

    const currencies = [
        {
            value: '+01',
            label: 'US +01',
        },
        {
            value: '+86',
            label: 'VN +86',
        }
    ];
    
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 2;

    const handleNext = () => {
        if (phoneNumber.length > 0) {
            //https://viblo.asia/p/authenticate-phone-number-voi-firebase-trong-reactjs-aWj53o9o56m
            //https://firebase.google.com/docs/auth/web/phone-auth
            const firebase = initializeApp(firebaseConfig);
            //const analytics = getAnalytics(firebase);//Khong can thiet
            const auth = getAuth(firebase);//firebase.auth();
            
            auth.settings.appVerificationDisabledForTesting = true;//Test co the bo qua buoc reCaptcha
            
            const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible'//normal | invisible
            }, auth);

            recaptchaVerifier.render().then(function(widgetId) {
                //window.grecaptcha.reset(widgetId);
            });
            
            signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier).then((signinResult) => {
                setResult(signinResult);

                //Viet them code an button next

                setActiveStep((prevActiveStep) => prevActiveStep + 1);

                console.log('SUCCESS signin with phone number');
            }).catch((error) => {
                setMessage('So dien thoai khong hop le');

                console.log(error.code, error.message);
            });
        }
    };

    const handleBack = () => {
        if (activeStep === 0) {
            navigate('/');
        } else {
            setOtp('');//Xoa opt
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleVerifyCode = (otp) => {
        if (otp.length === 6) {
            if (result) {
                result.confirm(otp).then((confirmResult) => {
                    const user = confirmResult.user;
                    const accessToken = user.accessToken;
                    const deviceName = 'Browser';
                    const devieUid = 'Browser';

                    //Prepare URL
                    //........

                    axios.post(
                        'https://dev.olachat.me/api/user/signin?firebase_id_token=' + accessToken + '&device_name=' + deviceName + '&device_uid=' + devieUid,
                        {}
                    ).then(response => {
                        if (response.accessToken) {
                            localStorage.setItem('accessToken', response.access_token);
    
                            //setMessage('Dang nhap thanh cong');
                            navigate('/');//Chuyen huong den trang explore
                        } else {
                            setMessage('Dang nhap that bai');
                        }
                    });

                    console.log('SUCCESS verify OTP');
                }).catch((error) => {
                    setMessage('Ma OTP khong hop le');
    
                    console.log(error.code, error.message);
                });
            } else {
                setMessage('Error');
            }
        }
    };
    
    return (
        <div>
            <h1>Login</h1>
            <Button variant="contained">Button</Button>
            <hr />
            <form name="login">
            <TextField
                className="select"
                id="outlined-select-currency"
                select
                defaultValue="+86"
                //inputProps={{IconComponent: () => null}}
                helperText="Please select your currency">
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </form>

            <hr />
            
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{
                        width: '100%', p: 2,
                        display: activeStep === 0 ? 'block': 'none'
                }}>
                    <h3>Input phone number</h3>
                    <p>{phoneNumber}</p>
                    <TextField
                        className="input"
                        inputProps={{ 
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                        value={phoneNumber ? phoneNumber : '+84902824547'}
                        placeholder="Phone"
                        onChange={(event) => {setPhoneNumber(event.target.value.trim())}} />
                    <div id="recaptcha-container" />
                </Box>
                <Box sx={{ width: '100%', p: 2,
                        display: activeStep === 1 ? 'block': 'none' }}>
                    <h3>Verify OTP</h3>
                    <p>{otp}</p>
                    <TextField
                        className="text"
                        placeholder="Otp"
                        value={otp}
                        onChange={(event) => {handleVerifyCode(event.target.value.trim())}} />
                    <p>{message}</p>
                </Box>

                <MobileStepper
                    variant=""
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            sx={{ display: activeStep === 1 ? 'none': 'inline-block'  }}
                            size="small"
                            onClick={handleNext}>Next</Button>
                        }
                    backButton={
                        <Button size="small"
                                onClick={handleBack}>Back</Button>
                    }
                />
            </Box>
        </div>
    );
}

export default Login;