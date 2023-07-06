import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, MobileStepper, Paper, Box, Typography } from '@mui/material';

function Login() {
    let auth = false;
    let location = useLocation();
    let navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [result, setResult] = useState('');

    const [message, setMessage] = useState('');
    const [token, setToken] = useState('...');

    let from = location.state?.from?.pathname || "/";

    if (auth) {
        navigate(from, { replace: true });
    }

    const currencies = [
        {
            value: '+84',
            label: 'US +84',
        },
        {
            value: '+86',
            label: 'VN +86',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];
    
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 2;

    const handleNext = () => {
        if (phoneNumber.trim().length > 0) {
            setResult(phoneNumber === '123456');
            setMessage('');

            setToken(localStorage.getItem('token'));
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep === 0) {
            navigate('/');
        } else {
            setOtp('');
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleVerifyCode = (code) => {
        setOtp(code);

        if (result) {
            localStorage.setItem('token', 'Arpq98709Kpou90890482093oiouoiD-8dljippDu76Z-9');

            setMessage('Verify code success');
        } else {
            setMessage('Invalid verify code');
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

            <p>{token}</p>

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
                        value={phoneNumber}
                        placeholder="Phone"
                        onChange={(event) => {setPhoneNumber(event.target.value)}} />
                </Box>
                <Box sx={{ width: '100%', p: 2,
                        display: activeStep === 1 ? 'block': 'none' }}>
                    <h3>Verify OTP</h3>
                    <p>{otp}</p>
                    <TextField
                        className="text"
                        placeholder="Otp"
                        value={otp}
                        onChange={(event) => {handleVerifyCode(event.target.value)}} />
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