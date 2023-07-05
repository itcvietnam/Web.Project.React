import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, MobileStepper, Paper, Box, Typography } from '@mui/material';

function Login() {
    let auth = true;
    let location = useLocation();
    let navigate = useNavigate();

    let from = location.state?.from?.pathname || "/";

    if (auth) {
        //navigate(from, { replace: true });
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
    
    const steps = [
        {
          label: 'Select campaign settings',
          description: `For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.`,
        },
        {
          label: 'Create an ad group',
          description:
            'An ad group contains one or more ads which target a shared set of keywords.',
        },
        {
          label: 'Create an ad',
          description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
      ];

      const [activeStep, setActiveStep] = useState(0);
      const maxSteps = 2;//steps.length;
  
      const handleNext = () => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
  
      const handleBack = () => {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

                <TextField
                    className="input"
                    inputProps={{ 
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                 }} placeholder="Phone" />
                 <TextField
                    className="text"
                    placeholder="text" />
            </form>

            <hr />
            
            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2,
                        display: activeStep == 0 ? 'block': 'none' }}>
                    NOI DUNG 1111111
                </Box>
                <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2,
                        display: activeStep == 1 ? 'block': 'none' }}>
                    NOI DUNG 2222222222
                </Box>

                <MobileStepper
                    variant="undefined"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}>Next</Button>
                        }
                    backButton={
                        <Button size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}>Back</Button>
                    }
                />
            </Box>
        </div>
    );
}

export default Login;