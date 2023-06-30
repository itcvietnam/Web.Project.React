import React, { useEffect, useState } from 'react';
import { Button, Grid, Autocomplete, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import configs from '../configs/config';
import axios from 'axios';

function Home() {
    const options = [
        { label: 'Option 1', id: 1 },
        { label: 'Option 2', id: 2 },
    ];

    const [detail, setDetail] = useState({
        uid: 123,
        accessToken: 'accessToken',
        name: 'No Name'
    });

    const signinHandle = () => {
        const firebaseConfig = {
            apiKey: configs.apiKey,
            authDomain: 'elemental-leaf-303801.firebaseapp.com',
            databaseURL: 'https://elemental-leaf-303801-default-rtdb.asia-southeast1.firebasedatabase.app',
            projectId: 'elemental-leaf-303801',
            storageBucket: 'elemental-leaf-303801.appspot.com',
            messagingSenderId: '1063714170045',
            measurementId: 'G-EG7DPSTYEV',
            appId: '1:1063714170045:web:50bfb4884288fa96c483d4'
        };

        const phoneNumber = '+84902824547';
        const code = '123456';

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        sessionStorage.setItem('sessionStorageKey', 'session storage value');

        auth.settings.appVerificationDisabledForTesting = true;
        
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'normal',//invisible
            callback: function(response) {
                const appVerifier = window.recaptchaVerifier;
                
                signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    
                    window.confirmationResult.confirm(code).then((result) => {
                        const user = result.user;
                        const accessToken = user.accessToken;
                        const at = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5N2U3ZWVlY2YwMWM4MDhiZjRhYjkzOTczNDBiZmIyOTgyZTg0NzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb2xhY2hhdC1mZDg4OSIsImF1ZCI6Im9sYWNoYXQtZmQ4ODkiLCJhdXRoX3RpbWUiOjE2ODgwODk3MTgsInVzZXJfaWQiOiJuMGlySkFmdGZ5WHlFTWpFM2R0bmdSWWJDVmUyIiwic3ViIjoibjBpckpBZnRmeVh5RU1qRTNkdG5nUlliQ1ZlMiIsImlhdCI6MTY4ODExMjI5NiwiZXhwIjoxNjg4MTE1ODk2LCJwaG9uZV9udW1iZXIiOiIrODQ5MDI4MjQ1NDciLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis4NDkwMjgyNDU0NyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.hrZu5srpaqmo-g9mg-SBjOQsEzcGE0sv03GlO61PPV1lFH1q2ARMyPIgTTZ9BY6utIiMy2ZU318jHt-Bu7N6KT15nm8O0RTyH_0mORMWdUxrajiC4jxtogLaMe3UPRSirsjJIDD5ds6BSqLCSvVHtEsY1i1Hg4p-UxJXDtH9lPL0FZX2OCFW_qTZy3HL0PM_BIKrlmWMEyLXBjJPTLBU1uGWi6WyRe9h_0YyxBQXS_WDayTPlxKtb5G9J8p04Iga-m3Aai4thNHnjO2x_62l34mquEaYa3k8G4Rl31Zitb7yXHUNQgZXoEQGSI5a07-sQQDkZv4Zmds8Nl4WYx1DiA';
                        axios.post(
                            'https://dev.olachat.me/api/user/signin?firebase_id_token=' + at + '&device_name=Firefox&device_uid=Firefox',
                            {}
                        ).then(response => {
                            setDetail({
                                uid: 789,
                                accessToken: response.data.access_token,
                                name: response.data.user.name
                            });

                            console.log(response);
                        });
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        console.log(errorCode, errorMessage);
                    });
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode, errorMessage);
                });
            }
        }, auth);
        
        window.recaptchaVerifier.render().then(function(widgetId) {
            //window.grecaptcha.reset(widgetId);
        });
    };
    
    return (
        <div>
            <h1>Home</h1>
            <hr />
            <h2>{detail.name}</h2>
            <div id="recaptcha-container"></div>
            <Button id="signin-button" variant="contained" onClick={signinHandle}>Sigin</Button>
            <hr />
            <Grid container spacing={0}>
                <Grid xs={3} item={true}>
                    <Button variant="contained">Button</Button>
                </Grid>
                <Grid xs={3} item={true}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Options" />} />
                </Grid>
                <Grid xs={3} item={true}>
                    <Link to="/user">User</Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;